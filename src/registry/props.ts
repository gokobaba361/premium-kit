import "server-only";

import ts from "typescript";
import { readSource } from "./source";

/**
 * Props extraction.
 *
 * The tables on each component page are generated from the component's own
 * signature, so they cannot drift from the code. This is a syntax-only parse
 * (no type checker, no program), which keeps it fast enough to run for every
 * prerendered page.
 *
 * It relies on the house style used throughout the kit: an exported function
 * whose single parameter is a destructured object with an inline type literal,
 * one JSDoc comment per documented prop. Anything it cannot read is reported as
 * an unresolved type rather than guessed at, so a missing row is visible.
 */

export type PropRow = {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
};

export type PropsTable = {
  component: string;
  props: PropRow[];
  /** Types intersected into the signature that this parser did not expand. */
  inherits: string[];
};

/** Collapses whitespace so a multi line union renders on one table row. */
function typeText(node: ts.TypeNode, source: ts.SourceFile) {
  return node.getText(source).replace(/\s+/g, " ").trim();
}

function jsDocOf(member: ts.TypeElement) {
  const docs = ts.getJSDocCommentsAndTags(member);
  for (const doc of docs) {
    if (ts.isJSDoc(doc) && typeof doc.comment === "string") {
      return doc.comment.replace(/\s+/g, " ").trim();
    }
  }
  return undefined;
}

/** Default values live in the destructuring pattern, not in the type. */
function defaultsFrom(param: ts.ParameterDeclaration, source: ts.SourceFile) {
  const defaults = new Map<string, string>();
  if (!param.name || !ts.isObjectBindingPattern(param.name)) return defaults;

  for (const element of param.name.elements) {
    if (element.initializer && ts.isIdentifier(element.name)) {
      defaults.set(element.name.text, element.initializer.getText(source));
    }
  }
  return defaults;
}

function collectMembers(
  type: ts.TypeNode,
  source: ts.SourceFile,
  members: ts.TypeElement[],
  inherits: string[],
) {
  if (ts.isTypeLiteralNode(type)) {
    members.push(...type.members);
    return;
  }
  if (ts.isIntersectionTypeNode(type)) {
    for (const part of type.types) collectMembers(part, source, members, inherits);
    return;
  }
  // A named type, a generic, or anything else this parser does not expand.
  inherits.push(typeText(type, source));
}

function tableFor(
  name: string,
  param: ts.ParameterDeclaration,
  source: ts.SourceFile,
): PropsTable | null {
  if (!param.type) return null;

  const members: ts.TypeElement[] = [];
  const inherits: string[] = [];
  collectMembers(param.type, source, members, inherits);

  const defaults = defaultsFrom(param, source);

  const props = members.flatMap<PropRow>((member) => {
    if (!ts.isPropertySignature(member) || !member.name) return [];
    const propName = member.name.getText(source);
    return [
      {
        name: propName,
        type: member.type ? typeText(member.type, source) : "unknown",
        required: !member.questionToken && !defaults.has(propName),
        defaultValue: defaults.get(propName),
        description: jsDocOf(member),
      },
    ];
  });

  if (props.length === 0 && inherits.length === 0) return null;
  return { component: name, props, inherits };
}

/**
 * Reads every exported component in a file and returns one table per component.
 * Components with no props are skipped: an empty table says nothing.
 */
export function extractProps(filePath: string): PropsTable[] {
  if (!filePath.endsWith(".tsx") && !filePath.endsWith(".ts")) return [];

  const code = readSource(filePath);
  const source = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);
  const tables: PropsTable[] = [];

  for (const statement of source.statements) {
    if (!ts.isFunctionDeclaration(statement) || !statement.name) continue;

    const exported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!exported) continue;

    // A component starts with a capital letter. Helpers and hooks do not.
    const name = statement.name.text;
    if (!/^[A-Z]/.test(name)) continue;

    const param = statement.parameters[0];
    if (!param) continue;

    const table = tableFor(name, param, source);
    if (table) tables.push(table);
  }

  return tables;
}

export function extractPropsForFiles(files: string[]) {
  return files.flatMap((file) => extractProps(file));
}

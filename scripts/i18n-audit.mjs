import fs from "fs";
import path from "path";
import ts from "typescript";

/**
 * Turkish coverage audit.
 *
 * The Turkish catalogue falls back to the English name and description when a
 * slug is missing from the `text` map in registry-tr.ts. That fallback is
 * silent, so a missing translation looks fine on the page while quietly
 * shipping English copy. This audit fails when any registry slug has no Turkish
 * name or description, and warns when the translation map has a stale key that
 * no longer matches a registry slug.
 */

const root = process.cwd();
const registryPath = path.join(root, "src/registry/registry.ts");
const registryTrPath = path.join(root, "src/registry/registry-tr.ts");

function sourceOf(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  return ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);
}

/** Registry slugs, in declaration order. */
function registrySlugs() {
  const source = sourceOf(registryPath);
  const slugs = [];

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(source) === "registry" &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(element)) continue;
        const slugProp = element.properties.find(
          (p) => ts.isPropertyAssignment(p) && p.name.getText(source) === "slug",
        );
        if (slugProp && ts.isStringLiteral(slugProp.initializer)) {
          slugs.push(slugProp.initializer.text);
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return slugs;
}

/** The `text` translation map: slug -> { name, description } with lengths. */
function translations() {
  const source = sourceOf(registryTrPath);
  const map = new Map();

  function readField(objNode, field) {
    const prop = objNode.properties.find(
      (p) => ts.isPropertyAssignment(p) && p.name.getText(source) === field,
    );
    if (prop && ts.isStringLiteral(prop.initializer)) return prop.initializer.text.trim();
    return "";
  }

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(source) === "text" &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const prop of node.initializer.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        if (!ts.isObjectLiteralExpression(prop.initializer)) continue;
        // Key may be an identifier or a string literal.
        const key = ts.isStringLiteral(prop.name)
          ? prop.name.text
          : prop.name.getText(source).replace(/['"]/g, "");
        map.set(key, {
          name: readField(prop.initializer, "name"),
          description: readField(prop.initializer, "description"),
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return map;
}

function main() {
  const slugs = registrySlugs();
  const map = translations();
  const errors = [];
  const warnings = [];

  if (slugs.length === 0) {
    console.error("Could not parse registry slugs. Aborting.");
    process.exit(1);
  }

  for (const slug of slugs) {
    const entry = map.get(slug);
    if (!entry) {
      errors.push(`${slug}: no Turkish translation (falls back to English)`);
      continue;
    }
    if (!entry.name) errors.push(`${slug}: Turkish name is empty`);
    if (!entry.description) errors.push(`${slug}: Turkish description is empty`);
  }

  const slugSet = new Set(slugs);
  for (const key of map.keys()) {
    if (!slugSet.has(key)) {
      warnings.push(`${key}: translation exists but no registry entry matches it`);
    }
  }

  const covered = slugs.filter((slug) => {
    const entry = map.get(slug);
    return entry && entry.name && entry.description;
  }).length;

  console.log(`Turkish coverage: ${covered}/${slugs.length} registry entries.`);

  if (warnings.length > 0) {
    console.log(`\n${warnings.length} warning(s):`);
    for (const warning of warnings) console.log(`  - ${warning}`);
  }

  if (errors.length > 0) {
    console.error(`\n${errors.length} error(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  console.log("\nTurkish catalogue coverage: complete");
}

main();

import "server-only";

import postcss, { type ChildNode, type Container } from "postcss";
import { readSource } from "@/registry/source";

export type RegistryCssNode = {
  [key: string]: string | RegistryCssNode;
};

function mergeNode(target: RegistryCssNode, key: string, value: string | RegistryCssNode) {
  const current = target[key];

  if (
    current &&
    typeof current !== "string" &&
    typeof value !== "string"
  ) {
    mergeCss(current, value);
    return;
  }

  target[key] = value;
}

function mergeCss(target: RegistryCssNode, source: RegistryCssNode) {
  for (const [key, value] of Object.entries(source)) {
    mergeNode(target, key, value);
  }
  return target;
}

function childrenToObject(container: Container): RegistryCssNode {
  const result: RegistryCssNode = {};

  for (const node of container.nodes ?? []) {
    if (node.type === "comment") continue;

    if (node.type === "decl") {
      result[node.prop] = node.value;
      continue;
    }

    if (node.type === "rule") {
      mergeNode(result, node.selector, childrenToObject(node));
      continue;
    }

    if (node.type === "atrule") {
      // shadcn writes Tailwind v4 theme variables through cssVars.theme.
      // A generic `@theme` entry is otherwise interpreted as containing CSS
      // selectors rather than declarations by the CLI.
      if (node.name === "theme" && node.params === "inline") continue;
      const key = `@${node.name}${node.params ? ` ${node.params}` : ""}`;
      mergeNode(result, key, node.nodes ? childrenToObject(node) : {});
      continue;
    }

    const unreachable: never = node as never;
    throw new Error(`Unsupported CSS node in registry payload: ${(unreachable as ChildNode).type}`);
  }

  return result;
}

/**
 * Converts canonical CSS files into the object form accepted by shadcn's
 * registry `css` field. The CLI merges this object into the consumer's
 * configured Tailwind CSS file, so no project-relative stylesheet import is
 * required.
 */
export function registryStylesFromFiles(files: string[]) {
  const css: RegistryCssNode = {};
  const theme: Record<string, string> = {};

  for (const file of files) {
    const root = postcss.parse(readSource(file), { from: file });
    for (const node of root.nodes) {
      if (
        node.type === "atrule" &&
        node.name === "theme" &&
        node.params === "inline"
      ) {
        for (const child of node.nodes ?? []) {
          if (child.type === "decl") {
            theme[child.prop.replace(/^--/, "")] = child.value;
          }
        }
      }
    }
    mergeCss(css, childrenToObject(root));
  }

  return {
    css,
    ...(Object.keys(theme).length > 0 ? { cssVars: { theme } } : {}),
  };
}

import fs from "fs";
import path from "path";
import ts from "typescript";

/**
 * Registry integrity audit.
 *
 * Every registry entry promises three things the install flow depends on:
 *   1. its source files exist on disk,
 *   2. every registryDependencies slug is a real entry,
 *   3. every npm package its source imports is declared in dependencies.
 *
 * This script parses registry.ts with the TypeScript compiler (syntax only),
 * reads each source file and checks all three. It exits non-zero on any failure
 * so it can gate a commit or CI run. Declared-but-unused dependencies are
 * reported as warnings, not failures.
 *
 * Packages that never need declaring: react, next and their subpaths, plus the
 * project's own "@/" alias imports (those are registryDependencies or shared
 * files, not npm installs).
 *
 * Some blocks import a local helper that itself pulls in an npm package. The
 * block then declares that package so a standalone copy still compiles, even
 * though the block file never names it. HELPER_PACKAGES records those helpers
 * so the unused-dependency warning does not fire on a genuine transitive need.
 */

const root = process.cwd();
const registryPath = path.join(root, "src/registry/registry.ts");

const IGNORED_PACKAGES = new Set(["react", "react-dom", "next"]);

// Local helper module -> npm packages it transitively requires.
const HELPER_PACKAGES = {
  "@/components/primitives/reveal": ["motion"],
};

function isIgnored(specifier) {
  if (specifier.startsWith("@/") || specifier.startsWith(".")) return true;
  if (specifier === "server-only") return true;
  const pkg = packageName(specifier);
  if (IGNORED_PACKAGES.has(pkg)) return true;
  if (pkg === "react" || pkg.startsWith("react/")) return true;
  if (pkg === "next" || pkg.startsWith("next/")) return true;
  return false;
}

/** Turns "@radix-ui/react-dialog/foo" into "@radix-ui/react-dialog". */
function packageName(specifier) {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

/** Reads a string-array property from an object literal node. */
function readArray(objNode, propName, source) {
  const prop = objNode.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.getText(source) === propName,
  );
  if (!prop || !ts.isArrayLiteralExpression(prop.initializer)) return [];
  return prop.initializer.elements
    .filter((el) => ts.isStringLiteral(el))
    .map((el) => el.text);
}

function readString(objNode, propName, source) {
  const prop = objNode.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.getText(source) === propName,
  );
  if (!prop || !ts.isStringLiteral(prop.initializer)) return undefined;
  return prop.initializer.text;
}

/** Parses the exported registry array into plain entry objects. */
function parseRegistry() {
  const code = fs.readFileSync(registryPath, "utf8");
  const source = ts.createSourceFile(registryPath, code, ts.ScriptTarget.Latest, true);
  const entries = [];

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(source) === "registry" &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(element)) continue;
        entries.push({
          slug: readString(element, "slug", source),
          files: readArray(element, "files", source),
          dependencies: readArray(element, "dependencies", source),
          registryDependencies: readArray(element, "registryDependencies", source),
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return entries;
}

/** Extracts bare import/export specifiers from a source file. */
function importsOf(filePath) {
  const code = fs.readFileSync(path.join(root, filePath), "utf8");
  const source = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);
  const specifiers = new Set();

  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specifiers.add(node.moduleSpecifier.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return [...specifiers];
}

function main() {
  const entries = parseRegistry();
  const slugs = new Set(entries.map((e) => e.slug));
  const errors = [];
  const warnings = [];

  if (entries.length === 0) {
    console.error("Could not parse any registry entries. Aborting.");
    process.exit(1);
  }

  for (const entry of entries) {
    const declared = new Set(entry.dependencies);
    const usedDeclared = new Set();

    // 1. Files exist.
    for (const file of entry.files) {
      if (!fs.existsSync(path.join(root, file))) {
        errors.push(`${entry.slug}: missing file ${file}`);
      }
    }

    // 2. registryDependencies resolve.
    for (const dep of entry.registryDependencies) {
      if (!slugs.has(dep)) {
        errors.push(`${entry.slug}: registryDependency "${dep}" is not a registry entry`);
      }
    }

    // 3. Every imported npm package is declared.
    for (const file of entry.files) {
      if (!fs.existsSync(path.join(root, file))) continue;
      if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
      for (const specifier of importsOf(file)) {
        // A local helper may carry a transitive npm need; mark it satisfied.
        const helperPkgs = HELPER_PACKAGES[specifier];
        if (helperPkgs) {
          for (const pkg of helperPkgs) if (declared.has(pkg)) usedDeclared.add(pkg);
        }
        if (isIgnored(specifier)) continue;
        const pkg = packageName(specifier);
        if (declared.has(pkg)) {
          usedDeclared.add(pkg);
        } else {
          errors.push(`${entry.slug}: imports "${pkg}" (in ${file}) but does not declare it`);
        }
      }
    }

    // Declared but never imported: a warning, not a failure.
    for (const dep of declared) {
      // clsx and tailwind-merge back the cn() helper, imported indirectly.
      if (dep === "clsx" || dep === "tailwind-merge") continue;
      if (!usedDeclared.has(dep)) {
        warnings.push(`${entry.slug}: declares "${dep}" but no source file imports it`);
      }
    }
  }

  console.log(`Audited ${entries.length} registry entries.`);

  if (warnings.length > 0) {
    console.log(`\n${warnings.length} warning(s):`);
    for (const warning of warnings) console.log(`  - ${warning}`);
  }

  if (errors.length > 0) {
    console.error(`\n${errors.length} error(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  console.log("\nRegistry integrity: OK");
}

main();

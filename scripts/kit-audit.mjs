import fs from "fs";
import path from "path";
import ts from "typescript";

/**
 * Site kit integrity audit.
 *
 * A kit route points at a skeleton slug and at registry item slugs. Those are
 * plain strings, so a rename or a typo produces a kit that reads fine in the
 * source and quietly links nowhere. Nothing else catches it: the kits are
 * catalogue data, not installable registry entries, so the registry audit does
 * not see them, and TypeScript cannot check a string against another file's
 * data.
 *
 * This audit fails when a kit references a skeleton or registry slug that does
 * not exist, or a theme that is not a real preset id.
 */

const root = process.cwd();
const kitsPath = path.join(root, "src/registry/site-kits.ts");
const registryPath = path.join(root, "src/registry/registry.ts");
const skeletonsPath = path.join(root, "src/registry/skeletons.ts");
const presetsPath = path.join(root, "src/lib/premium-kit/presets.ts");

function sourceOf(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  return ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);
}

/** Every `slug: "..."` in a top-level array declaration of the given name. */
function slugsFrom(filePath, declarationName) {
  const source = sourceOf(filePath);
  const slugs = [];

  function collect(node) {
    if (!ts.isObjectLiteralExpression(node)) return;
    const slugProp = node.properties.find(
      (p) => ts.isPropertyAssignment(p) && p.name.getText(source) === "slug",
    );
    if (slugProp && ts.isStringLiteral(slugProp.initializer)) {
      slugs.push(slugProp.initializer.text);
    }
  }

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(source) === declarationName &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) collect(element);
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return slugs;
}

/** Preset ids, read from the `id: "..."` properties in presets.ts. */
function presetIds() {
  const source = sourceOf(presetsPath);
  const ids = [];

  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText(source) === "id" &&
      ts.isStringLiteral(node.initializer)
    ) {
      ids.push(node.initializer.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return ids;
}

/**
 * The kits, with the slugs each one references. Read structurally rather than
 * by importing, so this runs without a build step.
 */
function readKits() {
  const source = sourceOf(kitsPath);
  const kits = [];

  function stringsInArray(node) {
    if (!node || !ts.isArrayLiteralExpression(node)) return [];
    return node.elements
      .filter((element) => ts.isStringLiteral(element))
      .map((element) => element.text);
  }

  function propertyOf(node, name) {
    return node.properties.find(
      (p) => ts.isPropertyAssignment(p) && p.name.getText(source) === name,
    );
  }

  function readKit(node) {
    const slugProp = propertyOf(node, "slug");
    if (!slugProp || !ts.isStringLiteral(slugProp.initializer)) return null;

    const kit = {
      slug: slugProp.initializer.text,
      themes: stringsInArray(propertyOf(node, "themes")?.initializer),
      skeletons: [],
      blocks: [],
      formItems: [],
    };

    const routesProp = propertyOf(node, "routes");
    if (routesProp && ts.isArrayLiteralExpression(routesProp.initializer)) {
      for (const route of routesProp.initializer.elements) {
        if (!ts.isObjectLiteralExpression(route)) continue;
        const skeletonProp = propertyOf(route, "skeleton");
        if (skeletonProp && ts.isStringLiteral(skeletonProp.initializer)) {
          kit.skeletons.push(skeletonProp.initializer.text);
        }
        kit.blocks.push(...stringsInArray(propertyOf(route, "blocks")?.initializer));
      }
    }

    const formsProp = propertyOf(node, "forms");
    if (formsProp && ts.isArrayLiteralExpression(formsProp.initializer)) {
      for (const form of formsProp.initializer.elements) {
        if (!ts.isObjectLiteralExpression(form)) continue;
        const itemProp = propertyOf(form, "registryItem");
        if (itemProp && ts.isStringLiteral(itemProp.initializer)) {
          kit.formItems.push(itemProp.initializer.text);
        }
      }
    }

    return kit;
  }

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(source) === "siteKits" &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(element)) continue;
        const kit = readKit(element);
        if (kit) kits.push(kit);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return kits;
}

const registrySlugs = new Set(slugsFrom(registryPath, "registry"));
const skeletonSlugs = new Set(slugsFrom(skeletonsPath, "skeletons"));
const themeIds = new Set(presetIds());
const kits = readKits();

const errors = [];

for (const kit of kits) {
  for (const skeleton of kit.skeletons) {
    if (!skeletonSlugs.has(skeleton)) {
      errors.push(`${kit.slug}: route skeleton "${skeleton}" is not a skeleton slug`);
    }
  }
  for (const block of kit.blocks) {
    if (!registrySlugs.has(block)) {
      errors.push(`${kit.slug}: route block "${block}" is not a registry slug`);
    }
  }
  for (const item of kit.formItems) {
    if (!registrySlugs.has(item)) {
      errors.push(`${kit.slug}: form registryItem "${item}" is not a registry slug`);
    }
  }
  for (const theme of kit.themes) {
    if (!themeIds.has(theme)) {
      errors.push(`${kit.slug}: theme "${theme}" is not a preset id`);
    }
  }
}

if (kits.length === 0) {
  console.error("No kits found in site-kits.ts. The audit cannot verify anything.");
  process.exit(1);
}

console.log(`Audited ${kits.length} site kits.`);
console.log();

if (errors.length > 0) {
  for (const error of errors) console.error(`  error  ${error}`);
  console.error();
  console.error(`Site kit references: ${errors.length} broken.`);
  process.exit(1);
}

console.log("Site kit references: OK");

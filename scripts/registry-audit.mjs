import fs from "fs";
import path from "path";
import ts from "typescript";

/**
 * Registry installation audit.
 *
 * The registry is a dependency graph, not just a catalogue. This audit proves
 * that every published item can bring along all local source, shared CSS and
 * npm packages it needs when shadcn installs it into another project.
 */

const root = process.cwd();
const registryPath = path.join(root, "src/registry/registry.ts");
const baseSlug = "premium-kit-base";
const supportedExtensions = [".ts", ".tsx", ".css"];
const ignoredPackages = new Set(["react", "react-dom", "next", "server-only"]);

function packageName(specifier) {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function readProperty(objNode, propName, source) {
  return objNode.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) &&
      property.name.getText(source) === propName,
  );
}

function readArray(objNode, propName, source) {
  const property = readProperty(objNode, propName, source);
  if (!property || !ts.isArrayLiteralExpression(property.initializer)) return [];
  return property.initializer.elements
    .filter((element) => ts.isStringLiteral(element))
    .map((element) => element.text);
}

function readString(objNode, propName, source) {
  const property = readProperty(objNode, propName, source);
  if (!property || !ts.isStringLiteral(property.initializer)) return undefined;
  return property.initializer.text;
}

function readBoolean(objNode, propName, source) {
  const property = readProperty(objNode, propName, source);
  if (!property) return undefined;
  if (property.initializer.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (property.initializer.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

function parseRegistry() {
  const code = fs.readFileSync(registryPath, "utf8");
  const source = ts.createSourceFile(
    registryPath,
    code,
    ts.ScriptTarget.Latest,
    true,
  );
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
          category: readString(element, "category", source),
          registryType: readString(element, "registryType", source),
          files: readArray(element, "files", source),
          cssFiles: readArray(element, "cssFiles", source),
          dependencies: readArray(element, "dependencies", source),
          registryDependencies: readArray(
            element,
            "registryDependencies",
            source,
          ),
          requiresBase: readBoolean(element, "requiresBase", source),
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return entries;
}

function importsOf(filePath) {
  const absolutePath = path.join(root, filePath);
  const code = fs.readFileSync(absolutePath, "utf8");
  const source = ts.createSourceFile(
    filePath,
    code,
    ts.ScriptTarget.Latest,
    true,
  );
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

function toProjectPath(absolutePath) {
  return path.relative(root, absolutePath).split(path.sep).join("/");
}

function resolveLocalImport(fromFile, specifier) {
  let unresolved;
  if (specifier.startsWith("@/")) {
    unresolved = path.join(root, "src", specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    unresolved = path.resolve(path.dirname(path.join(root, fromFile)), specifier);
  } else {
    return undefined;
  }

  const candidates = [
    unresolved,
    ...supportedExtensions.map((extension) => `${unresolved}${extension}`),
    ...supportedExtensions.map((extension) =>
      path.join(unresolved, `index${extension}`),
    ),
  ];
  const match = candidates.find(
    (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
  );
  return match ? toProjectPath(match) : null;
}

function portableTargetFor(file) {
  if (file.startsWith("src/components/")) {
    return `@components/${file.slice("src/components/".length)}`;
  }
  if (file.startsWith("src/lib/")) {
    return `@lib/${file.slice("src/lib/".length)}`;
  }
  if (file.startsWith("src/design/")) {
    return `@lib/premium-kit/${file.slice("src/design/".length)}`;
  }
  return undefined;
}

function effectiveRegistryDependencies(entry) {
  const dependencies = new Set(entry.registryDependencies);
  const requiresBase =
    entry.requiresBase ?? (entry.category !== "theme");
  if (entry.slug !== baseSlug && requiresBase) dependencies.add(baseSlug);
  dependencies.delete(entry.slug);
  return dependencies;
}

function findCycle(entries) {
  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const visiting = new Set();
  const visited = new Set();

  function walk(slug, trail) {
    if (visiting.has(slug)) {
      const start = trail.indexOf(slug);
      return [...trail.slice(start), slug];
    }
    if (visited.has(slug)) return undefined;
    visiting.add(slug);
    const entry = bySlug.get(slug);
    for (const dependency of entry ? effectiveRegistryDependencies(entry) : []) {
      const cycle = walk(dependency, [...trail, slug]);
      if (cycle) return cycle;
    }
    visiting.delete(slug);
    visited.add(slug);
    return undefined;
  }

  for (const entry of entries) {
    const cycle = walk(entry.slug, []);
    if (cycle) return cycle;
  }
  return undefined;
}

function main() {
  const entries = parseRegistry();
  const errors = [];
  const warnings = [];

  if (entries.length === 0) {
    console.error("Could not parse any registry entries. Aborting.");
    process.exit(1);
  }

  const slugs = new Set();
  for (const entry of entries) {
    if (!entry.slug) {
      errors.push("registry.ts: every entry must use a literal string slug");
      continue;
    }
    if (slugs.has(entry.slug)) {
      errors.push(`${entry.slug}: duplicate registry slug`);
    }
    slugs.add(entry.slug);
  }

  const ownersByFile = new Map();
  for (const entry of entries) {
    for (const file of entry.files) {
      const owners = ownersByFile.get(file) ?? new Set();
      owners.add(entry.slug);
      ownersByFile.set(file, owners);
    }
  }

  const base = entries.find((entry) => entry.slug === baseSlug);
  if (!base) {
    errors.push(`${baseSlug}: required base registry entry is missing`);
  } else {
    const requiredBaseFiles = [
      "src/design/tokens.css",
      "src/design/themes.css",
      "src/design/base.css",
      "src/lib/cn.ts",
      "src/components/primitives/layout.tsx",
    ];
    for (const file of requiredBaseFiles) {
      if (!base.files.includes(file)) {
        errors.push(`${baseSlug}: foundation must ship ${file}`);
      }
    }
    if (base.registryType !== "registry:base") {
      errors.push(`${baseSlug}: registryType must be "registry:base"`);
    }
  }

  for (const entry of entries) {
    const declaredPackages = new Set(entry.dependencies);
    const usedPackages = new Set();
    const effectiveDependencies = effectiveRegistryDependencies(entry);
    const ownFiles = new Set(entry.files);

    for (const file of entry.files) {
      const absolutePath = path.join(root, file);
      if (!fs.existsSync(absolutePath)) {
        errors.push(`${entry.slug}: missing published file ${file}`);
        continue;
      }
      if (!portableTargetFor(file)) {
        errors.push(
          `${entry.slug}: ${file} has no portable @components/@lib registry target`,
        );
      }
    }

    for (const cssFile of entry.cssFiles) {
      if (!entry.files.includes(cssFile)) {
        errors.push(
          `${entry.slug}: cssFiles contains ${cssFile}, but files does not publish it`,
        );
      }
      if (!cssFile.endsWith(".css")) {
        errors.push(`${entry.slug}: cssFiles entry is not CSS: ${cssFile}`);
      }
    }

    for (const dependency of effectiveDependencies) {
      if (!slugs.has(dependency)) {
        errors.push(
          `${entry.slug}: registryDependency "${dependency}" is not a registry entry`,
        );
      }
      if (
        dependency.startsWith("http") ||
        dependency.startsWith("@shadcn/")
      ) {
        errors.push(
          `${entry.slug}: keep internal dependencies as Premium Kit slugs; output URLs are generated centrally`,
        );
      }
    }

    for (const file of entry.files) {
      const absolutePath = path.join(root, file);
      if (!fs.existsSync(absolutePath)) continue;
      if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;

      for (const specifier of importsOf(file)) {
        const localTarget = resolveLocalImport(file, specifier);
        if (localTarget === null) {
          errors.push(
            `${entry.slug}: cannot resolve local import "${specifier}" from ${file}`,
          );
          continue;
        }
        if (localTarget) {
          if (ownFiles.has(localTarget)) continue;

          const targetOwners = ownersByFile.get(localTarget);
          if (!targetOwners || targetOwners.size === 0) {
            errors.push(
              `${entry.slug}: ${file} imports ${localTarget}, but no registry item publishes it`,
            );
            continue;
          }

          const supplyingDependency = [...targetOwners].find((owner) =>
            effectiveDependencies.has(owner),
          );
          if (!supplyingDependency) {
            errors.push(
              `${entry.slug}: ${file} imports ${localTarget}; add one of [${[
                ...targetOwners,
              ].join(", ")}] to registryDependencies or publish the file with the item`,
            );
          }
          continue;
        }

        const pkg = packageName(specifier);
        if (
          ignoredPackages.has(pkg) ||
          pkg === "react" ||
          pkg.startsWith("react/") ||
          pkg === "next" ||
          pkg.startsWith("next/")
        ) {
          continue;
        }
        if (declaredPackages.has(pkg)) {
          usedPackages.add(pkg);
        } else {
          errors.push(
            `${entry.slug}: imports npm package "${pkg}" in ${file} but does not declare it`,
          );
        }
      }
    }

    for (const dependency of declaredPackages) {
      // Component files consume these through the shared cn() helper. Keeping
      // them on leaf items is backwards-compatible with older direct installs.
      if (dependency === "clsx" || dependency === "tailwind-merge") continue;
      if (!usedPackages.has(dependency)) {
        warnings.push(
          `${entry.slug}: declares npm package "${dependency}" but its published files do not import it`,
        );
      }
    }
  }

  const cycle = findCycle(entries);
  if (cycle) {
    errors.push(`registry dependency cycle: ${cycle.join(" -> ")}`);
  }

  if (base) {
    const css = base.cssFiles
      .filter((file) => fs.existsSync(path.join(root, file)))
      .map((file) => fs.readFileSync(path.join(root, file), "utf8"))
      .join("\n");
    const requiredCssContracts = [
      ["token variables", "--pk-bg"],
      ["Tailwind token bridge", "@theme inline"],
      ["prose typography", ".pk-prose"],
    ];
    for (const [label, marker] of requiredCssContracts) {
      if (!css.includes(marker)) {
        errors.push(`${baseSlug}: shared CSS is missing ${label} (${marker})`);
      }
    }
  }

  const outputSource = fs.readFileSync(
    path.join(root, "src/registry/registry-output.ts"),
    "utf8",
  );
  if (!outputSource.includes("registryDependencyUrls(item, requestUrl)")) {
    errors.push(
      "registry-output.ts: registry dependencies must be emitted as full Premium Kit URLs",
    );
  }
  for (const alias of ["@components/", "@lib/"]) {
    if (!outputSource.includes(alias)) {
      errors.push(
        `registry-output.ts: portable shadcn target placeholder ${alias} is missing`,
      );
    }
  }

  const nextConfig = fs.readFileSync(
    path.join(root, "next.config.ts"),
    "utf8",
  );
  const traceMarkers = [
    '"/r/*"',
    '"src/components/blocks/**/*"',
    '"src/components/motion/**/*"',
    '"src/components/primitives/**/*"',
    '"src/design/*.css"',
    '"src/lib/cn.ts"',
    '"src/lib/premium-kit/**/*"',
  ];
  for (const marker of traceMarkers) {
    if (!nextConfig.includes(marker)) {
      errors.push(
        `next.config.ts: dynamic registry routes must trace runtime source (${marker})`,
      );
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

  console.log("\nRegistry installation contract: OK");
}

main();

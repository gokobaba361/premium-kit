import "server-only";

import {
  PREMIUM_KIT_BASE_SLUG,
  registryDependencySlugs,
  type RegistryItem,
} from "@/registry/registry";
import { registryStylesFromFiles } from "@/registry/registry-css";
import { readSources } from "@/registry/source";

export type RegistryFileType =
  | "registry:component"
  | "registry:lib"
  | "registry:style"
  | "registry:ui";

export function itemTypeFor(item: RegistryItem) {
  if (item.registryType) return item.registryType;
  if (item.category === "block") return "registry:block" as const;
  if (item.category === "theme") return "registry:theme" as const;
  return "registry:ui" as const;
}

function fileTypeFor(file: string, item: RegistryItem): RegistryFileType {
  if (file.startsWith("src/lib/")) return "registry:lib";
  if (file.endsWith(".css")) return "registry:style";
  if (item.category === "primitive") return "registry:ui";
  return "registry:component";
}

export function portableTargetFor(file: string) {
  if (file.startsWith("src/components/")) {
    return `@components/${file.slice("src/components/".length)}`;
  }
  if (file.startsWith("src/lib/")) {
    return `@lib/${file.slice("src/lib/".length)}`;
  }
  if (file.startsWith("src/design/")) {
    return `@lib/premium-kit/${file.slice("src/design/".length)}`;
  }

  throw new Error(
    `No portable registry target for "${file}". Use @components, @ui, @lib or @hooks.`,
  );
}

export function registryItemUrl(slug: string, requestUrl: string) {
  return new URL(`/r/${slug}.json`, requestUrl).href;
}

export function registryDependencyUrls(item: RegistryItem, requestUrl: string) {
  return registryDependencySlugs(item).map((slug) => registryItemUrl(slug, requestUrl));
}

export function buildRegistryItemPayload(item: RegistryItem, requestUrl: string) {
  const cssFiles = new Set(item.cssFiles ?? []);
  const styles = item.cssFiles?.length
    ? registryStylesFromFiles(item.cssFiles)
    : undefined;
  const files = readSources(item.files)
    .filter((file) => !cssFiles.has(file.path))
    .map((file) => ({
      path: file.path,
      target: portableTargetFor(file.path),
      type: fileTypeFor(file.path, item),
      content: file.code,
    }));

  const payload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.slug,
    type: itemTypeFor(item),
    title: item.name,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: registryDependencyUrls(item, requestUrl),
    files,
    ...(styles?.css && Object.keys(styles.css).length > 0
      ? { css: styles.css }
      : {}),
    ...(styles?.cssVars ? { cssVars: styles.cssVars } : {}),
    ...(item.slug === PREMIUM_KIT_BASE_SLUG
      ? {
          config: {
            rsc: true,
            tsx: true,
            registries: {
              "@premium-kit": `${new URL(requestUrl).origin}/r/{name}.json`,
            },
          },
          docs: "Premium Kit base installs shared tokens, global styles, cn and layout primitives.",
        }
      : {}),
  };

  return payload;
}

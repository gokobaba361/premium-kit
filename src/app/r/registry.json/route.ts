import { registry } from "@/registry/registry";

/**
 * Registry index. Lists everything available at /r/<name>.json, so a person or
 * a tool can discover the set without reading the source tree.
 */

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "premium-kit",
    homepage: "https://your-domain.com",
    items: registry.map((item) => ({
      name: item.slug,
      title: item.name,
      type:
        item.category === "block"
          ? "registry:block"
          : item.category === "theme"
            ? "registry:theme"
            : "registry:ui",
      description: item.description,
      dependencies: item.dependencies ?? [],
      registryDependencies: item.registryDependencies ?? [],
    })),
  });
}

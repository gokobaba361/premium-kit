import { registry } from "@/registry/registry";
import {
  itemTypeFor,
  registryDependencyUrls,
} from "@/registry/registry-output";

/**
 * Registry index. Lists everything available at /r/<name>.json, so a person or
 * a tool can discover the set without reading the source tree.
 */

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return Response.json({
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "premium-kit",
    homepage: new URL(request.url).origin,
    items: registry.map((item) => ({
      name: item.slug,
      title: item.name,
      type: itemTypeFor(item),
      description: item.description,
      dependencies: item.dependencies ?? [],
      registryDependencies: registryDependencyUrls(item, request.url),
    })),
  });
}

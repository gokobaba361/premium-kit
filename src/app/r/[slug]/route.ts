import { registry, itemBySlug } from "@/registry/registry";
import { readSources } from "@/registry/source";

/**
 * shadcn CLI compatible registry endpoint.
 *
 *   npx shadcn@latest add https://your-domain.com/r/button.json
 *
 * The CLI fetches this JSON, writes the files into the target project and
 * installs the npm dependencies listed here. Deploy the site, then the same
 * URL works from any project on your machine.
 */

export const dynamic = "force-static";

export function generateStaticParams() {
  return registry.map((item) => ({ slug: `${item.slug}.json` }));
}

function typeFor(category: string) {
  if (category === "block") return "registry:block";
  if (category === "theme") return "registry:theme";
  return "registry:ui";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const name = slug.replace(/\.json$/, "");
  const item = itemBySlug(name);

  if (!item) {
    return Response.json({ error: `Unknown registry item: ${name}` }, { status: 404 });
  }

  const files = readSources(item.files).map((file) => ({
    path: file.path,
    // The CLI writes into the consumer's own tree, so ship a target too.
    target: file.path.replace(/^src\//, ""),
    type: typeFor(item.category),
    content: file.code,
  }));

  return Response.json({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.slug,
    type: typeFor(item.category),
    title: item.name,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files,
  });
}

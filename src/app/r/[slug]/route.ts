import { itemBySlug } from "@/registry/registry";
import { buildRegistryItemPayload } from "@/registry/registry-output";

/**
 * shadcn CLI compatible registry endpoint.
 *
 *   npx shadcn@latest add https://your-domain.com/r/button.json
 *
 * The CLI fetches this JSON, writes the files into the target project and
 * installs the npm dependencies listed here. Deploy the site, then the same
 * URL works from any project on your machine.
 */

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const name = slug.replace(/\.json$/, "");
  const item = itemBySlug(name);

  if (!item) {
    return Response.json({ error: `Unknown registry item: ${name}` }, { status: 404 });
  }

  return Response.json(buildRegistryItemPayload(item, request.url));
}

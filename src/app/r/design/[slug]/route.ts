import { presetById, presets } from "@/design/presets";
import { designMarkdown } from "@/registry/design-md";

/**
 * Per-theme DESIGN.md, generated at build time from the shipping token files.
 *
 *   /r/design/obsidian.md
 *
 * The slug carries a `.md` suffix so the file downloads and previews as
 * Markdown, matching the `/r/<slug>.json` convention. generateStaticParams
 * prerenders one route per theme.
 */

export const dynamic = "force-static";

export function generateStaticParams() {
  return presets.map((preset) => ({ slug: `${preset.id}.md` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const id = slug.replace(/\.md$/, "");
  const preset = presetById(id);

  if (!preset) {
    return new Response(`Unknown theme: ${id}`, { status: 404 });
  }

  return new Response(designMarkdown(preset), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

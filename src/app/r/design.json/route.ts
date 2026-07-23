import { designThemes } from "@/registry/design-md";

/**
 * Index of the per-theme DESIGN.md exports, so an agent can discover every
 * visual system and fetch the one that matches a brief.
 */

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    $schema: "https://premium-kit.dev/schema/design-index.json",
    name: "premium-kit-design-systems",
    count: designThemes.length,
    themes: designThemes,
  });
}

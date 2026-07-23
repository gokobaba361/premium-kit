import { presets } from "@/design/presets";
import { registry } from "@/registry/registry";
import { skeletons } from "@/registry/skeletons";
import { buildPhases, qualityGates } from "@/registry/site-planning";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    version: "1.0.0",
    name: "premium-kit-ai-contract",
    description:
      "Machine-readable instructions for planning and building owned, production-quality sites with Premium Kit.",
    languages: ["en", "tr"],
    principles: [
      "Plan the audience, outcome and sitemap before selecting components.",
      "Treat themes as complete visual systems, not palette swaps.",
      "Compose pages from registry items and keep delivered source owned by the user.",
      "Use motion as emphasis and never as a dependency for reaching content.",
      "Prefer sourced proof and concrete content over decorative claims.",
    ],
    workflow: buildPhases.map((phase, index) => ({ order: index + 1, phase })),
    qualityGates,
    endpoints: {
      registry: "/r/registry.json",
      catalog: "/r/catalog.json",
      recipes: "/r/site-recipes.json",
      guide: "/r/AI-GUIDE.md",
      guideTr: "/r/AI-GUIDE.tr.md",
      briefTemplate: "/r/SITE-BRIEF.md",
      briefTemplateTr: "/r/SITE-BRIEF.tr.md",
      designIndex: "/r/design.json",
      projectRecipeExample: "/r/project-recipe.example.json",
    },
    inventory: {
      items: registry.length,
      recipes: skeletons.length,
      themes: presets.length,
    },
    themes: presets.map((preset) => ({
      id: preset.id,
      name: preset.name,
      sectors: preset.sectors,
      scheme: preset.scheme,
      designRead: preset.read,
      displayFont: preset.display.name,
      dials: {
        variance: preset.variance,
        motion: preset.motion,
        density: preset.density,
      },
      designSpec: `/r/design/${preset.id}.md`,
    })),
  });
}

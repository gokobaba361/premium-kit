import { siteKits } from "@/registry/site-kits";

export const dynamic = "force-static";

/**
 * The multi-page layer for agents.
 *
 * /r/site-recipes.json describes one page's section order. This describes a
 * whole site: the route tree, which recipe drives each route, the content model
 * behind it, the schema.org type it should emit, where each form's data goes,
 * the legal surfaces the sector requires, and the operational states that must
 * exist before it is done.
 */
export function GET() {
  return Response.json({
    version: "1.0.0",
    name: "premium-kit-site-kits",
    description:
      "Multi-page sector site kits: route tree, content model, structured data, forms, legal surfaces and operational states.",
    registry: "/r/registry.json",
    recipes: "/r/site-recipes.json",
    note: "Legal surfaces state obligations that apply in Türkiye. They are a build checklist, not legal advice.",
    kits: siteKits.map((kit) => ({
      id: kit.slug,
      name: kit.name,
      sector: kit.sector,
      description: kit.description,
      primaryOutcome: kit.outcome,
      recommendedThemes: kit.themes,
      routes: kit.routes.map((route) => ({
        path: route.path,
        name: route.name,
        purpose: route.purpose,
        required: route.required,
        recipe: route.skeleton ?? null,
        recipeUrl: route.skeleton ? `/r/site-recipes.json#${route.skeleton}` : null,
        registryItems: (route.blocks ?? []).map((slug) => ({
          slug,
          installUrl: `/r/${slug}.json`,
        })),
        structuredData: route.structuredData ?? null,
      })),
      contentModel: kit.contentModel,
      forms: kit.forms.map((form) => ({
        name: form.name,
        route: form.route,
        registryItem: form.registryItem,
        installUrl: `/r/${form.registryItem}.json`,
        collects: form.collects,
        destination: form.destination,
      })),
      legalSurfaces: kit.legal,
      operationalStates: kit.operationalStates,
    })),
  });
}

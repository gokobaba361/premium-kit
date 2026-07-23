import { skeletons } from "@/registry/skeletons";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    version: "1.0.0",
    name: "premium-kit-site-recipes",
    description:
      "Purpose-led page structures composed from installable Premium Kit registry items.",
    registry: "/r/registry.json",
    recipes: skeletons.map((skeleton) => ({
      id: skeleton.slug,
      name: skeleton.name,
      audience: skeleton.audience,
      description: skeleton.description,
      primaryOutcome: skeleton.outcome,
      recommendedThemes: skeleton.themes,
      sections: skeleton.sections.map((section, index) => ({
        order: index + 1,
        registryItem: section.slug,
        label: section.label,
        purpose: section.purpose,
        installUrl: `/r/${section.slug}.json`,
      })),
    })),
  });
}

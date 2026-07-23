import { qualityGates } from "@/registry/site-planning";

export const dynamic = "force-static";

export function GET() {
  const body = `# Premium Kit AI Guide

Premium Kit is a source-owned component, block, theme and site-recipe registry.

## Required workflow

1. Read \`/r/ai-manifest.json\`.
2. Turn the business request into an audience, primary outcome and sitemap.
3. Read \`/r/site-recipes.json\` and choose the closest purpose-led recipe.
4. Choose one complete visual direction from the manifest, then read its
   \`/r/design/<theme>.md\` spec for the exact colour, type, shape and motion rules.
5. Read \`/r/catalog.json\` to compare intended use, cautions, rendering and compatibility.
6. Read \`/r/registry.json\` and install suitable items. Do not recreate approximations.
7. Adapt the recipe to the real content and user flow.
8. Run every quality gate before delivery.

## Quality gates

${qualityGates.map((gate) => `- ${gate}`).join("\n")}

## Content rules

- Never invent customer names, logos, certifications, metrics or testimonials.
- Do not use lorem ipsum.
- One page must have one primary outcome.
- Headings must communicate concrete value, not generic aspiration.
- Images need a job: product evidence, atmosphere, identity or explanation.

## Delivery contract

Return editable source code, list assumptions, state external dependencies and report the checks that were completed.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

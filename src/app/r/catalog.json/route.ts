import { registryCatalogV2 } from "@/registry/registry-metadata";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 2,
    name: "premium-kit-catalog",
    description:
      "AI-oriented discovery metadata layered over the shadcn-compatible Premium Kit registry.",
    officialRegistry: "/r/registry.json",
    generatedAtBuildTime: true,
    items: registryCatalogV2,
  });
}

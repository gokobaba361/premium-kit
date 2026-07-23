import { buildBriefTemplate } from "@/registry/site-planning";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildBriefTemplate("tr"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

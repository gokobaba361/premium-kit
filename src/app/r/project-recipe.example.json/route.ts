import { buildProjectRecipe, type SiteBriefInput } from "@/registry/site-planning";

/**
 * A worked example of the downloadable project recipe.
 *
 * The AI brief builder produces this shape client-side and offers it as a
 * download. This endpoint publishes one filled-in example so an agent can learn
 * the schema without running the builder.
 */

export const dynamic = "force-static";

const exampleBrief: SiteBriefInput = {
  projectName: "North Dental Clinic",
  summary:
    "A four-location family dental practice that wants same-week appointments to be the obvious next step.",
  audience: "Local families comparing dental practices",
  siteType: "service-business",
  primaryGoal: "Appointment request",
  visualDirection: "clinic",
  motion: "low",
  pages: "Home, services, team, locations, contact",
};

export function GET() {
  return Response.json(buildProjectRecipe(exampleBrief, "en"));
}

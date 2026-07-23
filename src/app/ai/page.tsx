import type { Metadata } from "next";
import { AiBuilderPage } from "@/components/site/ai-builder-page";

export const metadata: Metadata = {
  title: "Build a site with AI",
  description:
    "Turn a business brief into a Premium Kit sitemap, visual direction, component recipe and production prompt.",
};

export default function AiPage() {
  return <AiBuilderPage language="en" />;
}

import type { Metadata } from "next";
import { SourcesCatalog } from "@/components/site/sources-catalog";

export const metadata: Metadata = {
  title: "Open-source research",
  description: "MIT-licensed GitHub sources and the option backlog derived from them.",
};

export default function SourcesPage() {
  return <SourcesCatalog language="en" />;
}

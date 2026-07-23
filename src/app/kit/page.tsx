import type { Metadata } from "next";
import { KitBrowser } from "./kit-browser";

export const metadata: Metadata = {
  title: "Component guide",
  description: "Every primitive and state in the kit, previewable across all twelve sector themes.",
};

export default function KitPage() {
  return <KitBrowser />;
}

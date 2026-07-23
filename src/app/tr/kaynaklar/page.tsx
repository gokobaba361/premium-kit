import type { Metadata } from "next";
import { SourcesCatalog } from "@/components/site/sources-catalog";

export const metadata: Metadata = {
  title: "Açık kaynak araştırması",
  description: "MIT lisanslı GitHub kaynakları ve bunlardan çıkarılan yeni seçenek planı.",
};

export default function TurkishSourcesPage() {
  return <SourcesCatalog language="tr" />;
}

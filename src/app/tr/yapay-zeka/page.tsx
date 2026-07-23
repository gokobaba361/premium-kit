import type { Metadata } from "next";
import { AiBuilderPage } from "@/components/site/ai-builder-page";

export const metadata: Metadata = {
  title: "AI ile site yap",
  description:
    "İş brief’ini Premium Kit site haritasına, görsel yöne, bileşen reçetesine ve üretim komutuna dönüştür.",
};

export default function TurkishAiPage() {
  return <AiBuilderPage language="tr" />;
}

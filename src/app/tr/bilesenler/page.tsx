import type { Metadata } from "next";
import { Container } from "@/components/primitives/layout";
import { PageHeader } from "@/components/blocks/page-header";
import { categoriesTr, registryTr } from "@/registry/registry-tr";
import { ComponentsBrowser } from "@/app/components/components-browser";

export const metadata: Metadata = {
  title: "Bileşenler",
  description: "Kütüphanedeki tüm temel bileşenleri, blokları, temaları ve hareketleri incele.",
};

export default function TurkishComponentsIndex() {
  return (
    <div lang="tr">
      <PageHeader
        title="Bileşenler"
        intro="Her parça kopyalanabilir kaynak koduyla gelir. Kategoriye göre filtrele, yaptığı işe göre ara ve sayfasından kurulum komutuna ulaş."
        trail={[
          { label: "Kütüphane", href: "/tr" },
          { label: "Bileşenler", href: "/tr/bilesenler" },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-12">
          <ComponentsBrowser items={registryTr} language="tr" />

          <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-4">
            {categoriesTr.map((category) => (
              <div key={category.id} className="flex flex-col gap-2">
                <p className="text-[0.9375rem] font-medium">{category.label}</p>
                <p className="text-sm leading-relaxed text-muted">{category.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}

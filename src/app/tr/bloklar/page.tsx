import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { Container } from "@/components/primitives/layout";
import { registryTr } from "@/registry/registry-tr";

export const metadata: Metadata = {
  title: "Blok kütüphanesi",
  description: "Hero, özellikler, güven, fiyatlandırma, form ve içerik bölümleri.",
};

const blocks = registryTr.filter((item) => item.category === "block");

export default function TurkishBlocksPage() {
  return (
    <div lang="tr">
      <PageHeader
        title="Blok kütüphanesi"
        intro={`${blocks.length} tam sayfa bölümü. Her blok içeriği prop olarak alır ve on iki sektör temasının tamamıyla çalışır.`}
        trail={[
          { label: "Kütüphane", href: "/tr" },
          { label: "Bloklar", href: "/tr/bloklar" },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col justify-between gap-5 rounded-pk border border-line bg-subtle p-6 md:flex-row md:items-center">
            <div>
              <h2 className="display-3">Nereden başlayacağını bilmiyor musun?</h2>
              <p className="measure mt-2 text-sm leading-relaxed text-muted">
                Önce sayfanın amacına uygun iskeleti seç; ardından içindeki blokları değiştir.
              </p>
            </div>
            <Link
              href="/tr/iskeletler"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent"
            >
              Site iskeletlerini aç
              <ArrowRight size={15} weight="bold" aria-hidden />
            </Link>
          </div>

          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block) => (
              <li key={block.slug}>
                <Link
                  href={`/tr/bilesenler/${block.slug}`}
                  className="group flex h-full flex-col rounded-pk border border-line bg-elevated p-5 transition-colors hover:border-strong"
                >
                  <span className="font-mono text-xs text-faint">{block.slug}</span>
                  <h2 className="mt-3 text-[1.0625rem] font-medium">{block.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{block.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent">
                    Ayrıntıları aç
                    <ArrowRight
                      size={14}
                      weight="bold"
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
    </div>
  );
}

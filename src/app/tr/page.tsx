import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { presets } from "@/design/presets";
import { Container } from "@/components/primitives/layout";
import { ButtonLink } from "@/components/primitives/button";
import { Rule } from "@/components/primitives/surface";

export const metadata: Metadata = {
  title: "Premium site kütüphanesi",
  description: "Türkçe bileşen, blok, site iskeleti ve sektör teması kataloğu.",
};

const built = new Set(["obsidian", "bone", "forest", "cobalt", "clinic", "terracotta"]);

export default function TurkishKitIndex() {
  return (
    <main lang="tr" className="py-20 md:py-28">
      <Container>
        <header className="flex flex-col gap-5">
          <p className="font-mono text-xs text-accent">TÜRKÇE KATALOG</p>
          <h1 className="display-1 max-w-[18ch] text-balance">
            Birbirine benzeyen şablonlar değil, farklı siteler kurmak için bir sistem.
          </h1>
          <p className="measure text-lg leading-relaxed text-muted">
            Bileşenler, tam sayfa blokları, sektör temaları ve amaç odaklı site iskeletleri.
            Her parçanın kaynak kodu sende kalır.
          </p>
        </header>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/tr/yapay-zeka" size="lg">
            AI ile site yap
          </ButtonLink>
          <ButtonLink href="/tr/bilesenler" size="lg" variant="secondary">
            Bileşenleri incele
          </ButtonLink>
          <ButtonLink href="/tr/bloklar" size="lg" variant="secondary">
            Blok kütüphanesi
          </ButtonLink>
          <ButtonLink href="/tr/iskeletler" size="lg" variant="secondary">
            Site iskeletleri
          </ButtonLink>
          <ButtonLink href="/tr/kaynaklar" size="lg" variant="secondary">
            GitHub kaynakları
          </ButtonLink>
        </div>

        <Rule className="mt-14" />

        <div className="mt-14">
          <p className="font-mono text-xs text-accent">12 SEKTÖR TEMASI</p>
          <h2 className="mt-2 display-2">Aynı yapı, farklı karakter</h2>
          <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
            Renk dışında tipografi, köşe yapısı, yoğunluk ve hareket karakteri de değişir.
          </p>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {presets.map((preset) => {
            const ready = built.has(preset.id);
            const card = (
              <article
                className="flex h-full flex-col gap-5 rounded-pk border border-line bg-elevated p-6 transition-colors hover:border-strong"
                style={{ borderTopColor: preset.swatch.accent, borderTopWidth: 3 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="display-3">{preset.name}</h3>
                    <p className="mt-1 text-sm text-faint">{preset.sectors.join(", ")}</p>
                  </div>
                  <div className="flex shrink-0 gap-1.5" aria-hidden>
                    {[preset.swatch.bg, preset.swatch.fg, preset.swatch.accent].map((color) => (
                      <span
                        key={color}
                        className="size-6 rounded-full border border-line"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-muted">{preset.read}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                  {ready ? (
                    <Link
                      href={`/templates/${preset.id}`}
                      className="flex items-center gap-1.5 hover:text-accent"
                    >
                      Örnek şablonu aç
                      <ArrowUpRight size={15} weight="bold" aria-hidden />
                    </Link>
                  ) : (
                    <span className="text-faint">Tema hazır, tam şablon sırada</span>
                  )}
                  <a
                    href={`/r/design/${preset.id}.md`}
                    className="flex items-center gap-1.5 text-muted hover:text-accent"
                  >
                    Tasarım spesi
                    <ArrowUpRight size={15} weight="bold" aria-hidden />
                  </a>
                </div>
              </article>
            );

            return <li key={preset.id}>{card}</li>;
          })}
        </ul>
      </Container>
    </main>
  );
}

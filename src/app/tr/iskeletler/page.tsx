import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { skeletons } from "@/registry/skeletons";
import { skeletonTr as text } from "@/registry/skeletons-tr";
import { itemBySlugTr } from "@/registry/registry-tr";

export const metadata: Metadata = {
  title: "Site iskeletleri",
  description: "Pazarlama, e-ticaret, uygulama, dokümantasyon, etkinlik ve kurumsal siteler için bölüm sıraları.",
};

export default function TurkishSkeletonsPage() {
  return (
    <div lang="tr">
      <PageHeader
        title="Site iskeletleri"
        intro="Blok kütüphanesinden oluşturulmuş on kanıtlanmış sayfa yapısı. Önce hiyerarşiyi seç, sonra blokları ve temayı değiştir."
        trail={[
          { label: "Kütüphane", href: "/tr" },
          { label: "İskeletler", href: "/tr/iskeletler" },
        ]}
      />

      <main className="py-14">
        <Container>
          <aside className="mb-12 flex flex-col items-start justify-between gap-5 rounded-pk border border-line bg-subtle p-5 sm:flex-row sm:items-center md:p-6">
            <div>
              <p className="font-mono text-xs text-accent">BRIEF İLE BAŞLA</p>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                İskeleti ve görsel sistemi seç; kodlama aracına vereceğin eksiksiz üretim
                komutunu oluştur.
              </p>
            </div>
            <ButtonLink href="/tr/yapay-zeka" variant="secondary">
              AI komutu oluştur
            </ButtonLink>
          </aside>

          <div className="grid gap-5 lg:grid-cols-2">
            {skeletons.map((skeleton) => {
              const localized = text[skeleton.slug];
              return (
                <article
                  key={skeleton.slug}
                  className="rounded-pk border border-line bg-elevated p-6"
                >
                  <p className="font-mono text-xs text-accent">{localized.audience}</p>
                  <h2 className="mt-2 display-3">
                    <Link
                      href={`/tr/iskeletler/${skeleton.slug}`}
                      className="hover:text-accent"
                    >
                      {localized.name}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {localized.description}
                  </p>

                  <Link
                    href={`/tr/iskeletler/${skeleton.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent"
                  >
                    Canlı önizleme
                    <ArrowUpRight size={15} weight="bold" aria-hidden />
                  </Link>

                  <div className="mt-5 flex items-center justify-between border-y border-line py-3 text-sm">
                    <span className="text-faint">Ana hedef</span>
                    <span>{localized.outcome}</span>
                  </div>

                  <ol className="mt-5 grid gap-2 sm:grid-cols-2">
                    {skeleton.sections.map((section, index) => (
                      <li key={`${skeleton.slug}-${section.slug}`}>
                        <Link
                          href={`/tr/bilesenler/${section.slug}`}
                          className="group flex items-center gap-3 rounded-pk-sm border border-line p-3 transition-colors hover:border-strong"
                        >
                          <span className="font-mono text-xs text-faint">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm">
                            {itemBySlugTr(section.slug)?.name ?? section.label}
                          </span>
                          <ArrowRight
                            size={13}
                            weight="bold"
                            aria-hidden
                            className="text-faint transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {skeleton.themes.map((theme) => (
                      <span
                        key={theme}
                        className="rounded-pk-pill border border-line px-2.5 py-1 text-xs text-muted"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </main>
    </div>
  );
}

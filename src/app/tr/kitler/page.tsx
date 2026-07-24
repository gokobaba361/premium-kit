import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { siteKits, requiredRoutes } from "@/registry/site-kits";
import { siteKitTr } from "@/registry/site-kits-tr";

export const metadata: Metadata = {
  title: "Sektör site kitleri",
  description:
    "Çok sayfalı site kitleri: her sektörün gerçekten ihtiyaç duyduğu rota ağacı, içerik modeli, yapılandırılmış veri, formlar, yasal yüzeyler ve operasyonel durumlar.",
};

export default function TurkishKitsPage() {
  return (
    <div lang="tr">
      <PageHeader
        title="Sektör site kitleri"
        intro="İskelet tek bir sayfanın bölüm sırasıdır. Kit ise sitenin tamamıdır: hangi rotalar var, arkalarında hangi içerik durur, formlar neyi toplar ve sektörün gerçekten gerektirdiği yasal yüzeyler nelerdir."
        trail={[
          { label: "Kütüphane", href: "/tr" },
          { label: "Site kitleri", href: "/tr/kitler" },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-12">
          <aside className="flex flex-col items-start justify-between gap-5 rounded-pk border border-line bg-subtle p-5 sm:flex-row sm:items-center md:p-6">
            <div>
              <p className="font-mono text-xs text-accent">KİTLE BAŞLA</p>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                Her kit rotalarını kurulum sırasıyla listeler; önce zorunlu seti yayına alır,
                kalanını sürpriz değil, açıkça yazılmış bir liste olarak tutarsın.
              </p>
            </div>
            <ButtonLink href="/r/site-kits.json" variant="secondary">
              JSON olarak kitler
            </ButtonLink>
          </aside>

          <ul className="grid gap-5 lg:grid-cols-2">
            {siteKits.map((kit) => {
              const localized = siteKitTr[kit.slug];
              const core = requiredRoutes(kit).length;
              return (
                <li key={kit.slug}>
                  <article className="flex h-full flex-col rounded-pk border border-line bg-elevated p-6 md:p-7">
                    <p className="font-mono text-xs text-accent">{localized.sector}</p>
                    <h2 className="display-3 mt-2">
                      <Link href={`/tr/kitler/${kit.slug}`} className="hover:text-accent">
                        {localized.name}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {localized.description}
                    </p>

                    <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-sm">
                      <div>
                        <dt className="text-xs text-faint">Zorunlu rota</dt>
                        <dd className="mt-1 font-mono tabular-nums">{core}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-faint">Form</dt>
                        <dd className="mt-1 font-mono tabular-nums">{kit.forms.length}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-faint">Yasal sayfa</dt>
                        <dd className="mt-1 font-mono tabular-nums">{kit.legal.length}</dd>
                      </div>
                    </dl>

                    <p className="mt-5 text-sm text-muted">
                      <span className="text-faint">Hedef</span> {localized.outcome}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {kit.themes.map((theme) => (
                        <span
                          key={theme}
                          className="rounded-pk-pill border border-line px-2.5 py-1 text-xs text-muted"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/tr/kitler/${kit.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium hover:text-accent"
                    >
                      Kiti aç
                      <ArrowUpRight size={15} weight="bold" aria-hidden />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>

          <section className="rounded-pk border border-line bg-subtle p-6 md:p-8">
            <h2 className="display-3">Yasal yüzeyler bir kontrol listesidir, hukuki görüş değil</h2>
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Her kitte listelenen yasal sayfalar, o sektörün Türkiye&rsquo;de normalde ihtiyaç duyduğu
              sayfalardır; lansmanda unutulmasınlar diye buradalar. İçlerine ne yazılacağı bu kitin
              değil, bir hukukçunun işidir.
            </p>
          </section>
        </Container>
      </main>
    </div>
  );
}

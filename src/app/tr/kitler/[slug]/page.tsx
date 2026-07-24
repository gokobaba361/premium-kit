import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/blocks/page-header";
import { Container } from "@/components/primitives/layout";
import { siteKits, kitBySlug } from "@/registry/site-kits";
import { siteKitTr } from "@/registry/site-kits-tr";
import { itemBySlugTr } from "@/registry/registry-tr";

export function generateStaticParams() {
  return siteKits.map((kit) => ({ slug: kit.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const localized = siteKitTr[slug];
  if (!localized) return { title: "Bulunamadı" };
  return { title: `${localized.name} kiti`, description: localized.description };
}

export default async function TurkishKitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kit = kitBySlug(slug);
  const localized = siteKitTr[slug];
  if (!kit || !localized) notFound();

  const core = kit.routes.filter((route) => route.required).length;

  return (
    <div lang="tr">
      <PageHeader
        title={localized.name}
        intro={localized.description}
        trail={[
          { label: "Kütüphane", href: "/tr" },
          { label: "Site kitleri", href: "/tr/kitler" },
          { label: localized.name, href: `/tr/kitler/${kit.slug}` },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-14">
          <section className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-pk border border-line bg-elevated p-5">
              <p className="text-xs text-faint">Ana hedef</p>
              <p className="mt-2 text-[0.9375rem] font-medium">{localized.outcome}</p>
            </div>
            <div className="rounded-pk border border-line bg-elevated p-5">
              <p className="text-xs text-faint">Rotalar</p>
              <p className="mt-2 text-[0.9375rem] font-medium">
                {core} zorunlu, {kit.routes.length - core} sonra
              </p>
            </div>
            <div className="rounded-pk border border-line bg-elevated p-5">
              <p className="text-xs text-faint">Önerilen sistemler</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {kit.themes.map((theme) => (
                  <Link
                    key={theme}
                    href={`/templates/${theme}`}
                    className="rounded-pk-pill border border-line px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-strong hover:text-fg"
                  >
                    {theme}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div>
              <h2 className="display-3">Rotalar</h2>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
                Önce zorunlu rotalar. Her biri kurulduğu iskelete ya da kayıt parçalarına bağlanır.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-strong">
                    <th scope="col" className="pb-3 text-sm font-medium text-muted">Rota</th>
                    <th scope="col" className="pb-3 text-sm font-medium text-muted">Amaç</th>
                    <th scope="col" className="pb-3 text-sm font-medium text-muted">Neyden kurulur</th>
                    <th scope="col" className="pb-3 text-sm font-medium text-muted">Yapılandırılmış veri</th>
                  </tr>
                </thead>
                <tbody>
                  {kit.routes.map((route) => (
                    <tr key={route.path} className="border-b border-line align-top last:border-0">
                      <td className="py-4 pr-4">
                        <span className="block font-mono text-[0.8125rem]">{route.path}</span>
                        <span className="mt-1 block text-sm font-medium">{route.name}</span>
                        {route.required ? null : (
                          <span className="mt-1.5 inline-flex rounded-pk-pill border border-line px-2 py-0.5 text-xs text-faint">
                            Sonra
                          </span>
                        )}
                      </td>
                      <td className="py-4 pr-4 text-sm leading-relaxed text-muted">
                        {route.purpose}
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex flex-wrap gap-1.5">
                          {route.skeleton ? (
                            <Link
                              href={`/tr/iskeletler/${route.skeleton}`}
                              className="rounded-pk-pill border border-accent px-2.5 py-0.5 text-xs text-accent transition-colors hover:bg-accent-soft"
                            >
                              {route.skeleton}
                            </Link>
                          ) : null}
                          {(route.blocks ?? []).map((block) => (
                            <Link
                              key={block}
                              href={`/tr/bilesenler/${block}`}
                              className="rounded-pk-pill border border-line px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-strong hover:text-fg"
                            >
                              {itemBySlugTr(block)?.name ?? block}
                            </Link>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 text-sm text-muted">
                        {route.structuredData ? (
                          <span className="font-mono text-xs">{route.structuredData}</span>
                        ) : (
                          <span className="text-faint">Yok</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div>
              <h2 className="display-3">İçerik modeli</h2>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
                Rotaların arkasındaki varlıklar. Sayfaları kurmadan önce bunları modelle.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {kit.contentModel.map((type) => (
                <div key={type.name} className="rounded-pk border border-line bg-elevated p-5">
                  <h3 className="text-[0.9375rem] font-medium">{type.name}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {type.fields.map((field) => (
                      <li
                        key={field}
                        className="rounded-pk-sm bg-subtle px-2 py-0.5 font-mono text-xs text-muted"
                      >
                        {field}
                      </li>
                    ))}
                  </ul>
                  {type.note ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted">{type.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div>
              <h2 className="display-3">Formlar</h2>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
                Her form neyi topluyor ve veri gerçekte nereye gidiyor.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {kit.forms.map((form) => (
                <div key={form.name} className="rounded-pk border border-line bg-elevated p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-[0.9375rem] font-medium">{form.name}</h3>
                    <span className="font-mono text-xs text-faint">{form.route}</span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {form.collects.map((field) => (
                      <li
                        key={field}
                        className="rounded-pk-sm bg-subtle px-2 py-0.5 text-xs text-muted"
                      >
                        {field}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{form.destination}</p>
                  <Link
                    href={`/tr/bilesenler/${form.registryItem}`}
                    className="mt-3 inline-block font-mono text-xs text-accent underline underline-offset-4"
                  >
                    {itemBySlugTr(form.registryItem)?.name ?? form.registryItem}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div>
              <h2 className="display-3">Yasal yüzeyler</h2>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
                Bu sektörün Türkiye&rsquo;de normalde ihtiyaç duyduğu sayfalar; lansmanda unutulmasınlar
                diye burada. İçlerine ne yazılacağı bu kitin değil, bir hukukçunun işidir.
              </p>
            </div>
            <ul className="divide-y divide-line rounded-pk border border-line bg-elevated">
              {kit.legal.map((surface) => (
                <li key={surface.path} className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-[0.9375rem] font-medium">{surface.name}</h3>
                    <span className="font-mono text-xs text-faint">{surface.path}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{surface.why}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-5">
            <div>
              <h2 className="display-3">Operasyonel durumlar</h2>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
                Bir akış, mutlu yol render olduğunda bitmiş olmaz. Bunlar da var olmalı.
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {kit.operationalStates.map((state) => (
                <li
                  key={state}
                  className="rounded-pk-sm border border-line bg-elevated px-4 py-3 text-sm leading-relaxed text-muted"
                >
                  {state}
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </main>
    </div>
  );
}

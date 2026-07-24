import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { Container } from "@/components/primitives/layout";
import { BlockPreview } from "@/components/site/block-preview";
import { skeletons } from "@/registry/skeletons";
import { skeletonTr } from "@/registry/skeletons-tr";
import { itemBySlugTr } from "@/registry/registry-tr";

export function generateStaticParams() {
  return skeletons.map((skeleton) => ({ slug: skeleton.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const localized = skeletonTr[slug];
  if (!localized) return { title: "Bulunamadı" };
  return { title: `${localized.name} iskeleti`, description: localized.description };
}

export default async function TurkishSkeletonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skeleton = skeletons.find((entry) => entry.slug === slug);
  const localized = skeletonTr[slug];
  if (!skeleton || !localized) notFound();

  const defaultTheme = skeleton.themes[0]?.toLowerCase() ?? "obsidian";

  return (
    <div lang="tr">
      <PageHeader
        title={localized.name}
        intro={localized.description}
        trail={[
          { label: "Kütüphane", href: "/tr" },
          { label: "İskeletler", href: "/tr/iskeletler" },
          { label: localized.name, href: `/tr/iskeletler/${skeleton.slug}` },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-12">
          <BlockPreview
            slug={skeleton.slug}
            name={localized.name}
            previewPath="/preview/skeleton"
            defaultTheme={defaultTheme}
            language="tr"
            tall
          />

          <div className="grid gap-8 md:grid-cols-[16rem_1fr]">
            <aside className="flex flex-col gap-5">
              <div>
                <p className="font-mono text-xs text-accent">{localized.audience}</p>
                <dl className="mt-4 flex flex-col gap-3 border-t border-line pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-faint">Ana hedef</dt>
                    <dd className="text-right">{localized.outcome}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-faint">Bölüm</dt>
                    <dd>{skeleton.sections.length}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <p className="text-xs text-faint">Önerilen sistemler</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skeleton.themes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded-pk-pill border border-line px-2.5 py-1 text-xs text-muted"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <h2 className="text-sm font-medium text-muted">Bölüm sırası</h2>
              <ol className="mt-4 grid gap-2 sm:grid-cols-2">
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
                        className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { Container } from "@/components/primitives/layout";
import { BlockPreview } from "@/components/site/block-preview";
import { skeletons } from "@/registry/skeletons";

export function generateStaticParams() {
  return skeletons.map((skeleton) => ({ slug: skeleton.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skeleton = skeletons.find((entry) => entry.slug === slug);
  if (!skeleton) return { title: "Not found" };
  return { title: `${skeleton.name} skeleton`, description: skeleton.description };
}

export default async function SkeletonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skeleton = skeletons.find((entry) => entry.slug === slug);
  if (!skeleton) notFound();

  const defaultTheme = skeleton.themes[0]?.toLowerCase() ?? "obsidian";

  return (
    <>
      <PageHeader
        title={skeleton.name}
        intro={skeleton.description}
        trail={[
          { label: "Kit", href: "/" },
          { label: "Skeletons", href: "/skeletons" },
          { label: skeleton.name, href: `/skeletons/${skeleton.slug}` },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-12">
          <BlockPreview
            slug={skeleton.slug}
            name={skeleton.name}
            previewPath="/preview/skeleton"
            defaultTheme={defaultTheme}
            tall
          />

          <div className="grid gap-8 md:grid-cols-[16rem_1fr]">
            <aside className="flex flex-col gap-5">
              <div>
                <p className="font-mono text-xs text-accent">{skeleton.audience}</p>
                <dl className="mt-4 flex flex-col gap-3 border-t border-line pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-faint">Primary outcome</dt>
                    <dd className="text-right">{skeleton.outcome}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-faint">Sections</dt>
                    <dd>{skeleton.sections.length}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <p className="text-xs text-faint">Recommended systems</p>
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
              <h2 className="text-sm font-medium text-muted">Section order</h2>
              <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                {skeleton.sections.map((section, index) => (
                  <li key={`${skeleton.slug}-${section.slug}`}>
                    <Link
                      href={`/components/${section.slug}`}
                      className="group flex items-start gap-3 rounded-pk-sm border border-line p-3 transition-colors hover:border-strong"
                    >
                      <span className="mt-0.5 font-mono text-xs text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">{section.label}</span>
                        <span className="block text-xs leading-relaxed text-muted">
                          {section.purpose}
                        </span>
                      </span>
                      <ArrowRight
                        size={13}
                        weight="bold"
                        aria-hidden
                        className="mt-1 shrink-0 text-faint transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

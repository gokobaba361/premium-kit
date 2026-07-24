import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { skeletons, type SiteSkeleton } from "@/registry/skeletons";

export const metadata: Metadata = {
  title: "Site skeletons",
  description:
    "Reusable page structures for marketing, commerce, applications, documentation, events and company sites.",
};

function SkeletonDiagram({ skeleton }: { skeleton: SiteSkeleton }) {
  return (
    <div
      aria-label={`${skeleton.name} section order`}
      className="flex min-h-64 flex-col gap-2 rounded-pk border border-line bg-subtle p-4"
    >
      {skeleton.sections.map((section, index) => (
        <div
          key={`${skeleton.slug}-${section.slug}`}
          className={[
            "flex items-center rounded-pk-sm border border-line bg-elevated px-3",
            index === 0 || index === skeleton.sections.length - 1 ? "h-7" : "",
            section.slug.includes("hero") ? "h-14" : "",
            !section.slug.includes("hero") &&
            index !== 0 &&
            index !== skeleton.sections.length - 1
              ? "h-9"
              : "",
          ].join(" ")}
        >
          <span className="font-mono text-[0.6875rem] text-faint">{section.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function SkeletonsPage() {
  return (
    <>
      <PageHeader
        title="Site skeletons"
        intro="Ten proven page structures assembled from the block library. Choose the hierarchy first, then swap blocks, content and theme without losing the page's argument."
        trail={[
          { label: "Kit", href: "/" },
          { label: "Skeletons", href: "/skeletons" },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-12">
          <aside className="flex flex-col items-start justify-between gap-5 rounded-pk border border-line bg-subtle p-5 sm:flex-row sm:items-center md:p-6">
            <div>
              <p className="font-mono text-xs text-accent">START WITH A BRIEF</p>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                Choose a skeleton and visual system, then generate a complete build prompt for
                your coding agent.
              </p>
            </div>
            <ButtonLink href="/ai" variant="secondary">
              Build with AI
            </ButtonLink>
          </aside>

          <div className="grid gap-5 lg:grid-cols-2">
            {skeletons.map((skeleton) => (
              <article
                key={skeleton.slug}
                className="grid gap-6 rounded-pk border border-line bg-elevated p-5 sm:grid-cols-[12rem_1fr] md:p-6"
              >
                <Link
                  href={`/skeletons/${skeleton.slug}`}
                  aria-label={`${skeleton.name} live preview`}
                  className="group block rounded-pk outline-none ring-accent transition-shadow focus-visible:ring-2"
                >
                  <SkeletonDiagram skeleton={skeleton} />
                </Link>

                <div className="flex min-w-0 flex-col">
                  <p className="font-mono text-xs text-accent">{skeleton.audience}</p>
                  <h2 className="mt-2 display-3">
                    <Link
                      href={`/skeletons/${skeleton.slug}`}
                      className="hover:text-accent"
                    >
                      {skeleton.name}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {skeleton.description}
                  </p>

                  <Link
                    href={`/skeletons/${skeleton.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent"
                  >
                    Live preview
                    <ArrowUpRight size={15} weight="bold" aria-hidden />
                  </Link>

                  <dl className="mt-5 border-t border-line pt-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-faint">Primary outcome</dt>
                      <dd className="text-right">{skeleton.outcome}</dd>
                    </div>
                    <div className="mt-2 flex justify-between gap-4">
                      <dt className="text-faint">Sections</dt>
                      <dd>{skeleton.sections.length}</dd>
                    </div>
                  </dl>

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
                </div>

                <ol className="grid gap-2 border-t border-line pt-5 sm:col-span-2 md:grid-cols-2">
                  {skeleton.sections.map((section, index) => (
                    <li key={`${skeleton.slug}-detail-${section.slug}`}>
                      <Link
                        href={`/components/${section.slug}`}
                        className="group flex items-start gap-3 rounded-pk-sm p-2 transition-colors hover:bg-subtle"
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
                          size={14}
                          weight="bold"
                          aria-hidden
                          className="mt-1 shrink-0 text-faint transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>

          <section className="rounded-pk border border-line bg-subtle p-6 md:p-8">
            <h2 className="display-3">Skeletons are structure, not style</h2>
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
              The same skeleton can carry any sector theme. Start with the desired visitor
              outcome, remove sections that do not help it, and only then choose a visual
              direction.
            </p>
          </section>
        </Container>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { siteKits, requiredRoutes } from "@/registry/site-kits";

export const metadata: Metadata = {
  title: "Sector site kits",
  description:
    "Multi-page site kits: the route tree, content model, structured data, forms, legal surfaces and operational states each sector actually needs.",
};

export default function KitsPage() {
  return (
    <>
      <PageHeader
        title="Sector site kits"
        intro="A skeleton is one page's section order. A kit is the whole site: which routes exist, what content sits behind them, which forms collect what, and which legal surfaces the sector genuinely requires."
        trail={[
          { label: "Kit", href: "/" },
          { label: "Site kits", href: "/kits" },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-12">
          <aside className="flex flex-col items-start justify-between gap-5 rounded-pk border border-line bg-subtle p-5 sm:flex-row sm:items-center md:p-6">
            <div>
              <p className="font-mono text-xs text-accent">BUILD FROM A KIT</p>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                Each kit lists its routes in build order, so you can ship the required set first and
                keep the rest as a stated backlog rather than a surprise.
              </p>
            </div>
            <ButtonLink href="/r/site-kits.json" variant="secondary">
              Kits as JSON
            </ButtonLink>
          </aside>

          <ul className="grid gap-5 lg:grid-cols-2">
            {siteKits.map((kit) => {
              const core = requiredRoutes(kit).length;
              return (
                <li key={kit.slug}>
                  <article className="flex h-full flex-col rounded-pk border border-line bg-elevated p-6 md:p-7">
                    <p className="font-mono text-xs text-accent">{kit.sector}</p>
                    <h2 className="display-3 mt-2">
                      <Link href={`/kits/${kit.slug}`} className="hover:text-accent">
                        {kit.name}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {kit.description}
                    </p>

                    <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-sm">
                      <div>
                        <dt className="text-xs text-faint">Core routes</dt>
                        <dd className="mt-1 font-mono tabular-nums">{core}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-faint">Forms</dt>
                        <dd className="mt-1 font-mono tabular-nums">{kit.forms.length}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-faint">Legal pages</dt>
                        <dd className="mt-1 font-mono tabular-nums">{kit.legal.length}</dd>
                      </div>
                    </dl>

                    <p className="mt-5 text-sm text-muted">
                      <span className="text-faint">Outcome</span> {kit.outcome}
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
                      href={`/kits/${kit.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium hover:text-accent"
                    >
                      Open the kit
                      <ArrowUpRight size={15} weight="bold" aria-hidden />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>

          <section className="rounded-pk border border-line bg-subtle p-6 md:p-8">
            <h2 className="display-3">Legal surfaces are a checklist, not advice</h2>
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
              The legal pages listed in each kit are the ones that sector normally needs in Türkiye,
              so they are not forgotten at launch. What goes inside them is for a lawyer, not for
              this kit.
            </p>
          </section>
        </Container>
      </main>
    </>
  );
}

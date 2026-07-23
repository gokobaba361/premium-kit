import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { presets } from "@/design/presets";
import { Container } from "@/components/primitives/layout";
import { ButtonLink } from "@/components/primitives/button";
import { Rule } from "@/components/primitives/surface";

// Presets with a full page composition under /templates. The rest ship the
// theme only: every block already works with them, they just have no demo page.
const built = new Set(["obsidian", "bone", "forest", "cobalt", "clinic", "terracotta"]);

export default function KitIndex() {
  return (
    <main className="py-20 md:py-28">
      <Container>
        <header className="flex flex-col gap-5">
          <h1 className="display-1 max-w-[18ch] text-balance">
            Sector calibrated starting points, not a template pile.
          </h1>
          <p className="measure text-lg leading-relaxed text-muted">
            One token contract, one block library. Each preset swaps the palette, the shape
            system and the pacing to match how the best sites in that sector actually behave.
          </p>
        </header>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/ai" size="lg">
            Build a site with AI
          </ButtonLink>
          <ButtonLink href="/components" size="lg" variant="secondary">
            Browse components
          </ButtonLink>
          <ButtonLink href="/kit" size="lg" variant="secondary">
            Component guide
          </ButtonLink>
          <ButtonLink href="/blocks" size="lg" variant="secondary">
            Block library
          </ButtonLink>
          <ButtonLink href="/skeletons" size="lg" variant="secondary">
            Site skeletons
          </ButtonLink>
          <ButtonLink href="/sources" size="lg" variant="secondary">
            Open-source research
          </ButtonLink>
        </div>

        <Rule className="mt-14" />

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {presets.map((preset) => {
            const ready = built.has(preset.id);
            const card = (
              <article
                className="flex h-full flex-col gap-6 rounded-pk border border-line bg-elevated p-6 transition-colors duration-200 hover:border-strong md:p-7"
                style={{ borderTopColor: preset.swatch.accent, borderTopWidth: 3 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="display-3">{preset.name}</h2>
                    <p className="mt-1 text-sm text-faint">{preset.sectors.join(", ")}</p>
                  </div>
                  <div className="flex shrink-0 gap-1.5" aria-hidden>
                    {[preset.swatch.bg, preset.swatch.fg, preset.swatch.accent].map((c) => (
                      <span
                        key={c}
                        className="size-6 rounded-full border border-line"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-[0.9375rem] leading-relaxed text-muted">{preset.read}</p>

                <div className="flex flex-col gap-1.5">
                  {/* Sample is set in the preset's own display face, on the card's own
                      surface, so the type reads without dragging the palette across. */}
                  <p
                    className="text-3xl leading-tight tracking-tight"
                    style={{ fontFamily: `var(${preset.display.cssVar})` }}
                  >
                    {preset.display.name}
                  </p>
                  <p className="text-sm text-muted">{preset.display.why}</p>
                </div>

                <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-line pt-5 font-mono text-xs text-faint">
                  <div>
                    <dt>variance</dt>
                    <dd className="mt-1 text-fg">{preset.variance}</dd>
                  </div>
                  <div>
                    <dt>motion</dt>
                    <dd className="mt-1 text-fg">{preset.motion}</dd>
                  </div>
                  <div>
                    <dt>density</dt>
                    <dd className="mt-1 text-fg">{preset.density}</dd>
                  </div>
                </dl>

                <p className="flex items-center gap-1.5 text-sm font-medium">
                  {ready ? (
                    <>
                      View template
                      <ArrowUpRight size={15} weight="bold" aria-hidden />
                    </>
                  ) : (
                    <span className="text-faint">Theme ready, template pending</span>
                  )}
                </p>
              </article>
            );

            return (
              <li key={preset.id}>
                {ready ? <Link href={`/templates/${preset.id}`}>{card}</Link> : card}
              </li>
            );
          })}
        </ul>
      </Container>
    </main>
  );
}

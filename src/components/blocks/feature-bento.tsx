import Image from "next/image";
import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";
import { cn } from "@/lib/cn";

export type BentoCell = {
  title: string;
  body: string;
  /** Cell width in a 6 column grid. Mix widths so the grid has rhythm. */
  span?: 2 | 3 | 4 | 6;
  /** Optional visual. At least a third of the cells should carry one. */
  media?: { src: string; alt: string };
  /** Fills the cell with the accent tint instead of the elevated surface. */
  emphasis?: boolean;
};

/**
 * Feature grid with real rhythm. The grid has exactly as many cells as you
 * pass, so an empty tile is impossible. Give cells mixed spans and let at
 * least two of them carry a visual, otherwise this reads as a text list.
 */
export function FeatureBento({
  title,
  body,
  cells,
  tone = "base",
}: {
  title: string;
  body?: string;
  cells: BentoCell[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          {cells.map((cell, i) => (
            <RevealItem
              key={cell.title}
              index={i}
              className={cn(
                "md:col-span-3",
                cell.span === 2 && "md:col-span-2",
                cell.span === 4 && "md:col-span-4",
                cell.span === 6 && "md:col-span-6",
              )}
            >
              <article
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-pk border border-line",
                  cell.emphasis ? "bg-accent-soft" : "bg-elevated",
                )}
              >
                {cell.media ? (
                  <div className="relative aspect-[16/9] w-full bg-subtle">
                    <Image
                      src={cell.media.src}
                      alt={cell.media.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-col gap-2.5 p-6 md:p-7">
                  <h3 className="display-3">{cell.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-muted">{cell.body}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </div>
      </Container>
    </Section>
  );
}

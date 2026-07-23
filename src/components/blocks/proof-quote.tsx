import Image from "next/image";
import { Container, Section } from "@/components/primitives/layout";
import { Reveal } from "@/components/primitives/reveal";

/**
 * One quote, three lines maximum, full attribution. A landing page quote is
 * a snippet, not a review. Portrait is a real image, never an avatar glyph.
 */
export function ProofQuote({
  quote,
  name,
  role,
  portrait,
  tone = "subtle",
}: {
  /** Cut to 3 lines. If it needs more, it is a case study, not a quote. */
  quote: string;
  name: string;
  role: string;
  portrait?: { src: string; alt: string };
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <Reveal>
          <figure className="grid gap-10 md:grid-cols-12 md:items-center">
            {portrait ? (
              <div className="md:col-span-4">
                <div className="relative aspect-[4/5] w-full max-w-72 overflow-hidden rounded-pk bg-subtle">
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    fill
                    sizes="(max-width: 768px) 60vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : null}

            <div className={portrait ? "md:col-span-8" : "md:col-span-12"}>
              <blockquote className="display-3 max-w-[34ch] text-balance">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex flex-col gap-0.5">
                <span className="text-sm font-medium text-fg">{name}</span>
                <span className="text-sm text-muted">{role}</span>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}

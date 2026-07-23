import Image from "next/image";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/cn";

/**
 * Asymmetric split hero. Copy left at 6 columns, asset right at 6, offset so
 * the asset breaks the container edge. Hard limits enforced by the API:
 * headline is 2 lines by scale, subtext is capped at 20 words, one primary
 * plus at most one secondary CTA, and nothing else lives in the hero.
 */
export function HeroSplit({
  headline,
  subtext,
  primary,
  secondary,
  image,
  className,
}: {
  headline: string;
  /** Keep to 20 words. Longer copy belongs in the section below. */
  subtext: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  image: { src: string; alt: string };
  className?: string;
}) {
  return (
    <section className={cn("overflow-hidden pt-16 pb-section md:pt-24", className)}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              {/* A split hero gets half the width, so it gets a smaller display size
                  than the editorial hero. 56px keeps a 40 character headline to two
                  lines in a six column track. */}
              <h1 className="display-1 max-w-[20ch] text-[calc(clamp(2.25rem,1.3rem+3.1vw,3.5rem)*var(--pk-display-scale))] text-balance">
                {headline}
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">{subtext}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href={primary.href} size="lg">
                  {primary.label}
                </ButtonLink>
                {secondary ? (
                  <ButtonLink href={secondary.href} size="lg" variant="secondary">
                    {secondary.label}
                  </ButtonLink>
                ) : null}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:-mr-16 xl:-mr-28">
            <Reveal delay={0.12} y={28}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-pk border border-line bg-subtle shadow-pk-lift">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

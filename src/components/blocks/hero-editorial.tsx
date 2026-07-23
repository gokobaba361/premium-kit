import Image from "next/image";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { Reveal } from "@/components/primitives/reveal";

/**
 * Manifesto hero: the sentence is the design. Use when the message outranks
 * any asset (studios, launches, campaigns). A single full bleed image sits
 * below the fold line so the statement owns the first viewport.
 */
export function HeroEditorial({
  statement,
  subtext,
  primary,
  image,
}: {
  /** 4 to 9 words. Anything longer stops reading as a statement. */
  statement: string;
  subtext?: string;
  primary: { label: string; href: string };
  image: { src: string; alt: string };
}) {
  return (
    <section className="pt-20 md:pt-24">
      <Container>
        <Reveal>
          {/* 22ch keeps a 6 word statement to two lines at desktop. */}
          <h1 className="display-1 max-w-[22ch] text-[calc(clamp(2.75rem,1.2rem+6vw,6rem)*var(--pk-display-scale))] text-balance">
            {statement}
          </h1>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          {subtext ? (
            <Reveal delay={0.08}>
              <p className="max-w-[42ch] text-lg leading-relaxed text-muted">{subtext}</p>
            </Reveal>
          ) : (
            <span />
          )}
          <Reveal delay={0.14}>
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>

      <Reveal delay={0.2} y={32}>
        <div className="relative mt-14 aspect-[16/7] w-full overflow-hidden bg-subtle md:mt-20">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}

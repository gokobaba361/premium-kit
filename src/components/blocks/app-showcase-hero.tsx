import Image from "next/image";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { Reveal } from "@/components/primitives/reveal";

/**
 * Product hero with a real interface screenshot.
 *
 * The screenshot carries no floating labels or invented charts. It is framed
 * like a product surface and remains secondary to the promise and action.
 */
export function AppShowcaseHero({
  eyebrow,
  headline,
  subtext,
  primary,
  secondary,
  screenshot,
}: {
  eyebrow?: string;
  headline: string;
  subtext: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  screenshot: { src: string; alt: string };
}) {
  return (
    <section className="overflow-hidden pt-20 pb-section md:pt-28">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {eyebrow ? <p className="font-mono text-xs text-accent">{eyebrow}</p> : null}
            <h1 className="mt-5 display-1 max-w-[18ch] text-balance">{headline}</h1>
            <p className="measure mt-6 text-lg leading-relaxed text-muted">{subtext}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} size="lg" variant="secondary">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <div className="rounded-pk border border-line bg-subtle p-2 shadow-pk-lift md:p-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-pk-sm border border-line bg-elevated">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

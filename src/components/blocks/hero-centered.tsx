import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { Reveal } from "@/components/primitives/reveal";

/**
 * Centered launch hero for a product with one clear promise.
 *
 * The proof line sits below the actions instead of becoming a badge above the
 * headline. Keep the headline short enough to hold three lines on mobile.
 */
export function HeroCentered({
  eyebrow,
  headline,
  subtext,
  primary,
  secondary,
  proof,
}: {
  eyebrow?: string;
  headline: string;
  subtext: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  proof?: string;
}) {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {eyebrow ? (
              <p className="mb-5 font-mono text-xs tracking-wide text-accent">{eyebrow}</p>
            ) : null}
            <h1 className="display-1 max-w-[18ch] text-balance">{headline}</h1>
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
            {proof ? (
              <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-faint">{proof}</p>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

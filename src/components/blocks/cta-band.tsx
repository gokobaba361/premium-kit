import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { Reveal } from "@/components/primitives/reveal";

/**
 * Closing call to action. Reuses the exact label of the hero CTA on purpose:
 * one intent, one wording, everywhere on the page.
 */
export function CtaBand({
  title,
  body,
  primary,
}: {
  title: string;
  body?: string;
  primary: { label: string; href: string };
}) {
  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-7 rounded-pk border border-line bg-subtle px-7 py-14 md:px-14 md:py-20">
            <h2 className="display-2 max-w-[18ch] text-balance">{title}</h2>
            {body ? <p className="measure text-lg leading-relaxed text-muted">{body}</p> : null}
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

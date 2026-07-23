import { Check } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/primitives/button";
import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";
import { cn } from "@/lib/cn";

export type Plan = {
  name: string;
  price: string;
  cadence?: string;
  summary: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

/**
 * Two plans, side by side. Two is the honest default for a landing page;
 * a four column matrix belongs on a dedicated pricing route.
 * Feature lists cap at 5 rows, no hairline under every row.
 */
export function PricingDuo({
  title,
  body,
  plans,
  tone = "base",
}: {
  title: string;
  body?: string;
  plans: [Plan, Plan];
  tone?: "base" | "subtle";
}) {
  return (
    <Section id="pricing" tone={tone}>
      <Container>
        <SectionHead title={title} body={body} align="center" className="mx-auto" />

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((plan, i) => (
            <RevealItem key={plan.name} index={i}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-pk border p-7 md:p-8",
                  plan.featured
                    ? "border-accent bg-elevated shadow-pk-lift"
                    : "border-line bg-elevated",
                )}
              >
                <h3 className="text-sm font-medium tracking-wide text-muted">{plan.name}</h3>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.cadence ? (
                    <span className="text-sm text-faint">{plan.cadence}</span>
                  ) : null}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{plan.summary}</p>

                <ul className="mt-7 flex flex-col gap-3">
                  {plan.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem]">
                      <Check
                        size={17}
                        weight="bold"
                        className="mt-1 shrink-0 text-accent"
                        aria-hidden
                      />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <ButtonLink
                    href={plan.cta.href}
                    variant={plan.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {plan.cta.label}
                  </ButtonLink>
                </div>
              </article>
            </RevealItem>
          ))}
        </div>
      </Container>
    </Section>
  );
}

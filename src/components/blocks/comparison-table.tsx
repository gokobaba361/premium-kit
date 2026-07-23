import { Check, Minus } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/primitives/button";
import { Container, Section, SectionHead } from "@/components/primitives/layout";

export type ComparisonPlan = {
  name: string;
  price: string;
  description?: string;
  cta: { label: string; href: string };
};

export type ComparisonFeature = {
  label: string;
  values: Array<string | boolean>;
};

/**
 * Two or three plan comparison for buyers who need feature-level detail.
 *
 * Boolean values get text for screen readers as well as an icon. Strings are
 * used for limits and qualifiers so meaningful differences are never reduced
 * to a checkmark.
 */
export function ComparisonTable({
  title,
  body,
  plans,
  features,
  tone = "base",
}: {
  title: string;
  body?: string;
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  tone?: "base" | "subtle";
}) {
  const visiblePlans = plans.slice(0, 3);

  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-strong align-bottom">
                <th scope="col" className="w-1/4 pb-5 pr-6 text-sm font-medium text-muted">
                  Features
                </th>
                {visiblePlans.map((plan) => (
                  <th key={plan.name} scope="col" className="pb-5 pr-5 last:pr-0">
                    <span className="block text-[1.0625rem] font-medium">{plan.name}</span>
                    <span className="mt-1 block font-display text-3xl">{plan.price}</span>
                    {plan.description ? (
                      <span className="mt-2 block max-w-[24ch] text-xs font-normal leading-relaxed text-muted">
                        {plan.description}
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.label} className="border-b border-line">
                  <th scope="row" className="py-4 pr-6 text-sm font-normal text-muted">
                    {feature.label}
                  </th>
                  {visiblePlans.map((plan, planIndex) => {
                    const value = feature.values[planIndex] ?? false;
                    return (
                      <td key={`${feature.label}-${plan.name}`} className="py-4 pr-5 last:pr-0">
                        {typeof value === "boolean" ? (
                          value ? (
                            <span className="inline-flex items-center gap-2 text-sm">
                              <Check size={16} weight="bold" aria-hidden className="text-accent" />
                              <span className="sr-only">Included</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-faint">
                              <Minus size={16} weight="bold" aria-hidden />
                              <span className="sr-only">Not included</span>
                            </span>
                          )
                        ) : (
                          <span className="text-sm">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th scope="row" className="pt-6 pr-6">
                  <span className="sr-only">Choose a plan</span>
                </th>
                {visiblePlans.map((plan) => (
                  <td key={`${plan.name}-cta`} className="pt-6 pr-5 last:pr-0">
                    <ButtonLink href={plan.cta.href} size="sm">
                      {plan.cta.label}
                    </ButtonLink>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}

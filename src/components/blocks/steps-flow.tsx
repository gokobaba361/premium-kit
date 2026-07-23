import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";

export type Step = {
  /** Name the action, not the position. "Connect your bank", not "Step 1". */
  title: string;
  body: string;
};

/**
 * Sequence of actions. Progression is carried by the connecting rule and the
 * reading order, so no "Step 1 / Phase 02" labels are needed or offered.
 * Three or four steps. Five means the process needs simplifying, not a wider grid.
 */
export function StepsFlow({
  title,
  body,
  steps,
  tone = "base",
}: {
  title: string;
  body?: string;
  steps: Step[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />

        <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.slice(0, 4).map((step, i) => (
            <RevealItem key={step.title} index={i}>
              <li className="relative flex flex-col gap-2.5 border-t-2 border-accent pt-5">
                <h3 className="display-3">{step.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
              </li>
            </RevealItem>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

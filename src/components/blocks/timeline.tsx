import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";

export type Milestone = { period: string; title: string; body: string };

/**
 * Vertical history. The rule carries the sequence, so no numbered badges.
 * Periods are real labels ("Spring 2024"), not "Phase 02".
 */
export function Timeline({
  title,
  body,
  milestones,
  tone = "base",
}: {
  title: string;
  body?: string;
  milestones: Milestone[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionHead title={title} body={body} />
          </div>

          <ol className="md:col-span-8">
            {milestones.map((milestone, i) => (
              <RevealItem key={milestone.title} index={i}>
                <li className="grid gap-2 border-l border-line py-6 pl-6 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="font-mono text-sm text-faint">{milestone.period}</p>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[1.0625rem] font-medium">{milestone.title}</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-muted">{milestone.body}</p>
                  </div>
                </li>
              </RevealItem>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";

export type SpecGroup = {
  heading: string;
  rows: { label: string; value: string }[];
};

/**
 * Specifications and practical information, grouped into clusters.
 * Deliberately not a long table with a hairline under every row: each cluster
 * gets one rule at the top, rows inside breathe on spacing alone.
 * Keep to 3 clusters of 4 rows. More than that belongs on a detail page.
 */
export function SpecGrouped({
  title,
  body,
  groups,
  tone = "subtle",
}: {
  title: string;
  body?: string;
  groups: SpecGroup[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {groups.slice(0, 3).map((group, i) => (
            <RevealItem key={group.heading} index={i}>
              <div className="border-t border-strong pt-5">
                <h3 className="text-sm font-semibold">{group.heading}</h3>
                <dl className="mt-5 flex flex-col gap-4">
                  {group.rows.slice(0, 4).map((row) => (
                    <div key={row.label} className="flex flex-col gap-1">
                      <dt className="text-sm text-faint">{row.label}</dt>
                      <dd className="text-[0.9375rem] leading-relaxed">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </RevealItem>
          ))}
        </div>
      </Container>
    </Section>
  );
}

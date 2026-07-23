import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { StatRow } from "@/components/primitives/data";
import { Reveal } from "@/components/primitives/reveal";

/**
 * Three numbers, each with the source it came from. The `source` field is not
 * optional in `Stat`, so an invented figure has nowhere to hide.
 */
export function StatsBand({
  title,
  body,
  stats,
  tone = "subtle",
}: {
  title: string;
  body?: string;
  stats: { value: string; label: string; source: string }[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />
        <Reveal className="mt-12">
          <StatRow items={stats.slice(0, 3)} />
        </Reveal>
      </Container>
    </Section>
  );
}

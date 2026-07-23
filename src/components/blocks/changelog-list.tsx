import { Container, Section, SectionHead } from "@/components/primitives/layout";

export type ChangelogEntry = {
  date: string;
  title: string;
  body: string;
  version?: string;
  changes?: string[];
};

export function ChangelogList({
  title,
  body,
  entries,
  tone = "base",
}: {
  title: string;
  body?: string;
  entries: ChangelogEntry[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          <SectionHead title={title} body={body} />
          <ol className="flex flex-col">
            {entries.map((entry) => (
              <li
                key={`${entry.date}-${entry.title}`}
                className="grid gap-3 border-t border-line py-7 first:border-strong sm:grid-cols-[8rem_1fr]"
              >
                <div>
                  <time className="font-mono text-xs text-faint">{entry.date}</time>
                  {entry.version ? (
                    <p className="mt-2 font-mono text-xs text-accent">{entry.version}</p>
                  ) : null}
                </div>
                <div>
                  <h3 className="text-[1.0625rem] font-medium">{entry.title}</h3>
                  <p className="measure mt-2 text-sm leading-relaxed text-muted">{entry.body}</p>
                  {entry.changes?.length ? (
                    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted">
                      {entry.changes.map((change) => (
                        <li key={change}>{change}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

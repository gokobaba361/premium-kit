import { Container, Section, SectionHead } from "@/components/primitives/layout";

export type ScheduleDay = {
  date: string;
  sessions: {
    time: string;
    title: string;
    speaker?: string;
    track?: string;
  }[];
};

export function EventSchedule({
  title,
  body,
  days,
  tone = "base",
}: {
  title: string;
  body?: string;
  days: ScheduleDay[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {days.slice(0, 2).map((day) => (
            <section key={day.date}>
              <h3 className="border-b border-strong pb-3 font-mono text-sm">{day.date}</h3>
              <ol>
                {day.sessions.map((session) => (
                  <li
                    key={`${session.time}-${session.title}`}
                    className="grid gap-2 border-b border-line py-5 sm:grid-cols-[5rem_1fr]"
                  >
                    <time className="font-mono text-sm text-faint">{session.time}</time>
                    <div>
                      <p className="font-medium">{session.title}</p>
                      {session.speaker || session.track ? (
                        <p className="mt-1 text-sm text-muted">
                          {[session.speaker, session.track].filter(Boolean).join(" · ")}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}

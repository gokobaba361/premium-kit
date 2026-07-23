import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, SectionHead } from "@/components/primitives/layout";

export type Faq = { question: string; answer: string };

/**
 * Native details and summary, so it works without JavaScript, is keyboard
 * operable for free, and is readable by find-in-page when closed.
 * No animation library involved.
 */
export function FaqAccordion({
  title,
  items,
  tone = "base",
}: {
  title: string;
  items: Faq[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionHead title={title} />
          </div>

          <div className="md:col-span-8">
            {items.map((item) => (
              <details
                key={item.question}
                className="group border-b border-line py-5 first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.0625rem] font-medium marker:hidden">
                  {item.question}
                  <Plus
                    size={18}
                    weight="bold"
                    aria-hidden
                    className="mt-1 shrink-0 text-accent transition-transform duration-[var(--pk-dur-fast)] group-open:rotate-45"
                  />
                </summary>
                <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

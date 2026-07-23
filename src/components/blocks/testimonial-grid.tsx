import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

/**
 * Three short testimonials with full attribution.
 *
 * Longer stories belong in case studies. Cards stay equal in emphasis: social
 * proof is a body of evidence, not a carousel with one winner.
 */
export function TestimonialGrid({
  title,
  body,
  testimonials,
  tone = "subtle",
}: {
  title: string;
  body?: string;
  testimonials: Testimonial[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <RevealItem key={`${testimonial.name}-${testimonial.company}`} index={index}>
              <li className="flex h-full flex-col rounded-pk border border-line bg-elevated p-6">
                <blockquote className="text-[1.0625rem] leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-8 border-t border-line pt-4">
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
                  </p>
                </div>
              </li>
            </RevealItem>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

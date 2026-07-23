import Image from "next/image";
import { Container, Section } from "@/components/primitives/layout";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/cn";

export type SplitFeature = {
  title: string;
  body: string;
  image: { src: string; alt: string };
  points?: string[];
};

/**
 * Alternating image and copy rows. Capped at 2 rows by the component, because
 * a third consecutive zigzag is where a page starts reading as a template.
 * If you have more than two, they belong in a bento or a tabbed section.
 */
export function FeaturesSplit({
  features,
  tone = "base",
}: {
  features: SplitFeature[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-20 md:gap-28">
        {features.slice(0, 2).map((feature, i) => (
          <Reveal key={feature.title}>
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
              <div className={cn("flex flex-col gap-4", i % 2 === 1 && "md:order-2")}>
                <h3 className="display-2 max-w-[16ch] text-balance">{feature.title}</h3>
                <p className="measure text-lg leading-relaxed text-muted">{feature.body}</p>
                {feature.points ? (
                  <ul className="mt-2 flex flex-col gap-3">
                    {feature.points.slice(0, 4).map((point) => (
                      <li
                        key={point}
                        className="border-l-2 border-accent pl-4 text-[0.9375rem] leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className={cn(i % 2 === 1 && "md:order-1")}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-pk bg-subtle">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}

import Image from "next/image";
import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";

export type Person = {
  name: string;
  role: string;
  photo?: { src: string; alt: string };
};

/**
 * People, photographed. Portrait ratio, name and role only. Bios belong on a
 * detail page, not stacked under twelve faces.
 */
export function TeamGrid({
  title,
  body,
  people,
  tone = "base",
}: {
  title: string;
  body?: string;
  people: Person[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />

        <ul className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {people.map((person, i) => (
            <RevealItem key={person.name} index={i}>
              <li className="flex flex-col gap-3.5">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-pk bg-subtle">
                  {person.photo ? (
                    <Image
                      src={person.photo.src}
                      alt={person.photo.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[0.9375rem] font-medium">{person.name}</p>
                  <p className="text-sm text-muted">{person.role}</p>
                </div>
              </li>
            </RevealItem>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

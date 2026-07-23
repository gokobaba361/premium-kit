import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";

export type CaseStudy = {
  title: string;
  client: string;
  outcome: string;
  href: string;
  image: { src: string; alt: string };
};

export function CaseStudyGrid({
  title,
  body,
  studies,
  tone = "base",
}: {
  title: string;
  body?: string;
  studies: CaseStudy[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {studies.slice(0, 6).map((study, index) => (
            <RevealItem key={study.href} index={index}>
              <li>
                <Link href={study.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-pk bg-subtle">
                    <Image
                      src={study.image.src}
                      alt={study.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-faint">{study.client}</p>
                      <h3 className="mt-1 text-[1.0625rem] font-medium">{study.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{study.outcome}</p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      aria-hidden
                      className="mt-1 shrink-0 text-faint"
                    />
                  </div>
                </Link>
              </li>
            </RevealItem>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

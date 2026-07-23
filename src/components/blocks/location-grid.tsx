import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, SectionHead } from "@/components/primitives/layout";

export type Location = {
  name: string;
  address: string;
  detail?: string;
  href?: string;
};

export function LocationGrid({
  title,
  body,
  locations,
  tone = "subtle",
}: {
  title: string;
  body?: string;
  locations: Location[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {locations.slice(0, 9).map((location) => (
            <li key={`${location.name}-${location.address}`}>
              <div className="flex h-full flex-col rounded-pk border border-line bg-elevated p-5">
                <h3 className="text-[1.0625rem] font-medium">{location.name}</h3>
                <address className="mt-3 not-italic text-sm leading-relaxed text-muted">
                  {location.address}
                </address>
                {location.detail ? (
                  <p className="mt-2 text-xs leading-relaxed text-faint">{location.detail}</p>
                ) : null}
                {location.href ? (
                  <Link
                    href={location.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent"
                  >
                    View location
                    <ArrowRight size={14} weight="bold" aria-hidden />
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

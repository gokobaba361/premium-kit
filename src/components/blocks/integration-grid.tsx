import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";

export type Integration = {
  name: string;
  description: string;
  href?: string;
  mark?: React.ReactNode;
};

/**
 * Integration directory for six to twelve connections.
 *
 * Marks are passed as content rather than fetched from a vendor CDN. Every
 * card remains useful without a logo because name and description are required.
 */
export function IntegrationGrid({
  title,
  body,
  integrations,
  tone = "base",
}: {
  title: string;
  body?: string;
  integrations: Integration[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.slice(0, 12).map((integration, index) => {
            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 items-center justify-center rounded-pk-sm border border-line bg-subtle font-mono text-sm">
                    {integration.mark ?? integration.name.slice(0, 2).toUpperCase()}
                  </div>
                  {integration.href ? (
                    <ArrowUpRight size={15} weight="bold" aria-hidden className="text-faint" />
                  ) : null}
                </div>
                <h3 className="mt-5 text-[1.0625rem] font-medium">{integration.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {integration.description}
                </p>
              </>
            );

            return (
              <RevealItem key={integration.name} index={index}>
                <li className="h-full">
                  {integration.href ? (
                    <Link
                      href={integration.href}
                      className="block h-full rounded-pk border border-line bg-elevated p-5 transition-colors hover:border-strong"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="h-full rounded-pk border border-line bg-elevated p-5">
                      {content}
                    </div>
                  )}
                </li>
              </RevealItem>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

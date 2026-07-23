import type { Metadata } from "next";
import { Container } from "@/components/primitives/layout";
import { PageHeader } from "@/components/blocks/page-header";
import { registry, categories } from "@/registry/registry";
import { facetsBySlug, tagCounts } from "@/registry/registry-metadata";
import { ComponentsBrowser } from "./components-browser";

const topTags = tagCounts.slice(0, 18).map((entry) => entry.tag);

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse every component in the kit. Preview, source, install command and the rule each one enforces.",
};

export default function ComponentsIndex() {
  return (
    <>
      <PageHeader
        title="Components"
        intro="Every piece is copy and paste. Take the source from the page, or pull it with the CLI. Each entry states the rule it enforces, because that is the part that stops a page looking generated."
        trail={[
          { label: "Kit", href: "/" },
          { label: "Components", href: "/components" },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-12">
          <ComponentsBrowser items={registry} facets={facetsBySlug} tags={topTags} />

          <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-4">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col gap-2">
                <p className="text-[0.9375rem] font-medium">{category.label}</p>
                <p className="text-sm leading-relaxed text-muted">{category.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}

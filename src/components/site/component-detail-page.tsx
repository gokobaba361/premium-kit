import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/primitives/layout";
import { PageHeader } from "@/components/blocks/page-header";
import { CodeBlock } from "@/components/site/code-block";
import { PropsTables } from "@/components/site/props-table";
import {
  itemBySlug,
  registryDependencySlugs,
} from "@/registry/registry";
import { itemBySlugTr } from "@/registry/registry-tr";
import { readSources } from "@/registry/source";
import { extractPropsForFiles } from "@/registry/props";
import { highlight, langFor } from "@/lib/highlight";
import { Preview } from "@/registry/previews";
import { previewSlugs } from "@/registry/preview-slugs";

export async function ComponentDetailPage({
  slug,
  language,
}: {
  slug: string;
  language: "en" | "tr";
}) {
  const tr = language === "tr";
  const item = tr ? itemBySlugTr(slug) : itemBySlug(slug);
  if (!item) notFound();

  const sources = readSources(item.files);
  const hasPreview = previewSlugs.has(item.slug);
  const npmDeps = item.dependencies?.join(" ");
  const registryDeps = registryDependencySlugs(item);
  const propsTables = extractPropsForFiles(item.files);

  const [highlightedSources, cliCommand, depsCommand] = await Promise.all([
    Promise.all(
      sources.map(async (source) => ({
        ...source,
        html: await highlight(source.code, langFor(source.path)),
      })),
    ),
    highlight(`npx shadcn@latest add https://your-domain.com/r/${item.slug}.json`, "bash"),
    npmDeps ? highlight(`npm install ${npmDeps}`, "bash") : Promise.resolve(undefined),
  ]);

  return (
    <div lang={language}>
      <PageHeader
        title={item.name}
        intro={item.description}
        trail={[
          { label: tr ? "Kütüphane" : "Kit", href: tr ? "/tr" : "/" },
          {
            label: tr ? "Bileşenler" : "Components",
            href: tr ? "/tr/bilesenler" : "/components",
          },
          {
            label: item.name,
            href: tr ? `/tr/bilesenler/${item.slug}` : `/components/${item.slug}`,
          },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-12">
          {hasPreview ? (
            <section className="flex flex-col gap-4">
              <h2 className="text-sm font-medium text-muted">{tr ? "Önizleme" : "Preview"}</h2>
              <div className="flex min-h-56 items-center justify-center rounded-pk border border-line bg-bg p-8 md:p-12">
                <Preview slug={item.slug} />
              </div>
              {item.note ? (
                <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                  {item.note}
                </p>
              ) : null}
            </section>
          ) : (
            <section className="rounded-pk border border-dashed border-strong bg-subtle p-6">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                {tr
                  ? "Bu parça tam sayfa bölümüdür; yerleşimi kutulu önizlemeden daha önemlidir. "
                  : "This is a whole page section, so its placement matters more than a boxed preview. "}
                <Link
                  href={tr ? "/tr/bloklar" : "/blocks"}
                  className="text-accent underline underline-offset-4"
                >
                  {tr ? "Blok yerleşim rehberini aç" : "See the block placement guide"}
                </Link>
                {tr ? " veya " : " or browse the "}
                <Link
                  href={tr ? "/tr/iskeletler" : "/skeletons"}
                  className="text-accent underline underline-offset-4"
                >
                  {tr ? "site iskeletlerine bak" : "site skeletons"}
                </Link>
                .
              </p>
              {item.note ? (
                <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {item.note}
                </p>
              ) : null}
            </section>
          )}

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium text-muted">{tr ? "Kurulum" : "Install"}</h2>

            <CodeBlock
              filename={tr ? "shadcn CLI ile" : "with the shadcn CLI"}
              code={`npx shadcn@latest add https://your-domain.com/r/${item.slug}.json`}
              html={cliCommand}
              language={language}
            />

            {npmDeps ? (
              <CodeBlock
                filename={tr ? "bağımlılıklar" : "dependencies"}
                code={`npm install ${npmDeps}`}
                html={depsCommand}
                language={language}
              />
            ) : null}

            {registryDeps.length ? (
              <p className="text-sm text-muted">
                {tr ? "Ayrıca gerekenler: " : "Also needs "}
                {registryDeps.map((dep, index) => (
                  <span key={dep}>
                    {index > 0 ? ", " : ""}
                    <Link
                      href={tr ? `/tr/bilesenler/${dep}` : `/components/${dep}`}
                      className="text-accent underline underline-offset-4"
                    >
                      {dep}
                    </Link>
                  </span>
                ))}
                .{" "}
                {tr ? "Her bileşen ayrıca " : "Every component also reads the "}
                <Link
                  href={tr ? "/tr/bilesenler/tokens" : "/components/tokens"}
                  className="text-accent underline underline-offset-4"
                >
                  {tr ? "token sözleşmesini" : "token contract"}
                </Link>
                {tr ? " kullanır." : "."}
              </p>
            ) : null}
          </section>

          {propsTables.length > 0 ? (
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium text-muted">
                  {tr ? "Özellikler" : "Props"}
                </h2>
                <p className="measure text-sm leading-relaxed text-faint">
                  {tr
                    ? "Build sırasında doğrudan bileşen imzasından okunur; tablo koddan kopamaz."
                    : "Read from the component signature at build time, so this table cannot fall out of step with the code."}
                </p>
              </div>
              <PropsTables tables={propsTables} language={language} />
            </section>
          ) : null}

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium text-muted">
              {tr ? "Kaynak" : "Source"}{" "}
              {sources.length > 1
                ? `(${sources.length} ${tr ? "dosya" : "files"})`
                : null}
            </h2>
            {highlightedSources.map((source) => (
              <CodeBlock
                key={source.path}
                filename={source.path}
                code={source.code}
                html={source.html}
                collapsible={source.code.split("\n").length > 40}
                language={language}
              />
            ))}
          </section>
        </Container>
      </main>
    </div>
  );
}

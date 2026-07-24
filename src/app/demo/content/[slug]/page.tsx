import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { SiteFooter } from "@/components/blocks/site-footer";
import { ArticleLayout } from "@/components/blocks/article-layout";
import { NewsletterSignup } from "@/components/blocks/newsletter-signup";
import {
  DEMO_LOCALE,
  articleBySlug,
  demoArticles,
} from "@/components/site/content-demo-data";

export function generateStaticParams() {
  return demoArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return { title: "Not found" };
  return { title: article.title, description: article.excerpt };
}

const nav = [
  { label: "Latest", href: "/demo/content#index" },
  { label: "Search", href: "/demo/content#search" },
  { label: "About", href: "/demo/content#about" },
];

export default async function ContentDemoArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  return (
    <ThemeScope theme="archive">
      <SiteNav
        brand="Kesit"
        brandHref="/demo/content"
        items={nav}
        cta={{ label: "Subscribe", href: "/demo/content#newsletter" }}
      />

      <main>
        <ArticleLayout
          category={article.category}
          title={article.title}
          standfirst={article.standfirst}
          author={article.author}
          date={article.date}
          readingTime={article.readingTime}
          locale={DEMO_LOCALE}
          cover={article.cover}
          tags={article.tags.map((tag) => ({
            label: tag,
            href: "/demo/content#index",
          }))}
        >
          {article.body}
        </ArticleLayout>

        <NewsletterSignup
          title="Keep reading Kesit"
          body="One email when an issue closes. No trackers, and no second list."
          cta="Subscribe"
          tone="subtle"
        />
      </main>

      <SiteFooter
        brand="Kesit"
        blurb="A fictional journal assembled entirely from Premium Kit blocks, used to prove the content flow end to end."
        groups={[
          {
            heading: "Publication",
            links: [
              { label: "Latest issue", href: "/demo/content#index" },
              { label: "Search", href: "/demo/content#search" },
              { label: "Newsletter", href: "/demo/content#newsletter" },
            ],
          },
          {
            heading: "Premium Kit",
            links: [
              { label: "Blocks", href: "/blocks" },
              { label: "Commerce demo", href: "/demo/commerce" },
              { label: "Catalogue", href: "/components" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

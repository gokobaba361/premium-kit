import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { SiteFooter } from "@/components/blocks/site-footer";
import { PageHeader } from "@/components/blocks/page-header";
import { BlogGrid } from "@/components/blocks/blog-grid";
import { ContentIndex } from "@/components/blocks/content-index";
import { NewsletterSignup } from "@/components/blocks/newsletter-signup";
import { ContentDemoSearch } from "@/components/site/content-demo-search";
import {
  DEMO_LOCALE,
  articleHref,
  demoArticles,
  demoCategories,
} from "@/components/site/content-demo-data";

export const metadata: Metadata = {
  title: "Content flow demo",
  description:
    "The blog grid, filterable content index, search results, article layout and newsletter blocks assembled into one editorial flow.",
};

const nav = [
  { label: "Latest", href: "/demo/content#index" },
  { label: "Search", href: "/demo/content#search" },
  { label: "About", href: "/demo/content#about" },
];

const footerGroups = [
  {
    heading: "Sections",
    links: demoCategories.map((category) => ({
      label: category,
      href: "/demo/content#index",
    })),
  },
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
];

export default function ContentDemoPage() {
  const featured = demoArticles.slice(0, 3);

  return (
    <ThemeScope theme="archive">
      <SiteNav
        brand="Kesit"
        brandHref="/demo/content"
        items={nav}
        cta={{ label: "Subscribe", href: "/demo/content#newsletter" }}
      />

      <main>
        <PageHeader
          title="Kesit"
          intro="A journal about how things are made: the measure of a column, the jig behind a repeatable cut, and the trade-offs a workshop can name out loud."
        />

        <BlogGrid
          title="This month"
          body="Three pieces from the current issue."
          posts={featured.map((article) => ({
            title: article.title,
            excerpt: article.excerpt,
            href: articleHref(article.slug),
            category: article.category,
            date: article.date,
            readingTime: article.readingTime,
            cover: article.cover,
          }))}
          tone="subtle"
        />

        <div id="index">
          <ContentIndex
            title="Every article"
            body="Filter the archive by section. Reading times are per article, not estimated in the browser."
            items={demoArticles.map((article) => ({
              title: article.title,
              excerpt: article.excerpt,
              href: articleHref(article.slug),
              category: article.category,
              date: article.date,
              readingTime: article.readingTime,
            }))}
            categories={demoCategories}
            locale={DEMO_LOCALE}
          />
        </div>

        <div id="search">
          <ContentDemoSearch />
        </div>

        <div id="newsletter">
          <NewsletterSignup
            title="The monthly dispatch"
            body="One email when an issue closes. No trackers, and no second list."
            cta="Subscribe"
          />
        </div>
      </main>

      <div id="about">
        <SiteFooter
          brand="Kesit"
          blurb="A fictional journal assembled entirely from Premium Kit blocks, used to prove the content flow end to end."
          groups={footerGroups}
        />
      </div>
    </ThemeScope>
  );
}

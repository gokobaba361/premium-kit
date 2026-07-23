import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/layout";
import { Table } from "@/components/primitives/data";
import { AnnouncementBar } from "@/components/blocks/announcement-bar";
import { PageHeader } from "@/components/blocks/page-header";
import { FeaturesSplit } from "@/components/blocks/features-split";
import { StatsBand } from "@/components/blocks/stats-band";
import { TeamGrid } from "@/components/blocks/team-grid";
import { BlogGrid } from "@/components/blocks/blog-grid";
import { Timeline } from "@/components/blocks/timeline";
import { NewsletterSignup } from "@/components/blocks/newsletter-signup";

export const metadata: Metadata = {
  title: "Block library",
  description: "Every section block in the kit, with a live example of the ones not used in a template.",
};

const inventory = [
  { block: "AnnouncementBar", use: "One line notice above the nav, dismissible", seen: "Below" },
  { block: "SiteNav + MobileNav", use: "Sticky header, drawer under 768px", seen: "All templates" },
  { block: "FloatingNav", use: "Rounded floating header for launch pages", seen: "Skeleton library" },
  { block: "MegaNav", use: "Multi-column product and resource discovery", seen: "Component preview" },
  { block: "HeroSplit", use: "Asymmetric hero, copy left, asset right", seen: "Obsidian, Forest, Cobalt, Clinic" },
  { block: "HeroEditorial", use: "Statement hero, full bleed image below", seen: "Bone, Terracotta" },
  { block: "HeroCentered", use: "Centered promise, actions and proof line", seen: "Skeleton library" },
  { block: "AppShowcaseHero", use: "Promise followed by a real interface screenshot", seen: "Skeleton library" },
  { block: "PageHeader", use: "Inner page orientation with breadcrumb", seen: "Below" },
  { block: "LogoWall", use: "Social proof strip, logos only", seen: "Obsidian, Cobalt" },
  { block: "FeaturesSplit", use: "Alternating image and copy, capped at 2 rows", seen: "Below" },
  { block: "FeatureBento", use: "Mixed span grid, exact cell count", seen: "All templates" },
  { block: "StepsFlow", use: "Named steps, no numbered labels", seen: "Cobalt, Clinic" },
  { block: "SpecGrouped", use: "Specifications in 3 clusters", seen: "Forest, Terracotta" },
  { block: "GalleryStrip", use: "Three image strip, optional full bleed", seen: "Forest, Terracotta" },
  { block: "CaseStudyGrid", use: "Outcome-led project cards", seen: "Skeleton library" },
  { block: "ProductGrid", use: "Two or four-column product collection", seen: "Skeleton library" },
  { block: "StatsBand", use: "Three figures, each with its source", seen: "Below" },
  { block: "Timeline", use: "Vertical history with real period labels", seen: "Below" },
  { block: "TeamGrid", use: "Portraits, name and role only", seen: "Below" },
  { block: "BlogGrid", use: "Article cards with category and date", seen: "Below" },
  { block: "ProofQuote", use: "One quote, three lines, full attribution", seen: "Most templates" },
  { block: "TestimonialGrid", use: "Three equally weighted attributed quotes", seen: "Skeleton library" },
  { block: "IntegrationGrid", use: "Six to twelve product connections", seen: "Skeleton library" },
  { block: "FaqAccordion", use: "Native details, works without JavaScript", seen: "Clinic" },
  { block: "PricingDuo", use: "Two plans, five features each", seen: "Obsidian, Cobalt" },
  { block: "ComparisonTable", use: "Feature-level comparison for two or three plans", seen: "Skeleton library" },
  { block: "DashboardShell", use: "Responsive application frame and navigation", seen: "Skeleton library" },
  { block: "MetricsOverview", use: "Four compact operating metrics", seen: "Skeleton library" },
  { block: "FilterToolbar", use: "Search and native URL-backed filters", seen: "Skeleton library" },
  { block: "AuthSplit", use: "Authentication form and product proof frame", seen: "Skeleton library" },
  { block: "DocsSidebar", use: "Grouped documentation navigation and article slot", seen: "Skeleton library" },
  { block: "ChangelogList", use: "Dated product and version updates", seen: "Skeleton library" },
  { block: "EventSchedule", use: "Two-day programme by time and speaker", seen: "Skeleton library" },
  { block: "LocationGrid", use: "Semantic address cards for multiple locations", seen: "Skeleton library" },
  { block: "ContactForm", use: "Labelled fields, inline errors, success state", seen: "Clinic" },
  { block: "NewsletterSignup", use: "Single field with validation", seen: "Below" },
  { block: "CtaBand", use: "Closing action, reuses the hero CTA label", seen: "Most templates" },
  { block: "SiteFooter", use: "Brand blurb plus three link groups", seen: "All templates" },
];

export default function BlocksPage() {
  return (
    <>
      <AnnouncementBar
        message="Blocks below render live. Themes are applied per page, not per block."
        action={{ label: "Open the component guide", href: "/kit" }}
      />

      <PageHeader
        title="Block library"
        intro="Thirty nine section blocks. Each one takes content as props and reads theme tokens for everything else, so the same block looks native across all twelve themes."
        trail={[
          { label: "Kit", href: "/" },
          { label: "Blocks", href: "/blocks" },
        ]}
      />

      <main>
        <section className="py-14">
          <Container>
            <Table
              columns={[
                { key: "block", header: "Block" },
                { key: "use", header: "What it does" },
                { key: "seen", header: "Used in" },
              ]}
              rows={inventory}
            />
            <p className="mt-6 text-sm text-muted">
              Blocks marked &ldquo;Below&rdquo; are rendered on this page. The rest are visible in
              the{" "}
              <Link href="/" className="text-accent underline underline-offset-4">
                six sector templates
              </Link>
              .
            </p>
          </Container>
        </section>

        <FeaturesSplit
          tone="subtle"
          features={[
            {
              title: "Two rows, then stop",
              body: "The component slices its input at two, because the third consecutive image and copy row is where a page starts reading as a template rather than a design.",
              points: [
                "Rows alternate side automatically",
                "Optional supporting points, capped at four",
                "Collapses to a single column under 768px",
              ],
              image: {
                src: "https://picsum.photos/seed/blocks-split-workshop/1200/900",
                alt: "Workshop bench with tools laid out",
              },
            },
            {
              title: "Copy leads, the image supports",
              body: "Each row carries one idea. If a row needs a subheading and a bullet list and a quote, it is a section of its own.",
              image: {
                src: "https://picsum.photos/seed/blocks-split-studio/1200/900",
                alt: "Studio wall covered in printed layouts",
              },
            },
          ]}
        />

        <StatsBand
          title="Numbers carry their source"
          body="The source field is required by the component. A figure without a provenance cannot be rendered."
          stats={[
            { value: "39", label: "Section blocks", source: "This repository" },
            { value: "6", label: "Sector themes", source: "src/design/themes.css" },
            { value: "0", label: "Hardcoded colors in components", source: "Enforced by review" },
          ]}
        />

        <Timeline
          title="Timeline"
          body="Periods are written the way people say them. No phase numbering."
          milestones={[
            {
              period: "Spring 2026",
              title: "Token contract and six themes",
              body: "One set of variable names, six palettes, one radius system per theme.",
            },
            {
              period: "Summer 2026",
              title: "Block library",
              body: "Thirty nine section blocks, each enforcing the layout rules it belongs to.",
            },
            {
              period: "Next",
              title: "Per theme display typography",
              body: "Each sector gets its own display face, replacing the shared default.",
            },
          ]}
          tone="subtle"
        />

        <TeamGrid
          title="Team grid"
          body="Portrait ratio, name and role. Biographies live on a person page, not under twelve faces."
          people={[
            {
              name: "Selin Kayacan",
              role: "Creative director",
              photo: { src: "https://picsum.photos/seed/team-selin/600/800", alt: "Selin Kayacan" },
            },
            {
              name: "Tomas Vrba",
              role: "Design engineer",
              photo: { src: "https://picsum.photos/seed/team-tomas/600/800", alt: "Tomas Vrba" },
            },
            {
              name: "Mira Okonkwo",
              role: "Systems lead",
              photo: { src: "https://picsum.photos/seed/team-mira/600/800", alt: "Mira Okonkwo" },
            },
            {
              name: "Ilkay Demirag",
              role: "Studio manager",
              photo: { src: "https://picsum.photos/seed/team-ilkay/600/800", alt: "Ilkay Demirag" },
            },
          ]}
        />

        <BlogGrid
          title="Writing grid"
          body="Category and date sit under the title as plain text, never as a pill over the cover."
          posts={[
            {
              title: "Why we deleted the staging server",
              excerpt: "Six teams, one shared environment and a queue. What replaced it and what it cost.",
              href: "/blocks",
              category: "Engineering",
              date: "2026-05-12",
              readingTime: "6 minute read",
              cover: {
                src: "https://picsum.photos/seed/post-staging-server/900/600",
                alt: "Server rack in a machine room",
              },
            },
            {
              title: "Specifying a pan that lasts thirty years",
              excerpt: "Casting, milling and seasoning decisions that only show up in year four.",
              href: "/blocks",
              category: "Making",
              date: "2026-04-02",
              readingTime: "9 minute read",
              cover: {
                src: "https://picsum.photos/seed/post-cast-iron/900/600",
                alt: "Cast iron pan cooling on a rack",
              },
            },
            {
              title: "The brief we turned down",
              excerpt: "A rebrand that would have looked good and solved nothing the client actually had.",
              href: "/blocks",
              category: "Studio",
              date: "2026-02-19",
              readingTime: "4 minute read",
              cover: {
                src: "https://picsum.photos/seed/post-studio-brief/900/600",
                alt: "Printed brief marked up in pencil",
              },
            },
          ]}
          tone="subtle"
        />

        <NewsletterSignup
          title="One field, four states"
          body="Idle, error, sending and subscribed. The error appears under the field, never as a toast."
          tone="base"
        />
      </main>
    </>
  );
}

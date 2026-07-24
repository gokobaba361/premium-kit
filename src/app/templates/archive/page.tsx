import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroEditorial } from "@/components/blocks/hero-editorial";
import { BlogGrid } from "@/components/blocks/blog-grid";
import { FeaturesSplit } from "@/components/blocks/features-split";
import { Timeline } from "@/components/blocks/timeline";
import { LocationGrid } from "@/components/blocks/location-grid";
import { NewsletterSignup } from "@/components/blocks/newsletter-signup";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Archive template",
  description: "Museum and cultural institution site built on the Archive preset.",
};

/**
 * Archive: publishing, museums and cultural institutions.
 * Paper and ink. A serif display, long measure, a deep red accent used once per
 * screen. Programme first, visiting close behind, history where it belongs.
 */
export default function ArchiveTemplate() {
  return (
    <ThemeScope theme="archive">
      <SiteNav
        brand="Liman Museum"
        items={[
          { label: "What's on", href: "#whats-on" },
          { label: "Collection", href: "#collection" },
          { label: "Visit", href: "#visit" },
          { label: "About", href: "#about" },
        ]}
        cta={{ label: "Plan a visit", href: "#visit" }}
      />

      <main>
        <HeroEditorial
          statement="A museum of the harbour and the people it moved."
          subtext="Two centuries of trade, migration and labour along the Izmir waterfront, told through objects and the records that survived them."
          primary={{ label: "See what's on", href: "#whats-on" }}
          image={{
            src: "https://picsum.photos/seed/liman-harbour-archive/1400/1050",
            alt: "Archival photograph of a working harbour",
          }}
        />

        <div id="whats-on">
          <BlogGrid
            title="What's on"
            body="Current and upcoming exhibitions."
            posts={[
              {
                title: "Ledgers of the Quay",
                excerpt: "The account books of a single trading house, read as a portrait of a city.",
                href: "#ledgers",
                category: "Until 14 September",
                date: "2026-04-02",
                readingTime: "Main gallery",
                cover: {
                  src: "https://picsum.photos/seed/liman-ledgers-show/900/600",
                  alt: "Open leather ledger under glass",
                },
              },
              {
                title: "Those Who Left, Those Who Stayed",
                excerpt: "Migration through the port between 1890 and 1930, in letters and photographs.",
                href: "#migration",
                category: "From 3 October",
                date: "2026-10-03",
                readingTime: "East wing",
                cover: {
                  src: "https://picsum.photos/seed/liman-migration-show/900/600",
                  alt: "Sepia photographs and letters in a case",
                },
              },
              {
                title: "The Dockworker's Hour",
                excerpt: "Labour, unions and the strikes that shaped the waterfront, in objects and testimony.",
                href: "#labour",
                category: "Until 30 November",
                date: "2026-05-20",
                readingTime: "Lower gallery",
                cover: {
                  src: "https://picsum.photos/seed/liman-labour-show/900/600",
                  alt: "Dockworker tools mounted on a wall",
                },
              },
            ]}
            tone="subtle"
          />
        </div>

        <div id="collection">
          <FeaturesSplit
            features={[
              {
                title: "A collection built from what people kept",
                body: "Most of what we hold was donated by families, not bought at auction. The provenance is a person, and we record it.",
                image: {
                  src: "https://picsum.photos/seed/liman-collection-store/1000/750",
                  alt: "Archival storage shelves with labelled boxes",
                },
                points: ["Free entry to the permanent collection", "Reading room open to researchers"],
              },
              {
                title: "Catalogued and, where we can, digitised",
                body: "The catalogue is public. Where copyright allows, the object is online at full resolution.",
                image: {
                  src: "https://picsum.photos/seed/liman-digitise-scan/1000/750",
                  alt: "Archivist scanning a photograph",
                },
              },
            ]}
          />
        </div>

        <div id="about">
          <Timeline
            title="A short history"
            milestones={[
              {
                period: "1978",
                title: "Founded in the old customs house",
                body: "A single room of donated harbour records, opened by a dockworkers' association.",
              },
              {
                period: "1996",
                title: "Moved to the grain warehouse",
                body: "The current building, a restored warehouse on the quay, gave the collection room to grow.",
              },
              {
                period: "2024",
                title: "The catalogue went public",
                body: "The full catalogue and a growing digitised archive opened online to anyone.",
              },
            ]}
            tone="subtle"
          />
        </div>

        <div id="visit">
          <LocationGrid
            title="Visit"
            body="Free entry to the permanent collection. Exhibitions are ticketed at the door."
            locations={[
              {
                name: "The museum",
                address: "Konak, Izmir",
                detail: "Tuesday to Sunday, 10:00 to 18:00",
                href: "#directions",
              },
              {
                name: "Reading room",
                address: "First floor, by appointment",
                detail: "Wednesday and Friday, researchers only",
                href: "#reading-room",
              },
            ]}
          />
        </div>

        <NewsletterSignup
          title="What's opening next"
          body="A short email before each exhibition opens. Nothing else."
          cta="Subscribe"
        />
      </main>

      <SiteFooter
        brand="Liman Museum"
        blurb="A museum of the harbour and the people it moved, on the Izmir waterfront."
        groups={[
          {
            heading: "Museum",
            links: [
              { label: "What's on", href: "#whats-on" },
              { label: "Collection", href: "#collection" },
              { label: "About", href: "#about" },
            ],
          },
          {
            heading: "Visit",
            links: [
              { label: "Opening hours", href: "#visit" },
              { label: "Directions", href: "#directions" },
              { label: "Reading room", href: "#reading-room" },
            ],
          },
          {
            heading: "Support",
            links: [
              { label: "Become a member", href: "#membership" },
              { label: "Donate", href: "#donate" },
              { label: "Contact", href: "#contact" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroEditorial } from "@/components/blocks/hero-editorial";
import { GalleryStrip } from "@/components/blocks/gallery-strip";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { ProofQuote } from "@/components/blocks/proof-quote";
import { SpecGrouped } from "@/components/blocks/spec-grouped";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Terracotta template",
  description: "Hotel and restaurant site built on the Terracotta preset.",
};

/**
 * Terracotta: hospitality, restaurants and venues.
 * Atmosphere carries the page, but the practical information a guest needs is
 * on the same page, grouped and undecorated. One booking intent throughout.
 */
export default function TerracottaTemplate() {
  return (
    <ThemeScope theme="terracotta">
      <SiteNav
        brand="Lodos House"
        items={[
          { label: "Rooms", href: "#rooms" },
          { label: "Kitchen", href: "#kitchen" },
          { label: "The house", href: "#house" },
          { label: "Getting here", href: "#visit" },
        ]}
        cta={{ label: "Check availability", href: "#book" }}
      />

      <main>
        <HeroEditorial
          statement="Nineteen rooms above a working harbour."
          subtext="A stone house on the Datca peninsula, open from March to November, with one kitchen and no lobby."
          primary={{ label: "Check availability", href: "#book" }}
          image={{
            src: "https://picsum.photos/seed/lodos-house-harbour-terrace/1800/800",
            alt: "Terrace overlooking a harbour at dusk",
          }}
        />

        <GalleryStrip
          bleed
          items={[
            {
              src: "https://picsum.photos/seed/lodos-room-morning-light/900/675",
              alt: "Guest room with shutters open to morning light",
            },
            {
              src: "https://picsum.photos/seed/lodos-kitchen-fish-service/900/1200",
              alt: "Fish being plated in the kitchen",
              tall: true,
            },
            {
              src: "https://picsum.photos/seed/lodos-stone-courtyard/900/675",
              alt: "Stone courtyard with a long shared table",
            },
          ]}
        />

        <FeatureBento
          title="What the house is, and what it is not"
          body="No spa, no conference room, no minibar. What we do keep, we keep properly."
          cells={[
            {
              title: "Nineteen rooms, six shapes",
              body: "Every room takes the shape the old house gave it. None of them are identical, and the plans are published.",
              span: 4,
              media: {
                src: "https://picsum.photos/seed/lodos-room-shapes-interior/1200/675",
                alt: "Corner room with a stone wall and a wooden bed",
              },
            },
            {
              title: "One kitchen, one sitting",
              body: "Dinner is served at eight, at shared tables, from whatever came off the boats that morning.",
              span: 2,
            },
            {
              title: "Open March to November",
              body: "The house closes for winter storms. Rates in March, April and November are roughly a third lower than in high summer.",
              span: 6,
              emphasis: true,
            },
          ]}
        />

        <ProofQuote
          quote="We came for two nights and rebooked from the terrace on the second morning. The dinner alone was worth the drive."
          name="Ilkay Demirag"
          role="Guest, returned three seasons running"
          tone="base"
        />

        <SpecGrouped
          title="Before you drive down"
          body="The peninsula road is slow by design. Plan the arrival and the rest of the stay takes care of itself."
          groups={[
            {
              heading: "Getting here",
              rows: [
                { label: "Nearest airport", value: "Dalaman, around two and a half hours by car" },
                { label: "Parking", value: "Free, in the courtyard behind the house" },
                { label: "Transfer", value: "Arranged on request when you book" },
              ],
            },
            {
              heading: "Staying",
              rows: [
                { label: "Check in", value: "From 14:00, check out by 11:00" },
                { label: "Breakfast", value: "Included, served on the terrace until 11:00" },
                { label: "Children", value: "Welcome, two rooms have a second bed" },
              ],
            },
            {
              heading: "Dining",
              rows: [
                { label: "Dinner", value: "One sitting at 20:00, booked with your room" },
                { label: "Menu", value: "Set, changes daily, dietary needs handled in advance" },
                { label: "Non guests", value: "Six seats held for walk in guests each evening" },
              ],
            },
          ]}
        />

        <CtaBand
          title="The house books a season ahead."
          body="Dates open in December for the following March. Cancellations are released on the website as they happen."
          primary={{ label: "Check availability", href: "#book" }}
        />
      </main>

      <SiteFooter
        brand="Lodos House"
        blurb="A nineteen room house and kitchen on the Datca peninsula."
        groups={[
          {
            heading: "Stay",
            links: [
              { label: "Rooms", href: "#rooms" },
              { label: "Rates", href: "#book" },
              { label: "The house", href: "#house" },
            ],
          },
          {
            heading: "Eat",
            links: [
              { label: "Kitchen", href: "#kitchen" },
              { label: "Dinner booking", href: "#kitchen" },
              { label: "Dietary needs", href: "#kitchen" },
            ],
          },
          {
            heading: "Practical",
            links: [
              { label: "Getting here", href: "#visit" },
              { label: "Season dates", href: "#visit" },
              { label: "Contact", href: "#contact" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

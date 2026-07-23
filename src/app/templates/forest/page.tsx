import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroSplit } from "@/components/blocks/hero-split";
import { GalleryStrip } from "@/components/blocks/gallery-strip";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { SpecGrouped } from "@/components/blocks/spec-grouped";
import { ProofQuote } from "@/components/blocks/proof-quote";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Forest template",
  description: "Premium consumer goods site built on the Forest preset.",
};

/**
 * Forest: premium consumer and DTC goods.
 * Photography leads, copy captions the product. Specifications are grouped
 * into three clusters instead of a hairline table. One CTA intent throughout.
 */
export default function ForestTemplate() {
  return (
    <ThemeScope theme="forest">
      <SiteNav
        brand="Ocak Goods"
        items={[
          { label: "Cookware", href: "#cookware" },
          { label: "Care", href: "#care" },
          { label: "Our workshop", href: "#workshop" },
          { label: "Stockists", href: "#stockists" },
        ]}
        cta={{ label: "Shop the collection", href: "#shop" }}
      />

      <main>
        <HeroSplit
          headline="Cast iron that outlives the kitchen it came from."
          subtext="Sand cast in Gaziantep, seasoned with cold pressed flaxseed, finished by hand before it ships."
          primary={{ label: "Shop the collection", href: "#shop" }}
          secondary={{ label: "See the workshop", href: "#workshop" }}
          image={{
            src: "https://picsum.photos/seed/ocak-cast-iron-skillet/1200/900",
            alt: "Cast iron skillet resting on a wooden work surface",
          }}
        />

        <GalleryStrip
          items={[
            {
              src: "https://picsum.photos/seed/ocak-foundry-pour/900/675",
              alt: "Molten iron poured into a sand mould",
              caption: "Pouring day, twice a month.",
            },
            {
              src: "https://picsum.photos/seed/ocak-hand-finishing/900/1200",
              alt: "Hands finishing the rim of a pan",
              caption: "Every rim is ground by hand.",
              tall: true,
            },
            {
              src: "https://picsum.photos/seed/ocak-kitchen-service/900/675",
              alt: "Skillet in use on a home stove",
              caption: "Oven safe to full heat.",
            },
          ]}
        />

        <FeatureBento
          title="Made to be repaired, not replaced"
          body="Three decisions separate a pan you keep from a pan you replace. All three cost more to make."
          cells={[
            {
              title: "Single piece casting",
              body: "Handle and body are poured together, so there is no riveted joint to loosen or trap grease.",
              span: 4,
              media: {
                src: "https://picsum.photos/seed/ocak-single-piece-casting/1200/675",
                alt: "Close view of a cast handle joint",
              },
            },
            {
              title: "Milled cooking surface",
              body: "The interior is machined smooth before seasoning, so it releases food from the first use.",
              span: 2,
            },
            {
              title: "Re-seasoning, free, for life",
              body: "Send a tired pan back to the workshop. We strip it, re-season it and return it within three weeks.",
              span: 6,
              emphasis: true,
            },
          ]}
        />

        <SpecGrouped
          title="The 28cm skillet, in detail"
          groups={[
            {
              heading: "Materials",
              rows: [
                { label: "Body", value: "Sand cast grey iron, single piece" },
                { label: "Seasoning", value: "Cold pressed flaxseed oil, six passes" },
                { label: "Finish", value: "Hand ground rim and cooking surface" },
              ],
            },
            {
              heading: "Cooking",
              rows: [
                { label: "Diameter", value: "28cm across the rim" },
                { label: "Heat sources", value: "Gas, electric, induction, open fire" },
                { label: "Oven", value: "Safe to any domestic oven temperature" },
              ],
            },
            {
              heading: "Care and support",
              rows: [
                { label: "Cleaning", value: "Hot water and a stiff brush, dried on the heat" },
                { label: "Re-seasoning", value: "Free for life, return shipping included" },
                { label: "Guarantee", value: "Replaced if it cracks or warps in normal use" },
              ],
            },
          ]}
        />

        <ProofQuote
          quote="It is the only pan that never leaves my stove. Four years in it looks better than the day it arrived."
          name="Selin Kayacan"
          role="Chef, Bostan Lokanta"
          portrait={{
            src: "https://picsum.photos/seed/selin-kayacan-portrait/600/750",
            alt: "Portrait of Selin Kayacan in her kitchen",
          }}
          tone="base"
        />

        <CtaBand
          title="One pan, made twice a month."
          body="Each pour makes around two hundred pieces. When a size sells out, the next batch is roughly four weeks away."
          primary={{ label: "Shop the collection", href: "#shop" }}
        />
      </main>

      <SiteFooter
        brand="Ocak Goods"
        blurb="Cast iron cookware made in Gaziantep, sold direct, repaired for life."
        groups={[
          {
            heading: "Shop",
            links: [
              { label: "Skillets", href: "#cookware" },
              { label: "Dutch ovens", href: "#cookware" },
              { label: "Gift sets", href: "#cookware" },
            ],
          },
          {
            heading: "Care",
            links: [
              { label: "Seasoning guide", href: "#care" },
              { label: "Re-seasoning service", href: "#care" },
              { label: "Guarantee", href: "#care" },
            ],
          },
          {
            heading: "Company",
            links: [
              { label: "The workshop", href: "#workshop" },
              { label: "Stockists", href: "#stockists" },
              { label: "Contact", href: "#contact" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

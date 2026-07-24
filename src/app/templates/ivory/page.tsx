import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroEditorial } from "@/components/blocks/hero-editorial";
import { GalleryStrip } from "@/components/blocks/gallery-strip";
import { FeaturesSplit } from "@/components/blocks/features-split";
import { ProductGrid } from "@/components/blocks/product-grid";
import { ProofQuote } from "@/components/blocks/proof-quote";
import { NewsletterSignup } from "@/components/blocks/newsletter-signup";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Ivory template",
  description: "Skincare brand site built on the Ivory preset.",
};

/**
 * Ivory: beauty, wellness and fashion.
 * Cold luxury rather than warm craft. Wide spacing, geometric type, imagery
 * leads and copy stays quiet. One purchase intent, no invented review counts.
 */
export default function IvoryTemplate() {
  return (
    <ThemeScope theme="ivory">
      <SiteNav
        brand="Meridian"
        items={[
          { label: "Shop", href: "#shop" },
          { label: "The formula", href: "#formula" },
          { label: "Ritual", href: "#ritual" },
          { label: "Journal", href: "#journal" },
        ]}
        cta={{ label: "Shop the range", href: "#shop" }}
      />

      <main>
        <HeroEditorial
          statement="Three steps. Nothing you cannot pronounce."
          subtext="A short skincare range formulated in Istanbul, sold without the ceremony or the twelve-step routine."
          primary={{ label: "Shop the range", href: "#shop" }}
          image={{
            src: "https://picsum.photos/seed/meridian-serum-bottle/1400/1050",
            alt: "Glass serum bottle on a pale stone surface",
          }}
        />

        <GalleryStrip
          items={[
            {
              src: "https://picsum.photos/seed/meridian-texture-drop/900/675",
              alt: "A single drop of serum on glass",
              caption: "One serum, one job.",
            },
            {
              src: "https://picsum.photos/seed/meridian-shelf-morning/900/1200",
              alt: "Three products on a bathroom shelf in morning light",
              caption: "The whole shelf, not a cabinet.",
              tall: true,
            },
            {
              src: "https://picsum.photos/seed/meridian-lab-pipette/900/675",
              alt: "Pipette measuring formula in a lab",
              caption: "Formulated and filled in Istanbul.",
            },
          ]}
        />

        <div id="formula">
          <FeaturesSplit
            features={[
              {
                title: "The full list is on the front",
                body: "Every ingredient and why it is there, printed where you can read it before you buy, not hidden on the base.",
                image: {
                  src: "https://picsum.photos/seed/meridian-label-front/1000/750",
                  alt: "Product label listing ingredients on the front",
                },
                points: ["No fragrance, no filler", "Percentages that actually do something"],
              },
              {
                title: "Made in small batches",
                body: "We fill to demand rather than to a warehouse, so what reaches you is recent.",
                image: {
                  src: "https://picsum.photos/seed/meridian-batch-fill/1000/750",
                  alt: "Small batch of bottles being filled",
                },
              },
            ]}
            tone="subtle"
          />
        </div>

        <div id="shop">
          <ProductGrid
            title="The range"
            body="Three products. Add the fourth only if your skin asks for it."
            products={[
              {
                name: "Morning serum",
                price: "640 TL",
                href: "#morning",
                image: {
                  src: "https://picsum.photos/seed/meridian-morning-serum/800/800",
                  alt: "Morning serum bottle",
                },
                note: "Vitamin C, 12 percent.",
              },
              {
                name: "Night cream",
                price: "720 TL",
                href: "#night",
                image: {
                  src: "https://picsum.photos/seed/meridian-night-cream/800/800",
                  alt: "Night cream jar",
                },
                note: "Retinal, low and slow.",
              },
              {
                name: "Daily SPF",
                price: "580 TL",
                href: "#spf",
                image: {
                  src: "https://picsum.photos/seed/meridian-daily-spf/800/800",
                  alt: "Daily SPF tube",
                },
                note: "SPF 50, no white cast.",
              },
            ]}
          />
        </div>

        <ProofQuote
          quote="Three bottles replaced a shelf of eleven. My skin did not notice the loss, and my bathroom did."
          name="Nur Erdogan"
          role="Customer since 2025"
          tone="subtle"
        />

        <div id="journal">
          <NewsletterSignup
            title="The occasional note"
            body="A short email when a formula changes or a batch ships. No routines to follow, no urgency."
            cta="Subscribe"
          />
        </div>
      </main>

      <SiteFooter
        brand="Meridian"
        blurb="A short skincare range formulated in Istanbul, sold without the ceremony."
        groups={[
          {
            heading: "Shop",
            links: [
              { label: "The range", href: "#shop" },
              { label: "The formula", href: "#formula" },
              { label: "Gift sets", href: "#gifts" },
            ],
          },
          {
            heading: "Care",
            links: [
              { label: "Delivery", href: "#delivery" },
              { label: "Returns", href: "#returns" },
              { label: "Contact", href: "#contact" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

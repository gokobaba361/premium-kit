import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroEditorial } from "@/components/blocks/hero-editorial";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { ProofQuote } from "@/components/blocks/proof-quote";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Bone template",
  description: "Design studio site built on the Bone preset.",
};

/**
 * Bone: studios, agencies and portfolios.
 * Editorial hero carries the page, work grid does the proving, and the
 * single CTA intent ("Start a project") is worded identically everywhere.
 */
export default function BoneTemplate() {
  return (
    <ThemeScope theme="bone">
      <SiteNav
        brand="Kavram Studio"
        items={[
          { label: "Work", href: "#work" },
          { label: "Studio", href: "#studio" },
          { label: "Journal", href: "#journal" },
        ]}
        cta={{ label: "Start a project", href: "#contact" }}
      />

      <main>
        <HeroEditorial
          statement="Brands that hold up off the screen."
          subtext="Identity, packaging and digital for founders who already know what they are building."
          primary={{ label: "Start a project", href: "#contact" }}
          image={{
            src: "https://picsum.photos/seed/kavram-studio-print-table/1800/800",
            alt: "Printed identity work laid out on a studio table",
          }}
        />

        <FeatureBento
          title="Selected work"
          cells={[
            {
              title: "Meridyen Coffee",
              body: "Identity, packaging system and retail signage for a roaster with eleven locations.",
              span: 4,
              media: {
                src: "https://picsum.photos/seed/meridyen-coffee-packaging/1200/675",
                alt: "Coffee packaging system photographed on a counter",
              },
            },
            {
              title: "Salt Archive",
              body: "Editorial site and type system for a photography archive spanning four decades.",
              span: 2,
              media: {
                src: "https://picsum.photos/seed/salt-archive-photography/800/450",
                alt: "Archive photography prints in a wooden tray",
              },
            },
            {
              title: "Tuz Hotel",
              body: "Full identity, wayfinding and booking experience for a nineteen room coastal hotel.",
              span: 6,
              media: {
                src: "https://picsum.photos/seed/tuz-hotel-lobby-interior/1800/760",
                alt: "Hotel lobby interior with natural light",
              },
            },
          ]}
        />

        <ProofQuote
          quote="They pushed back on half our brief. The half they kept is the reason the launch worked."
          name="Deniz Arikan"
          role="Founder, Meridyen Coffee"
          tone="base"
        />

        <CtaBand
          title="We take on four projects a year."
          body="Tell us what you are building and when it needs to exist. We answer within two working days."
          primary={{ label: "Start a project", href: "#contact" }}
        />
      </main>

      <SiteFooter
        brand="Kavram Studio"
        blurb="An independent design studio working on identity, packaging and digital."
        groups={[
          {
            heading: "Studio",
            links: [
              { label: "Work", href: "#work" },
              { label: "About", href: "#studio" },
              { label: "Journal", href: "#journal" },
            ],
          },
          {
            heading: "Services",
            links: [
              { label: "Identity", href: "#work" },
              { label: "Packaging", href: "#work" },
              { label: "Digital", href: "#work" },
            ],
          },
          {
            heading: "Contact",
            links: [
              { label: "New projects", href: "#contact" },
              { label: "Instagram", href: "#contact" },
              { label: "LinkedIn", href: "#contact" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

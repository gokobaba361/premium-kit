import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroEditorial } from "@/components/blocks/hero-editorial";
import { GalleryStrip } from "@/components/blocks/gallery-strip";
import { FeaturesSplit } from "@/components/blocks/features-split";
import { StatsBand } from "@/components/blocks/stats-band";
import { TeamGrid } from "@/components/blocks/team-grid";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Slate template",
  description: "Architecture practice site built on the Slate preset.",
};

/**
 * Slate: architecture, property and interiors.
 * Photographs and plans carry the page. Copy captions the work rather than
 * selling it, stats are sourced, and one enquiry intent runs throughout.
 */
export default function SlateTemplate() {
  return (
    <ThemeScope theme="slate">
      <SiteNav
        brand="Payas Mimarlık"
        items={[
          { label: "Work", href: "#work" },
          { label: "Practice", href: "#practice" },
          { label: "People", href: "#people" },
          { label: "Contact", href: "#contact" },
        ]}
        cta={{ label: "Start a project", href: "#contact" }}
      />

      <main>
        <HeroEditorial
          statement="We build for the second owner."
          subtext="An architecture practice working in stone, timber and daylight across the eastern Mediterranean."
          primary={{ label: "See the work", href: "#work" }}
          image={{
            src: "https://picsum.photos/seed/payas-stone-facade/1400/1050",
            alt: "Stone facade with deep window reveals in raking light",
          }}
        />

        <div id="work">
          <GalleryStrip
            items={[
              {
                src: "https://picsum.photos/seed/payas-courtyard-house/900/675",
                alt: "Courtyard house with a shaded colonnade",
                caption: "Courtyard house, Antakya.",
              },
              {
                src: "https://picsum.photos/seed/payas-stair-light/900/1200",
                alt: "Concrete stair lit from a roof slot",
                caption: "A stair that borrows the roof for light.",
                tall: true,
              },
              {
                src: "https://picsum.photos/seed/payas-library-timber/900/675",
                alt: "Timber-lined reading room",
                caption: "Village library, timber and lime.",
              },
            ]}
          />
        </div>

        <FeaturesSplit
          features={[
            {
              title: "We survey the site before we draw",
              body: "Sun, wind, water and the neighbours come first. The plan is what is left once the site has spoken.",
              image: {
                src: "https://picsum.photos/seed/payas-site-survey/1000/750",
                alt: "Architect measuring a sloped site",
              },
              points: ["Full daylight and shadow study", "Local stone and lime, sourced within the province"],
            },
            {
              title: "We detail for a building that ages well",
              body: "Materials are chosen to weather rather than to be replaced. The drawings go down to the joint.",
              image: {
                src: "https://picsum.photos/seed/payas-detail-joint/1000/750",
                alt: "Close detail of a stone and timber joint",
              },
            },
          ]}
          tone="subtle"
        />

        <div id="practice">
          <StatsBand
            title="The practice"
            body="Figures from our own project register, reviewed each year."
            stats={[
              { value: "22 years", label: "In practice", source: "Chamber of Architects registration" },
              { value: "48", label: "Buildings completed", source: "Project register" },
              { value: "9", label: "People", source: "Payroll, 2026" },
            ]}
          />
        </div>

        <div id="people">
          <TeamGrid
            title="Who you will work with"
            body="A small studio, so the people who design the building are the people on site."
            people={[
              {
                name: "Selin Payas",
                role: "Principal",
                photo: {
                  src: "https://picsum.photos/seed/payas-portrait-selin/600/750",
                  alt: "Portrait of Selin Payas",
                },
              },
              {
                name: "Cem Aksoy",
                role: "Project architect",
                photo: {
                  src: "https://picsum.photos/seed/payas-portrait-cem/600/750",
                  alt: "Portrait of Cem Aksoy",
                },
              },
              {
                name: "Ilkay Toros",
                role: "Site architect",
                photo: {
                  src: "https://picsum.photos/seed/payas-portrait-ilkay/600/750",
                  alt: "Portrait of Ilkay Toros",
                },
              },
            ]}
          />
        </div>

        <div id="contact">
          <CtaBand
            title="Tell us about the site."
            body="Send the location and what you want to build. We visit before we quote."
            primary={{ label: "Start a project", href: "#enquiry" }}
          />
        </div>
      </main>

      <SiteFooter
        brand="Payas Mimarlık"
        blurb="An architecture practice working in stone, timber and daylight across the eastern Mediterranean."
        groups={[
          {
            heading: "Studio",
            links: [
              { label: "Work", href: "#work" },
              { label: "Practice", href: "#practice" },
              { label: "People", href: "#people" },
            ],
          },
          {
            heading: "Contact",
            links: [
              { label: "Enquiries", href: "#contact" },
              { label: "Press", href: "#press" },
              { label: "Careers", href: "#careers" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

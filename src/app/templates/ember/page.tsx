import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroSplit } from "@/components/blocks/hero-split";
import { StatsBand } from "@/components/blocks/stats-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { StepsFlow } from "@/components/blocks/steps-flow";
import { ProofQuote } from "@/components/blocks/proof-quote";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Ember template",
  description: "Strength training studio site built on the Ember preset.",
};

/**
 * Ember: fitness, sport and performance.
 * Energy without shouting: a dark ground, one hot accent, heavy wide type, and
 * a single membership intent. Numbers are from the studio's own records.
 */
export default function EmberTemplate() {
  return (
    <ThemeScope theme="ember">
      <SiteNav
        brand="Ocak Strength"
        items={[
          { label: "Training", href: "#training" },
          { label: "Coaches", href: "#coaches" },
          { label: "Pricing", href: "#pricing" },
          { label: "Timetable", href: "#timetable" },
        ]}
        cta={{ label: "Book a trial", href: "#trial" }}
      />

      <main>
        <HeroSplit
          headline="Barbell strength, coached in groups of six."
          subtext="A strength gym in Izmir where every session is programmed and every lift is watched."
          primary={{ label: "Book a trial", href: "#trial" }}
          secondary={{ label: "See the timetable", href: "#timetable" }}
          image={{
            src: "https://picsum.photos/seed/ocak-barbell-rack/1200/900",
            alt: "Loaded barbell on a rack in a strength gym",
          }}
        />

        <StatsBand
          title="The gym in numbers"
          body="From our own attendance and membership records, updated monthly."
          stats={[
            { value: "6", label: "Lifters per coach", source: "Class register" },
            { value: "312", label: "Active members", source: "Membership system, 2026" },
            { value: "5:1", label: "Members who renew after three months", source: "Retention report" },
          ]}
        />

        <div id="training">
          <FeatureBento
            title="Programmed, not improvised"
            body="You follow a plan that progresses. Nobody hands you a random workout and a playlist."
            cells={[
              {
                title: "One programme, twelve weeks",
                body: "Every session builds on the last. Your numbers are written down and they go up.",
                span: 3,
              },
              {
                title: "A coach on the floor, always",
                body: "Six lifters to one coach means your setup gets corrected before the rep, not after.",
                span: 3,
              },
              {
                title: "Strength first, conditioning that earns its place",
                body: "The barbell work is the point. Conditioning is short, hard and there for a reason.",
                span: 6,
                media: {
                  src: "https://picsum.photos/seed/ocak-deadlift-set/1600/700",
                  alt: "Lifter mid deadlift under a coach's eye",
                },
              },
            ]}
          />
        </div>

        <StepsFlow
          title="Your first two weeks"
          body="You do not walk in and get thrown under a heavy bar. Here is the actual start."
          steps={[
            {
              title: "Movement session",
              body: "One coach, one hour, no load that matters. We see how you move and where to start.",
            },
            {
              title: "Learn the five lifts",
              body: "Squat, press, deadlift, row, chin. Light, technical, until the pattern is yours.",
            },
            {
              title: "Join a group",
              body: "You slot into a class at your level and start the twelve week programme.",
            },
          ]}
          tone="subtle"
        />

        <ProofQuote
          quote="I had trained for years and never got stronger. Six months here added forty kilos to my deadlift because someone finally wrote a plan and watched me do it."
          name="Deniz Kaya"
          role="Member since 2025"
          portrait={{
            src: "https://picsum.photos/seed/ocak-member-deniz/600/750",
            alt: "Portrait of Deniz Kaya",
          }}
          tone="base"
        />

        <div id="trial">
          <CtaBand
            title="First session is a movement check, not a beasting."
            body="Book a trial, meet a coach, and lift nothing you are not ready for."
            primary={{ label: "Book a trial", href: "#book" }}
          />
        </div>
      </main>

      <SiteFooter
        brand="Ocak Strength"
        blurb="A strength gym in Izmir where every session is programmed and every lift is watched."
        groups={[
          {
            heading: "Train",
            links: [
              { label: "Training", href: "#training" },
              { label: "Timetable", href: "#timetable" },
              { label: "Pricing", href: "#pricing" },
            ],
          },
          {
            heading: "Gym",
            links: [
              { label: "Coaches", href: "#coaches" },
              { label: "Location", href: "#location" },
              { label: "Contact", href: "#contact" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

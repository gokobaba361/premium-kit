import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroCentered } from "@/components/blocks/hero-centered";
import { StatsBand } from "@/components/blocks/stats-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { EventSchedule } from "@/components/blocks/event-schedule";
import { TestimonialGrid } from "@/components/blocks/testimonial-grid";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Neon template",
  description: "Game studio launch site built on the Neon preset.",
};

/**
 * Neon: gaming, streaming and nightlife.
 * A dark violet ground with one electric accent, used with restraint rather
 * than sprayed on every element. Techy geometric type, one wishlist intent.
 */
export default function NeonTemplate() {
  return (
    <ThemeScope theme="neon">
      <SiteNav
        brand="Halcyon"
        items={[
          { label: "Game", href: "#game" },
          { label: "Modes", href: "#modes" },
          { label: "Schedule", href: "#schedule" },
          { label: "Community", href: "#community" },
        ]}
        cta={{ label: "Wishlist now", href: "#wishlist" }}
      />

      <main>
        <HeroCentered
          eyebrow="Playtest live this autumn"
          headline="A co-op heist game where the plan never survives contact."
          subtext="Four players, one vault, and a building that reacts to every move you make."
          primary={{ label: "Wishlist now", href: "#wishlist" }}
          secondary={{ label: "Watch the reveal", href: "#reveal" }}
        />

        <StatsBand
          title="From the closed playtest"
          body="Figures from our own telemetry across the March closed playtest."
          stats={[
            { value: "18,400", label: "Playtesters", source: "Playtest sign-up system" },
            { value: "41 min", label: "Median session", source: "Playtest telemetry" },
            { value: "3.2", label: "Runs before a first clean escape", source: "Playtest telemetry" },
          ]}
        />

        <div id="modes">
          <FeatureBento
            title="The building is the other player"
            body="Halcyon does not spawn waves at you. It watches, adapts and closes the exits you were counting on."
            cells={[
              {
                title: "Every room remembers",
                body: "Trip an alarm on the third floor and the guards on the first change their patrol for the rest of the run.",
                span: 4,
                media: {
                  src: "https://picsum.photos/seed/halcyon-vault-room/900/600",
                  alt: "Stylised vault interior with security lasers",
                },
              },
              {
                title: "Four roles, no duplicates",
                body: "Hacker, muscle, face, ghost. One each, so the team is a real team.",
                span: 2,
                emphasis: true,
              },
              {
                title: "The plan is a suggestion",
                body: "You draw the route in the lobby. The building spends the whole heist trying to break it.",
                span: 3,
              },
              {
                title: "Loud or quiet, both work",
                body: "Go silent for the bonus or go loud and fight to the roof. The game does not punish either.",
                span: 3,
              },
            ]}
          />
        </div>

        <div id="schedule">
          <EventSchedule
            title="Launch week, streamed"
            body="Every session is on the studio channel and stays up afterwards."
            days={[
              {
                date: "2026-11-10",
                sessions: [
                  { time: "18:00", title: "Gameplay reveal, full heist start to finish", track: "Main stream" },
                  { time: "20:00", title: "Developer Q and A", speaker: "The Halcyon team", track: "Main stream" },
                ],
              },
              {
                date: "2026-11-11",
                sessions: [
                  { time: "17:00", title: "Community heist night, devs versus players", track: "Main stream" },
                  { time: "21:00", title: "Speedrun showcase", speaker: "Invited runners", track: "Main stream" },
                ],
              },
            ]}
            tone="subtle"
          />
        </div>

        <div id="community">
          <TestimonialGrid
            title="What playtesters said"
            testimonials={[
              {
                quote: "We spent twenty minutes planning and the plan died in the first thirty seconds. Best twenty minutes I have had in a co-op game.",
                name: "Kerem Aydin",
                role: "Closed playtester",
              },
              {
                quote: "The building genuinely outplayed us. We changed our whole approach on run four and it adapted again.",
                name: "Sofia Marlowe",
                role: "Closed playtester",
              },
              {
                quote: "Four roles with no overlap means nobody is the spare. Everyone has a job when it goes loud.",
                name: "Jonas Weiss",
                role: "Closed playtester",
              },
            ]}
          />
        </div>

        <div id="wishlist">
          <CtaBand
            title="Wishlist Halcyon."
            body="Get the playtest invite and the launch date before anyone else."
            primary={{ label: "Wishlist now", href: "#store" }}
          />
        </div>
      </main>

      <SiteFooter
        brand="Halcyon"
        blurb="A co-op heist game where the building fights back. From an independent studio."
        groups={[
          {
            heading: "Game",
            links: [
              { label: "Overview", href: "#game" },
              { label: "Modes", href: "#modes" },
              { label: "Schedule", href: "#schedule" },
            ],
          },
          {
            heading: "Community",
            links: [
              { label: "Discord", href: "#discord" },
              { label: "Playtest", href: "#playtest" },
              { label: "Press kit", href: "#press" },
            ],
          },
          {
            heading: "Studio",
            links: [
              { label: "About", href: "#about" },
              { label: "Careers", href: "#careers" },
              { label: "Contact", href: "#contact" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

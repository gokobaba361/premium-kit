import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { AppShowcaseHero } from "@/components/blocks/app-showcase-hero";
import { LogoWall } from "@/components/blocks/logo-wall";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { StepsFlow } from "@/components/blocks/steps-flow";
import { TestimonialGrid } from "@/components/blocks/testimonial-grid";
import { PricingDuo } from "@/components/blocks/pricing-duo";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Signal template",
  description: "Consumer productivity app site built on the Signal preset.",
};

/**
 * Signal: consumer apps, startups and productivity.
 * Bright and direct: a screenshot-led hero, one product promise, a pricing
 * block that states the free tier plainly, and a single sign-up intent.
 */
export default function SignalTemplate() {
  return (
    <ThemeScope theme="signal">
      <SiteNav
        brand="Demli"
        items={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Teams", href: "#teams" },
          { label: "Sign in", href: "#signin" },
        ]}
        cta={{ label: "Get started", href: "#start" }}
      />

      <main>
        <AppShowcaseHero
          headline="Your week, planned before you open your laptop."
          subtext="Demli turns scattered notes, emails and habits into one plan you can actually keep."
          primary={{ label: "Get started", href: "#start" }}
          secondary={{ label: "See how it works", href: "#features" }}
          screenshot={{
            src: "https://picsum.photos/seed/demli-week-planner/1400/900",
            alt: "Weekly planner screen with tasks grouped by day",
          }}
        />

        <LogoWall
          title="Works with the apps you already open"
          slugs={["googlecalendar", "notion", "slack", "gmail", "todoist"]}
          tint="6b6b85"
        />

        <div id="features">
          <FeatureBento
            title="A planner that plans, not another empty list"
            body="Demli drafts the week for you. You edit instead of starting from a blank page."
            cells={[
              {
                title: "It drafts your week",
                body: "Deadlines, habits and calendar events become a first plan you adjust in a minute.",
                span: 4,
                media: {
                  src: "https://picsum.photos/seed/demli-draft-week/900/600",
                  alt: "Suggested weekly plan on a phone",
                },
              },
              {
                title: "One inbox for tasks",
                body: "Forward an email, it becomes a task with the thread attached.",
                span: 2,
                emphasis: true,
              },
              {
                title: "Habits that move",
                body: "A missed habit reschedules itself instead of turning red and shaming you.",
                span: 3,
              },
              {
                title: "Ends the day honest",
                body: "An evening review moves what did not happen and closes what did.",
                span: 3,
              },
            ]}
          />
        </div>

        <StepsFlow
          title="Set up in three minutes"
          body="No onboarding call, no template gallery to wade through."
          steps={[
            {
              title: "Connect a calendar",
              body: "Read only. Demli reads your events to plan around them and writes nothing back until you ask.",
            },
            {
              title: "Add what matters this week",
              body: "Three goals is enough to start. Demli drafts the rest of the week around them.",
            },
            {
              title: "Keep or change the plan",
              body: "Drag anything. Demli learns when you actually do each kind of work.",
            },
          ]}
          tone="subtle"
        />

        <TestimonialGrid
          title="What the first month tends to look like"
          testimonials={[
            {
              quote: "I stopped keeping three lists. There is one plan now and I trust it enough to close the laptop.",
              name: "Aylin Demir",
              role: "Freelance designer",
            },
            {
              quote: "The email to task thing sounds small. It removed the job I hated most on Mondays.",
              name: "Berk Ozan",
              role: "Founder",
              company: "Kavat",
            },
            {
              quote: "Habits rescheduling instead of guilt-tripping me is the reason I still use it.",
              name: "Lena Fischer",
              role: "PhD student",
            },
          ]}
        />

        <div id="pricing">
          <PricingDuo
            title="Free for one, fair for a team"
            body="The free plan is a real plan, not a two-week trap."
            plans={[
              {
                name: "Personal",
                price: "Free",
                summary: "For one person planning their own week.",
                features: ["One calendar connection", "Unlimited tasks and habits", "Evening review"],
                cta: { label: "Get started", href: "#start" },
              },
              {
                name: "Team",
                price: "90 TL",
                cadence: "per person, per month",
                summary: "For a small team sharing a week.",
                features: [
                  "Everything in Personal",
                  "Shared projects and handoffs",
                  "Team calendar connections",
                  "Admin and billing",
                ],
                cta: { label: "Get started", href: "#start" },
                featured: true,
              },
            ]}
            tone="subtle"
          />
        </div>

        <CtaBand
          title="Plan next week in three minutes."
          body="Connect one calendar, add three goals, and see the draft before you decide."
          primary={{ label: "Get started", href: "#start" }}
        />
      </main>

      <SiteFooter
        brand="Demli"
        blurb="A planner that drafts your week so you edit instead of starting from a blank page."
        groups={[
          {
            heading: "Product",
            links: [
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "Teams", href: "#teams" },
            ],
          },
          {
            heading: "Company",
            links: [
              { label: "About", href: "#about" },
              { label: "Careers", href: "#careers" },
              { label: "Contact", href: "#contact" },
            ],
          },
          {
            heading: "Help",
            links: [
              { label: "Guides", href: "#guides" },
              { label: "Status", href: "#status" },
              { label: "Privacy", href: "#privacy" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

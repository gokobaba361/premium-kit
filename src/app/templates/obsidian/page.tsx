import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroSplit } from "@/components/blocks/hero-split";
import { LogoWall } from "@/components/blocks/logo-wall";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { ProofQuote } from "@/components/blocks/proof-quote";
import { PricingDuo } from "@/components/blocks/pricing-duo";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Obsidian template",
  description: "Developer tool landing page built on the Obsidian preset.",
};

/**
 * Obsidian: developer tools and technical SaaS.
 * Layout families used, each exactly once: split hero, logo strip, bento,
 * quote, pricing, closing band, footer. One CTA intent ("Start free").
 */
export default function ObsidianTemplate() {
  return (
    <ThemeScope theme="obsidian">
      <SiteNav
        brand="Halyard"
        items={[
          { label: "Product", href: "#product" },
          { label: "Pricing", href: "#pricing" },
          { label: "Docs", href: "#docs" },
          { label: "Changelog", href: "#changelog" },
        ]}
        cta={{ label: "Start free", href: "#start" }}
      />

      <main>
        <HeroSplit
          headline="Every branch gets a real environment."
          subtext="Preview deploys with logs, traces and database branches attached, ready before the first review comment."
          primary={{ label: "Start free", href: "#start" }}
          secondary={{ label: "Read the docs", href: "#docs" }}
          image={{
            src: "https://picsum.photos/seed/halyard-terminal-desk/1200/900",
            alt: "Engineer reviewing a deployment on a laptop",
          }}
        />

        <LogoWall
          slugs={["linear", "supabase", "sentry", "grafana", "cloudflare"]}
          tint="9aa1ad"
        />

        <FeatureBento
          title="Built for the part of shipping that actually hurts"
          body="Not the deploy itself. The twenty minutes after it, when something is off and nobody can reproduce it."
          cells={[
            {
              title: "Branch environments",
              body: "Each pull request gets an isolated stack with its own database branch and seeded data.",
              span: 4,
              media: {
                src: "https://picsum.photos/seed/halyard-branch-env/1000/560",
                alt: "Terminal output from a deployment pipeline",
              },
            },
            {
              title: "Traces on by default",
              body: "Requests are sampled from the first deploy. No agent to install, no config to forget.",
              span: 2,
            },
            {
              title: "Rollback in one action",
              body: "Every deploy keeps its artifact. Returning to the previous build takes a single command.",
              span: 3,
            },
            {
              title: "Access that expires",
              body: "Environment credentials are scoped to the branch and revoked when it merges.",
              span: 3,
              emphasis: true,
            },
            {
              title: "Runs where your code already lives",
              body: "GitHub, GitLab and self hosted Git are first class. The pipeline reads your existing config instead of replacing it.",
              span: 6,
              media: {
                src: "https://picsum.photos/seed/halyard-team-review/1600/700",
                alt: "Two engineers reviewing code together",
              },
            },
          ]}
        />

        <ProofQuote
          quote="We stopped keeping a staging server alive for six teams. Branch environments made the argument for us."
          name="Mira Okonkwo"
          role="Staff engineer, Northbeam Logistics"
          portrait={{
            src: "https://picsum.photos/seed/mira-okonkwo-portrait/600/750",
            alt: "Portrait of Mira Okonkwo",
          }}
        />

        <PricingDuo
          title="Two plans, priced on environments"
          body="Seats are unlimited on both. You pay for what runs, not for who logs in."
          plans={[
            {
              name: "Team",
              price: "$0",
              cadence: "for 3 environments",
              summary: "Enough for a small team running one product.",
              features: [
                "3 concurrent environments",
                "7 day log retention",
                "GitHub and GitLab integration",
                "Community support",
              ],
              cta: { label: "Start free", href: "#start" },
            },
            {
              name: "Scale",
              price: "$40",
              cadence: "per environment",
              summary: "For teams where every branch needs its own stack.",
              features: [
                "Unlimited environments",
                "90 day log retention",
                "Self hosted Git support",
                "Scoped credentials and audit log",
                "Priority support",
              ],
              cta: { label: "Start free", href: "#start" },
              featured: true,
            },
          ]}
          tone="subtle"
        />

        <CtaBand
          title="Put the next branch on a real URL."
          body="Connect a repository and the first environment builds itself. No card, no sales call."
          primary={{ label: "Start free", href: "#start" }}
        />
      </main>

      <SiteFooter
        brand="Halyard"
        blurb="Preview environments for teams that review code against something real."
        groups={[
          {
            heading: "Product",
            links: [
              { label: "Environments", href: "#product" },
              { label: "Observability", href: "#product" },
              { label: "Pricing", href: "#pricing" },
            ],
          },
          {
            heading: "Developers",
            links: [
              { label: "Documentation", href: "#docs" },
              { label: "Changelog", href: "#changelog" },
              { label: "Status", href: "#status" },
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
        ]}
      />
    </ThemeScope>
  );
}

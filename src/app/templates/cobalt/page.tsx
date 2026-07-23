import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroSplit } from "@/components/blocks/hero-split";
import { LogoWall } from "@/components/blocks/logo-wall";
import { StepsFlow } from "@/components/blocks/steps-flow";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { ProofQuote } from "@/components/blocks/proof-quote";
import { PricingDuo } from "@/components/blocks/pricing-duo";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Cobalt template",
  description: "Fintech platform site built on the Cobalt preset.",
};

/**
 * Cobalt: fintech and B2B platforms.
 * Proof outranks polish: logo wall directly under the hero, a named operator
 * quote, and a two plan pricing block that states what it costs.
 */
export default function CobaltTemplate() {
  return (
    <ThemeScope theme="cobalt">
      <SiteNav
        brand="Ledgerline"
        items={[
          { label: "Platform", href: "#platform" },
          { label: "Pricing", href: "#pricing" },
          { label: "Security", href: "#security" },
          { label: "Customers", href: "#customers" },
        ]}
        cta={{ label: "Open an account", href: "#open" }}
      />

      <main>
        <HeroSplit
          headline="Treasury that closes the month with you."
          subtext="Accounts, cards and reconciliation in one ledger, reconciled daily against every bank you already use."
          primary={{ label: "Open an account", href: "#open" }}
          secondary={{ label: "Talk to finance", href: "#contact" }}
          image={{
            src: "https://picsum.photos/seed/ledgerline-finance-desk/1200/900",
            alt: "Finance team reviewing accounts on a laptop",
          }}
        />

        <LogoWall
          slugs={["stripe", "xero", "quickbooks", "shopify", "netsuite"]}
          tint="525b71"
        />

        <StepsFlow
          title="Live in an afternoon, not a quarter"
          body="Onboarding is self serve up to the point where a regulator needs a human. Then we handle that part."
          steps={[
            {
              title: "Connect your banks",
              body: "Read only connections to your existing accounts. Nothing moves until you approve a rule.",
            },
            {
              title: "Import the chart of accounts",
              body: "We map your ledger from your accounting system, then show you every line we could not match.",
            },
            {
              title: "Approve the first close",
              body: "Reconciliation runs nightly. You review exceptions instead of rebuilding a spreadsheet.",
            },
          ]}
          tone="subtle"
        />

        <FeatureBento
          title="Built around the controls your auditor asks for"
          cells={[
            {
              title: "Dual approval on every movement",
              body: "Thresholds are set per entity. Anything above them needs a second named approver.",
              span: 3,
            },
            {
              title: "Immutable audit trail",
              body: "Every change keeps its actor, timestamp and prior value. Exports are signed.",
              span: 3,
            },
            {
              title: "Entity level segregation",
              body: "Subsidiaries keep separate ledgers, separate permissions and separate statements, consolidated only when you ask.",
              span: 6,
              media: {
                src: "https://picsum.photos/seed/ledgerline-audit-review/1600/700",
                alt: "Auditor reviewing printed statements at a desk",
              },
            },
          ]}
        />

        <ProofQuote
          quote="Close went from nine days to three. The difference was not speed, it was not having to rebuild the same reconciliation every month."
          name="Tomas Vrba"
          role="Head of finance, Kestrel Freight"
          portrait={{
            src: "https://picsum.photos/seed/tomas-vrba-portrait/600/750",
            alt: "Portrait of Tomas Vrba",
          }}
          tone="base"
        />

        <PricingDuo
          title="Priced per entity, not per seat"
          body="Every plan includes unlimited users, unlimited approvers and the full audit trail."
          plans={[
            {
              name: "Single entity",
              price: "$290",
              cadence: "per month",
              summary: "One legal entity, one ledger, one close.",
              features: [
                "Unlimited users and approvers",
                "Daily bank reconciliation",
                "Accounting system sync",
                "Signed audit exports",
              ],
              cta: { label: "Open an account", href: "#open" },
            },
            {
              name: "Group",
              price: "$740",
              cadence: "per month",
              summary: "For groups running subsidiaries in more than one country.",
              features: [
                "Up to 10 entities, consolidated on demand",
                "Multi currency ledgers",
                "Entity level permissions",
                "Dual approval thresholds per entity",
                "Named implementation contact",
              ],
              cta: { label: "Open an account", href: "#open" },
              featured: true,
            },
          ]}
          tone="subtle"
        />

        <CtaBand
          title="Start with one entity."
          body="Connect a single account, run one close alongside your current process, and keep whichever result you trust."
          primary={{ label: "Open an account", href: "#open" }}
        />
      </main>

      <SiteFooter
        brand="Ledgerline"
        blurb="Treasury and reconciliation for finance teams that answer to an auditor."
        groups={[
          {
            heading: "Platform",
            links: [
              { label: "Accounts", href: "#platform" },
              { label: "Reconciliation", href: "#platform" },
              { label: "Pricing", href: "#pricing" },
            ],
          },
          {
            heading: "Trust",
            links: [
              { label: "Security", href: "#security" },
              { label: "Compliance", href: "#security" },
              { label: "Status", href: "#status" },
            ],
          },
          {
            heading: "Company",
            links: [
              { label: "Customers", href: "#customers" },
              { label: "Careers", href: "#careers" },
              { label: "Contact", href: "#contact" },
            ],
          },
        ]}
      />
    </ThemeScope>
  );
}

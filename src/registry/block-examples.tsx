import { AnnouncementBar } from "@/components/blocks/announcement-bar";
import { AppShowcaseHero } from "@/components/blocks/app-showcase-hero";
import { ArticleLayout } from "@/components/blocks/article-layout";
import { AuthSplit } from "@/components/blocks/auth-split";
import { AvailabilityCalendar } from "@/components/blocks/availability-calendar";
import { BookingSummary } from "@/components/blocks/booking-summary";
import { BlogGrid } from "@/components/blocks/blog-grid";
import { CaseStudyGrid } from "@/components/blocks/case-study-grid";
import { ChangelogList } from "@/components/blocks/changelog-list";
import { ComparisonTable } from "@/components/blocks/comparison-table";
import { ContactForm } from "@/components/blocks/contact-form";
import { CtaBand } from "@/components/blocks/cta-band";
import { DashboardShell } from "@/components/blocks/dashboard-shell";
import { DocsSidebar } from "@/components/blocks/docs-sidebar";
import { EventSchedule } from "@/components/blocks/event-schedule";
import { FaqAccordion } from "@/components/blocks/faq-accordion";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { FeaturesSplit } from "@/components/blocks/features-split";
import { FilterToolbar } from "@/components/blocks/filter-toolbar";
import { FloatingNav } from "@/components/blocks/floating-nav";
import { GalleryStrip } from "@/components/blocks/gallery-strip";
import { HeroCentered } from "@/components/blocks/hero-centered";
import { HeroEditorial } from "@/components/blocks/hero-editorial";
import { HeroSplit } from "@/components/blocks/hero-split";
import { IntegrationGrid } from "@/components/blocks/integration-grid";
import { LocationGrid } from "@/components/blocks/location-grid";
import { LogoWall } from "@/components/blocks/logo-wall";
import { MetricsOverview } from "@/components/blocks/metrics-overview";
import { NewsletterSignup } from "@/components/blocks/newsletter-signup";
import { PageHeader } from "@/components/blocks/page-header";
import { PricingDuo } from "@/components/blocks/pricing-duo";
import { ProductGrid } from "@/components/blocks/product-grid";
import { ProofQuote } from "@/components/blocks/proof-quote";
import { RegistrationConfirmation } from "@/components/blocks/registration-confirmation";
import { RegistrationForm } from "@/components/blocks/registration-form";
import { ServicePicker } from "@/components/blocks/service-picker";
import { SiteFooter } from "@/components/blocks/site-footer";
import { SiteNav } from "@/components/blocks/site-nav";
import { StaffPicker } from "@/components/blocks/staff-picker";
import { SpecGrouped } from "@/components/blocks/spec-grouped";
import { StatsBand } from "@/components/blocks/stats-band";
import { StepsFlow } from "@/components/blocks/steps-flow";
import { TeamGrid } from "@/components/blocks/team-grid";
import { TestimonialGrid } from "@/components/blocks/testimonial-grid";
import { TicketTiers } from "@/components/blocks/ticket-tiers";
import { Timeline } from "@/components/blocks/timeline";
import { ContentIndex } from "@/components/blocks/content-index";
import { Button } from "@/components/primitives/button";
import { Field, Input } from "@/components/primitives/form";

/**
 * One canonical full-width example per block, rendered by /preview/<slug>.
 *
 * Why this file exists: 38 of the catalogue's blocks are whole page sections.
 * A boxed thumbnail cannot show them honestly, so the detail page used to show
 * a paragraph of prose instead of the block. These examples let the same block
 * render at real width, inside a real theme, in a real viewport.
 *
 * Content rules, inherited from the product:
 *   - Brands and people here are fictional. Nothing claims to be a Premium Kit
 *     customer, and no metric is presented as ours.
 *   - Where a block has a `source` field, the example fills it. A number with
 *     no source is not shipped.
 *   - Integration and logo slugs name real products being integrated with,
 *     which is a factual list, not borrowed credibility.
 */

const dashboardMetrics = [
  { label: "Active projects", value: "18", change: 12, period: "vs last month" },
  { label: "Awaiting review", value: "4", change: -23, period: "vs last month" },
  { label: "Hours logged", value: "312", change: 6, period: "vs last month" },
  { label: "Invoices open", value: "7", change: 0, period: "vs last month" },
];

export const blockExamples: Record<string, React.ReactNode> = {
  /* ------------------------------------------------------------ navigation */

  "site-nav": (
    <SiteNav
      brand="Meridyen"
      items={[
        { label: "Coffee", href: "#coffee" },
        { label: "Subscriptions", href: "#subscriptions" },
        { label: "Our roastery", href: "#roastery" },
        { label: "Stockists", href: "#stockists" },
      ]}
      cta={{ label: "Shop coffee", href: "#shop" }}
    />
  ),

  "floating-nav": (
    <FloatingNav
      brand="Kavat"
      items={[
        { label: "Work", href: "#work" },
        { label: "Studio", href: "#studio" },
        { label: "Writing", href: "#writing" },
      ]}
      cta={{ label: "Start a project", href: "#contact" }}
    />
  ),

  "announcement-bar": (
    <AnnouncementBar
      message="Roastery tours restart in September. Twelve places per session."
      action={{ label: "Book a place", href: "#tours" }}
    />
  ),

  "page-header": (
    <PageHeader
      title="Subscriptions"
      intro="Coffee posted the morning after it is roasted. Pause or change the grind whenever you like."
      trail={[
        { label: "Home", href: "#home" },
        { label: "Shop", href: "#shop" },
      ]}
    />
  ),

  /* ----------------------------------------------------------------- heroes */

  "hero-split": (
    <HeroSplit
      headline="Roasted on Tuesday, posted on Wednesday."
      subtext="Single origin coffee from a two barrel roastery in Karaköy. Nothing sits in a warehouse."
      primary={{ label: "Shop coffee", href: "#shop" }}
      secondary={{ label: "How we roast", href: "#roastery" }}
      image={{
        src: "https://picsum.photos/seed/meridyen-roastery-drum/1200/900",
        alt: "Coffee cooling in the tray of a shop roaster",
      }}
    />
  ),

  "hero-centered": (
    <HeroCentered
      headline="Ship the site, not the design debate."
      subtext="A component kit that agrees with itself: one token contract, twelve visual systems, no rewrites."
      primary={{ label: "Get started", href: "#start" }}
      secondary={{ label: "Read the docs", href: "#docs" }}
    />
  ),

  "hero-editorial": (
    <HeroEditorial
      statement="We take four projects a year."
      subtext="Brand and web for people who would rather do one thing properly than six things quickly."
      primary={{ label: "Start a project", href: "#contact" }}
      image={{
        src: "https://picsum.photos/seed/kavat-studio-desk/1400/1050",
        alt: "Printed layouts spread across a studio table",
      }}
    />
  ),

  "app-showcase-hero": (
    <AppShowcaseHero
      headline="Every invoice, reconciled before you open the app."
      subtext="Denge matches payments to invoices overnight and shows you only what it could not decide."
      primary={{ label: "Open an account", href: "#signup" }}
      secondary={{ label: "Book a walkthrough", href: "#demo" }}
      screenshot={{
        src: "https://picsum.photos/seed/denge-ledger-screen/1400/900",
        alt: "Reconciliation screen listing matched and unmatched payments",
      }}
    />
  ),

  /* --------------------------------------------------------------- content */

  "features-split": (
    <FeaturesSplit
      features={[
        {
          title: "The grind is set for your machine",
          body: "Tell us what you brew on and the beans arrive ground for it, or whole if you grind yourself.",
          image: {
            src: "https://picsum.photos/seed/meridyen-grinder-burr/1000/750",
            alt: "Coffee grinder burrs being adjusted",
          },
          points: ["Espresso, filter, moka or french press", "Change it between deliveries"],
        },
        {
          title: "You can see the invoice from the farm",
          body: "Every bag lists what the producer was paid and when the lot landed in Istanbul.",
          image: {
            src: "https://picsum.photos/seed/meridyen-green-sacks/1000/750",
            alt: "Sacks of green coffee stacked in a store room",
          },
        },
      ]}
    />
  ),

  "feature-bento": (
    <FeatureBento
      title="What you get on day one"
      body="Not a roadmap. These ship today."
      cells={[
        {
          title: "Twelve visual systems",
          body: "Each one changes typography, density, shape and motion, not only colour.",
          span: 4,
          media: {
            src: "https://picsum.photos/seed/kit-theme-swatches/900/600",
            alt: "Type specimens printed in four different systems",
          },
        },
        {
          title: "Turkish and English",
          body: "Real routes for both, not a client side toggle.",
          span: 2,
          emphasis: true,
        },
        {
          title: "Props from the source",
          body: "Documentation is read out of the TypeScript at build time, so it cannot drift.",
          span: 3,
        },
        {
          title: "Contrast audited",
          body: "Every theme pair is checked against WCAG AA before it ships.",
          span: 3,
        },
      ]}
    />
  ),

  "spec-grouped": (
    <SpecGrouped
      title="The 28cm skillet"
      body="Sand cast in Gaziantep and finished by hand."
      groups={[
        {
          heading: "Materials",
          rows: [
            { label: "Body", value: "Sand cast iron" },
            { label: "Seasoning", value: "Cold pressed flaxseed, six coats" },
            { label: "Handle", value: "Cast in one piece with the pan" },
          ],
        },
        {
          heading: "In the kitchen",
          rows: [
            { label: "Weight", value: "2.4 kg" },
            { label: "Oven safe", value: "To 260C" },
            { label: "Hob", value: "Gas, electric, induction" },
          ],
        },
        {
          heading: "After you buy it",
          rows: [
            { label: "Warranty", value: "Lifetime against casting faults" },
            { label: "Re-seasoning", value: "Free at the workshop, once a year" },
          ],
        },
      ]}
    />
  ),

  "steps-flow": (
    <StepsFlow
      title="Live in an afternoon"
      body="Self serve up to the point where a regulator needs a human. We handle that part."
      steps={[
        {
          title: "Connect your bank",
          body: "Read only access through the open banking API. We never hold your credentials.",
        },
        {
          title: "Import last year",
          body: "Twelve months of statements are categorised before you finish making coffee.",
        },
        {
          title: "Approve the exceptions",
          body: "Everything matched is already done. You only look at what we could not decide.",
        },
      ]}
    />
  ),

  "timeline": (
    <Timeline
      title="How the roastery grew"
      milestones={[
        {
          period: "Winter 2019",
          title: "One sample roaster in a back room",
          body: "Fifty bags a week, sold to two cafes on the same street.",
        },
        {
          period: "Spring 2022",
          title: "The Karaköy site opened",
          body: "A two barrel roaster and a counter, so people could taste before subscribing.",
        },
        {
          period: "Autumn 2025",
          title: "Direct contracts in three countries",
          body: "Producer agreements signed for a full harvest rather than a single lot.",
        },
      ]}
    />
  ),

  "gallery-strip": (
    <GalleryStrip
      items={[
        {
          src: "https://picsum.photos/seed/ocak-foundry-pour/900/675",
          alt: "Molten iron poured into a sand mould",
          caption: "Pouring day, twice a month.",
        },
        {
          src: "https://picsum.photos/seed/ocak-hand-finishing/900/1200",
          alt: "Hands grinding the rim of a cast pan",
          caption: "Every rim is ground by hand.",
          tall: true,
        },
        {
          src: "https://picsum.photos/seed/ocak-seasoning-oven/900/675",
          alt: "Pans stacked in a seasoning oven",
          caption: "Six coats, one at a time.",
        },
      ]}
    />
  ),

  /* ----------------------------------------------------------------- proof */

  "logo-wall": (
    <LogoWall
      title="Works with the tools you already run"
      slugs={["stripe", "xero", "quickbooks", "shopify", "netsuite"]}
      tint="6b7280"
    />
  ),

  "stats-band": (
    <StatsBand
      title="The roastery in numbers"
      body="Figures from our own production log, updated each quarter."
      stats={[
        { value: "1,840 kg", label: "Roasted last quarter", source: "Production log, Q2 2026" },
        { value: "31", label: "Producer contracts", source: "Green buying ledger" },
        { value: "4.2 days", label: "Roast to doorstep, median", source: "Carrier records" },
      ]}
    />
  ),

  "proof-quote": (
    <ProofQuote
      quote="They pushed back on half our brief. The half they kept is the reason the launch worked."
      name="Deniz Arikan"
      role="Founder, Meridyen Coffee"
    />
  ),

  "testimonial-grid": (
    <TestimonialGrid
      title="What the first year looked like for others"
      testimonials={[
        {
          quote:
            "We stopped arguing about spacing in review and started arguing about the copy, which was the useful argument.",
          name: "Elif Sarıkaya",
          role: "Head of design",
          company: "Denge",
        },
        {
          quote:
            "Our agency handed over a site we could actually edit. That had not happened before.",
          name: "Tomas Beck",
          role: "Marketing lead",
          company: "Vira Klinik",
        },
        {
          quote: "The Turkish routes were real pages. Search picked them up in a fortnight.",
          name: "Meral Yücel",
          role: "Founder",
          company: "Tersane",
        },
      ]}
    />
  ),

  "case-study-grid": (
    <CaseStudyGrid
      title="Selected work"
      studies={[
        {
          title: "A booking flow that survives a full waiting room",
          client: "Vira Klinik",
          outcome: "Reception stopped taking appointment calls during clinic hours.",
          href: "#vira",
          image: {
            src: "https://picsum.photos/seed/vira-reception-desk/1000/750",
            alt: "Clinic reception desk with a booking screen",
          },
        },
        {
          title: "One catalogue, four languages, no duplicate content",
          client: "Ocak Goods",
          outcome: "Product pages ship in a day instead of a sprint.",
          href: "#ocak",
          image: {
            src: "https://picsum.photos/seed/ocak-catalogue-spread/1000/750",
            alt: "Printed product catalogue open on a workbench",
          },
        },
      ]}
    />
  ),

  /* ------------------------------------------------------------- commerce */

  "product-grid": (
    <ProductGrid
      title="This month's roast"
      body="Three lots on the counter. When a lot is gone it is gone."
      products={[
        {
          name: "Kayanza, Burundi",
          price: "320 TL",
          href: "#kayanza",
          image: {
            src: "https://picsum.photos/seed/meridyen-bag-kayanza/800/800",
            alt: "Coffee bag labelled Kayanza",
          },
          note: "Washed. Blackcurrant and cocoa.",
        },
        {
          name: "Guji, Ethiopia",
          price: "365 TL",
          href: "#guji",
          image: {
            src: "https://picsum.photos/seed/meridyen-bag-guji/800/800",
            alt: "Coffee bag labelled Guji",
          },
          note: "Natural. Apricot and jasmine.",
        },
        {
          name: "Huila, Colombia",
          price: "295 TL",
          href: "#huila",
          image: {
            src: "https://picsum.photos/seed/meridyen-bag-huila/800/800",
            alt: "Coffee bag labelled Huila",
          },
          note: "Washed. Caramel and red apple.",
        },
      ]}
    />
  ),

  "pricing-duo": (
    <PricingDuo
      title="Two plans, and one of them is free"
      body="Move up when the second person joins. Not before."
      plans={[
        {
          name: "Solo",
          price: "Free",
          summary: "For one person reconciling their own books.",
          features: ["One bank connection", "Twelve months of history", "CSV export"],
          cta: { label: "Open an account", href: "#signup" },
        },
        {
          name: "Studio",
          price: "480 TL",
          cadence: "per month",
          summary: "For a team that closes the month together.",
          features: [
            "Unlimited bank connections",
            "Approval rules and audit trail",
            "Accountant access",
            "Priority support",
          ],
          cta: { label: "Open an account", href: "#signup" },
          featured: true,
        },
      ]}
    />
  ),

  "comparison-table": (
    <ComparisonTable
      title="What changes between the plans"
      plans={[
        {
          name: "Solo",
          price: "Free",
          description: "One person, one set of books.",
          cta: { label: "Open an account", href: "#solo" },
        },
        {
          name: "Studio",
          price: "480 TL",
          description: "A team closing the month together.",
          cta: { label: "Open an account", href: "#studio" },
        },
      ]}
      features={[
        { label: "Bank connections", values: ["1", "Unlimited"] },
        { label: "History imported", values: ["12 months", "Everything"] },
        { label: "Approval rules", values: [false, true] },
        { label: "Accountant access", values: [false, true] },
        { label: "Audit trail", values: [false, true] },
      ]}
    />
  ),

  /* ---------------------------------------------------------------- booking */

  "service-picker": (
    <ServicePicker
      title="Choose a service"
      body="Physiotherapy at the Vira Clinic. Pick the appointment that fits."
      currency="EUR"
      locale="en-GB"
      selectedId="assessment"
      services={[
        {
          id: "assessment",
          name: "Initial assessment",
          description: "A full first appointment: history, movement screen and a plan.",
          durationMin: 60,
          priceMinor: 9000,
        },
        {
          id: "physio",
          name: "Physiotherapy session",
          description: "A follow-up treatment session for an existing plan.",
          durationMin: 45,
          priceMinor: 6500,
        },
        {
          id: "review",
          name: "Progress review",
          description: "A shorter check-in to adjust the plan.",
          durationMin: 30,
          priceMinor: 4500,
        },
      ]}
    />
  ),

  "staff-picker": (
    <StaffPicker
      title="Choose a practitioner"
      body="Or let us assign the first one free."
      selectedId="elif"
      staff={[
        { id: "any", name: "Any available", role: "First free practitioner" },
        {
          id: "elif",
          name: "Elif Saral",
          role: "Musculoskeletal physio",
          photo: { src: "https://picsum.photos/seed/vira-elif/200/200", alt: "Elif Saral" },
        },
        {
          id: "tomas",
          name: "Tomas Beck",
          role: "Sports physio",
          photo: { src: "https://picsum.photos/seed/vira-tomas/200/200", alt: "Tomas Beck" },
        },
      ]}
    />
  ),

  "availability-calendar": (
    <AvailabilityCalendar
      title="Choose a time"
      body="Open times for the next few weeks."
      timeZone="Europe/Istanbul"
      locale="en-GB"
      initialMonth="2026-08"
      selectedDate="2026-08-11"
      selectedTime="09:45"
      availability={{
        "2026-08-11": ["09:00", "09:45", "11:30", "14:00", "15:30"],
        "2026-08-12": ["09:30", "10:15", "13:00", "16:00"],
        "2026-08-13": ["09:00", "10:30", "14:30"],
        "2026-08-17": ["09:15", "11:00", "13:30", "15:00"],
        "2026-08-18": ["10:00", "11:45", "14:15"],
        "2026-08-20": ["09:00", "09:45", "10:30", "13:15"],
      }}
    />
  ),

  "booking-summary": (
    <BookingSummary
      reference="VIRA-4820"
      timeZone="Europe/Istanbul"
      currency="EUR"
      locale="en-GB"
      email="you@example.com"
      service={{ name: "Initial assessment", durationMin: 60, priceMinor: 9000 }}
      staff={{ name: "Elif Saral", role: "Musculoskeletal physio" }}
      slot={{ date: "2026-08-11", time: "09:45" }}
      manageHref="#"
    />
  ),

  /* -------------------------------------------------------- event registration */

  "ticket-tiers": (
    <TicketTiers
      title="Choose a ticket"
      body="One price ladder, no hidden fees. Recordings are included from Standard up."
      currency="EUR"
      locale="en-GB"
      selectedId="standard"
      tiers={[
        {
          id: "early",
          name: "Early bird",
          priceMinor: 12000,
          summary: "Gone, but here so the price ladder is honest.",
          includes: ["Both days", "All talks", "Lunch included"],
          availability: "sold-out",
        },
        {
          id: "standard",
          name: "Standard",
          priceMinor: 18000,
          summary: "Full access to both days.",
          includes: ["Both days", "All talks", "Lunch included", "Recordings afterwards"],
          availability: "limited",
          featured: true,
        },
        {
          id: "student",
          name: "Student",
          priceMinor: 6000,
          summary: "With a valid student email.",
          includes: ["Both days", "All talks", "Recordings afterwards"],
        },
      ]}
    />
  ),

  "registration-form": (
    <RegistrationForm
      title="Register"
      body="One Standard ticket. Enter the attendee's details to finish."
      currency="EUR"
      locale="en-GB"
      ticket={{ name: "Standard", priceMinor: 18000 }}
    />
  ),

  "registration-confirmation": (
    <RegistrationConfirmation
      reference="RELAY-4820"
      eventName="Relay 2026"
      eventDate="2026-11-14"
      venue="Tersane Istanbul"
      ticketName="Standard"
      attendeeName="Aylin Demir"
      email="you@example.com"
      locale="en-GB"
      addToCalendarHref="#"
      continueHref="#"
    />
  ),

  /* ------------------------------------------------------- app and admin */

  "dashboard-shell": (
    <DashboardShell
      brand="Denge"
      title="This month"
      items={[
        { label: "Overview", href: "#overview", active: true },
        { label: "Transactions", href: "#transactions" },
        { label: "Invoices", href: "#invoices" },
        { label: "Reports", href: "#reports" },
      ]}
    >
      <MetricsOverview metrics={dashboardMetrics} />
    </DashboardShell>
  ),

  "metrics-overview": <MetricsOverview metrics={dashboardMetrics} />,

  "filter-toolbar": (
    <FilterToolbar
      searchLabel="Search transactions"
      searchPlaceholder="Reference or counterparty"
      filters={[
        {
          name: "status",
          label: "Status",
          options: [
            { value: "all", label: "All" },
            { value: "matched", label: "Matched" },
            { value: "unmatched", label: "Needs review" },
          ],
        },
        {
          name: "account",
          label: "Account",
          options: [
            { value: "all", label: "All accounts" },
            { value: "current", label: "Current" },
            { value: "reserve", label: "Reserve" },
          ],
        },
      ]}
    />
  ),

  "auth-split": (
    <AuthSplit
      brand="Denge"
      title="Sign in"
      body="Use the address your accountant has on file."
      back={{ label: "Back to the site", href: "#home" }}
      proof={{
        quote: "Month end went from two evenings to one coffee.",
        name: "Elif Sarıkaya",
        role: "Head of design, Denge",
      }}
    >
      <form className="flex flex-col gap-5">
        <Field label="Email address">
          <Input type="email" name="email" autoComplete="email" placeholder="you@company.com" />
        </Field>
        <Field label="Password">
          <Input type="password" name="password" autoComplete="current-password" />
        </Field>
        <Button type="submit">Sign in</Button>
      </form>
    </AuthSplit>
  ),

  "docs-sidebar": (
    <DocsSidebar
      groups={[
        {
          title: "Getting started",
          items: [
            { label: "Install", href: "#install", active: true },
            { label: "Connect a bank", href: "#connect" },
            { label: "Import history", href: "#import" },
          ],
        },
        {
          title: "Reconciliation",
          items: [
            { label: "Matching rules", href: "#rules" },
            { label: "Exceptions", href: "#exceptions" },
            { label: "Audit trail", href: "#audit" },
          ],
        },
      ]}
    >
      <div className="pk-prose">
        <h2>Install</h2>
        <p>
          Denge runs against a read only open banking connection. You will need administrator
          access to the account you are connecting, and nothing else.
        </p>
        <p>
          The importer reads twelve months by default. If your books start earlier, set the
          window before the first import rather than running it twice.
        </p>
        <h3>Before you start</h3>
        <ul>
          <li>Administrator access to the bank account</li>
          <li>The email address your accountant uses</li>
        </ul>
      </div>
    </DocsSidebar>
  ),

  "changelog-list": (
    <ChangelogList
      title="What changed"
      entries={[
        {
          date: "2026-07-02",
          version: "3.4",
          title: "Approval rules can now require two people",
          body: "Rules that move money above a threshold can ask for a second approver.",
          changes: [
            "Two person approval on payment rules",
            "Audit trail records both approvers",
            "Fixed a timezone error on the monthly export",
          ],
        },
        {
          date: "2026-06-11",
          version: "3.3",
          title: "Faster import for long histories",
          body: "Accounts with more than five years of statements import in a single pass.",
        },
      ]}
    />
  ),

  /* -------------------------------------------------------------- editorial */

  "blog-grid": (
    <BlogGrid
      title="Writing"
      body="Notes from the roastery and the workshop."
      posts={[
        {
          title: "Why we stopped selling blends",
          excerpt: "A blend hides a bad lot. A single origin cannot.",
          href: "#blends",
          category: "Roasting",
          date: "2026-06-18",
          readingTime: "6 minute read",
          cover: {
            src: "https://picsum.photos/seed/meridyen-cupping-table/900/600",
            alt: "Cupping bowls lined up on a table",
          },
        },
        {
          title: "What a producer contract actually says",
          excerpt: "Price, volume, and who carries the risk if the harvest is short.",
          href: "#contracts",
          category: "Sourcing",
          date: "2026-05-29",
          readingTime: "8 minute read",
          cover: {
            src: "https://picsum.photos/seed/meridyen-green-store/900/600",
            alt: "Green coffee stored in a warehouse",
          },
        },
        {
          title: "The grind is the variable you control",
          excerpt: "Most bad cups at home are a grind problem wearing a bean problem's coat.",
          href: "#grind",
          category: "Brewing",
          date: "2026-05-11",
          readingTime: "5 minute read",
          cover: {
            src: "https://picsum.photos/seed/meridyen-brew-scale/900/600",
            alt: "Pour over brewer on a scale",
          },
        },
      ]}
    />
  ),

  "content-index": (
    <ContentIndex
      title="Every article"
      body="Filter the archive by section."
      categories={["Roasting", "Sourcing", "Brewing"]}
      items={[
        {
          title: "Why we stopped selling blends",
          excerpt: "A blend hides a bad lot. A single origin cannot.",
          href: "#blends",
          category: "Roasting",
          date: "2026-06-18",
          readingTime: "6 minute read",
        },
        {
          title: "What a producer contract actually says",
          excerpt: "Price, volume, and who carries the risk if the harvest is short.",
          href: "#contracts",
          category: "Sourcing",
          date: "2026-05-29",
          readingTime: "8 minute read",
        },
        {
          title: "The grind is the variable you control",
          excerpt: "Most bad cups at home are a grind problem wearing a bean problem's coat.",
          href: "#grind",
          category: "Brewing",
          date: "2026-05-11",
          readingTime: "5 minute read",
        },
      ]}
    />
  ),

  "article-layout": (
    <ArticleLayout
      category="Roasting"
      title="Why we stopped selling blends"
      standfirst="A blend is a useful tool for consistency and a convenient place to hide a lot that did not work. We decided we would rather be inconsistent."
      author={{ name: "Deniz Arikan", role: "Roaster" }}
      date="2026-06-18"
      readingTime="6 minute read"
      cover={{
        src: "https://picsum.photos/seed/meridyen-cupping-table/1200/675",
        alt: "Cupping bowls lined up on a table",
      }}
      tags={[
        { label: "roasting", href: "#roasting" },
        { label: "sourcing", href: "#sourcing" },
      ]}
    >
      <p>
        Every roastery that sells a house blend tells the same story about it: consistency
        through the year, a flavour customers can rely on, a recipe adjusted as lots come and
        go. All of that is true. It is also the reason a blend is where a disappointing lot
        goes to become invisible.
      </p>
      <h2>The lot you would not sell alone</h2>
      <p>
        When a lot lands and it is merely fine, a roastery with a blend has somewhere to put
        it. Twenty per cent of something flat, hidden behind eighty per cent of something
        bright, tastes like the blend it always tasted like. Nobody is lied to exactly, and
        nobody finds out either.
      </p>
      <ul>
        <li>A single origin has to stand on its own or come off the counter.</li>
        <li>The buying decision gets harder, which is the point.</li>
        <li>Customers notice the difference between harvests, and ask about it.</li>
      </ul>
      <blockquote>
        <p>
          Consistency is a promise to the customer. It is also a promise you can keep by
          lowering the ceiling.
        </p>
      </blockquote>
      <p>
        We still buy lots that turn out flat. The difference is that now they do not get sold,
        which is a more expensive and more honest arrangement.
      </p>
    </ArticleLayout>
  ),

  "newsletter-signup": (
    <NewsletterSignup
      title="The monthly dispatch"
      body="One email when a new lot lands. No trackers, and no second list."
      cta="Subscribe"
    />
  ),

  /* ---------------------------------------------------- people and places */

  "team-grid": (
    <TeamGrid
      title="Who you will actually work with"
      body="The people on this page are the people on the call."
      people={[
        {
          name: "Elif Sarıkaya",
          role: "Design lead",
          photo: {
            src: "https://picsum.photos/seed/kavat-portrait-elif/600/750",
            alt: "Portrait of Elif Sarıkaya",
          },
        },
        {
          name: "Tomas Beck",
          role: "Engineering",
          photo: {
            src: "https://picsum.photos/seed/kavat-portrait-tomas/600/750",
            alt: "Portrait of Tomas Beck",
          },
        },
        {
          name: "Meral Yücel",
          role: "Strategy",
          photo: {
            src: "https://picsum.photos/seed/kavat-portrait-meral/600/750",
            alt: "Portrait of Meral Yücel",
          },
        },
      ]}
    />
  ),

  "location-grid": (
    <LocationGrid
      title="Where to find us"
      locations={[
        {
          name: "Karaköy roastery and counter",
          address: "Kemankeş Karamustafa Paşa, Istanbul",
          detail: "Open Tuesday to Saturday, 08:00 to 17:00",
          href: "#karakoy",
        },
        {
          name: "Kadıköy counter",
          address: "Caferağa, Istanbul",
          detail: "Open daily, 09:00 to 19:00",
          href: "#kadikoy",
        },
        {
          name: "Izmir stockist",
          address: "Alsancak, Izmir",
          detail: "Beans only, no counter",
        },
      ]}
    />
  ),

  "event-schedule": (
    <EventSchedule
      title="Two days, one room"
      body="Every session is recorded. Nothing runs in parallel, so you do not have to choose."
      days={[
        {
          date: "2026-10-14",
          sessions: [
            {
              time: "09:30",
              title: "Opening: what we got wrong last year",
              speaker: "Meral Yücel",
              track: "Main room",
            },
            {
              time: "11:00",
              title: "Designing for a waiting room, not a desk",
              speaker: "Elif Sarıkaya",
              track: "Main room",
            },
            {
              time: "14:00",
              title: "Workshop: auditing your own contrast",
              speaker: "Tomas Beck",
              track: "Workshop room",
            },
          ],
        },
        {
          date: "2026-10-15",
          sessions: [
            {
              time: "10:00",
              title: "Shipping in two languages without duplicating the site",
              speaker: "Deniz Arikan",
              track: "Main room",
            },
            {
              time: "13:30",
              title: "Closing panel: what we will get wrong next year",
              track: "Main room",
            },
          ],
        },
      ]}
    />
  ),

  /* ----------------------------------------------------- conversion, close */

  "integration-grid": (
    <IntegrationGrid
      title="Connects to what you already run"
      body="Read only where it can be, scoped where it cannot."
      integrations={[
        {
          name: "Stripe",
          description: "Payouts matched to invoices as they settle.",
          href: "#stripe",
        },
        { name: "Xero", description: "Two way sync on contacts and invoices.", href: "#xero" },
        {
          name: "Shopify",
          description: "Orders and refunds land as reconciled lines.",
          href: "#shopify",
        },
        {
          name: "QuickBooks",
          description: "Export a closed month without touching CSV.",
          href: "#quickbooks",
        },
      ]}
    />
  ),

  "faq-accordion": (
    <FaqAccordion
      title="Before you ask"
      items={[
        {
          question: "Do you hold my banking credentials?",
          answer:
            "No. The connection is made through the open banking API and is read only. You can revoke it from your bank without telling us.",
        },
        {
          question: "What happens to my data if I leave?",
          answer:
            "You export everything as CSV or JSON, then the account is deleted within thirty days. We do not keep a copy for analytics.",
        },
        {
          question: "Can my accountant have access?",
          answer:
            "Yes, on the Studio plan. They get their own login and every action they take is in the audit trail.",
        },
      ]}
    />
  ),

  "contact-form": (
    <ContactForm
      title="Tell us what you are building"
      body="Say what it is and when it needs to exist. We answer within two working days."
    />
  ),

  "cta-band": (
    <CtaBand
      title="We take on four projects a year."
      body="Two of next year's places are open."
      primary={{ label: "Start a project", href: "#contact" }}
    />
  ),

  "site-footer": (
    <SiteFooter
      brand="Meridyen"
      blurb="A two barrel roastery in Karaköy. Coffee posted the morning after it is roasted."
      groups={[
        {
          heading: "Shop",
          links: [
            { label: "Coffee", href: "#coffee" },
            { label: "Subscriptions", href: "#subscriptions" },
            { label: "Equipment", href: "#equipment" },
          ],
        },
        {
          heading: "Roastery",
          links: [
            { label: "How we roast", href: "#roasting" },
            { label: "Sourcing", href: "#sourcing" },
            { label: "Tours", href: "#tours" },
          ],
        },
        {
          heading: "Help",
          links: [
            { label: "Delivery", href: "#delivery" },
            { label: "Returns", href: "#returns" },
            { label: "Contact", href: "#contact" },
          ],
        },
      ]}
    />
  ),
};

export function hasBlockExample(slug: string) {
  return slug in blockExamples;
}

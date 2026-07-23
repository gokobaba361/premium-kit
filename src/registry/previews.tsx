"use client";

/*
 * Client module on purpose: several previews pass function props (a slider's
 * value formatter, a pagination href builder) and functions cannot cross the
 * server to client boundary.
 */

import { Marquee } from "@/components/motion/marquee";
import { NumberTicker } from "@/components/motion/number-ticker";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { TiltCard } from "@/components/motion/tilt-card";
import { TextReveal } from "@/components/motion/text-reveal";
import { AuroraBackground } from "@/components/motion/aurora-background";
import { Button } from "@/components/primitives/button";
import { Field, Input, Select, Switch } from "@/components/primitives/form";
import { Dialog, Tooltip, TooltipProvider } from "@/components/primitives/overlay";
import { Alert, EmptyState, SkeletonCard } from "@/components/primitives/feedback";
import { Table, StatRow, Avatar, Tag, Breadcrumb } from "@/components/primitives/data";
import { Slider, SegmentedControl } from "@/components/primitives/controls";
import { Accordion } from "@/components/primitives/accordion";
import { Tabs } from "@/components/primitives/tabs";
import { CommandPalette } from "@/components/primitives/command-palette";
import {
  DateInput,
  FileUpload,
  OtpInput,
  TimeInput,
} from "@/components/primitives/advanced-form";
import { MegaNav } from "@/components/blocks/mega-nav";
import { presets } from "@/design/presets";

/**
 * Live previews shown on each registry page.
 *
 * These render the real components with realistic content. Placeholder copy
 * like "Lorem ipsum" is avoided on purpose: a preview with fake text hides the
 * problems real text creates.
 */

const logos = ["Meridyen", "Lodos", "Ocak", "Kavram", "Ledgerline", "Northbeam"];

const previews: Record<string, React.ReactNode> = {
  marquee: (
    <Marquee speed={26}>
      {logos.map((logo) => (
        <span key={logo} className="font-display text-2xl text-muted">
          {logo}
        </span>
      ))}
    </Marquee>
  ),

  "number-ticker": (
    <div className="flex flex-wrap gap-12">
      <div className="flex flex-col gap-1">
        <NumberTicker value={11} className="font-display text-5xl font-semibold tabular-nums" />
        <span className="text-sm text-muted">Locations rebranded</span>
      </div>
      <div className="flex flex-col gap-1">
        <NumberTicker
          value={2.4}
          decimals={1}
          suffix="s"
          className="font-display text-5xl font-semibold tabular-nums"
        />
        <span className="text-sm text-muted">Median build time</span>
      </div>
    </div>
  ),

  "spotlight-card": (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <SpotlightCard>
        <h3 className="display-3">Branch environments</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
          Move the pointer across the card. The light is mixed from the theme accent.
        </p>
      </SpotlightCard>
      <SpotlightCard>
        <h3 className="display-3">Traces on by default</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
          Nothing here re-renders while the cursor moves.
        </p>
      </SpotlightCard>
    </div>
  ),

  "tilt-card": (
    <TiltCard className="max-w-sm">
      <h3 className="display-3">The 28cm skillet</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
        Sand cast in one piece, milled smooth, seasoned six times.
      </p>
    </TiltCard>
  ),

  "text-reveal": (
    <TextReveal
      as="h3"
      text="Brands that hold up off the screen."
      className="display-2 max-w-[18ch]"
    />
  ),

  "aurora-background": (
    <AuroraBackground className="w-full rounded-pk border border-line p-12">
      <h3 className="display-2 max-w-[16ch]">Atmosphere, not a feature.</h3>
      <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
        The light is built from the theme accent, so it changes with the palette.
      </p>
    </AuroraBackground>
  ),

  button: (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Start free</Button>
      <Button variant="secondary">Read the docs</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete project</Button>
      <Button loading loadingLabel="Saving">
        Save
      </Button>
    </div>
  ),

  form: (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <Field label="Work email" helper="We reply within one working day.">
        <Input type="email" defaultValue="deniz@meridyen.co" />
      </Field>
      <Field label="Budget range" error="Choose a range so we can scope the work.">
        <Select
          options={[
            { value: "small", label: "Under 20k" },
            { value: "mid", label: "20k to 60k" },
          ]}
        />
      </Field>
      <div className="md:col-span-2">
        <Switch label="Weekly progress email" description="Sent every Friday." defaultChecked />
      </div>
    </div>
  ),

  overlay: (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        <Dialog
          trigger={<Button variant="secondary">Open dialog</Button>}
          title="Archive this project"
          description="It stays readable for anyone with the link, but leaves the index."
          footer={
            <>
              <Button variant="ghost">Cancel</Button>
              <Button>Archive project</Button>
            </>
          }
        />
        <Tooltip content="Environments are billed only while they run.">
          <Button variant="ghost">Hover me</Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),

  feedback: (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Alert tone="warning" title="Card expires next month">
          Update it before the next billing date.
        </Alert>
        <EmptyState
          title="No projects yet"
          body="Projects appear once you connect a repository."
          action={<Button size="sm">Connect a repository</Button>}
        />
      </div>
      <SkeletonCard />
    </div>
  ),

  toast: (
    <p className="text-[0.9375rem] leading-relaxed text-muted">
      Toasts need a provider at the root of the app. The live example is in the component
      guide, where the provider is already mounted.
    </p>
  ),

  data: (
    <div className="flex w-full flex-col gap-8">
      <Table
        columns={[
          { key: "plan", header: "Plan" },
          { key: "entities", header: "Entities" },
          { key: "price", header: "Monthly", numeric: true },
        ]}
        rows={[
          { plan: "Single entity", entities: "1", price: "290" },
          { plan: "Group", entities: "Up to 10", price: "740" },
        ]}
      />
      <StatRow
        items={[
          { value: "11", label: "Locations rebranded", source: "Meridyen Coffee, 2025" },
          { value: "3 days", label: "Median time to close", source: "Ledgerline data" },
          { value: "19", label: "Rooms", source: "Lodos House" },
        ]}
      />
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name="Mira Okonkwo" />
        <Avatar name="Tomas Vrba" />
        <Tag label="Identity" href="#" active />
        <Tag label="Packaging" href="#" />
        <Breadcrumb
          trail={[
            { label: "Home", href: "#" },
            { label: "Work", href: "#" },
            { label: "Meridyen", href: "#" },
          ]}
        />
      </div>
    </div>
  ),

  controls: (
    <div className="flex w-full flex-col gap-8">
      <Slider label="Budget" min={0} max={120} step={5} defaultValue={[20, 60]} format={(v) => `${v}k`} />
      <SegmentedControl
        label="Billing period"
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
        ]}
      />
    </div>
  ),

  accordion: (
    <Accordion
      defaultValue="care"
      items={[
        {
          value: "care",
          title: "Care instructions",
          content: <p>Hot water and a stiff brush, dried on the heat. No detergent.</p>,
        },
        {
          value: "guarantee",
          title: "Guarantee",
          content: <p>Replaced if it cracks or warps in normal domestic use.</p>,
        },
      ]}
    />
  ),

  tabs: (
    <Tabs
      items={[
        {
          value: "overview",
          label: "Overview",
          content: <p className="text-[0.9375rem] text-muted">Arrow keys move between tabs.</p>,
        },
        {
          value: "spec",
          label: "Specification",
          content: <p className="text-[0.9375rem] text-muted">Panels take any content.</p>,
        },
      ]}
    />
  ),

  "command-palette": (
    <CommandPalette
      triggerLabel="Search Premium Kit"
      searchPlaceholder="Search components and site recipes"
      groups={[
        {
          heading: "Build",
          items: [
            {
              label: "AI site builder",
              description: "Turn a brief into a production prompt.",
              href: "/ai",
              keywords: ["brief", "prompt"],
            },
            {
              label: "Site skeletons",
              description: "Purpose-led section recipes.",
              href: "/skeletons",
              keywords: ["templates", "recipes"],
            },
          ],
        },
        {
          heading: "Library",
          items: [
            { label: "Components", description: "Browse installable source.", href: "/components" },
            { label: "Blocks", description: "Review full-page sections.", href: "/blocks" },
          ],
        },
      ]}
    />
  ),

  "advanced-form": (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <DateInput
        label="Appointment date"
        helper="Choose the day before selecting a time."
        defaultValue="2026-08-14"
      />
      <TimeInput label="Preferred time" defaultValue="10:30" />
      <OtpInput
        label="Verification code"
        helper="Six digits from the message we sent."
        defaultValue="284619"
      />
      <FileUpload
        label="Project brief"
        helper="One PDF, up to 10 MB."
        accept=".pdf,application/pdf"
      />
    </div>
  ),

  "mega-nav": (
    <div className="w-full">
      <MegaNav
        brand={{ name: "Northstar", href: "#" }}
        items={[
          {
            label: "Product",
            description: "Choose the path that matches the job.",
            items: [
              {
                title: "Workflows",
                description: "Review, approve and publish repeatable work.",
                href: "#",
                eyebrow: "OPERATIONS",
              },
              {
                title: "Analytics",
                description: "See throughput and operating bottlenecks.",
                href: "#",
                eyebrow: "INSIGHT",
              },
            ],
          },
          { label: "Customers", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Resources", href: "#" },
        ]}
        action={{ label: "Start free", href: "#" }}
      />
    </div>
  ),

  tokens: (
    <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-5">
      {[
        "--pk-bg",
        "--pk-bg-subtle",
        "--pk-fg",
        "--pk-fg-muted",
        "--pk-accent",
      ].map((token) => (
        <div key={token} className="flex flex-col gap-2">
          <div
            className="h-14 w-full rounded-pk border border-line"
            style={{ background: `var(${token})` }}
          />
          <span className="font-mono text-xs text-faint">{token}</span>
        </div>
      ))}
    </div>
  ),

  themes: (
    <div className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3">
      {presets.map((preset) => (
        <div
          key={preset.id}
          className="flex items-center gap-3 rounded-pk border border-line p-3"
        >
          <span className="flex gap-1" aria-hidden>
            {[preset.swatch.bg, preset.swatch.fg, preset.swatch.accent].map((c) => (
              <span
                key={c}
                className="size-5 rounded-full border border-line"
                style={{ background: c }}
              />
            ))}
          </span>
          <span className="text-sm">{preset.name}</span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Renders the preview for a registry slug.
 *
 * This is a component rather than an exported map because a client module can
 * only expose components across the server boundary, not plain objects holding
 * React elements. The page passes a slug string, which is serialisable.
 */
export function Preview({ slug }: { slug: string }) {
  return previews[slug] ?? null;
}

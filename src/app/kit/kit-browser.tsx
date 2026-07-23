"use client";

import { useState } from "react";
import {
  ArrowRight,
  DotsThree,
  MagnifyingGlass,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { presets } from "@/design/presets";
import { cn } from "@/lib/cn";
import { Container } from "@/components/primitives/layout";
import { Button, ButtonLink, IconButton } from "@/components/primitives/button";
import { Badge, Card, Rule } from "@/components/primitives/surface";
import { Field, Input, Textarea, Select, Checkbox, RadioGroup, Switch } from "@/components/primitives/form";
import { Tabs } from "@/components/primitives/tabs";
import { Accordion } from "@/components/primitives/accordion";
import { Slider, SegmentedControl } from "@/components/primitives/controls";
import { Dialog, Tooltip, TooltipProvider, DropdownMenu } from "@/components/primitives/overlay";
import {
  Alert,
  EmptyState,
  ErrorState,
  Progress,
  Skeleton,
  SkeletonCard,
  SkeletonRows,
} from "@/components/primitives/feedback";
import { ToastProvider, useToast } from "@/components/primitives/toast";
import {
  Avatar,
  Breadcrumb,
  Pagination,
  StatRow,
  Table,
  Tag,
} from "@/components/primitives/data";

/* -------------------------------------------------------------------------
 * Layout helpers for the guide itself
 * ---------------------------------------------------------------------- */

function Group({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-14">
      <div className="flex flex-col gap-2">
        <h2 className="display-2">{title}</h2>
        {note ? <p className="measure text-[0.9375rem] leading-relaxed text-muted">{note}</p> : null}
      </div>
      <div className="mt-10 flex flex-col gap-12">{children}</div>
    </section>
  );
}

function Specimen({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-mono text-sm text-faint">{label}</p>
        {hint ? <p className="text-sm text-muted">{hint}</p> : null}
      </div>
      <div className={cn("flex flex-wrap items-center gap-4", className)}>{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Individual sections
 * ---------------------------------------------------------------------- */

const swatches = [
  { token: "--pk-bg", utility: "bg-bg" },
  { token: "--pk-bg-subtle", utility: "bg-subtle" },
  { token: "--pk-bg-elevated", utility: "bg-elevated" },
  { token: "--pk-fg", utility: "text-fg" },
  { token: "--pk-fg-muted", utility: "text-muted" },
  { token: "--pk-fg-faint", utility: "text-faint" },
  { token: "--pk-accent", utility: "bg-accent" },
  { token: "--pk-accent-soft", utility: "bg-accent-soft" },
  { token: "--pk-line", utility: "border-line" },
  { token: "--pk-line-strong", utility: "border-strong" },
];

function Foundations({ display }: { display: { name: string; why: string } }) {
  return (
    <Group
      id="foundations"
      title="Foundations"
      note="Ten color tokens, one display face, one radius scale. Every component below reads these and nothing else, which is why swapping the theme swaps the whole page."
    >
      <Specimen label="display face" hint={display.why} className="flex-col items-stretch gap-3">
        <p className="display-1">{display.name}</p>
        <p className="font-display text-2xl">
          Handgloves 0123456789 Türkçe karakterler: ğ ı ş ç ö ü
        </p>
      </Specimen>

      <Specimen label="color tokens" className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {swatches.map((swatch) => (
          <div key={swatch.token} className="flex flex-col gap-2">
            <div
              className="h-16 w-full rounded-pk border border-line"
              style={{ background: `var(${swatch.token})` }}
            />
            <p className="font-mono text-xs text-faint">{swatch.token}</p>
            <p className="font-mono text-xs text-muted">{swatch.utility}</p>
          </div>
        ))}
      </Specimen>

      <Specimen label="type scale" className="flex-col items-stretch gap-6">
        <p className="display-1">Display one, hero statements</p>
        <p className="display-2">Display two, section headings</p>
        <p className="display-3">Display three, card and quote headings</p>
        <p className="text-lg leading-relaxed text-muted measure">
          Body large, used for hero subtext and section introductions where the line needs
          more presence than ordinary paragraph copy.
        </p>
        <p className="text-[0.9375rem] leading-relaxed text-muted measure">
          Body default, the working size for cards, lists and everything inside a section.
        </p>
        <p className="font-mono text-sm text-faint">Mono small, for figures and labels</p>
      </Specimen>

      <Specimen label="shape and elevation">
        <div className="flex size-24 items-center justify-center rounded-pk border border-line bg-elevated font-mono text-xs text-muted">
          rounded-pk
        </div>
        <div className="flex size-24 items-center justify-center rounded-pk-sm border border-line bg-elevated font-mono text-xs text-muted">
          rounded-pk-sm
        </div>
        <div className="flex size-24 items-center justify-center rounded-pk border border-line bg-elevated font-mono text-xs text-muted shadow-pk">
          shadow-pk
        </div>
        <div className="flex size-24 items-center justify-center rounded-pk border border-line bg-elevated font-mono text-xs text-muted shadow-pk-lift">
          lift
        </div>
      </Specimen>
    </Group>
  );
}

function Actions() {
  return (
    <Group
      id="actions"
      title="Actions"
      note="Six variants, three sizes, plus loading and disabled. Labels never wrap, and accent backgrounds always carry accent foreground, so a low contrast button cannot be built by accident. Destructive borrows the theme accent rather than introducing a second brand colour."
    >
      <Specimen label="variants">
        <Button>Primary action</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete project</Button>
        <Button variant="link">Link style</Button>
      </Specimen>

      <Specimen label="sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Specimen>

      <Specimen label="states" hint="disabled, loading, with icon, icon only, as link">
        <Button disabled>Disabled</Button>
        <Button loading loadingLabel="Saving">
          Save changes
        </Button>
        <Button>
          Continue
          <ArrowRight size={15} weight="bold" aria-hidden />
        </Button>
        <IconButton label="Search">
          <MagnifyingGlass size={17} weight="bold" />
        </IconButton>
        <ButtonLink href="#actions" variant="secondary">
          Button as link
        </ButtonLink>
      </Specimen>

      <Specimen label="badges and tags">
        <Badge>Neutral badge</Badge>
        <Tag label="All work" href="#actions" active />
        <Tag label="Identity" href="#actions" />
        <Tag label="Packaging" href="#actions" />
      </Specimen>
    </Group>
  );
}

function Forms() {
  const [showErrors, setShowErrors] = useState(false);

  return (
    <Group
      id="forms"
      title="Forms"
      note="Label above the control, helper text in the markup from the start, error below the field it belongs to. Placeholders are never used as labels."
    >
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="secondary" size="sm" onClick={() => setShowErrors((v) => !v)}>
          {showErrors ? "Show valid state" : "Show error state"}
        </Button>
        <p className="text-sm text-muted">Toggles every field below between its two states.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Field
          label="Full name"
          helper="As it appears on the invoice."
          error={showErrors ? "Enter the name we should invoice." : undefined}
        >
          <Input defaultValue={showErrors ? "" : "Deniz Arikan"} />
        </Field>

        <Field
          label="Work email"
          error={showErrors ? "That address looks incomplete." : undefined}
        >
          <Input type="email" defaultValue={showErrors ? "deniz@" : "deniz@meridyen.co"} />
        </Field>

        <Field label="Budget range" helper="Rough is fine, it sets the scope conversation.">
          <Select
            defaultValue="mid"
            options={[
              { value: "small", label: "Under 20k" },
              { value: "mid", label: "20k to 60k" },
              { value: "large", label: "Above 60k" },
            ]}
          />
        </Field>

        <Field label="Disabled input" helper="Shown for completeness.">
          <Input disabled defaultValue="Locked while the account syncs" />
        </Field>

        <Field
          label="Project brief"
          helper="A paragraph is enough at this stage."
          error={showErrors ? "Tell us a little more, at least a sentence." : undefined}
          className="md:col-span-2"
        >
          <Textarea
            defaultValue={
              showErrors ? "" : "Rebrand for a coffee roaster with eleven retail locations."
            }
          />
        </Field>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        <Specimen label="checkbox" className="flex-col items-stretch gap-4">
          <Checkbox label="Email me the proposal" defaultChecked />
          <Checkbox
            label="Include the packaging estimate"
            description="Adds around a week to the timeline."
          />
          <Checkbox label="Partially selected" indeterminate />
          <Checkbox label="Unavailable option" disabled />
        </Specimen>

        <Specimen label="radio group" className="flex-col items-stretch gap-4">
          <RadioGroup
            name="engagement"
            defaultValue="project"
            options={[
              { value: "project", label: "One project", description: "Fixed scope, fixed fee." },
              { value: "retainer", label: "Retainer", description: "Monthly, rolling." },
              { value: "audit", label: "Audit only" },
            ]}
          />
        </Specimen>

        <Specimen label="switch" className="flex-col items-stretch gap-5">
          <Switch
            label="Weekly progress email"
            description="Sent every Friday afternoon."
            defaultChecked
          />
          <Switch label="Share files with the wider team" />
          <Switch label="Locked by your administrator" disabled />
        </Specimen>
      </div>
    </Group>
  );
}

function Controls() {
  return (
    <Group
      id="controls"
      title="Controls"
      note="Accordion, slider and segmented control. Each one prints its current state as text, because a thumb position or an open panel is not a readable value on its own."
    >
      <Specimen label="accordion" hint="rich content panels" className="flex-col items-stretch">
        <Accordion
          defaultValue="shipping"
          items={[
            {
              value: "shipping",
              title: "Shipping and returns",
              content: (
                <div className="flex flex-col gap-3">
                  <p>
                    Orders leave the workshop within two working days. Returns are accepted for
                    thirty days, unused, in the original box.
                  </p>
                  <Button variant="soft" size="sm">
                    Start a return
                  </Button>
                </div>
              ),
            },
            {
              value: "care",
              title: "Care instructions",
              content: (
                <p>
                  Hot water and a stiff brush, dried on the heat. No detergent, no dishwasher.
                </p>
              ),
            },
            {
              value: "guarantee",
              title: "Guarantee",
              content: <p>Replaced if it cracks or warps in normal domestic use.</p>,
            },
          ]}
        />
      </Specimen>

      <Specimen label="slider" className="grid gap-10 md:grid-cols-2">
        <Slider label="Team size" min={1} max={50} defaultValue={[12]} />
        <Slider
          label="Budget"
          min={0}
          max={120}
          step={5}
          defaultValue={[20, 60]}
          format={(value) => `${value}k`}
        />
      </Specimen>

      <Specimen label="segmented control" hint="switches a view, not a page">
        <SegmentedControl
          label="Billing period"
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ]}
        />
        <SegmentedControl
          label="Layout density"
          defaultValue="comfortable"
          options={[
            { value: "compact", label: "Compact" },
            { value: "comfortable", label: "Comfortable" },
            { value: "spacious", label: "Spacious" },
          ]}
        />
      </Specimen>
    </Group>
  );
}

function Navigation() {
  return (
    <Group
      id="navigation"
      title="Navigation"
      note="Tabs, breadcrumbs, pagination and menus. Keyboard behaviour comes from Radix, styling comes from the tokens."
    >
      <Specimen label="tabs" className="flex-col items-stretch">
        <Tabs
          items={[
            {
              value: "overview",
              label: "Overview",
              content: (
                <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                  Tab panels take any content. Arrow keys move between tabs, and the active
                  marker is a border so it survives every theme.
                </p>
              ),
            },
            {
              value: "specification",
              label: "Specification",
              content: (
                <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                  Use tabs when the content is genuinely parallel. If one panel matters more
                  than the others, it is a section, not a tab.
                </p>
              ),
            },
            {
              value: "delivery",
              label: "Delivery",
              content: (
                <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                  Three or four tabs is the working limit. Beyond that, use a sidebar.
                </p>
              ),
            },
          ]}
        />
      </Specimen>

      <Specimen label="breadcrumb">
        <Breadcrumb
          trail={[
            { label: "Home", href: "#navigation" },
            { label: "Work", href: "#navigation" },
            { label: "Meridyen Coffee", href: "#navigation" },
          ]}
        />
      </Specimen>

      <Specimen label="pagination">
        <Pagination page={2} pageCount={5} hrefFor={() => "#navigation"} />
      </Specimen>

      <Specimen label="dropdown menu">
        <DropdownMenu
          trigger={
            <Button variant="secondary">
              Actions
              <DotsThree size={17} weight="bold" aria-hidden />
            </Button>
          }
          items={[
            { label: "Duplicate project" },
            { label: "Move to archive" },
            { label: "Delete permanently", destructive: true, separatorBefore: true },
          ]}
        />
      </Specimen>
    </Group>
  );
}

function FeedbackSection() {
  const toast = useToast();

  return (
    <Group
      id="feedback"
      title="Feedback"
      note="Every asynchronous surface ships four states: loading, empty, error and success. The skeletons match the shape of what they replace."
    >
      <Specimen label="alerts" className="flex-col items-stretch gap-4">
        <Alert tone="info" title="Environment is building">
          The first deploy takes around three minutes. You can close this page.
        </Alert>
        <Alert tone="success" title="Invoice sent">
          A copy went to your email address.
        </Alert>
        <Alert tone="warning" title="Card expires next month">
          Update it before the next billing date to avoid an interruption.
        </Alert>
      </Specimen>

      <Specimen label="toast" hint="transient confirmations only">
        <Button
          variant="secondary"
          onClick={() =>
            toast({ title: "Draft saved", body: "Last change synced a moment ago." })
          }
        >
          Trigger a toast
        </Button>
      </Specimen>

      <Specimen label="progress" className="flex-col items-stretch">
        <div className="max-w-md">
          <Progress value={64} label="Migration progress" />
        </div>
      </Specimen>

      <Specimen label="loading skeletons" className="grid gap-6 md:grid-cols-2">
        <SkeletonCard />
        <div className="flex flex-col gap-6 rounded-pk border border-line bg-elevated p-6">
          <Skeleton className="h-6 w-1/3" />
          <SkeletonRows rows={4} />
        </div>
      </Specimen>

      <Specimen label="empty and error" className="grid gap-6 md:grid-cols-2">
        <EmptyState
          title="No projects yet"
          body="Projects appear here once you connect a repository or import an existing brief."
          action={<Button size="sm">Connect a repository</Button>}
        />
        <ErrorState
          body="The report could not be generated because the source data is still importing."
          onRetry={() => toast({ title: "Retrying" })}
        />
      </Specimen>
    </Group>
  );
}

function DataSection() {
  return (
    <Group
      id="data"
      title="Data"
      note="Tables, figures and people. Stats require a source field, so an invented number has nowhere to hide."
    >
      <Specimen label="table" className="flex-col items-stretch">
        <Table
          caption="Sample data, shown for layout purposes."
          columns={[
            { key: "plan", header: "Plan" },
            { key: "entities", header: "Entities" },
            { key: "retention", header: "Log retention" },
            { key: "price", header: "Monthly", numeric: true },
          ]}
          rows={[
            { plan: "Team", entities: "1", retention: "7 days", price: "0" },
            { plan: "Scale", entities: "Up to 10", retention: "90 days", price: "740" },
            { plan: "Enterprise", entities: "Unlimited", retention: "Custom", price: "On request" },
          ]}
        />
      </Specimen>

      <Specimen label="stats" className="flex-col items-stretch">
        <StatRow
          items={[
            { value: "11", label: "Retail locations rebranded", source: "Meridyen Coffee, 2025" },
            { value: "3 days", label: "Median time to first close", source: "Ledgerline onboarding data" },
            { value: "19", label: "Rooms in the house", source: "Lodos House" },
          ]}
        />
      </Specimen>

      <Specimen label="avatars" hint="initials fallback, never a generic glyph">
        <Avatar name="Mira Okonkwo" src="https://picsum.photos/seed/mira-okonkwo-portrait/120/120" />
        <Avatar name="Tomas Vrba" />
        <Avatar name="Selin Kayacan" size={56} />
      </Specimen>

      <Specimen label="surfaces" className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-[0.9375rem] font-medium">Outline card</p>
          <p className="mt-2 text-sm text-muted">The default. Border, no elevation.</p>
        </Card>
        <Card variant="elevated" className="p-6">
          <p className="text-[0.9375rem] font-medium">Elevated card</p>
          <p className="mt-2 text-sm text-muted">Only when depth carries hierarchy.</p>
        </Card>
        <div className="p-6">
          <p className="text-[0.9375rem] font-medium">No card at all</p>
          <p className="mt-2 text-sm text-muted">Grouping by space is usually enough.</p>
          <Rule className="mt-4" />
        </div>
      </Specimen>
    </Group>
  );
}

function Overlays() {
  return (
    <Group
      id="overlays"
      title="Overlays"
      note="Dialog and tooltip. Focus trapping, escape handling and scroll lock come from Radix, so the only decision left is what goes inside."
    >
      <Specimen label="dialog">
        <Dialog
          trigger={<Button variant="secondary">Open dialog</Button>}
          title="Archive this project"
          description="The project stays readable for anyone with the link, but it stops appearing in the studio index and in search."
          footer={
            <>
              <Button variant="ghost">Cancel</Button>
              <Button>Archive project</Button>
            </>
          }
        />
      </Specimen>

      <Specimen label="tooltip" hint="never the only place information exists">
        <Tooltip content="Environments are billed only while they are running.">
          <Button variant="ghost">
            <Sparkle size={16} weight="bold" aria-hidden />
            What counts as an environment
          </Button>
        </Tooltip>
      </Specimen>
    </Group>
  );
}

/* -------------------------------------------------------------------------
 * The browser shell: theme picker plus every group
 * ---------------------------------------------------------------------- */

const groups = [
  { id: "foundations", label: "Foundations" },
  { id: "actions", label: "Actions" },
  { id: "forms", label: "Forms" },
  { id: "controls", label: "Controls" },
  { id: "navigation", label: "Navigation" },
  { id: "feedback", label: "Feedback" },
  { id: "data", label: "Data" },
  { id: "overlays", label: "Overlays" },
];

export function KitBrowser() {
  const [theme, setTheme] = useState(presets[0].id);
  const active = presets.find((p) => p.id === theme) ?? presets[0];

  return (
    <div data-theme={theme} className="min-h-[100dvh] bg-bg font-sans text-fg">
      <TooltipProvider>
        <ToastProvider>
          <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
            <Container className="flex flex-col gap-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <p className="font-display text-[0.95rem] font-semibold tracking-tight">
                    Component guide
                  </p>
                  <p className="text-sm text-muted">
                    {active.sectors[0]}, set in {active.display.name}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setTheme(preset.id)}
                      aria-pressed={preset.id === theme}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-pk-pill border px-3 py-1.5 text-sm transition-colors",
                        preset.id === theme
                          ? "border-accent bg-accent text-accent-fg"
                          : "border-line text-muted hover:border-strong hover:text-fg",
                      )}
                    >
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full border border-line"
                        style={{ background: preset.swatch.accent }}
                      />
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <nav className="flex flex-wrap gap-x-5 gap-y-2">
                {groups.map((group) => (
                  <a
                    key={group.id}
                    href={`#${group.id}`}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {group.label}
                  </a>
                ))}
              </nav>
            </Container>
          </header>

          <main>
            <Container>
              <div className="py-14">
                <h1 className="display-1 max-w-[16ch] text-balance">
                  Every component, in every sector theme.
                </h1>
                <p className="measure mt-5 text-lg leading-relaxed text-muted">
                  Switch the theme above and watch the whole guide change. Nothing here is
                  restyled per theme: the components read tokens, the theme sets them.
                </p>
              </div>

              <Foundations display={active.display} />
              <Actions />
              <Forms />
              <Controls />
              <Navigation />
              <FeedbackSection />
              <DataSection />
              <Overlays />
            </Container>
          </main>
        </ToastProvider>
      </TooltipProvider>
    </div>
  );
}

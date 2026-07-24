"use client";

import { Check } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

export type TicketTier = {
  id: string;
  name: string;
  /** Price in minor units, so no floating-point money. */
  priceMinor: number;
  summary?: string;
  includes: string[];
  /** "limited" adds a badge; "sold-out" disables the tier but keeps it visible. */
  availability?: "available" | "limited" | "sold-out";
  featured?: boolean;
};

export type TicketTiersProps = {
  title?: string;
  body?: string;
  tiers: TicketTier[];
  currency?: string;
  locale?: string;
  selectedId?: string | null;
  onSelect?: (tier: TicketTier) => void;
  tone?: "base" | "subtle";
};

function formatMoney(minor: number, currency: string, locale: string) {
  if (minor === 0) return "Free";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(minor / 100);
}

/**
 * Selectable event ticket tiers.
 *
 * Distinct from pricing-duo, which is marketing pricing: these are a
 * radiogroup the visitor picks from to register. Sold-out tiers stay visible
 * but disabled. Presentational: the parent owns the selection and is handed the
 * chosen tier through onSelect. Money stays in integer minor units.
 */
export function TicketTiers({
  title = "Choose a ticket",
  body,
  tiers,
  currency = "USD",
  locale = "en-US",
  selectedId = null,
  onSelect,
  tone = "base",
}: TicketTiersProps) {
  return (
    <section className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}>
      <Container>
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="display-3">{title}</h2>
          {body ? (
            <p className="text-[0.9375rem] leading-relaxed text-muted">{body}</p>
          ) : null}
        </div>

        <div
          role="radiogroup"
          aria-label={title}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {tiers.map((tier) => {
            const soldOut = tier.availability === "sold-out";
            const selected = tier.id === selectedId;
            return (
              <button
                key={tier.id}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={soldOut}
                onClick={() => onSelect?.(tier)}
                className={cn(
                  "flex h-full flex-col rounded-pk border p-6 text-left transition-colors md:p-7",
                  soldOut && "cursor-not-allowed opacity-55",
                  selected
                    ? "border-accent bg-accent-soft"
                    : tier.featured
                      ? "border-accent bg-elevated shadow-pk-lift"
                      : "border-line bg-elevated hover:border-strong",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-medium tracking-wide text-muted">{tier.name}</h3>
                  {tier.availability === "limited" ? (
                    <span className="rounded-pk-pill border border-accent px-2 py-0.5 text-xs text-accent">
                      Few left
                    </span>
                  ) : null}
                  {soldOut ? (
                    <span className="rounded-pk-pill border border-line px-2 py-0.5 text-xs text-faint">
                      Sold out
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 font-display text-3xl font-semibold tracking-tight tabular-nums">
                  {formatMoney(tier.priceMinor, currency, locale)}
                </p>
                {tier.summary ? (
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{tier.summary}</p>
                ) : null}

                <ul className="mt-6 flex flex-col gap-2.5">
                  {tier.includes.slice(0, 5).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden
                  className={cn(
                    "mt-6 inline-flex min-h-9 items-center justify-center rounded-pk-sm border px-4 text-sm font-medium",
                    selected
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-strong text-fg",
                  )}
                >
                  {soldOut ? "Sold out" : selected ? "Selected" : "Select"}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

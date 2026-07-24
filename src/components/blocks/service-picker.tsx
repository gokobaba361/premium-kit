"use client";

import { Clock } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

export type Service = {
  id: string;
  name: string;
  description?: string;
  /** Length in minutes; rendered as a duration. */
  durationMin: number;
  /** Price in minor units, so no floating-point money. */
  priceMinor: number;
};

export type ServicePickerProps = {
  title?: string;
  body?: string;
  services: Service[];
  currency?: string;
  locale?: string;
  /** The currently chosen service id, or null. Controlled by the parent. */
  selectedId?: string | null;
  onSelect?: (service: Service) => void;
  tone?: "base" | "subtle";
};

function formatMoney(minor: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(minor / 100);
}

function formatDuration(minutes: number, locale: string) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const parts: string[] = [];
  if (hours) parts.push(new Intl.NumberFormat(locale).format(hours) + " hr");
  if (mins) parts.push(new Intl.NumberFormat(locale).format(mins) + " min");
  return parts.join(" ");
}

/**
 * The first step of a booking flow: choose a service.
 *
 * A radiogroup of services, each showing its duration and price. Presentational:
 * the parent owns the selection and is handed the chosen service through
 * onSelect. Duration and price are formatted for the locale; money stays in
 * integer minor units.
 */
export function ServicePicker({
  title = "Choose a service",
  body,
  services,
  currency = "USD",
  locale = "en-US",
  selectedId = null,
  onSelect,
  tone = "base",
}: ServicePickerProps) {
  return (
    <section className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}>
      <Container className="max-w-2xl">
        <div className="flex flex-col gap-3">
          <h2 className="display-3">{title}</h2>
          {body ? (
            <p className="text-[0.9375rem] leading-relaxed text-muted">{body}</p>
          ) : null}
        </div>

        <div role="radiogroup" aria-label={title} className="mt-8 flex flex-col gap-3">
          {services.map((service) => {
            const selected = service.id === selectedId;
            return (
              <button
                key={service.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelect?.(service)}
                className={cn(
                  "flex items-start justify-between gap-4 rounded-pk border p-4 text-left transition-colors sm:p-5",
                  selected
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-strong",
                )}
              >
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-medium">{service.name}</span>
                  {service.description ? (
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {service.description}
                    </span>
                  ) : null}
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-faint">
                    <Clock size={14} weight="bold" aria-hidden />
                    {formatDuration(service.durationMin, locale)}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[0.9375rem] tabular-nums">
                  {formatMoney(service.priceMinor, currency, locale)}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

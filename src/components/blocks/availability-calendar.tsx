"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, GlobeHemisphereEast } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

/** date (YYYY-MM-DD) → available 24-hour times (HH:mm). Absent or empty = closed. */
export type Availability = Record<string, string[]>;

export type AvailabilityCalendarProps = {
  title?: string;
  body?: string;
  /** Slots are computed by the parent, never derived in the block. */
  availability: Availability;
  /** IANA-style label shown to the visitor, e.g. "Europe/Istanbul". */
  timeZone: string;
  locale?: string;
  /** First month to show, as YYYY-MM. Defaults to the earliest available month. */
  initialMonth?: string;
  selectedDate?: string | null;
  selectedTime?: string | null;
  onSelectDate?: (date: string) => void;
  onSelectSlot?: (date: string, time: string) => void;
  tone?: "base" | "subtle";
};

/* All date maths is done in UTC so a day never shifts across time zones. The
   time zone in the props is a label for the slots, not an offset applied to the
   grid. */
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toDayString(year: number, monthIndex: number, day: number) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}
function parseMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, monthIndex: month - 1 };
}
function daysInMonth(year: number, monthIndex: number) {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}
/** Weekday of the first, Monday = 0 through Sunday = 6. */
function firstWeekdayMondayZero(year: number, monthIndex: number) {
  const jsDay = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay();
  return (jsDay + 6) % 7;
}

export function AvailabilityCalendar({
  title = "Choose a time",
  body,
  availability,
  timeZone,
  locale = "en-US",
  initialMonth,
  selectedDate = null,
  selectedTime = null,
  onSelectDate,
  onSelectSlot,
  tone = "base",
}: AvailabilityCalendarProps) {
  // The React Compiler handles memoization; manual useMemo here cannot be preserved.
  const availableDates = Object.keys(availability)
    .filter((date) => availability[date]?.length)
    .sort();
  const firstAvailableMonth = availableDates[0]?.slice(0, 7);

  const [month, setMonth] = useState(
    () => initialMonth ?? firstAvailableMonth ?? new Date().toISOString().slice(0, 7),
  );
  const { year, monthIndex } = parseMonth(month);

  /* Navigation is bounded to the months that actually contain availability, so
     a visitor cannot wander into an all-closed month. */
  const monthsWithAvailability = [
    ...new Set(availableDates.map((date) => date.slice(0, 7))),
  ].sort();
  const canPrev = monthsWithAvailability.some((m) => m < month);
  const canNext = monthsWithAvailability.some((m) => m > month);

  function stepMonth(direction: -1 | 1) {
    const next = new Date(Date.UTC(year, monthIndex + direction, 1));
    setMonth(`${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}`);
  }

  const total = daysInMonth(year, monthIndex);
  const lead = firstWeekdayMondayZero(year, monthIndex);
  // The React Compiler memoizes this; a manual useMemo here cannot be preserved.
  const days = Array.from({ length: total }, (_, i) => i + 1);

  // 2024-01-01 is a Monday. Build Monday..Sunday weekday labels for the locale.
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  const weekdayLabels = Array.from({ length: 7 }, (_, i) =>
    weekdayFormatter.format(new Date(Date.UTC(2024, 0, 1 + i))),
  );

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, monthIndex, 1)));

  const isAvailable = (day: number) =>
    (availability[toDayString(year, monthIndex, day)]?.length ?? 0) > 0;

  const firstAvailableDay = days.find(isAvailable) ?? null;
  const [focusedDay, setFocusedDay] = useState<number | null>(firstAvailableDay);
  const dayRefs = useRef(new Map<number, HTMLButtonElement>());
  const pendingFocus = useRef(false);

  /* When the month changes, the roving-tabindex target must move to a day that
     exists in the new month. React endorses adjusting state during render for
     this rather than an effect, which avoids a cascading re-render. */
  const [focusMonth, setFocusMonth] = useState(month);
  if (focusMonth !== month) {
    setFocusMonth(month);
    setFocusedDay(firstAvailableDay);
  }

  // Moving focus after a keyboard step is a real DOM side effect, not state sync.
  useEffect(() => {
    if (pendingFocus.current && focusedDay != null) {
      dayRefs.current.get(focusedDay)?.focus();
      pendingFocus.current = false;
    }
  }, [focusedDay]);

  function moveFocus(from: number, delta: number) {
    let target = from + delta;
    while (target >= 1 && target <= total && !isAvailable(target)) target += delta;
    if (target < 1 || target > total || !isAvailable(target)) return;
    pendingFocus.current = true;
    setFocusedDay(target);
  }

  function onKeyDown(event: React.KeyboardEvent, day: number) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        moveFocus(day, -1);
        break;
      case "ArrowRight":
        event.preventDefault();
        moveFocus(day, 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(day, -7);
        break;
      case "ArrowDown":
        event.preventDefault();
        moveFocus(day, 7);
        break;
      default:
        break;
    }
  }

  const slots = selectedDate ? (availability[selectedDate] ?? []) : [];
  const slotsHeadingId = "availability-slots-heading";

  return (
    <section className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}>
      <Container className="max-w-3xl">
        <div className="flex flex-col gap-3">
          <h2 className="display-3">{title}</h2>
          {body ? (
            <p className="text-[0.9375rem] leading-relaxed text-muted">{body}</p>
          ) : null}
          <p className="inline-flex items-center gap-1.5 text-sm text-faint">
            <GlobeHemisphereEast size={15} weight="bold" aria-hidden />
            Times shown in {timeZone}
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_15rem]">
          {/* Month grid */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => stepMonth(-1)}
                disabled={!canPrev}
                aria-label="Previous month"
                className="flex size-9 items-center justify-center rounded-pk-sm border border-strong text-muted transition-colors hover:text-fg disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CaretLeft size={15} weight="bold" />
              </button>
              <p className="text-[0.9375rem] font-medium" aria-live="polite">
                {monthLabel}
              </p>
              <button
                type="button"
                onClick={() => stepMonth(1)}
                disabled={!canNext}
                aria-label="Next month"
                className="flex size-9 items-center justify-center rounded-pk-sm border border-strong text-muted transition-colors hover:text-fg disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CaretRight size={15} weight="bold" />
              </button>
            </div>

            <div
              role="grid"
              aria-label={monthLabel}
              className="mt-5 grid grid-cols-7 gap-1"
            >
              {weekdayLabels.map((label) => (
                <div
                  key={label}
                  role="columnheader"
                  className="pb-2 text-center font-mono text-[0.6875rem] text-faint"
                >
                  {label}
                </div>
              ))}

              {Array.from({ length: lead }, (_, i) => (
                <div key={`lead-${i}`} role="gridcell" aria-hidden />
              ))}

              {days.map((day) => {
                const dateStr = toDayString(year, monthIndex, day);
                const available = isAvailable(day);
                const selected = dateStr === selectedDate;
                const isFocusTarget = day === focusedDay;
                return (
                  <div key={day} role="gridcell" className="aspect-square">
                    <button
                      ref={(node) => {
                        if (node) dayRefs.current.set(day, node);
                        else dayRefs.current.delete(day);
                      }}
                      type="button"
                      disabled={!available}
                      tabIndex={isFocusTarget && available ? 0 : -1}
                      aria-pressed={selected}
                      aria-label={new Intl.DateTimeFormat(locale, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        timeZone: "UTC",
                      }).format(new Date(`${dateStr}T00:00:00Z`))}
                      onKeyDown={(event) => onKeyDown(event, day)}
                      onClick={() => {
                        setFocusedDay(day);
                        onSelectDate?.(dateStr);
                      }}
                      className={cn(
                        "flex size-full items-center justify-center rounded-pk-sm text-sm tabular-nums transition-colors",
                        !available && "cursor-not-allowed text-faint opacity-40",
                        available && !selected && "text-fg hover:bg-subtle",
                        selected && "bg-accent text-accent-fg",
                      )}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div>
            <h3 id={slotsHeadingId} className="text-sm font-medium text-muted">
              {selectedDate
                ? new Intl.DateTimeFormat(locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    timeZone: "UTC",
                  }).format(new Date(`${selectedDate}T00:00:00Z`))
                : "Available times"}
            </h3>

            {selectedDate ? (
              <div
                role="radiogroup"
                aria-labelledby={slotsHeadingId}
                className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1"
              >
                {slots.map((time) => {
                  const selected = time === selectedTime;
                  return (
                    <button
                      key={time}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => onSelectSlot?.(selectedDate, time)}
                      className={cn(
                        "min-h-11 rounded-pk-sm border text-sm tabular-nums transition-colors",
                        selected
                          ? "border-accent bg-accent text-accent-fg"
                          : "border-strong text-fg hover:border-fg",
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Pick a day to see its open times.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";

export type BookingSummaryProps = {
  /** The booking reference to quote. This demo's own, not an invented external id. */
  reference: string;
  service: { name: string; durationMin: number; priceMinor: number };
  staff: { name: string; role?: string };
  /** ISO day (YYYY-MM-DD) and 24-hour time (HH:mm). */
  slot: { date: string; time: string };
  timeZone: string;
  currency?: string;
  locale?: string;
  /** Where the confirmation was sent, if collected. */
  email?: string;
  manageHref?: string;
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
 * Booking confirmation. The success end of the flow: a clear acknowledgement,
 * the reference to quote, and every detail the visitor needs to show up. The
 * date and time are rendered in the page locale and the booking's own time
 * zone. No invented reference beyond the one the flow generated.
 */
export function BookingSummary({
  reference,
  service,
  staff,
  slot,
  timeZone,
  currency = "USD",
  locale = "en-US",
  email,
  manageHref = "/",
}: BookingSummaryProps) {
  const when = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${slot.date}T00:00:00Z`));

  const rows: { label: string; value: string }[] = [
    { label: "Service", value: service.name },
    { label: "With", value: staff.role ? `${staff.name} · ${staff.role}` : staff.name },
    { label: "When", value: `${when}, ${slot.time}` },
    { label: "Duration", value: formatDuration(service.durationMin, locale) },
    { label: "Time zone", value: timeZone },
    { label: "Price", value: formatMoney(service.priceMinor, currency, locale) },
  ];

  return (
    <section className="py-section">
      <Container className="max-w-2xl">
        <div className="flex flex-col items-start gap-4">
          <CalendarCheck size={40} weight="fill" className="text-accent" aria-hidden />
          <h1 className="display-2 max-w-[18ch] text-balance">Your appointment is booked.</h1>
          <p className="measure text-lg leading-relaxed text-muted">
            {email ? (
              <>
                We sent the details to <span className="text-fg">{email}</span>. Keep booking{" "}
              </>
            ) : (
              <>Keep booking </>
            )}
            <span className="font-mono text-fg">{reference}</span> for any changes.
          </p>
        </div>

        <div className="mt-10 rounded-pk border border-line bg-elevated p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="text-sm text-faint">Booking</p>
              <p className="font-mono text-[0.9375rem]">{reference}</p>
            </div>
          </div>

          <dl className="flex flex-col gap-3 pt-4 text-sm">
            {rows.map((row) => (
              <div key={row.label} className="flex justify-between gap-4">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8">
          <ButtonLink href={manageHref} size="lg">
            Manage booking
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

import { Ticket } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";

export type RegistrationConfirmationProps = {
  /** The registration reference to quote. This flow's own, not an invented barcode. */
  reference: string;
  eventName: string;
  /** Machine-readable ISO date; rendered in the page locale. */
  eventDate: string;
  venue?: string;
  ticketName: string;
  attendeeName: string;
  email?: string;
  locale?: string;
  addToCalendarHref?: string;
  continueHref?: string;
};

/**
 * Registration confirmation. The success end of the event flow: a clear
 * acknowledgement, the reference to quote at the door, and the details the
 * attendee needs. The date renders in the page locale. No invented barcode or
 * QR beyond the reference the flow generated.
 */
export function RegistrationConfirmation({
  reference,
  eventName,
  eventDate,
  venue,
  ticketName,
  attendeeName,
  email,
  locale = "en-US",
  addToCalendarHref,
  continueHref = "/",
}: RegistrationConfirmationProps) {
  const when = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${eventDate}T00:00:00Z`));

  const rows: { label: string; value: string }[] = [
    { label: "Event", value: eventName },
    { label: "When", value: when },
    ...(venue ? [{ label: "Where", value: venue }] : []),
    { label: "Ticket", value: ticketName },
    { label: "Attendee", value: attendeeName },
  ];

  return (
    <section className="py-section">
      <Container className="max-w-2xl">
        <div className="flex flex-col items-start gap-4">
          <Ticket size={40} weight="fill" className="text-accent" aria-hidden />
          <h1 className="display-2 max-w-[18ch] text-balance">You&rsquo;re registered. See you there.</h1>
          <p className="measure text-lg leading-relaxed text-muted">
            {email ? (
              <>
                We sent your ticket to <span className="text-fg">{email}</span>. Keep registration{" "}
              </>
            ) : (
              <>Keep registration </>
            )}
            <span className="font-mono text-fg">{reference}</span> to check in at the door.
          </p>
        </div>

        <div className="mt-10 rounded-pk border border-line bg-elevated p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="text-sm text-faint">Registration</p>
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

        <div className="mt-8 flex flex-wrap gap-3">
          {addToCalendarHref ? (
            <ButtonLink href={addToCalendarHref} size="lg">
              Add to calendar
            </ButtonLink>
          ) : null}
          <ButtonLink
            href={continueHref}
            size="lg"
            variant={addToCalendarHref ? "secondary" : "primary"}
          >
            Back to the event
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

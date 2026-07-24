"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { Field, Input, Textarea } from "@/components/primitives/form";
import { Alert } from "@/components/primitives/feedback";

export type RegistrationTicket = {
  name: string;
  priceMinor: number;
};

export type RegistrationFormProps = {
  title?: string;
  body?: string;
  ticket: RegistrationTicket;
  currency?: string;
  locale?: string;
  /** Fired after the submitting delay. When set, the parent owns the success
   *  screen and this form does not render its own, so a confirmation block can
   *  take over. */
  onRegistered?: (data: Record<string, string>) => void;
  tone?: "base" | "subtle";
};

type Errors = Record<string, string>;

function formatMoney(minor: number, currency: string, locale: string) {
  if (minor === 0) return "Free";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(minor / 100);
}

/**
 * Attendee registration for an event, with a live ticket summary and complete
 * states. It collects contact and attendee detail only; any payment for a paid
 * ticket is handed to a provider on submit, never entered here. States: idle,
 * validation errors, submitting and (unless the parent takes over) registered.
 */
export function RegistrationForm({
  title = "Register",
  body,
  ticket,
  currency = "USD",
  locale = "en-US",
  onRegistered,
  tone = "base",
}: RegistrationFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "submitting" | "registered">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<
      string,
      string
    >;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Enter the attendee's name.";
    if (!data.email?.trim()) next.email = "Enter an email for the ticket.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "That address looks incomplete.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("submitting");
    window.setTimeout(() => {
      if (onRegistered) onRegistered(data);
      else setState("registered");
    }, 700);
  }

  if (state === "registered") {
    return (
      <section className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}>
        <Container className="max-w-2xl">
          <Alert tone="success" title="You're registered">
            A ticket is on its way to your email. This demo stops before a real payment provider;
            wire onRegistered to your own checkout or ticketing system.
          </Alert>
        </Container>
      </section>
    );
  }

  return (
    <section className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="display-3">{title}</h2>
              {body ? (
                <p className="text-[0.9375rem] leading-relaxed text-muted">{body}</p>
              ) : null}
            </div>

            <fieldset className="flex flex-col gap-5">
              <legend className="sr-only">Attendee</legend>
              <Field label="Full name" error={errors.name}>
                <Input name="name" autoComplete="name" />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input name="email" type="email" autoComplete="email" />
              </Field>
              <Field label="Organisation" optional>
                <Input name="organisation" autoComplete="organization" />
              </Field>
              <Field label="Access or dietary needs" optional helper="We share these only with the venue.">
                <Textarea name="notes" rows={3} />
              </Field>
            </fieldset>

            <Button type="submit" size="lg" loading={state === "submitting"} loadingLabel="Registering">
              Complete registration
            </Button>
          </form>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-pk border border-line bg-elevated p-5">
              <h3 className="text-sm font-medium text-muted">Your ticket</h3>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-[0.9375rem] font-medium">{ticket.name}</span>
                <span className="font-mono text-[0.9375rem] tabular-nums">
                  {formatMoney(ticket.priceMinor, currency, locale)}
                </span>
              </div>
              <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                One ticket admits one attendee. Register again for a colleague.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Container, Section } from "@/components/primitives/layout";
import { Button } from "@/components/primitives/button";
import { Field, Input } from "@/components/primitives/form";

/**
 * Single field signup with real validation and a real success state.
 * States: idle, error, sending, subscribed.
 */
export function NewsletterSignup({
  title,
  body,
  cta = "Subscribe",
  tone = "subtle",
}: {
  title: string;
  body: string;
  cta?: string;
  tone?: "base" | "subtle";
}) {
  const [error, setError] = useState<string | undefined>();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    if (!email) return setError("Enter an email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("That address looks incomplete.");

    setError(undefined);
    setState("sending");
    // Wire to a route handler or server action here.
    window.setTimeout(() => setState("done"), 600);
  }

  return (
    <Section tone={tone}>
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-12">
          <div className="md:col-span-6">
            <h2 className="display-2 max-w-[18ch] text-balance">{title}</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-muted">{body}</p>
          </div>

          <div className="md:col-span-6 md:pt-2">
            {state === "done" ? (
              <p className="rounded-pk border border-line bg-elevated p-5 text-[0.9375rem]">
                You are on the list. The next issue goes out at the start of the month.
              </p>
            ) : (
              <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
                <Field
                  label="Email address"
                  helper="One email a month. Unsubscribe from any of them."
                  error={error}
                >
                  <Input name="email" type="email" autoComplete="email" />
                </Field>
                <div>
                  <Button type="submit" disabled={state === "sending"}>
                    {state === "sending" ? "Subscribing" : cta}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

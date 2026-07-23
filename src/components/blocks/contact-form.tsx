"use client";

import { useState } from "react";
import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { Button } from "@/components/primitives/button";
import { cn } from "@/lib/cn";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const labels: Record<Field, string> = {
  name: "Full name",
  email: "Email address",
  message: "How can we help",
};

const helpers: Partial<Record<Field, string>> = {
  email: "We reply to this address within one working day.",
};

/**
 * Labels sit above inputs, helper text is in the markup from the start, errors
 * render below the field they belong to. No placeholder as label, ever.
 * Ships the full cycle: idle, submitting, error, success.
 */
export function ContactForm({
  title,
  body,
  tone = "subtle",
}: {
  title: string;
  body?: string;
  tone?: "base" | "subtle";
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Enter the name we should reply to.";
    if (!email) next.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That address looks incomplete.";
    if (message.length < 10) next.message = "Tell us a little more, at least a sentence.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("sending");
    // Wire to a route handler or server action here.
    window.setTimeout(() => setState("sent"), 600);
  }

  if (state === "sent") {
    return (
      <Section id="contact" tone={tone}>
        <Container>
          <div className="max-w-xl rounded-pk border border-line bg-elevated p-8">
            <h2 className="display-3">Message received</h2>
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
              A member of the team will reply to your email address within one working day.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="contact" tone={tone}>
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <SectionHead title={title} body={body} />
          </div>

          <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6 md:col-span-7">
            {(Object.keys(labels) as Field[]).map((field) => {
              const error = errors[field];
              const helper = helpers[field];
              const describedBy =
                [error ? `${field}-error` : null, helper ? `${field}-help` : null]
                  .filter(Boolean)
                  .join(" ") || undefined;

              return (
                <div key={field} className="flex flex-col gap-2">
                  <label htmlFor={field} className="text-sm font-medium">
                    {labels[field]}
                  </label>

                  {helper ? (
                    <p id={`${field}-help`} className="text-sm text-muted">
                      {helper}
                    </p>
                  ) : null}

                  {field === "message" ? (
                    <textarea
                      id={field}
                      name={field}
                      rows={5}
                      aria-invalid={Boolean(error)}
                      aria-describedby={describedBy}
                      className={cn(
                        "rounded-pk-sm border bg-elevated px-3.5 py-2.5 text-[0.9375rem] text-fg",
                        error ? "border-accent" : "border-strong",
                      )}
                    />
                  ) : (
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      autoComplete={field === "email" ? "email" : "name"}
                      aria-invalid={Boolean(error)}
                      aria-describedby={describedBy}
                      className={cn(
                        "h-11 rounded-pk-sm border bg-elevated px-3.5 text-[0.9375rem] text-fg",
                        error ? "border-accent" : "border-strong",
                      )}
                    />
                  )}

                  {error ? (
                    <p id={`${field}-error`} role="alert" className="text-sm text-accent">
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            })}

            <div>
              <Button type="submit" size="lg" disabled={state === "sending"}>
                {state === "sending" ? "Sending" : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}

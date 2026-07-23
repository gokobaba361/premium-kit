"use client";

import { useState } from "react";
import { LockSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { Field, Input, Select } from "@/components/primitives/form";
import { Alert } from "@/components/primitives/feedback";

export type CheckoutLine = { id: string; name: string; variant?: string; priceMinor: number; quantity: number };

export type CheckoutFormProps = {
  lines: CheckoutLine[];
  currency?: string;
  locale?: string;
  shippingMinor?: number;
  countries?: { value: string; label: string }[];
  /** Wire to a payment provider. The form never collects card details itself. */
  onPlaceOrder?: (data: Record<string, string>) => void;
  /**
   * Fired after the placing delay. When provided, the parent owns the success
   * screen and this form does not render its own confirmation, so a full
   * order-confirmation block can take over.
   */
  onPlaced?: (data: Record<string, string>) => void;
};

type Errors = Record<string, string>;

function formatMoney(minor: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(minor / 100);
}

const defaultCountries = [
  { value: "tr", label: "Türkiye" },
  { value: "de", label: "Germany" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
];

/**
 * Checkout with a real order summary and complete states.
 *
 * By design it collects contact and shipping only. Card details are never
 * entered here: payment is handed to a provider on submit, which is both the
 * secure pattern and the honest one. States: idle, validation errors, placing
 * and placed.
 */
export function CheckoutForm({
  lines,
  currency = "USD",
  locale = "en-US",
  shippingMinor = 0,
  countries = defaultCountries,
  onPlaceOrder,
  onPlaced,
}: CheckoutFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "placing" | "placed">("idle");

  const subtotal = lines.reduce((sum, line) => sum + line.priceMinor * line.quantity, 0);
  const total = subtotal + shippingMinor;
  const money = (minor: number) => formatMoney(minor, currency, locale);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    const next: Errors = {};

    if (!data.email?.trim()) next.email = "Enter an email for the order confirmation.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "That address looks incomplete.";
    if (!data.name?.trim()) next.name = "Enter the delivery name.";
    if (!data.address?.trim()) next.address = "Enter the street address.";
    if (!data.city?.trim()) next.city = "Enter the city.";
    if (!data.postcode?.trim()) next.postcode = "Enter the postcode.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("placing");
    onPlaceOrder?.(data);
    window.setTimeout(() => {
      if (onPlaced) {
        // Parent takes over the success screen (e.g. an order-confirmation block).
        onPlaced(data);
      } else {
        setState("placed");
      }
    }, 700);
  }

  if (state === "placed") {
    return (
      <section className="py-section">
        <Container>
          <Alert tone="success" title="Order placed">
            A confirmation is on its way to your email. This demo stops before a real payment
            provider; wire onPlaceOrder to your own checkout session.
          </Alert>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          {/* Form */}
          <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
            <fieldset className="flex flex-col gap-5">
              <legend className="display-3 mb-1">Contact</legend>
              <Field label="Email" error={errors.email}>
                <Input name="email" type="email" autoComplete="email" />
              </Field>
            </fieldset>

            <fieldset className="flex flex-col gap-5">
              <legend className="display-3 mb-1">Delivery</legend>
              <Field label="Full name" error={errors.name}>
                <Input name="name" autoComplete="name" />
              </Field>
              <Field label="Street address" error={errors.address}>
                <Input name="address" autoComplete="street-address" />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="City" error={errors.city}>
                  <Input name="city" autoComplete="address-level2" />
                </Field>
                <Field label="Postcode" error={errors.postcode}>
                  <Input name="postcode" autoComplete="postal-code" />
                </Field>
              </div>
              <Field label="Country">
                <Select name="country" options={countries} defaultValue={countries[0]?.value} />
              </Field>
            </fieldset>

            <div className="rounded-pk border border-line bg-subtle p-4">
              <p className="flex items-center gap-2 text-sm font-medium">
                <LockSimple size={16} weight="bold" aria-hidden />
                Payment
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Card details are collected by the payment provider on the next step, never on this
                page. Wire the place-order button to a provider checkout session.
              </p>
            </div>

            <Button type="submit" size="lg" loading={state === "placing"} loadingLabel="Placing order">
              Place order · {money(total)}
            </Button>
          </form>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-pk border border-line bg-elevated p-5">
              <h2 className="text-sm font-medium text-muted">Order summary</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {lines.map((line) => (
                  <li key={line.id} className="flex justify-between gap-4 text-sm">
                    <span className="min-w-0">
                      <span className="font-medium">{line.name}</span>
                      {line.variant ? <span className="text-muted"> · {line.variant}</span> : null}
                      <span className="text-muted"> × {line.quantity}</span>
                    </span>
                    <span className="shrink-0 font-mono tabular-nums">
                      {money(line.priceMinor * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="font-mono tabular-nums">{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Shipping</dt>
                  <dd className="font-mono tabular-nums">
                    {shippingMinor === 0 ? "Free" : money(shippingMinor)}
                  </dd>
                </div>
                <div className="mt-1 flex justify-between border-t border-line pt-2 text-[0.9375rem] font-medium">
                  <dt>Total</dt>
                  <dd className="font-mono tabular-nums">{money(total)}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

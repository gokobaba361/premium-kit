"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { Checkbox, Field, Input } from "@/components/primitives/form";
import { Alert } from "@/components/primitives/feedback";
import { cn } from "@/lib/cn";

export type DonationFrequency = "one-off" | "monthly";

export type DonationTier = {
  /** Minor units, like every other price in the kit. */
  amountMinor: number;
  /**
   * What this amount actually pays for. Leave it out rather than invent one:
   * an impact line nobody can substantiate is worse than a bare number.
   */
  impact?: string;
};

export type DonationFormProps = {
  title?: string;
  body?: string;
  /**
   * The two ladders are separate on purpose. A monthly ladder is not the
   * one-off ladder divided by twelve, and a charity that reuses one set of
   * amounts for both ends up asking for either far too much every month or far
   * too little once.
   */
  oneOffTiers: DonationTier[];
  monthlyTiers?: DonationTier[];
  defaultFrequency?: DonationFrequency;
  /** Index into the active ladder. Most charities pre-select the second tier. */
  defaultTierIndex?: number;
  /**
   * Below this, card fees take a meaningful share. State it, do not silently
   * reject the donation at the payment step.
   */
  minimumMinor?: number;
  currency?: string;
  locale?: string;
  /** Where the aydınlatma metni lives. Required consent links to it. */
  privacyHref?: string;
  /** The recurring authorisation terms, for the monthly consent. */
  recurringTermsHref?: string;
  /**
   * Fired after the submitting delay. When set, the parent owns the thank-you
   * screen and this block does not render its own, so a confirmation page can
   * take over.
   */
  onDonated?: (data: Record<string, string>) => void;
  tone?: "base" | "subtle";
  labels?: Partial<typeof defaultLabels>;
};

const defaultLabels = {
  oneOff: "Give once",
  monthly: "Give monthly",
  frequency: "How often",
  amount: "Amount",
  otherAmount: "Other amount",
  otherAmountLabel: "Enter an amount",
  name: "Full name",
  email: "Email",
  taxIdLabel: "Tax or national ID number",
  taxIdHelper: "Only used to issue the receipt. Nothing else.",
  wantsReceipt: "I want a donation receipt for my tax return",
  wantsReceiptHelp: "A receipt has to carry your ID number, so we ask for it only if you tick this.",
  publicName: "You may list my name on the supporters page",
  publicNameHelp: "This affects the public list only. Your receipt is issued in your name either way.",
  recurringConsent: "I authorise this recurring charge",
  recurringTerms: "Terms",
  privacyConsent: "I have read how my personal data is used",
  privacyDocument: "Aydınlatma metni",
  submitOnce: "Donate",
  submitMonthly: "Start monthly donation",
  submitting: "Sending",
  thanksTitle: "Thank you",
  thanksBody:
    "This demo stops before a real payment provider; wire onDonated to your own payment and donor system.",
  minimumNote: "Card fees take most of anything smaller, so the minimum is",
  errorAmount: "Choose or enter an amount.",
  errorMinimum: "That is below the minimum of",
  errorName: "Enter the name the receipt should carry.",
  errorEmail: "Enter an email so the receipt can reach you.",
  errorEmailFormat: "That address looks incomplete.",
  errorTaxId: "A receipt needs an ID number, or untick the receipt box.",
  errorRecurring: "A recurring charge needs your authorisation.",
  errorPrivacy: "Please confirm you have read this.",
};

type Errors = Record<string, string>;

/**
 * A link inside a consent label. The click has to be stopped, or opening the
 * document you are being asked to read would also tick the box you have not
 * read it for.
 */
function ConsentLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={(event) => event.stopPropagation()}
      className="underline underline-offset-2 hover:text-accent"
    >
      {children}
    </a>
  );
}

function formatMoney(minor: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: minor % 100 === 0 ? 0 : 2,
  }).format(minor / 100);
}

/**
 * A donation form with amount tiers, one-off or monthly, and the consents each
 * of those actually needs.
 *
 * Three things separate it from a checkout. A monthly gift is a recurring
 * authorisation rather than a single payment, so it carries its own consent
 * naming the amount, the frequency and how to stop it — collected here, stored
 * with the mandate, never merely displayed. A receipt is a document with legal
 * weight rather than a thank-you email, so the ID number it requires is asked
 * for only when the donor asks for the receipt. And the two amount ladders are
 * independent, because a monthly ladder is not the one-off ladder divided by
 * twelve.
 *
 * Presentational and self-contained: no payment provider, no card fields. The
 * parent is handed the donation through onDonated and takes it to a provider.
 * States: idle, validation errors, submitting and (unless the parent takes
 * over) thanked.
 */
export function DonationForm({
  title = "Make a donation",
  body,
  oneOffTiers,
  monthlyTiers,
  defaultFrequency = "one-off",
  defaultTierIndex = 1,
  minimumMinor = 0,
  currency = "TRY",
  locale = "tr-TR",
  privacyHref = "/gizlilik",
  recurringTermsHref,
  onDonated,
  tone = "base",
  labels,
}: DonationFormProps) {
  const text = { ...defaultLabels, ...labels };
  const canRecur = (monthlyTiers?.length ?? 0) > 0;

  const [frequency, setFrequency] = useState<DonationFrequency>(
    canRecur ? defaultFrequency : "one-off",
  );
  const [tierIndex, setTierIndex] = useState<number | "other">(defaultTierIndex);
  const [otherAmount, setOtherAmount] = useState("");
  const [wantsReceipt, setWantsReceipt] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "submitting" | "thanked">("idle");

  const tiers = frequency === "monthly" && monthlyTiers ? monthlyTiers : oneOffTiers;
  const selected = tierIndex === "other" ? undefined : tiers[tierIndex];
  const amountMinor =
    tierIndex === "other" ? Math.round(Number(otherAmount.replace(",", ".")) * 100) : selected?.amountMinor;

  /**
   * Switching frequency re-picks from the other ladder rather than carrying the
   * index across, because the ladders are different lengths and a stale index
   * would silently land on the wrong amount.
   */
  function changeFrequency(next: DonationFrequency) {
    setFrequency(next);
    setTierIndex((current) => (current === "other" ? "other" : Math.min(current, tiers.length - 1)));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Errors = {};

    if (!amountMinor || Number.isNaN(amountMinor) || amountMinor <= 0) {
      next.amount = text.errorAmount;
    } else if (minimumMinor > 0 && amountMinor < minimumMinor) {
      next.amount = `${text.errorMinimum} ${formatMoney(minimumMinor, currency, locale)}.`;
    }
    if (!data.name?.trim()) next.name = text.errorName;
    if (!data.email?.trim()) next.email = text.errorEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = text.errorEmailFormat;
    if (wantsReceipt && !data.taxId?.trim()) next.taxId = text.errorTaxId;
    if (frequency === "monthly" && !data.recurringConsent) next.recurringConsent = text.errorRecurring;
    if (!data.privacyConsent) next.privacyConsent = text.errorPrivacy;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("submitting");
    window.setTimeout(() => {
      const payload = {
        ...data,
        frequency,
        amountMinor: String(amountMinor),
        currency,
      };
      if (onDonated) onDonated(payload);
      else setState("thanked");
    }, 700);
  }

  if (state === "thanked") {
    return (
      <section className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}>
        <Container className="max-w-2xl">
          <Alert tone="success" title={text.thanksTitle}>
            {text.thanksBody}
          </Alert>
        </Container>
      </section>
    );
  }

  /**
   * Only stated once the amount is actually giveable. Restating a below-minimum
   * amount as a commitment beside the error that rejects it says two things at
   * once, and the reassuring one wins.
   */
  const commitment =
    amountMinor && !Number.isNaN(amountMinor) && amountMinor >= Math.max(minimumMinor, 1)
      ? frequency === "monthly"
        ? `${formatMoney(amountMinor, currency, locale)} every month`
        : `${formatMoney(amountMinor, currency, locale)} once`
      : null;

  return (
    <section className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}>
      <Container className="max-w-2xl">
        <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="display-3">{title}</h2>
            {body ? <p className="text-[0.9375rem] leading-relaxed text-muted">{body}</p> : null}
          </div>

          {canRecur ? (
            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-medium">{text.frequency}</legend>
              <div
                role="radiogroup"
                aria-label={text.frequency}
                className="inline-flex gap-1 self-start rounded-pk border border-line bg-subtle p-1"
              >
                {(
                  [
                    ["one-off", text.oneOff],
                    ["monthly", text.monthly],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={frequency === value}
                    onClick={() => changeFrequency(value)}
                    className={cn(
                      "rounded-pk-sm px-3.5 py-1.5 text-sm transition-colors duration-[var(--pk-dur-fast)]",
                      frequency === value
                        ? "bg-elevated font-medium text-fg"
                        : "text-muted hover:text-fg",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-medium">{text.amount}</legend>

            <div role="radiogroup" aria-label={text.amount} className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {tiers.map((tier, index) => {
                const active = tierIndex === index;
                return (
                  <button
                    key={tier.amountMinor}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTierIndex(index)}
                    className={cn(
                      "flex flex-col gap-1 rounded-pk border p-3.5 text-left transition-colors duration-[var(--pk-dur-fast)]",
                      active
                        ? "border-accent bg-accent-soft"
                        : "border-line bg-elevated hover:border-strong",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-[0.9375rem] font-medium tabular-nums">
                        {formatMoney(tier.amountMinor, currency, locale)}
                      </span>
                      {active ? (
                        <Check size={14} weight="bold" aria-hidden className="shrink-0 text-accent" />
                      ) : null}
                    </span>
                    {tier.impact ? (
                      <span className="text-sm leading-snug text-muted">{tier.impact}</span>
                    ) : null}
                  </button>
                );
              })}

              <button
                type="button"
                role="radio"
                aria-checked={tierIndex === "other"}
                onClick={() => setTierIndex("other")}
                className={cn(
                  "rounded-pk border p-3.5 text-left text-[0.9375rem] transition-colors duration-[var(--pk-dur-fast)]",
                  tierIndex === "other"
                    ? "border-accent bg-accent-soft font-medium"
                    : "border-line bg-elevated hover:border-strong",
                )}
              >
                {text.otherAmount}
              </button>
            </div>

            {tierIndex === "other" ? (
              <Field
                label={text.otherAmountLabel}
                error={errors.amount}
                helper={
                  minimumMinor > 0
                    ? `${text.minimumNote} ${formatMoney(minimumMinor, currency, locale)}.`
                    : undefined
                }
              >
                <Input
                  name="otherAmount"
                  inputMode="decimal"
                  value={otherAmount}
                  onChange={(event) => setOtherAmount(event.target.value)}
                />
              </Field>
            ) : errors.amount ? (
              <p role="alert" className="text-sm text-accent">
                {errors.amount}
              </p>
            ) : null}
          </fieldset>

          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">Donor</legend>
            <Field label={text.name} error={errors.name}>
              <Input name="name" autoComplete="name" />
            </Field>
            <Field label={text.email} error={errors.email}>
              <Input name="email" type="email" autoComplete="email" />
            </Field>

            <Checkbox
              name="wantsReceipt"
              label={text.wantsReceipt}
              description={text.wantsReceiptHelp}
              checked={wantsReceipt}
              onCheckedChange={setWantsReceipt}
            />

            {wantsReceipt ? (
              <Field label={text.taxIdLabel} error={errors.taxId} helper={text.taxIdHelper}>
                <Input name="taxId" inputMode="numeric" autoComplete="off" />
              </Field>
            ) : null}

            <Checkbox
              name="publicName"
              label={text.publicName}
              description={text.publicNameHelp}
            />
          </fieldset>

          <fieldset className="flex flex-col gap-4 rounded-pk border border-line bg-elevated p-5">
            <legend className="sr-only">Consent</legend>

            {frequency === "monthly" ? (
              <Checkbox
                name="recurringConsent"
                error={errors.recurringConsent}
                label={
                  <>
                    {text.recurringConsent}
                    {commitment ? <>: {commitment}, until you cancel.</> : null}
                    {recurringTermsHref ? (
                      <>
                        {" "}
                        <ConsentLink href={recurringTermsHref}>{text.recurringTerms}</ConsentLink>
                      </>
                    ) : null}
                  </>
                }
              />
            ) : null}

            <Checkbox
              name="privacyConsent"
              error={errors.privacyConsent}
              label={
                <>
                  {text.privacyConsent}{" "}
                  <ConsentLink href={privacyHref}>{text.privacyDocument}</ConsentLink>
                </>
              }
            />
          </fieldset>

          <div className="flex flex-col gap-3">
            {commitment ? (
              <p className="text-[0.9375rem]">
                You are giving <span className="font-medium">{commitment}</span>.
              </p>
            ) : null}
            <Button
              type="submit"
              size="lg"
              loading={state === "submitting"}
              loadingLabel={text.submitting}
            >
              {frequency === "monthly" ? text.submitMonthly : text.submitOnce}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}

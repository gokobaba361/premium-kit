import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";

export type OrderLine = { id: string; name: string; variant?: string; priceMinor: number; quantity: number };

export type OrderConfirmationProps = {
  orderNumber: string;
  email: string;
  lines: OrderLine[];
  currency?: string;
  locale?: string;
  shippingMinor?: number;
  /** Machine-readable ISO date; rendered in the page locale. */
  estimatedDelivery?: string;
  continueHref?: string;
};

function formatMoney(minor: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(minor / 100);
}

/**
 * Order confirmation. The success end of the commerce flow: a clear
 * acknowledgement, the order number to quote, where the receipt went, an
 * itemised total and a concrete next step. No invented tracking numbers.
 */
export function OrderConfirmation({
  orderNumber,
  email,
  lines,
  currency = "USD",
  locale = "en-US",
  shippingMinor = 0,
  estimatedDelivery,
  continueHref = "/",
}: OrderConfirmationProps) {
  const subtotal = lines.reduce((sum, line) => sum + line.priceMinor * line.quantity, 0);
  const total = subtotal + shippingMinor;
  const money = (minor: number) => formatMoney(minor, currency, locale);
  const delivery = estimatedDelivery
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(new Date(estimatedDelivery))
    : null;

  return (
    <section className="py-section">
      <Container className="max-w-2xl">
        <div className="flex flex-col items-start gap-4">
          <CheckCircle size={40} weight="fill" className="text-accent" aria-hidden />
          <h1 className="display-2 max-w-[18ch] text-balance">Thank you, your order is confirmed.</h1>
          <p className="measure text-lg leading-relaxed text-muted">
            We sent a receipt to <span className="text-fg">{email}</span>. Keep order{" "}
            <span className="font-mono text-fg">{orderNumber}</span> for any questions.
          </p>
        </div>

        <div className="mt-10 rounded-pk border border-line bg-elevated p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="text-sm text-faint">Order</p>
              <p className="font-mono text-[0.9375rem]">{orderNumber}</p>
            </div>
            {delivery ? (
              <div className="text-right">
                <p className="text-sm text-faint">Estimated delivery</p>
                <p className="text-[0.9375rem]">{delivery}</p>
              </div>
            ) : null}
          </div>

          <ul className="flex flex-col gap-3 py-4">
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

          <dl className="flex flex-col gap-1.5 border-t border-line pt-4 text-sm">
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
              <dt>Total paid</dt>
              <dd className="font-mono tabular-nums">{money(total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <ButtonLink href={continueHref} size="lg">
            Continue shopping
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

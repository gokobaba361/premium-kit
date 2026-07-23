"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { Minus, Plus, Trash, X, Bag } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/primitives/button";
import { cn } from "@/lib/cn";

export type CartLine = {
  id: string;
  name: string;
  variant?: string;
  priceMinor: number;
  quantity: number;
  image?: { src: string; alt: string };
};

export type CartDrawerProps = {
  trigger: React.ReactNode;
  lines: CartLine[];
  currency?: string;
  locale?: string;
  /** Free over this threshold in minor units. Omit to always charge shipping. */
  freeShippingMinor?: number;
  shippingMinor?: number;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  checkoutHref?: string;
};

function formatMoney(minor: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(minor / 100);
}

/**
 * Slide-over cart. Radix Dialog gives the focus trap, escape and scroll lock,
 * so this only owns the layout and the money maths. It ships the empty state,
 * per-line quantity and remove controls, and a running subtotal with a shipping
 * line. It is presentational: the parent owns the cart data and callbacks.
 */
export function CartDrawer({
  trigger,
  lines,
  currency = "USD",
  locale = "en-US",
  freeShippingMinor,
  shippingMinor = 0,
  onQuantityChange,
  onRemove,
  checkoutHref = "#checkout",
}: CartDrawerProps) {
  const subtotal = lines.reduce((sum, line) => sum + line.priceMinor * line.quantity, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const freeShipping = freeShippingMinor !== undefined && subtotal >= freeShippingMinor;
  const shipping = lines.length === 0 || freeShipping ? 0 : shippingMinor;
  const total = subtotal + shipping;
  const money = (minor: number) => formatMoney(minor, currency, locale);

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--pk-fg)_45%,transparent)] backdrop-blur-[2px]" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(28rem,92vw)] flex-col bg-bg shadow-pk-lift">
          <header className="flex items-center justify-between border-b border-line px-5 py-4">
            <DialogPrimitive.Title className="flex items-center gap-2 text-[1.0625rem] font-medium">
              <Bag size={19} weight="bold" aria-hidden />
              Cart
              <span className="text-muted">({count})</span>
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Close cart"
              className="rounded-pk-sm p-1.5 text-muted transition-colors hover:bg-subtle hover:text-fg"
            >
              <X size={18} weight="bold" />
            </DialogPrimitive.Close>
          </header>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
              <Bag size={32} className="text-faint" aria-hidden />
              <p className="text-[1.0625rem] font-medium">Your cart is empty</p>
              <p className="measure text-sm leading-relaxed text-muted">
                Browse the collection and add something you will actually keep.
              </p>
              <DialogPrimitive.Close asChild>
                <Button variant="secondary" size="sm" className="mt-2">
                  Continue shopping
                </Button>
              </DialogPrimitive.Close>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-4 py-4">
                    {line.image ? (
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-pk-sm border border-line bg-subtle">
                        <Image
                          src={line.image.src}
                          alt={line.image.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}

                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[0.9375rem] font-medium">{line.name}</p>
                          {line.variant ? (
                            <p className="text-sm text-muted">{line.variant}</p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove?.(line.id)}
                          aria-label={`Remove ${line.name}`}
                          className="shrink-0 rounded-pk-sm p-1 text-faint transition-colors hover:text-accent"
                        >
                          <Trash size={16} weight="bold" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-pk-sm border border-strong">
                          <button
                            type="button"
                            onClick={() => onQuantityChange?.(line.id, Math.max(1, line.quantity - 1))}
                            aria-label="Decrease quantity"
                            className="flex size-8 items-center justify-center text-muted hover:text-fg"
                          >
                            <Minus size={13} weight="bold" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onQuantityChange?.(line.id, Math.min(99, line.quantity + 1))}
                            aria-label="Increase quantity"
                            className="flex size-8 items-center justify-center text-muted hover:text-fg"
                          >
                            <Plus size={13} weight="bold" />
                          </button>
                        </div>
                        <span className="font-mono text-sm tabular-nums">
                          {money(line.priceMinor * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <footer className="border-t border-line px-5 py-4">
                <dl className="flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Subtotal</dt>
                    <dd className="font-mono tabular-nums">{money(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Shipping</dt>
                    <dd className={cn("font-mono tabular-nums", shipping === 0 && "text-accent")}>
                      {shipping === 0 ? "Free" : money(shipping)}
                    </dd>
                  </div>
                  <div className="mt-1 flex justify-between border-t border-line pt-2 text-[0.9375rem] font-medium">
                    <dt>Total</dt>
                    <dd className="font-mono tabular-nums">{money(total)}</dd>
                  </div>
                </dl>
                <Button className="mt-4 w-full" size="lg" onClick={() => (window.location.href = checkoutHref)}>
                  Checkout
                </Button>
              </footer>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

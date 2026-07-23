"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

export type ProductVariant = {
  id: string;
  label: string;
  /** Out-of-stock variants render disabled rather than vanishing. */
  soldOut?: boolean;
};

export type ProductDetailProps = {
  name: string;
  /** Price in minor units (e.g. cents/kuruş) so no floating-point money. */
  priceMinor: number;
  currency?: string;
  locale?: string;
  description: string;
  images: { src: string; alt: string }[];
  variants?: ProductVariant[];
  /** A short factual list. Not marketing bullets. */
  specs?: { label: string; value: string }[];
  /** Called with the chosen variant and quantity. Wire to a real cart. */
  onAdd?: (variantId: string | null, quantity: number) => void;
};

function formatMoney(minor: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(minor / 100);
}

/**
 * Product detail with a real interaction surface: a thumbnail gallery, variant
 * selection that keeps sold-out options visible-but-disabled, a quantity
 * stepper and an add-to-cart button that shows a transient added state.
 *
 * It is presentational and owns no cart. `onAdd` hands the choice to whatever
 * cart the target project uses, so the block stays copyable and unopinionated.
 */
export function ProductDetail({
  name,
  priceMinor,
  currency = "USD",
  locale = "en-US",
  description,
  images,
  variants,
  specs,
  onAdd,
}: ProductDetailProps) {
  const [active, setActive] = useState(0);
  const firstSelectable = variants?.find((v) => !v.soldOut)?.id ?? null;
  const [variant, setVariant] = useState<string | null>(firstSelectable);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedSoldOut = variants?.find((v) => v.id === variant)?.soldOut ?? false;

  function add() {
    if (selectedSoldOut) return;
    onAdd?.(variant, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <section className="py-section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-pk border border-line bg-subtle">
              <Image
                src={images[active]?.src}
                alt={images[active]?.alt ?? name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {images.length > 1 ? (
              <ul className="flex flex-wrap gap-3">
                {images.map((image, index) => (
                  <li key={image.src}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={index === active}
                      className={cn(
                        "relative size-16 overflow-hidden rounded-pk-sm border transition-colors",
                        index === active ? "border-accent" : "border-line hover:border-strong",
                      )}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="display-2 max-w-[16ch] text-balance">{name}</h1>
              <p className="font-display text-2xl font-semibold tabular-nums">
                {formatMoney(priceMinor, currency, locale)}
              </p>
              <p className="measure text-[0.9375rem] leading-relaxed text-muted">{description}</p>
            </div>

            {variants && variants.length > 0 ? (
              <fieldset className="flex flex-col gap-3">
                <legend className="text-sm font-medium">Options</legend>
                <div className="flex flex-wrap gap-2">
                  {variants.map((option) => {
                    const selected = option.id === variant;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={option.soldOut}
                        onClick={() => setVariant(option.id)}
                        aria-pressed={selected}
                        className={cn(
                          "rounded-pk-sm border px-3.5 py-2 text-sm transition-colors",
                          option.soldOut && "cursor-not-allowed text-faint line-through opacity-60",
                          selected
                            ? "border-accent bg-accent-soft text-fg"
                            : "border-strong hover:border-fg",
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-pk-sm border border-strong">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex size-11 items-center justify-center text-muted hover:text-fg"
                >
                  <Minus size={15} weight="bold" />
                </button>
                <span className="w-10 text-center font-mono text-sm tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                  className="flex size-11 items-center justify-center text-muted hover:text-fg"
                >
                  <Plus size={15} weight="bold" />
                </button>
              </div>

              <Button size="lg" onClick={add} disabled={selectedSoldOut} className="min-w-44">
                {selectedSoldOut ? (
                  "Sold out"
                ) : added ? (
                  <>
                    <Check size={17} weight="bold" aria-hidden />
                    Added
                  </>
                ) : (
                  "Add to cart"
                )}
              </Button>
            </div>

            {specs && specs.length > 0 ? (
              <dl className="mt-2 grid gap-x-6 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-0.5">
                    <dt className="text-sm text-faint">{spec.label}</dt>
                    <dd className="text-[0.9375rem]">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

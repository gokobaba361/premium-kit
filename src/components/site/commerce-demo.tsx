"use client";

import { useState } from "react";
import { Bag } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/components/primitives/cart-store";
import { CartDrawer } from "@/components/blocks/cart-drawer";
import { ProductDetail } from "@/components/blocks/product-detail";
import { CheckoutForm } from "@/components/blocks/checkout-form";
import { OrderConfirmation } from "@/components/blocks/order-confirmation";
import { Container } from "@/components/primitives/layout";
import { Button } from "@/components/primitives/button";

/**
 * End-to-end commerce demo.
 *
 * The four commerce blocks share one live cart through the cart store, so this
 * is the flow assembled for real: add on the product page, review in the drawer,
 * check out, and land on a confirmation. Money stays in integer minor units the
 * whole way.
 */

const CURRENCY = "EUR";
const LOCALE = "de-DE";
const SHIPPING_MINOR = 600;

type Step = "shop" | "checkout" | "confirmed";

const product = {
  id: "skillet-28",
  name: "The 28cm skillet",
  priceMinor: 14500,
  image: { src: "https://picsum.photos/seed/ocak-skillet-a/160/160", alt: "Cast iron skillet" },
};

export function CommerceDemo() {
  const cart = useCart();
  const [step, setStep] = useState<Step>("shop");
  const [order, setOrder] = useState<{ number: string; email: string; lines: typeof cart.lines } | null>(
    null,
  );

  function nav() {
    return (
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <Container className="flex h-[68px] items-center justify-between">
          <button
            type="button"
            onClick={() => setStep("shop")}
            className="font-display text-[0.95rem] font-semibold tracking-tight"
          >
            Ocak Goods
          </button>
          <CartDrawer
            trigger={
              <Button variant="ghost" size="sm" aria-label={`Cart, ${cart.count} items`}>
                <Bag size={18} weight="bold" aria-hidden />
                {cart.count > 0 ? cart.count : null}
              </Button>
            }
            lines={cart.lines}
            currency={CURRENCY}
            locale={LOCALE}
            freeShippingMinor={20000}
            shippingMinor={SHIPPING_MINOR}
            onQuantityChange={cart.setQuantity}
            onRemove={cart.remove}
            checkoutHref="#checkout"
          />
        </Container>
      </header>
    );
  }

  if (step === "confirmed" && order) {
    return (
      <>
        {nav()}
        <main>
          <OrderConfirmation
            orderNumber={order.number}
            email={order.email}
            lines={order.lines}
            currency={CURRENCY}
            locale={LOCALE}
            shippingMinor={SHIPPING_MINOR}
            estimatedDelivery="2026-08-05"
            continueHref="#"
          />
        </main>
      </>
    );
  }

  if (step === "checkout") {
    if (cart.lines.length === 0) {
      return (
        <>
          {nav()}
          <main className="py-section">
            <Container className="flex flex-col items-start gap-4">
              <h1 className="display-2">Your cart is empty</h1>
              <p className="measure text-muted">Add the skillet first, then check out.</p>
              <Button onClick={() => setStep("shop")}>Back to the product</Button>
            </Container>
          </main>
        </>
      );
    }
    return (
      <>
        {nav()}
        <main>
          <Container className="pt-10">
            <button
              type="button"
              onClick={() => setStep("shop")}
              className="text-sm text-muted hover:text-fg"
            >
              ← Back to shopping
            </button>
          </Container>
          <CheckoutForm
            lines={cart.lines}
            currency={CURRENCY}
            locale={LOCALE}
            shippingMinor={SHIPPING_MINOR}
            onPlaced={(data) => {
              const number = `OCK-${Math.floor(1000 + Math.random() * 9000)}`;
              setOrder({ number, email: data.email, lines: cart.lines });
              cart.clear();
              setStep("confirmed");
            }}
          />
        </main>
      </>
    );
  }

  return (
    <>
      {nav()}
      <main>
        <ProductDetail
          name={product.name}
          priceMinor={product.priceMinor}
          currency={CURRENCY}
          locale={LOCALE}
          description="Sand cast in one piece, milled smooth and seasoned six times before it ships. Add it to the cart to walk the full checkout."
          images={[
            { src: "https://picsum.photos/seed/ocak-skillet-a/800/800", alt: "Skillet, top view" },
            { src: "https://picsum.photos/seed/ocak-skillet-b/800/800", alt: "Skillet, in use" },
            { src: "https://picsum.photos/seed/ocak-skillet-c/800/800", alt: "Skillet handle" },
          ]}
          variants={[
            { id: "sage", label: "Sage" },
            { id: "charcoal", label: "Charcoal" },
            { id: "clay", label: "Clay", soldOut: true },
          ]}
          specs={[
            { label: "Diameter", value: "28cm" },
            { label: "Weight", value: "2.1kg" },
            { label: "Material", value: "Sand cast grey iron" },
            { label: "Guarantee", value: "Replaced if it cracks in normal use" },
          ]}
          onAdd={(variantId, quantity) => {
            const label = variantId ? variantId[0].toUpperCase() + variantId.slice(1) : undefined;
            cart.add({ ...product, variant: label }, quantity);
          }}
        />

        {cart.count > 0 ? (
          <Container className="pb-section">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-pk border border-line bg-subtle p-5">
              <p className="text-[0.9375rem]">
                {cart.count} item{cart.count === 1 ? "" : "s"} in the cart.
              </p>
              <Button onClick={() => setStep("checkout")}>Go to checkout</Button>
            </div>
          </Container>
        ) : null}
      </main>
    </>
  );
}

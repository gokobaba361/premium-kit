"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny cart store.
 *
 * Product detail, the cart drawer and checkout need to share one live cart.
 * Rather than thread state through props, they read this module-level store
 * through the useCart hook. The store is subscribed to with
 * useSyncExternalStore, so there is no setState-in-effect and no hydration
 * mismatch: the server and the first client render both start empty, and any
 * change after mount re-renders the subscribers.
 *
 * It is intentionally in-memory. Persisting to localStorage is a deliberate
 * extension, not a default, because a persisted cart needs a pre-paint hydration
 * step to stay consistent (see theme-runtime for that pattern).
 *
 * Money is kept in integer minor units end to end. No floating-point totals.
 */

export type CartItem = {
  id: string;
  name: string;
  variant?: string;
  priceMinor: number;
  quantity: number;
  image?: { src: string; alt: string };
};

let items: CartItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return items;
}

/** Server render and hydration both see an empty cart. */
function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

const EMPTY: CartItem[] = [];

export const cartStore = {
  add(item: Omit<CartItem, "quantity">, quantity = 1) {
    const existing = items.find((line) => line.id === item.id && line.variant === item.variant);
    if (existing) {
      items = items.map((line) =>
        line === existing ? { ...line, quantity: Math.min(99, line.quantity + quantity) } : line,
      );
    } else {
      items = [...items, { ...item, quantity }];
    }
    emit();
  },
  setQuantity(id: string, quantity: number) {
    items = items.map((line) => (line.id === id ? { ...line, quantity: Math.max(1, quantity) } : line));
    emit();
  },
  remove(id: string) {
    items = items.filter((line) => line.id !== id);
    emit();
  },
  clear() {
    items = EMPTY;
    emit();
  },
};

/**
 * Reads the live cart and returns derived totals plus the store actions.
 * Any component calling this re-renders when the cart changes.
 */
export function useCart() {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotalMinor = lines.reduce((sum, line) => sum + line.priceMinor * line.quantity, 0);

  return {
    lines,
    count,
    subtotalMinor,
    add: cartStore.add,
    setQuantity: cartStore.setQuantity,
    remove: cartStore.remove,
    clear: cartStore.clear,
  };
}

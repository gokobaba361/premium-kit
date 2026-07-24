"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny booking store.
 *
 * The service picker, staff picker, availability calendar and summary need to
 * share one live booking. Rather than thread state through props, they read this
 * module-level store through the useBooking hook. Subscribed with
 * useSyncExternalStore, so there is no setState-in-effect and no hydration
 * mismatch: the server and first client render both start empty, and any change
 * after mount re-renders the subscribers. It mirrors the cart-store pattern.
 *
 * Money is kept in integer minor units end to end. Dates are machine-readable
 * ISO day strings (YYYY-MM-DD) and times are 24-hour HH:mm, with the time zone
 * carried alongside rather than baked into a Date, so there is no off-by-one
 * across zones.
 */

export type BookingService = {
  id: string;
  name: string;
  durationMin: number;
  priceMinor: number;
};

export type BookingStaff = {
  id: string;
  name: string;
  role?: string;
};

export type BookingSlot = {
  /** ISO day, e.g. 2026-08-14. */
  date: string;
  /** 24-hour time, e.g. 09:30. */
  time: string;
};

export type Booking = {
  service: BookingService | null;
  staff: BookingStaff | null;
  slot: BookingSlot | null;
};

const EMPTY: Booking = { service: null, staff: null, slot: null };
let booking: Booking = EMPTY;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return booking;
}

function getServerSnapshot(): Booking {
  return EMPTY;
}

export const bookingStore = {
  setService(service: BookingService | null) {
    booking = { ...booking, service };
    emit();
  },
  setStaff(staff: BookingStaff | null) {
    booking = { ...booking, staff };
    emit();
  },
  setSlot(slot: BookingSlot | null) {
    booking = { ...booking, slot };
    emit();
  },
  reset() {
    booking = EMPTY;
    emit();
  },
};

/**
 * Reads the live booking and returns it plus the store actions and a `ready`
 * flag that is true once a service, staff and slot are all chosen.
 */
export function useBooking() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = Boolean(current.service && current.staff && current.slot);

  return {
    ...current,
    ready,
    setService: bookingStore.setService,
    setStaff: bookingStore.setStaff,
    setSlot: bookingStore.setSlot,
    reset: bookingStore.reset,
  };
}

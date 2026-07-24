"use client";

import { useState } from "react";
import { Container } from "@/components/primitives/layout";
import { Button } from "@/components/primitives/button";
import { Field, Input } from "@/components/primitives/form";
import { ServicePicker, type Service } from "@/components/blocks/service-picker";
import { StaffPicker, type StaffMember } from "@/components/blocks/staff-picker";
import { AvailabilityCalendar, type Availability } from "@/components/blocks/availability-calendar";
import { BookingSummary } from "@/components/blocks/booking-summary";
import { useBooking } from "@/components/primitives/booking-store";

/**
 * End-to-end booking demo.
 *
 * The four booking blocks share one live booking through the booking store, so
 * this is the flow assembled for real: pick a service, pick a practitioner,
 * pick a time, then confirm. Progressive disclosure gates each step on the last,
 * the way a real booking form does. Money stays in integer minor units and the
 * time zone is explicit throughout.
 */

const CURRENCY = "EUR";
const LOCALE = "en-GB";
const TIME_ZONE = "Europe/Istanbul";

const services: Service[] = [
  {
    id: "assessment",
    name: "Initial assessment",
    description: "A full first appointment: history, movement screen and a plan.",
    durationMin: 60,
    priceMinor: 9000,
  },
  {
    id: "physio",
    name: "Physiotherapy session",
    description: "A follow-up treatment session for an existing plan.",
    durationMin: 45,
    priceMinor: 6500,
  },
  {
    id: "review",
    name: "Progress review",
    description: "A shorter check-in to adjust the plan.",
    durationMin: 30,
    priceMinor: 4500,
  },
];

const staff: StaffMember[] = [
  {
    id: "any",
    name: "Any available",
    role: "First free practitioner",
  },
  {
    id: "elif",
    name: "Elif Saral",
    role: "Musculoskeletal physio",
    photo: { src: "https://picsum.photos/seed/vira-elif/200/200", alt: "Elif Saral" },
  },
  {
    id: "tomas",
    name: "Tomas Beck",
    role: "Sports physio",
    photo: { src: "https://picsum.photos/seed/vira-tomas/200/200", alt: "Tomas Beck" },
  },
];

/* Availability is pre-computed here, the way a real parent would build it from a
   backend, and handed to the calendar. Weekends are closed; a couple of weekdays
   are fully booked (absent), so disabled days are visible. */
const availability: Availability = {
  "2026-08-11": ["09:00", "09:45", "11:30", "14:00", "15:30"],
  "2026-08-12": ["09:30", "10:15", "13:00", "16:00"],
  "2026-08-13": ["09:00", "10:30", "14:30"],
  "2026-08-17": ["09:15", "11:00", "13:30", "15:00", "16:45"],
  "2026-08-18": ["10:00", "11:45", "14:15"],
  "2026-08-20": ["09:00", "09:45", "10:30", "13:15"],
  "2026-08-21": ["11:00", "14:00", "15:45"],
  "2026-08-25": ["09:30", "12:00", "16:30"],
  "2026-08-26": ["09:00", "10:45", "13:00", "14:30", "16:00"],
  "2026-08-27": ["10:15", "11:30", "15:15"],
};

type Confirmed = {
  reference: string;
  email: string;
  service: Service;
  staff: StaffMember;
  slot: { date: string; time: string };
};

export function BookingDemo() {
  const booking = useBooking();
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);
  const [error, setError] = useState<string | null>(null);

  function nav() {
    return (
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <Container className="flex h-[68px] items-center justify-between">
          <span className="font-display text-[0.95rem] font-semibold tracking-tight">
            Vira Clinic
          </span>
          <span className="text-sm text-muted">Book an appointment</span>
        </Container>
      </header>
    );
  }

  if (confirmed) {
    return (
      <>
        {nav()}
        <main>
          <BookingSummary
            reference={confirmed.reference}
            service={confirmed.service}
            staff={confirmed.staff}
            slot={confirmed.slot}
            timeZone={TIME_ZONE}
            currency={CURRENCY}
            locale={LOCALE}
            email={confirmed.email}
            manageHref="#"
          />
        </main>
      </>
    );
  }

  function onConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<
      string,
      string
    >;
    if (!booking.service || !booking.staff || !booking.slot) return;
    if (!data.name?.trim() || !data.email?.trim()) {
      setError("Add your name and email so we can confirm the appointment.");
      return;
    }
    setError(null);
    const reference = `VIRA-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmed({
      reference,
      email: data.email,
      service: booking.service,
      staff: booking.staff,
      slot: booking.slot,
    });
    booking.reset();
  }

  return (
    <>
      {nav()}
      <main>
        <ServicePicker
          title="1. Choose a service"
          body="Physiotherapy at the Vira Clinic. Pick the appointment that fits."
          services={services}
          currency={CURRENCY}
          locale={LOCALE}
          selectedId={booking.service?.id ?? null}
          onSelect={(service) => booking.setService(service)}
        />

        {booking.service ? (
          <StaffPicker
            title="2. Choose a practitioner"
            body="Or let us assign the first one free."
            staff={staff}
            selectedId={booking.staff?.id ?? null}
            onSelect={(member) => booking.setStaff(member)}
            tone="subtle"
          />
        ) : null}

        {booking.service && booking.staff ? (
          <AvailabilityCalendar
            title="3. Choose a time"
            body="Open times for the next few weeks."
            availability={availability}
            timeZone={TIME_ZONE}
            locale={LOCALE}
            selectedDate={booking.slot?.date ?? null}
            selectedTime={booking.slot?.time ?? null}
            onSelectDate={(date) =>
              booking.setSlot({ date, time: booking.slot?.date === date ? booking.slot.time : "" })
            }
            onSelectSlot={(date, time) => booking.setSlot({ date, time })}
          />
        ) : null}

        {booking.service && booking.staff && booking.slot?.time ? (
          <section className="bg-subtle py-section">
            <Container className="max-w-2xl">
              <h2 className="display-3">4. Confirm</h2>
              <form noValidate onSubmit={onConfirm} className="mt-6 flex flex-col gap-5">
                <Field label="Full name" error={error ?? undefined}>
                  <Input name="name" autoComplete="name" />
                </Field>
                <Field label="Email">
                  <Input name="email" type="email" autoComplete="email" />
                </Field>
                <Button type="submit" size="lg">
                  Confirm appointment
                </Button>
              </form>
            </Container>
          </section>
        ) : null}
      </main>
    </>
  );
}

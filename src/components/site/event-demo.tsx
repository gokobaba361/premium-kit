"use client";

import { useState } from "react";
import { Container } from "@/components/primitives/layout";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroCentered } from "@/components/blocks/hero-centered";
import { StatsBand } from "@/components/blocks/stats-band";
import { EventSchedule } from "@/components/blocks/event-schedule";
import { TeamGrid } from "@/components/blocks/team-grid";
import { LocationGrid } from "@/components/blocks/location-grid";
import { SiteFooter } from "@/components/blocks/site-footer";
import { TicketTiers, type TicketTier } from "@/components/blocks/ticket-tiers";
import { RegistrationForm } from "@/components/blocks/registration-form";
import { RegistrationConfirmation } from "@/components/blocks/registration-confirmation";

/**
 * End-to-end event demo.
 *
 * The event blocks that already shipped (schedule, speakers, venue, facts) carry
 * the marketing page; the registration flow added this batch turns it into a
 * real flow: pick a ticket, register, land on a confirmation. Money stays in
 * integer minor units and the event brand and speakers are fictional.
 */

const CURRENCY = "EUR";
const LOCALE = "en-GB";
const EVENT_NAME = "Relay 2026";
const EVENT_DATE = "2026-11-14";
const VENUE = "Tersane Istanbul";

const tiers: TicketTier[] = [
  {
    id: "early",
    name: "Early bird",
    priceMinor: 12000,
    summary: "Gone, but here so the price ladder is honest.",
    includes: ["Both days", "All talks", "Lunch included"],
    availability: "sold-out",
  },
  {
    id: "standard",
    name: "Standard",
    priceMinor: 18000,
    summary: "Full access to both days.",
    includes: ["Both days", "All talks", "Lunch included", "Recordings afterwards"],
    availability: "limited",
    featured: true,
  },
  {
    id: "student",
    name: "Student",
    priceMinor: 6000,
    summary: "With a valid student email.",
    includes: ["Both days", "All talks", "Recordings afterwards"],
  },
];

const speakers = [
  {
    name: "Meral Yücel",
    role: "Design systems, Tersane",
    photo: { src: "https://picsum.photos/seed/relay-meral/400/500", alt: "Meral Yücel" },
  },
  {
    name: "Tomas Beck",
    role: "Staff engineer, Denge",
    photo: { src: "https://picsum.photos/seed/relay-tomas/400/500", alt: "Tomas Beck" },
  },
  {
    name: "Aylin Demir",
    role: "Product lead, Kavat",
    photo: { src: "https://picsum.photos/seed/relay-aylin/400/500", alt: "Aylin Demir" },
  },
  {
    name: "Jonas Weiss",
    role: "Principal researcher, Vira",
    photo: { src: "https://picsum.photos/seed/relay-jonas/400/500", alt: "Jonas Weiss" },
  },
];

type Registered = {
  reference: string;
  email: string;
  ticketName: string;
  attendeeName: string;
};

export function EventDemo() {
  const [tier, setTier] = useState<TicketTier | null>(null);
  const [registered, setRegistered] = useState<Registered | null>(null);

  function nav() {
    return (
      <SiteNav
        brand="Relay 2026"
        items={[
          { label: "Schedule", href: "#schedule" },
          { label: "Speakers", href: "#speakers" },
          { label: "Venue", href: "#venue" },
          { label: "Tickets", href: "#tickets" },
        ]}
        cta={{ label: "Get a ticket", href: "#tickets" }}
      />
    );
  }

  if (registered) {
    return (
      <>
        {nav()}
        <main>
          <RegistrationConfirmation
            reference={registered.reference}
            eventName={EVENT_NAME}
            eventDate={EVENT_DATE}
            venue={VENUE}
            ticketName={registered.ticketName}
            attendeeName={registered.attendeeName}
            email={registered.email}
            locale={LOCALE}
            addToCalendarHref="#calendar"
            continueHref="#"
          />
        </main>
      </>
    );
  }

  return (
    <>
      {nav()}
      <main>
        <HeroCentered
          eyebrow="14-15 November 2026 · Istanbul"
          headline="Two days on how products actually get built."
          subtext="One room, no parallel tracks, and speakers who ship. Talks are recorded, so you never have to choose."
          primary={{ label: "Get a ticket", href: "#tickets" }}
          secondary={{ label: "See the schedule", href: "#schedule" }}
        />

        <StatsBand
          title="The shape of it"
          body="From the published programme and the venue plan."
          stats={[
            { value: "2 days", label: "14 and 15 November", source: "Programme" },
            { value: "24", label: "Talks, one room", source: "Programme" },
            { value: "600", label: "Seats", source: "Venue plan" },
          ]}
        />

        <div id="schedule">
          <EventSchedule
            title="Two days, one room"
            body="Every session is recorded and stays up afterwards. Nothing runs in parallel."
            days={[
              {
                date: "2026-11-14",
                sessions: [
                  { time: "09:30", title: "Opening: what we keep getting wrong", speaker: "Meral Yücel", track: "Main room" },
                  { time: "11:00", title: "Design systems that survive a redesign", speaker: "Meral Yücel", track: "Main room" },
                  { time: "14:00", title: "Shipping in two languages without duplicating the site", speaker: "Tomas Beck", track: "Main room" },
                ],
              },
              {
                date: "2026-11-15",
                sessions: [
                  { time: "10:00", title: "Research that changes the roadmap", speaker: "Jonas Weiss", track: "Main room" },
                  { time: "13:30", title: "The product lead's honest week", speaker: "Aylin Demir", track: "Main room" },
                  { time: "16:00", title: "Closing panel: what we'll get wrong next year", track: "Main room" },
                ],
              },
            ]}
            tone="subtle"
          />
        </div>

        <div id="speakers">
          <TeamGrid title="Speakers" body="Four of the twenty-four. The rest are on the schedule." people={speakers} />
        </div>

        <div id="venue">
          <LocationGrid
            title="Venue"
            body="A restored shipyard on the Golden Horn, ten minutes from the ferry."
            locations={[
              {
                name: "Tersane Istanbul",
                address: "Beyoğlu, Istanbul",
                detail: "Doors 09:00 both days. Step-free access throughout.",
                href: "#directions",
              },
              {
                name: "Getting there",
                address: "Ferry to Kasımpaşa, then a 10 minute walk",
                detail: "No parking on site; the ferry is the fastest route.",
              },
            ]}
            tone="subtle"
          />
        </div>

        <div id="tickets">
          <TicketTiers
            title="Choose a ticket"
            body="One price ladder, no hidden fees. Recordings are included from Standard up."
            tiers={tiers}
            currency={CURRENCY}
            locale={LOCALE}
            selectedId={tier?.id ?? null}
            onSelect={(next) => setTier(next)}
          />
        </div>

        {tier ? (
          <div id="register">
            <RegistrationForm
              title="Register"
              body={`One ${tier.name} ticket. Enter the attendee's details to finish.`}
              ticket={{ name: tier.name, priceMinor: tier.priceMinor }}
              currency={CURRENCY}
              locale={LOCALE}
              tone="subtle"
              onRegistered={(data) => {
                const reference = `RELAY-${Math.floor(1000 + Math.random() * 9000)}`;
                setRegistered({
                  reference,
                  email: data.email,
                  ticketName: tier.name,
                  attendeeName: data.name,
                });
                setTier(null);
              }}
            />
          </div>
        ) : (
          <Container className="pb-section">
            <p className="text-sm text-muted">Choose a ticket above to register.</p>
          </Container>
        )}
      </main>

      <SiteFooter
        brand="Relay 2026"
        blurb="A two-day product and engineering conference in Istanbul. One room, no parallel tracks."
        groups={[
          {
            heading: "Event",
            links: [
              { label: "Schedule", href: "#schedule" },
              { label: "Speakers", href: "#speakers" },
              { label: "Venue", href: "#venue" },
            ],
          },
          {
            heading: "Tickets",
            links: [
              { label: "Buy a ticket", href: "#tickets" },
              { label: "Group rates", href: "#groups" },
              { label: "Student tickets", href: "#tickets" },
            ],
          },
          {
            heading: "Info",
            links: [
              { label: "Code of conduct", href: "#conduct" },
              { label: "Contact", href: "#contact" },
              { label: "Past years", href: "#archive" },
            ],
          },
        ]}
      />
    </>
  );
}

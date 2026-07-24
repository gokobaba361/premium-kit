import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { EventDemo } from "@/components/site/event-demo";

export const metadata: Metadata = {
  title: "Event flow demo",
  description:
    "The schedule, speakers, venue and facts blocks plus the ticket, registration and confirmation flow, assembled into one live event page.",
};

export default function EventDemoPage() {
  return (
    <ThemeScope theme="signal">
      <EventDemo />
    </ThemeScope>
  );
}

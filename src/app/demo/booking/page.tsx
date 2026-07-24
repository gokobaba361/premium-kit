import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { BookingDemo } from "@/components/site/booking-demo";

export const metadata: Metadata = {
  title: "Booking flow demo",
  description:
    "The service picker, staff picker, availability calendar and booking summary assembled into one live flow with a shared booking store.",
};

export default function BookingDemoPage() {
  return (
    <ThemeScope theme="clinic">
      <BookingDemo />
    </ThemeScope>
  );
}

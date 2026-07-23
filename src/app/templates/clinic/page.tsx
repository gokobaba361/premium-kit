import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { StaticMotion } from "@/components/primitives/motion-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroSplit } from "@/components/blocks/hero-split";
import { StepsFlow } from "@/components/blocks/steps-flow";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { FaqAccordion } from "@/components/blocks/faq-accordion";
import { ContactForm } from "@/components/blocks/contact-form";
import { SiteFooter } from "@/components/blocks/site-footer";

export const metadata: Metadata = {
  title: "Clinic template",
  description: "Healthcare provider site built on the Clinic preset.",
};

/**
 * Clinic: healthcare, insurance and public services.
 * Wrapped in StaticMotion, so nothing animates for anyone. Plain language,
 * high contrast, an accordion that works without JavaScript, and a form with
 * labels above inputs and inline errors.
 */
export default function ClinicTemplate() {
  return (
    <ThemeScope theme="clinic">
      <StaticMotion>
        <SiteNav
          brand="Meadowline Health"
          items={[
            { label: "Services", href: "#services" },
            { label: "Your visit", href: "#visit" },
            { label: "Costs", href: "#costs" },
            { label: "Locations", href: "#locations" },
          ]}
          cta={{ label: "Book an appointment", href: "#book" }}
        />

        <main>
          <HeroSplit
            headline="See your own doctor this week."
            subtext="Family medicine across four clinics. Most patients are seen within three working days."
            primary={{ label: "Book an appointment", href: "#book" }}
            secondary={{ label: "Find a location", href: "#locations" }}
            image={{
              src: "https://picsum.photos/seed/meadowline-consultation-room/1200/900",
              alt: "Doctor speaking with a patient in a consultation room",
            }}
          />

          <StepsFlow
            title="What happens when you book"
            body="Every appointment follows the same path, so you know what to expect before you arrive."
            steps={[
              {
                title: "Choose a time",
                body: "Book online or by phone. Evening slots are available at two of the four clinics.",
              },
              {
                title: "Share your history",
                body: "You complete a short form before the visit so the consultation starts with your notes read.",
              },
              {
                title: "See the same doctor again",
                body: "Follow up appointments are scheduled with the doctor who saw you first, unless you ask otherwise.",
              },
            ]}
            tone="subtle"
          />

          <FeatureBento
            title="Services at every clinic"
            cells={[
              {
                title: "Family medicine",
                body: "Routine care, chronic condition management and referrals for adults and children.",
                span: 3,
              },
              {
                title: "Screening and vaccination",
                body: "Scheduled screening programmes and seasonal vaccination without a separate appointment.",
                span: 3,
              },
              {
                title: "On site laboratory",
                body: "Blood tests are taken at the clinic. Most results reach your record within two working days.",
                span: 6,
                media: {
                  src: "https://picsum.photos/seed/meadowline-clinic-laboratory/1600/700",
                  alt: "Laboratory technician processing samples",
                },
              },
            ]}
          />

          <FaqAccordion
            title="Questions patients ask before booking"
            items={[
              {
                question: "Do I need a referral to book?",
                answer:
                  "No. You can book directly with any of our family doctors. A referral is only needed for hospital specialists, and we issue that during your visit if it applies.",
              },
              {
                question: "What does an appointment cost?",
                answer:
                  "Standard consultations are covered by public insurance. If you are paying privately, the fee is confirmed in writing before you book, and it does not change afterwards.",
              },
              {
                question: "Can I be seen at a different clinic than usual?",
                answer:
                  "Yes. Your record is shared across all four clinics, so any of our doctors can see your history with your consent.",
              },
              {
                question: "How do I get my test results?",
                answer:
                  "Results appear in your patient record and you receive a message when they arrive. If anything needs discussing, a doctor calls you rather than waiting for your next visit.",
              },
              {
                question: "What if I need care outside opening hours?",
                answer:
                  "Call the clinic number and you reach the regional out of hours service. For an emergency, call the emergency number or go to the nearest hospital.",
              },
            ]}
          />

          <ContactForm
            title="Ask us something before you book"
            body="For medical advice please book an appointment. This form is for practical questions about visits, costs and records."
          />
        </main>

        <SiteFooter
          brand="Meadowline Health"
          blurb="Four family medicine clinics, one shared patient record."
          groups={[
            {
              heading: "Care",
              links: [
                { label: "Services", href: "#services" },
                { label: "Your visit", href: "#visit" },
                { label: "Costs", href: "#costs" },
              ],
            },
            {
              heading: "Practical",
              links: [
                { label: "Locations", href: "#locations" },
                { label: "Opening hours", href: "#locations" },
                { label: "Out of hours care", href: "#visit" },
              ],
            },
            {
              heading: "About",
              links: [
                { label: "Our doctors", href: "#about" },
                { label: "Patient rights", href: "#rights" },
                { label: "Accessibility", href: "#accessibility" },
              ],
            },
          ]}
        />
      </StaticMotion>
    </ThemeScope>
  );
}

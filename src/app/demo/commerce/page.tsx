import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { CommerceDemo } from "@/components/site/commerce-demo";

export const metadata: Metadata = {
  title: "Commerce flow demo",
  description:
    "The product, cart, checkout and confirmation blocks assembled into one live flow with a shared cart store.",
};

export default function CommerceDemoPage() {
  return (
    <ThemeScope theme="forest">
      <CommerceDemo />
    </ThemeScope>
  );
}

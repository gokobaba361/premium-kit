import type { Metadata } from "next";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { ToastProvider } from "@/components/primitives/toast";
import { AdminDemo } from "@/components/site/admin-demo";

export const metadata: Metadata = {
  title: "Admin flow demo",
  description:
    "The resource table, record form, delete confirmation and audit log assembled into one live CRUD flow with toast confirmations.",
};

export default function AdminDemoPage() {
  return (
    <ThemeScope theme="slate">
      <ToastProvider>
        <AdminDemo />
      </ToastProvider>
    </ThemeScope>
  );
}

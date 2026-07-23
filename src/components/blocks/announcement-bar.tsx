"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/layout";

/**
 * One line, dismissible, above the nav. If it needs two lines it is a section,
 * not a bar. Dismissal is per session on purpose: no cookie, no tracking.
 */
export function AnnouncementBar({
  message,
  action,
}: {
  message: string;
  action?: { label: string; href: string };
}) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="bg-accent text-accent-fg">
      <Container className="flex h-11 items-center justify-between gap-4">
        <p className="flex items-center gap-3 truncate text-sm">
          {message}
          {action ? (
            <Link
              href={action.href}
              className="inline-flex shrink-0 items-center gap-1.5 font-medium underline underline-offset-4"
            >
              {action.label}
              <ArrowRight size={13} weight="bold" aria-hidden />
            </Link>
          ) : null}
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          className="-mr-1 shrink-0 rounded-pk-sm p-1 opacity-80 transition-opacity hover:opacity-100"
        >
          <X size={15} weight="bold" />
        </button>
      </Container>
    </div>
  );
}

"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { NavItem } from "./site-nav";

/**
 * Mobile navigation drawer. Radix Dialog gives the focus trap, escape key and
 * scroll lock, so the only thing left here is the sheet itself.
 * The primary CTA repeats inside the drawer with the same label as the header.
 */
export function MobileNav({
  items,
  cta,
}: {
  items: NavItem[];
  cta?: { label: string; href: string };
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger
        aria-label="Open menu"
        className="-mr-2 rounded-pk-sm p-2 text-fg md:hidden"
      >
        <List size={22} weight="bold" />
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--pk-fg)_45%,transparent)] md:hidden" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col bg-bg p-6 md:hidden">
          <div className="flex items-center justify-between">
            <DialogPrimitive.Title className="text-sm font-medium text-muted">
              Menu
            </DialogPrimitive.Title>
            <DialogPrimitive.Close aria-label="Close menu" className="rounded-pk-sm p-2">
              <X size={20} weight="bold" />
            </DialogPrimitive.Close>
          </div>

          <nav className="mt-8 flex flex-col">
            {items.map((item) => (
              <DialogPrimitive.Close asChild key={item.label}>
                <Link href={item.href} className="border-b border-line py-4 text-lg">
                  {item.label}
                </Link>
              </DialogPrimitive.Close>
            ))}
          </nav>

          {cta ? (
            <DialogPrimitive.Close asChild>
              <Link
                href={cta.href}
                className="mt-8 inline-flex h-12 items-center justify-center whitespace-nowrap rounded-pk bg-accent px-6 font-medium text-accent-fg"
              >
                {cta.label}
              </Link>
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------
 * Dialog
 * Focus trap, escape handling and scroll lock come from Radix. The overlay
 * uses a tinted scrim rather than pure black, matching the theme.
 * ---------------------------------------------------------------------- */

export function Dialog({
  trigger,
  title,
  description,
  children,
  footer,
}: {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--pk-fg)_45%,transparent)] backdrop-blur-[2px]" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2",
            "rounded-pk border border-line bg-elevated p-7 shadow-pk-lift",
          )}
        >
          <div className="flex items-start justify-between gap-6">
            <DialogPrimitive.Title className="display-3">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Close"
              className="-mr-1 -mt-1 rounded-pk-sm p-1.5 text-muted transition-colors hover:bg-subtle hover:text-fg"
            >
              <X size={17} weight="bold" />
            </DialogPrimitive.Close>
          </div>

          {description ? (
            <DialogPrimitive.Description className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {description}
            </DialogPrimitive.Description>
          ) : null}

          {children ? <div className="mt-6">{children}</div> : null}
          {footer ? <div className="mt-8 flex justify-end gap-3">{footer}</div> : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/* -------------------------------------------------------------------------
 * Tooltip
 * Hover and focus only, never carrying information that exists nowhere else.
 * ---------------------------------------------------------------------- */

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Provider delayDuration={200}>{children}</TooltipPrimitive.Provider>;
}

export function Tooltip({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={8}
          className="z-50 max-w-64 rounded-pk-sm border border-line bg-elevated px-3 py-2 text-sm text-fg shadow-pk"
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[var(--pk-line)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

/* -------------------------------------------------------------------------
 * Dropdown menu
 * ---------------------------------------------------------------------- */

export type MenuItem = {
  label: string;
  onSelect?: () => void;
  destructive?: boolean;
  separatorBefore?: boolean;
};

export function DropdownMenu({
  trigger,
  items,
}: {
  trigger: React.ReactNode;
  items: MenuItem[];
}) {
  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger asChild>{trigger}</MenuPrimitive.Trigger>
      <MenuPrimitive.Portal>
        <MenuPrimitive.Content
          sideOffset={6}
          align="start"
          className="z-50 min-w-52 rounded-pk-sm border border-line bg-elevated p-1.5 shadow-pk-lift"
        >
          {items.map((item) => (
            <div key={item.label}>
              {item.separatorBefore ? (
                <MenuPrimitive.Separator className="my-1.5 h-px bg-line" />
              ) : null}
              <MenuPrimitive.Item
                onSelect={item.onSelect}
                className={cn(
                  "cursor-pointer rounded-pk-sm px-3 py-2 text-[0.9375rem] outline-none",
                  "data-[highlighted]:bg-subtle",
                  item.destructive && "text-accent",
                )}
              >
                {item.label}
              </MenuPrimitive.Item>
            </div>
          ))}
        </MenuPrimitive.Content>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  );
}

"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/cn";

export type TabItem = { value: string; label: string; content: React.ReactNode };

/**
 * Underline tabs. Arrow key navigation and roving focus come from Radix.
 * The active marker is a border, not a filled pill, so it survives every theme.
 */
export function Tabs({
  items,
  defaultValue,
  className,
}: {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue ?? items[0]?.value}
      className={cn("flex flex-col gap-6", className)}
    >
      <TabsPrimitive.List className="flex gap-6 border-b border-line">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "-mb-px border-b-2 border-transparent pb-3 text-[0.9375rem] text-muted",
              "transition-colors duration-[var(--pk-dur-fast)] hover:text-fg",
              "data-[state=active]:border-accent data-[state=active]:font-medium data-[state=active]:text-fg",
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {items.map((item) => (
        <TabsPrimitive.Content key={item.value} value={item.value}>
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}

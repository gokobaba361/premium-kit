"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type AccordionItem = { value: string; title: string; content: React.ReactNode };

/**
 * Generic accordion for rich content. For a plain question and answer list
 * prefer FaqAccordion, which uses native details and needs no JavaScript.
 * Use this one when a panel contains components rather than a paragraph.
 */
export function Accordion({
  items,
  type = "single",
  defaultValue,
  className,
}: {
  items: AccordionItem[];
  /** single closes the others, multiple lets several stay open */
  type?: "single" | "multiple";
  defaultValue?: string;
  className?: string;
}) {
  const shared = {
    className: cn("w-full", className),
    children: items.map((item) => (
      <AccordionPrimitive.Item
        key={item.value}
        value={item.value}
        className="border-b border-line first:border-t"
      >
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger className="group flex w-full items-start justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium">
            {item.title}
            <Plus
              size={18}
              weight="bold"
              aria-hidden
              className="mt-1 shrink-0 text-accent transition-transform duration-[var(--pk-dur-fast)] group-data-[state=open]:rotate-45"
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden pb-5 text-[0.9375rem] leading-relaxed text-muted">
          {item.content}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    )),
  };

  return type === "single" ? (
    <AccordionPrimitive.Root type="single" collapsible defaultValue={defaultValue} {...shared} />
  ) : (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultValue ? [defaultValue] : undefined}
      {...shared}
    />
  );
}

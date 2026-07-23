"use client";

import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------
 * Slider
 * Single value or a range. The current value is always printed as text next
 * to the label, because a thumb position is not a readable number.
 * ---------------------------------------------------------------------- */

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [50],
  format = (value: number) => String(value),
  onValueChange,
}: {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  /** One value for a slider, two for a range */
  defaultValue?: number[];
  format?: (value: number) => string;
  onValueChange?: (value: number[]) => void;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-mono text-sm text-muted tabular-nums">
          {value.map(format).join(" to ")}
        </span>
      </div>

      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => {
          setValue(next);
          onValueChange?.(next);
        }}
        className="relative flex h-5 w-full touch-none items-center select-none"
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-pk-pill bg-subtle">
          <SliderPrimitive.Range className="absolute h-full rounded-pk-pill bg-accent" />
        </SliderPrimitive.Track>
        {value.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={value.length > 1 ? `${label} ${i === 0 ? "minimum" : "maximum"}` : label}
            className="block size-5 rounded-full border border-strong bg-elevated shadow-pk transition-transform duration-[var(--pk-dur-fast)] hover:scale-105"
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Segmented control
 * Two to four mutually exclusive options that change a view, not a page.
 * For navigation between sections of content, use Tabs instead.
 * ---------------------------------------------------------------------- */

export function SegmentedControl({
  label,
  options,
  defaultValue,
  onValueChange,
}: {
  /** Screen reader label. The control itself carries no visible heading. */
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(defaultValue ?? options[0]?.value);

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      aria-label={label}
      onValueChange={(next) => {
        // Radix emits an empty string when the active item is pressed again.
        if (!next) return;
        setValue(next);
        onValueChange?.(next);
      }}
      className="inline-flex gap-1 rounded-pk border border-line bg-subtle p-1"
    >
      {options.slice(0, 4).map((option) => (
        <ToggleGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            "rounded-pk-sm px-3.5 py-1.5 text-sm text-muted transition-colors duration-[var(--pk-dur-fast)]",
            "hover:text-fg data-[state=on]:bg-elevated data-[state=on]:font-medium data-[state=on]:text-fg",
          )}
        >
          {option.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}

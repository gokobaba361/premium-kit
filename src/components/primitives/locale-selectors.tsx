"use client";

import { Field, Select } from "@/components/primitives/form";
import { cn } from "@/lib/cn";

export type LocaleOption = {
  value: string;
  label: string;
};

export function LanguageSelector({
  options,
  defaultValue,
  label = "Language",
  helper,
  placeholder = "Choose language",
  onValueChange,
  className,
}: {
  options: LocaleOption[];
  defaultValue?: string;
  label?: string;
  helper?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <Field label={label} helper={helper}>
        <Select
          options={options}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onValueChange={onValueChange}
        />
      </Field>
    </div>
  );
}

export function CurrencySelector({
  options,
  defaultValue,
  label = "Currency",
  helper,
  placeholder = "Choose currency",
  onValueChange,
  className,
}: {
  /** Include the ISO code and symbol in each visible label. */
  options: LocaleOption[];
  defaultValue?: string;
  label?: string;
  helper?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <Field label={label} helper={helper}>
        <Select
          options={options}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onValueChange={onValueChange}
        />
      </Field>
    </div>
  );
}

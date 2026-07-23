"use client";

import { createContext, useContext, useId } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Check, CaretDown, Minus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------
 * Field
 * Label above, helper text present in the markup, error below the control.
 * Wiring (id, aria-describedby, aria-invalid) is handled here so a control
 * cannot ship without it.
 * ---------------------------------------------------------------------- */

type FieldContextValue = {
  id: string;
  describedBy?: string;
  invalid: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

export function useField() {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error("Form controls must be rendered inside <Field>.");
  return ctx;
}

export function Field({
  label,
  helper,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const describedBy =
    [helper ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <FieldContext.Provider value={{ id, describedBy, invalid: Boolean(error) }}>
      <div className={cn("flex flex-col gap-2", className)}>
        <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium">
          {label}
          {optional ? <span className="text-sm font-normal text-faint">Optional</span> : null}
        </label>

        {helper ? (
          <p id={`${id}-help`} className="text-sm text-muted">
            {helper}
          </p>
        ) : null}

        {children}

        {error ? (
          <p id={`${id}-error`} role="alert" className="text-sm text-accent">
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}

/* -------------------------------------------------------------------------
 * Text controls
 * ---------------------------------------------------------------------- */

const controlBase =
  "w-full rounded-pk-sm border bg-elevated text-[0.9375rem] text-fg transition-colors duration-[var(--pk-dur-fast)] placeholder:text-faint disabled:cursor-not-allowed disabled:opacity-55";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { id, describedBy, invalid } = useField();
  return (
    <input
      id={id}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        "h-11 px-3.5",
        invalid ? "border-accent" : "border-strong hover:border-fg",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  rows = 5,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { id, describedBy, invalid } = useField();
  return (
    <textarea
      id={id}
      rows={rows}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        "resize-y px-3.5 py-2.5 leading-relaxed",
        invalid ? "border-accent" : "border-strong hover:border-fg",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * Select (Radix, so keyboard and typeahead behaviour is not reinvented)
 * ---------------------------------------------------------------------- */

export function Select({
  options,
  placeholder = "Choose one",
  defaultValue,
  disabled,
  onValueChange,
}: {
  options: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}) {
  const { id, describedBy, invalid } = useField();

  return (
    <SelectPrimitive.Root
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className={cn(
          controlBase,
          "flex h-11 items-center justify-between gap-3 px-3.5 text-left",
          "data-[placeholder]:text-faint",
          invalid ? "border-accent" : "border-strong hover:border-fg",
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <CaretDown size={15} weight="bold" className="text-muted" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-pk-sm border border-line bg-elevated shadow-pk-lift"
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-pk-sm px-3 py-2 text-[0.9375rem] outline-none",
                  "data-[highlighted]:bg-subtle data-[state=checked]:font-medium",
                )}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check size={15} weight="bold" className="text-accent" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

/* -------------------------------------------------------------------------
 * Choice controls
 * These render their own label, so they sit outside <Field>.
 * ---------------------------------------------------------------------- */

const boxBase =
  "flex size-5 shrink-0 items-center justify-center rounded-pk-sm border border-strong bg-elevated transition-colors duration-[var(--pk-dur-fast)] data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent disabled:opacity-55";

export function Checkbox({
  label,
  description,
  defaultChecked,
  indeterminate,
  disabled,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <CheckboxPrimitive.Root
        id={id}
        disabled={disabled}
        defaultChecked={indeterminate ? "indeterminate" : defaultChecked}
        className={cn(boxBase, "mt-0.5")}
      >
        <CheckboxPrimitive.Indicator className="text-accent-fg">
          {indeterminate ? (
            <Minus size={13} weight="bold" />
          ) : (
            <Check size={13} weight="bold" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <div className="flex flex-col gap-0.5">
        <label htmlFor={id} className="text-[0.9375rem] leading-snug">
          {label}
        </label>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
      </div>
    </div>
  );
}

export function RadioGroup({
  options,
  defaultValue,
  name,
  disabled,
}: {
  options: { value: string; label: string; description?: string }[];
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
}) {
  return (
    <RadioPrimitive.Root
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      className="flex flex-col gap-3"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-start gap-3">
          <RadioPrimitive.Item
            id={`${name ?? "radio"}-${option.value}`}
            value={option.value}
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-strong bg-elevated",
              "transition-colors duration-[var(--pk-dur-fast)] data-[state=checked]:border-accent disabled:opacity-55",
            )}
          >
            <RadioPrimitive.Indicator className="size-2.5 rounded-full bg-accent" />
          </RadioPrimitive.Item>
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor={`${name ?? "radio"}-${option.value}`}
              className="text-[0.9375rem] leading-snug"
            >
              {option.label}
            </label>
            {option.description ? (
              <p className="text-sm text-muted">{option.description}</p>
            ) : null}
          </div>
        </div>
      ))}
    </RadioPrimitive.Root>
  );
}

export function Switch({
  label,
  description,
  defaultChecked,
  disabled,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex flex-col gap-0.5">
        <label htmlFor={id} className="text-[0.9375rem] leading-snug">
          {label}
        </label>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
      </div>
      <SwitchPrimitive.Root
        id={id}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border border-strong bg-subtle transition-colors",
          "duration-[var(--pk-dur-fast)] data-[state=checked]:border-accent data-[state=checked]:bg-accent disabled:opacity-55",
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "block size-4.5 translate-x-0.5 rounded-full bg-elevated shadow-pk transition-transform",
            "duration-[var(--pk-dur-fast)] data-[state=checked]:translate-x-[1.375rem]",
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
}

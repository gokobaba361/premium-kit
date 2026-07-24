"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/button";
import { Field, Input, Textarea, Select } from "@/components/primitives/form";

export type RecordField = {
  name: string;
  label: string;
  type?: "text" | "email" | "number" | "textarea" | "select";
  options?: { value: string; label: string }[];
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  helper?: string;
};

export type RecordFormProps = {
  title: string;
  description?: string;
  fields: RecordField[];
  /** Prefill for edit mode; absent for create. */
  values?: Record<string, string>;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: (data: Record<string, string>) => void;
  onCancel?: () => void;
};

/**
 * A create-or-edit form driven by a field config.
 *
 * The same block serves both: pass `values` to prefill for an edit, omit it for
 * a create. Required fields are validated inline; the parent performs the write
 * through onSubmit. Presentational and unopinionated about persistence.
 */
export function RecordForm({
  title,
  description,
  fields,
  values,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  onSubmit,
  onCancel,
}: RecordFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<
      string,
      string
    >;
    const next: Record<string, string> = {};
    for (const field of fields) {
      if (field.required && !data[field.name]?.trim()) {
        next[field.name] = `${field.label} is required.`;
      }
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmit?.(data);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="display-3">{title}</h2>
        {description ? (
          <p className="text-[0.9375rem] leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-5">
        {fields.map((field) => {
          const initial = values?.[field.name] ?? "";
          return (
            <Field
              key={field.name}
              label={field.label}
              error={errors[field.name]}
              optional={field.optional}
              helper={field.helper}
            >
              {field.type === "textarea" ? (
                <Textarea name={field.name} defaultValue={initial} placeholder={field.placeholder} />
              ) : field.type === "select" ? (
                <Select
                  name={field.name}
                  options={field.options ?? []}
                  defaultValue={initial || field.options?.[0]?.value}
                />
              ) : (
                <Input
                  name={field.name}
                  type={field.type ?? "text"}
                  defaultValue={initial}
                  placeholder={field.placeholder}
                />
              )}
            </Field>
          );
        })}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
        ) : null}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

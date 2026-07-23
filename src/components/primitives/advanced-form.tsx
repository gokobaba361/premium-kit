import { useId } from "react";
import { CalendarBlank, Clock, UploadSimple } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

function FieldShell({
  id,
  label,
  helper,
  error,
  children,
}: {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode | ((describedBy?: string) => React.ReactNode);
}) {
  const describedBy =
    [helper ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {helper ? (
        <p id={`${id}-help`} className="text-sm text-muted">
          {helper}
        </p>
      ) : null}
      {typeof children === "function" ? children(describedBy) : children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClass =
  "h-11 w-full rounded-pk-sm border border-strong bg-elevated px-3.5 text-[0.9375rem] text-fg transition-colors hover:border-fg";

export function DateInput({
  label,
  helper,
  error,
  className,
  ...props
}: {
  label: string;
  helper?: string;
  error?: string;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} helper={helper} error={error}>
      {(describedBy?: string) => (
        <div className="relative">
          <CalendarBlank
            size={17}
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
          />
          <input
            id={id}
            type="date"
            aria-describedby={describedBy}
            aria-invalid={Boolean(error) || undefined}
            className={cn(controlClass, "pl-10", error && "border-accent", className)}
            {...props}
          />
        </div>
      )}
    </FieldShell>
  );
}

export function TimeInput({
  label,
  helper,
  error,
  className,
  ...props
}: {
  label: string;
  helper?: string;
  error?: string;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} helper={helper} error={error}>
      {(describedBy?: string) => (
        <div className="relative">
          <Clock
            size={17}
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
          />
          <input
            id={id}
            type="time"
            aria-describedby={describedBy}
            aria-invalid={Boolean(error) || undefined}
            className={cn(controlClass, "pl-10", error && "border-accent", className)}
            {...props}
          />
        </div>
      )}
    </FieldShell>
  );
}

export function OtpInput({
  label,
  helper,
  error,
  length = 6,
  className,
  ...props
}: {
  label: string;
  helper?: string;
  error?: string;
  length?: number;
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "inputMode" | "pattern" | "minLength" | "maxLength"
>) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} helper={helper} error={error}>
      {(describedBy?: string) => (
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern={`[0-9]{${length}}`}
          minLength={length}
          maxLength={length}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            controlClass,
            "font-mono text-lg tracking-[0.45em]",
            error && "border-accent",
            className,
          )}
          {...props}
        />
      )}
    </FieldShell>
  );
}

export function FileUpload({
  label,
  helper,
  error,
  accept,
  multiple,
  className,
  ...props
}: {
  label: string;
  helper?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "accept" | "multiple">) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} helper={helper} error={error}>
      {(describedBy?: string) => (
        <div className="relative">
          <UploadSimple
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-accent"
            aria-hidden
          />
          <input
            id={id}
            type="file"
            accept={accept}
            multiple={multiple}
            aria-describedby={describedBy}
            aria-invalid={Boolean(error) || undefined}
            className={cn(
              "min-h-12 w-full rounded-pk-sm border border-strong bg-elevated pl-10 pr-3 text-sm text-muted transition-colors hover:border-fg",
              "file:mr-3 file:min-h-11 file:border-0 file:border-r file:border-line file:bg-transparent file:px-3 file:text-sm file:font-medium file:text-fg",
              error && "border-accent",
              className,
            )}
            {...props}
          />
        </div>
      )}
    </FieldShell>
  );
}

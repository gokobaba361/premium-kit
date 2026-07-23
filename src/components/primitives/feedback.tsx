import { Info, Warning, CheckCircle, ArrowClockwise } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { Button } from "./button";

/* -------------------------------------------------------------------------
 * Alert
 * Inline and contextual. Toasts are for transient events only.
 * Tone is carried by the icon and the border, not by five new colors.
 * ---------------------------------------------------------------------- */

const icons = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
} as const;

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof icons;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const Icon = icons[tone];
  return (
    <div
      role={tone === "warning" ? "alert" : "status"}
      className={cn(
        "flex gap-3.5 rounded-pk border p-4",
        tone === "info" && "border-line bg-subtle",
        tone === "success" && "border-line bg-accent-soft",
        tone === "warning" && "border-accent bg-accent-soft",
        className,
      )}
    >
      <Icon size={19} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
      <div className="flex flex-col gap-1">
        <p className="text-[0.9375rem] font-medium">{title}</p>
        {children ? (
          <div className="text-[0.9375rem] leading-relaxed text-muted">{children}</div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Skeleton
 * Shaped like the content it replaces. No spinners for page level loading.
 * ---------------------------------------------------------------------- */

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-pk-sm bg-subtle motion-reduce:animate-none", className)}
    />
  );
}

/** Loading shape for one bento or list card: media, title, two body lines. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-pk border border-line bg-elevated", className)}>
      <Skeleton className="aspect-[16/9] w-full rounded-none" />
      <div className="flex flex-col gap-3 p-6">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
      </div>
    </div>
  );
}

/** Loading shape for a table or list. */
export function SkeletonRows({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="h-3.5 flex-1" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Empty and error states
 * Both say what happened and what to do next. Neither is a shrug.
 * ---------------------------------------------------------------------- */

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-pk border border-dashed border-strong bg-subtle p-8">
      <p className="display-3">{title}</p>
      <p className="measure text-[0.9375rem] leading-relaxed text-muted">{body}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  title = "That did not load",
  body,
  onRetry,
}: {
  title?: string;
  body: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-pk border border-accent bg-accent-soft p-8"
    >
      <p className="display-3">{title}</p>
      <p className="measure text-[0.9375rem] leading-relaxed text-muted">{body}</p>
      {onRetry ? (
        <Button variant="secondary" size="sm" className="mt-2" onClick={onRetry}>
          <ArrowClockwise size={15} weight="bold" aria-hidden />
          Try again
        </Button>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Progress
 * Determinate only. An indeterminate bar is a spinner wearing a hat.
 * ---------------------------------------------------------------------- */

export function Progress({
  value,
  label,
}: {
  /** 0 to 100 */
  value: number;
  label: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-mono text-sm text-muted">{clamped}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1.5 w-full overflow-hidden rounded-pk-pill bg-subtle"
      >
        <div
          className="h-full rounded-pk-pill bg-accent transition-[width] duration-500 ease-pk"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

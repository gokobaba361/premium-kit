import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Contrast is guaranteed by pairing: accent bg always takes accent-fg text,
 * bg surfaces always take fg text. Labels never wrap (whitespace-nowrap),
 * so a two-line CTA is impossible by construction.
 *
 * Six variants is the ceiling. If a seventh feels necessary, the answer is
 * usually a different component, not another button.
 */
const button = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-[transform,background-color,border-color,color]",
    "duration-[var(--pk-dur-fast)] ease-pk",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:brightness-110",
        secondary: "border border-strong bg-elevated text-fg hover:border-fg",
        /** Accent identity at a lower volume. For secondary actions in accent-heavy areas. */
        soft: "bg-accent-soft text-fg hover:brightness-[0.97]",
        ghost: "text-fg hover:bg-subtle",
        link: "text-accent underline underline-offset-4 hover:opacity-80",
        /**
         * Destructive uses the theme accent, not a hardcoded red. A theme whose
         * accent is already red gets a red delete button; a green themed product
         * gets a green one, and the wording carries the warning. This is on
         * purpose: one accent per theme is the rule, and "delete" is a job for
         * clear copy plus a confirmation dialog, not a second brand color.
         */
        destructive: "border border-accent bg-transparent text-accent hover:bg-accent-soft",
      },
      size: {
        sm: "h-9 rounded-pk-sm px-3.5 text-sm",
        md: "h-11 rounded-pk px-5 text-[0.9375rem]",
        lg: "h-13 rounded-pk px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof button> & { className?: string };

/** Inline spinner. Only ever shown inside a button, never as page level loading. */
function Spinner() {
  return (
    <span
      aria-hidden
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70 motion-reduce:animate-none"
    />
  );
}

export function Button({
  className,
  variant,
  size,
  loading,
  loadingLabel = "Working",
  children,
  ...props
}: ButtonProps & {
  /** Disables the button and swaps the label, so double submits are impossible. */
  loading?: boolean;
  loadingLabel?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(button({ variant, size }), className)}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

/** Square button for a single glyph. `label` is required, it becomes the aria-label. */
export function IconButton({
  label,
  className,
  variant = "secondary",
  size = "md",
  children,
  ...props
}: ButtonProps & { label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        button({ variant }),
        "px-0",
        size === "sm" ? "size-9 rounded-pk-sm" : "size-11 rounded-pk",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  className,
  variant,
  size,
  children,
}: ButtonProps & { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn(button({ variant, size }), className)}>
      {children}
    </Link>
  );
}

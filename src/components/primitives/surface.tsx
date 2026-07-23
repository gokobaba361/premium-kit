import { cn } from "@/lib/cn";

/**
 * Card is opt-in elevation, not the default wrapper. Group with borders or
 * space first; reach for `elevated` only when depth carries real hierarchy.
 */
export function Card({
  as: Tag = "div",
  variant = "outline",
  className,
  children,
}: {
  as?: React.ElementType;
  variant?: "outline" | "elevated" | "bare";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "rounded-pk",
        variant === "outline" && "border border-line bg-elevated",
        variant === "elevated" && "border border-line bg-elevated shadow-pk",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pk-pill border border-line bg-subtle px-3 py-1",
        "text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Hairline divider. Use instead of a card when you only need separation. */
export function Rule({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-line", className)} />;
}

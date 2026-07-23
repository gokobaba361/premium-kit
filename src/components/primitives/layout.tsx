import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-5 md:px-8", className)}>{children}</div>
  );
}

/**
 * Vertical rhythm comes from the theme (--pk-section-y), not from per-section
 * padding guesses. `tone` stays inside the page theme, it never inverts it.
 */
export function Section({
  id,
  tone = "base",
  className,
  children,
}: {
  id?: string;
  tone?: "base" | "subtle";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-section", tone === "subtle" && "bg-subtle", className)}
    >
      {children}
    </section>
  );
}

/** Section heading. Stacked, never a big-left / small-right split header. */
export function SectionHead({
  title,
  body,
  align = "left",
  className,
}: {
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <h2 className="display-2 max-w-[20ch]">{title}</h2>
      {body ? <p className="measure text-base leading-relaxed text-muted">{body}</p> : null}
    </div>
  );
}

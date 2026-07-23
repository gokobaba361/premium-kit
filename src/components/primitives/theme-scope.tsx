import { cn } from "@/lib/cn";

/**
 * Scopes a sector theme to a subtree. One ThemeScope per page, at the root of
 * the page component. Sections never re-theme themselves.
 */
export function ThemeScope({
  theme,
  className,
  children,
}: {
  theme: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    /* font-sans is required, not decoration: <body> sits outside this scope, so
       a theme that overrides --pk-font-body needs the family re-applied here. */
    <div data-theme={theme} className={cn("min-h-[100dvh] bg-bg font-sans text-fg", className)}>
      {children}
    </div>
  );
}

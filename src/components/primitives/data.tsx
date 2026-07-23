import Link from "next/link";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { CaretRight, CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------
 * Table
 * Header rule plus row rules only inside the body. Numeric columns are mono
 * and right aligned so figures line up without extra classes at the call site.
 * ---------------------------------------------------------------------- */

export type Column = { key: string; header: string; numeric?: boolean };

export function Table({
  columns,
  rows,
  caption,
}: {
  columns: Column[];
  rows: Record<string, string>[];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        {caption ? (
          <caption className="pb-4 text-left text-sm text-muted">{caption}</caption>
        ) : null}
        <thead>
          <tr className="border-b border-strong">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "pb-3 text-sm font-medium text-muted",
                  column.numeric && "text-right",
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "py-3.5 text-[0.9375rem]",
                    column.numeric && "text-right font-mono tabular-nums",
                  )}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Stat
 * `source` is required on purpose: a number on a marketing page either comes
 * from somewhere or does not belong on the page.
 * ---------------------------------------------------------------------- */

export function Stat({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-strong pt-5">
      <span className="font-display text-4xl font-semibold tracking-tight tabular-nums">
        {value}
      </span>
      <span className="text-[0.9375rem]">{label}</span>
      <span className="text-sm text-faint">{source}</span>
    </div>
  );
}

export function StatRow({ items }: { items: React.ComponentProps<typeof Stat>[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-3 md:gap-6">
      {items.map((item) => (
        <Stat key={item.label} {...item} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Avatar
 * Falls back to initials, never to a generic user glyph.
 * ---------------------------------------------------------------------- */

export function Avatar({
  name,
  src,
  size = 40,
}: {
  name: string;
  src?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <AvatarPrimitive.Root
      style={{ width: size, height: size }}
      className="inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full border border-line bg-subtle"
    >
      {src ? (
        <AvatarPrimitive.Image src={src} alt={name} className="size-full object-cover" />
      ) : null}
      <AvatarPrimitive.Fallback className="text-sm font-medium text-muted">
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

/* -------------------------------------------------------------------------
 * Tag
 * Interactive sibling of Badge. Use for filters and categories.
 * ---------------------------------------------------------------------- */

export function Tag({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-pk-pill border px-3.5 py-1.5 text-sm transition-colors duration-[var(--pk-dur-fast)]",
        active
          ? "border-accent bg-accent text-accent-fg"
          : "border-line bg-elevated text-muted hover:border-strong hover:text-fg",
      )}
    >
      {label}
    </Link>
  );
}

/* -------------------------------------------------------------------------
 * Breadcrumb and pagination
 * ---------------------------------------------------------------------- */

export function Breadcrumb({ trail }: { trail: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${i}-${crumb.label}`} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-fg">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="transition-colors hover:text-fg">
                  {crumb.label}
                </Link>
              )}
              {last ? null : <CaretRight size={12} weight="bold" className="text-faint" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Pagination({
  page,
  pageCount,
  hrefFor,
}: {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
}) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const step =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-pk-sm border px-2.5 text-sm transition-colors duration-[var(--pk-dur-fast)]";

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1.5">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-label="Previous page"
        aria-disabled={page === 1}
        className={cn(
          step,
          "border-line text-muted hover:text-fg",
          page === 1 && "pointer-events-none opacity-45",
        )}
      >
        <CaretLeft size={14} weight="bold" />
      </Link>

      {pages.map((n) => (
        <Link
          key={n}
          href={hrefFor(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            step,
            "font-mono tabular-nums",
            n === page
              ? "border-accent bg-accent text-accent-fg"
              : "border-line text-muted hover:border-strong hover:text-fg",
          )}
        >
          {n}
        </Link>
      ))}

      <Link
        href={hrefFor(Math.min(pageCount, page + 1))}
        aria-label="Next page"
        aria-disabled={page === pageCount}
        className={cn(
          step,
          "border-line text-muted hover:text-fg",
          page === pageCount && "pointer-events-none opacity-45",
        )}
      >
        <CaretRight size={14} weight="bold" />
      </Link>
    </nav>
  );
}

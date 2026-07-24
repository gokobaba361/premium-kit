import Link from "next/link";
import {
  ArrowUpRight,
  ClockCounterClockwise,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type SearchResultItem = {
  title: string;
  description: string;
  href: string;
  category?: string;
  meta?: string;
};

/**
 * A count noun. Pass a function when the language inflects for number: English
 * needs "1 result" / "2 results", Turkish takes the singular after any numeral.
 */
export type CountLabel = string | ((count: number) => string);

function countLabel(label: CountLabel, count: number) {
  return typeof label === "function" ? label(count) : label;
}

export function SearchResults({
  query,
  results,
  resultsLabel = (count) => (count === 1 ? "result" : "results"),
  className,
}: {
  query: string;
  results: SearchResultItem[];
  resultsLabel?: CountLabel;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-faint">Search</p>
          <h2 className="display-3 mt-1">
            Results for “{query}”
          </h2>
        </div>
        <p className="text-sm text-muted">
          {results.length} {countLabel(resultsLabel, results.length)}
        </p>
      </div>

      <ul className="divide-y divide-line">
        {results.map((result) => (
          <li key={result.href}>
            <Link
              href={result.href}
              className="group grid gap-2 py-5 transition-colors hover:text-accent sm:grid-cols-[1fr_auto]"
            >
              <span>
                {result.category ? (
                  <span className="font-mono text-xs uppercase tracking-wide text-faint">
                    {result.category}
                  </span>
                ) : null}
                <span className="mt-1 block text-[1.0625rem] font-medium">{result.title}</span>
                <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-muted">
                  {result.description}
                </span>
              </span>
              <span className="flex items-center gap-3 self-center">
                {result.meta ? <span className="text-xs text-faint">{result.meta}</span> : null}
                <ArrowUpRight
                  size={17}
                  className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NoSearchResults({
  query,
  title = "No results found",
  suggestion = "Check the spelling, try a broader phrase or remove one of the filters.",
  browseLabel,
  browseHref,
  className,
}: {
  query: string;
  title?: string;
  suggestion?: string;
  browseLabel?: string;
  browseHref?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col items-start rounded-pk border border-dashed border-strong bg-subtle p-7",
        className,
      )}
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-elevated text-faint">
        <MagnifyingGlass size={18} aria-hidden />
      </span>
      <h2 className="display-3 mt-5">{title}</h2>
      <p className="mt-2 text-sm text-muted">
        “{query}” did not match anything. {suggestion}
      </p>
      {browseLabel && browseHref ? (
        <Link
          href={browseHref}
          className="mt-5 text-sm font-medium text-accent underline underline-offset-4"
        >
          {browseLabel}
        </Link>
      ) : null}
    </section>
  );
}

export function RecentSearches({
  searches,
  title = "Recent searches",
  className,
}: {
  searches: { label: string; href: string }[];
  title?: string;
  className?: string;
}) {
  return (
    <section className={cn("rounded-pk border border-line bg-elevated p-5", className)}>
      <h2 className="flex items-center gap-2 text-sm font-medium">
        <ClockCounterClockwise size={16} className="text-faint" aria-hidden />
        {title}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {searches.map((search) => (
          <li key={search.href}>
            <Link
              href={search.href}
              className="inline-flex min-h-9 items-center rounded-pk-pill border border-line px-3 text-sm text-muted transition-colors hover:border-strong hover:text-fg"
            >
              {search.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Container } from "@/components/primitives/layout";

export type ContentIndexItem = {
  title: string;
  excerpt: string;
  href: string;
  category: string;
  /** Machine-readable ISO date, for example 2026-03-14. */
  date: string;
  /** Already-localised reading time, for example "6 minute read" or "6 dk okuma". */
  readingTime: string;
};

export type ContentIndexLabels = {
  filters: string;
  all: string;
  results: string;
  emptyTitle: string;
  emptyDescription: string;
  reset: string;
};

const defaultLabels: ContentIndexLabels = {
  filters: "Filter by category",
  all: "All",
  results: "articles",
  emptyTitle: "No articles in this category",
  emptyDescription: "Choose another category or show all articles.",
  reset: "Show all articles",
};

/**
 * Filterable editorial index for publications, journals and resource libraries.
 *
 * Native buttons carry the interaction, aria-pressed exposes the active filter
 * and a polite status announces result-count changes. The block owns filtering
 * only; URLs, copy and localised reading-time labels stay with the content model.
 */
export function ContentIndex({
  title,
  body,
  items,
  categories,
  defaultCategory,
  locale = "en-GB",
  labels,
  tone = "base",
}: {
  title: string;
  body?: string;
  items: ContentIndexItem[];
  /** Controls filter order. Omit to derive categories from the items. */
  categories?: string[];
  defaultCategory?: string;
  /** Used by Intl.DateTimeFormat. Reading-time copy is supplied per item. */
  locale?: string;
  labels?: Partial<ContentIndexLabels>;
  tone?: "base" | "subtle";
}) {
  const headingId = useId();
  const resultsId = useId();
  const statusId = useId();
  const categoryOptions = useMemo(
    () => [
      ...new Set(
        (categories ?? items.map((item) => item.category)).filter(Boolean),
      ),
    ],
    [categories, items],
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(() =>
    defaultCategory && categoryOptions.includes(defaultCategory)
      ? defaultCategory
      : null,
  );
  const copy = { ...defaultLabels, ...labels };
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
    [locale],
  );
  const visibleItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;
  const activeLabel = activeCategory ?? copy.all;

  return (
    <section
      aria-labelledby={headingId}
      className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}
    >
      <Container>
        <div className="flex max-w-3xl flex-col gap-4">
          <h2 id={headingId} className="display-2 max-w-[20ch] text-balance">
            {title}
          </h2>
          {body ? (
            <p className="measure text-base leading-relaxed text-muted">{body}</p>
          ) : null}
        </div>

        <div className="mt-10">
          <div
            role="group"
            aria-label={copy.filters}
            className="flex flex-wrap gap-2"
          >
            <FilterButton
              label={copy.all}
              active={activeCategory === null}
              resultsId={resultsId}
              onSelect={() => setActiveCategory(null)}
            />
            {categoryOptions.map((category) => (
              <FilterButton
                key={category}
                label={category}
                active={activeCategory === category}
                resultsId={resultsId}
                onSelect={() => setActiveCategory(category)}
              />
            ))}
          </div>

          <div className="mt-8 flex items-end justify-between gap-4 border-b border-line pb-4">
            <p className="text-sm font-medium text-fg">{activeLabel}</p>
            <p
              id={statusId}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-right text-sm tabular-nums text-muted"
            >
              {visibleItems.length} {copy.results}
              <span className="sr-only"> · {activeLabel}</span>
            </p>
          </div>

          <div id={resultsId} aria-describedby={statusId}>
            {visibleItems.length > 0 ? (
              <ul className="divide-y divide-line">
                {visibleItems.map((item) => (
                  <li key={`${item.category}-${item.href}-${item.title}`}>
                    <article className="grid min-w-0 gap-4 py-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-accent">{item.category}</p>
                        <h3 className="mt-2 text-balance text-xl font-medium leading-snug">
                          <Link
                            href={item.href}
                            className="break-words underline-offset-4 hover:text-accent hover:underline"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mt-2 max-w-3xl break-words text-[0.9375rem] leading-relaxed text-muted">
                          {item.excerpt}
                        </p>
                      </div>

                      <p className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-faint md:max-w-52 md:justify-end md:text-right">
                        <time dateTime={item.date}>
                          {dateFormatter.format(new Date(item.date))}
                        </time>
                        <span aria-hidden>·</span>
                        <span>{item.readingTime}</span>
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-start rounded-b-pk border-x border-b border-dashed border-strong bg-elevated p-7 sm:p-9">
                <h3 className="text-xl font-medium">{copy.emptyTitle}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {copy.emptyDescription}
                </p>
                {activeCategory ? (
                  <button
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    className="mt-5 min-h-11 rounded-pk border border-strong px-4 text-sm font-medium transition-colors hover:border-fg"
                  >
                    {copy.reset}
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FilterButton({
  label,
  active,
  resultsId,
  onSelect,
}: {
  label: string;
  active: boolean;
  resultsId: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-controls={resultsId}
      onClick={onSelect}
      className={
        active
          ? "inline-flex min-h-11 items-center rounded-pk-pill border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
          : "inline-flex min-h-11 items-center rounded-pk-pill border border-line bg-elevated px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-strong hover:text-fg"
      }
    >
      {label}
    </button>
  );
}

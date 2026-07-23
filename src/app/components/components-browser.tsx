"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { categories, type RegistryItem } from "@/registry/registry";
import type { ItemFacet } from "@/registry/registry-metadata";

/**
 * Browse and filter the registry.
 *
 * Text search matches name, description and slug, because people look for
 * "dropdown" as often as they look for "menu". On top of that, three metadata
 * v2 facets narrow the list: how it renders, how much JavaScript it costs and
 * what it is tagged with. Facets are passed in from the server keyed by slug,
 * so the same object serves the English and Turkish catalogues.
 */
export function ComponentsBrowser({
  items,
  facets,
  tags,
  language = "en",
}: {
  items: RegistryItem[];
  /** slug -> metadata v2 facet. Language independent. */
  facets: Record<string, ItemFacet>;
  /** Tags to offer as chips, most common first. */
  tags: string[];
  language?: "en" | "tr";
}) {
  const tr = language === "tr";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [rendering, setRendering] = useState<string>("all");
  const [javascript, setJavascript] = useState<string>("all");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const facet = facets[item.slug];

      if (category !== "all" && item.category !== category) return false;
      if (rendering !== "all" && facet?.rendering !== rendering) return false;
      if (javascript !== "all" && facet?.javascript !== javascript) return false;
      if (activeTags.length > 0 && !activeTags.every((tag) => facet?.tags.includes(tag)))
        return false;

      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.slug.includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (facet?.tags.some((tag) => tag.includes(q)) ?? false)
      );
    });
  }, [items, facets, query, category, rendering, javascript, activeTags]);

  const filtersActive =
    category !== "all" ||
    rendering !== "all" ||
    javascript !== "all" ||
    activeTags.length > 0 ||
    query.trim() !== "";

  function reset() {
    setQuery("");
    setCategory("all");
    setRendering("all");
    setJavascript("all");
    setActiveTags([]);
  }

  function toggleTag(tag: string) {
    setActiveTags((current) =>
      current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag],
    );
  }

  const categoryLabels: Record<string, string> = {
    theme: tr ? "Tema" : "Theme",
    primitive: tr ? "Temel bileşenler" : "Primitives",
    block: tr ? "Bloklar" : "Blocks",
    motion: tr ? "Hareket" : "Motion",
  };
  const categoryTabs = [
    { id: "all", label: tr ? "Tümü" : "Everything" },
    ...categories.map((c) => ({ id: c.id, label: categoryLabels[c.id] })),
  ];

  const renderingLabels: Record<string, string> = {
    all: tr ? "Hepsi" : "Any",
    server: tr ? "Sunucu" : "Server",
    client: tr ? "İstemci" : "Client",
    mixed: tr ? "Karma" : "Mixed",
  };
  const javascriptLabels: Record<string, string> = {
    all: tr ? "Hepsi" : "Any",
    none: tr ? "Yok" : "None",
    interaction: tr ? "Etkileşim" : "Interaction",
    motion: tr ? "Hareket" : "Motion",
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Category tabs and search share the top row. */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              aria-pressed={category === tab.id}
              className={cn(
                "rounded-pk-pill border px-3.5 py-1.5 text-sm transition-colors duration-[var(--pk-dur-fast)]",
                category === tab.id
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-line text-muted hover:border-strong hover:text-fg",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <MagnifyingGlass
            size={16}
            weight="bold"
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={tr ? "Bileşenlerde ara" : "Search components"}
            placeholder={tr ? "Ara" : "Search"}
            className="h-11 w-full rounded-pk-sm border border-strong bg-elevated pl-10 pr-3.5 text-[0.9375rem] placeholder:text-faint"
          />
        </div>
      </div>

      {/* Metadata v2 facets. */}
      <div className="flex flex-col gap-4 rounded-pk border border-line bg-subtle p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <FacetGroup
            label={tr ? "Sunum" : "Rendering"}
            value={rendering}
            options={["all", "server", "client", "mixed"]}
            labels={renderingLabels}
            onChange={setRendering}
          />
          <FacetGroup
            label={tr ? "JavaScript" : "JavaScript"}
            value={javascript}
            options={["all", "none", "interaction", "motion"]}
            labels={javascriptLabels}
            onChange={setJavascript}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-faint">{tr ? "Etiketler" : "Tags"}</span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-pk-pill border px-3 py-1 text-xs transition-colors duration-[var(--pk-dur-fast)]",
                    active
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-line bg-elevated text-muted hover:border-strong hover:text-fg",
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-pk border border-dashed border-strong bg-subtle p-8">
          <p className="display-3">
            {tr ? "Bu filtrelerle sonuç yok" : "Nothing matches those filters"}
          </p>
          <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
            {tr
              ? "Bir etiketi kaldır, kategoriyi genişlet veya parçanın adı yerine yaptığı işi ara."
              : "Drop a tag, widen the category, or search for what the piece does rather than what it is called."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex items-center gap-1.5 rounded-pk-sm border border-strong bg-elevated px-3 py-1.5 text-sm text-fg"
          >
            <X size={13} weight="bold" aria-hidden />
            {tr ? "Filtreleri temizle" : "Clear filters"}
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const facet = facets[item.slug];
            return (
              <li key={item.slug}>
                <Link
                  href={
                    tr ? `/tr/bilesenler/${item.slug}` : `/components/${item.slug}`
                  }
                  className="flex h-full flex-col gap-2 rounded-pk border border-line bg-elevated p-5 transition-colors duration-[var(--pk-dur-fast)] hover:border-strong"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-faint">{item.category}</span>
                    {facet ? (
                      <span className="font-mono text-[0.6875rem] text-faint">
                        {renderingLabels[facet.rendering].toLowerCase()}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[1.0625rem] font-medium">{item.name}</span>
                  <span className="text-sm leading-relaxed text-muted">{item.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {tr
            ? `${items.length} kaydın ${filtered.length} tanesi gösteriliyor`
            : `${filtered.length} of ${items.length} entries`}
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:opacity-80"
          >
            <X size={13} weight="bold" aria-hidden />
            {tr ? "Filtreleri temizle" : "Clear filters"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

/** A labelled row of single-select pills for one facet. */
function FacetGroup({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-faint">{label}</span>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={cn(
              "rounded-pk-sm border px-2.5 py-1 text-xs transition-colors duration-[var(--pk-dur-fast)]",
              value === option
                ? "border-accent bg-accent text-accent-fg"
                : "border-line bg-elevated text-muted hover:border-strong hover:text-fg",
            )}
          >
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}

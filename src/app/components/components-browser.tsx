"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { categories, type RegistryItem } from "@/registry/registry";

/**
 * Browse and filter the registry. Search matches name, description and slug,
 * because people look for "dropdown" as often as they look for "menu".
 */
export function ComponentsBrowser({
  items,
  language = "en",
}: {
  items: RegistryItem[];
  language?: "en" | "tr";
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const inCategory = category === "all" || item.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.slug.includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [items, query, category]);

  const tr = language === "tr";
  const categoryLabels = {
    theme: tr ? "Tema" : "Theme",
    primitive: tr ? "Temel bileşenler" : "Primitives",
    block: tr ? "Bloklar" : "Blocks",
    motion: tr ? "Hareket" : "Motion",
  };
  const tabs = [
    { id: "all", label: tr ? "Tümü" : "Everything" },
    ...categories.map((category) => ({
      id: category.id,
      label: categoryLabels[category.id],
    })),
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab) => (
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

      {filtered.length === 0 ? (
        <div className="rounded-pk border border-dashed border-strong bg-subtle p-8">
          <p className="display-3">
            {tr ? `${`"${query}"`} için sonuç yok` : `Nothing matches "${query}"`}
          </p>
          <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
            {tr
              ? "Kategori filtrelerini kullan veya parçanın adı yerine yaptığı işi ara."
              : "Try the category filters, or search for what the piece does rather than what it is called. Menu, dropdown and actions all find the same component."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/components/${item.slug}`}
                className="flex h-full flex-col gap-2 rounded-pk border border-line bg-elevated p-5 transition-colors duration-[var(--pk-dur-fast)] hover:border-strong"
              >
                <span className="font-mono text-xs text-faint">{item.category}</span>
                <span className="text-[1.0625rem] font-medium">{item.name}</span>
                <span className="text-sm leading-relaxed text-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm text-muted">
        {tr
          ? `${items.length} kaydın ${filtered.length} tanesi gösteriliyor`
          : `${filtered.length} of ${items.length} entries`}
      </p>
    </div>
  );
}

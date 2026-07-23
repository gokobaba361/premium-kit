"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command, MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export type CommandPaletteGroup = {
  heading: string;
  items: {
    label: string;
    description?: string;
    href: string;
    keywords?: string[];
  }[];
};

export function CommandPalette({
  groups,
  triggerLabel = "Search",
  searchPlaceholder = "Search pages and actions",
  emptyLabel = "No matching results.",
  resultsLabel = "results",
  closeLabel = "Close search",
  closeHint = "Esc to close",
  className,
}: {
  groups: CommandPaletteGroup[];
  triggerLabel?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  resultsLabel?: string;
  closeLabel?: string;
  closeHint?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const normalized = query.trim().toLocaleLowerCase();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => {
            if (!normalized) return true;
            const haystack = [item.label, item.description, ...(item.keywords ?? [])]
              .filter(Boolean)
              .join(" ")
              .toLocaleLowerCase();
            return haystack.includes(normalized);
          }),
        }))
        .filter((group) => group.items.length > 0),
    [groups, normalized],
  );

  const resultCount = filteredGroups.reduce((count, group) => count + group.items.length, 0);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex min-h-10 items-center gap-3 rounded-pk-sm border border-strong bg-elevated px-3.5 text-sm text-muted transition-colors hover:border-fg hover:text-fg",
            className,
          )}
        >
          <MagnifyingGlass size={16} aria-hidden />
          <span>{triggerLabel}</span>
          <kbd className="ml-auto rounded border border-line bg-subtle px-1.5 py-0.5 font-mono text-[0.6875rem] text-faint">
            ⌘K
          </kbd>
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-fg/35 backdrop-blur-sm" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
          className="fixed left-1/2 top-[12vh] z-50 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-pk border border-line bg-elevated shadow-pk-lift"
        >
          <DialogPrimitive.Title className="sr-only">{triggerLabel}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {searchPlaceholder}
          </DialogPrimitive.Description>

          <div className="flex items-center gap-3 border-b border-line px-4">
            <MagnifyingGlass size={18} className="shrink-0 text-faint" aria-hidden />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-14 min-w-0 flex-1 bg-transparent text-[0.9375rem] outline-none placeholder:text-faint"
              aria-controls="command-palette-results"
              aria-label={searchPlaceholder}
            />
            <DialogPrimitive.Close
              className="flex size-8 items-center justify-center rounded-pk-sm text-muted transition-colors hover:bg-subtle hover:text-fg"
              aria-label={closeLabel}
            >
              <X size={16} aria-hidden />
            </DialogPrimitive.Close>
          </div>

          <div id="command-palette-results" className="max-h-[min(28rem,65vh)] overflow-y-auto p-2">
            {filteredGroups.length ? (
              filteredGroups.map((group) => (
                <section key={group.heading} aria-labelledby={`command-${group.heading}`}>
                  <h3
                    id={`command-${group.heading}`}
                    className="px-3 pb-1 pt-3 font-mono text-[0.6875rem] uppercase tracking-wide text-faint"
                  >
                    {group.heading}
                  </h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={`${group.heading}-${item.href}`}>
                        <DialogPrimitive.Close asChild>
                          <Link
                            href={item.href}
                            className="flex items-start gap-3 rounded-pk-sm px-3 py-2.5 transition-colors hover:bg-subtle focus-visible:bg-subtle"
                          >
                            <Command size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                            <span>
                              <span className="block text-sm font-medium">{item.label}</span>
                              {item.description ? (
                                <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                                  {item.description}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        </DialogPrimitive.Close>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            ) : (
              <p className="px-3 py-12 text-center text-sm text-muted">{emptyLabel}</p>
            )}
          </div>

          <footer className="flex items-center justify-between border-t border-line px-4 py-2 text-xs text-faint">
            <span aria-live="polite">
              {resultCount} {resultsLabel}
            </span>
            <span>{closeHint}</span>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

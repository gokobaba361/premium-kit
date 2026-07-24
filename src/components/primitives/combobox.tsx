"use client";

import { useId, useMemo, useRef, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CaretDown, Check, MagnifyingGlass } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export type ComboboxOption = {
  value: string;
  label: string;
  description?: string;
  keywords?: string[];
  disabled?: boolean;
};

export function Combobox({
  options,
  label,
  placeholder = "Choose an option",
  searchPlaceholder = "Search options",
  emptyLabel = "No matching options.",
  resultsLabel = (count) => (count === 1 ? "option" : "options"),
  value,
  defaultValue,
  disabled,
  onValueChange,
  className,
}: {
  /** Options are filtered by label, description and keywords. */
  options: ComboboxOption[];
  /** Visible label and accessible name for the control. */
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  /** Pass a function when the language inflects for number. */
  resultsLabel?: string | ((count: number) => string);
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const selectedValue = value ?? internalValue;
  const selected = options.find((option) => option.value === selectedValue);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const listboxId = `${id}-listbox`;

  const filteredOptions = useMemo(
    () =>
      options.filter((option) => {
        if (!normalizedQuery) return true;
        return [option.label, option.description, ...(option.keywords ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      }),
    [normalizedQuery, options],
  );

  function firstEnabledIndex(items: ComboboxOption[]) {
    return Math.max(
      0,
      items.findIndex((option) => !option.disabled),
    );
  }

  function choose(option: ComboboxOption) {
    if (option.disabled) return;
    if (value === undefined) setInternalValue(option.value);
    onValueChange?.(option.value);
    setOpen(false);
    setQuery("");
  }

  function moveHighlight(direction: 1 | -1) {
    if (!filteredOptions.length) return;
    let next = highlightedIndex;

    for (let step = 0; step < filteredOptions.length; step += 1) {
      next = (next + direction + filteredOptions.length) % filteredOptions.length;
      if (!filteredOptions[next]?.disabled) {
        setHighlightedIndex(next);
        return;
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span id={`${id}-label`} className="text-sm font-medium">
        {label}
      </span>

      <PopoverPrimitive.Root
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          setQuery("");
          const selectedIndex = options.findIndex(
            (option) => option.value === selectedValue && !option.disabled,
          );
          setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : firstEnabledIndex(options));
        }}
      >
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-labelledby={`${id}-label`}
            className={cn(
              "group flex h-11 w-full items-center justify-between gap-3 rounded-pk-sm border border-strong bg-elevated px-3.5 text-left text-[0.9375rem]",
              "transition-colors hover:border-fg disabled:cursor-not-allowed disabled:opacity-55",
              !selected && "text-faint",
            )}
          >
            <span className="truncate">{selected?.label ?? placeholder}</span>
            <CaretDown
              size={15}
              weight="bold"
              aria-hidden
              className="shrink-0 text-muted transition-transform group-data-[state=open]:rotate-180"
            />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={6}
            collisionPadding={12}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              inputRef.current?.focus();
            }}
            className="z-50 w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-pk-sm border border-line bg-elevated shadow-pk-lift"
          >
            <div className="flex items-center gap-2.5 border-b border-line px-3">
              <MagnifyingGlass size={16} className="shrink-0 text-faint" aria-hidden />
              <input
                ref={inputRef}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-labelledby={`${id}-label`}
                aria-activedescendant={
                  filteredOptions[highlightedIndex]
                    ? `${id}-option-${highlightedIndex}`
                    : undefined
                }
                value={query}
                onChange={(event) => {
                  const nextQuery = event.target.value;
                  setQuery(nextQuery);
                  const normalized = nextQuery.trim().toLocaleLowerCase();
                  const nextOptions = options.filter((option) =>
                    [option.label, option.description, ...(option.keywords ?? [])]
                      .filter(Boolean)
                      .join(" ")
                      .toLocaleLowerCase()
                      .includes(normalized),
                  );
                  setHighlightedIndex(firstEnabledIndex(nextOptions));
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    moveHighlight(1);
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    moveHighlight(-1);
                  } else if (event.key === "Home") {
                    event.preventDefault();
                    setHighlightedIndex(firstEnabledIndex(filteredOptions));
                  } else if (event.key === "End") {
                    event.preventDefault();
                    const reversedIndex = [...filteredOptions]
                      .reverse()
                      .findIndex((option) => !option.disabled);
                    setHighlightedIndex(
                      reversedIndex < 0 ? 0 : filteredOptions.length - reversedIndex - 1,
                    );
                  } else if (event.key === "Enter") {
                    const option = filteredOptions[highlightedIndex];
                    if (option && !option.disabled) {
                      event.preventDefault();
                      choose(option);
                    }
                  } else if (event.key === "Escape") {
                    setOpen(false);
                  }
                }}
                placeholder={searchPlaceholder}
                className="h-11 min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-faint"
              />
            </div>

            <div className="max-h-64 overflow-y-auto p-1.5">
              {filteredOptions.length ? (
                <ul id={listboxId} role="listbox" aria-labelledby={`${id}-label`}>
                  {filteredOptions.map((option, index) => (
                    <li key={option.value}>
                      <button
                        id={`${id}-option-${index}`}
                        type="button"
                        role="option"
                        aria-selected={option.value === selectedValue}
                        disabled={option.disabled}
                        tabIndex={-1}
                        onPointerMove={() => {
                          if (!option.disabled) setHighlightedIndex(index);
                        }}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => choose(option)}
                        className={cn(
                          "flex w-full items-start justify-between gap-3 rounded-pk-sm px-3 py-2 text-left outline-none",
                          index === highlightedIndex && "bg-subtle",
                          option.disabled && "cursor-not-allowed opacity-45",
                        )}
                      >
                        <span>
                          <span className="block text-sm font-medium">{option.label}</span>
                          {option.description ? (
                            <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                              {option.description}
                            </span>
                          ) : null}
                        </span>
                        {option.value === selectedValue ? (
                          <Check size={15} weight="bold" className="mt-0.5 text-accent" aria-hidden />
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-8 text-center text-sm text-muted">{emptyLabel}</p>
              )}
            </div>

            <p className="border-t border-line px-3 py-2 text-xs text-faint" aria-live="polite">
              {filteredOptions.length}{" "}
              {typeof resultsLabel === "function"
                ? resultsLabel(filteredOptions.length)
                : resultsLabel}
            </p>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}

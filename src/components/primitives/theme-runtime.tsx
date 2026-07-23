"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { presets } from "@/lib/premium-kit/presets";
import { cn } from "@/lib/cn";

/**
 * Runtime theme switching, for sites that let a visitor choose.
 *
 * This is the opposite tool to ThemeScope. ThemeScope locks one theme to one
 * page at build time and is the right default for a client site. Reach for
 * this only when the theme is genuinely a user preference, for example a
 * light and dark pair, or a product that ships several skins.
 *
 * The theme is written to documentElement, so portals (dialog, select, toast)
 * inherit it too. ThemeScope cannot do that, because portals render outside it.
 */

const STORAGE_KEY = "pk-theme";

type ThemeContextValue = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>.");
  return ctx;
}

/** Fired in this tab; the native storage event only reaches other tabs. */
const CHANGE_EVENT = "pk-theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function ThemeProvider({
  defaultTheme,
  storageKey = STORAGE_KEY,
  children,
}: {
  defaultTheme: string;
  storageKey?: string;
  children: React.ReactNode;
}) {
  /*
   * localStorage is an external store, so it is read through
   * useSyncExternalStore rather than copied into state inside an effect.
   * The server snapshot is the default theme, which is what the markup is
   * rendered with, so hydration stays consistent. The inline ThemeScript has
   * already put the stored theme on the document, so nothing flashes.
   */
  const theme = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(storageKey) ?? defaultTheme,
    () => defaultTheme,
  );

  // Sync the external system (the document) with the current theme.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback(
    (next: string) => {
      window.localStorage.setItem(storageKey, next);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [storageKey],
  );

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Applies the stored theme before first paint, so there is no flash of the
 * default theme on load. Render inside <head> or at the top of <body>.
 * Server component on purpose: it must run before React hydrates.
 */
export function ThemeScript({
  defaultTheme,
  storageKey = STORAGE_KEY,
}: {
  defaultTheme: string;
  storageKey?: string;
}) {
  const script = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
    storageKey,
  )})||${JSON.stringify(defaultTheme)};document.documentElement.dataset.theme=t;}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

/**
 * Theme picker UI. Pass the ids you actually ship: offering a visitor twelve
 * skins is a settings page, not a design decision.
 */
export function ThemePicker({
  ids,
  className,
}: {
  ids: string[];
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const options = presets.filter((preset) => ids.includes(preset.id));

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={option.id === theme}
          onClick={() => setTheme(option.id)}
          className={cn(
            "inline-flex items-center gap-2 rounded-pk-pill border px-3 py-1.5 text-sm",
            "transition-colors duration-[var(--pk-dur-fast)]",
            option.id === theme
              ? "border-accent bg-accent text-accent-fg"
              : "border-line text-muted hover:border-strong hover:text-fg",
          )}
        >
          <span
            aria-hidden
            className="size-2.5 rounded-full border border-line"
            style={{ background: option.swatch.accent }}
          />
          {option.name}
        </button>
      ))}
    </div>
  );
}

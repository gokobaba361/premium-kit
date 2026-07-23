import { registry, type RegistryItem } from "@/registry/registry";
import { skeletons } from "@/registry/skeletons";

export type RenderingMode = "server" | "client" | "mixed";
export type JavascriptLevel = "none" | "interaction" | "motion";

export type RegistryMetadataV2 = {
  schemaVersion: 2;
  maturity: "stable";
  rendering: RenderingMode;
  javascript: JavascriptLevel;
  sourceOwnership: "copy";
  tags: string[];
  useWhen: string;
  avoidWhen: string;
  accessibility: string[];
  compatibleRecipes: string[];
  installUrl: string;
  documentationUrl: string;
};

const clientItems = new Set([
  "marquee",
  "number-ticker",
  "spotlight-card",
  "tilt-card",
  "text-reveal",
  "aurora-background",
  "form",
  "overlay",
  "toast",
  "controls",
  "accordion",
  "tabs",
  "command-palette",
  "combobox",
  "locale-selectors",
  "theme-runtime",
  "product-detail",
  "cart-drawer",
  "checkout-form",
  "cart-store",
  "onboarding-flow",
  "settings-form",
]);

const mixedItems = new Set([
  "site-nav",
  "floating-nav",
  "contact-form",
  "newsletter-signup",
]);

const avoidWhen: Record<string, string> = {
  marquee: "Avoid for unique information or when a static grid is easier to scan.",
  "number-ticker": "Avoid when the number is not sourced or animation adds no meaning.",
  "spotlight-card": "Avoid on touch-first flows and dense groups of cards.",
  "tilt-card": "Avoid for forms, long copy and primary navigation.",
  "text-reveal": "Avoid on paragraphs, repeated headings or time-sensitive content.",
  "aurora-background": "Avoid when photography or data already carries the visual hierarchy.",
  "mega-nav": "Avoid when the site has fewer than four primary destinations.",
  "command-palette": "Avoid as the only navigation path; every command must remain reachable elsewhere.",
  "advanced-form": "Avoid custom-looking controls when a plain labelled native input is clearer.",
  combobox: "Avoid for short lists that a native select can expose more directly.",
  "locale-selectors": "Avoid coupling language and currency unless the business rules truly require it.",
  "search-results": "Avoid hiding weak information architecture behind search; browse routes must remain available.",
  "product-detail": "Avoid burying the price or the add-to-cart control below decorative content.",
  "cart-drawer": "Avoid making the drawer the only path to the cart; keep a cart route for deep links.",
  "checkout-form": "Never collect card details in this form; hand payment to a provider on submit.",
  "order-confirmation": "Avoid inventing tracking numbers or delivery promises the fulfilment cannot keep.",
};

const tags: Record<string, string[]> = {
  "mega-nav": ["navigation", "header", "discovery", "marketing"],
  "command-palette": ["search", "navigation", "keyboard", "application"],
  "advanced-form": ["form", "date", "time", "otp", "upload"],
  combobox: ["form", "search", "select", "autocomplete", "keyboard"],
  "locale-selectors": ["localisation", "language", "currency", "select"],
  "search-results": ["search", "results", "empty-state", "recent-searches"],
  "product-grid": ["commerce", "collection", "products"],
  "product-detail": ["commerce", "product", "gallery", "cart"],
  "cart-drawer": ["commerce", "cart", "drawer", "checkout"],
  "checkout-form": ["commerce", "checkout", "form", "payment"],
  "order-confirmation": ["commerce", "checkout", "confirmation", "success"],
  "cart-store": ["commerce", "cart", "state", "hook"],
  "onboarding-flow": ["account", "onboarding", "stepper", "form"],
  "settings-form": ["account", "settings", "tabs", "form"],
  "article-layout": ["content", "article", "reading", "prose"],
  "dashboard-shell": ["application", "dashboard", "navigation"],
  "docs-sidebar": ["documentation", "navigation", "content"],
  "event-schedule": ["event", "schedule", "programme"],
};

function renderingFor(item: RegistryItem): RenderingMode {
  if (mixedItems.has(item.slug)) return "mixed";
  if (clientItems.has(item.slug)) return "client";
  return "server";
}

function javascriptFor(item: RegistryItem): JavascriptLevel {
  if (item.category === "motion") return "motion";
  return renderingFor(item) === "server" ? "none" : "interaction";
}

function accessibilityFor(item: RegistryItem) {
  const checks = ["visible focus", "WCAG AA theme tokens"];
  if (renderingFor(item) !== "server") checks.push("keyboard interaction");
  if (item.category === "motion") checks.push("reduced-motion fallback");
  if (item.category === "block") checks.push("semantic section landmarks");
  return checks;
}

export function metadataFor(item: RegistryItem): RegistryMetadataV2 {
  return {
    schemaVersion: 2,
    maturity: "stable",
    rendering: renderingFor(item),
    javascript: javascriptFor(item),
    sourceOwnership: "copy",
    tags: tags[item.slug] ?? [item.category, ...item.slug.split("-")],
    useWhen: item.note ?? `Use when the page needs the ${item.name.toLocaleLowerCase()} pattern.`,
    avoidWhen:
      avoidWhen[item.slug] ??
      "Avoid when a simpler semantic element or existing registry item communicates the same job.",
    accessibility: accessibilityFor(item),
    compatibleRecipes: skeletons
      .filter((skeleton) => skeleton.sections.some((section) => section.slug === item.slug))
      .map((skeleton) => skeleton.slug),
    installUrl: `/r/${item.slug}.json`,
    documentationUrl: `/components/${item.slug}`,
  };
}

export const registryCatalogV2 = registry.map((item) => ({
  name: item.slug,
  title: item.name,
  description: item.description,
  category: item.category,
  dependencies: item.dependencies ?? [],
  registryDependencies: item.registryDependencies ?? [],
  ...metadataFor(item),
}));

/* ------------------------------------------------------------------------- *
 * Facets for the human catalogue filter.
 *
 * A serialisable slice of metadata v2, keyed by slug so both the English and
 * Turkish catalogue pages (which share slugs) can hand the same object to the
 * client browser. Nothing here depends on the display language.
 * ------------------------------------------------------------------------- */

export type ItemFacet = {
  rendering: RenderingMode;
  javascript: JavascriptLevel;
  tags: string[];
};

export const facetsBySlug: Record<string, ItemFacet> = Object.fromEntries(
  registry.map((item) => {
    const meta = metadataFor(item);
    return [item.slug, { rendering: meta.rendering, javascript: meta.javascript, tags: meta.tags }];
  }),
);

/** Every tag in use, with how many items carry it, most common first. */
export const tagCounts: { tag: string; count: number }[] = Object.entries(
  registry.reduce<Record<string, number>>((acc, item) => {
    for (const tag of metadataFor(item).tags) acc[tag] = (acc[tag] ?? 0) + 1;
    return acc;
  }, {}),
)
  .map(([tag, count]) => ({ tag, count }))
  .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

export const renderingModes: RenderingMode[] = ["server", "client", "mixed"];
export const javascriptLevels: JavascriptLevel[] = ["none", "interaction", "motion"];

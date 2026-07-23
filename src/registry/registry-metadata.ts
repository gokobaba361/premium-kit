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
  "theme-runtime",
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
};

const tags: Record<string, string[]> = {
  "mega-nav": ["navigation", "header", "discovery", "marketing"],
  "command-palette": ["search", "navigation", "keyboard", "application"],
  "advanced-form": ["form", "date", "time", "otp", "upload"],
  "product-grid": ["commerce", "collection", "products"],
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

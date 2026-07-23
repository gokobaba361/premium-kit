/*
 * Which registry entries have a live preview.
 *
 * Kept as plain data in its own module so server components can read it
 * without importing the client preview module.
 */
export const previewSlugs = new Set([
  "marquee",
  "number-ticker",
  "spotlight-card",
  "tilt-card",
  "text-reveal",
  "aurora-background",
  "button",
  "form",
  "overlay",
  "feedback",
  "toast",
  "data",
  "controls",
  "accordion",
  "tabs",
  "command-palette",
  "advanced-form",
  "combobox",
  "locale-selectors",
  "search-results",
  "mega-nav",
  "tokens",
  "themes",
]);

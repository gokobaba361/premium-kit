import "server-only";

import { createHighlighter, type Highlighter } from "shiki";

/**
 * Syntax highlighting, done at build time.
 *
 * Shiki runs on the server only, so the documentation pages ship highlighted
 * markup with zero highlighting JavaScript in the browser. The highlighter is
 * expensive to create, so it is created once and reused across the ~50 pages
 * that are prerendered.
 *
 * Dual theme output: every token carries both a light and a dark colour as CSS
 * variables, and globals.css picks one from the page theme. That avoids
 * shipping two copies of the markup.
 *
 * The high contrast GitHub themes are used because the default ones put comment
 * grey at about 4.2:1 on our code surface, which is below WCAG AA for body text.
 */

let instance: Promise<Highlighter> | undefined;

function getHighlighter() {
  instance ??= createHighlighter({
    themes: ["github-light-high-contrast", "github-dark-high-contrast"],
    langs: ["tsx", "ts", "css", "bash", "json"],
  });
  return instance;
}

export type HighlightLang = "tsx" | "ts" | "css" | "bash" | "json";

export function langFor(filePath: string): HighlightLang {
  if (filePath.endsWith(".css")) return "css";
  if (filePath.endsWith(".json")) return "json";
  if (filePath.endsWith(".ts")) return "ts";
  if (filePath.endsWith(".tsx")) return "tsx";
  return "bash";
}

export async function highlight(code: string, lang: HighlightLang) {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light-high-contrast", dark: "github-dark-high-contrast" },
    defaultColor: false,
  });
}

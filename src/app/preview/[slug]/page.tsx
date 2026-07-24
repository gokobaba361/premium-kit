import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { blockExamples } from "@/registry/block-examples";
import { itemBySlug } from "@/registry/registry";
import { presets } from "@/lib/premium-kit/presets";

/**
 * The document the catalogue's preview viewer loads in an iframe.
 *
 * It is deliberately bare: no catalogue navigation, no language switch, no
 * footer. Whatever is on screen is the block itself, at real width, under a
 * real theme, in a real viewport. An iframe rather than a scaled div because
 * the blocks use `md:` breakpoints, and a media query answers to the actual
 * viewport, not to a container. Simulating a phone with `transform: scale()`
 * would show the desktop layout shrunk, which is worse than showing nothing.
 *
 * This route renders per request rather than statically: 38 blocks across 12
 * themes is 456 documents, and the catalogue pages that link here are static
 * already. Tooling routes are the right place to spend a request.
 */

const themeIds = new Set(presets.map((preset) => preset.id));
const DEFAULT_THEME = "obsidian";

export const metadata: Metadata = {
  title: "Block preview",
  robots: { index: false, follow: false },
};

export default async function BlockPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  const { slug } = await params;
  const example = blockExamples[slug];
  if (!example || !itemBySlug(slug)) notFound();

  const requested = (await searchParams).theme;
  const theme = requested && themeIds.has(requested) ? requested : DEFAULT_THEME;

  return <ThemeScope theme={theme}>{example}</ThemeScope>;
}

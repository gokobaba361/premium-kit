import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeScope } from "@/components/primitives/theme-scope";
import { skeletonSections } from "@/registry/skeleton-examples";
import { skeletons } from "@/registry/skeletons";
import { presets } from "@/lib/premium-kit/presets";

/**
 * The document the skeleton viewer loads in an iframe: a full skeleton
 * assembled from its section blocks, under one theme, with no catalogue chrome.
 * Same contract as /preview/<slug> — bare, noindex, rendered per request.
 */

const themeIds = new Set(presets.map((preset) => preset.id));
const DEFAULT_THEME = "obsidian";

export const metadata: Metadata = {
  title: "Skeleton preview",
  robots: { index: false, follow: false },
};

export default async function SkeletonPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  const { slug } = await params;
  const sections = skeletonSections(slug);
  if (!sections) notFound();

  const skeleton = skeletons.find((entry) => entry.slug === slug)!;
  const requested = (await searchParams).theme;
  /* A skeleton names three recommended themes; the first is the honest default.
     A caller can still override with any real theme id. */
  const fallback =
    skeleton.themes.map((name) => name.toLowerCase()).find((id) => themeIds.has(id)) ??
    DEFAULT_THEME;
  const theme = requested && themeIds.has(requested) ? requested : fallback;

  return <ThemeScope theme={theme}>{sections}</ThemeScope>;
}

import { blockExamples } from "./block-examples";
import { skeletons } from "./skeletons";

/**
 * Renders a skeleton as an assembled page: each section's canonical block
 * example, in the skeleton's own order, under one theme.
 *
 * A few skeleton sections are interactive primitive families (a data table, a
 * feedback state set, a toast stack, a tabs group) rather than whole-page
 * blocks, so they have no single page-section example. Those render an honest
 * labelled placeholder that names the primitive and points at its own page,
 * rather than a faked-up section. The structure the skeleton describes stays
 * intact either way.
 */

const primitiveLabels: Record<string, string> = {
  data: "Data display",
  feedback: "Feedback states",
  toast: "Confirmations",
  tabs: "Tabbed content",
};

function SectionPlaceholder({ slug, label }: { slug: string; label: string }) {
  return (
    <div className="border-y border-dashed border-strong bg-subtle py-14">
      <div className="mx-auto flex max-w-container flex-col items-start gap-2 px-5 md:px-8">
        <p className="font-mono text-xs text-faint">{label}</p>
        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
          An interactive {primitiveLabels[slug] ?? label.toLowerCase()} primitive belongs here.
          It is composed in the real build, not shown as a static section.
        </p>
      </div>
    </div>
  );
}

export function skeletonSections(skeletonSlug: string): React.ReactNode[] | null {
  const skeleton = skeletons.find((entry) => entry.slug === skeletonSlug);
  if (!skeleton) return null;

  return skeleton.sections.map((section) => {
    const example = blockExamples[section.slug];
    return (
      <div key={`${skeletonSlug}-${section.slug}`}>
        {example ?? <SectionPlaceholder slug={section.slug} label={section.label} />}
      </div>
    );
  });
}

export function hasSkeleton(slug: string) {
  return skeletons.some((entry) => entry.slug === slug);
}

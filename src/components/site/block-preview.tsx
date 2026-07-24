"use client";

import { useId, useState } from "react";
import { ArrowSquareOut, DeviceMobile, DeviceTablet, Monitor } from "@phosphor-icons/react";
import { presets } from "@/lib/premium-kit/presets";
import { cn } from "@/lib/cn";

/**
 * The catalogue's block viewer.
 *
 * A whole page section cannot be shown honestly in a thumbnail, so the block is
 * rendered by /preview/<slug> and loaded here in an iframe. An iframe rather
 * than a scaled div because the blocks use `md:` breakpoints, and a media query
 * answers to a real viewport, not to a container. A scaled div would show the
 * desktop layout shrunk and label it mobile.
 *
 * Nothing here is measured in JavaScript. Desktop simply fills the column,
 * which is already a genuine desktop viewport, and the narrow viewports are
 * narrower than the column so they need no scaling. An earlier version scaled a
 * 1280px frame down with a ResizeObserver; it could mount before layout settled
 * and leave the frame at 1:1, overflowing its own box. Widths that need no
 * measurement cannot land in that state.
 *
 * The chrome is deliberately quiet. What the reader is here to judge is the
 * block, not the frame around it.
 */

type Viewport = {
  id: "desktop" | "tablet" | "mobile";
  label: string;
  /** Null means "fill the column", which is the honest desktop case. */
  width: number | null;
  height: number;
  icon: React.ComponentType<{ size?: number; weight?: "bold"; "aria-hidden"?: boolean }>;
};

/* A single block is roughly a screen tall; an assembled skeleton is a whole
   page, so it gets a taller frame and scrolls inside it. */
const blockViewports: Viewport[] = [
  { id: "desktop", label: "Desktop", width: null, height: 820, icon: Monitor },
  { id: "tablet", label: "Tablet", width: 768, height: 900, icon: DeviceTablet },
  { id: "mobile", label: "Mobile", width: 375, height: 760, icon: DeviceMobile },
];

const pageViewports: Viewport[] = [
  { id: "desktop", label: "Desktop", width: null, height: 1400, icon: Monitor },
  { id: "tablet", label: "Tablet", width: 768, height: 1200, icon: DeviceTablet },
  { id: "mobile", label: "Mobile", width: 375, height: 1000, icon: DeviceMobile },
];

export function BlockPreview({
  slug,
  name,
  defaultTheme = "obsidian",
  language = "en",
  previewPath = "/preview",
  tall = false,
}: {
  slug: string;
  name: string;
  defaultTheme?: string;
  language?: "en" | "tr";
  /** The route family that renders the document, without the slug. */
  previewPath?: string;
  /** Use the taller frame for whole-page skeletons. */
  tall?: boolean;
}) {
  const tr = language === "tr";
  const themeLabelId = useId();
  const viewports = tall ? pageViewports : blockViewports;
  const [viewport, setViewport] = useState<Viewport>(viewports[0]);
  const [theme, setTheme] = useState(defaultTheme);
  const [loaded, setLoaded] = useState(false);

  const src = `${previewPath}/${slug}?theme=${theme}`;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-muted">{tr ? "Önizleme" : "Preview"}</h2>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label={tr ? "Ekran genişliği" : "Viewport width"}
            className="flex rounded-pk-pill border border-line bg-elevated p-1"
          >
            {viewports.map((option) => {
              const Icon = option.icon;
              const active = option.id === viewport.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setViewport(option)}
                  title={option.width ? `${option.label} (${option.width}px)` : option.label}
                  className={cn(
                    "inline-flex min-h-9 items-center gap-1.5 rounded-pk-pill px-3 text-xs font-medium transition-colors",
                    active
                      ? "bg-accent text-accent-fg"
                      : "text-muted hover:text-fg",
                  )}
                >
                  <Icon size={14} weight="bold" aria-hidden />
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              );
            })}
          </div>

          <span id={themeLabelId} className="sr-only">
            {tr ? "Görsel sistem" : "Visual system"}
          </span>
          <select
            aria-labelledby={themeLabelId}
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            className="min-h-9 rounded-pk-sm border border-strong bg-elevated px-2.5 text-xs font-medium text-fg transition-colors hover:border-fg"
          >
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>

          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-pk-sm border border-strong px-2.5 text-xs font-medium text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <ArrowSquareOut size={14} weight="bold" aria-hidden />
            {tr ? "Yeni sekme" : "New tab"}
          </a>
        </div>
      </div>

      <div
        className="relative grid justify-items-center overflow-hidden rounded-pk border border-line bg-bg"
        style={{ height: viewport.height }}
      >
        {!loaded ? (
          <div className="absolute inset-0 grid place-items-center bg-subtle" aria-hidden>
            <span className="text-sm text-faint">{tr ? "Yükleniyor" : "Loading"}</span>
          </div>
        ) : null}

        <iframe
          key={`${slug}-${theme}`}
          src={src}
          title={
            tr
              ? `${name} önizlemesi, ${viewport.label} genişliği`
              : `${name} preview at ${viewport.label} width`
          }
          onLoad={() => setLoaded(true)}
          style={{
            /* A narrow viewport still has to fit a narrow column, so the fixed
               widths cap rather than overflow. */
            width: viewport.width ? `min(${viewport.width}px, 100%)` : "100%",
            height: viewport.height,
          }}
          className="border-0"
        />
      </div>

      <p className="text-xs text-faint">
        {tr
          ? viewport.width
            ? `Gerçek ${viewport.width}px genişliğinde bir ekranda render edilir. İçerik örnektir.`
            : "Sütunun tam genişliğinde, gerçek bir masaüstü ekranında render edilir. İçerik örnektir."
          : viewport.width
            ? `Rendered in a real ${viewport.width}px viewport. The content is an example.`
            : "Rendered at the full width of this column, which is a real desktop viewport. The content is an example."}
      </p>
    </section>
  );
}

"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Soft moving light behind a section.
 *
 * Built from the theme accent and background tokens, so it can never become
 * the AI purple mesh: whatever the theme's single accent is, that is the only
 * hue on screen. Opacity stays low on purpose, this is atmosphere, not a
 * feature.
 *
 * The layer is absolutely positioned and pointer-events-none, and it never
 * wraps a scrolling container, so it does not repaint during scroll.
 * Under reduced motion the blobs stop moving but stay in place.
 */
export function AuroraBackground({
  children,
  intensity = 0.28,
  className,
}: {
  children: React.ReactNode;
  /** 0 to 1. Above 0.4 it stops reading as light and starts reading as a gradient. */
  intensity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ opacity: intensity }}
      >
        <div
          className={cn("absolute -left-1/4 top-[-30%] size-[60vw] rounded-full blur-3xl")}
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--pk-accent) 55%, transparent), transparent 65%)",
            animation: reduce ? undefined : "pk-drift-a 26s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute -right-[15%] top-[10%] size-[45vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--pk-fg) 22%, transparent), transparent 65%)",
            animation: reduce ? undefined : "pk-drift-b 32s ease-in-out infinite alternate",
          }}
        />
      </div>
      {children}
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Card whose border and surface light up under the cursor.
 *
 * Pointer position lives in motion values, never in state, so moving the mouse
 * does not re-render the React tree. The highlight is built from the theme
 * accent, so it inherits the palette instead of adding a glow colour.
 *
 * Under reduced motion the card renders as a plain outlined card.
 */
export function SpotlightCard({
  children,
  className,
  size = 280,
}: {
  children: React.ReactNode;
  className?: string;
  /** Radius of the highlight in pixels. */
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, color-mix(in srgb, var(--pk-accent) 14%, transparent), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, var(--pk-accent), transparent 70%)`;

  if (reduce) {
    return (
      <div className={cn("rounded-pk border border-line bg-elevated p-6", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => {
        x.set(-9999);
        y.set(-9999);
      }}
      className={cn(
        "group relative isolate overflow-hidden rounded-pk border border-line bg-elevated p-6",
        className,
      )}
    >
      {/* Border light: a full bleed accent gradient masked to a 1px inset ring. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-pk opacity-0 transition-opacity duration-[var(--pk-dur)] group-hover:opacity-100"
        style={{
          background: border,
          padding: 1,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Surface light. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-[var(--pk-dur)] group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}

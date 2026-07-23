"use client";

import { MotionConfig } from "motion/react";

/**
 * Forces every Reveal inside to its static branch, regardless of the user's
 * system setting. Use on low motion presets (clinic) where animation would be
 * noise rather than hierarchy. `useReducedMotion` reads this config.
 */
export function StaticMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="always">{children}</MotionConfig>;
}

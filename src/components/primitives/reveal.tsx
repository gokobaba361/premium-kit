"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The only entry animation in the kit. Client leaf, viewport-once, and it
 * collapses to static under prefers-reduced-motion. Motion is for revealing
 * hierarchy in order, not for decoration, so do not wrap every element.
 */
export function Reveal({
  delay = 0,
  y = 20,
  className,
  children,
}: {
  delay?: number;
  y?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger helper for lists. Index drives the delay, capped so long lists do not crawl. */
export function RevealItem({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={Math.min(index, 6) * 0.06} className={className}>
      {children}
    </Reveal>
  );
}

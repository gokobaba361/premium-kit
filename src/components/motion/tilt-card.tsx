"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Card that tilts towards the cursor in 3D.
 *
 * Pointer position drives motion values through springs, so nothing re-renders
 * while the mouse moves. Keep the maximum angle small: past about 10 degrees
 * the text edge blurs and the card starts to feel like a toy.
 *
 * Under reduced motion it renders flat, with no listeners attached.
 */
export function TiltCard({
  children,
  max = 8,
  className,
}: {
  children: React.ReactNode;
  /** Maximum tilt in degrees. */
  max?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), springConfig);

  if (reduce) {
    return (
      <div className={cn("rounded-pk border border-line bg-elevated p-6", className)}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          x.set((event.clientX - rect.left) / rect.width);
          y.set((event.clientY - rect.top) / rect.height);
        }}
        onPointerLeave={() => {
          x.set(0.5);
          y.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "rounded-pk border border-line bg-elevated p-6 will-change-transform",
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Infinite horizontal marquee.
 *
 * House rule: one marquee per page, maximum. It is for breadth that does not
 * deserve individual attention (logos, capabilities, tags). Under reduced
 * motion it becomes a normal horizontally scrollable strip, so the content is
 * still reachable.
 *
 * The track is duplicated once and translated by exactly -50%, which is what
 * makes the loop seamless.
 */
export function Marquee({
  children,
  speed = 32,
  reverse = false,
  pauseOnHover = true,
  fade = true,
  className,
}: {
  children: React.ReactNode;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Fades the strip into the background at both edges. */
  fade?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn("flex gap-10 overflow-x-auto pb-2", className)}>{children}</div>
    );
  }

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={cn(
          "flex w-max gap-10 will-change-transform",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `pk-marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

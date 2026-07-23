"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Counts up to a value when it scrolls into view.
 *
 * The animation runs on a motion value written straight to the DOM node, so
 * counting never re-renders React. Under reduced motion the final value is
 * printed immediately.
 *
 * Only use this for numbers that are real. A ticker makes a figure feel
 * important, which is exactly why it must not decorate an invented one.
 */
export function NumberTicker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en-GB",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 90 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    const format = (input: number) =>
      `${prefix}${input.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    if (reduce) {
      if (ref.current) ref.current.textContent = format(value);
      return;
    }

    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest);
    });
  }, [spring, decimals, prefix, suffix, locale, reduce, value]);

  return (
    <span
      ref={ref}
      className={className}
      // Screen readers get the final value, not the animation.
      aria-label={`${prefix}${value}${suffix}`}
    >
      {`${prefix}0${suffix}`}
    </span>
  );
}

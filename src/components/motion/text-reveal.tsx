"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Word by word reveal for a single statement.
 *
 * Reserved for one line per page, normally the hero or a manifesto section.
 * Applying it to body copy makes text arrive slower than it can be read, which
 * is a cost with no benefit.
 *
 * The full sentence is in the DOM from the start, so it is selectable, indexed
 * and announced normally. Only opacity and transform animate.
 */
export function TextReveal({
  text,
  as: Tag = "p",
  stagger = 0.045,
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <Tag className={className}>{text}</Tag>;

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: "0.35em" },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </motion.span>
      ))}
    </MotionTag>
  );
}

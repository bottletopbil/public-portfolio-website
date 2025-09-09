"use client";
import React from "react";
import { motion } from "framer-motion";

type ByOption = "character" | "word";
type AnimationOption = "slideLeft";

type TextAnimateProps = {
  children: React.ReactNode;
  className?: string;
  by?: ByOption;
  animation?: AnimationOption;
  /**
   * Delay between each child (character/word) animation
   */
  stagger?: number;
  /**
   * Initial delay before any animation starts
   */
  delay?: number;
  /**
   * If provided, uses a tween with this duration
   * instead of the default spring for per-item motion.
   */
  duration?: number;
  /**
   * Trigger animation when in view; once means play only the first time.
   */
  once?: boolean;
};

export function TextAnimate({
  children,
  className,
  by = "character",
  animation = "slideLeft",
  stagger = 0.06,
  delay = 0,
  duration,
  once = true,
}: TextAnimateProps) {
  const text = typeof children === "string" ? children : (children as any)?.toString?.() ?? "";

  const items: string[] = React.useMemo(() => {
    if (by === "word") {
      // Keep spaces as separate items so spacing is preserved
      return text.split(/(\s+)/);
    }
    // character mode, include spaces as separate characters
    return text.split("");
  }, [text, by]);

  const variants = getVariants(animation, duration);

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      variants={{
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {items.map((part, i) => {
        const isSpace = /\s+/.test(part);
        return (
          <motion.span
            key={i}
            className={isSpace ? undefined : "inline-block"}
            variants={variants}
            aria-hidden
          >
            {part === " " ? "\u00A0" : part}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

function getVariants(animation: AnimationOption, duration?: number) {
  switch (animation) {
    case "slideLeft":
    default:
      return {
        hidden: { opacity: 0, x: 16 },
        show: {
          opacity: 1,
          x: 0,
          transition: duration
            ? { type: "tween", ease: "easeOut", duration }
            : { type: "spring", stiffness: 220, damping: 28, mass: 0.7 },
        },
      } as const;
  }
}

export default TextAnimate;

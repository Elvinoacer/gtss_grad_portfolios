"use client";

/**
 * Motion primitives — controlled, editorial, alive (spec §52)
 * staggered reveals · clip-mask entrances · text transitions · no scroll-jacking
 */

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Fade-up reveal on enter viewport */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`min-w-0 ${className ?? ""}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: EASE_OUT_EXPO },
  },
};

export function Stagger({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & Omit<
  HTMLMotionProps<"div">,
  "children" | "variants"
>) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & Omit<
  HTMLMotionProps<"div">,
  "children" | "variants"
>) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={`min-w-0 ${className ?? ""}`}>{children}</div>;
  return (
    <motion.div className={`min-w-0 ${className ?? ""}`} variants={staggerChild} {...rest}>
      {children}
    </motion.div>
  );
}

/** Clip-mask image entrance */
export function ClipReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left";
}) {
  const reduce = useReducedMotion();
  const hidden =
    direction === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 100%)";
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: hidden, opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.0, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word display headline reveal */
export function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }
  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "118%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.9, ease: EASE_OUT_EXPO },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Rotating text with cross-fade (hero "one degree, different futures") */
export function CrossFadeText({
  items,
  interval = 2600,
  className,
  keyPrefix,
}: {
  items: string[];
  interval?: number;
  className?: string;
  keyPrefix: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((v) => (v + 1) % items.length),
      interval
    );
    return () => window.clearInterval(id);
  }, [reduce, interval, items.length]);
  const current = items[index] ?? items[0] ?? "";
  if (reduce) return <span className={className}>{current}</span>;
  return (
    <span
      className={`relative inline-grid max-w-full overflow-hidden align-bottom ${className ?? ""}`}
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${keyPrefix}-${index}`}
          initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(5px)" }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="col-start-1 row-start-1 inline-block max-w-full truncate whitespace-nowrap"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

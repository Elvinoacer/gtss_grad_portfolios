"use client";

/**
 * SplitChars — character-level masked reveal for display typography.
 * Words stay unbroken (no mid-word wraps); each character rises out of
 * its own overflow mask on a staggered cascade.
 *
 * `play` gates the cascade — the hero holds it until the preloader
 * curtain begins to lift, so type and curtain move as one moment.
 */

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SplitChars({
  text,
  className = "",
  style,
  delay = 0,
  stagger = 0.014,
  play = true,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  play?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span className={className} style={style} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        animate={play ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, wi) => (
          <span
            key={`${word}-${wi}`}
            className="inline-block whitespace-nowrap"
          >
            {[...word].map((char, ci) => (
              <span
                key={`${char}-${ci}`}
                className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
              >
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "112%" },
                    show: {
                      y: "0%",
                      transition: { duration: 0.82, ease: EASE },
                    },
                  }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
            {wi < words.length - 1 ? (
              <span className="inline-block">&nbsp;</span>
            ) : null}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

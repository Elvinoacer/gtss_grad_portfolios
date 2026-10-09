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

  let globalCharIndex = 0;

  return (
    <span className={className} style={style} aria-label={text}>
      <span aria-hidden="true" className="inline">
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`} className="inline">
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char, ci) => {
                const charDelay = delay + globalCharIndex++ * stagger;
                return (
                  <span
                    key={`${char}-${ci}`}
                    className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
                  >
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y: "112%" }}
                      animate={play ? { y: "0%" } : { y: "112%" }}
                      transition={{ duration: 0.82, delay: charDelay, ease: EASE }}
                    >
                      {char}
                    </motion.span>
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 ? (
              <span className="inline">
                {(() => {
                  globalCharIndex++;
                  return " ";
                })()}
              </span>
            ) : null}
          </span>
        ))}
      </span>
    </span>
  );
}

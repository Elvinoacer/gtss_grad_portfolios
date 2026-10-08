"use client";

/**
 * The GTSS motion vocabulary — a single source of truth for every curve
 * in the experience. Nothing moves linearly unless it is a scrub proxy.
 *
 * Philosophy:
 * - Entrances sprint then settle (expo / power4 out)
 * - Playful elements overshoot (back out)
 * - Micro-interactions are springs (bounce)
 * - Scrub timelines use eased keyframes *inside* the scrub so even
 *   scroll-linked motion has a curve, not a constant crawl.
 */

import type { Transition, Variants } from "framer-motion";

/* ---- Named cubic-beziers (mirrored as GSAP strings where used) ---- */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // sprint + settle
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const; // confident glide
export const EASE_BACK = [0.34, 1.56, 0.64, 1] as const; // playful overshoot
export const EASE_SWIFT = [0.83, 0, 0.17, 1] as const; // snap both ends

/** GSAP equivalents — pass as `ease` strings to gsap tweens */
export const GSAP = {
  expo: "expo.out",
  power4: "power4.out",
  back: "back.out(1.4)",
  soft: "power3.inOut",
  sway: "sine.inOut",
} as const;

/* ---- Spring physics for micro-interactions ---- */
export const SPRING = {
  gentle: { type: "spring", stiffness: 120, damping: 20, mass: 0.9 },
  snappy: { type: "spring", stiffness: 380, damping: 28, mass: 0.7 },
  bouncy: { type: "spring", stiffness: 260, damping: 16, mass: 0.8 },
} satisfies Record<string, Transition>;

/* ---- easeOutExpo — the counter curve (race, then land) ---- */
export function easeOutExpo(x: number): number {
  return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

/* ---- Orchestrated stagger presets (never even spacing) ---- */
export const stagger = {
  /** Cascade down with decelerating gaps */
  cascade: (i: number, base = 0.08) => base * i + Math.pow(i, 1.35) * 0.012,
  /** Column wave for grids */
  wave: (i: number, cols = 3, base = 0.07) =>
    base * (i % cols) + 0.11 * Math.floor(i / cols),
};

/* ---- Shared variant recipes ---- */
export const riseIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: EASE_EXPO },
  },
});

export const popIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.86, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: EASE_BACK },
  },
});

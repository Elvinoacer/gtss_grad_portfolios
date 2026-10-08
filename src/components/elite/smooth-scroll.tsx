"use client";

/**
 * Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger and
 * Lenis share a single rAF heartbeat. Zero drift, zero jank.
 * Disabled entirely for `prefers-reduced-motion` (native scroll, no easing).
 */

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/** Instant reset (route changes) — Lenis-aware, falls back to native */
export function scrollToTop(immediate = true) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

/** Scroll to an element by id — used for in-page section links */
export function scrollToEl(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -96, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function lockScroll(locked: boolean) {
  if (lenisInstance) {
    if (locked) lenisInstance.stop();
    else lenisInstance.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.095,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: false,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}

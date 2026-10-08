"use client";

/**
 * Parallax — GSAP-scrubbed vertical drift.
 * Place inside a parent with `overflow-hidden` and size the child taller
 * than the mask (e.g. `h-[130%] -mt-[15%]`) so no gaps show at extremes.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Parallax({
  children,
  className = "",
  speed = 0.12,
  clampStart = "top bottom",
  clampEnd = "bottom top",
}: {
  children: ReactNode;
  className?: string;
  /** 0.12 = ±12% of the element's own height over the scroll range */
  speed?: number;
  clampStart?: string;
  clampEnd?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: speed * 100 },
        {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: clampStart,
            end: clampEnd,
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, clampStart, clampEnd]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

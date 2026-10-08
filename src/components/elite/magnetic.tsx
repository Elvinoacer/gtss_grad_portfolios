"use client";

/**
 * Magnetic — wraps any element and lets it gravitate toward the cursor
 * with a springy GSAP quickTo pull. Fine pointers only.
 * The wrapper carries [data-magnetic] so the custom cursor ring snaps
 * to its live bounds while it moves.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export function Magnetic({
  children,
  className = "",
  strength = 0.32,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      xTo(0);
      yTo(0);
    };
  }, [strength, disabled]);

  return (
    <div
      ref={ref}
      data-magnetic
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

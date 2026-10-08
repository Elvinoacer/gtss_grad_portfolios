"use client";

/**
 * VelocityMarquee — an infinite kinetic rail that reacts to scroll:
 * speed multiplies with scroll velocity, direction flips when you scroll
 * back up, and the type leans into the motion with a subtle skew.
 * Transform-only. Reduced motion: static, no loop.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function VelocityMarquee({
  children,
  className = "",
  trackClassName = "",
  baseDuration = 30,
  direction = 1,
  skew = true,
  skewLimit = 5,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** seconds for one full loop at rest */
  baseDuration?: number;
  /** 1 = leftward, -1 = rightward */
  direction?: 1 | -1;
  skew?: boolean;
  skewLimit?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: baseDuration,
        repeat: -1,
      });
      loop.timeScale(direction);

      const tsTo = gsap.quickTo(loop, "timeScale", {
        duration: 0.4,
        ease: "power2",
      });
      const skewTo = skew
        ? gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" })
        : null;

      let settleId = 0;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity() / 260;
          const boost = gsap.utils.clamp(1, 4.5, 1 + Math.abs(v) * 0.45);
          const dir = self.direction >= 0 ? 1 : -1;
          tsTo(dir * boost * direction);
          if (skewTo) skewTo(gsap.utils.clamp(-skewLimit, skewLimit, v));
          window.clearTimeout(settleId);
          settleId = window.setTimeout(() => {
            tsTo(direction);
            if (skewTo) skewTo(0);
          }, 170);
        },
      });

      return () => {
        window.clearTimeout(settleId);
        st.kill();
        loop.kill();
      };
    }, track);

    return () => ctx.revert();
  }, [baseDuration, direction, skew, skewLimit]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className={`flex w-max items-center will-change-transform ${trackClassName}`}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

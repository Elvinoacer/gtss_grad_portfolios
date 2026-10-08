"use client";

/**
 * VelocitySkew — scroll-velocity skew with elastic settle.
 * As the visitor scrolls faster, wrapped media tilts (max ±3.2°) and
 * springs back with elastic.out when velocity settles — the physical,
 * "printed matter bending under motion" feel. Transform-only, one
 * page-wide ScrollTrigger per wrapper, desktop pointers only.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function VelocitySkew({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(el, "skewY", "deg");
    const clamp = gsap.utils.clamp(-3.2, 3.2);

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -300);
        // Only ramp up; the settle tween always brings it home
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 1,
            ease: "elastic.out(1, 0.45)",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(proxy);
    };
  }, []);

  return (
    <div ref={ref} className={`origin-center will-change-transform ${className}`}>
      {children}
    </div>
  );
}

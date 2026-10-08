"use client";

/**
 * HorizontalGallery — a pinned, scroll-scrubbed horizontal exhibition.
 * Desktop: the section pins to the viewport while the track translates;
 * velocity-smoothed scrub, live progress bar and card counter.
 * Mobile: degrades to native snap-scrolling (no pin, no jank).
 */

import {
  Children,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HorizontalGallery({
  children,
  className = "",
  trackClassName = "",
  header,
  footer,
  backdrop,
  counterLabel = "Featured",
  chapter,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  header?: ReactNode;
  footer?: ReactNode;
  /** Decorative layer (e.g. giant outline word) drifting at its own rate */
  backdrop?: ReactNode;
  counterLabel?: string;
  chapter?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const total = Children.count(children);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.registerPlugin(ScrollTrigger);

        const backdrop = section.querySelector<HTMLElement>(
          "[data-gallery-backdrop]"
        );
        const dist = () =>
          Math.max(1, track.scrollWidth - section.clientWidth);

        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) {
                barRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (countRef.current) {
                const idx =
                  Math.min(total, Math.floor(self.progress * total) + 1);
                countRef.current.textContent = String(idx).padStart(2, "0");
              }
              if (backdrop) {
                const drift = (0.29 - self.progress) * 34;
                backdrop.style.transform = `translate3d(calc(-50% + ${drift}vw), -50%, 0)`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { x: 0 });
        };
      }
    );

    return () => mm.revert();
  }, [total]);

  return (
    <section
      ref={sectionRef}
      data-chapter={chapter}
      className={`relative overflow-hidden py-16 sm:py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0 ${className}`}
    >
      {backdrop && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {backdrop}
        </div>
      )}

      {header}

      <div
        data-lenis-prevent
        className="mt-8 snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] lg:mt-10 lg:snap-none lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          className={`flex w-max items-stretch gap-5 px-5 will-change-transform sm:px-8 lg:gap-10 lg:px-12 ${trackClassName}`}
        >
          {children}
        </div>
      </div>

      {/* Progress + counter */}
      <div className="shell mt-6 flex items-center gap-5 lg:mt-12">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">
          {counterLabel}
        </span>
        <div className="h-px max-w-xs flex-1 bg-hairline">
          <div
            ref={barRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-brass-dim to-brass"
          />
        </div>
        <span className="font-mono text-[0.65rem] tabular-nums tracking-[0.2em] text-ink-secondary">
          <span ref={countRef}>01</span>
          <span className="text-ink-tertiary"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="ml-auto font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-tertiary lg:hidden">
          Swipe
        </span>
      </div>

      {footer}
    </section>
  );
}

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
import { getLenis } from "./smooth-scroll";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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

  const handlePrev = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024 && trackRef.current && sectionRef.current) {
      const dist = Math.max(1, trackRef.current.scrollWidth - sectionRef.current.clientWidth);
      const step = dist / Math.max(1, total - 1);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(window.scrollY - step, { duration: 0.6 });
      } else {
        window.scrollBy({ top: -step, behavior: "smooth" });
      }
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024 && trackRef.current && sectionRef.current) {
      const dist = Math.max(1, trackRef.current.scrollWidth - sectionRef.current.clientWidth);
      const step = dist / Math.max(1, total - 1);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(window.scrollY + step, { duration: 0.6 });
      } else {
        window.scrollBy({ top: step, behavior: "smooth" });
      }
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      data-chapter={chapter}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        }
      }}
      tabIndex={0}
      aria-label="Featured portfolios exhibition"
      className={`relative overflow-hidden py-16 sm:py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0 focus:outline-none ${className}`}
    >
      {backdrop && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {backdrop}
        </div>
      )}

      {header}

      <div
        ref={scrollContainerRef}
        data-lenis-prevent
        onScroll={(e) => {
          const el = e.currentTarget;
          const max = el.scrollWidth - el.clientWidth;
          if (max > 0) {
            const progress = Math.min(1, Math.max(0, el.scrollLeft / max));
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${progress})`;
            }
            if (countRef.current) {
              const idx = Math.min(total, Math.floor(progress * (total - 1) + 0.5) + 1);
              countRef.current.textContent = String(idx).padStart(2, "0");
            }
          }
        }}
        className="mt-8 snap-x snap-mandatory overflow-x-auto pb-4 no-scrollbar lg:mt-10 lg:snap-none lg:overflow-visible lg:pb-0"
      >
        <div
          ref={trackRef}
          className={`flex w-max items-stretch gap-4 px-4 will-change-transform sm:gap-6 sm:px-8 lg:gap-10 lg:px-12 ${trackClassName}`}
        >
          {children}
        </div>
      </div>

      {/* Progress + counter + navigation controls (GP-15) */}
      <div className="shell mt-6 flex flex-wrap items-center justify-between gap-4 lg:mt-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-brass font-medium">
            {counterLabel}
          </span>
          <div className="h-px w-24 sm:w-36 bg-hairline">
            <div
              ref={barRef}
              className="h-full origin-left scale-x-0 bg-gradient-to-r from-brass-dim to-brass transition-transform duration-150"
            />
          </div>
          <span className="font-mono text-xs tabular-nums tracking-[0.16em] text-ink-secondary">
            <span ref={countRef}>01</span>
            <span className="text-ink-tertiary"> / {String(total).padStart(2, "0")}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous portfolio card"
            className="grid size-11 place-items-center rounded-md border border-hairline bg-surface/80 text-foreground hover:border-brass/40 transition-colors active:scale-95 text-base"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next portfolio card"
            className="grid size-11 place-items-center rounded-md border border-hairline bg-surface/80 text-foreground hover:border-brass/40 transition-colors active:scale-95 text-base"
          >
            ›
          </button>
        </div>
      </div>

      {footer}
    </section>
  );
}

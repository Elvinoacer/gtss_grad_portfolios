"use client";

/**
 * ChapterRail — the film spine of the homepage.
 * A fixed vertical chapter index (I–VIII) that live-tracks which scroll
 * "scene" the visitor is inside, with a rolling title readout and
 * Lenis-aware jump links. Desktop only (>= 1280px).
 *
 * Sections register themselves with `data-chapter="overture"` etc.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "./smooth-scroll";

export const CHAPTERS = [
  { id: "overture", num: "I", label: "Overture" },
  { id: "kinetic", num: "II", label: "The Fields" },
  { id: "manifesto", num: "III", label: "Manifesto" },
  { id: "numbers", num: "IV", label: "Evidence" },
  { id: "exhibition", num: "V", label: "Exhibition" },
  { id: "schools", num: "VI", label: "Schools" },
  { id: "mosaic", num: "VII", label: "The Mosaic" },
  { id: "process", num: "VIII", label: "The Method" },
  { id: "begin", num: "IX", label: "Begin" },
] as const;

export function ChapterRail() {
  const [active, setActive] = useState<string>("overture");
  const [mounted, setMounted] = useState(false);
  const [hasChapters, setHasChapters] = useState(false);
  const readoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1536px)");
    if (!mql.matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const checkChapters = () => {
      const raw = window.location.hash.replace(/^#/, "");
      const isHome = raw === "" || raw === "/";
      const count = document.querySelectorAll("[data-chapter]").length;
      setHasChapters(isHome && count > 0);
    };
    checkChapters();
    window.addEventListener("hashchange", checkChapters);

    // Defer the mounted flag to the next frame (avoids sync setState in effect)
    const raf = requestAnimationFrame(() => setMounted(true));

    let ctx: gsap.Context | undefined;
    let refreshSync: () => void;
    const build = () => {
      if (refreshSync) ScrollTrigger.removeEventListener("refresh", refreshSync);
      ctx?.revert();
      ctx = gsap.context(() => {
        CHAPTERS.forEach(({ id }) => {
          // A chapter id may span several adjacent sections — track them all.
          // Pinned sections trigger on their PIN SPACER — the pinned element
          // itself reports its pre-pin position, which is meaningless.
          document
            .querySelectorAll<HTMLElement>(`[data-chapter="${id}"]`)
            .forEach((el) => {
              const trigger =
                el.parentElement?.classList.contains("pin-spacer")
                  ? el.parentElement
                  : el;
              ScrollTrigger.create({
                trigger,
                start: "top 55%",
                end: "bottom 45%",
                invalidateOnRefresh: true,
                onToggle: (self) => {
                  if (self.isActive) setActive(id);
                },
                // safety net: re-sync continuously while in range
                onUpdate: (self) => {
                  if (self.isActive) setActive(id);
                },
              });
            });
        });

        // after any refresh (resize / font load), re-sync the active chapter
        refreshSync = () => {
          for (let i = CHAPTERS.length - 1; i >= 0; i--) {
            const { id } = CHAPTERS[i];
            const el = document.querySelector<HTMLElement>(
              `[data-chapter="${id}"]`
            );
            if (!el) continue;
            const trigger =
              el.parentElement?.classList.contains("pin-spacer")
                ? el.parentElement
                : el;
            const r = trigger.getBoundingClientRect();
            if (r.top <= window.innerHeight * 0.55 && r.bottom >= window.innerHeight * 0.45) {
              setActive(id);
              return;
            }
          }
        };
        ScrollTrigger.addEventListener("refresh", refreshSync);
      });
    };

    /* Build AFTER the page's pin effects run. ExperienceLayer sits earlier
       in the layout tree, so its effects fire before the page sections'
       effects — a double rAF defers past the whole commit so pin spacers
       exist when we measure. */
    let raf2 = 0;
    raf2 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(build);
    });

    // Recompute positions once webfonts settle (they shift layout)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }

    /* Self-healing: rebuild whenever the chapter landscape changes —
       route swaps mount/unmount sections, pins create/remove spacers.
       A MutationObserver (debounced) catches all of it without racing
       effect timing. */
    let moTimer: ReturnType<typeof setTimeout> | undefined;
    let lastSignature = "";
    const signature = () =>
      `${document.querySelectorAll("[data-chapter]").length}:${document.querySelectorAll(".pin-spacer").length}`;
    const observer = new MutationObserver(() => {
      clearTimeout(moTimer);
      moTimer = setTimeout(() => {
        const sig = signature();
        if (sig !== lastSignature) {
          lastSignature = sig;
          build();
        }
      }, 320);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    lastSignature = signature();

    return () => {
      window.removeEventListener("hashchange", checkChapters);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
      clearTimeout(moTimer);
      observer.disconnect();
      if (refreshSync) ScrollTrigger.removeEventListener("refresh", refreshSync);
      ctx?.revert();
    };
  }, []);

  /* Entrance — runs once the nav actually exists in the DOM */
  useEffect(() => {
    if (!mounted || !hasChapters) return;
    const el = readoutRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 1.2, delay: 2.2, ease: "expo.out" }
    );
    return () => {
      tween.kill();
    };
  }, [mounted, hasChapters]);

  const activeIdx = CHAPTERS.findIndex((c) => c.id === active);

  if (!mounted || !hasChapters) return null;

  return (
    <nav
      ref={readoutRef}
      aria-label="Chapters"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-4">
        {/* Rolling chapter number */}
        <div className="relative h-6 w-8 overflow-hidden font-mono text-xs font-bold tracking-[0.16em] text-brass">
          <div
            className="absolute inset-x-0 top-0 flex flex-col gap-[0.55rem] will-change-transform"
            style={{
              transform: `translateY(calc(${-activeIdx} * (1.5rem + 0.55rem)))`,
              transition:
                "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {CHAPTERS.map((c) => (
              <span key={c.id} className="h-6 leading-6 text-center">
                {c.num}
              </span>
            ))}
          </div>
        </div>

        {/* The line of nodes */}
        <ul className="flex flex-col gap-2.5">
          {CHAPTERS.map((c) => {
            const isActive = c.id === active;
            const isPast = CHAPTERS.findIndex((x) => x.id === active) >
              CHAPTERS.findIndex((x) => x.id === c.id);
            return (
              <li key={c.id} className="grid place-items-center">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.querySelector<HTMLElement>(
                      `[data-chapter="${c.id}"]`
                    );
                    if (!el) {
                      window.location.hash = "/";
                      setTimeout(() => {
                        const target = document.querySelector<HTMLElement>(`[data-chapter="${c.id}"]`);
                        target?.scrollIntoView({ behavior: "smooth" });
                      }, 350);
                      return;
                    }
                    const lenis = getLenis();
                    if (lenis) {
                      lenis.scrollTo(el, { offset: 0, duration: 1.6 });
                    } else {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  aria-label={`Jump to chapter ${c.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative grid place-items-center min-h-[26px] min-w-[26px] rounded p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span
                    className="block rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? 24 : isPast ? 12 : 8,
                      height: 3,
                      background: isActive
                        ? "var(--brass)"
                        : isPast
                          ? "rgba(226,168,75,0.7)"
                          : "rgba(157,167,179,0.45)",
                      transform: isActive ? "none" : "translateX(-6px)",
                      boxShadow: isActive
                        ? "0 0 12px rgba(226,168,75,0.7)"
                        : "none",
                    }}
                  />
                  {/* floating label on hover and focus-visible */}
                  <span className="pointer-events-none absolute left-[calc(100%+0.9rem)] z-50 whitespace-nowrap rounded border border-hairline bg-surface/95 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 -translate-x-2">
                    {c.num} · {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Live title readout */}
        <div className="ml-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-secondary">
          <span className="text-foreground">
            {CHAPTERS[activeIdx]?.label}
          </span>
        </div>
      </div>
    </nav>
  );
}

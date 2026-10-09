"use client";

/**
 * ZoomScene — "From one, a generation."
 * Apple-style scale choreography: a single portfolio pins center-stage and
 * the camera pushes INTO it (scale + drift with expo curves inside the
 * scrub), the headline zooms past the lens at 2x speed, then the card
 * blows through the screen to reveal the rest of the collection
 * converging into an orbit. Hands off narratively into the mosaic.
 *
 * Desktop: pinned +220%. Mobile: flowing composition. Reduced: static.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { portfolios } from "@/content/portfolios";
import { getDegree } from "@/content/schools";
import { Link } from "@/lib/router";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { Magnetic } from "./magnetic";

const HERO_SLUG = "kevin-mwangi-computer-science";
const ORBIT_SLUGS = [
  "faith-wanjiru-civil-structural",
  "naomi-wambui-actuarial-science",
  "brian-kipkemoi-telecommunications",
  "mercy-achieng-mechanical-production",
  "david-wafula-chemical-process",
  "ian-kamau-electrical-electronics",
  "lydia-chebet-industrial-textile",
  "alloice-otieno-biochemistry",
  "stanley-aketch-biochemistry",
];

/* Orbit positions — vw/vh strings, deliberately uneven */
const ORBIT_POS = [
  { x: "-19vw", y: "-14vh", r: -8 },
  { x: "18vw", y: "-17vh", r: 7 },
  { x: "-25vw", y: "4vh", r: 5 },
  { x: "24vw", y: "7vh", r: -6 },
  { x: "-16vw", y: "22vh", r: 10 },
  { x: "16vw", y: "25vh", r: -9 },
  { x: "-2vw", y: "-27vh", r: 4 },
  { x: "2vw", y: "30vh", r: -4 },
  { x: "-28vw", y: "-20vh", r: -5 },
];

const COUNT = portfolios.length;
const COUNT_WORD =
  [
    "zero", "one", "two", "three", "four", "five", "six", "seven",
    "eight", "nine", "ten", "eleven", "twelve", "thirteen",
    "fourteen", "fifteen", "sixteen", "seventeen",
  ][COUNT] ?? String(COUNT);

export function ZoomScene() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const hero = portfolios.find((p) => p.slug === HERO_SLUG)!;
  const orbit = ORBIT_SLUGS.map((s) => portfolios.find((p) => p.slug === s)!).filter(Boolean);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Desktop-only initial states (mobile keeps everything visible) */
      gsap.set("[data-zoom-final]", { opacity: 0, y: 46 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
      });

      /* Phase 1 (0-42%): Card starts well-sized and legible from the beginning (GP-14) */
      tl.fromTo(
        "[data-zoom-card]",
        { scale: 0.94, yPercent: 4, rotate: -1 },
        { scale: 1.05, yPercent: -2, rotate: 0, duration: 0.42, ease: "power2.inOut" },
        0
      );

      /* Headline zooms past the lens at ~2x speed and dissolves */
      tl.to(
        "[data-zoom-head]",
        { yPercent: -190, opacity: 0, scale: 1.28, duration: 0.3, ease: "power2.in" },
        0.02
      );

      /* Eyebrow exits even faster — lens parallax */
      tl.to(
        "[data-zoom-eyebrow]",
        { yPercent: -340, opacity: 0, duration: 0.22, ease: "power2.in" },
        0.01
      );

      /* Backdrop word expands like it's behind the subject */
      tl.fromTo(
        "[data-zoom-backdrop]",
        { scale: 0.8, opacity: 0.35 },
        { scale: 1.5, opacity: 0.12, duration: 0.6, ease: "sine.inOut" },
        0
      );

      /* Phase 2 (42-62%): hold on the near-fullscreen card, caption enters */
      tl.fromTo(
        "[data-zoom-caption]",
        { opacity: 0, yPercent: 60 },
        { opacity: 1, yPercent: 0, duration: 0.16, ease: "expo.out" },
        0.44
      );

      /* Phase 3 (62-100%): blow through — card scales past the lens */
      tl.to(
        "[data-zoom-card]",
        { scale: 2.6, opacity: 0.05, duration: 0.34, ease: "power3.in" },
        0.62
      );
      tl.to(
        "[data-zoom-caption]",
        { opacity: 0, yPercent: -40, duration: 0.14, ease: "power2.in" },
        0.64
      );

      /* The collection converges into orbit — each with its own curve.
         Depth: alternate target scales/opacities so the ring reads as 3 planes. */
      section.querySelectorAll<HTMLElement>("[data-orbit]").forEach((el, i) => {
        const depth = i % 3;
        const targetScale = depth === 0 ? 0.62 : depth === 1 ? 0.5 : 0.42;
        const targetOpacity = depth === 0 ? 1 : depth === 1 ? 0.78 : 0.55;
        const pos = ORBIT_POS[i] ?? { x: "0vw", y: "0vh", r: 0 };
        tl.fromTo(
          el,
          {
            x: `calc(${pos.x} * 2.1)`,
            y: `calc(${pos.y} * 2.1)`,
            scale: 0.15,
            opacity: 0,
            rotate: pos.r * 3,
          },
          {
            x: pos.x,
            y: pos.y,
            scale: targetScale,
            opacity: targetOpacity,
            rotate: pos.r,
            duration: 0.26,
            ease: "expo.out",
          },
          0.62 + i * 0.028
        );
      });

      /* Finale copy rises */
      tl.fromTo(
        "[data-zoom-final]",
        { opacity: 0, y: 46 },
        { opacity: 1, y: 0, duration: 0.2, ease: "expo.out" },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      data-chapter="exhibition"
      aria-label="From one portfolio to the whole collection"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Lens atmosphere */}
      <div className="absolute inset-0 bg-vignette" aria-hidden />
      <span data-zoom-backdrop aria-hidden className="zoom-backdrop">
        ONE OF MANY
      </span>

      <div className="shell relative flex min-h-[100svh] flex-col items-center justify-center py-20">
        {/* Eyebrow — exits fastest (lens parallax) */}
        <p data-zoom-eyebrow className="eyebrow-brass mb-5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brass align-middle" aria-hidden />{" "}
          Chapter V — The exhibition
        </p>

        {/* Headline — zooms past the lens */}
        <h2 data-zoom-head className="display-section max-w-3xl text-balance text-center text-foreground">
          One portfolio is one person.
        </h2>

        {/* The card — the camera target (GP-14) */}
        <div data-zoom-card className="relative z-10 mt-6 w-[min(90vw,32rem)] will-change-transform lg:mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-brass/10 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-brass font-medium">
              <span className="size-1.5 rounded-full bg-brass" />
              Featured Graduate · Kevin Mwangi
            </span>
            <Link
              to={hero.liveUrl}
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-brass hover:underline font-semibold"
            >
              View Full Portfolio →
            </Link>
          </div>
          <PortfolioMock portfolio={hero} variant="card" className="w-full shadow-2xl" />
        </div>

        {/* Mid-scene caption with proof points */}
        <div data-zoom-caption className="mt-6 max-w-xl text-center">
          <p className="text-base leading-relaxed text-ink-secondary">
            <span className="font-display text-lg font-bold text-foreground">
              {hero.candidate.name}
            </span>{" "}
            — {hero.careerDirection} · BSc Computer Science
          </p>
          <p className="mt-2 text-xs font-mono uppercase tracking-[0.14em] text-ink-tertiary">
            Proof: Full-Stack Architecture · Distributed Systems · System Design Case Studies
          </p>
        </div>

        {/* Desktop Orbit — the rest of the collection converging in 3 depth planes */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center lg:flex" aria-hidden>
          {orbit.map((p, i) => (
            <div
              key={p.slug}
              data-orbit
              data-orbit-depth={i % 3}
              className="absolute w-[10.5rem] will-change-transform"
              style={{ opacity: 0 }}
            >
              <Link
                to={p.liveUrl}
                className="pointer-events-auto block transition-transform duration-300 hover:scale-105"
                tabIndex={0}
                ariaLabel={`View ${p.candidate.name}'s portfolio`}
              >
                <PortfolioMock portfolio={p} variant="card" />
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Orbit: Touch-friendly preview strip of the other graduates */}
        <div className="relative z-20 mt-10 w-full max-w-full lg:hidden">
          <div className="mb-3.5 flex items-center justify-between px-1">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-brass">
              The Other {orbit.length} Graduates
            </p>
            <span className="font-mono text-[0.58rem] uppercase tracking-wider text-ink-tertiary">
              Swipe cards →
            </span>
          </div>
          <div className="no-scrollbar -mx-5 flex gap-3.5 overflow-x-auto px-5 pb-3 pt-1 snap-x snap-mandatory touch-pan-x">
            {orbit.map((p, idx) => {
              const degree = getDegree(p.degreeSlug);
              return (
                <Link
                  key={p.slug}
                  to={p.liveUrl}
                  className="group relative flex w-[14rem] shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-hairline/80 bg-surface/90 p-3 transition-all active:scale-[0.98] hover:border-brass/40"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <PortfolioMock portfolio={p} variant="card" className="w-full" />
                    {p.liveUrl && (
                      <span className="absolute right-2 top-2 z-30 inline-flex items-center gap-1 rounded-[3px] bg-[#080A0D]/85 px-1.5 py-0.5 font-mono text-[0.52rem] uppercase tracking-wider text-emerald-400 border border-emerald-400/30">
                        <span className="size-1 rounded-full bg-emerald-400" />
                        Live
                      </span>
                    )}
                  </div>
                  <div className="mt-3 px-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-mono text-[0.58rem] uppercase tracking-wider text-brass">
                        {degree?.degree.shortName ?? p.degreeSlug}
                      </p>
                      <span className="font-mono text-[0.52rem] text-ink-tertiary">
                        0{idx + 2}/10
                      </span>
                    </div>
                    <p className="mt-1 truncate font-display text-sm font-bold text-foreground group-hover:text-brass">
                      {p.candidate.name}
                    </p>
                    <p className="truncate text-[0.72rem] text-ink-secondary">
                      {p.careerDirection}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Finale — a frosted focal point above the orbit */}
        <div data-zoom-final className="relative z-30 mt-6 text-center">
          <div className="mx-auto inline-block max-w-xl rounded-2xl border border-hairline/80 bg-background/70 px-10 py-8 backdrop-blur-md shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]">
            <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              The other {COUNT - 1} are waiting.
            </p>
            <Magnetic>
              <Link
                to="/portfolios"
                className="group mt-5 inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-7 font-sans text-sm font-semibold tracking-tight text-brass-foreground shadow-[0_0_0_1px_rgba(226,168,75,0.35),0_8px_28px_-12px_rgba(226,168,75,0.55)] transition-colors duration-300 hover:bg-[#EDBB60]"
              >
                Meet the whole collection
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

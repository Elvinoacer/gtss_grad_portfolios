"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolios } from "@/content/portfolios";
import { getDegree } from "@/content/schools";
import { Link } from "@/lib/router";
import { CrossFadeText } from "@/components/gtss/motion";
import { Magnetic } from "@/components/elite/magnetic";
import { Parallax } from "@/components/elite/parallax";
import { useIntroDone } from "@/components/elite/intro-state";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { university } from "@/content/schools";
import { degreeFutures, collectionStats } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Ambient brass dust — subtle static particles without distracting shimmer (GP-25) */
const DUST = Array.from({ length: 8 }, (_, i) => ({
  left: `${(i * 37) % 92 + 4}%`,
  top: `${(i * 53) % 80 + 10}%`,
  size: 2 + ((i * 7) % 2),
}));

const stackPortfolios = [
  "kevin-mwangi-computer-science",
  "faith-wanjiru-civil-structural",
  "naomi-wambui-actuarial-science",
  "brian-kipkemoi-telecommunications",
  "lydia-chebet-industrial-textile",
]
  .map((slug) => portfolios.find((p) => p.slug === slug)!)
  .filter(Boolean);

/** Background parallax strips — reserved to far edges for text safety (GP-09) */
function BgStrips({ layerRef }: { layerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {/* mouse-parallax layer with text-safe clear zone on left/center */}
      <div ref={layerRef} className="absolute inset-0">
        <Parallax
          speed={0.12}
          clampStart="top top"
          clampEnd="bottom top"
          className="absolute right-[4%] top-[10%] hidden h-[38%] w-[20%] overflow-hidden rounded-2xl border border-hairline/40 opacity-20 lg:block"
        >
          <Image
            src="/images/graduates.jpg"
            alt=""
            fill
            sizes="20vw"
            className="object-cover"
            style={{ filter: "saturate(0.7) contrast(1.05) brightness(0.65)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </Parallax>
      </div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  const reduce = useReducedMotion();
  const introDone = useIntroDone();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);

  /* Rotating portfolio stack — paused by default on initial view for stability (GP-10) */
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % stackPortfolios.length),
      6000
    );
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  /* Content drifts up, zooms slightly and fades as the hero scrolls away
     — a curved cinematic exit, not a linear slide */
  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    const content = contentRef.current;
    const bgLayer = bgLayerRef.current;
    if (!section || !content || !bgLayer) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(content, {
        yPercent: -16,
        scale: 0.93,
        opacity: 0.18,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "85% top",
          scrub: 0.6,
        },
      });
      /* The background breathes opposite — depth through the exit */
      gsap.fromTo(
        bgLayer,
        { scale: 1 },
        {
          scale: 1.14,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "85% top",
            scrub: 0.8,
          },
        }
      );
    }, section);

    /* Gentle mouse parallax on the background layer */
    const xTo = gsap.quickTo(bgLayer, "x", { duration: 1.1, ease: "power3" });
    const yTo = gsap.quickTo(bgLayer, "y", { duration: 1.1, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      xTo(nx * -26);
      yTo(ny * -14);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  /* 3D tilt on the portfolio stack following the pointer */
  /* Cursor spotlight — a warm lamp that follows the pointer */
  useEffect(() => {
    if (reduce) return;
    const spot = spotRef.current;
    if (!spot) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const xTo = gsap.quickTo(spot, "x", { duration: 0.9, ease: "power3" });
    const yTo = gsap.quickTo(spot, "y", { duration: 0.9, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Stat strip counts up when the curtain lifts */
  useEffect(() => {
    if (reduce || !introDone) return;
    const section = sectionRef.current;
    if (!section) return;
    const counters = section.querySelectorAll<HTMLElement>("[data-stat-counter]");
    if (!counters.length) return;
    counters.forEach((el, i) => {
      const target = +(el.dataset.target ?? "0");
      const proxy = { v: 0 };
      gsap.to(proxy, {
        v: target,
        duration: 1.6,
        delay: 0.3 + i * 0.12,
        ease: "expo.out",
        onUpdate: () => {
          el.textContent = String(Math.round(proxy.v));
        },
      });
    });
  }, [reduce, introDone]);

  const spotRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(460px circle at ${glareX}% ${glareY}%, rgba(226,168,75,0.14), transparent 62%)`;

  const onStackMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(nx * 7);
    tiltX.set(ny * -6);
    glareX.set((nx + 0.5) * 100);
    glareY.set((ny + 0.5) * 100);
  };
  const onStackLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 36 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        setActive((v) => (v + 1) % stackPortfolios.length);
      } else {
        setActive((v) => (v - 1 + stackPortfolios.length) % stackPortfolios.length);
      }
    }
  };

  const activeP = stackPortfolios[active];
  const activeDegree = getDegree(activeP.degreeSlug);

  return (
    <section
      ref={sectionRef}
      data-chapter="overture"
      aria-label="Introduction"
      className="relative overflow-hidden bg-blueprint bg-vignette"
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #E2A84B, transparent 70%)",
        }}
      />

      {/* cursor spotlight — the warm lamp */}
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none absolute -left-[19rem] -top-[19rem] z-[5] hidden h-[38rem] w-[38rem] rounded-full md:block"
        style={{
          background:
            "radial-gradient(closest-side, rgba(226,168,75,0.075), transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* ambient brass dust */}
      <div className="absolute inset-0" aria-hidden>
        {DUST.map((d, i) => (
          <span
            key={i}
            className="dust-mote"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
            }}
          />
        ))}
      </div>

      <BgStrips layerRef={bgLayerRef} />
      <div className="absolute inset-0 bg-grain" aria-hidden />

      <div
        ref={contentRef}
        className="shell relative grid min-h-[calc(100svh-4.5rem)] items-center gap-8 pb-8 pt-14 sm:pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-8 lg:pb-10"
      >
        {/* Copy column */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 eyebrow-brass">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-brass align-middle"
              aria-hidden
            />{" "}
            <span>GTSS Graduate Portfolios · {university.collectionLabel}</span>
            <span className="font-mono text-xs font-normal text-ink-tertiary">
              — Independent Initiative
            </span>
          </div>

          <h1 className="mt-4 display-hero text-foreground">
            <span className="block">Your degree tells people</span>
            <span className="block text-ink-secondary">what you studied.</span>
            <span className="mt-2 block">
              <span className="serif-accent text-brass block sm:inline">
                Your portfolio shows{" "}
              </span>
              <span className="block text-foreground sm:inline">
                what you can do.
              </span>
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            Explore profession-specific digital portfolios designed around the
            work, thinking, tools and career direction of emerging graduates —
            from engineering and computing to science, information, education,
            agriculture and the social sciences.
          </p>

          <motion.div
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <Magnetic>
              <Link
                to="/portfolios"
                className="group inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground shadow-[0_0_0_1px_rgba(226,168,75,0.35),0_8px_28px_-12px_rgba(226,168,75,0.55)] transition-colors duration-300 hover:bg-[#EDBB60]"
              >
                Explore the Portfolios
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/request"
                className="group inline-flex h-12 items-center gap-2.5 rounded-md border border-hairline px-6 font-sans text-sm font-semibold tracking-tight text-foreground transition-colors duration-300 hover:border-ink-tertiary hover:bg-raised"
              >
                Request My Portfolio
                <ArrowUpRight
                  className="size-4 text-ink-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass"
                  aria-hidden
                />
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mt-5 max-w-full font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-tertiary sm:text-[0.68rem] sm:tracking-[0.16em]"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
              <span className="shrink-0 text-ink-tertiary">One degree, different futures</span>
              <span className="hidden text-ink-tertiary/60 sm:inline" aria-hidden>
                —
              </span>
              <div className="min-w-0 max-w-full overflow-hidden">
                <CrossFadeText
                  keyPrefix="futures"
                  items={degreeFutures.map((d) => `${d.degree} → ${d.futures}`)}
                  interval={2800}
                  className="font-medium text-brass/90"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Portfolio stack — pointer-tilted, glare-tracked */}
        <motion.div
          className="relative z-10 [perspective:1400px]"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          onPointerMove={onStackMove}
          onPointerLeave={onStackLeave}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-cursor="view"
        >
          <motion.div
            className="relative mx-auto aspect-[12/13] w-full max-w-[21.5rem] sm:max-w-[24.5rem] lg:max-w-[23rem]"
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          >
            {[0, 1, 2].map((offset) => {
              const idx = (active + offset) % stackPortfolios.length;
              const p = stackPortfolios[idx];
              const isFront = offset === 0;
              return (
                <motion.div
                  key={p.slug}
                  className="absolute inset-0"
                  style={{ zIndex: 10 - offset }}
                  initial={false}
                  animate={
                    reduce
                      ? { opacity: isFront ? 1 : 0, scale: 1, y: 0, x: 0, rotate: 0 }
                      : {
                          opacity: isFront ? 1 : offset === 1 ? 0.66 : 0.36,
                          scale: 1 - offset * 0.06,
                          y: offset * 12 + (offset > 0 ? 8 : 0),
                          x: offset === 1 ? (isNarrow ? -14 : -26) : offset === 2 ? (isNarrow ? 14 : 26) : 0,
                          rotate: offset === 1 ? -3.5 : offset === 2 ? 3.5 : 0,
                        }
                  }
                  transition={{ duration: 0.85, ease: EASE }}
                  onClick={() => !isFront && setActive(idx)}
                  role={isFront ? undefined : "button"}
                  aria-label={
                    !isFront
                      ? `Bring ${p.candidate.name}'s portfolio forward`
                      : undefined
                  }
                  tabIndex={!isFront ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (!isFront && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      setActive(idx);
                    }
                  }}
                >
                  <PortfolioMock
                    portfolio={p}
                    variant="hero"
                    priority
                    className="h-full"
                  />
                  {/* glare sweep on the front card */}
                  {isFront && !reduce && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-xl"
                      style={{ background: glare }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Active label + Controls (GP-10) */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeP.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="min-w-0"
              >
                <p className="truncate font-display text-base font-bold tracking-tight text-foreground">
                  {activeP.candidate.name}
                  <span className="ml-2 font-sans text-xs font-normal text-ink-tertiary">
                    {activeDegree?.degree.shortName}
                  </span>
                </p>
                <p className="mt-0.5 truncate text-xs text-ink-secondary">
                  {activeP.careerDirection} · {activeP.presentation.themeLabel}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setActive((v) => (v - 1 + stackPortfolios.length) % stackPortfolios.length)}
                aria-label="Previous portfolio example"
                className="grid size-8 place-items-center rounded-md border border-hairline bg-surface/80 text-sm font-semibold text-ink-secondary hover:text-foreground hover:border-brass/40 transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setActive((v) => (v + 1) % stackPortfolios.length)}
                aria-label="Next portfolio example"
                className="grid size-8 place-items-center rounded-md border border-hairline bg-surface/80 text-sm font-semibold text-ink-secondary hover:text-foreground hover:border-brass/40 transition-colors"
              >
                ›
              </button>
              <Link
                to={`/portfolio/${activeP.slug}`}
                className="group inline-flex items-center gap-1.5 rounded-md border border-brass/40 bg-brass/10 px-3 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-brass hover:bg-brass hover:text-brass-foreground transition-colors"
              >
                View
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          {/* Mobile card indicator dots + gesture cue */}
          <div className="mt-3.5 flex items-center justify-between gap-3 sm:hidden">
            <div className="flex items-center gap-1.5" aria-label="Portfolio cards pagination">
              {stackPortfolios.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-6 bg-brass" : "w-1.5 bg-hairline"
                  }`}
                  aria-label={`Jump to portfolio card ${i + 1}`}
                />
              ))}
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary">
              Tap or swipe to leaf
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stat strip + scroll cue (GP-02, GP-04) */}
      <div className="relative z-10 border-t border-hairline/60 bg-background/60 backdrop-blur-sm">
        <div className="shell grid grid-cols-2 gap-3 py-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
          <Stat value={`${portfolios.length}`} label="Live portfolios" />
          <Stat value={`${collectionStats.totalSchools}`} label="Schools" />
          <Stat value={`${collectionStats.totalDegrees}`} label="Degree paths mapped" />
          <Stat value="1" label="University collection" />
          <div className="col-span-2 hidden items-center gap-3 sm:col-span-1 sm:ml-auto md:flex">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-tertiary">
              Scroll
            </span>
            <span className="scroll-cue-line h-8" aria-hidden />
          </div>
          <div className="col-span-2 flex items-center justify-center gap-2 pt-2 border-t border-hairline/40 sm:hidden">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-tertiary">
              Scroll to explore Ch. II
            </span>
            <span className="inline-block h-2.5 w-px bg-brass/60" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  suffix = "",
}: {
  value: string;
  label: string;
  suffix?: string;
}) {
  const num = value.replace(/[^\d]/g, "");
  return (
    <span className="flex items-baseline gap-2 rounded-lg bg-surface/40 p-2 sm:bg-transparent sm:p-0">
      <span
        data-stat-counter
        data-target={num}
        className="font-display text-xl sm:text-2xl font-bold tracking-tight text-brass"
      >
        {num}{suffix}
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-secondary font-medium">
        {label}
      </span>
    </span>
  );
}

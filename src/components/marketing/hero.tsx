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
import { SplitChars } from "@/components/elite/split-text";
import { Magnetic } from "@/components/elite/magnetic";
import { Parallax } from "@/components/elite/parallax";
import { useIntroDone } from "@/components/elite/intro-state";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { university } from "@/content/schools";
import { degreeFutures } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Ambient brass dust — floating particles, transform-only, GPU cheap */
const DUST = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 96 + 2}%`,
  top: `${(i * 53) % 88 + 6}%`,
  size: 2 + ((i * 7) % 3),
  duration: 9 + ((i * 13) % 8),
  delay: -((i * 1.7) % 10),
  drift: 12 + ((i * 11) % 26),
}));

const stackPortfolios = [
  "kevin-mwangi-computer-science",
  "faith-wanjiru-civil-structural",
  "naomi-wambui-actuarial-science",
  "brian-kipkemoi-telecommunications",
  "sarah-cherono-communication-journalism",
]
  .map((slug) => portfolios.find((p) => p.slug === slug)!)
  .filter(Boolean);

/** Background parallax strips — layered cinematic depth */
function BgStrips({ layerRef }: { layerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* mouse-parallax layer (scrub and mouse transforms live on different nodes) */}
      <div ref={layerRef} className="absolute inset-0">
        <Parallax
          speed={0.16}
          clampStart="top top"
          clampEnd="bottom top"
          className="absolute left-[3%] top-[14%] h-[34%] w-[20%] overflow-hidden rounded-2xl border border-hairline/50 opacity-25 lg:left-[5%] lg:opacity-35"
        >
          <Image
            src="/images/campus.jpg"
            alt=""
            fill
            sizes="20vw"
            className="object-cover"
            style={{ filter: "saturate(0.85) contrast(1.1) brightness(0.8)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </Parallax>

        <Parallax
          speed={0.26}
          clampStart="top top"
          clampEnd="bottom top"
          className="absolute left-[36%] top-[38%] hidden h-[30%] w-[17%] overflow-hidden rounded-2xl border border-hairline/40 opacity-25 md:block lg:left-[30%] lg:top-[30%] lg:opacity-35"
        >
          <Image
            src="/images/science-lab.jpg"
            alt=""
            fill
            sizes="17vw"
            className="object-cover"
            style={{ filter: "saturate(0.85) contrast(1.1) brightness(0.8)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </Parallax>

        <Parallax
          speed={0.1}
          clampStart="top top"
          clampEnd="bottom top"
          className="absolute right-[6%] top-[10%] hidden h-[36%] w-[22%] overflow-hidden rounded-2xl border border-hairline/50 opacity-30 lg:right-[10%] lg:block lg:opacity-40"
        >
          <Image
            src="/images/graduates.jpg"
            alt=""
            fill
            sizes="22vw"
            className="object-cover"
            style={{ filter: "saturate(0.85) contrast(1.1) brightness(0.8)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </Parallax>
      </div>
    </div>
  );
}

/** Inline media chip for the giant headline */
function HeadlineChip({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <span className="img-chip" data-cursor="link" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="180px"
        className="object-cover"
      />
      <span className="sr-only">{alt}</span>
    </span>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const introDone = useIntroDone();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);

  /* Rotating portfolio stack */
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % stackPortfolios.length),
      3600
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

  /* Stat strip counts up when the curtain lifts */
  useEffect(() => {
    if (reduce || !introDone) return;
    const counters = statRefs.current;
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
  const statRefs = useRef<HTMLSpanElement[]>([]);

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
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
              "--drift": `${d.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <BgStrips layerRef={bgLayerRef} />
      <div className="absolute inset-0 bg-grain" aria-hidden />

      <div
        ref={contentRef}
        className="shell relative grid min-h-[calc(100svh-4.5rem)] items-center gap-10 pb-12 pt-24 sm:pt-28 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8 lg:pb-16"
      >
        {/* Copy column */}
        <div className="relative z-10">
          <motion.p
            className="eyebrow-brass"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-brass align-middle"
              aria-hidden
            />{" "}
            GTSS Graduate Portfolios · {university.collectionLabel}
          </motion.p>

          <h1 className="mt-6 display-hero text-foreground">
            <span className="block">
              <SplitChars
                text="Your degree"
                play={introDone}
                delay={0.12}
                stagger={0.02}
              />
              <HeadlineChip src="/images/graduates.jpg" alt="graduates" priority />
              <SplitChars
                text="tells"
                play={introDone}
                delay={0.26}
                stagger={0.02}
              />
            </span>
            <span className="block">
              <SplitChars
                text="people what"
                play={introDone}
                delay={0.3}
                stagger={0.02}
              />
            </span>
            <span className="block">
              <SplitChars
                text="you studied."
                play={introDone}
                delay={0.42}
                stagger={0.02}
              />
            </span>

            <motion.span
              className="serif-accent mt-2 block text-brass"
              style={{
                fontSize: "clamp(1.7rem, 3.4vw, 3.2rem)",
                lineHeight: 1.12,
              }}
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }
              }
              animate={
                introDone
                  ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
                  : undefined
              }
              transition={{ duration: 1.0, delay: 0.72, ease: EASE }}
            >
              but your portfolio shows them
            </motion.span>

            <span className="mt-2 block">
              <SplitChars
                text="what you can"
                play={introDone}
                delay={0.88}
                stagger={0.02}
              />
              <span className="text-shimmer">
                <SplitChars
                  text="do."
                  play={introDone}
                  delay={1.06}
                  stagger={0.05}
                />
              </span>
              <HeadlineChip src="/images/computer-science.jpg" alt="portfolio work" />
            </span>
          </h1>

          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-ink-secondary sm:text-lg"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 1.08, ease: EASE }}
          >
            Explore profession-specific digital portfolios designed around the
            work, thinking, tools and career direction of emerging graduates —
            from engineering and computing to science, information, education,
            agriculture and the social sciences.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
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

          <motion.p
            className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-tertiary"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 1.34, ease: EASE }}
          >
            One degree, different futures —{" "}
            <CrossFadeText
              keyPrefix="futures"
              items={degreeFutures.map((d) => `${d.degree} → ${d.futures}`)}
              interval={2800}
              className="text-brass/90"
            />
          </motion.p>
        </div>

        {/* Portfolio stack — pointer-tilted, glare-tracked */}
        <motion.div
          className="relative z-10 [perspective:1400px]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.94 }}
          animate={introDone ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          onPointerMove={onStackMove}
          onPointerLeave={onStackLeave}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-cursor="view"
        >
          <motion.div
            className="relative mx-auto aspect-[12/13] w-full max-w-[24.5rem] lg:max-w-[23rem]"
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          >
            {[0, 1, 2].map((offset) => {
              const idx = (active + offset) % stackPortfolios.length;
              const p = stackPortfolios[idx];
              const isFront = offset === 0;
              return (
                <motion.div
                  key={p.slug}
                  position="absolute"
                  className="absolute inset-0"
                  style={{ zIndex: 10 - offset }}
                  initial={false}
                  animate={
                    reduce
                      ? { opacity: isFront ? 1 : 0, scale: 1, y: 0, x: 0, rotate: 0 }
                      : {
                          opacity: isFront ? 1 : offset === 1 ? 0.66 : 0.36,
                          scale: 1 - offset * 0.06,
                          y: offset * 14 + (offset > 0 ? 10 : 0),
                          x: offset === 1 ? -26 : offset === 2 ? 26 : 0,
                          rotate: offset === 1 ? -4.5 : offset === 2 ? 4 : 0,
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

          {/* Active label */}
          <div className="mt-6 flex items-center justify-between gap-4">
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
            <Link
              to={`/portfolio/${activeP.slug}`}
              className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-brass"
            >
              View
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stat strip + scroll cue */}
      <div className="relative z-10 border-t border-hairline/60 bg-background/40 backdrop-blur-sm">
        <div className="shell flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
          <Stat value={`${portfolios.length}`} label="Portfolio concepts" refCb={(el) => { if (el) statRefs.current[0] = el; }} />
          <Stat value="6" label="Schools" refCb={(el) => { if (el) statRefs.current[1] = el; }} />
          <Stat value="40" suffix="+" label="Degree paths" refCb={(el) => { if (el) statRefs.current[2] = el; }} />
          <Stat value="1" label="University collection" refCb={(el) => { if (el) statRefs.current[3] = el; }} />
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink-tertiary">
              Scroll
            </span>
            <span className="scroll-cue-line h-9" aria-hidden />
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
  refCb,
}: {
  value: string;
  label: string;
  suffix?: string;
  refCb?: (el: HTMLSpanElement | null) => void;
}) {
  const num = value.replace(/[^\d]/g, "");
  return (
    <span className="flex items-baseline gap-2">
      <span
        ref={refCb}
        data-target={num}
        className="font-display text-xl font-bold tracking-tight text-brass"
      >
        {num}{suffix}
      </span>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-secondary">
        {label}
      </span>
    </span>
  );
}

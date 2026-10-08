"use client";

/**
 * ProcessJourney — the method as a physical journey.
 * A winding brass river (SVG, pathLength-normalized) draws itself as you
 * scroll; each of the 7 steps ignites as the river reaches it — number
 * badge fills with brass, the card lifts with an expo curve, the title
 * brightens. The line meanders THROUGH the badge column, never straight —
 * and the draw itself is eased, so even the scrub has a curve.
 *
 * Geometry: on sm+ the river lives in a 6rem center gap between two
 * columns; its swing (±27px of an 80px viewBox width) passes exactly
 * through the badge centers on both banks. On mobile it runs through
 * the single left-aligned badge column.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/site";
import { Link } from "@/lib/router";

const RIVER_PATH =
  "M50,0 C78,70 22,120 50,200 C78,280 22,330 50,410 C78,490 22,540 50,620 C78,700 22,750 50,830 C78,910 22,950 50,1000";

export function ProcessPreview() {
  const riverRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // static: fully drawn river, all steps lit
      wrapRef.current
        ?.querySelectorAll<HTMLElement>("[data-step]")
        .forEach((s) => s.classList.add("step-lit"));
      if (riverRef.current) riverRef.current.style.strokeDashoffset = "0";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const river = riverRef.current;
    const wrap = wrapRef.current;
    if (!river || !wrap) return;

    const ctx = gsap.context(() => {
      /* The river draws itself — eased inside the scrub */
      gsap.fromTo(
        river,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: wrap,
            start: "top 72%",
            end: "bottom 62%",
            scrub: 0.7,
          },
        }
      );

      /* Steps ignite as the river reaches them */
      wrap.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 76%",
          onEnter: () => {
            step.classList.add("step-lit");
            gsap.fromTo(
              step,
              { y: 22, opacity: 0.55 },
              { y: 0, opacity: 1, duration: 0.85, ease: "expo.out" }
            );
            const badge = step.querySelector("[data-badge]");
            if (badge) {
              gsap.fromTo(
                badge,
                { scale: 0.6, rotate: -12 },
                { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2.2)" }
              );
            }
          },
          once: true,
        });
      });

      /* A glowing pulse that travels the river with the draw */
      const dot = wrap.querySelector<SVGCircleElement>("[data-pulse]");
      const len = river.getTotalLength();
      const proxy = { p: 0 };
      if (dot) {
        gsap.to(proxy, {
          p: 1,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: wrap,
            start: "top 72%",
            end: "bottom 62%",
            scrub: 0.9,
          },
          onUpdate: () => {
            const pt = river.getPointAtLength(len * proxy.p);
            dot.setAttribute("cx", String(pt.x));
            dot.setAttribute("cy", String(pt.y));
          },
        });
      }
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-chapter="process"
      aria-label="How GTSS builds a portfolio"
      className="relative border-b border-hairline/60 py-20 sm:py-28"
    >
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow-brass">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brass align-middle" aria-hidden />{" "}
            Chapter VIII — The method
          </p>
          <h2 className="display-section mt-4 text-foreground">
            We start with your evidence, not a theme.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-secondary sm:text-lg">
            We do not begin by choosing a theme. We begin by asking what
            somebody evaluating you needs to understand — then we build the
            portfolio backwards from that answer.
          </p>
        </div>

        <div ref={wrapRef} className="relative mt-16 sm:mt-20">
          {/* The winding river — meanders through the badge column */}
          <svg
            className="pointer-events-none absolute left-[1.7rem] top-0 h-full w-[5rem] sm:left-1/2 sm:-ml-[3rem] sm:w-[6rem]"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d={RIVER_PATH} fill="none" stroke="rgba(157,167,179,0.16)" strokeWidth="1.6" />
            <path
              ref={riverRef}
              d={RIVER_PATH}
              fill="none"
              stroke="url(#riverGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              style={{ filter: "drop-shadow(0 0 6px rgba(226,168,75,0.5))" }}
            />
            <defs>
              <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2a84b" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#e2a84b" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#e2a84b" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            {/* the traveling pulse */}
            <circle
              data-pulse
              r="4.5"
              fill="#e2a84b"
              cx="50"
              cy="0"
              style={{ filter: "drop-shadow(0 0 8px rgba(226,168,75,0.9))" }}
            />
          </svg>

          {/* The steps — alternating banks of the river */}
          <ol className="relative grid gap-12 sm:grid-cols-2 sm:gap-x-24 sm:gap-y-20 lg:gap-y-24">
            {processSteps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={step.num}
                  data-step
                  className={
                    "step relative pl-[6.5rem] sm:pl-0 " +
                    (right ? "" : "sm:text-right")
                  }
                  style={{ opacity: 0.55 }}
                >
                  <div
                    className={
                      right
                        ? "flex items-start gap-4"
                        : "flex flex-row-reverse items-start gap-4"
                    }
                  >
                    <span
                      data-badge
                      className="step-badge relative z-10 grid size-[2.4rem] shrink-0 place-items-center rounded-lg border border-hairline bg-surface font-mono text-[0.72rem] font-semibold text-ink-tertiary transition-colors duration-700"
                    >
                      {step.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold tracking-tight text-foreground/85 transition-colors duration-700 sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[0.85rem] leading-relaxed text-ink-secondary">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* The destination — styled as the final step of the journey */}
            <li className="relative pl-[6.5rem] sm:col-start-1 sm:pl-0 sm:text-right">
              <Link
                to="/how-it-works"
                className="group relative flex min-h-[7rem] w-full flex-col justify-center rounded-xl border border-dashed border-brass/40 bg-brass/[0.04] px-6 py-5 text-left transition-all duration-500 hover:border-brass/70 hover:bg-brass/[0.07]"
              >
                <span className="absolute right-5 top-1/2 grid size-[2.4rem] -translate-y-1/2 place-items-center rounded-lg border border-brass/50 bg-brass/10 font-mono text-[0.72rem] font-semibold text-brass transition-all duration-500 group-hover:bg-brass group-hover:text-brass-foreground">
                  08
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-foreground">
                  See the full process
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brass transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

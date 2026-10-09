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
const MOBILE_RIVER_PATH = "M50,0 L50,1000";

export function ProcessPreview() {
  const riverRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const river = riverRef.current;
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!river || !wrap) return;

    const isMobile = window.innerWidth < 640;
    const pathD = isMobile ? MOBILE_RIVER_PATH : RIVER_PATH;
    river.setAttribute("d", pathD);
    if (track) track.setAttribute("d", pathD);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // static: fully drawn river, all steps lit
      wrap
        .querySelectorAll<HTMLElement>("[data-step]")
        .forEach((s) => s.classList.add("step-lit"));
      river.style.strokeDashoffset = "0";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

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
            start: isMobile ? "top 80%" : "top 72%",
            end: isMobile ? "bottom 70%" : "bottom 62%",
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
              { y: 14, opacity: 0.85 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
            );
            const badge = step.querySelector("[data-badge]");
            if (badge) {
              gsap.fromTo(
                badge,
                { scale: 0.8, rotate: -6 },
                { scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.8)" }
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

        <div ref={wrapRef} className="relative mt-14 sm:mt-20">
          {/* The winding river — meanders through the badge column */}
          <svg
            className="pointer-events-none absolute left-[1.2rem] top-0 h-full w-[2.4rem] -translate-x-1/2 sm:left-1/2 sm:-ml-[3rem] sm:translate-x-0 sm:w-[6rem]"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path ref={trackRef} d={RIVER_PATH} fill="none" stroke="rgba(157,167,179,0.16)" strokeWidth="1.6" />
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

          {/* The steps — mobile left-spine, desktop alternating banks */}
          <ol className="relative grid gap-10 sm:grid-cols-2 sm:gap-x-24 sm:gap-y-20 lg:gap-y-24">
            {processSteps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={step.num}
                  data-step
                  className={
                    "step relative " +
                    (right ? "" : "sm:text-right")
                  }
                >
                  <div
                    className={`flex items-start gap-4 ${
                      right ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    <span
                      data-badge
                      className="step-badge relative z-10 grid size-[2.5rem] shrink-0 place-items-center rounded-lg border border-hairline bg-surface font-mono text-xs font-semibold text-brass transition-colors duration-500 shadow-sm"
                    >
                      {step.num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-bold tracking-tight text-foreground transition-colors duration-500 sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-secondary sm:mt-2">
                        {step.body}
                      </p>
                      <div className={`mt-2.5 inline-flex items-center gap-1.5 rounded border border-hairline/70 bg-raised/70 px-2.5 py-1 font-mono text-xs text-ink-secondary ${right ? "" : "sm:ml-auto"}`}>
                        <span className="font-semibold text-brass">Deliverable:</span>
                        <span>{step.outcome}</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* The destination — styled as the final step of the journey */}
            <li className="relative sm:col-start-1 sm:text-right">
              <Link
                to="/how-it-works"
                className="group relative flex min-h-[6.5rem] w-full flex-col justify-center rounded-xl border border-dashed border-brass/50 bg-brass/[0.05] py-5 pl-16 pr-5 text-left transition-all duration-300 hover:border-brass/80 hover:bg-brass/[0.09] sm:px-6 sm:py-5"
              >
                <span className="absolute left-4 top-1/2 grid size-[2.5rem] -translate-y-1/2 place-items-center rounded-lg border border-brass/60 bg-brass/15 font-mono text-xs font-semibold text-brass transition-all duration-300 group-hover:bg-brass group-hover:text-brass-foreground sm:left-auto sm:right-5">
                  08
                </span>
                <span className="font-display text-base font-bold tracking-tight text-foreground sm:pr-12 sm:text-lg">
                  Full 7-phase methodology &amp; terms
                </span>
                <span className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brass transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  Explore all 7 phases in detail →
                </span>
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

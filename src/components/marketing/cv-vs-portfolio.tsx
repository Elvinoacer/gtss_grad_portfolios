"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "@/lib/router";
import { cvComparison } from "@/lib/site";
import { SectionHeading, Reveal } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";

const examples = [
  { key: "project", trigger: "Final-year project", items: cvComparison.portfolio.items1 },
  { key: "attachment", trigger: "Industrial attachment", items: cvComparison.portfolio.items2 },
];

const PAPER_LINES = [
  ["w-[38%]", "w-[64%]"],
  ["w-[52%]", "w-[30%]"],
];

/**
 * "A CV says. A portfolio shows." — the transformation, drawn as a diagram:
 * one compressed line on a paper CV, a flowing brass connector, and the full
 * evidence it expands into inside a live portfolio. Switching the CV line
 * re-runs the same story for a different kind of graduate work (spec §23).
 */
export function CvVsPortfolio() {
  const [tab, setTab] = useState(0);
  const reduce = useReducedMotion();
  const example = examples[tab];

  return (
    <section
      aria-label="CV versus portfolio"
      data-chapter="numbers"
      className="relative overflow-hidden border-b border-hairline/60 py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-blueprint-fine opacity-60" aria-hidden />

      <div className="shell relative">
        <SectionHeading
          eyebrow="The strategic difference"
          title="A CV says. A portfolio shows."
          lead="Pick a CV line. Watch what it becomes."
        />

        {/* Line switcher */}
        <Reveal delay={0.08} className="mt-8 sm:mt-10">
          <div
            role="tablist"
            aria-label="CV line examples"
            className="flex w-full flex-col gap-1.5 rounded-lg border border-hairline bg-surface p-1.5 sm:inline-flex sm:w-auto sm:flex-row"
          >
            {examples.map((e, i) => (
              <button
                key={e.key}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                onKeyDown={(evt) => {
                  if (evt.key === "ArrowRight") {
                    setTab((i + 1) % examples.length);
                  } else if (evt.key === "ArrowLeft") {
                    setTab((i - 1 + examples.length) % examples.length);
                  }
                }}
                className={`relative min-h-[2.75rem] rounded-md px-4 py-2 text-center font-mono text-xs uppercase tracking-[0.14em] font-medium transition-colors ${
                  tab === i ? "text-brass-foreground font-semibold" : "text-ink-secondary hover:text-foreground"
                }`}
              >
                {tab === i && (
                  <motion.span
                    layoutId="cv-tab"
                    className="absolute inset-0 rounded-md bg-brass"
                    transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative z-10">“{e.trigger}”</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* The transformation diagram */}
        <div className="mt-10 grid items-center gap-5 lg:mt-14 lg:grid-cols-[0.92fr_6.5rem_1.18fr] lg:gap-4">
          {/* ——— The paper CV ——— */}
          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[21rem]">
            <div
              className="relative -rotate-[1.4deg] rounded-[4px] bg-[#EBE7DE] px-6 pb-7 pt-6 shadow-[0_36px_80px_-28px_rgba(0,0,0,0.85),0_2px_0_rgba(255,255,255,0.35)_inset] transition-transform duration-500 hover:rotate-0 sm:px-7"
              aria-hidden
            >
              {/* letterhead */}
              <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.3em] text-[#8f8a80]">
                Curriculum Vitae
              </p>
              <div className="mt-3 space-y-2">
                {PAPER_LINES.flat().map((w, i) => (
                  <div key={`l-${i}`} className={`h-[5px] rounded-full bg-[#c9c3b8] ${w}`} />
                ))}
              </div>

              {/* THE line — the whole argument, highlighted */}
              <div className="relative mt-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={example.key}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-[3px] bg-brass px-3.5 py-2.5 font-sans text-[0.95rem] font-semibold italic tracking-tight text-brass-foreground shadow-[0_10px_26px_-10px_rgba(226,168,75,0.65)]"
                  >
                    “{example.trigger}”
                    <span className="absolute -right-1.5 -top-1.5 size-3 rounded-full border-2 border-[#EBE7DE] bg-brass-foreground/80" aria-hidden />
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* fading lines below */}
              <div className="mt-6 space-y-2 opacity-60">
                <div className="h-[5px] w-[58%] rounded-full bg-[#c9c3b8]" />
                <div className="h-[5px] w-[44%] rounded-full bg-[#c9c3b8]" />
              </div>

              <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#a29c91]">
                1 compressed line
              </p>
            </div>
          </Reveal>

          {/* ——— The connector ——— */}
          <Reveal delay={0.2} className="flex items-center justify-center">
            <div className="relative flex flex-col items-center gap-2 lg:flex-row lg:gap-3" aria-hidden>
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brass">
                becomes
              </span>
              {/* flowing dash line — horizontal on desktop, vertical on mobile */}
              <svg
                className="h-14 w-10 text-brass lg:h-10 lg:w-full lg:min-w-[4.5rem]"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* mobile: vertical */}
                <path d="M50,2 L50,86" className="flow-line lg:hidden" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                {/* desktop: horizontal */}
                <path d="M0,50 L86,50" className="flow-line hidden lg:block" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              <span className="grid size-8 place-items-center rounded-full border border-brass/40 bg-brass/10 text-brass">
                <ArrowRight className="hidden size-4 lg:block" />
                <ArrowDown className="size-4 lg:hidden" />
              </span>
            </div>
          </Reveal>

          {/* ——— The live portfolio ——— */}
          <Reveal delay={0.28}>
            <div className="relative overflow-hidden rounded-xl border border-brass/30 bg-gradient-to-br from-brass/[0.07] via-surface to-surface shadow-[0_40px_90px_-32px_rgba(0,0,0,0.85)]">
              {/* browser chrome */}
              <div className="relative flex items-center gap-2.5 border-b border-hairline/80 bg-raised/80 px-4 py-2.5">
                <span className="flex items-center gap-1.5" aria-hidden>
                  <span className="size-2 rounded-full bg-[#ff5f57]/80" />
                  <span className="size-2 rounded-full bg-[#febc2e]/80" />
                  <span className="size-2 rounded-full bg-[#28c840]/80" />
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md border border-hairline/70 bg-background/70 px-3 py-1 font-mono text-[0.68rem] text-ink-secondary">
                  <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  your-name.portfolios.gtss.software
                </span>
                <span className="shrink-0 rounded-[4px] border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  Live
                </span>
              </div>

              {/* evidence body */}
              <div className="relative p-5 sm:p-7">
                <div className="relative flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brass">
                    The portfolio evidence
                  </span>
                  <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-secondary">
                    {example.items.length} dimensions
                  </span>
                </div>

                <Stagger className="mt-5">
                  <div className="grid content-center gap-2.5 sm:grid-cols-2">
                    {example.items.map((item) => (
                      <StaggerItem key={item}>
                        <div className="group flex items-center gap-3 rounded-lg border border-hairline/70 bg-raised/50 px-4 py-3 transition-colors hover:border-brass/40 hover:bg-raised">
                          <ArrowRight className="size-3.5 shrink-0 text-brass/70 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                          <span className="text-sm font-medium text-foreground/90">{item}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </Stagger>

                <p className="mt-6 border-t border-brass/20 pt-4 text-sm leading-relaxed text-ink-secondary">
                  Your CV stays. The portfolio makes its strongest lines{" "}
                  <Link to="/how-it-works" className="link-sweep text-brass font-medium">
                    provable
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

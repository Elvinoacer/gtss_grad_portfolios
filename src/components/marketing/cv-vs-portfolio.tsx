"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, LayoutGrid, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { cvComparison } from "@/lib/site";
import { SectionHeading, Reveal } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";

const examples = [
  { key: "project", trigger: "“Final-year project”", items: cvComparison.portfolio.items1 },
  { key: "attachment", trigger: "“Industrial attachment”", items: cvComparison.portfolio.items2 },
];

/** "A CV says. A portfolio shows." — interactive comparison (spec §23) */
export function CvVsPortfolio() {
  const [tab, setTab] = useState(0);
  const reduce = useReducedMotion();
  const example = examples[tab];

  return (
    <section
      aria-label="CV versus portfolio"
      data-chapter="numbers"
      className="relative border-b border-hairline/60 py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="The strategic difference"
          title="A CV says you did the work. A portfolio lets people see how you think."
          lead={cvComparison.portfolio.note}
        />

        {/* Tabs */}
        <Reveal delay={0.1} className="mt-8 sm:mt-10">
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
                <span className="relative z-10">
                  CV reads: {e.trigger}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Comparison panels */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* CV panel */}
          <Reveal delay={0.15}>
            <div className="relative flex h-full min-h-[14rem] sm:min-h-[21rem] flex-col overflow-hidden rounded-xl border border-hairline bg-surface/60 p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-secondary">
                  <FileText className="size-4" aria-hidden /> The CV line
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-tertiary">
                  1 compressed line
                </span>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center py-6 sm:py-10">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={example.key}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="text-center"
                  >
                    <p className="font-display text-2xl sm:text-3xl font-semibold italic tracking-tight text-foreground/90">
                      {example.trigger}
                    </p>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <p className="border-t border-hairline/70 pt-4 text-sm leading-relaxed text-ink-secondary">
                {cvComparison.cv.note}
              </p>
            </div>
          </Reveal>

          {/* Portfolio panel */}
          <Reveal delay={0.22}>
            <div className="relative flex h-full min-h-[18rem] sm:min-h-[21rem] flex-col overflow-hidden rounded-xl border border-brass/25 bg-gradient-to-br from-brass/[0.07] via-surface to-surface p-5 sm:p-7">
              <div className="absolute inset-0 bg-blueprint-fine opacity-40" aria-hidden />
              <div className="relative flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-brass font-semibold">
                  <LayoutGrid className="size-4" aria-hidden /> The portfolio evidence
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-secondary font-medium">
                  {example.items.length} dimensions
                </span>
              </div>

              <Stagger className="relative flex-1 py-6">
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

              <div className="relative border-t border-brass/20 pt-4">
                <p className="text-sm leading-relaxed text-ink-secondary">
                  A portfolio does not replace your CV. It gives the strongest
                  lines in your CV somewhere to{" "}
                  <Link to="/how-it-works" className="link-sweep text-brass font-medium">
                    prove themselves
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

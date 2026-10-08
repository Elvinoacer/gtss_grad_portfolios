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
        <Reveal delay={0.1} className="mt-10">
          <div
            role="tablist"
            aria-label="CV line examples"
            className="inline-flex flex-wrap gap-2 rounded-lg border border-hairline bg-surface p-1.5"
          >
            {examples.map((e, i) => (
              <button
                key={e.key}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`relative min-h-[2.75rem] rounded-md px-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors ${
                  tab === i ? "text-brass-foreground" : "text-ink-secondary hover:text-foreground"
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
            <div className="relative flex h-full min-h-[21rem] flex-col overflow-hidden rounded-xl border border-hairline bg-surface/60 p-7">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-tertiary">
                  <FileText className="size-3.5" aria-hidden /> The CV line
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-tertiary">
                  1 line
                </span>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center py-10">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={example.key}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="text-center"
                  >
                    <p className="font-display text-2xl font-semibold italic tracking-tight text-ink-secondary/80">
                      {example.trigger}
                    </p>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <p className="border-t border-hairline/70 pt-4 text-[0.78rem] leading-relaxed text-ink-tertiary">
                {cvComparison.cv.note}
              </p>
            </div>
          </Reveal>

          {/* Portfolio panel */}
          <Reveal delay={0.22}>
            <div className="relative flex h-full min-h-[21rem] flex-col overflow-hidden rounded-xl border border-brass/25 bg-gradient-to-br from-brass/[0.07] via-surface to-surface p-7">
              <div className="absolute inset-0 bg-blueprint-fine opacity-40" aria-hidden />
              <div className="relative flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-brass">
                  <LayoutGrid className="size-3.5" aria-hidden /> The portfolio
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-tertiary">
                  {example.items.length} dimensions
                </span>
              </div>

              <Stagger className="relative flex-1 py-6">
                <div className="grid content-center gap-2.5 sm:grid-cols-2">
                  {example.items.map((item) => (
                    <StaggerItem key={item}>
                      <div className="group flex items-center gap-3 rounded-lg border border-hairline/70 bg-raised/50 px-4 py-3 transition-colors hover:border-brass/40 hover:bg-raised">
                        <ArrowRight className="size-3.5 shrink-0 text-brass/70 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                        <span className="text-sm text-foreground/90">{item}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </Stagger>

              <div className="relative border-t border-brass/20 pt-4">
                <p className="text-[0.78rem] leading-relaxed text-ink-secondary">
                  A portfolio does not replace your CV. It gives the strongest
                  lines in your CV somewhere to{" "}
                  <Link to="/how-it-works" className="link-sweep text-brass">
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

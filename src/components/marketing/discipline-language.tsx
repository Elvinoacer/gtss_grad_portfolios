"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { schools } from "@/content/schools";
import { Link } from "@/lib/router";
import { SectionHeading, Reveal } from "@/components/gtss/ui";
import { MotifField } from "@/components/portfolio/motifs";

/** "Built around your discipline" — same purpose, different professional language (spec §45) */
export function DisciplineLanguage() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const school = schools[active];

  const picks: Array<{ label: string; idx: number; motif: string; keywords: string[]; line: string }> = [
    { label: "Civil Engineering", idx: 0, motif: "blueprint", keywords: ["Drawings", "Structures", "Fieldwork", "Calculations"], line: "Blueprint logic, load paths, measured evidence." },
    { label: "Computer Science", idx: 1, motif: "system", keywords: ["Architecture", "Code", "Systems", "Deployment"], line: "Systems, trade-offs, tests, engineering judgment." },
    { label: "Actuarial Science", idx: 1, motif: "distribution", keywords: ["Models", "Assumptions", "Risk", "Analysis"], line: "Quantitative language, validation, honest numbers." },
    { label: "Communication", idx: 2, motif: "editorial", keywords: ["Campaigns", "Writing", "Media", "Audience"], line: "Editorial layouts, bylines with thinking behind them." },
    { label: "Education", idx: 3, motif: "pedagogy", keywords: ["Lesson design", "Practice", "Assessment"], line: "Teaching thinking made visible and inspectable." },
    { label: "Agriculture", idx: 4, motif: "field", keywords: ["Field evidence", "Production", "Agribusiness"], line: "Field systems, value chains, sustainability data." },
  ];
  const pick = picks[active];
  const targetSchool = schools[pick.idx];

  return (
    <section aria-label="Built around your discipline" className="relative overflow-hidden border-b border-hairline/60 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="No generic student template"
          title="Same purpose. Different professional language."
          lead="Every discipline gets its own visual logic — not a web-developer template wearing a different color."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Discipline selector */}
          <Reveal>
            <div
              role="tablist"
              aria-label="Choose a discipline"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-3 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {picks.map((d, i) => (
                <button
                  key={d.label}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`group flex shrink-0 items-center justify-between rounded-lg border px-4 py-2.5 text-left transition-all duration-300 lg:w-full lg:min-h-[3.4rem] lg:px-5 lg:py-3 ${
                    active === i
                      ? "border-brass/60 bg-brass/10 shadow-[0_0_16px_rgba(226,168,75,0.15)]"
                      : "border-hairline bg-surface/40 hover:border-ink-tertiary hover:bg-surface"
                  }`}
                >
                  <span className={`font-display text-sm sm:text-base font-semibold tracking-tight whitespace-nowrap ${active === i ? "text-foreground" : "text-ink-secondary"}`}>
                    {d.label}
                  </span>
                  <span className="hidden gap-1.5 sm:flex sm:ml-4" aria-hidden>
                    {d.keywords.slice(0, 2).map((k) => (
                      <span
                        key={k}
                        className={`rounded-[4px] border px-2 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.08em] ${
                          active === i ? "border-brass/40 text-brass/90" : "border-hairline text-ink-secondary"
                        }`}
                      >
                        {k}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Live language panel */}
          <Reveal delay={0.12}>
            <div className="relative h-full min-h-[24rem] overflow-hidden rounded-xl border border-hairline bg-surface">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pick.label}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0" style={{ color: targetSchool.accent }}>
                    <MotifField motif={pick.motif as never} className="opacity-[0.16]" />
                  </div>
                  <div className="relative flex h-full flex-col p-7 sm:p-9">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em]" style={{ color: targetSchool.accent }}>
                      {pick.label} → visual language
                    </p>
                    <p className="mt-5 max-w-md font-display text-2xl font-bold leading-tight tracking-tight text-foreground">
                      {pick.line}
                    </p>

                    <div className="mt-7 grid gap-2 sm:grid-cols-2">
                      {pick.keywords.map((k, i) => (
                        <motion.div
                          key={k}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                          className="flex items-center gap-2.5 rounded-lg border border-hairline/70 bg-raised/50 px-4 py-3"
                        >
                          <span className="size-1.5 rounded-[2px]" style={{ background: targetSchool.accent }} aria-hidden />
                          <span className="text-sm text-ink-secondary">{k}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto pt-7">
                      <p className="text-[0.8rem] leading-relaxed text-ink-secondary">
                        Portfolio structure: {targetSchool.sections.slice(0, 4).join(" · ")}
                      </p>
                      <Link
                        to={`/universities/moi-university/schools/${targetSchool.slug}`}
                        className="link-sweep mt-4 inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-brass"
                      >
                        See the {targetSchool.shortName} world
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

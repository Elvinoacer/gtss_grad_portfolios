"use client";

import { ArrowRight, Users, BookOpen, LayoutGrid, Award, Presentation } from "lucide-react";
import { Link, usePageTitle } from "@/lib/router";
import { SectionHeading, Reveal } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";

/** For Departments — cohort offering (spec §75-76) */
export function ForDepartmentsView() {
  usePageTitle("For Departments");

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-16 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <p className="eyebrow-brass">For departments & cohorts</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.0] tracking-tight text-foreground">
            Give a graduating cohort a stronger way to present its work.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            Final-year exhibitions show projects for a day. A GTSS cohort
            collection keeps them inspectable — by employers, panels and the
            world — long after the posters come down.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60] shadow-[0_8px_24px_-8px_rgba(226,168,75,0.4)]"
            >
              Talk to GTSS about a cohort
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="shell pt-16" aria-label="Cohort service">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="The service"
              title="A department collection, individual by design."
              lead="Each candidate remains individual — no identical themes — while the cohort shares one quality bar and one discoverable home."
              className="max-w-xl"
            />
            <Reveal delay={0.2}>
              <div className="mt-8 rounded-xl border border-hairline bg-surface/50 p-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brass">
                  Example structure
                </p>
                <pre className="mt-4 whitespace-pre-wrap font-mono text-[0.72rem] leading-relaxed text-ink-secondary">
{`GTSS Graduate Portfolios
└ Moi University
  └ School of Engineering
    └ Class of 2027
      ├ Candidate A — structural
      ├ Candidate B — power systems
      └ Candidate C — manufacturing`}
                </pre>
              </div>
            </Reveal>
          </div>

          <Stagger className="space-y-3">
            {[
              {
                icon: Users,
                title: "Structured candidate intake",
                body: "A guided evidence process for every student in the cohort — the same questions a studio would ask a private client.",
              },
              {
                icon: BookOpen,
                title: "Portfolio guidelines",
                body: "Discipline-aligned standards so capstone projects, research and practicum evidence are presented consistently and truthfully.",
              },
              {
                icon: LayoutGrid,
                title: "Department collection page",
                body: "A curated directory of the cohort's portfolios — filterable by specialization, searchable by skill.",
              },
              {
                icon: Award,
                title: "Project showcase",
                body: "Capstone and final-year projects given the case-study treatment they deserve.",
              },
              {
                icon: Presentation,
                title: "Exhibition-ready",
                body: "QR-linked posters for graduation and departmental exhibitions — one scan opens the full story.",
              },
            ].map((s) => (
              <StaggerItem key={s.title}>
                <div className="flex gap-5 rounded-xl border border-hairline bg-surface/50 p-6">
                  <s.icon className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
                  <div>
                    <h3 className="font-display text-base font-bold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-secondary">{s.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="shell mt-20" aria-label="Note">
        <Reveal>
          <p className="rounded-xl border border-hairline bg-surface/50 p-6 text-[0.85rem] leading-relaxed text-ink-tertiary">
            GTSS Graduate Portfolios is an independent initiative. Department
            collections are offered as a service to academic communities — no
            official university partnership is implied unless a formal
            agreement exists.
          </p>
        </Reveal>
      </section>
    </div>
  );
}

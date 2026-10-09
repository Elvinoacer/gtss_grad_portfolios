"use client";

import Image from "next/image";
import { ArrowRight, Check, FileText, Layers, Compass, Sparkles } from "lucide-react";
import { Link, usePageTitle } from "@/lib/router";
import { SectionHeading, Reveal } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";

/** For Graduates — the reassurance page (spec §10.1) */
export function ForGraduatesView() {
  usePageTitle("For Graduates");

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-16 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <p className="eyebrow-brass">For graduates</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.0] tracking-tight text-foreground">
            Can GTSS make me look professional — without pretending I have ten
            years of experience?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            Yes. That question is exactly what this platform is designed
            around: credible early-career positioning, real evidence,
            professional presentation. Nothing inflated.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/request"
              className="group inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60] shadow-[0_8px_24px_-8px_rgba(226,168,75,0.4)]"
            >
              Request my portfolio
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              to="/portfolios"
              className="inline-flex h-12 w-full sm:w-auto justify-center items-center rounded-md border border-hairline px-6 font-sans text-sm font-semibold tracking-tight text-foreground transition-all duration-300 hover:border-ink-tertiary hover:bg-raised"
            >
              See examples from my course
            </Link>
          </div>
        </div>
      </section>

      {/* The reassurance blocks */}
      <section className="shell pt-16" aria-label="What GTSS handles">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="What we handle for you"
              title="You bring the work. We make it legible."
              className="max-w-xl"
            />
            <Stagger className="mt-8 space-y-3">
              {[
                {
                  title: "Selection",
                  body: "We identify which of your projects, courses and attachments deserve case studies — and what to leave out.",
                },
                {
                  title: "Structure",
                  body: "Context, problem, your role, process, evidence, result, learning. The hierarchy employers actually read.",
                },
                {
                  title: "Writing",
                  body: "Professional copy that sounds like you on a good day — specific, concrete, honest.",
                },
                {
                  title: "Design",
                  body: "A discipline-specific visual system, mobile-first build, and a link you're proud to send.",
                },
              ].map((b) => (
                <StaggerItem key={b.title}>
                  <div className="flex gap-4 rounded-xl border border-hairline bg-surface/50 p-5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight text-foreground">
                        {b.title}
                      </h3>
                      <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-secondary">{b.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl border border-hairline">
              <Image
                src="/images/campus.jpg"
                alt="University students walking together on campus at golden hour"
                width={1600}
                height={963}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-full w-full object-cover"
                style={{ filter: "saturate(0.7) contrast(1.05)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" aria-hidden />
              <p className="absolute bottom-5 left-6 right-6 font-display text-xl font-bold tracking-tight text-foreground">
                “I don't have enough experience” is not a blocker.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What a portfolio includes */}
      <section className="shell mt-20" aria-label="Portfolio contents">
        <SectionHeading
          eyebrow="The anatomy"
          title="What a graduate portfolio includes."
          className="max-w-2xl"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Positioning",
              body: "Who you're becoming professionally, stated with enough precision that a recruiter can place you.",
            },
            {
              icon: Layers,
              title: "Case studies",
              body: "Projects told end-to-end: problem, constraints, your role, decisions, evidence, result, lessons.",
            },
            {
              icon: FileText,
              title: "Evidence layer",
              body: "Drawings, code, data, reports, writing, certifications — linked, labelled and honest.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-hairline bg-surface/50 p-7">
                <c.icon className="size-5 text-brass" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-foreground">{c.title}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-secondary">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing note (spec §42) */}
      <section className="shell mt-20" aria-label="Options">
        <Reveal>
          <div className="rounded-2xl border border-hairline bg-surface/50 p-8 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow-brass">Options</p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
                  Request a quote, not a price list.
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-secondary">
                  Portfolio scope varies — a single-page starter and a full
                  signature build are different projects. GTSS quotes after
                  understanding your evidence and direction. No crossed-out
                  prices, no false scarcity.
                </p>
              </div>
              <Link
                to="/request"
                className="group inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60] shadow-[0_8px_24px_-8px_rgba(226,168,75,0.4)]"
              >
                <Sparkles className="size-4" aria-hidden />
                See portfolio options
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageSquare, ShieldCheck, Smartphone, QrCode, Search, TrendingUp } from "lucide-react";
import { processSteps } from "@/lib/site";
import { Link, usePageTitle } from "@/lib/router";
import { SectionHeading, Reveal } from "@/components/gtss/ui";

/** How It Works — the seven-step story (spec §44) */
export function HowItWorksView() {
  usePageTitle("How It Works");
  const reduce = useReducedMotion();

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-16 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <p className="eyebrow-brass">How it works</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.0] tracking-tight text-foreground">
            We start with your evidence, not a theme.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            We do not begin by choosing a theme. We begin by asking what
            somebody evaluating you needs to understand. Seven steps stand
            between your scattered work and a professional identity people can
            explore.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="shell pt-16" aria-label="The seven steps">
        <div className="relative">
          <div className="absolute left-[1.07rem] top-2 h-[calc(100%-1rem)] w-px bg-hairline/60" aria-hidden>
            <motion.div
              className="h-full w-px origin-top bg-gradient-to-b from-brass via-brass/60 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <ol className="space-y-10">
            {processSteps.map((step, i) => (
              <li key={step.num}>
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-6"
                >
                  <span className="relative z-10 grid size-[2.15rem] shrink-0 place-items-center rounded-md border border-hairline bg-surface font-mono text-[0.7rem] font-semibold text-brass">
                    {step.num}
                  </span>
                  <div className="max-w-2xl">
                    <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {step.title}
                    </h2>
                    <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-secondary">
                      {step.body}
                    </p>
                    {step.outcome && (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded border border-hairline/70 bg-raised/70 px-2.5 py-1 font-mono text-xs text-ink-secondary">
                        <span className="font-semibold text-brass">Deliverable:</span>
                        <span>{step.outcome}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you get */}
      <section className="shell mt-20" aria-label="What you get">
        <SectionHeading
          eyebrow="The deliverable"
          title="One link. Many career conversations."
          lead="A portfolio built to be shared — fast on mobile, honest in its claims, and designed to keep working long after graduation."
          className="max-w-2xl"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Smartphone,
              title: "Mobile-first & fast",
              body: "Most first impressions happen on WhatsApp. Your portfolio loads fast and reads beautifully on a phone.",
            },
            {
              icon: Search,
              title: "Search-friendly",
              body: "Built to surface when someone searches your name and discipline — a professional asset beyond graduation.",
            },
            {
              icon: QrCode,
              title: "QR-ready",
              body: "Optional QR code for your printed CV, business card or final-year exhibition poster.",
            },
            {
              icon: ShieldCheck,
              title: "Truthful by design",
              body: "Verified, placeholder, example and optional content are explicitly labelled. Credibility is the product.",
            },
            {
              icon: MessageSquare,
              title: "Contact under your control",
              body: "You decide what's public — email behind a form, phone hidden, exact location generalized.",
            },
            {
              icon: TrendingUp,
              title: "Grows with you",
              body: "The architecture is designed to evolve as attachments become experience and projects become practice.",
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-hairline bg-surface/50 p-6">
                <f.icon className="size-5 text-brass" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-secondary">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="shell mt-20" aria-label="Start">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-brass/40 bg-brass/[0.04] p-10 text-center sm:p-14">
            <div className="absolute inset-0 bg-blueprint-fine opacity-25" aria-hidden />
            <div className="relative">
              <h3 className="mx-auto max-w-xl font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Start with the story you already have.
              </h3>
              <Link
                to="/request"
                className="group mt-8 inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-7 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60]"
              >
                Request My Portfolio
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

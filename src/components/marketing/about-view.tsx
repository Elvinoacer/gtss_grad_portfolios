"use client";

import { ArrowRight, Code2, Compass, Layers, ShieldCheck } from "lucide-react";
import { Link, usePageTitle } from "@/lib/router";
import { SectionHeading, Reveal } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";
import { portfolios } from "@/content/portfolios";
import { site } from "@/lib/site";

/** About GTSS — the studio behind the collection (spec §10.5) */
export function AboutView() {
  usePageTitle("About");

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-16 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <p className="eyebrow-brass">The studio</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.0] tracking-tight text-foreground">
            This platform is also GTSS showing what GTSS can build.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            GTSS Graduate Portfolios is an independent initiative by GTSS — a
            software studio that designs and builds digital products. The hub
            itself demonstrates the studio's product design, engineering,
            content architecture and technical storytelling.
          </p>
        </div>
      </section>

      <section className="shell pt-16" aria-label="What GTSS does">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Beyond portfolios"
            title="Building something beyond your portfolio?"
            lead="The same studio builds business websites, web applications and software systems."
            className="max-w-xl"
          />
          <Stagger className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Code2, title: "Web applications", body: "Product engineering, end to end." },
              { icon: Layers, title: "Business websites", body: "Presence that earns trust." },
              { icon: Compass, title: "Digital products", body: "From concept to launch." },
              { icon: ShieldCheck, title: "Software systems", body: "Tools that hold up under load." },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <a
                  href="https://gtss.software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between rounded-xl border border-hairline bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink-tertiary"
                >
                  <c.icon className="size-5 text-brass" aria-hidden />
                  <div className="mt-5">
                    <h3 className="font-display text-base font-bold tracking-tight text-foreground group-hover:text-brass">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-[0.82rem] text-ink-secondary">{c.body}</p>
                  </div>
                  <span className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-tertiary transition-colors group-hover:text-brass">
                    Explore GTSS ↗
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="shell mt-20" aria-label="The principles">
        <SectionHeading
          eyebrow="The principles"
          title="Fifteen non-negotiables, kept daily."
          lead="A few that shape everything you see on this platform."
          className="max-w-2xl"
        />
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Evidence over invention",
              body: "Professional presentation must never require fabricated professional history. Every demo is labelled; every claim is checked.",
            },
            {
              title: "The discipline leads",
              body: "Engineering should feel like engineering. Actuarial work should feel quantitative. The master site must never make every graduate look the same.",
            },
            {
              title: "The graduate owns the identity",
              body: "GTSS is the authoring studio, never the protagonist. The candidate leads; the studio signs quietly at the edge.",
            },
            {
              title: "Quality bar",
              body: `The hub must match or exceed the strongest individual portfolio. Today: ${portfolios.length} concepts, growing course by course.`,
            },
            {
              title: "Small is honest",
              body: "Real counts only. No fake counters, no invented testimonials, no implied university endorsement.",
            },
            {
              title: "Performance is brand",
              body: "Fast, accessible, mobile-first. A premium experience that loads slowly is not premium.",
            },
          ].map((p, i) => (
            <StaggerItem key={p.title}>
              <div className="h-full rounded-xl border border-hairline bg-surface/50 p-6">
                <p className="font-mono text-[0.62rem] text-brass">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-secondary">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell mt-20" aria-label="Contact CTA">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-brass/40 bg-brass/[0.04] p-10 text-center sm:p-14">
            <div className="absolute inset-0 bg-blueprint-fine opacity-25" aria-hidden />
            <div className="relative">
              <h3 className="mx-auto max-w-xl font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Talk to the studio.
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-[0.95rem] leading-relaxed text-ink-secondary">
                Portfolios, platforms, products — the conversation starts the
                same way: what are you trying to make legible?
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-7 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60]"
                >
                  Contact GTSS
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-md border border-hairline px-7 font-sans text-sm font-semibold tracking-tight text-foreground transition-all duration-300 hover:bg-raised"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

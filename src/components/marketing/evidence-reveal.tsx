"use client";

import Image from "next/image";
import { evidenceCards } from "@/lib/site";
import { Link } from "@/lib/router";
import { SectionHeading, Reveal } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";
import { ArrowRight } from "lucide-react";

/** "You probably have more to show than you think" (spec §46) */
export function EvidenceReveal() {
  return (
    <section aria-label="Evidence you already have" className="relative overflow-hidden border-b border-hairline/60 py-20 sm:py-28">
      <div className="absolute inset-0 bg-vignette" aria-hidden />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              brassEyebrow
              eyebrow="The most common blocker"
              title={"\u201CI don't have enough experience yet.\u201D"}
              lead="You may have more evidence than you think. Every item below can anchor a professional portfolio — truthfully, without inventing a single thing."
            />
            <Reveal delay={0.25}>
              <blockquote className="mt-8 border-l-2 border-brass/60 pl-5">
                <p className="text-[0.95rem] leading-relaxed text-ink-secondary">
                  The job is not to invent experience. The job is to present
                  the experience you already have with clarity.
                </p>
              </blockquote>
              <Link
                to="/request"
                className="group mt-8 inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60]"
              >
                See what could go into mine
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <div>
            {/* photo anchor */}
            <Reveal>
              <div className="relative overflow-hidden rounded-xl border border-hairline">
                <Image
                  src="/images/graduates.jpg"
                  alt="University graduates celebrating at a graduation ceremony"
                  width={1200}
                  height={785}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-56 w-full object-cover sm:h-64"
                  style={{ filter: "saturate(0.75) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" aria-hidden />
                <p className="absolute bottom-4 left-5 right-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-secondary">
                  Evidence, not invention — the platform-wide rule
                </p>
              </div>
            </Reveal>

            <Stagger className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {evidenceCards.map((e) => (
                <StaggerItem key={e}>
                  <div className="group flex min-h-[3.6rem] items-center gap-2.5 rounded-lg border border-hairline/80 bg-surface/70 px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/40 hover:bg-raised">
                    <span className="size-1.5 shrink-0 rounded-full bg-brass/70 transition-colors group-hover:bg-brass" aria-hidden />
                    <span className="text-[0.8rem] leading-tight text-ink-secondary group-hover:text-foreground">
                      {e}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

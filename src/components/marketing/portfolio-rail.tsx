"use client";

import { schools } from "@/content/schools";
import { Link } from "@/lib/router";
import { VelocityMarquee } from "@/components/elite/velocity-marquee";
import { collectionStats } from "@/lib/site";
import { ArrowRight } from "lucide-react";

/**
 * The living collection — a velocity-reactive kinetic rail.
 * Giant editorial type that accelerates with your scroll, flips direction
 * when you scroll back, and leans into the motion. The discipline index
 * as typography-as-image.
 */

const disciplineWords = [
  "Structural Engineering",
  "Computer Science",
  "Actuarial Science",
  "Telecommunications",
  "Electronics Engineering",
  "Industrial & Textile",
  "Biochemistry",
  "Chemical & Process",
  "Mechanical & Production",
  "Civil Systems",
];

function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-[0.32em] shrink-0 ${className}`}
      aria-hidden
    >
      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="2"
        transform="rotate(45 12 12)"
        fill="currentColor"
      />
    </svg>
  );
}

export function PortfolioRail() {
  return (
    <section
      aria-label="Disciplines in the collection"
      data-chapter="kinetic"
      className="relative overflow-hidden border-b border-hairline/60 bg-surface/40 py-10 sm:py-12"
    >
      {/* top fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      />

      <div className="shell mb-6 sm:mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow-brass">
            <span
              className="mr-3 inline-block h-px w-6 translate-y-[-4px] bg-brass/60"
              aria-hidden
            />
            The living collection
          </p>
          <h2 className="display-section mt-3 max-w-2xl text-foreground">
            Every discipline,{" "}
            <span className="serif-accent text-brass">a visual language.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-2 max-w-md">
          <p className="text-sm leading-relaxed text-ink-secondary">
            {collectionStats.totalDegrees} degree paths mapped across {schools.length} schools, each translated into a portfolio that
            speaks its profession's dialect — evidence, order and craft.
          </p>
          <Link
            to="/universities/moi-university"
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brass hover:underline"
          >
            Explore all {collectionStats.totalDegrees} degree paths
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>

      <VelocityMarquee baseDuration={34} direction={1}>
        {disciplineWords.map((word, i) => (
          <Link
            key={`rail-${i}`}
            to="/portfolios"
            className="group mr-[0.55em] flex items-center gap-[0.55em]"
            ariaLabel={`Explore ${word} portfolios`}
          >
            <span
              className={`display-marquee px-[0.06em] transition-colors duration-300 ${
                i % 2 === 0
                  ? "text-foreground group-hover:text-brass"
                  : "text-outline group-hover:text-brass"
              }`}
            >
              {word}
            </span>
            <Diamond
              className={
                i % 2 === 0
                  ? "text-brass/70"
                  : "text-brass/30"
              }
            />
          </Link>
        ))}
      </VelocityMarquee>

      <div className="shell mt-6 sm:mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-secondary">
            {schools.length} schools · {collectionStats.totalDegrees} degree paths · {collectionStats.totalPortfolios} live portfolios
          </p>
          {/* Quick discipline category chips */}
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 touch-pan-x sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
            {["Computing", "Civil", "Actuarial", "Biochemistry", "Telecom", "Textile"].map((field) => (
              <Link
                key={field}
                to="/portfolios"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline/80 bg-surface/70 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:border-brass/40 hover:text-brass active:scale-95"
              >
                <span className="size-1 rounded-full bg-brass/60" aria-hidden />
                {field}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

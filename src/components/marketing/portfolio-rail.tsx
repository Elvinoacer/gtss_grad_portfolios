"use client";

import { schools } from "@/content/schools";
import { Link } from "@/lib/router";
import { VelocityMarquee } from "@/components/elite/velocity-marquee";

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
      className="relative overflow-hidden border-b border-hairline/60 bg-surface/40 py-14 sm:py-16"
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

      <div className="shell mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow-brass">
            <span
              className="mr-3 inline-block h-px w-6 translate-y-[-4px] bg-brass/60"
              aria-hidden
            />
            The living collection
          </p>
          <h2 className="display-section mt-4 max-w-2xl text-foreground">
            Every discipline,{" "}
            <span className="serif-accent text-brass">a visual language.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-ink-secondary">
          Forty-plus degree paths, each translated into a portfolio that
          speaks its profession's dialect — evidence, order and craft.
        </p>
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

      <div className="shell mt-8">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-tertiary">
          {schools.length} schools · 40+ degrees · 1 growing collection
        </p>
      </div>
    </section>
  );
}

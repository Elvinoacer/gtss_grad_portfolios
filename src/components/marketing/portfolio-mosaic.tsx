"use client";

import { portfolios } from "@/content/portfolios";
import { getDegree } from "@/content/schools";
import { Link } from "@/lib/router";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { SectionHeading, BrassTextLink } from "@/components/gtss/ui";
import { ClipReveal, Reveal } from "@/components/gtss/motion";
import { VelocitySkew } from "@/components/elite/skew";

const layout = [
  "kevin-mwangi-computer-science",
  "faith-wanjiru-civil-structural",
  "naomi-wambui-actuarial-science",
  "brian-kipkemoi-telecommunications",
  "mercy-achieng-mechanical-production",
  "david-wafula-chemical-process",
  "sarah-cherono-communication-journalism",
  "peter-mutua-agribusiness-management",
  "grace-atieno-applied-statistics",
];

/** Portfolio mosaic — controlled editorial composition (spec §51) */
export function PortfolioMosaic() {
  const items = layout.map((s) => portfolios.find((p) => p.slug === s)!).filter(Boolean);

  return (
    <section
      data-chapter="mosaic"
      aria-label="Portfolio mosaic"
      className="relative border-b border-hairline/60 py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="The mosaic"
          title="Move between professions. Feel the difference."
          lead="Civil Engineering to Actuarial Science to Communication — designed by the same studio, for completely different professions."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const degree = getDegree(p.degreeSlug);
            const large = i === 0;
            return (
              <div
                key={p.slug}
                className={
                  large
                    ? "min-w-0 md:col-span-2 lg:row-span-2 lg:col-span-2"
                    : "min-w-0"
                }
              >
                <VelocitySkew className="h-full">
                <ClipReveal delay={(i % 3) * 0.09 + Math.floor(i / 3) * 0.14} className="h-full">
                  <Link
                    to={`/portfolio/${p.slug}`}
                    className="group flex h-full flex-col"
                    ariaLabel={`${p.candidate.name} — ${degree?.degree.shortName} portfolio`}
                  >
                    <div className="relative overflow-hidden rounded-xl transition-shadow duration-700 group-hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)]">
                      <div className="mosaic-lift transition-transform duration-700 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:rotate-[-0.6deg]">
                      <PortfolioMock
                        portfolio={p}
                        variant="card"
                        className={large ? "aspect-auto" : ""}
                      />
                      {/* hover reveal overlay — sweep with a curved drift */}
                      <div
                        className="absolute inset-0 z-30 flex items-end bg-gradient-to-t from-background/95 via-background/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        aria-hidden
                      >
                        <div className="translate-y-4 opacity-80 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: p.presentation.accent }}>
                            {degree?.degree.shortName}
                          </p>
                          <p className="mt-1.5 font-display text-xl font-bold tracking-tight text-foreground">
                            {p.candidate.name}
                          </p>
                          <p className="mt-1 text-xs text-ink-secondary">
                            {p.careerDirection}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-brass">
                            Explore portfolio
                            <span aria-hidden>→</span>
                          </span>
                        </div>
                      </div>
                      </div>
                    </div>
                  </Link>
                </ClipReveal>
                </VelocitySkew>
              </div>
            );
          })}

          {/* Final cell — request tile */}
          <Reveal delay={0.2}>
            <Link
              to="/request"
              className="group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-xl border border-dashed border-brass/40 bg-brass/[0.04] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brass/70 hover:bg-brass/[0.08]"
            >
              <div className="absolute inset-0 bg-blueprint-fine opacity-30" aria-hidden />
              <p className="relative font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brass">
                {items.length + 1} — yours
              </p>
              <div className="relative">
                <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Your course can be next.
                </p>
                <p className="mt-2.5 text-[0.84rem] leading-relaxed text-ink-secondary">
                  Whether your work lives in code, calculations, field notes,
                  reports, drawings, datasets, lesson plans, research or media —
                  GTSS can help turn it into a professional digital story.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-brass">
                  Request my portfolio
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <BrassTextLink to="/portfolios">
            Browse all {portfolios.length} portfolio concepts in the gallery
          </BrassTextLink>
        </Reveal>
      </div>
    </section>
  );
}

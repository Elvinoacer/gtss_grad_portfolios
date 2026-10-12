"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, FlaskConical } from "lucide-react";
import { schools, getSchool, university } from "@/content/schools";
import { portfolios } from "@/content/portfolios";
import { Link, usePageTitle } from "@/lib/router";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { SectionHeading, Reveal, StatusChip } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";

export function SchoolView({ slug }: { slug: string }) {
  const school = getSchool(slug);
  usePageTitle(school ? `${school.shortName} Graduate Portfolios` : "School");

  if (!school) return <NotFound />;

  const schoolPortfolios = portfolios.filter((p) => p.schoolSlug === slug);
  const demoDegrees = school.degrees.filter((d) => d.demoSlug);

  return (
    <div className="pb-24">
      {/* School hero */}
      <section className="relative overflow-hidden border-b border-hairline/60 pt-32 sm:pt-36">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={school.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.5) contrast(1.06) brightness(0.34)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          <div className="absolute inset-0 bg-blueprint-fine opacity-30" />
          <div className="absolute inset-0 bg-grain" />
        </div>
        <div className="shell relative pb-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-tertiary">
            <Link to="/" className="transition-colors hover:text-brass">Home</Link>
            <span aria-hidden>/</span>
            <span>{university.shortName}</span>
            <span aria-hidden>/</span>
            <span className="text-ink-secondary">{school.shortName}</span>
          </nav>

          <p className="eyebrow-brass mt-8">
            {university.name} · {university.campus}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-tight text-foreground">
            {school.statement}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            {school.context}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <Link
              to={`/request?course=${encodeURIComponent(school.shortName)}`}
              className="group inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60] shadow-[0_8px_24px_-8px_rgba(226,168,75,0.4)]"
            >
              Request a {school.shortName} portfolio
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-secondary">
              {school.degrees.length} degree paths · {schoolPortfolios.length} live portfolio{schoolPortfolios.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </section>

      {/* Portfolio examples for this school */}
      {schoolPortfolios.length > 0 && (
        <section className="shell pt-16" aria-label="Featured graduate portfolios">
          <SectionHeading
            eyebrow="Featured graduate portfolios"
            title={`Examples from ${school.shortName}.`}
            lead="Real, deployed graduate portfolios designed around each discipline's authentic evidence."
          />
          <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
            {schoolPortfolios.map((p) => (
              <StaggerItem key={p.slug}>
                <Link to={p.liveUrl} className="group block h-full">
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
                    <PortfolioMock portfolio={p} variant="card" />
                    <div className="absolute right-3 top-3 z-30">
                      <StatusChip status={p.status} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-foreground group-hover:text-brass">
                        {p.candidate.name}
                      </h3>
                      <p className="mt-0.5 text-[0.82rem] text-ink-secondary">{p.careerDirection}</p>
                    </div>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-ink-tertiary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass" aria-hidden />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* Degree explorer */}
      <section className="shell mt-20" aria-label="Degree explorer">
        <SectionHeading
          eyebrow="Degree explorer"
          title="Choose your programme."
          lead="Every degree page shows what your portfolio could contain — sections, evidence, roles and the available demo."
        />
        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {school.degrees.map((d) => (
            <StaggerItem key={d.slug}>
              <Link
                to={`/universities/moi-university/degrees/${d.slug}`}
                className="group flex h-full min-h-[9.5rem] flex-col justify-between rounded-xl border border-hairline bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ink-tertiary hover:bg-surface"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-tertiary">
                      {d.tagline}
                    </p>
                    {(() => {
                      const port = portfolios.find((p) => p.degreeSlug === d.slug || p.slug === d.demoSlug);
                      if (!port) return null;
                      return (
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] ${
                            port.status === "live"
                              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                              : "border-brass/30 bg-brass/10 text-brass"
                          }`}
                        >
                          {port.status}
                        </span>
                      );
                    })()}
                  </div>
                  <h3 className="mt-3 font-display text-[1.05rem] font-bold leading-snug tracking-tight text-foreground group-hover:text-brass">
                    {d.shortName ?? d.name}
                  </h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-tertiary">
                    {d.roles[0]}
                  </span>
                  <ArrowRight className="size-3.5 shrink-0 text-ink-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-brass" aria-hidden />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* What portfolios in this school can show */}
      <section className="shell mt-20" aria-label="What a portfolio can show">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow={`What a ${school.shortName.toLowerCase()} portfolio can show`}
            title={`Evidence employers in this field actually inspect.`}
            className="max-w-xl"
          />
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-hairline bg-surface/50 p-7">
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {school.evidence.map((e, i) => (
                  <div key={e} className="flex items-center gap-3 border-b border-hairline/50 pb-4 last:border-0 sm:odd:border-0 sm:[&:nth-last-child(-n+2)]:border-0">
                    <FlaskConical className="size-3.5 shrink-0 text-brass/70" aria-hidden />
                    <span className="text-[0.88rem] text-ink-secondary">{e}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-hairline/60 pt-5 text-[0.78rem] leading-relaxed text-ink-tertiary">
                Design signature: {school.motifKeywords.join(" · ")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Request CTA */}
      <section className="shell mt-20" aria-label="Request CTA">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-brass/40 bg-brass/[0.04] p-10 text-center sm:p-14">
            <div className="absolute inset-0 bg-blueprint-fine opacity-25" aria-hidden />
            <div className="relative">
              <p className="eyebrow-brass">{demoDegrees.length > 0 ? "Your turn" : "Be the first"}</p>
              <h3 className="mx-auto mt-5 max-w-xl font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {demoDegrees.length > 0
                  ? `Build my ${school.shortName} portfolio.`
                  : `${school.shortName} deserves its first portfolio.`}
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink-secondary">
                Built from the real projects, attachments and research this
                school&apos;s graduates already have — the evidence its
                professions actually review.
              </p>
              <Link
                to={`/request?course=${encodeURIComponent(school.shortName)}`}
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

function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
      <p className="eyebrow-brass">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">School not found.</h1>
      <Link to="/universities/moi-university" className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-brass px-6 text-sm font-semibold text-brass-foreground">
        Explore all schools
      </Link>
    </div>
  );
}

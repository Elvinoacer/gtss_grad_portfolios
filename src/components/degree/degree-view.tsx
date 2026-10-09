"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Briefcase, BookOpen } from "lucide-react";
import { getDegree, university, schools } from "@/content/schools";
import { portfolios } from "@/content/portfolios";
import { Link, usePageTitle } from "@/lib/router";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { SectionHeading, Reveal, StatusChip } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";
import { allDegrees } from "@/content/schools";

export function DegreeView({ slug }: { slug: string }) {
  const info = getDegree(slug);
  usePageTitle(
    info ? `${info.degree.shortName ?? info.degree.name} Graduate Portfolio Example` : "Degree"
  );

  if (!info) return <DegreeNotFound />;

  const { degree, school } = info;
  const degreePortfolios = portfolios.filter(
    (p) => p.degreeSlug === degree.slug || p.slug === degree.demoSlug
  );
  const evidence = degree.evidence ?? school.evidence;
  const sections = degree.sections ?? school.sections;
  const related = allDegrees
    .filter((d) => d.school.slug === school.slug && d.degree.slug !== degree.slug)
    .slice(0, 3);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-16 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-tertiary">
            <Link to="/" className="transition-colors hover:text-brass">Home</Link>
            <span aria-hidden>/</span>
            <span>{university.shortName}</span>
            <span aria-hidden>/</span>
            <Link to={`/universities/moi-university/schools/${school.slug}`} className="transition-colors hover:text-brass">
              {school.shortName}
            </Link>
          </nav>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow-brass">{degree.tagline}</p>
              <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-bold leading-[1.02] tracking-tight text-foreground">
                {degree.name}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-secondary">
                {degree.exampleProject ??
                  school.context}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to={`/request?course=${encodeURIComponent(degree.shortName ?? degree.name)}`}
                  className="group inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60] shadow-[0_8px_24px_-8px_rgba(226,168,75,0.4)]"
                >
                  Build my {degree.shortName} portfolio
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                {degreePortfolios.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/portfolio/${p.slug}`}
                    className="group inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md border border-hairline px-6 font-sans text-sm font-semibold tracking-tight text-foreground transition-all duration-300 hover:border-ink-tertiary hover:bg-raised"
                  >
                    Explore {p.candidate.name}
                    <ArrowUpRight className="size-4 text-ink-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>

            {degree.image && (
              <Reveal delay={0.15}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-hairline">
                  <Image
                    src={degree.image}
                    alt={`${degree.shortName ?? degree.name} — discipline imagery`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                    style={{ filter: "saturate(0.6) contrast(1.05) brightness(0.85)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" aria-hidden />
                  <span
                    className="absolute left-4 top-4 rounded-[4px] border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] backdrop-blur-sm"
                    style={{ color: school.accent, borderColor: `${school.accent}55`, background: "rgba(8,10,13,0.55)" }}
                  >
                    {school.shortName}
                  </span>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Demo / empty state (spec §96) */}
      <section className="shell pt-14" aria-label="Available portfolios">
        {degreePortfolios.length > 0 ? (
          <div className="space-y-16">
            {degreePortfolios.map((demo, idx) => (
              <div key={demo.slug} className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <Reveal delay={idx * 0.1}>
                  <Link to={`/portfolio/${demo.slug}`} className="group block min-w-0">
                    <div className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
                      <PortfolioMock portfolio={demo} variant="full" priority={idx === 0} allowExternalLink={false} />
                      <div className="absolute right-3 top-3 z-30">
                        <StatusChip status={demo.status} />
                      </div>
                    </div>
                    <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-tertiary">
                      {demo.status === "live" ? "Live portfolio" : "Demonstration portfolio"} — {demo.candidate.name} ({demo.careerDirection})
                    </p>
                  </Link>
                </Reveal>
                <Reveal delay={0.12 + idx * 0.1}>
                  <div>
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wider"
                      style={{
                        background: `${demo.presentation.accent}20`,
                        color: demo.presentation.accent,
                        border: `1px solid ${demo.presentation.accent}40`,
                      }}
                    >
                      {demo.candidate.name} · {demo.presentation.themeLabel}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {demo.presentation.headline}
                    </h2>
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-secondary">
                      {demo.presentation.summary}
                    </p>
                    <p className="mt-5 border-l-2 pl-4 text-[0.85rem] leading-relaxed text-ink-tertiary" style={{ borderColor: `${demo.presentation.accent}55` }}>
                      {demo.designRationale}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/portfolio/${demo.slug}`}
                        className="group inline-flex h-11 items-center gap-2 rounded-md bg-brass px-5 font-sans text-xs font-semibold uppercase tracking-wider text-brass-foreground transition-all duration-300 hover:bg-[#EDBB60]"
                      >
                        Inspect architecture
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      </Link>
                      {demo.liveUrl && (
                        <a
                          href={demo.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-11 items-center gap-2 rounded-md border border-brass/40 bg-brass/10 px-5 font-mono text-xs font-medium text-brass transition-all duration-300 hover:bg-brass/20"
                        >
                          Visit live site
                          <ArrowUpRight className="size-3.5" aria-hidden />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-brass/40 bg-brass/[0.03] p-8 sm:p-12">
              <div className="absolute inset-0 bg-blueprint-fine opacity-25" aria-hidden />
              <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="eyebrow-brass">Portfolio example</p>
                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
                    Not published yet.
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-secondary">
                    Your portfolio could be the first example in this collection.
                    {degree.shortName} has a clear evidence model — and GTSS can
                    design the template around your real work.
                  </p>
                  <Link
                    to={`/request?course=${encodeURIComponent(degree.shortName ?? degree.name)}`}
                    className="group mt-7 inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60]"
                  >
                    <Sparkles className="size-4" aria-hidden />
                    Be the first — request this portfolio
                  </Link>
                </div>
                <div className="rounded-xl border border-hairline bg-surface/70 p-6">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-tertiary">
                    What it could present
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {evidence.slice(0, 6).map((e) => (
                      <li key={e} className="flex items-center gap-3 text-[0.88rem] text-ink-secondary">
                        <span className="size-1.5 rounded-full bg-brass/70" aria-hidden />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* What the portfolio shows / sections / roles */}
      <section className="shell mt-20 grid gap-5 lg:grid-cols-3" aria-label="Portfolio blueprint">
        <BlueprintCard
          icon={<BookOpen className="size-4" aria-hidden />}
          title="What your portfolio can show"
          items={evidence}
        />
        <BlueprintCard
          icon={<Layers className="size-4" aria-hidden />}
          title="Possible sections"
          items={sections}
        />
        <BlueprintCard
          icon={<Briefcase className="size-4" aria-hidden />}
          title="Relevant graduate roles"
          items={degree.roles}
        />
      </section>

      {/* Related degrees */}
      <section className="shell mt-20" aria-label="Related degrees">
        <SectionHeading
          eyebrow="Keep exploring"
          title="Related degrees in this school."
          className="max-w-xl"
        />
        <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
          {related.map(({ degree: d, school: s }) => (
            <StaggerItem key={d.slug}>
              <Link
                to={`/universities/moi-university/degrees/${d.slug}`}
                className="group flex h-full min-h-[7rem] flex-col justify-between rounded-xl border border-hairline bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ink-tertiary"
              >
                <p className="font-display text-[1rem] font-bold leading-snug tracking-tight text-foreground group-hover:text-brass">
                  {d.shortName ?? d.name}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-tertiary">
                    {s.shortName}
                  </span>
                  <ArrowRight className="size-3.5 text-ink-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-brass" aria-hidden />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}

function BlueprintCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <Reveal>
      <div className="h-full rounded-xl border border-hairline bg-surface/50 p-7">
        <p className="flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brass">
          {icon}
          {title}
        </p>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-ink-secondary">
              <span className="mt-2 size-1.5 shrink-0 rounded-[2px] bg-brass/60" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function DegreeNotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
      <p className="eyebrow-brass">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
        This degree isn't in the collection yet.
      </h1>
      <p className="mt-3 max-w-md text-ink-secondary">
        It may be coming — or it can be the next one GTSS designs.
      </p>
      <Link
        to="/request"
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-brass px-6 text-sm font-semibold text-brass-foreground"
      >
        Make my course the next one
      </Link>
    </div>
  );
}

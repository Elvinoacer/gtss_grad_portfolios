"use client";

import { useMemo, useState, useDeferredValue } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, SlidersHorizontal, X, Compass, ArrowRight, Sparkles } from "lucide-react";
import { portfolios, searchPortfolios } from "@/content/portfolios";
import { schools, getDegree } from "@/content/schools";
import { Link, usePageTitle, useRouter } from "@/lib/router";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { SectionHeading, StatusChip, Reveal } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";

type StatusFilter = "all" | "demo" | "live" | "concept";

export function GalleryView() {
  usePageTitle("Portfolio Gallery");
  const [query, setQuery] = useState("");
  const [school, setSchool] = useState<string>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    let list = deferredQuery ? searchPortfolios(deferredQuery) : portfolios;
    if (school !== "all") list = list.filter((p) => p.schoolSlug === school);
    if (status !== "all") list = list.filter((p) => p.status === status);
    return list;
  }, [deferredQuery, school, status]);

  const announced = `${results.length} portfolio${results.length === 1 ? "" : "s"} found`;

  const hasFilters = query !== "" || school !== "all" || status !== "all";

  return (
    <div className="pb-24">
      {/* Gallery hero */}
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-14 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <SectionHeading
            eyebrow="The gallery"
            title="Explore the Moi University Collection."
            lead="One university, many disciplines, many professional identities. Search by course, career direction or keyword."
          />

          {/* Search + filters */}
          <Reveal delay={0.15} className="mt-10">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-ink-tertiary" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “computer science”, “civil”, “actuarial”, “biochemistry”, “telecom”…"
                  aria-label="Search portfolios"
                  className="h-12 w-full rounded-md border border-hairline bg-surface/80 pl-11 pr-11 font-sans text-sm text-foreground placeholder:text-ink-tertiary focus:border-brass/60 focus:outline-none focus:ring-2 focus:ring-brass/25"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-ink-tertiary hover:bg-raised hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by school">
                <SchoolFilterPill active={school === "all"} onClick={() => setSchool("all")}>
                  All schools
                </SchoolFilterPill>
                {schools.map((s) => (
                  <SchoolFilterPill
                    key={s.slug}
                    active={school === s.slug}
                    accent={s.accent}
                    onClick={() => setSchool(s.slug)}
                  >
                    {s.shortName}
                  </SchoolFilterPill>
                ))}
              </div>

              <div className="flex items-center gap-2" role="group" aria-label="Filter by status">
                {(["all", "live", "demo"] as StatusFilter[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    aria-pressed={status === st}
                    className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-md border px-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] transition-colors ${
                      status === st
                        ? "border-brass/50 bg-brass/10 text-brass"
                        : "border-hairline text-ink-secondary hover:border-ink-tertiary hover:text-foreground"
                    }`}
                  >
                    <SlidersHorizontal className="size-3" aria-hidden />
                    {st === "all" ? "Any status" : st === "live" ? "Live" : "Demos"}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Results */}
      <section aria-label="Search results" className="shell pt-12">
        <div className="flex items-center justify-between" aria-live="polite">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-secondary">
            {results.length} result{results.length === 1 ? "" : "s"}
            {hasFilters ? " · filtered" : ""}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSchool("all");
                setStatus("all");
              }}
              className="inline-flex min-h-[2.5rem] items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-tertiary transition-colors hover:text-brass"
            >
              <X className="size-3" aria-hidden /> Clear filters
            </button>
          )}
        </div>
        <span className="sr-only" role="status">{announced}</span>

        {results.length > 0 ? (
          <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <StaggerItem key={p.slug}>
                <GalleryCard slug={p.slug} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <EmptyState
            query={deferredQuery}
            onBrowse={() => {
              setQuery("");
              setSchool("all");
              setStatus("all");
            }}
          />
        )}
      </section>
    </div>
  );
}

function GalleryCard({ slug }: { slug: string }) {
  const p = portfolios.find((x) => x.slug === slug)!;
  const degree = getDegree(p.degreeSlug);
  const school = schools.find((s) => s.slug === p.schoolSlug);
  return (
    <Link
      to={`/portfolio/${p.slug}`}
      className="group flex h-full flex-col"
      ariaLabel={`${p.candidate.name}, ${degree?.degree.shortName} portfolio`}
    >
      <div className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
        <PortfolioMock portfolio={p} variant="card" />
        <div className="absolute right-3 top-3 z-30">
          <StatusChip status={p.status} />
        </div>
      </div>
      <div className="mt-4 flex-1">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: p.presentation.accent }}>
          {degree?.degree.shortName}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brass">
          {p.candidate.name}
        </h3>
        <p className="mt-0.5 text-[0.82rem] text-ink-secondary">
          {p.careerDirection} · {school?.shortName}
        </p>
        <p className="mt-3 line-clamp-2 text-[0.8rem] leading-relaxed text-ink-tertiary">
          {p.presentation.summary}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.64rem] font-medium uppercase tracking-[0.16em] text-brass opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Explore portfolio <span aria-hidden>→</span>
          </span>
          {p.liveUrl && (
            <span className="font-mono text-[0.6rem] uppercase tracking-wider text-emerald-400/90">
              Live site ↗
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/** Smart empty state — catalog gaps become demand signals (spec §32) */
function EmptyState({
  query,
  onBrowse,
}: {
  query: string;
  onBrowse: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-8 overflow-hidden rounded-xl border border-dashed border-brass/40 bg-brass/[0.03] px-8 py-16 text-center"
    >
      <div className="absolute inset-0 bg-blueprint-fine opacity-30" aria-hidden />
      <div className="relative">
        <Compass className="mx-auto size-8 text-brass/70" aria-hidden />
        <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground">
          We haven't published this portfolio example yet.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-ink-secondary">
          Your course can be the next one. Tell us what you study and what the
          request button says becomes a signal — GTSS designs the next
          collection around real demand.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={`/request?course=${encodeURIComponent(query)}`}
            className="group inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60]"
          >
            <Sparkles className="size-4" aria-hidden />
            Request this portfolio
          </Link>
          <button
            type="button"
            onClick={onBrowse}
            className="inline-flex h-12 items-center gap-2.5 rounded-md border border-hairline px-6 font-sans text-sm font-semibold tracking-tight text-foreground transition-all duration-300 hover:border-ink-tertiary hover:bg-raised"
          >
            Browse related degrees
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SchoolFilterPill({
  children,
  active,
  onClick,
  accent,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-md border px-3.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-all duration-300 ${
        active
          ? "border-brass/50 bg-brass/10 text-brass"
          : "border-hairline text-ink-secondary hover:border-ink-tertiary hover:text-foreground"
      }`}
    >
      {accent && !active && (
        <span className="size-1.5 rounded-[2px]" style={{ background: accent }} aria-hidden />
      )}
      {children}
    </button>
  );
}

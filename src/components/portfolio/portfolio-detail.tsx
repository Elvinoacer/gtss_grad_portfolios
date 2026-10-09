"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ScanEye, Share2, Check, Copy, ExternalLink } from "lucide-react";
import { portfolios, relatedPortfolios } from "@/content/portfolios";
import { getDegree, getSchool, university } from "@/content/schools";
import { Link, usePageTitle } from "@/lib/router";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { StatusChip, Reveal, SectionHeading, BrassTextLink } from "@/components/gtss/ui";
import { Stagger, StaggerItem } from "@/components/gtss/motion";

export function PortfolioDetail({ slug }: { slug: string }) {
  const portfolio = portfolios.find((p) => p.slug === slug);
  const degreeInfo = portfolio ? getDegree(portfolio.degreeSlug) : undefined;
  const school = portfolio ? getSchool(portfolio.schoolSlug) : undefined;

  usePageTitle(
    portfolio
      ? `${portfolio.candidate.name} — ${degreeInfo?.degree.shortName} Portfolio`
      : "Portfolio"
  );

  if (!portfolio) {
    return <NotFound />;
  }

  const degree = degreeInfo!.degree;
  const accent = portfolio.presentation.accent;
  const related = relatedPortfolios(portfolio, 3);

  return (
    <div className="pb-24">
      {/* Candidate identity hero */}
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-16 pt-32 sm:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[10%] h-96 w-96 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: accent }}
        />
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-tertiary">
            <Link to="/portfolios" className="transition-colors hover:text-brass">Gallery</Link>
            <span aria-hidden>/</span>
            <Link
              to={`/universities/moi-university/schools/${school?.slug}`}
              className="transition-colors hover:text-brass"
            >
              {school?.shortName}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-secondary">{portfolio.candidate.name}</span>
          </nav>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusChip status={portfolio.status} />
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-ink-tertiary">
                  {university.name} · {university.campus}
                </span>
              </div>
              <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.0] tracking-tight text-foreground">
                {portfolio.candidate.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-secondary">
                <span style={{ color: accent }}>{portfolio.careerDirection}</span>
                {" · "}
                {degree.name}
              </p>
              <p className="mt-5 max-w-xl font-display text-xl font-semibold italic tracking-tight text-ink-secondary/90 sm:text-2xl">
                “{portfolio.presentation.headline}”
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/request?course=${encodeURIComponent(degree.shortName ?? degree.name)}`}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60]"
                >
                  Build one for my course
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                {portfolio.liveUrl && (
                  <a
                    href={portfolio.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-md border border-brass/50 bg-brass/10 px-6 font-sans text-sm font-semibold tracking-tight text-brass transition-all duration-300 hover:bg-brass hover:text-brass-foreground"
                  >
                    Visit live portfolio
                    <ExternalLink className="size-4" aria-hidden />
                  </a>
                )}
                <ShareButton name={portfolio.candidate.name} />
              </div>
            </div>
            <Reveal delay={0.2}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline/60">
                {[
                  ["Theme", portfolio.presentation.themeLabel],
                  ["Degree", degree.shortName ?? ""],
                  ["School", school?.shortName ?? ""],
                  ["Published", portfolio.publishedAt ?? ""],
                ].map(([k, v]) => (
                  <div key={k} className="bg-surface px-5 py-4">
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-tertiary">{k}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The screen + X-Ray */}
      <section className="shell pt-14" aria-label="Portfolio preview">
        <XRayFrame slug={slug} />
      </section>

      {/* Rationale + architecture */}
      <section className="shell mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" aria-label="Design rationale">
        <div>
          <SectionHeading
            eyebrow="Why this design works"
            title="The design serves the discipline."
            className="max-w-xl"
          />
          <Reveal delay={0.15}>
            <div className="mt-6 rounded-xl border p-6" style={{ borderColor: `${accent}40`, background: `${accent}08` }}>
              <p className="text-[0.95rem] leading-relaxed text-ink-secondary">
                {portfolio.designRationale}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <h3 className="mt-10 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ink-tertiary">
              Evidence this portfolio can carry
            </h3>
            <Stagger className="mt-4 flex flex-wrap gap-2">
              {portfolio.evidenceTypes.map((e) => (
                <StaggerItem key={e}>
                  <span className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface/70 px-3.5 py-2 text-[0.8rem] text-ink-secondary">
                    <span className="size-1.5 rounded-full" style={{ background: accent }} aria-hidden />
                    {e}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-hairline bg-surface/50 p-7">
            <h3 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-brass">
              Content architecture
            </h3>
            <ol className="mt-5 space-y-0">
              {portfolio.contentArchitecture.map((s, i) => (
                <li
                  key={s}
                  className="group flex items-baseline gap-4 border-b border-hairline/60 py-3.5 last:border-0"
                >
                  <span className="font-mono text-[0.62rem] text-ink-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.88rem] leading-relaxed text-ink-secondary group-hover:text-foreground">
                    {s}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[0.75rem] leading-relaxed text-ink-tertiary">
              Highlighted sections in the demo: {portfolio.featuredSections.join(" · ")}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Cross-links */}
      <section className="shell mt-16" aria-label="Degree and school links">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <Link
              to={`/universities/moi-university/degrees/${degree.slug}`}
              className="group flex items-center justify-between rounded-xl border border-hairline bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-tertiary"
            >
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-tertiary">Degree page</p>
                <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-foreground">
                  {degree.shortName ?? degree.name}
                </p>
              </div>
              <ArrowRight className="size-4 text-ink-tertiary transition-all group-hover:translate-x-1 group-hover:text-brass" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              to={`/universities/moi-university/schools/${school?.slug}`}
              className="group flex items-center justify-between rounded-xl border border-hairline bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-tertiary"
            >
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-tertiary">School world</p>
                <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-foreground">
                  {school?.name}
                </p>
              </div>
              <ArrowRight className="size-4 text-ink-tertiary transition-all group-hover:translate-x-1 group-hover:text-brass" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Related portfolios (spec §60) */}
      <section className="shell mt-20" aria-label="Related portfolios">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Another way a graduate story can be told."
            className="max-w-lg"
          />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link to={`/portfolio/${p.slug}`} className="group block" ariaLabel={`Related portfolio — ${p.candidate.name}`}>
                <div className="overflow-hidden rounded-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
                  <PortfolioMock portfolio={p} variant="card" />
                </div>
                <p className="mt-3.5 font-display text-lg font-bold tracking-tight text-foreground group-hover:text-brass">
                  {p.candidate.name}
                </p>
                <p className="mt-0.5 text-[0.8rem] text-ink-secondary">
                  {p.careerDirection}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <BrassTextLink to="/portfolios">Back to the full gallery</BrassTextLink>
        </Reveal>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* X-Ray frame — signature interaction (spec §54)                      */
/* ------------------------------------------------------------------ */

const xrayPins: Array<{ x: string; y: string; label: string; note: string }> = [
  { x: "12%", y: "22%", label: "Professional positioning", note: "Direction, stated in one line" },
  { x: "55%", y: "18%", label: "Recruiter navigation", note: "Work · Evidence · CV · Contact" },
  { x: "16%", y: "58%", label: "Project proof", note: "Case study with context & result" },
  { x: "62%", y: "48%", label: "Visual evidence", note: "Discipline imagery, not decoration" },
  { x: "30%", y: "84%", label: "Contact path", note: "One clear professional channel" },
  { x: "84%", y: "80%", label: "Section map", note: "Evidence organised by discipline" },
];

function XRayFrame({ slug }: { slug: string }) {
  const [xray, setXray] = useState(false);
  const reduce = useReducedMotion();
  const portfolio = portfolios.find((p) => p.slug === slug)!;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-ink-tertiary">
          {portfolio.liveUrl
            ? `Live graduate portfolio — ${portfolio.candidate.name}`
            : "Demonstration portfolio — illustrative example by GTSS"}
        </p>
        <div className="flex items-center gap-2.5">
          {portfolio.liveUrl && (
            <a
              href={portfolio.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[2.75rem] items-center gap-2 rounded-md border border-hairline px-4 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-secondary transition-all duration-300 hover:border-brass/50 hover:text-brass"
            >
              <ExternalLink className="size-3.5" aria-hidden />
              Open live site
            </a>
          )}
          <button
            type="button"
            onClick={() => setXray((v) => !v)}
            aria-pressed={xray}
            className={`group inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-md border px-5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
              xray
                ? "border-brass bg-brass text-brass-foreground"
                : "border-hairline text-ink-secondary hover:border-brass/50 hover:text-brass"
            }`}
          >
            <ScanEye className="size-4" aria-hidden />
            {xray ? "X-Ray on — why this works" : "Turn on X-Ray"}
          </button>
        </div>
      </div>

      <div className="relative mt-6 min-w-0">
        <PortfolioMock portfolio={portfolio} variant="full" priority className="relative z-0" />
        <AnimatePresence>
          {xray && (
            <>
              <motion.div
                key="xray-shade"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-20 rounded-xl bg-background/72 backdrop-blur-[1.5px]"
                aria-hidden
              />
              {xrayPins.map((pin, i) => (
                <motion.div
                  key={pin.label}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                  transition={{ delay: 0.08 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute z-30"
                  style={{ left: pin.x, top: pin.y }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative grid size-4 place-items-center">
                      <span className="absolute inset-0 rounded-full bg-brass/40 animate-pulse-soft" aria-hidden />
                      <span className="relative size-2 rounded-full bg-brass shadow-[0_0_12px_rgba(226,168,75,0.9)]" />
                    </span>
                    <div className="rounded-md border border-brass/40 bg-background/90 px-3 py-1.5 shadow-lg backdrop-blur">
                      <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-brass">
                        {pin.label}
                      </p>
                      <p className="font-mono text-[0.52rem] text-ink-secondary">{pin.note}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 max-w-2xl text-[0.78rem] leading-relaxed text-ink-tertiary">
        The X-Ray view shows what GTSS is actually designing: a career
        communication system — positioning, evidence, navigation, contact —
        not decoration.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ShareButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          const url = window.location.href;
          if (navigator.share) {
            await navigator.share({ title: `${name} — GTSS Portfolio`, url });
          } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          }
        } catch {
          /* user dismissed */
        }
      }}
      className="inline-flex h-12 items-center gap-2.5 rounded-md border border-hairline px-6 font-sans text-sm font-semibold tracking-tight text-foreground transition-all duration-300 hover:border-ink-tertiary hover:bg-raised"
    >
      {copied ? (
        <>
          <Check className="size-4 text-brass" aria-hidden /> Link copied
        </>
      ) : (
        <>
          <Share2 className="size-4 text-ink-secondary" aria-hidden /> Share this example
        </>
      )}
    </button>
  );
}

function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
      <p className="eyebrow-brass">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
        This portfolio isn't published yet.
      </h1>
      <p className="mt-3 max-w-md text-ink-secondary">
        It may be on its way — or your course could take its place.
      </p>
      <Link
        to="/request"
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-brass px-6 text-sm font-semibold text-brass-foreground"
      >
        Request this portfolio
      </Link>
    </div>
  );
}

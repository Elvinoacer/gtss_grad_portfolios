"use client";

/**
 * PortfolioMock — a simulated portfolio "screenshot".
 * Each mock renders as a miniature discipline-specific website inside
 * browser chrome: the GTSS frame stays constant, the discipline changes
 * the visual language (spec §9, §21, §51).
 */

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Portfolio } from "@/content/types";
import { getDegree, getSchool } from "@/content/schools";
import { MotifField } from "./motifs";

export type MockVariant = "card" | "hero" | "full";

export function PortfolioMock({
  portfolio,
  variant = "card",
  className = "",
  priority = false,
}: {
  portfolio: Portfolio;
  variant?: MockVariant;
  className?: string;
  priority?: boolean;
}) {
  const degreeInfo = getDegree(portfolio.degreeSlug);
  const school = getSchool(portfolio.schoolSlug);
  const degree = degreeInfo?.degree;
  const accent = portfolio.presentation.accent;
  const shortDegree = degree?.shortName ?? degree?.name ?? "";
  const image = degree?.image ?? school?.image ?? "/images/campus.jpg";
  const initials = portfolio.candidate.initials;
  const displayUrl = portfolio.liveUrl
    ? portfolio.liveUrl.replace(/^https?:\/\//, "")
    : `${portfolio.slug}.portfolios.gtss.software`;

  return (
    <div
      className={`group/mock relative overflow-hidden rounded-xl border border-hairline bg-surface shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)] ${className}`}
      style={{ ["--mock-accent" as string]: accent }}
    >
      {/* Browser chrome */}
      <div className="relative z-20 flex h-9 items-center gap-3 border-b border-hairline bg-raised/80 px-4 backdrop-blur">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#3d4550]" />
          <span className="size-2.5 rounded-full bg-[#3d4550]" />
          <span className="size-2.5 rounded-full bg-[#3d4550]" />
        </div>
        {portfolio.liveUrl ? (
          <a
            href={portfolio.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={`Visit ${portfolio.candidate.name}'s live portfolio`}
            className="group/url flex h-5.5 min-w-0 flex-1 items-center justify-between rounded-sm border border-hairline/70 bg-background/60 px-2.5 transition-colors hover:border-brass/50 hover:bg-background/90"
          >
            <span className="truncate font-mono text-[0.58rem] tracking-wide text-ink-tertiary group-hover/url:text-brass">
              {displayUrl}
            </span>
            <ExternalLink className="ml-1 size-2.5 shrink-0 text-ink-tertiary transition-transform group-hover/url:translate-x-0.5 group-hover/url:text-brass" aria-hidden />
          </a>
        ) : (
          <div className="flex h-5.5 min-w-0 flex-1 items-center rounded-sm border border-hairline/70 bg-background/60 px-2.5">
            <span className="truncate font-mono text-[0.58rem] tracking-wide text-ink-tertiary">
              {displayUrl}
            </span>
          </div>
        )}
        <span
          className="hidden rounded-sm px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] sm:inline"
          style={{
            color: portfolio.status === "live" ? "#34D399" : accent,
            background: portfolio.status === "live" ? "rgba(52, 211, 153, 0.1)" : undefined,
            border: portfolio.status === "live" ? "1px solid rgba(52, 211, 153, 0.25)" : undefined,
            opacity: 0.9,
          }}
        >
          {portfolio.status}
        </span>
      </div>

      {/* Screen */}
      <div
        className={`relative w-full overflow-hidden bg-[#0A0D11] ${
          portfolio.screenshot ? "aspect-[16/9]" : "aspect-[16/10.4]"
        }`}
      >
        {portfolio.screenshot ? (
          <div className="relative h-full w-full">
            <Image
              src={portfolio.screenshot}
              alt={`${portfolio.candidate.name} portfolio preview`}
              fill
              priority={priority}
              sizes={
                variant === "full"
                  ? "(max-width: 1024px) 100vw, 1200px"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              className="object-cover object-top transition-transform duration-700 ease-out group-hover/mock:scale-[1.02]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0D11]/45 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover/mock:opacity-20"
              aria-hidden
            />
          </div>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, ${accent}14 0%, #0B0D10 46%, #0D1014 100%)`,
              }}
            />
            <div className="absolute inset-0" style={{ color: accent }}>
              <MotifField motif={portfolio.motif} className="opacity-[0.3]" />
            </div>

            {variant === "full" ? (
              <FullScreen
                portfolio={portfolio}
                accent={accent}
                shortDegree={shortDegree}
                schoolShort={school?.shortName ?? ""}
                image={image}
                initials={initials}
                priority={priority}
              />
            ) : (
              <CardScreen
                portfolio={portfolio}
                accent={accent}
                shortDegree={shortDegree}
                image={image}
                initials={initials}
                hero={variant === "hero"}
                priority={priority}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function CardScreen({
  portfolio,
  accent,
  shortDegree,
  image,
  initials,
  hero,
  priority,
}: {
  portfolio: Portfolio;
  accent: string;
  shortDegree: string;
  image: string;
  initials: string;
  hero: boolean;
  priority: boolean;
}) {
  const sections = portfolio.featuredSections.slice(0, hero ? 3 : 2);
  return (
    <div className="relative z-10 flex h-full flex-col p-[5.5%]">
      {/* mini site nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="grid size-6 place-items-center rounded-[5px] font-mono text-[0.55rem] font-semibold"
            style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
          >
            {initials}
          </span>
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-ink-tertiary">
            {shortDegree}
          </span>
        </div>
        <div className="hidden items-center gap-3.5 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-ink-tertiary min-[420px]:flex" aria-hidden>
          <span>Work</span>
          <span>Evidence</span>
          <span className="text-ink-secondary">Contact</span>
        </div>
      </div>

      {/* hero area */}
      <div className="mt-[6%] flex flex-1 min-h-0 items-stretch gap-[4%]">
        <div className="flex-[1.25] min-w-0">
          <p
            className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {portfolio.careerDirection}
          </p>
          <p
            className={`mt-2 font-display font-bold leading-[1.02] tracking-tight text-[#F2F4F6] ${
              hero ? "text-[clamp(1.35rem,3.2cqw,2.1rem)]" : "text-[clamp(1.1rem,2.9cqw,1.55rem)]"
            }`}
          >
            {portfolio.candidate.name}
          </p>
          <p className="mt-1.5 text-[clamp(0.62rem,1.4cqw,0.75rem)] leading-snug text-ink-secondary/90">
            {portfolio.presentation.headline}
          </p>
          <div className="mt-[7%] flex flex-wrap items-center gap-2">
            <span
              className="inline-flex h-[5.5cqh] min-h-4 items-center rounded-[3px] px-2.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.12em]"
              style={{ background: accent, color: "#0B0C0F" }}
            >
              View work
            </span>
            <span
              className="inline-flex h-[5.5cqh] min-h-4 items-center rounded-[3px] border px-2.5 font-mono text-[0.55rem] uppercase tracking-[0.12em]"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              Download CV
            </span>
          </div>
        </div>
        <div className="relative hidden flex-1 overflow-hidden rounded-md sm:block" style={{ boxShadow: `0 10px 30px -14px ${accent}44` }}>
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 768px) 40vw, 260px"
            className="object-cover"
            style={{ filter: `saturate(0.82) contrast(1.04)` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${accent}30, transparent 55%)`,
            }}
          />
        </div>
      </div>

      {/* section chips */}
      <div className="flex flex-wrap gap-1.5">
        {sections.map((s) => (
          <span
            key={s}
            className="rounded-[3px] border px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-ink-secondary/80"
            style={{ borderColor: "#242A33", background: "rgba(11,13,16,0.55)" }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function FullScreen({
  portfolio,
  accent,
  shortDegree,
  schoolShort,
  image,
  initials,
  priority,
}: {
  portfolio: Portfolio;
  accent: string;
  shortDegree: string;
  schoolShort: string;
  image: string;
  initials: string;
  priority: boolean;
}) {
  const evidence = portfolio.evidenceTypes.slice(0, 4);
  const sections = portfolio.contentArchitecture.slice(0, 5);
  return (
    <div className="relative z-10 flex h-full flex-col p-[4%]">
      {/* nav */}
      <div className="flex items-center justify-between border-b border-hairline/60 pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="grid size-7 place-items-center rounded-[5px] font-mono text-[0.6rem] font-semibold"
            style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}50` }}
          >
            {initials}
          </span>
          <div className="leading-none">
            <p className="font-display text-[0.8rem] font-bold tracking-tight text-[#F2F4F6]">
              {portfolio.candidate.name}
            </p>
            <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-ink-tertiary">
              {shortDegree}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-tertiary" aria-hidden>
          <span>Profile</span>
          <span style={{ color: accent }}>{sections[2]?.split("—")[0] ?? "Work"}</span>
          <span>Evidence</span>
          <span className="hidden min-[560px]:inline">CV</span>
        </div>
        <span
          className="hidden h-6 items-center rounded-[4px] px-3 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.1em] md:inline-flex"
          style={{ background: accent, color: "#0B0C0F" }}
        >
          Contact
        </span>
      </div>

      {/* body */}
      <div className="mt-4 grid flex-1 grid-cols-[1.15fr_1fr] gap-5">
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em]" style={{ color: accent }}>
              {portfolio.careerDirection} · {schoolShort}
            </p>
            <p className="mt-3 font-display text-[clamp(1.5rem,3.4cqw,2.3rem)] font-bold leading-[1.02] tracking-tight text-[#F2F4F6]">
              {portfolio.candidate.name}
            </p>
            <p className="mt-2 max-w-[95%] text-[clamp(0.66rem,1.3cqw,0.8rem)] leading-relaxed text-ink-secondary/90">
              {portfolio.presentation.headline}
            </p>
            <div className="mt-5 flex gap-2">
              <span
                className="inline-flex h-7 items-center rounded-[4px] px-3.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.12em]"
                style={{ background: accent, color: "#0B0C0F" }}
              >
                View portfolio
              </span>
              <span
                className="inline-flex h-7 items-center rounded-[4px] border px-3.5 font-mono text-[0.56rem] uppercase tracking-[0.12em]"
                style={{ borderColor: `${accent}50`, color: accent }}
              >
                Get CV
              </span>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {evidence.map((e) => (
              <div key={e} className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-[2px]" style={{ background: accent, opacity: 0.8 }} />
                <span className="text-[0.68rem] leading-none text-ink-secondary/90">{e}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-md" style={{ boxShadow: `0 14px 40px -18px ${accent}55` }}>
            <Image
              src={image}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 768px) 60vw, 420px"
              className="object-cover"
              style={{ filter: "saturate(0.85) contrast(1.05)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${accent}26, transparent 50%)` }}
            />
            <span
              className="absolute left-3 top-3 max-w-[70%] truncate rounded-[3px] px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.14em]"
              style={{ background: "rgba(11,13,16,0.72)", color: accent, border: `1px solid ${accent}40` }}
              title={sections[1] ?? "Featured project"}
            >
              {sections[1] ?? "Featured project"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {portfolio.featuredSections.slice(0, 3).map((s, i) => (
              <div
                key={s}
                className="rounded-md border border-hairline/70 bg-[#0B0D10]/70 p-2.5"
                style={i === 0 ? { borderColor: `${accent}45` } : undefined}
              >
                <div className="h-1 w-5 rounded-full" style={{ background: accent, opacity: i === 0 ? 0.9 : 0.4 }} />
                <p className="mt-2 line-clamp-2 text-[0.56rem] leading-tight text-ink-secondary/85">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

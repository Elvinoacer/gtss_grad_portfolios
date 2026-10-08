"use client";

import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router";
import { Reveal, WordReveal } from "./motion";

/* Re-export motion primitives so view components can import from one place */
export {
  Reveal,
  WordReveal,
  Stagger,
  StaggerItem,
  ClipReveal,
  CrossFadeText,
  EASE_OUT_EXPO,
} from "./motion";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function PrimaryCTA({
  to,
  children,
  className = "",
  onClick,
  withArrow = true,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  withArrow?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground shadow-[0_0_0_1px_rgba(226,168,75,0.35),0_8px_28px_-12px_rgba(226,168,75,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60] hover:shadow-[0_0_0_1px_rgba(226,168,75,0.5),0_14px_38px_-12px_rgba(226,168,75,0.65)] active:translate-y-0 ${className}`}
    >
      <span className="min-h-[44px] flex items-center">{children}</span>
      {withArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </Link>
  );
}

export function GhostCTA({
  to,
  children,
  className = "",
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group inline-flex min-h-[44px] items-center gap-2.5 rounded-md border border-hairline bg-transparent px-6 font-sans text-sm font-semibold tracking-tight text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-tertiary hover:bg-raised active:translate-y-0 ${className}`}
    >
      {children}
      <ArrowUpRight
        className="size-4 text-ink-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass"
        aria-hidden
      />
    </Link>
  );
}

export function BrassTextLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`link-sweep group inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-brass ${className}`}
    >
      {children}
      <ArrowRight
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Section scaffolding                                                 */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
  brassEyebrow = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  brassEyebrow?: boolean;
}) {
  return (
    <div
      className={`${
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      } ${className}`}
    >
      <Reveal y={14}>
        <p className={brassEyebrow ? "eyebrow-brass" : "eyebrow"}>
          <span className="mr-3 inline-block h-px w-6 translate-y-[-4px] bg-brass/60" aria-hidden />
          {eyebrow}
        </p>
      </Reveal>
      <WordReveal
        as="h2"
        text={title}
        delay={0.08}
        className="display-section mt-5 text-foreground"
      />
      {lead && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Hairline rule with mono index marker — editorial section divider */
export function Rule({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-brass">
        {index}
      </span>
      <span className="h-px flex-1 bg-hairline" aria-hidden />
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-tertiary">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status & meta chips (spec §57)                                      */
/* ------------------------------------------------------------------ */

const statusMap: Record<string, { label: string; classes: string }> = {
  demo: {
    label: "Demo",
    classes: "border-brass/30 bg-brass/10 text-brass",
  },
  live: {
    label: "Live",
    classes: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  concept: {
    label: "Concept",
    classes: "border-ink-tertiary/30 bg-raised text-ink-secondary",
  },
};

export function StatusChip({
  status,
  className = "",
}: {
  status: string;
  className?: string;
}) {
  const s = statusMap[status] ?? statusMap.concept;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] ${s.classes} ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {s.label}
    </span>
  );
}

export function MetaChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-hairline bg-surface/60 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-secondary">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg
        viewBox="0 0 64 64"
        className="size-8 shrink-0"
        role="img"
        aria-label="GTSS monogram"
      >
        <rect width="64" height="64" rx="14" fill="#0F1217" />
        <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" fill="none" stroke="#242A33" strokeWidth="1.5" />
        <path
          d="M42 22.5c-2.2-2.6-5.6-4.2-9.6-4.2-7.2 0-12.4 5.5-12.4 13.7s5.2 13.7 12.5 13.7c5.5 0 9.6-3 10.7-7.9V32H32.4v4.3h7.2c-.6 2.7-2.9 4.4-6.5 4.4-4.4 0-7.4-3.6-7.4-8.7s3.1-8.8 7.3-8.8c2.5 0 4.6 1.1 5.7 2.9l3.3-3.6z"
          fill="#E2A84B"
        />
        <rect x="18" y="50" width="28" height="2.5" rx="1.25" fill="#E2A84B" opacity="0.55" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-bold tracking-tight text-foreground">
            GTSS <span className="text-ink-secondary font-medium">Graduate Portfolios</span>
          </span>
          <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-brass">
            Moi University Collection
          </span>
        </span>
      )}
    </span>
  );
}

/** Thin animated dot grid used behind quiet sections */
export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,rgba(157,167,179,0.8)_1px,transparent_1px)] [background-size:26px_26px] ${className}`}
    />
  );
}

export { motion };

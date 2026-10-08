"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Search, Compass } from "lucide-react";
import { allDegrees, schools, university } from "@/content/schools";
import { Link, usePageTitle, useRouter } from "@/lib/router";
import { SectionHeading, Reveal, Rule } from "@/components/gtss/ui";
import { portfolios } from "@/content/portfolios";

/** University landing — the Course Constellation (spec §53) */
export function UniversityView() {
  usePageTitle(`${university.name} Collection`);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = allDegrees.filter(({ degree, school }) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      degree.name.toLowerCase().includes(q) ||
      (degree.shortName ?? "").toLowerCase().includes(q) ||
      degree.tagline.toLowerCase().includes(q) ||
      school.shortName.toLowerCase().includes(q) ||
      degree.roles.some((r) => r.toLowerCase().includes(q))
    );
  });

  const selectedInfo = selected ? allDegrees.find((d) => d.degree.slug === selected) : null;

  return (
    <div className="pb-24">
      {/* University hero */}
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-16 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <p className="eyebrow-brass">{university.name} · {university.campus}</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.3rem,4.8vw,4.2rem)] font-bold leading-[1.0] tracking-tight text-foreground">
            One university. Many disciplines. Many professional identities.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            {university.collectionLabel} organises portfolio examples by
            academic discipline — {allDegrees.length} degree paths across six
            schools, each with its own professional language.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Stat value={`${portfolios.length}`} label="Portfolio concepts" />
            <Stat value={`${schools.length}`} label="Schools" />
            <Stat value={`${allDegrees.length}`} label="Degree paths" />
            <Stat value="1" label="Campus collection" />
          </div>
        </div>
      </section>

      {/* The Constellation */}
      <section className="shell pt-16" aria-label="Course constellation">
        <SectionHeading
          eyebrow="The course constellation"
          title="Find your course in the field."
          lead="Move your cursor to bring degrees forward — or search. Select one to see its professional directions and whether a portfolio demo exists."
        />

        <Reveal delay={0.12} className="mt-8">
          <div className="relative flex h-12 max-w-md items-center">
            <Search className="pointer-events-none absolute left-4 size-4 text-ink-tertiary" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search degrees — “civil”, “data”, “teacher”, “journalism”…"
              aria-label="Search degrees"
              className="h-12 w-full rounded-md border border-hairline bg-surface/80 pl-11 pr-4 font-sans text-sm text-foreground placeholder:text-ink-tertiary focus:border-brass/60 focus:outline-none focus:ring-2 focus:ring-brass/25"
            />
          </div>
        </Reveal>

        <ConstellationField
          degrees={filtered}
          selected={selected}
          onSelect={(slug) => setSelected(slug === selected ? null : slug)}
        />

        {/* Detail panel */}
        {selectedInfo && <ConstellationPanel slug={selected} onClear={() => setSelected(null)} />}

        {filtered.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-brass/40 bg-brass/[0.03] p-10 text-center">
            <p className="font-display text-xl font-bold tracking-tight text-foreground">
              We haven't published this course yet.
            </p>
            <p className="mx-auto mt-2 max-w-md text-[0.9rem] text-ink-secondary">
              Your course can be the next one in the constellation.
            </p>
            <Link
              to={`/request?course=${encodeURIComponent(query)}`}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-brass px-5 text-sm font-semibold text-brass-foreground"
            >
              <Sparkles className="size-4" aria-hidden /> Request this course
            </Link>
          </div>
        )}
      </section>

      {/* Schools quick grid */}
      <section className="shell mt-20" aria-label="Schools">
        <Rule index="◆" label="Six worlds" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                to={`/universities/moi-university/schools/${s.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl border border-hairline bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink-tertiary"
              >
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em]" style={{ color: s.accent }}>
                    {s.degrees.length} degrees
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-foreground group-hover:text-brass">
                    {s.shortName}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-tertiary">{s.statement}</p>
                </div>
                <span className="mt-5 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-tertiary transition-colors group-hover:text-brass">
                  Enter the world <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-display text-xl font-bold tracking-tight text-brass">{value}</span>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-secondary">{label}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Constellation field — pointer-proximity degree names                */
/* ------------------------------------------------------------------ */

function ConstellationField({
  degrees,
  selected,
  onSelect,
}: {
  degrees: ReturnType<typeof allDegrees.slice>;
  selected: string | null;
  onSelect: (slug: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef(new Map<string, HTMLButtonElement>());
  const reduce = useReducedMotion();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce) return;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      container.style.setProperty("--mx", `${mx}px`);
      container.style.setProperty("--my", `${my}px`);
      pillRefs.current.forEach((el, slug) => {
        const r = el.getBoundingClientRect();
        const cx = r.left - rect.left + r.width / 2;
        const cy = r.top - rect.top + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        const influence = Math.max(0, 1 - dist / 190);
        const scale = 1 + influence * 0.22;
        el.style.transform = `scale(${scale.toFixed(3)})`;
        el.style.zIndex = influence > 0.35 ? "5" : "";
        el.style.borderColor = influence > 0.4 ? "rgba(226,168,75,0.45)" : "";
        el.style.color = influence > 0.55 ? "#E2A84B" : "";
      });
    },
    [reduce]
  );

  const reset = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      container.style.setProperty("--mx", "-500px");
      container.style.setProperty("--my", "-500px");
    }
    pillRefs.current.forEach((el) => {
      el.style.transform = "";
      el.style.zIndex = "";
      el.style.borderColor = "";
      el.style.color = "";
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className="relative mt-8 rounded-2xl border border-hairline bg-surface/40 p-5 sm:p-8"
      style={{ ["--mx" as string]: "-500px", ["--my" as string]: "-500px" }}
    >
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 transition-opacity"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx) var(--my), rgba(226,168,75,0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-blueprint-fine opacity-40"
      />

      <div className="relative flex flex-wrap gap-2.5">
        {degrees.map(({ degree, school }) => {
          const hasDemo = !!degree.demoSlug;
          const isSel = selected === degree.slug;
          return (
            <button
              key={degree.slug}
              ref={(el) => {
                if (el) pillRefs.current.set(degree.slug, el);
                else pillRefs.current.delete(degree.slug);
              }}
              type="button"
              onClick={() => onSelect(degree.slug)}
              aria-pressed={isSel}
              className={`inline-flex min-h-[2.4rem] items-center gap-2 rounded-full border bg-raised/70 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] backdrop-blur-sm transition-[border-color,color,background-color] duration-200 will-change-transform hover:border-brass/50 hover:text-brass ${
                isSel
                  ? "border-brass/70 bg-brass/15 text-brass"
                  : "border-hairline text-ink-secondary"
              } ${hasDemo ? "" : "opacity-80"}`}
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: hasDemo ? school.accent : "#39424f" }}
                aria-hidden
              />
              {degree.shortName ?? degree.name}
              {hasDemo && (
                <span className="rounded-full bg-brass/15 px-1.5 py-px text-[0.52rem] font-semibold text-brass">
                  demo
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="relative mt-5 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-tertiary">
        <Compass className="size-3.5 text-brass/60" aria-hidden />
        {degrees.length} degrees · amber dot = portfolio demo exists
      </p>
    </div>
  );
}

function ConstellationPanel({ slug, onClear }: { slug: string; onClear: () => void }) {
  const info = allDegrees.find((d) => d.degree.slug === slug)!;
  const { degree, school } = info;
  const { navigate } = useRouter();
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 overflow-hidden rounded-2xl border p-6 sm:p-8"
      style={{ borderColor: `${school.accent}44`, background: `${school.accent}08` }}
      aria-live="polite"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em]" style={{ color: school.accent }}>
            {school.shortName} · {degree.tagline}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
            {degree.name}
          </h3>
          {degree.demoSlug ? (
            <p className="mt-2 text-[0.85rem] text-ink-secondary">
              A portfolio demo exists — {degree.roles[0]} direction.
            </p>
          ) : (
            <p className="mt-2 text-[0.85rem] text-ink-secondary">
              No portfolio example yet — your course can be the first.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClear}
          className="min-h-[2.5rem] rounded-md px-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-tertiary transition-colors hover:text-foreground"
        >
          Close
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {degree.roles.map((r) => (
          <span key={r} className="rounded-md border border-hairline bg-raised/60 px-3 py-1.5 text-[0.78rem] text-ink-secondary">
            {r}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate(`/universities/moi-university/degrees/${degree.slug}`)}
          className="group inline-flex h-11 items-center gap-2 rounded-md bg-brass px-5 font-sans text-sm font-semibold text-brass-foreground transition-all duration-300 hover:-translate-y-0.5"
        >
          {degree.demoSlug ? "Explore this degree" : "See what it could show"}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(`/request?course=${encodeURIComponent(degree.shortName ?? degree.name)}`)
          }
          className="inline-flex h-11 items-center gap-2 rounded-md border border-hairline px-5 font-sans text-sm font-semibold text-foreground transition-all duration-300 hover:border-ink-tertiary hover:bg-raised"
        >
          <Sparkles className="size-4 text-brass" aria-hidden />
          {degree.demoSlug ? "Build mine like this" : "Be the first example"}
        </button>
      </div>
    </motion.div>
  );
}

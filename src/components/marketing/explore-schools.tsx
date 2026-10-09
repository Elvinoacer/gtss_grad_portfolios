"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { schools, university } from "@/content/schools";
import { Link } from "@/lib/router";
import { Reveal, SectionHeading } from "@/components/gtss/ui";
import { Parallax } from "@/components/elite/parallax";
import { portfolios } from "@/content/portfolios";

/**
 * Explore by school — a sticky stacked deck.
 * Each school card pins to the viewport while the next slides over it;
 * outgoing cards scale down and dim as they sink. Scroll becomes the
 * mechanism that physically leafs through the collection.
 */
export function ExploreSchools() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const cards = gsap.utils.toArray<HTMLElement>("[data-school-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const dim = card.querySelector("[data-school-dim]");
        gsap.to(card, {
          scale: 0.94,
          yPercent: -2,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: isMobile ? "top 55%" : "top bottom",
            end: isMobile ? "top 18%" : "top top+=140",
            scrub: 0.8,
          },
        });
        if (dim) {
          gsap.fromTo(
            dim,
            { opacity: 0 },
            {
              opacity: 0.6,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: isMobile ? "top 55%" : "top bottom",
                end: isMobile ? "top 18%" : "top top+=140",
                scrub: 0.8,
              },
            }
          );
        }
      });
    }, stack);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="schools"
      data-chapter="schools"
      aria-label="Explore by school"
      className="relative border-b border-hairline/60 py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={`${university.name} · Main Campus`}
          title="Six schools. Six professional languages."
          lead="Each school world carries its own visual logic — the same studio, completely different professions. Scroll through the collection and choose yours."
        />

        <div ref={stackRef} className="mt-12 sm:mt-14">
          {schools.map((school, i) => (
            <div
              key={school.slug}
              data-school-card
              className="sticky top-[4.25rem] sm:top-[5.5rem]"
              style={{ paddingBottom: "1.75rem" }}
            >
              <Link
                to={`/universities/moi-university/schools/${school.slug}`}
                className="group relative flex min-h-[19rem] flex-col overflow-hidden rounded-2xl border border-hairline bg-surface sm:min-h-[24rem] sm:rounded-3xl lg:flex-row shadow-xl"
                ariaLabel={`Explore ${school.name} portfolios`}
                data-cursor="view"
              >
                {/* image side — parallax inside its mask */}
                <div className="relative h-[9rem] shrink-0 overflow-hidden sm:h-[15rem] lg:h-auto lg:w-[42%]">
                  <Parallax speed={0.1} className="absolute inset-x-0 -top-[12%] h-[124%]">
                    <Image
                      src={school.image}
                      alt={`${school.shortName} — discipline imagery`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                      style={{
                        filter: "saturate(0.72) contrast(1.05) brightness(0.9)",
                      }}
                    />
                  </Parallax>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-surface/20 lg:to-surface"
                    aria-hidden
                  />
                  <span
                    className="absolute left-3.5 top-3.5 rounded-[5px] border px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md sm:left-5 sm:top-5"
                    style={{
                      color: school.accent,
                      borderColor: `${school.accent}66`,
                      background: "rgba(8,10,13,0.85)",
                    }}
                  >
                    {school.degrees.length} degree paths mapped
                  </span>
                </div>

                {/* body side */}
                <div className="relative flex flex-1 flex-col p-5 sm:p-8 lg:p-10">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-ink-secondary font-medium">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: school.accent }}
                        aria-hidden
                      />
                      {String(i + 1).padStart(2, "0")} · {school.shortName}
                    </p>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary sm:hidden">
                      {i + 1}/{schools.length}
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-foreground tracking-tight sm:mt-2.5">
                    {school.name}
                  </h3>
                  <p className="mt-1 font-serif text-sm sm:text-base italic text-brass">
                    &ldquo;{school.statement}&rdquo;
                  </p>
                  <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink-secondary sm:mt-3 sm:text-[0.92rem]">
                    {school.description}
                  </p>

                  {/* Degree paths preview */}
                  <div className="mt-3.5 sm:mt-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
                      Mapped degree paths ({school.degrees.length}):
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5 sm:gap-2">
                      {school.degrees.slice(0, 3).map((d) => (
                        <span
                          key={d.slug}
                          className="rounded border border-hairline/80 bg-raised/70 px-2.5 py-1 font-sans text-xs font-medium text-foreground/90"
                        >
                          {d.name}
                        </span>
                      ))}
                      {school.degrees.length > 3 && (
                        <span className="rounded border border-hairline/60 bg-raised/40 px-2 py-1 font-mono text-xs text-ink-secondary">
                          +{school.degrees.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-hairline/70 pt-4 sm:mt-6 sm:pt-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brass/50 bg-brass/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brass transition-all duration-300 group-hover:bg-brass group-hover:text-background">
                      Explore {school.shortName} Portfolios
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-secondary">
                      {countPortfolios(school.slug)} live portfolio
                      {countPortfolios(school.slug) === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>

                {/* dim veil driven by the stack scrub */}
                <div
                  data-school-dim
                  className="pointer-events-none absolute inset-0 bg-[#050608] opacity-0"
                  aria-hidden
                />
              </Link>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-tertiary">
            Stack scrolls · every school keeps its own visual logic
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function countPortfolios(schoolSlug: string) {
  return portfolios.filter((p) => p.schoolSlug === schoolSlug).length;
}

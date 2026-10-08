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
import { getPortfolioOfDegree } from "@/content/portfolios";

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
      const cards = gsap.utils.toArray<HTMLElement>("[data-school-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const dim = card.querySelector("[data-school-dim]");
        gsap.to(card, {
          scale: 0.93,
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top+=140",
            scrub: 0.8,
          },
        });
        if (dim) {
          gsap.fromTo(
            dim,
            { opacity: 0 },
            {
              opacity: 0.62,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: "top top+=140",
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

        <div ref={stackRef} className="mt-14">
          {schools.map((school, i) => (
            <div
              key={school.slug}
              data-school-card
              className="sticky top-[5.5rem]"
              style={{ paddingBottom: "2.5rem" }}
            >
              <Link
                to={`/universities/moi-university/schools/${school.slug}`}
                className="group relative flex min-h-[26rem] flex-col overflow-hidden rounded-3xl border border-hairline bg-surface sm:min-h-[24rem] lg:flex-row"
                ariaLabel={`Explore ${school.name} portfolios`}
                data-cursor="view"
              >
                {/* image side — parallax inside its mask */}
                <div className="relative h-[13rem] shrink-0 overflow-hidden sm:h-[15rem] lg:h-auto lg:w-[42%]">
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
                    className="absolute left-5 top-5 rounded-[5px] border px-2.5 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] backdrop-blur-sm"
                    style={{
                      color: school.accent,
                      borderColor: `${school.accent}55`,
                      background: "rgba(8,10,13,0.55)",
                    }}
                  >
                    {school.degrees.length} degree paths
                  </span>
                </div>

                {/* body side */}
                <div className="relative flex flex-1 flex-col p-7 sm:p-9 lg:p-11">
                  <p className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-tertiary">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: school.accent }}
                      aria-hidden
                    />
                    {String(i + 1).padStart(2, "0")} · {school.shortName}
                  </p>
                  <h3 className="display-card mt-3 max-w-md text-foreground">
                    {school.statement}
                  </h3>
                  <p className="mt-4 max-w-lg flex-1 text-[0.9rem] leading-relaxed text-ink-secondary">
                    {school.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {school.motifKeywords.slice(0, 4).map((k) => (
                      <span
                        key={k}
                        className="rounded-[4px] border border-hairline/80 bg-raised/60 px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-ink-tertiary"
                      >
                        {k}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-hairline/70 pt-5">
                    <span className="link-sweep inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-brass">
                      Enter {school.shortName}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-tertiary">
                      {countDemos(school.slug)} demo
                      {countDemos(school.slug) === 1 ? "" : "s"}
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

function countDemos(schoolSlug: string) {
  return schools
    .find((s) => s.slug === schoolSlug)!
    .degrees.filter((d) => d.demoSlug && getPortfolioOfDegree(d.slug)).length;
}

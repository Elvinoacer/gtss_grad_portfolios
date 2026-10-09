"use client";

import { portfolios } from "@/content/portfolios";
import type { Portfolio } from "@/content/types";
import { getDegree } from "@/content/schools";
import { Link } from "@/lib/router";
import { ArrowUpRight } from "lucide-react";
import { HorizontalGallery } from "@/components/elite/horizontal-gallery";
import { PortfolioMock } from "@/components/portfolio/portfolio-mock";
import { Reveal } from "@/components/gtss/ui";

/**
 * Featured exhibition — a pinned horizontal gallery.
 * The section locks to the viewport and the work slides past on scrub;
 * a giant outline wordmark drifts at a slower rate behind the cards.
 */

const order = [
  "kevin-mwangi-computer-science",
  "faith-wanjiru-civil-structural",
  "naomi-wambui-actuarial-science",
  "ian-kamau-electrical-electronics",
  "brian-kipkemoi-telecommunications",
  "lydia-chebet-industrial-textile",
];

const featured: Portfolio[] = order
  .map((slug) => portfolios.find((p) => p.slug === slug)!)
  .filter(Boolean);

export function FeaturedPortfolio() {
  return (
    <HorizontalGallery
      chapter="exhibition"
      counterLabel="Exhibition"
      className="border-b border-hairline/60 bg-background"
      backdrop={
        <span
          data-gallery-backdrop
          className="gallery-backdrop-word display-marquee absolute left-1/2 top-1/2 hidden select-none lg:block"
          style={{
            fontSize: "clamp(7rem, 19vw, 21rem)",
            transform: "translate3d(calc(-50% + 10vw), -50%, 0)",
          }}
        >
          Featured
        </span>
      }
      header={
        <div className="shell relative z-10">
          <Reveal y={14}>
            <p className="eyebrow-brass">
              <span
                className="mr-3 inline-block h-px w-6 translate-y-[-4px] bg-brass/60"
                aria-hidden
              />
              Selected work
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="display-section mt-4 max-w-2xl text-foreground">
              Six portfolios,{" "}
              <span className="serif-accent text-brass">
                six professions.
              </span>
            </h2>
          </Reveal>
        </div>
      }
    >
      {featured.map((p, i) => {
        const degreeInfo = getDegree(p.degreeSlug);
        return (
          <article
            key={p.slug}
            className="relative flex w-[80vw] shrink-0 snap-center flex-col sm:w-[26rem] lg:w-[34vw] lg:max-w-[30rem]"
            data-cursor="view"
          >
            <Link
              to={`/portfolio/${p.slug}`}
              className="group relative block overflow-hidden rounded-2xl transition-colors duration-500 [&>div]:border-hairline/70 [&>div]:transition-colors [&>div]:duration-500 hover:[&>div]:border-brass/40"
              ariaLabel={`${p.candidate.name} — ${p.careerDirection} portfolio`}
            >
              <PortfolioMock
                portfolio={p}
                variant="card"
                className="w-full"
                priority={i < 2}
              />
              {/* hover veil */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-background/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
            </Link>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-brass">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display-card mt-1.5 truncate text-foreground">
                  {p.candidate.name}
                </h3>
                <p className="mt-1 truncate text-sm text-ink-secondary">
                  {p.careerDirection} ·{" "}
                  {degreeInfo?.degree.shortName ??
                    degreeInfo?.degree.name}
                </p>
              </div>
              <Link
                to={`/portfolio/${p.slug}`}
                className="group mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-hairline text-ink-secondary transition-all duration-300 hover:border-brass/60 hover:text-brass"
                ariaLabel={`View ${p.candidate.name}'s portfolio`}
              >
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </article>
        );
      })}
    </HorizontalGallery>
  );
}

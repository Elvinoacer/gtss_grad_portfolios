"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { WordReveal, Reveal } from "@/components/gtss/motion";
import { Magnetic } from "@/components/elite/magnetic";
import { Parallax } from "@/components/elite/parallax";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Conversion band — the invitation, cinematic finale (spec §56) */
export function RequestBand() {
  const zoomRef = useRef<HTMLDivElement>(null);

  /* The campus breathes — a slow zoom through the whole band */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = zoomRef.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1.06 },
        {
          scale: 1.2,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: el.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-chapter="begin"
      aria-label="Request your portfolio"
      className="relative overflow-hidden border-b border-hairline/60"
    >
      <div className="absolute inset-0" aria-hidden>
        <Parallax speed={0.12} className="absolute inset-x-0 -top-[14%] h-[128%]">
          <div ref={zoomRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/images/campus.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: "saturate(0.55) contrast(1.08) brightness(0.42)" }}
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background/85" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="shell relative py-24 text-center sm:py-32">
        <Reveal>
          <p className="eyebrow-brass">Chapter IX — The invitation</p>
        </Reveal>
        <WordReveal
          as="h2"
          text="Your course can be next."
          delay={0.1}
          className="mx-auto mt-6 max-w-2xl text-balance display-section"
        />
        <Reveal delay={0.22}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            Whether your work lives in code, calculations, field notes, reports,
            drawings, datasets, lesson plans, research or media — GTSS can help
            turn it into a professional digital story.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic className="w-full sm:w-auto">
              <Link
                to="/request"
                className="group inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md bg-brass px-7 font-sans text-sm font-semibold tracking-tight text-brass-foreground shadow-[0_8px_28px_-12px_rgba(226,168,75,0.55)] transition-colors duration-300 hover:bg-[#EDBB60]"
              >
                Request My Portfolio
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Link
                to="/portfolios"
                className="inline-flex h-12 w-full sm:w-auto justify-center items-center rounded-md border border-ink-tertiary/60 bg-background/40 px-7 font-sans text-sm font-semibold tracking-tight text-foreground backdrop-blur transition-colors duration-300 hover:bg-background/70"
              >
                Explore the collection first
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

/**
 * Manifesto — the signature scroll experience.
 * The site's core message pins full-screen and illuminates word by word
 * as you scroll: each word has its own ease curve (fast ramp, soft land),
 * accent words ignite in brass with a glow. Behind it, the campus image
 * breathes (slow scale scrub) and a giant backdrop word drifts.
 *
 * Desktop: pinned scrub scene (+170vh).
 * Mobile: in-view cascade reveal.
 * Reduced motion: fully static, fully legible.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_EXPO, stagger } from "./curves";

const LINES: { text: string; accents?: string[] }[] = [
  { text: "Every graduate carries proof." , accents: ["proof."] },
  { text: "Projects. Research. Code. Field notes. Drawings. Data." },
  { text: "Most of it dies in a lecture hall.", accents: ["dies"] },
  { text: "A degree tells people what you studied." },
  { text: "A portfolio shows them what you can do.", accents: ["portfolio", "do."] },
];

type Word = { word: string; accent: boolean };

function parseLines(): Word[][] {
  return LINES.map(({ text, accents }) =>
    text.split(" ").map((word) => ({
      word,
      accent: (accents ?? []).includes(word),
    }))
  );
}

export function Manifesto() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const lines = parseLines();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
        },
      });

      // Each word illuminates with its OWN curve — never a uniform crawl.
      // The stagger positions compress toward the end (accelerating rhythm).
      wordsRef.current.forEach((el, i) => {
        const accent = el.dataset.accent === "1";
        tl.to(
          el,
          { opacity: 1, duration: 0.7, ease: "power3.out" },
          Math.pow(i, 0.82) * 0.52
        );
        if (accent) {
          tl.to(
            el,
            {
              color: "var(--brass)",
              textShadow: "0 0 34px rgba(226,168,75,0.45)",
              duration: 0.9,
              ease: "power2.inOut",
            },
            Math.pow(i, 0.82) * 0.52 + 0.18
          );
        }
      });

      // The backdrop word drifts opposite the scroll — depth
      tl.fromTo(
        "[data-backdrop]",
        { xPercent: 4 },
        { xPercent: -14, duration: 1, ease: "sine.inOut" },
        0
      );

      // Campus image breathes — slow zoom through the whole scene
      tl.fromTo(
        "[data-breath]",
        { scale: 1.08 },
        { scale: 1.26, duration: 1, ease: "sine.inOut" },
        0
      );

      // The whole text block settles upward slightly at the end
      tl.to(
        "[data-copy]",
        { yPercent: -3, duration: 0.8, ease: "power1.inOut" },
        0.55
      );
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  const registerWord = (el: HTMLSpanElement | null) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      data-chapter="manifesto"
      aria-label="The manifesto"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Breathing backdrop image */}
      <div className="absolute inset-0" aria-hidden>
        <div data-breath className="absolute inset-0 will-change-transform">
          <Image
            src="/images/graduates.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.5) contrast(1.1) brightness(0.3)" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/72 to-background" />
        <div className="absolute inset-0 bg-vignette" />
      </div>

      {/* Drifting backdrop word */}
      <span
        data-backdrop
        aria-hidden
        className="manifesto-backdrop"
      >
        PROOF
      </span>

      {/* The copy */}
      <div
        data-copy
        className="shell relative flex min-h-[100svh] flex-col justify-center py-24"
      >
        <p className="eyebrow-brass mb-8 xl:opacity-90">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brass align-middle" aria-hidden />{" "}
          Chapter III — The manifesto
        </p>

        <div className="max-w-[52rem]">
          {reduce ? (
            /* Reduced motion: static, fully legible */
            lines.map((line, li) => (
              <p
                key={li}
                className={
                  li === 4
                    ? "display-manifesto-lead text-foreground"
                    : "display-manifesto text-ink-secondary"
                }
              >
                {line.map((w, wi) => (
                  <span key={wi} className={w.accent ? "text-brass" : undefined}>
                    {w.word}{" "}
                  </span>
                ))}
              </p>
            ))
          ) : (
            lines.map((line, li) => (
              <motion.p
                key={li}
                className={
                  li === 4
                    ? "display-manifesto-lead text-foreground"
                    : "display-manifesto text-ink-secondary"
                }
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.9, delay: li * 0.05, ease: EASE_EXPO }}
              >
                {line.map((w, wi) => (
                  <span
                    key={wi}
                    ref={registerWord}
                    data-accent={w.accent ? "1" : "0"}
                    className={"m-word " + (w.accent ? "m-accent" : "")}
                  >
                    {w.word}{" "}
                  </span>
                ))}
              </motion.p>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

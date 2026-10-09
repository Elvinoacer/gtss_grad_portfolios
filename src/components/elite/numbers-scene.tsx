"use client";

/**
 * NumbersScene — the evidence chapter.
 * The collection's defining numbers don't sit in a footer strip — they
 * LIVE in the scroll: a pinned scene where monumental counters race to
 * their values (easeOutExpo — sprint then land) while each stat block
 * drifts at a different parallax speed and images float behind.
 *
 * Desktop: pinned +150% with scrub-linked counters.
 * Mobile: counters fire once on entry.
 * Reduced motion: static final values.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easeOutExpo } from "./curves";
import { portfolios } from "@/content/portfolios";

const STATS = [
  { value: portfolios.length, suffix: "", label: "Live graduate portfolios", sub: "Each built around authentic evidence, deployed on the web" },
  { value: 6, suffix: "", label: "Schools of study", sub: "Engineering to education, agriculture to information" },
  { value: 42, suffix: "+", label: "Degree paths mapped", sub: "Every portfolio structured for its exact profession" },
  { value: 1, suffix: "", label: "University collection", sub: "The Moi University Collection — the first of many", brass: true },
];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export function NumbersScene() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const counters = Array.from(
      section.querySelectorAll<HTMLElement>("[data-count]")
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // static: paint final values immediately
      counters.forEach((el) => {
        el.textContent = String(el.dataset.count);
      });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const setCounter = (el: HTMLElement, v: number) => {
      el.textContent = String(v);
    };

    const ctx = gsap.context(() => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;

      if (desktop) {
        /* ---- Pinned scrub scene ---- */
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              counters.forEach((el, i) => {
                const target = +(el.dataset.count ?? "0");
                const start = 0.1 + i * 0.16;
                const local = clamp01((p - start) / 0.42);
                setCounter(el, Math.round(easeOutExpo(local) * target));
              });
            },
          },
        });

        // Depth layers — each stat drifts at its own speed
        st.fromTo(
          "[data-depth='1']",
          { yPercent: 16, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.34, ease: "power3.out" },
          0.02
        );
        st.fromTo(
          "[data-depth='2']",
          { yPercent: 34, opacity: 0 },
          { yPercent: -4, opacity: 1, duration: 0.6, ease: "power3.out" },
          0.1
        );
        st.fromTo(
          "[data-depth='3']",
          { yPercent: 52, opacity: 0 },
          { yPercent: -8, opacity: 1, duration: 0.72, ease: "power3.out" },
          0.2
        );
        st.fromTo(
          "[data-depth='4']",
          { yPercent: 70, opacity: 0, scale: 0.94 },
          { yPercent: -2, opacity: 1, scale: 1, duration: 0.82, ease: "expo.out" },
          0.3
        );

        // Floating images drift through at ghost depth
        st.fromTo(
          "[data-ghost-a]",
          { yPercent: 22, xPercent: -4 },
          { yPercent: -26, xPercent: 3, duration: 1, ease: "sine.inOut" },
          0
        );
        st.fromTo(
          "[data-ghost-b]",
          { yPercent: 30, xPercent: 5 },
          { yPercent: -20, xPercent: -3, duration: 1, ease: "sine.inOut" },
          0
        );

        // Backdrop word slides slowly opposite
        st.fromTo(
          "[data-numbackdrop]",
          { xPercent: 2 },
          { xPercent: -10, duration: 1, ease: "none" },
          0
        );
      } else {
        /* ---- Mobile: fire once on entry, eased ---- */
        counters.forEach((el, i) => {
          const target = +(el.dataset.count ?? "0");
          const proxy = { v: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: "top 82%",
            once: true,
            onEnter: () => {
              gsap.to(proxy, {
                v: target,
                duration: 1.5,
                delay: i * 0.14,
                ease: "expo.out",
                onUpdate: () => setCounter(el, Math.round(proxy.v)),
              });
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-chapter="numbers"
      aria-label="The collection in numbers"
      className="relative min-h-[100svh] overflow-hidden border-y border-hairline/60"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-blueprint-fine" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #E2A84B, transparent 70%)" }}
      />

      {/* Ghost images drifting behind the numbers */}
      <div data-ghost-a aria-hidden className="absolute left-[4%] top-[12%] hidden h-[34%] w-[19%] overflow-hidden rounded-2xl border border-hairline/40 opacity-30 lg:block">
        <Image src="/images/engineering.jpg" alt="" fill sizes="20vw" className="object-cover" style={{ filter: "saturate(0.6) brightness(0.7)" }} />
      </div>
      <div data-ghost-b aria-hidden className="absolute right-[5%] bottom-[10%] hidden h-[30%] w-[17%] overflow-hidden rounded-2xl border border-hairline/40 opacity-30 lg:block">
        <Image src="/images/science-lab.jpg" alt="" fill sizes="18vw" className="object-cover" style={{ filter: "saturate(0.6) brightness(0.7)" }} />
      </div>

      {/* Backdrop word */}
      <span data-numbackdrop aria-hidden className="numbers-backdrop">
        EVIDENCE
      </span>

      <div className="shell relative flex min-h-[100svh] flex-col justify-center py-20">
        <p className="eyebrow-brass mb-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brass align-middle" aria-hidden />{" "}
          Chapter IV — The evidence
        </p>
        <h2 className="display-section max-w-2xl text-foreground">
          The collection, in numbers that live in the scroll.
        </h2>

        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:gap-x-16">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-depth={i + 1}
              className={"relative " + (i % 2 === 1 ? "lg:mt-16" : "")}
            >
              <div
                className={
                  "flex items-baseline gap-1 font-display font-extrabold leading-[0.9] tracking-[-0.05em] " +
                  (s.brass ? "text-brass" : "text-foreground")
                }
                style={{ fontSize: "clamp(4.2rem, 9vw, 8.6rem)" }}
              >
                <span
                  data-count={s.value}
                >
                  0
                </span>
                {s.suffix && (
                  <span className="text-[0.55em]" style={{ color: "var(--brass)" }}>
                    {s.suffix}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink-secondary">
                  {s.label}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-brass/50 to-transparent" aria-hidden />
              </div>
              <p className="mt-2 max-w-sm text-[0.82rem] leading-relaxed text-ink-secondary">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

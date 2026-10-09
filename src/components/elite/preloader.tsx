"use client";

/**
 * Cinematic preloader — counter, brand mark, then a three-panel curtain
 * lift that hands off directly into the hero's entrance cascade.
 * Plays once per session; skipped entirely for reduced motion.
 * Phase transitions are deferred to rAF/timeout callbacks so no setState
 * fires synchronously inside effects.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { markIntroDone } from "./intro-state";
import { lockScroll } from "./smooth-scroll";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

type Phase = "idle" | "run" | "exit" | "gone";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(0);
  const decidedRef = useRef(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("gtss-intro");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      markIntroDone();
      const t = window.setTimeout(() => setPhase("gone"), 0);
      return () => window.clearTimeout(t);
    }

    lockScroll(true);
    const isMobile = window.innerWidth < 640;
    const start = performance.now();
    const duration = isMobile ? 850 : 1600;
    let raf = 0;
    let timeout = 0;

    const finish = () => {
      try {
        window.sessionStorage.setItem("gtss-intro", "1");
      } catch (e) {}
      markIntroDone();
      setPhase("exit");
    };

    // Hard fallback timeout ensures preloader never hangs if rAF throttles on mobile/background
    const safetyTimeout = window.setTimeout(finish, duration + 450);

    const tick = (t: number) => {
      if (!decidedRef.current) {
        decidedRef.current = true;
        setPhase("run");
      }
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(finish, isMobile ? 160 : 360);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.clearTimeout(safetyTimeout);
      lockScroll(false);
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = window.setTimeout(() => {
      setPhase("gone");
      lockScroll(false);
    }, 1250);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "idle" || phase === "gone") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100]"
      style={{ pointerEvents: phase === "exit" ? "none" : "auto" }}
    >
      {/* Curtain panels */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-y-0"
          style={{ left: `${i * 33.3334}%`, width: "33.3334%" }}
          initial={{ y: "0%" }}
          animate={phase === "exit" ? { y: "-100%" } : { y: "0%" }}
          transition={{
            duration: 0.92,
            delay: phase === "exit" ? 0.18 + i * 0.1 : 0,
            ease: CURTAIN_EASE,
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background:
                i === 1
                  ? "linear-gradient(180deg, #0C0F14 0%, #080A0D 100%)"
                  : "#080A0D",
              boxShadow: "inset 1px 0 0 rgba(36,42,51,0.6)",
            }}
          />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={phase === "exit" ? { opacity: 0, y: -34 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.34em] text-brass">
          GTSS Graduate Portfolios
        </p>
        <p className="mt-2 font-display text-[clamp(2.2rem,6vw,4.6rem)] font-extrabold leading-none tracking-tight text-foreground">
          <span className="tabular-nums">{count}</span>
          <span className="serif-accent text-brass">%</span>
        </p>
        <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-ink-tertiary">
          Moi University Collection
        </p>

        {/* Progress hairline */}
        <div className="mt-10 h-px w-44 overflow-hidden bg-hairline">
          <div
            className="h-full bg-gradient-to-r from-brass-dim via-brass to-brass"
            style={{ width: `${count}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
}

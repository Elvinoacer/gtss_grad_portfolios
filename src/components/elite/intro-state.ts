"use client";

/**
 * Intro choreography bus.
 * The preloader "owns" the first seconds of the session; the hero listens
 * for `introDone` so its entrance cascade begins exactly as the curtain
 * lifts — a single continuous cinematic handoff.
 */

import { useEffect, useState } from "react";

type Listener = () => void;

let done = false;
const listeners = new Set<Listener>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

export function isIntroDone() {
  return done;
}

export function subscribeIntro(listener: Listener) {
  listeners.add(listener);
  if (done) listener();
  return () => {
    listeners.delete(listener);
  };
}

/** React binding — true once the intro curtain begins to lift */
export function useIntroDone() {
  const [isDone, setIsDone] = useState(isIntroDone);
  useEffect(() => {
    const unsub = subscribeIntro(() => setIsDone(true));
    const safety = setTimeout(() => {
      markIntroDone();
      setIsDone(true);
    }, 1800);
    return () => {
      unsub();
      clearTimeout(safety);
    };
  }, []);
  return isDone;
}

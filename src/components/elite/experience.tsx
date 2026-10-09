"use client";

/**
 * ExperienceLayer — the elite motion substrate:
 * Lenis + ScrollTrigger heartbeat, cinematic preloader, custom cursor,
 * animated film grain, and the scroll progress rail.
 * Mounted once in the root layout, outside the router.
 */

import { motion, useScroll, useSpring } from "framer-motion";
import { SmoothScroll } from "./smooth-scroll";
import { Preloader } from "./preloader";
import { CustomCursor } from "./cursor";
import { ChapterRail } from "./chapter-rail";

function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });
  return (
    <div className="progress-rail-track" aria-hidden>
      <motion.div className="progress-rail-fill" style={{ scaleY }} />
    </div>
  );
}

function MobileScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.2,
  });
  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[60] h-[2.5px] bg-gradient-to-r from-brass-dim via-brass to-[#EDBB60] origin-left lg:hidden pointer-events-none"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

export function ExperienceLayer() {
  return (
    <>
      <MobileScrollProgress />
      <SmoothScroll />
      <Preloader />
      <CustomCursor />
      <ChapterRail />
      <ScrollProgressRail />
      <div className="grain-cinema" aria-hidden />
    </>
  );
}

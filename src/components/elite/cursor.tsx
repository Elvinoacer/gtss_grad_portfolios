"use client";

/**
 * Custom cursor — a fast dot and a lagging ring.
 * Rings grow over interactive elements, morph into a brass "VIEW" pill over
 * media, and snap to magnetic elements' live bounds. Fine pointers only.
 */

import { useEffect, useRef } from "react";

const RING_SIZE = 40;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || !dot || !ring) return;
    if (reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...mouse };
    const ringPos = { ...mouse };
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let pressed = false;
    let magnetEl: HTMLElement | null = null;
    let mode: "default" | "link" | "view" = "default";

    let raf = 0;
    const loop = () => {
      let tx = mouse.x;
      let ty = mouse.y;
      let snapScale = 1;

      if (magnetEl) {
        const r = magnetEl.getBoundingClientRect();
        tx = r.left + r.width / 2;
        ty = r.top + r.height / 2;
        const avg = (r.width + r.height) / 2;
        snapScale = Math.min(2.2, Math.max(1.1, (avg + 16) / RING_SIZE));
      }

      const modeScale = mode === "view" ? 2.2 : mode === "link" ? 1.55 : 1;
      targetScale = snapScale * modeScale * (pressed ? 0.8 : 1);

      dotPos.x += (mouse.x - dotPos.x) * 0.6;
      dotPos.y += (mouse.y - dotPos.y) * 0.6;
      const ringLerp = magnetEl ? 0.24 : 0.13;
      ringPos.x += (tx - ringPos.x) * ringLerp;
      ringPos.y += (ty - ringPos.y) * ringLerp;
      scale += (targetScale - scale) * 0.15;

      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.55 : 1})`;
      dot.style.opacity = visible && mode === "default" && !magnetEl ? "1" : "0";
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.opacity = visible ? "1" : "0";
      if (ring.dataset.mode !== mode) ring.dataset.mode = mode;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      visible = true;
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      const view = target.closest('[data-cursor="view"]') as HTMLElement | null;
      if (view) {
        mode = "view";
        magnetEl = null;
        return;
      }

      magnetEl = target.closest("[data-magnetic]") as HTMLElement | null;

      const interactive = target.closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], summary, [data-cursor="link"]'
      );
      mode = interactive || magnetEl ? "link" : "default";
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };

    const onLeaveDoc = (e: MouseEvent) => {
      if (!e.relatedTarget) visible = false;
    };
    const onEnterDoc = () => {
      visible = true;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseenter", onEnterDoc);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseenter", onEnterDoc);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-mode="default" aria-hidden>
        <span className="cursor-label">View</span>
      </div>
    </>
  );
}

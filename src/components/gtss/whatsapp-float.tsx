"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { site } from "@/lib/site";
import { useRouter } from "@/lib/router";

/** Non-intrusive persistent WhatsApp CTA (spec §41, §63) */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { path } = useRouter();
  const reduce = useReducedMotion();

  useEffect(() => {
    let nearFooter = false;
    const footerEl = document.querySelector("footer");
    let observer: IntersectionObserver | null = null;

    const updateVisibility = () => {
      const scrolledEnough = window.scrollY > 800;
      const scrollDistToBottom =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      const closeToBottom = scrollDistToBottom < 550 || nearFooter;
      setVisible(scrolledEnough && !closeToBottom);
    };

    if (footerEl && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          nearFooter = entry.isIntersecting;
          updateVisibility();
        },
        { rootMargin: "120px 0px 0px 0px" }
      );
      observer.observe(footerEl);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  // Never compete with the request flow's own CTAs
  if (path.startsWith("/request")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-3.5 z-40 sm:bottom-6 sm:right-6"
          style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
        >
          {dismissed ? (
            <button
              type="button"
              onClick={() => setDismissed(false)}
              aria-label="Reopen WhatsApp chat shortcut"
              className="grid size-10 sm:size-11 place-items-center rounded-full border border-emerald-400/50 bg-[#0c120e]/95 text-emerald-400 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-emerald-400 active:scale-95"
            >
              <MessageCircle className="size-5" aria-hidden />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 shadow-2xl">
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss WhatsApp shortcut"
                className="grid size-7 sm:size-8 place-items-center rounded-full border border-hairline bg-surface/90 text-ink-secondary backdrop-blur-md transition-colors hover:text-foreground active:scale-95"
              >
                <X className="size-3.5" aria-hidden />
              </button>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with GTSS on WhatsApp"
                className="group inline-flex h-10 sm:h-12 items-center gap-2 rounded-full border border-emerald-400/40 bg-[#0c120e]/95 px-3.5 sm:px-5 font-sans text-xs sm:text-sm font-semibold text-foreground shadow-[0_12px_36px_-10px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/70 active:scale-95"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <MessageCircle className="size-4 text-emerald-300" aria-hidden />
                <span className="hidden sm:inline">Ask GTSS on WhatsApp</span>
                <span className="sm:hidden font-mono tracking-tight text-xs">WhatsApp</span>
              </a>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

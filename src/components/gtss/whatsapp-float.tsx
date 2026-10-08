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
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never compete with the request flow's own CTAs
  if (dismissed || path.startsWith("/request")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss WhatsApp shortcut"
              className="grid size-8 place-items-center rounded-md border border-hairline bg-surface/80 text-ink-tertiary backdrop-blur transition-colors hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden />
            </button>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-emerald-400/30 bg-[#0f1512]/90 px-5 font-sans text-[0.83rem] font-semibold text-foreground shadow-[0_18px_44px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60"
            >
              <MessageCircle className="size-4 text-emerald-300" aria-hidden />
              Ask GTSS on WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

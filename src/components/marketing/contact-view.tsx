"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, MessageCircle, MapPin } from "lucide-react";
import { Link, usePageTitle } from "@/lib/router";
import { Reveal } from "@/components/gtss/ui";
import { site } from "@/lib/site";

/** Contact — simple, direct, no form theater (spec §41) */
export function ContactView() {
  usePageTitle("Contact");
  const [copied, setCopied] = useState(false);

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-16 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <p className="eyebrow-brass">Contact</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.0] tracking-tight text-foreground">
            One conversation. No contact-form theater.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            WhatsApp for speed, email for detail — or the full request flow if
            you already know what you want.
          </p>
        </div>
      </section>

      <section className="shell pt-16" aria-label="Contact channels">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between rounded-2xl border border-brass/30 bg-brass/[0.05] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brass/60"
            >
              <div>
                <span className="grid size-11 place-items-center rounded-lg border border-brass/40 bg-brass/10">
                  <MessageCircle className="size-5 text-brass" aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-xl font-bold tracking-tight text-foreground">
                  Ask GTSS on WhatsApp
                </h2>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-secondary">
                  The fastest route — usually the same day. Say which course
                  you study and we'll take it from there.
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-brass">
                Start the chat
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="group flex h-full w-full flex-col justify-between rounded-2xl border border-hairline bg-surface/50 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-ink-tertiary">
              <div>
                <span className="grid size-11 place-items-center rounded-lg border border-hairline bg-raised">
                  {copied ? (
                    <Check className="size-5 text-brass" aria-hidden />
                  ) : (
                    <Mail className="size-5 text-ink-secondary" aria-hidden />
                  )}
                </span>
                <h2 className="mt-6 font-display text-xl font-bold tracking-tight text-foreground">
                  {copied ? "Email copied" : "Email the studio"}
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block font-mono text-[0.85rem] text-ink-secondary hover:text-brass transition-colors"
                >
                  {site.email}
                </a>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-tertiary">
                  For departments, cohorts and graduate inquiries.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(site.email);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 2200);
                    } catch {
                      /* clipboard unavailable */
                    }
                  }}
                  className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-tertiary transition-colors hover:text-brass"
                >
                  {copied ? "Copied to clipboard" : "Click to copy"}
                </button>
                <span className="text-ink-tertiary/40">·</span>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-brass hover:underline"
                >
                  Open mail client
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <Link
              to="/request"
              className="group flex h-full flex-col justify-between rounded-2xl border border-hairline bg-surface/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink-tertiary"
            >
              <div>
                <span className="grid size-11 place-items-center rounded-lg border border-hairline bg-raised">
                  <MapPin className="size-5 text-ink-secondary" aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-xl font-bold tracking-tight text-foreground">
                  Already decided?
                </h2>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-secondary">
                  Skip the small talk — send the seven-step commission brief
                  and GTSS will reply with direction.
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-brass">
                Open the request flow
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[0.75rem] leading-relaxed text-ink-tertiary">
            {site.disclaimer}
          </p>
        </Reveal>
      </section>
    </div>
  );
}

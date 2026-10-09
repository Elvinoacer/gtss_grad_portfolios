"use client";

import { Link } from "@/lib/router";
import { getPortfolio } from "@/content/portfolios";
import { schools, university } from "@/content/schools";
import { site } from "@/lib/site";
import { WordReveal, Reveal } from "./motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer id="site-footer" className="relative mt-24 border-t border-hairline bg-[#07090C]">
      {/* Closing statement (spec §91) */}
      <div className="shell relative py-20 text-center sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
        />
        <Reveal>
          <p className="eyebrow-brass">Before you go</p>
        </Reveal>
        <WordReveal
          as="h2"
          text="You already did the learning. Make the work visible."
          delay={0.1}
          className="mx-auto mt-6 max-w-3xl text-balance display-section"
        />
        <Reveal delay={0.25}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              to="/request"
              className="group inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md bg-brass px-7 font-sans text-sm font-semibold tracking-tight text-brass-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60]"
            >
              Request My Portfolio
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full sm:w-auto justify-center items-center gap-2.5 rounded-md border border-hairline bg-surface/40 px-6 font-sans text-sm font-semibold tracking-tight text-ink-secondary transition-all duration-300 hover:border-ink-tertiary hover:bg-raised hover:text-foreground"
            >
              <MessageCircle className="size-4 text-emerald-400" aria-hidden />
              Consult on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>

      {/* Link columns */}
      <div className="border-t border-hairline/70">
        <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="font-display text-lg font-bold tracking-tight text-foreground">
              GTSS <span className="font-medium text-ink-secondary">Graduate Portfolios</span>
            </p>
            <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-ink-secondary">
              A curated digital exhibition of emerging professional talent —
              beginning with {university.collectionLabel}.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-ink-tertiary">
              {site.domain}
            </p>
          </div>

          <FooterCol title="Explore">
            <FooterLink to="/portfolios">Portfolio Gallery</FooterLink>
            <FooterLink to="/how-it-works">How It Works</FooterLink>
            <FooterLink to="/request">Request a Portfolio</FooterLink>
            <FooterLink to="/for-graduates">For Graduates</FooterLink>
            <FooterLink to="/for-departments">For Departments</FooterLink>
          </FooterCol>

          <FooterCol title="Collection">
            {schools.slice(0, 6).map((s) => (
              <FooterLink
                key={s.slug}
                to={`/universities/moi-university/schools/${s.slug}`}
              >
                {s.shortName}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="GTSS">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <a
              href="https://gtss.software"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-ink-secondary transition-colors hover:text-brass"
            >
              Main Website
              <span aria-hidden className="text-ink-tertiary">↗</span>
            </a>
          </FooterCol>

          <FooterCol title="Portfolio Examples">
            <FooterLink to={getPortfolio("kevin-mwangi-computer-science")!.liveUrl}>
              Computer Science
            </FooterLink>
            <FooterLink to={getPortfolio("faith-wanjiru-civil-structural")!.liveUrl}>
              Civil Engineering
            </FooterLink>
            <FooterLink to={getPortfolio("naomi-wambui-actuarial-science")!.liveUrl}>
              Actuarial Science
            </FooterLink>
            <FooterLink to={getPortfolio("lydia-chebet-industrial-textile")!.liveUrl}>
              Industrial &amp; Textile
            </FooterLink>
          </FooterCol>
        </div>
      </div>

      {/* Legal layer & Independent Initiative notice */}
      <div className="border-t border-hairline/70">
        <div className="shell flex flex-col gap-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <div className="rounded-xl border border-hairline/80 bg-surface/50 p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-brass" aria-hidden />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brass">
                Independent Initiative Notice
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              {site.disclaimer}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <p className="font-mono uppercase tracking-[0.16em] text-ink-tertiary">
              © {new Date().getFullYear()} GTSS · Graduate Portfolios
            </p>
            <p className="font-mono uppercase tracking-[0.16em] text-ink-secondary">
              Beyond the Degree · Independent Professional Platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brass">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-ink-secondary transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

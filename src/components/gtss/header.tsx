"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Link, useRouter, scrollToSection } from "@/lib/router";
import { LogoLockup } from "./ui";
import { Magnetic } from "@/components/elite/magnetic";
import { schools } from "@/content/schools";

export function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [schoolsOpen, setSchoolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { path, navigate } = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSchoolsOpen(false);
  }, [path]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isHome = path === "/";

  const navLinks = [
    { label: "Explore", to: "/portfolios" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "For Graduates", to: "/for-graduates" },
    { label: "For Departments", to: "/for-departments" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-hairline/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-background/60 to-transparent"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brass focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brass-foreground"
      >
        Skip to content
      </a>

      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link to="/" ariaLabel="GTSS Graduate Portfolios — home" className="shrink-0">
          <LogoLockup />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(0, 1).map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}

          {/* Schools dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSchoolsOpen(true)}
            onMouseLeave={() => setSchoolsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={schoolsOpen}
              aria-haspopup="true"
              onClick={() => setSchoolsOpen((v) => !v)}
              className="flex min-h-[44px] items-center gap-1.5 rounded-md px-3.5 font-sans text-[0.83rem] font-medium text-ink-secondary transition-colors hover:text-foreground"
            >
              Schools
              <ChevronDown
                className={`size-3.5 transition-transform duration-300 ${schoolsOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {schoolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full w-[26rem] pt-2"
                >
                  <div className="overflow-hidden rounded-xl border border-hairline bg-popover/95 p-2 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                    <p className="eyebrow px-3 pb-2 pt-2">Moi University · Main Campus</p>
                    {schools.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/universities/moi-university/schools/${s.slug}`}
                        className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                      >
                        <span
                          className="mt-1.5 size-2 shrink-0 rounded-[3px]"
                          style={{ background: s.accent }}
                          aria-hidden
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">
                            {s.shortName}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-ink-secondary">
                            {s.statement}
                          </span>
                        </span>
                        <ArrowRight
                          className="ml-auto mt-1 size-3.5 shrink-0 text-ink-tertiary transition-all group-hover:translate-x-0.5 group-hover:text-brass"
                          aria-hidden
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic strength={0.25} className="hidden sm:inline-block">
            <Link
              to="/request"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-brass px-5 font-sans text-[0.83rem] font-semibold tracking-tight text-brass-foreground shadow-[0_0_0_1px_rgba(226,168,75,0.35),0_8px_28px_-12px_rgba(226,168,75,0.55)] transition-colors duration-300 hover:bg-[#EDBB60]"
            >
              Request My Portfolio
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </Magnetic>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-md border border-hairline text-foreground transition-colors hover:bg-raised lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 bg-background/97 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="shell flex h-[calc(100%-4rem)] flex-col overflow-y-auto pb-10 pt-6"
            >
              {(
                [
                  { label: "Home", to: "/" },
                  { label: "Explore Portfolios", to: "/portfolios" },
                  ...schools.map((s) => ({
                    label: s.shortName,
                    to: `/universities/moi-university/schools/${s.slug}`,
                    small: true,
                  })),
                  { label: "How It Works", to: "/how-it-works" },
                  { label: "For Graduates", to: "/for-graduates" },
                  { label: "For Departments", to: "/for-departments" },
                  { label: "About GTSS", to: "/about" },
                  { label: "Contact", to: "/contact" },
                ] as Array<{ label: string; to: string; small?: boolean }>
              ).map((l) => (
                <motion.div
                  key={l.to + l.label}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={l.to}
                    className={`flex min-h-[3.25rem] items-center justify-between border-b border-hairline/60 py-2 text-foreground transition-colors ${
                      l.small ? "pl-4 text-[0.95rem] text-ink-secondary" : "font-display text-xl font-bold tracking-tight"
                    }`}
                  >
                    {l.label}
                    <ArrowRight className="size-4 text-ink-tertiary" aria-hidden />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                className="mt-8"
              >
                <Link
                  to="/request"
                  className="flex h-12 items-center justify-center gap-2 rounded-md bg-brass px-6 font-sans text-[0.95rem] font-semibold text-brass-foreground"
                >
                  Request My Portfolio
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const { path, navigate } = useRouter();
  const active = path.startsWith(to);
  return (
    <Link
      to={to}
      className={`flex min-h-[44px] items-center rounded-md px-3.5 font-sans text-[0.83rem] font-medium transition-colors ${
        active ? "text-foreground" : "text-ink-secondary hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}


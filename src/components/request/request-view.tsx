"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
  BookOpen,
  FolderOpen,
  Compass,
  Link2,
  Phone,
  ClipboardCheck,
  PartyPopper,
  AlertCircle,
} from "lucide-react";
import { schools, university } from "@/content/schools";
import { evidenceChecklist, site } from "@/lib/site";
import { usePageTitle, Link } from "@/lib/router";

const STORAGE_KEY = "gtss-request-draft-v1";

const STEPS = [
  { id: 1, label: "You", icon: GraduationCap },
  { id: 2, label: "Your Course", icon: BookOpen },
  { id: 3, label: "Your Evidence", icon: FolderOpen },
  { id: 4, label: "Your Direction", icon: Compass },
  { id: 5, label: "Your Links", icon: Link2 },
  { id: 6, label: "Contact", icon: Phone },
  { id: 7, label: "Review", icon: ClipboardCheck },
] as const;

interface Draft {
  fullName: string;
  candidateStatus: string;
  university: string;
  campus: string;
  graduationYear: string;
  school: string;
  degree: string;
  courseNotListed: boolean;
  specialization: string;
  careerDirection: string;
  rolesInterest: string;
  evidence: string[];
  targetRoles: string;
  knownFor: string;
  recruiterUnderstanding: string;
  visualPreference: string;
  links: {
    linkedin: string;
    github: string;
    behance: string;
    drive: string;
    portfolio: string;
    website: string;
    publications: string;
    other: string;
  };
  whatsapp: string;
  email: string;
  preferredContact: string;
  bestTime: string;
  company: string; // honeypot
}

const emptyDraft: Draft = {
  fullName: "",
  candidateStatus: "student",
  university: "Moi University",
  campus: "Main Campus (Kesses)",
  graduationYear: "",
  school: "",
  degree: "",
  courseNotListed: false,
  specialization: "",
  careerDirection: "",
  rolesInterest: "",
  evidence: [],
  targetRoles: "",
  knownFor: "",
  recruiterUnderstanding: "",
  visualPreference: "",
  links: {
    linkedin: "",
    github: "",
    behance: "",
    drive: "",
    portfolio: "",
    website: "",
    publications: "",
    other: "",
  },
  whatsapp: "",
  email: "",
  preferredContact: "whatsapp",
  bestTime: "",
  company: "",
};

export function RequestView({ prefillCourse }: { prefillCourse?: string }) {
  usePageTitle("Request a Portfolio");
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const hydrated = useRef(false);

  /* Restore draft + apply course prefill */
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as Partial<Draft>;
          setDraft((d) => ({ ...d, ...saved, links: { ...d.links, ...(saved.links ?? {}) } }));
        }
      } catch {
        /* corrupted draft — start fresh */
      }
      const params = new URLSearchParams(window.location.search);
      const course =
        prefillCourse ??
        params.get("course") ??
        window.location.hash.split("?course=")[1]?.split("&")[0];
      if (course) {
        const decoded = decodeURIComponent(course);
        const match = schools.find(
          (s) =>
            s.shortName.toLowerCase() === decoded.toLowerCase() ||
            decoded.toLowerCase().includes(s.shortName.toLowerCase())
        );
        const degreeMatch = schools
          .flatMap((s) => s.degrees.map((d) => ({ s, d })))
          .find(
            ({ d }) =>
              (d.shortName ?? "").toLowerCase() === decoded.toLowerCase() ||
              d.slug === decoded.toLowerCase().replace(/\s+/g, "-")
          );
        setDraft((prev) => ({
          ...prev,
          school: match?.slug ?? degreeMatch?.s.slug ?? prev.school,
          degree: degreeMatch?.d.name ?? decoded,
        }));
      }
      hydrated.current = true;
    });
  }, [prefillCourse]);

  /* Persist draft */
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* storage unavailable */
    }
  }, [draft]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const schoolDegrees = useMemo(() => {
    const s = schools.find((x) => x.slug === draft.school);
    return s?.degrees ?? [];
  }, [draft.school]);

  function validate(current: number): boolean {
    const e: Record<string, string> = {};
    if (current === 1) {
      if (draft.fullName.trim().length < 2) e.fullName = "Your name helps us address you properly.";
      if (draft.university.trim().length < 2) e.university = "Which institution are you at?";
    }
    if (current === 2) {
      if (!draft.courseNotListed && draft.degree.trim().length < 2)
        e.degree = "Choose your degree — or tick “not listed”.";
    }
    if (current === 6) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()))
        e.email = "A valid email so we can reply.";
      if (draft.preferredContact === "whatsapp" && draft.whatsapp.trim().length < 7)
        e.whatsapp = "Add your WhatsApp number, or switch preferred contact to email.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate(step)) return;
    setStep((s) => Math.min(7, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    for (let s = 1; s <= 6; s++) {
      if (!validate(s)) {
        setStep(s);
        return;
      }
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        fullName: draft.fullName,
        candidateStatus: draft.candidateStatus,
        university: draft.university,
        campus: draft.campus,
        graduationYear: draft.graduationYear ? parseInt(draft.graduationYear, 10) : undefined,
        school: schools.find((s) => s.slug === draft.school)?.name ?? "",
        degree: draft.degree,
        courseNotListed: draft.courseNotListed,
        specialization: draft.specialization,
        careerDirection: draft.careerDirection,
        rolesInterest: draft.rolesInterest,
        evidence: draft.evidence,
        targetRoles: draft.targetRoles,
        knownFor: draft.knownFor,
        recruiterUnderstanding: draft.recruiterUnderstanding,
        visualPreference: draft.visualPreference,
        links: draft.links,
        whatsapp: draft.whatsapp,
        email: draft.email,
        preferredContact: draft.preferredContact,
        bestTime: draft.bestTime,
        company: draft.company,
        source: document.referrer || "direct",
      };
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Submission failed");
      }
      setReference(data.id);
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Submission failed — please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return <SuccessState reference={reference} draft={draft} />;
  }

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hairline/60 bg-blueprint bg-vignette pb-12 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-grain" aria-hidden />
        <div className="shell relative">
          <p className="eyebrow-brass">The commission</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.1rem,4.4vw,3.8rem)] font-bold leading-[1.0] tracking-tight text-foreground">
            Let's turn your work into something people can explore.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-secondary">
            This is closer to commissioning a professional identity than
            filling a contact form. Seven calm steps — your progress is saved
            on this device as you go.
          </p>
        </div>
      </section>

      <div className="shell grid gap-8 pt-8 sm:pt-12 lg:gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left rail / mobile compact progress */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {/* Mobile compact header (< lg) */}
          <div className="lg:hidden" aria-live="polite">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brass">
                Step {step} of 7
              </span>
              <span className="font-display text-sm font-semibold text-foreground">
                {STEPS[step - 1]?.label}
              </span>
            </div>
            <div
              className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-raised"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={7}
            >
              <motion.div
                className="h-full bg-brass"
                initial={false}
                animate={{ width: `${(step / 7) * 100}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            {/* Quick step jump pills on mobile */}
            <div className="no-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 touch-pan-x">
              {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => s.id < step && setStep(s.id)}
                    disabled={s.id > step}
                    aria-label={`Step ${s.id}: ${s.label}`}
                    className={`flex h-7 shrink-0 items-center gap-1.5 rounded-full px-2.5 font-mono text-[0.62rem] transition-colors ${
                      active
                        ? "bg-brass font-semibold text-brass-foreground shadow-sm"
                        : done
                        ? "border border-brass/40 bg-surface text-brass"
                        : "border border-hairline/60 bg-surface/50 text-ink-tertiary opacity-45"
                    }`}
                  >
                    <span>0{s.id}</span>
                    <span className="max-w-[4.8rem] truncate">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop full rail (>= lg) */}
          <div className="hidden lg:block">
            <div aria-live="polite">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-tertiary">
                Step {step} of 7
              </p>
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-raised"
                role="progressbar"
                aria-valuenow={step}
                aria-valuemin={1}
                aria-valuemax={7}
              >
                <motion.div
                  className="h-full bg-brass"
                  initial={false}
                  animate={{ width: `${(step / 7) * 100}%` }}
                  transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <ol className="mt-8 space-y-1">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => s.id < step && setStep(s.id)}
                      disabled={s.id > step}
                      className={`flex w-full min-h-[2.75rem] items-center gap-3.5 rounded-lg px-3.5 py-2.5 text-left transition-colors ${
                        active
                          ? "bg-brass/10 text-foreground"
                          : done
                          ? "text-ink-secondary hover:bg-surface"
                          : "text-ink-tertiary"
                      }`}
                    >
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-md border ${
                          done
                            ? "border-brass/60 bg-brass/15 text-brass"
                            : active
                            ? "border-brass/60 text-brass"
                            : "border-hairline text-ink-tertiary"
                        }`}
                      >
                        {done ? <Check className="size-3.5" aria-hidden /> : <Icon className="size-3.5" aria-hidden />}
                      </span>
                      <span className="text-[0.88rem] font-medium">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <p className="mt-8 rounded-lg border border-hairline bg-surface/50 p-4 text-[0.75rem] leading-relaxed text-ink-tertiary">
              Prefer talking first?{" "}
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass hover:underline"
              >
                Ask GTSS on WhatsApp
              </a>{" "}
              — no forms required.
            </p>
          </div>
        </aside>

        {/* Form card */}
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface/60 p-5 sm:p-10">
          <div className="absolute inset-0 bg-blueprint-fine opacity-20" aria-hidden />
          <div className="relative">
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={draft.company}
              onChange={(e) => set("company", e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -22 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && <StepYou draft={draft} set={set} errors={errors} />}
                {step === 2 && (
                  <StepCourse
                    draft={draft}
                    set={set}
                    errors={errors}
                    schoolDegrees={schoolDegrees}
                  />
                )}
                {step === 3 && <StepEvidence draft={draft} set={set} />}
                {step === 4 && <StepDirection draft={draft} set={set} />}
                {step === 5 && <StepLinks draft={draft} set={set} />}
                {step === 6 && <StepContact draft={draft} set={set} errors={errors} />}
                {step === 7 && (
                  <StepReview draft={draft} onEdit={(s) => setStep(s)} schools={schools} />
                )}
              </motion.div>
            </AnimatePresence>

            {submitError && (
              <p
                role="alert"
                className="mt-6 flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-[0.85rem] text-foreground"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
                {submitError}
              </p>
            )}

            {/* Nav buttons */}
            <div className="mt-10 flex items-center justify-between border-t border-hairline/70 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex h-11 items-center gap-2 rounded-md px-3 font-sans text-sm font-semibold text-ink-secondary transition-colors hover:text-foreground sm:px-4"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < 7 ? (
                <button
                  type="button"
                  onClick={next}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-5 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60] sm:px-6"
                >
                  Continue
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-5 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60] disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
                >
                  {submitting ? (
                    <>
                      <span
                        className="size-4 animate-spin rounded-full border-2 border-brass-foreground/30 border-t-brass-foreground"
                        aria-hidden
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Start My Portfolio Request
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Mobile helper link */}
            <p className="mt-6 text-center text-xs text-ink-tertiary lg:hidden">
              Prefer talking first?{" "}
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass underline decoration-brass/40 underline-offset-2 hover:decoration-brass"
              >
                Chat with GTSS on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared field components                                             */
/* ------------------------------------------------------------------ */

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-secondary">
          {label}
          {required && <span className="ml-1 text-brass">*</span>}
        </span>
        {hint && (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-tertiary">
            {hint}
          </span>
        )}
      </span>
      <span className="mt-2.5 block">{children}</span>
      {error && (
        <span role="alert" className="mt-2 flex items-center gap-1.5 text-[0.75rem] text-destructive">
          <AlertCircle className="size-3" aria-hidden />
          {error}
        </span>
      )}
    </label>
  );
}

const inputCls =
  "h-11 w-full rounded-md border border-hairline bg-background/60 px-4 font-sans text-base text-foreground placeholder:text-ink-tertiary transition-colors focus:border-brass/60 focus:outline-none focus:ring-2 focus:ring-brass/25 sm:text-sm";

const areaCls =
  "min-h-[5.5rem] w-full rounded-md border border-hairline bg-background/60 px-4 py-3 font-sans text-base text-foreground placeholder:text-ink-tertiary transition-colors focus:border-brass/60 focus:outline-none focus:ring-2 focus:ring-brass/25 sm:text-sm";

function StepYou({
  draft,
  set,
  errors,
}: {
  draft: Draft;
  set: <K extends keyof Draft>(k: K, v: Draft[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <fieldset>
      <legend className="font-display text-2xl font-bold tracking-tight text-foreground">You</legend>
      <p className="mt-2 text-[0.85rem] text-ink-secondary">
        Who you are today — student, finalist or graduate.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full name" required error={errors.fullName}>
            <input
              type="text"
              value={draft.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="e.g. Kevin Mwangi"
              className={inputCls}
              autoComplete="name"
            />
          </Field>
        </div>
        <Field label="Current status" required>
          <select
            value={draft.candidateStatus}
            onChange={(e) => set("candidateStatus", e.target.value)}
            className={inputCls}
          >
            <option value="student">Student</option>
            <option value="final-year">Final-year student</option>
            <option value="fresh-graduate">Fresh graduate</option>
            <option value="early-career">Early-career professional</option>
          </select>
        </Field>
        <Field label="Graduation year" hint="expected or completed">
          <input
            type="number"
            min={1990}
            max={2035}
            value={draft.graduationYear}
            onChange={(e) => set("graduationYear", e.target.value)}
            placeholder="2026"
            className={inputCls}
          />
        </Field>
        <Field label="University / institution" required error={errors.university}>
          <input
            type="text"
            value={draft.university}
            onChange={(e) => set("university", e.target.value)}
            placeholder="Moi University"
            className={inputCls}
          />
        </Field>
        <Field label="Campus" hint="optional">
          <input
            type="text"
            value={draft.campus}
            onChange={(e) => set("campus", e.target.value)}
            placeholder="Main Campus (Kesses)"
            className={inputCls}
          />
        </Field>
      </div>
    </fieldset>
  );
}

function StepCourse({
  draft,
  set,
  errors,
  schoolDegrees,
}: {
  draft: Draft;
  set: <K extends keyof Draft>(k: K, v: Draft[K]) => void;
  errors: Record<string, string>;
  schoolDegrees: { name: string; shortName?: string; slug: string }[];
}) {
  return (
    <fieldset>
      <legend className="font-display text-2xl font-bold tracking-tight text-foreground">
        Your Course
      </legend>
      <p className="mt-2 text-[0.85rem] text-ink-secondary">
        Not locked into an existing template — your course shapes the design.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="School / faculty">
          <select
            value={draft.school}
            onChange={(e) => {
              set("school", e.target.value);
              set("degree", "");
            }}
            className={inputCls}
          >
            <option value="">Choose a school…</option>
            {schools.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>

        {draft.courseNotListed ? (
          <Field label="Your programme" required>
            <input
              type="text"
              value={draft.degree}
              onChange={(e) => set("degree", e.target.value)}
              placeholder="Type your course exactly as offered"
              className={inputCls}
            />
          </Field>
        ) : (
          <Field label="Degree / programme" required error={errors.degree}>
            {schoolDegrees.length > 0 ? (
              <select
                value={draft.degree}
                onChange={(e) => set("degree", e.target.value)}
                className={inputCls}
              >
                <option value="">Choose your degree…</option>
                {schoolDegrees.map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}
                  </option>
                ))}
                {draft.degree && !schoolDegrees.some((d) => d.name === draft.degree) && (
                  <option value={draft.degree}>{draft.degree}</option>
                )}
              </select>
            ) : (
              <input
                type="text"
                value={draft.degree}
                onChange={(e) => set("degree", e.target.value)}
                placeholder="e.g. BSc in Computer Science"
                className={inputCls}
              />
            )}
          </Field>
        )}

        <Field label="Specialization / major" hint="optional">
          <input
            type="text"
            value={draft.specialization}
            onChange={(e) => set("specialization", e.target.value)}
            placeholder="e.g. Structural, Software Engineering"
            className={inputCls}
          />
        </Field>
        <Field label="Career direction" hint="optional">
          <input
            type="text"
            value={draft.careerDirection}
            onChange={(e) => set("careerDirection", e.target.value)}
            placeholder="e.g. Graduate Data Analyst"
            className={inputCls}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Roles of interest" hint="separate with commas">
            <input
              type="text"
              value={draft.rolesInterest}
              onChange={(e) => set("rolesInterest", e.target.value)}
              placeholder="e.g. Site Engineer, Design Engineer"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <button
            type="button"
            role="switch"
            aria-checked={draft.courseNotListed}
            onClick={() => {
              set("courseNotListed", !draft.courseNotListed);
              set("degree", draft.courseNotListed ? "" : draft.degree);
            }}
            className="flex min-h-[2.75rem] items-center gap-3 rounded-lg border border-hairline bg-background/40 px-4 py-2.5 text-left transition-colors hover:border-ink-tertiary"
          >
            <span
              className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${
                draft.courseNotListed ? "bg-brass" : "bg-raised"
              }`}
              aria-hidden
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-foreground transition-all ${
                  draft.courseNotListed ? "left-[1.25rem]" : "left-0.5"
                }`}
              />
            </span>
            <span className="text-sm text-ink-secondary">
              My course is not listed — I'll type it myself
            </span>
          </button>
        </div>
      </div>
    </fieldset>
  );
}

function StepEvidence({
  draft,
  set,
}: {
  draft: Draft;
  set: <K extends keyof Draft>(k: K, v: Draft[K]) => void;
}) {
  function toggle(item: string) {
    set(
      "evidence",
      draft.evidence.includes(item)
        ? draft.evidence.filter((e) => e !== item)
        : [...draft.evidence, item]
    );
  }
  return (
    <fieldset>
      <legend className="font-display text-2xl font-bold tracking-tight text-foreground">
        Your Evidence
      </legend>
      <p className="mt-2 text-[0.85rem] text-ink-secondary">
        Tick whatever exists today. You do not need everything here — GTSS can
        design a strong early-career portfolio from truthful academic and
        practical evidence.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {evidenceChecklist.map((item) => {
          const on = draft.evidence.includes(item);
          return (
            <button
              key={item}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => toggle(item)}
              className={`flex min-h-[2.6rem] items-center gap-2.5 rounded-lg border px-3.5 py-2 text-left text-[0.8rem] transition-all duration-200 ${
                on
                  ? "border-brass/60 bg-brass/10 text-foreground"
                  : "border-hairline bg-background/40 text-ink-secondary hover:border-ink-tertiary"
              }`}
            >
              <span
                className={`grid size-4 shrink-0 place-items-center rounded-[4px] border transition-colors ${
                  on ? "border-brass bg-brass text-brass-foreground" : "border-ink-tertiary"
                }`}
                aria-hidden
              >
                {on && <Check className="size-3" />}
              </span>
              <span className="leading-tight">{item}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-8 rounded-lg border border-brass/25 bg-brass/[0.05] p-4 text-[0.8rem] leading-relaxed text-ink-secondary">
        Nothing fabricated, ever. Professional presentation must never require
        invented professional history — that's the platform-wide rule.
      </p>
    </fieldset>
  );
}

function StepDirection({
  draft,
  set,
}: {
  draft: Draft;
  set: <K extends keyof Draft>(k: K, v: Draft[K]) => void;
}) {
  return (
    <fieldset>
      <legend className="font-display text-2xl font-bold tracking-tight text-foreground">
        Your Direction
      </legend>
      <p className="mt-2 text-[0.85rem] text-ink-secondary">
        All optional — GTSS will help you sharpen these together. Don't abandon
        the form because you're still figuring it out.
      </p>

      <div className="mt-8 space-y-6">
        <Field label="What roles are you targeting?">
          <textarea
            value={draft.targetRoles}
            onChange={(e) => set("targetRoles", e.target.value)}
            placeholder="The kind of work you want to be hired for…"
            className={areaCls}
          />
        </Field>
        <Field label="What work do you want to be known for?">
          <textarea
            value={draft.knownFor}
            onChange={(e) => set("knownFor", e.target.value)}
            placeholder="e.g. Building systems that hold up under real load…"
            className={areaCls}
          />
        </Field>
        <Field label="What should a recruiter understand about you in 30 seconds?">
          <textarea
            value={draft.recruiterUnderstanding}
            onChange={(e) => set("recruiterUnderstanding", e.target.value)}
            placeholder="One honest, concrete sentence works best…"
            className={areaCls}
          />
        </Field>
        <Field label="Preferred visual direction" hint="optional">
          <input
            type="text"
            value={draft.visualPreference}
            onChange={(e) => set("visualPreference", e.target.value)}
            placeholder="e.g. clean & technical, editorial, bold — or 'you decide'"
            className={inputCls}
          />
        </Field>
      </div>
    </fieldset>
  );
}

function StepLinks({
  draft,
  set,
}: {
  draft: Draft;
  set: <K extends keyof Draft>(k: K, v: Draft[K]) => void;
}) {
  const linkFields: Array<[keyof Draft["links"], string, string]> = [
    ["linkedin", "LinkedIn", "linkedin.com/in/…"],
    ["github", "GitHub", "github.com/…"],
    ["behance", "Behance", "behance.net/…"],
    ["drive", "Google Drive folder", "drive.google.com/…"],
    ["portfolio", "Existing portfolio", "your-portfolio.com"],
    ["website", "Personal website", "yoursite.com"],
    ["publications", "Publications", "link to papers or posts"],
    ["other", "Other", "anything else worth seeing"],
  ];
  return (
    <fieldset>
      <legend className="font-display text-2xl font-bold tracking-tight text-foreground">
        Your Links
      </legend>
      <p className="mt-2 text-[0.85rem] text-ink-secondary">
        Entirely optional. Share links only — never passwords or private
        account access.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {linkFields.map(([key, label, placeholder]) => (
          <Field key={key} label={label}>
            <input
              type="url"
              value={draft.links[key]}
              onChange={(e) => set("links", { ...draft.links, [key]: e.target.value })}
              placeholder={placeholder}
              className={inputCls}
            />
          </Field>
        ))}
      </div>
    </fieldset>
  );
}

function StepContact({
  draft,
  set,
  errors,
}: {
  draft: Draft;
  set: <K extends keyof Draft>(k: K, v: Draft[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <fieldset>
      <legend className="font-display text-2xl font-bold tracking-tight text-foreground">
        Contact
      </legend>
      <p className="mt-2 text-[0.85rem] text-ink-secondary">
        How GTSS should reach you to continue the conversation.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="WhatsApp" hint="with country code" error={errors.whatsapp}>
          <input
            type="tel"
            value={draft.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            placeholder="+254 7XX XXX XXX"
            className={inputCls}
            autoComplete="tel"
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={draft.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            className={inputCls}
            autoComplete="email"
          />
        </Field>
        <Field label="Preferred contact method" required>
          <select
            value={draft.preferredContact}
            onChange={(e) => set("preferredContact", e.target.value)}
            className={inputCls}
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
            <option value="either">Either is fine</option>
          </select>
        </Field>
        <Field label="Best time to contact" hint="optional">
          <input
            type="text"
            value={draft.bestTime}
            onChange={(e) => set("bestTime", e.target.value)}
            placeholder="e.g. weekday evenings"
            className={inputCls}
          />
        </Field>
      </div>
      <p className="mt-6 text-[0.72rem] leading-relaxed text-ink-tertiary">
        Your details are used only to respond to this request. Nothing is
        shared, and nothing publishes without your approval.
      </p>
    </fieldset>
  );
}

function StepReview({
  draft,
  onEdit,
  schools,
}: {
  draft: Draft;
  onEdit: (step: number) => void;
  schools: { slug: string; name: string }[];
}) {
  const rows: Array<{ step: number; label: string; value: string[] }> = [
    {
      step: 1,
      label: "You",
      value: [
        draft.fullName,
        draft.candidateStatus.replace("-", " "),
        draft.university + (draft.campus ? ` · ${draft.campus}` : ""),
        draft.graduationYear ? `Class of ${draft.graduationYear}` : "",
      ].filter(Boolean),
    },
    {
      step: 2,
      label: "Your course",
      value: [
        schools.find((s) => s.slug === draft.school)?.name ?? "",
        draft.degree,
        draft.specialization,
        draft.courseNotListed ? "Course not listed — typed manually" : "",
      ].filter(Boolean),
    },
    {
      step: 3,
      label: "Your evidence",
      value: draft.evidence.length ? [draft.evidence.join(" · ")] : ["Nothing selected yet — that's fine"],
    },
    {
      step: 4,
      label: "Your direction",
      value: [draft.targetRoles, draft.knownFor, draft.recruiterUnderstanding, draft.visualPreference].filter(Boolean),
    },
    {
      step: 5,
      label: "Your links",
      value: Object.entries(draft.links)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`),
    },
    {
      step: 6,
      label: "Contact",
      value: [
        draft.whatsapp ? `WhatsApp: ${draft.whatsapp}` : "",
        `Email: ${draft.email}`,
        `Prefers: ${draft.preferredContact}`,
        draft.bestTime ? `Best time: ${draft.bestTime}` : "",
      ].filter(Boolean),
    },
  ];

  return (
    <fieldset>
      <legend className="font-display text-2xl font-bold tracking-tight text-foreground">
        Review
      </legend>
      <p className="mt-2 text-[0.85rem] text-ink-secondary">
        A commission brief for your professional identity. Edit anything before
        sending.
      </p>
      <div className="mt-8 divide-y divide-hairline/70">
        {rows.map((row) => (
          <div key={row.step} className="flex items-start justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-tertiary">
                {row.label}
              </p>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-secondary">
                {row.value.join(" · ")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(row.step)}
              className="shrink-0 rounded-md px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-brass transition-colors hover:bg-brass/10"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function SuccessState({ reference, draft }: { reference: string; draft: Draft }) {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl"
      >
        <div className="absolute inset-0 -z-10 rounded-full bg-brass/10 blur-3xl" aria-hidden />
        <span className="grid size-16 place-items-center rounded-2xl border border-brass/40 bg-brass/10">
          <PartyPopper className="size-7 text-brass" aria-hidden />
        </span>
        <h1 className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Your portfolio starts with the story, not the theme.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-secondary">
          GTSS has received your request{draft.fullName ? `, ${draft.fullName.split(" ")[0]} — ` : " — "}we
          will use the details you provided to understand your discipline,
          evidence and professional direction.
        </p>
        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-tertiary">
          Reference · GTSS-{reference}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold text-brass-foreground transition-all duration-300 hover:-translate-y-0.5"
          >
            Continue on WhatsApp
          </a>
          <Link
            to="/"
            className="inline-flex h-12 items-center rounded-md border border-hairline px-6 font-sans text-sm font-semibold text-foreground transition-all duration-300 hover:bg-raised"
          >
            Back to the collection
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

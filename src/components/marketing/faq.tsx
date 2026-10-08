"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/site";
import { SectionHeading, Reveal } from "@/components/gtss/ui";
import { Link } from "@/lib/router";

export function Faq() {
  return (
    <section aria-label="Frequently asked questions" className="border-b border-hairline/60 py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Questions"
            title="Asked by students, answered honestly."
            lead="Everything here reflects what GTSS actually does today — including the limits."
          />
          <Reveal delay={0.25}>
            <div className="mt-8 rounded-xl border border-hairline bg-surface/60 p-6">
              <p className="text-[0.85rem] leading-relaxed text-ink-secondary">
                Still unsure whether your course fits?{" "}
                <Link to="/request" className="link-sweep text-brass">
                  Ask us directly
                </Link>{" "}
                — the answer will be about your evidence, not our sales pitch.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-hairline/70">
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold tracking-tight text-foreground hover:text-brass hover:no-underline sm:text-lg [&>svg]:text-ink-tertiary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[0.9rem] leading-relaxed text-ink-secondary">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

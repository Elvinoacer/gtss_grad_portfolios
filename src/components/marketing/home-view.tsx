"use client";

import { Hero } from "@/components/marketing/hero";
import { PortfolioRail } from "@/components/marketing/portfolio-rail";
import { Manifesto } from "@/components/elite/manifesto";
import { NumbersScene } from "@/components/elite/numbers-scene";
import { CvVsPortfolio } from "@/components/marketing/cv-vs-portfolio";
import { ZoomScene } from "@/components/elite/zoom-scene";
import { FeaturedPortfolio } from "@/components/marketing/featured-portfolio";
import { ExploreSchools } from "@/components/marketing/explore-schools";
import { PortfolioMosaic } from "@/components/marketing/portfolio-mosaic";
import { DisciplineLanguage } from "@/components/marketing/discipline-language";
import { ProcessPreview } from "@/components/marketing/process-preview";
import { EvidenceReveal } from "@/components/marketing/evidence-reveal";
import { RequestBand } from "@/components/marketing/request-band";
import { Faq } from "@/components/marketing/faq";

/**
 * The homepage as a scroll-driven film in nine chapters:
 * overture → the fields → manifesto → evidence → exhibition →
 * schools → mosaic → method → the invitation.
 * Emotional arc: curiosity → proof → desire → request (spec §19)
 */
export function HomeView() {
  return (
    <>
      <Hero />
      <PortfolioRail />
      <Manifesto />
      <NumbersScene />
      <CvVsPortfolio />
      <ZoomScene />
      <FeaturedPortfolio />
      <ExploreSchools />
      <PortfolioMosaic />
      <DisciplineLanguage />
      <ProcessPreview />
      <EvidenceReveal />
      <RequestBand />
      <Faq />
    </>
  );
}

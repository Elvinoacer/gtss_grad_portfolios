"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { RouterProvider, useRouter, Link } from "@/lib/router";
import { scrollToTop } from "@/components/elite/smooth-scroll";
import { GlobalHeader } from "@/components/gtss/header";
import { GlobalFooter } from "@/components/gtss/footer";
import { WhatsAppFloat } from "@/components/gtss/whatsapp-float";

import { HomeView } from "@/components/marketing/home-view";
import { GalleryView } from "@/components/portfolio/gallery-view";
import { UniversityView } from "@/components/school/university-view";
import { SchoolView } from "@/components/school/school-view";
import { DegreeView } from "@/components/degree/degree-view";
import { HowItWorksView } from "@/components/marketing/how-it-works-view";
import { ForGraduatesView } from "@/components/marketing/for-graduates-view";
import { ForDepartmentsView } from "@/components/marketing/for-departments-view";
import { AboutView } from "@/components/marketing/about-view";
import { ContactView } from "@/components/marketing/contact-view";
import { RequestView } from "@/components/request/request-view";

export default function Page() {
  return (
    <RouterProvider>
      <App />
    </RouterProvider>
  );
}

function App() {
  const { path } = useRouter();
  const reduce = useReducedMotion();

  /* Strip query for view identity (queries shouldn't remount views) */
  const routePath = path.split("?")[0].replace(/\/+$/, "") || "/";

  /* Scroll to top on route change (Lenis-aware, instant) */
  useEffect(() => {
    scrollToTop(true);
  }, [routePath]);

  /* Resolve view */
  let view: React.ReactNode;
  let course: string | undefined;

  if (routePath === "/" || routePath === "") {
    view = <HomeView />;
  } else if (routePath === "/portfolios") {
    view = <GalleryView />;
  } else if (routePath === "/universities/moi-university") {
    view = <UniversityView />;
  } else if (routePath.startsWith("/universities/moi-university/schools/")) {
    view = (
      <SchoolView
        slug={decodeURIComponent(routePath.replace("/universities/moi-university/schools/", ""))}
      />
    );
  } else if (routePath.startsWith("/universities/moi-university/degrees/")) {
    view = (
      <DegreeView
        slug={decodeURIComponent(routePath.replace("/universities/moi-university/degrees/", ""))}
      />
    );
  } else if (routePath === "/how-it-works") {
    view = <HowItWorksView />;
  } else if (routePath === "/request") {
    const qs = path.split("?")[1];
    if (qs) {
      const params = new URLSearchParams(qs);
      course = params.get("course") ?? undefined;
    }
    view = <RequestView prefillCourse={course} />;
  } else if (routePath === "/for-graduates") {
    view = <ForGraduatesView />;
  } else if (routePath === "/for-departments") {
    view = <ForDepartmentsView />;
  } else if (routePath === "/about") {
    view = <AboutView />;
  } else if (routePath === "/contact") {
    view = <ContactView />;
  } else {
    view = <RouteNotFound />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlobalHeader />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={routePath}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {view}
          </motion.div>
        </AnimatePresence>
      </main>
      <GlobalFooter />
      <WhatsAppFloat />
    </div>
  );
}

function RouteNotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow-brass">404</p>
      <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        This page isn't part of the exhibition.
      </h1>
      <p className="mt-4 max-w-md text-ink-secondary">
        The collection is large but curated — everything worth seeing starts
        from the gallery.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="group inline-flex h-12 items-center gap-2.5 rounded-md bg-brass px-6 font-sans text-sm font-semibold tracking-tight text-brass-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDBB60]"
        >
          Back to the exhibition
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </Link>
        <Link
          to="/portfolios"
          className="inline-flex h-12 items-center rounded-md border border-hairline px-6 font-sans text-sm font-semibold tracking-tight text-foreground transition-all duration-300 hover:bg-raised"
        >
          Explore the portfolios
        </Link>
      </div>
    </div>
  );
}

/** Site-wide configuration & marketing content (spec §55-56, §44, §89) */

export const collectionStats = {
  totalPortfolios: 10,
  totalSchools: 6,
  totalDegrees: 43,
  degreePathsLabel: "43",
  degreePathsCaption: "43 degree paths mapped across 6 schools",
};

export const site = {
  brand: "GTSS",
  productName: "Graduate Portfolios",
  collectionLabel: "The Moi University Collection",
  tagline: "Your degree tells people what you studied. Your portfolio shows what you can do.",
  domain: "portfolios.gtss.software",
  whatsappNumber: "254792156094",
  whatsappDisplay: "+254 792 156 094",
  email: "support@gtss.software",
  whatsappLink:
    "https://wa.me/254792156094?text=" +
    encodeURIComponent(
      "Hi GTSS, I was exploring the Moi University Graduate Portfolio collection. I study [COURSE] and I would like to know how I can get my own portfolio."
    ),
  disclaimer:
    "GTSS Graduate Portfolios is an independent GTSS initiative and is not affiliated with or endorsed by Moi University. Programme names are used only to organize portfolio examples by academic discipline.",
  independenceNote:
    "Independent GTSS initiative · Not affiliated with or endorsed by Moi University",
};

export const primaryNav = [
  { label: "Explore", href: "/portfolios" },
  { label: "Schools", href: "/universities/moi-university" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "For Graduates", href: "/for-graduates" },
  { label: "For Departments", href: "/for-departments" },
];

export interface ProcessStep {
  num: string;
  title: string;
  body: string;
  outcome: string;
}

/** How GTSS builds a portfolio (spec §44) */
export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Define your professional direction",
    body: "We start with the specific roles you are targeting and the capabilities you want to be known for — not with a generic theme. Every design and editorial decision serves that target.",
    outcome: "Target role profile & content roadmap",
  },
  {
    num: "02",
    title: "Gather authentic coursework & evidence",
    body: "Projects, industrial attachments, lab experiments, CAD models, research papers, datasets, writing, and code. A degree produces substantial professional material when curated properly.",
    outcome: "Vetted catalog of academic and attachment work",
  },
  {
    num: "03",
    title: "Structure your project narratives",
    body: "Context, problem, your individual contribution, technical process, tangible evidence, results, and key learnings. The narrative hierarchy employers and hiring managers actually read.",
    outcome: "Structured case studies highlighting problem-solving",
  },
  {
    num: "04",
    title: "Design for your specific discipline",
    body: "An engineering portfolio reasons with technical drawings and calculations. An actuarial portfolio argues with models. A media portfolio leads with bylines and media. Discipline-specific visual logic.",
    outcome: "Bespoke typography, layout & visual language",
  },
  {
    num: "05",
    title: "Verify facts and validate claims",
    body: "Nothing invented, nothing inflated. Academic and attachment claims are checked, verified, and cited — because lasting credibility is the foundation of every portfolio.",
    outcome: "Fact-checked portfolio draft ready for review",
  },
  {
    num: "06",
    title: "Publish your live, shareable site",
    body: "A blazing-fast, mobile-first website hosted with its own permanent link — instantly shareable via WhatsApp, LinkedIn, email, or a scannable QR code printed on your CV.",
    outcome: "Live high-performance web portfolio & QR code",
  },
  {
    num: "07",
    title: "Handover and continue building",
    body: "The portfolio is structured to scale as you take on graduate roles and new projects. It is a living career asset that you own and evolve, not an ephemeral graduation souvenir.",
    outcome: "Complete asset handover & update guidance",
  },
];

/** CV vs Portfolio comparison (spec §23) */
export const cvComparison = {
  cv: {
    label: "CV",
    line1: "“Final-year project”",
    line2: "“Industrial attachment”",
    note: "A CV compresses your story into lines someone has to trust.",
  },
  portfolio: {
    label: "PORTFOLIO",
    items1: [
      "Problem",
      "Context",
      "Method",
      "Design & analysis",
      "Evidence",
      "Result",
      "What you learned",
      "What you'd improve",
    ],
    items2: [
      "What I observed",
      "What I contributed",
      "Tools I used",
      "Process I learned",
      "Professional standards",
      "Evidence I can publish",
    ],
    note: "A portfolio gives the strongest lines in your CV somewhere to prove themselves.",
  },
};

/** Evidence reveal cards (spec §46) */
export const evidenceCards = [
  "Final-year project",
  "Class project",
  "Laboratory work",
  "Industrial attachment",
  "Internship",
  "Fieldwork",
  "Design assignment",
  "Research paper",
  "Presentation",
  "Code repository",
  "CAD drawing",
  "Data analysis",
  "Campaign",
  "Lesson plan",
  "Publication",
  "Volunteer project",
  "Leadership role",
  "Certification",
  "Independent work",
];

/** Request-form evidence checklist (spec §37) */
export const evidenceChecklist = [
  "CV",
  "Academic projects",
  "Final-year project",
  "Attachment / internship",
  "Research",
  "GitHub",
  "Design work",
  "Reports",
  "Publications",
  "Photos",
  "Certificates",
  "Awards",
  "Volunteer work",
  "Leadership",
  "Professional exams",
  "Fieldwork",
  "Lab work",
  "Presentations",
  "Creative work",
  "None organized yet",
];

/** FAQ (spec §89) */
export const faqs = [
  {
    q: "Do I need work experience?",
    a: "No. A graduate portfolio can be built around truthful academic projects, attachment experience, research, fieldwork, technical work, independent projects and other relevant evidence. The job is presenting what you already have with clarity — not inventing what you don't.",
  },
  {
    q: "Is this the same as a CV?",
    a: "No. Your CV remains useful. The portfolio expands the evidence behind it — a place where the strongest lines in your CV can prove themselves. We design the two to work together.",
  },
  {
    q: "What if my course is not shown?",
    a: "Request it. The collection is growing course by course, and your discipline can become the next portfolio direction. Gaps in the catalog are demand signals — they tell us what to design next.",
  },
  {
    q: "Can I update the portfolio later?",
    a: "The portfolio is built to evolve as you gain experience. Update arrangements are agreed with GTSS before your project starts, so the answer you get is the answer that holds.",
  },
  {
    q: "Is this an official Moi University project?",
    a: "No. GTSS Graduate Portfolios is an independent GTSS initiative. Programme names are used only to organize portfolio examples by academic discipline.",
  },
  {
    q: "Can employers contact me through the portfolio?",
    a: "Yes — if you choose to publish suitable contact options. You decide exactly what is public, and what stays behind a contact form.",
  },
  {
    q: "Do you create the projects for me?",
    a: "No. The portfolio presents real work. GTSS can help you structure, select and communicate existing work — but professional evidence is never fabricated.",
  },
];

/** One degree, different futures — hero rotating labels (spec §22) */
export const degreeFutures = [
  { degree: "Civil Engineering", futures: "Structures · Infrastructure" },
  { degree: "Computer Science", futures: "Software · Systems" },
  { degree: "Actuarial Science", futures: "Risk · Insurance · Analytics" },
  { degree: "Communication", futures: "Media · PR · Storytelling" },
  { degree: "Agribusiness", futures: "Markets · Value Chains" },
  { degree: "Education", futures: "Teaching · Learning" },
];

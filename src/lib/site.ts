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

/** How GTSS builds a portfolio (spec §44) — short bodies; the /how-it-works page carries the detail */
export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Define your direction",
    body: "We start with the roles you're targeting and what you want to be known for — never with a theme.",
    outcome: "Target role profile & content roadmap",
  },
  {
    num: "02",
    title: "Gather your evidence",
    body: "Projects, attachments, lab work, research, code, datasets — a degree produces real professional material.",
    outcome: "Vetted catalog of real work",
  },
  {
    num: "03",
    title: "Structure the narratives",
    body: "Context, problem, contribution, process, evidence, results — the hierarchy employers actually read.",
    outcome: "Structured case studies",
  },
  {
    num: "04",
    title: "Design for your discipline",
    body: "An engineering portfolio reasons with drawings. An actuarial one argues with models. Different visual logic.",
    outcome: "Bespoke typography & layout",
  },
  {
    num: "05",
    title: "Verify every claim",
    body: "Nothing invented, nothing inflated. Academic claims are checked, verified and cited.",
    outcome: "Fact-checked draft",
  },
  {
    num: "06",
    title: "Publish your live site",
    body: "A fast, mobile-first site with its own permanent link — shareable via WhatsApp, LinkedIn, email or QR.",
    outcome: "Live portfolio & QR code",
  },
  {
    num: "07",
    title: "Hand over & keep building",
    body: "A living career asset you own and evolve — not a graduation souvenir.",
    outcome: "Full handover & update guidance",
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

/** FAQ (spec §89) — answers kept to one honest breath each */
export const faqs = [
  {
    q: "Do I need work experience?",
    a: "No. Portfolios are built from real academic projects, attachments, research and fieldwork — presenting what you already have, clearly.",
  },
  {
    q: "Is this the same as a CV?",
    a: "No — they work together. The portfolio gives the strongest lines in your CV somewhere to prove themselves.",
  },
  {
    q: "What if my course is not shown?",
    a: "Request it. Catalog gaps are demand signals — they tell us what to design next.",
  },
  {
    q: "Can I update the portfolio later?",
    a: "Yes. It's built to evolve; update arrangements are agreed before your project starts.",
  },
  {
    q: "Is this an official Moi University project?",
    a: "No. An independent GTSS initiative. Programme names only organize examples by discipline.",
  },
  {
    q: "Can employers contact me through it?",
    a: "Yes — if you choose. You decide what's public and what stays behind a contact form.",
  },
  {
    q: "Do you create the projects for me?",
    a: "No. GTSS structures and presents real work — professional evidence is never fabricated.",
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

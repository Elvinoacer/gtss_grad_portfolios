/** Site-wide configuration & marketing content (spec §55-56, §44, §89) */

export const site = {
  brand: "GTSS",
  productName: "Graduate Portfolios",
  collectionLabel: "The Moi University Collection",
  tagline: "Your degree tells people what you studied. Your portfolio shows them what you can do.",
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
};

export const primaryNav = [
  { label: "Explore", href: "/portfolios" },
  { label: "Schools", href: "/universities/moi-university" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "For Graduates", href: "/for-graduates" },
  { label: "For Departments", href: "/for-departments" },
];

/** How GTSS builds a portfolio (spec §44) */
export const processSteps = [
  {
    num: "01",
    title: "We understand your direction",
    body: "We start with the roles you're targeting and the work you want to be known for — not with a theme. Every later decision serves that direction.",
  },
  {
    num: "02",
    title: "We collect the evidence",
    body: "Projects, attachment records, research, drawings, datasets, writing, code. You'd be surprised how much professional material a degree produces.",
  },
  {
    num: "03",
    title: "We structure your professional story",
    body: "Context, problem, your role, process, evidence, result, learning. The hierarchy employers actually read — arranged for your discipline.",
  },
  {
    num: "04",
    title: "We design around your discipline",
    body: "An engineering portfolio reasons with drawings and calculations. An actuarial portfolio argues with models. A media portfolio shows bylines. Same studio, different professions.",
  },
  {
    num: "05",
    title: "We review the facts",
    body: "Nothing invented, nothing inflated. Claims are checked, verified or marked as examples — because credibility is the product.",
  },
  {
    num: "06",
    title: "We publish",
    body: "A fast, mobile-first professional site with its own link — shareable via WhatsApp, email, LinkedIn, or QR code on your CV.",
  },
  {
    num: "07",
    title: "You keep building on it",
    body: "The portfolio is designed to grow as you gain experience. It is a professional asset, not a one-off page.",
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

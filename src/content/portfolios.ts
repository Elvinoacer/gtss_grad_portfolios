import type { Portfolio } from "./types";

/**
 * Portfolio registry — demonstration launch collection (spec §57, §103)
 * All profiles are DEMO: illustrative candidates, clearly labelled.
 * Professional presentation never requires fabricated history (spec §7).
 */
export const portfolios: Portfolio[] = [
  {
    id: "gtss-001",
    slug: "faith-wanjiru-civil-structural",
    candidate: {
      name: "Faith Wanjiru",
      initials: "FW",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "engineering",
    degreeSlug: "civil-structural-engineering",
    careerDirection: "Graduate Structural Engineer",
    presentation: {
      headline: "Structure is an argument. I show the reasoning.",
      summary:
        "A structural-engineering portfolio built around load paths, member design, drawings and site evidence. Projects are presented the way engineers review them — context, analysis, checks, result — so a consultancy can inspect the thinking, not just the title.",
      themeLabel: "Structural Grid",
      accent: "#D9A441",
    },
    motif: "blueprint",
    evidenceTypes: [
      "Final-year structural design project",
      "CAD & workshop drawings",
      "Site attachment evidence",
      "Design calculations",
      "Survey & setting-out records",
    ],
    featuredSections: [
      "Featured Structure — design study",
      "Analysis Desk — calculations & checks",
      "Drawing Set — plans, sections, details",
      "Site Notebook — attachment log",
      "Tools & Standards — codes, CAD, surveying",
    ],
    designRationale:
      "Faith's portfolio uses blueprint grids, technical drawings and measured typography because structural credibility depends on traceable reasoning — reviewers need to follow the load from problem to detail. The design borrows from plan-reading culture, not generic resume layouts.",
    contentArchitecture: [
      "Profile — who she is becoming, professionally",
      "Featured Structure — the flagship design study",
      "Analysis Desk — calculations with context",
      "Drawing Set — the visual evidence",
      "Site Notebook — attachment, honestly framed",
      "Standards & Tools — codes, software, site practice",
      "Contact — one clear professional channel",
    ],
    tags: ["civil", "structural", "engineering", "structures", "construction", "drawings", "site"],
    status: "demo",
    isFeatured: true,
    publishedAt: "2025-11-02",
  },
  {
    id: "gtss-002",
    slug: "ian-kamau-electrical-electronics",
    candidate: {
      name: "Ian Kamau",
      initials: "IK",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "engineering",
    degreeSlug: "electrical-electronics-engineering",
    careerDirection: "Graduate Electronics Engineer",
    presentation: {
      headline: "Every system has a signal path. Follow it.",
      summary:
        "An electronics portfolio organised around circuits, control logic and test evidence. Block diagrams lead each project; implementation and measurements follow — the order an engineer actually reasons in.",
      themeLabel: "Signal Path",
      accent: "#E8794A",
    },
    motif: "circuit",
    evidenceTypes: [
      "Embedded & control projects",
      "Circuit design & simulation",
      "Test & measurement results",
      "Attachment exposure — instrumentation",
      "Lab reports",
    ],
    featuredSections: [
      "Signal Path — featured build",
      "Bench — simulations & tests",
      "Attachment — instrumentation log",
      "Toolkit — SPICE, microcontrollers, instruments",
    ],
    designRationale:
      "Ian's portfolio uses circuit-trace motifs and block-first layout because electronics is evaluated through signal flow and measured performance. Restraint in decoration keeps attention on the evidence chain: spec → design → test → result.",
    contentArchitecture: [
      "Profile & direction",
      "Signal Path — flagship project",
      "Bench — simulation and test evidence",
      "Attachment — honest exposure record",
      "Toolkit & standards",
      "Contact",
    ],
    tags: ["electrical", "electronics", "engineering", "circuits", "control", "power", "embedded"],
    status: "demo",
    isFeatured: false,
    publishedAt: "2025-11-09",
  },
  {
    id: "gtss-003",
    slug: "brian-kipkemoi-telecommunications",
    candidate: {
      name: "Brian Kipkemoi",
      initials: "BK",
      graduationYear: 2024,
      status: "early-career",
    },
    schoolSlug: "engineering",
    degreeSlug: "electrical-telecommunications-engineering",
    careerDirection: "Graduate Telecommunications Engineer",
    presentation: {
      headline: "Coverage, capacity and the reasoning between them.",
      summary:
        "A telecommunications portfolio centred on network reasoning — link budgets, coverage plans and system trade-offs presented as decisions with constraints, not screenshots of tools.",
      themeLabel: "Network Path",
      accent: "#2FB8A6",
    },
    motif: "waveform",
    evidenceTypes: [
      "Network design coursework",
      "Link budget studies",
      "Protocol & configuration labs",
      "Attachment — NOC / field exposure",
      "Project documentation",
    ],
    featuredSections: [
      "Network Study — featured design",
      "RF Desk — budgets & coverage",
      "Field Log — attachment record",
      "Standards & Protocols",
    ],
    designRationale:
      "Brian's portfolio uses waveform and path motifs because telecom engineering is judged by how signals, capacity and constraints are reasoned together. The visual language stays close to network diagrams recruiters already trust.",
    contentArchitecture: [
      "Profile & direction",
      "Network Study — flagship design",
      "RF Desk — quantitative evidence",
      "Field Log — attachment",
      "Standards & toolkit",
      "Contact",
    ],
    tags: ["telecommunications", "telecom", "networks", "rf", "engineering", "signals", "wireless"],
    status: "demo",
    isFeatured: false,
    publishedAt: "2025-11-16",
  },
  {
    id: "gtss-004",
    slug: "mercy-achieng-mechanical-production",
    candidate: {
      name: "Mercy Achieng",
      initials: "MA",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "engineering",
    degreeSlug: "mechanical-production-engineering",
    careerDirection: "Graduate Manufacturing Engineer",
    presentation: {
      headline: "From CAD file to physical part — show the whole path.",
      summary:
        "A mechanical & production portfolio that walks each project from geometry to process: CAD models, tolerances, machining plans and measured outcomes. Manufacturing is shown as a sequence of controlled decisions.",
      themeLabel: "Process Line",
      accent: "#A8B0BA",
    },
    motif: "mechanism",
    evidenceTypes: [
      "Machine design projects",
      "CAD models & drawings",
      "Process plans & machining records",
      "Attachment — production floor exposure",
      "Quality & tolerance analysis",
    ],
    featuredSections: [
      "Build Log — featured machine project",
      "CAD Desk — models & drawings",
      "Floor Notes — attachment record",
      "Process & Quality — tolerance reasoning",
    ],
    designRationale:
      "Mercy's portfolio borrows from workshop documentation — sequential build logs, drawing frames, tolerance callouts — because production credibility lives in controlled process. The layout reads like a well-kept engineering file.",
    contentArchitecture: [
      "Profile & direction",
      "Build Log — flagship project",
      "CAD Desk — geometry evidence",
      "Floor Notes — attachment",
      "Process & Quality",
      "Toolkit",
      "Contact",
    ],
    tags: ["mechanical", "production", "manufacturing", "cad", "engineering", "machining", "design"],
    status: "demo",
    isFeatured: false,
    publishedAt: "2025-11-23",
  },
  {
    id: "gtss-005",
    slug: "david-wafula-chemical-process",
    candidate: {
      name: "David Wafula",
      initials: "DW",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "engineering",
    degreeSlug: "chemical-process-engineering",
    careerDirection: "Graduate Process Engineer",
    presentation: {
      headline: "Inputs, transformations, controls — and the mass balance to prove it.",
      summary:
        "A process-engineering portfolio structured like a plant: flows in, unit operations, controls out. Each project carries its diagrams, balances and safety reasoning so the analysis can actually be audited.",
      themeLabel: "Flow Diagram",
      accent: "#6FA85C",
    },
    motif: "process",
    evidenceTypes: [
      "Process design projects",
      "Flow diagrams & mass balances",
      "Control & safety analysis",
      "Attachment — plant exposure",
      "Lab & pilot data",
    ],
    featuredSections: [
      "Process Study — featured design",
      "Balance Sheet — mass & energy",
      "Safety File — HAZOP awareness",
      "Plant Log — attachment",
    ],
    designRationale:
      "David's portfolio uses process-flow language — streams, nodes, control loops — because process engineering is evaluated by whether transformations and safeguards hold up. Diagrams lead; prose supports.",
    contentArchitecture: [
      "Profile & direction",
      "Process Study — flagship",
      "Balance Sheet — quantitative core",
      "Safety File",
      "Plant Log — attachment",
      "Toolkit",
      "Contact",
    ],
    tags: ["chemical", "process", "engineering", "plant", "safety", "manufacturing", "flows"],
    status: "demo",
    isFeatured: false,
    publishedAt: "2025-11-30",
  },
  {
    id: "gtss-006",
    slug: "kevin-mwangi-computer-science",
    candidate: {
      name: "Kevin Mwangi",
      initials: "KM",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "science-aerospace-studies",
    degreeSlug: "computer-science",
    careerDirection: "Graduate Software Engineer",
    presentation: {
      headline: "Not a 'developer theme.' A software-engineering story.",
      summary:
        "Projects are presented through architecture, systems, trade-offs, tests and deployment — because that is the evidence relevant to the profession. Technologies appear in context, serving design decisions, never as a wall of logos.",
      themeLabel: "System Map",
      accent: "#34C084",
    },
    motif: "system",
    evidenceTypes: [
      "Software projects with architecture write-ups",
      "Repositories & contribution history",
      "Tests & quality evidence",
      "Deployment & operations record",
      "Attachment / internship work",
    ],
    featuredSections: [
      "Featured Build — architecture-first case study",
      "System Notes — trade-offs & decisions",
      "Evidence — repos, tests, deployments",
      "Attachment — engineering practice",
    ],
    designRationale:
      "Kevin's portfolio uses system diagrams, restrained code detail and a technical editorial layout because recruiters evaluating software engineers need to see how projects were structured — not just a wall of technologies.",
    contentArchitecture: [
      "Profile — engineering identity",
      "Featured Build — deep case study",
      "System Notes — how he decides",
      "Evidence — repos, tests, deployments",
      "Attachment — team practice",
      "Toolkit — in context",
      "Contact & CV",
    ],
    tags: ["computer science", "software", "engineering", "developer", "systems", "code", "api", "cloud"],
    status: "demo",
    isFeatured: true,
    publishedAt: "2025-12-07",
  },
  {
    id: "gtss-007",
    slug: "naomi-wambui-actuarial-science",
    candidate: {
      name: "Naomi Wambui",
      initials: "NW",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "science-aerospace-studies",
    degreeSlug: "actuarial-science",
    careerDirection: "Graduate Actuarial Analyst",
    presentation: {
      headline: "Assumptions stated. Models tested. Risk respected.",
      summary:
        "An actuarial portfolio built around model assumptions, risk scenarios and quantitative validation. Work is presented with the professional honesty the field demands — every number traceable to a stated basis.",
      themeLabel: "Model Room",
      accent: "#E4B653",
    },
    motif: "distribution",
    evidenceTypes: [
      "Pricing & risk modelling coursework",
      "Scenario & sensitivity analyses",
      "Data projects — probability in practice",
      "Professional exam progress",
      "Research & seminar work",
    ],
    featuredSections: [
      "Model Study — featured pricing analysis",
      "Scenario Desk — risk in motion",
      "Validation Notes — how the model was checked",
      "Exam Path — professional milestones",
    ],
    designRationale:
      "Naomi's portfolio uses quantitative visual language, model assumptions and risk scenarios because actuarial credibility depends on reasoning, mathematics, interpretation and evidence rather than flashy finance aesthetics.",
    contentArchitecture: [
      "Profile & direction",
      "Model Study — flagship analysis",
      "Scenario Desk",
      "Validation Notes",
      "Exam Path",
      "Toolkit — Excel, R, Python",
      "Contact",
    ],
    tags: ["actuarial", "science", "risk", "insurance", "mathematics", "finance", "data", "statistics"],
    status: "demo",
    isFeatured: true,
    publishedAt: "2025-12-14",
  },
  {
    id: "gtss-008",
    slug: "grace-atieno-applied-statistics",
    candidate: {
      name: "Grace Atieno",
      initials: "GA",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "science-aerospace-studies",
    degreeSlug: "applied-statistics",
    careerDirection: "Graduate Statistician & Data Analyst",
    presentation: {
      headline: "The story is in the data — if the design lets it speak.",
      summary:
        "An applied-statistics portfolio presenting surveys, experiments and analyses through design, method and honest interpretation. Dashboards and visualisations carry captions that state what can — and cannot — be concluded.",
      themeLabel: "Study Notes",
      accent: "#3EC8C8",
    },
    motif: "scatter",
    evidenceTypes: [
      "Survey & experimental designs",
      "Analysis projects with datasets",
      "Dashboards & visualisations",
      "Consulting-style reports",
      "Attachment — data work",
    ],
    featuredSections: [
      "Featured Study — end-to-end analysis",
      "Dashboard Shelf — live visualisations",
      "Method Notes — design decisions",
      "Interpretation — what the data says",
    ],
    designRationale:
      "Grace's portfolio uses distribution plots, experiment structure and caption-led visualisation because statistical credibility lives in method and honest uncertainty. Every exhibit answers 'how do you know?'",
    contentArchitecture: [
      "Profile & direction",
      "Featured Study",
      "Dashboard Shelf",
      "Method Notes",
      "Toolkit — R, Python, SPSS",
      "Contact",
    ],
    tags: ["statistics", "data", "analytics", "research", "statistics", "dashboards", "science"],
    status: "demo",
    isFeatured: false,
    publishedAt: "2025-12-21",
  },
  {
    id: "gtss-009",
    slug: "sarah-cherono-communication-journalism",
    candidate: {
      name: "Sarah Cherono",
      initials: "SC",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "information-sciences",
    degreeSlug: "communication-journalism",
    careerDirection: "Graduate Journalist & Editorial Storyteller",
    presentation: {
      headline: "Bylines with the thinking behind them.",
      summary:
        "A journalism portfolio curated like a desk editor's drawer — published work, each with its brief, research trail and editorial decisions. Stories are grouped by beat; craft is demonstrated, not claimed.",
      themeLabel: "The Masthead",
      accent: "#DF5F5F",
    },
    motif: "editorial",
    evidenceTypes: [
      "Published articles & features",
      "Multimedia storytelling packages",
      "Campus & community reporting",
      "Editorial & production roles",
      "Attachment — newsroom experience",
    ],
    featuredSections: [
      "Cover Story — flagship feature",
      "The Beat — selected bylines",
      "Multimedia Desk — photo, audio, video",
      "Newsroom Log — attachment & roles",
    ],
    designRationale:
      "Sarah's portfolio uses editorial layouts, masthead typography and story-first structure because media credibility is built on the work itself. Each piece carries its context — brief, audience, decisions — like a professional clipping file.",
    contentArchitecture: [
      "Profile & beats",
      "Cover Story",
      "The Beat — selected work",
      "Multimedia Desk",
      "Newsroom Log",
      "Contact",
    ],
    tags: ["journalism", "communication", "media", "writing", "storytelling", "editorial", "reporting"],
    status: "demo",
    isFeatured: false,
    publishedAt: "2025-12-28",
  },
  {
    id: "gtss-010",
    slug: "peter-mutua-agribusiness-management",
    candidate: {
      name: "Peter Mutua",
      initials: "PM",
      graduationYear: 2024,
      status: "early-career",
    },
    schoolSlug: "agriculture-natural-resources",
    degreeSlug: "agribusiness-management",
    careerDirection: "Graduate Agribusiness Manager",
    presentation: {
      headline: "Agriculture is a business. Run the numbers, then the farm.",
      summary:
        "An agribusiness portfolio presenting enterprise plans, value-chain studies and field evidence with operational numbers attached. Each project states its market assumption before its yield.",
      themeLabel: "Field Ledger",
      accent: "#79B45A",
    },
    motif: "field",
    evidenceTypes: [
      "Enterprise & business plans",
      "Value-chain analyses",
      "Field project data",
      "Attachment — agribusiness exposure",
      "Market research",
    ],
    featuredSections: [
      "Enterprise Study — flagship plan",
      "Value Chain — mapped & measured",
      "Field Data — records with meaning",
      "Market Notes — assumptions first",
    ],
    designRationale:
      "Peter's portfolio uses field-plot structure, ledger typography and value-chain diagrams because agribusiness credibility comes from joining production reality with commercial reasoning — both visible, both honest.",
    contentArchitecture: [
      "Profile & direction",
      "Enterprise Study",
      "Value Chain",
      "Field Data",
      "Attachment",
      "Toolkit",
      "Contact",
    ],
    tags: ["agribusiness", "agriculture", "management", "enterprise", "value chain", "farming", "business"],
    status: "demo",
    isFeatured: false,
    publishedAt: "2026-01-04",
  },
  {
    id: "gtss-011",
    slug: "lucy-njeri-bed-science",
    candidate: {
      name: "Lucy Njeri",
      initials: "LN",
      graduationYear: 2025,
      status: "fresh-graduate",
    },
    schoolSlug: "education",
    degreeSlug: "bed-science",
    careerDirection: "Graduate Science Teacher (Mathematics & Chemistry)",
    presentation: {
      headline: "Teaching is design — for understanding, not coverage.",
      summary:
        "An education portfolio presenting lesson sequences, assessment design and practicum evidence. Each exhibited lesson states its learning outcome, misconception strategy and how learning was checked.",
      themeLabel: "The Lesson File",
      accent: "#7FB069",
    },
    motif: "pedagogy",
    evidenceTypes: [
      "Lesson design collections",
      "Teaching practicum records",
      "Assessment & feedback evidence",
      "Learner progress tracking",
      "Co-curricular leadership",
    ],
    featuredSections: [
      "Lesson File — flagship sequence",
      "Practicum — classroom evidence",
      "Assessment Desk — how learning was checked",
      "Beyond Class — clubs & leadership",
    ],
    designRationale:
      "Lucy's portfolio uses lesson-plan architecture, outcome-first blocks and classroom evidence because teaching credibility is judged by design quality and learner impact — visible to any school leader reviewing her file.",
    contentArchitecture: [
      "Teaching philosophy",
      "Subject profile",
      "Lesson File",
      "Practicum",
      "Assessment Desk",
      "Beyond Class",
      "Contact",
    ],
    tags: ["education", "teaching", "teacher", "science", "mathematics", "pedagogy", "school"],
    status: "demo",
    isFeatured: false,
    publishedAt: "2026-01-11",
  },
];

export function getPortfolio(slug: string): Portfolio | undefined {
  return portfolios.find((p) => p.slug === slug);
}

export function getPortfolioOfDegree(degreeSlug: string): Portfolio | undefined {
  return portfolios.find((p) => p.degreeSlug === degreeSlug);
}

export const featuredPortfolio = portfolios.find((p) => p.slug === "kevin-mwangi-computer-science")!;

export function relatedPortfolios(current: Portfolio, count = 3): Portfolio[] {
  const sameSchool = portfolios.filter(
    (p) => p.slug !== current.slug && p.schoolSlug === current.schoolSlug
  );
  const others = portfolios.filter(
    (p) => p.slug !== current.slug && p.schoolSlug !== current.schoolSlug
  );
  // Prefer one same-school + contrasting disciplines (spec §60)
  const mix = [...sameSchool.slice(0, 1), ...others];
  return mix.slice(0, count);
}

export interface SearchHit {
  portfolio: Portfolio;
  score: number;
}

export function searchPortfolios(query: string): Portfolio[] {
  const q = query.trim().toLowerCase();
  if (!q) return portfolios;
  const terms = q.split(/\s+/);
  return portfolios
    .map((p) => {
      const haystack = [
        p.candidate.name,
        p.careerDirection,
        p.tags.join(" "),
        p.degreeSlug.replace(/-/g, " "),
        p.schoolSlug.replace(/-/g, " "),
        p.presentation.themeLabel,
      ]
        .join(" ")
        .toLowerCase();
      const score = terms.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
      return { portfolio: p, score };
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((h) => h.portfolio);
}

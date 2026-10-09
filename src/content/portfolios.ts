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
    status: "live",
    isFeatured: true,
    publishedAt: "2025-11-02",
    liveUrl: "https://faith-wanjiru-civil.vercel.app",
    screenshot: "/project_screenshots/faith-wanjiru-civil.png",
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
    status: "live",
    isFeatured: false,
    publishedAt: "2025-11-09",
    liveUrl: "https://ian-kamau-electronics.vercel.app",
    screenshot: "/project_screenshots/ian-kamau-electronics.png",
  },
  {
    id: "gtss-003",
    slug: "brian-kipkemoi-telecommunications",
    candidate: {
      name: "Brian Kipkemoi",
      initials: "BK",
      graduationYear: 2026,
      status: "fresh-graduate",
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
    status: "live",
    isFeatured: false,
    publishedAt: "2025-11-16",
    liveUrl: "https://brian-kipkemoi-telecom.vercel.app",
    screenshot: "/project_screenshots/brian-kipkemoi-telecom.png",
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
    status: "live",
    isFeatured: false,
    publishedAt: "2025-11-23",
    liveUrl: "https://mercy-achieng-mechanical.vercel.app",
    screenshot: "/project_screenshots/mercy-achieng-mechanical.png",
  },
  {
    id: "gtss-005",
    slug: "david-wafula-chemical-process",
    candidate: {
      name: "David Wafula",
      initials: "DW",
      graduationYear: 2026,
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
    status: "live",
    isFeatured: false,
    publishedAt: "2025-11-30",
    liveUrl: "https://david-wafula-chemical.vercel.app",
    screenshot: "/project_screenshots/david-wafula-chemical.png",
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
    status: "live",
    isFeatured: true,
    publishedAt: "2025-12-07",
    liveUrl: "https://kevin-mwangicomp.vercel.app",
    screenshot: "/project_screenshots/kevin-mwangicomp.png",
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
    status: "live",
    isFeatured: true,
    publishedAt: "2025-12-14",
    liveUrl: "https://naomi-wambui-actuary.vercel.app",
    screenshot: "/project_screenshots/naomi-wambui-actuary.png",
  },
  {
    id: "gtss-008",
    slug: "lydia-chebet-industrial-textile",
    candidate: {
      name: "Lydia Chebet",
      initials: "LC",
      graduationYear: 2026,
      status: "fresh-graduate",
    },
    schoolSlug: "engineering",
    degreeSlug: "industrial-textile-engineering",
    careerDirection: "Graduate Industrial & Textile Engineer",
    presentation: {
      headline: "An engineer who reads both the material and the system.",
      summary:
        "An Industrial & Textile Engineering portfolio focused on manufacturing systems, quality engineering, line balancing and sustainable textile production from raw fiber to finished product.",
      themeLabel: "Production Line",
      accent: "#57C18A",
    },
    motif: "textile",
    evidenceTypes: [
      "Textile testing & quality control (GSM, fastness)",
      "Line balancing & cycle time reduction",
      "Yarn, weaving & knitting production processes",
      "Industrial attachment — manufacturing floor",
      "Continuous improvement & 5S implementation",
    ],
    featuredSections: [
      "Textile Sequence — fiber to product",
      "Quality Lab — GSM & tensile testing",
      "Line Balancing — efficiency analysis",
      "Floor Notes — industrial attachment log",
      "Toolbox — work study & testing methods",
    ],
    designRationale:
      "Lydia's portfolio combines textile weave motifs with precision industrial metrics because textile engineering requires mastery of both material behavior and high-throughput factory operations.",
    contentArchitecture: [
      "Candidate Snapshot — profile & focus",
      "Engineering Projects — academic & lab",
      "Textile Process Sequence — fiber to product",
      "Industrial Attachment — production & quality",
      "Testing Methods & Laboratory Toolbox",
      "Contact & CV",
    ],
    tags: ["industrial", "textile", "engineering", "manufacturing", "quality", "production", "materials", "apparel"],
    status: "live",
    isFeatured: true,
    publishedAt: "2025-12-21",
    liveUrl: "https://lydia-chebet-industrial.vercel.app",
    screenshot: "/project_screenshots/lydia-chebet-industrial.png",
  },
  {
    id: "gtss-009",
    slug: "alloice-otieno-biochemistry",
    candidate: {
      name: "Alloice Otieno",
      initials: "AO",
      graduationYear: 2026,
      status: "fresh-graduate",
    },
    schoolSlug: "science-aerospace-studies",
    degreeSlug: "biochemistry",
    careerDirection: "Graduate Biochemist & Botanical Researcher",
    presentation: {
      headline: "Decoding the living chemistry of African botanicals.",
      summary:
        "A biochemistry portfolio devoted to quantitative spectrophotometry, natural product extraction, and elucidating phytochemical pathways against oxidative stress in indigenous flora.",
      themeLabel: "The Living Bench",
      accent: "#10B981",
    },
    motif: "molecule",
    evidenceTypes: [
      "Quantitative UV-Vis spectrophotometry",
      "Natural product extraction (Cleome, Amaranthus, Solanum)",
      "DPPH radical scavenging & antioxidant assays",
      "Enzyme inhibition kinetics & Lineweaver-Burk plots",
      "Good Laboratory Practice (GLP) protocols",
    ],
    featuredSections: [
      "Flagship Thesis — indigenous vegetable antioxidants",
      "Living Bench — calibration & purity protocols",
      "Enzymology Desk — catalytic kinetics",
      "Assay Notebook — spectrophotometric curves",
      "Practicum Log — laboratory exposure",
    ],
    designRationale:
      "Alloice's portfolio uses botanical-cellular motifs, quantitative calibration curves, and strict assay documentation because biochemical credibility depends on reproducible analytical rigor.",
    contentArchitecture: [
      "Profile & Ethos — the living bench",
      "Flagship Thesis — indigenous flora antioxidant defense",
      "Assays & Calibration — spectrophotometry data",
      "Laboratory Skills & Equipment",
      "Practicum & Industry Exposure",
      "Credentials & Contact",
    ],
    tags: ["biochemistry", "science", "botanicals", "spectrophotometry", "phytochemistry", "laboratory", "antioxidants"],
    status: "live",
    isFeatured: false,
    publishedAt: "2025-12-28",
    liveUrl: "https://alloice-biochem.vercel.app",
    screenshot: "/project_screenshots/alloice_biochem.png",
  },
  {
    id: "gtss-010",
    slug: "stanley-aketch-biochemistry",
    candidate: {
      name: "Stanley Aketch",
      initials: "SA",
      graduationYear: 2026,
      status: "fresh-graduate",
    },
    schoolSlug: "science-aerospace-studies",
    degreeSlug: "biochemistry",
    careerDirection: "Graduate Clinical & Analytical Biochemist",
    presentation: {
      headline: "I turn messy samples into clean, trustworthy numbers.",
      summary:
        "A clinical and analytical biochemistry portfolio focused on diagnostics, food analysis, and health data — backed by notebook discipline, internal quality control, and reproducible bench results.",
      themeLabel: "Assay Notebook",
      accent: "#D97706",
    },
    motif: "molecule",
    evidenceTypes: [
      "Clinical diagnostic assays & blood chemistry",
      "Food proximate composition analysis",
      "Internal quality control & Levey–Jennings monitoring",
      "Standard curve validation (R² ≥ 0.999)",
      "Tidy data analysis & reporting in R",
    ],
    featuredSections: [
      "Case Files — clinical & food chemistry studies",
      "QC Desk — calibration & control charts",
      "Laboratory Logbook — hospital & analytical bench",
      "Toolbox — wet lab & statistical tools",
    ],
    designRationale:
      "Stanley's portfolio adopts laboratory notebook structure and calibration badge aesthetics because clinical diagnostic employers evaluate analysts by traceability, controls, and error-free reporting.",
    contentArchitecture: [
      "Story — three sentences of professional identity",
      "Origin & Ethos — why biochemistry",
      "Case Files — diagnostic & nutritional analyses",
      "Laboratory Bench Experience",
      "Quality Control & Toolbox",
      "Contact & CV",
    ],
    tags: ["biochemistry", "clinical", "diagnostics", "food analysis", "quality control", "laboratory", "health data"],
    status: "live",
    isFeatured: false,
    publishedAt: "2026-01-04",
    liveUrl: "https://stanley-aketch-biochem.vercel.app",
    screenshot: "/project_screenshots/stanley-aketch-biochem.png",
  },
];

export function getPortfolio(slug: string): Portfolio | undefined {
  return portfolios.find((p) => p.slug === slug);
}

export function getPortfolioOfDegree(degreeSlug: string): Portfolio | undefined {
  return portfolios.find((p) => p.degreeSlug === degreeSlug);
}

export function getPortfoliosOfDegree(degreeSlug: string): Portfolio[] {
  return portfolios.filter((p) => p.degreeSlug === degreeSlug);
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

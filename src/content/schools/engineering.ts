import type { School } from "../types";

export const engineering: School = {
  name: "School of Engineering",
  shortName: "Engineering",
  slug: "engineering",
  statement: "Build. Test. Measure. Explain.",
  description:
    "Portfolios for graduates whose work can be shown through systems, drawings, models, calculations, processes and projects.",
  context:
    "Engineering is not a list of software names. It is the ability to reason about systems under constraint — load paths, signal integrity, tolerances, safety factors, process yields. A GTSS engineering portfolio turns structural design, manufacturing, power systems and process work into a professional narrative employers can inspect, question and trust.",
  evidence: [
    "Design reasoning",
    "Calculations & analysis",
    "Technical drawings",
    "Systems thinking",
    "Project evidence",
    "Industrial attachment",
    "Tools & standards",
    "Safety practice",
  ],
  sections: [
    "Professional profile",
    "Featured projects",
    "Design & analysis",
    "Drawings & models",
    "Attachment experience",
    "Tools & standards",
    "Professional direction",
  ],
  motifKeywords: [
    "Blueprint logic",
    "Structural grids",
    "Technical drawings",
    "Material & process imagery",
    "Engineering diagrams",
    "Precise numerical detail",
  ],
  image: "/images/engineering.jpg",
  accent: "#D9A441",
  degrees: [
    {
      name: "B.Eng. in Civil & Structural Engineering",
      shortName: "Civil & Structural",
      slug: "civil-structural-engineering",
      tagline: "Structures · Infrastructure",
      motif: "blueprint",
      image: "/images/survey.jpg",
      roles: [
        "Graduate Structural Engineer",
        "Site Engineer",
        "Design Engineer (consultancy)",
        "Infrastructure Analyst",
      ],
      exampleProject:
        "A final-year structural design study presented through load paths, member sizing, drawings and a design report — not just the project title.",
      demoSlug: "faith-wanjiru-civil-structural",
    },
    {
      name: "B.Eng. in Electrical & Electronics Engineering",
      shortName: "Electrical & Electronics",
      slug: "electrical-electronics-engineering",
      tagline: "Power · Circuits · Control",
      motif: "circuit",
      roles: [
        "Graduate Electronics Engineer",
        "Control & Instrumentation Engineer",
        "Power Systems Engineer",
        "Embedded Systems Engineer",
      ],
      exampleProject:
        "An embedded control project shown as block diagrams, circuit decisions, test results and measurable performance — evidence, not decoration.",
      demoSlug: "ian-kamau-electrical-electronics",
    },
    {
      name: "B.Eng. in Electrical & Telecommunications Engineering",
      shortName: "Telecommunications",
      slug: "electrical-telecommunications-engineering",
      tagline: "Signals · Networks · Spectrum",
      motif: "waveform",
      image: "/images/telecom.jpg",
      roles: [
        "Graduate Telecom Engineer",
        "Network Planning Engineer",
        "RF & Systems Engineer",
        "Communications Analyst",
      ],
      exampleProject:
        "A network design or link-budget study presented through signal paths, coverage reasoning and system trade-offs.",
      demoSlug: "brian-kipkemoi-telecommunications",
    },
    {
      name: "B.Eng. in Mechanical & Production Engineering",
      shortName: "Mechanical & Production",
      slug: "mechanical-production-engineering",
      tagline: "Machines · Manufacturing · CAD",
      motif: "mechanism",
      image: "/images/manufacturing.jpg",
      roles: [
        "Graduate Mechanical Engineer",
        "Manufacturing Engineer",
        "Design & CAD Engineer",
        "Maintenance Engineer",
      ],
      exampleProject:
        "A production or machine-design project told through CAD geometry, process flows, tolerances and testing.",
      demoSlug: "mercy-achieng-mechanical-production",
    },
    {
      name: "B.Eng. in Chemical & Process Engineering",
      shortName: "Chemical & Process",
      slug: "chemical-process-engineering",
      tagline: "Processes · Materials · Control",
      motif: "process",
      image: "/images/process-plant.jpg",
      roles: [
        "Graduate Process Engineer",
        "Production Engineer",
        "Process Safety Engineer",
        "Quality Engineer",
      ],
      exampleProject:
        "A process design project shown through flow diagrams, material balances, control logic and safety analysis.",
      demoSlug: "david-wafula-chemical-process",
    },
    {
      name: "B.Eng. in Industrial & Textile Engineering",
      shortName: "Industrial & Textile",
      slug: "industrial-textile-engineering",
      tagline: "Systems · Production · Optimisation",
      motif: "textile",
      roles: [
        "Graduate Industrial Engineer",
        "Production Systems Engineer",
        "Quality & Process Improvement Engineer",
        "Textile Technology Engineer",
      ],
      exampleProject:
        "A production-line study presented through workflow diagrams, optimisation reasoning and measurable improvements.",
      demoSlug: "lydia-chebet-industrial-textile",
    },
  ],
};

import type { School } from "../types";

export const scienceAerospace: School = {
  name: "School of Science & Aerospace Studies",
  shortName: "Science & Aerospace",
  slug: "science-aerospace-studies",
  statement: "Question. Measure. Model. Verify.",
  description:
    "Portfolios for graduates whose credibility lives in research, data, experimentation, systems and quantitative evidence.",
  context:
    "Scientific credibility is built on method. Whether the evidence is a simulation, a laboratory protocol, a dataset or a risk model, a GTSS science portfolio shows how you think — hypothesis, method, analysis, interpretation — in the language your discipline respects.",
  evidence: [
    "Research method",
    "Data & analysis",
    "Experimental design",
    "Models & validation",
    "Scientific visualisation",
    "Laboratory technique",
    "Quantitative reasoning",
  ],
  sections: [
    "Research profile",
    "Projects & research",
    "Data & analysis",
    "Laboratory work",
    "Tools & computation",
    "Publications & reports",
    "Professional direction",
  ],
  motifKeywords: [
    "Research",
    "Data",
    "Experimentation",
    "Systems",
    "Scientific visualisation",
    "Quantitative evidence",
    "Laboratory thinking",
  ],
  image: "/images/science-lab.jpg",
  accent: "#3EC8C8",
  degrees: [
    {
      name: "BSc in Computer Science",
      shortName: "Computer Science",
      slug: "computer-science",
      tagline: "Software · Systems · Architecture",
      motif: "system",
      image: "/images/computer-science.jpg",
      roles: [
        "Graduate Software Engineer",
        "Systems & Backend Engineer",
        "Data & Platform Engineer",
        "Applications Developer",
      ],
      exampleProject:
        "A software project presented through architecture, trade-offs, tests and deployment — because that is the evidence relevant to the profession.",
      demoSlug: "kevin-mwangi-computer-science",
    },
    {
      name: "BSc in Actuarial Science",
      shortName: "Actuarial Science",
      slug: "actuarial-science",
      tagline: "Risk · Models · Insurance",
      motif: "distribution",
      image: "/images/quantitative.jpg",
      roles: [
        "Graduate Actuarial Analyst",
        "Risk Analyst",
        "Insurance & Pensions Analyst",
        "Quantitative Analyst",
      ],
      exampleProject:
        "A pricing or risk project shown through model assumptions, scenarios, validation and interpretation — reasoning, not decoration.",
      demoSlug: "naomi-wambui-actuarial-science",
    },
    {
      name: "BSc in Applied Statistics with Computing",
      shortName: "Applied Statistics",
      slug: "applied-statistics",
      tagline: "Data · Inference · Decisions",
      motif: "scatter",
      image: "/images/quantitative.jpg",
      roles: [
        "Graduate Statistician",
        "Data Analyst",
        "Monitoring & Evaluation Analyst",
        "Research Analyst",
      ],
      exampleProject:
        "A survey or experimental study presented through design, analysis, dashboards and honest interpretation of uncertainty.",
    },
    {
      name: "BSc in Biochemistry",
      shortName: "Biochemistry",
      slug: "biochemistry",
      tagline: "Molecules · Pathways · Analysis",
      motif: "molecule",
      roles: [
        "Graduate Biochemist",
        "Laboratory Analyst",
        "Quality Control Analyst",
        "Research Assistant",
      ],
      exampleProject:
        "A laboratory project shown through protocols, results, controls and interpretation — evidence arranged like a paper, not a poster.",
      demoSlug: "alloice-otieno-biochemistry",
    },
    {
      name: "BSc in Microbiology",
      shortName: "Microbiology",
      slug: "microbiology",
      tagline: "Organisms · Methods · Evidence",
      motif: "culture",
      roles: [
        "Graduate Microbiologist",
        "Laboratory Technologist",
        "Quality & Safety Analyst",
        "Research Assistant",
      ],
      exampleProject:
        "A microbiology investigation presented through methods, cultures, results and quality practice.",
    },
    {
      name: "Bachelor of Civil Aviation Management",
      shortName: "Civil Aviation Management",
      slug: "civil-aviation-management",
      tagline: "Operations · Safety · Systems",
      motif: "airspace",
      image: "/images/aviation.jpg",
      roles: [
        "Aviation Operations Officer",
        "Airline & Airport Analyst",
        "Safety & Compliance Officer",
        "Flight Operations Coordinator",
      ],
      exampleProject:
        "An operations study presented through procedures, safety reasoning and regulatory awareness.",
    },
    {
      name: "BSc (General) — Mathematics · Physics · Chemistry · Botany · Zoology",
      shortName: "BSc General",
      slug: "bsc-general",
      tagline: "Single or double majors",
      motif: "scatter",
      roles: [
        "Research Assistant",
        "Laboratory Analyst",
        "Data & Field Analyst",
        "Graduate Scientist",
      ],
      exampleProject:
        "Major coursework and research projects presented with the depth each science deserves.",
    },
  ],
};

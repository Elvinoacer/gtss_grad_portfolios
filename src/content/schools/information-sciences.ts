import type { School } from "../types";

export const informationSciences: School = {
  name: "School of Information Sciences",
  shortName: "Information Sciences",
  slug: "information-sciences",
  statement: "Organise. Publish. Communicate.",
  description:
    "Portfolios for graduates whose work lives in information architecture, media systems, records, publishing and audience strategy.",
  context:
    "Information professions make knowledge findable, credible and usable. A GTSS information-sciences portfolio demonstrates content strategy, editorial judgement, systems thinking and communication craft — the evidence employers in media, publishing, records and communications actually inspect.",
  evidence: [
    "Information architecture",
    "Editorial & writing samples",
    "Media & campaign artifacts",
    "Records & archives logic",
    "Publishing systems",
    "Content strategy",
    "Audience thinking",
  ],
  sections: [
    "Professional profile",
    "Writing & media samples",
    "Campaigns & projects",
    "Records & systems work",
    "Tools & platforms",
    "Attachment experience",
    "Professional direction",
  ],
  motifKeywords: [
    "Information architecture",
    "Media systems",
    "Editorial layouts",
    "Communication artifacts",
    "Archives & records logic",
    "Publishing systems",
    "Content strategy",
  ],
  image: "/images/information-sciences.jpg",
  accent: "#DF5F5F",
  degrees: [
    {
      name: "BSc in Information Sciences (IT · Publishing · Records & Archives · Library Studies)",
      shortName: "Information Sciences",
      slug: "information-sciences",
      tagline: "Knowledge · Systems · Access",
      motif: "archive",
      roles: [
        "Information Officer",
        "Records & Archives Officer",
        "Publishing & Content Officer",
        "Library & Knowledge Officer",
      ],
      exampleProject:
        "A records project or classification study presented through structure, policy and real information problems solved.",
    },
    {
      name: "BSc in Information Technology",
      shortName: "Information Technology",
      slug: "information-technology",
      tagline: "Infrastructure · Systems · Support",
      motif: "system",
      image: "/images/computer-science.jpg",
      roles: [
        "Graduate IT Officer",
        "Systems & Network Administrator",
        "Technical Support Engineer",
        "Solutions Implementer",
      ],
      exampleProject:
        "An infrastructure or implementation project shown through topology, decisions, documentation and outcomes.",
    },
    {
      name: "BSc in Communication & Journalism",
      shortName: "Communication & Journalism",
      slug: "communication-journalism",
      tagline: "Stories · Reporting · Media",
      motif: "editorial",
      roles: [
        "Graduate Journalist",
        "Reporter & Writer",
        "Content & Editorial Officer",
        "Multimedia Journalist",
      ],
      exampleProject:
        "Published work presented with context: brief, research, audience and editorial decisions — a byline portfolio with reasoning.",
      demoSlug: "sarah-cherono-communication-journalism",
    },
    {
      name: "BSc in Communication & Public Relations",
      shortName: "Communication & PR",
      slug: "communication-public-relations",
      tagline: "Reputation · Audiences · Strategy",
      motif: "editorial",
      roles: [
        "Graduate PR & Communications Officer",
        "Brand & Reputation Associate",
        "Media Relations Officer",
        "Corporate Communications Officer",
      ],
      exampleProject:
        "A campaign or event presented through objectives, audiences, messaging, execution and lessons.",
    },
    {
      name: "BSc in Media Science",
      shortName: "Media Science",
      slug: "media-science",
      tagline: "Production · Audiences · Analysis",
      motif: "editorial",
      roles: [
        "Media Producer",
        "Broadcast & Production Assistant",
        "Content Strategist",
        "Audience & Media Analyst",
      ],
      exampleProject:
        "A production project shown through scripts, sequences, output and audience thinking.",
    },
    {
      name: "BSc in Graphic Communication",
      shortName: "Graphic Communication",
      slug: "graphic-communication",
      tagline: "Design · Message · Craft",
      motif: "editorial",
      roles: [
        "Graduate Graphic Designer",
        "Visual Communication Designer",
        "Brand & Production Designer",
        "Design & Content Officer",
      ],
      exampleProject:
        "Design work presented with briefs, constraints, iterations and final artifacts — process made visible.",
    },
  ],
};

import type { School } from "../types";

export const agriculture: School = {
  name: "School of Agriculture & Natural Resources",
  shortName: "Agriculture",
  slug: "agriculture-natural-resources",
  statement: "Grow. Measure. Sustain. Trade.",
  description:
    "Portfolios for graduates whose work is shown through field evidence, production systems, agribusiness and sustainability.",
  context:
    "Agriculture professionals are judged by systems and outcomes — yields, value chains, interventions that survive contact with weather and markets. A GTSS agriculture portfolio presents field evidence, farm data, enterprise reasoning and sustainability thinking in a way agribusinesses, NGOs and government programmes can inspect.",
  evidence: [
    "Field evidence",
    "Production systems",
    "Farm & trial data",
    "Agribusiness analysis",
    "Value-chain mapping",
    "Sustainability reasoning",
    "Extension practice",
  ],
  sections: [
    "Professional profile",
    "Field & enterprise projects",
    "Production data & analysis",
    "Attachment & fieldwork",
    "Tools & techniques",
    "Sustainability work",
    "Professional direction",
  ],
  motifKeywords: [
    "Field evidence",
    "Production systems",
    "Agribusiness",
    "Natural-resource flows",
    "Sustainability",
    "Farm data",
    "Value chains",
  ],
  image: "/images/agriculture.jpg",
  accent: "#79B45A",
  degrees: [
    {
      name: "BSc in Agricultural Economics & Resource Management",
      shortName: "Agricultural Economics",
      slug: "agricultural-economics",
      tagline: "Markets · Resources · Policy",
      motif: "field",
      roles: [
        "Graduate Agricultural Economist",
        "Agribusiness Analyst",
        "Value-Chain Analyst",
      ],
      exampleProject:
        "A market or resource study presented through data, assumptions and policy implications.",
    },
    {
      name: "BSc in Agribusiness Management",
      shortName: "Agribusiness Management",
      slug: "agribusiness-management",
      tagline: "Enterprise · Value Chains",
      motif: "field",
      roles: [
        "Graduate Agribusiness Manager",
        "Farm & Enterprise Manager",
        "Agri-input & Value-Chain Officer",
      ],
      exampleProject:
        "An enterprise plan or value-chain study presented through numbers, operations and market reasoning.",
      demoSlug: "peter-mutua-agribusiness-management",
    },
    {
      name: "BSc in Agricultural Extension & Education",
      shortName: "Agricultural Extension",
      slug: "agricultural-extension",
      tagline: "Farmers · Knowledge · Adoption",
      motif: "field",
      roles: [
        "Extension Officer",
        "Agricultural Development Officer",
        "Farmer Training Facilitator",
      ],
      exampleProject:
        "An extension campaign presented through farmer engagement, adoption evidence and lessons.",
    },
    {
      name: "BSc in Animal Science & Management",
      shortName: "Animal Science",
      slug: "animal-science",
      tagline: "Livestock · Systems · Health",
      motif: "field",
      roles: [
        "Graduate Animal Scientist",
        "Livestock Production Officer",
        "Field Veterinary Support Officer",
      ],
      exampleProject:
        "A livestock system study shown through husbandry plans, data and welfare reasoning.",
    },
    {
      name: "BSc in Agricultural Biotechnology",
      shortName: "Agricultural Biotechnology",
      slug: "agricultural-biotechnology",
      tagline: "Science · Crops · Innovation",
      motif: "molecule",
      roles: [
        "Graduate Biotechnologist",
        "Laboratory & Crop Improvement Analyst",
        "Research Assistant",
      ],
      exampleProject:
        "A laboratory or crop study presented through method, controls and results.",
    },
    {
      name: "BSc in Climate Change & Sustainable Agriculture",
      shortName: "Climate & Sustainable Ag",
      slug: "climate-change-sustainable-agriculture",
      tagline: "Adaptation · Resilience",
      motif: "field",
      roles: [
        "Climate-Smart Agriculture Officer",
        "Sustainability Programme Officer",
        "Environmental & Ag Research Assistant",
      ],
      exampleProject:
        "An adaptation study presented through vulnerability reasoning and interventions.",
    },
    {
      name: "Diploma in General Agriculture",
      shortName: "General Agriculture",
      slug: "diploma-general-agriculture",
      tagline: "Practice · Production",
      motif: "field",
      roles: [
        "Agricultural Technician",
        "Farm Supervisor",
        "Production Officer",
      ],
      exampleProject:
        "A production project with field records, costs and outcomes.",
    },
  ],
};

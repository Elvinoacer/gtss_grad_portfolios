import type { School } from "../types";

export const education: School = {
  name: "School of Education",
  shortName: "Education",
  slug: "education",
  statement: "Plan. Teach. Assess. Grow.",
  description:
    "Portfolios for graduates whose professionalism is demonstrated through lesson design, teaching practice, assessment and learner impact.",
  context:
    "Teaching is a design profession. A GTSS education portfolio shows lesson architecture, subject mastery, classroom evidence and inclusive practice — the things a school leader, TSC panel or department head can actually evaluate beyond the transcript.",
  evidence: [
    "Teaching philosophy",
    "Lesson design",
    "Learning outcomes",
    "Classroom evidence",
    "Assessment practice",
    "Inclusive practice",
    "Learner progress",
  ],
  sections: [
    "Teaching philosophy",
    "Subject profile",
    "Lesson design & practice",
    "Teaching practicum",
    "Assessment & feedback",
    "Co-curricular leadership",
    "Professional direction",
  ],
  motifKeywords: [
    "Teaching philosophy",
    "Lesson planning",
    "Learning outcomes",
    "Classroom evidence",
    "Assessment",
    "Pedagogy",
    "Inclusive design",
  ],
  image: "/images/education.jpg",
  accent: "#7FB069",
  degrees: [
    {
      name: "Bachelor of Education (Arts)",
      shortName: "BEd Arts",
      slug: "bed-arts",
      tagline: "Humanities · Languages",
      motif: "pedagogy",
      roles: [
        "Graduate Teacher — Arts",
        "Subject Teacher (Languages / Humanities)",
        "Education Officer",
      ],
      exampleProject:
        "A teaching practicum presented through lesson sequences, assessment design and learner outcomes.",
    },
    {
      name: "Bachelor of Education (Science)",
      shortName: "BEd Science",
      slug: "bed-science",
      tagline: "Mathematics · Sciences",
      motif: "pedagogy",
      roles: [
        "Graduate Teacher — Science",
        "Subject Teacher (Mathematics / Sciences)",
        "STEM Education Officer",
      ],
      exampleProject:
        "A science lesson study showing experiments, misconception handling and assessment results.",
    },
    {
      name: "Bachelor of Education (Special Needs Education — Secondary Option)",
      shortName: "BEd Special Needs",
      slug: "bed-special-needs",
      tagline: "Inclusion · Access · Support",
      motif: "pedagogy",
      roles: [
        "Graduate SNE Teacher",
        "Inclusion & Learning Support Teacher",
        "Educational Assessment Officer",
      ],
      exampleProject:
        "An inclusive-practice case presented through adaptation, support strategies and learner progress.",
    },
    {
      name: "Bachelor of Education (Technology Education)",
      shortName: "BEd Technology",
      slug: "bed-technology",
      tagline: "Technical · Applied Learning",
      motif: "mechanism",
      roles: ["Graduate Technology Teacher", "Technical & Vocational Instructor"],
      exampleProject:
        "A workshop-based project showing safety, making and assessment logic.",
    },
    {
      name: "Bachelor of Education (Business Studies)",
      shortName: "BEd Business",
      slug: "bed-business",
      tagline: "Commerce · Enterprise",
      motif: "pedagogy",
      roles: ["Graduate Business Teacher", "Business & Entrepreneurship Educator"],
      exampleProject:
        "A business teaching project shown through cases, simulations and outcomes.",
    },
    {
      name: "Bachelor of Education (Guidance & Counselling)",
      shortName: "BEd Guidance",
      slug: "bed-guidance-counselling",
      tagline: "Support · Development",
      motif: "pedagogy",
      roles: [
        "Guidance & Counselling Officer",
        "Student Support & Wellness Officer",
      ],
      exampleProject:
        "A support programme presented through structure, ethics and measurable learner wellbeing outcomes.",
    },
    {
      name: "Bachelor of Education (Early Childhood & Primary Education)",
      shortName: "BEd ECDE & Primary",
      slug: "bed-early-childhood-primary",
      tagline: "Foundations · Play · Literacy",
      motif: "pedagogy",
      roles: [
        "Early Childhood Educator",
        "Primary Teacher",
        "ECDE Programme Officer",
      ],
      exampleProject:
        "A foundational-literacy sequence with learner evidence and parent communication.",
    },
  ],
};

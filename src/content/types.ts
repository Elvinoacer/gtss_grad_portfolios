/**
 * GTSS Graduate Portfolio Hub — content model
 * Discipline-aware registry types (spec §17 Portfolio Registry)
 */

export type PortfolioStatus = "concept" | "demo" | "live";

export type CandidateStatus = "student" | "fresh-graduate" | "early-career";

/** Visual motif families used by portfolio mock screens */
export type MotifId =
  | "blueprint"
  | "circuit"
  | "waveform"
  | "mechanism"
  | "process"
  | "textile"
  | "system"
  | "distribution"
  | "scatter"
  | "molecule"
  | "culture"
  | "archive"
  | "editorial"
  | "pedagogy"
  | "field"
  | "policy"
  | "airspace";

export interface Degree {
  /** Full programme name, e.g. "B.Eng. in Civil & Structural Engineering" */
  name: string;
  shortName?: string;
  slug: string;
  /** Short professional direction, e.g. "Structures · Infrastructure" */
  tagline: string;
  /** Motif used to render mock portfolio previews */
  motif: MotifId;
  /** Discipline imagery key under /images */
  image?: string;
  /** Graduate roles this degree targets */
  roles: string[];
  /** What a portfolio for this degree can demonstrate (falls back to school defaults) */
  evidence?: string[];
  /** Possible portfolio sections (falls back to school defaults) */
  sections?: string[];
  /** Example project storytelling line */
  exampleProject?: string;
  /** Slug of the demo portfolio for this degree, if any */
  demoSlug?: string;
}

export interface School {
  name: string;
  shortName: string;
  slug: string;
  /** Punchy discipline statement, e.g. "Build. Test. Measure. Explain." */
  statement: string;
  description: string;
  /** Longer professional context paragraph */
  context: string;
  /** What portfolios in this school can demonstrate */
  evidence: string[];
  /** Default portfolio section patterns */
  sections: string[];
  /** Visual motif keywords (editorial language) */
  motifKeywords: string[];
  image: string;
  /** Subtle local accent used inside school-scoped visuals only */
  accent: string;
  degrees: Degree[];
}

export interface Portfolio {
  id: string;
  slug: string;
  candidate: {
    name: string;
    initials: string;
    graduationYear?: number;
    status: CandidateStatus;
  };
  schoolSlug: string;
  degreeSlug: string;
  careerDirection: string;
  presentation: {
    headline: string;
    summary: string;
    themeLabel: string;
    accent: string;
  };
  motif: MotifId;
  evidenceTypes: string[];
  featuredSections: string[];
  designRationale: string;
  contentArchitecture: string[];
  tags: string[];
  status: PortfolioStatus;
  isFeatured: boolean;
  publishedAt?: string;
}

export interface University {
  name: string;
  shortName: string;
  slug: string;
  campus: string;
  locationNote: string;
  collectionLabel: string;
}

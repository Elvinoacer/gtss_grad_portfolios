import type { School, University } from "../types";
import { engineering } from "./engineering";
import { scienceAerospace } from "./science-aerospace";
import { informationSciences } from "./information-sciences";
import { education } from "./education";
import { agriculture } from "./agriculture";
import { artsSocialSciences } from "./arts-social-sciences";

export const university: University = {
  name: "Moi University",
  shortName: "Moi University",
  slug: "moi-university",
  campus: "Main Campus (Kesses)",
  locationNote: "Uasin Gishu County, Kenya",
  collectionLabel: "The Moi University Collection",
};

export const schools: School[] = [
  engineering,
  scienceAerospace,
  informationSciences,
  education,
  agriculture,
  artsSocialSciences,
];

export function getSchool(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug);
}

export function getSchoolOfDegree(degreeSlug: string): School | undefined {
  return schools.find((s) => s.degrees.some((d) => d.slug === degreeSlug));
}

export function getDegree(degreeSlug: string) {
  for (const school of schools) {
    const degree = school.degrees.find((d) => d.slug === degreeSlug);
    if (degree) return { degree, school };
  }
  return undefined;
}

export interface FlatDegree {
  degree: School["degrees"][number];
  school: School;
}

export const allDegrees: FlatDegree[] = schools.flatMap((school) =>
  school.degrees.map((degree) => ({ degree, school }))
);

export const totalDegreeCount = allDegrees.length;

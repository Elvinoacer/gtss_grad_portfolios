import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const requestSchema = z.object({
  // Step 1
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  candidateStatus: z.enum([
    "student",
    "final-year",
    "fresh-graduate",
    "early-career",
  ]),
  university: z.string().trim().min(2).max(160),
  campus: z.string().trim().max(120).optional().or(z.literal("")),
  graduationYear: z.coerce.number().int().min(1990).max(2035).optional().nullable(),
  // Step 2
  school: z.string().trim().max(160).optional().or(z.literal("")),
  degree: z.string().trim().min(2, "Degree / programme is required").max(220),
  courseNotListed: z.boolean().optional().default(false),
  specialization: z.string().trim().max(160).optional().or(z.literal("")),
  careerDirection: z.string().trim().max(220).optional().or(z.literal("")),
  rolesInterest: z.string().trim().max(400).optional().or(z.literal("")),
  // Step 3
  evidence: z.array(z.string().trim().max(80)).max(40).default([]),
  // Step 4
  targetRoles: z.string().trim().max(400).optional().or(z.literal("")),
  knownFor: z.string().trim().max(400).optional().or(z.literal("")),
  recruiterUnderstanding: z.string().trim().max(600).optional().or(z.literal("")),
  visualPreference: z.string().trim().max(400).optional().or(z.literal("")),
  // Step 5
  links: z
    .object({
      linkedin: z.string().trim().max(300).optional().or(z.literal("")),
      github: z.string().trim().max(300).optional().or(z.literal("")),
      behance: z.string().trim().max(300).optional().or(z.literal("")),
      drive: z.string().trim().max(300).optional().or(z.literal("")),
      portfolio: z.string().trim().max(300).optional().or(z.literal("")),
      website: z.string().trim().max(300).optional().or(z.literal("")),
      publications: z.string().trim().max(300).optional().or(z.literal("")),
      other: z.string().trim().max(300).optional().or(z.literal("")),
    })
    .optional(),
  // Step 6
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  email: z.string().trim().email("A valid email is required").max(160),
  preferredContact: z.enum(["whatsapp", "email", "either"]),
  bestTime: z.string().trim().max(120).optional().or(z.literal("")),
  // Anti-spam (spec §87)
  company: z.string().max(0).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
});

/* Simple in-memory rate limit — 5 submissions / IP / hour (spec §87) */
const hits = new Map<string, number[]>();
const WINDOW = 60 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (list.length >= LIMIT) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please check the highlighted fields.",
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    // Honeypot tripped → pretend success, store nothing (spec §87)
    if (parsed.data.company) {
      return NextResponse.json({ ok: true, id: "ignored" });
    }

    const d = parsed.data;
    const record = await db.portfolioRequest.create({
      data: {
        fullName: d.fullName,
        candidateStatus: d.candidateStatus,
        university: d.university,
        campus: d.campus || null,
        graduationYear: d.graduationYear ?? null,
        school: d.school || null,
        degree: d.degree,
        courseNotListed: d.courseNotListed ?? false,
        specialization: d.specialization || null,
        careerDirection: d.careerDirection || null,
        rolesInterest: d.rolesInterest || null,
        evidenceJson: JSON.stringify(d.evidence ?? []),
        targetRoles: d.targetRoles || null,
        knownFor: d.knownFor || null,
        recruiterUnderstanding: d.recruiterUnderstanding || null,
        visualPreference: d.visualPreference || null,
        linksJson: d.links ? JSON.stringify(d.links) : null,
        whatsapp: d.whatsapp || null,
        email: d.email,
        preferredContact: d.preferredContact,
        bestTime: d.bestTime || null,
        source: d.source || null,
        userAgent: req.headers.get("user-agent")?.slice(0, 250) ?? null,
      },
    });

    return NextResponse.json({
      ok: true,
      id: record.id.slice(-6).toUpperCase(),
    });
  } catch (err) {
    console.error("[request] submission failed", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side. Please try again." },
      { status: 500 }
    );
  }
}

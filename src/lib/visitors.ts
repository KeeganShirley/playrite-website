import { prisma } from "@/lib/prisma";

export const VISITOR_COOKIE_NAME = "playrite_visitor_id";
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

// Rough estimate of visitors before this counter existed (band members,
// mailing list signups, friends/family) - not measured, just a starting
// point so the number isn't 0. Adjust freely.
const BASE_OFFSET = 35;

export async function recordNewVisitor(id: string) {
  try {
    await prisma.visitor.create({ data: { id } });
  } catch {
    // A tracking failure should never break the page itself.
  }
}

export async function getTotalUniqueVisitors() {
  const count = await prisma.visitor.count();
  return count + BASE_OFFSET;
}

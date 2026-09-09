import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Adds a subscriber. Returns true if they were newly added, false if they
 * were already on the list (so callers can decide whether to send a
 * welcome email - not on every resubmission of an existing address).
 */
export async function addSubscriber(email: string): Promise<boolean> {
  try {
    await prisma.subscriber.create({ data: { email } });
    return true;
  } catch (err) {
    // Unique constraint violation just means they're already on the
    // list - treat that as a normal, non-error outcome.
    const isDuplicate =
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002";
    if (!isDuplicate) throw err;
    return false;
  }
}

export async function getAllSubscribers() {
  return prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteSubscriber(id: string) {
  return prisma.subscriber.delete({ where: { id } });
}

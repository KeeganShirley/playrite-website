import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function addSubscriber(email: string) {
  try {
    await prisma.subscriber.create({ data: { email } });
  } catch (err) {
    // Unique constraint violation just means they're already on the
    // list - treat that as a normal, non-error outcome.
    const isDuplicate =
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002";
    if (!isDuplicate) throw err;
  }
}

export async function getAllSubscribers() {
  return prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteSubscriber(id: string) {
  return prisma.subscriber.delete({ where: { id } });
}

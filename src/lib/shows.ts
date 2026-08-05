import { prisma } from "@/lib/prisma";

export type ShowInput = {
  date: string; // yyyy-mm-dd
  time?: string;
  venue: string;
  city: string;
  supportActs?: string;
  ticketUrl?: string;
};

function toUtcDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00.000Z`);
}

export async function getUpcomingShows() {
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  return prisma.show.findMany({
    where: { date: { gte: startOfToday } },
    orderBy: { date: "asc" },
  });
}

export async function getAllShows() {
  return prisma.show.findMany({ orderBy: { date: "asc" } });
}

export async function createShow(input: ShowInput) {
  return prisma.show.create({
    data: {
      date: toUtcDate(input.date),
      time: input.time || null,
      venue: input.venue,
      city: input.city,
      supportActs: input.supportActs || null,
      ticketUrl: input.ticketUrl || null,
    },
  });
}

export async function updateShow(id: string, input: ShowInput) {
  return prisma.show.update({
    where: { id },
    data: {
      date: toUtcDate(input.date),
      time: input.time || null,
      venue: input.venue,
      city: input.city,
      supportActs: input.supportActs || null,
      ticketUrl: input.ticketUrl || null,
    },
  });
}

export async function deleteShow(id: string) {
  return prisma.show.delete({ where: { id } });
}

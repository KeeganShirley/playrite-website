import { prisma } from "@/lib/prisma";

// Counter is offset so the displayed total starts at 20 rather than 0.
const BASE_OFFSET = 20;

export async function recordPageView(path: string) {
  try {
    await prisma.pageView.create({ data: { path } });
  } catch {
    // A tracking failure should never break the page itself.
  }
}

export async function getTotalPageViews() {
  const count = await prisma.pageView.count();
  return count + BASE_OFFSET;
}

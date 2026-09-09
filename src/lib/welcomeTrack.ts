import { prisma } from "@/lib/prisma";

const URL_KEY = "welcome_track_url";
const FILENAME_KEY = "welcome_track_filename";

export type WelcomeTrack = {
  url: string;
  filename: string;
};

export async function getWelcomeTrack(): Promise<WelcomeTrack | null> {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: [URL_KEY, FILENAME_KEY] } },
  });
  const byKey = new Map(rows.map((r) => [r.key, r.value]));
  const url = byKey.get(URL_KEY);
  const filename = byKey.get(FILENAME_KEY);
  if (!url || !filename) return null;
  return { url, filename };
}

export async function setWelcomeTrack(url: string, filename: string) {
  await Promise.all([
    prisma.siteSetting.upsert({
      where: { key: URL_KEY },
      create: { key: URL_KEY, value: url },
      update: { value: url },
    }),
    prisma.siteSetting.upsert({
      where: { key: FILENAME_KEY },
      create: { key: FILENAME_KEY, value: filename },
      update: { value: filename },
    }),
  ]);
}

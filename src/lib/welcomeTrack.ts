import { prisma } from "@/lib/prisma";

const URL_KEY = "welcome_track_url";
const DOWNLOAD_URL_KEY = "welcome_track_download_url";
const FILENAME_KEY = "welcome_track_filename";

export type WelcomeTrack = {
  url: string;
  downloadUrl: string;
  filename: string;
};

export async function getWelcomeTrack(): Promise<WelcomeTrack | null> {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: [URL_KEY, DOWNLOAD_URL_KEY, FILENAME_KEY] } },
  });
  const byKey = new Map(rows.map((r) => [r.key, r.value]));
  const url = byKey.get(URL_KEY);
  const downloadUrl = byKey.get(DOWNLOAD_URL_KEY);
  const filename = byKey.get(FILENAME_KEY);
  if (!url || !filename) return null;
  // downloadUrl was added after url/filename - fall back for anything
  // uploaded before this field existed.
  return { url, downloadUrl: downloadUrl ?? url, filename };
}

export async function setWelcomeTrack(
  url: string,
  downloadUrl: string,
  filename: string
) {
  await Promise.all([
    prisma.siteSetting.upsert({
      where: { key: URL_KEY },
      create: { key: URL_KEY, value: url },
      update: { value: url },
    }),
    prisma.siteSetting.upsert({
      where: { key: DOWNLOAD_URL_KEY },
      create: { key: DOWNLOAD_URL_KEY, value: downloadUrl },
      update: { value: downloadUrl },
    }),
    prisma.siteSetting.upsert({
      where: { key: FILENAME_KEY },
      create: { key: FILENAME_KEY, value: filename },
      update: { value: filename },
    }),
  ]);
}

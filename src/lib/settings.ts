import { prisma } from "@/lib/prisma";

export const SITE_TEXT_FIELDS = {
  about_bio: {
    label: "About bio",
    default:
      "Playrite is an energetic DC-based quintet originating from the armpits of the internet — reddit and, probably nicher than your favs, bandmix.com. With a sound characterized by noisey lead guitar and punchy, nostalgic vocals, playrite is sure to leave you thinking “wow, ok girl.”",
  },
  video_heading: {
    label: "Music video section heading",
    default: "TEASERS MUSIC VIDEO!!",
  },
  merch_message: {
    label: "Merch page message",
    default: "Oops, we don't have merch yet. Coming soon!",
  },
  join_heading: {
    label: "Join page heading",
    default: "JOIN THE GROUP CHAT…",
  },
  join_blurb: {
    label: "Join page subtext",
    default:
      "Get on the list for new music, shows, and whatever else we feel like sending.",
  },
  no_shows_message: {
    label: "\"No shows\" message",
    default: "No shows on the books right now — check back soon.",
  },
  welcome_email_subject: {
    label: "Welcome email subject line",
    default: "Welcome to the group chat 🎸",
  },
  welcome_email_body: {
    label: "Welcome email message",
    default:
      "You're on the list. Here's an unreleased track as a thank-you for signing up — nobody else has heard this yet.",
  },
} as const;

export type SiteTextKey = keyof typeof SITE_TEXT_FIELDS;

export async function getSiteText(key: SiteTextKey): Promise<string> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  return row?.value ?? SITE_TEXT_FIELDS[key].default;
}

export async function getAllSiteText(): Promise<Record<SiteTextKey, string>> {
  const rows = await prisma.siteSetting.findMany();
  const byKey = new Map(rows.map((r) => [r.key, r.value]));

  const result = {} as Record<SiteTextKey, string>;
  for (const key of Object.keys(SITE_TEXT_FIELDS) as SiteTextKey[]) {
    result[key] = byKey.get(key) ?? SITE_TEXT_FIELDS[key].default;
  }
  return result;
}

export async function updateSiteText(entries: Partial<Record<SiteTextKey, string>>) {
  const keys = Object.keys(entries) as SiteTextKey[];
  await Promise.all(
    keys.map((key) => {
      const value = entries[key];
      if (value === undefined) return Promise.resolve();
      return prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    })
  );
}

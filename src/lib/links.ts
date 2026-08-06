export const SOCIAL_LINKS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/2vTV6u6dJp9eVLV6tMz1Sz?si=SYTfqi-FSGq0mN0AucbblA",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/playrite/1838506504",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/playrite.band",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCiC2gc0wkdkwuyY8i53c19Q",
  },
  {
    label: "Bandcamp",
    href: "https://playrite.bandcamp.com/",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@playrite.band",
  },
] as const;

export const NAV_LINKS = [
  { label: "Music", href: "/#music" },
  { label: "About", href: "/#about" },
  { label: "Merch", href: "/merch" },
  { label: "Connect", href: "/#connect" },
] as const;

export const MUSIC_VIDEO_URL = "https://www.youtube.com/watch?v=V1JrGTPAUuU";

export const BOOKING_EMAIL = "playritedmv@gmail.com";

export function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  const id = match?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
}

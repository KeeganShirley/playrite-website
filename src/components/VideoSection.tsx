import { MUSIC_VIDEO_URL, SOCIAL_LINKS, getYouTubeEmbedUrl } from "@/lib/links";
import {
  AppleMusicIcon,
  BandcampIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "@/components/icons";

function findSocial(label: string) {
  const link = SOCIAL_LINKS.find((l) => l.label === label);
  if (!link) throw new Error(`Missing social link: ${label}`);
  return link.href;
}

const SPOTIFY_URL = findSocial("Spotify");
const YOUTUBE_URL = findSocial("YouTube");
const APPLE_MUSIC_URL = findSocial("Apple Music");
const BANDCAMP_URL = findSocial("Bandcamp");

const iconLinkClass = "text-text-muted transition-colors hover:text-text";

export default function VideoSection() {
  return (
    <section id="music" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <h2 className="font-display text-4xl tracking-[0.08em] text-text sm:text-5xl">
          TEASERS MUSIC VIDEO!!
        </h2>

        <div className="mt-10 flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center">
          <div className="hidden md:flex md:flex-col md:items-center md:gap-10">
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className={iconLinkClass}
            >
              <SpotifyIcon className="h-12 w-12" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className={iconLinkClass}
            >
              <YouTubeIcon className="h-12 w-12" />
            </a>
          </div>

          <div className="aspect-video w-full max-w-2xl overflow-hidden rounded-sm bg-bg-elevated">
            <iframe
              className="h-full w-full"
              src={getYouTubeEmbedUrl(MUSIC_VIDEO_URL)}
              title="Playrite music video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="hidden md:flex md:flex-col md:items-center md:gap-10">
            <a
              href={APPLE_MUSIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apple Music"
              className={iconLinkClass}
            >
              <AppleMusicIcon className="h-12 w-12" />
            </a>
            <a
              href={BANDCAMP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bandcamp"
              className={iconLinkClass}
            >
              <BandcampIcon className="h-12 w-12" />
            </a>
          </div>

          <div className="flex items-center gap-6 md:hidden">
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className={iconLinkClass}
            >
              <SpotifyIcon className="h-9 w-9" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className={iconLinkClass}
            >
              <YouTubeIcon className="h-9 w-9" />
            </a>
            <a
              href={APPLE_MUSIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apple Music"
              className={iconLinkClass}
            >
              <AppleMusicIcon className="h-9 w-9" />
            </a>
            <a
              href={BANDCAMP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bandcamp"
              className={iconLinkClass}
            >
              <BandcampIcon className="h-9 w-9" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

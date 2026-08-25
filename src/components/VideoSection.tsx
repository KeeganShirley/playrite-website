import { MUSIC_VIDEO_URL, SOCIAL_LINKS, getYouTubeEmbedUrl } from "@/lib/links";
import { getSiteText } from "@/lib/settings";
import {
  AppleMusicIcon,
  BandcampIcon,
  SpotifyIcon,
  YouTubeIcon,
  type IconComponent,
} from "@/components/icons";

function findSocial(label: string) {
  const link = SOCIAL_LINKS.find((l) => l.label === label);
  if (!link) throw new Error(`Missing social link: ${label}`);
  return link.href;
}

const PLATFORMS: { label: string; href: string; Icon: IconComponent }[] = [
  { label: "Spotify", href: findSocial("Spotify"), Icon: SpotifyIcon },
  { label: "YouTube", href: findSocial("YouTube"), Icon: YouTubeIcon },
  { label: "Apple Music", href: findSocial("Apple Music"), Icon: AppleMusicIcon },
  { label: "Bandcamp", href: findSocial("Bandcamp"), Icon: BandcampIcon },
];

function PlatformLink({
  label,
  href,
  Icon,
  size,
}: {
  label: string;
  href: string;
  Icon: IconComponent;
  size: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-text"
    >
      <Icon className={size} />
      <span className="text-[11px] font-medium uppercase tracking-[0.15em]">
        {label}
      </span>
    </a>
  );
}

export default async function VideoSection() {
  const heading = await getSiteText("video_heading");
  const [spotify, youtube, appleMusic, bandcamp] = PLATFORMS;

  return (
    <section id="music" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <h2 className="font-display text-4xl tracking-[0.08em] text-text sm:text-5xl">
          {heading}
        </h2>

        <div className="mt-10 flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center">
          <div className="hidden md:flex md:flex-col md:items-center md:gap-12">
            <PlatformLink {...spotify} size="h-14 w-14" />
            <PlatformLink {...youtube} size="h-14 w-14" />
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

          <div className="hidden md:flex md:flex-col md:items-center md:gap-12">
            <PlatformLink {...appleMusic} size="h-14 w-14" />
            <PlatformLink {...bandcamp} size="h-14 w-14" />
          </div>

          <div className="grid grid-cols-4 gap-6 md:hidden">
            {PLATFORMS.map((platform) => (
              <PlatformLink key={platform.label} {...platform} size="h-10 w-10" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

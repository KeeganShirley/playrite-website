import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/links";
import {
  AppleMusicIcon,
  InstagramIcon,
  SpotifyIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/icons";
import MobileMenu from "@/components/MobileMenu";

function findSocial(label: string) {
  const link = SOCIAL_LINKS.find((l) => l.label === label);
  if (!link) throw new Error(`Missing social link: ${label}`);
  return link.href;
}

const NAV_ICONS = [
  { label: "Instagram", href: findSocial("Instagram"), Icon: InstagramIcon },
  { label: "Spotify", href: findSocial("Spotify"), Icon: SpotifyIcon },
  { label: "YouTube", href: findSocial("YouTube"), Icon: YouTubeIcon },
  { label: "Apple Music", href: findSocial("Apple Music"), Icon: AppleMusicIcon },
  { label: "TikTok", href: findSocial("TikTok"), Icon: TikTokIcon },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur">
      <nav className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 sm:grid-cols-[1fr_auto_1fr] sm:px-10">
        <Link
          href="/#top"
          className="font-display text-2xl tracking-[0.15em] text-text"
        >
          PLAYRITE
        </Link>

        <ul className="flex items-center justify-center gap-4">
          {NAV_ICONS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block text-text-muted transition-colors hover:text-text"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>

        <div className="justify-self-end">
          <MobileMenu />

          <ul className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

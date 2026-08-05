import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/links";

const NAV_LINKS = [
  { label: "Music", href: "#music" },
  { label: "About", href: "#about" },
  { label: "Connect", href: "#connect" },
];

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
      <nav className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 px-6 py-4 sm:grid-cols-[1fr_auto_1fr] sm:px-10">
        <Link
          href="#top"
          className="font-display text-2xl tracking-[0.15em] text-text"
        >
          PLAYRITE
        </Link>

        <ul className="flex items-center justify-end gap-4 sm:justify-self-center">
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

        <ul className="hidden items-center gap-8 sm:flex sm:justify-self-end">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M6.8 9.6c3.4-1 7-0.9 10.1 0.8" />
      <path d="M7.2 12.6c2.8-0.8 5.9-0.7 8.6 0.6" />
      <path d="M7.6 15.4c2.3-0.6 4.8-0.5 6.9 0.5" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <g fill="currentColor" stroke="none">
        <circle cx="9.3" cy="16.2" r="1.9" />
        <circle cx="15.8" cy="14.8" r="1.9" />
        <rect x="10.7" y="7.5" width="1.2" height="8.7" />
        <rect x="17.2" y="6.4" width="1.2" height="8.4" />
        <path d="M10.7 7.5l6.5-1.1v2.1l-6.5 1.1z" />
      </g>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="9.4" cy="16.6" r="2.6" fill="currentColor" stroke="none" />
      <path d="M12 16.6V4.8" />
      <path d="M12 5.6c0.9 1.9 2.6 2.9 4.5 3.1" />
    </svg>
  );
}

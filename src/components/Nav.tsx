import Link from "next/link";

const NAV_LINKS = [
  { label: "Shows", href: "#shows" },
  { label: "Music", href: "#music" },
  { label: "About", href: "#about" },
  { label: "Connect", href: "#connect" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="#top"
          className="font-display text-2xl tracking-[0.15em] text-text"
        >
          PLAYRITE
        </Link>
        <ul className="flex items-center gap-5 sm:gap-8">
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

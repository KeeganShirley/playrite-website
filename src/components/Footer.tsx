import Link from "next/link";
import { BOOKING_EMAIL, SOCIAL_LINKS } from "@/lib/links";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="connect"
      className="border-t border-border/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <h2 className="font-display text-4xl tracking-[0.08em] text-text sm:text-5xl">
          CONNECT
        </h2>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
          Booking &amp; Inquiries
        </p>
        <a
          href={`mailto:${BOOKING_EMAIL}`}
          className="mt-2 inline-block font-display text-2xl tracking-[0.04em] text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text sm:text-3xl"
        >
          {BOOKING_EMAIL}
        </a>

        <p className="mt-10 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
          Socials!
        </p>
        <ul className="mt-2 flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-sm border border-border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-text transition-colors hover:border-text hover:bg-bg-elevated"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
          Don&apos;t Miss Out
        </p>
        <Link
          href="/join"
          className="mt-2 inline-block font-display text-2xl tracking-[0.04em] text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text sm:text-3xl"
        >
          Join our mail list!
        </Link>

        <p className="mt-12 text-xs text-text-muted">
          &copy; {year} Playrite. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

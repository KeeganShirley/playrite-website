"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/links";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-5 bg-text transition-transform ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-text transition-opacity ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-text transition-transform ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open ? (
        <ul className="absolute right-0 top-full mt-3 w-44 rounded-sm border border-border bg-bg py-2 shadow-lg">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

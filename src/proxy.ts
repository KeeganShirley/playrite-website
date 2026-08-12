import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";
import { recordPageView } from "@/lib/pageviews";

const TRACKED_PATHS = new Set(["/", "/merch", "/gallery", "/join"]);

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!verifySessionToken(token)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (TRACKED_PATHS.has(pathname)) {
    event.waitUntil(recordPageView(pathname));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    {
      source: "/",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/merch",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/gallery",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/join",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

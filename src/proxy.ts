import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";
import {
  VISITOR_COOKIE_MAX_AGE,
  VISITOR_COOKIE_NAME,
  recordNewVisitor,
} from "@/lib/visitors";

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

  const response = NextResponse.next();

  if (TRACKED_PATHS.has(pathname) && !request.cookies.get(VISITOR_COOKIE_NAME)) {
    const id = crypto.randomUUID();
    response.cookies.set(VISITOR_COOKIE_NAME, id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: VISITOR_COOKIE_MAX_AGE,
    });
    event.waitUntil(recordNewVisitor(id));
  }

  return response;
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

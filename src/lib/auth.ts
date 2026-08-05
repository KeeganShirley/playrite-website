import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";

export async function isAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function requireAdminSession() {
  const ok = await isAdminSession();
  if (!ok) {
    throw new Error("Unauthorized");
  }
}

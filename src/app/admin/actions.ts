"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { COOKIE_NAME, SESSION_TTL_SECONDS, createSessionToken } from "@/lib/session";
import { isAdminSession } from "@/lib/auth";
import { createShow, deleteShow, updateShow, type ShowInput } from "@/lib/shows";
import { deleteSubscriber } from "@/lib/subscribers";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  const usernameOk = !!expectedUsername && username === expectedUsername;
  const passwordOk =
    !!expectedHash && (await bcrypt.compare(password, expectedHash));

  if (!usernameOk || !passwordOk) {
    redirect("/admin/login?error=invalid");
  }

  const token = createSessionToken(username);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}

function readShowInput(formData: FormData): ShowInput {
  return {
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
    venue: String(formData.get("venue") ?? ""),
    city: String(formData.get("city") ?? ""),
    supportActs: String(formData.get("supportActs") ?? ""),
    ticketUrl: String(formData.get("ticketUrl") ?? ""),
  };
}

export async function createShowAction(formData: FormData) {
  if (!(await isAdminSession())) redirect("/admin/login");

  const input = readShowInput(formData);
  if (!input.date || !input.venue || !input.city) {
    redirect("/admin?error=missing_fields");
  }

  await createShow(input);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateShowAction(formData: FormData) {
  if (!(await isAdminSession())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const input = readShowInput(formData);
  if (!id || !input.date || !input.venue || !input.city) {
    redirect("/admin?error=missing_fields");
  }

  await updateShow(id, input);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteShowAction(formData: FormData) {
  if (!(await isAdminSession())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin?error=missing_id");

  await deleteShow(id);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteSubscriberAction(formData: FormData) {
  if (!(await isAdminSession())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin?error=missing_id");

  await deleteSubscriber(id);
  revalidatePath("/admin");
  redirect("/admin");
}

"use server";

import { redirect } from "next/navigation";
import { addSubscriber, isValidEmail } from "@/lib/subscribers";

export async function joinMailingListAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!isValidEmail(email)) {
    redirect("/join?error=invalid");
  }

  await addSubscriber(email);

  redirect("/join?success=1");
}

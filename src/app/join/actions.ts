"use server";

import { redirect } from "next/navigation";
import { addSubscriber, isValidEmail } from "@/lib/subscribers";
import { sendWelcomeEmail } from "@/lib/email";

export async function joinMailingListAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!isValidEmail(email)) {
    redirect("/join?error=invalid");
  }

  const isNewSubscriber = await addSubscriber(email);
  if (isNewSubscriber) {
    await sendWelcomeEmail(email);
  }

  redirect("/join?success=1");
}

import { Resend } from "resend";
import { getSiteText } from "@/lib/settings";
import { getWelcomeTrack } from "@/lib/welcomeTrack";

function getFromAddress() {
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!domain) return null;
  return `Playrite <hello@${domain}>`;
}

export async function sendWelcomeEmail(to: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = getFromAddress();
  if (!apiKey || !from) {
    console.error("Resend not configured - skipping welcome email");
    return;
  }

  const domain = process.env.RESEND_EMAIL_DOMAIN;
  const [subject, body, track] = await Promise.all([
    getSiteText("welcome_email_subject"),
    getSiteText("welcome_email_body"),
    getWelcomeTrack(),
  ]);

  // Send people to the on-site player (tap play, it just works on phones)
  // rather than straight at the file, which downloads awkwardly on mobile.
  const trackSection = track
    ? `<p style="margin:24px 0 0;"><a href="https://${domain}/listen" style="display:inline-block;background:#f0ece4;color:#0f1c25;padding:12px 24px;text-decoration:none;border-radius:2px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;font-size:13px;">Listen now</a></p>`
    : "";

  const html = `
    <div style="background:#0f1c25;padding:40px 24px;font-family:-apple-system,sans-serif;">
      <div style="max-width:480px;margin:0 auto;">
        <h1 style="color:#f0ece4;font-size:24px;letter-spacing:0.08em;margin:0 0 16px;">PLAYRITE</h1>
        <p style="color:#a9a196;font-size:16px;line-height:1.6;margin:0;white-space:pre-line;">${body}</p>
        ${trackSection}
      </div>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({ from, to, subject, html });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

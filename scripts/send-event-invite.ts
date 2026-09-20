import { Resend } from "resend";
import { getEventInviteEmail } from "./event-invite-email";

const SUBJECT = "You're invited: The Crown Experience";

async function main() {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.FROM_EMAIL || "NURVICA <onboarding@resend.dev>";

  if (!apiKey || !audienceId) {
    console.error("Missing RESEND_API_KEY or RESEND_AUDIENCE_ID in the environment.");
    process.exit(1);
  }

  const send = process.argv.includes("--send");
  const resend = new Resend(apiKey);

  const base = {
    audienceId,
    from: fromEmail,
    subject: SUBJECT,
    previewText: "Join us for The Crown Experience on October 17.",
    html: getEventInviteEmail(),
  };

  const { data, error } = send
    ? await resend.broadcasts.create({ ...base, send: true })
    : await resend.broadcasts.create(base);

  if (error) {
    console.error("Failed to create broadcast:", error);
    process.exit(1);
  }

  if (send) {
    console.log(`Broadcast sent. ID: ${data?.id}`);
  } else {
    console.log(`Draft broadcast created. ID: ${data?.id}`);
    console.log("Review it at https://resend.com/broadcasts, then send from the dashboard,");
    console.log("or re-run this script with --send to send it immediately.");
  }
}

main();

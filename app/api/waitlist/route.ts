import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getWelcomeEmail } from "./welcome-email";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const resend = getResend();
    const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
    const FROM_EMAIL = process.env.FROM_EMAIL || "NURVICA <hello@nurvica.co>";
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Add contact to the Resend Audience
    const { error: contactError } = await resend.contacts.create({
      email: normalizedEmail,
      audienceId: AUDIENCE_ID,
    });

    // Ignore "already exists" errors — treat as success
    if (contactError && !contactError.message?.includes("already")) {
      console.error("Failed to add contact:", contactError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Send the welcome email
    const { error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: normalizedEmail,
      subject: "You're on the list — welcome to NURVICA",
      html: getWelcomeEmail(),
    });

    if (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Contact was still added — don't fail the whole request
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

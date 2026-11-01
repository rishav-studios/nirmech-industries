import { NextResponse } from "next/server";
import { Resend } from "resend";

const TARGET_EMAIL = process.env.CONTACT_EMAIL || "savan@nirmech.com";
const FROM_EMAIL =
  process.env.RESEND_FROM || "Nirmech Industries <sales@nirmech.com>";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        {
          success: false,
          message:
            "RESEND_API_KEY is not configured. Please add your Resend API key to .env.local.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TARGET_EMAIL,
      replyTo: email,
      subject: `New Company Presentation Request from ${email}`,
      text: `You have received a new request for the company presentation.\n\nVisitor Email: ${email}\nDate/Time: ${submittedAt}\nSource: Website Landing Page`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #111; max-width: 600px; line-height: 1.5;">
          <h2 style="color: #0b0b0b; margin-top: 0; margin-bottom: 16px;">New Company Presentation Request</h2>
          <p style="margin-bottom: 20px;">
            A visitor has requested the company presentation on the <strong>Nirmech Industries</strong> website.
          </p>
          <table style="border-collapse: collapse; width: 100%; max-width: 450px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 12px; background: #f8f8f8; font-weight: 600; border: 1px solid #e5e5e5; width: 130px;">
                Requested By
              </td>
              <td style="padding: 10px 12px; border: 1px solid #e5e5e5;">
                <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8f8f8; font-weight: 600; border: 1px solid #e5e5e5;">
                Submitted At
              </td>
              <td style="padding: 10px 12px; border: 1px solid #e5e5e5;">
                ${submittedAt}
              </td>
            </tr>
          </table>
          <p style="margin-top: 16px; font-size: 13px; color: #666;">
            You can reply directly to this email to contact <strong>${email}</strong>.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        {
          success: false,
          message:
            error.message || "Failed to send presentation request via Resend.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      method: "resend",
      id: data?.id,
    });
  } catch (error) {
    console.error("Presentation request error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to send request. Please try again or email savan@nirmech.com directly.",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, EMAIL_CONFIG } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(120),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(2000),
  // Honeypot anti-spam
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please check your inputs.",
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    // Anti-spam honeypot
    if (parsed.data.company) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, whatsapp, subject, message } = parsed.data;
    const refCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // 1. Send alert to GTSS Admin
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0b0e14; color: #f1f5f9; padding: 20px; }
    .box { max-width: 600px; margin: 0 auto; background: #111622; border: 1px solid #283347; border-radius: 12px; padding: 24px; }
    h2 { margin-top: 0; color: #d4af37; font-size: 18px; }
    .field { margin-bottom: 12px; }
    .label { font-size: 12px; text-transform: uppercase; color: #8fa0b5; }
    .val { font-size: 15px; color: #ffffff; margin-top: 2px; }
    .msg { background: #1a2233; padding: 14px; border-radius: 8px; border-left: 3px solid #d4af37; margin-top: 16px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="box">
    <h2>New Direct Reach-Out Message (Ref: ${refCode})</h2>
    <div class="field"><div class="label">From</div><div class="val">${name} (${email})</div></div>
    ${whatsapp ? `<div class="field"><div class="label">WhatsApp</div><div class="val">${whatsapp}</div></div>` : ""}
    ${subject ? `<div class="field"><div class="label">Subject</div><div class="val">${subject}</div></div>` : ""}
    <div class="field">
      <div class="label">Message</div>
      <div class="msg">${message}</div>
    </div>
  </div>
</body>
</html>
`;

    // 2. Send receipt auto-reply to inquirer
    const replyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0b0e14; color: #cbd5e1; padding: 20px; }
    .box { max-width: 580px; margin: 0 auto; background: #111622; border: 1px solid #283347; border-radius: 12px; padding: 28px; }
    h2 { margin-top: 0; color: #d4af37; font-size: 20px; }
    p { line-height: 1.6; font-size: 14px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Thank You for Reaching Out to GTSS</h2>
    <p>Hi ${name.split(" ")[0]},</p>
    <p>We received your message and will review it shortly. Our team typically replies within 24 hours.</p>
    <p>If you'd like a quicker answer, feel free to reach out directly to our WhatsApp line at <strong>+254 792 156 094</strong>.</p>
    <hr style="border: 0; border-top: 1px solid #283347; margin: 20px 0;" />
    <p style="font-size: 12px; color: #64748b; margin: 0;">GTSS Graduate Portfolios Studio · <a href="mailto:support@gtss.software" style="color: #94a3b8;">support@gtss.software</a></p>
  </div>
</body>
</html>
`;

    await Promise.allSettled([
      sendEmail({
        to: EMAIL_CONFIG.adminEmail,
        subject: `[Reach Out] ${subject || "New Inquiry"} · ${name}`,
        html: adminHtml,
        replyTo: email,
      }),
      sendEmail({
        to: email,
        subject: "We received your message · GTSS",
        html: replyHtml,
        replyTo: EMAIL_CONFIG.emailFrom,
      }),
    ]);

    return NextResponse.json({ ok: true, reference: refCode });
  } catch (err) {
    console.error("[contact] Submission error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to send message. Please try again." },
      { status: 500 }
    );
  }
}

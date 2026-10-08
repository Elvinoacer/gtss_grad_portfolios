/**
 * Resend Email Service for GTSS Graduate Portfolios
 * Supports admin notifications and automated candidate replies.
 */

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
}

export interface PortfolioRequestEmailData {
  fullName: string;
  candidateStatus: string;
  university: string;
  campus?: string | null;
  graduationYear?: number | null;
  school?: string | null;
  degree: string;
  courseNotListed?: boolean;
  specialization?: string | null;
  careerDirection?: string | null;
  rolesInterest?: string | null;
  evidence: string[];
  targetRoles?: string | null;
  knownFor?: string | null;
  recruiterUnderstanding?: string | null;
  visualPreference?: string | null;
  links?: Record<string, string | undefined> | null;
  whatsapp?: string | null;
  email: string;
  preferredContact: "whatsapp" | "email" | "either";
  bestTime?: string | null;
  source?: string | null;
}

export const EMAIL_CONFIG = {
  resendApiKey: process.env.RESEND_API_KEY || "re_WZxXADC1_3nk2615DB1RcuuL4pcLn7SrG",
  adminEmail: process.env.ADMIN_EMAIL || "GTSS <support@gtss.software>",
  emailFrom: process.env.EMAIL_FROM || "GTSS <support@gtss.software>",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254792156094",
};

/**
 * Send an email using Resend HTTP API.
 * Uses native fetch to remain lightweight with zero extra runtime dependencies.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
  from = EMAIL_CONFIG.emailFrom,
}: SendEmailParams): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const apiKey = EMAIL_CONFIG.resendApiKey;
    if (!apiKey) {
      console.warn("[email] RESEND_API_KEY is not configured. Email skipped.");
      return { ok: false, error: "RESEND_API_KEY missing" };
    }

    const recipients = Array.isArray(to) ? to : [to];

    const payload: Record<string, unknown> = {
      from,
      to: recipients,
      subject,
      html,
    };

    if (text) payload.text = text;
    if (replyTo) payload.reply_to = replyTo;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[email] Resend API error:", data);
      return { ok: false, error: data.message || "Failed to send email" };
    }

    return { ok: true, id: data.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] Unexpected error:", msg);
    return { ok: false, error: msg };
  }
}

/**
 * Clean phone number for WhatsApp URL.
 */
function cleanWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return `254${digits.slice(1)}`;
  }
  return digits;
}

/**
 * Send notification to the GTSS admin team when a new portfolio commission is requested.
 */
export async function sendAdminNotification(
  data: PortfolioRequestEmailData,
  referenceId: string
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const cleanPhone = data.whatsapp ? cleanWhatsAppNumber(data.whatsapp) : "";
  const waChatLink = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hi ${data.fullName.split(" ")[0]}, this is GTSS regarding your graduate portfolio request (${referenceId}).`
      )}`
    : null;

  const linksEntries = data.links
    ? Object.entries(data.links).filter(([, v]) => Boolean(v))
    : [];

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0e14; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { max-width: 680px; margin: 0 auto; background: #111622; border: 1px solid #2d3748; border-radius: 12px; overflow: hidden; }
    .header { background: #07090c; padding: 24px 32px; border-bottom: 2px solid #d4af37; }
    .header h1 { margin: 0; font-size: 20px; color: #ffffff; letter-spacing: -0.02em; }
    .header .ref { color: #d4af37; font-family: monospace; font-size: 13px; margin-top: 6px; }
    .content { padding: 32px; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #d4af37; font-weight: 700; margin-bottom: 12px; border-bottom: 1px solid #1e2638; padding-bottom: 6px; }
    .row { display: flex; margin-bottom: 8px; font-size: 14px; }
    .label { color: #8fa0b5; width: 160px; flex-shrink: 0; font-weight: 500; }
    .val { color: #f8fafc; font-weight: 400; word-break: break-word; }
    .badge { display: inline-block; background: #1e283d; color: #cbd5e1; padding: 4px 10px; border-radius: 6px; font-size: 12px; margin: 2px; }
    .cta-btn { display: inline-block; background: #25d366; color: #000000; font-weight: 600; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; margin-top: 10px; }
    .footer { background: #0c0f17; padding: 16px 32px; font-size: 12px; color: #64748b; border-top: 1px solid #1e2638; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Portfolio Commission Request</h1>
      <div class="ref">Ref: GTSS-${referenceId} · Candidate: ${data.fullName}</div>
    </div>
    <div class="content">
      <!-- Candidate Details -->
      <div class="section">
        <div class="section-title">Step 1 — Candidate</div>
        <div class="row"><div class="label">Full Name:</div><div class="val"><strong>${data.fullName}</strong></div></div>
        <div class="row"><div class="label">Status:</div><div class="val">${data.candidateStatus}</div></div>
        <div class="row"><div class="label">University:</div><div class="val">${data.university}</div></div>
        ${data.campus ? `<div class="row"><div class="label">Campus:</div><div class="val">${data.campus}</div></div>` : ""}
        ${data.graduationYear ? `<div class="row"><div class="label">Graduation Year:</div><div class="val">${data.graduationYear}</div></div>` : ""}
      </div>

      <!-- Course & Discipline -->
      <div class="section">
        <div class="section-title">Step 2 — Course & Direction</div>
        ${data.school ? `<div class="row"><div class="label">School:</div><div class="val">${data.school}</div></div>` : ""}
        <div class="row"><div class="label">Degree / Programme:</div><div class="val"><strong>${data.degree}</strong> ${data.courseNotListed ? "(Course not listed in catalogue)" : ""}</div></div>
        ${data.specialization ? `<div class="row"><div class="label">Specialization:</div><div class="val">${data.specialization}</div></div>` : ""}
        ${data.careerDirection ? `<div class="row"><div class="label">Career Direction:</div><div class="val">${data.careerDirection}</div></div>` : ""}
        ${data.rolesInterest ? `<div class="row"><div class="label">Roles of Interest:</div><div class="val">${data.rolesInterest}</div></div>` : ""}
      </div>

      <!-- Evidence -->
      <div class="section">
        <div class="section-title">Step 3 — Selected Evidence</div>
        <div>
          ${
            data.evidence && data.evidence.length > 0
              ? data.evidence.map((e) => `<span class="badge">${e}</span>`).join(" ")
              : '<span style="color:#64748b">No specific evidence types selected</span>'
          }
        </div>
      </div>

      <!-- Direction & Narrative -->
      <div class="section">
        <div class="section-title">Step 4 — Professional Narrative</div>
        ${data.targetRoles ? `<div class="row"><div class="label">Target Roles:</div><div class="val">${data.targetRoles}</div></div>` : ""}
        ${data.knownFor ? `<div class="row"><div class="label">Known For:</div><div class="val">${data.knownFor}</div></div>` : ""}
        ${data.recruiterUnderstanding ? `<div class="row"><div class="label">Key Impression:</div><div class="val">${data.recruiterUnderstanding}</div></div>` : ""}
        ${data.visualPreference ? `<div class="row"><div class="label">Visual Preference:</div><div class="val">${data.visualPreference}</div></div>` : ""}
      </div>

      <!-- Links -->
      ${
        linksEntries.length > 0
          ? `
      <div class="section">
        <div class="section-title">Step 5 — Links & References</div>
        ${linksEntries
          .map(
            ([k, v]) =>
              `<div class="row"><div class="label" style="text-transform: capitalize;">${k}:</div><div class="val"><a href="${v}" target="_blank" style="color: #60a5fa;">${v}</a></div></div>`
          )
          .join("")}
      </div>
      `
          : ""
      }

      <!-- Contact -->
      <div class="section">
        <div class="section-title">Step 6 — Contact Channel</div>
        <div class="row"><div class="label">Email:</div><div class="val"><a href="mailto:${data.email}" style="color: #60a5fa;">${data.email}</a></div></div>
        ${data.whatsapp ? `<div class="row"><div class="label">WhatsApp:</div><div class="val">${data.whatsapp}</div></div>` : ""}
        <div class="row"><div class="label">Preferred Contact:</div><div class="val"><strong>${data.preferredContact.toUpperCase()}</strong></div></div>
        ${data.bestTime ? `<div class="row"><div class="label">Best Time:</div><div class="val">${data.bestTime}</div></div>` : ""}
        ${data.source ? `<div class="row"><div class="label">Referrer Source:</div><div class="val">${data.source}</div></div>` : ""}

        ${
          waChatLink
            ? `
          <div style="margin-top: 16px;">
            <a href="${waChatLink}" target="_blank" class="cta-btn">
              💬 Start WhatsApp Chat with ${data.fullName.split(" ")[0]}
            </a>
          </div>
        `
            : ""
        }
      </div>
    </div>
    <div class="footer">
      GTSS Graduate Portfolios Studio · Hit reply to respond directly to ${data.email}
    </div>
  </div>
</body>
</html>
`;

  return sendEmail({
    to: EMAIL_CONFIG.adminEmail,
    subject: `[New Request] GTSS-${referenceId} · ${data.fullName} (${data.degree})`,
    html,
    replyTo: data.email,
  });
}

/**
 * Send an automated confirmation / receipt email to the applicant.
 */
export async function sendApplicantConfirmation(
  data: PortfolioRequestEmailData,
  referenceId: string
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const firstName = data.fullName.split(" ")[0] || data.fullName;
  const waContactLink = `https://wa.me/${EMAIL_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi GTSS, I submitted my graduate portfolio request (GTSS-${referenceId}) for ${data.degree}.`
  )}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0e14; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #111622; border: 1px solid #232c3d; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: #07090c; padding: 32px 32px 24px; border-bottom: 2px solid #d4af37; text-align: center; }
    .brand { font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #d4af37; margin-bottom: 6px; }
    .header h1 { margin: 0; font-size: 24px; color: #ffffff; letter-spacing: -0.02em; font-weight: 700; }
    .ref-badge { display: inline-block; background: #1c2436; border: 1px solid #2e3b52; color: #cbd5e1; font-family: monospace; font-size: 12px; padding: 4px 12px; border-radius: 20px; margin-top: 12px; }
    .content { padding: 32px; line-height: 1.6; font-size: 15px; color: #cbd5e1; }
    .highlight-box { background: #171f2f; border-left: 3px solid #d4af37; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0; }
    .highlight-box p { margin: 0; font-size: 14px; color: #e2e8f0; }
    .steps-list { margin: 20px 0; padding-left: 20px; }
    .steps-list li { margin-bottom: 10px; font-size: 14px; color: #94a3b8; }
    .steps-list li strong { color: #f1f5f9; }
    .btn-row { margin: 28px 0 12px; text-align: center; }
    .btn-wa { display: inline-block; background: #25d366; color: #05140b; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; }
    .footer { background: #0a0d13; padding: 24px 32px; font-size: 12px; color: #64748b; border-top: 1px solid #1a2230; text-align: center; }
    .footer a { color: #94a3b8; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">GTSS Studio</div>
      <h1>We Received Your Request</h1>
      <div class="ref-badge">Reference: GTSS-${referenceId}</div>
    </div>
    <div class="content">
      <p>Hello ${firstName},</p>
      <p>
        Thank you for submitting your portfolio brief for <strong>${data.degree}</strong>.
        Your request has been logged and assigned reference <strong>GTSS-${referenceId}</strong>.
      </p>

      <div class="highlight-box">
        <p>
          <strong>What happens next?</strong><br>
          A GTSS portfolio director will review your course, selected evidence types, and career goals to structure the right professional direction for your portfolio.
        </p>
      </div>

      <p>Here is what the process looks like:</p>
      <ol class="steps-list">
        <li><strong>Evidence & Story Architecture:</strong> We review the academic and practical evidence you provided.</li>
        <li><strong>Discipline Framing:</strong> We align the visual and structural language with standards employers expect in your field.</li>
        <li><strong>Reach-out & Discussion:</strong> We will contact you via <strong>${data.preferredContact.toUpperCase()}</strong>${data.whatsapp ? ` (${data.whatsapp})` : ` (${data.email})`}${data.bestTime ? ` around ${data.bestTime}` : ""} to confirm details and provide next steps.</li>
      </ol>

      <p>Prefer to speak to us directly right now?</p>
      <div class="btn-row">
        <a href="${waContactLink}" target="_blank" class="btn-wa">
          💬 Continue on WhatsApp (+254 792 156 094)
        </a>
      </div>
      <p style="text-align: center; font-size: 12px; color: #64748b; margin-top: 8px;">
        Or simply reply directly to this email at <a href="mailto:${EMAIL_CONFIG.emailFrom}" style="color: #94a3b8;">support@gtss.software</a>.
      </p>
    </div>
    <div class="footer">
      GTSS Graduate Portfolios · Beyond the Degree<br>
      Independent portfolio initiative for graduating professionals.
    </div>
  </div>
</body>
</html>
`;

  return sendEmail({
    to: data.email,
    subject: `GTSS Graduate Portfolio Request Received (Ref: GTSS-${referenceId})`,
    html,
    replyTo: EMAIL_CONFIG.emailFrom,
  });
}

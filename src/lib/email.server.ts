import { formatVikasMitraId } from "@/lib/profile-id";

const resendApiKey = process.env["RESEND_API_KEY"];
const emailFrom = process.env["EMAIL_FROM"] ?? "Bharat Pehchan <onboarding@resend.dev>";

export type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export type SendEmailResult = {
  ok: boolean;
  skipped?: boolean;
  error?: string;
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailInput): Promise<SendEmailResult> {
  if (!to) {
    return { ok: false, skipped: true, error: "No recipient email" };
  }

  if (!resendApiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping email to", to);
    return { ok: false, skipped: true, error: "RESEND_API_KEY not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: emailFrom, to, subject, text, ...(html ? { html } : {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await response.text();
      console.error("[email] send failed", response.status, message);
      return { ok: false, error: `${response.status} ${message}` };
    }

    return { ok: true };
  } catch (error) {
    console.error("[email] send error", error);
    return { ok: false, error: error instanceof Error ? error.message : "send failed" };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ApprovalRow = {
  id: string;
  name: string;
  phone: string;
  email?: string | undefined;
  district: string;
  tehsil: string;
  village: string;
  occupation?: string | undefined;
  experience?: string | undefined;
  createdAt: string;
};

export function buildVikasMitraApprovalEmail(row: ApprovalRow): SendEmailInput {
  const uniqueId = formatVikasMitraId(row.id, row.createdAt);
  const subject = `बधाई हो! आप Vikas Mitra select हो गए — Unique ID ${uniqueId}`;

  const text = [
    `नमस्ते ${row.name},`,
    "",
    "बधाई हो! आपका Vikas Mitra आवेदन सफलतापूर्वक स्वीकृत (successfully select) हो गया है।",
    "",
    `आपकी Unique ID: ${uniqueId}`,
    "",
    "प्रोफ़ाइल विवरण:",
    `नाम: ${row.name}`,
    `मोबाइल: ${row.phone}`,
    `स्थान: ${row.village}, ${row.tehsil}, ${row.district}`,
    row.occupation ? `व्यवसाय: ${row.occupation}` : "",
    row.experience ? `अनुभव: ${row.experience}` : "",
    "",
    "आपकी प्रोफ़ाइल अब वेबसाइट पर लाइव है। कृपया अपनी Unique ID संभाल कर रखें।",
    "",
    "— भारत पहचान टीम",
  ]
    .filter(Boolean)
    .join("\n");

  const detailRows = [
    ["नाम", row.name],
    ["मोबाइल", row.phone],
    ["स्थान", `${row.village}, ${row.tehsil}, ${row.district}`],
    ...(row.occupation ? [["व्यवसाय", row.occupation]] : []),
    ...(row.experience ? [["अनुभव", row.experience]] : []),
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b5b53;font-weight:bold">${escapeHtml(
          String(label),
        )}</td><td style="padding:4px 0;color:#2d2622">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2d2622;line-height:1.6;max-width:560px">
    <p>नमस्ते <strong>${escapeHtml(row.name)}</strong>,</p>
    <p>बधाई हो! आपका <strong>Vikas Mitra</strong> आवेदन सफलतापूर्वक स्वीकृत (<strong>successfully select</strong>) हो गया है।</p>
    <div style="margin:18px 0;padding:14px 18px;background:#fff4e6;border:1px solid #f3c79a;border-radius:8px">
      <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#b25b12;font-weight:bold">आपकी Unique ID</div>
      <div style="font-size:22px;font-weight:bold;color:#6d070b;margin-top:4px">${escapeHtml(uniqueId)}</div>
    </div>
    <table style="border-collapse:collapse;font-size:14px">${detailRows}</table>
    <p style="margin-top:18px">आपकी प्रोफ़ाइल अब वेबसाइट पर लाइव है। कृपया अपनी Unique ID संभाल कर रखें।</p>
    <p style="margin-top:18px;color:#6b5b53">— भारत पहचान टीम</p>
  </div>`;

  return { to: row.email ?? "", subject, text, html };
}

import { formatVikasMitraId } from "@/lib/profile-id";
import nodemailer from "nodemailer";

const resendApiKey = process.env["RESEND_API_KEY"];
const emailFrom = process.env["EMAIL_FROM"] ?? "Bharat Pehchan <bharatpahchan.helpline@gmail.com>";
const smtpHost = process.env["SMTP_HOST"];
const smtpPort = Number(process.env["SMTP_PORT"] ?? "587");
const smtpUser = process.env["SMTP_USER"];
const smtpPass = process.env["SMTP_PASS"];
const smtpSecureValue = process.env["SMTP_SECURE"]?.toLowerCase();
const smtpSecure =
  // Port 465 requires TLS from the start, even if an old env file says false.
  smtpPort === 465 ||
  (smtpPort !== 587 &&
    (smtpSecureValue === "true" || smtpSecureValue === "1" || smtpSecureValue === "yes"));

export type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: { filename: string; content: Buffer; contentType: string }[];
};

export type SendEmailResult = {
  ok: boolean;
  skipped?: boolean;
  error?: string;
};

type VikasMitraMailRow = {
  id: string;
  name: string;
  phone: string;
  email?: string | undefined;
  district: string;
  tehsil: string;
  village: string;
  occupation?: string | undefined;
  experience?: string | undefined;
  rejectionMessage?: string | undefined;
  photo?: string | undefined;
  createdAt: string;
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
  attachments,
}: SendEmailInput): Promise<SendEmailResult> {
  if (!to) {
    return { ok: false, skipped: true, error: "No recipient email" };
  }

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number.isFinite(smtpPort) ? smtpPort : 587,
        secure: smtpSecure,
        connectionTimeout: 15_000,
        greetingTimeout: 15_000,
        socketTimeout: 30_000,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: emailFrom,
        to,
        subject,
        text,
        ...(html ? { html } : {}),
        ...(attachments ? { attachments } : {}),
      });

      return { ok: true };
    } catch (error) {
      console.error("[email] SMTP send error", error);
      return { ok: false, error: error instanceof Error ? error.message : "SMTP send failed" };
    }
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
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        from: emailFrom,
        to,
        subject,
        text,
        ...(html ? { html } : {}),
        ...(attachments
          ? {
              attachments: attachments.map((file) => ({
                filename: file.filename,
                content: file.content.toString("base64"),
              })),
            }
          : {}),
      }),
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

export function buildVikasMitraSubmitEmail(row: VikasMitraMailRow): SendEmailInput {
  const uniqueId = formatVikasMitraId(row.id, row.createdAt);
  const subject = `Welcome to Bharat Pehchan - Vikas Mitra application ${uniqueId}`;
  const text = [
    `Namaste ${row.name},`,
    "",
    "Welcome to Bharat Pehchan.",
    "Aapka Vikas Mitra join form submit ho gaya hai.",
    "Admin review ke baad approval ya rejection ka update isi email par bheja jayega.",
    "",
    `Application ID: ${uniqueId}`,
    `Name: ${row.name}`,
    `Mobile: ${row.phone}`,
    `Location: ${row.village}, ${row.tehsil}, ${row.district}`,
    "",
    "Bharat Pehchan Team",
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#262b39;line-height:1.6;max-width:560px">
    <p>Namaste <strong>${escapeHtml(row.name)}</strong>,</p>
    <p><strong>Welcome to Bharat Pehchan.</strong></p>
    <p>Aapka <strong>Vikas Mitra join form</strong> submit ho gaya hai. Admin review ke baad approval ya rejection ka update isi email par bheja jayega.</p>
    <div style="margin:18px 0;padding:14px 18px;background:#eaf1fb;border:1px solid #bcd2ec;border-radius:8px">
      <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#1b4c8a;font-weight:bold">Application ID</div>
      <div style="font-size:22px;font-weight:bold;color:#123a72;margin-top:4px">${escapeHtml(uniqueId)}</div>
    </div>
    <p><strong>Mobile:</strong> ${escapeHtml(row.phone)}<br/><strong>Location:</strong> ${escapeHtml(`${row.village}, ${row.tehsil}, ${row.district}`)}</p>
    <p style="margin-top:18px;color:#5b6376">Bharat Pehchan Team</p>
  </div>`;

  return { to: row.email ?? "", subject, text, html };
}

export const buildVikasMitraRegistrationEmail = buildVikasMitraSubmitEmail;

export async function buildVikasMitraApprovalEmail(
  row: VikasMitraMailRow,
): Promise<SendEmailInput> {
  const uniqueId = formatVikasMitraId(row.id, row.createdAt);
  const cardUrl = getPublicUrl(`/vikas-mitra/id-card/${row.id}`);
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
    cardUrl ? `ID Card PDF: ${cardUrl}` : "",
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
        `<tr><td style="padding:4px 12px 4px 0;color:#5b6376;font-weight:bold">${escapeHtml(
          String(label),
        )}</td><td style="padding:4px 0;color:#262b39">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#262b39;line-height:1.6;max-width:560px">
    <p>नमस्ते <strong>${escapeHtml(row.name)}</strong>,</p>
    <p>बधाई हो! आपका <strong>Vikas Mitra</strong> आवेदन सफलतापूर्वक स्वीकृत (<strong>successfully select</strong>) हो गया है।</p>
    <div style="margin:18px 0;padding:14px 18px;background:#eaf1fb;border:1px solid #bcd2ec;border-radius:8px">
      <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#1b4c8a;font-weight:bold">आपकी Unique ID</div>
      <div style="font-size:22px;font-weight:bold;color:#123a72;margin-top:4px">${escapeHtml(uniqueId)}</div>
    </div>
    <table style="border-collapse:collapse;font-size:14px">${detailRows}</table>
    ${
      cardUrl
        ? `<p style="margin-top:18px"><a href="${escapeHtml(cardUrl)}" style="display:inline-block;background:#123a72;color:#fff;text-decoration:none;font-weight:bold;padding:10px 14px;border-radius:8px">ID Card PDF खोलें</a></p>`
        : ""
    }
    <p style="margin-top:18px">आपकी प्रोफ़ाइल अब वेबसाइट पर लाइव है। कृपया अपनी Unique ID संभाल कर रखें।</p>
    <p style="margin-top:18px;color:#5b6376">— भारत पहचान टीम</p>
  </div>`;

  return {
    to: row.email ?? "",
    subject,
    text,
    html,
  };
}

export function buildVikasMitraRejectionEmail(row: VikasMitraMailRow): SendEmailInput {
  const uniqueId = formatVikasMitraId(row.id, row.createdAt);
  const reason = row.rejectionMessage || "Your Vikas Mitra profile has been rejected.";
  const subject = `Vikas Mitra application rejected - ${uniqueId}`;
  const text = [
    `Namaste ${row.name},`,
    "",
    "Aapka Vikas Mitra application approve nahi ho paya.",
    "",
    `Application ID: ${uniqueId}`,
    `Reason: ${reason}`,
    "",
    "Agar aapko lagta hai details update karni hain, Bharat Pehchan team se contact karein.",
    "",
    "Bharat Pehchan Team",
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#262b39;line-height:1.6;max-width:560px">
    <p>Namaste <strong>${escapeHtml(row.name)}</strong>,</p>
    <p>Aapka <strong>Vikas Mitra application</strong> approve nahi ho paya.</p>
    <div style="margin:18px 0;padding:14px 18px;background:#fff1f2;border:1px solid #fecdd3;border-radius:8px">
      <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#be123c;font-weight:bold">Application ID</div>
      <div style="font-size:20px;font-weight:bold;color:#881337;margin-top:4px">${escapeHtml(uniqueId)}</div>
      <div style="margin-top:10px;color:#7f1d1d"><strong>Reason:</strong> ${escapeHtml(reason)}</div>
    </div>
    <p>Agar aapko lagta hai details update karni hain, Bharat Pehchan team se contact karein.</p>
    <p style="margin-top:18px;color:#5b6376">Bharat Pehchan Team</p>
  </div>`;

  return { to: row.email ?? "", subject, text, html };
}

export function buildDemoReadyEmail(input: {
  email: string;
  name: string;
  village: string;
  district: string;
  demoUrl: string;
}): SendEmailInput {
  const safeUrl = escapeHtml(input.demoUrl);
  return {
    to: input.email,
    subject: `${input.name}, आपकी Bharat Pahchan demo website तैयार है`,
    text: `नमस्ते ${input.name},\n\nआपकी personalised demo website तैयार है।\n\nDemo website: ${input.demoUrl}\n\nक्षेत्र: ${input.village}, ${input.district}\n\n— भारत पहचान टीम`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;color:#263247;line-height:1.65">
      <p>नमस्ते <strong>${escapeHtml(input.name)}</strong>,</p>
      <h2 style="color:#123a72">आपकी personalised demo website तैयार है</h2>
      <p>आपके नाम और क्षेत्र के अनुसार demo website तुरंत तैयार कर दी गई है।</p>
      <p><strong>क्षेत्र:</strong> ${escapeHtml(`${input.village}, ${input.district}`)}</p>
      <p style="margin:24px 0"><a href="${safeUrl}" style="display:inline-block;padding:13px 22px;border-radius:8px;background:#159a56;color:white;text-decoration:none;font-weight:bold">अपनी Demo Website देखें</a></p>
      <p style="font-size:13px;color:#657086;word-break:break-all">${safeUrl}</p>
      <p>— भारत पहचान टीम</p>
    </div>`,
  };
}

function getPublicUrl(path: string) {
  const base =
    process.env["NEXT_PUBLIC_SITE_URL"] ||
    process.env["SITE_URL"] ||
    process.env["VERCEL_PROJECT_PRODUCTION_URL"] ||
    process.env["VERCEL_URL"];

  if (!base) {
    return "";
  }

  const normalizedBase = base.startsWith("http") ? base : `https://${base}`;
  return `${normalizedBase.replace(/\/$/, "")}${path}`;
}

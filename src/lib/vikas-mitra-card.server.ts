import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import PDFDocument from "pdfkit";
import { formatVikasMitraId } from "@/lib/profile-id";

type CardProfile = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  district: string;
  tehsil: string;
  photo?: string | undefined;
};
const C = { navy: "#123a72", orange: "#ff720e", green: "#159a56" };
const asset = (name: string) => path.join(process.cwd(), "src/assets", name);

async function photoBuffer(source: string) {
  const url = new URL(source);
  const cloud = process.env["CLOUDINARY_CLOUD_NAME"]?.trim();
  if (
    url.protocol !== "https:" ||
    url.hostname !== "res.cloudinary.com" ||
    !cloud ||
    !url.pathname.startsWith(`/${cloud}/image/upload/`)
  )
    throw new Error("Invalid photo URL");
  return new Promise<Buffer>((resolve, reject) => {
    const req = https.get(url, { family: 4 }, (res) => {
      if (res.statusCode !== 200) return reject(new Error("Photo download failed"));
      const chunks: Buffer[] = [];
      let size = 0;
      res.on("data", (chunk: Buffer) => {
        size += chunk.length;
        if (size > 10_000_000) req.destroy(new Error("Photo is too large"));
        else chunks.push(chunk);
      });
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.setTimeout(15_000, () => req.destroy(new Error("Photo timeout")));
    req.on("error", reject);
  });
}

function frame(doc: PDFKit.PDFDocument, x: number, y: number, w: number, h: number) {
  doc.roundedRect(x, y, w, h, 14).fillAndStroke("white", "#dbe3ef");
  for (const { cx, cy } of [
    { cx: x + 3, cy: y + 3 },
    { cx: x + w - 3, cy: y + h - 3 },
  ]) {
    doc.lineWidth(12).strokeColor(C.orange).circle(cx, cy, 55).stroke();
    doc.lineWidth(8).strokeColor(C.green).circle(cx, cy, 44).stroke();
  }
  doc
    .rect(x, y + h - 42, w, 42)
    .fill(C.navy)
    .fillColor("white")
    .fontSize(15)
    .text("www.bharatpahchan.com", x, y + h - 29, { width: w, align: "center" });
}
function logo(doc: PDFKit.PDFDocument, x: number, y: number, w: number) {
  doc.image(asset("bharat-pahchan-logo.jpg"), x + w / 2 - 38, y + 18, { fit: [76, 76] });
}
function row(doc: PDFKit.PDFDocument, x: number, y: number, label: string, value: string) {
  doc
    .fillColor(C.navy)
    .fontSize(11)
    .text(label, x, y, { width: 70 })
    .text(":", x + 70, y)
    .text(value, x + 82, y, { width: 205 });
  doc
    .moveTo(x + 82, y + 14)
    .lineTo(x + 285, y + 14)
    .lineWidth(0.5)
    .strokeColor(C.navy)
    .stroke();
}

export async function generateVikasMitraCardPdf(p: CardProfile): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 0, compress: true });
  const chunks: Buffer[] = [];
  doc.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
  doc.registerFont("Hindi", asset("fonts/DroidSansDevanagari-Regular.ttf")).font("Hindi");
  const y = 31,
    w = 380,
    h = 532,
    fx = 31,
    bx = 431;
  frame(doc, fx, y, w, h);
  frame(doc, bx, y, w, h);
  logo(doc, fx, y, w);
  logo(doc, bx, y, w);
  doc
    .fillColor(C.navy)
    .fontSize(27)
    .text("विकास मित्र", fx, y + 102, { width: w, align: "center" });
  doc.fontSize(12).text("V I K A S   M I T R A", fx, y + 136, { width: w, align: "center" });
  let photo: Buffer | undefined;
  if (p.photo)
    try {
      photo = await photoBuffer(p.photo);
    } catch (e) {
      console.error("[id-card] photo", e);
    }
  if (photo) {
    doc
      .save()
      .roundedRect(fx + 130, y + 158, 120, 130, 8)
      .clip()
      .image(photo, fx + 130, y + 158, { fit: [120, 130], align: "center", valign: "center" })
      .restore();
  } else
    doc
      .roundedRect(fx + 130, y + 158, 120, 130, 8)
      .fillAndStroke("#f5f7fa", "#cbd5e1")
      .fillColor("#94a3b8")
      .fontSize(14)
      .text("PHOTO", fx + 130, y + 216, { width: 120, align: "center" });
  doc
    .fillColor(C.navy)
    .fontSize(23)
    .text(p.name, fx + 20, y + 298, { width: w - 40, align: "center" })
    .fontSize(13)
    .text("विकास मित्र", fx, y + 328, { width: w, align: "center" });
  const id = formatVikasMitraId(p.id, p.createdAt);
  row(doc, fx + 42, y + 362, "Mitra ID", id);
  row(doc, fx + 42, y + 389, "जिला", p.district);
  row(doc, fx + 42, y + 416, "ब्लॉक", p.tehsil);
  row(doc, fx + 42, y + 443, "मोबाइल", p.phone);
  doc.fontSize(23).text("विकास मित्र पहचान पत्र", bx, y + 115, { width: w, align: "center" });
  doc
    .fontSize(13)
    .text(
      "यह कार्ड भारत पहचान के विकास मित्र की पहचान हेतु है। खो जाने पर नीचे दिए गए नंबर पर संपर्क करें। यह सरकारी पहचान पत्र नहीं है।",
      bx + 45,
      y + 178,
      { width: w - 90, align: "center", lineGap: 5 },
    );
  const issue = new Date(p.createdAt),
    valid = new Date(issue);
  valid.setFullYear(valid.getFullYear() + 1);
  const date = (d: Date) => new Intl.DateTimeFormat("en-GB").format(d);
  doc.roundedRect(bx + 35, y + 265, w - 70, 78, 8).fillAndStroke("#f8fafc", "#dbe3ef");
  row(doc, bx + 60, y + 283, "जारी तिथि", date(issue));
  row(doc, bx + 60, y + 313, "वैधता", date(valid));
  doc
    .fillColor(C.navy)
    .fontSize(18)
    .text("संपर्क", bx, y + 368, { width: w, align: "center" })
    .fontSize(12)
    .text("☎  +91 7891-131-132", bx + 65, y + 405)
    .text("✉  bharatpahchan.helpline@gmail.com", bx + 65, y + 430)
    .text("●  जयपुर, राजस्थान", bx + 65, y + 455);
  doc.end();
  return done;
}

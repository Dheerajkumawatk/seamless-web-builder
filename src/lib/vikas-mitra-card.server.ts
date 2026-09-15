import https from "node:https";
import path from "node:path";
import sharp, { type OverlayOptions } from "sharp";
import QRCode from "qrcode";
import { formatVikasMitraId } from "@/lib/profile-id";

type CardProfile = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  district: string;
  photo?: string | undefined;
};

const templatePath = path.join(process.cwd(), "src/assets/vikas-mitra-id-card.png");
const fontfile = path.join(process.cwd(), "src/assets/fonts/NotoSansDevanagari-Regular.ttf");
const xml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]!,
  );

async function downloadPhoto(source: string): Promise<Buffer> {
  const url = new URL(source);
  const cloud = process.env["CLOUDINARY_CLOUD_NAME"]?.trim();
  if (
    url.protocol !== "https:" ||
    url.hostname !== "res.cloudinary.com" ||
    !cloud ||
    !url.pathname.startsWith(`/${cloud}/image/upload/`)
  ) {
    throw new Error("Invalid profile photo URL");
  }
  return new Promise((resolve, reject) => {
    const request = https.get(url, { family: 4 }, (response) => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error("Profile photo download failed"));
        return;
      }
      let size = 0;
      const chunks: Buffer[] = [];
      response.on("data", (chunk: Buffer) => {
        size += chunk.length;
        if (size > 10_000_000) request.destroy(new Error("Profile photo is too large"));
        else chunks.push(chunk);
      });
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
    const timer = setTimeout(() => request.destroy(new Error("Profile photo timeout")), 15_000);
    request.on("close", () => clearTimeout(timer));
    request.on("error", reject);
  });
}

export async function generateVikasMitraCard(row: CardProfile): Promise<Buffer> {
  const memberId = formatVikasMitraId(row.id, row.createdAt);
  const qr = await QRCode.toBuffer(memberId, { width: 124, margin: 2, errorCorrectionLevel: "H" });
  const approvedBadge =
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="154" height="45">
    <rect width="154" height="45" rx="8" fill="#082f61"/>
    <text x="77" y="30" text-anchor="middle" font-family="sans-serif" font-size="19" fill="white">APPROVED</text>
  </svg>`);
  const details = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="390" height="205">
    <style>@font-face{font-family:noto;src:url('${fontfile}')}text{font-family:noto,sans-serif;fill:#18385d}</style>
    <rect width="390" height="205" fill="#f4f5f7" fill-opacity=".96"/>
    <text x="8" y="31" font-size="18">Name</text><text x="115" y="31" font-size="23" font-weight="700">${xml(row.name)}</text>
    <text x="8" y="70" font-size="18">Role</text><text x="115" y="70" font-size="21">Vikas Mitra</text>
    <text x="8" y="109" font-size="18">District</text><text x="115" y="109" font-size="21">${xml(row.district)}</text>
    <text x="8" y="148" font-size="18">Member ID</text><text x="115" y="148" font-size="19">${xml(memberId)}</text>
    <text x="8" y="187" font-size="18">Mobile</text><text x="115" y="187" font-size="21">${xml(row.phone)}</text>
  </svg>`);
  const layers: OverlayOptions[] = [
    { input: await sharp(qr).resize(118, 118).png().toBuffer(), left: 781, top: 378 },
    {
      input: await sharp(approvedBadge)
        .rotate(7.5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
      left: 737,
      top: 500,
    },
    {
      input: await sharp(details)
        .rotate(7.5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
      left: 485,
      top: 529,
    },
  ];
  if (row.photo) {
    const photo = await sharp(await downloadPhoto(row.photo), { limitInputPixels: 25_000_000 })
      .rotate()
      .resize(174, 190, { fit: "cover", position: "attention" })
      .rotate(7.5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    layers.push({ input: photo, left: 548, top: 345 });
  }
  return sharp(templatePath).composite(layers).png().toBuffer();
}

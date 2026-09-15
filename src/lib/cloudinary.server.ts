import crypto from "node:crypto";
import https from "node:https";

type CloudinaryUploadResponse = {
  secure_url?: string;
  error?: { message?: string };
};

function clean(value: string | undefined) {
  return value?.trim() || undefined;
}

function signCloudinaryParams(params: Record<string, string>, apiSecret: string) {
  const payload = Object.entries(params)
    .filter(([, value]) => value)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return crypto.createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

export async function uploadImageToCloudinary(file: File, folder: string): Promise<string> {
  if (!file.size) return "";

  const cloudName = clean(process.env["CLOUDINARY_CLOUD_NAME"]);
  const uploadPreset = clean(process.env["CLOUDINARY_UPLOAD_PRESET"]);
  const apiKey = clean(process.env["CLOUDINARY_API_KEY"]);
  const apiSecret = clean(process.env["CLOUDINARY_API_SECRET"]);

  if (!cloudName) {
    throw new Error("Cloudinary missing: CLOUDINARY_CLOUD_NAME .env.local mein set karein.");
  }

  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);

  if (apiKey && apiSecret) {
    const timestamp = Math.round(Date.now() / 1000).toString();
    const params = { folder, timestamp };
    form.append("api_key", apiKey);
    form.append("timestamp", timestamp);
    form.append("signature", signCloudinaryParams(params, apiSecret));
  } else if (uploadPreset) {
    form.append("upload_preset", uploadPreset);
  } else {
    throw new Error(
      "Cloudinary missing: CLOUDINARY_UPLOAD_PRESET ya CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET set karein.",
    );
  }

  const uploadRequest = new Request(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`,
    {
      method: "POST",
      body: form,
    },
  );
  const body = Buffer.from(await uploadRequest.arrayBuffer());
  const response = await new Promise<{ status: number; body: string }>((resolve, reject) => {
    // Use IPv4 explicitly: some networks resolve IPv6 but cannot reach Cloudinary over it.
    const request = https.request(
      uploadRequest.url,
      {
        method: "POST",
        family: 4,
        headers: {
          "Content-Type": uploadRequest.headers.get("content-type")!,
          "Content-Length": body.length,
        },
      },
      (response) => {
        const chunks: Buffer[] = [];
        response.on("data", (chunk: Buffer) => chunks.push(chunk));
        response.on("error", reject);
        response.on("end", () =>
          resolve({
            status: response.statusCode ?? 502,
            body: Buffer.concat(chunks).toString("utf8"),
          }),
        );
      },
    );
    const timer = setTimeout(() => request.destroy(new Error("Upload timeout")), 60_000);
    request.on("close", () => clearTimeout(timer));
    request.on("error", reject);
    request.end(body);
  }).catch(() => {
    throw new Error(
      "Photo/document upload server se connection nahi ho paya. Internet connection check karke dobara submit karein.",
    );
  });
  let result: CloudinaryUploadResponse = {};
  try {
    result = JSON.parse(response.body) as CloudinaryUploadResponse;
  } catch {
    throw new Error("Photo/document upload server ne invalid response diya. Dobara try karein.");
  }

  if (response.status < 200 || response.status >= 300 || !result.secure_url) {
    throw new Error(result.error?.message || "Cloudinary image upload failed.");
  }

  return result.secure_url;
}

import crypto from "node:crypto";

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

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  const result = (await response.json().catch(() => ({}))) as CloudinaryUploadResponse;

  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || "Cloudinary image upload failed.");
  }

  return result.secure_url;
}

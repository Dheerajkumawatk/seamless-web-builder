export function formatVikasMitraId(id: string, createdAt?: string) {
  if (id.toUpperCase().startsWith("BHR")) {
    return id.toUpperCase();
  }

  const year = createdAt ? new Date(createdAt).getFullYear() : new Date().getFullYear();
  const suffix = id
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 6)
    .toUpperCase();

  return `BHR${Number.isFinite(year) ? year : new Date().getFullYear()}-${suffix}`;
}

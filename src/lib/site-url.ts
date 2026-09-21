const DEFAULT_SITE_URL = "https://bharatpahchan.com";

/**
 * Returns the canonical site origin (no trailing slash).
 * Prefers explicit NEXT_PUBLIC_SITE_URL / SITE_URL so demo/deploy environments
 * can override the default production domain.
 */
export function getBaseUrl(): string {
  const configured =
    process.env["NEXT_PUBLIC_SITE_URL"] || process.env["SITE_URL"] || DEFAULT_SITE_URL;
  return (configured.startsWith("http") ? configured : `https://${configured}`).replace(/\/+$/, "");
}

/** Returns an absolute URL for a site path. */
export function absoluteUrl(path = "/"): string {
  const base = getBaseUrl();
  const pathWithSlash = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = pathWithSlash === "/" ? "/" : pathWithSlash.replace(/\/+$/, "");
  return `${base}${cleanPath}`;
}
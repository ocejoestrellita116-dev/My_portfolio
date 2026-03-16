function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function resolveSiteUrl() {
  const rawValue =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  return normalizeSiteUrl(rawValue);
}

export const siteOrigin = resolveSiteUrl();
export const siteUrl = new URL(siteOrigin);

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

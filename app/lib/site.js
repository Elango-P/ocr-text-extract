/** Canonical production site config for imgtotext.in */
export const SITE_URL = "https://imgtotext.in";
export const SITE_NAME = "OCR Text Extractor";
export const SITE_DOMAIN = "imgtotext.in";
export const CONTACT_EMAIL = "admin@elangodev.com";
export const OPERATOR_NAME = "Elango P";
export const OPERATOR_URL = "https://elangodev.com";

/**
 * Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX in .env.local / hosting env.
 * Optional: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION for Search Console / AdSense meta tag.
 */
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "";
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "";

export function adsTxtLine(clientId = ADSENSE_CLIENT_ID) {
  if (!clientId) return null;
  // Standard Google AdSense certified seller ID
  return `google.com, ${clientId}, DIRECT, f08c47fec0942fa0`;
}

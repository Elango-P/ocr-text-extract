/** Canonical production site config for imgtotext.in */
export const SITE_URL = "https://imgtotext.in";
export const SITE_NAME = "ImgToText";
export const SITE_DOMAIN = "imgtotext.in";
export const CONTACT_EMAIL = "admin@elangodev.com";
export const OPERATOR_NAME = "Elango P";
export const OPERATOR_URL = "https://elangodev.com";

/** Public social / trust profiles (used in footer + schema sameAs) */
export const SOCIAL_LINKS = [
  {
    name: "X (Twitter)",
    href: "https://x.com/BElango93",
    label: "Follow on X",
  },
  {
    name: "Website",
    href: OPERATOR_URL,
    label: "elangodev.com",
  },
];

/**
 * Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX in .env.local / hosting env.
 * Optional: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION for Search Console / AdSense meta tag.
 * Slot IDs from AdSense → Ads → By ad unit (numeric data-ad-slot values).
 */
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "";
export const ADSENSE_SLOT_DISPLAY =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY?.trim() || "";
export const ADSENSE_SLOT_ARTICLE =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE?.trim() || "";
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "";

export function adsTxtLine(clientId = ADSENSE_CLIENT_ID) {
  if (!clientId) return null;
  const publisherId = clientId.replace(/^ca-/, "");
  // Standard Google AdSense certified seller ID
  return `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;
}

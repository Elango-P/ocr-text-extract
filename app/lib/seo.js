import { SITE_URL } from "./site";

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "OCR Text Extractor — Free Image to Text Online",
};

/**
 * Build consistent metadata for static/marketing pages: canonical, OG, and Twitter.
 * Uses absolute titles so the layout template suffix is not appended.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
}) {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: ogType,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [typeof ogImage === "string" ? ogImage : ogImage.url],
    },
  };
}

/** Last meaningful content update per route (ISO date). Used by sitemap.xml. */
export const ROUTE_LAST_MODIFIED = {
  "": "2026-08-30",
  "/about": "2026-08-11",
  "/author/elango-p": "2026-08-11",
  "/contact": "2026-08-11",
  "/faq": "2026-08-11",
  "/how-it-works": "2026-08-30",
  "/blog": "2026-08-11",
  "/privacy-policy": "2026-08-11",
  "/terms": "2026-07-14",
  "/cookie-policy": "2026-08-05",
  "/disclaimer": "2026-07-14",
  "/data-retention": "2026-08-11",
  "/image-to-text": "2026-08-30",
  "/screenshot-to-text": "2026-08-30",
  "/receipt-to-text": "2026-08-11",
  "/scanned-document-to-text": "2026-08-30",
  "/pdf-to-text": "2026-08-11",
  "/handwriting-to-text": "2026-08-30",
  "/image-to-word": "2026-08-11",
  "/image-to-pdf": "2026-08-11",
};

export function lastModifiedForRoute(route) {
  const iso = ROUTE_LAST_MODIFIED[route];
  return iso ? new Date(`${iso}T12:00:00`) : new Date("2026-08-11T12:00:00");
}

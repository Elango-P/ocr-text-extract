import { SITE_URL, SITE_NAME, OPERATOR_NAME, OPERATOR_URL, CONTACT_EMAIL, SOCIAL_LINKS } from "./site";

/** Site-wide JSON-LD for SEO / trust scanners */
export function buildSiteJsonLd() {
  const sameAs = SOCIAL_LINKS.map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Free online OCR tool to extract text from images instantly. AI OCR with browser fallback — no signup.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: OPERATOR_NAME,
        url: OPERATOR_URL,
        email: CONTACT_EMAIL,
        sameAs,
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        description:
          "Free online OCR tool to extract text from images instantly. AI OCR with browser fallback — no signup.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };
}

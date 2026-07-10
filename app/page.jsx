import OCRToolContent from "./components/OCRToolContent";
import HomeSections from "./components/marketing/HomeSections";
import Script from "next/script";
import { SITE_URL, SITE_NAME } from "./lib/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free online OCR tool to extract text from images instantly. Multi-language support, smart preprocessing, and 100% browser-side privacy — no uploads, no signup.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OCRToolContent />
      <HomeSections />
    </>
  );
}

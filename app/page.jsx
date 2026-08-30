import OCRToolHero from "./components/OCRToolHero";
import ToolOcrEmbed from "./components/tools/ToolOcrEmbed";
import AdUnit from "./components/AdUnit";
import HomeSections from "./components/marketing/HomeSections";
import { buildHomePageJsonLd } from "./lib/jsonLd";
import { SITE_URL, ADSENSE_SLOT_DISPLAY } from "./lib/site";

export const metadata = {
  title: {
    absolute: "Image to Text – Extract Text from Images Online",
  },
  description:
    "Convert images to editable text online with our free Image to Text OCR tool. Upload JPG, PNG or screenshots and extract text instantly — AI OCR with browser fallback.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Image to Text – Extract Text from Images Online",
    description:
      "Convert images to editable text online. Free OCR for JPG, PNG, screenshots, and scans — no signup required.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Text – Extract Text from Images Online",
    description:
      "Convert images to editable text online. Free OCR for JPG, PNG, screenshots, and scans — no signup required.",
  },
};

export default function HomePage() {
  const jsonLd = buildHomePageJsonLd();

  return (
    <>
      <script
        id="homepage-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OCRToolHero />
      <ToolOcrEmbed />
      <AdUnit
        slot={ADSENSE_SLOT_DISPLAY}
        className="mx-auto max-w-6xl px-4 py-6 sm:px-6"
      />
      <HomeSections />
    </>
  );
}

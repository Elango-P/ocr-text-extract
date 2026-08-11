import OCRToolHero from "./components/OCRToolHero";
import ToolOcrEmbed from "./components/tools/ToolOcrEmbed";
import AdUnit from "./components/AdUnit";
import HomeSections from "./components/marketing/HomeSections";
import { buildHomePageJsonLd } from "./lib/jsonLd";
import { SITE_URL, ADSENSE_SLOT_DISPLAY } from "./lib/site";

export const metadata = {
  title: {
    absolute: "Free Image to Text Converter — Online OCR Tool",
  },
  description:
    "Extract text from images, screenshots, JPG, PNG, and scanned page photos with free online OCR. AI extraction, browser fallback, 12+ languages, no signup.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Free Online OCR Image to Text Converter",
    description:
      "Convert screenshots and photos into editable text — free OCR with AI and browser fallback.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online OCR Image to Text Converter",
    description:
      "Convert screenshots and photos into editable text — free OCR with AI and browser fallback.",
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

import OCRToolHero from "./components/OCRToolHero";
import ToolOcrEmbed from "./components/tools/ToolOcrEmbed";
import AdUnit from "./components/AdUnit";
import HomeSections from "./components/marketing/HomeSections";
import { buildHomePageJsonLd } from "./lib/jsonLd";
import { SITE_URL, ADSENSE_SLOT_DISPLAY } from "./lib/site";

export const metadata = {
  title: {
    absolute: "Free Image to Text Converter – Picture to Text OCR",
  },
  description:
    "Free image to text converter: turn any picture, photo or screenshot into editable text online. Upload JPG or PNG, run OCR in seconds — no signup, no watermark.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Free Image to Text Converter – Picture to Text OCR",
    description:
      "Convert images to editable text online. Free OCR for JPG, PNG, screenshots, and scans — no signup required.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to Text Converter – Picture to Text OCR",
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

import OCRToolHero from "./components/OCRToolHero";
import OCRToolLazy from "./components/OCRToolLazy";
import HomeSections from "./components/marketing/HomeSections";
import { buildHomePageJsonLd } from "./lib/jsonLd";

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
      <OCRToolLazy />
      <HomeSections />
    </>
  );
}

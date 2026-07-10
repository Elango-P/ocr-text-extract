import { SITE_URL } from "../lib/site";

export const metadata = {
  title: "About",
  description:
    "Learn about OCR Text Extractor — free image-to-text with AI OCR and a Tesseract.js browser fallback.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">About</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        About OCR Text Extractor
      </h1>
      <div className="prose prose-slate mt-8 max-w-none space-y-6 text-slate-600">
        <p className="text-lg leading-relaxed">
          OCR Text Extractor is a free online tool that helps you convert images into editable
          text. Whether you have a screenshot, a photo of a document, or a scanned receipt, you
          can extract the text in seconds using AI OCR, with a browser fallback if AI is
          unavailable.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Our mission</h2>
          <p className="mt-3 leading-relaxed">
            We built this tool to make optical character recognition (OCR) accessible to everyone.
            OCR Text Extractor tries cloud AI OCR for high-accuracy extraction first. If that
            request fails, it falls back to Tesseract.js running in your browser so the tool still
            works without relying only on the cloud.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">How the technology works</h2>
          <p className="mt-3 leading-relaxed">
            The primary path is cloud AI OCR (provider details in the Privacy Policy). As a fallback,
            the tool uses{" "}
            <a
              href="https://tesseract.projectnaptha.com/"
              className="font-semibold text-cyan-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tesseract.js
            </a>
            , a JavaScript port of the open-source Tesseract OCR engine. The browser fallback runs
            via WebAssembly in a background worker and includes preprocessing (upscaling, contrast,
            adaptive thresholding) to improve accuracy on screenshots and scans.
          </p>
          <p className="mt-3 leading-relaxed">
            Before the browser fallback runs recognition, images go through a preprocessing
            pipeline — including smart upscaling, contrast enhancement, and adaptive thresholding —
            to improve accuracy on real-world photos, screenshots, and scans with uneven lighting.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Privacy first</h2>
          <p className="mt-3 leading-relaxed">
            Your privacy matters. AI OCR sends the image to Google Gemini only for that extraction
            request; we do not permanently store your uploads. If AI OCR is unavailable, the
            browser fallback keeps that attempt on your device. Read our full{" "}
            <a href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Who built this?</h2>
          <p className="mt-3 leading-relaxed">
            OCR Text Extractor is built and maintained by{" "}
            <a
              href="https://elangodev.com"
              className="font-semibold text-cyan-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Elango P
            </a>
            , a developer focused on practical web tools. If you have
            feedback, bug reports, or feature suggestions, reach out at{" "}
            <a
              href="mailto:admin@elangodev.com"
              className="font-semibold text-cyan-700 hover:underline"
            >
              admin@elangodev.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Advertising</h2>
          <p className="mt-3 leading-relaxed">
            This site displays advertisements through Google AdSense to help cover hosting and
            development costs. Ads are served by Google and are subject to Google&apos;s advertising
            policies. We aim to keep ads unobtrusive so the OCR tool remains easy to use. Details
            are in our{" "}
            <a href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

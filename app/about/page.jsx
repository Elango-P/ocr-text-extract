import Link from "next/link";
import { SITE_URL, CONTACT_EMAIL, OPERATOR_NAME, OPERATOR_URL, SITE_NAME, SITE_DOMAIN } from "../lib/site";

export const metadata = {
  title: "About",
  description:
    "Learn about OCR Text Extractor — free image-to-text with AI OCR and a Tesseract.js browser fallback, built by Elango P.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">About</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        About OCR Text Extractor
      </h1>
      <div className="mt-8 space-y-6 text-slate-600">
        <p className="text-lg leading-relaxed">
          OCR Text Extractor is a free online tool that helps you convert images into editable
          text. Whether you have a screenshot, a photo of a document, or a scanned receipt, you
          can extract the text in seconds using AI OCR, with a browser fallback if AI is
          unavailable. The site runs at{" "}
          <strong className="text-slate-800">{SITE_DOMAIN}</strong> and is designed to be useful
          without forcing signups or installs.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Our mission</h2>
          <p className="mt-3 leading-relaxed">
            We built this tool to make optical character recognition (OCR) accessible to everyone.
            Students, freelancers, and small teams often need a quick way to digitize a page or
            copy text from a screenshot — without buying desktop software or uploading every file to
            a black-box service they cannot understand.
          </p>
          <p className="mt-3 leading-relaxed">
            OCR Text Extractor tries cloud AI OCR for high-accuracy extraction first. If that
            request fails or the daily AI quota is reached, it falls back to Tesseract.js running
            in your browser so the tool still works without relying only on the cloud.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">What you can do</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>Drag and drop images (PNG, JPG, WEBP, GIF) or pick files from your device</li>
            <li>Run batch OCR on multiple images in one session</li>
            <li>Choose from 12+ document languages before extraction</li>
            <li>Copy results, or download TXT, DOCX, or PDF</li>
            <li>Preview the image and use Clean Mode for screenshots and document layouts</li>
            <li>Use the tool on desktop or mobile browsers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">How the technology works</h2>
          <p className="mt-3 leading-relaxed">
            The primary path is cloud AI OCR (provider details in the{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>
            ). As a fallback, the tool uses{" "}
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
            browser fallback keeps that attempt on your device. Cookie and advertising details are
            explained on our{" "}
            <Link href="/cookie-policy" className="font-semibold text-cyan-700 hover:underline">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Who built this?</h2>
          <p className="mt-3 leading-relaxed">
            {SITE_NAME} is built and maintained by{" "}
            <Link href="/author/elango-p" className="font-semibold text-cyan-700 hover:underline">
              {OPERATOR_NAME}
            </Link>
            , an independent developer focused on practical web tools (
            <a
              href={OPERATOR_URL}
              className="font-semibold text-cyan-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {OPERATOR_URL.replace(/^https?:\/\//, "")}
            </a>
            ). The project is independently operated — there is no large corporation behind the
            scenes. Read the full{" "}
            <Link href="/author/elango-p" className="font-semibold text-cyan-700 hover:underline">
              author profile
            </Link>{" "}
            for mission and contact details, or email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-cyan-700 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <p className="mt-3 leading-relaxed">
            You can also read our{" "}
            <Link href="/blog" className="font-semibold text-cyan-700 hover:underline">
              Blog
            </Link>{" "}
            for OCR tutorials, accuracy tips, and guides for students and businesses, or the{" "}
            <Link href="/how-it-works" className="font-semibold text-cyan-700 hover:underline">
              How It Works
            </Link>{" "}
            page for a short product walkthrough.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Limitations</h2>
          <p className="mt-3 leading-relaxed">
            OCR Text Extractor is a free everyday utility, not an enterprise document platform.
            Honest limits today:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              Multi-page PDF containers are not uploaded directly — export or screenshot each page
              as an image first
            </li>
            <li>
              AI OCR is capped at 10 uses per day per IP address; browser OCR continues afterward
            </li>
            <li>
              Large images over ~8 MB should be compressed or cropped before upload
            </li>
            <li>
              Handwriting, dense tables, and low-light photos often need human proofreading
            </li>
            <li>
              Supported document languages are the twelve listed in the tool (English, Spanish,
              French, German, Italian, Portuguese, Russian, Chinese Simplified, Japanese, Korean,
              Arabic, Hindi) — other scripts are not a dedicated product feature
            </li>
            <li>
              Extracted text is a draft: always verify names, numbers, and anything used for money
              or identity
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            More detail lives on{" "}
            <Link href="/disclaimer" className="font-semibold text-cyan-700 hover:underline">
              Disclaimer
            </Link>
            ,{" "}
            <Link href="/how-it-works" className="font-semibold text-cyan-700 hover:underline">
              How It Works
            </Link>
            , and{" "}
            <Link href="/faq" className="font-semibold text-cyan-700 hover:underline">
              FAQ
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Advertising</h2>
          <p className="mt-3 leading-relaxed">
            This site may display third-party advertisements (for example, through Google AdSense)
            when advertising is enabled. Ads, when shown, are served by Google and are subject to
            Google&apos;s advertising policies. We aim to keep any ads unobtrusive so the OCR tool
            remains easy to use. Details are in our Privacy Policy and Cookie Policy. Accuracy
            limitations are summarized in our{" "}
            <Link href="/disclaimer" className="font-semibold text-cyan-700 hover:underline">
              Disclaimer
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

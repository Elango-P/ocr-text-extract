import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SITE_URL } from "../lib/site";

export const metadata = {
  title: "How It Works",
  description:
    "How OCR Text Extractor turns images into text: an AI model handles the first ten reads each day, then a Tesseract engine runs in your browser.",
  alternates: { canonical: `${SITE_URL}/how-it-works` },
};

const tips = [
  "Use well-lit photos with the text in focus",
  "Crop the image to only the text you need",
  "Select the correct document language before extracting",
  "Try Clean Mode for screenshots and full-page captures",
  "For faint scans, ensure the text contrasts with the background",
  "Proofread output — OCR is powerful but not perfect",
];

export default function HowItWorksPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">Guide</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        How OCR Text Extractor works
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        A step-by-step look at how we turn your images into editable text — using AI OCR
        first, with a browser fallback if needed.
      </p>

      <div className="mt-10 space-y-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Step 1: Upload an image</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Drag and drop an image onto the upload area, or click to choose a file from your
            device. Supported formats include PNG, JPG, WEBP, and GIF. The preview shows exactly
            what will be processed.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Step 2: Configure options</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Choose the language of the text in your image so AI OCR and the browser fallback can
            target the right script. Enable <strong>Clean Mode</strong> when working with app
            screenshots, web pages, or documents where layout matters — it helps reconstruct
            reading order and focus on dialog boxes in the browser fallback. Enable{" "}
            <strong>Local OCR only</strong> when you want to skip cloud AI and keep recognition in
            this browser tab (Tesseract.js).
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Step 3: OCR recognition (AI first)</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            By default, the tool sends your image through our server to Google Gemini for
            extraction. That path does <strong>not</strong> apply the browser preprocessing
            pipeline first—the image is recognized as uploaded. Details are in the{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Step 4: Browser fallback &amp; preprocessing
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            If AI OCR fails, returns no text, or you have reached the daily AI allowance, the tool
            falls back to Tesseract.js in a WebAssembly worker. On that fallback path only, the
            image runs through a preprocessing pipeline designed for real-world photos and
            screenshots:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
              <span>
                <strong className="text-slate-800">Smart upscaling</strong> — small images are
                enlarged so characters are easier to read
              </span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
              <span>
                <strong className="text-slate-800">Enhanced pass</strong> — grayscale, contrast
                stretch, and sharpening for clean screenshots
              </span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
              <span>
                <strong className="text-slate-800">Binary pass</strong> — adaptive thresholding
                for uneven lighting or faint text
              </span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
              <span>
                <strong className="text-slate-800">Modal detection</strong> — auto-crops centered
                dialogs in UI screenshots
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Step 5: Copy or download</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Review the extracted text in the output panel. Use the copy button to paste into
            Word, Google Docs, email, or code editors. Download as a plain .txt file for archiving
            or further editing.
          </p>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold">Tips for better accuracy</h2>
          <ul className="mt-4 space-y-2">
            {tips.map((tip) => (
              <li key={tip} className="flex gap-2 text-sm text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10">
        <Link
          href="/#ocr-tool"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-700"
        >
          Try the OCR tool
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

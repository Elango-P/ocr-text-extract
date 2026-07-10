import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SITE_URL } from "../lib/site";

export const metadata = {
  title: "How It Works",
  description:
    "Learn how OCR Text Extractor converts images to text — upload, preprocess, recognize, and export with browser-side privacy.",
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
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Guide</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        How OCR Text Extractor works
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        A step-by-step look at how we turn your images into editable text — entirely inside your
        browser.
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
            Choose the language of the text in your image. Tesseract loads the appropriate
            language model into your browser. Enable <strong>Clean Mode</strong> when working with
            app screenshots, web pages, or documents where layout matters — it helps reconstruct
            reading order and focus on dialog boxes.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Step 3: Image preprocessing</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Before recognition, the image passes through a preprocessing pipeline designed for
            real-world photos and screenshots:
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
          <h2 className="text-xl font-bold text-slate-900">Step 4: OCR recognition</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Tesseract.js runs in a WebAssembly worker thread so your browser tab stays responsive.
            The engine analyzes character shapes and returns text with a confidence score. Multiple
            preprocessing passes may be compared to pick the best result.
          </p>
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

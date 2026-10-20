import { Languages, ScanText, Shield } from "lucide-react";
import { MAX_BATCH_IMAGES } from "../lib/ocr/toolOptions";

export default function OCRToolHero() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 pt-10 text-center sm:px-6 sm:pt-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-800 sm:text-xs">
        ImgToText · imgtotext.in
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-[3.25rem] lg:leading-[1.1]">
        Image to Text Converter
      </h1>
      <p
        id="hero-lead"
        className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
      >
        Extract text from images online with ImgToText. Upload a photo or screenshot, convert it to
        editable text, and copy or download your results.
      </p>

      {/* Answer-Engine & Generative-Search Direct Answer block */}
      <div
        id="direct-answer"
        className="aeo-answer mx-auto mt-6 max-w-2xl rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 text-left text-sm text-slate-700 shadow-xs"
      >
        <div className="flex flex-wrap items-center gap-2 font-semibold text-cyan-950">
          <span className="inline-flex items-center rounded-md bg-cyan-700 px-2 py-0.5 text-xs font-bold text-white">
            Quick Answer
          </span>
          <span>How to extract text from an image online:</span>
        </div>
        <p className="mt-2 leading-relaxed text-slate-700">
          Upload or drag and drop your image (PNG, JPG, WEBP, or screenshot) into the tool below,
          select your document language, and click <strong>Extract Text</strong>. ImgToText runs
          in-browser WebAssembly OCR (Tesseract.js) with Google Gemini AI fallback to convert
          pixels into editable text with zero sign-up. Copy the text or export to TXT, Word (DOCX),
          or PDF.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-600">
          <span>✓ 100% Free &amp; No Sign-up</span>
          <span>✓ Private Browser OCR + Gemini AI</span>
          <span>✓ 12+ Languages (Tamil, Hindi, etc.)</span>
          <span>✓ Export TXT, DOCX &amp; PDF</span>
        </div>
      </div>

      <ul className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
        <li className="inline-flex items-center gap-1.5">
          <Shield className="h-4 w-4 text-teal-600" aria-hidden="true" />
          No signup · 100% free
        </li>
        <li className="hidden text-slate-300 sm:inline" aria-hidden="true">
          ·
        </li>
        <li className="inline-flex items-center gap-1.5">
          <Languages className="h-4 w-4 text-cyan-600" aria-hidden="true" />
          12+ languages
        </li>
        <li className="hidden text-slate-300 sm:inline" aria-hidden="true">
          ·
        </li>
        <li className="inline-flex items-center gap-1.5">
          <ScanText className="h-4 w-4 text-sky-600" aria-hidden="true" />
          Batch up to {MAX_BATCH_IMAGES}
        </li>
      </ul>
    </div>
  );
}

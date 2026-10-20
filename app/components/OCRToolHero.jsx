import { Languages, ScanText, Shield } from "lucide-react";
import { MAX_BATCH_IMAGES } from "../lib/ocr/toolOptions";

export default function OCRToolHero() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 pt-10 text-center sm:px-6 sm:pt-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-800 sm:text-xs">
        OCR Text Extractor · imgtotext.in
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-[3.25rem] lg:leading-[1.1]">
        Image to Text Converter
      </h1>
      <p
        id="hero-lead"
        className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
      >
        Extract text from any image — screenshots, photos, JPG, PNG, and scans. Free online OCR
        with instant copy, TXT, DOCX, and PDF export — no signup required.
      </p>
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

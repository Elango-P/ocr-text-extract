import { Languages, ScanText, Shield, Sparkles } from "lucide-react";

const MAX_BATCH_IMAGES = 10;

export default function OCRToolHero() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6 sm:pt-12">
      <div className="mb-8 sm:mb-10">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700">
          <Sparkles className="h-3.5 w-3.5" />
          Free · AI + browser fallback · No signup
        </p>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Extract text from any image
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Upload one image or a batch — get editable text in seconds. Free
          online OCR with copy, TXT, DOCX, and PDF export.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
            <Shield className="h-3.5 w-3.5 text-teal-600" />
            Browser fallback if AI fails
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
            <Languages className="h-3.5 w-3.5 text-cyan-600" />
            12+ languages
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
            <ScanText className="h-3.5 w-3.5 text-sky-600" />
            Batch OCR · up to {MAX_BATCH_IMAGES}
          </span>
        </div>
      </div>
    </div>
  );
}

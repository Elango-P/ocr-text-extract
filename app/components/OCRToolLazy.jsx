"use client";

import dynamic from "next/dynamic";

const OCRToolContent = dynamic(() => import("./OCRToolContent"), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 py-12 sm:px-6"
      role="status"
      aria-busy="true"
      aria-label="Loading OCR tool"
    >
      <div className="h-10 w-10 animate-pulse rounded-xl bg-cyan-100" aria-hidden="true" />
      <p className="text-sm font-medium text-slate-500">Loading OCR tool…</p>
    </div>
  ),
});

export default function OCRToolLazy() {
  return <OCRToolContent />;
}

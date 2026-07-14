"use client";

import dynamic from "next/dynamic";

const OCRToolContent = dynamic(() => import("./OCRToolContent"), {
  ssr: false,
  loading: () => (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
      <div className="mx-auto h-10 w-10 animate-pulse rounded-xl bg-cyan-100" />
      <p className="mt-4 text-sm font-medium text-slate-500">Loading OCR tool…</p>
    </section>
  ),
});

export default function OCRToolLazy() {
  return <OCRToolContent />;
}

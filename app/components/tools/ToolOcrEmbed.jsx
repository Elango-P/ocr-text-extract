"use client";

import dynamic from "next/dynamic";

/**
 * Isolates the heavy OCR client bundle behind a client boundary so
 * tool landing SSG does not pull OCRToolContent into every worker.
 */
const OCRToolContent = dynamic(() => import("../OCRToolContent"), {
  ssr: false,
  loading: () => (
    <div
      id="ocr-tool"
      className="mx-auto flex max-w-6xl items-center justify-center px-4 py-16 sm:px-6"
      aria-busy="true"
      aria-label="Loading OCR tool"
    >
      <div className="ocr-tool-shell flex w-full items-center justify-center py-16">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-cyan-100" />
      </div>
    </div>
  ),
});

export default function ToolOcrEmbed() {
  return <OCRToolContent />;
}

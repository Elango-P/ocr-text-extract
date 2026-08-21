"use client";

import dynamic from "next/dynamic";
import OCRToolShell from "../OCRToolShell";

/**
 * Isolates the heavy OCR client bundle behind a client boundary so
 * tool landing SSG does not pull OCRToolContent into every worker.
 * The loading fallback is the SSR shell (labeled file input + language).
 */
const OCRToolContent = dynamic(() => import("../OCRToolContent"), {
  ssr: false,
  loading: () => <OCRToolShell />,
});

export default function ToolOcrEmbed() {
  return <OCRToolContent />;
}

"use client";

import dynamic from "next/dynamic";

const OCRToolContent = dynamic(() => import("./OCRToolContent"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-12 sm:px-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-cyan-100" />
    </div>
  ),
});

export default function OCRToolLazy() {
  return <OCRToolContent />;
}

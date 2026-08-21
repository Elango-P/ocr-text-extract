"use client";

import dynamic from "next/dynamic";
import OCRToolShell from "./OCRToolShell";

const OCRToolContent = dynamic(() => import("./OCRToolContent"), {
  ssr: false,
  loading: () => <OCRToolShell />,
});

export default function OCRToolLazy() {
  return <OCRToolContent />;
}

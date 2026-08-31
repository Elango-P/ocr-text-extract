"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import PdfToTextShell from "./PdfToTextShell";

const PdfToTextTool = dynamic(() => import("./PdfToTextTool"), {
  ssr: false,
  loading: () => <PdfToTextShell />,
});

export default function PdfToTextEmbed() {
  const [ready, setReady] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const armedRef = useRef(false);

  const arm = useCallback(() => {
    if (armedRef.current) return;
    armedRef.current = true;
    setReady(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(arm, 2500);
    return () => window.clearTimeout(timer);
  }, [arm]);

  const handleChange = (event) => {
    if (event.target?.files?.[0]) setPendingFile(event.target.files[0]);
    arm();
  };
  const handlePointerDown = (event) => {
    if (event.target?.closest?.('input[type="file"]')) return;
    arm();
  };

  if (ready) return <PdfToTextTool initialFile={pendingFile} />;

  return (
    <div onChange={handleChange} onPointerDown={handlePointerDown} onDragEnter={arm}>
      <PdfToTextShell />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ImageToPdfShell from "./ImageToPdfShell";

const ImageToPdfTool = dynamic(() => import("./ImageToPdfTool"), {
  ssr: false,
  loading: () => <ImageToPdfShell />,
});

export default function ImageToPdfEmbed() {
  const [ready, setReady] = useState(false);
  const [pendingFiles, setPendingFiles] = useState(null);
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
    if (event.target?.files?.length) setPendingFiles(Array.from(event.target.files));
    arm();
  };
  const handlePointerDown = (event) => {
    if (event.target?.closest?.('input[type="file"]')) return;
    arm();
  };

  if (ready) return <ImageToPdfTool initialFiles={pendingFiles} />;
  return (
    <div onChange={handleChange} onPointerDown={handlePointerDown} onDragEnter={arm}>
      <ImageToPdfShell />
    </div>
  );
}

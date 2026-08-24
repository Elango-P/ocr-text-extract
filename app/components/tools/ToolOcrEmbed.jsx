"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import OCRToolShell from "../OCRToolShell";

/**
 * Isolates the heavy OCR client bundle so it is not downloaded on first paint.
 * SSR/first paint shows OCRToolShell (the LCP candidate). The full tool loads on
 * first interaction inside the tool, or idle after window load.
 */
const OCRToolContent = dynamic(() => import("../OCRToolContent"), {
  ssr: false,
  loading: () => <OCRToolShell />,
});

export default function ToolOcrEmbed() {
  const [ready, setReady] = useState(false);
  const [pendingFiles, setPendingFiles] = useState(null);
  const armedRef = useRef(false);

  const arm = useCallback(() => {
    if (armedRef.current) return;
    armedRef.current = true;
    setReady(true);
  }, []);

  useEffect(() => {
    let idleId = null;
    let timeoutId = null;

    const scheduleIdle = () => {
      if (typeof requestIdleCallback !== "undefined") {
        idleId = requestIdleCallback(() => arm(), { timeout: 4000 });
      } else {
        timeoutId = setTimeout(() => arm(), 2000);
      }
    };

    const onLoad = () => scheduleIdle();

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);
      if (idleId != null && typeof cancelIdleCallback !== "undefined") {
        cancelIdleCallback(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
    };
  }, [arm]);

  const onShellChange = (event) => {
    const input = event.target;
    if (input?.type === "file" && input.files?.length) {
      setPendingFiles(Array.from(input.files));
    }
    arm();
  };

  /** Unmounting before a file dialog closes drops the selection — wait for change. */
  const onShellPointerDown = (event) => {
    if (event.target?.closest?.('input[type="file"]')) return;
    arm();
  };

  const onShellFocusCapture = (event) => {
    if (event.target?.closest?.('input[type="file"]')) return;
    arm();
  };

  if (ready) {
    return <OCRToolContent initialFiles={pendingFiles} />;
  }

  return (
    <div
      onPointerDown={onShellPointerDown}
      onFocusCapture={onShellFocusCapture}
      onDragEnter={arm}
      onChange={onShellChange}
    >
      <OCRToolShell />
    </div>
  );
}

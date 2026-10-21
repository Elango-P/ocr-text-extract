"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCw,
  RotateCcw,
  Crop,
  RotateCcw as ResetIcon,
  Check,
  X,
  ScanText,
  Move,
} from "lucide-react";

export default function ImageWorkspace({
  activeItem,
  onUpdateImagePreview,
  onResetToOriginal,
  onReRunOcr,
  isProcessing = false,
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [isCropMode, setIsCropMode] = useState(false);
  const [cropRect, setCropRect] = useState(null); // { x: %, y: %, w: %, h: % }
  const [activeHandle, setActiveHandle] = useState(null);

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const cropDragRef = useRef({ startX: 0, startY: 0, initialRect: null });

  const currentPreview = activeItem?.preview || null;
  const originalPreview = activeItem?.originalPreview || activeItem?.preview || null;
  const isImageModified = currentPreview !== originalPreview || rotation !== 0;

  // Handle zooming
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleFitScreen = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Wheel zoom
  const handleWheel = (e) => {
    if (isCropMode) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    setZoom((prev) => Math.max(0.5, Math.min(prev + delta, 4)));
  };

  // Pan interaction
  const handleMouseDown = (e) => {
    if (isCropMode || e.button !== 0) return;
    setIsPanning(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isPanning || isCropMode) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPan({
        x: dragStartRef.current.panX + dx,
        y: dragStartRef.current.panY + dy,
      });
    },
    [isPanning, isCropMode]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    if (isPanning) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isPanning, handleMouseMove, handleMouseUp]);

  // Rotate image by +/- 90 degrees
  const handleRotate = async (delta) => {
    if (!currentPreview) return;
    const nextRot = (rotation + delta + 360) % 360;
    setRotation(nextRot);

    // Apply rotation onto a new canvas to bake it into dataUrl
    const img = new Image();
    img.src = currentPreview;
    await new Promise((res) => {
      img.onload = res;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const isQuarterTurn = delta === 90 || delta === -90 || delta === 270;

    if (isQuarterTurn) {
      canvas.width = img.height;
      canvas.height = img.width;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((delta * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    const rotatedDataUrl = canvas.toDataURL("image/png");
    onUpdateImagePreview(rotatedDataUrl);
    setRotation(0); // baked in
  };

  // Toggle Crop Mode
  const startCrop = () => {
    setIsCropMode(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    // Default initial crop rect in center (80% of width/height)
    setCropRect({ x: 10, y: 10, w: 80, h: 80 });
  };

  const cancelCrop = () => {
    setIsCropMode(false);
    setCropRect(null);
    setActiveHandle(null);
  };

  const applyCrop = async () => {
    if (!cropRect || !currentPreview) return;

    const img = new Image();
    img.src = currentPreview;
    await new Promise((res) => {
      img.onload = res;
    });

    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;

    const cropX = Math.round((cropRect.x / 100) * naturalW);
    const cropY = Math.round((cropRect.y / 100) * naturalH);
    const cropW = Math.max(Math.round((cropRect.w / 100) * naturalW), 10);
    const cropH = Math.max(Math.round((cropRect.h / 100) * naturalH), 10);

    const canvas = document.createElement("canvas");
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const croppedDataUrl = canvas.toDataURL("image/png");
    onUpdateImagePreview(croppedDataUrl);
    setIsCropMode(false);
    setCropRect(null);
  };

  // Handle Crop Drag & Resize
  const handleCropMouseDown = (e, handle = "move") => {
    e.stopPropagation();
    setActiveHandle(handle);
    cropDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialRect: { ...cropRect },
    };
  };

  const handleCropMouseMove = useCallback(
    (e) => {
      if (!activeHandle || !cropRect || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dxPercent = ((e.clientX - cropDragRef.current.startX) / rect.width) * 100;
      const dyPercent = ((e.clientY - cropDragRef.current.startY) / rect.height) * 100;
      const init = cropDragRef.current.initialRect;

      let { x, y, w, h } = init;

      if (activeHandle === "move") {
        x = Math.max(0, Math.min(100 - w, init.x + dxPercent));
        y = Math.max(0, Math.min(100 - h, init.y + dyPercent));
      } else if (activeHandle === "se") {
        w = Math.max(10, Math.min(100 - x, init.w + dxPercent));
        h = Math.max(10, Math.min(100 - y, init.h + dyPercent));
      } else if (activeHandle === "nw") {
        const newX = Math.max(0, Math.min(init.x + init.w - 10, init.x + dxPercent));
        const newY = Math.max(0, Math.min(init.y + init.h - 10, init.y + dyPercent));
        w = init.w + (init.x - newX);
        h = init.h + (init.y - newY);
        x = newX;
        y = newY;
      } else if (activeHandle === "ne") {
        const newY = Math.max(0, Math.min(init.y + init.h - 10, init.y + dyPercent));
        w = Math.max(10, Math.min(100 - x, init.w + dxPercent));
        h = init.h + (init.y - newY);
        y = newY;
      } else if (activeHandle === "sw") {
        const newX = Math.max(0, Math.min(init.x + init.w - 10, init.x + dxPercent));
        w = init.w + (init.x - newX);
        h = Math.max(10, Math.min(100 - y, init.h + dyPercent));
        x = newX;
      }

      setCropRect({ x, y, w, h });
    },
    [activeHandle, cropRect]
  );

  const handleCropMouseUp = useCallback(() => {
    setActiveHandle(null);
  }, []);

  useEffect(() => {
    if (activeHandle) {
      window.addEventListener("mousemove", handleCropMouseMove);
      window.addEventListener("mouseup", handleCropMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleCropMouseMove);
        window.removeEventListener("mouseup", handleCropMouseUp);
      };
    }
  }, [activeHandle, handleCropMouseMove, handleCropMouseUp]);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-50/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-700 truncate max-w-[140px] sm:max-w-[200px]" title={activeItem?.name}>
            {activeItem?.name || "Original Image"}
          </span>
          {isImageModified && (
            <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-semibold text-cyan-800">
              Edited
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1">
          {!isCropMode ? (
            <>
              {/* Zoom Controls */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                  className="rounded p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="px-1.5 text-[11px] font-bold text-slate-700 min-w-[36px] text-center select-none">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoom >= 4}
                  className="rounded p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleFitScreen}
                  className="rounded p-1 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
                  title="Reset Zoom (Fit)"
                  aria-label="Reset Zoom"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Rotation */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => handleRotate(-90)}
                  className="rounded p-1 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
                  title="Rotate Left 90°"
                  aria-label="Rotate Counter-Clockwise"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRotate(90)}
                  className="rounded p-1 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
                  title="Rotate Right 90°"
                  aria-label="Rotate Clockwise"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Crop Trigger */}
              <button
                type="button"
                onClick={startCrop}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:border-cyan-300 hover:text-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
                title="Crop Image"
              >
                <Crop className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Crop</span>
              </button>

              {/* Reset to Original Image */}
              {isImageModified && (
                <button
                  type="button"
                  onClick={() => {
                    setRotation(0);
                    onResetToOriginal();
                  }}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-rose-600 shadow-xs hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-600"
                  title="Restore Original Image"
                >
                  <ResetIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}

              {/* Re-OCR this cropped/rotated image */}
              {isImageModified && onReRunOcr && (
                <button
                  type="button"
                  onClick={onReRunOcr}
                  disabled={isProcessing}
                  className="flex items-center gap-1 rounded-lg bg-cyan-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 disabled:opacity-50"
                  title="Re-run OCR on the modified image"
                >
                  <ScanText className="h-3.5 w-3.5" />
                  <span>Re-OCR</span>
                </button>
              )}
            </>
          ) : (
            /* Active Crop Mode Controls */
            <div className="flex items-center gap-1.5 animate-fadeIn">
              <span className="text-xs font-bold text-cyan-800 mr-1">Drag area to crop:</span>
              <button
                type="button"
                onClick={applyCrop}
                className="flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Apply Crop</span>
              </button>
              <button
                type="button"
                onClick={cancelCrop}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-600"
              >
                <X className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas / Image Viewport */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        className={`relative flex-1 min-h-[300px] sm:min-h-[420px] bg-slate-900/5 overflow-hidden flex items-center justify-center select-none ${
          isCropMode ? "cursor-default" : zoom > 1 ? (isPanning ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
        }`}
      >
        {currentPreview ? (
          <div
            className="relative transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            <img
              ref={imgRef}
              src={currentPreview}
              alt={activeItem?.name || "OCR source preview"}
              className="max-h-[500px] w-auto max-w-full rounded-md object-contain shadow-sm pointer-events-none"
              draggable={false}
            />
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            <p className="text-sm font-medium">No image loaded</p>
          </div>
        )}

        {/* Crop Overlay when Crop Mode is Active */}
        {isCropMode && cropRect && (
          <div className="absolute inset-0 pointer-events-auto bg-slate-950/40">
            {/* Draggable/Resizable Crop Box */}
            <div
              className="absolute border-2 border-cyan-400 bg-cyan-400/10 shadow-lg cursor-move"
              style={{
                left: `${cropRect.x}%`,
                top: `${cropRect.y}%`,
                width: `${cropRect.w}%`,
                height: `${cropRect.h}%`,
              }}
              onMouseDown={(e) => handleCropMouseDown(e, "move")}
            >
              {/* Center helper badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <Move className="h-6 w-6 text-white" />
              </div>

              {/* Resize handles */}
              <div
                className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-600 cursor-nwse-resize"
                onMouseDown={(e) => handleCropMouseDown(e, "nw")}
              />
              <div
                className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-600 cursor-nesw-resize"
                onMouseDown={(e) => handleCropMouseDown(e, "ne")}
              />
              <div
                className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-600 cursor-nesw-resize"
                onMouseDown={(e) => handleCropMouseDown(e, "sw")}
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-600 cursor-nwse-resize"
                onMouseDown={(e) => handleCropMouseDown(e, "se")}
              />
            </div>
          </div>
        )}

        {/* Pan tip for users */}
        {zoom > 1 && !isCropMode && (
          <div className="absolute bottom-2 left-2 rounded-md bg-slate-900/60 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-xs pointer-events-none">
            Click & drag to pan
          </div>
        )}
      </div>
    </div>
  );
}

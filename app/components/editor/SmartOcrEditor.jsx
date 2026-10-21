"use client";

import React, { useState } from "react";
import {
  ImageIcon,
  FileText,
  Upload,
  ArrowLeft,
  Columns,
  Square,
  Sparkles,
} from "lucide-react";
import ImageWorkspace from "./ImageWorkspace";
import TextWorkspace from "./TextWorkspace";
import BatchStrip from "./BatchStrip";

export default function SmartOcrEditor({
  queue = [],
  activeId,
  onSelectImage,
  onRemoveImage,
  onAddFiles,
  onUpdateImagePreview,
  onResetToOriginal,
  onUpdateText,
  onClearText,
  onRestoreOriginalOcr,
  onReRunOcr,
  onNewScan,
  isProcessing = false,
  fileInputRef,
}) {
  const [mobileView, setMobileView] = useState("split"); // 'image' | 'text' | 'split'

  const activeItem = queue.find((q) => q.id === activeId) || queue[0] || null;

  if (!activeItem) return null;

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Header / Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNewScan}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-cyan-700 transition"
            title="Upload new image or change settings"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Upload New</span>
          </button>
          <div className="hidden sm:block h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              Smart OCR Editor
            </h3>
          </div>
        </div>

        {/* Mobile Navigation Toggle (Visible on < lg screens) */}
        <div className="flex lg:hidden items-center rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMobileView("image")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              mobileView === "image"
                ? "bg-white text-cyan-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Image</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView("text")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              mobileView === "text"
                ? "bg-white text-cyan-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Extracted Text</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView("split")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              mobileView === "split"
                ? "bg-white text-cyan-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Columns className="h-3.5 w-3.5" />
            <span>Both</span>
          </button>
        </div>
      </div>

      {/* Batch Thumbnails & Operations */}
      <BatchStrip
        queue={queue}
        activeId={activeId}
        onSelectImage={onSelectImage}
        onRemoveImage={onRemoveImage}
        onAddFiles={onAddFiles}
        fileInputRef={fileInputRef}
      />

      {/* Two-Panel Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        {/* Left Panel: Original / Modified Image Workspace */}
        <div
          className={`flex flex-col min-h-[380px] sm:min-h-[500px] ${
            mobileView === "text" ? "hidden lg:flex" : "flex"
          }`}
        >
          <ImageWorkspace
            key={activeItem.id}
            activeItem={activeItem}
            onUpdateImagePreview={(newPreview) => onUpdateImagePreview(activeItem.id, newPreview)}
            onResetToOriginal={() => onResetToOriginal(activeItem.id)}
            onReRunOcr={() => onReRunOcr(activeItem.id)}
            isProcessing={isProcessing}
          />
        </div>

        {/* Right Panel: Editable Extracted Text Workspace */}
        <div
          className={`flex flex-col min-h-[380px] sm:min-h-[500px] ${
            mobileView === "image" ? "hidden lg:flex" : "flex"
          }`}
        >
          <TextWorkspace
            key={activeItem.id}
            activeItem={activeItem}
            onUpdateText={(newText) => onUpdateText(activeItem.id, newText)}
            onClearText={() => onClearText(activeItem.id)}
            onRestoreOriginalOcr={() => onRestoreOriginalOcr(activeItem.id)}
          />
        </div>
      </div>
    </div>
  );
}

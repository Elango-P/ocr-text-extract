"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Plus,
  Trash2,
  Download,
  FileArchive,
  ChevronDown,
  Layers,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  downloadZip,
  downloadTxt,
  downloadDocx,
  downloadPdf,
  sanitizeFilename,
} from "../../lib/export/downloadTextFormats";
import { MAX_BATCH_IMAGES } from "../../lib/ocr/toolOptions";

export default function BatchStrip({
  queue = [],
  activeId,
  onSelectImage,
  onRemoveImage,
  onAddFiles,
  fileInputRef,
}) {
  const [showBatchExport, setShowBatchExport] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowBatchExport(false);
      }
    };
    if (showBatchExport) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [showBatchExport]);

  if (!queue.length) return null;

  // Build combined text with document headers
  const buildCombinedText = () => {
    return queue
      .map((item, index) => {
        const header = `===== ${item.name || `Document ${index + 1}`} =====\n`;
        return `${header}\n${item.text || ""}`.trim();
      })
      .filter(Boolean)
      .join("\n\n\n");
  };

  // Download all as ZIP
  const handleDownloadAllZip = () => {
    const files = queue.map((item, i) => {
      const base = sanitizeFilename(item.name || `image-${i + 1}`);
      return {
        name: `${base}-extracted.txt`,
        data: item.text || "",
      };
    });
    downloadZip(files, "batch-extracted-texts.zip");
    toast.success("Downloaded all texts as ZIP!");
    setShowBatchExport(false);
  };

  // Download all as combined TXT
  const handleDownloadCombinedTxt = () => {
    const combined = buildCombinedText();
    if (!combined) return toast.error("No text available to export");
    downloadTxt(combined, "batch-combined-extracted.txt");
    toast.success("Downloaded combined TXT");
    setShowBatchExport(false);
  };

  // Download all as combined DOCX
  const handleDownloadCombinedDocx = () => {
    const combined = buildCombinedText();
    if (!combined) return toast.error("No text available to export");
    downloadDocx(combined, "batch-combined-extracted.docx");
    toast.success("Downloaded combined DOCX");
    setShowBatchExport(false);
  };

  // Download all as combined PDF
  const handleDownloadCombinedPdf = () => {
    const combined = buildCombinedText();
    if (!combined) return toast.error("No text available to export");
    downloadPdf(combined, "batch-combined-extracted.pdf");
    toast.success("Downloaded combined PDF");
    setShowBatchExport(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xs">
      {/* Thumbnails row */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mr-1 shrink-0">
          <Layers className="h-4 w-4 text-cyan-600" />
          <span>Batch ({queue.length}/{MAX_BATCH_IMAGES}):</span>
        </div>

        {queue.map((item, idx) => {
          const isActive = item.id === activeId;
          const status = item.status || (item.text ? "completed" : "idle");

          return (
            <div
              key={item.id}
              className={`group relative shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                isActive
                  ? "border-cyan-500 ring-2 ring-cyan-400/30 scale-105"
                  : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectImage(item.id)}
                className="flex items-center gap-1.5 p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
                title={`${item.name} (Click to switch)`}
                aria-current={isActive}
              >
                <img
                  src={item.preview}
                  alt={item.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="hidden sm:block text-left pr-1.5">
                  <p className="max-w-[80px] truncate text-[11px] font-bold text-slate-800">
                    {item.name || `Image ${idx + 1}`}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {item.text ? `${item.text.split(/\s+/).filter(Boolean).length} words` : "Queued"}
                  </p>
                </div>
              </button>

              {/* Status Badge */}
              <div className="absolute left-1 top-1">
                {status === "processing" ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-600 text-white shadow-xs">
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                  </span>
                ) : status === "completed" || item.text ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-white shadow-xs">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                  </span>
                ) : status === "error" ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs">
                    <AlertCircle className="h-2.5 w-2.5" />
                  </span>
                ) : null}
              </div>

              {/* Remove Thumbnail Button */}
              {queue.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveImage(item.id);
                  }}
                  className="absolute right-0.5 top-0.5 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-slate-900/80 text-[10px] font-bold text-white hover:bg-rose-600"
                  title="Remove image"
                  aria-label={`Remove ${item.name}`}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {/* Add more images button */}
        {queue.length < MAX_BATCH_IMAGES && (
          <button
            type="button"
            onClick={() => fileInputRef?.current?.click()}
            className="flex h-11 items-center gap-1 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 text-xs font-semibold text-slate-600 hover:border-cyan-400 hover:bg-cyan-50/50 hover:text-cyan-700 transition"
            title="Add more images"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        )}
      </div>

      {/* Batch Export Options */}
      {queue.length > 1 && (
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowBatchExport(!showBatchExport)}
            className="flex items-center gap-1.5 rounded-xl border border-cyan-200 bg-cyan-50/70 px-3 py-1.5 text-xs font-bold text-cyan-800 hover:bg-cyan-100 transition shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-cyan-700" />
            <span>Download All ({queue.length})</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showBatchExport && (
            <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-30 animate-fadeIn">
              <button
                type="button"
                onClick={handleDownloadAllZip}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <FileArchive className="h-4 w-4 text-amber-600" />
                <span>All as ZIP (Individual TXTs)</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadCombinedTxt}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <span className="text-[11px] font-bold text-slate-500">TXT</span>
                <span>Combined TXT</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadCombinedDocx}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <span className="text-[11px] font-bold text-blue-600">DOC</span>
                <span>Combined DOCX</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadCombinedPdf}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <span className="text-[11px] font-bold text-rose-600">PDF</span>
                <span>Combined PDF</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

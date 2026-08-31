"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Download, FileText, Loader2, Plus, Trash2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import {
  ACCEPTED_IMAGE_ACCEPT_ATTR,
  ACCEPTED_IMAGE_TO_PDF_TYPES,
  MAX_IMAGE_TO_PDF_BYTES,
  MAX_IMAGE_TO_PDF_SIZE_MB,
  OCR_LANGUAGES,
} from "../../lib/ocr/toolOptions";
import { extractImageText } from "../../lib/ocr/extractText";
import { buildImagePdf, downloadPdfBlob } from "../../lib/pdf/buildImagePdf";

const MAX_FILES = 30;

function fileIsSupported(file) {
  return (
    ACCEPTED_IMAGE_TO_PDF_TYPES.split(",").includes(file.type) ||
    (!file.type && /\.(png|jpe?g|webp)$/i.test(file.name || ""))
  );
}

function previewUrl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve(url);
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read ${file.name || "this image"}.`));
    };
    image.src = url;
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read ${file.name || "this image"}.`));
    reader.readAsDataURL(file);
  });
}

export default function ImageToPdfTool({ initialFiles = null }) {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("auto");
  const [margin, setMargin] = useState("24");
  const [isBuilding, setIsBuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("eng");
  const [localOnly, setLocalOnly] = useState(false);
  const [searchableText, setSearchableText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const initialAppliedRef = useRef(false);
  const objectUrlsRef = useRef(new Set());

  const addFiles = useCallback(async (filesInput) => {
    const files = (Array.isArray(filesInput) ? filesInput : [filesInput]).filter(Boolean);
    const supported = files.filter(fileIsSupported);
    if (supported.length !== files.length) {
      toast.error("Only JPG, JPEG, PNG, and WEBP images are supported.");
    }
    const sized = supported.filter((file) => file.size <= MAX_IMAGE_TO_PDF_BYTES);
    if (sized.length !== supported.length) {
      toast.error(`Each image must be ${MAX_IMAGE_TO_PDF_SIZE_MB} MB or smaller.`);
    }
    if (!sized.length) return;
    const accepted = [];
    for (const file of sized) {
      try {
        const preview = await previewUrl(file);
        objectUrlsRef.current.add(preview);
        accepted.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          file,
          preview,
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
    if (accepted.length) {
      setItems((current) => {
        const room = Math.max(0, MAX_FILES - current.length);
        if (!room) {
          toast.error(`You can add up to ${MAX_FILES} images at once.`);
          for (const item of accepted) {
            URL.revokeObjectURL(item.preview);
            objectUrlsRef.current.delete(item.preview);
          }
          return current;
        }
        if (accepted.length > room) {
          toast(`Only ${room} more image${room === 1 ? "" : "s"} can be added.`);
          for (const item of accepted.slice(room)) {
            URL.revokeObjectURL(item.preview);
            objectUrlsRef.current.delete(item.preview);
          }
        }
        return [...current, ...accepted.slice(0, room)];
      });
      setSearchableText("");
      setStatusMessage(`${accepted.length} image${accepted.length === 1 ? "" : "s"} added.`);
    }
  }, []);

  useEffect(() => {
    if (!initialFiles?.length || initialAppliedRef.current) return;
    initialAppliedRef.current = true;
    addFiles(initialFiles);
  }, [initialFiles, addFiles]);

  useEffect(() => () => {
    for (const url of objectUrlsRef.current) URL.revokeObjectURL(url);
  }, []);

  const { isDragging, dragProps } = useDragAndDrop(addFiles, { multiple: true });

  const removeItem = (id) => {
    setItems((current) => {
      const item = current.find((entry) => entry.id === id);
      if (item) {
        URL.revokeObjectURL(item.preview);
        objectUrlsRef.current.delete(item.preview);
      }
      return current.filter((entry) => entry.id !== id);
    });
  };

  const moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    setItems((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const createImagePdf = async () => {
    if (!items.length) {
      toast.error("Add at least one image first");
      return;
    }
    setIsBuilding(true);
    setProgress(0);
    setStatusMessage("Building an image PDF in your browser…");
    try {
      const blob = await buildImagePdf(items, {
        pageSize,
        orientation,
        margin: Number(margin),
        onProgress: setProgress,
      });
      downloadPdfBlob(blob, "images.pdf");
      setStatusMessage("Image PDF downloaded. The original images are preserved on each page.");
      toast.success("Image PDF downloaded");
    } catch (error) {
      console.error(error);
      setStatusMessage(error.message || "Could not create the image PDF.");
      toast.error(error.message || "Could not create the image PDF.");
    } finally {
      setIsBuilding(false);
    }
  };

  const createSearchablePdf = async () => {
    if (!items.length) {
      toast.error("Add at least one image first");
      return;
    }
    setIsBuilding(true);
    setProgress(0);
    setSearchableText("");
    try {
      const parts = [];
      for (let index = 0; index < items.length; index += 1) {
        setStatusMessage(`Recognizing image ${index + 1} of ${items.length}…`);
        const result = await extractImageText({
          dataUrl: await fileToDataUrl(items[index].file),
          language,
          localOnly,
          onProgress: (value) => setProgress(Math.round(((index + value / 100) / items.length) * 80)),
        });
        parts.push(`----- ${items[index].file.name} -----\n${result.text || ""}`.trim());
      }
      const text = parts.filter(Boolean).join("\n\n");
      setSearchableText(text);
      if (!text) {
        toast.error("No text detected in these images.");
        setStatusMessage("No text detected. Try clearer images or another language.");
        return;
      }
      const { downloadPdf, findPdfUnsupportedChars } = await import("../../lib/export/downloadTextFormats");
      downloadPdf(text, "searchable-text.pdf");
      setProgress(100);
      setStatusMessage("Searchable text PDF downloaded. This secondary export contains text, not the original images.");
      if (findPdfUnsupportedChars(text).length) {
        toast("Some non-Latin characters may not render in the text-only PDF. Use DOCX or TXT for those scripts.", { duration: 7000 });
      } else {
        toast.success("Searchable text PDF downloaded");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage(error.message || "Searchable PDF creation failed.");
      toast.error(error.message || "Searchable PDF creation failed.");
    } finally {
      setIsBuilding(false);
    }
  };

  const clear = () => {
    for (const item of items) {
      URL.revokeObjectURL(item.preview);
      objectUrlsRef.current.delete(item.preview);
    }
    setItems([]);
    setSearchableText("");
    setStatusMessage("");
    setProgress(0);
  };

  return (
    <>
      <Toaster position="top-center" />
      <section id="ocr-tool" className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
        <h2 className="sr-only">Image to PDF converter</h2>
        <div className="ocr-tool-shell p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <div
                {...dragProps}
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById("image-pdf-file-input")?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    document.getElementById("image-pdf-file-input")?.click();
                  }
                }}
                className={`cursor-pointer rounded-2xl border-2 border-dashed bg-white/95 p-8 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 ${isDragging ? "border-cyan-500 bg-cyan-50" : "border-slate-300 hover:border-cyan-400"}`}
              >
                <Plus className="mx-auto h-8 w-8 text-cyan-600" aria-hidden="true" />
                <p className="mt-3 font-bold text-slate-800">Add images to your PDF</p>
                <p className="mt-1 text-sm text-slate-600">Drop files here or click to browse · JPG, PNG, WEBP</p>
                <input id="image-pdf-file-input" type="file" accept={ACCEPTED_IMAGE_ACCEPT_ATTR} multiple onChange={(event) => { addFiles(Array.from(event.target.files || [])); event.target.value = ""; }} hidden />
              </div>

              {items.length > 0 && (
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2">
                      <img src={item.preview} alt={`Preview of ${item.file.name}`} className="h-16 w-16 rounded-lg object-cover" />
                      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{index + 1}. {item.file.name}</p>
                      <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label={`Move ${item.file.name} earlier`} className="rounded p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30"><ArrowUp className="h-4 w-4" aria-hidden="true" /></button>
                      <button type="button" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} aria-label={`Move ${item.file.name} later`} className="rounded p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30"><ArrowDown className="h-4 w-4" aria-hidden="true" /></button>
                      <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.file.name}`} className="rounded p-2 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-5">
                <h3 className="font-bold text-slate-900">Page settings</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <label className="text-sm text-slate-700">Page size<select value={pageSize} onChange={(event) => setPageSize(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2"><option value="a4">A4</option><option value="letter">Letter</option><option value="fit">Fit to image</option></select></label>
                  <label className="text-sm text-slate-700">Orientation<select value={orientation} onChange={(event) => setOrientation(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2"><option value="auto">Automatic</option><option value="portrait">Portrait</option><option value="landscape">Landscape</option></select></label>
                  <label className="text-sm text-slate-700">Margins<select value={margin} onChange={(event) => setMargin(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2"><option value="0">None</option><option value="18">Small</option><option value="24">Standard</option><option value="36">Wide</option></select></label>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={createImagePdf} disabled={!items.length || isBuilding} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 p-3.5 font-bold text-white shadow-lg shadow-cyan-500/20 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400">
                  {isBuilding ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Working {progress}%</> : <><Download className="h-5 w-5" aria-hidden="true" /> Download Image PDF</>}
                </button>
                <button type="button" onClick={clear} disabled={!items.length} className="rounded-xl border border-slate-200 px-5 font-semibold text-slate-700 disabled:opacity-40">Clear</button>
              </div>
              {isBuilding && <div role="progressbar" aria-label="PDF creation progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} className="overflow-hidden rounded-full bg-slate-200"><div className="h-2 bg-gradient-to-r from-cyan-500 to-teal-500" style={{ width: `${progress}%` }} /></div>}
              <p className="text-xs leading-relaxed text-slate-500">{statusMessage || "Images are processed locally and are not uploaded to create the PDF."}</p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-5 sm:p-6">
              <h3 className="font-bold text-slate-900">Searchable text PDF</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">This is a secondary OCR export. It creates a text-only PDF; use the primary Image PDF button when you need the original images preserved.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm text-slate-700">OCR language<select value={language} onChange={(event) => setLanguage(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2">{OCR_LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
                <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700"><input type="checkbox" checked={localOnly} onChange={(event) => setLocalOnly(event.target.checked)} className="accent-cyan-600" /> Local OCR only</label>
              </div>
              <button type="button" onClick={createSearchablePdf} disabled={!items.length || isBuilding} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 p-3 font-bold text-cyan-800 disabled:opacity-40"><FileText className="h-5 w-5" aria-hidden="true" /> Create searchable text PDF</button>
              <label htmlFor="searchable-pdf-text" className="mt-5 block text-xs font-bold uppercase tracking-wider text-slate-500">OCR text review</label>
              <textarea id="searchable-pdf-text" value={searchableText} onChange={(event) => setSearchableText(event.target.value)} className="mt-2 min-h-48 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-sm text-slate-900" placeholder="OCR text appears here when you choose the secondary export." />
              <p className="mt-4 text-xs text-slate-500">For privacy details, see the <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">Privacy Policy</Link>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

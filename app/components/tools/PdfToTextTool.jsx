"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Copy, Download, FileText, Loader2, ScanText, Upload } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import {
  ACCEPTED_PDF_ACCEPT_ATTR,
  MAX_PDF_PAGES,
  MAX_PDF_SIZE_MB,
  OCR_LANGUAGES,
} from "../../lib/ocr/toolOptions";
import { extractImageText } from "../../lib/ocr/extractText";
import { getPdfPageCount, renderPdfPages } from "../../lib/pdf/renderPdfPages";

const errorMessages = {
  INVALID_PDF_TYPE: "Choose a PDF file with a .pdf extension.",
  PDF_TOO_LARGE: `This PDF is too large. The limit is ${MAX_PDF_SIZE_MB} MB.`,
  PDF_ENCRYPTED: "This PDF is encrypted or password protected. Remove the password and try again.",
  PDF_CORRUPT: "This PDF could not be opened. It may be corrupted or incomplete.",
  PDF_EMPTY: "This PDF does not contain any pages.",
  PDF_TOO_MANY_PAGES: `This PDF has too many pages. The limit is ${MAX_PDF_PAGES} pages.`,
};

function readableError(error) {
  return errorMessages[error?.code] || error?.message || "The PDF could not be processed.";
}

export default function PdfToTextTool({ initialFile = null }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [rangeMode, setRangeMode] = useState("all");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [language, setLanguage] = useState("eng");
  const [localOnly, setLocalOnly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [aiQuota, setAiQuota] = useState({ remaining: null, limit: 10 });
  const fileInputRef = useRef(null);
  const cancelRef = useRef(false);
  const abortRef = useRef(null);
  const initialAppliedRef = useRef(false);

  const combinedText = pages
    .map((page) => `----- Page ${page.number} -----\n${page.text || ""}`.trim())
    .filter(Boolean)
    .join("\n\n");

  const chooseFile = async (candidate) => {
    if (!candidate) return;
    setStatusMessage("Checking PDF…");
    setPages([]);
    try {
      const count = await getPdfPageCount(candidate);
      setFile(candidate);
      setPageCount(count);
      setStartPage(1);
      setEndPage(count);
      setRangeMode("all");
      setStatusMessage(`${count} page${count === 1 ? "" : "s"} ready. Choose pages and extract.`);
    } catch (error) {
      setFile(null);
      setPageCount(0);
      setStatusMessage(readableError(error));
      toast.error(readableError(error));
    }
  };

  useEffect(() => {
    if (initialFile && !initialAppliedRef.current) {
      initialAppliedRef.current = true;
      chooseFile(initialFile);
    }
  }, [initialFile]);

  const { isDragging, dragProps } = useDragAndDrop(chooseFile, { multiple: false });

  const onInputChange = (event) => {
    chooseFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const updatePageText = (number, text) => {
    setPages((current) =>
      current.map((page) => (page.number === number ? { ...page, text } : page))
    );
  };

  const extractPages = async () => {
    if (!file || !pageCount) {
      toast.error("Upload a PDF first");
      return;
    }
    const first = rangeMode === "all" ? 1 : Math.min(startPage, endPage);
    const last = rangeMode === "all" ? pageCount : Math.max(startPage, endPage);
    cancelRef.current = false;
    abortRef.current = new AbortController();
    setIsProcessing(true);
    setPages([]);
    setProgress(0);
    setStatusMessage("Rendering PDF pages in your browser…");

    try {
      const rendered = await renderPdfPages(file, {
        startPage: first,
        endPage: last,
        signal: abortRef.current.signal,
        onProgress: setProgress,
      });
      const results = [];
      for (let index = 0; index < rendered.length; index += 1) {
        if (cancelRef.current) {
          throw Object.assign(new Error("Cancelled"), { code: "CANCELLED" });
        }
        const renderedPage = rendered[index];
        setStatusMessage(`Reading page ${renderedPage.number} of ${last}…`);
        const result = await extractImageText({
          dataUrl: renderedPage.preview,
          language,
          localOnly,
          signal: abortRef.current.signal,
          onQuota: setAiQuota,
          onProgress: (ocrProgress) =>
            setProgress(35 + Math.round(((index + ocrProgress / 100) / rendered.length) * 65)),
        });
        results.push({
          ...renderedPage,
          text: result.text,
          engine: result.engine,
        });
        setPages([...results]);
      }
      setProgress(100);
      setStatusMessage(
        results.some((page) => page.text)
          ? `Finished ${results.length} page${results.length === 1 ? "" : "s"}. Review the text before downloading.`
          : "No text detected. Try a clearer scan or another language."
      );
      if (results.some((page) => page.text)) toast.success("PDF text extracted");
      else toast.error("No text detected");
    } catch (error) {
      if (error?.code === "CANCELLED") {
        setStatusMessage("PDF processing cancelled.");
        toast("PDF processing cancelled");
      } else {
        setStatusMessage(readableError(error));
        toast.error(readableError(error));
      }
    } finally {
      abortRef.current = null;
      setIsProcessing(false);
    }
  };

  const cancelProcessing = () => {
    cancelRef.current = true;
    abortRef.current?.abort();
    setStatusMessage("Cancelling…");
  };

  const copyCombined = async () => {
    await navigator.clipboard.writeText(combinedText);
    toast.success("Copied combined text");
  };

  const download = async (format) => {
    try {
      const exports = await import("../../lib/export/downloadTextFormats");
      if (format === "txt") exports.downloadTxt(combinedText, "pdf-to-text.txt");
      else exports.downloadDocx(combinedText, "pdf-to-text.docx");
      toast.success(`Downloaded ${format.toUpperCase()}`);
    } catch (error) {
      console.error(error);
      toast.error(`${format.toUpperCase()} export failed`);
    }
  };

  const clear = () => {
    cancelProcessing();
    setFile(null);
    setPageCount(0);
    setPages([]);
    setProgress(0);
    setStatusMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Toaster position="top-center" />
      <section id="ocr-tool" className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
        <h2 className="sr-only">PDF to text converter</h2>
        <div className="ocr-tool-shell p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-5">
                <label htmlFor="pdf-language" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Document language
                </label>
                <select
                  id="pdf-language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {OCR_LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
                </select>
                <label className="mt-4 flex items-start gap-3 text-sm text-slate-600">
                  <input type="checkbox" checked={localOnly} onChange={(event) => setLocalOnly(event.target.checked)} className="mt-1 accent-cyan-600" />
                  <span><strong className="text-slate-900">Local OCR only</strong><br />Keep recognition in this browser instead of using cloud AI.</span>
                </label>
              </div>

              <div
                {...dragProps}
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`cursor-pointer rounded-2xl border-2 border-dashed bg-white/95 p-8 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 ${isDragging ? "border-cyan-500 bg-cyan-50" : "border-slate-300 hover:border-cyan-400"}`}
              >
                <Upload className="mx-auto h-8 w-8 text-cyan-600" aria-hidden="true" />
                <p className="mt-3 font-bold text-slate-800">{file ? file.name : "Drop a PDF here"}</p>
                <p className="mt-1 text-sm text-slate-600">or click to browse · PDF · max {MAX_PDF_SIZE_MB} MB</p>
                <input ref={fileInputRef} id="pdf-file-input" type="file" accept={ACCEPTED_PDF_ACCEPT_ATTR} onChange={onInputChange} hidden />
              </div>

              {pageCount > 0 && (
                <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-5">
                  <p className="font-bold text-slate-900">{pageCount} pages detected</p>
                  <fieldset className="mt-3 space-y-2 text-sm text-slate-700">
                    <legend className="sr-only">Pages to extract</legend>
                    <label className="flex items-center gap-2"><input type="radio" name="pdf-range" value="all" checked={rangeMode === "all"} onChange={() => setRangeMode("all")} /> All pages</label>
                    <label className="flex items-center gap-2"><input type="radio" name="pdf-range" value="range" checked={rangeMode === "range"} onChange={() => setRangeMode("range")} /> Page range</label>
                  </fieldset>
                  {rangeMode === "range" && (
                    <div className="mt-3 flex items-center gap-2">
                      <label htmlFor="pdf-start" className="sr-only">First page</label>
                      <input id="pdf-start" type="number" min="1" max={pageCount} value={startPage} onChange={(event) => setStartPage(Number(event.target.value))} className="w-24 rounded-lg border border-slate-200 p-2" />
                      <span>to</span>
                      <label htmlFor="pdf-end" className="sr-only">Last page</label>
                      <input id="pdf-end" type="number" min="1" max={pageCount} value={endPage} onChange={(event) => setEndPage(Number(event.target.value))} className="w-24 rounded-lg border border-slate-200 p-2" />
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={extractPages} disabled={!file || isProcessing} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 p-3.5 font-bold text-white shadow-lg shadow-cyan-500/20 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400">
                  {isProcessing ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Processing {progress}%</> : <><ScanText className="h-5 w-5" aria-hidden="true" /> Extract PDF text</>}
                </button>
                {isProcessing ? <button type="button" onClick={cancelProcessing} className="rounded-xl border border-rose-200 px-5 font-semibold text-rose-700">Cancel</button> : <button type="button" onClick={clear} disabled={!file && !pages.length} className="rounded-xl border border-slate-200 px-5 font-semibold text-slate-700 disabled:opacity-40">Clear</button>}
              </div>
              {isProcessing && <div role="progressbar" aria-label="PDF OCR progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} className="overflow-hidden rounded-full bg-slate-200"><div className="h-2 bg-gradient-to-r from-cyan-500 to-teal-500 transition-all" style={{ width: `${progress}%` }} /></div>}
              <p className="text-xs leading-relaxed text-slate-500">{statusMessage} {aiQuota.remaining != null && !localOnly ? `AI OCR: ${aiQuota.remaining}/${aiQuota.limit} left today.` : ""} Results are a draft; verify important names, figures, and dates.</p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-5 sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div><h3 className="flex items-center gap-2 font-bold text-slate-900"><FileText className="h-4 w-4 text-cyan-600" aria-hidden="true" /> Text by page</h3><p className="mt-1 text-xs text-slate-500" aria-live="polite">{pages.length ? `${pages.length} page${pages.length === 1 ? "" : "s"} processed` : "Rendered pages and OCR text appear here."}</p></div>
                {combinedText && <div className="flex gap-1"><button type="button" onClick={copyCombined} aria-label="Copy combined PDF text" title="Copy combined text" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Copy className="h-4 w-4" aria-hidden="true" /></button><button type="button" onClick={() => download("txt")} aria-label="Download PDF text as TXT" title="Download TXT" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Download className="h-4 w-4" aria-hidden="true" /></button><button type="button" onClick={() => download("docx")} aria-label="Download PDF text as DOCX" title="Download DOCX" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><FileText className="h-4 w-4" aria-hidden="true" /></button></div>}
              </div>
              <div className="space-y-5">
                {pages.map((page) => (
                  <article key={page.number} className="border-t border-slate-200 pt-4">
                    <h4 className="font-bold text-slate-800">Page {page.number}</h4>
                    <img src={page.preview} alt={`Rendered preview of PDF page ${page.number}`} className="mt-2 max-h-48 w-auto max-w-full rounded-lg border border-slate-200 object-contain" />
                    <label htmlFor={`pdf-page-text-${page.number}`} className="sr-only">Extracted text from page {page.number}</label>
                    <textarea id={`pdf-page-text-${page.number}`} value={page.text} onChange={(event) => updatePageText(page.number, event.target.value)} className="mt-3 min-h-32 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="No text detected on this page." />
                  </article>
                ))}
                {!pages.length && <p className="min-h-64 text-sm text-slate-500">Choose a scanned PDF, select its pages, and click Extract PDF text.</p>}
              </div>
            </div>
          </div>
          <p className="mt-5 text-xs text-slate-500">PDF pages render locally before OCR. For sensitive documents, enable Local OCR only and review our <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">Privacy Policy</Link>.</p>
        </div>
      </section>
    </>
  );
}

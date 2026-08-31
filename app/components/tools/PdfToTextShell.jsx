import {
  ACCEPTED_PDF_ACCEPT_ATTR,
  MAX_PDF_SIZE_MB,
  MAX_PDF_PAGES,
} from "../../lib/ocr/toolOptions";

export default function PdfToTextShell() {
  return (
    <section id="ocr-tool" className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
      <h2 className="sr-only">PDF to text converter</h2>
      <div className="ocr-tool-shell p-4 sm:p-6 lg:p-8">
        <label htmlFor="pdf-file-input" className="block text-lg font-bold text-slate-900">
          Upload a scanned PDF
        </label>
        <p className="mt-2 text-sm text-slate-600">
          PDF only · up to {MAX_PDF_PAGES} pages · max {MAX_PDF_SIZE_MB} MB
        </p>
        <input
          id="pdf-file-input"
          type="file"
          accept={ACCEPTED_PDF_ACCEPT_ATTR}
          className="mt-4 block w-full max-w-xl text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-50 file:px-3 file:py-2 file:font-semibold file:text-cyan-800"
        />
        <p className="mt-4 text-sm text-slate-500">Rendered pages and OCR results will appear here.</p>
      </div>
    </section>
  );
}

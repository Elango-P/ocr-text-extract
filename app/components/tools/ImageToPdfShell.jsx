import {
  ACCEPTED_IMAGE_TO_PDF_ACCEPT_ATTR,
  MAX_IMAGE_TO_PDF_SIZE_MB,
} from "../../lib/ocr/toolOptions";

export default function ImageToPdfShell() {
  return (
    <section id="ocr-tool" className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
      <h2 className="sr-only">Image to PDF converter</h2>
      <div className="ocr-tool-shell p-4 sm:p-6 lg:p-8">
        <label htmlFor="image-pdf-file-input" className="block text-lg font-bold text-slate-900">
          Convert images into a PDF
        </label>
        <p className="mt-2 text-sm text-slate-600">JPG, JPEG, PNG, or WEBP · multiple images · max {MAX_IMAGE_TO_PDF_SIZE_MB} MB each</p>
        <input
          id="image-pdf-file-input"
          type="file"
          accept={ACCEPTED_IMAGE_TO_PDF_ACCEPT_ATTR}
          multiple
          className="mt-4 block w-full max-w-xl text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-50 file:px-3 file:py-2 file:font-semibold file:text-cyan-800"
        />
        <p className="mt-4 text-sm text-slate-500">Your selected images and PDF settings will appear here.</p>
      </div>
    </section>
  );
}

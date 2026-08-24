import {
  ACCEPTED_IMAGE_ACCEPT_ATTR,
  MAX_BATCH_IMAGES,
  MAX_IMAGE_SIZE_MB,
  OCR_LANGUAGES,
} from "../lib/ocr/toolOptions";

/**
 * Server-rendered OCR controls. Used as the dynamic() loading fallback so the
 * first HTML includes a labeled file input instead of an empty spinner.
 */
export default function OCRToolShell() {
  return (
    <section id="ocr-tool" className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
      <h2 className="sr-only">OCR tool</h2>
      <div className="ocr-tool-shell p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-sm">
              <label
                htmlFor="ocr-language"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Document language
              </label>
              <p className="mb-2 text-xs text-slate-500">
                Must match the text in your image (e.g. English for Latin letters).
              </p>
              <select
                id="ocr-language"
                name="language"
                defaultValue="eng"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {OCR_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/95 p-8 text-center shadow-sm">
              <label htmlFor="ocr-file-input" className="block font-bold text-slate-800">
                Choose images
              </label>
              <p className="mt-1 text-sm text-slate-600">
                PNG, JPG, WEBP, GIF · up to {MAX_BATCH_IMAGES} images · max ~{MAX_IMAGE_SIZE_MB} MB
                each
              </p>
              <input
                id="ocr-file-input"
                name="images"
                type="file"
                accept={ACCEPTED_IMAGE_ACCEPT_ATTR}
                multiple
                className="mx-auto mt-4 block w-full max-w-sm text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-cyan-800"
              />
            </div>

            <button
              type="button"
              disabled
              className="flex w-full items-center justify-center rounded-xl bg-slate-400 p-3.5 font-bold text-white"
            >
              Extract Text
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Extracted text will appear here.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

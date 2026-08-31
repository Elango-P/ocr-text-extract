import {
  ACCEPTED_PDF_TYPES,
  MAX_PDF_BYTES,
  MAX_PDF_PAGES,
} from "../ocr/toolOptions";

const PDFJS_VERSION = "6.3.289";

function validatePdf(file) {
  const extensionOk = /\.pdf$/i.test(file?.name || "");
  const mimeOk = !file?.type || ACCEPTED_PDF_TYPES.split(",").includes(file.type);
  if (!file || !extensionOk || !mimeOk) {
    throw Object.assign(new Error("Please choose a PDF file with a .pdf extension."), {
      code: "INVALID_PDF_TYPE",
    });
  }
  if (file.size > MAX_PDF_BYTES) {
    throw Object.assign(new Error("This PDF is too large for browser processing."), {
      code: "PDF_TOO_LARGE",
    });
  }
}

async function loadPdf(file) {
  validatePdf(file);
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc =
    `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;
  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({ data, password: "" });
  try {
    return { pdf: await loadingTask.promise, loadingTask };
  } catch (error) {
    await loadingTask.destroy().catch(() => {});
    if (error?.name === "PasswordException") {
      throw Object.assign(new Error("This PDF is encrypted or password protected."), {
        code: "PDF_ENCRYPTED",
      });
    }
    throw Object.assign(new Error("The PDF could not be opened. It may be corrupted."), {
      code: "PDF_CORRUPT",
      cause: error,
    });
  }
}

async function destroyPdf({ pdf, loadingTask }) {
  // PDF.js v6 removed PDFDocumentProxy.destroy(); the loading task owns the
  // worker teardown. Keep cleanup compatible with older versions as well.
  if (typeof pdf?.cleanup === "function") pdf.cleanup();
  if (typeof loadingTask?.destroy === "function") await loadingTask.destroy();
}

export async function getPdfPageCount(file) {
  const documentRef = await loadPdf(file);
  const { pdf } = documentRef;
  try {
    if (!pdf.numPages) {
      throw Object.assign(new Error("This PDF does not contain any pages."), {
        code: "PDF_EMPTY",
      });
    }
    if (pdf.numPages > MAX_PDF_PAGES) {
      throw Object.assign(
        new Error(`This PDF has ${pdf.numPages} pages. Select a PDF with ${MAX_PDF_PAGES} pages or fewer.`),
        { code: "PDF_TOO_MANY_PAGES" }
      );
    }
    return pdf.numPages;
  } finally {
    await destroyPdf(documentRef);
  }
}

export async function renderPdfPages(
  file,
  { startPage = 1, endPage, onProgress = () => {}, signal } = {}
) {
  const documentRef = await loadPdf(file);
  const { pdf } = documentRef;
  const lastPage = endPage || pdf.numPages;
  const firstPage = Math.max(1, Math.min(startPage, pdf.numPages));
  const finalPage = Math.max(firstPage, Math.min(lastPage, pdf.numPages));
  const pages = [];

  try {
    for (let pageNumber = firstPage; pageNumber <= finalPage; pageNumber += 1) {
      if (signal?.aborted) {
        throw Object.assign(new Error("Cancelled"), { code: "CANCELLED" });
      }
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { alpha: false });
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: context, viewport }).promise;
      pages.push({
        number: pageNumber,
        preview: canvas.toDataURL("image/png"),
      });
      canvas.width = 0;
      canvas.height = 0;
      page.cleanup();
      onProgress(Math.round(((pageNumber - firstPage + 1) / (finalPage - firstPage + 1)) * 35));
    }
    return pages;
  } finally {
    await destroyPdf(documentRef);
  }
}

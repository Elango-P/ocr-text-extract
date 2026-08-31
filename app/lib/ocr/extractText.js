/**
 * Shared single-image OCR entry point for page-specific tools.
 * It keeps the network path and browser fallback consistent without importing
 * Tesseract until a user actually starts recognition.
 */
export async function requestCloudOcr({
  dataUrl,
  language = "eng",
  signal,
  onProgress = () => {},
  onQuota = () => {},
}) {
  onProgress(15);
  const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl || "");
  if (!match) throw new Error("Invalid image data");

  const response = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: match[2],
          mimeType: match[1],
          language,
        }),
        signal,
  });
  const payload = await response.json().catch(() => ({}));
  if (typeof payload.remaining === "number") {
    onQuota({ remaining: payload.remaining, limit: payload.limit ?? 10 });
  }
  if (!response.ok) {
    const error = new Error(payload.error || "AI OCR failed");
    error.code = payload.code || "GEMINI_ERROR";
    throw error;
  }
  const text = String(payload.text || "").trim();
  if (!text) {
    const error = new Error("No text from AI OCR");
    error.code = "NO_TEXT";
    throw error;
  }
  onProgress(60);
  return { text, engine: "ai", remaining: payload.remaining, limit: payload.limit };
}

export async function extractImageText({
  dataUrl,
  language = "eng",
  localOnly = false,
  signal,
  onProgress = () => {},
  onQuota = () => {},
}) {
  if (!dataUrl) throw new Error("No image data to recognize");

  if (!localOnly) {
    try {
      return await requestCloudOcr({ dataUrl, language, signal, onProgress, onQuota });
    } catch (error) {
      if (error?.name === "AbortError") {
        throw Object.assign(new Error("Cancelled"), { code: "CANCELLED" });
      }
      if (error?.code === "CANCELLED") throw error;
      // The browser fallback is intentional: an unavailable AI request should
      // not prevent a user from completing a local OCR job.
      console.warn("AI OCR failed, falling back to browser OCR:", error);
    }
  }

  onProgress(30);
  const { createWorker, OEM, PSM } = await import("tesseract.js");
  const worker = await createWorker(language, OEM.LSTM_ONLY, {
    workerPath: "https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/worker.min.js",
    logger: (message) => {
      if (message.status === "recognizing text") {
        onProgress(45 + Math.round(message.progress * 50));
      }
    },
  });

  try {
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.AUTO,
      preserve_interword_spaces: "1",
      user_defined_dpi: "300",
    });
    if (signal?.aborted) {
      throw Object.assign(new Error("Cancelled"), { code: "CANCELLED" });
    }
    const result = await worker.recognize(dataUrl);
    const text = String(result?.data?.text || "").trim();
    onProgress(100);
    return {
      text,
      engine: "browser",
      confidence: result?.data?.confidence ?? null,
    };
  } finally {
    await worker.terminate();
  }
}

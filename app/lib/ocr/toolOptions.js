/** Shared OCR widget options — keep the SSR shell and the client tool in sync. */

export const MAX_BATCH_IMAGES = 10;
export const MAX_IMAGE_SIZE_MB = 8;
export const MAX_IMAGE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = "image/png,image/jpeg,image/webp,image/gif";
export const ACCEPTED_IMAGE_ACCEPT_ATTR =
  "image/png,image/jpeg,image/webp,image/gif,.png,.jpg,.jpeg,.webp,.gif";
export const MAX_PDF_SIZE_MB = 32;
export const MAX_PDF_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;
export const MAX_PDF_PAGES = 25;
export const ACCEPTED_PDF_TYPES = "application/pdf";
export const ACCEPTED_PDF_ACCEPT_ATTR = "application/pdf,.pdf";
export const MAX_IMAGE_TO_PDF_SIZE_MB = 20;
export const MAX_IMAGE_TO_PDF_BYTES = MAX_IMAGE_TO_PDF_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TO_PDF_TYPES = "image/png,image/jpeg,image/webp";
export const ACCEPTED_IMAGE_TO_PDF_ACCEPT_ATTR =
  "image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp";

export const OCR_LANGUAGES = [
  { code: "eng", name: "English" },
  { code: "spa", name: "Spanish" },
  { code: "fra", name: "French" },
  { code: "deu", name: "German" },
  { code: "ita", name: "Italian" },
  { code: "por", name: "Portuguese" },
  { code: "rus", name: "Russian" },
  { code: "chi_sim", name: "Chinese (Simplified)" },
  { code: "jpn", name: "Japanese" },
  { code: "kor", name: "Korean" },
  { code: "ara", name: "Arabic" },
  { code: "hin", name: "Hindi" },
];

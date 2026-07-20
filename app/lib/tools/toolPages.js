/**
 * Registry for dedicated OCR tool landing pages.
 * Keep this list lean — overlapping keyword tools hurt AdSense “low value” reviews.
 * Long-form copy lives in ./content/*.js — keep paragraphs unique across tools.
 */

import { imageToText } from "./content/imageToText";
import { jpgToText } from "./content/jpgToText";
import { pdfToText } from "./content/pdfToText";
import { handwritingToText } from "./content/handwritingToText";
import { jpegToText } from "./content/jpegToText";
import { photoToText } from "./content/photoToText";
import { scannedPdfToText } from "./content/scannedPdfToText";

export const toolPages = [
  imageToText, 
  jpgToText, 
  pdfToText, 
  handwritingToText,
  jpegToText,
  photoToText,
  scannedPdfToText
];

export function getAllToolPages() {
  return toolPages;
}

export function getToolPage(slug) {
  return toolPages.find((t) => t.slug === slug) || null;
}

export function getRelatedTools(slug, limit = 4) {
  return toolPages.filter((t) => t.slug !== slug).slice(0, limit);
}

/**
 * Registry for dedicated OCR tool landing pages.
 * Keep this list lean — overlapping keyword tools hurt AdSense “low value” reviews.
 * Long-form copy lives in ./content/*.js — keep paragraphs unique across tools.
 */

import { imageToText } from "./content/imageToText";
import { screenshotToText } from "./content/screenshotToText";
import { receiptToText } from "./content/receiptToText";
import { scannedDocumentToText } from "./content/scannedDocumentToText";
import { pdfToText } from "./content/pdfToText";
import { handwritingToText } from "./content/handwritingToText";
import { imageToWord } from "./content/imageToWord";
import { imageToPdf } from "./content/imageToPdf";

export const toolPages = [
  imageToText,
  screenshotToText,
  receiptToText,
  scannedDocumentToText,
  pdfToText,
  handwritingToText,
  imageToWord,
  imageToPdf,
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

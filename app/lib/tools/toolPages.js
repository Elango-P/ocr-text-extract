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
  const relatedBySlug = {
    "pdf-to-text": ["scanned-document-to-text", "image-to-pdf", "image-to-text", "image-to-word"],
    "image-to-pdf": ["pdf-to-text", "image-to-text", "image-to-word", "scanned-document-to-text"],
  };
  const preferred = relatedBySlug[slug] || [];
  const ordered = [
    ...preferred.map((item) => toolPages.find((tool) => tool.slug === item)).filter(Boolean),
    ...toolPages.filter((tool) => tool.slug !== slug && !preferred.includes(tool.slug)),
  ];
  return ordered.slice(0, limit);
}

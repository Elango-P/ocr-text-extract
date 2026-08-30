/**
 * Tool route paths for sitemap / nav without loading full article bodies.
 * Keep in sync with getAllToolPages() — thinner surface for AdSense quality.
 */
export const TOOL_ROUTES = [
  { slug: "image-to-text", path: "/image-to-text", label: "Image to Text" },
  { slug: "screenshot-to-text", path: "/screenshot-to-text", label: "Screenshot to Text" },
  { slug: "receipt-to-text", path: "/receipt-to-text", label: "Receipt to Text" },
  {
    slug: "scanned-document-to-text",
    path: "/scanned-document-to-text",
    label: "Scan to Text Converter",
  },
  { slug: "pdf-to-text", path: "/pdf-to-text", label: "PDF to Text" },
  { slug: "handwriting-to-text", path: "/handwriting-to-text", label: "Handwriting OCR" },
  { slug: "image-to-word", path: "/image-to-word", label: "Image to Word" },
  { slug: "image-to-pdf", path: "/image-to-pdf", label: "Image to PDF" },
];

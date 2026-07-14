/**
 * Tool route paths for sitemap / nav without loading full article bodies.
 * Keep in sync with getAllToolPages() — thinner surface for AdSense quality.
 */
export const TOOL_ROUTES = [
  { slug: "image-to-text", path: "/image-to-text", label: "Image to Text" },
  { slug: "jpg-to-text", path: "/jpg-to-text", label: "JPG to Text" },
  { slug: "pdf-to-text", path: "/pdf-to-text", label: "PDF to Text" },
  { slug: "handwriting-to-text", path: "/handwriting-to-text", label: "Handwriting OCR" },
];

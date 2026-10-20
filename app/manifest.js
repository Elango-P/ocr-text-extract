import { SITE_NAME, SITE_URL } from "./lib/site";

export default function manifest() {
  return {
    name: `${SITE_NAME} – Free Image to Text`,
    short_name: "ImgToText",
    description:
      "Free online OCR tool to extract editable text from images, screenshots, receipts, handwritten notes, and PDFs.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#06b6d4",
    orientation: "portrait-primary",
    categories: ["productivity", "utilities", "tools"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Image to Text",
        short_name: "Image to Text",
        description: "Extract text from photos and graphics",
        url: "/image-to-text",
      },
      {
        name: "Screenshot to Text",
        short_name: "Screenshot OCR",
        description: "Extract text from screenshots and chat captures",
        url: "/screenshot-to-text",
      },
      {
        name: "Handwriting to Text",
        short_name: "Handwriting OCR",
        description: "Convert handwritten notes into editable text",
        url: "/handwriting-to-text",
      },
      {
        name: "PDF to Text",
        short_name: "PDF OCR",
        description: "Extract text from scanned PDF documents",
        url: "/pdf-to-text",
      },
      {
        name: "Receipt to Text",
        short_name: "Receipt OCR",
        description: "Extract line items and totals from bills and invoices",
        url: "/receipt-to-text",
      },
    ],
  };
}

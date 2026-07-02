import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: {
    default: "OCR Text Extractor — Free Image to Text",
    template: "%s | OCR Text Extractor",
  },
  description:
    "Extract text from images instantly with Tesseract.js. Multi-language OCR, modal-aware cleaning, and zero-upload privacy — runs entirely in your browser.",
  keywords: [
    "OCR",
    "image to text",
    "text extractor",
    "Tesseract",
    "free OCR online",
  ],
  openGraph: {
    title: "OCR Text Extractor",
    description: "Free browser-based image to text extraction.",
    type: "website",
    url: "https://ocr.elangodev.com",
  },
  alternates: {
    canonical: "https://ocr.elangodev.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

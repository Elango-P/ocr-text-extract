import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SiteLayout from "./components/SiteLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ocr.elangodev.com"),
  title: {
    default: "OCR Text Extractor — Free Image to Text Online",
    template: "%s | OCR Text Extractor",
  },
  description:
    "Free online OCR tool to extract text from images instantly. Multi-language support, smart preprocessing, and 100% browser-side privacy — no uploads, no signup.",
  keywords: [
    "OCR",
    "image to text",
    "text extractor",
    "free OCR online",
    "convert image to text",
    "Tesseract OCR",
    "screenshot to text",
  ],
  openGraph: {
    title: "OCR Text Extractor — Free Image to Text",
    description:
      "Extract text from images in your browser. Private, free, and supports 12+ languages.",
    type: "website",
    url: "https://ocr.elangodev.com",
    siteName: "OCR Text Extractor",
  },
  alternates: {
    canonical: "https://ocr.elangodev.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SiteLayout>{children}</SiteLayout>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

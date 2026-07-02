import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SiteLayout from "./components/SiteLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  themeColor: "#06b6d4",
  width: "device-width",
  initialScale: 1,
};

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
    "image to text converter",
    "picture to text",
  ],
  authors: [{ name: "Elango P", url: "https://elangodev.com" }],
  creator: "Elango P",
  publisher: "Elango P",
  openGraph: {
    title: "OCR Text Extractor — Free Image to Text Online",
    description:
      "Extract text from images in your browser. Private, free, and supports 12+ languages. 100% browser-side processing.",
    type: "website",
    url: "https://ocr.elangodev.com",
    siteName: "OCR Text Extractor",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OCR Text Extractor — Free Image to Text Online",
    description:
      "Extract text from images instantly in your browser. Private, free, and supports 12+ languages.",
    creator: "@elango_dev",
  },
  alternates: {
    canonical: "https://ocr.elangodev.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SiteLayout from "./components/SiteLayout";
import AdSenseScript from "./components/AdSenseScript";
import CookieConsent from "./components/CookieConsent";
import {
  SITE_URL,
  SITE_NAME,
  OPERATOR_NAME,
  OPERATOR_URL,
  GOOGLE_SITE_VERIFICATION,
} from "./lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OCR Text Extractor — Free Image to Text Online",
    template: `%s | ${SITE_NAME}`,
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
  authors: [{ name: OPERATOR_NAME, url: OPERATOR_URL }],
  creator: OPERATOR_NAME,
  publisher: OPERATOR_NAME,
  openGraph: {
    title: "OCR Text Extractor — Free Image to Text Online",
    description:
      "Extract text from images in your browser. Private, free, and supports 12+ languages. 100% browser-side processing.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OCR Text Extractor — Free Image to Text Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OCR Text Extractor — Free Image to Text Online",
    description:
      "Extract text from images instantly in your browser. Private, free, and supports 12+ languages.",
    creator: "@elango_dev",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined,
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
        <AdSenseScript />
        <SiteLayout>{children}</SiteLayout>
        <CookieConsent />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

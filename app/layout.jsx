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
  ADSENSE_CLIENT_ID,
  GOOGLE_SITE_VERIFICATION,
} from "./lib/site";
import { buildSiteJsonLd } from "./lib/jsonLd";
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
  applicationName: SITE_NAME,
  category: "OCR, image to text, productivity",
  title: {
    default: "Free Online OCR Image to Text Converter | Extract Text from Images",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Extract text from images, screenshots, JPG, PNG, and scanned documents with a free online OCR converter. AI OCR, browser fallback, 12+ languages, no signup.",
  keywords: [
    "OCR",
    "image to text",
    "free OCR online",
    "extract text from image",
    "screenshot to text",
    "online OCR converter",
  ],
  authors: [{ name: OPERATOR_NAME, url: OPERATOR_URL }],
  creator: OPERATOR_NAME,
  publisher: OPERATOR_NAME,
  openGraph: {
    title: "Free Online OCR Image to Text Converter",
    description:
      "Extract editable text from screenshots, photos, JPG, PNG, and scanned documents. Free AI OCR with browser fallback and no signup.",
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
    title: "Free Online OCR Image to Text Converter",
    description:
      "Convert screenshots, photos, JPG, PNG, and scanned documents into editable text with free AI OCR.",
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
  const jsonLd = buildSiteJsonLd();

  return (
    <html lang="en">
      <head>
        {ADSENSE_CLIENT_ID ? (
          <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
        ) : null}
      </head>
      <body className={`${inter.className} antialiased`}>
        <script
          id="site-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteLayout>{children}</SiteLayout>
        <AdSenseScript />
        <CookieConsent />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/cookies",
        destination: "/cookie-policy",
        permanent: true,
      },
      // Thin tool cluster consolidation (AdSense low-value / duplicate intent)
      {
        source: "/jpeg-to-text",
        destination: "/image-to-text",
        permanent: true,
      },
      {
        source: "/jpg-to-text",
        destination: "/image-to-text",
        permanent: true,
      },
      {
        source: "/photo-to-text",
        destination: "/image-to-text",
        permanent: true,
      },
      {
        source: "/scanned-pdf-to-text",
        destination: "/pdf-to-text",
        permanent: true,
      },
      {
        source: "/blog/:slug(batch-ocr-without-losing-place|building-an-internal-ocr-playbook|clean-mode-explained|desk-setup-for-document-photos|form-fields-vs-full-page-ocr|from-ocr-text-to-translation|low-light-and-evening-scan-rescue|ocr-for-accessibility|ocr-for-multilingual-documents|ocr-for-nonprofit-field-reports|ocr-for-researchers-and-citations|ocr-for-teachers-lesson-prep|ocr-mistakes-that-cost-money|ocr-on-dark-mode-uis|quarterly-ocr-accuracy-retro|shipping-labels-and-packing-slips|table-extraction-after-ocr|webp-and-gif-to-text|when-screenshots-beat-the-camera)",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/png-to-text",
        destination: "/image-to-text",
        permanent: true,
      },
      {
        source: "/extract-text",
        destination: "/image-to-text",
        permanent: true,
      },
      {
        source: "/extract-text-from-image",
        destination: "/image-to-text",
        permanent: true,
      },
      // Invoices are covered in depth on the receipt page rather than given a
      // near-duplicate page of their own.
      {
        source: "/invoice-to-text",
        destination: "/receipt-to-text",
        permanent: true,
      },
      // Overlapping blog→canonical tool / stronger article redirects
      {
        source: "/blog/jpg-to-text-converter",
        destination: "/image-to-text",
        permanent: true,
      },
      {
        source: "/blog/png-to-text-converter",
        destination: "/blog/advanced-ocr-techniques",
        permanent: true,
      },
      {
        source: "/blog/image-to-text-without-installing-software",
        destination: "/blog/ultimate-guide-to-ocr-technology",
        permanent: true,
      },
      {
        source: "/blog/scan-documents-online",
        destination: "/blog/ocr-use-cases-and-workflows",
        permanent: true,
      },
      {
        source: "/blog/ocr-in-nodejs",
        destination: "/blog/ocr-for-developers",
        permanent: true,
      },
      {
        source: "/blog/comparing-ai-ocr-and-tesseract",
        destination: "/blog/ai-ocr-vs-traditional-ocr",
        permanent: true,
      },
      {
        source: "/blog/ocr-and-gdpr-style-thinking",
        destination: "/blog/ocr-privacy-uploaded-images",
        permanent: true,
      },
      {
        source: "/blog/ocr-accuracy-tips",
        destination: "/blog/ocr-accuracy-and-limitations",
        permanent: true,
      },
      {
        source: "/blog/ocr-security-privacy",
        destination: "/blog/ocr-privacy-uploaded-images",
        permanent: true,
      },
      // Thin content consolidation redirects (AdSense Low Value fix)
      {
        source: "/blog/:slug(what-is-ocr|how-to-extract-text-from-images|best-ocr-tools-2026|ocr-vs-manual-typing|ocr-vs-google-lens|free-online-ocr-checklist)",
        destination: "/blog/ultimate-guide-to-ocr-technology",
        permanent: true,
      },
      {
        source: "/blog/:slug(ocr-for-students|ocr-for-businesses|ocr-for-mobile|extract-text-from-receipts|invoice-ocr-workflow|passport-aadhaar-ocr-caution|digitize-old-books-ocr|whiteboard-ocr-tips|handwriting-ocr)",
        destination: "/blog/ocr-use-cases-and-workflows",
        permanent: true,
      },
      {
        source: "/blog/:slug(ocr-api-guide|ocr-for-developers-guide|ocr-in-javascript|ocr-using-python)",
        destination: "/blog/ocr-for-developers",
        permanent: true,
      },
      {
        source: "/blog/:slug(image-preprocessing-for-ocr|pdf-ocr-guide|convert-screenshots-to-editable-text)",
        destination: "/blog/advanced-ocr-techniques",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Practical CSP for Next.js + Google Fonts + AdSense + Tesseract CDN assets.
    // AdSense uses rotating subdomains — keep googlesyndication/doubleclick wildcards
    // or ads fail silently (unfilled slots are then hidden via CSS).
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.googletagservices.com https://*.googletagservices.com https://www.google.com https://adservice.google.com https://*.googleadservices.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.gstatic.com https://fundingchoicesmessages.google.com https://www.googletagmanager.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://*.adtrafficquality.google https://googleads.g.doubleclick.net https://*.doubleclick.net https://cdn.jsdelivr.net https://unpkg.com https://*.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "connect-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://www.google.com https://adservice.google.com https://*.googleadservices.com https://www.googleadservices.com https://partner.googleadservices.com https://www.googletagservices.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://*.adtrafficquality.google https://fundingchoicesmessages.google.com https://www.gstatic.com https://cdn.jsdelivr.net https://unpkg.com https://*.jsdelivr.net",
      "worker-src 'self' blob: https://cdn.jsdelivr.net https://unpkg.com https://*.jsdelivr.net",
      "child-src 'self' blob:",
      "frame-src 'self' https://googleads.g.doubleclick.net https://*.doubleclick.net https://tpc.googlesyndication.com https://*.googlesyndication.com https://www.google.com https://adservice.google.com https://*.googleadservices.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://*.adtrafficquality.google https://www.googletagservices.com",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

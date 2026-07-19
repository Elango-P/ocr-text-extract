/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
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
        source: "/png-to-text",
        destination: "/image-to-text",
        permanent: true,
      },
      {
        source: "/extract-text-from-image",
        destination: "/image-to-text",
        permanent: true,
      },
      // Overlapping blog→canonical tool / stronger article redirects
      {
        source: "/blog/jpg-to-text-converter",
        destination: "/jpg-to-text",
        permanent: true,
      },
      {
        source: "/blog/png-to-text-converter",
        destination: "/blog/convert-screenshots-to-editable-text",
        permanent: true,
      },
      {
        source: "/blog/image-to-text-without-installing-software",
        destination: "/blog/how-to-extract-text-from-images",
        permanent: true,
      },
      {
        source: "/blog/scan-documents-online",
        destination: "/blog/ocr-for-mobile",
        permanent: true,
      },
      {
        source: "/blog/ocr-in-nodejs",
        destination: "/blog/ocr-for-developers-guide",
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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.googletagservices.com https://*.googletagservices.com https://www.google.com https://adservice.google.com https://*.googleadservices.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.gstatic.com https://fundingchoicesmessages.google.com https://www.googletagmanager.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://*.adtrafficquality.google https://googleads.g.doubleclick.net https://*.doubleclick.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "connect-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://www.google.com https://adservice.google.com https://*.googleadservices.com https://www.googleadservices.com https://partner.googleadservices.com https://www.googletagservices.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://*.adtrafficquality.google https://fundingchoicesmessages.google.com https://www.gstatic.com https://cdn.jsdelivr.net https://unpkg.com https://*.jsdelivr.net",
      "worker-src 'self' blob:",
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

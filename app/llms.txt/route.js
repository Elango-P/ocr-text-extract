import { SITE_URL, SITE_NAME, OPERATOR_NAME, OPERATOR_URL } from "../lib/site";
import { TOOL_ROUTES } from "../lib/tools/toolRoutes";

export const dynamic = "force-static";

export async function GET() {
  const toolList = TOOL_ROUTES.map(
    (t) => `- [${t.label}](${SITE_URL}${t.path}): Extract text and export format.`
  ).join("\n");

  const markdown = `# ${SITE_NAME} (imgtotext.in)

> Free, privacy-first online OCR tool to extract editable text from images, screenshots, scanned documents, receipts, handwritten notes, and PDFs. Features client-side in-browser OCR (Tesseract.js) with Google Gemini AI OCR fallback. No sign-up required, no watermarks, and zero permanent server storage.

## Core Capabilities & Specifications
- **Hybrid OCR Engine:** 100% private in-browser WebAssembly OCR (Tesseract.js) runs client-side. Google Gemini 2.5 Flash cloud AI OCR provides high-accuracy fallback for cursive handwriting, low-contrast photos, and complex layouts.
- **Input Formats:** PNG, JPG, JPEG, WEBP, GIF, PDF.
- **Export Formats:** Plain text (.txt), Microsoft Word (.docx), and PDF (.pdf).
- **Supported Languages:** English, Tamil (தமிழ்), Hindi (हिंदी), Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified), Japanese, Korean, Arabic.
- **Data Privacy:** Images are never permanently archived or used for training. Browser OCR never uploads images anywhere; AI OCR processes requests transiently.
- **Fair Use:** 10 free AI OCR requests per day per IP address; browser OCR remains unlimited.

## Available Tools & Direct URLs
${toolList}

## Guides & Documentation
- [OCR Engine Benchmark (Gemini vs Tesseract)](${SITE_URL}/blog/ocr-engine-benchmark-gemini-vs-tesseract)
- [How to Digitize Documents in Indian Languages](${SITE_URL}/blog/how-to-digitize-documents-in-indian-languages)
- [How to Extract Tables from Images](${SITE_URL}/blog/how-to-extract-tables-from-images)
- [Ultimate Guide to OCR Technology](${SITE_URL}/blog/ultimate-guide-to-ocr-technology)
- [AI OCR vs Traditional OCR](${SITE_URL}/blog/ai-ocr-vs-traditional-ocr)
- [OCR Privacy & Uploaded Images](${SITE_URL}/blog/ocr-privacy-uploaded-images)
- [How to Improve OCR on Low-Quality Images](${SITE_URL}/blog/improve-ocr-low-quality-images)
- [Frequently Asked Questions](${SITE_URL}/faq)
- [How It Works](${SITE_URL}/how-it-works)

## Publisher & Operator
- Operator: ${OPERATOR_NAME} (${OPERATOR_URL})
- Canonical Domain: ${SITE_URL}
`;

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

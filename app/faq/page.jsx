import Script from "next/script";
import { SITE_URL, CONTACT_EMAIL } from "../lib/site";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about OCR Text Extractor — privacy, languages, accuracy, supported formats, and more.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

const faqs = [
  {
    q: "What is OCR?",
    a: "OCR (Optical Character Recognition) is technology that reads text inside images and converts it into editable, searchable characters. It is widely used for digitizing documents, reading screenshots, and automating data entry.",
  },
  {
    q: "Is OCR Text Extractor free?",
    a: "Yes, completely free. There is no signup, no credit card, no watermarks, and no daily usage limit.",
  },
  {
    q: "Are my images uploaded to your servers?",
    a: "No. All OCR processing happens in your browser using Tesseract.js and WebAssembly. Your images never leave your device.",
  },
  {
    q: "What image formats can I use?",
    a: "You can upload common image formats including PNG, JPG, JPEG, WEBP, and GIF. For best results, use clear, high-contrast images with readable text.",
  },
  {
    q: "Which languages are supported?",
    a: "The tool supports English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified), Japanese, Korean, Arabic, and Hindi. Select the language that matches your document before extracting.",
  },
  {
    q: "What is Clean Mode?",
    a: "Clean Mode applies smart layout reconstruction for full-page screenshots and automatically focuses on centered modals or dialogs in UI captures. It filters noisy regions like sidebars when possible. Turn it off for raw OCR output on simple images.",
  },
  {
    q: "How accurate is the text extraction?",
    a: "Accuracy depends on image quality, font clarity, language, and lighting. Printed text on clean scans typically scores highest. Handwriting, blurry photos, and decorative fonts are harder. Always proofread the output for important use cases.",
  },
  {
    q: "Can I use extracted text commercially?",
    a: "You may use text you extract from your own images for personal or commercial purposes, provided you have the right to use the original image content. We do not claim ownership of your input or output.",
  },
  {
    q: "Does it work on mobile phones?",
    a: "Yes. The tool works in modern mobile browsers. You can upload photos taken with your phone camera or from your gallery.",
  },
  {
    q: "Why is processing slow on the first run?",
    a: "Tesseract.js downloads language model files on first use. Subsequent extractions in the same session are usually faster because models are cached in your browser.",
  },
  {
    q: "Do you store my extracted text?",
    a: "No. Extracted text exists only in your browser session until you copy, download, or clear the page.",
  },
  {
    q: "Do you show ads?",
    a: "Yes. We use Google AdSense to help cover hosting and development costs. Ads are kept unobtrusive. See our Privacy Policy for cookie and advertising details.",
  },
  {
    q: "How do I contact you?",
    a: `Email ${CONTACT_EMAIL} or use the Contact page. We read every message about questions, feedback, or bug reports.`,
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Script
        id="faq-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Help</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Everything you need to know about using our free online OCR tool.
      </p>

      <div className="mt-10 space-y-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-bold text-slate-900 marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-cyan-600 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </article>
  );
}

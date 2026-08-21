import Script from "next/script";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import { SITE_URL, CONTACT_EMAIL } from "../lib/site";

export const metadata = {
  title: "FAQ — OCR Help & Answers",
  description:
    "Frequently asked questions about free online OCR: privacy, AI limits, formats, languages, accuracy, exports, ads, and troubleshooting.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "FAQ | OCR Text Extractor",
    description:
      "Answers about image-to-text OCR, privacy, daily AI limits, Clean Mode, and exports.",
    url: `${SITE_URL}/faq`,
  },
};

function stripFaqLinks(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function FaqAnswer({ text }) {
  const nodes = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match;
  let i = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const href = match[2];
    const label = match[1];
    const className = "font-semibold text-cyan-700 hover:underline";
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      nodes.push(
        <a key={i} href={href} className={className}>
          {label}
        </a>
      );
    } else {
      nodes.push(
        <Link key={i} href={href} className={className}>
          {label}
        </Link>
      );
    }
    last = match.index + match[0].length;
    i += 1;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <p className="mt-3 text-sm leading-relaxed text-slate-600">{nodes}</p>;
}

const faqs = [
  {
    q: "What is OCR?",
    a: "OCR (Optical Character Recognition) reads text inside images and converts it into editable, searchable characters. It is used for digitizing documents, reading screenshots, and speeding up data entry from photos.",
  },
  {
    q: "Is OCR Text Extractor free?",
    a: "Yes. There is no signup, no credit card, and no watermarks on exported text. AI OCR is limited to 10 uses per day per IP address; browser OCR remains available after that.",
  },
  {
    q: "Do you use cloud AI for OCR?",
    a: "Yes by default. Extract Text uses cloud AI OCR first (Google Gemini). If that request fails or returns no text, the tool falls back to Tesseract.js in your browser. You can also enable Local OCR only to skip the AI path. Details are in the [Privacy Policy](/privacy-policy).",
  },
  {
    q: "Can I keep recognition in my browser only?",
    a: "Yes. Turn on Local OCR only in the tool. Images then stay in your tab for Tesseract.js recognition and are not sent to Gemini through our API. Engine language files may still load from the network.",
  },
  {
    q: "Is there a daily limit on AI OCR?",
    a: "Yes, 10 AI OCR runs per day, resetting at UTC midnight. The count is kept per IP address rather than per person, so if several people share one office, campus, or home connection, they share the same allowance. When the limit is reached, Extract Text keeps working using browser-based Tesseract.js.",
  },
  {
    q: "Are my images uploaded to your servers?",
    a: "For AI OCR (the default), the image is sent through our server to Google’s AI service for that extraction. We do not permanently store uploads as a user archive. Local OCR only and the browser fallback do not upload the image for recognition. See the [Privacy Policy](/privacy-policy) and [Data Retention](/data-retention).",
  },
  {
    q: "What happens if AI OCR fails?",
    a: "The tool switches to the browser-based Tesseract.js pipeline with preprocessing so you can still extract text.",
  },
  {
    q: "What image formats can I use?",
    a: "PNG, JPG, JPEG, WEBP, and GIF. Use clear, high-contrast images. For scanned PDFs, export pages as images first.",
  },
  {
    q: "Can I upload a PDF file directly?",
    a: "Not as a multi-page PDF container today. Export or screenshot each page to PNG/JPG, then run OCR. The [PDF to Text](/pdf-to-text) guide explains the workflow.",
  },
  {
    q: "Which languages are supported?",
    a: "English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified), Japanese, Korean, Arabic, and Hindi. Select the language that matches your document.",
  },
  {
    q: "What is Clean Mode?",
    a: "Clean Mode helps full-page screenshots and document-style captures, including focusing on centered dialogs when possible. Turn it off for simple logos or single-line labels.",
  },
  {
    q: "How accurate is text extraction?",
    a: "It depends on sharpness, contrast, language, font, and print vs handwriting. Always proofread names, numbers, and critical wording.",
  },
  {
    q: "Can OCR read handwriting?",
    a: "Sometimes, especially neat print. Cursive and messy notes are unreliable. See [Handwriting to Text](/handwriting-to-text) for photo tips and expectations.",
  },
  {
    q: "Can I use extracted text commercially?",
    a: "You may use text extracted from images you have rights to use. We do not claim ownership of your input or output. Respect copyright and confidentiality.",
  },
  {
    q: "Does it work on mobile phones?",
    a: "Yes, in modern mobile browsers. Upload from the camera roll or take a photo and extract without installing a desktop app.",
  },
  {
    q: "Why is the first browser OCR run slow?",
    a: "AI OCR is usually quick. Browser fallback may download language data on first use; later runs in the same session are typically faster.",
  },
  {
    q: "Do you store my extracted text?",
    a: "No permanent archive. Text appears in your browser session until you copy, download, or leave the page.",
  },
  {
    q: "Do you show ads?",
    a: "This site may display ads (for example, through Google AdSense) when advertising is enabled. See the [Privacy Policy](/privacy-policy) and [Cookie Policy](/cookie-policy) for details and controls.",
  },
  {
    q: "How do I contact you?",
    a: `Email [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) or use the [Contact](/contact) page. We typically respond within 1–3 business days.`,
  },
  {
    q: "Who operates this site?",
    a: "Elango P operates OCR Text Extractor independently. See the [About](/about) page and [author profile](/author/elango-p) for mission and contact details.",
  },
  {
    q: "Is there a refund policy?",
    a: "The OCR tool is free — no paid plans are sold on the site today — so refunds do not apply. This is restated in the [Terms of Use](/terms).",
  },
  {
    q: "How do I download results?",
    a: "After extraction, use the download controls for TXT, DOCX, or PDF of the recognized text, or copy to the clipboard.",
  },
  {
    q: "Is there a word or character count?",
    a: "Yes. When text is present in the results panel, the tool shows word and character counts to help with quick checks.",
  },
  {
    q: "How many images can I process at once?",
    a: "You can batch up to ten images in one session.",
  },
  {
    q: "Why is output empty?",
    a: "The image may lack sharp text, the crop may be wrong, the language may not match, or the photo may be too dark. Retake, crop tighter, and retry. Allow fallback to finish if AI fails.",
  },
  {
    q: "Why does OCR invent wrong words?",
    a: "Engines guess from shapes and language priors. Unusual names and noisy images produce lookalikes. Compare against the image before trusting output.",
  },
  {
    q: "Should I OCR identity documents online?",
    a: "Be cautious. Mistakes on IDs are costly, and uploads have privacy implications. Prefer official channels for identity workflows. This free tool is for general convenience text, not ID verification systems.",
  },
  {
    q: "Is HTTPS used?",
    a: "Yes. The site is served over HTTPS. That protects data in transit to our servers; it does not remove the need to think about what you upload to AI OCR.",
  },
  {
    q: "What is the difference between JPG and PNG for OCR?",
    a: "PNG is often better for screenshots (lossless edges). JPG is common for camera photos. Improve capture quality rather than converting between formats.",
  },
  {
    q: "Can I extract text offline?",
    a: "Browser fallback runs in your browser after AI failure or quota exhaustion, but the site itself still loads from the network. For air-gapped needs, use local desktop OCR.",
  },
  {
    q: "Do you train AI on my images?",
    a: "We do not operate a training pipeline on your uploads. Cloud AI processing follows the provider’s terms named in the [Privacy Policy](/privacy-policy).",
  },
  {
    q: "How long do you retain data?",
    a: "See the [Data Retention Policy](/data-retention) for images, logs, cookies, and email correspondence timelines.",
  },
  {
    q: "Can I disable cookies?",
    a: "Use Cookie Settings on the site and your browser controls. Essential preferences may still be required for consent memory. Ad cookies follow Google’s controls when ads load.",
  },
  {
    q: "Does Clean Mode always improve results?",
    a: "No. It helps many screenshots and full-page scans. For tiny stickers or artistic type, raw mode can look better — try both.",
  },
  {
    q: "Can OCR preserve tables perfectly?",
    a: "Often not. You may get cell text without perfect column structure. Rebuild tables manually when layout matters.",
  },
  {
    q: "What export should I pick?",
    a: "TXT for plain archives and tickets, DOCX when someone will edit further, PDF when you need a shareable print of recovered text.",
  },
  {
    q: "Is this a replacement for enterprise document platforms?",
    a: "No. It is a practical utility for everyday images. Regulated industries usually need audited systems with retention and access controls.",
  },
  {
    q: "How do I improve phone photo OCR?",
    a: "Shoot square-on, use even light, fill the frame with text, avoid flash glare, and crop before upload. [Image to Text](/image-to-text) covers JPG photo tips (older jpg-to-text URLs redirect there).",
  },
  {
    q: "How do I OCR a screenshot dialog?",
    a: "Capture as PNG when possible, enable Clean Mode, upload on [Screenshot to Text](/screenshot-to-text) or [Image to Text](/image-to-text), then copy the dialog text.",
  },
  {
    q: "What browsers are supported?",
    a: "Current versions of Chrome, Edge, Firefox, and Safari on desktop and mobile. JavaScript must be enabled.",
  },
  {
    q: "Why mention Tesseract.js?",
    a: "It powers the browser fallback so extraction can continue when AI is unavailable. It is open-source software under the Apache License 2.0.",
  },
  {
    q: "Can teachers use this for worksheets?",
    a: "Yes for drafting digital versions of materials you have rights to use. Follow school copyright and privacy policies.",
  },
  {
    q: "Can developers paste stack traces from images?",
    a: "Yes — that is a common use case. Proofread paths and line numbers before applying fixes.",
  },
  {
    q: "Do you offer an OCR API for production apps?",
    a: "This site is a consumer web tool, not a general-purpose billed API product. See [OCR for Developers](/blog/ocr-for-developers) for patterns and when to use provider APIs.",
  },
  {
    q: "Where are tool-specific guides?",
    a: "Use [Image to Text](/image-to-text), [PDF to Text](/pdf-to-text), and [Handwriting to Text](/handwriting-to-text) — each has unique advice plus the same extractor. Older png-to-text, jpg-to-text, and extract-text URLs redirect to Image to Text.",
  },
  {
    q: "How do breadcrumbs and the sitemap help?",
    a: "They make pages easier to navigate for people and clearer for search engines. The XML sitemap lists indexable URLs including tools and blog posts.",
  },
  {
    q: "What if recognition mixes sidebar UI chrome with content?",
    a: "Crop tighter to the content region or rely on Clean Mode for centered dialogs, then re-extract.",
  },
  {
    q: "Can I translate OCR output?",
    a: "Yes — copy the text into your translator of choice. OCR and translation are separate steps; bad OCR will produce bad translations.",
  },
  {
    q: "Are results legal evidence?",
    a: "Treat OCR as a draft. Courts and employers usually require original documents or certified processes. See the [Disclaimer](/disclaimer).",
  },
  {
    q: "How do I report a bug?",
    a: `Email ${CONTACT_EMAIL} with browser, device, steps, and what you expected. Do not send confidential images unless necessary.`,
  },
  {
    q: "Where can I read accuracy tips in depth?",
    a: "See [How it works](/how-it-works), [OCR accuracy and limitations](/blog/ocr-accuracy-and-limitations), and the format-specific pages in [Related tools](/#related-tools).",
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
        text: stripFaqLinks(item.a),
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
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ" },
        ]}
      />
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Help</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        {faqs.length} answers about using our free online OCR tool, privacy, and exports. Still
        stuck?{" "}
        <Link href="/contact" className="font-semibold text-cyan-700 hover:underline">
          Contact us
        </Link>
        .
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
                <span className="text-cyan-600 transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </span>
            </summary>
            <FaqAnswer text={item.a} />
          </details>
        ))}
      </div>
    </article>
  );
}

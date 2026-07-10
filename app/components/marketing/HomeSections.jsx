import Link from "next/link";
import {
  Shield,
  Zap,
  Globe,
  FileImage,
  Receipt,
  BookOpen,
  Smartphone,
  Languages,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "AI first, private fallback",
    text: "We try cloud AI OCR first for accuracy. If that fails, Tesseract.js runs entirely in your browser.",
  },
  {
    icon: Languages,
    title: "12+ Languages",
    text: "Extract text from English, Spanish, French, German, Chinese, Japanese, Arabic, and more.",
  },
  {
    icon: Sparkles,
    title: "Smart Preprocessing",
    text: "Dual-pass image enhancement and adaptive thresholding improve accuracy on screenshots and scans.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    text: "Upload an image, pick a language, and get copy-ready text in seconds — no account required.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    text: "Use on desktop, tablet, or phone. No software install — just open the page and start extracting.",
  },
  {
    icon: Shield,
    title: "Free Forever",
    text: "No subscriptions, watermarks, or daily limits. A practical OCR tool you can rely on anytime.",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload your image",
    text: "Drag and drop a PNG, JPG, or screenshot — or click to browse from your device.",
  },
  {
    step: "02",
    title: "Choose language & settings",
    text: "Select the document language. Turn on Clean Mode for better layout on pages and UI screenshots.",
  },
  {
    step: "03",
    title: "Extract and export",
    text: "Click Extract Text, then copy to clipboard or download as a .txt file for editing.",
  },
];

const useCases = [
  {
    icon: FileImage,
    title: "Screenshots & UI text",
    text: "Pull text from app dialogs, error messages, and software screenshots without retyping.",
  },
  {
    icon: Receipt,
    title: "Receipts & invoices",
    text: "Digitize printed receipts, bills, and business documents for expense tracking or records.",
  },
  {
    icon: BookOpen,
    title: "Books & study notes",
    text: "Convert photographed textbook pages, handwritten notes, or printed articles into editable text.",
  },
  {
    icon: Smartphone,
    title: "Photos of signs & labels",
    text: "Read text from product labels, street signs, menus, and packaging when traveling or shopping.",
  },
];

const faqPreview = [
  {
    q: "Is this OCR tool really free?",
    a: "Yes. OCR Text Extractor is completely free with no signup, no watermarks, and no usage caps.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "For AI OCR, the image is sent securely to a Google AI service to extract text and is not stored by us. If AI OCR fails, recognition falls back to Tesseract.js in your browser and that pass stays on your device. See the Privacy Policy for provider details.",
  },
  {
    q: "What image formats are supported?",
    a: "You can upload common image formats including PNG, JPG, JPEG, WEBP, and GIF.",
  },
];

export default function HomeSections() {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 pb-20 sm:px-6">
      <section aria-labelledby="features-heading">
        <div className="mb-8 text-center">
          <h2 id="features-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            Why use our free OCR tool?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Built for students, freelancers, and anyone who needs fast image-to-text
            conversion without installing software.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-cyan-50 p-2.5 text-cyan-600">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-heading" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <div className="mb-8">
          <h2 id="how-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            How to extract text from an image
          </h2>
          <p className="mt-2 text-slate-600">Three simple steps — no technical skills needed.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative">
              <span className="text-4xl font-black text-cyan-100">{item.step}</span>
              <h3 className="mt-2 font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700 hover:text-cyan-800"
          >
            Read the full guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="usecases-heading">
        <div className="mb-8">
          <h2 id="usecases-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            Popular use cases
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            OCR (Optical Character Recognition) turns pixels into readable, editable text. Here
            are the most common ways people use this tool.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="shrink-0 rounded-xl bg-teal-50 p-2.5 text-teal-600">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="accuracy-heading"
        className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10"
      >
        <h2 id="accuracy-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Accuracy, formats, and limitations
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-bold text-slate-900">Best results</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Clear screenshots, high-contrast scans, and well-lit photos of printed text usually
              work best. Choose the correct document language before extracting.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Supported formats</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Upload PNG, JPG, JPEG, WEBP, or GIF. Crop to the text area when possible, and keep
              the image sharp enough that characters are readable by eye.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">What to expect</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Handwriting, decorative fonts, blur, and heavy glare can reduce accuracy. Always
              proofread before using OCR output for important work.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-preview-heading" className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="faq-preview-heading" className="text-2xl font-black sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-slate-300">Quick answers before you start extracting text.</p>
          </div>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"
          >
            View all FAQs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {faqPreview.map((item) => (
            <div key={item.q} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <h3 className="font-bold text-white">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-teal-50 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
          Ready to convert your image to text?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Scroll up to the tool, upload an image, and get editable text in seconds — free, with
          AI OCR and a browser fallback.
        </p>
        <a
          href="#ocr-tool"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110"
        >
          Try the OCR tool now
        </a>
      </section>
    </div>
  );
}

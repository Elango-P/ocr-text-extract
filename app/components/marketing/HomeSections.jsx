import Image from "next/image";
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
    title: "AI first, browser fallback",
    text: "We try cloud AI OCR first for accuracy. If that fails or the daily AI limit is reached, Tesseract.js runs in your browser.",
  },
  {
    icon: Languages,
    title: "12+ Languages",
    text: "Extract text from English, Spanish, French, German, Chinese, Japanese, Arabic, Hindi, and more — pick the language that matches your document.",
  },
  {
    icon: Sparkles,
    title: "Smart Preprocessing",
    text: "Dual-pass image enhancement and adaptive thresholding improve accuracy on screenshots, scans, and uneven lighting.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    text: "Upload an image, pick a language, and get copy-ready text in seconds — no account required.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    text: "Use on desktop, tablet, or phone. No software install — open the page and start extracting.",
  },
  {
    icon: Shield,
    title: "Free to use",
    text: "No subscriptions or watermarks. AI OCR has a fair daily cap; browser OCR remains available after that.",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload your image",
    text: "Drag and drop a PNG, JPG, WEBP, or GIF — or click to browse from your device. A clear preview shows exactly what will be processed.",
  },
  {
    step: "02",
    title: "Choose language & settings",
    text: "Select the document language so recognition targets the right script. Turn on Clean Mode for screenshots and multi-column layouts.",
  },
  {
    step: "03",
    title: "Extract and export",
    text: "Click Extract Text, review the output, then copy to your clipboard or download a plain .txt file for editing elsewhere.",
  },
];

const useCases = [
  {
    icon: FileImage,
    title: "Screenshots & UI text",
    text: "Pull text from app dialogs, error messages, and software screenshots without retyping. Useful for bug reports, support tickets, and documentation.",
  },
  {
    icon: Receipt,
    title: "Receipts & invoices",
    text: "Digitize printed receipts, bills, and business documents for expense tracking, bookkeeping, or searchable records.",
  },
  {
    icon: BookOpen,
    title: "Books & study notes",
    text: "Convert photographed textbook pages, printed articles, or study handouts into editable text you can paste into notes or flashcards.",
  },
  {
    icon: Smartphone,
    title: "Photos of signs & labels",
    text: "Read text from product labels, street signs, menus, and packaging when traveling, shopping, or comparing ingredients.",
  },
];

const searchTopics = [
  {
    title: "JPG and PNG to text",
    text: "Convert JPG, JPEG, and PNG images into editable text for notes, emails, spreadsheets, and documents. Clear screenshots and high-contrast photos usually give the best OCR results.",
  },
  {
    title: "Screenshot to text",
    text: "Extract text from app screenshots, browser errors, chat images, settings pages, and UI dialogs when the original text cannot be selected or copied.",
  },
  {
    title: "Scanned document OCR",
    text: "Turn scanned letters, forms, invoices, receipts, and printed pages into searchable text. Crop the image around the document for cleaner recognition.",
  },
  {
    title: "Photo to text converter",
    text: "Take a phone photo of a label, menu, sign, book page, or handwritten note and recover the wording as text you can copy, translate, or save.",
  },
  {
    title: "Multi-language OCR",
    text: "Choose the matching language before extraction to improve results for English, Spanish, French, German, Arabic, Hindi, Chinese, Japanese, Korean, and more.",
  },
  {
    title: "Free OCR without signup",
    text: "Use the OCR converter directly in your browser. AI OCR handles difficult images first, and the browser fallback keeps basic image-to-text conversion available.",
  },
];

const faqPreview = [
  {
    q: "Is this OCR tool really free?",
    a: "Yes. There is no signup and no watermarks. AI OCR is limited to 10 uses per visitor per day; browser OCR remains available after that.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "For AI OCR, the image is sent securely to a Google AI service to extract text and is not stored by us. If AI OCR fails, recognition falls back to Tesseract.js in your browser. See the Privacy Policy for provider details.",
  },
  {
    q: "What image formats are supported?",
    a: "You can upload common image formats including PNG, JPG, JPEG, WEBP, and GIF.",
  },
  {
    q: "How can I improve OCR accuracy?",
    a: "Use a sharp, well-lit image, crop closely around the text, choose the correct language, and enable Clean Mode for screenshots or document-style captures.",
  },
];

const tipList = [
  "Crop tightly around the text you need so the engine focuses on characters, not background clutter.",
  "Prefer well-lit photos with the page flat and in focus — avoid heavy shadows and motion blur.",
  "Match the language setting to the script in the image (for example, English for Latin letters).",
  "Use Clean Mode for full-page screenshots and UI dialogs; turn it off for simple logos or single-line labels.",
  "If AI OCR hits the daily limit, keep extracting with the browser fallback — it still works offline from the AI path.",
  "Always proofread before using OCR output for legal, medical, financial, or graded work.",
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

      <section aria-labelledby="what-is-ocr-heading" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <h2 id="what-is-ocr-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          What is OCR and when should you use it?
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            Optical Character Recognition (OCR) is the process of turning text that exists only as
            pixels in an image into characters you can select, copy, search, and edit. Before OCR,
            the only options were retyping by hand or keeping a static screenshot. With an online
            image-to-text tool, you can recover wording from a photo, scan, or screen capture in
            seconds and paste it into email, docs, spreadsheets, or code comments.
          </p>
          <p>
            People reach for OCR when the original file is not available as a document — for
            example, a paper receipt, a textbook page photographed on a phone, a software error
            dialog that cannot be copied, or a shipping label photographed in a warehouse. OCR is
            also helpful when you need to translate printed text, archive paper records, or make
            scanned PDFs searchable after exporting the recognized text.
          </p>
          <p>
            OCR Text Extractor is designed for those everyday cases. You stay on a single page:
            upload an image, choose the language, extract, then copy or download. There is no
            account wall and no desktop installer. Cloud AI OCR handles many difficult layouts
            first; if that path is unavailable or you have reached the daily AI allowance, the
            built-in browser engine continues the job locally so you are not blocked mid-task.
          </p>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <div className="mb-8">
          <h2 id="how-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            How to extract text from an image
          </h2>
          <p className="mt-2 text-slate-600">
            Three simple steps — no technical skills needed. Most extractions finish in a few
            seconds once the image is ready.
          </p>
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

      <section aria-labelledby="examples-heading">
        <div className="mb-8">
          <h2 id="examples-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            Examples of images that work well
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            OCR performs best when characters are sharp and high-contrast. These are the kinds of
            inputs people convert most often with this tool.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/ocr-screenshot-example.webp"
              alt="Laptop showing a software dialog screenshot with readable on-screen text ready for OCR"
              width={800}
              height={450}
              className="h-48 w-full object-cover"
            />
            <figcaption className="p-4 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-slate-900">UI screenshots</span>
              <br />
              Capture error messages, settings panels, and dialogs, then extract the wording for
              tickets or docs without retyping.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/ocr-document-scan.webp"
              alt="Printed invoice document on a desk photographed for image-to-text conversion"
              width={800}
              height={600}
              className="h-48 w-full object-cover"
            />
            <figcaption className="p-4 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-slate-900">Paper documents</span>
              <br />
              Digitize invoices, forms, and printed letters so totals, dates, and addresses become
              editable text.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/ocr-phone-photo.webp"
              alt="Smartphone photographing a printed menu or label to extract text with OCR"
              width={600}
              height={800}
              className="h-48 w-full object-cover"
            />
            <figcaption className="p-4 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-slate-900">Phone photos</span>
              <br />
              Snap menus, labels, and signs on the go, then convert the photo into text you can
              paste into notes or translators.
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="usecases-heading">
        <div className="mb-8">
          <h2 id="usecases-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            Popular use cases
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            OCR turns pixels into readable, editable text. Here are the most common ways people
            use this free image-to-text converter.
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
        aria-labelledby="seo-topics-heading"
        className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10"
      >
        <div className="mb-8">
          <h2 id="seo-topics-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            Image to text tools for common OCR searches
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Whether you need JPG to text, PNG to text, screenshot OCR, receipt OCR, or scanned
            document text extraction, the workflow is the same: upload the image, choose the
            language, and copy the recognized text.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {searchTopics.map((topic) => (
            <article key={topic.title} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">{topic.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{topic.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="processing-heading"
        className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10"
      >
        <h2 id="processing-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          How processing works (AI OCR and browser fallback)
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            When you click Extract Text, the tool first attempts cloud AI OCR. That path is often
            stronger on complex layouts, mixed fonts, and lower-quality photos. The image is sent
            through our server to the AI provider only for that extraction request. We do not keep
            a permanent archive of your uploads. Provider details are listed in the{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p>
            To keep the service sustainable and fair, AI OCR is limited to ten uses per visitor
            per day. If the AI request fails, returns no text, or you have reached the daily AI
            allowance, the tool automatically switches to browser-based OCR powered by Tesseract.js.
            That fallback runs in your browser with preprocessing steps such as upscaling, contrast
            enhancement, and adaptive thresholding — especially helpful for screenshots and scans.
          </p>
          <p>
            Clean Mode is aimed at screenshots and document-style captures. It can improve reading
            order and focus on centered dialogs. For simple logos, single-line stickers, or artistic
            type, turning Clean Mode off often produces a cleaner raw result. Either way, you can
            copy the output or download a .txt file without creating an account.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="tips-heading"
        className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-10"
      >
        <h2 id="tips-heading" className="text-2xl font-black sm:text-3xl">
          Tips for better OCR accuracy
        </h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          Small changes to the source image usually improve recognition more than changing tools.
          Use this checklist before you extract.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {tipList.map((tip) => (
            <li
              key={tip}
              className="rounded-xl bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-200 ring-1 ring-white/10"
            >
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="accuracy-heading"
        className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10"
      >
        <h2 id="accuracy-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Accuracy, formats, and limitations
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          No OCR engine is perfect. Results depend on resolution, contrast, language, font style,
          and whether the text is printed or handwritten. Treat extracted text as a draft: verify
          names, numbers, and critical wording before you rely on them.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-bold text-slate-900">Best results</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Clear screenshots, high-contrast scans, and well-lit photos of printed text usually
              work best. Choose the correct document language before extracting. Straight-on photos
              of flat pages outperform angled shots of curved surfaces.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Supported formats</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Upload PNG, JPG, JPEG, WEBP, or GIF. Crop to the text area when possible, and keep
              the image sharp enough that characters are readable by eye. Extremely large files may
              need resizing for faster AI OCR.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">What to expect</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Handwriting, decorative fonts, blur, heavy glare, and dense tables can reduce
              accuracy. Multi-column magazines and low-light phone photos may need a second pass or
              a tighter crop. Always proofread before important use.
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            If recognition looks incomplete, try a higher-resolution crop, switch languages, toggle
            Clean Mode, or re-photograph under brighter light. When AI OCR is unavailable, the
            browser fallback still applies preprocessing and can recover text from many everyday
            screenshots and scans — it may simply take longer on the first run while language data
            loads.
          </p>
          <p>
            This site is a practical utility, not a replacement for professional document
            digitization services used in regulated industries. For archival projects with thousands
            of pages, dedicated scanning hardware and batch software may be a better fit. For quick
            one-off conversions — the receipt in your wallet, the error on your screen, the page in
            your textbook — a browser OCR tool is usually enough.
          </p>
        </div>
      </section>

      <section aria-labelledby="who-heading" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <h2 id="who-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Who this tool is for
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            Students use image-to-text conversion to capture quotes from printed materials and move
            them into study notes. Freelancers and support teams extract wording from client
            screenshots when building tickets or reproducing bugs. Travelers photograph menus and
            signs, then paste the text into translators. Small-business owners digitize receipts
            for expense reports without buying a dedicated scanner.
          </p>
          <p>
            If you only need occasional conversions, a free online OCR page is often simpler than
            installing desktop software. If you need maximum privacy for a sensitive document, prefer
            the browser fallback path when available and avoid uploading confidential material to any
            cloud service — including this one&apos;s AI OCR path. When in doubt, review the{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>{" "}
            and use local tools for highly sensitive files.
          </p>
          <p>
            Questions, feedback, or bug reports are welcome on the{" "}
            <Link href="/contact" className="font-semibold text-cyan-700 hover:underline">
              Contact
            </Link>{" "}
            page. For step-by-step detail on preprocessing and Clean Mode, see{" "}
            <Link href="/how-it-works" className="font-semibold text-cyan-700 hover:underline">
              How it works
            </Link>
            . Broader product questions are covered in the{" "}
            <Link href="/faq" className="font-semibold text-cyan-700 hover:underline">
              FAQ
            </Link>
            .
          </p>
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
          AI OCR and a browser fallback when you need it.
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

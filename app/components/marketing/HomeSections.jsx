import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Zap,
  Globe,
  Receipt,
  BookOpen,
  Languages,
  Lock,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Code2,
  Scale,
  HeartPulse,
  Landmark,
  PenLine,
  ScanSearch,
} from "lucide-react";
import { getAllPosts } from "../../lib/blog/posts";

/** Lightweight tool link list — avoid importing full tool content modules on the homepage. */
const relatedToolLinks = [
  { href: "/image-to-text", label: "Image to Text Converter" },
  { href: "/screenshot-to-text", label: "Screenshot to Text" },
  { href: "/receipt-to-text", label: "Receipt to Text" },
  { href: "/scanned-document-to-text", label: "Scan to Text Converter" },
  { href: "/pdf-to-text", label: "Extract text from a scanned PDF" },
  { href: "/handwriting-to-text", label: "Handwriting to Text" },
  { href: "/image-to-word", label: "Image to Word (.docx)" },
  { href: "/image-to-pdf", label: "Convert images into a PDF" },
];

const features = [
  {
    icon: Lock,
    title: "AI first, browser fallback",
    text: "Cloud AI OCR runs first for tough layouts. If it fails or the daily AI cap is reached, Tesseract.js continues in your browser.",
  },
  {
    icon: Languages,
    title: "12+ languages",
    text: "English, Spanish, French, German, Chinese, Japanese, Arabic, Hindi, and more — match the script before you extract.",
  },
  {
    icon: Sparkles,
    title: "Smart preprocessing",
    text: "Dual-pass enhancement and adaptive thresholding improve screenshots, scans, and uneven lighting on the fallback path.",
  },
  {
    icon: Zap,
    title: "Fast everyday results",
    text: "Upload, choose a language, extract, then copy or download — built for minutes-long tasks, not enterprise batch farms.",
  },
  {
    icon: Globe,
    title: "Works on your devices",
    text: "Desktop, tablet, or phone browser. No installers and no mandatory account wall.",
  },
  {
    icon: Shield,
    title: "Free to use",
    text: "No subscriptions or watermarks on exported text. AI OCR has a fair daily cap; browser OCR remains available after that.",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload your image",
    text: "Drag and drop PNG, JPG, WEBP, or GIF — or browse from your device. Preview confirms what will be processed.",
  },
  {
    step: "02",
    title: "Choose language & settings",
    text: "Select the document language. Turn on Clean Mode for screenshots and multi-column layouts.",
  },
  {
    step: "03",
    title: "Extract and export",
    text: "Review the output, copy it, or download TXT, DOCX, or PDF of the recognized text.",
  },
];

const benefits = [
  {
    title: "Stop retyping trapped text",
    text: "Screenshots, paper photos, and scans stop being dead pixels. You get characters you can search and edit.",
  },
  {
    title: "Work without an installer",
    text: "Open the site, drop a file, leave. Ideal when you cannot install desktop OCR on a locked work machine.",
  },
  {
    title: "Hybrid accuracy path",
    text: "AI handles many hard photos; browser OCR keeps you productive when cloud capacity is temporarily unavailable.",
  },
  {
    title: "Exports that fit real workflows",
    text: "Plain text for tickets, DOCX for editing, PDF when you need a shareable print of recovered wording.",
  },
];

const fileTypes = [
  { name: "PNG", note: "Best for lossless screenshots and UI dialogs." },
  { name: "JPG / JPEG", note: "Default for phone photos of paper, signs, and receipts." },
  { name: "WEBP", note: "Modern web captures and compressed stills." },
  { name: "GIF", note: "Still frames from GIFs; animation is not read as video." },
  {
    name: "PDF files (PDF to Text)",
    note: "Upload scanned PDFs directly on the PDF to Text page; image OCR remains available for raster page files.",
  },
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese (Simplified)",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
];

const devices = [
  {
    title: "Laptops & desktops",
    text: "Drag-and-drop from Finder, Explorer, or Downloads. Largest keyboard-friendly surface for proofreading.",
  },
  {
    title: "Tablets",
    text: "Upload from camera roll after photographing worksheets or whiteboards in class or workshops.",
  },
  {
    title: "Phones",
    text: "Shoot a page, open imgtotext.in in the mobile browser, extract, and paste into notes or translators.",
  },
];

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    text: "Capture textbook excerpts, homework boards, and lab notes into editable study material — then cite sources properly.",
  },
  {
    icon: BookOpen,
    title: "Teachers",
    text: "Reuse printed worksheets as digital drafts, build accessible text alternatives, and save retyping time.",
  },
  {
    icon: Code2,
    title: "Developers",
    text: "Pull stack traces and error dialogs from screenshots into tickets without transcription errors.",
  },
  {
    icon: Briefcase,
    title: "Businesses",
    text: "Digitize short stacks of receipts, forms, and supplier letters for searchable internal notes.",
  },
  {
    icon: Scale,
    title: "Legal offices",
    text: "Convenience drafts from non-confidential scans — verify every clause against originals before filing.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare admin",
    text: "Office paperwork convenience only; never treat OCR as a clinical dosage or records system of truth.",
  },
  {
    icon: Landmark,
    title: "Finance teams",
    text: "Draft figures from invoice photos into spreadsheets, then reconcile totals by human review.",
  },
  {
    icon: Receipt,
    title: "Receipts & invoices",
    text: "Thermal slips and printed invoices become text drafts for expenses — watch for faded ink and wrinkles.",
  },
  {
    icon: PenLine,
    title: "Handwriting",
    text: "Neat print works better than cursive. Expect proofreading; see the handwriting tool page for photo tips.",
  },
  {
    icon: ScanSearch,
    title: "Research papers & books",
    text: "Photograph or export page images to quote passages you have rights to use; respect copyright always.",
  },
];

const comparisonRows = [
  {
    feature: "Install required",
    us: "No",
    desktop: "Yes",
    phoneApp: "Usually",
  },
  {
    feature: "Account required",
    us: "No",
    desktop: "Sometimes",
    phoneApp: "Often",
  },
  {
    feature: "AI + browser fallback",
    us: "Yes",
    desktop: "Varies",
    phoneApp: "Varies",
  },
  {
    feature: "Best for",
    us: "Quick one-off images",
    desktop: "Huge archives",
    phoneApp: "On-device camera OCR",
  },
  {
    feature: "Privacy model",
    us: "AI first via Gemini; browser fallback (see Privacy)",
    desktop: "Often local",
    phoneApp: "Vendor-dependent",
  },
];

const homeFaqs = [
  {
    q: "Can I use this as an img to text converter?",
    a: "Yes. Upload a PNG, JPG, WEBP, or GIF and extract editable text in seconds — the same free img to text workflow as our dedicated Image to Text page.",
  },
  {
    q: "How do I capture text from an image?",
    a: "Upload or paste the image into the tool at the top of the page, pick the document language, run Extract Text, then copy or download the result.",
  },
  {
    q: "Is OCR Text Extractor free?",
    a: "Yes. No signup and no watermarks. AI OCR is limited to 10 uses per day per IP address; browser OCR remains available after that.",
  },
  {
    q: "Are my images stored forever?",
    a: (
      <>
        No permanent archive of uploads. By default, AI OCR sends images through our server to
        Google Gemini for that extraction request. See the{" "}
        <Link href="/privacy-policy" className="font-semibold text-cyan-200 hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/data-retention" className="font-semibold text-cyan-200 hover:underline">
          Data Retention
        </Link>{" "}
        pages.
      </>
    ),
  },
  {
    q: "What formats can I upload?",
    a: "PNG, JPG, JPEG, WEBP, and GIF. For scanned PDFs, export each page as an image first.",
  },
  {
    q: "How accurate is OCR?",
    a: "Accuracy depends on sharpness, contrast, language, and print vs handwriting. Always proofread critical numbers and names.",
  },
  {
    q: "Does the site show ads?",
    a: (
      <>
        Ads may appear when advertising is enabled (for example, via Google AdSense). Cookie
        choices are explained in the{" "}
        <Link href="/cookie-policy" className="font-semibold text-cyan-200 hover:underline">
          Cookie Policy
        </Link>
        .
      </>
    ),
  },
];

const tipList = [
  "Crop tightly around the text so the engine focuses on characters, not clutter.",
  "Prefer even light and a flat page — avoid glare and motion blur.",
  "Match the language setting to the script in the image.",
  "Use Clean Mode for full-page screenshots; turn it off for simple logos.",
  "If AI hits the daily limit, continue with browser OCR.",
  "Proofread before legal, medical, financial, or graded use.",
];

export default function HomeSections() {
  const latestPosts = getAllPosts().slice(0, 9);

  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 pb-20 pt-4 sm:px-6">
      <section id="features" aria-labelledby="features-heading">
        <div className="mb-8 text-center">
          <h2 id="features-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            Features that keep extraction practical
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Built for students, freelancers, and teams who need fast image-to-text without buying a
            document-management suite for a five-minute job.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-200/80 hover:bg-white"
            >
              <div className="mb-4 inline-flex rounded-xl bg-cyan-50 p-2.5 text-cyan-600">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="what-is-ocr-heading"
        className="surface-panel p-6 sm:p-10"
      >
        <h2 id="what-is-ocr-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          What is OCR?
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            Optical Character Recognition (OCR) turns writing that exists only as pixels into
            characters you can select, copy, search, and edit. Before OCR, your options were retyping
            or keeping a static picture. With a free online converter, you recover wording from a
            photo, scan, or screen capture and paste it into email, docs, spreadsheets, or code
            comments.
          </p>
          <p>
            People reach for OCR when the original editable file is missing: a paper receipt, a
            textbook page on a phone, a software dialog that cannot be copied, or a shipping label
            in a warehouse photo. OCR also helps when you need to translate printed words, archive
            paper records, or make scanned page images searchable after export.
          </p>
          <p>
            OCR Text Extractor keeps the workflow on one page: upload, choose language, extract,
            then copy or download. Cloud AI handles many difficult layouts first; if that path is
            unavailable or you reach the daily AI allowance, browser-based Tesseract.js continues so
            you are not blocked mid-task.             Deeper primers live in our{" "}
            <Link
              href="/blog/ultimate-guide-to-ocr-technology"
              className="font-semibold text-cyan-700 hover:underline"
            >
              Ultimate Guide to OCR Technology
            </Link>
            , the{" "}
            <Link href="/how-it-works" className="font-semibold text-cyan-700 hover:underline">
              How it works
            </Link>{" "}
            guide, and our{" "}
            <Link
              href="/blog/ocr-for-developers"
              className="font-semibold text-cyan-700 hover:underline"
            >
              JavaScript OCR guide for developers
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        aria-labelledby="how-heading"
        className="surface-panel p-6 sm:p-10"
      >
        <div className="mb-8">
          <h2 id="how-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            How OCR works on this site
          </h2>
          <p className="mt-2 text-slate-600">
            Three steps most people finish in under a minute once the image is ready.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative">
              <span className="text-4xl font-black text-cyan-100" aria-hidden="true">
                {item.step}
              </span>
              <h3 className="mt-2 font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            Behind the button, AI OCR attempts recognition via the provider listed in our Privacy
            Policy. Images are not kept as a permanent personal archive. If AI fails or returns no
            text, preprocessing (contrast, thresholding, and related steps) feeds Tesseract.js in
            your browser. Clean Mode targets screenshots and document-style captures; turn it off
            for logos and single-line stickers when raw output looks cleaner.
          </p>
        </div>
      </section>

      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Who it is for
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Built for quick one-off jobs—not enterprise document platforms. If you need editable text
          from a picture and cannot install software, start here.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {benefits.map((b) => (
            <article key={b.title} className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 backdrop-blur-sm">
              <h3 className="font-bold text-slate-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="formats-heading"
        className="surface-panel p-6 sm:p-10"
      >
        <h2 id="formats-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Supported file types
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Upload common raster images here, or use our dedicated PDF to Text workflow to render and
          OCR scanned PDF pages directly in your browser.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {fileTypes.map((f) => (
            <li
              key={f.name}
              className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200"
            >
              <span className="font-bold text-slate-900">{f.name}</span>
              <span className="mt-1 block">{f.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="languages-heading">
        <h2 id="languages-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Supported languages
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Pick the language that matches the dominant script before extracting. Mixed-script pages
          often need separate crops.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {languages.map((lang) => (
            <li
              key={lang}
              className="rounded-lg bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-800"
            >
              {lang}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="devices-heading"
        className="surface-panel p-6 sm:p-10"
      >
        <h2 id="devices-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Supported devices
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {devices.map((d) => (
            <article key={d.title}>
              <h3 className="font-bold text-slate-900">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="examples-heading">
        <div className="mb-8">
          <h2 id="examples-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            Examples of images that convert well
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            OCR prefers sharp, high-contrast characters. These are the inputs people convert most
            often here.
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
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <figcaption className="p-4 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-slate-900">UI screenshots</span>
              <br />
              Error messages, settings panels, and dialogs for tickets or docs.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/ocr-document-scan.webp"
              alt="Printed invoice document on a desk photographed for image-to-text conversion"
              width={800}
              height={600}
              className="h-48 w-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <figcaption className="p-4 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-slate-900">Paper documents</span>
              <br />
              Invoices, forms, and letters turned into editable drafts.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/ocr-phone-photo.webp"
              alt="Smartphone photographing a printed menu or label to extract text with OCR"
              width={600}
              height={800}
              className="h-48 w-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <figcaption className="p-4 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-slate-900">Phone photos</span>
              <br />
              Menus, labels, and signs captured on the go.
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="accuracy-heading">
        <h2 id="accuracy-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Accuracy: what to expect
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 backdrop-blur-sm">
            <h3 className="font-bold text-slate-900">Usually strong</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Clear screenshots, high-contrast scans, and well-lit photos of printed body text with
              the correct language selected.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 backdrop-blur-sm">
            <h3 className="font-bold text-slate-900">Variable</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Tables, multi-column magazines, faint thermal receipts, and low-light phone shots —
              crop and retake before blaming the engine.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 backdrop-blur-sm">
            <h3 className="font-bold text-slate-900">Often weak</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Messy cursive, decorative fonts, heavy glare, and tiny packaging legalese. Treat
              output as a draft.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="real-world-examples-heading">
        <div className="mb-8">
          <h2 id="real-world-examples-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
            How everyday inputs usually behave
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            These are qualitative expectations from typical use—not lab benchmarks or guaranteed
            scores. Always proofread before you rely on the output.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Thermal receipts</h3>
            <p className="mt-2 text-sm text-slate-600">
              Phone photos of crumpled or faded thermal paper often recover merchant names and
              line items, but totals and tiny fees need a careful check—folds and glare hide
              digits.
            </p>
            <p className="mt-4 text-xs font-semibold text-amber-700">Expect: usable draft, verify money fields</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">UI screenshots</h3>
            <p className="mt-2 text-sm text-slate-600">
              Sharp PNG captures of dialogs and settings panels are among the strongest inputs.
              Clean Mode helps reading order when the shot includes chrome and side panels.
            </p>
            <p className="mt-4 text-xs font-semibold text-emerald-700">Expect: usually strong on clear UI text</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Older book pages</h3>
            <p className="mt-2 text-sm text-slate-600">
              Yellowed paper, faded ink, and historical typography (including the long s) create
              more substitutions. Treat the extract as a starting draft for proofreading.
            </p>
            <p className="mt-4 text-xs font-semibold text-amber-700">Expect: more cleanup on damaged print</p>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="privacy-security-heading"
        className="surface-panel p-6 sm:p-10"
      >
        <h2
          id="privacy-security-heading"
          className="text-2xl font-black text-slate-900 sm:text-3xl"
        >
          Privacy, security, and AI OCR technology
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            When AI OCR runs, the image is sent through our server to Google Gemini for that
            extraction request. We do not market the product as “never leaves your device” for that
            path — that would be misleading. Details, cookies, and advertising are covered in the{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>
            ,{" "}
            <Link href="/cookie-policy" className="font-semibold text-cyan-700 hover:underline">
              Cookie Policy
            </Link>
            , and{" "}
            <Link
              href="/data-retention"
              className="font-semibold text-cyan-700 hover:underline"
            >
              Data Retention Policy
            </Link>
            .
          </p>
          <p>
            Browser fallback uses Tesseract.js with client-side preprocessing after AI failure or
            quota exhaustion. Highly sensitive files (medical charts, sealed legal discovery,
            sealed IDs) belong in offline, organization-approved tools — not a free public utility.
          </p>
          <p>
            Transport uses HTTPS. You are still responsible for what you upload and for verifying
            OCR output before high-stakes use. The{" "}
            <Link href="/disclaimer" className="font-semibold text-cyan-700 hover:underline">
              Disclaimer
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="font-semibold text-cyan-700 hover:underline">
              Terms of Use
            </Link>{" "}
            explain accuracy and acceptable-use limits.
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
        <p className="mt-6 text-sm text-slate-300">
          More depth:{" "}
          <Link
            href="/blog/improve-ocr-low-quality-images"
            className="font-semibold text-cyan-300 hover:underline"
          >
            preprocess images for OCR
          </Link>
          ,{" "}
          <Link
            href="/blog/ocr-engine-benchmark-gemini-vs-tesseract"
            className="font-semibold text-cyan-300 hover:underline"
          >
            measured Gemini vs Tesseract benchmark
          </Link>
          ,{" "}
          <Link
            href="/blog/ocr-accuracy-and-limitations"
            className="font-semibold text-cyan-300 hover:underline"
          >
            OCR accuracy and limitations
          </Link>
          , and{" "}
          <Link
            href="/blog/improve-ocr-low-quality-images"
            className="font-semibold text-cyan-300 hover:underline"
          >
            improving low-quality images
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="audiences-heading">
        <h2 id="audiences-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Use cases across roles and documents
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          One tool, many intents — from students and developers to receipts, books, and research
          page images.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-slate-200/70 bg-white/90 p-5 backdrop-blur-sm"
            >
              <div className="shrink-0 rounded-xl bg-teal-50 p-2.5 text-teal-600">
                <item.icon className="h-5 w-5" aria-hidden="true" />
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
        aria-labelledby="compare-heading"
        className="surface-panel p-6 sm:p-10"
      >
        <h2 id="compare-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Why this tool — and when to choose something else
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Operated by{" "}
          <Link href="/author/elango-p" className="font-semibold text-cyan-700 hover:underline">
            Elango P
          </Link>{" "}
          with public{" "}
          <Link href="/about" className="font-semibold text-cyan-700 hover:underline">
            About
          </Link>
          ,{" "}
          <Link href="/contact" className="font-semibold text-cyan-700 hover:underline">
            Contact
          </Link>
          , and legal policies. We explain AI uploads instead of vague “100% private” slogans.
          Not every job needs the same product—use this honest snapshot, not a paid ranking.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Comparison of OCR Text Extractor versus typical desktop OCR and phone OCR apps
            </caption>
            <thead>
              <tr className="border-b border-slate-200 text-slate-900">
                <th scope="col" className="py-3 pr-4 font-bold">
                  Topic
                </th>
                <th scope="col" className="py-3 pr-4 font-bold">
                  imgtotext.in
                </th>
                <th scope="col" className="py-3 pr-4 font-bold">
                  Desktop OCR suites
                </th>
                <th scope="col" className="py-3 font-bold">
                  Phone OCR apps
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-slate-100">
                  <th scope="row" className="py-3 pr-4 font-semibold text-slate-800">
                    {row.feature}
                  </th>
                  <td className="py-3 pr-4">{row.us}</td>
                  <td className="py-3 pr-4">{row.desktop}</td>
                  <td className="py-3">{row.phoneApp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          You also get practical exports (TXT, DOCX, PDF), batch upload up to ten images, Clean Mode
          for screenshots, and a documented daily AI fair-use limit so capacity stays available for
          more visitors.
        </p>
      </section>

      <section id="related-tools" aria-labelledby="related-tools-heading">
        <h2 id="related-tools-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
          Related tools
        </h2>
        <p className="mt-3 text-slate-600">
          Same extractor, different guides — pick the page that matches your file or capture style.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedToolLinks.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-cyan-700 shadow-sm hover:border-cyan-200 hover:bg-cyan-50"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="latest-articles-heading">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="latest-articles-heading"
              className="text-2xl font-black text-slate-900 sm:text-3xl"
            >
              Latest articles
            </h2>
            <p className="mt-2 text-slate-600">Guides from the blog — practical, not fluff.</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700 hover:text-cyan-800"
          >
            View all posts
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <li
              key={post.slug}
              className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="font-bold text-slate-900 hover:text-cyan-700"
              >
                {post.title}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="faq-preview-heading"
        className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10"
      >
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
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {homeFaqs.map((item) => (
            <div key={item.q} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <h3 className="font-bold text-white">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-200/80 bg-gradient-to-br from-cyan-50/95 via-white/80 to-teal-50/90 p-8 text-center shadow-sm backdrop-blur-sm sm:p-12">
        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
          Ready to convert your image to text?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Scroll up to the tool, upload an image, and get editable text in seconds — free, with AI
          OCR and a browser fallback when you need it.
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

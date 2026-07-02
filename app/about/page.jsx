export const metadata = {
  title: "About",
  description:
    "Learn about OCR Text Extractor — a free, privacy-first online tool to convert images into editable text using Tesseract.js.",
  alternates: { canonical: "https://ocr.elangodev.com/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">About</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        About OCR Text Extractor
      </h1>
      <div className="prose prose-slate mt-8 max-w-none space-y-6 text-slate-600">
        <p className="text-lg leading-relaxed">
          OCR Text Extractor is a free online tool that helps you convert images into editable
          text. Whether you have a screenshot, a photo of a document, or a scanned receipt, you
          can extract the text in seconds — directly in your web browser.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Our mission</h2>
          <p className="mt-3 leading-relaxed">
            We built this tool to make optical character recognition (OCR) accessible to everyone.
            Many OCR services require account creation, file uploads to remote servers, or paid
            subscriptions. OCR Text Extractor takes a different approach: powerful recognition
            that runs entirely on your device, with no data leaving your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">How the technology works</h2>
          <p className="mt-3 leading-relaxed">
            The tool is powered by{" "}
            <a
              href="https://tesseract.projectnaptha.com/"
              className="font-semibold text-cyan-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tesseract.js
            </a>
            , a JavaScript port of the open-source Tesseract OCR engine originally developed by
            Hewlett-Packard and now maintained by Google. Tesseract uses machine learning models
            to recognize characters in images. We run it via WebAssembly in a background worker so
            your page stays responsive while processing.
          </p>
          <p className="mt-3 leading-relaxed">
            Before recognition, images go through a preprocessing pipeline — including smart
            upscaling, contrast enhancement, and adaptive thresholding — to improve accuracy on
            real-world photos, screenshots, and scans with uneven lighting.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Privacy first</h2>
          <p className="mt-3 leading-relaxed">
            Your privacy matters. Unlike cloud-based OCR services, we do not upload, store, or
            analyze your images on any server. All processing happens locally in your browser.
            When you close the tab, your image data is gone. Read our full{" "}
            <a href="/privacy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Who built this?</h2>
          <p className="mt-3 leading-relaxed">
            OCR Text Extractor is built and maintained by{" "}
            <a
              href="https://elangodev.com"
              className="font-semibold text-cyan-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Elango P
            </a>
            , a developer focused on practical, privacy-respecting web tools. If you have
            feedback, bug reports, or feature suggestions, reach out at{" "}
            <a
              href="mailto:admin@elangodev.com"
              className="font-semibold text-cyan-700 hover:underline"
            >
              admin@elangodev.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Advertising</h2>
          <p className="mt-3 leading-relaxed">
            This site may display advertisements through Google AdSense to help cover hosting and
            development costs. Ads are served by Google and are subject to Google&apos;s advertising
            policies. We aim to keep ads unobtrusive so the OCR tool remains easy to use.
          </p>
        </section>
      </div>
    </article>
  );
}

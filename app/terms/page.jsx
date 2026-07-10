import { SITE_URL, SITE_DOMAIN, CONTACT_EMAIL } from "../lib/site";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for OCR Text Extractor — rules and disclaimers for using our free online OCR tool.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  const updated = "July 10, 2026";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Legal</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900">Agreement</h2>
          <p className="mt-3 leading-relaxed">
            By accessing or using OCR Text Extractor at {SITE_DOMAIN} (&quot;the site&quot;),
            you agree to these Terms of Use. If you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Description of service</h2>
          <p className="mt-3 leading-relaxed">
            OCR Text Extractor provides a free browser-based tool to extract text from images using
            optical character recognition (OCR). The service is provided &quot;as is&quot; for
            personal and commercial use, subject to the limitations below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Acceptable use</h2>
          <p className="mt-3 leading-relaxed">You agree not to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>Use the site for any unlawful purpose or to process content you do not have rights to use</li>
            <li>Attempt to disrupt, overload, or reverse-engineer the site&apos;s infrastructure</li>
            <li>Scrape or automate access in a way that harms site performance for other users</li>
            <li>Misrepresent extracted text as human-verified when accuracy is critical (e.g. legal or medical documents)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Accuracy disclaimer</h2>
          <p className="mt-3 leading-relaxed">
            OCR results may contain errors, especially with handwriting, low-resolution images,
            unusual fonts, or damaged documents. Always review and verify extracted text before
            relying on it for important decisions. We are not responsible for errors in recognized
            text or consequences of using inaccurate output.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Intellectual property</h2>
          <p className="mt-3 leading-relaxed">
            The site design, branding, and original content are owned by the site operator. You
            retain all rights to images you process and text you extract. Tesseract.js is open
            source under the Apache License 2.0.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Advertising</h2>
          <p className="mt-3 leading-relaxed">
            The site displays third-party advertisements through Google AdSense to help cover
            hosting and development costs. We are not responsible for the content of third-party
            ads or external sites linked from advertisements. Ad delivery is subject to Google&apos;s
            advertising policies and your cookie preferences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Limitation of liability</h2>
          <p className="mt-3 leading-relaxed">
            To the fullest extent permitted by law, OCR Text Extractor and its operator shall not be
            liable for any indirect, incidental, special, or consequential damages arising from
            your use of the site, including loss of data, loss of profits, or reliance on OCR
            output.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Changes</h2>
          <p className="mt-3 leading-relaxed">
            We may modify these terms or discontinue the service at any time. Updated terms will be
            posted on this page with a revised date. Your continued use constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about these terms? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-cyan-700 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or visit our{" "}
            <a href="/contact" className="font-semibold text-cyan-700 hover:underline">
              Contact
            </a>{" "}
            page.
          </p>
        </section>
      </div>
    </article>
  );
}

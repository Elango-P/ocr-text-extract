import Link from "next/link";
import { SITE_URL, SITE_DOMAIN, CONTACT_EMAIL, SITE_NAME } from "../lib/site";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Disclaimer – OCR Accuracy & Liability Limits",
  description:
    "Disclaimer for OCR Text Extractor — accuracy limits, no professional advice, and liability boundaries for free online image-to-text OCR.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const updated = "July 14, 2026";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">Legal</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Disclaimer
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900">General information</h2>
          <p className="mt-3 leading-relaxed">
            The information and tools on {SITE_NAME} ({SITE_DOMAIN}) are provided for general
            convenience. By using the site you acknowledge that OCR outputs and editorial articles
            may contain errors and are not a substitute for professional review of important
            documents.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">OCR accuracy</h2>
          <p className="mt-3 leading-relaxed">
            Optical character recognition depends on image quality, language, fonts, lighting, and
            handwriting. We do not guarantee that extracted text is complete, correct, or suitable
            for any particular purpose. Always proofread results before using them for legal,
            medical, financial, academic, or other high-stakes work.
          </p>
          <p className="mt-3 leading-relaxed">
            AI OCR and browser-based fallback OCR may produce different results for the same image.
            Confidence scores (when shown) are estimates, not certifications of correctness.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">No professional advice</h2>
          <p className="mt-3 leading-relaxed">
            Blog posts, FAQs, and guides on this site are educational. They are not legal, tax,
            medical, accounting, or other professional advice. If you need advice for a specific
            situation, consult a qualified professional.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Third-party services</h2>
          <p className="mt-3 leading-relaxed">
            The site may rely on third-party services (for example cloud AI OCR providers and
            advertising networks). Their availability, policies, and outputs are outside our full
            control. Links to external sites are provided for convenience; we are not responsible
            for their content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Limitation of liability</h2>
          <p className="mt-3 leading-relaxed">
            To the fullest extent permitted by law, {SITE_NAME} and its operator are not liable for
            any loss or damage arising from use of the OCR tool, reliance on extracted text, site
            downtime, or advertising content. Use of the free service is at your own risk.
            Additional terms appear in our{" "}
            <Link href="/terms" className="font-semibold text-cyan-700 hover:underline">
              Terms of Use
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Your responsibilities</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>Only upload images you have the right to process</li>
            <li>Do not upload illegal content or others&apos; sensitive data without authorization</li>
            <li>Verify OCR output before distributing or relying on it</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about this disclaimer? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-cyan-700 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or visit{" "}
            <Link href="/contact" className="font-semibold text-cyan-700 hover:underline">
              Contact
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

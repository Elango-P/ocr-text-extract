import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import { SITE_URL, CONTACT_EMAIL, SITE_DOMAIN } from "../lib/site";

export const metadata = {
  title: "Data Retention Policy",
  description:
    "How long OCR Text Extractor retains AI OCR processing data, logs, cookies, and advertising-related information when ads are enabled.",
  alternates: { canonical: `${SITE_URL}/data-retention` },
  openGraph: {
    title: "Data Retention Policy | OCR Text Extractor",
    description:
      "Retention periods for temporary OCR processing, server logs, cookies, and advertising technology.",
    url: `${SITE_URL}/data-retention`,
  },
};

export default function DataRetentionPage() {
  const updated = "August 11, 2026";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
          { name: "Data Retention" },
        ]}
      />
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">Legal</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Data Retention Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900">Purpose</h2>
          <p className="mt-3 leading-relaxed">
            This page explains how long different categories of data are kept when you use OCR Text
            Extractor at {SITE_DOMAIN}. It complements the{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookie-policy" className="font-semibold text-cyan-700 hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Images submitted for AI OCR</h2>
          <p className="mt-3 leading-relaxed">
            When you click Extract Text and AI OCR runs, your image is transmitted through our
            server to Google Gemini for that extraction request. It exists in our server&apos;s
            memory only for the moment it takes to forward the request and return the recognized
            text. We do not write it to a database, a disk, or any other storage, so there is no
            permanent archive of user uploads on our side.
          </p>
          <p className="mt-3 leading-relaxed">
            The AI provider may process data under its own terms. Do not upload highly sensitive
            documents to any online OCR service if your policies require local-only processing. When
            AI fails or the daily AI allowance is exhausted, browser-based Tesseract.js may process
            the image on your device for that attempt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Extracted text</h2>
          <p className="mt-3 leading-relaxed">
            Recognized text is shown in your browser session so you can copy or download it. We do
            not keep a permanent account-based archive of OCR results. Clearing the page or closing
            the tab ends that on-screen session state.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Rate limiting and operational logs</h2>
          <p className="mt-3 leading-relaxed">
            To enforce the fair daily AI OCR allowance, our server keeps a short-lived counter in
            memory. The counter is keyed by your IP address and the current UTC date, and it stores
            nothing except the number of AI OCR requests made so far that day. No cookie is involved
            in rate limiting.
          </p>
          <p className="mt-3 leading-relaxed">
            These counters are discarded at UTC midnight, when the daily allowance resets, and they
            are also lost whenever the server restarts or redeploys. Because the limit is tied to an
            IP address rather than an individual, people sharing a network — an office, a campus, or
            a household behind one connection — share the same daily allowance.
          </p>
          <p className="mt-3 leading-relaxed">
            Separately, our hosting provider may record standard server request logs (including IP
            addresses) as part of normal infrastructure operation, under that provider&apos;s own
            retention schedule. We do not build advertising or marketing profiles from either the
            rate-limit counters or those logs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Cookies and similar storage</h2>
          <p className="mt-3 leading-relaxed">
            Essential preferences (for example, cookie consent choices) remain until you clear site
            data or change settings. When advertising is enabled, advertising cookies set by Google
            AdSense follow Google&apos;s retention and control mechanisms. See the Cookie Policy for
            categories and how to manage preferences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Email correspondence</h2>
          <p className="mt-3 leading-relaxed">
            If you email {CONTACT_EMAIL}, we retain the message as long as needed to respond and to
            keep a reasonable support record. You can ask us to delete support correspondence that is
            no longer required, subject to legitimate security or legal holds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Backups</h2>
          <p className="mt-3 leading-relaxed">
            Infrastructure backups (if any) protect site code and configuration — not a warehouse of
            end-user image uploads. Backup cycles are rotated as part of normal hosting practice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Changes</h2>
          <p className="mt-3 leading-relaxed">
            We may update this policy as the product or legal requirements change. The date at the
            top will be revised when material changes are published.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about retention:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-cyan-700 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or the{" "}
            <Link href="/contact" className="font-semibold text-cyan-700 hover:underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </article>
  );
}

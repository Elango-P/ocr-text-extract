import Link from "next/link";
import { SITE_URL, SITE_DOMAIN, CONTACT_EMAIL, SITE_NAME } from "../lib/site";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for OCR Text Extractor — essential cookies, AdSense advertising cookies, and how to manage your preferences.",
  alternates: { canonical: `${SITE_URL}/cookie-policy` },
};

export default function CookiePolicyPage() {
  const updated = "July 14, 2026";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Legal</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Cookie Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900">Overview</h2>
          <p className="mt-3 leading-relaxed">
            This Cookie Policy explains how {SITE_NAME} ({SITE_DOMAIN}) uses cookies and similar
            technologies. It should be read together with our{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">What are cookies?</h2>
          <p className="mt-3 leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They help
            sites remember preferences, keep services working, and — when advertising is enabled —
            support ad delivery and measurement. Local storage entries (used for your cookie
            consent choice on this site) serve a similar preference-keeping purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Cookies we use</h2>
          <h3 className="mt-4 text-lg font-semibold text-slate-800">Essential / functional</h3>
          <p className="mt-2 leading-relaxed">
            We store your cookie consent choice in browser local storage so we do not repeatedly
            ask for the same decision in every session. These preferences are required for the
            consent experience to work.
          </p>
          <h3 className="mt-4 text-lg font-semibold text-slate-800">Advertising (Google AdSense)</h3>
          <p className="mt-2 leading-relaxed">
            When ads are shown, Google and its partners may set cookies to deliver advertisements,
            limit how often you see an ad, and measure ad performance. Google may use both
            personalized and non-personalized ads depending on your region, settings, and consent.
            Learn more in{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="font-semibold text-cyan-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s advertising technologies
            </a>{" "}
            documentation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">OCR and cookies</h2>
          <p className="mt-3 leading-relaxed">
            Extracting text from images uses our OCR pipeline (cloud AI OCR first, with a browser
            fallback). That processing is separate from advertising cookies. Image handling is
            described in the Privacy Policy — we do not use OCR uploads as advertising profiles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Managing cookies</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              Use{" "}
              <strong className="text-slate-800">Cookie Settings</strong> in the site footer to
              reopen the consent banner and update your choice on this domain.
            </li>
            <li>
              Adjust Google ad personalization at{" "}
              <a
                href="https://adssettings.google.com"
                className="font-semibold text-cyan-700 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                adssettings.google.com
              </a>
              .
            </li>
            <li>
              Control cookies globally in your browser settings (blocking some cookies may affect
              how ads or preference features behave).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about cookies on {SITE_DOMAIN}? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-cyan-700 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or use our{" "}
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

import { SITE_URL, SITE_DOMAIN, CONTACT_EMAIL } from "../lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for OCR Text Extractor. How we handle images for AI OCR and browser fallback.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  const updated = "July 10, 2026";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Legal</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900">Overview</h2>
          <p className="mt-3 leading-relaxed">
            OCR Text Extractor (&quot;we&quot;, &quot;our&quot;, or &quot;the site&quot;) is
            operated at {SITE_DOMAIN}. This Privacy Policy explains what information we
            collect, how we use it, and your rights. We are committed to protecting your privacy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Images and OCR data</h2>
          <p className="mt-3 leading-relaxed">
            <strong className="text-slate-800">Primary path (AI OCR):</strong> When you
            click Extract Text, your image is sent to our server and then to Google&apos;s Gemini
            API solely to extract text. We do not permanently store your images on our servers.
            Google&apos;s processing of the image is subject to{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-cyan-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
          <p className="mt-3 leading-relaxed">
            <strong className="text-slate-800">Fallback path (browser OCR):</strong> If AI OCR
            fails or is unavailable, recognition falls back to Tesseract.js running locally in
            your browser via WebAssembly. That fallback pass does not upload the image to our
            servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Information we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              <strong className="text-slate-800">Server logs:</strong> Our hosting provider may
              automatically log standard technical data such as IP address, browser type, referring
              page, and access time. This is common for web hosting and security. We do not run a
              separate third-party analytics product on this site today.
            </li>
            <li>
              <strong className="text-slate-800">Cookies and advertising:</strong> We use Google
              AdSense to display advertisements. Google and its partners may use cookies and
              similar technologies to serve, measure, and (where allowed) personalize ads. See the
              &quot;Third-party services&quot; section below.
            </li>
            <li>
              <strong className="text-slate-800">Consent preference:</strong> We store a small
              local preference in your browser (localStorage) so we can remember whether you
              accepted or limited non-essential cookies via our on-site notice.
            </li>
            <li>
              <strong className="text-slate-800">Contact email:</strong> If you email us, we receive
              the information you voluntarily provide (such as your email address and message
              content) solely to respond to your inquiry.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Third-party services</h2>
          <p className="mt-3 leading-relaxed">We use third-party services including:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              <strong className="text-slate-800">Google Gemini</strong> — to perform AI OCR when
              you extract text. The image you submit for recognition is transmitted to Google for
              that request. See{" "}
              <a
                href="https://ai.google.dev/gemini-api/terms"
                className="text-cyan-700 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Gemini API terms
              </a>
              .
            </li>
            <li>
              <strong className="text-slate-800">Google AdSense</strong> — to display
              advertisements that help cover hosting and development costs. Google may use cookies
              to personalize ads where permitted. Learn more at{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-cyan-700 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google&apos;s Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                className="text-cyan-700 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                How Google uses data in advertising
              </a>
              .
            </li>
            <li>
              <strong className="text-slate-800">Hosting (e.g. Vercel)</strong> — to serve the
              website. Hosting providers process technical request data as part of delivering the
              site.
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            Tesseract.js language models are loaded into your browser from our site or CDN
            endpoints as part of normal page operation. No image content is sent during this
            process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Children&apos;s privacy</h2>
          <p className="mt-3 leading-relaxed">
            This site is not directed at children under 13. We do not knowingly collect personal
            information from children. If you believe a child has provided us personal information,
            please contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Your choices</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>You can stop using the site at any time — no account is required.</li>
            <li>
              Use the on-site cookie notice to accept or limit non-essential cookies. You can also
              clear site data in your browser to reset that preference.
            </li>
            <li>
              You can control cookies through your browser settings and opt out of personalized
              Google ads at{" "}
              <a
                href="https://adssettings.google.com"
                className="text-cyan-700 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Ad Settings
              </a>
              .
            </li>
            <li>
              Extracted text and image previews in the page are kept in your browser session.
              Closing the tab clears that local session data. Images sent for AI OCR are handled
              by Google for that request and are not permanently stored by us.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Changes to this policy</h2>
          <p className="mt-3 leading-relaxed">
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date
            at the top will reflect changes. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions about this Privacy Policy? Email{" "}
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

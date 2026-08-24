import { SITE_URL, SITE_DOMAIN, CONTACT_EMAIL, OPERATOR_NAME } from "../lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How OCR Text Extractor handles your data: what happens to images on the AI path, what stays in your browser, plus cookies, ads, retention, and your rights.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPage() {
  const updated = "August 11, 2026";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">Legal</p>
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
          <h2 className="text-xl font-bold text-slate-900">Who is responsible for your data</h2>
          <p className="mt-3 leading-relaxed">
            {OPERATOR_NAME} is the data controller for this site. The site is run by one
            independent developer, not a registered company, and there is no separate office or
            staff. If you need a postal address for a formal data-protection request, email us and
            we will provide one.
          </p>
          <p className="mt-3 leading-relaxed">
            All privacy questions and requests go to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-cyan-700 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Images and OCR data</h2>
          <p className="mt-3 leading-relaxed">
            <strong className="text-slate-800">Primary path (AI OCR):</strong> When you
            click Extract Text, your image is sent to our server and then to Google&apos;s Gemini
            API solely to extract text. On our side the image lives in server memory only for as
            long as that single request takes; we never write it to a database or to disk, so no
            copy remains once the text comes back. Google&apos;s processing of the image is subject
            to{" "}
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
          <p className="mt-3 leading-relaxed">
            <strong className="text-slate-800">Local OCR only (optional):</strong> You can enable
            a &quot;Local OCR only&quot; switch in the tool to skip the AI path entirely. In that
            mode, recognition uses Tesseract.js in your browser tab and the image is not sent to
            Gemini through our API. Language/WASM assets for Tesseract may still load from our site
            or CDN endpoints; those downloads are engine files, not your uploaded image.
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
              <strong className="text-slate-800">Cookies and advertising:</strong> When advertising
              is enabled, we may use Google AdSense to display advertisements. Google and its
              partners may use cookies and similar technologies to serve, measure, and (where
              allowed) personalize ads. See the &quot;Third-party services&quot; section below.
            </li>
            <li>
              <strong className="text-slate-800">Consent preference:</strong> We store a small
              local preference in your browser (localStorage) for the cookie notice. Choosing
              Essential only limits non-essential/advertising cookies on this site when ads are
              enabled.
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
              <strong className="text-slate-800">Google AdSense</strong> — when advertising is
              enabled, to display third-party advertisements. Google may use cookies to personalize
              ads where permitted. Learn more at{" "}
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
          <h2 className="text-xl font-bold text-slate-900">
            Why we are allowed to process this data
          </h2>
          <p className="mt-3 leading-relaxed">
            If you are in the UK or the European Economic Area, the GDPR requires us to name a legal
            basis for each kind of processing. Ours are:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              <strong className="text-slate-800">Performing the service you asked for:</strong>{" "}
              sending your image to Gemini and returning the recognized text. You trigger this
              yourself by clicking Extract Text, and it cannot happen without that click.
            </li>
            <li>
              <strong className="text-slate-800">Our legitimate interest in a working site:</strong>{" "}
              server logs and the daily AI OCR counter, which exist to keep the free tool available
              and to stop abuse.
            </li>
            <li>
              <strong className="text-slate-800">Your consent:</strong> advertising cookies. You
              give or withhold this in the cookie notice, and you can change it at any time using
              the Cookie Settings link in the footer.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Where your data is processed</h2>
          <p className="mt-3 leading-relaxed">
            The services we depend on are operated globally, so data may be processed outside your
            own country — including in the United States. Images sent for AI OCR go to Google&apos;s
            Gemini API, the site is served by our hosting provider&apos;s network, and advertising,
            when enabled, is handled by Google. Each of these providers runs its own safeguards for
            international transfers, such as the European Commission&apos;s standard contractual
            clauses.
          </p>
          <p className="mt-3 leading-relaxed">
            If you would rather your image never left your device, switch on{" "}
            <strong className="text-slate-800">Local OCR only</strong> in the tool. Recognition then
            runs entirely in your browser tab and no image is transmitted to us or to Google.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Your rights over your data</h2>
          <p className="mt-3 leading-relaxed">
            Because the site has no accounts and stores no uploads, there is usually very little
            data for us to act on — but the rights below still apply, and we will honour them.
          </p>
          <p className="mt-3 leading-relaxed">
            Under the GDPR you may request access to your personal data, correction of inaccurate
            data, erasure, restriction of processing, portability, and you may object to processing
            we base on legitimate interests. Where processing rests on consent, you can withdraw it
            at any time without affecting what happened before you withdrew it.
          </p>
          <p className="mt-3 leading-relaxed">
            Under the CCPA and CPRA, California residents may request disclosure of the categories
            and specific pieces of personal information collected, request deletion, and request
            correction. We do not sell or share personal information as those laws define it, and we
            do not use it for cross-context behavioural advertising beyond the standard Google
            AdSense behaviour described above, which you can decline with Essential only. We will
            not discriminate against you for exercising any of these rights.
          </p>
          <p className="mt-3 leading-relaxed">
            To make a request, email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-cyan-700 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            . We may need to ask a question or two to confirm the request genuinely relates to your
            own data. If you are in the UK or EEA and are unhappy with how we have handled a
            request, you have the right to complain to your national data protection authority.
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
          <h2 className="text-xl font-bold text-slate-900">Data retention</h2>
          <p className="mt-3 leading-relaxed">
            For timelines covering AI OCR processing, operational logs, cookies, and email
            correspondence, see the dedicated{" "}
            <a href="/data-retention" className="font-semibold text-cyan-700 hover:underline">
              Data Retention Policy
            </a>
            .
          </p>
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

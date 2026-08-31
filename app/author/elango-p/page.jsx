import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DOMAIN,
  CONTACT_EMAIL,
  OPERATOR_NAME,
  OPERATOR_URL,
  SOCIAL_LINKS,
} from "../../lib/site";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Author: Elango P – OCR Text Extractor",
  description:
    "Elango P builds OCR Text Extractor at imgtotext.in — mission, experience, and how to contact the site operator.",
  path: "/author/elango-p",
  ogType: "profile",
});

export default function AuthorPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/author/elango-p#person`,
    name: OPERATOR_NAME,
    url: `${SITE_URL}/author/elango-p`,
    email: CONTACT_EMAIL,
    jobTitle: "Independent software developer",
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    sameAs: [OPERATOR_URL, ...SOCIAL_LINKS.map((l) => l.href)],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: OPERATOR_NAME },
        ]}
      />

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">
        Author &amp; operator
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        {OPERATOR_NAME}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        Independent developer behind {SITE_NAME} ({SITE_DOMAIN}) — a free image-to-text utility
        focused on practical OCR, clear privacy wording, and no mandatory sign-up.
      </p>

      <section className="mt-10 space-y-4 text-slate-600">
        <h2 className="text-xl font-bold text-slate-900">Experience</h2>
        <p className="leading-relaxed">
          I build small, usable web tools with modern JavaScript and React. OCR Text Extractor
          combines a cloud AI extraction path (Google Gemini, documented in the Privacy Policy) with
          a Tesseract.js browser fallback so visitors are not stuck when AI is unavailable or the
          daily fair-use cap is reached.
        </p>
        <p className="leading-relaxed">
          Day-to-day work includes shipping the Next.js app at {SITE_DOMAIN}, writing help content
          that matches what the product actually does, and keeping policies honest about uploads,
          cookies, and ads.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-slate-600">
        <h2 className="text-xl font-bold text-slate-900">Mission</h2>
        <p className="leading-relaxed">
          Make everyday OCR accessible: recover text from screenshots and photos without buying
          enterprise software for a five-minute task — while explaining accuracy limits and privacy
          trade-offs so people can decide when a free online tool is appropriate.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-slate-600">
        <h2 className="text-xl font-bold text-slate-900">Company information</h2>
        <p className="leading-relaxed">
          {SITE_NAME} is independently operated by {OPERATOR_NAME}. It is not a large corporation
          subsidiary. There is no separate public street-address office listed at this time; the
          primary business contact is email. For product identity and policies, start from the{" "}
          <Link href="/about" className="font-semibold text-cyan-700 hover:underline">
            About
          </Link>{" "}
          page.
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-cyan-700 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            Personal site:{" "}
            <a
              href={OPERATOR_URL}
              className="font-semibold text-cyan-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {OPERATOR_URL.replace(/^https?:\/\//, "")}
            </a>
          </li>
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href}>
              {link.name}:{" "}
              <a
                href={link.href}
                className="font-semibold text-cyan-700 hover:underline"
                rel="noopener noreferrer me"
                target="_blank"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-slate-600">
        <h2 className="text-xl font-bold text-slate-900">Editorial standards</h2>
        <p className="leading-relaxed">
          Blog posts and tool guides explain real workflows, limitations, and privacy — not
          keyword stuffing. We keep a small set of tool pages (image, JPG, scanned PDF,
          handwriting) with unique copy rather than a large cluster of near-duplicate converters.
          When a feature is limited (for example, the general image OCR tool versus direct scanned
          PDF processing), we say so on the page.
        </p>
        <p className="leading-relaxed">
          Read the{" "}
          <Link href="/blog" className="font-semibold text-cyan-700 hover:underline">
            blog
          </Link>
          , try the{" "}
          <Link href="/#ocr-tool" className="font-semibold text-cyan-700 hover:underline">
            OCR tool
          </Link>
          , or{" "}
          <Link href="/contact" className="font-semibold text-cyan-700 hover:underline">
            contact
          </Link>{" "}
          with feedback.
        </p>
      </section>
    </article>
  );
}

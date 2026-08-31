import Image from "next/image";
import Link from "next/link";
import RichText from "../RichText";
import Breadcrumbs from "../Breadcrumbs";
import AdUnit from "../AdUnit";
import { SITE_URL, SITE_NAME, ADSENSE_SLOT_DISPLAY } from "../../lib/site";
import { getRelatedTools } from "../../lib/tools/toolPages";
import { getPostBySlug } from "../../lib/blog/posts";
import ToolOcrEmbed from "./ToolOcrEmbed";
import PdfToTextEmbed from "./PdfToTextEmbed";
import ImageToPdfEmbed from "./ImageToPdfEmbed";

export default function ToolLanding({ tool }) {
  const relatedTools = getRelatedTools(tool.slug, 4);
  const relatedPosts = (tool.relatedBlogSlugs || [])
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${tool.h1} — ${SITE_NAME}`,
    url: `${SITE_URL}${tool.path}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.description,
  };

  const defaultHowToSteps = [
    {
      "@type": "HowToStep",
      name: "Upload an image",
      text: "Drag and drop or choose a PNG, JPG, JPEG, WEBP, or GIF file.",
    },
    {
      "@type": "HowToStep",
      name: "Choose language and settings",
      text: "Select the document language and optionally enable Clean Mode.",
    },
    {
      "@type": "HowToStep",
      name: "Extract and export",
      text: "Click Extract Text, review the output, then copy or download TXT, DOCX, or PDF.",
    },
  ];
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.h1}`,
    description: tool.lead,
    step: tool.howToSteps || defaultHowToSteps,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Tools", href: "/image-to-text" },
            { name: tool.h1 },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">
            Free OCR tool
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {tool.h1}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{tool.lead}</p>
        </header>
      </div>

      {tool.embed === "pdf-to-text" ? (
        <PdfToTextEmbed />
      ) : tool.embed === "image-to-pdf" ? (
        <ImageToPdfEmbed />
      ) : (
        <ToolOcrEmbed />
      )}
      <AdUnit
        slot={ADSENSE_SLOT_DISPLAY}
        className="mx-auto max-w-6xl px-4 py-6 sm:px-6"
      />

      <article className="mx-auto max-w-6xl space-y-14 px-4 pb-20 pt-10 sm:px-6">
        {tool.heroImage && (
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={tool.heroImage}
              alt={tool.heroAlt || tool.h1}
              width={1200}
              height={675}
              className="h-56 w-full object-cover sm:h-72"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <figcaption className="px-4 py-3 text-sm text-slate-500">
              {tool.heroAlt}
            </figcaption>
          </figure>
        )}

        {tool.workedExample && (
          <section
            aria-labelledby={`${tool.slug}-worked-example`}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">
              Walkthrough
            </p>
            <h2
              id={`${tool.slug}-worked-example`}
              className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl"
            >
              {tool.workedExample.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600">
              {tool.workedExample.situation && (
                <p>
                  <RichText text={tool.workedExample.situation} />
                </p>
              )}
              {tool.workedExample.steps?.length > 0 && (
                <ol className="list-decimal space-y-2 pl-5">
                  {tool.workedExample.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              {tool.workedExample.result && (
                <p>
                  <strong className="text-slate-800">What to expect:</strong>{" "}
                  <RichText text={tool.workedExample.result} />
                </p>
              )}
              {tool.workedExample.lesson && (
                <p>
                  <strong className="text-slate-800">Takeaway:</strong>{" "}
                  <RichText text={tool.workedExample.lesson} />
                </p>
              )}
            </div>
          </section>
        )}

        {tool.sections.map((section) => (
          <section key={section.id} aria-labelledby={`${tool.slug}-${section.id}`}>
            <h2
              id={`${tool.slug}-${section.id}`}
              className="text-2xl font-black text-slate-900 sm:text-3xl"
            >
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600">
              {section.paragraphs.map((p, i) => (
                <p key={i}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby={`${tool.slug}-faq`}>
          <h2 id={`${tool.slug}-faq`} className="text-2xl font-black text-slate-900 sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-4">
            {tool.faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby={`${tool.slug}-related-tools`}>
          <h2
            id={`${tool.slug}-related-tools`}
            className="text-2xl font-black text-slate-900 sm:text-3xl"
          >
            Related tools
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {relatedTools.map((t) => (
              <li key={t.slug}>
                <Link
                  href={t.path}
                  className="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-cyan-700 shadow-sm hover:border-cyan-200 hover:bg-cyan-50"
                >
                  {t.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#ocr-tool"
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-cyan-700 shadow-sm hover:border-cyan-200 hover:bg-cyan-50"
              >
                Main OCR tool (homepage)
              </Link>
            </li>
          </ul>
        </section>

        {relatedPosts.length > 0 && (
          <section aria-labelledby={`${tool.slug}-related-articles`}>
            <h2
              id={`${tool.slug}-related-articles`}
              className="text-2xl font-black text-slate-900 sm:text-3xl"
            >
              Related articles
            </h2>
            <ul className="mt-6 space-y-3">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-cyan-700 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500">{post.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-teal-50 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-black text-slate-900">
            {tool.cta?.heading || "Ready to extract text?"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            {tool.cta?.text ||
              "Use the tool at the top of this page — free, no signup, AI OCR with browser fallback."}
          </p>
          <a
            href="#ocr-tool"
            className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:brightness-110"
          >
            {tool.cta?.label || "Back to the OCR tool"}
          </a>
        </section>
      </article>
    </div>
  );
}

export function buildToolMetadata(tool) {
  const url = `${SITE_URL}${tool.path}`;
  const title = tool.metaTitle || tool.title;
  return {
    // Absolute: these titles already describe the page fully, and appending the
    // site name pushes them past the ~60 characters Google will display.
    title: { absolute: title },
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: tool.metaTitle || tool.title,
      description: tool.description,
      url,
      type: "website",
      images: tool.heroImage ? [{ url: `${SITE_URL}${tool.heroImage}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle || tool.title,
      description: tool.description,
      images: tool.heroImage ? [`${SITE_URL}${tool.heroImage}`] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

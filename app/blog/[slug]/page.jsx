import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import AdUnit from "../../components/AdUnit";
import { SITE_URL, SITE_NAME, OPERATOR_NAME, ADSENSE_SLOT_ARTICLE } from "../../lib/site";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  getRelatedToolsForPost,
} from "../../lib/blog/posts";
import { getPostMarkdown } from "../../lib/blog/getPostMarkdown";
import MarkdownContent, { getMarkdownHeadings } from "../../components/blog/MarkdownContent";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  const url = `${SITE_URL}/blog/${post.slug}`;
  // Absolute: article headlines are long enough already, and the site-name
  // suffix would push them past what Google renders in results.
  const title = post.seoTitle || post.title;
  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      images: [{ url: `${SITE_URL}${post.image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
    },
  };
}

function formatDate(iso) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const markdown = getPostMarkdown(slug);
  if (!post || !markdown) notFound();

  const related = getRelatedPosts(slug, 3);
  const relatedTools = getRelatedToolsForPost(slug, 3);
  const { previous, next } = getAdjacentPosts(slug);
  const headings = getMarkdownHeadings(markdown);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: OPERATOR_NAME,
      url: `${SITE_URL}/author/elango-p`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: `${SITE_URL}${post.image}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title },
        ]}
      />

      <header className="mt-6">
        <p className="text-xs font-semibold text-slate-500">
          {formatDate(post.date)}
          {post.updated ? ` · Updated ${formatDate(post.updated)}` : ""}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.description}</p>
        <p className="mt-4 text-sm text-slate-600">
          By{" "}
          <Link
            href="/author/elango-p"
            className="font-semibold text-cyan-700 hover:underline"
          >
            {OPERATOR_NAME}
          </Link>
          {" · "}
          <Link href="/about" className="text-slate-500 hover:text-cyan-700 hover:underline">
            About this site
          </Link>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?topic=${encodeURIComponent(tag)}`}
              className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 hover:bg-cyan-100"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <Image
          src={post.image}
          alt={`Illustration for article: ${post.title}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <aside className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
        <p>
          <strong className="text-slate-900">{OPERATOR_NAME}</strong> builds and operates{" "}
          {SITE_NAME}. This article reflects hands-on product guidance for free online OCR —
          including accuracy limits and privacy trade-offs.{" "}
          <Link href="/author/elango-p" className="font-semibold text-cyan-700 hover:underline">
            View author profile
          </Link>
          .
        </p>
      </aside>

      {headings.length >= 4 ? (
        <nav
          aria-label="On this page"
          className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            On this page
          </p>
          <ol className="mt-3 space-y-1.5 text-sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className="font-medium text-cyan-800 hover:underline"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <MarkdownContent source={markdown} />

      <AdUnit slot={ADSENSE_SLOT_ARTICLE} className="mt-10" />

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 p-6 text-white sm:p-8">
        <h2 className="text-xl font-bold">Try free image to text OCR</h2>
        <p className="mt-2 text-sm text-cyan-50">
          Upload an image to extract editable text — AI OCR runs first (images go to Google
          Gemini via our server); browser OCR is the fallback. No signup required.
        </p>
        <Link
          href="/image-to-text"
          className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-cyan-800 hover:bg-cyan-50"
        >
          Extract text from images
        </Link>
      </div>

      {relatedTools.length > 0 && (
        <aside className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-lg font-bold text-slate-900">Related OCR tools</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {relatedTools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-cyan-700 shadow-sm hover:border-cyan-200 hover:bg-cyan-50"
                >
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {related.length > 0 && (
        <aside className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-lg font-bold text-slate-900">Related Articles</h2>
          <ul className="mt-4 space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="font-semibold text-cyan-700 hover:underline"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-slate-500">{r.description}</p>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {(previous || next) && (
        <nav
          className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-10 sm:flex-row sm:items-start sm:justify-between"
          aria-label="Article navigation"
        >
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="group max-w-sm text-sm font-semibold text-cyan-700 hover:underline"
              rel="prev"
            >
              <span className="block text-xs font-medium text-slate-400 group-hover:text-slate-500">
                ← Previous Article
              </span>
              <span className="mt-1 block leading-snug">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group max-w-sm text-right text-sm font-semibold text-cyan-700 hover:underline sm:ml-auto"
              rel="next"
            >
              <span className="block text-xs font-medium text-slate-400 group-hover:text-slate-500">
                Next Article →
              </span>
              <span className="mt-1 block leading-snug">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      )}
    </article>
  );
}

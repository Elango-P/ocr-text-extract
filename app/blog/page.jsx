import Link from "next/link";
import Image from "next/image";
import { SITE_URL, OPERATOR_NAME } from "../lib/site";
import { getAllPosts } from "../lib/blog/posts";

export const metadata = {
  title: "Blog",
  description:
    "Practical OCR guides written around real image-to-text workflows — accuracy, privacy, screenshots, receipts, and developer notes.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "OCR Blog — Tips & Guides",
    description:
      "Practical OCR guides written around real image-to-text workflows — not a keyword dump.",
    url: `${SITE_URL}/blog`,
  },
};

function formatDate(iso) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const TOPIC_FILTERS = [
  { label: "All", tag: null },
  { label: "Accuracy", tag: "Accuracy" },
  { label: "Privacy", tag: "Privacy" },
  { label: "Tips", tag: "Tips" },
  { label: "AI", tag: "AI" },
  { label: "Developers", tag: "Developers" },
];

export default async function BlogIndexPage({ searchParams }) {
  const params = await searchParams;
  const topic = typeof params?.topic === "string" ? params.topic : null;
  const allPosts = getAllPosts();
  const posts = topic
    ? allPosts.filter((p) => p.tags.includes(topic))
    : allPosts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "OCR Text Extractor Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Guides on optical character recognition and image-to-text workflows, written by the site operator.",
    author: {
      "@type": "Person",
      name: OPERATOR_NAME,
      url: `${SITE_URL}/author/elango-p`,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description,
      author: {
        "@type": "Person",
        name: OPERATOR_NAME,
        url: `${SITE_URL}/author/elango-p`,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Blog</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          OCR guides &amp; tutorials
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Short, practical articles on getting usable text from images — capture tips, privacy
          habits, and honest limits of free online OCR. Written and reviewed by{" "}
          <Link href="/author/elango-p" className="font-semibold text-cyan-700 hover:underline">
            {OPERATOR_NAME}
          </Link>
          , who maintains the tool at imgtotext.in. We keep the catalog focused rather than
          publishing endless keyword variations.
        </p>
      </header>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Blog topics">
        {TOPIC_FILTERS.map((item) => {
          const href = item.tag ? `/blog?topic=${encodeURIComponent(item.tag)}` : "/blog";
          const active = item.tag === topic || (!item.tag && !topic);
          return (
            <Link
              key={item.label}
              href={href}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
                active
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {posts.length === 0 ? (
        <p className="mt-10 text-slate-600">
          No articles in this topic yet.{" "}
          <Link href="/blog" className="font-semibold text-cyan-700 hover:underline">
            View all posts
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-200 hover:shadow-md"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold text-slate-400">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mx-1.5 text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <Link href="/author/elango-p" className="font-semibold text-cyan-700 hover:underline">
                    {OPERATOR_NAME}
                  </Link>
                </p>
                <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-cyan-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?topic=${encodeURIComponent(tag)}`}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-800"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 text-sm font-bold text-cyan-700 hover:underline"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

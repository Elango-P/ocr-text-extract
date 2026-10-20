import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SITE_URL, OPERATOR_NAME } from "../lib/site";
import { getAllPosts, paginatePosts } from "../lib/blog/posts";

const BLOG_DESCRIPTION =
  "Practical OCR guides written around real image-to-text workflows — accuracy, privacy, screenshots, receipts, and developer notes.";

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

function buildBlogHref({ topic = null, page = 1 } = {}) {
  const params = new URLSearchParams();
  if (topic) params.set("topic", topic);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

function parsePage(raw) {
  if (typeof raw !== "string" || raw === "") return 1;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const topic = typeof params?.topic === "string" ? params.topic : null;
  const page = parsePage(params?.page);

  // Topic filters are thin views — keep canonical on the main blog index.
  // Paginated pages (no topic) self-canonicalize so crawlers can discover them.
  let canonical = `${SITE_URL}/blog`;
  if (!topic && page > 1) {
    canonical = `${SITE_URL}/blog?page=${page}`;
  }

  const title = page > 1 ? `Blog — Page ${page}` : "Blog";
  const ogUrl = canonical;

  return {
    title,
    description: BLOG_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title: page > 1 ? `OCR Blog — Page ${page}` : "OCR Blog — Tips & Guides",
      description:
        "Practical OCR guides written around real image-to-text workflows — not a keyword dump.",
      url: ogUrl,
    },
  };
}

function Pagination({ page, totalPages, topic }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      {page > 1 ? (
        <Link
          href={buildBlogHref({ topic, page: page - 1 })}
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-cyan-700 hover:bg-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          rel="prev"
        >
          ← Previous
        </Link>
      ) : null}

      {pages.map((n) => {
        const active = n === page;
        return (
          <Link
            key={n}
            href={buildBlogHref({ topic, page: n })}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
              active
                ? "bg-cyan-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {n}
          </Link>
        );
      })}

      {page < totalPages ? (
        <Link
          href={buildBlogHref({ topic, page: page + 1 })}
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-cyan-700 hover:bg-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          rel="next"
        >
          Next →
        </Link>
      ) : null}
    </nav>
  );
}

export default async function BlogIndexPage({ searchParams }) {
  const params = await searchParams;
  const topic = typeof params?.topic === "string" ? params.topic : null;
  const requestedPage = parsePage(params?.page);

  // Normalize ?page=1 to the unpaged URL.
  if (params?.page === "1") {
    redirect(buildBlogHref({ topic, page: 1 }));
  }

  const allPosts = getAllPosts();
  const filtered = topic
    ? allPosts.filter((p) => p.tags.includes(topic))
    : allPosts;

  const { posts, page, totalPages } = paginatePosts(filtered, requestedPage);

  // Out-of-range page → last valid page (avoids hard 404s on old links).
  if (requestedPage > totalPages && totalPages >= 1) {
    redirect(buildBlogHref({ topic, page: totalPages }));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ImgToText Blog",
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

  const sectionHeading = page === 1 ? "Latest Articles" : "Articles";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">Blog</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          OCR Guides &amp; Resources
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
          const href = buildBlogHref({ topic: item.tag, page: 1 });
          const active = item.tag === topic || (!item.tag && !topic);
          return (
            <Link
              key={item.label}
              href={href}
              aria-current={active ? "page" : undefined}
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

      {filtered.length === 0 ? (
        <p className="mt-10 text-slate-600">
          No articles in this topic yet.{" "}
          <Link href="/blog" className="font-semibold text-cyan-700 hover:underline">
            View all posts
          </Link>
          .
        </p>
      ) : (
        <section className="mt-10" aria-labelledby="blog-articles-heading">
          <h2
            id="blog-articles-heading"
            className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
          >
            {sectionHeading}
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-200 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold text-slate-400">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="mx-1.5 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <Link
                      href="/author/elango-p"
                      className="font-semibold text-cyan-700 hover:underline"
                    >
                      {OPERATOR_NAME}
                    </Link>
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900">
                    <Link href={`/blog/${post.slug}`} className="hover:text-cyan-700">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {post.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={buildBlogHref({ topic: tag, page: 1 })}
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

          <Pagination page={page} totalPages={totalPages} topic={topic} />
        </section>
      )}
    </div>
  );
}

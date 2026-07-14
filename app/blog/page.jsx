import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../lib/site";
import { getAllPosts } from "../lib/blog/posts";

export const metadata = {
  title: "Blog",
  description:
    "Practical OCR guides — extract text from images, improve accuracy, and use image-to-text for study and work.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "OCR Blog — Tips & Guides",
    description:
      "Practical OCR guides — extract text from images, improve accuracy, and use image-to-text for study and work.",
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

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "OCR Text Extractor Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Guides and tutorials on optical character recognition and image-to-text workflows.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description,
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
          Practical articles on extracting text from images, improving accuracy, and using
          free online OCR for school, work, and everyday documents.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-200 hover:shadow-md"
          >
            <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold text-slate-400">{formatDate(post.date)}</p>
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
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
                  >
                    {tag}
                  </span>
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
    </div>
  );
}

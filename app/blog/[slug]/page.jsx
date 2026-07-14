import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME, OPERATOR_NAME } from "../../lib/site";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "../../lib/blog/posts";
import { getPostMarkdown } from "../../lib/blog/getPostMarkdown";
import MarkdownContent from "../../components/blog/MarkdownContent";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: `${SITE_URL}${post.image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
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
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: OPERATOR_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: url,
    image: `${SITE_URL}${post.image}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-slate-500">
        <Link href="/blog" className="font-semibold text-cyan-700 hover:underline">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{post.title}</span>
      </nav>

      <header className="mt-6">
        <p className="text-xs font-semibold text-slate-400">{formatDate(post.date)}</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <Image
          src={post.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      <MarkdownContent source={markdown} />

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 p-6 text-white sm:p-8">
        <h2 className="text-xl font-bold">Try free OCR now</h2>
        <p className="mt-2 text-sm text-cyan-50">
          Upload an image and extract editable text in your browser — no signup required.
        </p>
        <Link
          href="/#ocr-tool"
          className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-cyan-800 hover:bg-cyan-50"
        >
          Open OCR tool
        </Link>
      </div>

      {related.length > 0 && (
        <aside className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-lg font-bold text-slate-900">Related articles</h2>
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
    </article>
  );
}

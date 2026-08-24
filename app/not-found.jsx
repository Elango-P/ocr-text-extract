import Link from "next/link";
import { SITE_NAME } from "./lib/site";

export const metadata = {
  title: { absolute: `Page not found | ${SITE_NAME}` },
  description:
    "That URL is not a page on OCR Text Extractor. Open the free image-to-text tool, Image to Text, or the blog.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function NotFound() {
  return (
    <article className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">404</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        That URL is not a page on this site. The OCR tool, guides, and policies are still a
        click away.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-700"
        >
          Back to the OCR tool
        </Link>
        <Link
          href="/image-to-text"
          className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-cyan-800 hover:border-cyan-200 hover:bg-cyan-50"
        >
          Image to Text
        </Link>
        <Link
          href="/blog"
          className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-cyan-200 hover:bg-cyan-50"
        >
          Blog
        </Link>
      </div>
    </article>
  );
}

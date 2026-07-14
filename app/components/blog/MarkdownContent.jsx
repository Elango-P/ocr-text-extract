import React from "react";
import Image from "next/image";
import Link from "next/link";

function inlineToNodes(text, keyPrefix) {
  const nodes = [];
  const pattern =
    /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    if (match[2]) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-slate-800">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      nodes.push(
        <em key={`${keyPrefix}-i-${i}`}>{match[3]}</em>
      );
    } else if (match[4]) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${i}`}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800"
        >
          {match[4]}
        </code>
      );
    } else if (match[5] && match[6]) {
      const href = match[6];
      const label = match[5];
      const external = href.startsWith("http");
      if (external) {
        nodes.push(
          <a
            key={`${keyPrefix}-a-${i}`}
            href={href}
            className="font-semibold text-cyan-700 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {label}
          </a>
        );
      } else {
        nodes.push(
          <Link
            key={`${keyPrefix}-a-${i}`}
            href={href}
            className="font-semibold text-cyan-700 hover:underline"
          >
            {label}
          </Link>
        );
      }
    }
    last = match.index + match[0].length;
    i += 1;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseList(lines, start, ordered) {
  const items = [];
  let i = start;
  const re = ordered ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/;

  while (i < lines.length) {
    const m = lines[i].match(re);
    if (!m) break;
    items.push(m[1]);
    i += 1;
  }

  return { items, next: i };
}

/**
 * Lightweight markdown renderer for blog posts (headings, lists, images, links, paragraphs).
 */
export default function MarkdownContent({ source }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const alt = imgMatch[1] || "Article illustration";
      const src = imgMatch[2];
      elements.push(
        <figure key={`img-${key++}`} className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          {alt ? (
            <figcaption className="px-4 py-2 text-center text-xs text-slate-500">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${key++}`} className="mt-8 text-lg font-bold text-slate-900">
          {inlineToNodes(line.slice(4), `h3-${key}`)}
        </h3>
      );
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${key++}`} className="mt-10 text-2xl font-bold tracking-tight text-slate-900">
          {inlineToNodes(line.slice(3), `h2-${key}`)}
        </h2>
      );
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const { items, next } = parseList(lines, i, false);
      elements.push(
        <ul key={`ul-${key++}`} className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {inlineToNodes(item, `uli-${key}-${idx}`)}
            </li>
          ))}
        </ul>
      );
      i = next;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const { items, next } = parseList(lines, i, true);
      elements.push(
        <ol key={`ol-${key++}`} className="mt-4 list-decimal space-y-2 pl-5 text-slate-600">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {inlineToNodes(item, `oli-${key}-${idx}`)}
            </li>
          ))}
        </ol>
      );
      i = next;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i += 1;
      }
      elements.push(
        <blockquote
          key={`bq-${key++}`}
          className="mt-6 border-l-4 border-cyan-400 bg-cyan-50/50 py-3 pl-4 pr-3 text-slate-700"
        >
          {quoteLines.map((q, idx) => (
            <p key={idx} className="leading-relaxed">
              {inlineToNodes(q, `bq-${key}-${idx}`)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].startsWith("!") && !/^[-*]\s+/.test(lines[i]) && !/^\d+\.\s+/.test(lines[i]) && !lines[i].startsWith("> ")) {
      para.push(lines[i]);
      i += 1;
    }
    elements.push(
      <p key={`p-${key++}`} className="mt-4 text-base leading-relaxed text-slate-600">
        {inlineToNodes(para.join(" "), `p-${key}`)}
      </p>
    );
  }

  return <div className="blog-prose">{elements}</div>;
}

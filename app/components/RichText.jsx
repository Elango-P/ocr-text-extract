import Link from "next/link";

/**
 * Renders plain text with optional markdown-style internal links: [label](/path).
 */
export default function RichText({ text, className }) {
  const nodes = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match;
  let i = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const href = match[2];
    const label = match[1];
    const linkClass = "font-semibold text-cyan-700 hover:underline";
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      nodes.push(
        <a key={i} href={href} className={linkClass} rel="noopener noreferrer" target="_blank">
          {label}
        </a>
      );
    } else {
      nodes.push(
        <Link key={i} href={href} className={linkClass}>
          {label}
        </Link>
      );
    }
    last = match.index + match[0].length;
    i += 1;
  }

  if (last < text.length) nodes.push(text.slice(last));

  return <span className={className}>{nodes.length ? nodes : text}</span>;
}

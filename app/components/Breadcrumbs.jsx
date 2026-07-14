import Link from "next/link";
import { SITE_URL } from "../lib/site";

/**
 * Accessible breadcrumb trail + optional BreadcrumbList JSON-LD.
 * @param {{ items: { name: string, href?: string }[] }} props
 */
export default function Breadcrumbs({ items }) {
  if (!items?.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href
        ? { item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.name}-${index}`} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-slate-300" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-slate-700"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="font-semibold text-cyan-700 hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

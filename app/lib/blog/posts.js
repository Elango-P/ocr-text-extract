/**
 * Blog post metadata. Bodies live in /content/blog/{slug}.md
 *
 * `updated` is only set when a post's text has genuinely been revised, so the
 * dateModified we publish in structured data reflects real edits.
 */

export const posts = [
  {
    slug: "ultimate-guide-to-ocr-technology",
    title: "The Ultimate Guide to OCR Technology (2026 Edition)",
    description: "A complete guide to Optical Character Recognition: how OCR works under the hood, which tools to pick, and the practices that raise accuracy.",
    date: "2026-07-15",
    tags: ["Guides", "OCR"],
    image: "/images/ocr-document-scan.webp",
  },
  {
    slug: "ocr-use-cases-and-workflows",
    title: "OCR Use Cases & Workflows (Students, Business & Everyday Life)",
    seoTitle: "OCR Use Cases & Workflows for Students and Business",
    description: "Practical ways to use OCR: lecture slides and notes for students, receipts and invoices for business, plus handwriting workflows.",
    date: "2026-07-15",
    updated: "2026-08-11",
    tags: ["Use Cases", "Workflows"],
    image: "/images/ocr-blog-invoice.webp",
  },
  {
    slug: "ocr-for-developers",
    title: "OCR for Developers: APIs, Python & JavaScript",
    seoTitle: "JavaScript OCR Guide – APIs, Python & Browser OCR",
    description: "A technical overview of OCR for developers: choosing between hosted APIs and self-hosted engines, running Tesseract.js in the browser, and Python workflows.",
    date: "2026-07-15",
    updated: "2026-08-11",
    tags: ["Developers", "API", "JavaScript", "Python"],
    image: "/images/ocr-blog-devtools.webp",
  },
  {
    slug: "advanced-ocr-techniques",
    title: "Advanced OCR Techniques: Accuracy, Preprocessing & PDFs",
    description: "How to lift OCR accuracy with image preprocessing such as thresholding and deskewing, handle scanned PDFs page by page, and keep sensitive files safe.",
    date: "2026-07-15",
    updated: "2026-08-11",
    tags: ["Accuracy", "PDF", "Security"],
    image: "/images/ocr-blog-preprocessing.webp",
  },
  {
    slug: "ocr-accuracy-and-limitations",
    title: "OCR Accuracy and Limitations: What It Gets Right (and Wrong)",
    description: "An honest look at what OCR handles well, where it struggles — print vs handwriting, tables, glare — and why proofreading still matters.",
    date: "2026-08-08",
    updated: "2026-08-11",
    tags: ["Accuracy", "OCR", "Limitations"],
    image: "/images/ocr-blog-accuracy.webp",
  },
  {
    slug: "improve-ocr-low-quality-images",
    title: "How to Improve OCR Results on Low-Quality Images",
    description: "Practical fixes for lighting, cropping, resolution, glare, and compression — and when to just retake the photo.",
    date: "2026-08-09",
    tags: ["Tips", "Preprocessing", "Accuracy"],
    image: "/images/ocr-blog-mobile.webp",
  },
  {
    slug: "ocr-privacy-uploaded-images",
    title: "OCR and Privacy: What Happens to Your Uploaded Images",
    description: "How this site handles images on the AI path vs the browser fallback, what stays local, and guidance for sensitive documents.",
    date: "2026-08-10",
    updated: "2026-08-11",
    tags: ["Privacy", "Security", "OCR"],
    image: "/images/ocr-blog-privacy.webp",
  },
  {
    slug: "ai-ocr-vs-traditional-ocr",
    title: "AI OCR vs Traditional OCR: Gemini vs Tesseract Compared",
    description: "Comparing cloud AI OCR and classical engines like Tesseract on accuracy, privacy, cost, and speed — and when each one wins.",
    date: "2026-08-11",
    updated: "2026-08-11",
    tags: ["AI", "OCR", "Comparison"],
    image: "/images/ocr-blog-ai-vs-tesseract.webp",
  },
  {
    slug: "ocr-engine-benchmark-gemini-vs-tesseract",
    title: "OCR Engine Benchmark: Gemini vs Tesseract (Measured CER)",
    seoTitle: "OCR Benchmark: Gemini vs Tesseract Character Error Rates",
    description:
      "Original 12-image benchmark of Google Gemini vs Tesseract 5 LSTM with published corpus, ground truth, and per-category character error rates.",
    date: "2026-08-11",
    tags: ["Benchmark", "AI", "OCR", "Accuracy", "Comparison"],
    image: "/images/ocr-blog-benchmark.webp",
  },
];

export const POSTS_PER_PAGE = 9;

export function getAllPosts() {
  return [...posts].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    // Newer registry entries (later in `posts`) win on the same calendar day.
    return posts.indexOf(b) - posts.indexOf(a);
  });
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Slice a post list into a page without overlapping items.
 * @param {typeof posts} list
 * @param {number} page 1-based page number
 */
export function paginatePosts(list, page, perPage = POSTS_PER_PAGE) {
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    posts: list.slice(start, start + perPage),
    page: safePage,
    totalPages,
    total,
  };
}

/**
 * Chronological neighbors: previous = older, next = newer.
 * `getAllPosts()` is newest-first, so index-1 is newer and index+1 is older.
 */
export function getAdjacentPosts(slug) {
  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: all[index + 1] || null,
    next: all[index - 1] || null,
  };
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return getAllPosts().slice(0, limit);
  const sameTag = getAllPosts().filter(
    (p) => p.slug !== slug && p.tags.some((t) => current.tags.includes(t))
  );
  const rest = getAllPosts().filter(
    (p) => p.slug !== slug && !sameTag.includes(p)
  );
  return [...sameTag, ...rest].slice(0, limit);
}

/** Map blog tags to relevant OCR tool pages for internal linking. */
const TAG_TOOL_LINKS = {
  PDF: [
    { href: "/pdf-to-text", label: "PDF to Text OCR" },
    { href: "/scanned-document-to-text", label: "Scanned Document to Text" },
  ],
  Accuracy: [
    { href: "/image-to-text", label: "Image to Text Converter" },
    { href: "/screenshot-to-text", label: "Screenshot to Text" },
  ],
  Tips: [
    { href: "/image-to-text", label: "Image to Text Converter" },
    { href: "/screenshot-to-text", label: "Screenshot to Text" },
  ],
  Preprocessing: [
    { href: "/image-to-text", label: "Image to Text Converter" },
    { href: "/scanned-document-to-text", label: "Scanned Document to Text" },
  ],
  Privacy: [{ href: "/image-to-text", label: "Image to Text Converter" }],
  Security: [{ href: "/image-to-text", label: "Image to Text Converter" }],
  AI: [
    { href: "/image-to-text", label: "Image to Text Converter" },
    { href: "/screenshot-to-text", label: "Screenshot to Text" },
  ],
  Comparison: [
    { href: "/image-to-text", label: "Image to Text Converter" },
    { href: "/handwriting-to-text", label: "Handwriting to Text" },
  ],
  Benchmark: [
    { href: "/image-to-text", label: "Image to Text Converter" },
    { href: "/screenshot-to-text", label: "Screenshot to Text" },
  ],
  "Use Cases": [
    { href: "/receipt-to-text", label: "Receipt to Text" },
    { href: "/handwriting-to-text", label: "Handwriting to Text" },
  ],
  Workflows: [
    { href: "/receipt-to-text", label: "Receipt to Text" },
    { href: "/image-to-word", label: "Image to Word" },
    { href: "/image-to-pdf", label: "Convert images into a PDF" },
  ],
  Developers: [{ href: "/image-to-text", label: "Image to Text Converter" }],
  Guides: [{ href: "/image-to-text", label: "Image to Text Converter" }],
  OCR: [{ href: "/image-to-text", label: "Image to Text Converter" }],
};

const DEFAULT_TOOL_LINKS = [
  { href: "/image-to-text", label: "Image to Text Converter" },
  { href: "/screenshot-to-text", label: "Screenshot to Text" },
  { href: "/pdf-to-text", label: "PDF to Text OCR" },
];

export function getRelatedToolsForPost(slug, limit = 3) {
  const post = getPostBySlug(slug);
  if (!post) return DEFAULT_TOOL_LINKS.slice(0, limit);

  const seen = new Set();
  const links = [];

  for (const tag of post.tags) {
    for (const link of TAG_TOOL_LINKS[tag] || []) {
      if (!seen.has(link.href)) {
        seen.add(link.href);
        links.push(link);
      }
    }
  }

  for (const link of DEFAULT_TOOL_LINKS) {
    if (links.length >= limit) break;
    if (!seen.has(link.href)) {
      seen.add(link.href);
      links.push(link);
    }
  }

  return links.slice(0, limit);
}

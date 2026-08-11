/** Blog post metadata. Bodies live in /content/blog/{slug}.md */

export const posts = [
  {
    slug: "ultimate-guide-to-ocr-technology",
    title: "The Ultimate Guide to OCR Technology (2026 Edition)",
    description: "A comprehensive guide to Optical Character Recognition: how it works, tools, and best practices.",
    date: "2026-07-15",
    tags: ["Guides", "OCR"],
    image: "/images/ocr-document-scan.webp",
  },
  {
    slug: "ocr-use-cases-and-workflows",
    title: "OCR Use Cases & Workflows (Students, Business & Everyday Life)",
    description: "Practical applications of OCR technology for students, businesses, receipts, invoices, and handwriting.",
    date: "2026-07-15",
    tags: ["Use Cases", "Workflows"],
    image: "/images/ocr-blog-invoice.webp",
  },
  {
    slug: "ocr-for-developers",
    title: "OCR for Developers: APIs, Python & JavaScript",
    description: "Technical overview of OCR implementations for developers, including APIs, Tesseract.js, and Python workflows.",
    date: "2026-07-15",
    tags: ["Developers", "API", "JavaScript", "Python"],
    image: "/images/ocr-blog-devtools.webp",
  },
  {
    slug: "advanced-ocr-techniques",
    title: "Advanced OCR Techniques: Accuracy, Preprocessing & PDFs",
    description: "Learn how to improve OCR accuracy through image preprocessing, handling PDFs, and security best practices.",
    date: "2026-07-15",
    tags: ["Accuracy", "PDF", "Security"],
    image: "/images/ocr-blog-accuracy.webp",
  },
  {
    slug: "ocr-accuracy-and-limitations",
    title: "OCR Accuracy and Limitations: What It Gets Right (and Wrong)",
    description: "An honest look at what OCR handles well, where it struggles — print vs handwriting, tables, glare — and why proofreading still matters.",
    date: "2026-08-08",
    tags: ["Accuracy", "OCR", "Limitations"],
    image: "/images/ocr-blog-accuracy.webp",
  },
  {
    slug: "improve-ocr-low-quality-images",
    title: "How to Improve OCR Results on Low-Quality Images",
    description: "Practical fixes for lighting, cropping, resolution, glare, and compression — and when to just retake the photo.",
    date: "2026-08-09",
    tags: ["Tips", "Preprocessing", "Accuracy"],
    image: "/images/ocr-blog-devtools.webp",
  },
  {
    slug: "ocr-privacy-uploaded-images",
    title: "OCR and Privacy: What Happens to Your Uploaded Images",
    description: "How this site handles images on the AI path vs the browser fallback, what stays local, and guidance for sensitive documents.",
    date: "2026-08-10",
    tags: ["Privacy", "Security", "OCR"],
    image: "/images/ocr-blog-privacy.webp",
  },
  {
    slug: "ai-ocr-vs-traditional-ocr",
    title: "AI OCR vs Traditional OCR: Gemini vs Tesseract Compared",
    description: "Comparing cloud AI OCR and classical engines like Tesseract on accuracy, privacy, cost, and speed — and when each one wins.",
    date: "2026-08-11",
    tags: ["AI", "OCR", "Comparison"],
    image: "/images/ocr-document-scan.webp",
  },
];

export function getAllPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
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

/** Blog post metadata. Bodies live in /content/blog/{slug}.md */

export const posts = [
  {
    slug: "how-to-extract-text-from-images",
    title: "How to Extract Text from Images",
    description:
      "Step-by-step guide to converting screenshots, photos, and scans into editable text with free online OCR.",
    date: "2026-06-02",
    tags: ["Tutorial", "OCR"],
    image: "/images/ocr-document-scan.webp",
  },
  {
    slug: "ocr-vs-manual-typing",
    title: "OCR vs Manual Typing: When to Use Each",
    description:
      "Compare optical character recognition with retyping documents by hand — speed, accuracy, and when OCR wins.",
    date: "2026-06-04",
    tags: ["Guides", "Productivity"],
    image: "/images/ocr-screenshot-example.webp",
  },
  {
    slug: "best-ocr-tools-2026",
    title: "Best OCR Tools in 2026",
    description:
      "A practical look at online and offline OCR options in 2026, including free image-to-text tools.",
    date: "2026-06-06",
    tags: ["Comparison", "Tools"],
    image: "/images/ocr-phone-photo.webp",
  },
  {
    slug: "jpg-to-text-converter",
    title: "JPG to Text Converter: Extract Text from JPEG Images",
    description:
      "Convert JPG and JPEG photos into editable text online. Tips for clear extraction from camera shots.",
    date: "2026-06-08",
    tags: ["Formats", "JPG"],
    image: "/images/ocr-phone-photo.webp",
  },
  {
    slug: "png-to-text-converter",
    title: "PNG to Text Converter: Turn Screenshots into Text",
    description:
      "Use PNG screenshots and UI captures with OCR to get clean, copyable text without retyping.",
    date: "2026-06-10",
    tags: ["Formats", "PNG"],
    image: "/images/ocr-screenshot-example.webp",
  },
  {
    slug: "pdf-ocr-guide",
    title: "PDF OCR Guide: Digitizing Scanned Documents",
    description:
      "How to get text from scanned PDFs using page images and online OCR — workflow, tips, and limits.",
    date: "2026-06-12",
    tags: ["PDF", "Documents"],
    image: "/images/ocr-document-scan.webp",
  },
  {
    slug: "handwriting-ocr",
    title: "Handwriting OCR: What Works and What Doesn’t",
    description:
      "Realistic expectations for handwritten text recognition, photo tips, and how to improve results.",
    date: "2026-06-14",
    tags: ["Handwriting", "Accuracy"],
    image: "/images/ocr-phone-photo.webp",
  },
  {
    slug: "ocr-accuracy-tips",
    title: "OCR Accuracy Tips: Get Better Text Extraction",
    description:
      "Improve OCR results with lighting, crop, resolution, language settings, and Clean Mode.",
    date: "2026-06-16",
    tags: ["Accuracy", "Tips"],
    image: "/images/ocr-document-scan.webp",
  },
  {
    slug: "scan-documents-online",
    title: "Scan Documents Online and Extract Text",
    description:
      "Turn phone photos of paper documents into searchable, editable text with free online OCR.",
    date: "2026-06-18",
    tags: ["Scanning", "Mobile"],
    image: "/images/ocr-phone-photo.webp",
  },
  {
    slug: "ocr-for-students",
    title: "OCR for Students: Notes, Handouts, and Research",
    description:
      "How students use image-to-text for notes, whiteboard photos, textbooks excerpts, and study workflows.",
    date: "2026-06-20",
    tags: ["Education", "Students"],
    image: "/images/ocr-screenshot-example.webp",
  },
  {
    slug: "ocr-for-businesses",
    title: "OCR for Businesses: Receipts, Forms, and Archives",
    description:
      "Practical business uses of OCR — digitizing receipts, forms, and paper archives without heavy software.",
    date: "2026-06-22",
    tags: ["Business", "Workflows"],
    image: "/images/ocr-document-scan.webp",
  },
  {
    slug: "ocr-api-guide",
    title: "OCR API Guide: Building Text Extraction Into Apps",
    description:
      "Overview of OCR APIs vs in-browser OCR, rate limits, privacy, and when a free web tool is enough.",
    date: "2026-06-24",
    tags: ["Developers", "API"],
    image: "/images/ocr-screenshot-example.webp",
  },
  {
    slug: "ocr-in-javascript",
    title: "OCR in JavaScript: Browser-Based Text Recognition",
    description:
      "How JavaScript OCR works with engines like Tesseract.js, plus when to prefer cloud AI OCR.",
    date: "2026-06-26",
    tags: ["JavaScript", "Developers"],
    image: "/images/ocr-screenshot-example.webp",
  },
  {
    slug: "ocr-in-nodejs",
    title: "OCR in Node.js: Server-Side Text Extraction",
    description:
      "Approaches to running OCR from Node.js backends, privacy trade-offs, and hybrid browser fallbacks.",
    date: "2026-06-28",
    tags: ["Node.js", "Developers"],
    image: "/images/ocr-document-scan.webp",
  },
  {
    slug: "ocr-for-mobile",
    title: "OCR for Mobile: Extract Text from Phone Photos",
    description:
      "Use mobile browsers to photograph documents and convert them to editable text on the go.",
    date: "2026-06-30",
    tags: ["Mobile", "Tutorial"],
    image: "/images/ocr-phone-photo.webp",
  },
  {
    slug: "what-is-ocr",
    title: "What Is OCR? Optical Character Recognition Explained",
    description:
      "A plain-language explanation of OCR, how it works, common use cases, and accuracy limits.",
    date: "2026-07-02",
    tags: ["Basics", "OCR"],
    image: "/images/ocr-document-scan.webp",
  },
  {
    slug: "image-to-text-without-installing-software",
    title: "Image to Text Without Installing Software",
    description:
      "Convert images to text in your browser — no desktop install, no account required.",
    date: "2026-07-04",
    tags: ["Browser", "Tutorial"],
    image: "/images/ocr-screenshot-example.webp",
  },
  {
    slug: "convert-screenshots-to-editable-text",
    title: "How to Convert Screenshots to Editable Text",
    description:
      "Turn UI screenshots and error dialogs into copy-pasteable text with Clean Mode and OCR.",
    date: "2026-07-06",
    tags: ["Screenshots", "Tutorial"],
    image: "/images/ocr-screenshot-example.webp",
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

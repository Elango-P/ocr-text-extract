# OCR Blog Strategy

## Live Posts (8)

Wave 1 (29 short posts) was consolidated into four long-form guides, each redirected from every old slug via `next.config.mjs`. Wave 2 (4 new, focused posts) has since shipped alongside them. These eight are the current live posts:

**Wave 1 → consolidated guides**

| Slug | Title | Angle |
| --- | --- | --- |
| `ultimate-guide-to-ocr-technology` | The Ultimate Guide to OCR Technology (2026 Edition) | Fundamentals, tutorial, tool comparison, trust checklist |
| `ocr-use-cases-and-workflows` | OCR Use Cases & Workflows | Students, businesses, invoices, receipts, mobile, whiteboards, handwriting, old books, ID caution |
| `ocr-for-developers` | OCR for Developers: APIs, Python & JavaScript | Architecture, production patterns, JS/Python implementation |
| `advanced-ocr-techniques` | Advanced OCR Techniques: Accuracy, Preprocessing & PDFs | Preprocessing, PDFs, screenshots, privacy/security |

**Wave 2 → new focused posts**

| Slug | Title | Angle |
| --- | --- | --- |
| `ocr-accuracy-and-limitations` | OCR Accuracy and Limitations: What It Gets Right (and Wrong) | Honest strengths/weaknesses breakdown, no fabricated accuracy numbers |
| `improve-ocr-low-quality-images` | How to Improve OCR Results on Low-Quality Images | Lighting, cropping, resolution, glare, compression fixes |
| `ocr-privacy-uploaded-images` | OCR and Privacy: What Happens to Your Uploaded Images | AI path vs. browser-fallback data handling, sensitivity triage |
| `ai-ocr-vs-traditional-ocr` | AI OCR vs Traditional OCR: Gemini vs Tesseract Compared | Head-to-head on accuracy, privacy, cost, speed, offline capability |

Registry: `app/lib/blog/posts.js`. Bodies: `content/blog/{slug}.md`.

## Why Consolidation Happened

The original 29 short posts (Wave 1A + 1B) were thin, repetitive, and diluted AdSense/SEO value across near-duplicate pages. They were merged into the four guides above by topic cluster, and every old slug 301-redirects to its consolidated replacement (see `next.config.mjs`). Don't re-fragment those four topics with new posts — extend the relevant guide instead, unless a new angle is genuinely distinct (that's what Wave 2 was for).

## Editorial Standards for All Posts

- One coherent voice per article — no stitched-together sections, no repeated "Try It" / "Related Reading" blocks.
- Mention product specifics (imgtotext.in, Clean Mode, language count, daily AI limit) only where relevant to the point being made — not in every section.
- No invented statistics, testimonials, or accuracy percentages. If we haven't measured it, don't quote a number for it.
- Internal links only to live URLs: the 8 posts above, `/image-to-text`, `/pdf-to-text`, `/handwriting-to-text`, `/how-it-works`, `/faq`, `/privacy-policy`, `/about`, `/`.
- Keep product facts accurate: AI OCR via Gemini runs first by default (images are uploaded to the server for that path); users can enable Local OCR only to skip AI; Tesseract.js is the in-browser fallback/local path; 10 AI uses per visitor per day; no permanent image archive; 12 supported languages; PNG/JPG/JPEG/WEBP/GIF formats.
- Prefer shortening over expanding. Cut a section rather than pad it.

## Wave 3 Backlog (new posts, not yet written)

Only one clearly distinct angle remains from the original Wave 2 shortlist; add more here only when there's a genuinely new angle not already covered by a live post.

| # | Title | Angle |
| --- | --- | --- |
| 1 | OCR for Indian Languages: Hindi, and What's Still Hard | Script-specific realities for Indian-language documents, mixed-script pages, and what to expect from current tools |

Keep this list short and current — remove an idea once it's published, and don't add a new one unless it can't be folded into an existing live post instead.

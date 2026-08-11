# AdSense & Quality Readiness Report

_Last audit: 11 August 2026. Verified against a production build (`next build` + `next start`), crawling all 28 indexable URLs._

No one can guarantee AdSense approval — reviews include a human judgement call. This report describes what was measured, what changed, and what is still open.

---

## 1. Scores

| Area | Score | Basis |
|---|---|---|
| AdSense readiness | 84 / 100 | Fabricated stats gone, thin cluster consolidated, consent + ad labelling correct. Site is young and the AI-vs-human-written question is a reviewer judgement call. |
| SEO | 90 / 100 | Crawl of 28 pages: 0 broken links, 0 duplicate titles/descriptions/canonicals, valid structured data throughout. |
| UX | 85 / 100 | Cancel, paste, mobile ordering and export warnings all fixed. Untested on real handsets. |
| Technical | 88 / 100 | Clean build, no lint errors, valid PDF output, working API, CSP configured. |
| Trust / E-E-A-T | 87 / 100 | Named operator, real contact route, accurate privacy and retention docs, honest limitations. No third-party corroboration exists yet. |

The single largest risk is no longer content quality — it is that **the live site is still running an old commit**. See section 10.

---

## 2. What the automated audit checks now

Three reusable scripts were added under `scripts/`:

- `audit_site.py` — crawls every URL in the sitemap and verifies HTTP status, single H1, no skipped heading levels, `alt` on every image, canonical presence, title/description length, uniqueness of title/description/canonical, and that every internal link resolves.
- `audit_extras.py` — verifies redirects return 308, parses every JSON-LD block, and prints robots.txt.
- `verify_pdf_export.mjs` — asserts the exported PDF's xref byte offsets point at real objects, across ASCII, Latin-1, mixed-script and multi-page inputs.

Current result: **28 pages crawled, 45 internal link targets, zero problems.**

---

## 3. Pages created this pass

| Path | Why it exists as its own page |
|---|---|
| `/screenshot-to-text` | Screenshots are pixel-perfect input; the failure modes are dark mode, chat-app compression, and code — nothing to do with photo advice. |
| `/receipt-to-text` | Thermal paper chemistry, curl and folds, and why figures need checking. Covers invoices in depth. |
| `/scanned-document-to-text` | Scanner settings that genuinely matter, bleed-through, skew, multi-page stacks. |
| `/image-to-word` | Backed by the real DOCX export. Explains that it produces plain paragraphs, and why partial layout recovery is worse than none. |
| `/image-to-pdf` | Backed by the real PDF export. Separates "wrap my photo in a PDF" from "make the text searchable", and states the Latin-1 font limit plainly. |

`/jpg-to-text`, `/png-to-text` and `/invoice-to-text` were **deliberately not created**. JPG and PNG behave identically through this pipeline, so separate pages would be keyword-swapped duplicates — the exact pattern Google calls doorway pages. They redirect to `/image-to-text`; `/invoice-to-text` redirects to `/receipt-to-text`, which has a substantial invoice section.

---

## 4. Bugs found and fixed

**PDF export silently corrupted non-Latin text.** The exporter replaced every character above U+00FF with `?`, so Hindi, Tamil or Chinese output became a row of question marks with no warning — while the site advertises 12+ languages. Fixed in three parts:

- The font object had no `/Encoding`, so bytes above 0x7F rendered as Type 1 StandardEncoding glyphs. `Café Müller — Genève` came out as `CafØ Mller ? GenŁve`. Adding `/WinAnsiEncoding` fixed it.
- Byte offsets in the xref table were computed with `TextEncoder` (UTF-8) while the file is Latin-1, so any accented character shifted every subsequent offset and produced a subtly malformed PDF. Now encoded as Latin-1 bytes with a running byte counter.
- Common Unicode punctuation (curly quotes, en/em dashes, ellipses, bullets) is now mapped to its CP1252 byte instead of becoming `?`. This matters constantly in ordinary English OCR output.

Scripts that cannot be represented still degrade, but the user now gets an explicit warning naming the problem and pointing at DOCX or TXT. Verified by rendering exported PDFs through `pdftotext`.

**Ad container was hidden from screen readers while remaining focusable.** `AdUnit` wrapped the `<ins>` in `aria-hidden="true"`. The injected ad frame is focusable, so keyboard and screen-reader users could tab into a region that announced nothing — a WCAG failure. Replaced with a labelled `<aside>` carrying a visible "Advertisement" heading, which also satisfies the AdSense expectation that ads be distinguishable from content.

**Navigation could drift out of sync.** `SiteLayout` kept its own hardcoded copy of the tool paths alongside `TOOL_ROUTES`. Both are now derived from the single registry.

---

## 5. Content integrity

- Every hero image is now unique — 16 images, 16 pages. Three new ones were generated in the existing house style, and the previously shipped `ocr-blog-pdf-pages.webp` had its heading running off the canvas, which is fixed.
- `dateModified` in Article schema, `modifiedTime` in Open Graph, and sitemap `lastmod` now reflect genuine edits via an `updated` field, set only on posts actually revised. Publish dates were **not** backdated to fake an organic cadence.
- Rate-limit wording corrected sitewide from "per visitor" to "per day per IP address". Confirmed against a live API call: `limit: 10, remaining: 9, resetAt: 2026-08-12T00:00:00Z`.
- "Worked example / What we saw" relabelled to "Walkthrough / What to expect", since no such tests were run.

---

## 6. SEO state

All 28 pages carry a unique title, description and self-referencing canonical. Titles for tool pages and articles are now `absolute` — the ` | OCR Text Extractor` suffix was pushing them to 66–83 characters, past what Google renders.

Structured data verified as parseable on every page: `WebSite`, `Organization`, `Person` and `SoftwareApplication` sitewide; `BreadcrumbList` on every sub-page; `FAQPage`, `HowTo` and `WebApplication` on tool pages; `BlogPosting` on articles. No review, rating or offer markup — nothing that would be false.

---

## 7. Ad placement

Three placements, all consent-gated and rendering nothing when consent is refused or no client ID is set: after the tool on the homepage, mid-content on tool landing pages, after the article body. Each is now labelled "Advertisement".

This is a sound layout. Do not add ads inside the tool panel, between the upload area and the results box, or adjacent to the Copy and Download buttons — those are exactly the placements that read as deceptive.

One thing to watch: `data-ad-format="auto"` with `minHeight: 90` can shift layout when a taller unit fills. If Core Web Vitals shows CLS problems after ads go live, set a fixed height per breakpoint.

---

## 8. Performance

Client chunks total 836 KB, largest 221 KB (framework). Tesseract.js is loaded from CDN only when browser OCR actually runs, so it costs nothing on first paint. Fonts are self-hosted through `next/font`. Images are WebP and served through `next/image` except the two user-upload previews, which are blob URLs that `next/image` cannot optimise — those two lint warnings are correct and should stay.

---

## 9. Remaining problems

1. **The live site is stale.** This is the one that matters. See below.
2. Non-Latin scripts still cannot be embedded in PDF export. Warned, not solved. Solving it means shipping a Unicode font, which would add megabytes to a download currently measured in kilobytes.
3. PDF line wrapping counts characters rather than measuring rendered width, so unusually wide text breaks slightly early.
4. Real-device mobile testing has not been done — the layout changes were verified by build and code review only.
5. The site is new, with no inbound links or external corroboration. Nothing to do here but wait.
6. `content/blog/_strategy.md` remains in the repo. It is never served or indexed, but it documents the earlier scaled-content approach and is worth deleting.

---

## 10. Do this before anything else

**Deploy.** The live site at `imgtotext.in` is still serving commit `83435f7`, which contains the 24 thin blog posts and the fabricated accuracy statistics and case studies. AdSense is already loading on it. Every improvement described above exists only in the working tree.

If a reviewer looks at the site today, they see the version with invented statistics. Deploying is not the last step of this work — it is the one that makes any of it count.

After deploying:

1. Submit the sitemap in Search Console and confirm 28 URLs are discovered.
2. Run the three old-slug redirects through Search Console's URL inspection to confirm Google follows them.
3. Test the tool on a real phone — upload, paste, extract, copy, and all three downloads.
4. Export a PDF containing Hindi or Tamil text and confirm the warning appears.
5. Re-run `python3 scripts/audit_site.py` against production rather than localhost.
6. Confirm `ads.txt` is reachable at the domain root once your publisher ID is set.

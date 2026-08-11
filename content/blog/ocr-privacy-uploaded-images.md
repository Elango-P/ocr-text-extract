Uploading a photo to an OCR tool feels like a small, disposable action — but it's still a decision about where your data goes. This article explains, in plain terms, what actually happens to an image when you use [OCR Text Extractor](https://imgtotext.in), how the two processing paths differ, and how to think about sensitive documents no matter which OCR tool you use.

![OCR document scan example](/images/ocr-blog-privacy.webp)

## Two Paths, Two Different Data Journeys

This site processes images one of two ways, and they have meaningfully different privacy profiles.

### The AI path (default)

When you click Extract, your image is sent from your browser to our server, then forwarded to Google's Gemini API for recognition through our `/api/ocr` route. We do not permanently store your image on our servers — it passes through for the purpose of extraction. The image is subject to Google's own processing and privacy terms for that request, since Google is the party actually running the AI model. You get up to 10 AI OCR uses per visitor per day on this path.

### The browser fallback path (Tesseract.js)

If AI OCR fails, returns nothing useful, or you've used your daily AI allowance, the site falls back to Tesseract.js — an OCR engine that runs entirely inside your browser via WebAssembly. On this path, your image is never uploaded anywhere; recognition happens locally on your device. This is the more private of the two paths by design, at the cost of somewhat lower accuracy on difficult or handwritten inputs (see [OCR Accuracy and Limitations](/blog/ocr-accuracy-and-limitations)).

Both paths are described step by step in [How It Works](/how-it-works).

## What We Don't Do

- We do not permanently store uploaded images on our servers.
- We don't require an account, so we're not tying uploads to a persistent user profile on our end.
- Local browser session data — like extracted text shown on the page — clears when you close the tab.

## What's Outside Our Control

Being transparent means naming the parts we don't control too:

- When your image goes through the AI path, Google processes it as part of running the Gemini API request. That processing is governed by Google's own privacy policy and Gemini API terms, not ours — we link to both in our [Privacy Policy](/privacy-policy).
- Standard web hosting logs (IP address, browser type, timestamps) are common infrastructure-level logging, separate from image content, and not something any web app can fully opt out of while still functioning.
- If advertising is enabled on the site, Google AdSense may set cookies for ad delivery — unrelated to your OCR images, but worth knowing about. Details and opt-outs are in the [Privacy Policy](/privacy-policy).

For full specifics — including data retention timelines — read the [Privacy Policy](/privacy-policy) directly rather than relying on any summary, including this one.

## How to Think About This Generally, Not Just Here

Every OCR tool that offers cloud/AI-quality recognition has to send image data somewhere off your device for that path to work — that's true of this site, and it's true of essentially every AI-powered OCR product on the market. The meaningful questions to ask about any tool are:

1. Does it say plainly whether images are stored, and for how long?
2. Is there a fallback that keeps sensitive images entirely on-device?
3. Who is the actual AI processor, and what are their terms?
4. Is there a real privacy policy, or just marketing language about "bank-level encryption" with no specifics?

A tool that answers those clearly deserves more trust than one that only offers reassuring adjectives.

## A Simple Sensitivity Triage Before You Upload

Not every image carries the same risk. A quick, practical way to think about it:

- **Low sensitivity** — public flyers, published articles, already-shared screenshots. Upload freely.
- **Medium sensitivity** — internal notes, meeting agendas without credentials. Crop tightly to just what you need.
- **High sensitivity** — financial statements, medical records, unreleased business documents. Consider whether OCR is even necessary, and if so, prefer cropping out anything not required.
- **Regulated identity documents** — passports, driver's licenses, national ID numbers (Aadhaar, SSNs, etc.). Treat these with extra caution. See our note on this in [OCR Use Cases & Workflows](/blog/ocr-use-cases-and-workflows), and remember that OCR tools in general — including AI-based ones — are not designed or vetted for identity-verification or compliance workflows involving government IDs.

If you wouldn't paste the resulting text into a public chat, pause and reconsider the upload.

## Practical Habits for Sensitive Documents

- **Crop first.** Only include the region you actually need text from — this is both a privacy win and an accuracy win (see [Improve OCR Accuracy on Low-Quality Images](/blog/improve-ocr-low-quality-images)).
- **Cover what you don't need.** If you only need a name from a form, physically cover the account number before photographing.
- **Prefer the browser fallback for anything you don't want leaving your device**, understanding that accuracy may be somewhat lower, especially on handwriting or noisy images.
- **Don't rely on OCR sites, including this one, for identity-document workflows** that require compliance guarantees — that's not what a free consumer OCR tool is built or certified for.
- **Clear your local session** (close the tab, or use private browsing) on shared or public computers.

## What This Site Is Not

Being direct about scope: this is a general-purpose text extraction tool for everyday images — screenshots, notes, receipts, printed pages. It is not:

- A HIPAA-compliant medical records processor
- A certified identity-verification service
- A permanent cloud storage or backup product for your images
- A guarantee that a third-party AI provider's own infrastructure is immune to outages or incidents on their end

If your use case requires contractual data-processing guarantees (a DPA, specific retention SLAs, regional data residency), that's a conversation for enterprise-grade vendors, not a free web tool.

## FAQ

**Are my images stored after OCR finishes?**
No — we do not permanently store uploaded images on our servers. See the [Privacy Policy](/privacy-policy) for full detail.

**Does the browser fallback ever upload my image?**
No. Tesseract.js runs locally in your browser; that pass does not send the image to our servers.

**What happens to images sent through the AI path?**
They're forwarded to Google's Gemini API for the purpose of extracting text, governed by Google's own privacy terms for that processing.

**Is this site suitable for scanning passports or ID cards?**
We'd urge caution. Treat identity documents as high-sensitivity and consider whether OCR is the right tool at all for that use case.

## Related Reading

- [OCR Accuracy and Limitations](/blog/ocr-accuracy-and-limitations) — understanding the trade-offs of each path
- [AI OCR vs Traditional OCR](/blog/ai-ocr-vs-traditional-ocr) — the technical difference behind the privacy difference
- [OCR Use Cases & Workflows](/blog/ocr-use-cases-and-workflows) — sensitive document handling by scenario
- [How It Works](/how-it-works) — the full processing pipeline

Read the full [Privacy Policy](/privacy-policy), browse the [FAQ](/faq), or try a low-sensitivity image at [Image to Text](/image-to-text) to see the flow for yourself.

Receipts are short, dense, and hostile to OCR: thermal fade, narrow columns, tiny fonts, and logos that look like letters. Still, extracting text with a free tool like [imgtotext.in](https://imgtotext.in) beats retyping line items when you are filing expenses or reconciling a trip.

![Phone photo OCR example](/images/ocr-phone-photo.webp)

## What You Can Realistically Pull

OCR is good at recovering:

- Merchant names in plain print  
- Dates and times in common formats  
- Line descriptions when contrast is decent  
- Totals—**if you verify them**  

OCR is weak at:

- Embossed card brands as graphics  
- QR-only payloads (those need a QR reader, not OCR)  
- Severely faded thermal paper weeks later  
- Handwritten tips on the signature line ([/blog/handwriting-ocr](/blog/handwriting-ocr))  

Treat every amount as unverified until you compare it to the paper or payment app.

## Capture Tips Specific to Receipts

1. **Photograph the same day**—thermal prints fade.  
2. **Flatten curls** under a clear notebook cover if needed; avoid glare.  
3. **Shoot perpendicular** to the paper; perspective squeezes digit widths.  
4. **Include the full total block**; cropping mid-number is a classic own-goal.  
5. Prefer a dark backdrop so white thermal edges stay crisp.  

Mobile habits: [/blog/ocr-for-mobile](/blog/ocr-for-mobile). Preprocessing: [/blog/image-preprocessing-for-ocr](/blog/image-preprocessing-for-ocr). Format: [/image-to-text](/image-to-text).

## Extract Workflow on imgtotext.in

1. Open [https://imgtotext.in](https://imgtotext.in) or jump via [/image-to-text](/image-to-text).  
2. Upload PNG, JPG, JPEG, WEBP, or GIF.  
3. Set language (English is common for US receipts; use the correct locale language among the twelve supported when traveling).  
4. Try Clean Mode off first for speckled thermal; try on for crisp laser-printed invoices-that-look-like-receipts.  
5. Run free AI OCR (Gemini via their API). After **10 AI OCR uses per visitor per day**, browser Tesseract.js remains available—fine for clear reprints, harder for faded rolls.  
6. Copy text into your expense tool or download TXT.  

How it works: [/how-it-works](/how-it-works). Privacy for receipts that show card stubs: [/privacy-policy](/privacy-policy), [/blog/ocr-security-privacy](/blog/ocr-security-privacy).

## Privacy Minimization on Receipts

Many receipts show partial card numbers, loyalty phones, or barcodes. Crop to the merchant, date, items, and total when that is all accounting needs. Do not upload a full wallet dump photo. Business context: [/blog/ocr-for-businesses](/blog/ocr-for-businesses).

## Worked Example: Multi-Line Cafe Receipt

Maya photographs a 18-line cafe receipt under window light. First OCR invents a `$B.50` latte. She retakes without shadow, crops the logo, retries AI OCR, and gets `$4.50`. She still confirms against the payment notification before submitting reimbursement. The OCR saved typing; it did not replace approval judgment.

## Real-World Test: The Crumpled Coffee Receipt

To demonstrate typical OCR performance on receipts, we tested a common scenario: a slightly crumpled, thermal-printed coffee shop receipt photographed under standard office lighting with a phone. 

![Real-world coffee receipt test](/images/case-study-receipt-raw.jpg)

Here is a side-by-side comparison of the raw image text versus what the AI-powered OCR extracted (with Clean Mode enabled):

| Source Area | What the Human Sees | What the OCR Extracted | Notes |
|-------------|-------------------|------------------------|-------|
| Header | `CUP & BEAN CAFE` | `CUP & BEAN CAFE` | Perfect match, high contrast. |
| Timestamp | `10/24/2026 08:42 AM` | `10/24/2026 08:42 AM` | Perfect match. |
| Item 1 | `1x Lg Oat Latte $4.50` | `1x Lg Oat Latte $4.50` | Perfect match. |
| Item 2 | `1x Muffin - Blueberry $3.25` | `1x Muffn - Blueberry $3.25` | Minor typo: missed 'i' in Muffin due to thermal fade. |
| Tax | `Tax: $0.62` | `Tax: S0.62` | Common error: `$` read as `S`. |
| **Total** | **`TOTAL: $8.37`** | **`TOTAL: $8.37`** | **Perfect match.** |

**The Verdict:** The AI OCR successfully extracted all critical data (merchant, date, line items, and total). The minor errors (`S` instead of `$`, and a missed `i`) took just 2 seconds to manually fix in the text output, saving approximately 45 seconds of manual typing.

## Organizing Extracted Receipt Text

- Filename pattern: `2026-07-09_vendor_total.txt`  
- Keep the image only as long as policy requires.  
- Paste merchant + total into the spreadsheet first; flesh out line items only when auditors ask.  
- For PDF packets of many receipts, rasterize pages and treat each like an image—see [/blog/pdf-ocr-guide](/blog/pdf-ocr-guide) and [/pdf-to-text](/pdf-to-text).  

Invoice-scale process differs slightly: [/blog/invoice-ocr-workflow](/blog/invoice-ocr-workflow).

## Advantages

- Faster expense drafts than typing twenty SKUs  
- Searchable archives when TXT is filed consistently  
- Works from a phone browser after lunch without installing finance OCR suites  
- Hybrid AI + Tesseract fallback covers both hard thermal prints and clean reprints  

Screenshot of a digital receipt email? Prefer PNG capture and [/image-to-text](/image-to-text) or [/blog/convert-screenshots-to-editable-text](/blog/convert-screenshots-to-editable-text).

## Limitations

- Tax authorities care about originals or compliant images—not OCR text alone. Keep required evidence.  
- Currency symbols and thousand separators confuse engines across locales.  
- Vertical receipts longer than the camera frame need two shots stitched mentally—or overlap and OCR twice, then merge carefully.  
- Logos as wordmarks may duplicate the merchant name strangely; delete the duplicate line.  

Accuracy playbook: [/blog/ocr-accuracy-tips](/blog/ocr-accuracy-tips). Trust checklist: [/blog/free-online-ocr-checklist](/blog/free-online-ocr-checklist).

## Best Practices

1. Capture early; thermal fades.  
2. Crop logos and ads that are not needed.  
3. Verify every total and tax line.  
4. Budget AI OCR for wrinkled or faint slips.  
5. Redact card remnants when sharing extracts with teammates.  
6. Prefer digital PDF invoices from vendors when available—they often already have text layers.  
7. Ask FAQ edge cases at [/faq](/faq).  

## Travel Day Pattern

On travel days you may hit the AI daily cap. Photograph receipts into an `ocr-inbox` album, convert the worst (faded, wrinkled) with AI first, and leave crisp hotel printouts for browser OCR or the next day’s quota. Pair with [/blog/ocr-vs-manual-typing](/blog/ocr-vs-manual-typing) when a three-line taxi slip is faster to type than to photograph.

## Common OCR Failure Modes on Receipts

Watch for these patterns when reviewing extracts:

- Decimal commas versus dots flipped by locale assumptions  
- `S` for `$` or `€` misread as `E`  
- Merchant name duplicated from logo OCR plus printed header  
- Quantity `2x` glued to the item description  
- Tax line labeled `VAT` absorbed into the previous item  

Keep a personal list of failure modes you have seen; review becomes faster. Share that list with teammates who rotate expense duty.

## Card Stubs and Tip Lines

Restaurant slips often include a blank tip line and a signed total. Handwritten tip amounts should be typed by you from the paper, not trusted to OCR. Card stub last-four digits may be required by some finance tools—minimize how many systems store them. Prefer accounting integrations that pull digital card feeds when your organization has them; OCR then covers cash and odd vendors only.

If a receipt shows a QR code for fiscal verification in some countries, store the image or QR scan per local rules—OCR of the QR artwork will not replace a QR decode.

## Monthly Reconciliation Rhythm

Pick a weekly or monthly block to clear the `ocr-inbox` album. Convert, verify, file TXT, delete or archive images per retention policy. End-of-month pileups create rushed verification—exactly when `$8` becomes `$3`. Pair the rhythm with invoice workflow habits so AP and T&E do not invent conflicting folder schemes.

Digital wallet receipts screenshotted as PNG usually OCR cleaner than thermal paper; prefer the digital original when merchants email PDFs.


## International and Multi-Currency Receipts

Travel receipts may mix local script merchant names with Latin totals. Set OCR language to the script that dominates the line items; run a second crop on the total block in English or the currency locale if needed. Watch for middle dots and thin spaces as thousands separators. Convert currency yourself using your finance policy rates—do not invent forex logic from OCR text.

Some countries mandate QR or fiscal codes; keep images when those codes matter for audits even if you only OCR item names for your notes.

## Expense Tool Paste Patterns

Paste OCR into a plain staging note first, not directly into locked approval fields. Clean merchant normalization (“UBER TRIP” versus “Uber”) in staging. Then transfer. Direct paste into rigid ERP fields multiplies the cost of a single misread digit because reversing posted entries is harder than editing a note.

If your tool accepts email forwards of digital receipts, prefer that path and reserve OCR for paper holdouts.

## Glare From Laminated Cards and Pouches

Receipts trapped behind plastic wallet windows photograph poorly. Remove the paper when possible. If you must shoot through plastic, shift angles until rainbow birefringence leaves the digits. That single habit outperforms any software toggle.


## Damaged and Tape-Repaired Slips

Tape glare and crumpled folds create local distortion OCR cannot invent around. Gently flatten under a heavy book for a minute before photography when the receipt is cold and curled. If tape covers digits, note those digits manually first—software will not see through sparkle.

For multi-vendor days (food court + transit + office supplies), photograph each receipt alone; group shots cause wrong merchant attribution in extracts.


## Related Reading

- [/blog/ocr-for-mobile](/blog/ocr-for-mobile) — broader scanning  
- [/blog/ocr-for-students](/blog/ocr-for-students) — small personal expense cases in research travel  
- [/blog/what-is-ocr](/blog/what-is-ocr) — conceptual primer  

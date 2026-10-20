This is a measured head-to-head of the two engines behind [ImgToText](https://imgtotext.in): **Google Gemini** (the site’s default AI OCR path) and **Tesseract 5 LSTM** (the classical engine the browser fallback is built on). We published the corpus, the ground-truth text, the raw outputs, and the character error rates — not marketing claims.

![OCR benchmark corpus: Gemini vs Tesseract CER](/images/ocr-blog-benchmark.webp)

**Run date:** 11 August 2026  
**Benchmark ID:** `imgtotext-ocr-bench-v1`  
**Raw data:** [/benchmark/results.json](/benchmark/results.json) · [/benchmark/ground_truth.json](/benchmark/ground_truth.json) · [corpus images](/benchmark/corpus/clean_print_01.png)  
**Re-run script:** `python3 scripts/run_ocr_benchmark.py`

## Headline numbers

Over **12 synthetic English images** across six categories:

| Engine | Mean character error rate (CER) |
|---|---|
| Google Gemini | **3.05%** |
| Tesseract 5.5.0 (OEM 1 / LSTM, PSM 3) | **19.75%** |

CER is edit distance divided by ground-truth length after a documented whitespace normalization. Lower is better. These are not “accuracy %” marketing scores, and they are not industry-wide averages — they describe this fixed corpus only.

## Why this page exists

Most OCR comparison articles hand-wave. This one does not. If you never use the converter on this site, the methodology and the failure cases below are still usable: you can download the PNGs, re-run either engine, and check whether our numbers still hold.

That is the point. Converter sites get rejected as low-value when every page only explains how to click Upload. Original measurements are something reviewers (and readers) can verify.

## Methodology

### Corpus

Twelve PNGs, two per category, generated with a fixed seed (`20260811`) so the set is reproducible:

| Category | What it stresses |
|---|---|
| `clean_print` | High-contrast printed body text (control) |
| `thermal_receipt` | Narrow mono layout, gray paper, soft blur, vignette |
| `dark_mode_screenshot` | Dark UI, light mono text, window chrome |
| `skewed_scan` | ~7.5° rotation on a desk-colored background |
| `low_light_photo` | Uneven lighting, noise, heavy JPEG round-trip |
| `handwriting_sim` | Italic serif with per-glyph jitter on ruled paper |

**Honest limit on handwriting:** `handwriting_sim` is **not** real penmanship. It is DejaVu Serif Italic with random offsets. It stresses irregular spacing; it does **not** claim CER for human handwriting. Real handwriting remains harder than this category suggests.

All samples are synthetic. No customer documents were used.

### Engines and prompts

- **Gemini:** same extraction prompt and generation settings as [`app/api/ocr/route.js`](https://imgtotext.in/how-it-works) on this site (`temperature: 0.1`, English language hint, “extract only / no commentary”). Uses the same Google Gemini model as the live AI OCR path. Images sent as PNG base64.
- **Tesseract:** system `tesseract 5.5.0`, `-l eng --oem 1 --psm 3 -c user_defined_dpi=300`. OEM 1 matches the site’s `OEM.LSTM_ONLY` intent.

**Important difference vs the live tool:** the site’s browser path runs extra preprocessing (upscale, contrast, thresholding, optional crop) before Tesseract.js. **This benchmark feeds each engine the raw PNG** so the comparison is about recognition under identical pixels, not about our preprocessor. Treat the Tesseract column as a lower bound on what classical OCR can do here without help.

### Metric

```
CER = levenshtein(normalize(hypothesis), normalize(reference)) / len(normalize(reference))
```

`normalize` collapses any whitespace run to a single space and strips ends. That stops newline differences from dominating the score when the characters are otherwise correct.

## Results by category

Mean CER within each two-image category:

| Category | Tesseract CER | Gemini CER |
|---|---:|---:|
| Clean print | 0.00% | 0.00% |
| Low-light photo | 0.42% | 0.42% |
| Handwriting (simulated) | 1.82% | 0.00% |
| Dark-mode screenshot | 14.77% | 13.88% |
| Thermal receipt | 36.62% | 4.01% |
| Skewed scan | 64.87% | 0.00% |

Pattern in plain language:

- On clean print and our low-light set, both engines were essentially tied.
- On thermal receipts and skewed paper, Gemini pulled far ahead.
- On dark screenshots, both struggled for similar reasons (UI chrome), not because one model “failed OCR.”

## Failure cases worth studying

### 1. Skewed permission slip — Tesseract returned nothing

![Skewed scan sample that Tesseract missed entirely](/benchmark/corpus/skewed_scan_02.png)

**Ground truth (excerpt):** Permission slip for Kavya Nair / Science fair visit / 19 August 2026.

| Engine | CER | What happened |
|---|---:|---|
| Tesseract | 100% | Empty output |
| Gemini | 0% | Full text recovered |

A 7.5° deskew is enough to make an unassisted classical pass collapse on this sample. Gemini still read it. In the live product, the browser fallback’s rotate/preprocess path exists precisely because cases like this are common; the AI path still wins when the pixels arrive already tilted.

### 2. Thermal receipt — amounts went missing

![Thermal receipt sample with amount layout stress](/benchmark/corpus/thermal_receipt_02.png)

**Ground truth includes:** `Milk 1L 58.00`, `Bread loaf 45.00`, `Eggs dozen 72.00`, `TOTAL 175.00`.

| Engine | CER | What happened |
|---|---:|---|
| Tesseract | 51.41% | Kept item names; dropped or detached most money figures (`175.` / `200.` / `25.` stranded) |
| Gemini | 4.52% | Kept line items and totals; separator dashes differed from ground truth |

If you OCR receipts for bookkeeping, **proofread every figure** regardless of engine. Money is where layout stress and thin thermal type hurt classical OCR most. See also [Receipt to Text](/receipt-to-text).

### 3. Dark terminal screenshot — chrome polluted both outputs

![Dark-mode terminal screenshot sample](/benchmark/corpus/dark_screenshot_01.png)

Ground truth was only the terminal body. Both engines also transcribed the window title `Terminal — session`, which was never in the reference string. That alone raises CER even when the useful text is mostly right.

Tesseract additionally read `npm` as `mpm` and inserted spaces inside `node:fs`. Gemini kept `npm` and the `node:fs` paths intact, but still paid the chrome penalty.

**Practical fix:** crop to the content region before upload — the same advice as on [Screenshot to Text](/screenshot-to-text). Clean Mode on the browser path tries to drop edge chrome; it cannot invent a crop you should have made.

## What this does *not* prove

- It does not prove Gemini always beats Tesseract. Clean print was a tie at 0% CER.
- It does not measure Hindi, Tamil, Arabic, tables, or multi-column magazine layouts.
- It does not measure the site’s Tesseract.js preprocessor — only raw recognition.
- It does not measure human handwriting.
- Twelve images are enough to be honest and reproducible; they are not enough to be a leaderboard.

If you need a larger set, fork the corpus under `/benchmark/`, add labeled images, and re-run the script. We will revise this article when the corpus grows — and we will set `dateModified` only when the numbers or method actually change.

## How this maps to the product

On [imgtotext.in](https://imgtotext.in) the default path is AI OCR (Gemini) with a daily cap of **10 requests per IP address**. When that path is unavailable, rate-limited, or you choose Local OCR only, recognition continues in the browser with Tesseract.js. The hybrid exists because the categories above do not share one winner: classical OCR is fine for clean print once the image is prepared; AI OCR earns its keep on skew, thermal layout, and ambiguous scenes.

For the conceptual comparison without numbers, see [AI OCR vs Traditional OCR](/blog/ai-ocr-vs-traditional-ocr). For practical capture advice, see [How to Improve OCR Results on Low-Quality Images](/blog/improve-ocr-low-quality-images) and [OCR Accuracy and Limitations](/blog/ocr-accuracy-and-limitations).

## Reproduce it yourself

1. Clone the site repo (or download the PNGs from `/benchmark/corpus/`).
2. Ensure `tesseract` is on your `PATH` and `GOOGLE_GENERATIVE_AI_API_KEY` is set.
3. Run `python3 scripts/run_ocr_benchmark.py`.
4. Diff your new `public/benchmark/results.json` against the published file.

If your CERs diverge, say so — that is how a real benchmark ages, not how a brochure ages.

## FAQ

**Why character error rate instead of word accuracy?**  
CER is standard for OCR research, sensitive to single-digit money errors, and comparable across short receipts and longer paragraphs.

**Why synthetic images?**  
So we can publish ground truth and the pixels without redacting anyone’s private documents. Synthetic does not mean “easy” — the thermal and skew categories were hard enough to separate the engines.

**Will you add real camera photos later?**  
Yes, when we have a rights-cleared set with typed ground truth. Until then we will not invent field-photo statistics.

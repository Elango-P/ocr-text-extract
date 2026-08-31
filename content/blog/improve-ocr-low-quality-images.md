Most disappointing OCR results trace back to the image, not the engine. A few seconds of deliberate capture and cropping habit often matters more than which OCR tool you pick. This is a practical, non-technical guide to getting usable text out of imperfect photos and scans — the everyday fixes for lighting, resolution, glare, and compression that make the biggest difference before you upload to [OCR Text Extractor](https://imgtotext.in).

![Phone photo OCR example](/images/ocr-blog-devtools.webp)

## The 30-Second Quality Check

Before uploading anything, zoom the image to 100% on your own screen and ask: can I comfortably read every word? If you're squinting or guessing, the OCR engine is guessing too — it can't invent detail that was never captured. This single check catches most doomed uploads before you spend one of your daily AI OCR uses on them.

## Lighting: The Single Biggest Factor

Poor lighting is the most common cause of bad OCR on phone photos.

- **Use even, diffuse light.** Overhead room lighting or daylight near a window works better than a single harsh lamp, which creates hot spots and shadows.
- **Avoid backlighting.** If the light source is behind the document (or behind you, casting your shadow onto the page), contrast collapses.
- **Watch for color casts.** Warm indoor bulbs can tint whites yellow, which sometimes confuses contrast-sensitive preprocessing. Neutral or daylight-balanced light is safer when you have a choice.
- **Avoid flash on glossy paper.** Camera flash on laminated or glossy pages almost guarantees a glare blowout right where you need it least.

## Crop Before You Upload

Cropping is free, instant, and often the highest-leverage fix available:

- Remove desk clutter, wood grain, and background text from other documents in frame — engines can invent false characters from busy textures.
- Cut out browser chrome, taskbars, or notification banners when uploading screenshots.
- If a page has a wide margin or unrelated second page peeking into the shot, crop it out.
- Tighter crops also mean smaller uploads, which helps on slow connections.

Most phones and computers have a built-in crop tool in the default photo viewer — you don't need dedicated editing software for this.

## Resolution: More Isn't Always Better

There's a common myth that maximum resolution always helps. In practice:

- Aim for text where individual letters are comfortably legible — roughly 20+ pixels tall after cropping is a reasonable rule of thumb for small print.
- A 50 KB, heavily downscaled thumbnail of a dense contract will not OCR reliably no matter what tool you use — the detail is simply gone.
- On the other end, huge 12+ megapixel images slow uploads on mobile data and don't meaningfully improve results once text is already sharp — a moderate resize is fine.
- Never upscale a blurry image expecting OCR to "fill in" missing detail. Upscaling adds pixels, not information.

## Glare and Reflections

Laminated IDs, glossy magazine pages, and phone/tablet screens are glare magnets:

- Tilt the document or your camera angle slightly until the reflection moves off the text region.
- Turn off camera flash for glossy surfaces.
- For screens, take a native screenshot instead of photographing the display — this sidesteps glare and moiré patterns entirely, and works better for OCR in general.
- If a single glare spot only affects part of the frame, consider two shots from different angles and use whichever one is clean over the important region.

## Skew and Angle

A page photographed at an angle bends straight lines and confuses reading order:

- Use your phone's built-in document scanning mode if available — most flatten perspective automatically and export a clean, level image.
- Otherwise, try to shoot straight-on from directly above the page, not from a corner angle.
- If the result still leans more than a few degrees, rotate it in any basic photo editor before uploading so text lines are roughly horizontal.

## Compression: Choosing the Right Format

[OCR Text Extractor](https://imgtotext.in) accepts PNG, JPG, JPEG, WEBP, and GIF. A few practical notes:

- **Screenshots and UI:** PNG is lossless and ideal — text edges stay crisp.
- **Camera photos:** A high-quality JPEG straight from the camera is fine. Avoid re-saving the same JPEG multiple times through different apps, since each re-save adds compression artifacts around letter edges that accumulate over time.
- **GIFs:** Occasionally these arrive from chat apps with limited color palettes or dithering, which can look speckled and hurt accuracy. If a GIF looks noisy, convert it to PNG first.
- Avoid maximum-compression "save for web" exports when the source has small text — the file gets small at the cost of exactly the detail OCR needs.

## When to Retake vs. When to Preprocess

Not every bad photo needs editing software. A quick decision guide:

**Retake if:**
- The text is genuinely blurry (motion blur or missed focus) — no crop or filter fixes blur.
- Glare covers a critical section like a total or ID number.
- The angle is so extreme that perspective correction would distort letters.

**Preprocess (crop/rotate/brighten) if:**
- The photo is sharp but includes clutter, mild skew, or dim lighting.
- Only the framing or exposure is the problem, not the underlying sharpness.

In general, retaking a photo takes less time than fighting a bad one in an editor, and produces a better result. Don't be afraid to just take the picture again.

## A Worked Example

A faded, second-generation photocopy of a book page looks gray-on-gray and nearly illegible. Rather than accepting a poor OCR pass, a quick sequence helps: increase contrast slightly in any basic photo app, crop to a single column if the layout is two columns (mixed column order otherwise confuses reading order), and then run it through AI OCR while your daily quota allows — cloud AI models tend to handle degraded contrast noticeably better than the browser fallback. For more on this kind of layout splitting, see [Advanced OCR Techniques](/blog/advanced-ocr-techniques).

## Limitations Preprocessing Can't Fix

Being honest about the ceiling here matters:

- Preprocessing cannot restore resolution or detail that was never captured. A blurry, low-res source stays unreliable regardless of edits.
- Extreme or highly stylized handwriting remains genuinely hard for any engine — see [Handwriting to Text](/handwriting-to-text) and our companion piece on [OCR accuracy and limitations](/blog/ocr-accuracy-and-limitations).
- Scanned PDF containers can now be uploaded directly to [PDF to Text](/pdf-to-text), which renders selected pages before OCR. If you already have page images, use the image workflow; when you need to package those images for sharing, [convert images into a PDF](/image-to-pdf). [How It Works](/how-it-works) covers the underlying pipeline.
- Over-processing is real: aggressive sharpening, posterizing, or heavy HDR filters can distort glyph shapes and make results worse than the unedited original. If you can no longer read the image comfortably yourself after editing, dial it back.

## Quick Checklist

1. Can you read it clearly yourself at 100% zoom?
2. Crop tightly to just the text region.
3. Fix obvious skew before uploading.
4. Choose PNG for screenshots, quality JPEG for photos.
5. Avoid glare by adjusting angle or lighting, not flash.
6. Retake instead of over-editing when something is fundamentally blurry.

## Related Reading

- [OCR Accuracy and Limitations](/blog/ocr-accuracy-and-limitations) — what to expect once the image is good
- [Advanced OCR Techniques](/blog/advanced-ocr-techniques) — deeper preprocessing and layout tips
- [The Ultimate Guide to OCR Technology](/blog/ultimate-guide-to-ocr-technology) — full beginner walkthrough
- [OCR for Developers](/blog/ocr-for-developers) — automating preprocessing in code

Try your improved image at [Image to Text](/image-to-text), or check the [FAQ](/faq) for supported formats and daily limits.

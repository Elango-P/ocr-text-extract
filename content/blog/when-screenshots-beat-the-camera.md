# When Screenshots Beat the Camera

We see it all the time: someone needs to copy text from an unselectable PDF, a Zoom presentation, or a locked application on their computer monitor. Instead of using the tools on their computer, they pull out their smartphone and take a photograph of the computer screen.

When it comes to extracting text with Optical Character Recognition (OCR), taking a photo of a screen is the worst possible method. **Screenshots will always beat the camera.**

## The Moire Effect and Pixel Grids

When you take a photo of a digital monitor with a digital camera, the pixel grid of the monitor clashes with the pixel grid of your camera sensor. This creates the "Moiré effect"—those wavy, rainbow-colored bands that distort the image.

Furthermore, a camera captures the physical sub-pixels (the tiny red, green, and blue lights) that make up the screen. To an OCR engine, this looks like a noisy, jagged, rainbow-colored mess, severely dropping the accuracy of text extraction.

## The Perfection of a Screenshot

A screenshot bypasses the camera sensor and the physical monitor entirely. It captures the exact, pristine digital rendering of the text directly from the graphics card.

*   **Perfect Contrast:** Black text on a white background is truly #000000 on #FFFFFF.
*   **Perfect Geometry:** The lines of text are perfectly horizontal. There is no lens distortion, no curved pages, and no angle skew.
*   **Zero Noise:** There is no digital grain, no glare from overhead lights, and no shadows.

Because a screenshot provides the "perfect" input, even basic, rules-based OCR engines (like Tesseract) can achieve near 100% accuracy instantly.

## The Decision Tree for On-Screen Text

If you need to extract text you are looking at on a device:

1.  **Can you highlight and copy it?** (Always try this first. Don't use OCR if Ctrl+C works).
2.  **Are you on a computer?** Use the built-in screenshot tools (Snipping Tool on Windows, Cmd+Shift+4 on Mac) to capture the specific block of text. Upload that clean image to `imgtotext.in`.
3.  **Are you on a phone?** Take a native screenshot (usually Volume Down + Power). Crop the screenshot in your Photos app to just the text, then run OCR.

**Never** point a camera at a screen if your goal is accurate text extraction. Always capture the digital source.

# Clean Mode Explained: When to Use It

If you've used `imgtotext.in`, you may have noticed the "Clean Mode" toggle before extracting text. While it sounds like a feature you should always leave on, understanding what it actually does will help you get much better results depending on your source image.

## What is Clean Mode?

Clean Mode is an image preprocessing step that occurs *before* the OCR engine attempts to read the text. It applies a series of image filters designed to increase the contrast between the text and the background.

Typically, this involves:
1. **Grayscaling**: Removing all color data from the image.
2. **Binarization**: Forcing every pixel to be either pure black or pure white, removing gray midtones.
3. **Despeckling**: Removing tiny artifacts or "noise" (like dust on a scanner glass).

## When Clean Mode Helps

Clean Mode is your best friend when dealing with:
*   **Faded documents**: Old receipts where the ink is wearing off.
*   **Shadowy photos**: Pictures of paper taken with a smartphone where half the page is in shadow. Binarization forces the shadowy background to white and the text to black.
*   **Watermarks or colored backgrounds**: Documents with disruptive background patterns. Grayscaling and thresholding can often wash out the background entirely, leaving only the dark text for the OCR engine to read.

## When Clean Mode Hurts

Clean Mode is a destructive process—it throws away image data. Therefore, you should **turn it off** when dealing with:
*   **Low-resolution images**: Binarizing a blurry image often makes the text blocky and jagged, making it *harder* for the OCR engine to read.
*   **Screenshots**: UI screenshots are already perfectly clean and high contrast. Applying filters can distort sub-pixel rendering (anti-aliasing) on fonts, reducing accuracy.
*   **Light-colored text**: If the text is yellow or light blue, the binarization threshold might interpret it as background and erase it completely.

## The A/B Testing Habit

The best approach to OCR is iterative. If you have a difficult document, develop an A/B testing habit:
1. Run the extraction with Clean Mode **OFF**. Review the results.
2. If the results are poor, toggle Clean Mode **ON** and run it again.
3. Compare the outputs and use the best one.

There is no single perfect setting for every image, which is why giving you control over the preprocessing is a core feature of reliable OCR tools.

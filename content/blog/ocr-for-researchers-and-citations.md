# OCR for Researchers and Citations

For academic researchers, historians, and journalists, the archives are full of invaluable data trapped in physical books, microfiche, and faded journals. Optical Character Recognition (OCR) is the key to unlocking this data, making it searchable and easily quotable. 

However, academic rigor requires precision. Here is how researchers should manage OCR workflows to maintain integrity.

## Extracting Quotes Accurately

When you find a perfect quote in a 19th-century text, retyping it manually introduces the risk of transcription errors. Taking a photo and running it through an OCR tool like `imgtotext.in` is faster, but requires strict verification.

**The Golden Rule:** Never paste OCR text directly into your manuscript without reading it against the original image. 
Older texts often feature ligatures (e.g., 'st' or 'fi' joined together), archaic spellings, and degraded ink that confuse OCR engines. An unverified OCR error in a direct quote compromises the academic integrity of your paper.

## Managing Page Cues

A quote is useless without a citation, and a citation requires a page number. When batch-processing documents with OCR, context is easily lost.

*   **Include the Page Number in the Scan:** When photographing a page, ensure the physical page number is visible in the frame.
*   **The Filename Method:** If you are cropping just a specific paragraph, rename the resulting image file immediately: `Smith_1984_Page_42_Quote.jpg`. When you run this through OCR, the source is indelibly linked to the text.

## The Danger of "Fabricated Citations"

Searchable PDFs (which are just image PDFs with a hidden layer of OCR text underneath) are standard in academic databases. 

When you use the "Search" function (Ctrl+F) in a PDF reader, you are searching the hidden OCR text, not the visible image. If the underlying OCR is poor (which is common in older JSTOR scans), a keyword search might fail to find a crucial passage. 

Worse, if you copy and paste from these PDFs, you are copying the hidden OCR text. If that text contains errors, and you don't verify it against the visible image, you end up publishing a "fabricated citation"—a quote that doesn't actually exist in the original text in the way you presented it.

## Archival Best Practices

If you are building a personal database of research materials:
1. Store the original image file alongside the OCR text. 
2. Use markdown or reference management software (like Zotero) to link the plain text back to the visual evidence.
3. Treat OCR as a finding aid (making things searchable) rather than a perfect transcript.

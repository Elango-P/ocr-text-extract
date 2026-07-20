/** Unique long-form content for /scanned-pdf-to-text */

export const scannedPdfToText = {
  slug: "scanned-pdf-to-text",
  path: "/scanned-pdf-to-text",
  title: "Scanned PDF to Text Converter — Free Online OCR",
  metaTitle: "Scanned PDF to Text Converter (Free OCR)",
  description: "Convert scanned, image-only PDFs into editable text. Free online OCR for archival documents and unselectable PDFs.",
  h1: "Scanned PDF to Text Converter",
  lead: "Unlock the text trapped inside scanned, image-only PDFs. We digitize archival pages into clean, searchable, and editable text formats.",
  heroImage: "/images/ocr-document-scan.webp",
  heroAlt: "Scanned PDF document",
  relatedBlogSlugs: ["pdf-ocr-guide", "digitize-old-books-ocr"],
  workedExample: {
    "title": "Extracting from a legacy PDF archive",
    "situation": "A researcher has an old, scanned PDF where the text cannot be highlighted or searched.",
    "steps": [
        "Take a screenshot or export the specific PDF page as an image.",
        "Upload the image file to the converter.",
        "Extract the text.",
        "Copy the results into a word processor."
    ],
    "result": "The previously unsearchable PDF content is now fully editable text.",
    "lesson": "Image-only PDFs are essentially photographs of paper; treating them as images is the best way to extract their data."
},
  faqs: [
    {
        "q": "Why can't I search my PDF?",
        "a": "Many PDFs are 'image-only', meaning they were created by a scanner and do not contain a hidden text layer. OCR is required to make them searchable."
    },
    {
        "q": "Can I upload a 100-page PDF?",
        "a": "Our web tool accepts image files. For a multi-page PDF, you must first export the pages as JPGs or PNGs, or take screenshots of the specific pages you need."
    }
],
  sections: [
    {
        "id": "pdf-intro",
        "heading": "Understanding Scanned PDFs",
        "paragraphs": [
            "A true digital PDF contains text data that you can highlight, copy, and search. A scanned PDF, however, is merely a digital wrapper around a photograph of a piece of paper. To your computer, it's an image.",
            "To get editable text out of these files, you must use Optical Character Recognition (OCR). By converting the PDF pages to image formats (like JPG or PNG), you can process them through our advanced OCR engines."
        ]
    },
    {
        "id": "pdf-workflow",
        "heading": "The PDF Extraction Workflow",
        "paragraphs": [
            "Because our tool is optimized for high-accuracy image processing, it requires raster image inputs. If you have a PDF, you can use built-in OS tools (like Mac's Preview) or free online converters to change your PDF into a series of JPG images.",
            "Once you have the image files, you can upload them here, optionally use Clean Mode to remove scanner artifacts or yellowed page backgrounds, and extract clean, pristine text."
        ]
    }
]
};

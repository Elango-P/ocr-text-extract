/** Unique long-form content for /image-to-pdf. */

export const imageToPdf = {
  slug: "image-to-pdf",
  path: "/image-to-pdf",
  title: "Image to PDF Converter — Convert JPG and PNG to PDF",
  metaTitle: "Image to PDF Converter – Turn Photos into Searchable PDF",
  description:
    "Convert JPG, PNG, and WEBP images into a clean PDF online for free. Reorder images, customize page sizes, and download your PDF instantly.",
  directAnswer:
    "Image to PDF Converter packages JPG, PNG, and camera photos into clean, standardized PDF documents with customizable page sizing, margins, and page reordering.",
  h1: "Image to PDF Converter",
  lead:
    "Convert one or more JPG, JPEG, PNG, or WEBP images into a PDF that preserves the original pictures. Reorder pages, choose A4, Letter, or fit-to-image sizing, set margins, and download it in your browser.",
  embed: "image-to-pdf",
  cta: {
    heading: "Convert images into a PDF",
    text: "Arrange your images, choose page settings, and download a PDF with the original pictures preserved.",
    label: "Back to Image to PDF",
  },
  howToSteps: [
    { "@type": "HowToStep", name: "Add images", text: "Choose JPG, JPEG, PNG, or WEBP images." },
    { "@type": "HowToStep", name: "Arrange and set pages", text: "Reorder or remove images, then choose page size, orientation, and margins." },
    { "@type": "HowToStep", name: "Download the image PDF", text: "Create the PDF in your browser with each image placed without stretching." },
  ],
  heroImage: "/images/ocr-tool-pdf-export.webp",
  heroAlt: "Photographed document pages preserved inside an image PDF",
  highlights: [
    "100% Free, No Sign-Up",
    "Reorder Pages Before Export",
    "A4, Letter & Fit-to-Image Sizing",
    "Custom Margins",
    "Runs Entirely in Your Browser",
  ],
  relatedBlogSlugs: [
    "ultimate-guide-to-ocr-technology",
    "advanced-ocr-techniques",
    "ocr-accuracy-and-limitations",
    "ocr-use-cases-and-workflows",
  ],
  workedExample: {
    title: "Combining a photographed notice into one PDF",
    situation:
      "You have photographed a printed notice and want one PDF that preserves the original page for sharing or filing.",
    steps: [
      "Choose the notice photo and any other pages in the order you want.",
      "Move images up or down, remove accidental selections, and choose A4 with standard margins.",
      "Download the Image PDF and open it to confirm the page order and framing.",
    ],
    result:
      "The PDF contains the original notice image, keeping its layout, logos, signatures, and visual details intact while combining it with the other selected pages.",
    lesson:
      "Image PDF is the primary mode because it preserves the page. Use the clearly labelled searchable text PDF when you need OCR text rather than the original appearance.",
  },
  faqs: [
    {
      q: "Does this put my photo into a PDF?",
      a: "Yes. The primary Image PDF mode embeds each selected image as a page in the generated PDF. It does not run OCR and does not replace your picture with text.",
    },
    {
      q: "What is a searchable PDF, then, and is this one?",
      a: "The primary download preserves the image only. The secondary Searchable text PDF runs OCR and creates a text-only PDF for copying and searching; it does not preserve the original image layout.",
    },
    {
      q: "Why does my Hindi, Tamil, or Chinese text come out as question marks?",
      a: "This limitation applies only to the secondary text-only PDF. The primary Image PDF preserves non-Latin scripts as pixels because it embeds the source image. For editable multilingual text, download DOCX or TXT from the OCR workflow.",
    },
    {
      q: "What about accented characters and curly quotes?",
      a: "Those are fine. Accented Latin characters such as é, ü, ñ, and å, along with the symbols £, €, and ©, render correctly, as do the curly quotes, apostrophes, en dashes, and em dashes that appear constantly in printed text. It is only scripts outside the Latin alphabet that cannot be represented.",
    },
    {
      q: "Can I choose page size, orientation, and margins?",
      a: "Yes. Choose A4, Letter, or Fit to image; choose portrait, landscape, or automatic orientation; and select none, small, standard, or wide margins.",
    },
    {
      q: "How does it handle a long document?",
      a: "Add multiple images, then use the up and down controls to set their order. Each image becomes one PDF page, with its aspect ratio preserved and large images resized and compressed reasonably for download.",
    },
    {
      q: "Which image formats are accepted?",
      a: "JPG, JPEG, PNG, and WEBP are accepted. Unsupported, unreadable, and oversized files are skipped with a clear message.",
    },
    {
      q: "Are my images uploaded to create the PDF?",
      a: "No. The Image PDF is assembled in your browser. The optional Searchable text PDF may use cloud OCR unless you enable Local OCR only.",
    },
  ],
  sections: [
    {
      id: "two-jobs",
      heading: "Two different jobs share one name",
      paragraphs: [
        "\"Image to PDF\" is asked for by people who want two completely different outcomes, and picking the wrong one wastes time, so it is worth separating them at the outset.",
        "The first group wants a container. They have a photo, or several, and want them in one PDF for email, archiving, or a form that accepts only PDFs. The pictures stay pictures; nothing is read. That is the primary Image PDF workflow on this page.",
        "The second group wants the content. They have a picture of text and want words that can be searched, selected, and copied. The secondary Searchable text PDF runs OCR for that purpose, but it intentionally does not preserve the original page appearance.",
        "A useful test: if you need the page itself, choose Image PDF. If you need editable words, choose Searchable text PDF.",
      ],
    },
    {
      id: "what-you-get",
      heading: "What the PDF contains",
      paragraphs: [
        "The primary file contains each selected image on its own PDF page. A4, Letter, and Fit to image are available, and automatic orientation chooses portrait or landscape from each image. Margins are applied consistently.",
        "Images are fitted inside the page without stretching. Large sources are resized and compressed in the browser to keep downloads practical while retaining enough detail for readable documents.",
        "The secondary text export is intentionally different: it contains OCR text without the image layer. Use it when search and copy matter more than the original visual design.",
      ],
    },
    {
      id: "scripts",
      heading: "The character set limit, stated plainly",
      paragraphs: [
        "The image PDF has no font restriction because it preserves the source as pixels. Hindi, Tamil, Chinese, Arabic, and other scripts remain visible exactly as they appeared in the input image.",
        "The Helvetica character-set limit applies only to the optional text-only PDF. Latin-script output generally renders there, while many non-Latin characters may become question marks.",
        "If you need multilingual searchable text, use the OCR result with TXT or DOCX, or keep the original image PDF for faithful visual display.",
      ],
    },
    {
      id: "accuracy",
      heading: "The PDF freezes whatever the text box holds",
      paragraphs: [
        "There is a practical reason to proofread before downloading rather than after. Text in the results box is trivially editable — click and fix. Text in a PDF is not; correcting a single misread word means going back to the source, re-extracting or re-editing, and generating the file again.",
        "So treat the download as a commit step. Read the extraction through first, with the original image beside you, and pay particular attention to the parts of the text that language cannot self-correct: proper nouns, reference numbers, dates, and amounts. A misread letter inside a common word will usually still resolve to the right word; a misread digit inside a figure simply becomes a different, equally plausible figure.",
        "This matters more here than with the other formats, precisely because PDFs tend to be the version that gets filed, archived, or sent to someone else. An error in a TXT file you are about to paste somewhere is likely to be caught. The same error in a PDF sitting in a folder may not surface for a year.",
      ],
    },
    {
      id: "workflows",
      heading: "Where a text PDF earns its keep",
      paragraphs: [
        "The strongest case is making printed material findable. A stack of notices, handouts, or reference sheets photographed and converted this way becomes a folder your operating system's search can look inside, which a folder of photographs never is. Each file is small enough that keeping hundreds of them costs nothing.",
        "It is also a good format for circulating extracted content, because PDFs open identically everywhere without anyone needing a particular application, and the recipient cannot accidentally alter the text while reading it.",
        "Accessibility is a quieter but real benefit. A photograph of a page is opaque to a screen reader; a text PDF of the same content can be read aloud, resized, and reflowed. If you are sharing printed material with someone who uses assistive technology, converting it is a substantial improvement over passing on the image.",
        "Where it is the wrong tool is anywhere the document itself is the point. Contracts, signed forms, receipts kept as evidence, and anything with legal or financial weight should be kept as the original image or scan. A transcription is not the document, and no OCR output should be treated as though it were.",
      ],
    },
    {
      id: "privacy",
      heading: "The file is built on your device",
      paragraphs: [
        "The primary Image PDF is assembled entirely in your browser from the selected files. Nothing is uploaded to create it and it is never stored on our side.",
        "Recognition is only used for the optional Searchable text PDF. By default those images may go through our server to Google's Gemini API; enable Local OCR only to keep recognition in this browser. Either way, the resulting PDF is assembled locally.",
        "Full details of both paths are in the Privacy Policy and the Data Retention Policy.",
      ],
    },
    {
      id: "next",
      heading: "Where to go next",
      paragraphs: [
        "If you want an editable file rather than a fixed image PDF, [Image to Word](/image-to-word) explains the DOCX export and [Image to Text](/image-to-text) covers the general OCR workflow. To extract text from a scanned PDF, use [PDF to Text](/pdf-to-text). For weak source photos, read [the guide to improving OCR on low-quality images](/blog/improve-ocr-low-quality-images).",
      ],
    },
  ],
};

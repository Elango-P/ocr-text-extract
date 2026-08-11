/** Unique long-form content for /image-to-pdf */

export const imageToPdf = {
  slug: "image-to-pdf",
  path: "/image-to-pdf",
  title: "Image to PDF — Save Extracted Text as a Searchable PDF",
  metaTitle: "Image to PDF | Save Extracted Text as a PDF File",
  description:
    "Turn text in an image into a real text PDF you can search and select. What this makes, how it differs from wrapping a photo in a PDF, and its script limits.",
  h1: "Image to PDF Converter",
  lead:
    "Extract the text from an image and download it as a PDF whose contents are genuine, selectable, searchable text. This is a different thing from placing your photo inside a PDF, and which one you want depends entirely on whether you care about the words or the page — so it is worth being clear before you start.",
  heroImage: "/images/ocr-tool-pdf-export.webp",
  heroAlt: "Illustration of an image being converted into a text-based PDF document",
  relatedBlogSlugs: [
    "ultimate-guide-to-ocr-technology",
    "advanced-ocr-techniques",
    "ocr-accuracy-and-limitations",
    "ocr-use-cases-and-workflows",
  ],
  workedExample: {
    title: "Making a printed notice searchable",
    situation:
      "You have photographed a printed notice and want a file you can keep, search by keyword later, and copy sentences out of.",
    steps: [
      "Photograph the notice square-on so it fills the frame, then extract the text.",
      "Read the result and correct any misread words in the text box, since whatever is there is exactly what the PDF will contain.",
      "Choose the PDF download to generate the file in your browser.",
      "Open it and try selecting a sentence and searching for a word to confirm both behave as you expect.",
    ],
    result:
      "Expect a clean, lightweight document, typically a few kilobytes rather than the megabytes a photo would occupy, in which every word can be selected, copied, and found by search. Expect the visual design of the notice to be gone entirely.",
    lesson:
      "Decide first whether you are keeping the words or the page. This produces the words; keep the original photograph if the page itself matters.",
  },
  faqs: [
    {
      q: "Does this put my photo into a PDF?",
      a: "No, and this is the most important thing to understand about it. The PDF contains the extracted text rendered as text — your image is not embedded anywhere in the file. If what you wanted was your photograph wrapped in a PDF container, that is a different operation, and almost every operating system already does it: on Windows use Print to PDF from the Photos app, on macOS use Export as PDF from Preview, and on iOS or Android the share sheet has a Print option that saves as PDF.",
    },
    {
      q: "What is a searchable PDF, then, and is this one?",
      a: "The term usually refers to a scan that keeps the page image visible while hiding a layer of recognised text behind it, so it looks like the original but can be searched. That format gives you both, at the cost of a much larger file. What we produce is simpler: text only, no image layer. It is fully searchable and selectable, but it looks like a plain typed document rather than the original page.",
    },
    {
      q: "Why does my Hindi, Tamil, or Chinese text come out as question marks?",
      a: "The PDF is built with the standard Helvetica font, which only covers the Latin-1 character range. Anything outside it — Devanagari, Tamil, Chinese, Japanese, Korean, Arabic, and most emoji — has no glyph available and is written as a question mark. The tool warns you when this is about to happen rather than letting you discover it later. For non-Latin scripts, download DOCX or TXT instead, since both are UTF-8 and keep every character exactly.",
    },
    {
      q: "What about accented characters and curly quotes?",
      a: "Those are fine. Accented Latin characters such as é, ü, ñ, and å, along with the symbols £, €, and ©, render correctly, as do the curly quotes, apostrophes, en dashes, and em dashes that appear constantly in printed text. It is only scripts outside the Latin alphabet that cannot be represented.",
    },
    {
      q: "Can I control the fonts, margins, or page size?",
      a: "Not from here. The output is fixed at US Letter with Helvetica at eleven points and generous margins, which is a readable default for plain text and keeps the file small. If you need control over the appearance, download the DOCX instead, format it in your word processor, and export to PDF from there — you will get a far better result than any set of options we could offer.",
    },
    {
      q: "How does it handle a long document?",
      a: "It paginates automatically, filling each page and continuing onto the next, so there is no length limit worth worrying about. Long lines are wrapped to fit the page width. The wrapping counts characters rather than measuring the rendered width of the text, so a line of unusually wide characters can break at a slightly different place than you might expect. For ordinary prose you will not notice.",
    },
  ],
  sections: [
    {
      id: "two-jobs",
      heading: "Two different jobs share one name",
      paragraphs: [
        "\"Image to PDF\" is asked for by people who want two completely different outcomes, and picking the wrong one wastes time, so it is worth separating them at the outset.",
        "The first group wants a container. They have a photo, or several, and they want them in a PDF so they can be emailed as one attachment or uploaded to a form that only accepts PDFs. The pictures stay pictures; nothing is read. This is a file-format operation, your device already does it for free, and you do not need OCR at all.",
        "The second group wants the content. They have a picture of text and they want a document whose words can be searched, selected, copied, and read by a screen reader. The appearance of the original does not matter to them; the words do. That is what this page does.",
        "A useful test: if you would be satisfied by a photograph of the page, you want a container. If you would be frustrated that you cannot copy a sentence out of it, you want the content.",
      ],
    },
    {
      id: "what-you-get",
      heading: "What the PDF contains",
      paragraphs: [
        "The file is a straightforward text document. Your extracted text is laid out on US Letter pages in Helvetica at eleven points, with comfortable margins and consistent line spacing, and the pages are generated as needed to hold everything.",
        "Because it holds text rather than an image, it is remarkably small. A page of prose is a few kilobytes, where a photograph of the same page would run to several megabytes. It is also genuinely accessible: screen readers can read it, search indexes it properly, and copy and paste behave the way people expect from a document.",
        "What it does not carry is any trace of the original's appearance. Typefaces, sizes, emphasis, columns, logos, rules, signatures, and photographs are all gone. Blank lines survive, so the rough vertical rhythm of the source remains, but nothing else does.",
      ],
    },
    {
      id: "scripts",
      heading: "The character set limit, stated plainly",
      paragraphs: [
        "This is the one real constraint of the PDF export, and it deserves a section rather than a footnote. PDF files reference fonts, and this one uses Helvetica, which is guaranteed to exist in every PDF reader and therefore keeps the output small and universally viewable. The trade-off is that Helvetica's built-in character set covers the Latin alphabet and Western European accents, and nothing beyond.",
        "In practice that means Latin-script languages work well. English, French, German, Spanish, Italian, Portuguese, and the Nordic languages all render correctly, accents included, along with common punctuation and currency symbols. Devanagari, Tamil, Bengali, Chinese, Japanese, Korean, Arabic, Hebrew, Thai, Cyrillic, and Greek do not, and each unrepresentable character is written as a question mark.",
        "Supporting them would mean embedding a font that covers those scripts in every file we generate, which would add megabytes to a download that is currently measured in kilobytes, for a format most people are choosing precisely because it is light. Rather than do that, the tool detects the situation and tells you before you open the file, so the failure is visible rather than silent.",
        "The remedy is simple: download DOCX or TXT. Both store text as UTF-8 and preserve every script faithfully. If you specifically need a PDF containing non-Latin text, take the DOCX route and export to PDF from your word processor, which will embed a suitable font for you.",
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
        "PDF generation happens entirely in your browser, using the text already sitting in the results box. Nothing is uploaded to create the file and it is never stored on our side.",
        "Recognition is the step that may involve the network. By default the image goes through our server to Google's Gemini API, which is what gives good results on difficult photographs. Switching on Local OCR only before extracting keeps everything in the browser using Tesseract.js, with some loss of accuracy on faint or unusual text. The PDF is assembled locally either way.",
        "Full details of both paths are in the Privacy Policy and the Data Retention Policy.",
      ],
    },
    {
      id: "next",
      heading: "Where to go next",
      paragraphs: [
        "If you want an editable file rather than a fixed one, Image to Word explains what the .docx export gives you and how to style it. Image to Text covers the general extraction workflow. Working in the other direction — starting from a PDF that contains scanned pages and needing the text out of it — is covered by PDF to Text. And if the source photograph is the weak link, the guide to improving OCR on low-quality images is the right next read.",
      ],
    },
  ],
};

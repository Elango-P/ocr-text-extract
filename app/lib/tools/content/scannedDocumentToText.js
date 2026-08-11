/** Unique long-form content for /scanned-document-to-text */

export const scannedDocumentToText = {
  slug: "scanned-document-to-text",
  path: "/scanned-document-to-text",
  title: "Scanned Document to Text — OCR for Scanned Pages",
  metaTitle: "Scanned Document to Text | OCR for Scanned Pages",
  description:
    "Get editable text from scanned pages. Which scanner settings really change OCR accuracy, how to handle bleed-through and skew, and how to work through a stack.",
  h1: "Scanned Document to Text",
  lead:
    "A scanner gives you control that a camera never will: fixed lighting, a flat page, and a resolution you choose. This page is about using that control well — the settings that genuinely affect recognition, and the ones that only make your files bigger.",
  heroImage: "/images/ocr-tool-jpg.webp",
  heroAlt: "Illustration of a scanned page being converted into editable text",
  relatedBlogSlugs: [
    "advanced-ocr-techniques",
    "ultimate-guide-to-ocr-technology",
    "ocr-accuracy-and-limitations",
    "ocr-privacy-uploaded-images",
  ],
  workedExample: {
    title: "Digitising a stack of archived correspondence",
    situation:
      "You have a folder of typed letters going back several years and you want them searchable, not perfectly reproduced.",
    steps: [
      "Scan at 300 DPI in greyscale, saving each page as its own PNG named so the order is obvious.",
      "Square the pages against the edge of the platen as you go — a straight scan is easier than deskewing later.",
      "Put a sheet of black card behind each page so the reverse side does not show through.",
      "Extract in batches of up to ten, keeping the scans as the archive and the text as the searchable index over it.",
    ],
    result:
      "Clean typed pages are among the most reliable OCR inputs there are. What still needs attention is anything handwritten in the margins, any faded carbon copies in the stack, and pages where a stamp or signature overlaps printed words.",
    lesson:
      "Set the scanner up properly once and every page benefits. Time spent on settings at the start beats correcting text at the end.",
  },
  faqs: [
    {
      q: "What resolution should I scan at?",
      a: "300 DPI is the standard answer for ordinary printed text and it is a good default. Below about 200 DPI, normal body text stops having enough pixels per character for reliable recognition. Above 400 DPI you are mostly generating larger files without improving accuracy, because you have already captured all the detail the print contains. The exception is genuinely tiny text — footnotes, dense legal print, some dictionaries — where 400 to 600 DPI does help.",
    },
    {
      q: "Should I scan in colour, greyscale, or black and white?",
      a: "Greyscale is usually the best choice. Colour adds file size without adding information for text, unless the document uses colour meaningfully. Pure black-and-white mode is the one to avoid: the scanner applies its own threshold to decide what is ink, and on any page with fading or shadow it makes that decision badly and permanently. Greyscale keeps the intermediate tones so the OCR engine can make a better-informed decision itself.",
    },
    {
      q: "Can I upload a PDF from my scanner here?",
      a: "Not the PDF container itself. This tool accepts images: PNG, JPG, JPEG, WEBP, and GIF. Most scanning software can save directly to PNG or JPEG rather than PDF, which is the simplest fix, and it is worth changing the default. If you already have a PDF, export the pages you need as images first. The PDF to Text page covers that route in detail.",
    },
    {
      q: "Why does text from the other side of the page show up?",
      a: "That is bleed-through, and it happens when the scanner lid is white and the paper is thin. Light passes through the sheet, bounces off the white backing, and comes back carrying a faint mirrored impression of the reverse side. Put a sheet of black card behind the page and it disappears, because the light is absorbed instead of reflected. It costs nothing and fixes the problem completely.",
    },
    {
      q: "My scans are slightly crooked. Does that matter?",
      a: "A degree or two is generally fine; modern engines tolerate mild skew and the browser fallback here attempts automatic rotation. Beyond roughly five degrees, accuracy starts to drop, because the engine segments text into horizontal lines and a sloping line eventually spans two of them. Straightening the page against the edge of the platen when you scan is easier than correcting it afterwards.",
    },
    {
      q: "How many pages can I do at once?",
      a: "Ten images per batch. The daily AI OCR allowance is also ten runs per day per IP address, so a long document will exhaust it — at which point the in-browser engine takes over and keeps working. For a whole book, desktop OCR software with a proper job queue is the right tool; this is built for practical slices rather than bulk archival work.",
    },
  ],
  sections: [
    {
      id: "why-scans",
      heading: "Why a scan beats a photo",
      paragraphs: [
        "Everything that makes photographing a document unpredictable is fixed in a scanner. The light source is built in, it is the same brightness every time, and it moves with the sensor so there are no hotspots or shadows. The glass holds the page flat, which removes the curvature that softens focus at the edges of a photograph. The sensor sits at a known distance directly above, so there is no perspective distortion and no need to guess whether you were holding the camera square.",
        "The result is consistency. Photographs of the same page taken minutes apart can produce noticeably different OCR results depending on where you stood and what the light was doing. Scans of the same page produce the same result every time, which matters a great deal when you are working through a stack and want to configure once rather than fiddle per page.",
        "This is also why scans reward attention to settings in a way photos do not. With a camera you are managing conditions. With a scanner you are choosing parameters, and the right parameters make every subsequent page better.",
      ],
    },
    {
      id: "settings",
      heading: "The settings that actually change your results",
      paragraphs: [
        "Resolution is the one that matters most. OCR needs a certain number of pixels per character to distinguish letter shapes reliably, and the widely used rule of thumb is that lowercase letters want to be at least twenty pixels tall. At 300 DPI, ordinary ten to twelve point body text comfortably exceeds that. At 150 DPI it does not, which is why documents scanned for emailing rather than for reading so often extract poorly.",
        "Colour mode is the one most often set wrong. Scanning software frequently defaults to a bilevel black-and-white mode because it produces small files, and that mode is actively harmful to OCR. It forces every pixel to pure black or pure white at scan time using a simple threshold, so a page with a coffee stain, a shadow near the spine, or slightly grey typing has its faint strokes discarded before any OCR engine sees them. Greyscale preserves those intermediate values, and modern recognisers use them.",
        "File format is the last one worth caring about. PNG is lossless and is the right choice for text. JPEG introduces compression artefacts around high-contrast edges, which is exactly where letters meet the page, and at aggressive quality settings those artefacts blur the fine strokes that distinguish similar characters. If your scanner offers TIFF, that is fine too, though you will need to convert it before uploading here.",
        "Almost everything else in a typical scanning dialog — descreening, colour restoration, dust removal, sharpening — is aimed at photographs. Sharpening in particular can hurt, because it manufactures hard edges that were not in the original and the engine has no way to know they are artificial.",
      ],
    },
    {
      id: "physical",
      heading: "Handling the physical page",
      paragraphs: [
        "Square the page against the edge of the platen. It takes a moment and it saves you from skew correction, which always involves resampling the image and losing a little sharpness in the process.",
        "Put black card behind thin paper. Bleed-through is one of the most common and most easily fixed problems in document scanning, and the fix is a piece of card you can cut once and reuse forever. Without it, thin airmail paper, onion skin, and double-sided office printing all show a ghostly mirrored image of the reverse.",
        "Bound material needs different handling. Pressing a book onto a flatbed creates a dark curved gutter near the spine where the pages fall away from the glass, and text in that gutter is both distorted and underexposed. Scanning one page at a time and pressing gently near the spine helps. A book scanner or a careful overhead photograph with the book held open flat is often better than forcing a bound volume onto a flatbed.",
        "Remove staples and unfold corners before scanning. A folded corner hides text and casts a shadow, and a staple shadow can be read as a character.",
      ],
    },
    {
      id: "document-types",
      heading: "Different documents, different difficulty",
      paragraphs: [
        "Clean typed or laser-printed pages are close to the best case for OCR. Consistent letterforms, good contrast, generous spacing, and a single column all play to the technology's strengths. If your stack is modern office correspondence, expect to spend more time organising files than correcting text.",
        "Carbon copies and old photocopies are harder. Both reproduce text with reduced contrast, and photocopies of photocopies compound the loss, thickening strokes until adjacent letters touch. Once characters merge, the engine sees one unfamiliar shape rather than two familiar ones.",
        "Older printed material brings its own quirks. Yellowed paper reduces contrast across the whole page. Foxing — the brown spotting on aged paper — creates marks the engine may read as punctuation. Typographic conventions change too: books printed before the nineteenth century often use the long s, which looks like an f and is routinely misread as one.",
        "Forms are difficult for a structural reason rather than a legibility one. Ruled boxes and lines are strong visual features that can be interpreted as characters, and the relationship between a printed label and the value written next to it is spatial rather than sequential. Expect labels and values to arrive in an order that does not always pair them correctly.",
      ],
    },
    {
      id: "multi-page",
      heading: "Working through a stack",
      paragraphs: [
        "Name files so the order is unambiguous before you start. Zero-padded numbering — page-01, page-02, and so on up to page-10 — sorts correctly everywhere, whereas page-1 through page-10 does not. When you are reassembling extracted text into a document later, this saves real frustration.",
        "Work in batches of ten, which is the queue limit here. Keep each batch's output together and label it as you go, because pages of extracted text look remarkably alike once separated from their source.",
        "Skip pages you do not need. Blank versos, separator sheets, and pages of pure imagery consume your daily AI allowance without giving you anything. Being selective is the difference between finishing a document today and spreading it over three days.",
        "Be realistic about scale. This is a browser tool with a batch limit and a daily allowance, well suited to a chapter, a contract, or a folder of letters. Digitising a whole library is a job for desktop OCR software with unattended batch processing and quality-control tooling, and no amount of patience with a web form will make it the right choice.",
      ],
    },
    {
      id: "layout",
      heading: "What happens to the layout",
      paragraphs: [
        "You get text in reading order, not a reproduction of the page. Bold, italics, font changes, headings, and colour are all visual properties that do not survive into plain text. If the document's meaning depends on its formatting, plan to reapply that formatting yourself.",
        "Multi-column pages are the most common source of surprise. A recogniser has to decide whether to read across the full width of the page or down each column in turn, and it makes that decision from the geometry of the text blocks. Get it wrong and you find the first line of column one followed by the first line of column two. Scanning or cropping one column at a time avoids the ambiguity entirely and is usually quicker than untangling the result.",
        "Tables come back as rows of text with the column structure gone. For a small table this is easy enough to rebuild. For a large one it is tedious, and if the data exists anywhere in machine-readable form, using that source will always be faster than reconstructing a grid by hand.",
        "Footnotes, headers, page numbers, and marginalia are all just more text as far as the engine is concerned, and they can be interleaved into the body in ways that need tidying.",
      ],
    },
    {
      id: "verify",
      heading: "Checking the output",
      paragraphs: [
        "Read the numbers first. Dates, reference numbers, amounts, and clause numbers carry disproportionate meaning and get no help from the language model, because one plausible number looks much like another. Prose, by contrast, tends to self-correct: a misrecognised letter inside a common word is usually resolved by context.",
        "Then check proper nouns. Names of people, places, and organisations sit outside the engine's vocabulary in the same way numbers do, so an unusual surname is more likely to come back altered than an ordinary word.",
        "Finally, scan for missing regions rather than wrong characters. A whole paragraph silently dropped because it sat in a shadow or a gutter is easy to miss when you are reading for typos, and it is a more serious error than a misspelling. Comparing the rough shape and length of the output against the original page catches this quickly.",
      ],
    },
    {
      id: "records",
      heading: "Scans as records",
      paragraphs: [
        "Keep the scanned images. The extracted text is a convenience — searchable, quotable, editable — but it is a transcription produced by a fallible process, and it is not the document. For anything with legal, financial, or historical weight, the scan is the record and the text is an index over it.",
        "If your organisation cares about provenance, note when a document was scanned and with what. Corrections made by hand after extraction are worth recording too, because someone later will want to know whether a discrepancy came from the original or from the transcription.",
        "For contracts and other binding documents, verify anything you rely on against the original. OCR output is a good way to find the clause you are looking for and a poor basis for deciding what it says.",
      ],
    },
    {
      id: "privacy",
      heading: "Privacy for scanned records",
      paragraphs: [
        "Archived documents are disproportionately likely to contain personal information: correspondence with names and addresses, employment records, medical letters, financial statements. Before you upload a stack, consider what is actually in it.",
        "By default, extraction sends each image through our server to Google's Gemini API. If the material is confidential, or belongs to someone else, or falls under a retention policy you are responsible for, switch on Local OCR only so recognition happens entirely in your browser and nothing is transmitted. Accuracy on clean typed scans stays reasonable on that path, since those are exactly the documents classical OCR was built for.",
        "For large volumes of genuinely sensitive records, offline desktop software is the more appropriate answer, and there is no reason to pretend otherwise. Our Privacy Policy and Data Retention Policy set out precisely what each path here does.",
      ],
    },
    {
      id: "next",
      heading: "Where to go next",
      paragraphs: [
        "If your pages arrived inside a PDF, PDF to Text covers how to get images out of the container and why some PDFs need no OCR at all. For photographs of documents rather than scans, Image to Text covers capture technique. For handwritten material in the margins, Handwriting to Text is honest about what to expect. And Advanced OCR Techniques goes deeper into preprocessing if you want to understand what the tool is doing to your image before it recognises anything.",
      ],
    },
  ],
};

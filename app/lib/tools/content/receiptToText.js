/** Unique long-form content for /receipt-to-text */

export const receiptToText = {
  slug: "receipt-to-text",
  path: "/receipt-to-text",
  title: "Receipt to Text — OCR for Receipts and Expense Slips",
  metaTitle: "Receipt to Text OCR | Extract Text From Receipts Free",
  description:
    "Extract text from receipt photos for expense notes. Why thermal paper fades, how to photograph a curled slip, and which numbers you must always check yourself.",
  h1: "Receipt to Text Converter",
  lead:
    "Receipts are small, narrow, glossy, and printed on paper designed to fade. This page is about getting a usable text draft out of one anyway — and about being clear that what you get is a draft you check, not an accounting record.",
  heroImage: "/images/ocr-blog-receipt.webp",
  heroAlt: "Illustration of a receipt with totals being converted into text",
  relatedBlogSlugs: [
    "ocr-engine-benchmark-gemini-vs-tesseract",
    "ocr-use-cases-and-workflows",
    "ocr-accuracy-and-limitations",
    "improve-ocr-low-quality-images",
  ],
  workedExample: {
    title: "A month of expense slips from a jacket pocket",
    situation:
      "You need to file expenses and you have a handful of crumpled till receipts, some of them a few weeks old and starting to go grey.",
    steps: [
      "Flatten each slip under something heavy for a few minutes — a book will do — so the curl relaxes before you photograph it.",
      "Shoot on a plain dark surface in indirect daylight, holding the phone parallel to the paper rather than at an angle.",
      "Photograph each receipt individually and fill the frame with it; a wide shot of six receipts on a table gives every one of them too few pixels.",
      "Extract, then check the total, the tax line, and the date against the paper before you type anything into your expense system.",
    ],
    result:
      "Merchant names and item descriptions usually come through well enough to jog your memory, which is most of what an expense note needs. Faded totals and small tax lines are where errors concentrate, and folds running through a number are a common cause of a missing or wrong digit.",
    lesson:
      "Photograph receipts when you get them rather than at the end of the month. The paper is at its most legible on day one and never improves.",
  },
  faqs: [
    {
      q: "Why do my older receipts extract so badly?",
      a: "Most till receipts are thermal paper, which has no ink at all. The print is a heat-sensitive coating that darkens where the print head touched it, and that coating keeps reacting to its environment for the rest of its life. Heat, sunlight, and friction all fade it, and contact with oils or certain plastics can wipe it out entirely. A receipt left in a car in summer or a wallet for a month can become genuinely unreadable — not just to OCR, but to you.",
    },
    {
      q: "How should I photograph a receipt that will not lie flat?",
      a: "Flatten it first rather than fighting it with the camera. Press it under a heavy book for a few minutes, or tape the ends down. A curled receipt puts part of the text out of the plane of focus and casts a shadow across itself, so you lose both sharpness and contrast on the same line. If you cannot flatten it, photograph it in two overlapping halves and extract each separately.",
    },
    {
      q: "Will this pull out the total and the date as separate fields?",
      a: "No. This is a text extractor, not a receipt parser. You get the words and numbers as text in reading order, and you decide what they mean. Dedicated expense products run a second layer of logic to identify which number is the total and which is tax, and they charge for it. If you process a large volume of receipts every month, that kind of tool is worth the money; for occasional slips, extracting the text and typing four fields is quicker than setting one up.",
    },
    {
      q: "Can I trust the amounts it gives me?",
      a: "Check every one. Money is precisely the content where OCR errors are both most likely and most costly: the digits are often the smallest text on the slip, they sit near the bottom where curl and wear are worst, and a single substituted character changes the meaning completely. Read the total, tax, and date off the paper and compare. Treat the extracted text as something that saves typing, not as something that removes checking.",
    },
    {
      q: "Should I upload a receipt that shows my card number?",
      a: "Card receipts normally print only the last four digits, which is not usually sensitive on its own. But if a slip shows more than that, or carries a name, address, or membership number you would rather not send to a third party, switch on Local OCR only before extracting so the image never leaves your browser. The same goes for anything medical, since pharmacy receipts can reveal a great deal.",
    },
    {
      q: "Can I do a whole batch at once?",
      a: "You can queue up to ten images in one go, which suits a typical expense run. Bear in mind the daily AI OCR allowance is ten runs per day per IP address, so a large batch can exhaust it. Once it is used up the browser fallback keeps working, so you are never fully blocked, just slower and slightly less accurate on faint print.",
    },
  ],
  sections: [
    {
      id: "thermal",
      heading: "Thermal paper is why receipts are hard",
      paragraphs: [
        "Almost every till receipt you handle is thermal paper, and understanding what that means explains most of the difficulty. There is no ink. The paper carries a colourless dye and a developer in a coating, and the print head applies heat in the shape of the characters, causing the two to react and go dark. It is fast, silent, and needs no consumables, which is why retail adopted it universally.",
        "It is also chemically unstable by design. The same reaction that made the text appear can be triggered or reversed by anything else in the environment. Warmth darkens the whole sheet and drops the contrast between the text and its background. Sunlight bleaches it. Friction in a pocket abrades the coating. Oils from your hands, the plasticiser in some wallets and receipt sleeves, and even the adhesive on some tapes will lift the print off in patches.",
        "The practical consequence is a deadline you did not know you had. A receipt photographed the day you received it is a good OCR input. The same receipt three months later may be a grey rectangle. If you handle expenses in a monthly batch, the last week's receipts will consistently extract better than the first week's, and nothing you do in software will close that gap.",
      ],
    },
    {
      id: "shape",
      heading: "The shape of a receipt works against the camera",
      paragraphs: [
        "Receipts come off a roll, so they curl, and they curl along the axis that matters. When a slip bows away from the paper, the top and bottom of the frame sit at a different distance from the lens than the middle. Phone cameras have generous depth of field but not infinite, and more importantly the curve catches the light differently along its length, so one band of the receipt is brighter than the rest and another is in its own shadow.",
        "They are also narrow and long. Framing one to fill a landscape photo wastes most of the sensor on the table either side, and the text ends up occupying far fewer pixels than it should. Turn the phone to portrait and get close, or crop tightly afterwards so the receipt fills the frame.",
        "Then there are the folds. A receipt that has been folded twice to fit a wallet has creases running across the print, and a crease does two things: it breaks the character shapes along the line, and it casts a thin hard shadow. If a fold runs through the total, that is the number most likely to come back wrong.",
      ],
    },
    {
      id: "photograph",
      heading: "How to photograph a receipt properly",
      paragraphs: [
        "Flatten first. A few minutes under a book relaxes most of the curl, and it is the single highest-value thing you can do. Taping the corners down works too if you are photographing several.",
        "Choose a background that contrasts with the paper. White receipts on a white desk give the engine no clear edge to work with, and automatic exposure tends to blow out the paper trying to average the scene. A dark wooden table or a sheet of dark card makes the slip pop and helps your camera meter correctly.",
        "Light it indirectly and evenly. Bright indirect daylight near a window is ideal. Avoid direct overhead spots, which create a hot glare patch on glossy thermal stock, and avoid your own shadow, which is easy to cast when you lean over a small object. Never use the flash: at close range it produces a blown-out circle in the middle of exactly the area you care about.",
        "Hold the phone parallel to the receipt, directly above it, and get close enough that the slip fills the frame. Tap to focus on the text before shooting, and check the result at full zoom before you move on. If you cannot read a number on your own screen, the extractor will not read it either.",
      ],
    },
    {
      id: "what-you-get",
      heading: "What you actually get back",
      paragraphs: [
        "Text in reading order, top to bottom. Merchant name and address at the top, the line items in the middle, the totals block near the bottom, and whatever payment and loyalty footer the terminal printed. Descriptions of items are often abbreviated on the receipt itself, and OCR faithfully reproduces the abbreviation rather than expanding it.",
        "What you do not get is structure. The alignment that visually separates an item name from its price is columnar whitespace, and OCR flattens that into a single line of text. Prices generally stay on the same line as their item, which is usually enough to be useful, but you should not expect a tidy two-column table.",
        "Totals blocks are where reading order tends to be least predictable, because they mix right-aligned numbers with left-aligned labels in a tight vertical space. Subtotal, tax, service charge, and total can arrive interleaved differently from how they look on the paper. This is one more reason to read the numbers off the original.",
      ],
    },
    {
      id: "numbers",
      heading: "Why the numbers deserve a second look",
      paragraphs: [
        "There is a general rule in OCR that surrounding language rescues ambiguous characters, and it explains why prose extracts better than figures. If a word comes back as \"invoce\", the language model knows the word should be \"invoice\" and fixes it. If an amount comes back as 1.00 instead of 7.00, nothing in the model's understanding of language flags that as wrong, because both are perfectly plausible amounts.",
        "On receipts this effect is amplified. The digits are frequently the smallest characters on the slip. They sit at the bottom, which is the part most likely to be curled, worn, or faded. Currency symbols and thousands separators add characters that can merge with adjacent digits at low resolution. And a decimal point is a very small mark to be carrying that much meaning.",
        "So the discipline is simple and worth keeping: verify the total, the tax, and the date against the paper every time, no matter how good the rest of the extraction looks. Everything else on a receipt is a memory aid. Those three fields are the ones that end up in someone's accounts.",
      ],
    },
    {
      id: "workflow",
      heading: "Fitting this into an expense routine",
      paragraphs: [
        "The routine that works best is photographing receipts at the point of receiving them, while they are flat and fresh, and dealing with the text later. A photo taken in ten seconds at the counter preserves the receipt at its most legible, and it also means a lost slip is only a lost piece of paper.",
        "When you sit down to file, queue the images here in batches, extract, and paste the text into whatever note or spreadsheet you keep. Keeping the extracted text alongside the photo is useful: the text is searchable, and the photo remains the evidence if anyone queries the claim.",
        "Keep the original images. Most expense policies and tax authorities want to see the receipt itself, not a transcription of it, and OCR output is not a substitute for the document. Think of the text as an index over your receipts rather than a replacement for them.",
        "If you are reconciling more than a few dozen receipts a month, the arithmetic changes and a dedicated expense product with real field extraction will pay for itself. There is no sense pretending a general-purpose text extractor competes with that at volume.",
      ],
    },
    {
      id: "invoices",
      heading: "Printed invoices are a different problem",
      paragraphs: [
        "A supplier invoice on A4 is a much easier input than a till receipt: it is laser-printed on ordinary paper at a comfortable size, it lies flat, and it does not fade. If you have the choice, invoices extract well with very little effort.",
        "Their difficulty is layout rather than legibility. Invoices are built around tables — line items, quantities, unit prices, tax columns — and reconstructing a table from OCR output is manual work. The values come back accurately and then you spend your time putting them back into columns.",
        "There is also a security point worth making. Invoice fraud usually works by altering bank details on a document that otherwise looks legitimate, so payment details should always be verified through a channel you already trust rather than read off a document, whether that document was extracted by OCR or read by eye. OCR neither helps nor hinders here, but it is a good moment to remember the rule.",
      ],
    },
    {
      id: "privacy",
      heading: "Privacy for financial documents",
      paragraphs: [
        "Card receipts normally mask all but the last four digits of the card, so a typical shop receipt is not especially sensitive. Some are, though. Pharmacy receipts can disclose medical information. Hotel and travel receipts show where you were and when. Anything with a full account number, a membership identifier, or a customer's name and address deserves more thought than a coffee slip.",
        "By default this tool sends your image through our server to Google's Gemini API to do the recognition, which is what makes it accurate on faint thermal print. If you would rather a particular receipt never left your device, turn on Local OCR only before extracting. Recognition then runs in your browser using Tesseract.js and nothing is uploaded. Results on badly faded print will be weaker, which is the honest trade-off.",
        "The Privacy Policy and Data Retention Policy describe exactly what happens on each path, including the fact that we do not store your images.",
      ],
    },
    {
      id: "next",
      heading: "Where to go next",
      paragraphs: [
        "If your receipt is faint and the first attempt disappointed you, the guide to improving OCR on low-quality images goes further into lighting and resolution. For invoices and statements that arrived as PDFs rather than paper, see PDF to Text. For handwritten notes and tips added to a slip, Handwriting to Text sets sensible expectations. And the article on OCR accuracy and limitations explains, in general terms, why figures need more scrutiny than prose.",
      ],
    },
  ],
};

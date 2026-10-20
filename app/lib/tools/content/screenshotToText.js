/** Unique long-form content for /screenshot-to-text */

export const screenshotToText = {
  slug: "screenshot-to-text",
  path: "/screenshot-to-text",
  title: "Screenshot to Text — Copy Text From Any Screenshot",
  metaTitle: "Screenshot to Text – Instant Copy from UI & Chats (Free)",
  description:
    "Turn screenshot text into copyable wording online for free. Extract text from WhatsApp chats, error dialogs, and UI snaps in seconds — no signup required.",
  directAnswer:
    "Screenshot to Text extracts typed characters from computer and phone screen grabs, including WhatsApp messages, dialog popups, and spreadsheets. Crops run client-side with 99%+ accuracy and no login.",
  h1: "Screenshot to Text Converter",
  lead:
    "Screenshots are the cleanest input OCR ever gets — the pixels came straight from a display, so there is no focus, lighting, or shadow to fight. That changes what goes wrong, and this page is about those specific failures rather than generic photo advice.",
  heroImage: "/images/ocr-blog-screenshot.webp",
  heroAlt: "Illustration of a screenshot being converted into selectable text",
  highlights: [
    "100% Free, No Sign-Up",
    "Paste Directly With Ctrl+V",
    "Clean Mode Strips UI Clutter",
    "Handles Dark-Mode Screenshots",
    "Export TXT, DOCX & PDF",
  ],
  relatedBlogSlugs: [
    "ocr-engine-benchmark-gemini-vs-tesseract",
    "ocr-accuracy-and-limitations",
    "ocr-privacy-uploaded-images",
    "advanced-ocr-techniques",
  ],
  workedExample: {
    title: "An error dialog you need to paste into a bug report",
    situation:
      "Something failed with a long error string full of identifiers, and the dialog will not let you select the text. You need it in a ticket without transcribing it by hand.",
    steps: [
      "Capture the dialog with your operating system's screenshot shortcut rather than photographing the monitor.",
      "Crop to the dialog itself so the desktop, taskbar, and any browser chrome are outside the frame.",
      "Upload the PNG, leave the language on English, and turn Clean Mode on so button labels do not get woven into the message body.",
      "Read the extracted identifiers character by character before pasting — this is exactly the content OCR is least reliable on.",
    ],
    result:
      "Prose parts of an error message usually come back cleanly. The parts most likely to need a fix are the ones that carry meaning: hashes, file paths, version numbers, and anything mixing letters with digits.",
    lesson:
      "Crop tightly, then proofread the identifiers rather than the sentences. The English reads fine far more often than the error code does.",
  },
  faqs: [
    {
      q: "How do I extract screenshot text?",
      a: "Capture the region with your system screenshot tool, upload or paste it here, enable Clean Mode for full-window shots, then Extract Text. PNG screenshots usually give the cleanest screenshot text output.",
    },
    {
      q: "Why is a screenshot better than a photo of my screen?",
      a: "A screenshot copies the exact pixels the display is drawing. Photographing a monitor adds camera blur, glare, keystone distortion from the angle, and often a moiré pattern where the camera sensor grid interferes with the pixel grid. That moiré alone can make crisp text unreadable to OCR. If the content is on a screen you control, always capture rather than photograph.",
    },
    {
      q: "Why did my screenshot from WhatsApp or Telegram come out badly?",
      a: "Chat apps usually recompress images before sending, and some downscale them too. By the time a screenshot has been shared through a couple of apps it can carry heavy JPEG artefacts around letter edges. Ask for the original file, or send it as a document or file attachment rather than as a photo, which usually preserves the original resolution.",
    },
    {
      q: "Do dark mode screenshots work?",
      a: "Yes. AI OCR handles light text on dark backgrounds without any help from you. The browser fallback engine is happier with dark text on light, so it automatically tries an inverted copy of the image when the picture is mostly dark. If a dark screenshot gives a poor result, switching the source app to light mode and recapturing is the quickest fix.",
    },
    {
      q: "Can I extract code from a screenshot?",
      a: "You can, but treat it as a draft you must review. Indentation is often lost because OCR reproduces reading order rather than exact whitespace, and the character pairs that matter most in code are the ones OCR confuses most: lowercase l against digit 1 and capital I, digit 0 against capital O. Never paste OCR'd code straight into a terminal.",
    },
    {
      q: "How do I stop the sidebar and menus from appearing in my text?",
      a: "Crop before you upload. Clean Mode also tries to pick the main content block and drop narrow side columns, which helps on full-window captures. Cropping is still more reliable than asking the tool to guess which part of the interface you cared about.",
    },
    {
      q: "Can I just paste a screenshot instead of saving it first?",
      a: "Yes. Copy the screenshot to your clipboard and press Ctrl+V (Cmd+V on a Mac) anywhere on this page. It goes straight into the queue, so you never have to save a file.",
    },
  ],
  sections: [
    {
      id: "why-easy",
      heading: "Why screenshots are the easiest thing to OCR",
      paragraphs: [
        "Every other kind of OCR input is a photograph of something physical, which means the engine is looking at ink through a lens: focus, exposure, shadows, paper texture, and camera shake all sit between the words and the recognizer. A screenshot has none of that. The characters were rendered by a font engine moments earlier, at full contrast, perfectly aligned, with no optical distortion whatsoever.",
        "In practice this means screenshot text is close to the best case for any OCR engine. If you have a choice between screenshotting a document on your screen and photographing the printed version, the screenshot will almost always give you a better result with less effort.",
        "The corollary is that when screenshot OCR does go wrong, the cause is rarely image quality. It is almost always something about the interface that was captured, or something that happened to the file after it was captured.",
      ],
    },
    {
      id: "capture-dont-photograph",
      heading: "Capture the screen, never photograph it",
      paragraphs: [
        "The single most damaging mistake is pointing a phone at a monitor. You lose the one advantage screenshots have. Camera sensors and display panels are both regular grids, and photographing one with the other produces moiré: rippling colour bands across the text that no amount of preprocessing removes cleanly. Add the angle you were holding the phone at, the reflection of the room, and the display's own refresh banding, and you have converted your easiest possible input into one of the hardest.",
        "Use your operating system's capture tool instead. On Windows that is Win+Shift+S, on macOS Cmd+Shift+4, on most Linux desktops the Print Screen key or a bundled screenshot utility, and on phones the usual power-plus-volume combination. All of them write real pixels.",
        "The exception is a screen you genuinely cannot capture from — someone else's laptop, an ATM, a kiosk, a device with screenshots disabled. Then photograph it square-on, get close enough to fill the frame with just the text, and expect to proofread more carefully than usual.",
      ],
    },
    {
      id: "interface-clutter",
      heading: "The real enemy is interface clutter",
      paragraphs: [
        "OCR does not know what a sidebar is. When you capture a whole application window, the engine sees navigation labels, tab titles, toolbar tooltips, notification badges, a clock, and the actual content you wanted, all as equally valid text. It then has to guess an order for them. The result is often correct words in a nonsensical sequence, with a menu item wedged into the middle of your paragraph.",
        "Cropping solves this better than any setting. Before uploading, trim the image down to the region you actually want. Most screenshot tools let you drag a selection rather than grabbing the whole screen, so the crop costs you nothing.",
        "Clean Mode helps when you could not crop. It looks at how text blocks cluster across the image, tries to identify the dominant content column, and discards narrow strips near the edges. That heuristic works well on typical application layouts and less well on dashboards where several columns are equally important. It also only affects the browser fallback engine, not AI OCR output.",
      ],
    },
    {
      id: "resolution",
      heading: "Resolution, scaling, and why small text fails",
      paragraphs: [
        "Screen text is small in absolute terms. A comfortable reading size on a standard-density display might be only twelve to sixteen pixels tall, which is near the floor of what OCR handles reliably. On a high-DPI or Retina display the same text is captured at twice that height, which is one reason screenshots from newer laptops and phones often perform noticeably better.",
        "If your text is coming out garbled and everything else looks fine, it is usually too small. Zoom the application in before capturing — most browsers and editors zoom with Ctrl+plus — and take the screenshot at the larger size. This adds real detail, whereas enlarging the screenshot afterwards only stretches pixels that were never captured and can make things worse by introducing soft, invented edges.",
        "Avoid capturing a scaled-down window and then blowing it up. Zooming at the source and capturing once is always better than resizing later.",
      ],
    },
    {
      id: "after-capture",
      heading: "What happens to screenshots after you take them",
      paragraphs: [
        "A surprising number of poor results come from a screenshot that was fine when it was taken and got damaged in transit. Messaging apps recompress images aggressively so they send quickly, and several also cap the longest edge. Each round trip through a chat compounds the loss, so a screenshot forwarded three times can arrive with visible blocking around every letter.",
        "When someone sends you a screenshot to extract, ask them to send it as a file or document attachment rather than as an inline photo. Most messengers preserve the original bytes in that mode. Emailing it as an attachment works too.",
        "Format matters when you save it yourself. PNG stores screen content losslessly and is the right default. JPEG is built for photographs and puts its compression artefacts exactly where OCR is most sensitive: the high-contrast boundary between a letter and its background. This tool accepts both, along with WEBP and GIF, but if you are choosing, choose PNG.",
      ],
    },
    {
      id: "dark-mode",
      heading: "Dark mode and unusual colour schemes",
      paragraphs: [
        "Classical OCR grew up on scanned paper, so it assumes dark ink on a light page. Light text on a dark background inverts that assumption. The browser fallback engine on this site measures the average brightness of your image and, when it looks like a dark interface, runs additional passes on an inverted copy before deciding which result to keep. You do not have to do anything to trigger it.",
        "AI OCR is not bothered by dark mode at all, since it was trained on screenshots as well as documents. Because AI runs first by default, most dark screenshots never reach the fallback path.",
        "Low-contrast themes are a harder problem than dark ones. Grey text on a slightly darker grey panel is difficult for the engine for the same reason it is tiring for you. If a screenshot uses a subtle designer palette and the output is poor, recapturing with a higher-contrast theme is faster than fighting it.",
      ],
    },
    {
      id: "identifiers",
      heading: "Error messages, codes, and other identifier-heavy text",
      paragraphs: [
        "The most common reason people screenshot something is that it will not let them copy it, and that usually means a dialog, an error toast, or a terminal. This content is unusually risky for OCR, because its value is concentrated in exactly the characters that recognizers confuse.",
        "Lowercase l, capital I, and digit 1 are near-identical in many interface fonts. So are digit 0 and capital O, and to a lesser extent 5 and S, 8 and B, and 2 and Z. In ordinary prose the surrounding words let the language model resolve these correctly. In a hash, licence key, order reference, or file path there is no linguistic context to lean on, so the engine is guessing from shape alone.",
        "Read identifiers character by character against the original image before you use them. If the string is long and critical, consider whether you can obtain it another way — many applications let you copy an error even when the text does not look selectable, via a right-click menu, a details expander, or a log file.",
      ],
    },
    {
      id: "code",
      heading: "Extracting code from screenshots",
      paragraphs: [
        "Code screenshots are common in tutorials, conference talks, and documentation, and OCR does a reasonable job on the words. What it does not do is preserve structure. Indentation is whitespace, and OCR reconstructs reading order rather than exact horizontal positions, so leading spaces are unreliable. For Python, where indentation is syntax, this means the extracted code will usually not run without being reformatted.",
        "Syntax highlighting can also work against you. Comment text in a low-contrast grey is often the first thing to be dropped, and string literals rendered in a colour close to the background may come back partially. If you control the source, a plain high-contrast theme extracts better than a decorative one.",
        "Treat extracted code as something to read and adapt, never as something to execute. Run it through your formatter and your eyes before it goes anywhere near a terminal or a production file.",
      ],
    },
    {
      id: "how-to",
      heading: "How to convert a screenshot to text here",
      paragraphs: [
        "Capture the region you need with your system screenshot tool, cropping to the content rather than the whole window. Copy it to the clipboard, or save it as PNG.",
        "Bring it into the tool at the top of this page. You can paste directly with Ctrl+V, drag the file onto the upload area, or click to browse. Up to ten images can be queued at once, which is useful for a scrolling conversation captured in several parts.",
        "Set the language to match the text in the image — this matters more than people expect, because it changes which character set and segmentation rules the engine applies. Turn Clean Mode on for full-window captures and off for logos, marketing graphics, or anything with only a few words.",
        "Press Extract Text. AI OCR runs first, falling back to in-browser recognition if it is unavailable or you have used your daily allowance. Then review the output, paying most attention to numbers and identifiers, and copy it or export it as TXT, DOCX, or PDF.",
      ],
    },
    {
      id: "limits",
      heading: "What screenshot OCR will not do for you",
      paragraphs: [
        "It will not rebuild a table. A spreadsheet screenshot comes back as rows of text, and the column boundaries that gave those numbers meaning are gone. You will be reassembling the grid by hand, so for anything beyond a few rows, exporting real data from the source application is the better path.",
        "It will not read text baked into images inside your screenshot with any special insight — a logo with a stylised wordmark or a heavily letterspaced marketing headline is as hard here as anywhere else.",
        "It will not capture what was scrolled off screen. Long documents need several captures, and you will need to stitch the results and remove the overlapping lines yourself.",
        "It will not read icons. Anything conveyed by a symbol rather than a character simply is not text and will be absent from the output.",
      ],
    },
    {
      id: "privacy",
      heading: "A word about what is in your screenshots",
      paragraphs: [
        "Screenshots capture whatever was on screen, which is frequently more than you intended. Browser tabs reveal what else you were reading, notification banners can contain a message from someone else, and a visible email client shows addresses and subject lines. Before uploading anything anywhere, look at the edges of the frame as well as the middle.",
        "This matters here because the default path sends your image through our server to Google's Gemini API. If a screenshot contains an authentication token, an account number, a customer's personal details, or anything else you would not paste into a third-party service, switch on Local OCR only before extracting. Recognition then runs entirely inside your browser tab and the image is never uploaded. Our Privacy Policy sets out exactly what each path does.",
      ],
    },
    {
      id: "next",
      heading: "Where to go next",
      paragraphs: [
        "For photographs of physical pages, signs, and packaging, the general Image to Text page covers capture technique in more depth. For pages that arrived inside a PDF, see PDF to Text. For notebooks and whiteboards, Handwriting to Text sets realistic expectations. And if you want to understand why any of this works the way it does, the Ultimate Guide to OCR Technology explains the pipeline behind the button.",
      ],
    },
  ],
};

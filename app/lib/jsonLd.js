import {
  SITE_URL,
  SITE_NAME,
  OPERATOR_NAME,
  OPERATOR_URL,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "./site";

const AUTHOR_URL = `${SITE_URL}/author/elango-p`;

/** Site-wide JSON-LD for SEO / trust scanners */
export function buildSiteJsonLd() {
  const sameAs = [OPERATOR_URL, ...SOCIAL_LINKS.map((link) => link.href)];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: [
          "Free Online OCR",
          "Image to Text Converter",
          "OCR Text Extractor",
        ],
        description:
          "Free online OCR converter to extract editable text from images, screenshots, JPG, PNG, and scanned documents.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        founder: { "@id": `${AUTHOR_URL}#person` },
        sameAs,
      },
      {
        "@type": "Person",
        "@id": `${AUTHOR_URL}#person`,
        name: OPERATOR_NAME,
        url: AUTHOR_URL,
        email: CONTACT_EMAIL,
        jobTitle: "Independent software developer",
        sameAs,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        featureList: [
          "Image to text conversion",
          "Screenshot to text extraction",
          "JPG and PNG OCR",
          "Scanned document OCR",
          "Multi-language text recognition",
          "AI OCR with browser fallback",
        ],
        description:
          "Free online OCR tool to extract text from screenshots, photos, scanned documents, JPG, PNG, WEBP, and GIF files.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: { "@id": `${AUTHOR_URL}#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };
}

export function buildHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#how-to-extract-text`,
        name: "How to extract text from an image online",
        description:
          "Upload an image, choose the language, and convert it into editable text with the free OCR tool.",
        totalTime: "PT1M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Screenshot, photo, JPG, PNG, WEBP, GIF, or scanned document image",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: SITE_NAME,
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Upload your image",
            text: "Choose or drag a screenshot, photo, scan, JPG, PNG, WEBP, or GIF into the OCR tool.",
          },
          {
            "@type": "HowToStep",
            name: "Choose the document language",
            text: "Select the language that matches the text in the image for better OCR accuracy.",
          },
          {
            "@type": "HowToStep",
            name: "Extract and copy text",
            text: "Run OCR, review the editable text, then copy it or download it as a plain text file.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#homepage-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I convert an image to text for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload your image to OCR Text Extractor, choose the language, and click Extract Text. The tool converts screenshots, photos, JPG, PNG, WEBP, GIF, and scanned document images into editable text.",
            },
          },
          {
            "@type": "Question",
            name: "Can I extract text from screenshots, JPG, and PNG files?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The tool supports common image formats including screenshots, JPG, JPEG, PNG, WEBP, and GIF.",
            },
          },
          {
            "@type": "Question",
            name: "Does this OCR tool support multiple languages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. It supports English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, Hindi, and more.",
            },
          },
        ],
      },
    ],
  };
}

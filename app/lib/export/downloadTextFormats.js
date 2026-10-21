/** Client-side downloads for OCR output (loaded only when the user exports). */

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function sanitizeFilename(name, fallback = "extracted-text") {
  if (!name || typeof name !== "string") return fallback;
  const withoutExt = name.replace(/\.[^/.]+$/, "");
  const clean = withoutExt.replace(/[^a-zA-Z0-9_\- ]/g, "").trim().replace(/\s+/g, "-");
  return clean || fallback;
}

export function downloadTxt(text, filename = "extracted-text.txt") {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  triggerDownload(blob, filename);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
    }
  }
  return ~c >>> 0;
}

function u16(n) {
  const b = new Uint8Array(2);
  new DataView(b.buffer).setUint16(0, n, true);
  return b;
}

function u32(n) {
  const b = new Uint8Array(4);
  new DataView(b.buffer).setUint32(0, n, true);
  return b;
}

function concatBytes(parts) {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const p of parts) {
    out.set(p, offset);
    offset += p.length;
  }
  return out;
}

function zipStore(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const data =
      typeof file.data === "string" ? encoder.encode(file.data) : file.data;
    const crc = crc32(data);
    const localHeader = concatBytes([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(nameBytes.length),
      u16(0),
      nameBytes,
    ]);
    localParts.push(localHeader, data);

    const central = concatBytes([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(nameBytes.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      nameBytes,
    ]);
    centralParts.push(central);
    offset += localHeader.length + data.length;
  }

  const centralDir = concatBytes(centralParts);
  const end = concatBytes([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(files.length),
    u16(files.length),
    u32(centralDir.length),
    u32(offset),
    u16(0),
  ]);

  return concatBytes([...localParts, centralDir, end]);
}

function buildDocumentXml(text) {
  const paragraphs = String(text)
    .split(/\r?\n/)
    .map((line) => {
      if (!line) {
        return `<w:p><w:pPr><w:spacing w:after="120"/></w:pPr></w:p>`;
      }
      return `<w:p><w:r><w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r></w:p>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraphs}
    <w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>
  </w:body>
</w:document>`;
}

export function downloadDocx(text, filename = "extracted-text.docx") {
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const bytes = zipStore([
    { name: "[Content_Types].xml", data: contentTypes },
    { name: "_rels/.rels", data: rels },
    { name: "word/document.xml", data: buildDocumentXml(text) },
  ]);

  const blob = new Blob([bytes], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  triggerDownload(blob, filename);
}

export function downloadZip(files, filename = "extracted-texts.zip") {
  const bytes = zipStore(files);
  const blob = new Blob([bytes], {
    type: "application/zip",
  });
  triggerDownload(blob, filename);
}

function escapePdfText(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

/**
 * Unicode punctuation that WinAnsi (CP1252) can represent at 0x80-0x9F.
 *
 * OCR output is full of curly quotes, en/em dashes and ellipses, so mapping
 * these is what keeps ordinary English text from filling up with "?".
 */
const CP1252_EXTRAS = new Map(
  Object.entries({
    "\u20AC": 0x80, "\u201A": 0x82, "\u0192": 0x83, "\u201E": 0x84,
    "\u2026": 0x85, "\u2020": 0x86, "\u2021": 0x87, "\u02C6": 0x88,
    "\u2030": 0x89, "\u0160": 0x8a, "\u2039": 0x8b, "\u0152": 0x8c,
    "\u017D": 0x8e, "\u2018": 0x91, "\u2019": 0x92, "\u201C": 0x93,
    "\u201D": 0x94, "\u2022": 0x95, "\u2013": 0x96, "\u2014": 0x97,
    "\u02DC": 0x98, "\u2122": 0x99, "\u0161": 0x9a, "\u203A": 0x9b,
    "\u0153": 0x9c, "\u017E": 0x9e, "\u0178": 0x9f,
  })
);

/** The byte that renders `ch`, or null if WinAnsi has no glyph for it. */
function cp1252Byte(ch) {
  const code = ch.charCodeAt(0);
  // 0x80-0x9F are control codes in Latin-1 and print as nothing useful.
  if (code <= 0x7f || (code >= 0xa0 && code <= 0xff)) return code;
  return CP1252_EXTRAS.get(ch) ?? null;
}

function toPdfSafe(line) {
  return Array.from(line)
    .map((ch) => {
      const byte = cp1252Byte(ch);
      return byte === null ? "?" : String.fromCharCode(byte);
    })
    .join("");
}

/**
 * Characters the PDF export cannot represent.
 *
 * The exported PDF uses the base Helvetica font, which covers only WinAnsi, so
 * Devanagari, Tamil, CJK and emoji are written as "?". TXT and DOCX are UTF-8
 * and keep every character, so callers warn and point users there instead of
 * silently mangling the download.
 */
export function findPdfUnsupportedChars(text) {
  const unsupported = new Set();
  for (const ch of String(text || "")) {
    if (cp1252Byte(ch) === null) unsupported.add(ch);
  }
  return [...unsupported];
}

/** PDF byte strings are Latin-1, so one char is one byte. */
function latin1Bytes(str) {
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    out[i] = str.charCodeAt(i) & 0xff;
  }
  return out;
}

/** Minimal multi-page PDF for plain text (Helvetica / Latin-1 best-effort). */
export function downloadPdf(text, filename = "extracted-text.pdf") {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 54;
  const fontSize = 11;
  const leading = 14;
  const maxWidthChars = 86;

  const wrapLine = (line) => {
    const raw = line || " ";
    const out = [];
    for (let i = 0; i < raw.length; i += maxWidthChars) {
      out.push(raw.slice(i, i + maxWidthChars));
    }
    return out.length ? out : [" "];
  };

  const allLines = String(text || "")
    .split(/\r?\n/)
    .flatMap(wrapLine);

  const linesPerPage = Math.floor((pageHeight - margin * 2) / leading);
  const pages = [];
  for (let i = 0; i < allLines.length; i += linesPerPage) {
    pages.push(allLines.slice(i, i + linesPerPage));
  }
  if (!pages.length) pages.push([" "]);

  const chunks = [];
  const offsets = [0];
  let byteLength = 0;

  const push = (str) => {
    chunks.push(str);
    byteLength += str.length;
  };

  push("%PDF-1.4\n");

  const objBodies = [];

  // 1: font
  // WinAnsiEncoding is required for bytes above 0x7F to render as Latin-1
  // accents rather than the Type 1 StandardEncoding glyphs.
  objBodies.push(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
  );

  const contentObjNumbers = [];
  for (const pageLines of pages) {
    let y = pageHeight - margin;
    const ops = [`BT /F1 ${fontSize} Tf`];
    for (const line of pageLines) {
      const safe = escapePdfText(toPdfSafe(line));
      ops.push(`1 0 0 1 ${margin} ${y} Tm (${safe}) Tj`);
      y -= leading;
    }
    ops.push("ET");
    const stream = ops.join("\n");
    contentObjNumbers.push(objBodies.length + 1);
    objBodies.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  }

  // Placeholder pages parent — we'll insert after knowing pages id
  const pagesObjIndex = objBodies.length; // 0-based; will push pages dict later after page objs
  // Build page objects first with temporary parent, then pages, then catalog

  const pageStartIndex = objBodies.length;
  for (let i = 0; i < pages.length; i++) {
    objBodies.push(null); // placeholder
  }
  const pagesObjNum = pageStartIndex + pages.length + 1;
  for (let i = 0; i < pages.length; i++) {
    const contentNum = contentObjNumbers[i];
    objBodies[pageStartIndex + i] =
      `<< /Type /Page /Parent ${pagesObjNum} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${contentNum} 0 R /Resources << /Font << /F1 1 0 R >> >> >>`;
  }

  const kidRefs = pages
    .map((_, i) => `${pageStartIndex + i + 1} 0 R`)
    .join(" ");
  objBodies.push(
    `<< /Type /Pages /Kids [${kidRefs}] /Count ${pages.length} >>`
  );
  const catalogNum = objBodies.length + 1;
  objBodies.push(`<< /Type /Catalog /Pages ${pagesObjNum} 0 R >>`);

  for (let i = 0; i < objBodies.length; i++) {
    offsets.push(byteLength);
    push(`${i + 1} 0 obj\n${objBodies[i]}\nendobj\n`);
  }

  const xrefPos = byteLength;
  push(`xref\n0 ${objBodies.length + 1}\n`);
  push("0000000000 65535 f \n");
  for (let i = 1; i <= objBodies.length; i++) {
    push(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  push(`trailer\n<< /Size ${objBodies.length + 1} /Root ${catalogNum} 0 R >>\n`);
  push(`startxref\n${xrefPos}\n%%EOF`);

  const blob = new Blob([latin1Bytes(chunks.join(""))], {
    type: "application/pdf",
  });
  triggerDownload(blob, filename);
}

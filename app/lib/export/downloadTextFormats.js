/** Client-side downloads for OCR output (loaded only when the user exports). */

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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

function escapePdfText(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function toPdfSafe(line) {
  return Array.from(line)
    .map((ch) => (ch.charCodeAt(0) <= 255 ? ch : "?"))
    .join("");
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

  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];

  const push = (str) => {
    chunks.push(str);
  };

  push("%PDF-1.4\n");

  const objBodies = [];

  // 1: font
  objBodies.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

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
    objBodies.push(`<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}\nendstream`);
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
    offsets.push(encoder.encode(chunks.join("")).length);
    push(`${i + 1} 0 obj\n${objBodies[i]}\nendobj\n`);
  }

  const xrefPos = encoder.encode(chunks.join("")).length;
  push(`xref\n0 ${objBodies.length + 1}\n`);
  push("0000000000 65535 f \n");
  for (let i = 1; i <= objBodies.length; i++) {
    push(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  push(`trailer\n<< /Size ${objBodies.length + 1} /Root ${catalogNum} 0 R >>\n`);
  push(`startxref\n${xrefPos}\n%%EOF`);

  const blob = new Blob([chunks.join("")], { type: "application/pdf" });
  triggerDownload(blob, filename);
}

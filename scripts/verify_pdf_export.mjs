/**
 * Verifies downloadPdf() produces a structurally valid PDF: xref offsets must
 * point at the real byte positions of each object. Regression guard for the
 * Latin-1 encoding fix, since UTF-8 encoding of accented characters used to
 * shift every offset after the first one.
 */

import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("app/lib/export/downloadTextFormats.js", "utf8");

let captured = null;
globalThis.URL = { createObjectURL: () => "blob:x", revokeObjectURL() {} };
globalThis.Blob = class {
  constructor(parts) {
    captured = parts[0];
  }
};
globalThis.document = {
  createElement: () => ({ click() {} }),
};

const mod = await import(
  "data:text/javascript;base64," + Buffer.from(src).toString("base64")
);

const cases = {
  ascii: "Invoice 1042\nTotal: 219.50\nThank you",
  latin1: "Café Müller — Genève\nPrix: 24,90 £ © 2026",
  mixed: "Receipt\nनमस्ते दुनिया\n合計: 1200円\nTotal 12.00",
  long: Array.from({ length: 150 }, (_, i) => `Line ${i} of extracted text`).join("\n"),
};

let failures = 0;

for (const [name, text] of Object.entries(cases)) {
  mod.downloadPdf(text);
  const bytes = Buffer.from(captured);
  const pdf = bytes.toString("latin1");

  const problems = [];
  if (!pdf.startsWith("%PDF-1.4")) problems.push("missing header");
  if (!pdf.trimEnd().endsWith("%%EOF")) problems.push("missing EOF");

  const startxref = Number(pdf.match(/startxref\n(\d+)/)?.[1]);
  if (pdf.slice(startxref, startxref + 4) !== "xref") {
    problems.push(`startxref ${startxref} does not point at xref table`);
  }

  const entries = [...pdf.matchAll(/^(\d{10}) 00000 n $/gm)].map((m) => Number(m[1]));
  entries.forEach((offset, i) => {
    const expected = `${i + 1} 0 obj`;
    if (pdf.slice(offset, offset + expected.length) !== expected) {
      problems.push(`object ${i + 1}: xref offset ${offset} points at ` +
        `${JSON.stringify(pdf.slice(offset, offset + 12))}, expected ${expected}`);
    }
  });

  const unsupported = mod.findPdfUnsupportedChars(text);
  const status = problems.length ? "FAIL" : "ok";
  if (problems.length) failures++;
  console.log(
    `${status.padEnd(4)} ${name.padEnd(7)} ${bytes.length} bytes, ` +
      `${entries.length} objects, ${unsupported.length} unsupported chars`
  );
  for (const p of problems) console.log("       -", p);

  if (name === "latin1") writeFileSync("/tmp/latin1.pdf", bytes);
  if (name === "mixed") writeFileSync("/tmp/mixed.pdf", bytes);
}

process.exit(failures ? 1 : 0);

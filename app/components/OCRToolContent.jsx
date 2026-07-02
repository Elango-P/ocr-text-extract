"use client";

import React, { useState, useRef, useCallback } from "react";
import AppLayout from "./AppLayout";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import {
    Upload,
    FileText,
    Copy,
    Download,
    Loader2,
    ScanText,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { createWorker, OEM, PSM } from "tesseract.js";

export default function OCRTool() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [extractedText, setExtractedText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [language, setLanguage] = useState("eng");
    const [cleanMode, setCleanMode] = useState(true);
    const [confidence, setConfidence] = useState(null);
    const fileInputRef = useRef(null);

  const TARGET_LONG_EDGE = 2000;
  const MAX_LONG_EDGE = 3200;
  const OCR_DPI = "300";

  const toGrayscale = (imageData) => {
    const { data } = imageData;
    const gray = new Uint8Array(data.length / 4);

    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      gray[j] = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      );
    }

    return gray;
  };

  const contrastStretch = (gray) => {
    const hist = new Uint32Array(256);
    for (let i = 0; i < gray.length; i++) hist[gray[i]]++;

    const total = gray.length;
    const lowCutoff = total * 0.02;
    const highCutoff = total * 0.98;

    let cumulative = 0;
    let low = 0;
    for (let i = 0; i < 256; i++) {
      cumulative += hist[i];
      if (cumulative >= lowCutoff) {
        low = i;
        break;
      }
    }

    cumulative = 0;
    let high = 255;
    for (let i = 255; i >= 0; i--) {
      cumulative += hist[i];
      if (cumulative >= total - highCutoff) {
        high = i;
        break;
      }
    }

    const range = Math.max(high - low, 1);
    const stretched = new Uint8Array(gray.length);
    for (let i = 0; i < gray.length; i++) {
      stretched[i] = Math.max(
        0,
        Math.min(255, ((gray[i] - low) / range) * 255)
      );
    }

    return stretched;
  };

  const buildIntegralImage = (gray, width, height) => {
    const integral = new Float64Array((width + 1) * (height + 1));

    for (let y = 1; y <= height; y++) {
      let rowSum = 0;
      for (let x = 1; x <= width; x++) {
        rowSum += gray[(y - 1) * width + (x - 1)];
        integral[y * (width + 1) + x] =
          integral[(y - 1) * (width + 1) + x] + rowSum;
      }
    }

    return integral;
  };

  const adaptiveThreshold = (gray, width, height, blockSize = 25, constant = 10) => {
    const integral = buildIntegralImage(gray, width, height);
    const binary = new Uint8Array(gray.length);
    const half = Math.floor(blockSize / 2);
    const stride = width + 1;

    for (let y = 0; y < height; y++) {
      const y1 = Math.max(0, y - half);
      const y2 = Math.min(height - 1, y + half);

      for (let x = 0; x < width; x++) {
        const x1 = Math.max(0, x - half);
        const x2 = Math.min(width - 1, x + half);
        const area = (x2 - x1 + 1) * (y2 - y1 + 1);
        const sum =
          integral[(y2 + 1) * stride + (x2 + 1)] -
          integral[y1 * stride + (x2 + 1)] -
          integral[(y2 + 1) * stride + x1] +
          integral[y1 * stride + x1];
        const threshold = sum / area - constant;
        const idx = y * width + x;
        binary[idx] = gray[idx] < threshold ? 0 : 255;
      }
    }

    return binary;
  };

  const applyGrayToCanvas = (ctx, gray, width, height) => {
    const imageData = ctx.createImageData(width, height);
    const { data } = imageData;

    for (let i = 0, j = 0; j < gray.length; i += 4, j++) {
      const value = gray[j];
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const applyBinaryToCanvas = (ctx, binary, width, height) => {
    applyGrayToCanvas(ctx, binary, width, height);
  };

  const sharpenGrayscale = (gray, width, height) => {
    const out = new Uint8Array(gray.length);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
          out[idx] = gray[idx];
          continue;
        }

        const center = gray[idx] * 5;
        const neighbors =
          gray[idx - width] +
          gray[idx + width] +
          gray[idx - 1] +
          gray[idx + 1];

        out[idx] = Math.max(0, Math.min(255, center - neighbors));
      }
    }

    return out;
  };

  const loadScaledCanvas = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const longestEdge = Math.max(img.width, img.height);
        const scale = Math.min(
          MAX_LONG_EDGE / longestEdge,
          Math.max(TARGET_LONG_EDGE / longestEdge, 1)
        );

        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        canvas.width = width;
        canvas.height = height;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        resolve({ canvas, ctx, width, height });
      };
    });

  const detectModalRegion = (imageData, width, height) => {
    const { data } = imageData;
    const BRIGHT = 225;
    const centerLeft = Math.floor(width * 0.22);
    const centerRight = Math.ceil(width * 0.78);

    const isBright = (x, y) => {
      const i = (y * width + x) * 4;
      return (
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2] >= BRIGHT
      );
    };

    let minY = height;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
      let brightInStrip = 0;
      for (let x = centerLeft; x < centerRight; x++) {
        if (isBright(x, y)) brightInStrip++;
      }
      if (brightInStrip / (centerRight - centerLeft) > 0.5) {
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }

    if (maxY < 0 || maxY - minY < height * 0.1) return null;

    let minX = width;
    let maxX = -1;
    for (let y = minY; y <= maxY; y++) {
      for (let x = 0; x < width; x++) {
        if (isBright(x, y)) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
        }
      }
    }

    const cropW = maxX - minX;
    const cropH = maxY - minY;
    if (cropW < width * 0.18 || cropH < height * 0.1) return null;
    if (cropW > width * 0.92 && cropH > height * 0.92) return null;

    // Plain logos/photos on white — not a modal overlay
    if (cropW * cropH > width * height * 0.82) return null;

    // Modals sit on a dimmed overlay — require meaningful dark surround
    let darkOutside = 0;
    let brightInside = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const lum =
          0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const inCrop =
          x >= minX && x <= maxX && y >= minY && y <= maxY;
        if (inCrop) {
          if (lum >= BRIGHT) brightInside++;
        } else if (lum < 120) {
          darkOutside++;
        }
      }
    }

    if (darkOutside < width * height * 0.04) return null;
    if (brightInside < cropW * cropH * 0.25) return null;

    const pad = Math.round(Math.min(width, height) * 0.012);
    const x = Math.max(0, minX - pad);
    const y = Math.max(0, minY - pad);
    const w = Math.min(width - x, cropW + pad * 2);
    const h = Math.min(height - y, cropH + pad * 2);

    return { x, y, width: w, height: h };
  };

  const preprocessFromScaled = (scaled, mode = "enhanced", crop = null) => {
    const { canvas, ctx, width, height } = scaled;
    let workCanvas = canvas;
    let workCtx = ctx;
    let workW = width;
    let workH = height;

    if (crop) {
      const cropped = document.createElement("canvas");
      cropped.width = crop.width;
      cropped.height = crop.height;
      const croppedCtx = cropped.getContext("2d");
      croppedCtx.drawImage(
        canvas,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );
      workCanvas = cropped;
      workCtx = croppedCtx;
      workW = crop.width;
      workH = crop.height;
    }

    const imageData = workCtx.getImageData(0, 0, workW, workH);
    const gray = contrastStretch(toGrayscale(imageData));

    if (mode === "binary") {
      const binary = adaptiveThreshold(gray, workW, workH);
      applyBinaryToCanvas(workCtx, binary, workW, workH);
    } else {
      const sharpened = sharpenGrayscale(gray, workW, workH);
      applyGrayToCanvas(workCtx, sharpened, workW, workH);
    }

    return {
      dataUrl: workCanvas.toDataURL("image/png"),
      width: workW,
      height: workH,
    };
  };

  /* ---------------- IMAGE PREPROCESSING ---------------- */
  const preprocessImage = (src, mode = "enhanced", crop = null) =>
    loadScaledCanvas(src).then((scaled) =>
      preprocessFromScaled(scaled, mode, crop)
    );

  const normalizeText = (text) =>
    text
      .split("\n")
      .map((line) =>
        line.trim() === "" ? "" : line.replace(/\s+/g, " ").trim()
      )
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

  const buildLineText = (words) => {
    if (!words.length) return "";

    let lineText = words[0].text;
    for (let i = 1; i < words.length; i++) {
      const prev = words[i - 1];
      const curr = words[i];
      const gap = curr.bbox.x0 - prev.bbox.x1;
      const avgCharWidth =
        (prev.bbox.x1 - prev.bbox.x0) / Math.max(prev.text.length, 1);
      lineText += (gap > avgCharWidth * 2.2 ? "  " : " ") + curr.text;
    }

    return lineText.trim();
  };

  const countAllWords = (blocks) => {
    let count = 0;
    for (const block of blocks || []) {
      for (const paragraph of block.paragraphs || []) {
        for (const line of paragraph.lines || []) {
          count += (line.words || []).filter((word) => word.text?.trim()).length;
        }
      }
    }
    return count;
  };

  const adaptiveConfidenceThreshold = (pageConfidence, totalWords = 0) => {
    if (totalWords <= 6) {
      return Math.max(30, Math.round(pageConfidence - 28));
    }
    return Math.max(42, Math.min(68, Math.round(pageConfidence - 14)));
  };

  const measureTextCoherence = (data) => {
    const lines = (data.text || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) return 0;

    const shortFragments = lines.filter((line) => line.length <= 4).length;
    const symbolNoise = lines.filter((line) => /[|(){}[\]<>]/.test(line)).length;

    return Math.max(
      0,
      1 - (shortFragments / lines.length) * 1.1 - (symbolNoise / lines.length) * 1.4
    );
  };

  const scoreOcrResult = (data) => {
    const words = [];
    for (const block of data.blocks || []) {
      for (const paragraph of block.paragraphs || []) {
        for (const line of paragraph.lines || []) {
          for (const word of line.words || []) {
            if (word.text?.trim()) words.push(word.confidence);
          }
        }
      }
    }

    if (!words.length) {
      return {
        pageConfidence: data.confidence ?? 0,
        medianWordConfidence: 0,
        score: data.confidence ?? 0,
      };
    }

    const sorted = [...words].sort((a, b) => a - b);
    const medianWordConfidence = sorted[Math.floor(sorted.length / 2)];
    const coherence = measureTextCoherence(data);
    const score =
      (data.confidence * 0.55 + medianWordConfidence * 0.45) *
      (0.72 + coherence * 0.28);

    return {
      pageConfidence: data.confidence ?? 0,
      medianWordConfidence,
      coherence,
      score,
    };
  };

  const countBlockWords = (block) => {
    let count = 0;
    for (const paragraph of block.paragraphs || []) {
      for (const line of paragraph.lines || []) {
        count += (line.words || []).filter((word) => word.text?.trim()).length;
      }
    }
    return count;
  };

  const blocksOverlapX = (a, b, threshold = 0.35) => {
    const overlap =
      Math.min(a.bbox.x1, b.bbox.x1) - Math.max(a.bbox.x0, b.bbox.x0);
    const minWidth = Math.min(
      a.bbox.x1 - a.bbox.x0,
      b.bbox.x1 - b.bbox.x0
    );
    return overlap > minWidth * threshold;
  };

  const clusterBlocks = (blocks) => {
    const clusters = [];
    for (const block of blocks) {
      let placed = false;
      for (const cluster of clusters) {
        if (blocksOverlapX(block, cluster.representative)) {
          cluster.blocks.push(block);
          placed = true;
          break;
        }
      }
      if (!placed) {
        clusters.push({ representative: block, blocks: [block] });
      }
    }
    return clusters;
  };

  const selectPrimaryContentBlocks = (blocks, imageWidth, imageHeight) => {
    if (!blocks?.length || blocks.length === 1) return blocks;

    const totalWords = countAllWords(blocks);
    if (totalWords <= 6) return blocks;

    const clusters = clusterBlocks(blocks);
    let best = null;
    let bestScore = -1;

    for (const cluster of clusters) {
      const wordCount = cluster.blocks.reduce(
        (sum, block) => sum + countBlockWords(block),
        0
      );
      if (wordCount < 2) continue;

      const avgConf =
        cluster.blocks.reduce((sum, block) => sum + block.confidence, 0) /
        cluster.blocks.length;
      const cx =
        (cluster.representative.bbox.x0 + cluster.representative.bbox.x1) / 2;
      const cy =
        (cluster.representative.bbox.y0 + cluster.representative.bbox.y1) / 2;

      const leftPenalty = cx < imageWidth * 0.2 ? 0.3 : 1;
      const topPenalty =
        cy < imageHeight * 0.1 && wordCount < 10 ? 0.45 : 1;
      const centerBoost = 1 - (Math.abs(cx - imageWidth / 2) / imageWidth) * 0.35;
      const score =
        wordCount * avgConf * leftPenalty * topPenalty * centerBoost;

      if (score > bestScore) {
        bestScore = score;
        best = cluster.blocks;
      }
    }

    return best ?? blocks;
  };

  const sanitizeOcrLine = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return "";
    if (trimmed.length <= 1) return "";
    if (/^[\W_]+$/u.test(trimmed.replace(/\s/g, ""))) return "";
    return trimmed.replace(/©/g, "").replace(/\s{2,}/g, " ").trim();
  };

  const mergeWrappedLines = (lineEntries, relaxed = false) => {
    if (!lineEntries.length) return lineEntries;

    const sorted = [...lineEntries].sort((a, b) => a.y - b.y);
    const merged = [];

    for (const line of sorted) {
      const text = sanitizeOcrLine(line.text);
      if (!text) continue;

      const prev = merged[merged.length - 1];
      if (prev) {
        const gap = line.y - prev.y;
        const xAlign = Math.abs(line.x0 - prev.x0);
        const isWrap = relaxed
          ? gap > 0 && gap <= prev.height * 1.55
          : gap > 0 &&
            gap <= prev.height * 1.35 &&
            xAlign <= Math.max(prev.height * 2, 40);

        if (isWrap) {
          prev.text = `${prev.text} ${text}`.trim();
          prev.y = line.y;
          prev.height = Math.max(prev.height, line.height);
          prev.x1 = Math.max(prev.x1 ?? prev.x0, line.x1 ?? line.x0);
          continue;
        }
      }

      merged.push({ ...line, text });
    }

    return merged;
  };

  const reconstructPageLayout = (lineEntries, imageWidth) => {
    const entries = lineEntries
      .map((entry) => ({
        ...entry,
        text: sanitizeOcrLine(entry.text),
        x1: entry.x1 ?? entry.x0 + 80,
      }))
      .map((entry) => ({
        ...entry,
        width: entry.x1 - entry.x0,
      }))
      .filter((entry) => entry.text.length > 0);

    if (!entries.length) return null;

    const fullWidth = entries.filter((entry) => entry.width >= imageWidth * 0.42);
    const narrow = entries.filter((entry) => entry.width < imageWidth * 0.42);
    const splitX = imageWidth * 0.52;
    const leftCol = narrow.filter(
      (entry) => entry.x0 + entry.width / 2 < splitX
    );
    const rightCol = narrow.filter(
      (entry) => entry.x0 + entry.width / 2 >= splitX
    );
    const byY = (a, b) => a.y - b.y;

    const ordered =
      leftCol.length && rightCol.length
        ? [
            ...fullWidth.sort(byY),
            ...leftCol.sort(byY),
            ...rightCol.sort(byY),
          ]
        : [...entries].sort(byY);

    const output = [];
    let prev = null;

    for (const entry of ordered) {
      const section =
        entry.width >= imageWidth * 0.42
          ? "full"
          : entry.x0 + entry.width / 2 < splitX
            ? "left"
            : "right";

      if (prev) {
        const columnSwitch =
          (prev.section === "left" && section === "right") ||
          (prev.section === "right" && section === "left");
        const gap = entry.y - prev.y;
        const avgHeight = (entry.height + prev.height) / 2;

        if (columnSwitch || gap > avgHeight * 1.65) {
          output.push("");
        }
      }

      output.push(entry.text);
      prev = { ...entry, section };
    }

    return normalizeText(output.join("\n"));
  };

  const buildLineEntries = (blocks, minConfidence) => {
    const lineEntries = [];

    for (const block of blocks) {
      for (const paragraph of block.paragraphs || []) {
        for (const line of paragraph.lines || []) {
          const words = (line.words || [])
            .filter((word) => word.confidence >= minConfidence && word.text.trim())
            .sort((a, b) => a.bbox.x0 - b.bbox.x0)
            .map((word) => ({ ...word, text: word.text.trim() }));

          if (words.length > 0) {
            lineEntries.push({
              text: buildLineText(words),
              y: line.bbox.y0,
              height: Math.max(line.bbox.y1 - line.bbox.y0, 1),
              x0: line.bbox.x0,
              x1: line.bbox.x1,
            });
          }
        }
      }
    }

    return lineEntries;
  };

  const lineEntriesToText = (lineEntries, mergeWraps = false) => {
    if (!lineEntries.length) return null;

    const lines = mergeWraps ? mergeWrappedLines(lineEntries, true) : lineEntries;
    lines.sort((a, b) => a.y - b.y);

    const output = [];
    for (let i = 0; i < lines.length; i++) {
      const text = sanitizeOcrLine(lines[i].text);
      if (!text) continue;

      if (output.length > 0) {
        const gap = lines[i].y - lines[i - 1].y;
        const avgHeight = (lines[i].height + lines[i - 1].height) / 2;
        if (gap > avgHeight * 1.65) output.push("");
      }
      output.push(text);
    }

    return normalizeText(output.join("\n"));
  };

  /* ---------------- TEXT CLEANING ---------------- */
  const cleanTextFromBlocks = (
    blocks,
    pageConfidence = 0,
    imageWidth = 0,
    imageHeight = 0,
    uiFocusMode = false
  ) => {
    if (!blocks?.length) return null;

    const totalWords = countAllWords(blocks);
    const isSimpleImage = totalWords <= 6;
    const minConfidence = adaptiveConfidenceThreshold(pageConfidence, totalWords);

    const focusedBlocks =
      uiFocusMode && !isSimpleImage && imageWidth > 0
        ? selectPrimaryContentBlocks(blocks, imageWidth, imageHeight)
        : blocks;

    let lineEntries = buildLineEntries(focusedBlocks, minConfidence);

    if (!lineEntries.length && minConfidence > 30) {
      lineEntries = buildLineEntries(focusedBlocks, 30);
    }

    if (!lineEntries.length) return null;

    if (uiFocusMode && !isSimpleImage && imageWidth > 0 && lineEntries.length > 3) {
      const sidebarCutoff = imageWidth * 0.2;
      const filtered = lineEntries.filter((line) => line.x0 >= sidebarCutoff);
      if (filtered.length >= 2) {
        lineEntries = filtered;
      }
    }

    const usePageLayout =
      !uiFocusMode && imageWidth > 0 && lineEntries.length > 4;

    if (usePageLayout) {
      return reconstructPageLayout(lineEntries, imageWidth);
    }

    return lineEntriesToText(lineEntries, uiFocusMode);
  };

  const formatOcrOutput = (
    data,
    useCleanMode,
    imageWidth = 0,
    imageHeight = 0,
    uiFocusMode = false
  ) => {
    const rawText = normalizeText(data.text || "");
    const blocksFallback = () => {
      if (!data.blocks?.length) return "";
      const entries = buildLineEntries(data.blocks, 0);
      if (!uiFocusMode && imageWidth > 0 && entries.length > 4) {
        return reconstructPageLayout(entries, imageWidth) || "";
      }
      return lineEntriesToText(entries, uiFocusMode) || "";
    };

    if (useCleanMode) {
      const cleaned =
        cleanTextFromBlocks(
          data.blocks,
          data.confidence,
          imageWidth,
          imageHeight,
          uiFocusMode
        ) || rawText;

      return cleaned || rawText || blocksFallback();
    }

    return rawText || blocksFallback();
  };

    const languages = [
        { code: "eng", name: "English" },
        { code: "spa", name: "Spanish" },
        { code: "fra", name: "French" },
        { code: "deu", name: "German" },
        { code: "ita", name: "Italian" },
        { code: "por", name: "Portuguese" },
        { code: "rus", name: "Russian" },
        { code: "chi_sim", name: "Chinese (Simplified)" },
        { code: "jpn", name: "Japanese" },
        { code: "kor", name: "Korean" },
        { code: "ara", name: "Arabic" },
        { code: "hin", name: "Hindi" },
    ];

    /* ---------------- IMAGE UPLOAD ---------------- */
    const loadImageFile = useCallback((file) => {
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Please upload an image");
            return;
        }
        setImage(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
        setExtractedText("");
        setProgress(0);
        setConfidence(null);
    }, []);

    const { isDragging, dragProps } = useDragAndDrop(loadImageFile, { accept: "image/*" });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) loadImageFile(file);
        e.target.value = "";
    };

    /* ---------------- OCR ---------------- */
    const extractText = async () => {
        if (!imagePreview) {
            toast.error("Upload an image first");
            return;
        }

        setIsProcessing(true);
        setProgress(0);
        setExtractedText("");
        setConfidence(null);

        try {
            setProgress(10);

            const worker = await createWorker(language, OEM.LSTM_ONLY, {
                logger: (message) => {
                    if (message.status === "recognizing text") {
                        setProgress(55 + Math.round(message.progress * 40));
                    }
                },
            });

            await worker.setParameters({
                tessedit_pageseg_mode: PSM.AUTO,
                preserve_interword_spaces: "1",
                user_defined_dpi: OCR_DPI,
            });

            setProgress(20);

            const scaled = await loadScaledCanvas(imagePreview);
            const sourceImageData = scaled.ctx.getImageData(
              0,
              0,
              scaled.width,
              scaled.height
            );
            const modalCrop = detectModalRegion(
              sourceImageData,
              scaled.width,
              scaled.height
            );

            const enhancedFull = preprocessFromScaled(scaled, "enhanced");
            const passes = [{ ...enhancedFull, kind: "enhanced" }];

            if (modalCrop) {
              passes.unshift({
                ...preprocessFromScaled(scaled, "enhanced", modalCrop),
                kind: "focused",
              });
            }

            setProgress(40);

            const recognize = (image) =>
                worker.recognize(
                    image,
                    { rotateAuto: true },
                    { text: true, blocks: true }
                );

            let bestData = null;
            let bestScore = -1;
            let bestDims = { width: scaled.width, height: scaled.height };
            let bestPassKind = "enhanced";
            const hasModal = Boolean(modalCrop);

            for (let i = 0; i < passes.length; i++) {
                const pass = passes[i];
                const result = await recognize(pass.dataUrl);
                let passScore = scoreOcrResult(result.data).score;
                if (pass.kind === "focused") {
                    passScore += 8;
                }
                if (passScore > bestScore) {
                    bestScore = passScore;
                    bestData = result.data;
                    bestDims = { width: pass.width, height: pass.height };
                    bestPassKind = pass.kind;
                }
                setProgress(45 + Math.round(((i + 1) / passes.length) * 35));
            }

            if (bestScore < 78) {
                setProgress(82);
                const binaryPass = preprocessFromScaled(
                  scaled,
                  "binary",
                  modalCrop ?? null
                );
                const fallback = await recognize(binaryPass.dataUrl);
                const fallbackScore = scoreOcrResult(fallback.data).score;
                if (fallbackScore > bestScore) {
                    bestData = fallback.data;
                    bestScore = fallbackScore;
                    bestDims = { width: binaryPass.width, height: binaryPass.height };
                    bestPassKind = modalCrop ? "focused" : "binary";
                }
            }

            await worker.terminate();

            const metrics = scoreOcrResult(bestData);
            const usedModalFocus = hasModal || bestPassKind === "focused";
            const finalText = formatOcrOutput(
              bestData,
              cleanMode,
              bestDims.width,
              bestDims.height,
              usedModalFocus
            );

            setExtractedText(finalText);
            setConfidence(Math.round(metrics.score));
            setProgress(100);

            if (!finalText.trim()) {
              toast.error("No text detected — try turning Clean Mode off");
            } else {
              toast.success(`Text extracted (${Math.round(metrics.score)}% confidence)`);
            }
        } catch (err) {
            console.error(err);
            toast.error("OCR failed");
        } finally {
            setIsProcessing(false);
        }
    };

    /* ---------------- UTILITIES ---------------- */
    const copyToClipboard = () => {
        navigator.clipboard.writeText(extractedText);
        toast.success("Copied");
    };

    const downloadText = () => {
        const blob = new Blob([extractedText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "extracted-text.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const clearAll = () => {
        setImage(null);
        setImagePreview(null);
        setExtractedText("");
        setProgress(0);
        setConfidence(null);
        fileInputRef.current.value = "";
    };

    return (
        <AppLayout
            title="OCR Text Extractor"
            subtitle="Extract text from images using Tesseract.js — processed entirely in your browser"
            icon={ScanText}
            accent="cyan"
            maxWidth="md"
            hero
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT */}
                    <div className="space-y-6">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {languages.map((l) => (
                                <option key={l.code} value={l.code}>
                                    {l.name}
                                </option>
                            ))}
                        </select>

                        {/* Clean Mode Toggle */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Clean Mode</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Smart layout for pages; modal focus for dialogs</p>
                                </div>
                                <button
                                    onClick={() => setCleanMode(!cleanMode)}
                                    role="switch"
                                    aria-checked={cleanMode}
                                    aria-label="Toggle clean mode"
                                    className={`w-12 h-6 rounded-full transition-colors relative ${cleanMode ? "bg-green-500" : "bg-slate-300 dark:bg-slate-700"}`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${cleanMode ? "translate-x-6" : ""}`} />
                                </button>
                            </div>
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            {...dragProps}
                            className={`border-2 border-dashed p-8 rounded-xl text-center cursor-pointer transition-colors bg-white dark:bg-slate-900 ${
                                isDragging
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-slate-300 dark:border-slate-700 hover:border-blue-500"
                            }`}
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Uploaded image preview for OCR text extraction"
                                    className="max-h-64 mx-auto rounded-lg"
                                />
                            ) : (
                                <>
                                    <Upload className="mx-auto w-12 h-12 text-slate-400 dark:text-slate-500" />
                                    <p className="text-slate-600 dark:text-slate-400 mt-2">Click or drop image</p>
                                </>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageUpload}
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={extractText}
                                disabled={isProcessing}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-700 text-white p-3 rounded-xl font-bold transition-colors"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="inline animate-spin mr-2 w-5 h-5" />
                                        {progress}%
                                    </>
                                ) : (
                                    "Extract Text"
                                )}
                            </button>
                            <button
                                onClick={clearAll}
                                className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 rounded-xl transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                        <div className="flex justify-between mb-3">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100">Extracted Text</h3>
                                {confidence !== null && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Confidence: {confidence}%
                                    </p>
                                )}
                            </div>
                            {extractedText && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                    </button>
                                    <button
                                        onClick={downloadText}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        title="Download as .txt"
                                    >
                                        <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <textarea
                            value={extractedText}
                            readOnly
                            className="w-full h-[420px] p-4 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Extracted text will appear here..."
                        />
                    </div>
                </div>

                {/* Technical Architecture Section (AdSense Value) */}
                <div className="mt-20 p-8 md:p-16 rounded-[3.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-widest">Technical Architecture</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        <div className="space-y-4">
                            <h3 className="text-slate-900 dark:text-white text-xl font-bold">Neural Engine Integration</h3>
                            <p>
                                This tool leverages <strong>Tesseract.js</strong>, a pure Javascript port of the legendary Tesseract OCR engine. It utilizes a <strong>WebAssembly (Wasm)</strong> worker thread to execute complex neural network models directly in the browser. This ensures that user data never leaves their local machine (Zero-Knowledge processing) while maintaining server-grade recognition accuracy.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-slate-900 dark:text-white text-xl font-bold">Image Preprocessing Pipeline</h3>
                            <p>
                                Images are analyzed with a dual-pass pipeline that picks the strongest result, similar to how AI OCR services compare multiple interpretations:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-sm italic">
                                <li><strong>Smart Upscaling:</strong> Small images are scaled up to improve character resolution.</li>
                                <li><strong>Enhanced Pass:</strong> Grayscale, contrast stretch, and edge sharpening for screenshots and clean documents.</li>
                                <li><strong>Binary Pass:</strong> Adaptive thresholding for scans with uneven lighting or faint text.</li>
                                <li><strong>UI Focus Detection:</strong> Auto-crops centered modals and dialogs in app screenshots.</li>
                                <li><strong>Region Filtering:</strong> Ignores sidebar and breadcrumb noise in complex layouts.</li>
                            </ul>
                        </div>
                    </div>
                </div>
        </AppLayout>
    );
}

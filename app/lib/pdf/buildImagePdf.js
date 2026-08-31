const PAGE_SIZES = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read ${file.name || "this image"}.`));
    };
    image.src = url;
  });
}

async function imageBytes(file) {
  const image = await loadImage(file);
  const maxEdge = 3000;
  const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, width, height);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
  canvas.width = 0;
  canvas.height = 0;
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return { bytes, width, height };
}

function pageDimensions(imageWidth, imageHeight, options) {
  const {
    pageSize = "a4",
    orientation = "auto",
    margin = 24,
  } = options;
  if (pageSize === "fit") {
    return [imageWidth * 0.75 + margin * 2, imageHeight * 0.75 + margin * 2];
  }
  let [width, height] = PAGE_SIZES[pageSize] || PAGE_SIZES.a4;
  const imageIsLandscape = imageWidth > imageHeight;
  if ((orientation === "landscape") || (orientation === "auto" && imageIsLandscape)) {
    [width, height] = [Math.max(width, height), Math.min(width, height)];
  } else if (orientation === "portrait") {
    [width, height] = [Math.min(width, height), Math.max(width, height)];
  }
  return [width, height];
}

export async function buildImagePdf(
  items,
  { pageSize = "a4", orientation = "auto", margin = 24, onProgress = () => {} } = {}
) {
  if (!items?.length) throw new Error("Add at least one image first.");
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.create();

  for (let index = 0; index < items.length; index += 1) {
    const source = await imageBytes(items[index].file);
    const [pageWidth, pageHeight] = pageDimensions(source.width, source.height, {
      pageSize,
      orientation,
      margin,
    });
    const page = pdf.addPage([pageWidth, pageHeight]);
    const image = await pdf.embedJpg(source.bytes);
    const availableWidth = Math.max(1, pageWidth - margin * 2);
    const availableHeight = Math.max(1, pageHeight - margin * 2);
    const scale = Math.min(availableWidth / image.width, availableHeight / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    page.drawImage(image, {
      x: (pageWidth - drawWidth) / 2,
      y: (pageHeight - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
    onProgress(Math.round(((index + 1) / items.length) * 100));
  }

  const bytes = await pdf.save();
  return new Blob([bytes], { type: "application/pdf" });
}

export function downloadPdfBlob(blob, filename = "images.pdf") {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

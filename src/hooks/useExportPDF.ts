import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * html2canvas 1.4.x cannot parse oklch() colors (used by Tailwind v4).
 * Walk every element in the clone and inline computed color properties
 * that contain "oklch" as resolved hex values using a 1×1 canvas trick.
 */
function resolveOklch(color: string): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return color;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a === 0) return "transparent";
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  } catch {
    return color;
  }
}

const COLOR_PROPS = [
  "color",
  "backgroundColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "outlineColor",
  "fill",
  "stroke",
] as const;

function inlineComputedColors(source: HTMLElement, clone: HTMLElement): void {
  const sourceEls = [source, ...Array.from(source.querySelectorAll<HTMLElement>("*"))];
  const cloneEls = [clone, ...Array.from(clone.querySelectorAll<HTMLElement>("*"))];
  const len = Math.min(sourceEls.length, cloneEls.length);
  for (let i = 0; i < len; i++) {
    const computed = getComputedStyle(sourceEls[i]);
    const cloneEl = cloneEls[i];
    for (const prop of COLOR_PROPS) {
      const value = computed[prop as keyof CSSStyleDeclaration] as string;
      if (value && value.includes("oklch")) {
        (cloneEl.style as unknown as Record<string, string>)[prop] = resolveOklch(value);
      }
    }
  }
}

export function useExportPDF() {
  const [isExporting, setExporting] = useState(false);

  const exportPDF = async (filename = "CV.pdf") => {
    const source = document.getElementById("cv-preview");
    if (!source) return;

    setExporting(true);
    let offscreen: HTMLDivElement | null = null;

    try {
      // Wait for all fonts to be fully loaded before rendering
      await document.fonts.ready;

      // Create an off-screen container at native A4 width, no transform
      offscreen = document.createElement("div");
      offscreen.style.cssText =
        "position:fixed;top:-99999px;left:-99999px;width:794px;height:auto;overflow:visible;z-index:-9999;pointer-events:none;background:#ffffff;";
      document.body.appendChild(offscreen);

      // Clone the CV content (bypasses the scale() transform wrapper)
      const clone = source.cloneNode(true) as HTMLElement;
      clone.style.transform = "none";
      clone.style.width = "794px";
      clone.style.minHeight = "auto";
      clone.style.position = "static";
      offscreen.appendChild(clone);

      // One animation frame to let layout settle
      await new Promise((r) => requestAnimationFrame(r));

      // Inline oklch colors so html2canvas can parse them
      inlineComputedColors(source, clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 794,
        allowTaint: false,
      });

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas rendered with zero dimensions — PDF aborted.");
      }

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    } finally {
      // Always clean up off-screen container — success or error
      if (offscreen && offscreen.parentNode) {
        offscreen.parentNode.removeChild(offscreen);
      }
      setExporting(false);
    }
  };

  return { exportPDF, isExporting };
}

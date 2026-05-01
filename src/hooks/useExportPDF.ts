import { useState } from "react";
import { useCounterStore } from "@/store/counterStore";
import { useCVStore } from "@/store/cvStore";
import { getPaperSize } from "@/data/paperSizes";
import { getTemplate } from "@/components/templates";
import { palettes } from "@/data/palettes";
import {
  calculatePageSlicesBySections,
  DEFAULT_PAGE_OVERFLOW_EPSILON_PX,
  DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX,
  PAGE_TOP_CONTINUATION_MARGIN_PX,
} from "@/lib/pagination";

/**
 * Export strategy — uses html-to-image (toJpeg):
 *
 * WHY NOT html2canvas?
 *   html2canvas v1.4.1 crashes on `oklch()` colors which the app design-system
 *   uses extensively via Tailwind CSS custom properties.
 *
 * THE ROOT CAUSE OF BLANK PDFs (and the fix):
 *   html-to-image serialises the element into an SVG <foreignObject>. Inside
 *   that SVG context, `position:fixed` is relative to the SVG viewport (not the
 *   browser viewport). So the element at `left:-20000px` ends up 20000 px
 *   off-canvas → entire image is blank white.
 *
 *   Fix: temporarily set `left:0` on the element right before capture.
 *   The element already has `zIndex:-1`, so it sits behind every UI layer and
 *   the user never sees it flash. After capture we restore `left:-20000px`.
 *
 * Steps:
 *   1. Wait for fonts
 *   2. Move #cv-preview to left:0 (stays invisible via zIndex:-1)
 *   3. Embed fonts + inline all document CSS (so oklch/Tailwind render in SVG)
 *   4. toJpeg at 2× pixel-ratio
 *   5. Restore left:-20000px
 *   6. Compose multi-page jsPDF with section-aware slices + white mask
 */

/**
 * Parse any CSS hex colour string to an [R, G, B] tuple for jsPDF.
 * Supports #rrggbb and #rgb formats. Falls back to white on failure.
 */
function parseColorToRgb(color: string): [number, number, number] {
  const s = color.trim();
  const m6 = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);
  if (m6) return [parseInt(m6[1], 16), parseInt(m6[2], 16), parseInt(m6[3], 16)];
  const m3 = /^#([a-f\d])([a-f\d])([a-f\d])$/i.exec(s);
  if (m3)
    return [parseInt(m3[1] + m3[1], 16), parseInt(m3[2] + m3[2], 16), parseInt(m3[3] + m3[3], 16)];
  return [255, 255, 255];
}

/** Collect all CSS text from document stylesheets (same-origin only). */
function collectDocumentCSS(): string {
  const parts: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        parts.push(rule.cssText);
      }
    } catch {
      // cross-origin sheet — skip
    }
  }
  return parts.join("\n");
}

const isSafari =
  typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function useExportPDF() {
  const [isExporting, setExporting] = useState(false);
  const templateId = useCVStore((s) => s.templateId);
  const pageSizeId = useCVStore((s) => s.pageSizeId);
  const pageSizeMode = useCVStore((s) => s.pageSizeMode);
  const paletteId = useCVStore((s) => s.paletteId);
  const customColors = useCVStore((s) => s.customColors);

  const recordExport = useCounterStore((s) => s.recordExport);

  const exportPDF = async (filename = "CV.pdf") => {
    const el = document.getElementById("cv-preview");
    if (!el) return;

    const tpl = getTemplate(templateId);
    const pageSize = getPaperSize(
      pageSizeMode === "manual" ? pageSizeId : (tpl.recommendedPaperSizeId ?? "a4"),
    );

    setExporting(true);

    try {
      // 1. Dynamic-import the heavy PDF/capture libraries so they are excluded
      //    from the initial bundle and only fetched when the user exports.
      const [{ toJpeg, getFontEmbedCSS }, { default: jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf"),
      ]);

      // 2. Fonts must be ready before embedding
      await document.fonts.ready;

      // 3. Move element into the SVG viewport so foreignObject renders it.
      //    zIndex:-1 keeps it invisible behind all UI layers.
      const origLeft = el.style.left;
      el.style.left = "0px";

      let dataUrl = "";
      try {
        // 4. Embed fonts + inline all Tailwind/CSS so the SVG foreignObject has them
        const fontEmbedCSS = await getFontEmbedCSS(el);
        const cssStyles = collectDocumentCSS();

        const captureWidth = pageSize.widthPx;
        const captureHeight = Math.max(el.scrollHeight, pageSize.heightPx);

        const captureOptions = {
          quality: 0.95,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          width: captureWidth,
          height: captureHeight,
          fontEmbedCSS,
          cssStyles,
        };

        // 5. Safari needs a warm-up render (first call can be blank)
        if (isSafari) {
          await toJpeg(el, captureOptions);
          await new Promise<void>((r) => setTimeout(r, 120));
        }

        dataUrl = await toJpeg(el, captureOptions);
      } finally {
        // 5. Always restore the off-screen position
        el.style.left = origLeft;
      }

      // Measure final image dimensions
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = dataUrl;
      });

      // 6. Build multi-page PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pageSize.widthMm, pageSize.heightMm],
        compress: true,
      });

      const pdfPageWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      const pageHeightPx = pageSize.heightPx;

      // Image height in mm — preserves aspect ratio
      const imgHeightMm = (img.height * pdfPageWidth) / img.width;

      // Resolve palette background colour for fill rectangles.
      // Using palette.background (not hardcoded white) so dark/coloured templates
      // have matching margins and covers on every page.
      const paletteData = customColors
        ? { background: customColors.background ?? "#ffffff" }
        : (palettes.find((p) => p.id === paletteId) ?? palettes[0]);
      const [bgR, bgG, bgB] = parseColorToRgb(paletteData.background ?? "#ffffff");

      // Section-aware slice positions (same algorithm as the visual preview)
      const { slices } = calculatePageSlicesBySections(
        el,
        pageHeightPx,
        DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX,
        DEFAULT_PAGE_OVERFLOW_EPSILON_PX,
      );

      for (let page = 0; page < slices.length; page++) {
        if (page > 0) pdf.addPage();

        const slice = slices[page];
        const isContinuation = page > 0;

        // Top margin: continuation pages start rendering PAGE_TOP_CONTINUATION_MARGIN_PX
        // pixels earlier, then a palette-coloured cover hides the overlap —
        // identical logic to the visual preview in CVPreview.tsx.
        const topMarginPx = isContinuation ? PAGE_TOP_CONTINUATION_MARGIN_PX : 0;
        const effectiveStartPx = Math.max(0, slice.startPx - topMarginPx);

        // Shift image so the correct slice is visible through the PDF page frame
        const yOffset = -((effectiveStartPx / pageHeightPx) * pdfPageHeight);
        pdf.addImage(dataUrl, "JPEG", 0, yOffset, pdfPageWidth, imgHeightMm);

        // TOP MARGIN fill — continuation pages only.
        // Covers the overlap with the previous page's tail (≈ 12.7 mm on A4).
        if (isContinuation) {
          const topMarginMm = (topMarginPx / pageHeightPx) * pdfPageHeight;
          pdf.setFillColor(bgR, bgG, bgB);
          pdf.rect(0, 0, pdfPageWidth, topMarginMm, "F");
        }

        // BOTTOM COVER — all pages.
        // • Non-last: hides the ~64px safe-margin bleed-through from the next page.
        // • Last:     hides empty space below the final section.
        // topMarginPx is subtracted from the usable height on continuation pages.
        const bottomCoverPx = Math.max(
          0,
          pageHeightPx - topMarginPx - (slice.endPx - slice.startPx),
        );
        if (bottomCoverPx > 0) {
          const bottomCoverMm = (bottomCoverPx / pageHeightPx) * pdfPageHeight;
          pdf.setFillColor(bgR, bgG, bgB);
          pdf.rect(0, pdfPageHeight - bottomCoverMm, pdfPageWidth, bottomCoverMm, "F");
        }
      }

      pdf.save(filename);
      // Record the export: increments local count + calls global API in production
      void recordExport();
    } finally {
      setExporting(false);
    }
  };

  return { exportPDF, isExporting };
}

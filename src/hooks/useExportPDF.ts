import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 794,
        allowTaint: false,
      });

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

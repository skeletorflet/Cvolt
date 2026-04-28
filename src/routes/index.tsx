import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "@/components/Editor";
import { CVPreview } from "@/components/CVPreview";
import { DesignPanel } from "@/components/DesignPanel";
import { useExportPDF } from "@/hooks/useExportPDF";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";
import { useCVStore } from "@/store/cvStore";
import { exampleCV } from "@/data/example";
import { Download, Sparkles, RotateCcw, FileText, Loader2, Wand2, X } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: CVForge,
  head: () => ({
    meta: [
      { title: "CVForge — Build a beautiful CV" },
      {
        name: "description",
        content: "Craft a professional CV in minutes with curated templates, palettes, and typography. Export to PDF instantly.",
      },
    ],
  }),
});

function CVForge() {
  useGoogleFonts();
  const { exportPDF, isExporting } = useExportPDF();
  const personal = useCVStore((s) => s.personal);
  const loadExample = useCVStore((s) => s.loadExample);
  const reset = useCVStore((s) => s.reset);
  const [designOpen, setDesignOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDesignOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
            <FileText size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-none">CVForge</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Build CVs people actually read</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadExample(exampleCV)}
            className="text-xs px-3 py-1.5 rounded-md border border-border hover:border-primary/50 hover:text-primary transition flex items-center gap-1.5"
          >
            <Sparkles size={12} /> Load example
          </button>
          <button
            onClick={() => {
              if (confirm("Clear all CV data?")) reset();
            }}
            className="text-xs px-3 py-1.5 rounded-md border border-border hover:border-destructive hover:text-destructive transition flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Reset
          </button>
          <button
            onClick={() => exportPDF(`${personal.name || "CV"}.pdf`)}
            disabled={isExporting}
            className="text-sm px-4 py-1.5 rounded-md font-medium text-primary-foreground transition flex items-center gap-2 disabled:opacity-60"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {isExporting ? "Rendering…" : "Download PDF"}
          </button>
        </div>
      </header>

      {/* Main grid — preview now takes all remaining space */}
      <main className="flex-1 grid grid-cols-[380px_1fr] overflow-hidden relative">
        <aside className="border-r border-border overflow-y-auto p-4 bg-card/30 relative">
          <Editor />
        </aside>
        <section className="overflow-hidden relative">
          <CVPreview />
        </section>

        {/* Floating Design button */}
        {!designOpen && (
          <button
            onClick={() => setDesignOpen(true)}
            className="absolute left-[calc(380px+16px)] bottom-5 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-primary-foreground transition hover:scale-105"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
            aria-label="Open design panel"
          >
            <Wand2 size={15} />
            Design
          </button>
        )}

        {/* Design Drawer */}
        <div
          className={`absolute inset-y-0 left-[380px] z-40 transition-transform duration-300 ease-out ${
            designOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
          }`}
          style={{ width: 340 }}
        >
          <div className="h-full bg-card/95 backdrop-blur-md border-r border-border shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-4 h-12 border-b border-border">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Wand2 size={14} className="text-primary" />
                Design Studio
              </div>
              <button
                onClick={() => setDesignOpen(false)}
                className="w-7 h-7 rounded-md hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition"
                aria-label="Close design panel"
              >
                <X size={15} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <DesignPanel />
            </div>
          </div>
        </div>

        {/* Backdrop */}
        {designOpen && (
          <div
            onClick={() => setDesignOpen(false)}
            className="absolute inset-0 left-[380px] z-30 bg-background/40 backdrop-blur-[2px]"
          />
        )}
      </main>
    </div>
  );
}

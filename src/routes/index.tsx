import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "@/components/Editor";
import { CVPreview } from "@/components/CVPreview";
import { useExportPDF } from "@/hooks/useExportPDF";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";
import { useCVStore } from "@/store/cvStore";
import { exampleCV } from "@/data/example";
import { Download, Sparkles, RotateCcw, FileText, Loader2 } from "lucide-react";

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
  // designOpen removed; Design Studio now lives in Editor sidebar


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

        {/* Design Studio moved to Editor sidebar; Dialog-based implementation removed */}
      </main>
    </div>
  );
}

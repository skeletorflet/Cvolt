import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "@/components/Editor";
import { CVPreview } from "@/components/CVPreview";
import { useExportPDF } from "@/hooks/useExportPDF";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";
import { useCVStore } from "@/store/cvStore";
import { exampleCVByLocale } from "@/data/example";
import { useI18n } from "@/hooks/useI18n";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Download,
  Sparkles,
  RotateCcw,
  Loader2,
  Languages,
  ChevronDown,
  Check,
  PenLine,
  Eye,
} from "lucide-react";
import { useCounterStore } from "@/store/counterStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Cvolt,
  head: () => ({
    meta: [
      { title: "Cvolt — Build a beautiful CV" },
      {
        name: "description",
        content:
          "Craft a professional CV in minutes with curated templates, palettes, and typography. Export to PDF instantly.",
      },
    ],
  }),
});

/** Available locales with display metadata */
const LOCALES = [
  { value: "en" as const, flag: "🇺🇸", label: "English", short: "EN" },
  { value: "es" as const, flag: "🇪🇸", label: "Español", short: "ES" },
] as const;

type MobileTab = "edit" | "preview";

function Cvolt() {
  useGoogleFonts();
  const { exportPDF, isExporting } = useExportPDF();
  const { locale, setLocale, m } = useI18n();
  const personal = useCVStore((s) => s.personal);
  const loadExample = useCVStore((s) => s.loadExample);
  const reset = useCVStore((s) => s.reset);
  const cvCount = useCounterStore((s) => s.displayCount);
  const isMobile = useIsMobile();

  const activeLocale = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

  // Mobile tabs — controls which panel is mounted/rendered
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // On mobile, PDF export only works from preview tab (where #cv-preview exists)
  const handleExport = () => {
    if (isMobile && mobileTab !== "preview") {
      setMobileTab("preview");
      // Small delay to let CVPreview mount and render #cv-preview
      setTimeout(() => exportPDF(`${personal.name || "CV"}.pdf`), 800);
    } else {
      exportPDF(`${personal.name || "CV"}.pdf`);
    }
  };

  const handleConfirmReset = () => {
    reset();
    setResetDialogOpen(false);
  };

  return (
    <div className="h-dvh flex flex-col bg-background text-foreground overflow-hidden">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-3 md:px-4 border-b border-border bg-card/60 backdrop-blur-sm shrink-0 h-12 md:h-14"
        role="banner"
      >
        {/* Brand */}
        <a
          href="/"
          className="flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          aria-label="Cvolt — go to home"
        >
          <img
            src="/appicon256x256.png"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md object-contain shrink-0"
          />
          <div className="hidden sm:block">
            <span className="block text-sm font-semibold leading-none tracking-tight">Cvolt</span>
            <span className="block text-[10px] text-muted-foreground mt-0.5 leading-none">
              {m.header.tagline}
            </span>
          </div>
          <span className="sm:hidden text-sm font-semibold">Cvolt</span>
        </a>

        {/* Counter — desktop only */}
        {cvCount > 0 && (
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/80 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 select-none">
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse"
              aria-hidden="true"
            />
            {m.header.cvsGenerated.replace("{{count}}", cvCount.toLocaleString())}
          </span>
        )}

        {/* Actions */}
        <nav className="flex items-center gap-1.5 md:gap-2" aria-label="Header actions">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="group inline-flex items-center gap-1 md:gap-1.5 rounded-md border border-border px-2 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 data-[state=open]:border-primary/50 data-[state=open]:text-foreground data-[state=open]:bg-primary/5"
                aria-label={m.header.languageSwitcherLabel}
              >
                <Languages size={12} aria-hidden="true" className="shrink-0" />
                <span className="text-[11px] leading-none">{activeLocale.flag}</span>
                <span className="uppercase tracking-widest text-[10px] font-semibold leading-none hidden sm:inline">
                  {activeLocale.short}
                </span>
                <ChevronDown
                  size={10}
                  aria-hidden="true"
                  className="shrink-0 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180 hidden sm:inline"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={6}
              className="min-w-[160px] overflow-hidden rounded-xl border border-border bg-card/95 p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-md"
            >
              <p className="px-2.5 pt-1 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold select-none border-b border-border/50 mb-1.5">
                {m.header.languageSwitcherLabel}
              </p>
              <DropdownMenuRadioGroup
                value={locale}
                onValueChange={(v) => setLocale(v as typeof locale)}
              >
                {LOCALES.map((lang) => {
                  const isActive = lang.value === locale;
                  return (
                    <DropdownMenuRadioItem
                      key={lang.value}
                      value={lang.value}
                      className="group/item relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors hover:bg-primary/10 focus:bg-primary/10 data-[state=checked]:bg-primary/10 data-[state=checked]:text-foreground"
                      style={{ paddingLeft: "0.625rem" }}
                    >
                      <span className="text-base leading-none shrink-0" aria-hidden="true">
                        {lang.flag}
                      </span>
                      <span
                        className={`flex-1 font-medium text-[13px] leading-none ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {lang.label}
                      </span>
                      {isActive && (
                        <Check
                          size={13}
                          aria-hidden="true"
                          className="shrink-0 text-primary"
                          strokeWidth={2.5}
                        />
                      )}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Load example — hidden on mobile */}
          <button
            onClick={() => loadExample(exampleCVByLocale[locale])}
            className="hidden md:inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-border hover:border-primary/50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            aria-label={m.header.loadExample}
          >
            <Sparkles size={12} aria-hidden="true" />
            <span>{m.header.loadExample}</span>
          </button>

          {/* Reset — hidden on mobile */}
          <button
            onClick={() => setResetDialogOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-border hover:border-destructive/70 hover:text-destructive hover:bg-destructive/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/60"
            aria-label={m.header.reset}
          >
            <RotateCcw size={12} aria-hidden="true" />
            <span>{m.header.reset}</span>
          </button>

          {/* Download PDF */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-md font-medium text-primary-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
            aria-label={isExporting ? m.header.rendering : m.header.downloadPdf}
            aria-busy={isExporting}
          >
            {isExporting ? (
              <Loader2 size={13} className="animate-spin" aria-hidden="true" />
            ) : (
              <Download size={13} aria-hidden="true" />
            )}
            <span className="hidden sm:inline">
              {isExporting ? m.header.rendering : m.header.downloadPdf}
            </span>
          </button>
        </nav>
      </header>

      {/* ── Mobile tab bar ──────────────────────────────────────────────── */}
      <div
        className="md:hidden flex shrink-0 border-b border-border bg-card/40"
        role="tablist"
        aria-label="View mode"
      >
        <button
          role="tab"
          aria-selected={mobileTab === "edit"}
          onClick={() => setMobileTab("edit")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors",
            mobileTab === "edit"
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <PenLine size={15} aria-hidden="true" />
          {m.header.mobileTabEdit}
        </button>
        <button
          role="tab"
          aria-selected={mobileTab === "preview"}
          onClick={() => setMobileTab("preview")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors",
            mobileTab === "preview"
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Eye size={15} aria-hidden="true" />
          {m.header.mobileTabPreview}
        </button>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <main
        id="main-content"
        className="flex-1 md:grid md:grid-cols-[1fr_3fr] overflow-hidden relative min-h-0"
        aria-label="CV builder"
      >
        {/* Editor panel — always visible on desktop, only on edit tab on mobile */}
        <aside
          className={cn(
            "border-r border-border overflow-y-auto themed-scrollbar p-4 bg-card/30 relative min-w-0",
            // Desktop: always visible
            // Mobile: only show when edit tab is active
            isMobile ? (mobileTab === "edit" ? "flex flex-col h-full" : "hidden") : "block",
          )}
          aria-label="CV editor"
        >
          <Editor />

          {/* Mobile-only: load example + reset at the bottom of editor */}
          <div className="md:hidden mt-6 pt-4 border-t border-border flex gap-2">
            <button
              onClick={() => loadExample(exampleCVByLocale[locale])}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-md border border-border hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Sparkles size={12} aria-hidden="true" />
              {m.header.loadExample}
            </button>
            <button
              onClick={() => setResetDialogOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-md border border-border hover:border-destructive/70 hover:text-destructive hover:bg-destructive/5 transition-colors"
            >
              <RotateCcw size={12} aria-hidden="true" />
              {m.header.reset}
            </button>
          </div>
        </aside>

        {/* Preview panel — always on desktop, only on preview tab on mobile.
            IMPORTANT: on mobile edit tab, CVPreview is NOT mounted at all →
            zero template rendering, zero ResizeObserver, zero memory pressure. */}
        <section
          className={cn(
            "overflow-hidden relative min-w-0",
            isMobile ? (mobileTab === "preview" ? "block h-full" : "hidden") : "block",
          )}
          aria-label="CV preview"
        >
          {/* Only mount CVPreview when visible — prevents background rendering on mobile */}
          {(!isMobile || mobileTab === "preview") && <CVPreview />}
        </section>
      </main>

      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent className="max-w-md overflow-hidden rounded-2xl border-border/70 bg-card/95 p-0 shadow-[0_22px_80px_rgba(0,0,0,0.55)] backdrop-blur-md">
          <div className="h-1.5 w-full bg-gradient-to-r from-destructive/80 via-orange-400/70 to-destructive/50" />
          <div className="px-6 pt-5 pb-2">
            <AlertDialogHeader className="text-left">
              <AlertDialogTitle className="text-base tracking-tight">
                {m.header.clearConfirmTitle}
              </AlertDialogTitle>
              <AlertDialogDescription className="pt-1 text-sm leading-relaxed text-muted-foreground">
                {m.header.clearConfirmDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter className="border-t border-border/60 bg-muted/20 px-6 py-4 sm:justify-end sm:space-x-2">
            <AlertDialogCancel className="mt-0 border-border/70 bg-transparent hover:bg-muted/60">
              {m.header.cancelAction}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {m.header.confirmAction}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

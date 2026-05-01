import { Suspense, useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import { useCVStore } from "@/store/cvStore";
import { useShallow } from "zustand/react/shallow";
import { palettes } from "@/data/palettes";
import { fontPairs } from "@/data/fonts";
import { getTemplate } from "@/components/templates";
import { getPaperSize } from "@/data/paperSizes";
import { useI18n } from "@/hooks/useI18n";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  calculatePageSlicesBySections,
  type PageSlice,
  DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX,
} from "@/lib/pagination";

const OVERFLOW_ENABLE_THRESHOLD_PX = 6;
const OVERFLOW_DISABLE_THRESHOLD_PX = -10;

export function CVPreview() {
  const state = useCVStore(useShallow((s) => ({
    personal: s.personal,
    avatar: s.avatar,
    experience: s.experience,
    education: s.education,
    skills: s.skills,
    languages: s.languages,
    projects: s.projects,
    certifications: s.certifications,
    sectionOrder: s.sectionOrder,
    hiddenSections: s.hiddenSections,
    templateId: s.templateId,
    paletteId: s.paletteId,
    fontPairId: s.fontPairId,
    pageSizeId: s.pageSizeId,
    pageSizeMode: s.pageSizeMode,
    compactMode: s.compactMode,
    customColors: s.customColors,
  })));
  // deferredState: template re-renders are treated as non-urgent.
  // Editor inputs update instantly; the preview batches behind them.
  const deferredState = useDeferredValue(state);
  const { m, templateName } = useI18n();
  const palette = useMemo(
    () =>
      state.customColors
        ? { id: "custom", name: "Custom", ...state.customColors }
        : (palettes.find((p) => p.id === state.paletteId) ?? palettes[0]),
    [state.paletteId, state.customColors],
  );
  const fonts = useMemo(
    () => fontPairs.find((f) => f.id === state.fontPairId) ?? fontPairs[0],
    [state.fontPairId],
  );
  const tpl = useMemo(() => getTemplate(state.templateId), [state.templateId]);
  const Comp = tpl.Component;
  const pageSize = getPaperSize(
    state.pageSizeMode === "manual" ? state.pageSizeId : (tpl.recommendedPaperSizeId ?? "a4"),
  );
  const pageWidth = pageSize.widthPx;
  const pageHeight = pageSize.heightPx;
  const compactMode = state.compactMode;

  const wrapRef = useRef<HTMLDivElement>(null);
  // measureEl uses a ref-callback + state so the pagination effect re-runs
  // when the lazy template resolves its Suspense boundary and mounts the div.
  // With a plain useRef, measureRef.current is null on the first effect run
  // (template chunk still loading), the ResizeObserver is never set up, and
  // the CV preview stays blank/unpaginated until the user resizes the window.
  const [measureEl, setMeasureEl] = useState<HTMLDivElement | null>(null);
  const [fitScale, setFitScale] = useState(0.75);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [autoCompactOverflow, setAutoCompactOverflow] = useState(false);
  const [contentHeightPx, setContentHeightPx] = useState(pageHeight);
  const [pageSlices, setPageSlices] = useState<PageSlice[]>([{ startPx: 0, endPx: pageHeight }]);
  const autoCompactOverflowRef = useRef(false);
  const lastFitMeasureKeyRef = useRef<string>("");
  const lastPaginationMeasureKeyRef = useRef<string>("");
  const paginationFrameRef = useRef<number | null>(null);

  // auto-fit
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth - 48;
      const h = el.clientHeight - 48;
      const nextKey = `${w}:${h}:${pageWidth}:${pageHeight}`;
      if (nextKey === lastFitMeasureKeyRef.current) return;
      lastFitMeasureKeyRef.current = nextKey;
      const s = Math.min(w / pageWidth, h / pageHeight, 1);
      setFitScale(Math.max(0.3, s));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [pageHeight, pageWidth]);

  useEffect(() => {
    const root = measureEl;
    if (!root) return;

    const syncMeasurement = () => {
      const nextMeasureKey = `${root.clientWidth}:${root.clientHeight}:${root.scrollHeight}`;
      if (nextMeasureKey === lastPaginationMeasureKeyRef.current) return;
      lastPaginationMeasureKeyRef.current = nextMeasureKey;

      const { slices, contentHeightPx: nextContentHeight } = calculatePageSlicesBySections(
        root,
        pageHeight,
        DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX,
      );
      // Use functional setters with comparison to avoid triggering re-renders
      // when the measured values haven't actually changed. A naive setState call
      // with a new array/value on every measurement causes an Observer → render
      // → Observer feedback loop that freezes the browser.
      setContentHeightPx((prev) => (prev === nextContentHeight ? prev : nextContentHeight));
      setPageSlices((prev) => {
        if (
          prev.length === slices.length &&
          slices.every((s, i) => s.startPx === prev[i].startPx && s.endPx === prev[i].endPx)
        ) {
          return prev;
        }
        return slices;
      });
      const overflowDelta = nextContentHeight - pageHeight;

      // Use hysteresis to avoid compact-mode oscillation near the page-height boundary.
      const nextOverflow = autoCompactOverflowRef.current
        ? overflowDelta > OVERFLOW_DISABLE_THRESHOLD_PX
        : overflowDelta > OVERFLOW_ENABLE_THRESHOLD_PX;

      if (nextOverflow !== autoCompactOverflowRef.current) {
        autoCompactOverflowRef.current = nextOverflow;
        setAutoCompactOverflow(nextOverflow);
      }
    };

    syncMeasurement();

    // Debounce: 1 rAF on desktop (fast), 120ms on mobile (prevents OOM from
    // rapid ResizeObserver firing on an already-constrained device).
    let timerId = 0;
    const debouncedSync = () => {
      clearTimeout(timerId);
      if (paginationFrameRef.current !== null) {
        window.cancelAnimationFrame(paginationFrameRef.current);
      }
      timerId = window.setTimeout(() => {
        paginationFrameRef.current = window.requestAnimationFrame(() => {
          paginationFrameRef.current = null;
          syncMeasurement();
        });
      }, window.innerWidth < 768 ? 180 : 96);
    };
    const ro = new ResizeObserver(debouncedSync);
    ro.observe(root);
    return () => {
      clearTimeout(timerId);
      if (paginationFrameRef.current !== null) {
        window.cancelAnimationFrame(paginationFrameRef.current);
        paginationFrameRef.current = null;
      }
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageHeight, measureEl]);
  // NOTE: `state` intentionally excluded from deps. The ResizeObserver fires
  // automatically when template DOM changes (user edits content). Including
  // the full Zustand state here would tear down / recreate the observer on
  // every keystroke, forcing dozens of forced-layout DOM reads per second.

  const compactEnabled =
    compactMode === "compact" || (compactMode === "auto" && autoCompactOverflow);
  const scale = Math.max(0.3, Math.min(2.2, fitScale * zoomLevel));
  const totalPages = pageSlices.length;

  const zoomIn = () => setZoomLevel((z) => Math.min(2, z + 0.1));
  const zoomOut = () => setZoomLevel((z) => Math.max(0.55, z - 0.1));
  const zoomReset = () => setZoomLevel(1);

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full overflow-auto themed-scrollbar"
      style={{ background: "var(--app-canvas)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:left-auto md:top-4 md:right-4 z-20 rounded-xl border border-border bg-card/90 backdrop-blur-md px-2 py-1.5 flex items-center gap-1.5">
        <button
          type="button"
          onClick={zoomOut}
          className="p-2 rounded-md hover:bg-primary/15"
          aria-label={m.preview.zoomOut}
        >
          <Minus size={14} />
        </button>
        <button
          type="button"
          onClick={zoomReset}
          className="px-2.5 py-1.5 rounded-md text-xs hover:bg-primary/15"
        >
          {Math.round(scale * 100)}%
        </button>
        <button
          type="button"
          onClick={zoomIn}
          className="p-2 rounded-md hover:bg-primary/15"
          aria-label={m.preview.zoomIn}
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="min-h-full w-full flex items-start justify-center p-6 pt-4 pb-24 md:pt-6 md:pb-6 relative">
        <div
          className="cv-preview-scaler"
          style={{
            width: pageWidth,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            marginBottom: Math.max(0, contentHeightPx * (scale - 1)),
          }}
        >
          <div
            style={{
              width: pageWidth,
              boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
              position: "relative",
              backgroundColor: palette.background,
            }}
          >
            <Suspense
              fallback={
                <div
                  style={{
                    width: pageWidth,
                    minHeight: pageHeight,
                    backgroundColor: palette.background,
                  }}
                />
              }
            >
              <div
                id="cv-preview"
                ref={setMeasureEl}
                className={cn("cv-page-template", compactEnabled && "cv-compact-mode")}
                style={{ "--cv-page-height": `${pageHeight}px` } as React.CSSProperties}
              >
                <Comp data={deferredState} palette={palette} fonts={fonts} />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 right-4 text-[11px] text-muted-foreground bg-background/70 backdrop-blur px-2 py-1 rounded-md border border-border">
        {pageSize.name} · {templateName(tpl.id, tpl.name)} · {totalPages}p ·{" "}
        {compactEnabled
          ? m.preview.modeCompact
          : compactMode === "auto"
            ? m.preview.modeAuto
            : m.preview.modeNormal}
      </div>
    </div>
  );
}

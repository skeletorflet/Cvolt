import { Suspense, useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import { useCVStore } from "@/store/cvStore";
import { palettes } from "@/data/palettes";
import { fontPairs } from "@/data/fonts";
import { getTemplate } from "@/components/templates";
import { getPaperSize } from "@/data/paperSizes";
import { DesignPanel } from "@/components/DesignPanel";
import { useI18n } from "@/hooks/useI18n";
import { Minus, Plus, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  calculatePageSlicesBySections,
  type PageSlice,
  DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX,
  PAGE_TOP_CONTINUATION_MARGIN_PX,
} from "@/lib/pagination";

const OVERFLOW_ENABLE_THRESHOLD_PX = 6;
const OVERFLOW_DISABLE_THRESHOLD_PX = -10;
const PAGE_STACK_GAP_PX = 24;

export function CVPreview() {
  const state = useCVStore();
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
  const measureRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(0.75);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [autoCompactOverflow, setAutoCompactOverflow] = useState(false);
  const [contentHeightPx, setContentHeightPx] = useState(pageHeight);
  const [pageSlices, setPageSlices] = useState<PageSlice[]>([{ startPx: 0, endPx: pageHeight }]);
  const [designOpen, setDesignOpen] = useState(false);
  const autoCompactOverflowRef = useRef(false);

  // auto-fit
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth - 48;
      const h = el.clientHeight - 48;
      const s = Math.min(w / pageWidth, h / pageHeight, 1);
      setFitScale(Math.max(0.3, s));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [pageHeight, pageWidth]);

  useEffect(() => {
    const root = measureRef.current;
    if (!root) return;

    const syncMeasurement = () => {
      const { slices, contentHeightPx: nextContentHeight } = calculatePageSlicesBySections(
        root,
        pageHeight,
        DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX,
      );
      setContentHeightPx(nextContentHeight);
      setPageSlices(slices);
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
    const isMobileDevice = window.innerWidth < 768;
    let rafId = 0;
    let timerId = 0;
    const debouncedSync = () => {
      if (isMobileDevice) {
        clearTimeout(timerId);
        timerId = window.setTimeout(syncMeasurement, 120);
      } else {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(syncMeasurement);
      }
    };
    const ro = new ResizeObserver(debouncedSync);
    ro.observe(root);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      ro.disconnect();
    };
  }, [pageHeight, state]);

  const compactEnabled =
    compactMode === "compact" || (compactMode === "auto" && autoCompactOverflow);
  const scale = Math.max(0.3, Math.min(2.2, fitScale * zoomLevel));
  const totalPages = pageSlices.length;
  const pageStackHeightPx = totalPages * pageHeight + (totalPages - 1) * PAGE_STACK_GAP_PX;

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

      <div className="sticky top-3 z-20 mx-4 mt-3 mb-2 w-auto md:absolute md:top-4 md:left-4 md:mx-0 md:mt-0 md:mb-0 md:w-[330px] md:max-w-[calc(100%-2rem)]">
        <div className="rounded-xl border border-border bg-card/88 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
          <button
            type="button"
            onClick={() => setDesignOpen((v) => !v)}
            className="w-full px-3 py-2.5 text-sm font-medium flex items-center justify-between"
          >
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-primary" /> {m.preview.presetsLayout}
            </span>
            <span className="text-xs text-muted-foreground">
              {designOpen ? m.preview.hide : m.preview.show}
            </span>
          </button>
          {designOpen && (
            <div className="border-t border-border h-[420px] overflow-auto themed-scrollbar">
              <DesignPanel />
            </div>
          )}
        </div>
      </div>

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
            marginBottom: pageStackHeightPx * (scale - 1),
          }}
        >
          <div className="flex flex-col" style={{ gap: PAGE_STACK_GAP_PX }}>
            {pageSlices.map((slice, pageIndex) => {
              const isContinuation = pageIndex > 0;
              // For continuation pages, shift the slice start back by the top margin
              // so there is visual breathing room above the first section.
              // The top cover div hides the overlap with the previous page's tail.
              const topMarginPx = isContinuation ? PAGE_TOP_CONTINUATION_MARGIN_PX : 0;
              const effectiveStartPx = Math.max(0, slice.startPx - topMarginPx);
              // Bottom cover hides bleed-through (non-last) or empty tail (last).
              // For continuation pages we subtract topMarginPx from the usable height.
              const bottomCoverPx = Math.max(
                0,
                pageHeight - topMarginPx - (slice.endPx - slice.startPx),
              );

              return (
                <div
                  key={pageIndex}
                  style={{
                    width: pageWidth,
                    height: pageHeight,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: palette.background,
                  }}
                >
                  {/* Shift the full template so the correct slice is visible */}
                  <div
                    style={{ transform: `translateY(-${effectiveStartPx}px)`, width: pageWidth }}
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
                        className={cn("cv-page-template", compactEnabled && "cv-compact-mode")}
                        style={{ "--cv-page-height": `${pageHeight}px` } as React.CSSProperties}
                      >
                        <Comp data={deferredState} palette={palette} fonts={fonts} />
                      </div>
                    </Suspense>
                  </div>

                  {/* TOP MARGIN — continuation pages only.
                      Covers the overlap content from the previous page's tail,
                      creating a clean top margin (≈ 12.7 mm on A4). */}
                  {isContinuation && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: "0 0 auto 0",
                        height: topMarginPx,
                        backgroundColor: palette.background,
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* BOTTOM COVER — all pages.
                      • Non-last: hides the ~64px safe-margin bleed-through.
                      • Last:     hides empty space below the final section. */}
                  {bottomCoverPx > 0 && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: "auto 0 0 0",
                        height: bottomCoverPx,
                        backgroundColor: palette.background,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hidden export source: renders at full natural content height so the
            PDF slicer captures all content and section positions are accurate. */}
        <div
          id="cv-preview"
          style={{
            position: "fixed",
            left: -20000,
            top: 0,
            width: pageWidth,
            backgroundColor: palette.background,
            pointerEvents: "none",
            zIndex: -1,
          }}
          aria-hidden
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
              ref={measureRef}
              className={cn("cv-page-template", compactEnabled && "cv-compact-mode")}
              style={{ "--cv-page-height": `${pageHeight}px` } as React.CSSProperties}
            >
              <Comp data={deferredState} palette={palette} fonts={fonts} />
            </div>
          </Suspense>
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

export const DEFAULT_PAGE_OVERFLOW_EPSILON_PX = 0.5;
export const DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX = 64;
/**
 * Visual top margin applied to continuation pages (page 2+).
 * The renderer shifts the slice start back by this amount and covers
 * the overlap with a palette-coloured mask, creating clean breathing
 * room without skipping any CV content.
 * ≈ 12.7 mm on A4 — matches typical template top-padding.
 */
export const PAGE_TOP_CONTINUATION_MARGIN_PX = 48;
const DEFAULT_PAGE_MIN_PROGRESS_PX = 40;

export type PageSlice = {
  startPx: number;
  endPx: number;
};

export function clampPositive(value: number, fallback: number): number {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function getPageContentStepPx(
  pageHeightPx: number,
  bottomSafeMarginPx = DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX,
): number {
  const safePageHeight = clampPositive(pageHeightPx, 1);
  const safeMargin = Math.max(0, Math.min(bottomSafeMarginPx, safePageHeight - 1));
  return Math.max(1, safePageHeight - safeMargin);
}

export function calculateTotalPages(
  contentHeightPx: number,
  pageHeightPx: number,
  epsilonPx = 0,
): number {
  const safePageHeight = clampPositive(pageHeightPx, 1);
  const safeContentHeight = Math.max(
    clampPositive(contentHeightPx, safePageHeight),
    safePageHeight,
  );
  return Math.max(1, Math.ceil((safeContentHeight - epsilonPx) / safePageHeight));
}

export function calculateTotalPagesByStep(
  contentHeightPx: number,
  pageHeightPx: number,
  stepPx: number,
  epsilonPx = 0,
): number {
  const safePageHeight = clampPositive(pageHeightPx, 1);
  const safeStep = clampPositive(stepPx, safePageHeight);
  const safeContentHeight = Math.max(
    clampPositive(contentHeightPx, safePageHeight),
    safePageHeight,
  );
  if (safeContentHeight <= safePageHeight + epsilonPx) return 1;
  return 1 + Math.max(0, Math.ceil((safeContentHeight - safePageHeight - epsilonPx) / safeStep));
}

/**
 * Measures section/block positions inside `root` using both semantic `<section>`
 * elements and any element with `data-cv-section` attribute. Falls back to `h2`
 * headings when neither are present, so templates that don't use semantic markup
 * still benefit from intelligent page breaks.
 */
function collectSectionBounds(root: HTMLElement): Array<{ top: number; bottom: number }> {
  const rootRect = root.getBoundingClientRect();
  const scrollTop = root.scrollTop;

  // Priority 1: explicit semantic sections or marked blocks
  let elements = Array.from(root.querySelectorAll<Element>("section, [data-cv-section]"));

  // Priority 2: h2 headings (universal fallback — every CV section has a title)
  if (elements.length === 0) {
    elements = Array.from(root.querySelectorAll<Element>("h2"));
  }

  if (elements.length === 0) return [];

  // If we used headings, treat each heading as the start of a "virtual section"
  // whose bottom is the next heading's top (or content end).
  const isHeadingFallback = elements[0].tagName === "H2";

  if (!isHeadingFallback) {
    const raw = elements
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          top: r.top - rootRect.top + scrollTop,
          bottom: r.bottom - rootRect.top + scrollTop,
        };
      })
      .filter((b) => b.bottom > b.top)
      .sort((a, b) => a.top - b.top);

    // Merge sections that share the same grid row (top within 2px of each other).
    // Treat the entire row as one atomic unit — break before the row, not between columns.
    const merged: Array<{ top: number; bottom: number }> = [];
    for (const bound of raw) {
      const last = merged[merged.length - 1];
      if (last && Math.abs(bound.top - last.top) <= 2) {
        // Same grid row — extend the row's bottom to the tallest column
        last.bottom = Math.max(last.bottom, bound.bottom);
      } else {
        merged.push({ ...bound });
      }
    }
    return merged;
  }

  // Heading fallback: virtual sections from heading.top to next_heading.top
  const tops = elements
    .map((el) => el.getBoundingClientRect().top - rootRect.top + scrollTop)
    .sort((a, b) => a - b);

  const contentBottom = root.scrollHeight;
  return tops.map((top, i) => ({
    top,
    bottom: i + 1 < tops.length ? tops[i + 1] : contentBottom,
  }));
}

export function calculatePageSlicesBySections(
  root: HTMLElement,
  pageHeightPx: number,
  bottomSafeMarginPx = DEFAULT_PAGE_BOTTOM_SAFE_MARGIN_PX,
  epsilonPx = DEFAULT_PAGE_OVERFLOW_EPSILON_PX,
): { slices: PageSlice[]; contentHeightPx: number } {
  const safePageHeight = clampPositive(pageHeightPx, 1);
  const contentHeightPx = Math.max(root.scrollHeight, safePageHeight);
  const stepPx = getPageContentStepPx(safePageHeight, bottomSafeMarginPx);
  const minProgressPx = Math.max(DEFAULT_PAGE_MIN_PROGRESS_PX, Math.round(safePageHeight * 0.15));

  const sectionBounds = collectSectionBounds(root);

  const slices: PageSlice[] = [];
  let currentStart = 0;
  let guard = 0;

  while (guard < 300) {
    guard += 1;
    const remaining = contentHeightPx - currentStart;
    if (remaining <= safePageHeight + epsilonPx) {
      slices.push({
        startPx: currentStart,
        endPx: Math.min(contentHeightPx, currentStart + safePageHeight),
      });
      break;
    }

    const maxBreak = currentStart + safePageHeight; // absolute pixel where page ends
    const idealBreak = currentStart + stepPx; // preferred break (with safe margin)
    let nextBreak = idealBreak;

    // ─── STEP 1: Find the FIRST section that would be CUT at the page boundary ───
    // A section is cut when it starts on this page AND its bottom exceeds the page end.
    // We want to break BEFORE it (move it entirely to the next page).
    const overflowSection = sectionBounds.find(
      (bound) =>
        bound.top > currentStart && // starts on current page (after page start)
        bound.top < maxBreak && // starts before page end
        bound.bottom > maxBreak, // extends beyond page end → would be cut
    );

    if (overflowSection && overflowSection.top - currentStart > minProgressPx) {
      // There is enough content before this section → break cleanly before it.
      nextBreak = overflowSection.top;
    } else if (overflowSection && overflowSection.top - currentStart <= minProgressPx) {
      // Section starts too early (at or near the page start) — we can't avoid
      // cutting it without wasting most of the page.  Break at idealBreak instead.
      nextBreak = idealBreak;
    } else {
      // ─── STEP 2: No section overflows — find the best clean break near idealBreak ───
      // Pick the section start that is closest to idealBreak within [minProgress, maxBreak].
      const candidates = sectionBounds
        .map((bound) => bound.top)
        .filter((top) => top > currentStart + minProgressPx && top <= maxBreak);

      if (candidates.length > 0) {
        // Prefer breaking right after a section ends (at the next section's start).
        // Among all candidates pick the one nearest to idealBreak.
        let nearest = candidates[0];
        let nearestDist = Math.abs(nearest - idealBreak);
        for (let i = 1; i < candidates.length; i++) {
          const dist = Math.abs(candidates[i] - idealBreak);
          if (dist < nearestDist) {
            nearest = candidates[i];
            nearestDist = dist;
          }
        }
        nextBreak = nearest;
      }
    }

    // Clamp to valid range
    const minBreak = currentStart + minProgressPx;
    nextBreak = Math.max(minBreak, Math.min(nextBreak, maxBreak));
    if (nextBreak <= currentStart + 1) {
      nextBreak = Math.min(maxBreak, currentStart + stepPx);
    }

    slices.push({ startPx: currentStart, endPx: nextBreak });
    currentStart = nextBreak;
  }

  if (slices.length === 0) {
    slices.push({ startPx: 0, endPx: Math.min(contentHeightPx, safePageHeight) });
  }

  return { slices, contentHeightPx };
}

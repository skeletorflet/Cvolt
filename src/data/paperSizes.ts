export type PaperSizeId = "a4" | "legal" | "oficio";

export type PaperSize = {
  id: PaperSizeId;
  name: string;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
};

const PX_PER_MM = 96 / 25.4;

function mmToPx(mm: number) {
  return Math.round(mm * PX_PER_MM);
}

export const paperSizes: Record<PaperSizeId, PaperSize> = {
  a4: {
    id: "a4",
    name: "A4",
    widthMm: 210,
    heightMm: 297,
    widthPx: mmToPx(210),
    heightPx: mmToPx(297),
  },
  legal: {
    id: "legal",
    name: "Legal",
    widthMm: 216,
    heightMm: 356,
    widthPx: mmToPx(216),
    heightPx: mmToPx(356),
  },
  oficio: {
    id: "oficio",
    name: "Oficio",
    widthMm: 216,
    heightMm: 340,
    widthPx: mmToPx(216),
    heightPx: mmToPx(340),
  },
};

export function getPaperSize(id: PaperSizeId) {
  return paperSizes[id];
}
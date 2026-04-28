import { useEffect, useRef, useState } from "react";
import { useCVStore } from "@/store/cvStore";
import { palettes } from "@/data/palettes";
import { fontPairs } from "@/data/fonts";
import { getTemplate } from "@/components/templates";

// A4 dimensions at 96dpi reference: 794 x 1123 px
const PAGE_W = 794;
const PAGE_H = 1123;

export function CVPreview() {
  const state = useCVStore();
  const palette =
    state.customColors
      ? { id: "custom", name: "Custom", ...state.customColors }
      : palettes.find((p) => p.id === state.paletteId) ?? palettes[0];
  const fonts = fontPairs.find((f) => f.id === state.fontPairId) ?? fontPairs[0];
  const tpl = getTemplate(state.templateId);
  const Comp = tpl.Component;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);

  // auto-fit
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth - 48;
      const h = el.clientHeight - 48;
      const s = Math.min(w / PAGE_W, h / PAGE_H, 1);
      setScale(Math.max(0.3, s));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-auto" style={{ background: "var(--app-canvas)" }}>
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="min-h-full w-full flex items-start justify-center p-6 relative">
        <div
          style={{
            width: PAGE_W,
            minHeight: PAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            marginBottom: PAGE_H * (scale - 1),
            boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
          }}
          className="bg-white"
        >
          <div id="cv-preview" style={{ width: PAGE_W, minHeight: PAGE_H }}>
            <Comp data={state} palette={palette} fonts={fonts} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 right-4 text-[11px] text-muted-foreground bg-background/70 backdrop-blur px-2 py-1 rounded-md border border-border">
        {Math.round(scale * 100)}% · {tpl.name}
      </div>
    </div>
  );
}

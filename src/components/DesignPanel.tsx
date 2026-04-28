import { useState } from "react";
import { useCVStore } from "@/store/cvStore";
import { templates } from "@/components/templates";
import { palettes } from "@/data/palettes";
import { fontPairs } from "@/data/fonts";
import { HexColorPicker } from "react-colorful";
import { Palette as PaletteIcon, Type, LayoutTemplate, ChevronDown } from "lucide-react";

export function DesignPanel() {
  const [tab, setTab] = useState<"templates" | "colors" | "fonts">("templates");
  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-3 gap-1 p-1 m-3 mb-2 rounded-lg bg-background/40 border border-border">
        {[
          { id: "templates", icon: LayoutTemplate, label: "Templates" },
          { id: "colors", icon: PaletteIcon, label: "Colors" },
          { id: "fonts", icon: Type, label: "Fonts" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md transition ${
              tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {tab === "templates" && <Templates />}
        {tab === "colors" && <Colors />}
        {tab === "fonts" && <Fonts />}
      </div>
    </div>
  );
}

function Templates() {
  const { templateId, setTemplate, paletteId, customColors } = useCVStore();
  const palette = customColors ?? palettes.find((p) => p.id === paletteId)!;
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {templates.map((t) => {
        const active = t.id === templateId;
        return (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`group rounded-lg overflow-hidden border-2 transition text-left ${
              active ? "border-primary shadow-[0_0_0_3px_rgba(168,128,255,0.2)]" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="aspect-[3/4] relative" style={{ background: palette.background }}>
              <MiniThumb palette={palette} layout={t.id} />
            </div>
            <div className="px-2 py-1.5 bg-card">
              <div className="text-[11px] font-medium truncate">{t.name}</div>
              <div className="text-[9px] text-muted-foreground">{t.category}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MiniThumb({ palette, layout }: { palette: { primary: string; accent: string; background: string; muted: string }; layout: string }) {
  // simple visual representation per template id
  const lines = (n: number, c = palette.muted, w = "70%") =>
    Array.from({ length: n }).map((_, i) => (
      <div key={i} style={{ background: c, height: 2, width: i === n - 1 ? "40%" : w, borderRadius: 1, marginTop: 3 }} />
    ));
  switch (layout) {
    case "executive-dark":
      return (
        <div className="absolute inset-0 flex flex-col">
          <div style={{ background: palette.primary, height: "22%" }} />
          <div className="p-2 flex-1">{lines(6)}</div>
        </div>
      );
    case "tech-sidebar":
      return (
        <div className="absolute inset-0 grid grid-cols-[35%_65%]">
          <div style={{ background: palette.primary }} />
          <div className="p-2">{lines(7)}</div>
        </div>
      );
    case "creative-bold":
      return (
        <div className="absolute inset-0 p-2">
          <div style={{ background: palette.primary, height: 14, width: "70%", borderRadius: 2 }} />
          <div className="grid grid-cols-[1fr_2fr] gap-1.5 mt-2">
            <div>{lines(4, palette.muted, "90%")}</div>
            <div>{lines(5)}</div>
          </div>
        </div>
      );
    case "modern-grid":
      return (
        <div className="absolute inset-0 p-2">
          <div style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, height: 18, borderRadius: 4 }} />
          <div className="grid grid-cols-3 gap-1 mt-2">
            <div className="col-span-2 rounded p-1" style={{ background: palette.muted + "22" }}>{lines(4)}</div>
            <div className="rounded p-1" style={{ background: palette.muted + "22" }}>{lines(3, palette.muted, "90%")}</div>
          </div>
        </div>
      );
    case "editorial":
      return (
        <div className="absolute inset-0 p-2 flex flex-col items-center">
          <div style={{ background: palette.primary, height: 12, width: "60%", borderRadius: 2, marginTop: 6 }} />
          <div style={{ background: palette.accent, height: 2, width: "40%", marginTop: 6 }} />
          <div className="w-full mt-3">{lines(6, palette.muted, "85%")}</div>
        </div>
      );
    case "academic":
      return (
        <div className="absolute inset-0 p-2">
          <div style={{ background: palette.primary, height: 10, width: "55%" }} />
          {lines(8, palette.muted, "92%")}
        </div>
      );
    case "swiss":
      return (
        <div className="absolute inset-0 p-2">
          <div style={{ background: palette.primary, height: 12, width: "45%" }} />
          <div className="grid grid-cols-[30%_70%] gap-1.5 mt-3">
            <div>{lines(4, palette.muted, "90%")}</div>
            <div>{lines(4)}</div>
          </div>
        </div>
      );
    default: // corporate
      return (
        <div className="absolute inset-0 p-2">
          <div style={{ background: palette.primary, height: 12, width: "55%" }} />
          <div style={{ background: palette.accent, height: 2, width: "100%", marginTop: 5 }} />
          {lines(7)}
        </div>
      );
  }
}

function Colors() {
  const { paletteId, setPalette, customColors, setCustomColors } = useCVStore();
  const [editing, setEditing] = useState<keyof NonNullable<typeof customColors> | null>(null);
  const current = customColors ?? palettes.find((p) => p.id === paletteId)!;

  const swatch = (key: "primary" | "secondary" | "accent" | "text" | "background" | "muted", label: string) => {
    const color = (current as Record<string, string>)[key];
    return (
      <button
        key={key as string}
        onClick={() => {
          if (!customColors) {
            const base = palettes.find((p) => p.id === paletteId)!;
            setCustomColors({ primary: base.primary, secondary: base.secondary, accent: base.accent, text: base.text, background: base.background, muted: base.muted });
          }
          setEditing(editing === key ? null : (key as never));
        }}
        className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md border border-border bg-background/40 text-xs hover:border-primary/50 transition"
      >
        <span className="w-4 h-4 rounded border border-border" style={{ background: color }} />
        <span className="flex-1 text-left text-muted-foreground capitalize">{label}</span>
        <span className="text-[10px] text-muted-foreground font-mono">{color}</span>
        <ChevronDown size={12} className={`text-muted-foreground transition ${editing === key ? "rotate-180" : ""}`} />
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Presets</div>
        <div className="grid grid-cols-2 gap-1.5">
          {palettes.map((p) => {
            const active = !customColors && paletteId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPalette(p.id)}
                className={`flex items-center gap-2 p-1.5 rounded-md border transition ${
                  active ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex -space-x-1">
                  <span className="w-4 h-4 rounded-full border border-card" style={{ background: p.primary }} />
                  <span className="w-4 h-4 rounded-full border border-card" style={{ background: p.secondary }} />
                  <span className="w-4 h-4 rounded-full border border-card" style={{ background: p.accent }} />
                </div>
                <span className="text-[10.5px] truncate">{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Custom</div>
          {customColors && (
            <button onClick={() => setCustomColors(null)} className="text-[10px] text-primary hover:underline">
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1">
          {(["primary", "secondary", "accent", "text", "background", "muted"] as const).map((k) => (
            <div key={k}>
              {swatch(k, k)}
              {editing === k && customColors && (
                <div className="mt-2 p-2 rounded-md bg-background/60 border border-border">
                  <HexColorPicker
                    color={customColors[k]}
                    onChange={(c) => setCustomColors({ ...customColors, [k]: c })}
                    style={{ width: "100%", height: 140 }}
                  />
                  <input
                    value={customColors[k]}
                    onChange={(e) => setCustomColors({ ...customColors, [k]: e.target.value })}
                    className="mt-2 w-full rounded-md bg-input border border-border px-2 py-1 text-xs font-mono"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fonts() {
  const { fontPairId, setFontPair } = useCVStore();
  return (
    <div className="space-y-1.5">
      {fontPairs.map((f) => {
        const active = f.id === fontPairId;
        return (
          <button
            key={f.id}
            onClick={() => setFontPair(f.id)}
            className={`w-full text-left rounded-lg p-3 border transition ${
              active ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-background/40"
            }`}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-muted-foreground">{f.name}</span>
              {active && <span className="text-[9px] text-primary">ACTIVE</span>}
            </div>
            <div style={{ fontFamily: `'${f.heading}', serif` }} className="text-lg leading-none">
              {f.heading}
            </div>
            <div style={{ fontFamily: `'${f.body}', sans-serif` }} className="text-[11px] text-muted-foreground mt-0.5">
              {f.body} — The quick brown fox.
            </div>
          </button>
        );
      })}
    </div>
  );
}

import { useState } from "react";
import { useCVStore } from "@/store/cvStore";
import { templates, type TemplateCategory, type TemplateMeta } from "@/components/templates";
import { palettes } from "@/data/palettes";
import { fontPairs } from "@/data/fonts";
import { paperSizes } from "@/data/paperSizes";
import { useI18n } from "@/hooks/useI18n";
import { Palette as PaletteIcon, Type, LayoutTemplate } from "lucide-react";

const templateCategories: Array<"All" | TemplateCategory> = [
  "All",
  ...Array.from(new Set(templates.map((template) => template.category))),
];

export function DesignPanel() {
  const [tab, setTab] = useState<"templates" | "colors" | "fonts">("templates");
  const { m } = useI18n();
  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-3 gap-1 p-1 m-3 mb-2 rounded-lg bg-background/40 border border-border">
        {[
          { id: "templates", icon: LayoutTemplate, label: m.design.tabTemplates },
          { id: "colors", icon: PaletteIcon, label: m.design.tabColors },
          { id: "fonts", icon: Type, label: m.design.tabFonts },
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
  const { m, templateName, templateBlurb, templateCategory, templateCountLabel } = useI18n();
  const [activeCategory, setActiveCategory] = useState<"All" | TemplateCategory>("All");
  const {
    templateId,
    setTemplate,
    paletteId,
    customColors,
    pageSizeId,
    pageSizeMode,
    setPageSize,
    setPageSizeMode,
    compactMode,
    setCompactMode,
  } = useCVStore();
  const palette = customColors ?? palettes.find((p) => p.id === paletteId)!;
  const activeTemplate = templates.find((t) => t.id === templateId) ?? templates[0];
  const autoPaper = paperSizes[activeTemplate.recommendedPaperSizeId ?? "a4"];
  const visibleTemplates = activeCategory === "All"
    ? templates
    : templates.filter((template) => template.category === activeCategory);
  const groupedTemplates = visibleTemplates.reduce<Record<string, TemplateMeta[]>>((groups, template) => {
    groups[template.category] ??= [];
    groups[template.category].push(template);
    return groups;
  }, {});

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{m.design.density}</div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: "auto", label: m.preview.modeAuto },
            { id: "normal", label: m.preview.modeNormal },
            { id: "compact", label: m.preview.modeCompact },
          ].map((m) => {
            const active = compactMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setCompactMode(m.id as "auto" | "normal" | "compact")}
                className={`rounded-md border px-2 py-2 text-[11px] text-left transition ${
                  active ? "border-primary bg-primary/10" : "border-border bg-background/40 hover:border-primary/50"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.design.paper}</div>
          <button
            onClick={() => setPageSizeMode("auto")}
            className={`text-[10px] transition ${pageSizeMode === "auto" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {m.preview.modeAuto} · {autoPaper.name}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Object.values(paperSizes).map((size) => {
            const active = pageSizeMode === "manual" && pageSizeId === size.id;
            return (
              <button
                key={size.id}
                onClick={() => setPageSize(size.id)}
                className={`rounded-md border px-2 py-2 text-left transition ${
                  active ? "border-primary bg-primary/10" : "border-border bg-background/40 hover:border-primary/50"
                }`}
              >
                <div className="text-[11px] font-medium">{size.name}</div>
                <div className="text-[9px] text-muted-foreground">{size.widthMm} × {size.heightMm} mm</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{m.design.categories}</div>
        <div className="flex flex-wrap gap-1.5">
          {templateCategories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-2.5 py-1 text-[10px] transition ${
                  active ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {category === "All" ? m.design.allCategories : templateCategory(category)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedTemplates).map(([category, items]) => {
          if (!items?.length) return null;
          return (
            <section key={category} className="space-y-2">
              {activeCategory === "All" && (
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{templateCategory(category)}</div>
                  <div className="text-[9px] text-muted-foreground">{templateCountLabel(items.length)}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2.5">
                {items.map((t) => {
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
                        <MiniThumb palette={palette} template={t} />
                      </div>
                      <div className="px-2 py-1.5 bg-card space-y-0.5">
                        <div className="text-[11px] font-medium truncate">{templateName(t.id, t.name)}</div>
                        <div className="text-[9px] text-muted-foreground">{templateCategory(t.category)} · {paperSizes[t.recommendedPaperSizeId ?? "a4"].name}</div>
                        {t.blurb && <div className="text-[9px] leading-[1.35] text-muted-foreground line-clamp-2">{templateBlurb(t.id, t.blurb)}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function MiniThumb({
  palette,
  template,
}: {
  palette: { primary: string; accent: string; background: string; muted: string };
  template: TemplateMeta;
}) {
  const lines = (n: number, c = palette.muted, w = "70%") =>
    Array.from({ length: n }).map((_, i) => (
      <div key={i} style={{ background: c, height: 2, width: i === n - 1 ? "40%" : w, borderRadius: 1, marginTop: 3 }} />
    ));
  switch (template.preview) {
    case "dark-band":
      return (
        <div className="absolute inset-0 flex flex-col">
          <div style={{ background: palette.primary, height: "22%" }} />
          <div className="p-2 flex-1">{lines(6)}</div>
        </div>
      );
    case "sidebar":
      return (
        <div className="absolute inset-0 grid grid-cols-[35%_65%]">
          <div style={{ background: palette.primary }} />
          <div className="p-2">{lines(7)}</div>
        </div>
      );
    case "split-hero":
      return (
        <div className="absolute inset-0 p-2">
          <div style={{ background: palette.primary, height: 14, width: "70%", borderRadius: 2 }} />
          <div className="grid grid-cols-[1fr_2fr] gap-1.5 mt-2">
            <div>{lines(4, palette.muted, "90%")}</div>
            <div>{lines(5)}</div>
          </div>
        </div>
      );
    case "grid-cards":
      return (
        <div className="absolute inset-0 p-2">
          <div style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, height: 18, borderRadius: 4 }} />
          <div className="grid grid-cols-3 gap-1 mt-2">
            <div className="col-span-2 rounded p-1" style={{ background: palette.muted + "22" }}>{lines(4)}</div>
            <div className="rounded p-1" style={{ background: palette.muted + "22" }}>{lines(3, palette.muted, "90%")}</div>
          </div>
        </div>
      );
    case "editorial-center":
      return (
        <div className="absolute inset-0 p-2 flex flex-col items-center">
          <div style={{ background: palette.primary, height: 12, width: "60%", borderRadius: 2, marginTop: 6 }} />
          <div style={{ background: palette.accent, height: 2, width: "40%", marginTop: 6 }} />
          <div className="w-full mt-3">{lines(6, palette.muted, "85%")}</div>
        </div>
      );
    case "dense-document":
      return (
        <div className="absolute inset-0 p-2">
          <div style={{ background: palette.primary, height: 10, width: "55%" }} />
          {lines(8, palette.muted, "92%")}
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
  const { m, paletteName } = useI18n();
  const { paletteId, setPalette, customColors, setCustomColors } = useCVStore();

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.design.presets}</div>
          {customColors && (
            <button onClick={() => setCustomColors(null)} className="text-[10px] text-primary hover:underline">
              {m.design.reset}
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {palettes.map((p) => {
            const active = !customColors && paletteId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setPalette(p.id);
                  if (customColors) setCustomColors(null);
                }}
                className={`flex items-center gap-2 p-1.5 rounded-md border transition ${
                  active ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-background/40"
                }`}
              >
                <div className="flex -space-x-1">
                  <span className="w-4 h-4 rounded-full border border-card" style={{ background: p.primary }} />
                  <span className="w-4 h-4 rounded-full border border-card" style={{ background: p.secondary }} />
                  <span className="w-4 h-4 rounded-full border border-card" style={{ background: p.accent }} />
                </div>
                <span className="text-[10.5px] truncate">{paletteName(p.id, p.name)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Fonts() {
  const { m, fontName } = useI18n();
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
              <span className="text-xs text-muted-foreground">{fontName(f.id, f.name)}</span>
              {active && <span className="text-[9px] text-primary">{m.design.active}</span>}
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

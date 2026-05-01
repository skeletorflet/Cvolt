import { AvatarPhoto } from "@/components/AvatarPhoto";
import {
  CertificationsList,
  ContactLine,
  EducationList,
  ExperienceList,
  getVisibleSectionIds,
  LanguagesList,
  ProjectsList,
  SectionBlock,
  SkillsBars,
} from "./_shared";
import type { TemplateProps } from "./index";

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.trim();
  const m6 = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  if (m6) return [parseInt(m6[1], 16), parseInt(m6[2], 16), parseInt(m6[3], 16)];
  const m3 = /^#([a-f\d])([a-f\d])([a-f\d])$/i.exec(h);
  if (m3) {
    return [
      parseInt(m3[1] + m3[1], 16),
      parseInt(m3[2] + m3[2], 16),
      parseInt(m3[3] + m3[3], 16),
    ];
  }
  return null;
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const toHex = (value: number) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixHex(a: string, b: string, amount: number): string {
  const rgbA = hexToRgb(a);
  const rgbB = hexToRgb(b);
  if (!rgbA || !rgbB) return a;
  const t = Math.max(0, Math.min(1, amount));
  return rgbToHex([
    rgbA[0] + (rgbB[0] - rgbA[0]) * t,
    rgbA[1] + (rgbB[1] - rgbA[1]) * t,
    rgbA[2] + (rgbB[2] - rgbA[2]) * t,
  ]);
}

function colorDistance(a: string, b: string): number {
  const rgbA = hexToRgb(a);
  const rgbB = hexToRgb(b);
  if (!rgbA || !rgbB) return 0;
  const dr = rgbA[0] - rgbB[0];
  const dg = rgbA[1] - rgbB[1];
  const db = rgbA[2] - rgbB[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0.5;
  const [r, g, b] = rgb.map((v) => {
    const srgb = v / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getVisibleGradientStop(primary: string, secondary: string, accent: string): string {
  const minDistance = 58;

  if (colorDistance(primary, secondary) >= minDistance) {
    return secondary;
  }

  const accentBlend = mixHex(secondary, accent, 0.55);
  if (colorDistance(primary, accentBlend) >= minDistance) {
    return accentBlend;
  }

  const primaryIsDark = getRelativeLuminance(primary) < 0.45;
  return primaryIsDark ? mixHex(secondary, "#ffffff", 0.34) : mixHex(secondary, "#000000", 0.34);
}

export function NoirContrastTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);
  const gradientStop = getVisibleGradientStop(palette.primary, palette.secondary, palette.accent);
  const isDarkBase = getRelativeLuminance(palette.primary) < 0.35;
  const ink = isDarkBase ? "#f5f3ef" : "#141414";
  const inkSoft = isDarkBase ? "rgba(245,243,239,0.74)" : "rgba(20,20,20,0.68)";
  const surfaceMuted = isDarkBase ? "#d8d3c9" : "#3a3a3a";
  const cardClassName = isDarkBase ? "border border-white/10" : "border border-black/20";

  const noirPalette = {
    ...palette,
    primary: ink,
    muted: surfaceMuted,
    accent: palette.accent,
  };

  const contactPalette = {
    ...noirPalette,
    muted: inkSoft,
  };

  return (
    <div
      className="w-full h-full p-[15mm]"
      style={{
        background: `linear-gradient(160deg, ${palette.primary}, ${gradientStop})`,
        color: ink,
        fontFamily: `'${fonts.body}', sans-serif`,
      }}
    >
      <header
        className="relative mb-5 rounded-[26px] p-5 pr-[122px] border"
        style={{
          borderColor: isDarkBase ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.22)",
          backgroundColor: isDarkBase ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)",
        }}
      >
        <div className="text-[9pt] uppercase tracking-[0.28em] mb-2" style={{ color: inkSoft }}>
          Executive Dark
        </div>
        <h1
          className="text-[29pt] font-semibold leading-none"
          style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: ink }}
        >
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <p className="mt-2 text-[12pt]" style={{ color: inkSoft }}>{personal.title}</p>}
        <ContactLine data={data} palette={contactPalette} className="mt-3" separator="·" />
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={94}
          maxSize={86}
          borderColorFallback={palette.accent}
          className="absolute top-5 right-5"
        />
      </header>

      <div className="grid grid-cols-[1.65fr_1fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? (
                  <SectionBlock key={sectionId} title="Summary" palette={noirPalette} tone="card" className={cardClassName}>
                    <p className="text-[10.4pt] leading-[1.65]">{personal.summary}</p>
                  </SectionBlock>
                ) : null;
              case "experience":
                return data.experience.length ? (
                  <SectionBlock key={sectionId} title="Experience" palette={noirPalette} tone="card" className={cardClassName}>
                    <ExperienceList data={data} palette={noirPalette} />
                  </SectionBlock>
                ) : null;
              case "projects":
                return data.projects.length ? (
                  <SectionBlock key={sectionId} title="Projects" palette={noirPalette} tone="card" className={cardClassName}>
                    <ProjectsList data={data} palette={noirPalette} />
                  </SectionBlock>
                ) : null;
              case "education":
                return data.education.length ? (
                  <SectionBlock key={sectionId} title="Education" palette={noirPalette} tone="card" className={cardClassName}>
                    <EducationList data={data} palette={noirPalette} />
                  </SectionBlock>
                ) : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.skills.length > 0 && (
            <SectionBlock
              title="Strengths"
              palette={noirPalette}
              tone="card"
              className={cardClassName}
            >
              <SkillsBars data={data} palette={noirPalette} />
            </SectionBlock>
          )}
          {data.languages.length > 0 && (
            <SectionBlock title="Languages" palette={noirPalette} tone="card" className={cardClassName}>
              <LanguagesList data={data} palette={noirPalette} />
            </SectionBlock>
          )}
          {data.certifications.length > 0 && (
            <SectionBlock title="Credentials" palette={noirPalette} tone="card" className={cardClassName}>
              <CertificationsList data={data} palette={noirPalette} />
            </SectionBlock>
          )}
        </aside>
      </div>
    </div>
  );
}
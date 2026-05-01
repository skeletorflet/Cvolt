import type { TemplateProps } from "./index";
import { ExperienceList, EducationList, SkillsBars, LanguagesList, ProjectsList, CertificationsList } from "./_shared";
import { AvatarPhoto } from "@/components/AvatarPhoto";
import { useRef, useState, useLayoutEffect } from "react";
import { useI18n } from "@/hooks/useI18n";

export function TechSidebarTemplate({ data, palette, fonts }: TemplateProps) {
  const { m, sectionTitleLabel } = useI18n();
  const { personal, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));
  const codeTitle = (title: string) => `// ${sectionTitleLabel(title).toLowerCase()}`;

  const nameRef = useRef<HTMLHeadingElement>(null);
  const nameWrapRef = useRef<HTMLDivElement>(null);
  const [nameFontSize, setNameFontSize] = useState(20);

  const avatarVisible = !!(data.avatar?.enabled && personal.photo);
  const avatarSize = Math.min(data.avatar?.size ?? 86, 82);

  useLayoutEffect(() => {
    const el = nameRef.current;
    const wrap = nameWrapRef.current;
    if (!el || !wrap || !avatarVisible) {
      setNameFontSize(20);
      return;
    }
    // Reduce font size until name fits in the reserved text column
    const available = wrap.clientWidth;
    let size = 20;
    el.style.fontSize = `${size}pt`;
    while (size > 10 && el.scrollWidth > available) {
      size -= 0.5;
      el.style.fontSize = `${size}pt`;
    }
    setNameFontSize(size);
  }, [personal.name, avatarVisible, avatarSize, fonts.heading]);

  return (
    <div
      className="w-full h-full grid grid-cols-[35%_65%]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      {/* Sidebar */}
      <aside className="relative p-[14mm] space-y-5" style={{ backgroundColor: palette.primary, color: "#fff" }}>
        {/* Avatar: 5px from sidebar right border, aligned with top padding */}
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={avatarSize}
          maxSize={avatarSize}
          borderColorFallback={palette.accent}
          className="absolute right-[5px] top-[14mm]"
        />
        <div
          ref={nameWrapRef}
          style={{ paddingRight: avatarVisible ? `${avatarSize + 10}px` : undefined }}
        >
          <h1
            ref={nameRef}
            className="font-bold leading-tight"
            style={{ fontSize: `${nameFontSize}pt`, fontFamily: `'${fonts.heading}', monospace` }}
          >
            {personal.name || m.common.yourName}
          </h1>
          {personal.title && <div className="text-[10pt] mt-1.5" style={{ color: palette.accent }}>{personal.title}</div>}
        </div>

        <SidebarBlock title={codeTitle("Contact")} palette={palette}>
          <div className="text-[9pt] space-y-0.5 opacity-90">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.github && <div>{personal.github}</div>}
            {personal.website && <div>{personal.website}</div>}
          </div>
        </SidebarBlock>

        {data.skills.length > 0 && (
          <SidebarBlock title={codeTitle("Skills")} palette={palette}>
            <SkillsBars data={data} palette={{ ...palette, muted: "#ffffff66" }} />
          </SidebarBlock>
        )}
        {data.languages.length > 0 && (
          <SidebarBlock title={codeTitle("Languages")} palette={palette}>
            <div className="text-[9.5pt] space-y-0.5 opacity-90">
              {data.languages.map((l) => <div key={l.id}>{l.name} <span style={{ color: palette.accent }}>· {l.level}</span></div>)}
            </div>
          </SidebarBlock>
        )}
        {data.certifications.length > 0 && (
          <SidebarBlock title={codeTitle("Certifications")} palette={palette}>
            <div className="text-[9pt] space-y-0.5 opacity-90">
              {data.certifications.map((c) => <div key={c.id}>{c.name} {c.date && <span style={{ color: palette.accent }}>· {c.date}</span>}</div>)}
            </div>
          </SidebarBlock>
        )}
      </aside>

      {/* Main */}
      <main className="p-[14mm]">
        {visible.map((id) => {
          switch (id) {
            case "summary":
              return personal.summary ? (
                <Section key={id} title={codeTitle("About")} palette={palette}><p className="text-[10.5pt] leading-[1.6]">{personal.summary}</p></Section>
              ) : null;
            case "experience":
              return data.experience.length ? <Section key={id} title={codeTitle("Experience")} palette={palette}><ExperienceList data={data} palette={palette} /></Section> : null;
            case "education":
              return data.education.length ? <Section key={id} title={codeTitle("Education")} palette={palette}><EducationList data={data} palette={palette} /></Section> : null;
            case "projects":
              return data.projects.length ? <Section key={id} title={codeTitle("Projects")} palette={palette}><ProjectsList data={data} palette={palette} /></Section> : null;
            default:
              return null;
          }
        })}
      </main>
    </div>
  );
}

function SidebarBlock({ title, children, palette }: { title: string; children: React.ReactNode; palette: TemplateProps["palette"] }) {
  return (
    <section>
      <h2 className="text-[10pt] mb-1.5 font-mono" style={{ color: palette.accent }}>{title}</h2>
      {children}
    </section>
  );
}

function Section({ title, children, palette }: { title: string; children: React.ReactNode; palette: TemplateProps["palette"] }) {
  return (
    <section className="mb-5">
      <h2 className="text-[12pt] font-bold mb-2 font-mono" style={{ color: palette.accent }}>{title}</h2>
      {children}
    </section>
  );
}

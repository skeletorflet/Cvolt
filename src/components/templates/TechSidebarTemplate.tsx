import type { TemplateProps } from "./index";
import { ExperienceList, EducationList, SkillsBars, LanguagesList, ProjectsList, CertificationsList } from "./_shared";

export function TechSidebarTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));

  return (
    <div
      className="w-full h-full grid grid-cols-[35%_65%]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      {/* Sidebar */}
      <aside className="p-[14mm] space-y-5" style={{ backgroundColor: palette.primary, color: "#fff" }}>
        <div>
          <h1 className="text-[20pt] font-bold leading-tight" style={{ fontFamily: `'${fonts.heading}', monospace` }}>
            {personal.name || "Your Name"}
          </h1>
          {personal.title && <div className="text-[10pt] mt-1.5" style={{ color: palette.accent }}>{personal.title}</div>}
        </div>

        <SidebarBlock title="// contact" palette={palette}>
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
          <SidebarBlock title="// skills" palette={palette}>
            <SkillsBars data={data} palette={{ ...palette, muted: "#ffffff66" }} />
          </SidebarBlock>
        )}
        {data.languages.length > 0 && (
          <SidebarBlock title="// languages" palette={palette}>
            <div className="text-[9.5pt] space-y-0.5 opacity-90">
              {data.languages.map((l) => <div key={l.id}>{l.name} <span style={{ color: palette.accent }}>· {l.level}</span></div>)}
            </div>
          </SidebarBlock>
        )}
        {data.certifications.length > 0 && (
          <SidebarBlock title="// certs" palette={palette}>
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
                <Section key={id} title="// about" palette={palette}><p className="text-[10.5pt] leading-[1.6]">{personal.summary}</p></Section>
              ) : null;
            case "experience":
              return data.experience.length ? <Section key={id} title="// experience" palette={palette}><ExperienceList data={data} palette={palette} /></Section> : null;
            case "education":
              return data.education.length ? <Section key={id} title="// education" palette={palette}><EducationList data={data} palette={palette} /></Section> : null;
            case "projects":
              return data.projects.length ? <Section key={id} title="// projects" palette={palette}><ProjectsList data={data} palette={palette} /></Section> : null;
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

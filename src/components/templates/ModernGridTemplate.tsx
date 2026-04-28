import type { TemplateProps } from "./index";
import { ExperienceList, EducationList, SkillsBars, LanguagesList, ProjectsList, CertificationsList } from "./_shared";

export function ModernGridTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));

  return (
    <div
      className="w-full h-full p-[16mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      {/* Header card */}
      <header
        className="rounded-2xl p-6 mb-5 grid grid-cols-[1fr_auto] items-end gap-6"
        style={{
          background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
          color: "#fff",
        }}
      >
        <div>
          <h1 className="text-[28pt] font-bold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif` }}>
            {personal.name || "Your Name"}
          </h1>
          {personal.title && <div className="text-[12pt] mt-2 opacity-90">{personal.title}</div>}
        </div>
        <div className="text-[9pt] text-right space-y-0.5 opacity-95">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-5">
        <main className="col-span-2 space-y-5">
          {visible.map((id) => {
            switch (id) {
              case "summary":
                return personal.summary ? <Card key={id} title="About" palette={palette}><p className="text-[10.5pt] leading-[1.6]">{personal.summary}</p></Card> : null;
              case "experience":
                return data.experience.length ? <Card key={id} title="Experience" palette={palette}><ExperienceList data={data} palette={palette} /></Card> : null;
              case "education":
                return data.education.length ? <Card key={id} title="Education" palette={palette}><EducationList data={data} palette={palette} /></Card> : null;
              case "projects":
                return data.projects.length ? <Card key={id} title="Projects" palette={palette}><ProjectsList data={data} palette={palette} /></Card> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside className="space-y-5">
          {data.skills.length > 0 && <Card title="Skills" palette={palette}><SkillsBars data={data} palette={palette} /></Card>}
          {data.languages.length > 0 && <Card title="Languages" palette={palette}><LanguagesList data={data} palette={palette} /></Card>}
          {data.certifications.length > 0 && <Card title="Certs" palette={palette}><CertificationsList data={data} palette={palette} /></Card>}
        </aside>
      </div>
    </div>
  );
}

function Card({ title, children, palette }: { title: string; children: React.ReactNode; palette: TemplateProps["palette"] }) {
  return (
    <section className="rounded-xl p-4" style={{ backgroundColor: palette.muted + "12" }}>
      <h2 className="text-[10pt] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: palette.primary }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

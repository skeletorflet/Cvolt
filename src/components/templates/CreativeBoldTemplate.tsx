import type { TemplateProps } from "./index";
import { ExperienceList, EducationList, SkillsTags, LanguagesList, ProjectsList, CertificationsList } from "./_shared";

export function CreativeBoldTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));

  return (
    <div
      className="w-full h-full"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      {/* Big editorial header */}
      <header className="px-[18mm] pt-[18mm] pb-6">
        <div className="text-[10pt] uppercase tracking-[0.3em] mb-2" style={{ color: palette.accent }}>
          Curriculum Vitae
        </div>
        <h1
          className="text-[48pt] font-bold leading-[0.95] tracking-tight"
          style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}
        >
          {personal.name || "Your Name"}
        </h1>
        {personal.title && (
          <div className="text-[14pt] mt-3" style={{ color: palette.secondary }}>{personal.title}</div>
        )}
      </header>

      <div className="px-[18mm] pb-[18mm] grid grid-cols-[1fr_2fr] gap-8">
        {/* Left column */}
        <aside className="space-y-5">
          <Block title="Contact" palette={palette}>
            <div className="text-[9.5pt] space-y-0.5">
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.location && <div>{personal.location}</div>}
              {personal.linkedin && <div>{personal.linkedin}</div>}
              {personal.website && <div>{personal.website}</div>}
            </div>
          </Block>
          {data.skills.length > 0 && <Block title="Skills" palette={palette}><SkillsTags data={data} palette={palette} /></Block>}
          {data.languages.length > 0 && <Block title="Languages" palette={palette}><LanguagesList data={data} palette={palette} /></Block>}
          {data.certifications.length > 0 && <Block title="Certifications" palette={palette}><CertificationsList data={data} palette={palette} /></Block>}
        </aside>

        {/* Right column */}
        <main>
          {visible.map((id) => {
            switch (id) {
              case "summary":
                return personal.summary ? (
                  <Block key={id} title="About" palette={palette}>
                    <p className="text-[11pt] leading-[1.6] italic" style={{ color: palette.secondary }}>"{personal.summary}"</p>
                  </Block>
                ) : null;
              case "experience":
                return data.experience.length ? <Block key={id} title="Experience" palette={palette}><ExperienceList data={data} palette={palette} /></Block> : null;
              case "education":
                return data.education.length ? <Block key={id} title="Education" palette={palette}><EducationList data={data} palette={palette} /></Block> : null;
              case "projects":
                return data.projects.length ? <Block key={id} title="Projects" palette={palette}><ProjectsList data={data} palette={palette} /></Block> : null;
              default:
                return null;
            }
          })}
        </main>
      </div>
    </div>
  );
}

function Block({ title, children, palette }: { title: string; children: React.ReactNode; palette: TemplateProps["palette"] }) {
  return (
    <section className="mb-5">
      <h2 className="text-[12pt] font-bold mb-2 inline-block px-2 py-0.5" style={{ backgroundColor: palette.accent, color: palette.background }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

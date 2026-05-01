import {
  CertificationsList,
  ContactLine,
  EducationList,
  ExperienceList,
  getVisibleSectionIds,
  LanguagesList,
  ProjectsList,
  SectionBlock,
  SkillsTags,
} from "./_shared";
import type { TemplateProps } from "./index";

export function ArtDecoLineTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div className="w-full h-full px-[16mm] py-[15mm]" style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}>
      <div className="mb-5">
        <div className="h-[2px] mb-2" style={{ background: `linear-gradient(90deg, transparent, ${palette.primary}, transparent)` }} />
        <header className="text-center">
          <div className="text-[9pt] uppercase tracking-[0.36em]" style={{ color: palette.secondary }}>Art Deco</div>
          <h1 className="mt-2 text-[30pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: palette.primary }}>{personal.name || "Your Name"}</h1>
          {personal.title && <p className="mt-2 text-[11.5pt]">{personal.title}</p>}
          <ContactLine data={data} palette={palette} className="mt-3 justify-center" separator="◇" />
        </header>
        <div className="h-[2px] mt-3" style={{ background: `linear-gradient(90deg, transparent, ${palette.primary}, transparent)` }} />
      </div>

      <div className="grid grid-cols-[1fr_78mm] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="Profile" palette={palette}><p className="text-[10.4pt] leading-[1.68]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Experience" palette={palette}><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Projects" palette={palette}><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.education.length > 0 && <SectionBlock title="Education" palette={palette} tone="card"><EducationList data={data} palette={palette} /></SectionBlock>}
          {data.skills.length > 0 && <SectionBlock title="Skills" palette={palette} tone="card"><SkillsTags data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette} tone="card"><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Awards" palette={palette} tone="card"><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
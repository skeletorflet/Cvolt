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

export function ResearchDossierTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full px-[18mm] py-[16mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', serif` }}
    >
      <header className="mb-5 pb-3 border-b-2" style={{ borderColor: palette.primary }}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-[25pt] font-semibold" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>
              {personal.name || "Your Name"}
            </h1>
            {personal.title && <p className="mt-1 text-[11.5pt] italic" style={{ color: palette.secondary }}>{personal.title}</p>}
          </div>
          <div className="text-right text-[9.5pt]" style={{ color: palette.muted }}>
            {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
        <ContactLine data={data} palette={palette} className="mt-3" separator="·" />
      </header>

      <div className="grid grid-cols-[1.55fr_0.95fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="Research Statement" palette={palette}><p className="text-[10.2pt] leading-[1.7]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Appointments" palette={palette}><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Research Projects" palette={palette}><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
              case "education":
                return data.education.length ? <SectionBlock key={sectionId} title="Education" palette={palette}><EducationList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.skills.length > 0 && <SectionBlock title="Methods" palette={palette} tone="card"><SkillsTags data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette} tone="card"><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Honors" palette={palette} tone="card"><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
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

export function SignalResumeTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full px-[16mm] py-[14mm]"
      style={{ backgroundColor: "#ffffff", color: "#101114", fontFamily: `'${fonts.body}', sans-serif` }}
    >
      <header className="pb-3 border-b-2 mb-4" style={{ borderColor: palette.primary }}>
        <h1 className="text-[24pt] font-bold tracking-[0.04em]" style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: "#111827" }}>
          {personal.name || "YOUR NAME"}
        </h1>
        {personal.title && <p className="mt-1 text-[11pt] font-medium uppercase tracking-[0.18em]" style={{ color: palette.primary }}>{personal.title}</p>}
        <ContactLine data={data} palette={{ ...palette, muted: "#4b5563" }} className="mt-2" separator="|" />
      </header>

      {visible.map((sectionId) => {
        switch (sectionId) {
          case "summary":
            return personal.summary ? (
              <SectionBlock key={sectionId} title="Summary" palette={palette} titleClassName="text-[10pt] tracking-[0.24em]">
                <p className="text-[10.2pt] leading-[1.55]">{personal.summary}</p>
              </SectionBlock>
            ) : null;
          case "experience":
            return data.experience.length ? (
              <SectionBlock key={sectionId} title="Experience" palette={palette} titleClassName="text-[10pt] tracking-[0.24em]">
                <ExperienceList data={data} palette={palette} compact />
              </SectionBlock>
            ) : null;
          case "projects":
            return data.projects.length ? (
              <SectionBlock key={sectionId} title="Projects" palette={palette} titleClassName="text-[10pt] tracking-[0.24em]">
                <ProjectsList data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "education":
            return data.education.length ? (
              <SectionBlock key={sectionId} title="Education" palette={palette} titleClassName="text-[10pt] tracking-[0.24em]">
                <EducationList data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "skills":
            return data.skills.length ? (
              <SectionBlock key={sectionId} title="Skills" palette={palette} titleClassName="text-[10pt] tracking-[0.24em]">
                <SkillsTags data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "languages":
            return data.languages.length ? (
              <SectionBlock key={sectionId} title="Languages" palette={palette} titleClassName="text-[10pt] tracking-[0.24em]">
                <LanguagesList data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "certifications":
            return data.certifications.length ? (
              <SectionBlock key={sectionId} title="Certifications" palette={palette} titleClassName="text-[10pt] tracking-[0.24em]">
                <CertificationsList data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          default:
            return null;
        }
      })}
    </div>
  );
}
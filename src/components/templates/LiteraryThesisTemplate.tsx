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
  SkillsTags,
} from "./_shared";
import type { TemplateProps } from "./index";

export function LiteraryThesisTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full px-[18mm] py-[16mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', serif` }}
    >
      <header className="text-center border-b pb-4 mb-5 relative" style={{ borderColor: `${palette.primary}44` }}>
        <h1 className="text-[26pt] font-semibold tracking-[0.02em]" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <div className="mt-1 text-[11.5pt] italic" style={{ color: palette.secondary }}>{personal.title}</div>}
        <ContactLine data={data} palette={palette} className="mt-3 justify-center" separator="·" />
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={78}
          maxSize={72}
          borderColorFallback={palette.primary}
          className="absolute top-0 right-0"
        />
      </header>

      {visible.map((sectionId) => {
        switch (sectionId) {
          case "summary":
            return personal.summary ? (
              <SectionBlock key={sectionId} title="Research Profile" palette={palette} className="mb-5" titleClassName="tracking-[0.22em]">
                <p className="text-[10.2pt] leading-[1.7]">{personal.summary}</p>
              </SectionBlock>
            ) : null;
          case "education":
            return data.education.length ? (
              <SectionBlock key={sectionId} title="Education" palette={palette} className="mb-5" titleClassName="tracking-[0.22em]">
                <EducationList data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "experience":
            return data.experience.length ? (
              <SectionBlock key={sectionId} title="Appointments" palette={palette} className="mb-5" titleClassName="tracking-[0.22em]">
                <ExperienceList data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "projects":
            return data.projects.length ? (
              <SectionBlock key={sectionId} title="Publications & Projects" palette={palette} className="mb-5" titleClassName="tracking-[0.22em]">
                <ProjectsList data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "skills":
            return data.skills.length ? (
              <SectionBlock key={sectionId} title="Research Tools" palette={palette} className="mb-5" titleClassName="tracking-[0.22em]">
                <SkillsTags data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "languages":
            return data.languages.length ? (
              <SectionBlock key={sectionId} title="Languages" palette={palette} className="mb-5" titleClassName="tracking-[0.22em]">
                <LanguagesList data={data} palette={palette} />
              </SectionBlock>
            ) : null;
          case "certifications":
            return data.certifications.length ? (
              <SectionBlock key={sectionId} title="Honors & Certifications" palette={palette} className="mb-5" titleClassName="tracking-[0.22em]">
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
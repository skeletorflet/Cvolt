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

export function BoardroomClassicTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full px-[16mm] py-[15mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', serif` }}
    >
      <div className="h-[7px] rounded-full mb-5" style={{ background: `linear-gradient(90deg, ${palette.primary}, ${palette.accent})` }} />

      <header className="relative mb-5 pr-[108px]">
        <h1 className="text-[27pt] font-semibold leading-tight" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <p className="mt-1 text-[12pt]" style={{ color: palette.secondary }}>{personal.title}</p>}
        <ContactLine data={data} palette={palette} className="mt-2" separator="·" />
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={90}
          maxSize={84}
          borderColorFallback={palette.accent}
          className="absolute top-0 right-0"
        />
      </header>

      <div className="grid grid-cols-[1.7fr_0.9fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? (
                  <SectionBlock key={sectionId} title="Executive Profile" palette={palette}>
                    <p className="text-[10.3pt] leading-[1.6]">{personal.summary}</p>
                  </SectionBlock>
                ) : null;
              case "experience":
                return data.experience.length ? (
                  <SectionBlock key={sectionId} title="Professional Experience" palette={palette}>
                    <ExperienceList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "projects":
                return data.projects.length ? (
                  <SectionBlock key={sectionId} title="Selected Projects" palette={palette}>
                    <ProjectsList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "education":
                return data.education.length ? (
                  <SectionBlock key={sectionId} title="Education" palette={palette}>
                    <EducationList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              default:
                return null;
            }
          })}
        </main>

        <aside>
          {data.skills.length > 0 && (
            <SectionBlock title="Core Skills" palette={palette} tone="card">
              <SkillsTags data={data} palette={palette} />
            </SectionBlock>
          )}
          {data.languages.length > 0 && (
            <SectionBlock title="Languages" palette={palette} tone="card">
              <LanguagesList data={data} palette={palette} />
            </SectionBlock>
          )}
          {data.certifications.length > 0 && (
            <SectionBlock title="Credentials" palette={palette} tone="card">
              <CertificationsList data={data} palette={palette} />
            </SectionBlock>
          )}
        </aside>
      </div>
    </div>
  );
}
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

export function NordicMinimalTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      <div className="grid grid-cols-[72mm_1fr] h-full">
        <aside className="h-full px-[12mm] py-[14mm]" style={{ backgroundColor: `${palette.muted}10` }}>
          <AvatarPhoto
            src={personal.photo}
            settings={data.avatar}
            size={94}
            maxSize={88}
            borderColorFallback={palette.primary}
          />
          <h1 className="mt-4 text-[23pt] font-semibold leading-tight" style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: palette.primary }}>
            {personal.name || "Your Name"}
          </h1>
          {personal.title && <p className="mt-1 text-[11pt]" style={{ color: palette.secondary }}>{personal.title}</p>}
          <ContactLine data={data} palette={palette} className="mt-4 flex-col gap-x-0 gap-y-1" separator="" />

          {data.skills.length > 0 && (
            <SectionBlock title="Skills" palette={palette} className="mt-5" titleClassName="text-[9.5pt] tracking-[0.22em]" bodyClassName="pt-1">
              <SkillsTags data={data} palette={palette} />
            </SectionBlock>
          )}
          {data.languages.length > 0 && (
            <SectionBlock title="Languages" palette={palette} titleClassName="text-[9.5pt] tracking-[0.22em]" bodyClassName="pt-1">
              <LanguagesList data={data} palette={palette} />
            </SectionBlock>
          )}
        </aside>

        <main className="px-[14mm] py-[14mm]">
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? (
                  <SectionBlock key={sectionId} title="Profile" palette={palette}>
                    <p className="text-[10.3pt] leading-[1.65]">{personal.summary}</p>
                  </SectionBlock>
                ) : null;
              case "experience":
                return data.experience.length ? (
                  <SectionBlock key={sectionId} title="Experience" palette={palette}>
                    <ExperienceList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "projects":
                return data.projects.length ? (
                  <SectionBlock key={sectionId} title="Selected Work" palette={palette}>
                    <ProjectsList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "education":
                return data.education.length ? (
                  <SectionBlock key={sectionId} title="Education" palette={palette}>
                    <EducationList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "certifications":
                return data.certifications.length ? (
                  <SectionBlock key={sectionId} title="Credentials" palette={palette}>
                    <CertificationsList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              default:
                return null;
            }
          })}
        </main>
      </div>
    </div>
  );
}
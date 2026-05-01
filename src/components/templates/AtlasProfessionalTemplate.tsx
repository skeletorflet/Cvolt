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
  SkillsBars,
} from "./_shared";
import type { TemplateProps } from "./index";
import { useI18n } from "@/hooks/useI18n";

export function AtlasProfessionalTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);
  const { m } = useI18n();

  return (
    <div
      className="w-full h-full p-[16mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      <header className="rounded-[28px] p-6 pr-[126px] mb-5 relative" style={{ backgroundColor: `${palette.primary}10` }}>
        <div className="max-w-[78%]">
          <div className="text-[9pt] uppercase tracking-[0.3em] mb-2" style={{ color: palette.secondary }}>{m.common.professionalResume}</div>
          <h1 className="text-[28pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: palette.primary }}>
            {personal.name || m.common.yourName}
          </h1>
          {personal.title && <p className="mt-2 text-[12pt]" style={{ color: palette.text }}>{personal.title}</p>}
          {personal.summary && <p className="mt-3 text-[10.4pt] leading-[1.65]">{personal.summary}</p>}
          <ContactLine data={data} palette={palette} className="mt-3" separator="·" />
        </div>
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={96}
          maxSize={88}
          borderColorFallback={palette.primary}
          className="absolute top-6 right-6"
        />
      </header>

      <div className="grid grid-cols-[1.65fr_1fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "experience":
                return data.experience.length ? (
                  <SectionBlock key={sectionId} title="Experience" palette={palette} tone="card">
                    <ExperienceList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "projects":
                return data.projects.length ? (
                  <SectionBlock key={sectionId} title="Impact Projects" palette={palette} tone="card">
                    <ProjectsList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "education":
                return data.education.length ? (
                  <SectionBlock key={sectionId} title="Education" palette={palette} tone="card">
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
            <SectionBlock title="Strengths" palette={palette} tone="solid">
              <SkillsBars data={data} palette={{ ...palette, accent: "#ffffff" }} />
            </SectionBlock>
          )}
          {data.languages.length > 0 && (
            <SectionBlock title="Languages" palette={palette} tone="card">
              <LanguagesList data={data} palette={palette} />
            </SectionBlock>
          )}
          {data.certifications.length > 0 && (
            <SectionBlock title="Certifications" palette={palette} tone="card">
              <CertificationsList data={data} palette={palette} />
            </SectionBlock>
          )}
        </aside>
      </div>
    </div>
  );
}
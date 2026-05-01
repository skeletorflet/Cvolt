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

export function RegalSerifTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full px-[18mm] py-[16mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', serif` }}
    >
      <header className="text-center border-y py-4 mb-5 relative" style={{ borderColor: `${palette.primary}40` }}>
        <h1 className="text-[29pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <div className="text-[12pt] mt-2" style={{ color: palette.secondary }}>{personal.title}</div>}
        <ContactLine data={data} palette={palette} className="mt-3 justify-center" separator="·" />
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={78}
          maxSize={72}
          borderColorFallback={palette.accent}
          className="absolute top-4 right-0"
        />
      </header>

      <div className="grid grid-cols-[1.55fr_0.95fr] gap-6">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? (
                  <SectionBlock key={sectionId} title="Profile" palette={palette}>
                    <p className="text-[10.4pt] leading-[1.72]">{personal.summary}</p>
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
                  <SectionBlock key={sectionId} title="Selected Projects" palette={palette}>
                    <ProjectsList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.education.length > 0 && <SectionBlock title="Education" palette={palette} tone="card"><EducationList data={data} palette={palette} /></SectionBlock>}
          {data.skills.length > 0 && <SectionBlock title="Capabilities" palette={palette} tone="card"><SkillsTags data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette} tone="card"><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Awards" palette={palette} tone="card"><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
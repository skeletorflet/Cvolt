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

export function IvoryExecutiveTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full px-[17mm] py-[15mm]"
      style={{ backgroundColor: "#fffdf8", color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      <header className="relative mb-5 rounded-[24px] border p-5 pr-[122px]" style={{ borderColor: `${palette.primary}30` }}>
        <div className="text-[9pt] uppercase tracking-[0.28em] mb-2" style={{ color: palette.secondary }}>Executive Resume</div>
        <h1 className="text-[29pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <p className="mt-2 text-[12pt]">{personal.title}</p>}
        <ContactLine data={data} palette={palette} className="mt-3" separator="·" />
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={94}
          maxSize={86}
          borderColorFallback={palette.primary}
          className="absolute top-5 right-5"
        />
      </header>

      <div className="grid grid-cols-[1.7fr_1fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="Leadership Profile" palette={palette}><p className="text-[10.4pt] leading-[1.65]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Career History" palette={palette}><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Strategic Initiatives" palette={palette}><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
              case "education":
                return data.education.length ? <SectionBlock key={sectionId} title="Education" palette={palette}><EducationList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.skills.length > 0 && <SectionBlock title="Strengths" palette={palette} tone="card"><SkillsBars data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette} tone="card"><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Credentials" palette={palette} tone="card"><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
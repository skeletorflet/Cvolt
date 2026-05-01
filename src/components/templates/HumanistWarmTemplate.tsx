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

export function HumanistWarmTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div className="w-full h-full p-[15mm]" style={{ backgroundColor: "#fcf7ef", color: "#3f342d", fontFamily: `'${fonts.body}', sans-serif` }}>
      <header className="mb-5 rounded-[28px] p-5 pr-[118px] relative" style={{ backgroundColor: "#fffaf4" }}>
        <h1 className="text-[28pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>{personal.name || "Your Name"}</h1>
        {personal.title && <p className="mt-2 text-[11.5pt]" style={{ color: palette.secondary }}>{personal.title}</p>}
        {personal.summary && <p className="mt-3 text-[10.3pt] leading-[1.68] max-w-[82%]">{personal.summary}</p>}
        <ContactLine data={data} palette={{ ...palette, muted: "#7d695b" }} className="mt-3" separator="·" />
        <AvatarPhoto src={personal.photo} settings={data.avatar} size={92} maxSize={84} borderColorFallback={palette.primary} className="absolute top-5 right-5" />
      </header>

      <div className="grid grid-cols-[1.5fr_1fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Experience" palette={palette} tone="card" className="bg-white/80"><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Projects" palette={palette} tone="card" className="bg-white/80"><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
              case "education":
                return data.education.length ? <SectionBlock key={sectionId} title="Education" palette={palette} tone="card" className="bg-white/80"><EducationList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.skills.length > 0 && <SectionBlock title="Skills" palette={palette}><SkillsTags data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette}><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Recognition" palette={palette}><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
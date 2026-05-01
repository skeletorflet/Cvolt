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

export function NeoBrutalBriefTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div className="w-full h-full p-[14mm]" style={{ backgroundColor: "#fffef5", color: "#111111", fontFamily: `'${fonts.body}', sans-serif` }}>
      <header className="mb-4 border-[3px] border-black rounded-[24px] p-5 shadow-[8px_8px_0_#111111] bg-[#ffe55c]">
        <h1 className="text-[30pt] font-bold leading-none uppercase" style={{ fontFamily: `'${fonts.heading}', sans-serif` }}>{personal.name || "Your Name"}</h1>
        {personal.title && <p className="mt-2 text-[12pt] font-semibold uppercase tracking-[0.16em]">{personal.title}</p>}
        <ContactLine data={data} palette={{ ...palette, muted: "#111111" }} className="mt-3" separator="/" />
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div>
          {personal.summary && <SectionBlock title="About" palette={palette} tone="card" className="border-[3px] border-black shadow-[6px_6px_0_#111111] bg-white"><p className="text-[10.4pt] leading-[1.64]">{personal.summary}</p></SectionBlock>}
          {data.experience.length > 0 && <SectionBlock title="Experience" palette={palette} tone="card" className="border-[3px] border-black shadow-[6px_6px_0_#111111] bg-white"><ExperienceList data={data} palette={palette} /></SectionBlock>}
          {data.projects.length > 0 && <SectionBlock title="Projects" palette={palette} tone="card" className="border-[3px] border-black shadow-[6px_6px_0_#111111] bg-white"><ProjectsList data={data} palette={palette} /></SectionBlock>}
        </div>
        <div>
          {data.education.length > 0 && <SectionBlock title="Education" palette={palette} tone="card" className="border-[3px] border-black shadow-[6px_6px_0_#111111] bg-white"><EducationList data={data} palette={palette} /></SectionBlock>}
          {data.skills.length > 0 && <SectionBlock title="Skills" palette={palette} tone="card" className="border-[3px] border-black shadow-[6px_6px_0_#111111] bg-white"><SkillsTags data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette} tone="card" className="border-[3px] border-black shadow-[6px_6px_0_#111111] bg-white"><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Awards" palette={palette} tone="card" className="border-[3px] border-black shadow-[6px_6px_0_#111111] bg-white"><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </div>
      </div>
    </div>
  );
}
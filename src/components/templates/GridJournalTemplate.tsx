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

export function GridJournalTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full p-[15mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      <header className="mb-4 grid grid-cols-[1fr_auto] gap-4 items-end rounded-[26px] p-5" style={{ backgroundColor: `${palette.primary}10` }}>
        <div>
          <h1 className="text-[27pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: palette.primary }}>{personal.name || "Your Name"}</h1>
          {personal.title && <p className="mt-2 text-[11.5pt]">{personal.title}</p>}
          <ContactLine data={data} palette={palette} className="mt-3" separator="·" />
        </div>
        <AvatarPhoto src={personal.photo} settings={data.avatar} size={86} maxSize={80} borderColorFallback={palette.primary} />
      </header>

      <div className="grid grid-cols-2 gap-4 auto-rows-min">
        {visible.map((sectionId) => {
          switch (sectionId) {
            case "summary":
              return personal.summary ? <SectionBlock key={sectionId} title="Overview" palette={palette} tone="card" className="col-span-2"><p className="text-[10.4pt] leading-[1.65]">{personal.summary}</p></SectionBlock> : null;
            case "experience":
              return data.experience.length ? <SectionBlock key={sectionId} title="Experience" palette={palette} tone="card" className="col-span-2"><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
            case "projects":
              return data.projects.length ? <SectionBlock key={sectionId} title="Projects" palette={palette} tone="card"><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
            case "education":
              return data.education.length ? <SectionBlock key={sectionId} title="Education" palette={palette} tone="card"><EducationList data={data} palette={palette} /></SectionBlock> : null;
            case "skills":
              return data.skills.length ? <SectionBlock key={sectionId} title="Skills" palette={palette} tone="card"><SkillsTags data={data} palette={palette} /></SectionBlock> : null;
            case "languages":
              return data.languages.length ? <SectionBlock key={sectionId} title="Languages" palette={palette} tone="card"><LanguagesList data={data} palette={palette} /></SectionBlock> : null;
            case "certifications":
              return data.certifications.length ? <SectionBlock key={sectionId} title="Credentials" palette={palette} tone="card"><CertificationsList data={data} palette={palette} /></SectionBlock> : null;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
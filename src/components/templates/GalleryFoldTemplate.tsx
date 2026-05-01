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

export function GalleryFoldTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div className="w-full h-full p-[15mm]" style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}>
      <header className="mb-5 grid grid-cols-[92px_1fr] gap-4 items-center">
        <AvatarPhoto src={personal.photo} settings={data.avatar} size={92} maxSize={86} borderColorFallback={palette.primary} />
        <div className="rounded-[24px] p-5" style={{ backgroundColor: `${palette.accent}14` }}>
          <h1 className="text-[28pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>{personal.name || "Your Name"}</h1>
          {personal.title && <p className="mt-2 text-[11.5pt]">{personal.title}</p>}
          <ContactLine data={data} palette={palette} className="mt-3" separator="·" />
        </div>
      </header>

      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <div>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="Narrative" palette={palette} tone="card"><p className="text-[10.4pt] leading-[1.68]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Experience" palette={palette} tone="card"><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "education":
                return data.education.length ? <SectionBlock key={sectionId} title="Education" palette={palette} tone="card"><EducationList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </div>
        <div>
          {data.projects.length > 0 && <SectionBlock title="Portfolio" palette={palette} tone="solid"><ProjectsList data={data} palette={{ ...palette, primary: "#ffffff", accent: "#ffffff", muted: "rgba(255,255,255,0.74)" }} /></SectionBlock>}
          {data.skills.length > 0 && <SectionBlock title="Craft" palette={palette} tone="card"><SkillsTags data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette} tone="card"><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Recognition" palette={palette} tone="card"><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </div>
      </div>
    </div>
  );
}
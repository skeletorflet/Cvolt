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

export function StudioCanvasTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div className="w-full h-full p-[14mm]" style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}>
      <div className="grid grid-cols-[78mm_1fr] gap-4 h-full">
        <aside className="rounded-[28px] p-5 text-white" style={{ background: `linear-gradient(160deg, ${palette.primary}, ${palette.secondary})` }}>
          <AvatarPhoto src={personal.photo} settings={data.avatar} size={96} maxSize={88} borderColorFallback="#ffffff" />
          <h1 className="mt-4 text-[26pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif` }}>{personal.name || "Your Name"}</h1>
          {personal.title && <p className="mt-2 text-[11.5pt] opacity-95">{personal.title}</p>}
          <ContactLine data={data} palette={{ ...palette, muted: "rgba(255,255,255,0.82)" }} className="mt-4" separator="·" />
          {data.skills.length > 0 && <SectionBlock title="Creative Toolkit" palette={palette} tone="solid" className="mt-5 bg-white/10" titleClassName="text-white border-white/30"><SkillsTags data={data} palette={{ ...palette, primary: "#ffffff", accent: "#ffffff" }} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette} tone="solid" className="bg-white/10" titleClassName="text-white border-white/30"><LanguagesList data={data} palette={{ ...palette, primary: "#ffffff", muted: "rgba(255,255,255,0.74)" }} /></SectionBlock>}
        </aside>

        <main className="py-1">
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="Statement" palette={palette} tone="card"><p className="text-[10.4pt] leading-[1.68]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Experience" palette={palette} tone="card"><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Featured Work" palette={palette} tone="card"><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
              case "education":
                return data.education.length ? <SectionBlock key={sectionId} title="Education" palette={palette} tone="card"><EducationList data={data} palette={palette} /></SectionBlock> : null;
              case "certifications":
                return data.certifications.length ? <SectionBlock key={sectionId} title="Awards" palette={palette} tone="card"><CertificationsList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
      </div>
    </div>
  );
}
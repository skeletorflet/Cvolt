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

export function PosterPersonaTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div className="w-full h-full p-[14mm]" style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}>
      <header className="mb-5 rounded-[30px] p-6 relative overflow-hidden" style={{ background: `linear-gradient(120deg, ${palette.primary}, ${palette.accent})`, color: "#ffffff" }}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute right-5 bottom-5"><AvatarPhoto src={personal.photo} settings={data.avatar} size={90} maxSize={82} borderColorFallback="#ffffff" /></div>
        <div className="max-w-[75%] relative z-10">
          <div className="text-[9pt] uppercase tracking-[0.35em] opacity-80">Poster CV</div>
          <h1 className="mt-3 text-[34pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif` }}>{personal.name || "Your Name"}</h1>
          {personal.title && <p className="mt-2 text-[12pt] opacity-95">{personal.title}</p>}
          <ContactLine data={data} palette={{ ...palette, muted: "rgba(255,255,255,0.82)" }} className="mt-4" separator="·" />
        </div>
      </header>

      <div className="grid grid-cols-[1.4fr_1fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="Manifesto" palette={palette} tone="card"><p className="text-[10.4pt] leading-[1.68]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Experience" palette={palette} tone="card"><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Projects" palette={palette} tone="card"><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.education.length > 0 && <SectionBlock title="Education" palette={palette}><EducationList data={data} palette={palette} /></SectionBlock>}
          {data.skills.length > 0 && <SectionBlock title="Skills" palette={palette}><SkillsTags data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette}><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Awards" palette={palette}><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
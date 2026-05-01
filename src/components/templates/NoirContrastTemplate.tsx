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

export function NoirContrastTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);
  const darkPalette = { ...palette, primary: "#ffffff", muted: "rgba(255,255,255,0.68)", accent: "#f4c26b" };

  return (
    <div className="w-full h-full p-[15mm]" style={{ backgroundColor: "#111214", color: "#f5f3ef", fontFamily: `'${fonts.body}', sans-serif` }}>
      <header className="relative mb-5 rounded-[26px] p-5 pr-[122px] border" style={{ borderColor: "rgba(255,255,255,0.16)", backgroundColor: "rgba(255,255,255,0.04)" }}>
        <div className="text-[9pt] uppercase tracking-[0.28em] mb-2" style={{ color: "rgba(255,255,255,0.68)" }}>Executive Dark</div>
        <h1 className="text-[29pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: "#ffffff" }}>{personal.name || "Your Name"}</h1>
        {personal.title && <p className="mt-2 text-[12pt] text-white/85">{personal.title}</p>}
        <ContactLine data={data} palette={darkPalette} className="mt-3" separator="·" />
        <AvatarPhoto src={personal.photo} settings={data.avatar} size={94} maxSize={86} borderColorFallback="#f4c26b" className="absolute top-5 right-5" />
      </header>

      <div className="grid grid-cols-[1.65fr_1fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="Summary" palette={darkPalette} tone="card" className="bg-white/5"><p className="text-[10.4pt] leading-[1.65]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Experience" palette={darkPalette} tone="card" className="bg-white/5"><ExperienceList data={data} palette={darkPalette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Projects" palette={darkPalette} tone="card" className="bg-white/5"><ProjectsList data={data} palette={darkPalette} /></SectionBlock> : null;
              case "education":
                return data.education.length ? <SectionBlock key={sectionId} title="Education" palette={darkPalette} tone="card" className="bg-white/5"><EducationList data={data} palette={darkPalette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.skills.length > 0 && <SectionBlock title="Strengths" palette={darkPalette} tone="solid"><SkillsBars data={data} palette={darkPalette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={darkPalette} tone="card" className="bg-white/5"><LanguagesList data={data} palette={darkPalette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Credentials" palette={darkPalette} tone="card" className="bg-white/5"><CertificationsList data={data} palette={darkPalette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
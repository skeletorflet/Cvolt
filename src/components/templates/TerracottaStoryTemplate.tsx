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

export function TerracottaStoryTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div className="w-full h-full p-[15mm]" style={{ backgroundColor: "#fff7f2", color: "#3e302a", fontFamily: `'${fonts.body}', sans-serif` }}>
      <header className="mb-5 rounded-[30px] overflow-hidden">
        <div className="grid grid-cols-[1.1fr_0.9fr] items-stretch">
          <div className="p-6" style={{ backgroundColor: "#d96f4d", color: "#fff7f2" }}>
            <div className="text-[9pt] uppercase tracking-[0.3em] opacity-80">Story Resume</div>
            <h1 className="mt-3 text-[29pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', serif` }}>{personal.name || "Your Name"}</h1>
            {personal.title && <p className="mt-2 text-[11.5pt] opacity-95">{personal.title}</p>}
            <ContactLine data={data} palette={{ ...palette, muted: "rgba(255,247,242,0.82)" }} className="mt-4" separator="·" />
          </div>
          <div className="flex items-center justify-center p-5" style={{ backgroundColor: "#f4ddcf" }}>
            <AvatarPhoto src={personal.photo} settings={data.avatar} size={108} maxSize={94} borderColorFallback="#d96f4d" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-[1.45fr_1fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="Profile" palette={palette} tone="card" className="bg-white/85"><p className="text-[10.4pt] leading-[1.68]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Experience" palette={palette} tone="card" className="bg-white/85"><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Projects" palette={palette} tone="card" className="bg-white/85"><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
              case "education":
                return data.education.length ? <SectionBlock key={sectionId} title="Education" palette={palette} tone="card" className="bg-white/85"><EducationList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.skills.length > 0 && <SectionBlock title="Craft" palette={palette}><SkillsTags data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette}><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Recognition" palette={palette}><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
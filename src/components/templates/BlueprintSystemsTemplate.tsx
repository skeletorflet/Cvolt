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

export function BlueprintSystemsTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full px-[15mm] py-[14mm]"
      style={{
        backgroundColor: "#f7fbff",
        color: palette.text,
        fontFamily: `'${fonts.body}', sans-serif`,
        backgroundImage: `linear-gradient(${palette.muted}10 1px, transparent 1px), linear-gradient(90deg, ${palette.muted}10 1px, transparent 1px)`,
        backgroundSize: "22px 22px",
      }}
    >
      <header className="mb-4 border rounded-[20px] p-5" style={{ borderColor: `${palette.primary}30`, backgroundColor: "rgba(255,255,255,0.78)" }}>
        <div className="flex items-end justify-between gap-5">
          <div>
            <div className="text-[9pt] uppercase tracking-[0.28em]" style={{ color: palette.secondary }}>Systems Resume</div>
            <h1 className="mt-2 text-[27pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: palette.primary }}>{personal.name || "Your Name"}</h1>
            {personal.title && <p className="mt-2 text-[11.5pt]">{personal.title}</p>}
          </div>
          <div className="text-right text-[9.5pt]" style={{ color: palette.muted }}>
            {[personal.email, personal.phone, personal.location, personal.github].filter(Boolean).map((item) => <div key={item}>{item}</div>)}
          </div>
        </div>
        <ContactLine data={data} palette={palette} className="mt-3" separator="|" />
      </header>

      <div className="grid grid-cols-[1.55fr_1fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? <SectionBlock key={sectionId} title="System Overview" palette={palette}><p className="text-[10.3pt] leading-[1.62]">{personal.summary}</p></SectionBlock> : null;
              case "experience":
                return data.experience.length ? <SectionBlock key={sectionId} title="Delivery History" palette={palette}><ExperienceList data={data} palette={palette} /></SectionBlock> : null;
              case "projects":
                return data.projects.length ? <SectionBlock key={sectionId} title="Deployments" palette={palette}><ProjectsList data={data} palette={palette} /></SectionBlock> : null;
              case "education":
                return data.education.length ? <SectionBlock key={sectionId} title="Training" palette={palette}><EducationList data={data} palette={palette} /></SectionBlock> : null;
              default:
                return null;
            }
          })}
        </main>
        <aside>
          {data.skills.length > 0 && <SectionBlock title="Toolchain" palette={palette} tone="card"><SkillsBars data={data} palette={palette} /></SectionBlock>}
          {data.languages.length > 0 && <SectionBlock title="Languages" palette={palette} tone="card"><LanguagesList data={data} palette={palette} /></SectionBlock>}
          {data.certifications.length > 0 && <SectionBlock title="Certifications" palette={palette} tone="card"><CertificationsList data={data} palette={palette} /></SectionBlock>}
        </aside>
      </div>
    </div>
  );
}
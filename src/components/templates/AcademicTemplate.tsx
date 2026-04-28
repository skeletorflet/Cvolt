import type { TemplateProps } from "./index";
import { ExperienceList, EducationList, SkillsTags, LanguagesList, ProjectsList, CertificationsList } from "./_shared";

export function AcademicTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));

  return (
    <div
      className="w-full h-full p-[20mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', serif` }}
    >
      <header className="mb-5">
        <h1 className="text-[22pt] font-bold" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <div className="text-[11pt]" style={{ color: palette.secondary }}>{personal.title}</div>}
        <div className="text-[9.5pt] mt-1" style={{ color: palette.muted }}>
          {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join(" · ")}
        </div>
      </header>

      {visible.map((id) => {
        const Heading = (t: string) => (
          <h2 className="text-[11pt] font-bold uppercase tracking-wider mb-1.5 mt-4 pb-0.5 border-b" style={{ borderColor: palette.primary, color: palette.primary }}>
            {t}
          </h2>
        );
        switch (id) {
          case "summary":
            return personal.summary ? <section key={id}>{Heading("Research Statement")}<p className="text-[10pt] leading-[1.55]">{personal.summary}</p></section> : null;
          case "education":
            return data.education.length ? <section key={id}>{Heading("Education")}<EducationList data={data} palette={palette} /></section> : null;
          case "experience":
            return data.experience.length ? <section key={id}>{Heading("Appointments")}<ExperienceList data={data} palette={palette} /></section> : null;
          case "projects":
            return data.projects.length ? <section key={id}>{Heading("Research / Projects")}<ProjectsList data={data} palette={palette} /></section> : null;
          case "certifications":
            return data.certifications.length ? <section key={id}>{Heading("Awards & Certifications")}<CertificationsList data={data} palette={palette} /></section> : null;
          case "skills":
            return data.skills.length ? <section key={id}>{Heading("Technical Skills")}<SkillsTags data={data} palette={palette} /></section> : null;
          case "languages":
            return data.languages.length ? <section key={id}>{Heading("Languages")}<LanguagesList data={data} palette={palette} /></section> : null;
          default:
            return null;
        }
      })}
    </div>
  );
}

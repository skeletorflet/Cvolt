import type { TemplateProps } from "./index";
import { ExperienceList, EducationList, SkillsTags, LanguagesList, ProjectsList, CertificationsList } from "./_shared";

export function MinimalSwissTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));

  const block = (title: string, children: React.ReactNode) => (
    <div key={title} className="grid grid-cols-[80px_1fr] gap-6 mb-5">
      <div className="text-[9pt] uppercase tracking-[0.2em] pt-0.5" style={{ color: palette.muted }}>
        {title}
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div
      className="w-full h-full p-[20mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      <header className="mb-8">
        <h1 className="text-[26pt] font-medium leading-none tracking-tight" style={{ fontFamily: `'${fonts.heading}', sans-serif`, color: palette.primary }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <div className="text-[11pt] mt-2" style={{ color: palette.muted }}>{personal.title}</div>}
      </header>

      {block("Contact", (
        <div className="text-[10pt] space-y-0.5">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
          {personal.website && <div>{personal.website}</div>}
        </div>
      ))}

      {visible.map((id) => {
        switch (id) {
          case "summary":
            return personal.summary ? block("About", <p className="text-[10.5pt] leading-[1.6]">{personal.summary}</p>) : null;
          case "experience":
            return data.experience.length ? block("Work", <ExperienceList data={data} palette={palette} />) : null;
          case "education":
            return data.education.length ? block("Studies", <EducationList data={data} palette={palette} />) : null;
          case "skills":
            return data.skills.length ? block("Skills", <SkillsTags data={data} palette={palette} />) : null;
          case "languages":
            return data.languages.length ? block("Lang", <LanguagesList data={data} palette={palette} />) : null;
          case "projects":
            return data.projects.length ? block("Work", <ProjectsList data={data} palette={palette} />) : null;
          case "certifications":
            return data.certifications.length ? block("Certs", <CertificationsList data={data} palette={palette} />) : null;
          default:
            return null;
        }
      })}
    </div>
  );
}

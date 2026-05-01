import {
  CertificationsList,
  ContactLine,
  EducationList,
  ExperienceList,
  getVisibleSectionIds,
  LanguagesList,
  ProjectsList,
  SkillsBars,
} from "./_shared";
import type { TemplateProps } from "./index";

function LedgerRow({ label, children, muted }: { label: string; children: React.ReactNode; muted: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-5 mb-5">
      <div className="text-[9pt] uppercase tracking-[0.24em] pt-1" style={{ color: muted }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

export function ColumnLedgerTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div className="w-full h-full px-[18mm] py-[16mm]" style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}>
      <header className="mb-6 border-b-2 pb-4" style={{ borderColor: `${palette.primary}60` }}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-[27pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>{personal.name || "Your Name"}</h1>
            {personal.title && <p className="mt-2 text-[11.5pt]">{personal.title}</p>}
          </div>
          <div className="text-right text-[9.5pt]" style={{ color: palette.muted }}>
            {[personal.email, personal.phone, personal.location, personal.linkedin].filter(Boolean).map((item) => <div key={item}>{item}</div>)}
          </div>
        </div>
        <ContactLine data={data} palette={palette} className="mt-3" separator="·" />
      </header>

      {visible.map((sectionId) => {
        switch (sectionId) {
          case "summary":
            return personal.summary ? <LedgerRow key={sectionId} label="Profile" muted={palette.muted}><p className="text-[10.3pt] leading-[1.64]">{personal.summary}</p></LedgerRow> : null;
          case "experience":
            return data.experience.length ? <LedgerRow key={sectionId} label="Experience" muted={palette.muted}><ExperienceList data={data} palette={palette} /></LedgerRow> : null;
          case "education":
            return data.education.length ? <LedgerRow key={sectionId} label="Education" muted={palette.muted}><EducationList data={data} palette={palette} /></LedgerRow> : null;
          case "projects":
            return data.projects.length ? <LedgerRow key={sectionId} label="Projects" muted={palette.muted}><ProjectsList data={data} palette={palette} /></LedgerRow> : null;
          case "skills":
            return data.skills.length ? <LedgerRow key={sectionId} label="Skills" muted={palette.muted}><SkillsBars data={data} palette={palette} /></LedgerRow> : null;
          case "languages":
            return data.languages.length ? <LedgerRow key={sectionId} label="Languages" muted={palette.muted}><LanguagesList data={data} palette={palette} /></LedgerRow> : null;
          case "certifications":
            return data.certifications.length ? <LedgerRow key={sectionId} label="Awards" muted={palette.muted}><CertificationsList data={data} palette={palette} /></LedgerRow> : null;
          default:
            return null;
        }
      })}
    </div>
  );
}
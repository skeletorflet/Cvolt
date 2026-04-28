import type { TemplateProps } from "./index";
import {
  ExperienceList,
  EducationList,
  SkillsTags,
  LanguagesList,
  ProjectsList,
  CertificationsList,
} from "./_shared";

export function ExecutiveDarkTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));

  const renderSection = (id: string) => {
    switch (id) {
      case "summary":
        return personal.summary ? (
          <Section key={id} title="Profile" palette={palette}>
            <p className="text-[10.5pt] leading-[1.6]">{personal.summary}</p>
          </Section>
        ) : null;
      case "experience":
        return (
          <Section key={id} title="Experience" palette={palette}>
            <ExperienceList data={data} palette={palette} />
          </Section>
        );
      case "education":
        return data.education.length ? (
          <Section key={id} title="Education" palette={palette}>
            <EducationList data={data} palette={palette} />
          </Section>
        ) : null;
      case "skills":
        return data.skills.length ? (
          <Section key={id} title="Expertise" palette={palette}>
            <SkillsTags data={data} palette={palette} />
          </Section>
        ) : null;
      case "languages":
        return data.languages.length ? (
          <Section key={id} title="Languages" palette={palette}>
            <LanguagesList data={data} palette={palette} />
          </Section>
        ) : null;
      case "projects":
        return data.projects.length ? (
          <Section key={id} title="Selected Work" palette={palette}>
            <ProjectsList data={data} palette={palette} />
          </Section>
        ) : null;
      case "certifications":
        return data.certifications.length ? (
          <Section key={id} title="Certifications" palette={palette}>
            <CertificationsList data={data} palette={palette} />
          </Section>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: `'${fonts.body}', sans-serif`,
      }}
    >
      {/* Dark header band */}
      <header
        className="px-[18mm] py-6"
        style={{ backgroundColor: palette.primary, color: "#fff" }}
      >
        <h1
          className="text-[30pt] font-bold tracking-tight leading-none"
          style={{ fontFamily: `'${fonts.heading}', serif` }}
        >
          {personal.name || "Your Name"}
        </h1>
        {personal.title && (
          <div className="text-[12pt] mt-1.5 opacity-90 tracking-wide uppercase" style={{ color: palette.accent }}>
            {personal.title}
          </div>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[9.5pt] mt-3 opacity-85">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>
      <div className="px-[18mm] py-6">{visible.map(renderSection)}</div>
    </div>
  );
}

function Section({ title, children, palette }: { title: string; children: React.ReactNode; palette: TemplateProps["palette"] }) {
  return (
    <section className="mb-5">
      <div className="flex items-center gap-3 mb-2.5">
        <div className="h-[2px] w-6" style={{ backgroundColor: palette.accent }} />
        <h2 className="text-[10.5pt] font-bold uppercase tracking-[0.2em]" style={{ color: palette.primary }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

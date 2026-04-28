import type { TemplateProps } from "./index";

const dateRange = (s: string, e: string, current: boolean) =>
  [s, current ? "Present" : e].filter(Boolean).join(" — ");

export function CorporateTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal, experience, education, skills, languages, projects, certifications, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));

  const renderSection = (id: string) => {
    switch (id) {
      case "summary":
        return personal.summary ? (
          <Section key={id} title="Profile" palette={palette}>
            <p className="text-[10.5pt] leading-[1.55]">{personal.summary}</p>
          </Section>
        ) : null;
      case "experience":
        return experience.length ? (
          <Section key={id} title="Experience" palette={palette}>
            {experience.map((e) => (
              <div key={e.id} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <h3 className="font-semibold text-[11pt]" style={{ color: palette.primary }}>{e.role || "Role"}</h3>
                  <span className="text-[9.5pt]" style={{ color: palette.muted }}>{dateRange(e.start, e.end, e.current)}</span>
                </div>
                <div className="flex justify-between items-baseline gap-3 mb-1">
                  <span className="text-[10.5pt] italic">{e.company}</span>
                  {e.location && <span className="text-[9.5pt]" style={{ color: palette.muted }}>{e.location}</span>}
                </div>
                <ul className="list-disc pl-4 space-y-0.5">
                  {e.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-[10pt] leading-[1.5]">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        ) : null;
      case "education":
        return education.length ? (
          <Section key={id} title="Education" palette={palette}>
            {education.map((e) => (
              <div key={e.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <h3 className="font-semibold text-[11pt]" style={{ color: palette.primary }}>{e.degree || "Degree"} {e.field && `— ${e.field}`}</h3>
                  <span className="text-[9.5pt]" style={{ color: palette.muted }}>{dateRange(e.start, e.end, false)}</span>
                </div>
                <div className="text-[10.5pt] italic">{e.school}</div>
                {e.details && <p className="text-[10pt] leading-[1.5] mt-0.5">{e.details}</p>}
              </div>
            ))}
          </Section>
        ) : null;
      case "skills":
        return skills.length ? (
          <Section key={id} title="Skills" palette={palette}>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s.id} className="text-[9.5pt] px-2 py-0.5 rounded" style={{ backgroundColor: palette.accent + "22", color: palette.primary }}>
                  {s.name}
                </span>
              ))}
            </div>
          </Section>
        ) : null;
      case "languages":
        return languages.length ? (
          <Section key={id} title="Languages" palette={palette}>
            <div className="grid grid-cols-2 gap-y-1">
              {languages.map((l) => (
                <div key={l.id} className="text-[10pt]"><span className="font-medium">{l.name}</span> <span style={{ color: palette.muted }}>— {l.level}</span></div>
              ))}
            </div>
          </Section>
        ) : null;
      case "projects":
        return projects.length ? (
          <Section key={id} title="Projects" palette={palette}>
            {projects.map((p) => (
              <div key={p.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-[11pt]" style={{ color: palette.primary }}>{p.name}</h3>
                  {p.url && <span className="text-[9.5pt]" style={{ color: palette.accent }}>{p.url}</span>}
                </div>
                <p className="text-[10pt] leading-[1.5]">{p.description}</p>
                {p.tech.length > 0 && <div className="text-[9.5pt] mt-0.5" style={{ color: palette.muted }}>{p.tech.join(" · ")}</div>}
              </div>
            ))}
          </Section>
        ) : null;
      case "certifications":
        return certifications.length ? (
          <Section key={id} title="Certifications" palette={palette}>
            {certifications.map((c) => (
              <div key={c.id} className="text-[10pt] mb-0.5">
                <span className="font-medium">{c.name}</span>
                {c.issuer && <span style={{ color: palette.muted }}> — {c.issuer}</span>}
                {c.date && <span style={{ color: palette.muted }}> · {c.date}</span>}
              </div>
            ))}
          </Section>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full h-full p-[18mm]"
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: `'${fonts.body}', sans-serif`,
      }}
    >
      {/* Header */}
      <header className="border-b-2 pb-3 mb-4" style={{ borderColor: palette.primary }}>
        <h1
          className="text-[28pt] font-bold leading-tight tracking-tight"
          style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}
        >
          {personal.name || "Your Name"}
        </h1>
        {personal.title && (
          <div className="text-[13pt] mt-1" style={{ color: palette.secondary }}>
            {personal.title}
          </div>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[9.5pt] mt-2" style={{ color: palette.muted }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>
      {visible.map(renderSection)}
    </div>
  );
}

function Section({ title, children, palette }: { title: string; children: React.ReactNode; palette: TemplateProps["palette"] }) {
  return (
    <section className="mb-4">
      <h2
        className="text-[11pt] font-bold uppercase tracking-[0.15em] mb-2 pb-1 border-b"
        style={{ color: palette.primary, borderColor: palette.primary + "33" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

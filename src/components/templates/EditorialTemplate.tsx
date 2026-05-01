import type { TemplateProps } from "./index";
import { ExperienceList, EducationList, SkillsTags, LanguagesList, ProjectsList, CertificationsList } from "./_shared";
import { AvatarPhoto } from "@/components/AvatarPhoto";
import { useI18n } from "@/hooks/useI18n";

export function EditorialTemplate({ data, palette, fonts }: TemplateProps) {
  const { m, sectionTitleById, sectionTitleLabel } = useI18n();
  const { personal, sectionOrder, hiddenSections } = data;
  const visible = sectionOrder.filter((s) => !hiddenSections.includes(s));

  return (
    <div
      className="w-full h-full p-[20mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', serif` }}
    >
      <header className="relative mb-8 text-center border-b pb-6 pr-[98px]" style={{ borderColor: palette.primary + "44" }}>
        <h1
          className="text-[36pt] font-normal leading-none tracking-tight"
          style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}
        >
          {personal.name || m.common.yourName}
        </h1>
        {personal.title && (
          <div className="text-[12pt] mt-3 italic" style={{ color: palette.secondary }}>
            — {personal.title} —
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 text-[9.5pt] mt-4" style={{ color: palette.muted }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>·</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>·</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={112}
          maxSize={88}
          borderColorFallback={palette.primary}
          className="absolute top-0 right-0"
        />
      </header>

      {visible.map((id) => {
        const Title = (t: string) => (
          <h2 className="text-[13pt] mb-2 italic text-center" style={{ fontFamily: `'${fonts.heading}', serif`, color: palette.primary }}>
            ~ {sectionTitleLabel(t)} ~
          </h2>
        );
        switch (id) {
          case "summary":
            return personal.summary ? (
              <section key={id} className="mb-6">
                <p className="text-[11pt] leading-[1.7] text-center max-w-[80%] mx-auto italic" style={{ color: palette.secondary }}>
                  {personal.summary}
                </p>
              </section>
            ) : null;
          case "experience":
            return data.experience.length ? <section key={id} className="mb-6">{Title(sectionTitleById("experience", "Experience"))}<ExperienceList data={data} palette={palette} /></section> : null;
          case "education":
            return data.education.length ? <section key={id} className="mb-6">{Title(sectionTitleById("education", "Education"))}<EducationList data={data} palette={palette} /></section> : null;
          case "skills":
            return data.skills.length ? <section key={id} className="mb-6">{Title(sectionTitleById("skills", "Skills"))}<div className="flex justify-center"><SkillsTags data={data} palette={palette} /></div></section> : null;
          case "languages":
            return data.languages.length ? <section key={id} className="mb-6">{Title(sectionTitleById("languages", "Languages"))}<div className="text-center"><LanguagesList data={data} palette={palette} /></div></section> : null;
          case "projects":
            return data.projects.length ? <section key={id} className="mb-6">{Title(sectionTitleById("projects", "Projects"))}<ProjectsList data={data} palette={palette} /></section> : null;
          case "certifications":
            return data.certifications.length ? <section key={id} className="mb-6">{Title(sectionTitleById("certifications", "Certifications"))}<div className="text-center"><CertificationsList data={data} palette={palette} /></div></section> : null;
          default:
            return null;
        }
      })}
    </div>
  );
}

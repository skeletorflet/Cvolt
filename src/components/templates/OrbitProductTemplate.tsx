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

export function OrbitProductTemplate({ data, palette, fonts }: TemplateProps) {
  const { personal } = data;
  const visible = getVisibleSectionIds(data);

  return (
    <div
      className="w-full h-full p-[15mm]"
      style={{ backgroundColor: palette.background, color: palette.text, fontFamily: `'${fonts.body}', sans-serif` }}
    >
      <header
        className="rounded-[30px] p-6 pr-[124px] mb-5 relative overflow-hidden"
        style={{ background: `radial-gradient(circle at top left, ${palette.accent}55, transparent 32%), linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}
      >
        <div className="relative z-10 text-white max-w-[78%]">
          <div className="text-[9pt] uppercase tracking-[0.3em] opacity-85 mb-2">Product / Startup</div>
          <h1 className="text-[28pt] font-semibold leading-none" style={{ fontFamily: `'${fonts.heading}', sans-serif` }}>
            {personal.name || "Your Name"}
          </h1>
          {personal.title && <p className="mt-2 text-[12pt] opacity-95">{personal.title}</p>}
          <ContactLine data={data} palette={{ ...palette, muted: "rgba(255,255,255,0.84)" }} className="mt-3" separator="·" />
        </div>
        <AvatarPhoto
          src={personal.photo}
          settings={data.avatar}
          size={94}
          maxSize={86}
          borderColorFallback="#ffffff"
          className="absolute top-5 right-5"
        />
      </header>

      <div className="grid grid-cols-[1.6fr_0.95fr] gap-5">
        <main>
          {visible.map((sectionId) => {
            switch (sectionId) {
              case "summary":
                return personal.summary ? (
                  <SectionBlock key={sectionId} title="Snapshot" palette={palette} tone="card">
                    <p className="text-[10.3pt] leading-[1.65]">{personal.summary}</p>
                  </SectionBlock>
                ) : null;
              case "experience":
                return data.experience.length ? (
                  <SectionBlock key={sectionId} title="Product Experience" palette={palette} tone="card">
                    <ExperienceList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "projects":
                return data.projects.length ? (
                  <SectionBlock key={sectionId} title="Launches & Bets" palette={palette} tone="card">
                    <ProjectsList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              case "education":
                return data.education.length ? (
                  <SectionBlock key={sectionId} title="Education" palette={palette} tone="card">
                    <EducationList data={data} palette={palette} />
                  </SectionBlock>
                ) : null;
              default:
                return null;
            }
          })}
        </main>

        <aside>
          {data.skills.length > 0 && (
            <SectionBlock title="Toolset" palette={palette} tone="solid">
              <SkillsBars data={data} palette={{ ...palette, accent: "#ffffff" }} />
            </SectionBlock>
          )}
          {data.languages.length > 0 && (
            <SectionBlock title="Languages" palette={palette} tone="card">
              <LanguagesList data={data} palette={palette} />
            </SectionBlock>
          )}
          {data.certifications.length > 0 && (
            <SectionBlock title="Credentials" palette={palette} tone="card">
              <CertificationsList data={data} palette={palette} />
            </SectionBlock>
          )}
        </aside>
      </div>
    </div>
  );
}
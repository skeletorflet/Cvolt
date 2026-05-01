import { useCVStore, type CVData } from "@/store/cvStore";
import type { Palette } from "@/data/palettes";
import { cn } from "@/lib/utils";
import { getLocaleMessages, useI18n } from "@/hooks/useI18n";

export const dateRange = (s: string, e: string, current: boolean) =>
  [s, current ? getLocaleMessages(useCVStore.getState().locale).common.present : e].filter(Boolean).join(" — ");

type R = { data: CVData; palette: Palette };

export function getVisibleSectionIds(data: CVData) {
  return data.sectionOrder.filter((sectionId) => !data.hiddenSections.includes(sectionId));
}

export function SectionBlock({
  title,
  children,
  palette,
  tone = "line",
  className,
  titleClassName,
  bodyClassName,
}: {
  title: string;
  children: React.ReactNode;
  palette: Palette;
  tone?: "line" | "card" | "solid";
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
}) {
  const { sectionTitleLabel } = useI18n();
  const blockClassName = cn(
    "mb-4",
    tone === "card" && "rounded-2xl p-4",
    tone === "solid" && "rounded-2xl p-4 text-white",
    className,
  );

  const blockStyle =
    tone === "card"
      ? { backgroundColor: `${palette.muted}14` }
      : tone === "solid"
        ? { background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }
        : undefined;

  return (
    <section className={blockClassName} style={blockStyle}>
      <h2
        className={cn(
          "mb-2 text-[10.5pt] font-bold uppercase tracking-[0.18em]",
          tone === "line" && "border-b pb-1",
          titleClassName,
        )}
        style={{
          color: tone === "solid" ? "#ffffff" : palette.primary,
          borderColor: tone === "line" ? `${palette.primary}33` : undefined,
        }}
      >
        {sectionTitleLabel(title)}
      </h2>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function ContactLine({
  data,
  palette,
  className,
  separator = "•",
}: R & { className?: string; separator?: string }) {
  const items = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.linkedin,
    data.personal.github,
    data.personal.website,
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-x-3 gap-y-1 text-[9.5pt]", className)} style={{ color: palette.muted }}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
          {index > 0 && <span className="opacity-60">{separator}</span>}
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}

export function ExperienceList({ data, palette, compact = false }: R & { compact?: boolean }) {
  const m = getLocaleMessages(useCVStore.getState().locale);
  if (!data.experience.length) return null;
  return (
    <div className="space-y-3">
      {data.experience.map((e) => (
        <div key={e.id}>
          <div className="flex justify-between items-baseline gap-3">
            <h3 className="font-semibold text-[11pt]" style={{ color: palette.primary }}>{e.role || m.common.role}</h3>
            <span className="text-[9.5pt]" style={{ color: palette.muted }}>{dateRange(e.start, e.end, e.current)}</span>
          </div>
          <div className="flex justify-between items-baseline gap-3 mb-1">
            <span className="text-[10.5pt] italic">{e.company}</span>
            {e.location && <span className="text-[9.5pt]" style={{ color: palette.muted }}>{e.location}</span>}
          </div>
          {!compact && (
            <ul className="list-disc pl-4 space-y-0.5">
              {e.description.filter(Boolean).map((d, i) => (
                <li key={i} className="text-[10pt] leading-[1.5]">{d}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export function EducationList({ data, palette }: R) {
  if (!data.education.length) return null;
  return (
    <div className="space-y-2">
      {data.education.map((e) => (
        <div key={e.id}>
          <div className="flex justify-between items-baseline gap-3">
            <h3 className="font-semibold text-[10.5pt]" style={{ color: palette.primary }}>{e.degree} {e.field && `— ${e.field}`}</h3>
            <span className="text-[9.5pt]" style={{ color: palette.muted }}>{dateRange(e.start, e.end, false)}</span>
          </div>
          <div className="text-[10pt] italic">{e.school}</div>
          {e.details && <p className="text-[9.5pt] leading-[1.5] mt-0.5">{e.details}</p>}
        </div>
      ))}
    </div>
  );
}

export function SkillsBars({ data, palette }: R) {
  if (!data.skills.length) return null;
  return (
    <div className="space-y-1.5">
      {data.skills.map((s) => (
        <div key={s.id}>
          <div className="flex justify-between text-[9.5pt] mb-0.5"><span>{s.name}</span></div>
          <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: palette.muted + "33" }}>
            <div className="h-full rounded-full" style={{ width: `${(s.level / 5) * 100}%`, backgroundColor: palette.accent }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillsTags({ data, palette }: R) {
  if (!data.skills.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {data.skills.map((s) => (
        <span key={s.id} className="text-[9.5pt] px-2 py-0.5 rounded" style={{ backgroundColor: palette.accent + "22", color: palette.primary }}>
          {s.name}
        </span>
      ))}
    </div>
  );
}

export function LanguagesList({ data, palette }: R) {
  if (!data.languages.length) return null;
  return (
    <div className="space-y-0.5">
      {data.languages.map((l) => (
        <div key={l.id} className="text-[10pt]">
          <span className="font-medium">{l.name}</span> <span style={{ color: palette.muted }}>— {l.level}</span>
        </div>
      ))}
    </div>
  );
}

export function ProjectsList({ data, palette }: R) {
  if (!data.projects.length) return null;
  return (
    <div className="space-y-2">
      {data.projects.map((p) => (
        <div key={p.id}>
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-[10.5pt]" style={{ color: palette.primary }}>{p.name}</h3>
            {p.url && <span className="text-[9pt]" style={{ color: palette.accent }}>{p.url}</span>}
          </div>
          <p className="text-[10pt] leading-[1.5]">{p.description}</p>
          {p.tech.length > 0 && <div className="text-[9pt] mt-0.5" style={{ color: palette.muted }}>{p.tech.join(" · ")}</div>}
        </div>
      ))}
    </div>
  );
}

export function CertificationsList({ data, palette }: R) {
  if (!data.certifications.length) return null;
  return (
    <div className="space-y-0.5">
      {data.certifications.map((c) => (
        <div key={c.id} className="text-[10pt]">
          <span className="font-medium">{c.name}</span>
          {c.issuer && <span style={{ color: palette.muted }}> — {c.issuer}</span>}
          {c.date && <span style={{ color: palette.muted }}> · {c.date}</span>}
        </div>
      ))}
    </div>
  );
}

export const sectionTitles: Record<string, string> = {
  summary: "summary",
  experience: "experience",
  education: "education",
  skills: "skills",
  languages: "languages",
  projects: "projects",
  certifications: "certifications",
};

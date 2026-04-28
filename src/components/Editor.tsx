import { useCVStore } from "@/store/cvStore";
import { Trash2, Plus,GripVertical, Eye, EyeOff, Wand2, ChevronDown } from "lucide-react";
import { DesignPanel } from "@/components/DesignPanel";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Editor() {
  const s = useCVStore();

  return (
    <div className="space-y-6">
      <PersonalSection />
      <SummarySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <LanguagesSection />
      <CertificationsSection />

      <SectionOrderEditor />
      <DesignSection />
    </div>
  );
}

/* ---------- shared UI ---------- */
function FieldGroup({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return <div className={`grid gap-2 ${cols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>{children}</div>;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-0.5 w-full rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-0.5 w-full rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
      />
    </label>
  );
}

function Card({
  title,
  children,
  onAdd,
  addLabel = "Add",
}: {
  title: string;
  children: React.ReactNode;
  onAdd?: () => void;
  addLabel?: string;
}) {
  return (
    <section className="rounded-xl bg-card border border-border p-4">
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-wide">{title}</h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-primary/15 text-primary hover:bg-primary/25 transition"
          >
            <Plus size={12} /> {addLabel}
          </button>
        )}
      </header>
      {children}
    </section>
  );
}

function Entry({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3 mb-2 last:mb-0 relative group">
      {children}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition"
        aria-label="Remove"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}

/* ---------- sections ---------- */
function PersonalSection() {
  const { personal, setPersonal } = useCVStore();
  return (
    <Card title="Personal">
      <FieldGroup>
        <Field label="Full Name" value={personal.name} onChange={(v) => setPersonal({ name: v })} placeholder="Jane Doe" />
        <Field label="Title" value={personal.title} onChange={(v) => setPersonal({ title: v })} placeholder="Senior Engineer" />
        <Field label="Email" value={personal.email} onChange={(v) => setPersonal({ email: v })} />
        <Field label="Phone" value={personal.phone} onChange={(v) => setPersonal({ phone: v })} />
        <Field label="Location" value={personal.location} onChange={(v) => setPersonal({ location: v })} />
        <Field label="Website" value={personal.website} onChange={(v) => setPersonal({ website: v })} />
        <Field label="LinkedIn" value={personal.linkedin} onChange={(v) => setPersonal({ linkedin: v })} />
        <Field label="GitHub" value={personal.github} onChange={(v) => setPersonal({ github: v })} />
      </FieldGroup>
    </Card>
  );
}

function SummarySection() {
  const { personal, setPersonal } = useCVStore();
  return (
    <Card title="Profile / Summary">
      <TextArea
        label="Summary"
        value={personal.summary}
        onChange={(v) => setPersonal({ summary: v })}
        rows={4}
        placeholder="A short professional bio…"
      />
      <div className="text-[10px] text-muted-foreground mt-1">
        {personal.summary.trim().split(/\s+/).filter(Boolean).length} words
      </div>
    </Card>
  );
}

function ExperienceSection() {
  const { experience, addExperience, updateExperience, removeExperience } = useCVStore();
  return (
    <Card title="Experience" onAdd={addExperience}>
      {experience.map((e) => (
        <Entry key={e.id} onRemove={() => removeExperience(e.id)}>
          <FieldGroup>
            <Field label="Company" value={e.company} onChange={(v) => updateExperience(e.id, { company: v })} />
            <Field label="Role" value={e.role} onChange={(v) => updateExperience(e.id, { role: v })} />
            <Field label="Start" value={e.start} onChange={(v) => updateExperience(e.id, { start: v })} placeholder="2022" />
            <Field label="End" value={e.end} onChange={(v) => updateExperience(e.id, { end: v })} placeholder="2024" />
            <Field label="Location" value={e.location} onChange={(v) => updateExperience(e.id, { location: v })} />
            <label className="flex items-center gap-2 mt-4 text-xs">
              <input
                type="checkbox"
                checked={e.current}
                onChange={(ev) => updateExperience(e.id, { current: ev.target.checked })}
                className="accent-primary"
              />
              Currently here
            </label>
          </FieldGroup>
          <div className="mt-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Bullets</span>
            {e.description.map((d, i) => (
              <div key={i} className="flex gap-1.5 mt-1">
                <input
                  value={d}
                  onChange={(ev) => {
                    const arr = [...e.description];
                    arr[i] = ev.target.value;
                    updateExperience(e.id, { description: arr });
                  }}
                  placeholder="Achievement or responsibility…"
                  className="flex-1 rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <button
                  onClick={() => updateExperience(e.id, { description: e.description.filter((_, j) => j !== i) })}
                  className="p-1 text-muted-foreground hover:text-destructive"
                  aria-label="Remove bullet"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateExperience(e.id, { description: [...e.description, ""] })}
              className="text-xs text-primary mt-1.5 inline-flex items-center gap-1"
            >
              <Plus size={11} /> Add bullet
            </button>
          </div>
        </Entry>
      ))}
      {experience.length === 0 && <Empty msg="No experience yet." />}
    </Card>
  );
}

function EducationSection() {
  const { education, addEducation, updateEducation, removeEducation } = useCVStore();
  return (
    <Card title="Education" onAdd={addEducation}>
      {education.map((e) => (
        <Entry key={e.id} onRemove={() => removeEducation(e.id)}>
          <FieldGroup>
            <Field label="School" value={e.school} onChange={(v) => updateEducation(e.id, { school: v })} />
            <Field label="Degree" value={e.degree} onChange={(v) => updateEducation(e.id, { degree: v })} />
            <Field label="Field" value={e.field} onChange={(v) => updateEducation(e.id, { field: v })} />
            <Field label="Start" value={e.start} onChange={(v) => updateEducation(e.id, { start: v })} />
            <Field label="End" value={e.end} onChange={(v) => updateEducation(e.id, { end: v })} />
          </FieldGroup>
          <div className="mt-2">
            <TextArea label="Details" value={e.details} onChange={(v) => updateEducation(e.id, { details: v })} rows={2} />
          </div>
        </Entry>
      ))}
      {education.length === 0 && <Empty msg="No education yet." />}
    </Card>
  );
}

function SkillsSection() {
  const { skills, addSkill, updateSkill, removeSkill } = useCVStore();
  return (
    <Card title="Skills" onAdd={addSkill}>
      <div className="space-y-1.5">
        {skills.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <input
              value={s.name}
              onChange={(e) => updateSkill(s.id, { name: e.target.value })}
              placeholder="Skill"
              className="flex-1 rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="range"
              min={1}
              max={5}
              value={s.level}
              onChange={(e) => updateSkill(s.id, { level: Number(e.target.value) })}
              className="w-20 accent-primary"
            />
            <button onClick={() => removeSkill(s.id)} className="p-1 text-muted-foreground hover:text-destructive">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
      {skills.length === 0 && <Empty msg="No skills yet." />}
    </Card>
  );
}

function LanguagesSection() {
  const { languages, addLanguage, updateLanguage, removeLanguage } = useCVStore();
  return (
    <Card title="Languages" onAdd={addLanguage}>
      <div className="space-y-1.5">
        {languages.map((l) => (
          <div key={l.id} className="flex gap-2">
            <input
              value={l.name}
              onChange={(e) => updateLanguage(l.id, { name: e.target.value })}
              placeholder="Language"
              className="flex-1 rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <select
              value={l.level}
              onChange={(e) => updateLanguage(l.id, { level: e.target.value })}
              className="rounded-md bg-input border border-border px-2 py-1.5 text-sm"
            >
              <option>Native</option>
              <option>Fluent</option>
              <option>Intermediate</option>
              <option>Basic</option>
            </select>
            <button onClick={() => removeLanguage(l.id)} className="p-1 text-muted-foreground hover:text-destructive">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
      {languages.length === 0 && <Empty msg="No languages yet." />}
    </Card>
  );
}

function ProjectsSection() {
  const { projects, addProject, updateProject, removeProject } = useCVStore();
  return (
    <Card title="Projects" onAdd={addProject}>
      {projects.map((p) => (
        <Entry key={p.id} onRemove={() => removeProject(p.id)}>
          <FieldGroup>
            <Field label="Name" value={p.name} onChange={(v) => updateProject(p.id, { name: v })} />
            <Field label="URL" value={p.url} onChange={(v) => updateProject(p.id, { url: v })} />
          </FieldGroup>
          <div className="mt-2">
            <TextArea label="Description" value={p.description} onChange={(v) => updateProject(p.id, { description: v })} rows={2} />
          </div>
          <div className="mt-2">
            <Field
              label="Tech (comma separated)"
              value={p.tech.join(", ")}
              onChange={(v) => updateProject(p.id, { tech: v.split(",").map((x) => x.trim()).filter(Boolean) })}
            />
          </div>
        </Entry>
      ))}
      {projects.length === 0 && <Empty msg="No projects yet." />}
    </Card>
  );
}

function CertificationsSection() {
  const { certifications, addCertification, updateCertification, removeCertification } = useCVStore();
  return (
    <Card title="Certifications" onAdd={addCertification}>
      {certifications.map((c) => (
        <Entry key={c.id} onRemove={() => removeCertification(c.id)}>
          <FieldGroup>
            <Field label="Name" value={c.name} onChange={(v) => updateCertification(c.id, { name: v })} />
            <Field label="Issuer" value={c.issuer} onChange={(v) => updateCertification(c.id, { issuer: v })} />
            <Field label="Date" value={c.date} onChange={(v) => updateCertification(c.id, { date: v })} />
            <Field label="URL" value={c.url} onChange={(v) => updateCertification(c.id, { url: v })} />
          </FieldGroup>
        </Entry>
      ))}
      {certifications.length === 0 && <Empty msg="No certifications yet." />}
    </Card>
  );
}

function Empty({ msg }: { msg: string }) {
  return <div className="text-xs text-muted-foreground italic py-2">{msg}</div>;
}

/* ---------- Section order DnD ---------- */
function SectionOrderEditor() {
  const { sectionOrder, hiddenSections, setSectionOrder, toggleSection } = useCVStore();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = sectionOrder.indexOf(active.id as never);
    const newIdx = sectionOrder.indexOf(over.id as never);
    setSectionOrder(arrayMove(sectionOrder, oldIdx, newIdx));
  };

  return (
    <Card title="Section order">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <ul className="space-y-1">
            {sectionOrder.map((id) => (
              <SortableItem key={id} id={id} hidden={hiddenSections.includes(id)} onToggle={() => toggleSection(id)} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </Card>
  );
}

function SortableItem({ id, hidden, onToggle }: { id: string; hidden: boolean; onToggle: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-background/40 border border-border text-sm"
    >
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
        <GripVertical size={14} />
      </button>
      <span className="capitalize flex-1">{id}</span>
      <button onClick={onToggle} className="text-muted-foreground hover:text-foreground">
        {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </li>
  );
}

function DesignSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-xl bg-card border border-border p-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold"
      >
        <span className="flex items-center gap-2">
          <Wand2 size={14} className="text-primary" />
          Design Studio
        </span>
        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border" style={{ height: 420 }}>
          <DesignPanel />
        </div>
      )}
    </section>
  );
}

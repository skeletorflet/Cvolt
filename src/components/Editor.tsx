import { useCVStore } from "@/store/cvStore";
import { Trash2, Plus, GripVertical, Eye, EyeOff } from "lucide-react";
import { AvatarEditorDialog } from "@/components/AvatarEditorDialog";
import { useI18n } from "@/hooks/useI18n";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Editor() {
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
    </div>
  );
}

/* ---------- shared UI ---------- */
function FieldGroup({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return (
    <div className={`grid gap-2 ${cols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>{children}</div>
  );
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
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition placeholder:text-muted-foreground/50"
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
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none placeholder:text-muted-foreground/50"
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
            aria-label={addLabel}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-primary/15 text-primary hover:bg-primary/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <Plus size={12} aria-hidden="true" />
            <span>{addLabel}</span>
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
        className="absolute top-2 right-2 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/60"
        aria-label="Remove entry"
      >
        <Trash2 size={13} aria-hidden="true" />
      </button>
    </div>
  );
}

/* ---------- sections ---------- */
function PersonalSection() {
  const { m } = useI18n();
  const { personal, setPersonal } = useCVStore();
  return (
    <Card title={m.editor.personal}>
      <div className="mb-3">
        <AvatarEditorDialog />
      </div>
      <FieldGroup>
        <Field
          label={m.editor.fullName}
          value={personal.name}
          onChange={(v) => setPersonal({ name: v })}
          placeholder={m.editor.placeholderName}
        />
        <Field
          label={m.editor.title}
          value={personal.title}
          onChange={(v) => setPersonal({ title: v })}
          placeholder={m.editor.placeholderTitle}
        />
        <Field
          label={m.editor.email}
          value={personal.email}
          onChange={(v) => setPersonal({ email: v })}
        />
        <Field
          label={m.editor.phone}
          value={personal.phone}
          onChange={(v) => setPersonal({ phone: v })}
        />
        <Field
          label={m.editor.location}
          value={personal.location}
          onChange={(v) => setPersonal({ location: v })}
        />
        <Field
          label={m.editor.website}
          value={personal.website}
          onChange={(v) => setPersonal({ website: v })}
        />
        <Field
          label={m.editor.linkedin}
          value={personal.linkedin}
          onChange={(v) => setPersonal({ linkedin: v })}
        />
        <Field
          label={m.editor.github}
          value={personal.github}
          onChange={(v) => setPersonal({ github: v })}
        />
      </FieldGroup>
    </Card>
  );
}

function SummarySection() {
  const { m } = useI18n();
  const { personal, setPersonal } = useCVStore();
  return (
    <Card title={m.editor.summaryTitle}>
      <TextArea
        label={m.editor.summaryLabel}
        value={personal.summary}
        onChange={(v) => setPersonal({ summary: v })}
        rows={4}
        placeholder={m.editor.summaryPlaceholder}
      />
      <div className="text-[10px] text-muted-foreground mt-1">
        {personal.summary.trim().split(/\s+/).filter(Boolean).length} {m.editor.words}
      </div>
    </Card>
  );
}

function ExperienceSection() {
  const { m } = useI18n();
  const { experience, addExperience, updateExperience, removeExperience } = useCVStore();
  return (
    <Card title={m.editor.experience} onAdd={addExperience} addLabel={m.editor.add}>
      {experience.map((e) => (
        <Entry key={e.id} onRemove={() => removeExperience(e.id)}>
          <FieldGroup>
            <Field
              label={m.editor.company}
              value={e.company}
              onChange={(v) => updateExperience(e.id, { company: v })}
            />
            <Field
              label={m.editor.role}
              value={e.role}
              onChange={(v) => updateExperience(e.id, { role: v })}
            />
            <Field
              label={m.editor.start}
              value={e.start}
              onChange={(v) => updateExperience(e.id, { start: v })}
              placeholder={m.editor.placeholderStart}
            />
            <Field
              label={m.editor.end}
              value={e.end}
              onChange={(v) => updateExperience(e.id, { end: v })}
              placeholder={m.editor.placeholderEnd}
            />
            <Field
              label={m.editor.location}
              value={e.location}
              onChange={(v) => updateExperience(e.id, { location: v })}
            />
            <label className="flex items-center gap-2 mt-4 text-xs">
              <input
                type="checkbox"
                checked={e.current}
                onChange={(ev) => updateExperience(e.id, { current: ev.target.checked })}
                className="accent-primary"
              />
              {m.editor.currentlyHere}
            </label>
          </FieldGroup>
          <div className="mt-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {m.editor.bullets}
            </span>
            {e.description.map((d, i) => (
              <div key={i} className="flex gap-1.5 mt-1">
                <input
                  value={d}
                  onChange={(ev) => {
                    const arr = [...e.description];
                    arr[i] = ev.target.value;
                    updateExperience(e.id, { description: arr });
                  }}
                  placeholder={m.editor.placeholderBullet}
                  className="flex-1 rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <button
                  onClick={() =>
                    updateExperience(e.id, { description: e.description.filter((_, j) => j !== i) })
                  }
                  className="p-1 text-muted-foreground hover:text-destructive"
                  aria-label={m.editor.removeBullet}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateExperience(e.id, { description: [...e.description, ""] })}
              className="text-xs text-primary mt-1.5 inline-flex items-center gap-1"
            >
              <Plus size={11} /> {m.editor.addBullet}
            </button>
          </div>
        </Entry>
      ))}
      {experience.length === 0 && <Empty msg={m.editor.emptyExperience} />}
    </Card>
  );
}

function EducationSection() {
  const { m } = useI18n();
  const { education, addEducation, updateEducation, removeEducation } = useCVStore();
  return (
    <Card title={m.editor.education} onAdd={addEducation} addLabel={m.editor.add}>
      {education.map((e) => (
        <Entry key={e.id} onRemove={() => removeEducation(e.id)}>
          <FieldGroup>
            <Field
              label={m.editor.school}
              value={e.school}
              onChange={(v) => updateEducation(e.id, { school: v })}
            />
            <Field
              label={m.editor.degree}
              value={e.degree}
              onChange={(v) => updateEducation(e.id, { degree: v })}
            />
            <Field
              label={m.editor.field}
              value={e.field}
              onChange={(v) => updateEducation(e.id, { field: v })}
            />
            <Field
              label={m.editor.start}
              value={e.start}
              onChange={(v) => updateEducation(e.id, { start: v })}
            />
            <Field
              label={m.editor.end}
              value={e.end}
              onChange={(v) => updateEducation(e.id, { end: v })}
            />
          </FieldGroup>
          <div className="mt-2">
            <TextArea
              label={m.editor.details}
              value={e.details}
              onChange={(v) => updateEducation(e.id, { details: v })}
              rows={2}
            />
          </div>
        </Entry>
      ))}
      {education.length === 0 && <Empty msg={m.editor.emptyEducation} />}
    </Card>
  );
}

function SkillsSection() {
  const { m } = useI18n();
  const { skills, addSkill, updateSkill, removeSkill } = useCVStore();
  return (
    <Card title={m.editor.skills} onAdd={addSkill} addLabel={m.editor.add}>
      <div className="space-y-1.5">
        {skills.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <input
              value={s.name}
              onChange={(e) => updateSkill(s.id, { name: e.target.value })}
              placeholder={m.editor.skill}
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
            <button
              onClick={() => removeSkill(s.id)}
              className="p-1 text-muted-foreground hover:text-destructive"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
      {skills.length === 0 && <Empty msg={m.editor.emptySkills} />}
    </Card>
  );
}

function LanguagesSection() {
  const { m } = useI18n();
  const { languages, addLanguage, updateLanguage, removeLanguage } = useCVStore();
  return (
    <Card title={m.editor.languages} onAdd={addLanguage} addLabel={m.editor.add}>
      <div className="space-y-1.5">
        {languages.map((l) => (
          <div key={l.id} className="flex gap-2">
            <input
              value={l.name}
              onChange={(e) => updateLanguage(l.id, { name: e.target.value })}
              placeholder={m.editor.language}
              className="flex-1 rounded-md bg-input border border-border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <select
              value={l.level}
              onChange={(e) => updateLanguage(l.id, { level: e.target.value })}
              className="rounded-md bg-input border border-border px-2 py-1.5 text-sm"
            >
              <option>{m.editor.levelNative}</option>
              <option>{m.editor.levelFluent}</option>
              <option>{m.editor.levelIntermediate}</option>
              <option>{m.editor.levelBasic}</option>
            </select>
            <button
              onClick={() => removeLanguage(l.id)}
              className="p-1 text-muted-foreground hover:text-destructive"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
      {languages.length === 0 && <Empty msg={m.editor.emptyLanguages} />}
    </Card>
  );
}

function ProjectsSection() {
  const { m } = useI18n();
  const { projects, addProject, updateProject, removeProject } = useCVStore();
  return (
    <Card title={m.editor.projects} onAdd={addProject} addLabel={m.editor.add}>
      {projects.map((p) => (
        <Entry key={p.id} onRemove={() => removeProject(p.id)}>
          <FieldGroup>
            <Field
              label={m.editor.name}
              value={p.name}
              onChange={(v) => updateProject(p.id, { name: v })}
            />
            <Field
              label={m.editor.url}
              value={p.url}
              onChange={(v) => updateProject(p.id, { url: v })}
            />
          </FieldGroup>
          <div className="mt-2">
            <TextArea
              label={m.editor.description}
              value={p.description}
              onChange={(v) => updateProject(p.id, { description: v })}
              rows={2}
            />
          </div>
          <div className="mt-2">
            <Field
              label={m.editor.techComma}
              value={p.tech.join(", ")}
              onChange={(v) =>
                updateProject(p.id, {
                  tech: v
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
        </Entry>
      ))}
      {projects.length === 0 && <Empty msg={m.editor.emptyProjects} />}
    </Card>
  );
}

function CertificationsSection() {
  const { m } = useI18n();
  const { certifications, addCertification, updateCertification, removeCertification } =
    useCVStore();
  return (
    <Card title={m.editor.certifications} onAdd={addCertification} addLabel={m.editor.add}>
      {certifications.map((c) => (
        <Entry key={c.id} onRemove={() => removeCertification(c.id)}>
          <FieldGroup>
            <Field
              label={m.editor.name}
              value={c.name}
              onChange={(v) => updateCertification(c.id, { name: v })}
            />
            <Field
              label={m.editor.issuer}
              value={c.issuer}
              onChange={(v) => updateCertification(c.id, { issuer: v })}
            />
            <Field
              label={m.editor.date}
              value={c.date}
              onChange={(v) => updateCertification(c.id, { date: v })}
            />
            <Field
              label={m.editor.url}
              value={c.url}
              onChange={(v) => updateCertification(c.id, { url: v })}
            />
          </FieldGroup>
        </Entry>
      ))}
      {certifications.length === 0 && <Empty msg={m.editor.emptyCertifications} />}
    </Card>
  );
}

function Empty({ msg }: { msg: string }) {
  return <div className="text-xs text-muted-foreground italic py-2">{msg}</div>;
}

/* ---------- Section order DnD ---------- */
function SectionOrderEditor() {
  const { m, sectionTitleById } = useI18n();
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
    <Card title={m.editor.sectionOrder}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <ul className="space-y-1">
            {sectionOrder.map((id) => (
              <SortableItem
                key={id}
                id={id}
                label={sectionTitleById(id, id)}
                hidden={hiddenSections.includes(id)}
                onToggle={() => toggleSection(id)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </Card>
  );
}

function SortableItem({
  id,
  label,
  hidden,
  onToggle,
}: {
  id: string;
  label: string;
  hidden: boolean;
  onToggle: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-background/40 border border-border text-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground hover:text-foreground"
      >
        <GripVertical size={14} />
      </button>
      <span className="capitalize flex-1">{label}</span>
      <button onClick={onToggle} className="text-muted-foreground hover:text-foreground">
        {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </li>
  );
}

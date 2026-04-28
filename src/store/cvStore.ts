import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Personal = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  photo: string | null;
  summary: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  current: boolean;
  location: string;
  description: string[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  details: string;
};

export type Skill = { id: string; name: string; level: number };
export type Language = { id: string; name: string; level: string };
export type Project = { id: string; name: string; description: string; url: string; tech: string[] };
export type Certification = { id: string; name: string; issuer: string; date: string; url: string };

export type SectionId =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "projects"
  | "certifications";

export type CVData = {
  personal: Personal;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  certifications: Certification[];
  sectionOrder: SectionId[];
  hiddenSections: SectionId[];
};

export type CustomColors = {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
  muted: string;
} | null;

type State = CVData & {
  templateId: string;
  paletteId: string;
  fontPairId: string;
  customColors: CustomColors;
  // actions
  setPersonal: (p: Partial<Personal>) => void;
  addExperience: () => void;
  updateExperience: (id: string, p: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, p: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, p: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, p: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, p: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, p: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  setSectionOrder: (order: SectionId[]) => void;
  toggleSection: (id: SectionId) => void;
  setTemplate: (id: string) => void;
  setPalette: (id: string) => void;
  setFontPair: (id: string) => void;
  setCustomColors: (c: CustomColors) => void;
  loadExample: (data: CVData) => void;
  reset: () => void;
};

const uid = () => Math.random().toString(36).slice(2, 10);

const blank: CVData = {
  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    photo: null,
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  certifications: [],
  sectionOrder: ["summary", "experience", "education", "skills", "projects", "languages", "certifications"],
  hiddenSections: [],
};

export const useCVStore = create<State>()(
  persist(
    (set) => ({
      ...blank,
      templateId: "corporate",
      paletteId: "navy-gold",
      fontPairId: "modern",
      customColors: null,

      setPersonal: (p) => set((s) => ({ personal: { ...s.personal, ...p } })),

      addExperience: () =>
        set((s) => ({
          experience: [
            ...s.experience,
            { id: uid(), company: "", role: "", start: "", end: "", current: false, location: "", description: [""] },
          ],
        })),
      updateExperience: (id, p) =>
        set((s) => ({ experience: s.experience.map((e) => (e.id === id ? { ...e, ...p } : e)) })),
      removeExperience: (id) => set((s) => ({ experience: s.experience.filter((e) => e.id !== id) })),

      addEducation: () =>
        set((s) => ({
          education: [...s.education, { id: uid(), school: "", degree: "", field: "", start: "", end: "", details: "" }],
        })),
      updateEducation: (id, p) =>
        set((s) => ({ education: s.education.map((e) => (e.id === id ? { ...e, ...p } : e)) })),
      removeEducation: (id) => set((s) => ({ education: s.education.filter((e) => e.id !== id) })),

      addSkill: () => set((s) => ({ skills: [...s.skills, { id: uid(), name: "", level: 3 }] })),
      updateSkill: (id, p) => set((s) => ({ skills: s.skills.map((e) => (e.id === id ? { ...e, ...p } : e)) })),
      removeSkill: (id) => set((s) => ({ skills: s.skills.filter((e) => e.id !== id) })),

      addLanguage: () => set((s) => ({ languages: [...s.languages, { id: uid(), name: "", level: "Fluent" }] })),
      updateLanguage: (id, p) =>
        set((s) => ({ languages: s.languages.map((e) => (e.id === id ? { ...e, ...p } : e)) })),
      removeLanguage: (id) => set((s) => ({ languages: s.languages.filter((e) => e.id !== id) })),

      addProject: () =>
        set((s) => ({ projects: [...s.projects, { id: uid(), name: "", description: "", url: "", tech: [] }] })),
      updateProject: (id, p) =>
        set((s) => ({ projects: s.projects.map((e) => (e.id === id ? { ...e, ...p } : e)) })),
      removeProject: (id) => set((s) => ({ projects: s.projects.filter((e) => e.id !== id) })),

      addCertification: () =>
        set((s) => ({
          certifications: [...s.certifications, { id: uid(), name: "", issuer: "", date: "", url: "" }],
        })),
      updateCertification: (id, p) =>
        set((s) => ({ certifications: s.certifications.map((e) => (e.id === id ? { ...e, ...p } : e)) })),
      removeCertification: (id) => set((s) => ({ certifications: s.certifications.filter((e) => e.id !== id) })),

      setSectionOrder: (order) => set({ sectionOrder: order }),
      toggleSection: (id) =>
        set((s) => ({
          hiddenSections: s.hiddenSections.includes(id)
            ? s.hiddenSections.filter((x) => x !== id)
            : [...s.hiddenSections, id],
        })),

      setTemplate: (id) => set({ templateId: id }),
      setPalette: (id) => set({ paletteId: id, customColors: null }),
      setFontPair: (id) => set({ fontPairId: id }),
      setCustomColors: (c) => set({ customColors: c }),

      loadExample: (data) => set({ ...data }),
      reset: () => set({ ...blank }),
    }),
    { name: "cvforge-data-v1" }
  )
);

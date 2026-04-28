import type { CVData } from "@/store/cvStore";
import type { Palette } from "@/data/palettes";
import type { FontPair } from "@/data/fonts";

import { CorporateTemplate } from "./CorporateTemplate";
import { ExecutiveDarkTemplate } from "./ExecutiveDarkTemplate";
import { MinimalSwissTemplate } from "./MinimalSwissTemplate";
import { CreativeBoldTemplate } from "./CreativeBoldTemplate";
import { TechSidebarTemplate } from "./TechSidebarTemplate";
import { EditorialTemplate } from "./EditorialTemplate";
import { AcademicTemplate } from "./AcademicTemplate";
import { ModernGridTemplate } from "./ModernGridTemplate";

export type TemplateProps = {
  data: CVData;
  palette: Palette;
  fonts: FontPair;
};

export type TemplateMeta = {
  id: string;
  name: string;
  category: "Professional" | "Modern" | "Creative" | "Minimal" | "Academic";
  Component: React.ComponentType<TemplateProps>;
};

export const templates: TemplateMeta[] = [
  { id: "corporate", name: "Corporate", category: "Professional", Component: CorporateTemplate },
  { id: "executive-dark", name: "Executive Dark", category: "Professional", Component: ExecutiveDarkTemplate },
  { id: "swiss", name: "Swiss Minimal", category: "Minimal", Component: MinimalSwissTemplate },
  { id: "creative-bold", name: "Creative Bold", category: "Creative", Component: CreativeBoldTemplate },
  { id: "tech-sidebar", name: "Tech Sidebar", category: "Modern", Component: TechSidebarTemplate },
  { id: "editorial", name: "Editorial", category: "Creative", Component: EditorialTemplate },
  { id: "academic", name: "Academic", category: "Academic", Component: AcademicTemplate },
  { id: "modern-grid", name: "Modern Grid", category: "Modern", Component: ModernGridTemplate },
];

export const getTemplate = (id: string) =>
  templates.find((t) => t.id === id) ?? templates[0];

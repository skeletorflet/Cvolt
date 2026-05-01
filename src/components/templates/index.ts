import type { CVData } from "@/store/cvStore";
import type { Palette } from "@/data/palettes";
import type { FontPair } from "@/data/fonts";
import type { PaperSizeId } from "@/data/paperSizes";

import React from "react";

// Lazy-load every template so they are split into separate chunks.
// CVPreview wraps <Comp> in <Suspense> to handle the async boundary.
const CorporateTemplate = React.lazy(() =>
  import("./CorporateTemplate").then((m) => ({ default: m.CorporateTemplate })),
);
const ExecutiveDarkTemplate = React.lazy(() =>
  import("./ExecutiveDarkTemplate").then((m) => ({ default: m.ExecutiveDarkTemplate })),
);
const MinimalSwissTemplate = React.lazy(() =>
  import("./MinimalSwissTemplate").then((m) => ({ default: m.MinimalSwissTemplate })),
);
const CreativeBoldTemplate = React.lazy(() =>
  import("./CreativeBoldTemplate").then((m) => ({ default: m.CreativeBoldTemplate })),
);
const TechSidebarTemplate = React.lazy(() =>
  import("./TechSidebarTemplate").then((m) => ({ default: m.TechSidebarTemplate })),
);
const EditorialTemplate = React.lazy(() =>
  import("./EditorialTemplate").then((m) => ({ default: m.EditorialTemplate })),
);
const AcademicTemplate = React.lazy(() =>
  import("./AcademicTemplate").then((m) => ({ default: m.AcademicTemplate })),
);
const ModernGridTemplate = React.lazy(() =>
  import("./ModernGridTemplate").then((m) => ({ default: m.ModernGridTemplate })),
);
const BoardroomClassicTemplate = React.lazy(() =>
  import("./BoardroomClassicTemplate").then((m) => ({ default: m.BoardroomClassicTemplate })),
);
const AtlasProfessionalTemplate = React.lazy(() =>
  import("./AtlasProfessionalTemplate").then((m) => ({ default: m.AtlasProfessionalTemplate })),
);
const NordicMinimalTemplate = React.lazy(() =>
  import("./NordicMinimalTemplate").then((m) => ({ default: m.NordicMinimalTemplate })),
);
const SignalResumeTemplate = React.lazy(() =>
  import("./SignalResumeTemplate").then((m) => ({ default: m.SignalResumeTemplate })),
);
const LiteraryThesisTemplate = React.lazy(() =>
  import("./LiteraryThesisTemplate").then((m) => ({ default: m.LiteraryThesisTemplate })),
);
const OrbitProductTemplate = React.lazy(() =>
  import("./OrbitProductTemplate").then((m) => ({ default: m.OrbitProductTemplate })),
);
const RegalSerifTemplate = React.lazy(() =>
  import("./RegalSerifTemplate").then((m) => ({ default: m.RegalSerifTemplate })),
);
const IvoryExecutiveTemplate = React.lazy(() =>
  import("./IvoryExecutiveTemplate").then((m) => ({ default: m.IvoryExecutiveTemplate })),
);
const ResearchDossierTemplate = React.lazy(() =>
  import("./ResearchDossierTemplate").then((m) => ({ default: m.ResearchDossierTemplate })),
);
const GridJournalTemplate = React.lazy(() =>
  import("./GridJournalTemplate").then((m) => ({ default: m.GridJournalTemplate })),
);
const StudioCanvasTemplate = React.lazy(() =>
  import("./StudioCanvasTemplate").then((m) => ({ default: m.StudioCanvasTemplate })),
);
const GalleryFoldTemplate = React.lazy(() =>
  import("./GalleryFoldTemplate").then((m) => ({ default: m.GalleryFoldTemplate })),
);
const BlueprintSystemsTemplate = React.lazy(() =>
  import("./BlueprintSystemsTemplate").then((m) => ({ default: m.BlueprintSystemsTemplate })),
);
const NoirContrastTemplate = React.lazy(() =>
  import("./NoirContrastTemplate").then((m) => ({ default: m.NoirContrastTemplate })),
);
const HumanistWarmTemplate = React.lazy(() =>
  import("./HumanistWarmTemplate").then((m) => ({ default: m.HumanistWarmTemplate })),
);
const ArtDecoLineTemplate = React.lazy(() =>
  import("./ArtDecoLineTemplate").then((m) => ({ default: m.ArtDecoLineTemplate })),
);
const TerracottaStoryTemplate = React.lazy(() =>
  import("./TerracottaStoryTemplate").then((m) => ({ default: m.TerracottaStoryTemplate })),
);
const NeoBrutalBriefTemplate = React.lazy(() =>
  import("./NeoBrutalBriefTemplate").then((m) => ({ default: m.NeoBrutalBriefTemplate })),
);
const PosterPersonaTemplate = React.lazy(() =>
  import("./PosterPersonaTemplate").then((m) => ({ default: m.PosterPersonaTemplate })),
);
const ColumnLedgerTemplate = React.lazy(() =>
  import("./ColumnLedgerTemplate").then((m) => ({ default: m.ColumnLedgerTemplate })),
);

export type TemplateCategory =
  | "Professional"
  | "Modern"
  | "Creative"
  | "Minimal"
  | "Academic"
  | "Formal"
  | "Artistic"
  | "Illustrative"
  | "Informal";

export type TemplatePreviewKind =
  | "classic-header"
  | "dark-band"
  | "sidebar"
  | "split-hero"
  | "grid-cards"
  | "editorial-center"
  | "dense-document";

export type TemplateProps = {
  data: CVData;
  palette: Palette;
  fonts: FontPair;
};

export type TemplateMeta = {
  id: string;
  name: string;
  category: TemplateCategory;
  recommendedPaperSizeId?: PaperSizeId;
  preview: TemplatePreviewKind;
  blurb?: string;
  Component: React.ComponentType<TemplateProps>;
};

export const templates: TemplateMeta[] = [
  {
    id: "corporate",
    name: "Corporate",
    category: "Professional",
    recommendedPaperSizeId: "a4",
    preview: "classic-header",
    blurb: "Balanced corporate layout with a strong structured header.",
    Component: CorporateTemplate,
  },
  {
    id: "executive-dark",
    name: "Executive Dark",
    category: "Professional",
    recommendedPaperSizeId: "a4",
    preview: "dark-band",
    blurb: "High-contrast executive presentation with a premium dark masthead.",
    Component: ExecutiveDarkTemplate,
  },
  {
    id: "swiss",
    name: "Swiss Minimal",
    category: "Minimal",
    recommendedPaperSizeId: "a4",
    preview: "split-hero",
    blurb: "Restrained Swiss grid with crisp spacing and hierarchy.",
    Component: MinimalSwissTemplate,
  },
  {
    id: "creative-bold",
    name: "Creative Bold",
    category: "Creative",
    recommendedPaperSizeId: "a4",
    preview: "split-hero",
    blurb: "Expressive asymmetric composition for standout portfolios.",
    Component: CreativeBoldTemplate,
  },
  {
    id: "tech-sidebar",
    name: "Tech Sidebar",
    category: "Modern",
    recommendedPaperSizeId: "a4",
    preview: "sidebar",
    blurb: "Modern two-column layout tuned for product and engineering profiles.",
    Component: TechSidebarTemplate,
  },
  {
    id: "editorial",
    name: "Editorial",
    category: "Creative",
    recommendedPaperSizeId: "legal",
    preview: "editorial-center",
    blurb: "Magazine-inspired rhythm with centered masthead and airy pacing.",
    Component: EditorialTemplate,
  },
  {
    id: "academic",
    name: "Academic",
    category: "Academic",
    recommendedPaperSizeId: "legal",
    preview: "dense-document",
    blurb: "Long-form scholarly structure for research and teaching CVs.",
    Component: AcademicTemplate,
  },
  {
    id: "modern-grid",
    name: "Modern Grid",
    category: "Modern",
    recommendedPaperSizeId: "a4",
    preview: "grid-cards",
    blurb: "Modular card-based layout with strong visual grouping.",
    Component: ModernGridTemplate,
  },
  {
    id: "boardroom-classic",
    name: "Boardroom Classic",
    category: "Formal",
    recommendedPaperSizeId: "a4",
    preview: "classic-header",
    blurb: "Refined executive layout with premium formal cadence.",
    Component: BoardroomClassicTemplate,
  },
  {
    id: "atlas-professional",
    name: "Atlas Professional",
    category: "Professional",
    recommendedPaperSizeId: "a4",
    preview: "grid-cards",
    blurb: "Recruiter-friendly presentation with strong summary and clean cards.",
    Component: AtlasProfessionalTemplate,
  },
  {
    id: "nordic-minimal",
    name: "Nordic Minimal",
    category: "Minimal",
    recommendedPaperSizeId: "a4",
    preview: "sidebar",
    blurb: "Airy left-rail composition with restrained Scandinavian tone.",
    Component: NordicMinimalTemplate,
  },
  {
    id: "signal-resume",
    name: "Signal Resume",
    category: "Professional",
    recommendedPaperSizeId: "a4",
    preview: "dense-document",
    blurb: "ATS-friendly single-column layout that keeps hierarchy extremely clear.",
    Component: SignalResumeTemplate,
  },
  {
    id: "literary-thesis",
    name: "Literary Thesis",
    category: "Academic",
    recommendedPaperSizeId: "legal",
    preview: "editorial-center",
    blurb: "Elegant long-form academic profile with journal-inspired rhythm.",
    Component: LiteraryThesisTemplate,
  },
  {
    id: "orbit-product",
    name: "Orbit Product",
    category: "Modern",
    recommendedPaperSizeId: "a4",
    preview: "dark-band",
    blurb: "Polished startup layout with bold hero treatment and modular content.",
    Component: OrbitProductTemplate,
  },
  {
    id: "regal-serif",
    name: "Regal Serif",
    category: "Formal",
    recommendedPaperSizeId: "a4",
    preview: "editorial-center",
    blurb: "Elegant serif-led resume with refined editorial proportions.",
    Component: RegalSerifTemplate,
  },
  {
    id: "ivory-executive",
    name: "Ivory Executive",
    category: "Formal",
    recommendedPaperSizeId: "a4",
    preview: "classic-header",
    blurb: "Premium executive sheet with ivory tone and understated authority.",
    Component: IvoryExecutiveTemplate,
  },
  {
    id: "research-dossier",
    name: "Research Dossier",
    category: "Academic",
    recommendedPaperSizeId: "legal",
    preview: "dense-document",
    blurb: "Structured academic dossier for publications, projects and long-form profiles.",
    Component: ResearchDossierTemplate,
  },
  {
    id: "grid-journal",
    name: "Grid Journal",
    category: "Creative",
    recommendedPaperSizeId: "a4",
    preview: "grid-cards",
    blurb: "Editorial modular layout that feels like a contemporary design journal.",
    Component: GridJournalTemplate,
  },
  {
    id: "studio-canvas",
    name: "Studio Canvas",
    category: "Creative",
    recommendedPaperSizeId: "a4",
    preview: "sidebar",
    blurb: "Creative portfolio resume with a bold studio-style color rail.",
    Component: StudioCanvasTemplate,
  },
  {
    id: "gallery-fold",
    name: "Gallery Fold",
    category: "Illustrative",
    recommendedPaperSizeId: "a4",
    preview: "split-hero",
    blurb: "Portfolio-first layout with framed content and warm gallery composition.",
    Component: GalleryFoldTemplate,
  },
  {
    id: "blueprint-systems",
    name: "Blueprint Systems",
    category: "Modern",
    recommendedPaperSizeId: "a4",
    preview: "grid-cards",
    blurb: "Technical systems layout with blueprint cues and clear delivery emphasis.",
    Component: BlueprintSystemsTemplate,
  },
  {
    id: "noir-contrast",
    name: "Noir Contrast",
    category: "Formal",
    recommendedPaperSizeId: "a4",
    preview: "dark-band",
    blurb: "Dark luxury resume with sharp contrast and understated gold accents.",
    Component: NoirContrastTemplate,
  },
  {
    id: "humanist-warm",
    name: "Humanist Warm",
    category: "Informal",
    recommendedPaperSizeId: "a4",
    preview: "classic-header",
    blurb: "Warm approachable resume with human-centered softness and clarity.",
    Component: HumanistWarmTemplate,
  },
  {
    id: "art-deco-line",
    name: "Art Deco Line",
    category: "Artistic",
    recommendedPaperSizeId: "a4",
    preview: "editorial-center",
    blurb: "Geometric deco-inspired hierarchy with elegant ornamental restraint.",
    Component: ArtDecoLineTemplate,
  },
  {
    id: "terracotta-story",
    name: "Terracotta Story",
    category: "Illustrative",
    recommendedPaperSizeId: "a4",
    preview: "split-hero",
    blurb: "Warm illustrated composition with story-driven portfolio energy.",
    Component: TerracottaStoryTemplate,
  },
  {
    id: "neo-brutal-brief",
    name: "Neo Brutal Brief",
    category: "Creative",
    recommendedPaperSizeId: "a4",
    preview: "grid-cards",
    blurb: "Bold brutalist layout with loud borders and poster-like punch.",
    Component: NeoBrutalBriefTemplate,
  },
  {
    id: "poster-persona",
    name: "Poster Persona",
    category: "Creative",
    recommendedPaperSizeId: "a4",
    preview: "dark-band",
    blurb: "High-impact poster style CV for standout creative identities.",
    Component: PosterPersonaTemplate,
  },
  {
    id: "column-ledger",
    name: "Column Ledger",
    category: "Formal",
    recommendedPaperSizeId: "a4",
    preview: "classic-header",
    blurb: "Structured ledger-inspired resume ideal for consulting and finance profiles.",
    Component: ColumnLedgerTemplate,
  },
];

export const getTemplate = (id: string) => templates.find((t) => t.id === id) ?? templates[0];

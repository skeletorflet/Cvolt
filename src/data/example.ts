import type { CVData } from "@/store/cvStore";
import type { AppLocale } from "@/store/cvStore";

export const exampleCV: CVData = {
  personal: {
    name: "Alex Morgan",
    title: "Senior Product Designer",
    email: "alex.morgan@email.com",
    phone: "+1 (415) 555-0142",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    website: "alexmorgan.design",
    photo: null,
    summary:
      "Senior product designer with 8+ years crafting intuitive digital experiences for fintech and SaaS. Led design systems that scaled to 200+ engineers, shipped products to 5M+ users, and mentored teams across three continents.",
  },
  avatar: {
    enabled: true,
    shape: "circle",
    size: 96,
    borderWidth: 2,
    borderColor: "#ffffff",
    effect: "shadow",
  },
  experience: [
    {
      id: "e1",
      company: "Stripe",
      role: "Senior Product Designer",
      start: "2022",
      end: "",
      current: true,
      location: "San Francisco",
      description: [
        "Led redesign of onboarding flow, lifting activation by 34% across 12 markets.",
        "Built and shipped a unified design system adopted by 14 product teams.",
        "Mentored 6 designers; partnered with research to run weekly usability studies.",
      ],
    },
    {
      id: "e2",
      company: "Airbnb",
      role: "Product Designer",
      start: "2019",
      end: "2022",
      current: false,
      location: "Remote",
      description: [
        "Owned end-to-end design for host tools used by 4M+ hosts globally.",
        "Shipped accessibility overhaul reaching WCAG 2.1 AA across core flows.",
      ],
    },
  ],
  education: [
    {
      id: "ed1",
      school: "Rhode Island School of Design",
      degree: "BFA, Graphic Design",
      field: "",
      start: "2014",
      end: "2018",
      details: "Honors. Thesis on adaptive interfaces.",
    },
  ],
  skills: [
    { id: "s1", name: "Product Design", level: 5 },
    { id: "s2", name: "Design Systems", level: 5 },
    { id: "s3", name: "Figma", level: 5 },
    { id: "s4", name: "User Research", level: 4 },
    { id: "s5", name: "Prototyping", level: 4 },
    { id: "s6", name: "HTML / CSS", level: 3 },
  ],
  languages: [
    { id: "l1", name: "English", level: "Native" },
    { id: "l2", name: "Spanish", level: "Fluent" },
    { id: "l3", name: "French", level: "Intermediate" },
  ],
  projects: [
    {
      id: "p1",
      name: "Atlas Design System",
      description: "Open-source component library and tokens used by 30+ companies.",
      url: "atlas.design",
      tech: ["React", "TypeScript", "Figma"],
    },
  ],
  certifications: [
    { id: "c1", name: "NN/g UX Master Certification", issuer: "Nielsen Norman Group", date: "2021", url: "" },
  ],
  sectionOrder: ["summary", "experience", "education", "skills", "projects", "languages", "certifications"],
  hiddenSections: [],
};

export const exampleCVByLocale: Record<AppLocale, CVData> = {
  en: exampleCV,
  es: {
    ...exampleCV,
    personal: {
      ...exampleCV.personal,
      title: "Disenadora Senior de Producto",
      summary:
        "Disenadora senior de producto con mas de 8 anos creando experiencias digitales intuitivas para fintech y SaaS. Lidere sistemas de diseno adoptados por mas de 200 ingenieros, lance productos para mas de 5 millones de usuarios y mentorie equipos en tres continentes.",
    },
    experience: [
      {
        ...exampleCV.experience[0],
        role: "Disenadora Senior de Producto",
        description: [
          "Lidere el rediseno del onboarding, aumentando la activacion en 34% en 12 mercados.",
          "Construi y lance un sistema de diseno unificado adoptado por 14 equipos de producto.",
          "Mentorie a 6 disenadores y colabore con research en pruebas de usabilidad semanales.",
        ],
      },
      {
        ...exampleCV.experience[1],
        role: "Disenadora de Producto",
        description: [
          "Gestione el diseno end-to-end de herramientas para anfitriones usadas por mas de 4 millones de hosts.",
          "Lance una mejora de accesibilidad que alcanzo WCAG 2.1 AA en los flujos centrales.",
        ],
      },
    ],
    education: [
      {
        ...exampleCV.education[0],
        details: "Graduacion con honores. Tesis sobre interfaces adaptativas.",
      },
    ],
    languages: [
      { id: "l1", name: "Ingles", level: "Nativo" },
      { id: "l2", name: "Espanol", level: "Fluido" },
      { id: "l3", name: "Frances", level: "Intermedio" },
    ],
    projects: [
      {
        ...exampleCV.projects[0],
        description: "Libreria open-source de componentes y tokens utilizada por mas de 30 empresas.",
      },
    ],
  },
};

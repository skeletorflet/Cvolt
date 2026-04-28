import type { CVData } from "@/store/cvStore";

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

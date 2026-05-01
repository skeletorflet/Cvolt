import type { CVData } from "@/store/cvStore";
import type { AppLocale } from "@/store/cvStore";

export const exampleCV: CVData = {
  personal: {
    name: "Alex Morgan",
    title: "Operations & Customer Service Specialist",
    email: "alex.morgan@email.com",
    phone: "+1 (415) 555-0142",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    website: "alexmorgan.design",
    photo: null,
    summary:
      "Service-oriented professional with 8+ years coordinating daily operations, customer support, and team workflows across retail and office environments. Recognized for improving service quality, organizing processes, and creating welcoming experiences for diverse communities.",
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
      company: "CityMart Superstore",
      role: "Front-of-House Supervisor",
      start: "2022",
      end: "",
      current: true,
      location: "San Francisco",
      description: [
        "Coordinated opening and closing shifts, cash handling, and daily team assignments for a high-traffic store.",
        "Improved checkout waiting times by reorganizing queue flow and service coverage during peak hours.",
        "Trained 10+ new staff members on customer care standards, conflict resolution, and point-of-sale procedures.",
      ],
    },
    {
      id: "e2",
      company: "GreenLeaf Community Center",
      role: "Administrative Assistant",
      start: "2019",
      end: "2022",
      current: false,
      location: "Remote",
      description: [
        "Managed appointment schedules, front-desk support, and documentation for social programs serving 300+ participants monthly.",
        "Prepared reports, updated records, and coordinated communication between families, instructors, and local partners.",
      ],
    },
  ],
  education: [
    {
      id: "ed1",
      school: "City College of San Francisco",
      degree: "Associate Degree, Business Administration",
      field: "",
      start: "2014",
      end: "2018",
      details: "Graduated with honors. Coursework in operations, communication, and organizational management.",
    },
  ],
  skills: [
    { id: "s1", name: "Customer Service", level: 5 },
    { id: "s2", name: "Team Coordination", level: 5 },
    { id: "s3", name: "Inventory Control", level: 4 },
    { id: "s4", name: "Cash Handling", level: 4 },
    { id: "s5", name: "Scheduling", level: 4 },
    { id: "s6", name: "Conflict Resolution", level: 4 },
  ],
  languages: [
    { id: "l1", name: "English", level: "Native" },
    { id: "l2", name: "Spanish", level: "Fluent" },
    { id: "l3", name: "French", level: "Intermediate" },
  ],
  projects: [
    {
      id: "p1",
      name: "Neighborhood Food Drive",
      description: "Co-organized a local donation campaign with volunteers and small businesses, supporting 120+ families.",
      url: "communityhelp.org",
      tech: ["Coordination", "Planning", "Volunteer Training"],
    },
  ],
  certifications: [
    { id: "c1", name: "Customer Service Excellence", issuer: "Retail Learning Institute", date: "2021", url: "" },
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
      title: "Especialista en Operaciones y Atención al Cliente",
      summary:
        "Profesional orientada al servicio con más de 8 años coordinando operaciones diarias, atención al cliente y flujos de trabajo en entornos de comercio y oficina. Reconocida por mejorar la calidad del servicio, organizar procesos y crear experiencias cercanas para comunidades diversas.",
    },
    experience: [
      {
        ...exampleCV.experience[0],
        company: "CityMart Superstore",
        role: "Supervisora de Atención en Sala",
        description: [
          "Coordiné aperturas y cierres de turno, manejo de caja y asignación diaria de tareas en una tienda de alta demanda.",
          "Mejoré los tiempos de espera en caja al reorganizar el flujo de filas y la cobertura en horarios pico.",
          "Capacité a más de 10 nuevos colaboradores en estándares de atención, resolución de conflictos y procedimientos de punto de venta.",
        ],
      },
      {
        ...exampleCV.experience[1],
        company: "GreenLeaf Community Center",
        role: "Asistente Administrativa",
        description: [
          "Gestioné agendas, atención de recepción y documentación para programas sociales con más de 300 participantes mensuales.",
          "Preparé reportes, actualicé registros y coordiné la comunicación entre familias, instructores y aliados locales.",
        ],
      },
    ],
    education: [
      {
        ...exampleCV.education[0],
        school: "City College of San Francisco",
        degree: "Título Asociado en Administración de Empresas",
        details: "Graduación con honores. Formación en operaciones, comunicación y gestión organizacional.",
      },
    ],
    skills: [
      { id: "s1", name: "Atención al cliente", level: 5 },
      { id: "s2", name: "Coordinación de equipos", level: 5 },
      { id: "s3", name: "Control de inventario", level: 4 },
      { id: "s4", name: "Manejo de caja", level: 4 },
      { id: "s5", name: "Planificación de turnos", level: 4 },
      { id: "s6", name: "Resolución de conflictos", level: 4 },
    ],
    languages: [
      { id: "l1", name: "Inglés", level: "Nativo" },
      { id: "l2", name: "Español", level: "Fluido" },
      { id: "l3", name: "Francés", level: "Intermedio" },
    ],
    projects: [
      {
        ...exampleCV.projects[0],
        name: "Campaña Barrial de Alimentos",
        description: "Coorganicé una campaña local de donaciones con voluntarios y comercios, apoyando a más de 120 familias.",
        tech: ["Coordinación", "Planificación", "Capacitación de voluntarios"],
      },
    ],
    certifications: [
      {
        id: "c1",
        name: "Excelencia en Atención al Cliente",
        issuer: "Retail Learning Institute",
        date: "2021",
        url: "",
      },
    ],
  },
};

import type { AppLocale } from "@/store/cvStore";

export type LocaleMessages = {
  localeLabel: string;
  languages: Record<AppLocale, string>;
  header: {
    tagline: string;
    loadExample: string;
    reset: string;
    clearConfirm: string;
    clearConfirmTitle: string;
    clearConfirmDescription: string;
    confirmAction: string;
    cancelAction: string;
    downloadPdf: string;
    rendering: string;
    languageSwitcherLabel: string;
    cvsGenerated: string;
    mobileTabEdit: string;
    mobileTabPreview: string;
  };
  preview: {
    presetsLayout: string;
    show: string;
    hide: string;
    zoomIn: string;
    zoomOut: string;
    modeAuto: string;
    modeNormal: string;
    modeCompact: string;
  };
  design: {
    tabTemplates: string;
    tabColors: string;
    tabFonts: string;
    density: string;
    paper: string;
    categories: string;
    presets: string;
    custom: string;
    reset: string;
    active: string;
    allCategories: string;
    templateCountSingular: string;
    templateCountPlural: string;
  };
  editor: {
    personal: string;
    summaryTitle: string;
    summaryLabel: string;
    summaryPlaceholder: string;
    words: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    languages: string;
    certifications: string;
    sectionOrder: string;
    add: string;
    remove: string;
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    company: string;
    role: string;
    start: string;
    end: string;
    currentlyHere: string;
    bullets: string;
    addBullet: string;
    removeBullet: string;
    school: string;
    degree: string;
    field: string;
    details: string;
    skill: string;
    language: string;
    name: string;
    url: string;
    description: string;
    techComma: string;
    issuer: string;
    date: string;
    emptyExperience: string;
    emptyEducation: string;
    emptySkills: string;
    emptyProjects: string;
    emptyLanguages: string;
    emptyCertifications: string;
    levelNative: string;
    levelFluent: string;
    levelIntermediate: string;
    levelBasic: string;
    placeholderName: string;
    placeholderTitle: string;
    placeholderStart: string;
    placeholderEnd: string;
    placeholderBullet: string;
  };
  avatar: {
    triggerTitle: string;
    triggerSubtitleHasPhoto: string;
    triggerSubtitleNoPhoto: string;
    title: string;
    description: string;
    preview: string;
    noPhoto: string;
    upload: string;
    camera: string;
    capture: string;
    close: string;
    remove: string;
    showAvatar: string;
    shape: string;
    effect: string;
    size: string;
    border: string;
    done: string;
    cameraError: string;
    shapeCircle: string;
    shapeOval: string;
    shapeSquare: string;
    shapeRectangle: string;
    shapeRounded: string;
    shapeFrame: string;
    effectNone: string;
    effectShadow: string;
    effectSoft: string;
    effectGlow: string;
    effectGrayscale: string;
  };
  root: {
    notFoundTitle: string;
    notFoundDescription: string;
    goHome: string;
  };
  sectionById: Record<string, string>;
  sectionAliases: Record<string, string>;
  common: {
    present: string;
    yourName: string;
    role: string;
    professionalResume: string;
  };
  templateCategories: Record<string, string>;
  fontNames: Record<string, string>;
  paletteNames: Record<string, string>;
  templateNames: Record<string, string>;
  templateBlurbs: Record<string, string>;
};

export const messages: Record<AppLocale, LocaleMessages> = {
  en: {
    localeLabel: "Language",
    languages: {
      en: "English",
      es: "Spanish",
    },
    header: {
      tagline: "Build CVs people actually read",
      loadExample: "Load example",
      reset: "Reset",
      clearConfirm: "Clear all CV data?",
      clearConfirmTitle: "Reset your CV?",
      clearConfirmDescription:
        "This action clears all fields, sections and current content. This cannot be undone.",
      confirmAction: "Reset CV",
      cancelAction: "Cancel",
      downloadPdf: "Download PDF",
      rendering: "Rendering...",
      languageSwitcherLabel: "Change language",
      cvsGenerated: "{{count}} CVs generated with Cvolt",
      mobileTabEdit: "Edit",
      mobileTabPreview: "Preview",
    },
    preview: {
      presetsLayout: "Presets & Layout",
      show: "Show",
      hide: "Hide",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      modeAuto: "Auto",
      modeNormal: "Normal",
      modeCompact: "Compact",
    },
    design: {
      tabTemplates: "Templates",
      tabColors: "Colors",
      tabFonts: "Fonts",
      density: "Density",
      paper: "Paper",
      categories: "Categories",
      presets: "Presets",
      custom: "Custom",
      reset: "Reset",
      active: "ACTIVE",
      allCategories: "All",
      templateCountSingular: "template",
      templateCountPlural: "templates",
    },
    editor: {
      personal: "Personal",
      summaryTitle: "Profile / Summary",
      summaryLabel: "Summary",
      summaryPlaceholder: "A short professional bio...",
      words: "words",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      languages: "Languages",
      certifications: "Certifications",
      sectionOrder: "Section order",
      add: "Add",
      remove: "Remove",
      fullName: "Full Name",
      title: "Title",
      email: "Email",
      phone: "Phone",
      location: "Location",
      website: "Website",
      linkedin: "LinkedIn",
      github: "GitHub",
      company: "Company",
      role: "Role",
      start: "Start",
      end: "End",
      currentlyHere: "Currently here",
      bullets: "Bullets",
      addBullet: "Add bullet",
      removeBullet: "Remove bullet",
      school: "School",
      degree: "Degree",
      field: "Field",
      details: "Details",
      skill: "Skill",
      language: "Language",
      name: "Name",
      url: "URL",
      description: "Description",
      techComma: "Tech (comma separated)",
      issuer: "Issuer",
      date: "Date",
      emptyExperience: "No experience yet.",
      emptyEducation: "No education yet.",
      emptySkills: "No skills yet.",
      emptyProjects: "No projects yet.",
      emptyLanguages: "No languages yet.",
      emptyCertifications: "No certifications yet.",
      levelNative: "Native",
      levelFluent: "Fluent",
      levelIntermediate: "Intermediate",
      levelBasic: "Basic",
      placeholderName: "Jane Doe",
      placeholderTitle: "Senior Engineer",
      placeholderStart: "2022",
      placeholderEnd: "2024",
      placeholderBullet: "Achievement or responsibility...",
    },
    avatar: {
      triggerTitle: "Avatar for CV",
      triggerSubtitleHasPhoto: "Edit photo, shape and effects",
      triggerSubtitleNoPhoto: "Upload or take photo",
      title: "Configure avatar",
      description:
        "Upload a photo or take one with your camera, then adjust shape, borders and effects for PDF.",
      preview: "Preview",
      noPhoto: "No photo",
      upload: "Upload",
      camera: "Camera",
      capture: "Capture",
      close: "Close",
      remove: "Remove",
      showAvatar: "Show avatar",
      shape: "Shape",
      effect: "Effect",
      size: "Size",
      border: "Border",
      done: "Done",
      cameraError: "Could not open camera. Check browser permissions.",
      shapeCircle: "Circle",
      shapeOval: "Oval",
      shapeSquare: "Square",
      shapeRectangle: "Rectangle",
      shapeRounded: "Rounded",
      shapeFrame: "Frame",
      effectNone: "No effect",
      effectShadow: "Shadow",
      effectSoft: "Soft shadow",
      effectGlow: "Glow",
      effectGrayscale: "Black and white",
    },
    root: {
      notFoundTitle: "Page not found",
      notFoundDescription: "The page you're looking for doesn't exist or has been moved.",
      goHome: "Go home",
    },
    sectionById: {
      summary: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      projects: "Projects",
      certifications: "Certifications",
    },
    sectionAliases: {
      Profile: "Profile",
      About: "About",
      Overview: "Overview",
      Snapshot: "Snapshot",
      Narrative: "Narrative",
      Statement: "Statement",
      Manifesto: "Manifesto",
      "System Overview": "System Overview",
      Experience: "Experience",
      "Professional Experience": "Professional Experience",
      "Career History": "Career History",
      "Delivery History": "Delivery History",
      Appointments: "Appointments",
      Education: "Education",
      Training: "Training",
      Skills: "Skills",
      Expertise: "Expertise",
      Strengths: "Strengths",
      Toolset: "Toolset",
      Toolchain: "Toolchain",
      "Core Skills": "Core Skills",
      "Creative Toolkit": "Creative Toolkit",
      "Technical Skills": "Technical Skills",
      Methods: "Methods",
      Languages: "Languages",
      Projects: "Projects",
      Portfolio: "Portfolio",
      "Selected Projects": "Selected Projects",
      "Impact Projects": "Impact Projects",
      "Selected Work": "Selected Work",
      "Featured Work": "Featured Work",
      "Research Projects": "Research Projects",
      Deployments: "Deployments",
      "Launches & Bets": "Launches & Bets",
      Certifications: "Certifications",
      Certs: "Certs",
      Awards: "Awards",
      Credentials: "Credentials",
      Recognition: "Recognition",
      Honors: "Honors",
      "Honors & Certifications": "Honors & Certifications",
      "Awards & Certifications": "Awards & Certifications",
      Contact: "Contact",
      Studies: "Studies",
      Work: "Work",
      "Research Statement": "Research Statement",
      "Research / Projects": "Research / Projects",
      "Executive Profile": "Executive Profile",
      "Leadership Profile": "Leadership Profile",
    },
    common: {
      present: "Present",
      yourName: "Your Name",
      role: "Role",
      professionalResume: "Professional Resume",
    },
    templateCategories: {
      Professional: "Professional",
      Modern: "Modern",
      Creative: "Creative",
      Minimal: "Minimal",
      Academic: "Academic",
      Formal: "Formal",
      Artistic: "Artistic",
      Illustrative: "Illustrative",
      Informal: "Informal",
    },
    fontNames: {
      classic: "Classic Editorial",
      modern: "Modern Sans",
      editorial: "Editorial Refined",
      tech: "Tech Mono",
      elegant: "Elegant Serif",
      bold: "Bold Statement",
      geometric: "Geometric Clean",
      sharp: "Sharp Impact",
      minimal: "Minimal Pro",
      creative: "Creative Fraunces",
      swiss: "Swiss Style",
      academic: "Academic",
    },
    paletteNames: {
      midnight: "Midnight",
      "navy-gold": "Navy & Gold",
      "charcoal-pro": "Charcoal Pro",
      "forest-pro": "Forest Pro",
      "slate-blue": "Slate Blue",
      electric: "Electric",
      "coral-modern": "Coral Modern",
      "ocean-deep": "Ocean Deep",
      "emerald-city": "Emerald City",
      sunset: "Sunset",
      "teal-pop": "Teal Pop",
      "pure-black": "Pure Black",
      "warm-gray": "Warm Gray",
      "sepia-classic": "Sepia Classic",
      "nordic-ice": "Nordic Ice",
      "harvard-crimson": "Harvard Crimson",
      "oxford-blue": "Oxford Blue",
      "clay-dust": "Clay & Dust",
      "lavender-pro": "Lavender Pro",
      "copper-age": "Copper Age",
    },
    templateNames: {
      corporate: "Corporate",
      "executive-dark": "Executive Dark",
      swiss: "Swiss Minimal",
      "creative-bold": "Creative Bold",
      "tech-sidebar": "Tech Sidebar",
      editorial: "Editorial",
      academic: "Academic",
      "modern-grid": "Modern Grid",
      "boardroom-classic": "Boardroom Classic",
      "atlas-professional": "Atlas Professional",
      "nordic-minimal": "Nordic Minimal",
      "signal-resume": "Signal Resume",
      "literary-thesis": "Literary Thesis",
      "orbit-product": "Orbit Product",
      "regal-serif": "Regal Serif",
      "ivory-executive": "Ivory Executive",
      "research-dossier": "Research Dossier",
      "grid-journal": "Grid Journal",
      "studio-canvas": "Studio Canvas",
      "gallery-fold": "Gallery Fold",
      "blueprint-systems": "Blueprint Systems",
      "noir-contrast": "Noir Contrast",
      "humanist-warm": "Humanist Warm",
      "art-deco-line": "Art Deco Line",
      "terracotta-story": "Terracotta Story",
      "neo-brutal-brief": "Neo Brutal Brief",
      "poster-persona": "Poster Persona",
      "column-ledger": "Column Ledger",
    },
    templateBlurbs: {},
  },
  es: {
    localeLabel: "Idioma",
    languages: {
      en: "Inglés",
      es: "Español",
    },
    header: {
      tagline: "Crea CVs que realmente se leen",
      loadExample: "Cargar ejemplo",
      reset: "Reiniciar",
      clearConfirm: "¿Quieres borrar todos los datos del CV?",
      clearConfirmTitle: "¿Reiniciar tu CV?",
      clearConfirmDescription:
        "Esta acción elimina todos los campos, secciones y contenido actual. No se puede deshacer.",
      confirmAction: "Sí, reiniciar",
      cancelAction: "Cancelar",
      downloadPdf: "Descargar PDF",
      rendering: "Renderizando...",
      languageSwitcherLabel: "Cambiar idioma",
      cvsGenerated: "{{count}} CVs generados con Cvolt",
      mobileTabEdit: "Editar",
      mobileTabPreview: "Vista previa",
    },
    preview: {
      presetsLayout: "Presets y Diseño",
      show: "Mostrar",
      hide: "Ocultar",
      zoomIn: "Acercar",
      zoomOut: "Alejar",
      modeAuto: "Auto",
      modeNormal: "Normal",
      modeCompact: "Compacto",
    },
    design: {
      tabTemplates: "Plantillas",
      tabColors: "Colores",
      tabFonts: "Fuentes",
      density: "Densidad",
      paper: "Papel",
      categories: "Categorías",
      presets: "Presets",
      custom: "Personalizado",
      reset: "Restablecer",
      active: "ACTIVO",
      allCategories: "Todas",
      templateCountSingular: "plantilla",
      templateCountPlural: "plantillas",
    },
    editor: {
      personal: "Personal",
      summaryTitle: "Perfil / Resumen",
      summaryLabel: "Resumen",
      summaryPlaceholder: "Una breve bio profesional...",
      words: "palabras",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      projects: "Proyectos",
      languages: "Idiomas",
      certifications: "Certificaciones",
      sectionOrder: "Orden de secciones",
      add: "Agregar",
      remove: "Eliminar",
      fullName: "Nombre completo",
      title: "Título",
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
      website: "Sitio web",
      linkedin: "LinkedIn",
      github: "GitHub",
      company: "Empresa",
      role: "Rol",
      start: "Inicio",
      end: "Fin",
      currentlyHere: "Trabajo actualmente aquí",
      bullets: "Puntos",
      addBullet: "Agregar punto",
      removeBullet: "Eliminar punto",
      school: "Institución",
      degree: "Título obtenido",
      field: "Área",
      details: "Detalles",
      skill: "Habilidad",
      language: "Idioma",
      name: "Nombre",
      url: "URL",
      description: "Descripción",
      techComma: "Tecnologías (separadas por coma)",
      issuer: "Emisor",
      date: "Fecha",
      emptyExperience: "Aún no hay experiencia.",
      emptyEducation: "Aún no hay educación.",
      emptySkills: "Aún no hay habilidades.",
      emptyProjects: "Aún no hay proyectos.",
      emptyLanguages: "Aún no hay idiomas.",
      emptyCertifications: "Aún no hay certificaciones.",
      levelNative: "Nativo",
      levelFluent: "Fluido",
      levelIntermediate: "Intermedio",
      levelBasic: "Básico",
      placeholderName: "Julian Pérez",
      placeholderTitle: "Ingeniero Senior",
      placeholderStart: "2022",
      placeholderEnd: "2024",
      placeholderBullet: "Logro o responsabilidad...",
    },
    avatar: {
      triggerTitle: "Avatar para CV",
      triggerSubtitleHasPhoto: "Editar foto, forma y efectos",
      triggerSubtitleNoPhoto: "Subir o tomar foto",
      title: "Configurar avatar",
      description:
        "Sube una foto o toma una con cámara, luego ajusta forma, bordes y efectos para el PDF.",
      preview: "Vista previa",
      noPhoto: "Sin foto",
      upload: "Subir",
      camera: "Cámara",
      capture: "Capturar",
      close: "Cerrar",
      remove: "Quitar",
      showAvatar: "Mostrar avatar",
      shape: "Forma",
      effect: "Efecto",
      size: "Tamaño",
      border: "Borde",
      done: "Listo",
      cameraError: "No se pudo abrir la cámara. Revisa permisos del navegador.",
      shapeCircle: "Circular",
      shapeOval: "Óvalo",
      shapeSquare: "Cuadrado",
      shapeRectangle: "Rectángulo",
      shapeRounded: "Redondeado",
      shapeFrame: "Marco",
      effectNone: "Sin efecto",
      effectShadow: "Sombra",
      effectSoft: "Sombra suave",
      effectGlow: "Brillo",
      effectGrayscale: "Blanco y negro",
    },
    root: {
      notFoundTitle: "Página no encontrada",
      notFoundDescription: "La página que buscas no existe o fue movida.",
      goHome: "Ir al inicio",
    },
    sectionById: {
      summary: "Perfil",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      languages: "Idiomas",
      projects: "Proyectos",
      certifications: "Certificaciones",
    },
    sectionAliases: {
      Profile: "Perfil",
      About: "Sobre mí",
      Overview: "Resumen",
      Snapshot: "Panorama",
      Narrative: "Narrativa",
      Statement: "Declaración",
      Manifesto: "Manifiesto",
      "System Overview": "Visión del sistema",
      Experience: "Experiencia",
      "Professional Experience": "Experiencia profesional",
      "Career History": "Trayectoria",
      "Delivery History": "Historial de entregas",
      Appointments: "Cargos",
      Education: "Educación",
      Training: "Formación",
      Skills: "Habilidades",
      Expertise: "Especialidad",
      Strengths: "Fortalezas",
      Toolset: "Herramientas",
      Toolchain: "Cadena de herramientas",
      "Core Skills": "Habilidades clave",
      "Creative Toolkit": "Toolkit creativo",
      "Technical Skills": "Habilidades técnicas",
      Methods: "Métodos",
      Languages: "Idiomas",
      Projects: "Proyectos",
      Portfolio: "Portafolio",
      "Selected Projects": "Proyectos destacados",
      "Impact Projects": "Proyectos de impacto",
      "Selected Work": "Trabajo destacado",
      "Featured Work": "Trabajo destacado",
      "Research Projects": "Proyectos de investigación",
      Deployments: "Despliegues",
      "Launches & Bets": "Lanzamientos y apuestas",
      Certifications: "Certificaciones",
      Certs: "Certs",
      Awards: "Reconocimientos",
      Credentials: "Certificaciones",
      Recognition: "Reconocimientos",
      Honors: "Honores",
      "Honors & Certifications": "Honores y certificaciones",
      "Awards & Certifications": "Premios y certificaciones",
      Contact: "Contacto",
      Studies: "Estudios",
      Work: "Trabajo",
      "Research Statement": "Declaración de investigación",
      "Research / Projects": "Investigación / Proyectos",
      "Executive Profile": "Perfil ejecutivo",
      "Leadership Profile": "Perfil de liderazgo",
    },
    common: {
      present: "Actual",
      yourName: "Tu Nombre",
      role: "Rol",
      professionalResume: "Currículum profesional",
    },
    templateCategories: {
      Professional: "Profesional",
      Modern: "Moderno",
      Creative: "Creativo",
      Minimal: "Minimal",
      Academic: "Académico",
      Formal: "Formal",
      Artistic: "Artístico",
      Illustrative: "Ilustrativo",
      Informal: "Informal",
    },
    fontNames: {
      classic: "Editorial Clásico",
      modern: "Sans Moderno",
      editorial: "Editorial Refinado",
      tech: "Mono Tech",
      elegant: "Serif Elegante",
      bold: "Declaración Intensa",
      geometric: "Geométrico Limpio",
      sharp: "Impacto Fuerte",
      minimal: "Minimal Pro",
      creative: "Creativo Fraunces",
      swiss: "Estilo Suizo",
      academic: "Académico",
    },
    paletteNames: {
      midnight: "Medianoche",
      "navy-gold": "Azul Marino y Oro",
      "charcoal-pro": "Carbón Profesional",
      "forest-pro": "Bosque Profesional",
      "slate-blue": "Azul Pizarra",
      electric: "Eléctrico",
      "coral-modern": "Coral Moderno",
      "ocean-deep": "Océano Profundo",
      "emerald-city": "Ciudad Esmeralda",
      sunset: "Atardecer",
      "teal-pop": "Turquesa Pop",
      "pure-black": "Negro Puro",
      "warm-gray": "Gris Cálido",
      "sepia-classic": "Sepia Clásico",
      "nordic-ice": "Hielo Nórdico",
      "harvard-crimson": "Carmesí Harvard",
      "oxford-blue": "Azul Oxford",
      "clay-dust": "Arcilla y Polvo",
      "lavender-pro": "Lavanda Profesional",
      "copper-age": "Era de Cobre",
    },
    templateNames: {
      corporate: "Corporativo",
      "executive-dark": "Ejecutivo Oscuro",
      swiss: "Suizo Minimal",
      "creative-bold": "Creativo Intenso",
      "tech-sidebar": "Sidebar Tech",
      editorial: "Editorial",
      academic: "Académico",
      "modern-grid": "Grid Moderno",
      "boardroom-classic": "Sala Ejecutiva Clásica",
      "atlas-professional": "Atlas Profesional",
      "nordic-minimal": "Nórdico Minimal",
      "signal-resume": "Signal Resume",
      "literary-thesis": "Tesis Literaria",
      "orbit-product": "Orbit Producto",
      "regal-serif": "Regal Serif",
      "ivory-executive": "Ejecutivo Marfil",
      "research-dossier": "Dossier de Investigación",
      "grid-journal": "Journal en Grid",
      "studio-canvas": "Lienzo de Estudio",
      "gallery-fold": "Folio Galería",
      "blueprint-systems": "Blueprint Systems",
      "noir-contrast": "Contraste Noir",
      "humanist-warm": "Humanista Cálido",
      "art-deco-line": "Línea Art Deco",
      "terracotta-story": "Historia Terracota",
      "neo-brutal-brief": "Neo Brutal Brief",
      "poster-persona": "Poster Persona",
      "column-ledger": "Columna Ledger",
    },
    templateBlurbs: {},
  },
};

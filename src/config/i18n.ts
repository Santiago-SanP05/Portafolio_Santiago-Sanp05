import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/**
 * config/i18n.ts — configuración de idioma para el portafolio.
 *
 * Import esto UNA sola vez, en tu punto de entrada (src/main.tsx),
 * antes de renderizar <App />:
 *
 *   import "./config/i18n";
 *
 * Uso en cualquier componente:
 *
 *   import { useTranslation } from "react-i18next";
 *   function MiComponente() {
 *     const { t } = useTranslation();
 *     return <h1>{t("home.titleLine1")}</h1>;
 *   }
 *
 * Para arrays (timeline de About, items de Projects/Skill), usa
 * returnObjects, y OJO: si ese array se usa para construir estado o
 * layout derivado (como el panal de Skill), tiene que recalcularse
 * cuando cambia el idioma — mételo en un useMemo con `i18n.language`
 * (o el propio array) en las dependencias, si no, queda pegado en el
 * idioma con el que montó el componente.
 *
 *   const items = t("skill.items", { returnObjects: true }) as SkillI18n[];
 *
 * IMPORTANTE: los datos que NO dependen del idioma (nombre, correo,
 * teléfono, URLs, rutas de imágenes, nombres de tecnologías, niveles
 * numéricos, títulos de proyecto) NO viven aquí — se quedan como
 * constantes literales en cada componente.
 */

const resources = {
  es: {
    translation: {
      nav: {
        home: "Inicio",
        about: "Sobre mí",
        projects: "Proyectos",
        skills: "Habilidades",
      },
      home: {
        badge: "PORTAFOLIO · 2026",
        titleLine1: "Diseño y código,",
        titleLine2: "en la misma línea.",
        bio: "{{name}} — Desarrollador frontend construyendo interfaces rápidas, cuidadas en el detalle y con una estética que se recuerda, con React, TypeScript y Tailwind CSS.",
        status: "Bucaramanga, Colombia · Disponible para nuevas oportunidades",
      },
      about: {
        badge: "SOBRE MÍ",
        greeting: "Hola, soy",
        availableBadge: "Disponible",
        bioP1:
          "Desarrollador frontend junior apasionado por la tecnología y el desarrollo de software, con habilidades en múltiples lenguajes de programación y un enfoque orientado a la mejora continua. Busco oportunidades para aplicar mis conocimientos en proyectos desafiantes y crecer profesionalmente dentro del ámbito del desarrollo Full Stack.",
        bioP2:
          "Cuando no estoy programando, sigo formándome en herramientas de IA aplicadas al desarrollo web y afinando interfaces en Figma — me gusta el código limpio tanto como una interfaz que se sienta bien al usar.",
        ctaProjects: "Ver proyectos",
        ctaSkills: "Ver habilidades",
        quickFacts: {
          location: { label: "Ubicación", value: "Bucaramanga, CO" },
          focus: { label: "Enfoque", value: "Frontend Jr." },
          languages: { label: "Idiomas", value: "ES / EN (A2)" },
          learning: { label: "Aprendiendo", value: "IA aplicada" },
        },
        timelineTitle: "Mi camino hasta acá",
        timeline: [
          {
            period: "Feb 2026 — Presente",
            role: "Técnico en Desarrollo de Procesos Informáticos",
            place: "Unidades Tecnológicas de Santander (UTS)",
            description:
              "Formación técnica enfocada en procesos de desarrollo de software y buenas prácticas de ingeniería.",
          },
          {
            period: "Mar — May 2025",
            role: "Desarrollador Frontend — Web UI",
            place: "Clon AI, Campuslands · Bucaramanga",
            description:
              "Desarrollo de aplicaciones web con React consumiendo APIs REST. Implementación de componentes reutilizables, interfaces UX/UI responsivas y trabajo colaborativo con Git y Scrum.",
          },
          {
            period: "Nov 2024 — Dic 2025",
            role: "Trainee Frontend IA",
            place: "Globant · Bucaramanga (remoto)",
            description:
              "Desarrollo de StudyWay, una plataforma de soporte con IA para centralizar herramientas y recursos de trainees. Diseño de interfaces en Figma, frontend con Angular y Tailwind CSS, e integración de la IA corporativa GEAI para automatizar procesos internos.",
          },
          {
            period: "Ene — Feb 2025",
            role: "Desarrollador Frontend",
            place: "Red Social ParchAap · Campuslands",
            description:
              "Interfaces web responsivas y componentes reutilizables con integración de APIs REST para la gestión de publicaciones, comentarios e interacción entre usuarios.",
          },
          {
            period: "Abr 2024 — Feb 2025",
            role: "Técnico Laboral en Desarrollo de Software",
            place: "Campuslands · Floridablanca",
            description:
              "Formación en fundamentos de programación, bases de datos y desarrollo web moderno, con proyectos aplicados de principio a fin.",
          },
        ],
      },
      projects: {
        badge: "PROYECTOS",
        titlePart1: "Lo último que",
        titlePart2: "construí.",
        hint: "Pasa el mouse sobre un panel",
        projectLabel: "PROYECTO",
        codeLabel: "Código",
        demoLabel: "Demo",
        items: [
          {
            tagline: "Plataforma de apoyo inteligente para trainees",
            description:
              "Plataforma web que centraliza herramientas clave, accesos rápidos, información organizacional y funcionalidades de IA en un solo lugar, facilitando el día a día de los usuarios durante su proceso de formación en Globant.",
          },
          {
            tagline: "Red social interactiva para compartir pensamientos",
            description:
              "Aplicación estilo Twitter donde los usuarios pueden crear publicaciones, comentarlas, darles 'me gusta', seguir a otras personas y personalizar su perfil, generando una comunidad conectada y activa.",
          },
          {
            tagline: "Plataforma nostálgica para fans de la saga",
            description:
              "Página creada para brindar nostalgia a los usuarios de Xbox con la saga más reconocida 'Halo', permitiendo iniciar sesión para acceder a chat, logros, clanes y batallas online. (Proyecto en desarrollo)",
          },
        ],
      },
      skill: {
        badge: "HABILIDADES",
        titlePart1: "Mi ecosistema de",
        titlePart2: "tecnologías.",
        hint: "Toca un hexágono naranja para ver el nivel y el detalle.",
        levelLabel: "Nivel",
        ariaTap: "Toca para ver el detalle.",
        ariaShowing: "Mostrando detalle.",
        ariaLabel: "{{name}}, nivel {{level}} por ciento. {{status}}",
        hud: {
          system: "HABILIDADES.SYS",
          nodes: "{{count}} NODOS · 3 ANILLOS",
        },
        items: [
          { description: "Interfaces complejas, hooks, arquitectura de componentes." },
          { description: "Tipado estricto en proyectos de producción." },
          { description: "Sistemas de diseño y UI a medida, sin CSS suelto." },
          { description: "SSR, rutas, optimización de rendimiento." },
          { description: "APIs REST, servicios y scripts de backend." },
          { description: "Esquemas, resolvers y consumo desde el cliente." },
          { description: "Flujos de ramas, revisiones y trabajo en equipo." },
          { description: "Modelado relacional y consultas optimizadas." },
          { description: "Contenedores para desarrollo y despliegue." },
          { description: "Prototipado y traducción de diseño a código." },
        ],
      },
      footer: {
        role: "Desarrollador Frontend Jr.",
        blurb: "Abierto a oportunidades y nuevos proyectos — escríbeme por cualquiera de estos medios.",
        labels: { email: "Correo", phone: "Celular" },
        madeWith: "Hecho con React & Tailwind.",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        skills: "Skills",
      },
      home: {
        badge: "PORTFOLIO · 2026",
        titleLine1: "Design and code,",
        titleLine2: "in the same line.",
        bio: "{{name}} — Frontend developer building fast interfaces, detail-oriented and with an aesthetic that sticks, using React, TypeScript, and Tailwind CSS.",
        status: "Bucaramanga, Colombia · Open to new opportunities",
      },
      about: {
        badge: "ABOUT ME",
        greeting: "Hi, I'm",
        availableBadge: "Available",
        bioP1:
          "Junior frontend developer passionate about technology and software development, with skills across multiple programming languages and a continuous-improvement mindset. Looking for opportunities to apply my knowledge on challenging projects and grow professionally within Full Stack development.",
        bioP2:
          "When I'm not coding, I keep learning AI tools applied to web development and refining interfaces in Figma — I care about clean code as much as an interface that feels right to use.",
        ctaProjects: "View projects",
        ctaSkills: "View skills",
        quickFacts: {
          location: { label: "Location", value: "Bucaramanga, CO" },
          focus: { label: "Focus", value: "Frontend Jr." },
          languages: { label: "Languages", value: "ES / EN (A2)" },
          learning: { label: "Currently learning", value: "Applied AI" },
        },
        timelineTitle: "My journey so far",
        timeline: [
          {
            period: "Feb 2026 — Present",
            role: "Technician in Computer Process Development",
            place: "Unidades Tecnológicas de Santander (UTS)",
            description:
              "Technical training focused on software development processes and good engineering practices.",
          },
          {
            period: "Mar — May 2025",
            role: "Frontend Developer — Web UI",
            place: "Clon AI, Campuslands · Bucaramanga",
            description:
              "Web application development with React consuming REST APIs. Implementation of reusable components, responsive UX/UI interfaces, and collaborative work with Git and Scrum.",
          },
          {
            period: "Nov 2024 — Dec 2025",
            role: "Frontend AI Trainee",
            place: "Globant · Bucaramanga (remote)",
            description:
              "Development of StudyWay, an AI-powered support platform to centralize tools and resources for trainees. UI design in Figma, frontend with Angular and Tailwind CSS, and integration of Globant's corporate AI (GEAI) to automate internal processes.",
          },
          {
            period: "Jan — Feb 2025",
            role: "Frontend Developer",
            place: "ParchAap Social Network · Campuslands",
            description:
              "Responsive web interfaces and reusable components with REST API integration for managing posts, comments, and user interaction.",
          },
          {
            period: "Apr 2024 — Feb 2025",
            role: "Vocational Technician in Software Development",
            place: "Campuslands · Floridablanca",
            description:
              "Training in programming fundamentals, databases, and modern web development, with end-to-end applied projects.",
          },
        ],
      },
      projects: {
        badge: "PROJECTS",
        titlePart1: "The latest thing",
        titlePart2: "I built.",
        hint: "Hover over a panel",
        projectLabel: "PROJECT",
        codeLabel: "Code",
        demoLabel: "Demo",
        items: [
          {
            tagline: "Smart support platform for trainees",
            description:
              "Web platform that centralizes key tools, quick access, organizational info, and AI features in one place, making day-to-day life easier for users during their training process at Globant.",
          },
          {
            tagline: "Interactive social network for sharing thoughts",
            description:
              "Twitter-style application where users can create posts, comment, like, follow other people, and customize their profile, building a connected and active community.",
          },
          {
            tagline: "Nostalgic hub for fans of the saga",
            description:
              "A page built to bring nostalgia to Xbox users with the most iconic saga, 'Halo,' letting them log in to access chat, achievements, clans, and online battles. (Project in progress)",
          },
        ],
      },
      skill: {
        badge: "SKILLS",
        titlePart1: "My ecosystem of",
        titlePart2: "technologies.",
        hint: "Tap an orange hexagon to see the level and details.",
        levelLabel: "Level",
        ariaTap: "Tap to see the detail.",
        ariaShowing: "Showing detail.",
        ariaLabel: "{{name}}, level {{level}} percent. {{status}}",
        hud: {
          system: "SKILLS.SYS",
          nodes: "{{count}} NODES · 3 RINGS",
        },
        items: [
          { description: "Complex interfaces, hooks, component architecture." },
          { description: "Strict typing in production projects." },
          { description: "Custom design systems and UI, no loose CSS." },
          { description: "SSR, routing, performance optimization." },
          { description: "REST APIs, services, and backend scripts." },
          { description: "Schemas, resolvers, and client-side consumption." },
          { description: "Branching workflows, reviews, and teamwork." },
          { description: "Relational modeling and optimized queries." },
          { description: "Containers for development and deployment." },
          { description: "Prototyping and translating design into code." },
        ],
      },
      footer: {
        role: "Junior Frontend Developer",
        blurb: "Open to opportunities and new projects — reach out through any of these.",
        labels: { email: "Email", phone: "Phone" },
        madeWith: "Made with React & Tailwind.",
      },
    },
  },
};

i18n
  .use(LanguageDetector) // detecta el idioma del navegador / localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    interpolation: { escapeValue: false }, // React ya escapa por defecto
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"], // recuerda la elección del usuario
    },
  });

export default i18n;
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectsBackground3D from "../../components/Projectsbackground3d";


type ProjectMeta = {
  number: string;
  title: string;
  tech: string[];
  github: string;
  demo?: string;
  accent: "secondary" | "highlight" | "accent";
  image?: string;
};

type ProjectI18n = { tagline: string; description: string };

const PROJECTS_META: ProjectMeta[] = [
  {
    number: "01",
    title: "StudyWay",
    tech: ["Angular", "TypeScript", "TailwindCSS", "Figma"],
    github: "https://github.com/Santiago-SanP05/StudyWay.git",
    demo: "https://studyway.vercel.app",
    accent: "secondary",
    image: "/imgProyects/Studyway.png",
  },
  {
    number: "02",
    title: "ParchApp",
    tech: ["Java", "Spring Boot", "MySQL", "JavaScript"],
    github: "https://github.com/Santiago-SanP05/ParchApp.git",
    demo: "https://parchapp.vercel.app",
    accent: "highlight",
    image: "/imgProyects/Parchapp.png",
  },
  {
    number: "03",
    title: "HALO",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    github: "https://github.com/Santiago-SanP05/PROYECTO-FILTRO_SANTACRUZSANTIAGO.git",
    demo: undefined,
    accent: "accent",
    image: "/imgProyects/HaloProyect.png",
  },
];

const ACCENT_CLASSES: Record<ProjectMeta["accent"], { text: string; from: string; ring: string }> = {
  secondary: { text: "text-secondary", from: "from-secondary", ring: "ring-secondary/40" },
  highlight: { text: "text-highlight", from: "from-highlight", ring: "ring-highlight/40" },
  accent: { text: "text-accent", from: "from-accent", ring: "ring-accent/40" },
};

function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.42.36.78 1.08.78 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function ExternalIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5m0 0v5m0-5L10 14M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function ProjectPanel({
  meta,
  i18nData,
  isActive,
  onActivate,
  index,
  t,
}: {
  meta: ProjectMeta;
  i18nData: ProjectI18n;
  isActive: boolean;
  onActivate: () => void;
  index: number;
  t: (key: string) => string;
}) {
  const accent = ACCENT_CLASSES[meta.accent];

  return (
    <div
      onMouseEnter={onActivate}
      onClick={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      className={`project-panel-enter relative h-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-sm transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 ${accent.ring}`}
      style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0, animationDelay: `${index * 120}ms` }}
    >
      {meta.image && (
        <div className="absolute inset-0 z-0">
          <img src={meta.image} alt={meta.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <span
        className={`pointer-events-none absolute -bottom-6 -right-2 select-none font-display font-bold text-text-primary/[0.04] transition-all duration-700 ${
          isActive ? "text-[14rem]" : "text-[9rem]"
        }`}
      >
        {meta.number}
      </span>

      <div className={`absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r ${accent.from} to-transparent`} />

      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-between p-6 transition-opacity duration-500 ${
          isActive ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span className={`font-mono text-xs ${accent.text}`}>{meta.number}</span>
        <span className="font-display text-lg font-semibold tracking-tight text-text-primary [writing-mode:vertical-rl]">
          {meta.title}
        </span>
        <span className="h-6 w-px bg-border" />
      </div>

      <div
        className={`absolute inset-0 z-10 flex flex-col justify-end p-7 transition-opacity duration-500 sm:p-9 ${
          isActive ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
        }`}
      >
        <span className={`mb-2 font-mono text-xs tracking-widest ${accent.text}`}>
          {t("projects.projectLabel")} {meta.number}
        </span>

        <h3 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
          {meta.title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary sm:text-base">{i18nData.tagline}</p>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
          {i18nData.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {meta.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-background-alt/60 px-3 py-1 font-mono text-[10px] text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={meta.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2 font-mono text-xs font-medium text-text-dark transition-transform duration-200 hover:scale-105"
          >
            <GitHubIcon />
            {t("projects.codeLabel")}
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = t("projects.items", { returnObjects: true }) as ProjectI18n[];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background font-body">
      {/* Fondo 3D */}
      <div className="absolute inset-0 z-0">
        <ProjectsBackground3D />
      </div>

      <div className="pointer-events-none absolute -left-24 top-0 z-0 h-[24rem] w-[24rem] rounded-full bg-primary/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 z-0 h-[24rem] w-[24rem] rounded-full bg-secondary/15 blur-[130px]" />



      <div className="relative z-10 flex h-full w-full flex-col px-5 pb-6 pt-24 sm:px-8 lg:px-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-background-alt/60 px-4 py-1.5 font-mono text-xs tracking-widest text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
              {t("projects.badge")}
            </span>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
              {t("projects.titlePart1")}{" "}
              <span className="bg-gradient-to-r from-secondary via-accent to-highlight bg-clip-text text-transparent">
                {t("projects.titlePart2")}
              </span>
            </h1>
          </div>
          <p className="hidden font-mono text-xs text-text-secondary sm:block">{t("projects.hint")}</p>
        </div>




        <div className="flex min-h-0 flex-1 gap-4">
          {PROJECTS_META.map((meta, i) => (
            <ProjectPanel
              key={meta.title}
              meta={meta}
              i18nData={items[i]}
              index={i}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
              t={t}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes panelEnter {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .project-panel-enter {
          animation: panelEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .project-panel-enter { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default Projects;
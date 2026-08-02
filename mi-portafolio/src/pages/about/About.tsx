import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProjectsBackground3D from "../../components/Projectsbackground3d";
import Footer from "./Footer"; 

const NAME = "Santiago Santacruz";

const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

type QuickFact = { label: string; value: string };
type TimelineItem = { period: string; role: string; place: string; description: string };

function Avatar() {
  return (
    <div className="relative mx-auto h-56 w-48 sm:h-64 sm:w-56">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-secondary/25 blur-[70px]" />
      <div
        className="absolute inset-0 flex items-center justify-center border border-border bg-gradient-to-br from-surface to-background-alt"
        style={{ clipPath: HEX_CLIP }}
      >
        <span className="font-display text-6xl font-bold text-text-primary/20">SS</span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 border-2 border-highlight/30"
        style={{ clipPath: HEX_CLIP }}
      />
    </div>
  );
}

function About() {
  const { t } = useTranslation();

  const quickFactKeys = ["location", "focus", "languages", "learning"] as const;
  const quickFacts: QuickFact[] = quickFactKeys.map((key) =>
    t(`about.quickFacts.${key}`, { returnObjects: true })
  ) as QuickFact[];

  const timeline = t("about.timeline", { returnObjects: true }) as TimelineItem[];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background font-body">
      <div className="absolute inset-0 z-0">
        <ProjectsBackground3D />
      </div>

      <div className="pointer-events-none absolute -left-32 top-24 z-0 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 z-0 h-[26rem] w-[26rem] rounded-full bg-secondary/15 blur-[140px]" />

      <div className="relative z-10 px-6 pb-16 pt-32 lg:px-16">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background-alt/60 px-4 py-1.5 font-mono text-xs tracking-widest text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
                {t("about.badge")}
              </span>

              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary sm:text-5xl">
                {t("about.greeting")}{" "}
                <span className="bg-gradient-to-r from-secondary via-accent to-highlight bg-clip-text text-transparent">
                  {NAME}.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-text-secondary">{t("about.bioP1")}</p>
              <p className="mt-4 max-w-lg text-text-secondary">{t("about.bioP2")}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/proyect"
                  className="rounded-full bg-gradient-to-r from-secondary to-highlight px-6 py-2.5 font-mono text-sm font-medium text-text-dark transition-transform duration-200 hover:scale-105"
                >
                  {t("about.ctaProjects")}
                </Link>
                <Link
                  to="/Skill"
                  className="rounded-full border border-border bg-surface/40 px-6 py-2.5 font-mono text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-highlight/50 hover:text-text-primary"
                >
                  {t("about.ctaSkills")}
                </Link>
              </div>
            </div>

            <Avatar />
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-border bg-surface/40 px-4 py-4 text-center backdrop-blur-sm"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                  {fact.label}
                </p>
                <p className="mt-1.5 font-display text-sm font-semibold text-text-primary">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="mb-8 font-display text-2xl font-semibold text-text-primary">
              {t("about.timelineTitle")}
            </h2>

            <div className="relative border-l border-border pl-8">
              {timeline.map((item, i) => (
                <div key={item.period} className={i === timeline.length - 1 ? "" : "mb-10"}>
                  <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-background bg-highlight" />
                  <p className="font-mono text-xs tracking-wide text-highlight">{item.period}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-text-primary">
                    {item.role} <span className="text-text-secondary">· {item.place}</span>
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
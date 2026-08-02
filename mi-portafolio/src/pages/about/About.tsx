import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProjectsBackground3D from "../../components/Projectsbackground3d";
import Footer from "./Footer";

const NAME = "Santiago Santacruz";

const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

type QuickFact = { label: string; value: string };
type TimelineItem = { period: string; role: string; place: string; description: string };

const AVATAR_SRC = "/avatar.jpg";

function Avatar() {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative mx-auto h-60 w-52 sm:h-72 sm:w-64">
      <div className="pointer-events-none absolute -inset-3 rounded-full bg-secondary/25 blur-[55px] sm:-inset-4 sm:blur-[70px]" />
      <div className="pointer-events-none absolute -inset-1 rounded-full bg-highlight/15 blur-[45px] sm:blur-[55px]" />



      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -rotate-6 scale-95 border border-border/50"
        style={{ clipPath: HEX_CLIP }}
      />



      <div
        className="absolute inset-0 bg-gradient-to-br from-secondary via-accent to-highlight shadow-[0_20px_50px_-15px_rgba(233,114,76,0.5)]"
        style={{ clipPath: HEX_CLIP }}
      >
        <div
          className="absolute inset-[3px] overflow-hidden bg-background-alt sm:inset-1"
          style={{ clipPath: HEX_CLIP }}
        >
          {!imgError ? (
            <img
              src={AVATAR_SRC}
              alt={NAME}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-background-alt">
              <span className="font-display text-6xl font-bold text-text-primary/20">SS</span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-1 right-1 flex items-center gap-1.5 rounded-full border border-border bg-background-alt/90 px-2.5 py-1 shadow-lg backdrop-blur-sm sm:bottom-2 sm:right-2">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        <span className="font-mono text-[9px] text-text-secondary">{t("about.availableBadge")}</span>
      </div>
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

      <div className="pointer-events-none absolute -left-24 top-20 z-0 h-64 w-64 rounded-full bg-primary/25 blur-[100px] sm:-left-32 sm:top-24 sm:h-[26rem] sm:w-[26rem] sm:blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 z-0 h-56 w-56 rounded-full bg-secondary/15 blur-[100px] sm:-right-32 sm:h-[26rem] sm:w-[26rem] sm:blur-[140px]" />

      <div className="relative z-10 px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-16">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="order-2 lg:order-1">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background-alt/60 px-4 py-1.5 font-mono text-xs tracking-widest text-text-secondary sm:mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
                {t("about.badge")}
              </span>

              <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                {t("about.greeting")}{" "}
                <span className="bg-gradient-to-r from-secondary via-accent to-highlight bg-clip-text text-transparent">
                  {NAME}.
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-sm text-text-secondary sm:mt-5 sm:text-base">
                {t("about.bioP1")}
              </p>
              <p className="mt-3 max-w-lg text-sm text-text-secondary sm:mt-4 sm:text-base">
                {t("about.bioP2")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
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

            <div className="order-1 lg:order-2">
              <Avatar />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 sm:grid-cols-4">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-border bg-surface/40 px-3 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-4"
              >
                <p className="font-mono text-[9px] uppercase tracking-widest text-text-secondary sm:text-[10px]">
                  {fact.label}
                </p>
                <p className="mt-1.5 font-display text-xs font-semibold text-text-primary sm:text-sm">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 sm:mt-20">
            <h2 className="mb-6 font-display text-xl font-semibold text-text-primary sm:mb-8 sm:text-2xl">
              {t("about.timelineTitle")}
            </h2>

            <div className="relative border-l border-border pl-6 sm:pl-8">
              {timeline.map((item, i) => (
                <div key={item.period} className={i === timeline.length - 1 ? "" : "mb-8 sm:mb-10"}>
                  <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-background bg-highlight" />
                  <p className="font-mono text-xs tracking-wide text-highlight">{item.period}</p>
                  <h3 className="mt-1 font-display text-base font-semibold text-text-primary sm:text-lg">
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
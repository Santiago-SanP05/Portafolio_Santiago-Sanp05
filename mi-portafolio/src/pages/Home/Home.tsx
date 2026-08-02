import { useTranslation } from "react-i18next";
import PolygonExplosion from "../../components/Polygonexplosion";

const NAME = "Santiago Santacruz Pinzón";

function Home() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-body">
      <div
        aria-hidden="true"
        className="hero-glow-a pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-primary/40 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="hero-glow-b pointer-events-none absolute -right-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-[130px]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] [perspective:600px]">
        <div
          className="hero-grid absolute inset-0 origin-bottom [transform:rotateX(62deg)]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to top, black, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent)",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-highlight), var(--color-secondary), transparent)",
            boxShadow: "0 0 40px 4px var(--color-highlight)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:gap-12 lg:px-12">
        <div className="flex flex-col items-start">
          <span className="hero-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background-alt/60 px-4 py-1.5 font-mono text-xs tracking-widest text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
            {t("home.badge")}
          </span>

          <h1
            className="hero-fade-in font-display text-5xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            {t("home.titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-secondary via-accent to-highlight bg-clip-text text-transparent">
              {t("home.titleLine2")}
            </span>
          </h1>

          <p
            className="hero-fade-in mt-6 max-w-md text-lg leading-relaxed text-text-secondary"
            style={{ animationDelay: "200ms" }}
          >
            {t("home.bio", { name: NAME })}
          </p>

          <div
            className="hero-fade-in mt-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-background-alt/50 px-4 py-2 font-mono text-xs tracking-wide text-text-secondary"
            style={{ animationDelay: "260ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t("home.status")}
          </div>
        </div>

        <div className="relative hidden h-[29rem] lg:block">
          <PolygonExplosion />
        </div>
      </div>

      <style>{`
        @keyframes heroFadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-in {
          animation: heroFadeInUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-glow-a { animation: pulseGlow 8s ease-in-out infinite; }
        .hero-glow-b { animation: pulseGlow 10s ease-in-out infinite reverse; }
        .hero-grid { animation: gridDrift 14s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-in, .hero-glow-a, .hero-glow-b, .hero-grid {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
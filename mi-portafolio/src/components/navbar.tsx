import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../config/i18n"

function GlobeIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        d="M3 12h18M12 3c2.5 2.6 3.8 5.8 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.8-3.8-9S9.5 5.6 12 3Z"
      />
    </svg>
  );
}


function useHideOnScroll(threshold = 80) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY.current;
        setHidden(goingDown && y > threshold);
        lastY.current = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}

function Navbar() {
  const hidden = useHideOnScroll();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language.slice(0, 2).toUpperCase();

  function toggleLanguage() {
    const next = currentLang === "ES" ? "en" : "es";
    i18n.changeLanguage(next);
  }

  const NAV_LINKS = [
    { to: "/", label: t("nav.home") },
    { to: "/sobre-mi", label: t("nav.about") },
    { to: "/proyect", label: t("nav.projects") },
    { to: "/Skill", label: t("nav.skills") },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-6 z-50 flex justify-center px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-4 scale-90 opacity-0" : "translate-y-0 scale-100 opacity-100"
      }`}
    >
      <div className="flex items-center gap-1 rounded-full border border-border/60 bg-gradient-to-b from-background-alt/85 to-background-alt/55 p-1.5 shadow-[0_10px_34px_-10px_rgba(233,114,76,0.4)] backdrop-blur-xl">
        <div className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-highlight font-display text-xs font-bold text-text-dark">
          SS
        </div>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-body text-sm font-medium transition-all duration-200 hover:scale-[1.03] ${
                  isActive
                    ? "bg-surface/70 text-highlight"
                    : "text-text-secondary hover:bg-surface/30 hover:text-text-primary"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="mx-1 h-5 w-px bg-border/60" />

        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-xs font-medium text-text-secondary transition-colors duration-200 hover:bg-surface/30 hover:text-highlight"
          aria-label="Cambiar idioma"
        >
          <GlobeIcon />
          {currentLang}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
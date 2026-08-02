import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

function MenuIcon({ open, className = "h-4 w-4" }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

/**
 * Oculta el navbar al hacer scroll hacia abajo, lo muestra al subir.
 * En páginas sin scroll (Home, Projects, Skill en desktop) simplemente
 * nunca dispara — el navbar queda siempre visible, que es lo correcto ahí.
 */
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
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú mobile automáticamente al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 font-body text-sm font-medium transition-all duration-200 hover:scale-[1.03] ${
      isActive
        ? "bg-surface/70 text-highlight"
        : "text-text-secondary hover:bg-surface/30 hover:text-text-primary"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 font-body text-sm font-medium transition-colors duration-200 ${
      isActive ? "bg-surface/70 text-highlight" : "text-text-secondary hover:bg-surface/40 hover:text-text-primary"
    }`;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-6 ${
          hidden ? "-translate-y-4 scale-90 opacity-0" : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-border/60 bg-gradient-to-b from-background-alt/85 to-background-alt/55 p-1.5 shadow-[0_10px_34px_-10px_rgba(233,114,76,0.4)] backdrop-blur-xl">
          {/* Marca */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-highlight font-display text-xs font-bold text-text-dark">
            SS
          </div>

          {/* Links: solo desde md hacia arriba */}
          <div className="ml-1 hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="mx-1 hidden h-5 w-px bg-border/60 md:block" />

          {/* Idioma: siempre visible */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="ml-1 flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-xs font-medium text-text-secondary transition-colors duration-200 hover:bg-surface/30 hover:text-highlight md:ml-0"
            aria-label="Cambiar idioma"
          >
            <GlobeIcon />
            {currentLang}
          </button>

          {/* Hamburguesa: solo debajo de md */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors duration-200 hover:bg-surface/30 hover:text-text-primary md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Overlay: cierra el menú al tocar fuera */}
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-background/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Menú desplegable mobile */}
      <div
        className={`fixed inset-x-4 top-20 z-50 origin-top rounded-2xl border border-border/60 bg-gradient-to-b from-background-alt/95 to-background-alt/80 p-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-24 md:hidden ${
          menuOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === "/"} className={mobileLinkClass}>
            {label}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Navbar;
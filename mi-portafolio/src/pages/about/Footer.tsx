import { useTranslation } from "react-i18next";

const NAME = "Santiago Santacruz";
const EMAIL = "santiagopinzoncruz@gmail.com";
const PHONE_DISPLAY = "+57 350 811 5170";
const PHONE_HREF = "+573508115170";
const GITHUB_URL = "https://github.com/Santiago-SanP05";
const LINKEDIN_URL = "https://www.linkedin.com/in/santiago-santacruz-pinzon-3b2951337/";

function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.42.36.78 1.08.78 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 4.5h4l1.5 5-2.3 1.5a11.5 11.5 0 0 0 5.8 5.8l1.5-2.3 5 1.5v4c0 .8-.7 1.5-1.5 1.5C10.5 21.5 2.5 13.5 2 6c0-.8.6-1.5 1.4-1.5Z"
      />
    </svg>
  );
}

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const CONTACT_LINKS = [
    { label: "GitHub", value: "Santiago-SanP05", href: GITHUB_URL, icon: GitHubIcon, external: true },
    { label: "LinkedIn", value: "santiago-santacruz", href: LINKEDIN_URL, icon: LinkedInIcon, external: true },
    { label: t("footer.labels.email"), value: EMAIL, href: `mailto:${EMAIL}`, icon: MailIcon, external: false },
    {
      label: t("footer.labels.phone"),
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_HREF}`,
      icon: PhoneIcon,
      external: false,
    },
  ];

  return (
    <footer className="relative z-10 mt-20 w-full border-t border-border bg-background-alt/70 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-text-primary">{NAME}</p>
            <p className="mt-1 text-sm text-text-secondary">{t("footer.role")}</p>
            <p className="mt-4 max-w-xs text-sm text-text-secondary">{t("footer.blurb")}</p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {CONTACT_LINKS.map(({ label, value, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface/40 px-4 py-3 transition-colors duration-200 hover:border-highlight/50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-alt text-text-secondary transition-colors duration-200 group-hover:text-highlight">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                    {label}
                  </span>
                  <span className="block truncate text-sm text-text-primary">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center font-mono text-xs text-text-secondary sm:text-left">
          © {year} {NAME}. {t("footer.madeWith")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
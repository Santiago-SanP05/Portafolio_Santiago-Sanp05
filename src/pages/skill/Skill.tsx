import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";


type SkillMeta = { name: string; level: number };

const SKILLS_META: SkillMeta[] = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 80 },
  { name: "TypeScript", level: 76 },
  { name: "Angular", level: 72 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Git & GitHub", level: 85 },
  { name: "Figma", level: 90 },
  { name: "UI/UX", level: 69 },
];


const HEX_SIZE = 4.2;
const HEX_W = HEX_SIZE * 2;
const HEX_H = Math.sqrt(3) * HEX_SIZE;
const CENTER_W = HEX_W * 1.2;
const CENTER_H = HEX_H * 1.2;
const HONEYCOMB_W = 48; 
const HONEYCOMB_H = 52; 

const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
const PRIMARY_RGB = "30,58,138";
const SECONDARY_RGB = "233,114,76";
const HIGHLIGHT_RGB = "246,196,83";
const ACCENT_RGB = "242,163,101";

const HEX_DIRECTIONS = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

function hexRing(radius: number): { q: number; r: number }[] {
  if (radius === 0) return [{ q: 0, r: 0 }];
  const results: { q: number; r: number }[] = [];
  let hex = { q: HEX_DIRECTIONS[4].q * radius, r: HEX_DIRECTIONS[4].r * radius };
  for (let side = 0; side < 6; side++) {
    for (let step = 0; step < radius; step++) {
      results.push({ ...hex });
      hex = { q: hex.q + HEX_DIRECTIONS[side].q, r: hex.r + HEX_DIRECTIONS[side].r };
    }
  }
  return results;
}

function axialToRem(q: number, r: number) {
  const x = HEX_SIZE * 1.5 * q;
  const y = HEX_SIZE * ((Math.sqrt(3) / 2) * q + Math.sqrt(3) * r);
  return { x, y };
}

type Cell = { q: number; r: number; ring: 1 | 2 | 3; skill?: SkillMeta };

function buildCells(skills: SkillMeta[]): Cell[] {
  const cells: Cell[] = [];
  let i = 0;

  const ring1Pattern: boolean[] = [true, false, true, false, true, false];
  hexRing(1).forEach((hex, idx) => {
    cells.push({ ...hex, ring: 1, skill: ring1Pattern[idx] ? skills[i++] : undefined });
  });

  const ring2Pattern: boolean[] = [
    true, false, true, false, false, true, false, false, true, false, false, true,
  ];
  hexRing(2).forEach((hex, idx) => {
    cells.push({ ...hex, ring: 2, skill: ring2Pattern[idx] ? skills[i++] : undefined });
  });

  hexRing(3).forEach((hex) => {
    cells.push({ ...hex, ring: 3, skill: undefined });
  });

  return cells;
}

const CELLS = buildCells(SKILLS_META);
const RING_CELLS: Record<1 | 2 | 3, Cell[]> = {
  1: CELLS.filter((c) => c.ring === 1),
  2: CELLS.filter((c) => c.ring === 2),
  3: CELLS.filter((c) => c.ring === 3),
};

const RING_CONFIG: Record<1 | 2 | 3, { duration: number; dir: "cw" | "ccw" }> = {
  1: { duration: 46, dir: "cw" },
  2: { duration: 74, dir: "ccw" },
  3: { duration: 104, dir: "cw" },
};

const FAKE_OPACITY: Record<1 | 2 | 3, number> = { 1: 0.3, 2: 0.15, 3: 0.06 };

function buildHexRingPath(innerScale: number): string {
  const cx = 50;
  const cy = 43.3;
  const w = 100;
  const h = 86.6;
  const outer = [
    [cx - w * 0.25, cy - h / 2],
    [cx + w * 0.25, cy - h / 2],
    [cx + w * 0.5, cy],
    [cx + w * 0.25, cy + h / 2],
    [cx - w * 0.25, cy + h / 2],
    [cx - w * 0.5, cy],
  ];
  const inner = outer.map(([x, y]) => [cx + (x - cx) * innerScale, cy + (y - cy) * innerScale]);
  const toPath = (pts: number[][]) => `M${pts.map((p) => p.join(",")).join(" L")} Z`;
  return `${toPath(outer)} ${toPath(inner)}`;
}

function CenterHex() {
  const path = useMemo(() => buildHexRingPath(0.94), []);
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-20"
      style={{ width: `${CENTER_W}rem`, height: `${CENTER_H}rem`, transform: "translate(-50%,-50%)" }}
    >
      <svg viewBox="0 0 100 86.6" className="h-full w-full drop-shadow-[0_0_36px_rgba(233,114,76,0.5)]">
        <path d={path} fillRule="evenodd" fill={`rgba(${SECONDARY_RGB},0.95)`} />
      </svg>
    </div>
  );
}

function CenterPulse() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-10"
      style={{ width: `${CENTER_W}rem`, height: `${CENTER_H}rem`, transform: "translate(-50%,-50%)" }}
    >
      <div
        className="center-pulse h-full w-full"
        style={{ clipPath: HEX_CLIP, background: `rgba(${SECONDARY_RGB},0.35)` }}
      />
    </div>
  );
}

function RadarGuides() {
  const radii = [1, 2, 3].map((r) => HEX_SIZE * 1.5 * r);
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      style={{ width: `${HONEYCOMB_W}rem`, height: `${HONEYCOMB_H}rem` }}
      viewBox={`0 0 ${HONEYCOMB_W} ${HONEYCOMB_H}`}
    >
      {radii.map((r) => (
        <circle
          key={r}
          cx={HONEYCOMB_W / 2}
          cy={HONEYCOMB_H / 2}
          r={r}
          fill="none"
          stroke={`rgba(${ACCENT_RGB},0.22)`}
          strokeDasharray="0.35 0.9"
          strokeWidth="0.09"
        />
      ))}
    </svg>
  );
}

function RadarSweep() {
  return (
    <div
      aria-hidden="true"
      className="radar-sweep pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: `${HONEYCOMB_W}rem`,
        height: `${HONEYCOMB_W}rem`,
        background: `conic-gradient(from 0deg, rgba(${ACCENT_RGB},0.16), transparent 16%, transparent 100%)`,
        mixBlendMode: "screen",
      }}
    />
  );
}

function SkillHex({ skill }: { skill: SkillMeta }) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  const status = t(flipped ? "skill.ariaShowing" : "skill.ariaTap");
  const ariaLabel = t("skill.ariaLabel", { name: skill.name, level: skill.level, status });

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={ariaLabel}
      className="block appearance-none border-0 bg-transparent p-0 outline-none transition-transform duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
      style={{ width: `${HEX_W}rem`, height: `${HEX_H}rem`, perspective: "900px" }}
    >
      <div
        className="flip-card relative h-full w-full transition-transform duration-700 ease-out"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center drop-shadow-[0_10px_20px_rgba(10,17,40,0.5)] transition-[filter] duration-300 hover:drop-shadow-[0_0_22px_rgba(246,196,83,0.5)]"
          style={{
            clipPath: HEX_CLIP,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `linear-gradient(135deg, rgba(${SECONDARY_RGB},0.95), rgba(${ACCENT_RGB},0.85))`,
          }}
        >
          <span className="px-2 font-display text-xs font-semibold leading-tight text-text-primary sm:text-sm">
            {skill.name}
          </span>
          <span className="font-mono text-[20px] text-highlight">{skill.level}%</span>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-3 text-center drop-shadow-[0_10px_20px_rgba(10,17,40,0.5)]"
          style={{
            clipPath: HEX_CLIP,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.9), rgba(${HIGHLIGHT_RGB},0.75))`,
          }}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-text-dark/70">
            {t("skill.levelLabel")}
          </span>
          <span className="font-display text-2xl font-bold text-text-dark">{skill.level}%</span>
          <span className="font-display text-sm font-semibold text-text-dark/80">{skill.name}</span>
        </div>
      </div>
    </button>
  );
}

function FakeHex({ ring }: { ring: 1 | 2 | 3 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        width: `${HEX_W}rem`,
        height: `${HEX_H}rem`,
        clipPath: HEX_CLIP,
        background: `rgba(${PRIMARY_RGB},${FAKE_OPACITY[ring]})`,
        filter: ring === 1 ? "drop-shadow(0 4px 10px rgba(0,0,0,0.2))" : "none",
      }}
    />
  );
}

function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 5 + Math.random() * 7,
        delay: Math.random() * 6,
        warm: Math.random() > 0.5,
      })),
    [count]
  );
}

function Particles() {
  const particles = useParticles(34);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-visible">
      {particles.map((p) => {
        const rgb = p.warm ? HIGHLIGHT_RGB : ACCENT_RGB;
        return (
          <span
            key={p.id}
            className="particle-dot absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `radial-gradient(circle, rgba(${rgb},0.9), transparent 70%)`,
              boxShadow: `0 0 ${p.size * 2.5}px rgba(${rgb},0.55)`,
              animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function HudFrame() {
  const { t } = useTranslation();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4 z-0 sm:inset-6">
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-accent/25 sm:h-6 sm:w-6" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-accent/25 sm:h-6 sm:w-6" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-accent/25 sm:h-6 sm:w-6" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-accent/25 sm:h-6 sm:w-6" />

      <span className="absolute left-1 top-7 hidden font-mono text-[10px] tracking-widest text-text-secondary/50 sm:block sm:top-8">
        {t("skill.hud.system")}
      </span>
      <span className="absolute bottom-7 right-1 hidden font-mono text-[10px] tracking-widest text-text-secondary/50 sm:block sm:bottom-8">
        {t("skill.hud.nodes", { count: SKILLS_META.length })}
      </span>
    </div>
  );
}

function useGhostHexes(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 6 + Math.random() * 88,
        top: 8 + Math.random() * 82,
        size: 3.5 + Math.random() * 4.5,
        duration: 18 + Math.random() * 16,
        delay: Math.random() * 8,
        opacity: 0.05 + Math.random() * 0.07,
        rotate: Math.random() * 40 - 20,
      })),
    [count]
  );
}

function GhostHexField() {
  const ghosts = useGhostHexes(7);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {ghosts.map((g) => (
        <div
          key={g.id}
          className="ghost-hex absolute"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: `${g.size}rem`,
            height: `${g.size * 0.866}rem`,
            transform: `rotate(${g.rotate}deg)`,
            animationDuration: `${g.duration}s`,
            animationDelay: `${g.delay}s`,
          }}
        >
          <svg viewBox="0 0 100 86.6" className="h-full w-full">
            <polygon
              points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
              fill="none"
              stroke={`rgba(${ACCENT_RGB},${g.opacity})`}
              strokeWidth="1.3"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

function TechMarquee() {
  const loopItems = [...SKILLS_META, ...SKILLS_META];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-2 z-0 overflow-hidden opacity-40 sm:bottom-3"
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-text-secondary">
        {loopItems.map((s, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-highlight/60" />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function FitToScreen({
  naturalWidth,
  naturalHeight,
  children,
}: {
  naturalWidth: number;
  naturalHeight: number;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const next = Math.min(width / naturalWidth, height / naturalHeight, 1.6);
      setScale(next > 0 ? next : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, [naturalWidth, naturalHeight]);

  return (
    <div ref={containerRef} className="flex h-full w-full items-center justify-center overflow-hidden">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>{children}</div>
    </div>
  );
}

function RadialHoneycomb() {
  return (
    <div className="relative mx-auto" style={{ width: `${HONEYCOMB_W}rem`, height: `${HONEYCOMB_H}rem` }}>
      <RadarGuides />
      <RadarSweep />
      <Particles />

      {([1, 2, 3] as const).map((ringNum) => {
        const config = RING_CONFIG[ringNum];
        const ringAnim = config.dir === "cw" ? "spinCW" : "spinCCW";
        const counterAnim = config.dir === "cw" ? "spinCCW" : "spinCW";

        return (
          <div
            key={ringNum}
            className="orbit-ring absolute left-1/2 top-1/2"
            style={{ animation: `${ringAnim} ${config.duration}s linear infinite` }}
          >
            {RING_CELLS[ringNum].map((cell) => {
              const { x, y } = axialToRem(cell.q, cell.r);
              const style: CSSProperties = {
                transform: `translate(calc(-50% + ${x}rem), calc(-50% + ${y}rem))`,
              };
              return (
                <div key={`${cell.q},${cell.r}`} className="absolute left-1/2 top-1/2" style={style}>
                  <div
                    className="orbit-counter"
                    style={{ animation: `${counterAnim} ${config.duration}s linear infinite` }}
                  >
                    {cell.skill ? <SkillHex skill={cell.skill} /> : <FakeHex ring={ringNum} />}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <CenterPulse />
      <CenterHex />
    </div>
  );
}

function Skill() {
  const { t } = useTranslation();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background font-body">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-secondary/15 blur-[140px]"
      />

      <GhostHexField />
      <HudFrame />

      <header className="relative z-10 shrink-0 px-6 pt-8 text-center sm:pt-10">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background-alt/60 px-4 py-1.5 font-mono text-xs tracking-widest text-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
          {t("skill.badge")}
        </span>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
          {t("skill.titlePart1")}{" "}
          <span className="bg-gradient-to-r from-secondary via-accent to-highlight bg-clip-text text-transparent">
            {t("skill.titlePart2")}
          </span>
        </h1>
        <p className="mt-1.5 font-mono text-[11px] text-text-secondary sm:text-xs">{t("skill.hint")}</p>
      </header>

      <div className="relative z-10 min-h-0 flex-1">
        <FitToScreen naturalWidth={HONEYCOMB_W * 16} naturalHeight={HONEYCOMB_H * 16}>
          <RadialHoneycomb />
        </FitToScreen>
      </div>

      <TechMarquee />

      <style>{`
        @keyframes spinCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-14px); opacity: 0.9; }
        }
        @keyframes centerPulse {
          0% { transform: scale(1); opacity: 0.45; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes ghostFloat {
          0%, 100% { transform: translate(0, 0) rotate(var(--ghost-rotate, 0deg)); }
          50% { transform: translate(14px, -18px) rotate(calc(var(--ghost-rotate, 0deg) + 10deg)); }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .center-pulse {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          animation: centerPulse 3.2s ease-out infinite;
        }
        .radar-sweep {
          animation: spinCW 22s linear infinite;
        }
        .ghost-hex {
          animation-name: ghostFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .marquee-track {
          animation: marqueeScroll 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring, .orbit-counter, .particle-dot, .center-pulse,
          .radar-sweep, .ghost-hex, .marquee-track {
            animation: none !important;
          }
          .center-pulse { opacity: 0; }
          .flip-card { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

export default Skill;
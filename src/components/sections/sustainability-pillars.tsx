import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  useInView,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Leaf, ShieldCheck, Globe2, Anchor } from "lucide-react";
import { sustainability } from "@/data/site";

const ICONS = [Anchor, ShieldCheck, Leaf, Globe2];

/**
 * Supplementary metrics shown inside the center card.
 * These are presentation filler tied loosely to each pillar's icon —
 * swap the values/labels for real figures when available.
 */
const PILLAR_METRIC = [
  { value: 100, suffix: "%", label: "Vessels ocean-audited" },
  { value: 100, suffix: "%", label: "Batches lab-verified" },
  { value: 92, suffix: "%", label: "Bycatch reduction" },
  { value: 38, suffix: "+", label: "Markets certified" },
];

const STATS = [
  { icon: Leaf, label: "Sustainable Sourcing", value: 98, suffix: "%" },
  { icon: Anchor, label: "Traceability", value: 100, suffix: "%" },
  { icon: ShieldCheck, label: "Quality Assurance", value: 24, suffix: "/7" },
  { icon: Globe2, label: "Global Compliance", value: 35, suffix: "+" },
];

const RADIUS = 44; // % — matches the node anchor radius
const ORBIT_SPEED = 6; // deg/s

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function nodeXY(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + RADIUS * Math.sin(rad),
    y: 50 - RADIUS * Math.cos(rad),
  };
}

/* ----------------------------- Counter ----------------------------- */

function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1000 / duration, 1);
      setDisplay(Math.round(ease(t) * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ----------------------------- Orbit node ----------------------------- */

function OrbitNode({
  angle,
  isActive,
  rotation,
  Icon,
  index,
  onActivate,
  onRelease,
}: {
  angle: number;
  isActive: boolean;
  rotation: ReturnType<typeof useMotionValue<number>>;
  Icon: typeof Anchor;
  index: number;
  onActivate: (i: number) => void;
  onRelease: () => void;
}) {
  const upright = useTransform(rotation, (r) => -r - angle);

  return (
    <div
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: `rotate(${angle}deg) translateY(-${RADIUS}%)` }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.2 + index * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.25,
        }}
        style={{ rotate: upright }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        <motion.button
          type="button"
          onMouseEnter={() => onActivate(index)}
          onMouseLeave={onRelease}
          onTouchStart={() => onActivate(index)}
          onTouchEnd={onRelease}
          onClick={() => onActivate(index, true)}
          aria-label={sustainability[index]?.title}
          aria-pressed={isActive}
          animate={{
            scale: isActive ? 1.15 : 0.85,
            opacity: isActive ? 1 : 0.55,
            boxShadow: isActive
              ? [
                  "0 0 0px 0px rgba(212,175,90,0.0)",
                  "0 0 26px 6px rgba(212,175,90,0.45)",
                  "0 0 0px 0px rgba(212,175,90,0.0)",
                ]
              : "0 0 0px 0px rgba(212,175,90,0)",
          }}
          transition={{
            scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            boxShadow: isActive
              ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 },
          }}
          className={`grid h-16 w-16 place-items-center rounded-full backdrop-blur ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] md:h-20 md:w-20 ${
            isActive
              ? "bg-[var(--gold)]/20 ring-[var(--gold)]/60 text-[var(--gold-soft)]"
              : "bg-white/[0.04] ring-white/15 text-white/70"
          }`}
        >
          <Icon className="h-6 w-6 md:h-7 md:w-7" />
        </motion.button>
      </motion.div>
    </div>
  );
}

/* --------------------------- Orbit tooltip --------------------------- */

function OrbitTooltip({
  angle,
  rotation,
  title,
}: {
  angle: number;
  rotation: ReturnType<typeof useMotionValue<number>>;
  title: string;
}) {
  const upright = useTransform(rotation, (r) => -r - angle);
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: `rotate(${angle}deg) translateY(-${RADIUS}%)` }}
    >
      <motion.div style={{ rotate: upright }} className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: -54 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap rounded-full border border-[var(--gold)]/40 bg-[var(--abyss)]/90 px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--gold-soft)] shadow-[var(--shadow-gold)] backdrop-blur"
        >
          {title}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------ Globe ------------------------------ */

function AmbientGlobe() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="ds-globe absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 opacity-40"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="rgba(212,175,90,0.25)" />
          <stop offset="100%" stopColor="rgba(212,175,90,0)" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#globeGlow)" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
      <g className="ds-globe-spin-slow" style={{ transformOrigin: "100px 100px" }}>
        <ellipse cx="100" cy="100" rx="78" ry="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <ellipse cx="100" cy="100" rx="30" ry="78" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <ellipse cx="100" cy="100" rx="60" ry="78" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      </g>
      <g className="ds-globe-spin" style={{ transformOrigin: "100px 100px" }}>
        <path
          d="M 30 70 Q 100 30 170 95"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="3 5"
          opacity="0.7"
        />
        <path
          d="M 35 140 Q 100 175 165 120"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="3 5"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

/* ---------------------------- Background ---------------------------- */

function OceanBackground() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 2 + Math.round(Math.random() * 5),
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 10,
        drift: Math.round((Math.random() - 0.5) * 40),
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="ds-wave ds-wave-a absolute -left-1/4 top-[-10%] h-[70%] w-[150%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(58,110,140,0.35),transparent_70%)]" />
      <div className="ds-wave ds-wave-b absolute -right-1/4 bottom-[-15%] h-[65%] w-[150%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,90,0.10),transparent_70%)]" />
      <div className="ds-ray ds-ray-a absolute -top-1/3 left-[10%] h-[160%] w-[12%] rotate-[18deg] bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent" />
      <div className="ds-ray ds-ray-b absolute -top-1/3 left-[55%] h-[160%] w-[8%] rotate-[14deg] bg-gradient-to-b from-white/[0.04] via-white/[0.015] to-transparent" />
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="ds-bubble absolute bottom-0 rounded-full bg-white/[0.18]"
          style={
            {
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--drift": `${b.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------ Section ------------------------------ */

export function SustainabilityPillars() {
  const count = sustainability.length;
  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false);

  const rotation = useMotionValue(0);
  const hoverRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const releaseTimeout = useRef<ReturnType<typeof setTimeout>>();
  const reducedMotion = usePrefersReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    const now = performance.now();
    if (hoverRef.current || now < pauseUntilRef.current) return;
    rotation.set((rotation.get() + (ORBIT_SPEED * delta) / 1000) % 360);
  });

  // gentle auto-advance of the active pillar
  useEffect(() => {
    const id = setInterval(() => {
      if (hoverRef.current || performance.now() < pauseUntilRef.current) return;
      setActive((a) => (a + 1) % count);
    }, 4200);
    return () => clearInterval(id);
  }, [count]);

  const activate = (i: number, isClick = false) => {
    setActive(i);
    setInteracting(true);
    hoverRef.current = !isClick ? true : hoverRef.current;
    if (releaseTimeout.current) clearTimeout(releaseTimeout.current);
    if (isClick) {
      pauseUntilRef.current = performance.now() + 4500;
      releaseTimeout.current = setTimeout(() => setInteracting(false), 4500);
    }
  };

  const release = () => {
    hoverRef.current = false;
    if (performance.now() >= pauseUntilRef.current) setInteracting(false);
  };

  const ActiveIcon = ICONS[active % ICONS.length];
  const metric = PILLAR_METRIC[active % PILLAR_METRIC.length];

  return (
    <section
      className="section-y relative overflow-hidden bg-gradient-to-b from-[var(--abyss)] to-[var(--ocean-deep)] text-[var(--pearl)]"
      id="sustainability"
    >
      <OceanBackground />

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-eyebrow text-white/55">07 — Sustainability</p>
          <h2 className="text-display-2 mt-4 text-white">
            What we owe the sea — <span className="italic text-[var(--gold-soft)]">and the next shipment.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mx-auto mt-14 aspect-square w-full max-w-[520px]"
        >
          <div className="absolute inset-[8%] rounded-full border border-white/10" />
          <div className="absolute inset-[20%] rounded-full border border-white/5" />

          <AmbientGlobe />

          {/* rotating orbit: lines + nodes + trail + tooltip all live here so they share one rotation */}
          <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
              {sustainability.map((p, i) => {
                const angle = (i / count) * 360;
                const { x, y } = nodeXY(angle);
                const isActive = i === active;
                return (
                  <line
                    key={p.title}
                    x1={50}
                    y1={50}
                    x2={x}
                    y2={y}
                    stroke={isActive ? "var(--gold)" : "rgba(255,255,255,0.12)"}
                    strokeWidth={isActive ? 0.6 : 0.3}
                    strokeDasharray={isActive ? "1.5 2.5" : undefined}
                    className={isActive ? "ds-line-flow" : undefined}
                    opacity={isActive ? 0.9 : 0.5}
                  />
                );
              })}
            </svg>

            {sustainability.map((p, i) => {
              const angle = (i / count) * 360;
              return (
                <OrbitNode
                  key={p.title}
                  angle={angle}
                  index={i}
                  isActive={i === active}
                  rotation={rotation}
                  Icon={ICONS[i % ICONS.length]}
                  onActivate={activate}
                  onRelease={release}
                />
              );
            })}

            <AnimatePresence>
              {interacting && (
                <OrbitTooltip
                  key={active}
                  angle={(active / count) * 360}
                  rotation={rotation}
                  title={sustainability[active].title}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* center glass card */}
          <div className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:px-7 md:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span
                    initial={{ scale: 0.6, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold-soft)] ring-1 ring-[var(--gold)]/40 md:h-14 md:w-14"
                  >
                    <ActiveIcon className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.span>
                  <h3 className="mt-4 font-display text-2xl text-white md:text-3xl">
                    {sustainability[active].title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/65 md:text-sm">
                    {sustainability[active].body}
                  </p>
                  <div className="mt-5 inline-flex flex-col items-center border-t border-white/10 pt-4">
                    <span className="font-display text-xl text-[var(--gold-soft)] md:text-2xl">
                      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40 md:text-[11px]">
                      {metric.label}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* mobile dots */}
        <div className="mt-8 flex justify-center gap-1.5 md:hidden">
          {sustainability.map((_, i) => (
            <button
              key={i}
              onClick={() => activate(i, true)}
              aria-label={`Pillar ${i + 1}`}
              className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                i === active ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur md:p-6"
              >
                <Icon className="mx-auto h-5 w-5 text-[var(--gold-soft)] md:h-6 md:w-6" />
                <div className="mt-3 font-display text-2xl text-white md:text-3xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/50 md:text-xs">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @keyframes ds-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, 3%) scale(1.08); }
        }
        @keyframes ds-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, -4%) scale(1.05); }
        }
        @keyframes ds-ray-sweep {
          0%, 100% { opacity: 0.4; transform: translateX(0); }
          50% { opacity: 0.9; transform: translateX(6%); }
        }
        @keyframes ds-bubble-rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-560px) translateX(var(--drift)); opacity: 0; }
        }
        @keyframes ds-line-flow-dash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes ds-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ds-spin-rev {
          to { transform: rotate(-360deg); }
        }

        .ds-wave { animation: ds-drift-a 22s ease-in-out infinite; filter: blur(20px); }
        .ds-wave-b { animation-name: ds-drift-b; animation-duration: 26s; }
        .ds-ray { animation: ds-ray-sweep 9s ease-in-out infinite; }
        .ds-ray-b { animation-duration: 12s; animation-delay: 2s; }
        .ds-bubble { animation: ds-bubble-rise linear infinite; }
        .ds-line-flow { animation: ds-line-flow-dash 1.2s linear infinite; }
        .ds-globe-spin { animation: ds-spin 40s linear infinite; }
        .ds-globe-spin-slow { animation: ds-spin-rev 70s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ds-wave, .ds-ray, .ds-bubble, .ds-line-flow, .ds-globe-spin, .ds-globe-spin-slow {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
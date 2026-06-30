import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { processStages } from "@/data/site";
import catchImg from "@/assets/process/catch.jpeg";
import selectionImg from "@/assets/process/selection.jpeg";
import packingImg from "@/assets/process/packing.jpeg";
import freezingImg from "@/assets/process/freezing.jpeg";
import qualityImg from "@/assets/process/quality.jpeg";
import packaging from "@/assets/process/packing.jpeg";
import exportImg from "@/assets/process/export.jpeg";


const processImages = [
  catchImg,
  selectionImg,
  packingImg,
  freezingImg,
  qualityImg,
  packaging,
  exportImg,
];

export function ProcessTimeline() {
  return (
    <section className="bg-background" id="process">
      <DesktopProcess />
      <MobileProcess />
    </section>
  );
}

/* ---------- DESKTOP: sticky cinematic storytelling ---------- */
function DesktopProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const n = processStages.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    if (i !== active) setActive(i);
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative hidden md:block" style={{ height: `${n * 90}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-x">
          <div className="grid grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div className="min-w-0">
              <p className="text-eyebrow text-muted-foreground">06 — The Process</p>
              <h2 className="text-display-2 mt-4">
                Seven stages, <span className="italic text-[var(--gold)]">zero compromises.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Catch to container in hours, not days. Every stage measured, monitored and documented.
              </p>

              {/* Progress rail */}
              <div className="mt-12 flex gap-6">
                <div className="relative h-[340px] w-px bg-foreground/10">
                  <motion.div
                    style={{ scaleY: lineScale, transformOrigin: "top" }}
                    className="absolute inset-0 w-px bg-gradient-to-b from-[var(--gold)] to-[var(--gold-soft)]"
                  />
                </div>
                <ol className="flex h-[340px] flex-col justify-between">
                  {processStages.map((s, i) => (
                    <li key={s.n} className="flex items-center gap-3">
                      <span
                        className={`font-display text-sm transition-all ${
                          i === active ? "text-[var(--gold)] scale-110" : "text-muted-foreground/50"
                        }`}
                      >
                        {s.n}
                      </span>
                      <span
                        className={`text-xs uppercase tracking-[0.24em] transition-colors ${
                          i === active ? "text-foreground" : "text-muted-foreground/40"
                        }`}
                      >
                        {s.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Stage canvas */}
            <div className="relative h-[68vh] min-w-0 overflow-hidden rounded-3xl ring-1 ring-foreground/10">
              <img
                src={processImages[active]}
                alt={processStages[active].title}
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-tr " />
              {processStages.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    y: i === active ? 0 : 24,
                    scale: i === active ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col justify-end p-10 text-[var(--pearl)]"
                >
                  <span className="font-display text-[12rem] leading-none text-white/15">{s.n}</span>
                  <h3 className="font-display text-5xl text-white -mt-8">{s.title}</h3>
                  <p className="mt-4 max-w-md text-white/75">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- MOBILE: horizontal snap carousel ---------- */
function MobileProcess() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(i);
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="md:hidden section-y">
      <div className="container-x">
        <p className="text-eyebrow text-muted-foreground">06 — The Process</p>
        <h2 className="text-display-2 mt-4">
          Seven stages, <span className="italic text-[var(--gold)]">zero compromises.</span>
        </h2>
      </div>

      {/* Progress bar */}
      <div className="container-x mt-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-[var(--gold)] tabular-nums">
            {processStages[active].n}
          </span>
          <div className="relative h-px flex-1 bg-foreground/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)]"
              animate={{ width: `${((active + 1) / processStages.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {active + 1}/{processStages.length}
          </span>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {processStages.map((s, i) => (
          <div key={s.n} className="w-screen shrink-0 snap-center px-5">
            <motion.article
              initial={false}
              animate={{ opacity: i === active ? 1 : 0.4, scale: i === active ? 1 : 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-foreground/10"
            >
              <img
                src={processImages[i]}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--abyss)] via-[var(--abyss)]/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-[var(--pearl)]">
                <span className="font-display text-[7rem] leading-none text-white/15">{s.n}</span>
                <h3 className="font-display text-3xl text-white -mt-4">{s.title}</h3>
                <p className="mt-3 text-sm text-white/75">{s.body}</p>
              </div>
            </motion.article>
          </div>
        ))}
      </div>

      <div className="container-x mt-5 flex justify-center gap-1.5">
        {processStages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to stage ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

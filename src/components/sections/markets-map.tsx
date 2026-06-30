// src/components/sections/markets-map.tsx
import { useCallback, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { WorldMap } from "@/components/markets/WorldMap";
import { ContinentCard } from "@/components/markets/ContinentCard";
import { PaginationDots } from "@/components/markets/PaginationDots";
import { useAutoSlider } from "@/components/markets/useAutoSlider";
import { continents, totalContinents, totalCountries } from "@/components/markets/data";

const SWIPE_VELOCITY_THRESHOLD = 350;
const SWIPE_DISTANCE_THRESHOLD = 60;

const slideVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    scale: 0.96,
    x: direction > 0 ? 48 : -48,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    scale: 0.96,
    x: direction > 0 ? -48 : 48,
  }),
};

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 32,
  mass: 0.9,
};

/** Ambient floating ocean particles rendered once, behind the map */
function OceanParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.round((i * 137.5) % 100), // deterministic pseudo-random spread
        size: 2 + (i % 4),
        duration: 14 + (i % 6) * 3,
        delay: (i % 9) * 0.8,
        depth: i % 3,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#D4A24C]"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            opacity: 0.1 + p.depth * 0.07,
          }}
          animate={{
            y: ["0%", "-120%"],
            opacity: [0, 0.18 + p.depth * 0.06, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function MarketsMap() {
  const {
    index,
    direction,
    next,
    prev,
    goTo,
    pause,
    resume,
  } = useAutoSlider({ count: continents.length, intervalMs: 5000 });

  const [isDragging, setIsDragging] = useState(false);

  const activeContinent = continents[index];

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    pause();
  }, [pause]);

  const handleDragEnd = useCallback(
    (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      setIsDragging(false);

      const { offset, velocity } = info;
      const draggedFarEnough = Math.abs(offset.x) > SWIPE_DISTANCE_THRESHOLD;
      const flicked = Math.abs(velocity.x) > SWIPE_VELOCITY_THRESHOLD;

      if (draggedFarEnough || flicked) {
        if (offset.x < 0 || velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
          next();
        } else {
          prev();
        }
      }
      resume();
    },
    [next, prev, resume]
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A1A2F] py-14 sm:py-20 lg:py-28"
      aria-label="Global export journey"
    >
      {/* section heading */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.22em] text-[#D4A24C]"
          >
            From Our Shores to the World
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#F0E6D2] sm:text-5xl lg:text-6xl"
          >
            The Global Export Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-4 font-['DM_Sans'] text-base text-[#A9BFC9] sm:text-lg"
          >
            Every shipment begins at the Port of Kochi and reaches{" "}
            <span className="text-[#D4A24C]">{totalCountries} countries</span>{" "}
            across {totalContinents} continents — cold-chain tracked, door to
            door.
          </motion.p>
        </div>
      </div>

      {/* main slider stage */}
      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[28px] border border-[#D4A24C]/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:aspect-[4/5] lg:aspect-[16/10]">
          {/* background layer: map + particles, persists across slide transitions */}
          <WorldMap activeContinent={activeContinent} slideKey={activeContinent.id} />
          <OceanParticles />

          {/* gradient scrim so foreground card text stays legible over the map */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/85 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A1A2F]/60 to-transparent" />

          {/* foreground: swipeable card */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end">
            <div className="relative min-h-0 flex-1 touch-pan-y">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeContinent.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={springTransition}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 flex cursor-grab flex-col justify-end active:cursor-grabbing"
                >
                  <div
                      className="
                        mx-2
                        mb-2
                        rounded-2xl
                        border
                        border-[#D4A24C]/15
                        bg-[#0A1A2F]/60
                        backdrop-blur-md

                        max-h-[35%]
                        overflow-y-auto

                        sm:max-h-[42%]
                        lg:max-h-none
                      "
                  >
                    <ContinentCard
                      continent={activeContinent}
                      index={index}
                      totalCount={continents.length}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* desktop arrow controls */}
          <button
            type="button"
            aria-label="Previous continent"
            onClick={() => {
              pause();
              prev();
              resume();
            }}
            className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4A24C]/25 bg-[#0A1A2F]/70 text-[#F0E6D2] backdrop-blur-md transition-colors hover:bg-[#D4A24C]/20 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next continent"
            onClick={() => {
              pause();
              next();
              resume();
            }}
            className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4A24C]/25 bg-[#0A1A2F]/70 text-[#F0E6D2] backdrop-blur-md transition-colors hover:bg-[#D4A24C]/20 sm:flex"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
          </button>

          {/* swipe hint, mobile only, fades after first interaction */}
          {!isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.4, delay: 1, repeat: 2, repeatDelay: 3 }}
              className="pointer-events-none absolute bottom-[7.5rem] left-1/2 z-30 -translate-x-1/2 font-['DM_Sans'] text-[11px] uppercase tracking-wider text-[#A9BFC9] sm:hidden"
            >
              ← Swipe to explore →
            </motion.div>
          )}
        </div>

        {/* pagination dots */}
        <div className="mt-6 sm:mt-8">
          <PaginationDots
            count={continents.length}
            activeIndex={index}
            onSelect={(i) => {
              pause();
              goTo(i);
              resume();
            }}
            labels={continents.map((c) => c.name)}
          />
        </div>
      </div>
    </section>
  );
}

export default MarketsMap;
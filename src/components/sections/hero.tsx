import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ocean.jpg";

const stats = [
  { k: "2012", v: "Established" },
  { k: "4", v: "Continents Served" },
  { k: "22+", v: "Species Exported" },
  { k: "BRCGS ", v: "Certified Facility" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-[var(--abyss)] text-[var(--pearl)]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          className="anim-kenburns h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--abyss)]/60 via-[var(--abyss)]/30 to-[var(--abyss)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--abyss)]/85 via-transparent to-transparent" />
      </div>

      {/* (Photo fish can't be individually animated — using slow drift on the image instead) */}


      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-white/40 anim-float"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>


      <div className="container-x relative z-10 flex min-h-[100dvh] flex-col justify-end pb-16 pt-32 md:pb-24 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="text-eyebrow text-white/65"
        >
          Delsea Exports Private Limited
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.25 }}
          className="text-display-1 mt-4 max-w-[20ch] text-white"
        >
          Fresh From The{" "}
          <span className="italic text-[var(--gold-soft)]">Arabian Sea.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="mt-6 max-w-xl text-base text-white/75 md:text-lg"
        >
          Premium frozen seafood exporter serving global markets with uncompromising quality and international food safety standards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/products"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--gold)] px-6 text-sm font-medium text-[var(--abyss)] shadow-[var(--shadow-gold)] transition hover:bg-[var(--gold-soft)]"
          >
            Explore Products <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
          >
            Request Quote
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.95 }}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 md:grid-cols-4 md:gap-x-10"
        >
          {stats.map((s) => (
            <div key={s.v} className="min-w-0">
              <dt className="font-display text-2xl text-[var(--gold-soft)] md:text-3xl">{s.k}</dt>
              <dd className="mt-1 truncate text-[11px] uppercase tracking-[0.24em] text-white/55">{s.v}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/45"
        >
          <ArrowDown className="h-3 w-3 animate-bounce" />
          Scroll to discover
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import brcgs from "@/assets/certifications/brcgs.png";
import haccp from "@/assets/certifications/haccp.png";
import iso22000 from "@/assets/certifications/iso2200.png";
import usfda from "@/assets/certifications/usfda.png";
import sfda from "@/assets/certifications/sfda.png";
import fssai from "@/assets/certifications/fssai.png";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { certifications } from "@/data/site";

// Map each certification's `code` to its logo asset.
// Keys must exactly match the `code` values in certifications.ts (case-sensitive).
const certLogos: Record<string, string> = {
  BRCGS: brcgs,
  HACCP: haccp,
  "ISO 22000": iso22000,
  USFDA: usfda,
  SFDA: sfda,
  FSSAI: fssai,
};

export function CertificationsRow() {
  const loop = [...certifications, ...certifications, ...certifications];
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const offset = useRef(0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const speed = 100; // px/s
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused && trackRef.current) {
        const track = trackRef.current;
        offset.current -= speed * dt;
        const oneSet = track.scrollWidth / 3;
        if (-offset.current >= oneSet) offset.current += oneSet;
        track.style.transform = `translate3d(${offset.current}px,0,0)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <section className="section-y bg-background overflow-hidden" id="certifications">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-muted-foreground">04 — Standards</p>
          <h2 className="text-display-2 mt-4">
            Audited. Verified. <span className="italic text-[var(--gold)]">Trusted.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Six independent certifications govern how we source, process, freeze and ship — so the world's most regulated markets can buy with confidence.
          </p>
        </div>
      </div>

      <div
        className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div ref={trackRef} className="flex w-max gap-4 will-change-transform px-5 md:px-10">
          {loop.map((c, i) => {
            const logo = certLogos[c.code];
            return (
              <motion.div
                  key={`${c.code}-${i}`}
                  className="group relative flex w-[68vw] shrink-0 flex-col justify-center gap-3 rounded-2xl border border-foreground/8 bg-card p-6 transition-all hover:border-[var(--gold)]/40 hover:shadow-[var(--shadow-gold)] sm:w-[42vw] md:w-[30vw] lg:w-[calc((100vw-8rem)/3)] xl:w-[460px]"
                >
                  <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--gold-soft)]/30 to-transparent text-[var(--gold)] ring-1 ring-[var(--gold)]/30">
                    {logo ? (
                      <img
                        src={logo}
                        alt={`${c.code} certification logo`}
                        className="h-14 w-14 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <ShieldCheck className="h-8 w-8" />
                    )}
                  </span>

                  <div className="min-w-0">
                    <p className="font-display text-4xl tracking-tight">
                      {c.code}
                    </p>

                    <p className="mt-2 text-lg text-foreground/80">
                      {c.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.note}
                    </p>
                  </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import facility from "@/assets/facility-aerial.jpg";

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <section ref={ref} className="section-y bg-background" id="about">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="min-w-0 space-y-7">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-eyebrow text-muted-foreground"
          >
            01 — Our Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-display-2"
          >
            A decade of trust, <span className="italic text-[var(--gold)]">delivered in every shipment.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-5 text-base leading-relaxed text-muted-foreground"
          >
              <p>
                Founded in 2012 in Kochi, Kerala, Delsea Exports began with a simple mission: to deliver premium-quality seafood from India's coastline to customers around the world. Through a commitment to quality, reliability, and customer satisfaction, the company steadily built its reputation in international markets.
              </p>

              <p>
                A significant turning point came in 2021 when Mr. Ismail Manoj took over as Managing Director. His vision, leadership, and strategic direction accelerated the company's growth, strengthening operations, expanding global reach, and enhancing quality standards across every stage of the export process.
              </p>

              <p>
                Under his leadership, Delsea Exports has successfully expanded its presence across the world, serving customers in more than 25 international markets. Today, the company is recognized as a trusted seafood export partner, combining Kerala's rich marine resources with world-class processing, food safety, and reliable logistics.
              </p>

              <p>
                As Delsea Exports continues to grow, it remains committed to delivering exceptional seafood products while building lasting relationships with customers worldwide.
              </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 border-t border-foreground/10 pt-8"
          >
            <div><dt className="font-display text-3xl">12+</dt><dd className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Years</dd></div>
            <div><dt className="font-display text-3xl">22</dt><dd className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Species</dd></div>
            <div><dt className="font-display text-3xl">4</dt><dd className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Continents</dd></div>
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] min-w-0 overflow-hidden rounded-2xl ring-1 ring-foreground/10"
        >
          <img
            src={facility}
            alt="Delsea Exports facility on the Kerala coast at sunset"
            loading="lazy"
            width={1536}
            height={1024}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--abyss)]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-[var(--pearl)] md:p-10">
            <p className="text-eyebrow text-white/65">Kochi, Kerala</p>
            <p className="mt-2 max-w-sm font-display text-2xl leading-tight">
              Our certified processing facility on the Arabian Sea.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import ismail from "@/assets/manoj.jpeg";
import manoj from "@/assets/muhammednahid.png";

const list = [
  {
    name: "Ismail Manoj",
    role: "Managing Director",
    image: ismail,
    experience: "30+ years in international seafood trade",
    philosophy:
      "Quality is the only language that travels every ocean. We earn every shipment, every container, every relationship.",
  },
  {
    name: "Mohammed Nahid",
    role: "Operational Director",
    image: manoj,
    experience: "Operations, logistics & global compliance",
    philosophy:
      "From the boat to the buyer — every link in the cold chain is engineered for trust. That's what global markets demand.",
  },
];

export function DirectorsGrid() {
  return (
    <section className="section-y bg-[var(--mist)] dark:bg-[var(--ocean-deep)]" id="directors">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-muted-foreground">05 — Leadership</p>
          <h2 className="text-display-2 mt-4">
            The people behind <span className="italic text-[var(--gold)]">every shipment.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <motion.figure
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-w-0 overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={d.image}
                  alt={`Portrait of ${d.name}`}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--abyss)]/85 via-[var(--abyss)]/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-[var(--pearl)] md:p-8">
                  <p className="text-eyebrow text-white/55">{d.role}</p>
                  <p className="mt-2 font-display text-4xl text-white">{d.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/55">{d.experience}</p>
                </figcaption>
              </div>
              <blockquote className="p-6 text-sm leading-relaxed text-muted-foreground md:p-8">
                <span className="font-display text-3xl leading-none text-[var(--gold)]">“</span>
                <span className="ml-1">{d.philosophy}</span>
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

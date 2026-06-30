import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 transition-all hover:ring-foreground/25"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--abyss)]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--abyss)]/70 via-transparent to-transparent opacity-80" />
        <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/85 backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-2xl leading-tight">{product.name}</h3>
            <p className="mt-0.5 truncate text-xs italic text-muted-foreground">{product.scientific}</p>
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{product.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {product.forms.slice(0, 4).map((f) => (
            <span key={f} className="rounded-full border border-foreground/12 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {f}
            </span>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-3 inline-flex h-10 items-center justify-center rounded-full bg-foreground text-xs font-medium uppercase tracking-[0.2em] text-background transition hover:bg-foreground/85"
        >
          Inquire
        </Link>
      </div>
    </motion.div>
  );
}

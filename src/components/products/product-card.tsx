import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import type { Product } from "@/data/products";

const photos = import.meta.glob<string>("/src/assets/product-photos/*.webp", { eager: true, query: "?url", import: "default" });

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const photo = photos[`/src/assets/product-photos/${product.slug}.webp`];
  // Never present the known wahoo placeholder as a mahi-mahi photograph.
  const image = photo || (product.slug === "mahi-mahi" ? undefined : product.image);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
      className="group relative grid min-w-0 grid-cols-[minmax(0,34%)_minmax(0,1fr)] overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 transition-all hover:ring-foreground/25 sm:flex sm:h-full sm:flex-col"
    >
      <div className="relative min-h-32 overflow-hidden bg-[var(--abyss)] sm:aspect-[4/3]">
        {image ? (
          <img src={image} alt={photo ? product.name : `Illustration of ${product.name}`} loading="lazy" decoding="async"
            className="absolute inset-0 h-full w-full object-contain transition-transform duration-[1200ms] ease-out sm:group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 text-center text-xs text-white/70"><ImageIcon className="h-5 w-5" /> Photo on request</div>
        )}
        {image && !photo && <span className="absolute bottom-1 left-1 right-1 rounded bg-black/65 px-1 py-1 text-center text-[9px] text-white/90">Illustrative image</span>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5 md:p-6">
        <h3 className="font-display text-lg leading-tight sm:text-2xl">{product.name}</h3>
        {product.scientific && <p className="text-[11px] italic leading-tight text-muted-foreground sm:text-xs">{product.scientific}</p>}
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{product.description}</p>
        <div className="mt-auto flex flex-wrap gap-1 pt-1">
          {product.forms.slice(0, 4).map((form) => (
            <span key={form} className="rounded-full border border-foreground/12 px-2 py-0.5 text-[9px] uppercase tracking-wide text-muted-foreground sm:text-[10px]">{form}</span>
          ))}
        </div>
        <Link to={`/contact?product=${encodeURIComponent(product.slug)}`}
          className="mt-1 inline-flex min-h-10 items-center justify-center rounded-full bg-foreground px-3 text-[10px] font-medium uppercase tracking-widest text-background transition hover:bg-foreground/85 sm:mt-3 sm:text-xs">Inquire</Link>
      </div>
    </motion.div>
  );
}

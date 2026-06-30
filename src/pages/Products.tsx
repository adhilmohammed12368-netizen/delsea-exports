import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { products, productCategories, type ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { Seo } from "@/components/Seo";

export default function Products() {
  const [filter, setFilter] = useState<ProductCategory | "featured">("featured");
  const filtered = useMemo(() => {
    if (filter === "featured") {
      return products.filter((p) => p.featured);
    }
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="bg-background">
      <Seo
        title="Products — Delsea Exports | 22 Premium Seafood Species"
        description="Browse 22 species of premium fish, shrimp and cephalopods exported to Europe, the Middle East, Asia and North America."
        ogTitle="Products — Delsea Exports"
        ogDescription="Premium fish, shrimp and cephalopods from the Arabian Sea."
        ogUrl="/products"
      />
      <header className="border-b border-foreground/10 bg-[var(--abyss)] pt-32 pb-16 text-[var(--pearl)] md:pt-40 md:pb-24">
        <div className="container-x">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-eyebrow text-white/55">
            The Catalog
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} className="text-display-1 mt-4 max-w-[18ch] text-white">
            Every species, <span className="italic text-[var(--gold-soft)]">processed to spec.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.3 }} className="mt-6 max-w-xl text-white/65">
            22 premium species from the Arabian Sea — available whole, dressed, filleted, IQF or block, in the cuts and packaging your market demands.
          </motion.p>
        </div>
      </header>

      <section className="section-y">
        <div className="container-x">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {productCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`h-10 shrink-0 rounded-full border px-5 text-sm transition ${
                  filter === c.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/15 hover:border-foreground/40"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

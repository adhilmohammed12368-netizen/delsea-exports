import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";

export function ProductsShowcase() {
  const featured = products.filter((p) => p.featured);
  return (
    <section className="section-y bg-[var(--mist)] dark:bg-[var(--ocean-deep)]" id="products">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl min-w-0">
            <p className="text-eyebrow text-muted-foreground">02 — The Catch</p>
            <h2 className="text-display-2 mt-4">
              A curated catalog of <span className="italic text-[var(--gold)]">22 species</span>, processed to global spec.
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex h-11 items-center gap-2 self-start rounded-full border border-foreground/20 px-5 text-sm transition hover:bg-foreground hover:text-background md:self-end"
          >
            View full catalog <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

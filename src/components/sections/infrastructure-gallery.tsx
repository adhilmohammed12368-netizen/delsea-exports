import { Link } from "react-router-dom";

const photos = import.meta.glob<string>("/src/assets/infrastructure/*.webp", { eager: true, query: "?url", import: "default" });
const gallery = [
  { file: "factory-exterior", title: "Processing facility", text: "Delsea Exports, Kochi, Kerala." },
  { file: "export-dispatch", title: "Refrigerated dispatch", text: "Reefer container at the facility." },
  { file: "laboratory", title: "Quality control laboratory", text: "On-site laboratory and testing equipment." },
  { file: "microbiology-lab", title: "Laboratory workstation", text: "Controlled workspace for quality testing." },
  { file: "hygiene-entrance", title: "Pre-processing entrance", text: "Dedicated hygiene entry area." },
  { file: "processing-hall", title: "Processing hall", text: "Stainless-steel workstations." },
  { file: "processing-equipment", title: "Processing equipment", text: "Seafood handling equipment." },
  { file: "cold-storage", title: "Cold storage", text: "Frozen seafood storage." },
].map(item => ({ ...item, url: photos[`/src/assets/infrastructure/${item.file}.webp`] })).filter(item => item.url);

export function InfrastructureGallery() {
  if (!gallery.length) return null;
  return (
    <section id="infrastructure" className="section-y bg-[var(--mist)] dark:bg-[var(--ocean-deep)]">
      <div className="container-x">
        <p className="text-eyebrow text-muted-foreground">Inside Delsea</p>
        <h2 className="text-display-2 mt-4">Our <span className="italic text-[var(--gold)]">infrastructure.</span></h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">Explore our facility, quality control and export operations in Kochi.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map(item => (
            <figure key={item.file} className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
              <img src={item.url} alt={item.title} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-4">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <Link to="/contact" className="mt-8 inline-flex min-h-11 items-center rounded-full border border-foreground/20 px-5 text-sm hover:bg-foreground hover:text-background">Discuss your requirements</Link>
      </div>
    </section>
  );
}

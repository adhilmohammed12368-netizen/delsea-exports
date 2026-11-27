import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { Seo } from "@/components/Seo";
import NotFound from "@/pages/NotFound";

const photos = import.meta.glob<string>("/src/assets/product-photos/*.webp", { eager: true, query: "?url", import: "default" });
const captions: Record<string, string> = {
  "ribbon-fish-hook": "500/700 g — individually wrapped",
  "ribbon-fish-hook--200-300": "200/300 g — reference photograph",
  "ribbon-fish-hook--300-500": "300/500 g — individually wrapped",
  "ribbon-fish-hook--700-1000": "700/1000 g — individually wrapped",
  "ribbon-fish-net": "300/500 g — frozen ribbonfish",
  "ribbon-fish-net--500-700": "500/700 g — frozen ribbonfish",
  "leather-jacket": "700/1000 g — whole leatherjacket",
  "mahi-mahi": "Gilled and gutted mahi mahi",
  "mahi-mahi--two-fish": "Gilled and gutted product reference",
};

const commercial: Record<string, [string,string][]> = {
  "ribbon-fish-hook": [["Catching method","Hook caught"],["Product form","Whole frozen"],["Packing","10 kg IWP"],["Size grades","300/500, 500/700, 700/1000 g"],["Quality grades","A and B; subject to availability"]],
  "ribbon-fish-net": [["Catching method","Net caught"],["Product form","Whole frozen"],["Packing","10 kg shutter packing with plastic separators"],["Size grades","On enquiry"]],
  "shrimp": [["Packing","20 × 400 g; 8 kg master carton"],["Processing form","Confirm with export team"]],
  "octopus": [["Product form","Whole cleaned"],["Freezing","Block frozen or individually frozen"],["Packing and grades","According to buyer specifications"]],
  "leather-jacket": [["Product form","Whole frozen"],["Size and packing","On enquiry"]],
  "mahi-mahi": [["Product form shown","Gilled and gutted"],["Size and packing","On enquiry"]],
};

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  if (!product) return <NotFound />;
  const gallery = Object.entries(photos).map(([path, url]) => ({ id: path.split("/").pop()!.replace(/\.webp$/, ""), url }))
    .filter(item => item.id === product.slug || item.id.startsWith(product.slug + "--"))
    .sort((a,b) => a.id === product.slug ? -1 : b.id === product.slug ? 1 : a.id.localeCompare(b.id));
  const fallbackImage = product.slug === "mahi-mahi" ? undefined : product.image;
  const specs = commercial[product.slug] || [["Available forms","Confirm with export team"]];
  const enquiry = `/contact?product=${encodeURIComponent(product.slug)}`;
  const whatsapp = `${site.whatsappUrl}?text=${encodeURIComponent(`Hello Delsea Exports, I am interested in ${product.name}. Please share specifications, availability and quotation.`)}`;
  return (
    <div className="bg-background pt-28 md:pt-36">
      <Seo title={`${product.name} | Delsea Exports India`} description={product.description} ogUrl={`/products/${product.slug}`} ogImage={gallery[0]?.url} />
      <section className="container-x pb-12 md:pb-20">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Product catalogue</Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-2xl bg-[var(--abyss)] ring-1 ring-foreground/10">
            {gallery[0] ? <img src={gallery[0].url} alt={captions[gallery[0].id] || product.name} className="mx-auto max-h-[560px] w-full object-contain" /> : fallbackImage ? <figure><img src={fallbackImage} alt={`Illustration of ${product.name}`} className="mx-auto max-h-[560px] w-full object-contain" /><figcaption className="p-3 text-xs text-center text-white/70">Illustrative image</figcaption></figure> : <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 text-white/70"><ImageIcon className="h-8 w-8" /> Product photographs on request</div>}
          </div>
          <div className="min-w-0">
            <p className="text-eyebrow text-muted-foreground">Seafood from India</p>
            <h1 className="text-display-2 mt-4">{product.name}</h1>
            {product.scientific && <p className="mt-2 italic text-muted-foreground">{product.scientific}</p>}
            <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>
            <dl className="mt-6 divide-y divide-foreground/10 border-y border-foreground/10">
              {specs.map(([name,value]) => <div key={name} className="grid grid-cols-[1fr_1.3fr] gap-3 py-3 text-sm"><dt className="text-muted-foreground">{name}</dt><dd>{value}</dd></div>)}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">Photographs are product references, not a guarantee of current inventory. Confirm availability and final specifications before ordering.</p>
            <Link to={enquiry} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background sm:w-auto">Request a quotation</Link>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-foreground/20 px-6 text-sm sm:ml-3 sm:w-auto">WhatsApp enquiry</a>
          </div>
        </div>
        {gallery.length > 1 && <div className="mt-10">
          <h2 className="font-display text-2xl">Product photographs</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">{gallery.map(item => <figure key={item.id} className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"><a href={item.url} target="_blank" rel="noreferrer"><img src={item.url} alt={captions[item.id] || product.name} loading="lazy" className="aspect-[3/4] w-full bg-[var(--abyss)] object-contain" /></a><figcaption className="p-3 text-xs text-muted-foreground">{captions[item.id] || product.name}</figcaption></figure>)}</div>
        </div>}
      </section>
    </div>
  );
}

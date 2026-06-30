import { Link } from "react-router-dom";
import { Logo } from "./logo";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 bg-[var(--abyss)] text-[var(--pearl)]">
      <div className="container-x grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-sm text-sm text-white/65">
            Premium frozen seafood from the Arabian Sea to the world's most demanding kitchens, retailers and distributors.
          </p>
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
            {site.secondary}
          </p>
        </div>

        <div>
          <h3 className="text-eyebrow text-white/50">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/products" className="link-underline text-white/85 hover:text-white">Products</Link></li>
            <li><Link to="/about" className="link-underline text-white/85 hover:text-white">About</Link></li>
            <li><Link to="/markets" className="link-underline text-white/85 hover:text-white">Export Markets</Link></li>
            <li><Link to="/certifications" className="link-underline text-white/85 hover:text-white">Certifications</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow text-white/50">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/85">
            <li>{site.address}</li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-underline">{site.phone}</a>
            </li>
            <li>
              <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="link-underline">WhatsApp</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow text-white/50">Standards</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/85">
            <li>BRCGS · ISO 22000</li>
            <li>HACCP · FSSAI</li>
            <li>USFDA · SFDA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col-reverse items-start justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="uppercase tracking-[0.28em]">Fresh From The Arabian Sea</p>
        </div>
      </div>
    </footer>
  );
}

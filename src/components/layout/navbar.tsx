import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/markets", label: "Markets" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" },
] as const;

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [productMenu, setProductMenu] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const keyProducts = products.filter(p => p.featured);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useLocation().pathname;

  useEffect(() => { setOpen(false); setProductMenu(false); setMobileProducts(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-background/75 backdrop-blur-xl border-b border-foreground/8"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <Logo className="shrink-0" />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {NAV.map((item) => item.to === "/products" ? (
              <div key={item.to} className="relative" onMouseLeave={() => setProductMenu(false)}>
                <button type="button" aria-expanded={productMenu} onClick={() => setProductMenu(v => !v)} onKeyDown={e => { if (e.key === "Escape") setProductMenu(false); }} className="rounded-full px-3.5 py-2 text-sm text-foreground/80 hover:text-foreground">Products ▾</button>
                {productMenu && <div className="absolute left-0 top-full w-64 rounded-xl border border-foreground/10 bg-background p-2 shadow-xl"><Link to="/products" onClick={() => setProductMenu(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-foreground/5">Full product catalogue</Link>{keyProducts.map(p => <Link key={p.slug} to={`/products/${p.slug}`} onClick={() => setProductMenu(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-foreground/5">{p.name}</Link>)}</div>}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`link-underline rounded-full px-3.5 py-2 text-sm transition ${
                  item.to === "/"
                    ? pathname === "/"
                      ? "text-foreground"
                      : "text-foreground/80 hover:text-foreground"
                    : pathname.startsWith(item.to)
                      ? "text-foreground"
                      : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contact"
              className="hidden h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:bg-foreground/85 md:inline-flex"
            >
              Request Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-foreground/15 bg-background/40 backdrop-blur transition hover:border-foreground/40 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--abyss)] lg:hidden"
          >
            <div className="container-x flex h-full flex-col overflow-y-auto pt-20 pb-6">
              <nav className="flex flex-1 flex-col justify-start gap-1 py-4">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-display text-3xl text-[var(--pearl)] sm:text-4xl"
                    >
                      {item.label}
                    </Link>
                    {item.to === "/products" && <><button type="button" onClick={() => setMobileProducts(v => !v)} aria-expanded={mobileProducts} className="pb-2 text-sm text-white/70">Key export products {mobileProducts ? "−" : "+"}</button>{mobileProducts && <div className="space-y-1 pb-2">{keyProducts.map(p => <Link key={p.slug} to={`/products/${p.slug}`} onClick={() => setOpen(false)} className="block py-1 text-sm text-white/80">{p.name}</Link>)}</div>}</>}
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between border-t border-white/10 pt-6 text-xs uppercase tracking-[0.28em] text-white/50"
              >
                <span>Kochi · India</span>
                <span>Est. 2012</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

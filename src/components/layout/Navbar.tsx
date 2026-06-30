import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchModal } from "@/components/layout/SearchModal";

const navLinks = [
  { label: "Óculos de Grau", to: "/produtos?categoria=oculos-de-grau" },
  { label: "Solar", to: "/produtos?categoria=oculos-solar" },
  { label: "Premium", to: "/produtos?categoria=premium" },
  { label: "Prova Virtual", to: "/virtual-try-on" },
  { label: "Blog", to: "/blog" },
  { label: "Sobre", to: "/sobre" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome || megaOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-border/60 bg-white/85 shadow-nav backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        {/* Announcement bar */}
        <div
          className={cn(
            "overflow-hidden bg-ink text-center text-[11px] tracking-widest text-white/90 transition-all duration-500",
            solid ? "h-0 opacity-0" : "h-9 py-2.5",
          )}
        >
          FRETE GRÁTIS ACIMA DE R$ 299 · 10% OFF NA PRIMEIRA COMPRA · CÓDIGO MERMO10
        </div>

        <nav className="container-mermo flex h-16 items-center justify-between md:h-20">
          {/* Esquerda */}
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className={cn("size-6", solid ? "text-ink" : "text-white")} />
            </button>

            <div
              className="hidden lg:flex lg:items-center lg:gap-7"
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                onMouseEnter={() => setMegaOpen(true)}
                className={cn(
                  "text-[13px] font-medium tracking-wide transition-colors",
                  solid ? "text-ink hover:text-gold" : "text-white/90 hover:text-white",
                )}
              >
                Coleções
              </button>
              {navLinks.slice(0, 3).map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onMouseEnter={() => setMegaOpen(false)}
                  className={cn(
                    "text-[13px] font-medium tracking-wide transition-colors",
                    solid
                      ? "text-ink hover:text-gold"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Logo central */}
          <Link
            to="/"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 font-serif text-xl font-semibold tracking-[0.18em] transition-colors md:text-2xl",
              solid ? "text-ink" : "text-white",
            )}
          >
            USE MERMO
          </Link>

          {/* Direita */}
          <div className="flex items-center gap-3 md:gap-5">
            {navLinks.slice(3).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={cn(
                  "hidden text-[13px] font-medium tracking-wide transition-colors lg:inline-block",
                  solid ? "text-ink hover:text-gold" : "text-white/90 hover:text-white",
                )}
              >
                {l.label}
              </NavLink>
            ))}

            <IconButton solid={solid} onClick={() => setSearchOpen(true)} label="Buscar">
              <Search className="size-5" />
            </IconButton>
            <Link to="/conta" className="hidden md:block">
              <IconButton solid={solid} label="Minha conta">
                <User className="size-5" />
              </IconButton>
            </Link>
            <Link to="/conta?tab=favoritos" className="relative hidden md:block">
              <IconButton solid={solid} label="Favoritos">
                <Heart className="size-5" />
              </IconButton>
              {wishCount > 0 && <Counter value={wishCount} />}
            </Link>
            <button onClick={openCart} className="relative" aria-label="Sacola">
              <IconButton solid={solid} label="Sacola">
                <ShoppingBag className="size-5" />
              </IconButton>
              {count > 0 && <Counter value={count} />}
            </button>
          </div>
        </nav>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              className="absolute inset-x-0 top-full hidden border-t border-border bg-white shadow-nav lg:block"
            >
              <div className="container-mermo grid grid-cols-4 gap-8 py-10">
                <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-3">
                  <p className="col-span-2 eyebrow mb-1">Categorias</p>
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/produtos?categoria=${c.slug}`}
                      className="link-underline text-sm text-gray-dark hover:text-ink"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <p className="eyebrow mb-1">Marcas</p>
                  {brands
                    .filter((b) => b.featured)
                    .slice(0, 7)
                    .map((b) => (
                      <Link
                        key={b.id}
                        to={`/produtos?marca=${encodeURIComponent(b.name)}`}
                        className="link-underline text-sm text-gray-dark hover:text-ink"
                      >
                        {b.name}
                      </Link>
                    ))}
                </div>
                <Link to="/produtos?categoria=lancamentos" className="group relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=500&q=80"
                    alt="Lançamentos USE MERMO"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/70 to-transparent p-5">
                    <p className="eyebrow text-gold">Lançamentos</p>
                    <p className="font-serif text-lg text-white">Nova Coleção 2026</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Drawer mobile */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function IconButton({
  children,
  solid,
  label,
  onClick,
}: {
  children: React.ReactNode;
  solid: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <span
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex size-9 items-center justify-center transition-colors",
        solid ? "text-ink hover:text-gold" : "text-white hover:text-gold-soft",
      )}
    >
      {children}
    </span>
  );
}

function Counter({ value }: { value: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-ink">
      {value}
    </span>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 z-[70] flex w-[85%] max-w-sm flex-col bg-white lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="font-serif text-lg tracking-[0.18em]">USE MERMO</span>
              <button onClick={onClose} aria-label="Fechar">
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <p className="eyebrow mb-4">Categorias</p>
              <div className="flex flex-col gap-4">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/produtos?categoria=${c.slug}`}
                    onClick={onClose}
                    className="font-serif text-xl text-ink"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
                {navLinks.slice(3).map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={onClose}
                    className="text-sm tracking-wide text-gray-dark"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link to="/conta" onClick={onClose} className="text-sm text-gray-dark">
                  Minha Conta
                </Link>
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

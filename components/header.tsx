"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

const productCategories = [
  { label: "Vases",       href: "/vases" },
  { label: "Wine Holders",href: "/wine-holders" },
  { label: "Organisers",  href: "/organisers" },
  { label: "Shoe Display Racks",  href: "/shoe-display-racks" },
  { label: "Bookshelves", href: "/shelves" },
];

export function Header({ variant = "light" }: { variant?: "dark" | "light" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { count, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // White nav text only over dark heroes (variant="dark") before scrolling;
  // on light pages the text is always dark so the navbar never disappears.
  const onDark = variant === "dark" && !isScrolled;

  const linkClass = `text-sm transition-colors ${onDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`;

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md rounded-full" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-36 h-8 overflow-hidden">
            <Image
              src="/images/logo2.svg"
              alt="Mettali"
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              className={`transition-all duration-300 ${onDark ? "brightness-0 invert" : ""}`}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={linkClass}>Home</Link>
          <Link href="/about" className={linkClass}>About Us</Link>

          {/* Products dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setProductsOpen(o => !o)}
              className={`flex items-center gap-1 text-sm transition-colors ${onDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              Products
              <ChevronDown size={14} className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
            </button>

            {productsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-background rounded-xl shadow-lg border border-border/40 overflow-hidden z-50">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setProductsOpen(false)}
                    className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-space-mono"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/customization" className={linkClass}>Customization</Link>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-5 md:flex">
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className={`relative transition-colors ${onDark ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-mulled-iron px-1 text-[9px] font-medium text-white font-space-mono">
                {count}
              </span>
            )}
          </button>
          <Link
            href="#reserve"
            className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${onDark ? "bg-white text-foreground hover:bg-white/90" : "bg-foreground text-background hover:opacity-80"}`}
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile: cart + menu buttons */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className={`relative transition-colors ${onDark ? "text-white" : "text-foreground"}`}
          >
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-mulled-iron px-1 text-[9px] font-medium text-white font-space-mono">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`transition-colors ${onDark ? "text-white" : "text-foreground"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            <Link href="/" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>About Us</Link>

            {/* Mobile Products accordion */}
            <div>
              <button
                onClick={() => setMobileProductsOpen(o => !o)}
                className="flex items-center justify-between w-full text-lg text-foreground"
              >
                Products
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileProductsOpen && (
                <div className="mt-3 ml-4 flex flex-col gap-4 border-l border-border pl-4">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="text-base text-muted-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/customization" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Customization</Link>

            <Link
              href="#reserve"
              className="mt-4 bg-foreground px-5 py-3 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}

      <CartDrawer />
    </header>
  );
}

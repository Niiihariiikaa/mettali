"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { SearchBar } from "@/components/search-bar";

export function Header({ variant = "light" }: { variant?: "dark" | "light" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { count, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  // White nav text only over dark heroes (variant="dark") before scrolling;
  // on light pages the text is always dark so the navbar never disappears.
  const onDark = variant === "dark" && !isScrolled;

  const linkClass = `text-sm transition-colors ${onDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`;

  // Nav/CTA and the search bar are stacked in the same box and cross-fade +
  // slide between each other, instead of the search bar covering the nav.
  const hiddenLayerClass = "opacity-0 -translate-y-1.5 pointer-events-none";
  const visibleLayerClass = "opacity-100 translate-y-0";

  return (
    <header
      ref={headerRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300 ${isScrolled ? "bg-background backdrop-blur-md rounded-full" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-3 pl-6 py-2.5">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-5 w-24 overflow-hidden md:h-8 md:w-36">
            <Image
              src="/images/logo2.svg"
              alt="Mettali"
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              className={`transition-all duration-300 ${onDark ? "brightness-0 invert" : ""}`}
            />
          </div>
        </Link>

        {/* Desktop: nav/CTA <-> search toggle area */}
        <div className="relative hidden h-9 flex-1 items-center md:flex ml-12">
          {/* Nav + CTA layer */}
          <div
            className={`absolute inset-0 flex items-center justify-between transition-all duration-300 ease-out ${
              searchOpen ? hiddenLayerClass : visibleLayerClass
            }`}
          >
            <nav className="flex items-center gap-10">
              <Link href="/" className={linkClass}>Home</Link>
              <Link href="/about" className={linkClass}>About Us</Link>
              <Link href="/products" className={linkClass}>Products</Link>
              <Link href="/customization" className={linkClass}>Customization</Link>
              <Link href="/bulk-order" className={linkClass}>Bulk Order &amp; Gifting</Link>
            </nav>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className={`transition-colors ${onDark ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Search size={20} />
              </button>
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
              <button
                type="button"
                onClick={openCart}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${onDark ? "bg-white text-foreground hover:bg-white/90" : "bg-foreground text-background hover:opacity-80"}`}
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Search layer */}
          <div
            className={`absolute inset-0 flex items-center transition-all duration-300 ease-out ${
              searchOpen ? visibleLayerClass : hiddenLayerClass
            }`}
          >
            <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} onDark={onDark} />
          </div>
        </div>

        {/* Mobile: icons <-> search toggle area */}
        <div className="relative flex h-8 flex-1 items-center justify-end md:hidden">
          <div
            className={`absolute inset-y-0 right-0 flex items-center gap-4 transition-all duration-300 ease-out ${
              searchOpen ? hiddenLayerClass : visibleLayerClass
            }`}
          >
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`transition-colors ${onDark ? "text-white" : "text-foreground"}`}
            >
              <Search size={20} />
            </button>
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

          <div
            className={`absolute inset-y-0 left-0 right-0 flex items-center transition-all duration-300 ease-out ${
              searchOpen ? visibleLayerClass : hiddenLayerClass
            }`}
          >
            <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} onDark={onDark} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            <Link href="/" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/products" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link href="/customization" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Customization</Link>
            <Link href="/bulk-order" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Bulk Order &amp; Gifting</Link>

            <button
              type="button"
              onClick={() => { setIsMenuOpen(false); openCart(); }}
              className="mt-4 bg-foreground px-5 py-3 text-center text-sm font-medium text-background rounded-full"
            >
              Shop Now
            </button>
          </nav>
        </div>
      )}

      <CartDrawer />
    </header>
  );
}

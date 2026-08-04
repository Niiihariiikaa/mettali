"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Delivery", href: "/delivery" },
  { label: "Returns", href: "/returns" },
  { label: "Care Guide", href: "/care-guide" },
  { label: "Contact", href: "/contact" },
];

function PinterestIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.378-.293 1.194-.333 1.361-.052.219-.174.266-.401.16-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.379l-.748 2.848c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Z" />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Mettali"
                width={120}
                height={32}
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground font-space-mono">
              Premium aluminium furniture and home decor for modern living. Where industrial strength meets refined elegance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-foreground font-space-mono">Company</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground font-space-mono"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground font-space-mono">
            2026 METTALI. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <Link
              href="#"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram size={16} />
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Facebook size={16} />
            </Link>
            <Link
              href="#"
              aria-label="Pinterest"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <PinterestIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

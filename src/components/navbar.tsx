"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, X } from "lucide-react";

// Dedicated chapter pages (full routes, not anchors).
const pageLinks = [
  { label: "Paradigm Shift", href: "/chapters/paradigm-shift" },
  { label: "Value Chain", href: "/chapters/value-chain" },
  { label: "The Rocket", href: "/chapters/launch-vehicles" },
  { label: "Satellites", href: "/chapters/satellites" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleNavigate = () => setIsOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#030308]/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link
          href="/#overview"
          className="interactive-control flex items-center gap-2.5 py-2 text-sm font-black tracking-[-0.02em] text-white"
        >
          <Shield className="h-4 w-4 text-[#FFB800]" />
          India Space Sector
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {pageLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`interactive-control px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] ${
                  active
                    ? "bg-[#FFB800]/14 text-[#FFB800]"
                    : "text-white/58 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="interactive-control p-2 text-white/70 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-white/10 bg-[#030308] px-6 py-4 md:hidden" aria-label="Mobile navigation">
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavigate}
              className={`interactive-control block px-2 py-3 font-mono text-sm font-bold uppercase tracking-[0.14em] ${
                pathname === link.href ? "text-[#FFB800]" : "text-white/76"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

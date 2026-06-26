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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Premium glass reflection highlights */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] pointer-events-none" />
      <div className="absolute inset-0 -z-20 bg-[#030308]/65 pointer-events-none" />

      <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
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
                className={`interactive-control px-3.5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 rounded-[4px] ${
                  active
                    ? "bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/25 shadow-[inset_0_1px_0_rgba(255,184,0,0.15),0_0_12px_rgba(255,184,0,0.06)]"
                    : "text-white/58 hover:text-white border border-transparent hover:bg-white/[0.04]"
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
        <nav className="relative z-10 border-t border-white/[0.08] bg-[#030308]/95 px-6 py-4 md:hidden" aria-label="Mobile navigation">
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavigate}
              className={`interactive-control block px-2 py-3 font-sans text-sm font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                pathname === link.href ? "text-[#FFB800]" : "text-white/76 hover:text-white"
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

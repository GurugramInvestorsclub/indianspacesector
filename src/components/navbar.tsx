"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Shield, X } from "lucide-react";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Market", href: "#market" },
  { label: "Network", href: "#ecosystem" },
  { label: "Value chain", href: "#value-chain" },
  { label: "Dossiers", href: "#case-studies" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.4, 0.65] },
    );

    navLinks.forEach((link) => {
      const target = document.getElementById(link.href.slice(1));
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = () => setIsOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#030308]/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link
          href="#overview"
          className="interactive-control flex items-center gap-2.5 py-2 text-sm font-black tracking-[-0.02em] text-white"
        >
          <Shield className="h-4 w-4 text-[#00d5e8]" />
          India Space Sector
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const active = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`interactive-control px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] ${
                  active
                    ? "bg-[#00d5e8]/14 text-[#8cf7ff]"
                    : "text-white/58 hover:text-white"
                }`}
              >
                {link.label}
              </a>
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavigate}
              className="interactive-control block px-2 py-3 font-mono text-sm font-bold uppercase tracking-[0.14em] text-white/76"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, X } from "lucide-react";

// Section anchors live on the home page; prefix with "/" so they resolve
// from any route (navigate home, then scroll to the section).
const navLinks = [
  { label: "Overview", id: "overview", href: "/#overview" },
  { label: "Market", id: "market", href: "/#market" },
  { label: "Network", id: "ecosystem", href: "/#ecosystem" },
  { label: "Value chain", id: "value-chain", href: "/#value-chain" },
  { label: "Dossiers", id: "case-studies", href: "/#case-studies" },
];

// Dedicated chapter pages (full routes, not anchors).
const pageLinks = [
  { label: "Paradigm Shift", href: "/chapters/paradigm-shift" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
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
      const target = document.getElementById(link.id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, [onHome]);

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
          {navLinks.map((link) => {
            const active = onHome && activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`interactive-control px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] ${
                  active
                    ? "bg-[#FFB800]/14 text-[#FFB800]"
                    : "text-white/58 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}

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

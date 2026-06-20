"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "OVERVIEW", href: "#overview" },
    { label: "THE STACK", href: "#stack" },
    { label: "ANALYSIS", href: "#analysis" },
    { label: "THE OPPORTUNITY", href: "#opportunity" },
    { label: "JOIN NOW", href: "#join" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      // Offset for sticky header
      const headerOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#030308]/90 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-sans font-bold text-sm md:text-base tracking-[0.2em] uppercase hover:opacity-85 transition-opacity"
          >
            INDIA'S SPACE REVOLUTION
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[11px] font-mono tracking-[0.18em] text-white/55 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button (Desktop) & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#join"
              onClick={(e) => handleScrollTo(e, "#join")}
              className="hidden md:flex items-center gap-2 bg-[#0052FF] hover:bg-[#0040D0] text-white font-mono text-[10px] tracking-[0.18em] px-6 py-2.5 rounded-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#0066FF]/20"
            >
              SECURE SPOT
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white/70 hover:text-white p-1 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-[#030308]/98 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-2xl font-sans font-bold tracking-wider text-white/70 hover:text-white transition-colors"
                style={{ animationDelay: `${idx * 75}ms` }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#join"
              onClick={(e) => handleScrollTo(e, "#join")}
              className="mt-4 flex items-center justify-center gap-2 bg-[#0052FF] text-white font-mono text-[12px] tracking-[0.15em] py-3.5 rounded-sm"
            >
              SECURE SPOT <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

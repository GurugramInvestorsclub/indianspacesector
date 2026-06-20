"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync active section highlight using IntersectionObserver
  useEffect(() => {
    const sections = [
      "overview",
      "origins",
      "inflection",
      "pillars",
      "deepdive-launch",
      "deepdive-satellites",
      "deepdive-ground",
      "deepdive-applications",
      "case-studies",
      "join"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: "OVERVIEW", href: "#overview", activeKeys: ["overview", "inflection"] },
    { label: "ORIGINS", href: "#origins", activeKeys: ["origins"] },
    { label: "THE STACK", href: "#pillars", activeKeys: ["pillars"] },
    {
      label: "DEEP-DIVES",
      href: "#deepdive-launch",
      activeKeys: ["deepdive-launch", "deepdive-satellites", "deepdive-ground", "deepdive-applications"]
    },
    { label: "CASE STUDIES", href: "#case-studies", activeKeys: ["case-studies"] },
    { label: "CLOSE", href: "#join", activeKeys: ["join"] }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      const headerOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const isLinkActive = (keys: string[]) => {
    return keys.includes(activeSection);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#030308]/85 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-sans font-bold text-sm md:text-base tracking-[0.2em] uppercase hover:text-[#00F0FF] transition-colors flex items-center gap-2.5"
          >
            <Shield className="w-4 h-4 text-[#00F0FF] animate-pulse shrink-0" />
            <span>INDIA'S SPACE REVOLUTION</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.activeKeys);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`text-[11px] font-mono tracking-[0.18em] transition-colors duration-300 relative py-1 ${
                    active ? "text-[#00F0FF] font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#00F0FF]"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/60 hover:text-white p-1 cursor-pointer"
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
            className="absolute top-6 right-6 text-white/60 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-2xl font-sans font-bold tracking-wider transition-colors ${
                  isLinkActive(link.activeKeys) ? "text-[#00F0FF]" : "text-white/60 hover:text-white"
                }`}
                style={{ animationDelay: `${idx * 75}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

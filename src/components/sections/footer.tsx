"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Recent Research", href: "#" }
  ];

  return (
    <footer className="relative bg-[#030308] border-t border-white/5 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-8">
        {/* Left Side: Brand and Copyright */}
        <div className="flex flex-col gap-2">
          <span className="text-white font-sans font-bold text-sm tracking-[0.2em] uppercase">
            INDIA'S SPACE REVOLUTION
          </span>
          <p className="text-white/30 text-[10px] font-mono tracking-wider">
            &copy; {currentYear} INDIA'S SPACE STACK. ALL RIGHTS RESERVED. DECLASSIFIED SYSTEM.
          </p>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-[10px] font-mono tracking-wider text-white/40 hover:text-white transition-colors duration-300 uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

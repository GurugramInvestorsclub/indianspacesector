"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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

  return (
    <section
      id="overview"
      className="relative min-h-[100dvh] flex items-center justify-start overflow-hidden bg-space-black pt-24 pb-20 md:py-32"
    >
      {/* Background Starry Space Image */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src="/space_bg.png"
          alt="Deep space starry background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.75]"
        />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]"></div>
        {/* Dark radial gradient and linear bottom overlay for smooth section transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/60 via-transparent to-[#030308] opacity-100"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#00F0FF] uppercase">
              1. STRATEGIC ALLIANCE BRIEF
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white"
          >
            India's Space <br />
            Revolution Has <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
              Begun.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-sm md:text-base mt-6 max-w-xl font-sans leading-relaxed"
          >
            From launch vehicles and satellites to defense systems and space applications,
            explore the issues shaping India's next strategic technology frontier.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {/* Primary Blue Button */}
            <a
              href="#join"
              onClick={(e) => handleScrollTo(e, "#join")}
              className="group flex items-center justify-center gap-2 bg-[#0052FF] hover:bg-[#0040D0] text-white font-mono text-[10px] tracking-[0.18em] px-7 py-4 rounded-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#0066FF]/20"
            >
              READ WHAT THE BRIEFING IS
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Ghost Button */}
            <a
              href="#join"
              onClick={(e) => handleScrollTo(e, "#join")}
              className="group flex items-center justify-center gap-2 bg-transparent hover:bg-white/[0.04] text-white/80 hover:text-white font-mono text-[10px] tracking-[0.18em] px-7 py-4 rounded-sm border border-white/10 hover:border-white/20 transition-all duration-300 active:scale-[0.98]"
            >
              SECURE THE SPACE BLUEPRINT
              <Download className="w-3.5 h-3.5 group-hover:translate-y-[1px] transition-transform opacity-70" />
            </a>
          </motion.div>

          {/* Micro Telemetry details below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex items-center gap-6 font-mono text-[9px] text-white/50 tracking-widest uppercase border-t border-white/5 pt-6 max-w-lg"
          >
            <div>
              <span className="text-white/30 block">DOC STATUS</span>
              <span className="text-white mt-1 block">DECLASSIFIED</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div>
              <span className="text-white/30 block">ORBITAL TARGET</span>
              <span className="text-[#00F0FF] mt-1 block">LEO / GEO DYNAMICS</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div>
              <span className="text-white/30 block">EDITION</span>
              <span className="text-white mt-1 block">VOL. 01 / 2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

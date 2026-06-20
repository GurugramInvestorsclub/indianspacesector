"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      id="overview"
      className="relative h-[100dvh] w-full flex items-center justify-start overflow-hidden bg-[#F7F6F3]"
    >
      {/* Background Cinematic Space Image with Ken Burns Zoom & Sepia/Grayscale filter */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1.02, 1.07, 1.02] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="/hero_cinematic.png"
            alt="Cinematic rocket launch silhouette"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter grayscale-[60%] sepia-[15%] brightness-[0.95] contrast-[0.9]"
          />
        </motion.div>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-10"></div>
        {/* Light warm bone gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3]/70 via-[#F7F6F3]/30 to-[#F7F6F3] opacity-100 z-10"></div>
        <div className="absolute inset-0 radial-vignette z-10"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-3xl">
          {/* Eyebrow Tag using Pale Blue Muted Pastel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#E1F3FE] border border-[#1F6C9F]/20 rounded-full mb-6 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F6C9F] animate-pulse"></span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#1F6C9F] uppercase font-bold">
              STRATEGIC WEBINAR BRIEFING
            </span>
          </motion.div>

          {/* Headline with Serif Italic Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tighter leading-[1.05] text-[#111111]"
          >
            India's Space <br />
            Revolution Has <br />
            <span className="font-serif italic font-light text-[#1F6C9F] tracking-normal">Begun.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#2F3437] text-sm md:text-base mt-6 max-w-xl font-sans leading-relaxed"
          >
            A declassified analysis of the sovereign assets and capital flywheels shaping India's orbital technology stack.
          </motion.p>

          {/* Scroll Down HUD indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 flex items-center gap-2 font-mono text-[9px] text-[#787774] tracking-widest uppercase"
          >
            <ChevronDown className="w-4 h-4 animate-bounce text-[#1F6C9F]" />
            <span>SCROLL DOWN TO DECLASSIFY BRIEFING</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

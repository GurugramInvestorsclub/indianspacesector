"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      id="overview"
      className="relative h-[100dvh] w-full flex items-center justify-start overflow-hidden bg-space-black"
    >
      {/* Background Starry Space Image with Ken Burns Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1.02, 1.08, 1.02] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="/hero_cinematic.png"
            alt="Cinematic rocket launch silhouette against Earth and nebula"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.4]"
          />
        </motion.div>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-10"></div>
        {/* Dark radial and bottom linear gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/80 via-transparent to-[#030308] opacity-100 z-10"></div>
        <div className="absolute inset-0 radial-vignette z-10"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-3xl">
          {/* Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase">
              STRATEGIC WEBINAR BRIEFING
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white"
          >
            India's Space <br />
            Revolution Has <br />
            <span className="text-[#00F0FF]">Begun.</span>
          </motion.h1>

          {/* Subtext - Cut by half to read like a single cinematic caption */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-sm md:text-base mt-6 max-w-xl font-sans leading-relaxed"
          >
            A declassified analysis of the sovereign assets and capital flywheels shaping India's orbital technology stack.
          </motion.p>

          {/* Scroll Down HUD indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 flex items-center gap-2 font-mono text-[9px] text-white tracking-widest uppercase"
          >
            <ChevronDown className="w-4 h-4 animate-bounce text-[#00F0FF]" />
            <span>SCROLL DOWN TO DECLASSIFY BRIEFING</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

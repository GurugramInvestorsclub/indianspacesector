"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Orbit } from "lucide-react";
import { motion, useTransform, useScroll } from "motion/react";

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse move handler for premium 3D depth parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2); // -1 to 1
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2); // -1 to 1
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="overview"
      className="relative h-[100dvh] w-full flex items-center justify-start overflow-hidden bg-[#030308]"
    >
      {/* BACKGROUND LAYER: Space gradient, stars, and grid */}
      <motion.div
        style={{
          x: mousePos.x * -15,
          y: mousePos.y * -15,
        }}
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
      >
        <Image
          src="/hero_cinematic.png"
          alt="Cinematic rocket launch silhouette"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.25] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-[#030308]/40 to-[#030308]"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </motion.div>

      {/* MID LAYER: 3D Orbital Trajectories & Floating Satellites */}
      <motion.div
        style={{
          x: mousePos.x * 35,
          y: mousePos.y * 35,
          rotateX: mousePos.y * -5,
          rotateY: mousePos.x * 5,
          perspective: 1000,
        }}
        className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center transition-transform duration-500 ease-out"
      >
        {/* Orbital Trajectory Plane 1 */}
        <div 
          className="absolute w-[800px] h-[800px] border border-white/[0.03] rounded-full"
          style={{ transform: "rotateX(75deg) rotateY(15deg)" }}
        >
          {/* Glowing trajectory dash track */}
          <div className="absolute inset-0 border border-dashed border-[#00F0FF]/15 rounded-full animate-[spin_50s_linear_infinite]"></div>
          
          {/* Floating Satellite 1 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]"></div>
            <span className="font-mono text-[7px] text-[#00F0FF]/60 tracking-widest">SAT_LEO_01</span>
          </div>
        </div>

        {/* Orbital Trajectory Plane 2 */}
        <div 
          className="absolute w-[600px] h-[600px] border border-white/[0.02] rounded-full"
          style={{ transform: "rotateX(70deg) rotateY(-25deg)" }}
        >
          <div className="absolute inset-0 border border-dashed border-[#FF6B00]/10 rounded-full animate-[spin_35s_linear_infinite_reverse]"></div>
          
          {/* Floating Satellite 2 */}
          <div className="absolute bottom-0 right-1/4 translate-y-1/2 flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]"></div>
            <span className="font-mono text-[7px] text-[#FF6B00]/60 tracking-widest">SAT_MEO_02</span>
          </div>
        </div>
      </motion.div>

      {/* FOREGROUND LAYER: Content and Titles */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20">
        <motion.div
          style={{
            x: mousePos.x * 8,
            y: mousePos.y * 8,
          }}
          className="max-w-3xl transition-transform duration-300 ease-out"
        >
          {/* Eyebrow Tag using Neon Cyan */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase font-bold">
              STRATEGIC WEBINAR BRIEFING
            </span>
          </motion.div>

          {/* Headline with Serif Italic Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white"
          >
            India's Space <br />
            Revolution Has <br />
            <span className="font-serif italic font-light text-[#00F0FF] tracking-normal">Begun.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/70 text-sm md:text-base mt-6 max-w-xl font-sans leading-relaxed"
          >
            A declassified analysis of the sovereign assets and capital flywheels shaping India's orbital technology stack.
          </motion.p>

          {/* Scroll Down HUD indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 flex items-center gap-2 font-mono text-[9px] text-white/40 tracking-widest uppercase"
          >
            <ChevronDown className="w-4 h-4 animate-bounce text-[#00F0FF]" />
            <span>SCROLL DOWN TO DECLASSIFY BRIEFING</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

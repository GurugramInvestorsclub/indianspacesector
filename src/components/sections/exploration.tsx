"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function Exploration() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // -------------------------------------------------------------
  // Act 1: The Moon (Scroll 0.00 to 0.33)
  // -------------------------------------------------------------
  const moonBgOpacity = useTransform(scrollYProgress, [0.0, 0.28, 0.34], [0.85, 0.85, 0]);
  const moonScale = useTransform(scrollYProgress, [0.0, 0.34], [1.02, 0.98]);
  const moonTextOpacity = useTransform(scrollYProgress, [0.0, 0.05, 0.25, 0.30], [0, 1, 1, 0]);
  const moonTextY = useTransform(scrollYProgress, [0.0, 0.05, 0.25, 0.30], [15, 0, 0, -15]);

  // -------------------------------------------------------------
  // Act 2: Mars (Scroll 0.33 to 0.66)
  // -------------------------------------------------------------
  const marsBgOpacity = useTransform(scrollYProgress, [0.28, 0.34, 0.60, 0.66], [0, 0.85, 0.85, 0]);
  const marsScale = useTransform(scrollYProgress, [0.28, 0.66], [1.04, 0.98]);
  const marsTextOpacity = useTransform(scrollYProgress, [0.32, 0.37, 0.57, 0.62], [0, 1, 1, 0]);
  const marsTextY = useTransform(scrollYProgress, [0.32, 0.37, 0.57, 0.62], [15, 0, 0, -15]);

  // -------------------------------------------------------------
  // Act 3: The Sun (Scroll 0.66 to 1.00)
  // -------------------------------------------------------------
  const sunBgOpacity = useTransform(scrollYProgress, [0.60, 0.66, 0.95, 1.0], [0, 0.85, 0.85, 0]);
  const sunScale = useTransform(scrollYProgress, [0.60, 1.0], [1.04, 0.98]);
  const sunTextOpacity = useTransform(scrollYProgress, [0.64, 0.69, 0.94, 0.98], [0, 1, 1, 0]);
  const sunTextY = useTransform(scrollYProgress, [0.64, 0.69, 0.94, 0.98], [15, 0, 0, -15]);

  return (
    <div 
      ref={containerRef}
      id="exploration"
      className="relative w-full h-[400vh] bg-[#030308]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* ------------------------------------------------------------- */}
        {/* Visual Background Layers (Blended into absolute black) */}
        {/* ------------------------------------------------------------- */}
        
        {/* Act 1 Background: The Moon */}
        <motion.div
          style={{ opacity: moonBgOpacity, scale: moonScale }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/moon_exploration.png"
            alt="The Moon in Deep Space"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.1] brightness-[0.7] select-none"
          />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#030308_85%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-90" />
        </motion.div>

        {/* Act 2 Background: Mars */}
        <motion.div
          style={{ opacity: marsBgOpacity, scale: marsScale }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/mars_exploration.png"
            alt="Mars planet"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.15] brightness-[0.6] select-none"
          />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#030308_85%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-95" />
        </motion.div>

        {/* Act 3 Background: The Sun */}
        <motion.div
          style={{ opacity: sunBgOpacity, scale: sunScale }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/sun_exploration.png"
            alt="Solar Corona flares"
            fill
            sizes="100vw"
            className="object-cover object-center contrast-[1.1] brightness-[0.6] select-none"
          />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,#030308_85%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-90" />
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* Content Layers */}
        {/* ------------------------------------------------------------- */}

        {/* ACT 1 CONTENT: THE MOON */}
        <motion.div
          style={{ opacity: moonTextOpacity, y: moonTextY }}
          className="absolute z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#8E9AA6] uppercase mb-4">
            Act I / Lunar Sentinel
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            The Moon
          </h2>
          <h3 className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-8">
            The First Frontier
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans max-w-2xl">
            Chandrayaan was more than a mission; it was India&apos;s first departure from the cradle of Earth orbit. Looking into the cold, shadowed craters of the lunar south pole, we sought to discover what lay hidden in the dark, finding evidence of water molecules that changed lunar science forever.
          </p>
        </motion.div>

        {/* ACT 2 CONTENT: MARS */}
        <motion.div
          style={{ opacity: marsTextOpacity, y: marsTextY }}
          className="absolute z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#C2410C] uppercase mb-4">
            Act II / Interplanetary Leap
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Mars
          </h2>
          <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C2410C]/80 uppercase mb-8">
            The Ambition of Distance
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans max-w-2xl">
            With Mangalyaan, we stretched our reach across millions of kilometers of void. On the first attempt, a single probe slipped into orbit around the Red Planet, proving that deep-space navigation is not bounded by astronomical budgets, but defined by sovereign vision.
          </p>
        </motion.div>

        {/* ACT 3 CONTENT: THE SUN */}
        <motion.div
          style={{ opacity: sunTextOpacity, y: sunTextY }}
          className="absolute z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase mb-4">
            Act III / L1 Sentinel
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            The Sun
          </h2>
          <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#FFB800]/80 uppercase mb-8">
            The Luminous Engine
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans max-w-2xl">
            Aditya-L1 looks directly into the heart of our star. Positioned at Lagrange Point 1, it stands as a constant sentinel in space, tracing solar winds, solar flares, and magnetic storms to understand the cosmic engine that powers our solar system.
          </p>
        </motion.div>

      </div>
    </div>
  );
}

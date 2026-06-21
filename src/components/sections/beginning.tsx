"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function Beginning() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across the h-[500vh] scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Interpolation ranges for the different parts of the narrative

  // Part 1: "In the 1960s..."
  const part1Opacity = useTransform(scrollYProgress, 
    [0.0, 0.05, 0.15, 0.20], 
    [0, 1, 1, 0]
  );
  const part1Y = useTransform(scrollYProgress, 
    [0.0, 0.05, 0.15, 0.20], 
    [10, 0, 0, -10]
  );

  // Part 2: "Most nations viewed space..."
  const part2AOpacity = useTransform(scrollYProgress, 
    [0.20, 0.24, 0.36, 0.40], 
    [0, 1, 1, 0]
  );
  const part2AY = useTransform(scrollYProgress, 
    [0.20, 0.24, 0.36, 0.40], 
    [10, 0, 0, -10]
  );

  const part2BOpacity = useTransform(scrollYProgress, 
    [0.27, 0.31, 0.36, 0.40], 
    [0, 1, 1, 0]
  );
  const part2BY = useTransform(scrollYProgress, 
    [0.27, 0.31, 0.36, 0.40], 
    [10, 0, 0, -10]
  );

  // Part 3 & 4: Sarabhai Portrait & Vision Statement
  const portraitOpacity = useTransform(scrollYProgress, 
    [0.40, 0.46, 0.70, 0.76], 
    [0, 0.75, 0.75, 0]
  );
  const portraitScale = useTransform(scrollYProgress, 
    [0.40, 0.76], 
    [1.05, 0.98]
  );

  // Quote & Philosophy overlay
  const quoteOpacity = useTransform(scrollYProgress, 
    [0.48, 0.53, 0.70, 0.76], 
    [0, 1, 1, 0]
  );
  const quoteY = useTransform(scrollYProgress, 
    [0.48, 0.53, 0.70, 0.76], 
    [15, 0, 0, -10]
  );

  // Part 5: The First Steps & Movement
  const part5Opacity = useTransform(scrollYProgress, 
    [0.76, 0.82, 0.94, 0.98], 
    [0, 1, 1, 0]
  );
  const part5Y = useTransform(scrollYProgress, 
    [0.76, 0.82, 0.94, 0.98], 
    [15, 0, 0, -10]
  );

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[500vh] bg-[#030308]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* Subtle Background Space Ambient - extremely low opacity */}
        <div className="absolute inset-0 z-0 bg-radial-[circle_at_center,rgba(0,240,255,0.01)_0%,transparent_75%] pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* PART 1: The Context */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: part1Opacity, y: part1Y }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#00F0FF] uppercase mb-6 opacity-60">
            Chapter I
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white/90 leading-tight">
            In the 1960s, India was still finding its place in the world.
          </h2>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* PART 2: The Contrast */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.h2
            style={{ opacity: part2AOpacity, y: part2AY }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white/90 leading-tight"
          >
            Most nations viewed space as a race.
          </motion.h2>

          <motion.h3
            style={{ opacity: part2BOpacity, y: part2BY, fontFamily: 'Georgia, serif' }}
            className="text-3xl md:text-4xl lg:text-5xl font-light italic tracking-tight text-[#00F0FF]/90"
          >
            One man saw something different.
          </motion.h3>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* PART 3 & 4: Dr. Vikram Sarabhai & The Vision */}
        {/* ------------------------------------------------------------- */}
        {/* Cinematic portrait in background */}
        <motion.div
          style={{ opacity: portraitOpacity, scale: portraitScale }}
          className="absolute inset-0 z-0 w-full h-full"
        >
          <Image
            src="/vikram_sarabhai.jpg"
            alt="Dr. Vikram Sarabhai"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.25] brightness-[0.7] select-none pointer-events-none"
          />
          {/* Radial soft vignette - fades the portrait softly into absolute black */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#030308_80%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-90" />
        </motion.div>

        {/* Quote Overlay */}
        <motion.div
          style={{ opacity: quoteOpacity, y: quoteY }}
          className="absolute z-10 w-full max-w-4xl px-8 md:px-12 flex flex-col justify-end h-[80%] pb-16 md:pb-24 pointer-events-none"
        >
          <div className="max-w-2xl text-left bg-gradient-to-t from-[#030308]/90 to-transparent p-6 rounded-md">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase mb-4 block">
              Dr. Vikram Sarabhai
            </span>
            <p 
              className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-wide leading-relaxed text-white/95 italic mb-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              &ldquo;We do not have the financial or scientific power to compete with the advanced nations... But we are determined to use space technology for the benefit of our people.&rdquo;
            </p>
            <p className="text-xs md:text-sm font-mono tracking-widest text-[#FF6B00] uppercase">
              The Visionary Insight That Sparked ISRO
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* PART 5: The Movement */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: part5Opacity, y: part5Y }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto space-y-8"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#00F0FF] uppercase mb-2">
            The Spark
          </span>
          <h3 
            className="text-3xl md:text-4xl lg:text-5xl font-normal leading-normal text-white"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            A church in a fishing village. <br />
            Bicycles carrying rocket parts.
          </h3>
          <p className="text-base md:text-lg text-white/60 font-mono tracking-[0.15em] uppercase leading-relaxed max-w-2xl">
            Lacking launch pads and laboratories, they worked at Thumba. They did not wait for resources. They created them.
          </p>
          <div className="pt-4 font-mono text-[10px] tracking-[0.25em] text-[#FF6B00] uppercase">
            A movement has begun
          </div>
        </motion.div>

      </div>
    </div>
  );
}

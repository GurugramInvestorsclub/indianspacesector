"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";

interface SectionProps {
  presentationActive?: boolean;
  currentFrameIndex?: number;
}

export function Aryabhata({ presentationActive = false, currentFrameIndex = 0 }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useMotionValue(0);

  useEffect(() => {
    if (presentationActive) {
      let p = 0;
      if (currentFrameIndex === 9) p = 0.08;
      else if (currentFrameIndex === 10) p = 0.30;
      else if (currentFrameIndex === 11) p = 0.60;
      else if (currentFrameIndex === 12) p = 0.90;
      else if (currentFrameIndex < 9) p = 0.0;
      else p = 1.0;
      progress.set(p);
    } else {
      progress.set(scrollYProgress.get());
      return scrollYProgress.onChange((latest) => {
        progress.set(latest);
      });
    }
  }, [presentationActive, currentFrameIndex, scrollYProgress, progress]);

  // Scene 1: "Thirteen years later..."
  const scene1Opacity = useTransform(progress, [0.0, 0.05, 0.15, 0.25], [0, 1, 1, 0]);
  const scene1Y = useTransform(progress, [0.0, 0.05, 0.15, 0.25], [15, 0, 0, -10]);

  // Scene 2: "1975"
  const yearOpacity = useTransform(progress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const yearScale = useTransform(progress, [0.15, 0.45], [1.1, 0.95]);

  // Scene 3: Aryabhata image reveal
  const satelliteOpacity = useTransform(progress, [0.35, 0.45, 0.75, 0.85], [0, 0.85, 0.85, 0]);
  const satelliteScale = useTransform(progress, [0.35, 0.85], [0.95, 1.02]);
  
  // Scene 4: The Story
  const storyOpacity = useTransform(progress, [0.39, 0.49, 0.75, 0.85], [0, 1, 1, 0]);
  const storyY = useTransform(progress, [0.39, 0.49, 0.75, 0.85], [15, 0, 0, -10]);

  // Scene 5: Legacy echoes (concentric rings and faint text)
  const legacyOpacity = useTransform(progress, [0.75, 0.85, 0.95, 1.0], [0, 1, 1, 0]);
  const legacyScale = useTransform(progress, [0.75, 1.0], [0.9, 1.1]);

  return (
    <div 
      ref={containerRef}
      id="aryabhata"
      className="relative w-full h-[500vh] bg-[#030308]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* Scene 1: "Thirteen years later..." */}
        <motion.div
          style={presentationActive ? undefined : { opacity: scene1Opacity, y: scene1Y }}
          animate={presentationActive ? { opacity: currentFrameIndex === 9 ? 1 : 0, y: currentFrameIndex === 9 ? 0 : 15 } : undefined}
          className="absolute z-10 text-center px-6 max-w-2xl"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-4">
            Chapter II
          </p>
          <h2 
            className="text-4xl md:text-5xl font-extralight tracking-wide text-white/70 italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Thirteen years later...
          </h2>
        </motion.div>

        {/* Scene 2: "1975" */}
        <motion.div
          style={presentationActive ? undefined : { opacity: yearOpacity, scale: yearScale }}
          animate={presentationActive ? { opacity: currentFrameIndex === 10 ? 1 : 0, scale: currentFrameIndex === 10 ? 1 : 1.1 } : undefined}
          className="absolute z-10 flex flex-col items-center justify-center pointer-events-none"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#FFB800] uppercase mb-4">
            The Milestone Year
          </span>
          <h1 className="text-[9rem] sm:text-[16rem] md:text-[20rem] font-black tracking-tighter text-white leading-none">
            1975
          </h1>
        </motion.div>

        {/* Scene 3: Aryabhata Satellite Visual */}
        <motion.div
          style={presentationActive ? undefined : { opacity: satelliteOpacity, scale: satelliteScale }}
          animate={presentationActive ? { opacity: currentFrameIndex === 11 ? 0.85 : 0, scale: currentFrameIndex === 11 ? 1.02 : 0.95 } : undefined}
          className="absolute inset-0 z-0 w-full h-full"
        >
          <Image
            src="/aryabhata_satellite.jpg"
            alt="Aryabhata Satellite in Space Orbit"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.15] brightness-[0.65] select-none pointer-events-none"
          />
          {/* Radial soft vignette and linear gradients to blend the outer boundaries of the photograph */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#030308_85%] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-90 pointer-events-none" />
        </motion.div>

        {/* Scene 4: The Story Text */}
        <motion.div
          style={presentationActive ? undefined : { opacity: storyOpacity, y: storyY }}
          animate={presentationActive ? { opacity: currentFrameIndex === 11 ? 1 : 0, y: currentFrameIndex === 11 ? 0 : 15 } : undefined}
          className="absolute z-10 w-full max-w-4xl px-8 flex flex-col items-start justify-end h-[85%] pb-16 md:pb-24 pointer-events-none"
        >
          <div className="max-w-xl bg-[#030308]/90 backdrop-blur-sm border border-white/5 p-8 rounded-sm">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase mb-3 block">
              Sovereign Ascent
            </span>
            <h3 
              className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 uppercase"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Aryabhata
            </h3>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-sans mb-6">
              India had built and launched its first satellite. The dream of establishing a space program was no longer a theory—it was a tangible reality. The nation had taken its first bold step into the cosmos, demonstrating that self-reliance was achievable.
            </p>
            <div className="font-mono text-[9px] tracking-[0.2em] text-[#FF6B00] uppercase">
              Orbital Insertion Confirmed
            </div>
          </div>
        </motion.div>

        {/* Scene 5: Legacy Echoes */}
        <motion.div
          style={presentationActive ? undefined : { opacity: legacyOpacity, scale: legacyScale }}
          animate={presentationActive ? { opacity: currentFrameIndex === 12 ? 1 : 0, scale: currentFrameIndex === 12 ? 1 : 0.9 } : undefined}
          className="absolute z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Subtle concentric expanding orbital rings */}
          <svg className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.03]" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="100" stroke="white" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="1" />
            <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="1.5" strokeDasharray="4 8" />
            <circle cx="400" cy="400" r="380" stroke="white" strokeWidth="1" />
          </svg>

          {/* Faint distant telemetry names */}
          <div className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase absolute translate-y-[-180px] translate-x-[-150px]">
            LEO TRAJECTORY
          </div>
          <div className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase absolute translate-y-[150px] translate-x-[200px]">
            GTO INSERTION
          </div>
          <div className="font-mono text-[10px] tracking-[0.4em] text-[#FFB800]/30 uppercase absolute translate-y-[-50px] translate-x-[250px]">
            FUTURE VECTOR
          </div>

          <div className="text-center px-6 max-w-2xl">
            <p 
              className="text-2xl md:text-3xl font-extralight tracking-wide text-white/80 leading-relaxed italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              &ldquo;Everything that came later started here.&rdquo;
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function Speaker() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth parallax translation & fade in for content
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.75, 0.9], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.3, 0.75, 0.9], [40, 0, 0, -40]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1.0]);

  return (
    <section
      ref={containerRef}
      id="speaker"
      className="relative w-full min-h-[100vh] bg-[#030308] border-b border-white/10 flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-[30%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-[#FFB800]/[0.012] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[25vw] h-[25vw] rounded-full bg-[#FF6B00]/[0.008] blur-[110px] pointer-events-none" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-6xl px-6 mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 items-center"
      >
        {/* Left Column: Premium double-bezel portrait frame */}
        <div className="flex flex-col items-center justify-center w-full">
          <motion.div 
            style={{ scale: imageScale }}
            className="relative w-[280px] h-[340px] md:w-full md:h-[400px] p-1.5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 shadow-2xl"
          >
            <div className="w-full h-full rounded-[1.2rem] bg-[#050510] overflow-hidden p-3.5 border border-white/10 relative flex flex-col justify-between">
              
              {/* Actual Portrait Photo of Rahul Rao */}
              <div className="relative w-full h-[90%] rounded-[0.8rem] overflow-hidden border border-white/5">
                <Image
                  src="/speaker.png"
                  alt="Rahul Rao, CFA"
                  fill
                  priority
                  sizes="(max-w-768px) 280px, 340px"
                  className="object-cover object-top grayscale contrast-[1.1] brightness-[0.9] select-none pointer-events-none"
                />
                
                {/* Visual grid overlay to match technical/scientific design */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,#030308_95%] opacity-90 pointer-events-none" />
              </div>

              {/* Monospace bottom label */}
              <div className="flex justify-between items-center z-10 px-1 font-mono text-[8px] tracking-wider text-white/40 uppercase mt-2.5">
                <span className="text-[#FFB800] font-bold">PRESENTER ID: RR-CFA</span>
                <span>FIRST PRINCIPLES</span>
              </div>

              {/* Technical scanner line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFB800]/30 to-transparent animate-scan" style={{ animationDuration: "5s" }} />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Speaker Details */}
        <div className="flex flex-col justify-center text-left">
          
          {/* Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse"></span>
            <span className="font-subheadline text-[10px] tracking-[0.3em] text-[#FFB800] uppercase">
              YOUR SPEAKER
            </span>
          </div>

          {/* Name */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 leading-none">
            Rahul Rao, CFA
          </h2>

          {/* Tagline / Monospace Subtitles */}
          <p className="font-subheadline text-xs md:text-sm text-[#FFB800]/80 tracking-wide mb-8 border-b border-white/5 pb-4 max-w-xl">
            Investor <span className="text-white/20 px-1.5">|</span> CFA Charterholder <span className="text-white/20 px-1.5">|</span> Accidental Teacher
          </p>

          {/* Bullet Points Grid */}
          <div className="space-y-4 max-w-2xl mb-8">
            {[
              "12 years of active market experience",
              "Aerospace Engineering (UK), began investing at 22",
              "Weekly Contributor at The Indian Express / Financial Express",
              "Helped found Family office of a 50-year old conglomerate",
              "Focus: Value based, first-principles frameworks. Nothing Else."
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800] mt-2 shrink-0"></div>
                <p className="text-sm md:text-base text-white/85 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Highlighted Quote in Green */}
          <div className="border-l border-emerald-500/40 pl-6 py-2 bg-emerald-500/[0.01] max-w-xl rounded-r-sm">
            <p className="text-base md:text-lg font-light text-emerald-400 italic leading-relaxed">
              &ldquo;An idea can change your life, a perspective can change your portfolio.&rdquo;
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

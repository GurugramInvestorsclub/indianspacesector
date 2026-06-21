"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function NewEra() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scene 1: "The story is not over."
  const scene1Opacity = useTransform(scrollYProgress, [0.0, 0.04, 0.12, 0.16], [0, 1, 1, 0]);
  const scene1Y = useTransform(scrollYProgress, [0.0, 0.04, 0.12, 0.16], [15, 0, 0, -15]);

  // Scene 2: The Single Node (ISRO)
  const scene2Opacity = useTransform(scrollYProgress, [0.16, 0.20, 0.28, 0.32], [0, 1, 1, 0]);
  const isroScale = useTransform(scrollYProgress, [0.16, 0.32], [0.9, 1.05]);

  // Scene 3: Constellation Expansion
  const scene3Opacity = useTransform(scrollYProgress, [0.32, 0.36, 0.44, 0.48], [0, 1, 1, 0]);
  const ringScale = useTransform(scrollYProgress, [0.32, 0.48], [0.4, 1.0]);

  // Scene 4: The Builders (Skyroot, Agnikul, Pixxel, Dhruva, GalaxEye)
  const scene4Opacity = useTransform(scrollYProgress, [0.48, 0.52, 0.62, 0.66], [0, 1, 1, 0]);
  const buildersY = useTransform(scrollYProgress, [0.48, 0.66], [20, -15]);

  // Scene 5: Future Possibilities (Space Station, Lunar Base, Satellite Swarms, Crewed Exploration)
  const scene5Opacity = useTransform(scrollYProgress, [0.66, 0.70, 0.80, 0.84], [0, 1, 1, 0]);
  const futureScale = useTransform(scrollYProgress, [0.66, 0.84], [0.95, 1.03]);

  // Scene 6: The Climax (The Frontier Opens + Closing Cinematic)
  const scene6Opacity = useTransform(scrollYProgress, [0.84, 0.89, 0.96, 1.0], [0, 1, 1, 0]);
  const finalBackdropOpacity = useTransform(scrollYProgress, [0.84, 0.89, 0.96, 1.0], [0, 0.85, 0.85, 0]);
  const finalBackdropScale = useTransform(scrollYProgress, [0.84, 1.0], [1.05, 0.98]);

  const finalStatementOpacity = useTransform(scrollYProgress, [0.88, 0.93, 0.96, 0.99], [0, 1, 1, 0]);
  const finalStatementY = useTransform(scrollYProgress, [0.88, 0.93, 0.96, 0.99], [25, 0, 0, -20]);

  return (
    <div 
      ref={containerRef}
      id="new-era"
      className="relative w-full h-[700vh] bg-[#030308]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* Subtle Constellation Blueprint Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-0" />

        {/* ------------------------------------------------------------- */}
        {/* SCENE 1: The Setup */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene1Opacity, y: scene1Y }}
          className="absolute z-10 text-center px-6 max-w-3xl"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#FF6B00] uppercase mb-6 block">
            Chapter V
          </span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white/95 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            The story is not over.
          </h2>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 2: The Single Node */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene2Opacity, scale: isroScale }}
          className="absolute z-10 flex flex-col items-center justify-center px-6 text-center max-w-2xl pointer-events-none"
        >
          <div className="w-16 h-16 rounded-full bg-[#030308] border border-[#00F0FF] flex items-center justify-center shadow-[0_0_24px_rgba(0,240,255,0.15)] mb-8">
            <span className="font-mono text-[9px] tracking-widest text-[#00F0FF] font-bold">ISRO</span>
          </div>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-sans max-w-lg">
            For decades, the journey was carried by a single agency. A centralized effort building the core pillars of India&apos;s ascent.
          </p>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 3: Constellation Expansion */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene3Opacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
          <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
            
            {/* Concentric expanding orbits */}
            <motion.div 
              style={{ scale: ringScale }}
              className="absolute w-[180px] h-[180px] border border-white/5 rounded-full"
            />
            <motion.div 
              style={{ scale: ringScale }}
              className="absolute w-[320px] h-[320px] border border-dashed border-white/10 rounded-full"
            />
            <motion.div 
              style={{ scale: ringScale }}
              className="absolute w-[480px] h-[480px] border border-white/5 rounded-full"
            />

            {/* Central node expanding */}
            <div className="absolute w-12 h-12 rounded-full border border-[#00F0FF] bg-[#030308]" />

            {/* Branching network nodes */}
            <motion.div
              style={{ scale: ringScale, transform: "translateY(-120px) translateX(90px)" }}
              className="absolute w-3 h-3 rounded-full bg-[#FF6B00]"
            />
            <motion.div
              style={{ scale: ringScale, transform: "translateY(140px) translateX(-120px)" }}
              className="absolute w-2.5 h-2.5 rounded-full bg-[#00F0FF]"
            />
            <motion.div
              style={{ scale: ringScale, transform: "translateY(-60px) translateX(-160px)" }}
              className="absolute w-3 h-3 rounded-full bg-white/40"
            />
            <motion.div
              style={{ scale: ringScale, transform: "translateY(100px) translateX(160px)" }}
              className="absolute w-2 h-2 rounded-full bg-white/20"
            />

            {/* Dynamic vector connections */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 600" fill="none">
              <line x1="300" y1="300" x2="390" y2="180" stroke="#FF6B00" strokeWidth="0.75" />
              <line x1="300" y1="300" x2="180" y2="440" stroke="#00F0FF" strokeWidth="0.75" />
              <line x1="300" y1="300" x2="140" y2="240" stroke="white" strokeWidth="0.5" />
              <line x1="300" y1="300" x2="460" y2="400" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="absolute bottom-16 text-center max-w-xl">
            <h4 
              className="text-2xl md:text-3xl font-light italic tracking-tight text-white mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Then, the gates opened.
            </h4>
            <p className="text-sm text-white/50 leading-relaxed font-sans max-w-md mx-auto">
              A new model emerged. The state opened its infrastructure, inviting participation. A single sovereign program began to expand into a shared frontier.
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 4: The Builders */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene4Opacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
          <div className="relative w-full max-w-4xl h-[45vh] flex flex-col items-center justify-center">
            
            {/* Organic constellation of pioneer builders floating */}
            <motion.div 
              style={{ y: buildersY }}
              className="relative w-full h-full"
            >
              <div className="absolute top-[10%] left-[20%] text-left">
                <span className="font-mono text-[8px] tracking-widest text-[#00F0FF] uppercase block mb-1">Launcher Platforms</span>
                <h4 className="text-xl md:text-2xl font-black text-white/80 tracking-tight uppercase">SKYROOT</h4>
              </div>

              <div className="absolute top-[45%] left-[65%] text-left">
                <span className="font-mono text-[8px] tracking-widest text-[#FF6B00] uppercase block mb-1">Propulsion Core</span>
                <h4 className="text-xl md:text-2xl font-black text-white/80 tracking-tight uppercase">AGNIKUL</h4>
              </div>

              <div className="absolute top-[75%] left-[15%] text-left">
                <span className="font-mono text-[8px] tracking-widest text-[#00F0FF] uppercase block mb-1">Orbital Imaging</span>
                <h4 className="text-xl md:text-2xl font-black text-white/80 tracking-tight uppercase">PIXXEL</h4>
              </div>

              <div className="absolute top-[20%] left-[55%] text-left">
                <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase block mb-1">Satellite Systems</span>
                <h4 className="text-xl md:text-2xl font-black text-white/80 tracking-tight uppercase">DHRUVA SPACE</h4>
              </div>

              <div className="absolute top-[70%] left-[45%] text-left">
                <span className="font-mono text-[8px] tracking-widest text-[#FF6B00] uppercase block mb-1">Radar Sensing</span>
                <h4 className="text-xl md:text-2xl font-black text-white/80 tracking-tight uppercase">GALAXEYE</h4>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-16 text-center max-w-xl">
            <h4 
              className="text-2xl md:text-3xl font-light italic tracking-tight text-white mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              A generation of builders.
            </h4>
            <p className="text-sm text-white/50 leading-relaxed font-sans max-w-md mx-auto">
              Private ingenuity stepped forward. The national program transformed into an ecosystem of active payloads, launchers, and sensor arrays.
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 5: Future Possibilities */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene5Opacity, scale: futureScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
          <div className="relative w-full max-w-3xl aspect-video flex flex-col items-center justify-center">
            
            {/* The Constellation of Future Milestones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full text-center">
              <div className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mb-2 animate-ping" />
                <span className="font-mono text-[8px] tracking-widest text-[#00F0FF] uppercase mb-1">2035 Horizon</span>
                <h5 className="text-xs md:text-sm font-bold text-white/90 uppercase tracking-wider">Sovereign Space Station</h5>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] mb-2" />
                <span className="font-mono text-[8px] tracking-widest text-[#FF6B00] uppercase mb-1">Lunar Economy</span>
                <h5 className="text-xs md:text-sm font-bold text-white/90 uppercase tracking-wider">Private Moon Landers</h5>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 mb-2" />
                <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase mb-1">Orbital Swarms</span>
                <h5 className="text-xs md:text-sm font-bold text-white/90 uppercase tracking-wider">Mega-Constellations</h5>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 mb-2" />
                <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase mb-1">Crewed Flights</span>
                <h5 className="text-xs md:text-sm font-bold text-white/90 uppercase tracking-wider">Gaganyaan Voyages</h5>
              </div>
            </div>

            <svg className="absolute w-[600px] h-[150px] opacity-[0.05]" viewBox="0 0 600 150" fill="none">
              <line x1="75" y1="75" x2="225" y2="75" stroke="white" strokeWidth="1" strokeDasharray="3 6" />
              <line x1="225" y1="75" x2="375" y2="75" stroke="white" strokeWidth="1" />
              <line x1="375" y1="75" x2="525" y2="75" stroke="white" strokeWidth="1" strokeDasharray="3 6" />
            </svg>
          </div>

          <div className="absolute bottom-16 text-center max-w-xl">
            <h4 
              className="text-2xl md:text-3xl font-light italic tracking-tight text-white mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The horizon expanded.
            </h4>
            <p className="text-sm text-white/50 leading-relaxed font-sans max-w-md mx-auto">
              The destination is no longer just orbit. It is the deep space economy—crewed outposts, lunar exploration, and satellite swarms that extend human intelligence.
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 6: The Climax Finale */}
        {/* ------------------------------------------------------------- */}
        
        {/* Deep space horizon backdrop visual */}
        <motion.div
          style={{ opacity: finalBackdropOpacity, scale: finalBackdropScale }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/closing_cinematic.png"
            alt="India's Space Horizon Finale"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.2] brightness-[0.5] select-none"
          />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,#030308_80%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-95" />
        </motion.div>

        {/* Climax Statement */}
        <motion.div
          style={{ opacity: finalStatementOpacity, y: finalStatementY }}
          className="absolute z-10 w-full max-w-5xl px-8 py-16 flex flex-col items-center justify-center text-center pointer-events-none"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#00F0FF] uppercase mb-6 opacity-80">
            The Frontier Opens
          </span>
          <h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-relaxed text-white max-w-4xl mb-10"
            style={{ fontFamily: "Georgia, serif" }}
          >
            India&apos;s space story is no longer written by a single pen. It is written by thousands of minds. And the greatest chapter is still ahead.
          </h2>

          <h3 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            The next chapter <br className="sm:hidden" />
            <span className="text-[#FF6B00]">is just beginning.</span>
          </h3>
        </motion.div>

      </div>
    </div>
  );
}

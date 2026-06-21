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

  // Scene 1: The Context ("For decades...")
  const scene1Opacity = useTransform(scrollYProgress, [0.0, 0.04, 0.14, 0.18], [0, 1, 1, 0]);
  const scene1Y = useTransform(scrollYProgress, [0.0, 0.04, 0.14, 0.18], [15, 0, 0, -15]);

  const scene1BOpacity = useTransform(scrollYProgress, [0.08, 0.12, 0.14, 0.18], [0, 1, 1, 0]);
  const scene1BY = useTransform(scrollYProgress, [0.08, 0.12, 0.14, 0.18], [15, 0, 0, -15]);

  // Scene 2: The Unlocking (ISRO Core -> IN-SPACe -> Startup links)
  const scene2Opacity = useTransform(scrollYProgress, [0.18, 0.22, 0.38, 0.42], [0, 1, 1, 0]);
  
  // Animate the expansion of the outer rings and startup nodes
  const ringScale = useTransform(scrollYProgress, [0.20, 0.38], [0.3, 1]);
  const linkLength = useTransform(scrollYProgress, [0.22, 0.38], [0, 1]);

  // Scene 3: The Ecosystem (launch, satellites, apps, ground, data, space manufacturing)
  const scene3Opacity = useTransform(scrollYProgress, [0.42, 0.46, 0.58, 0.62], [0, 1, 1, 0]);
  const ecosystemScale = useTransform(scrollYProgress, [0.42, 0.58], [0.95, 1.05]);

  // Scene 4: The Builders (Skyroot, Agnikul, Pixxel, Dhruva, etc.)
  const scene4Opacity = useTransform(scrollYProgress, [0.62, 0.66, 0.76, 0.80], [0, 1, 1, 0]);
  const buildersY = useTransform(scrollYProgress, [0.62, 0.80], [20, -10]);

  // Scene 5: The Climax (Fade to black backdrop + statement)
  const scene5Opacity = useTransform(scrollYProgress, [0.80, 0.85, 0.95, 1.0], [0, 1, 1, 0]);
  const finalBackdropOpacity = useTransform(scrollYProgress, [0.80, 0.85, 0.96, 1.0], [0, 0.8, 0.8, 0]);
  const finalBackdropScale = useTransform(scrollYProgress, [0.80, 1.0], [1.05, 0.98]);

  const finalStatementOpacity = useTransform(scrollYProgress, [0.84, 0.89, 0.95, 0.98], [0, 1, 1, 0]);
  const finalStatementY = useTransform(scrollYProgress, [0.84, 0.89, 0.95, 0.98], [20, 0, 0, -20]);

  return (
    <div 
      ref={containerRef}
      id="new-era"
      className="relative w-full h-[600vh] bg-[#030308]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* ------------------------------------------------------------- */}
        {/* SCENE 1: The Context */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto space-y-8 z-10">
          <motion.h2
            style={{ opacity: scene1Opacity, y: scene1Y }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white/90 leading-tight"
          >
            For decades, India&apos;s space story belonged to one organization.
          </motion.h2>

          <motion.h3
            style={{ opacity: scene1BOpacity, y: scene1BY, fontFamily: "Georgia, serif" }}
            className="text-3xl md:text-4xl lg:text-5xl font-light italic tracking-tight text-[#00F0FF]"
          >
            In 2020, everything changed.
          </motion.h3>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 2: The Unlocking */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene2Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10 pointer-events-none"
        >
          <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
            
            {/* Concentric Unlocking Rings */}
            <motion.div 
              style={{ scale: ringScale }}
              className="absolute w-[200px] h-[200px] border border-white/5 rounded-full"
            />
            <motion.div 
              style={{ scale: ringScale }}
              className="absolute w-[350px] h-[350px] border border-dashed border-white/10 rounded-full"
            />
            <motion.div 
              style={{ scale: ringScale }}
              className="absolute w-[500px] h-[500px] border border-white/5 rounded-full"
            />

            {/* Central Core: ISRO */}
            <div className="absolute z-20 w-16 h-16 rounded-full bg-[#030308] border border-[#00F0FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <span className="font-mono text-[9px] tracking-widest text-[#00F0FF] font-bold">ISRO</span>
            </div>

            {/* Regulatory Gateway: IN-SPACe */}
            <motion.div
              style={{ 
                scale: ringScale,
                transform: "translateY(-100px) translateX(60px)"
              }}
              className="absolute z-20 w-20 h-8 border border-[#FF6B00] bg-[#030308] rounded-sm flex items-center justify-center"
            >
              <span className="font-mono text-[8px] tracking-widest text-[#FF6B00] font-bold">IN-SPACe</span>
            </motion.div>

            {/* Spawning Outer Nodes (Startups) */}
            <motion.div
              style={{ 
                scale: ringScale,
                transform: "translateY(120px) translateX(-140px)"
              }}
              className="absolute w-3 h-3 rounded-full bg-white/20 border border-white/50"
            />
            <motion.div
              style={{ 
                scale: ringScale,
                transform: "translateY(-80px) translateX(-160px)"
              }}
              className="absolute w-4 h-4 rounded-full bg-white/10 border border-white/30"
            />
            <motion.div
              style={{ 
                scale: ringScale,
                transform: "translateY(140px) translateX(120px)"
              }}
              className="absolute w-2 h-2 rounded-full bg-white/30 border border-white/40"
            />

            {/* Vector Connector Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 600 600" fill="none">
              <motion.line x1="300" y1="300" x2="360" y2="200" stroke="#FF6B00" strokeWidth="1" strokeDasharray="3 3" />
              <motion.line x1="300" y1="300" x2="160" y2="420" stroke="white" strokeWidth="0.75" />
              <motion.line x1="300" y1="300" x2="140" y2="220" stroke="white" strokeWidth="0.75" />
              <motion.line x1="300" y1="300" x2="420" y2="440" stroke="white" strokeWidth="0.75" />
            </svg>
          </div>

          <div className="absolute bottom-16 text-center max-w-xl">
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-[#00F0FF] uppercase mb-4">
              Opening the Frontier
            </h4>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              A single policy directive dismantled a state monopoly. By creating IN-SPACe as an autonomous regulator, India invited private participation, unlocking the infrastructure, technology, and launchpads of the state to the citizens.
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 3: The Ecosystem Constellation */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene3Opacity, scale: ecosystemScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10 pointer-events-none"
        >
          <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
            
            {/* The Constellation Map */}
            <svg className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] opacity-25" viewBox="0 0 600 600" fill="none">
              {/* Connection Vectors */}
              <line x1="150" y1="150" x2="450" y2="150" stroke="white" strokeWidth="0.5" />
              <line x1="450" y1="150" x2="450" y2="450" stroke="white" strokeWidth="0.5" />
              <line x1="450" y1="450" x2="150" y2="450" stroke="white" strokeWidth="0.5" />
              <line x1="150" y1="450" x2="150" y2="150" stroke="white" strokeWidth="0.5" />
              <line x1="150" y1="150" x2="300" y2="300" stroke="#00F0FF" strokeWidth="0.5" />
              <line x1="450" y1="150" x2="300" y2="300" stroke="#00F0FF" strokeWidth="0.5" />
              <line x1="450" y1="450" x2="300" y2="300" stroke="#FF6B00" strokeWidth="0.5" />
              <line x1="150" y1="450" x2="300" y2="300" stroke="#FF6B00" strokeWidth="0.5" />
            </svg>

            {/* Industrial Nodes */}
            <div className="absolute translate-y-[-150px] translate-x-[-150px] flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse mb-2" />
              <span className="font-mono text-[9px] tracking-widest text-white/80 uppercase">LAUNCH</span>
            </div>
            
            <div className="absolute translate-y-[-150px] translate-x-[150px] flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] mb-2" />
              <span className="font-mono text-[9px] tracking-widest text-white/80 uppercase">SATELLITES</span>
            </div>

            <div className="absolute translate-y-[150px] translate-x-[150px] flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] mb-2" />
              <span className="font-mono text-[9px] tracking-widest text-white/80 uppercase">APPLICATIONS</span>
            </div>

            <div className="absolute translate-y-[150px] translate-x-[-150px] flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse mb-2" />
              <span className="font-mono text-[9px] tracking-widest text-white/80 uppercase">DATA ECONOMY</span>
            </div>

            <div className="absolute translate-y-[0px] translate-x-[220px] flex flex-col items-center">
              <span className="w-2 h-2 rounded-full bg-white/40 mb-2" />
              <span className="font-mono text-[8px] tracking-widest text-white/50 uppercase">SPACE DEFENSE</span>
            </div>

            <div className="absolute translate-y-[0px] translate-x-[-220px] flex flex-col items-center">
              <span className="w-2 h-2 rounded-full bg-white/40 mb-2" />
              <span className="font-mono text-[8px] tracking-widest text-white/50 uppercase">MANUFACTURING</span>
            </div>

            <div className="absolute w-4 h-4 rounded-full border border-white/20 bg-[#030308]" />
          </div>

          <div className="absolute bottom-16 text-center max-w-xl">
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-[#FF6B00] uppercase mb-4">
              The Sovereign Constellation
            </h4>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              From rocket fabrication to earth observation datasets, India&apos;s space footprint evolved from single science experiments into interconnected commercial sectors. An entire industrial infrastructure came alive.
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 4: The Builders */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10 pointer-events-none"
        >
          <div className="relative w-full max-w-4xl h-[50vh] flex flex-col items-center justify-center">
            
            {/* The Builders floating list */}
            <motion.div 
              style={{ y: buildersY }}
              className="flex flex-col items-center space-y-12"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <span className="font-mono text-[9px] tracking-widest text-[#00F0FF] uppercase block mb-1">01 / Launch</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white/80 tracking-tight uppercase">SKYROOT</h4>
                </div>
                <div className="text-center">
                  <span className="font-mono text-[9px] tracking-widest text-[#00F0FF] uppercase block mb-1">02 / Propulsion</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white/80 tracking-tight uppercase">AGNIKUL</h4>
                </div>
                <div className="text-center">
                  <span className="font-mono text-[9px] tracking-widest text-[#00F0FF] uppercase block mb-1">03 / Hyperspectral</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white/80 tracking-tight uppercase">PIXXEL</h4>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <span className="font-mono text-[9px] tracking-widest text-[#FF6B00] uppercase block mb-1">04 / Satellites</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white/80 tracking-tight uppercase">DHRUVA SPACE</h4>
                </div>
                <div className="text-center">
                  <span className="font-mono text-[9px] tracking-widest text-[#FF6B00] uppercase block mb-1">05 / Radar Sensing</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white/80 tracking-tight uppercase">GALAXEYE</h4>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-16 text-center max-w-xl">
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-[#00F0FF] uppercase mb-4">
              The Proof of Concept
            </h4>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              These are no longer business proposals. They are active launcher platforms, operating satellites, and orbital sensor arrays. Private capital and enterprise engineering have become the engines of the new era.
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 5: The Climax (Fade to black) */}
        {/* ------------------------------------------------------------- */}
        
        {/* Backdrop visual */}
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
          className="absolute z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-mono text-[9px] tracking-[0.4em] text-[#00F0FF] uppercase mb-6">
            Opening The Frontier
          </span>
          <h2 
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide leading-snug text-white max-w-3xl mb-12"
            style={{ fontFamily: "Georgia, serif" }}
          >
            India&apos;s space story is no longer just about missions. <br />
            It is about an industry. <br />
            It is about an economy. <br />
            It is about the future.
          </h2>

          <h3 
            className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            The story is not ending. <br />
            <span className="text-[#FF6B00]">It is just beginning.</span>
          </h3>
        </motion.div>

      </div>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface RocketData {
  id: string;
  name: string;
  year: string;
  breakthrough: string;
  desc: string;
  heightRatio: number; // For relative visual scaling
  widthClass: string;  // Width visual difference
  drawPath: string;    // Custom SVG path representation of the rocket
}

export function LaunchEvolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll progress to horizontal translation of the rocket lineup
  // On desktop, it will slide from right to left
  const listX = useTransform(scrollYProgress, [0.1, 0.95], ["0%", "-55%"]);
  
  // Fade and scale transforms for the sticky introductory text
  const introOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.8, 0]);

  const rockets: RocketData[] = [
    {
      id: "slv3",
      name: "SLV-3",
      year: "1980",
      breakthrough: "Propulsion",
      desc: "India's first solid-propellant vehicle, establishing basic launch capability and deploying Rohini into LEO.",
      heightRatio: 0.45,
      widthClass: "w-8",
      drawPath: "M 12,180 L 12,20 L 16,10 L 20,20 L 20,180 Z"
    },
    {
      id: "aslv",
      name: "ASLV",
      year: "1987",
      breakthrough: "Staging",
      desc: "Introduced strap-on boosters and closed-loop guidance systems, mastering complex multi-stage separation.",
      heightRatio: 0.49,
      widthClass: "w-12",
      drawPath: "M 10,180 L 10,40 L 12,40 L 12,20 L 16,10 L 20,20 L 20,40 L 22,40 L 22,180 Z M 6,180 L 6,100 L 9,90 L 9,180 Z M 23,180 L 23,90 L 26,100 L 26,180 Z"
    },
    {
      id: "pslv",
      name: "PSLV",
      year: "1993",
      breakthrough: "Liquid Engine",
      desc: "Integrated the Vikas liquid engine. Established polar orbit autonomy, becoming the global workhorse of LEO.",
      heightRatio: 0.9,
      widthClass: "w-16",
      drawPath: "M 12,180 L 12,15 L 16,5 L 20,15 L 20,180 Z M 6,180 L 6,120 L 9,110 L 9,180 Z M 23,180 L 23,110 L 26,120 L 26,180 Z"
    },
    {
      id: "gslv",
      name: "GSLV",
      year: "2001",
      breakthrough: "Cryogenics",
      desc: "Incorporated super-cooled liquid oxygen and hydrogen engines to reach highly demanding Geosynchronous orbits.",
      heightRatio: 1.0,
      widthClass: "w-20",
      drawPath: "M 12,180 L 12,15 L 16,5 L 20,15 L 20,180 Z M 4,180 L 4,90 L 8,80 L 8,180 Z M 24,180 L 24,80 L 28,90 L 28,180 Z"
    },
    {
      id: "lvm3",
      name: "LVM3",
      year: "2014",
      breakthrough: "Heavy Lift",
      desc: "Mastered heavy-lift cryogenic systems, enabling deep-space missions to the Moon and Mars with heavy payloads.",
      heightRatio: 0.89,
      widthClass: "w-28",
      drawPath: "M 10,180 L 10,20 L 16,5 L 22,20 L 22,180 Z M 1,180 L 1,70 L 6,60 L 7,180 Z M 25,180 L 26,60 L 31,70 L 31,180 Z"
    },
    {
      id: "sslv",
      name: "SSLV",
      year: "2022",
      breakthrough: "On-Demand",
      desc: "Miniaturized launch logistics to support commercial deployment with rapid 72-hour integration times.",
      heightRatio: 0.7,
      widthClass: "w-12",
      drawPath: "M 12,180 L 12,25 L 16,15 L 20,25 L 20,180 Z"
    }
  ];

  return (
    <div 
      ref={containerRef}
      id="launch-evolution"
      className="relative w-full h-[300vh] bg-[#030308] border-b border-white/10"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between py-16">
        
        {/* Subtle background blueprint grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />

        {/* Top Section: Header & Editorial Pacing */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-8 items-start">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#00F0FF] uppercase mb-3 block">
                Chapter III: Capability
              </span>
              <h2 
                className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase"
                style={{ fontFamily: "Georgia, serif" }}
              >
                The Rocket Equation
              </h2>
            </div>
            <motion.div 
              style={{ opacity: introOpacity }}
              className="max-w-2xl lg:pt-4"
            >
              <p className="text-base md:text-lg text-white/70 leading-relaxed font-sans">
                Aryabhata proved India could build satellites. The next challenge was harder: India needed its own wings. From a tiny 22-meter solid motor to heavy cryogenic systems, each launch generation solved a new challenge of thrust, staging, and mass.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Middle Section: Horizontal Lineup of Launch Vehicles */}
        <div className="relative z-10 w-full flex items-center justify-start overflow-hidden my-auto py-8">
          <motion.div
            style={{ x: listX }}
            className="flex items-end gap-16 md:gap-24 pl-[10vw] md:pl-[35vw] pr-[20vw] h-[45vh]"
          >
            {rockets.map((rocket) => (
              <div 
                key={rocket.id}
                className="flex flex-col items-center justify-end h-full"
              >
                {/* Rocket Blueprint Silhouette Container */}
                <div className="relative flex items-end justify-center w-36 h-64 mb-6">
                  {/* Outer glow aura on hover */}
                  <div className="absolute bottom-0 w-24 bg-gradient-to-t from-[#00F0FF]/10 to-transparent blur-md rounded-t-full transition-all duration-700 pointer-events-none" 
                    style={{ height: `${rocket.heightRatio * 100}%` }}
                  />

                  {/* SVG Rocket Vector */}
                  <svg 
                    viewBox="0 0 32 180" 
                    fill="none" 
                    className="w-full h-full text-white/10 hover:text-[#00F0FF]/60 stroke-white/20 hover:stroke-[#00F0FF] transition-all duration-500 cursor-crosshair drop-shadow-md"
                    style={{ 
                      height: `${rocket.heightRatio * 100}%`,
                      transformOrigin: "bottom center"
                    }}
                  >
                    <path 
                      d={rocket.drawPath} 
                      fill="currentColor" 
                      strokeWidth="0.75" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    {/* Tiny nozzle flames vectors */}
                    <path d="M 12,182 L 16,192 L 20,182 Z" fill="#FF6B00" opacity="0.3" className="animate-pulse" />
                  </svg>

                  {/* Height guide line */}
                  <div className="absolute right-[-10px] bottom-0 w-[1px] bg-white/5 border-r border-dashed border-white/10"
                    style={{ height: `${rocket.heightRatio * 100}%` }}
                  />
                </div>

                {/* Rocket Blueprint Metadata */}
                <div className="text-center w-56 flex flex-col items-center">
                  <span className="font-mono text-[9px] tracking-widest text-white/40 mb-1">
                    {rocket.year}
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-wide uppercase mb-2">
                    {rocket.name}
                  </h4>
                  <div className="inline-block border border-[#00F0FF]/20 bg-[#00F0FF]/5 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#00F0FF] mb-3">
                    {rocket.breakthrough}
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed font-sans max-w-[200px]">
                    {rocket.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section: Technical Footnote & Pacing Ticker */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between border-t border-white/5 pt-6 text-white/40 font-mono text-[9px] tracking-[0.25em] uppercase">
          <span>Telemetry Evolution Grid</span>
          <span>Scroll to advance launch lineup →</span>
          <span>Sovereign Access</span>
        </div>

      </div>
    </div>
  );
}

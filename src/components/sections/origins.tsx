"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Calendar, Eye, EyeOff, Orbit } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  codename: string;
  details: string;
  redacted: string;
  position: { x: number; y: number }; // Percentage coords along the orbital path
}

export function Origins() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const milestones: Milestone[] = [
    {
      year: "1962",
      title: "INCOSPAR Setup",
      codename: "INIT_COSPAR_62",
      details: "Dr. Vikram Sarabhai establishes the Indian National Committee for Space Research, seeding the country's sovereign space intentions.",
      redacted: "OPERATING OUT OF A THUMBA CHURCH. FIRST LAUNCH OF SODIUM VAPOR PAYLOAD VIA US NIKE-APACHE SYSTEM.",
      position: { x: 10, y: 15 }
    },
    {
      year: "1969",
      title: "ISRO Formation",
      codename: "SOVEREIGN_ISRO",
      details: "Sovereign institutionalization. ISRO replaces INCOSPAR to spearhead large-scale national space applications and launcher R&D.",
      redacted: "EMPHASIS DIRECTED TO REGIONAL TELEVISION BROADCASTS AND MONSOON MAPPING VS DEEP SECURITY ORBITS.",
      position: { x: 30, y: 22 }
    },
    {
      year: "1993",
      title: "PSLV First Flight",
      codename: "PROPULSION_PSLV",
      details: "Debut of the Polar Satellite Launch Vehicle, achieving sovereign orbital insertion autonomy and ending foreign transport reliance.",
      redacted: "VIKAS LIQUID ENGINE DESIGNS TRANSFERRED VIA JOINT FRENCH AGREEMENT (VIKAS-PROVENCE CONTRACTS).",
      position: { x: 50, y: 32 }
    },
    {
      year: "2008",
      title: "Chandrayaan-1",
      codename: "LUNAR_ICE_FIND",
      details: "India's first deep-space lunar probe. Discovers chemical signatures of water molecules (ice/OH) on the lunar surface using custom payloads.",
      redacted: "NASA RADAR SCANNER (M3) CO-BROKERED ON THE LUNAR BUS IN COLLABORATION WITH GLOBAL NETWORKS.",
      position: { x: 65, y: 45 }
    },
    {
      year: "2013",
      title: "Mangalyaan (MOM)",
      codename: "MARS_FIRST_RUN",
      details: "Mars Orbiter Mission enters Martian orbit on first attempt. Demonstrates extreme capital frugality, costing only $74M.",
      redacted: "PROPULSION SLINGSHOT TRIGGERS MANEUVERED AROUND EARTH ORBITS DUE TO LOW PAYLOAD LAUNCH INJECTIONS.",
      position: { x: 70, y: 60 }
    },
    {
      year: "2020",
      title: "Space Sector Reforms",
      codename: "DECREE_OPEN_MKT",
      details: "Sovereign deregulation. Establishment of IN-SPACe to authorize private rocket operators, commercial launches, and satellite assembly hubs.",
      redacted: "100% FOREIGN DIRECT INVESTMENT (FDI) PERMITTED IN COMPONENT MANUFACTURING AND SATELLITE OPERATIONS.",
      position: { x: 60, y: 72 }
    },
    {
      year: "2023",
      title: "Chandrayaan-3",
      codename: "SOUTH_POLE_LAND",
      details: "Historic soft-landing at the Lunar South Pole. Establishes core cryogenic throttling systems and robotic rover qualifications.",
      redacted: "COMMUNICATION STATIONS BACKUP SECURED VIA EUROPEAN SPACE AGENCY (ESA) DEEP SPACE NETWORKS.",
      position: { x: 40, y: 82 }
    },
    {
      year: "2024+",
      title: "Private Space Era",
      codename: "ENT_SPACE_RISE",
      details: "Ecosystem scaling. Venture-backed launchers Vikram-S and Agnibaan execute commercial orbital qualifications and GSaaS telemetry downlinks.",
      redacted: "RELIANCE TRANSITIONING FROM ISRO GOVERNMENT CONTRACTING TO A MASSIVE MULTI-PLAYER CAPITAL FLYWHEEL.",
      position: { x: 15, y: 88 }
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to path drawing length
  const drawLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Stagger index selection based on scroll fraction
      const idx = Math.min(
        milestones.length - 1,
        Math.floor(latest * milestones.length * 1.1)
      );
      setActiveIndex(Math.max(0, idx));
    });
  }, [scrollYProgress, milestones.length]);

  const toggleReveal = (idx: number) => {
    setRevealed((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleNodeClick = (idx: number) => {
    // Find the nearest outer scroll container (e.g. from page.tsx)
    const scrollContainer = containerRef.current?.closest(".overflow-y-auto");
    if (scrollContainer && containerRef.current) {
      const start = containerRef.current.offsetTop;
      const height = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const targetTop = start + (idx / (milestones.length - 1)) * (height - viewportHeight);
      
      scrollContainer.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    }
  };

  const activeMilestone = milestones[activeIndex];
  const isRevealed = !!revealed[activeIndex];
  const pathD = "M 30,60 Q 320,180 180,300 T 30,530";

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#030308]">
      {/* Sticky viewport viewport area */}
      <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Full-bleed space backdrop */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/space_bg.png"
            alt="Space background starry sky"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/95 via-[#030308]/65 to-[#030308]/95"></div>
          <div className="absolute inset-0 radial-vignette"></div>
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-[80vh]">
            
            {/* Left Column: Briefing Dossier */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full py-4">
              <div>
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF6B00] uppercase block mb-2 font-semibold">
                  02. CHAPTER 1 // THE ISRO ERA
                </span>
                <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white">
                  Origins of the <br />
                  Space Stack
                </h2>
                <p className="text-white/40 text-xs md:text-sm mt-3 font-sans max-w-md">
                  India's space program evolved from an academic, ISRO-led scientific model into a commercial, private-venture-backed orbital ecosystem. Scroll down to advance the timeline.
                </p>
              </div>

              {/* Dossier Detail Panel */}
              <div className="bg-[#04040c]/85 border border-white/5 rounded-xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden mt-6 min-h-[300px] flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent"></div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex justify-between items-start border-b border-white/5 pb-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-white/5 rounded-md text-[#FF6B00] border border-white/10">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-white/50 block font-bold">YEAR: {activeMilestone.year}</span>
                          <h4 className="text-white text-base font-bold tracking-tight mt-0.5">{activeMilestone.title}</h4>
                        </div>
                      </div>
                      <span className="font-mono text-[7px] tracking-widest text-[#FF6B00] uppercase px-2 py-0.5 rounded border border-[#FF6B00]/20 bg-[#FF6B00]/5 font-bold">
                        {activeMilestone.codename}
                      </span>
                    </div>

                    <p className="text-white/70 text-xs leading-relaxed font-sans mt-3">
                      {activeMilestone.details}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Reveal Dossier Section */}
                <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                  <button
                    onClick={() => toggleReveal(activeIndex)}
                    className="w-full md:w-auto self-start flex items-center justify-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-[#FF6B00]/40 hover:bg-white/5 text-white font-mono text-[8px] tracking-wider rounded-xs transition-all duration-200 cursor-pointer"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3 h-3 text-[#FF6B00]" /> HIDE CLASSIFIED DETAILS
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 text-[#FF6B00]" /> DECLASSIFY DOSSIER
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 font-mono text-[8px] tracking-wide leading-relaxed p-3 rounded border border-[#FF6B00]/20 bg-[#FF6B00]/5 text-[#FF6B00] font-semibold">
                          {activeMilestone.redacted}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column: Orbital Journey SVG Timeline */}
            <div className="lg:col-span-6 flex items-center justify-center relative h-full min-h-[300px]">
              {/* Center Planet Globe Decoration */}
              <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-white/[0.03] flex items-center justify-center">
                <Orbit className="w-10 h-10 text-white/5 animate-pulse" />
                <div className="absolute inset-0 bg-[#00F0FF]/1 filter blur-[80px] pointer-events-none rounded-full"></div>
              </div>

              {/* Core SVG Orbital Trail */}
              <svg viewBox="0 0 350 600" className="w-full h-full relative z-10 max-h-[70vh] pointer-events-none select-none">
                {/* Path base shadow */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.03)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Glowing active path line */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ pathLength: drawLength }}
                  className="drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                />
              </svg>

              {/* Node buttons positioned along the path */}
              <div className="absolute inset-0 z-20">
                {milestones.map((mil, idx) => {
                  const isActive = activeIndex === idx;
                  const isPast = idx < activeIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleNodeClick(idx)}
                      className="absolute pointer-events-auto cursor-pointer focus:outline-none -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: `${mil.position.x}%`, top: `${mil.position.y}%` }}
                    >
                      {/* Node circle wrapper */}
                      <div className="relative flex items-center justify-center">
                        {/* Ambient hover/active circle */}
                        <span className={`absolute w-8 h-8 rounded-full border transition-all duration-300 ${
                          isActive 
                            ? "bg-[#00F0FF]/10 border-[#00F0FF]/40 scale-100" 
                            : "border-transparent scale-50 group-hover:scale-75 group-hover:bg-white/5"
                        }`}></span>
                        
                        {/* Center dot */}
                        <span className={`w-3.5 h-3.5 rounded-full border-2 border-[#030308] z-10 transition-all duration-300 ${
                          isActive 
                            ? "bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" 
                            : isPast
                            ? "bg-[#00F0FF]/40 border-[#00F0FF]/25"
                            : "bg-white/10 border-white/20 hover:bg-white/20"
                        }`}></span>

                        {/* Tooltip Label */}
                        <span className={`absolute left-10 font-mono text-[8px] font-bold tracking-widest uppercase transition-all duration-300 shrink-0 select-none ${
                          isActive 
                            ? "text-[#00F0FF] opacity-100 translate-x-0" 
                            : "text-white/30 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                        }`}>
                          {mil.year} - {mil.title.split(" ")[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

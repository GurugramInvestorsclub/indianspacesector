"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { TrendingUp, Landmark, Cpu, ShieldAlert, Lock, Unlock } from "lucide-react";

interface StatItem {
  targetValue: number;
  prefix: string;
  suffix: string;
  label: string;
  colorClass: string;
  subBadge: string;
  desc: string;
}

export function InflectionPoint() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll animations mapping
  const rotateShieldL = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const rotateShieldR = useTransform(scrollYProgress, [0, 0.5], [0, 120]);
  const translateLeftGate = useTransform(scrollYProgress, [0.1, 0.6], [0, -35]);
  const translateRightGate = useTransform(scrollYProgress, [0.1, 0.6], [0, 35]);
  const unlockProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  const nodesOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const nodesScale = useTransform(scrollYProgress, [0.4, 0.8], [0.6, 1]);

  const [currentStartups, setCurrentStartups] = useState(0);
  const [currentEconomy, setCurrentEconomy] = useState(0);
  const [currentLaunches, setCurrentLaunches] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Trigger counter increases based on reforms unlock progression
      if (latest > 0.3) {
        setIsUnlocked(true);
        const factor = Math.min(1, (latest - 0.3) / 0.6); // Scale up between 0.3 and 0.9 scroll
        setCurrentStartups(Math.round(factor * 250));
        setCurrentEconomy(Math.round(factor * 44));
        setCurrentLaunches(Math.round(factor * 50));
      } else {
        setIsUnlocked(false);
        setCurrentStartups(0);
        setCurrentEconomy(0);
        setCurrentLaunches(0);
      }
    });
  }, [scrollYProgress]);

  const stats: StatItem[] = [
    {
      targetValue: 44,
      prefix: "$",
      suffix: "B+",
      label: "Projected Size by 2033",
      colorClass: "text-[#00F0FF]",
      subBadge: "bg-[#00F0FF]/5 text-[#00F0FF] border-[#00F0FF]/15",
      desc: "Capital velocity scaling through sovereign & private launches"
    },
    {
      targetValue: 250,
      prefix: "",
      suffix: "+",
      label: "Active Private Startups",
      colorClass: "text-[#FF6B00]",
      subBadge: "bg-[#FF6B00]/5 text-[#FF6B00] border-[#FF6B00]/15",
      desc: "Venture stack building engines, sat buses, and spatial platforms"
    },
    {
      targetValue: 50,
      prefix: "",
      suffix: "+",
      label: "Sovereign Launches",
      colorClass: "text-[#00F0FF]",
      subBadge: "bg-[#00F0FF]/5 text-[#00F0FF] border-[#00F0FF]/15",
      desc: "Successful orbital payloads and satellite missions executed"
    }
  ];

  // Mouse move handler for Apple/Linear spotlight tracking effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#030308]">
      {/* Sticky viewport viewport area */}
      <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Full-bleed space background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/space_bg.png"
            alt="Deep space starfield"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/95 via-[#030308]/65 to-[#030308]/95"></div>
          <div className="absolute inset-0 radial-vignette"></div>
        </div>

        {/* Ambient glow orb */}
        <div className="absolute bottom-1/4 right-[10%] w-[380px] h-[380px] rounded-full bg-[#00F0FF]/2 filter blur-[120px] pointer-events-none z-10"></div>

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Description & reformed stats console */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-3 font-semibold">
                03. CHAPTER 2 // THE UNLOCKING
              </span>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white">
                The 2020 Reforms <br />
                Ecosystem <span className="text-[#00F0FF]">Unlocking</span>
              </h2>
              
              <p className="text-white/70 text-xs md:text-sm mt-4 font-sans leading-relaxed">
                Prior to 2020, India's space sector operated under a closed, state-only framework. The landmark space reforms established IN-SPACe, permitting 100% FDI and unlocking private payload insertion access. Scroll down to trigger the release sequence.
              </p>

              {/* Status indicators */}
              <div className="mt-6 flex flex-wrap gap-2.5 font-mono text-[9px] tracking-wider font-semibold">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00F0FF]/5 border border-[#00F0FF]/20 text-[#00F0FF] rounded-xs">
                  <Landmark className="w-3.5 h-3.5" /> 100% FDI OPEN
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00]/5 border border-[#FF6B00]/20 text-[#FF6B00] rounded-xs">
                  <Cpu className="w-3.5 h-3.5" /> IN-SPACE LICENSED
                </span>
              </div>

              {/* Big metrics cards (values grow on scroll) */}
              <div className="space-y-3 mt-6">
                {stats.map((st, idx) => {
                  let currentValueStr = "0";
                  if (idx === 0) currentValueStr = `${st.prefix}${currentEconomy}${st.suffix}`;
                  if (idx === 1) currentValueStr = `${currentStartups}${st.suffix}`;
                  if (idx === 2) currentValueStr = `${currentLaunches}${st.suffix}`;

                  return (
                    <div
                      key={idx}
                      onMouseMove={handleMouseMove}
                      className="p-[1px] rounded-[14px] bg-white/[0.04] border border-white/5 relative overflow-hidden group transition-all duration-300 backdrop-blur-md"
                      style={{
                        background: `radial-gradient(150px circle at var(--mouse-x, 150px) var(--mouse-y, 40px), rgba(0, 240, 255, 0.08), transparent 80%)`
                      }}
                    >
                      <div className="bg-[#04040c]/85 rounded-[13px] p-4 flex justify-between items-center relative z-10">
                        <div>
                          <span className="font-mono text-[7px] text-white/30 tracking-wider uppercase block">
                            ORBITAL REFORMS VECTOR 0{idx + 1}
                          </span>
                          <h4 className="text-white text-xs font-bold mt-0.5 tracking-tight uppercase">
                            {st.label}
                          </h4>
                          <span className="text-[7px] text-white/40 block mt-0.5 font-sans lowercase">
                            {st.desc}
                          </span>
                        </div>
                        <div className={`text-2xl md:text-3xl font-mono font-extrabold tracking-tight block ${st.colorClass}`}>
                          {currentValueStr}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Locked circular orbital structure unlocking SVG */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[350px] md:min-h-[450px]">
              
              {/* Visual SVG representation of locked/unlocked sectors */}
              <svg 
                viewBox="0 0 350 350" 
                className="w-full h-full max-w-[400px] overflow-visible select-none pointer-events-none z-10"
              >
                {/* Center Core: ISRO R&D Core */}
                <g>
                  <circle cx="175" cy="175" r="16" fill="#030308" stroke="#FF6B00" strokeWidth="1.5" />
                  <text x="175" y="178" fill="#FF6B00" fontSize="5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5" fontWeight="bold">
                    ISRO
                  </text>
                  <circle cx="175" cy="175" r="24" fill="none" stroke="rgba(255, 107, 0, 0.15)" strokeWidth="0.5" strokeDasharray="3 3" />
                </g>

                {/* Concentric locked gates (splitting outwards on scroll) */}
                <g>
                  {/* Left gate bracket */}
                  <motion.g style={{ x: translateLeftGate }}>
                    <path 
                      d="M135,115 A 75,75 0 0,0 135,235" 
                      fill="none" 
                      stroke={isUnlocked ? "rgba(0,240,255,0.15)" : "#FF6B00"} 
                      strokeWidth="3.5" 
                      className="transition-colors duration-500"
                    />
                    <path 
                      d="M125,100 A 90,90 0 0,0 125,250" 
                      fill="none" 
                      stroke={isUnlocked ? "rgba(0,240,255,0.05)" : "rgba(255,107,0,0.4)"} 
                      strokeWidth="1.5" 
                      strokeDasharray="4 6"
                      className="transition-colors duration-500"
                    />
                  </motion.g>

                  {/* Right gate bracket */}
                  <motion.g style={{ x: translateRightGate }}>
                    <path 
                      d="M215,115 A 75,75 0 0,1 215,235" 
                      fill="none" 
                      stroke={isUnlocked ? "rgba(0,240,255,0.15)" : "#FF6B00"} 
                      strokeWidth="3.5"
                      className="transition-colors duration-500"
                    />
                    <path 
                      d="M225,100 A 90,90 0 0,1 225,250" 
                      fill="none" 
                      stroke={isUnlocked ? "rgba(0,240,255,0.05)" : "rgba(255,107,0,0.4)"} 
                      strokeWidth="1.5" 
                      strokeDasharray="4 6"
                      className="transition-colors duration-500"
                    />
                  </motion.g>
                </g>

                {/* Rotating Shield Tracks */}
                <motion.g style={{ rotate: rotateShieldL, originX: "175px", originY: "175px" }}>
                  <circle cx="175" cy="175" r="54" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="30 15" />
                </motion.g>
                <motion.g style={{ rotate: rotateShieldR, originX: "175px", originY: "175px" }}>
                  <circle cx="175" cy="175" r="62" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="0.75" strokeDasharray="15 30" />
                </motion.g>

                {/* Private Outer Nodes (Fading in as reforms unlock) */}
                <motion.g style={{ opacity: nodesOpacity, scale: nodesScale, originX: "175px", originY: "175px" }}>
                  {/* Outer Orbit line */}
                  <circle cx="175" cy="175" r="110" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" strokeDasharray="4 4" />

                  {/* Private node 1: Private Launch */}
                  <g transform="translate(175, 65)">
                    <circle cx="0" cy="0" r="10" fill="#030308" stroke="#00F0FF" strokeWidth="1" />
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" />
                    <text x="0" y="2" fill="#00F0FF" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">LAUNCH</text>
                  </g>
                  <line x1="175" y1="160" x2="175" y2="75" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Private node 2: Private Satellites */}
                  <g transform="translate(285, 175)">
                    <circle cx="0" cy="0" r="10" fill="#030308" stroke="#00F0FF" strokeWidth="1" />
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" />
                    <text x="0" y="2" fill="#00F0FF" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SAT_DEV</text>
                  </g>
                  <line x1="190" y1="175" x2="275" y2="175" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Private node 3: Startups Swarm */}
                  <g transform="translate(175, 285)">
                    <circle cx="0" cy="0" r="10" fill="#030308" stroke="#00F0FF" strokeWidth="1" />
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" />
                    <text x="0" y="2" fill="#00F0FF" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">VENTURES</text>
                  </g>
                  <line x1="175" y1="190" x2="175" y2="275" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Private node 4: Downstream Applications */}
                  <g transform="translate(65, 175)">
                    <circle cx="0" cy="0" r="10" fill="#030308" stroke="#00F0FF" strokeWidth="1" />
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" />
                    <text x="0" y="2" fill="#00F0FF" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">APPLICATIONS</text>
                  </g>
                  <line x1="160" y1="175" x2="75" y2="175" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                </motion.g>
              </svg>

              {/* Locked/Unlocked Telemetry Alert Box */}
              <div className="absolute top-[280px] bg-black/60 border border-white/5 rounded-md px-3.5 py-2 font-mono text-[8px] flex items-center gap-2 backdrop-blur-md shadow-lg z-20">
                <AnimatePresence mode="wait">
                  {isUnlocked ? (
                    <motion.div
                      key="unlocked"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-2 text-[#00F0FF]"
                    >
                      <Unlock className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span className="font-bold tracking-widest">STATUS: SYSTEM UNLOCKED // IN-SPACe GATEWAY ON</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="locked"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-2 text-[#FF6B00] animate-pulse"
                    >
                      <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span className="font-bold tracking-widest">WARNING: SYSTEM STATE_LOCKS ENGAGED</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

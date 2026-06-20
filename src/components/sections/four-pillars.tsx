"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Rocket, Satellite, Globe, Database, Cpu } from "lucide-react";

interface PillarItem {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  desc: string;
  margin: string;
  multiple: string;
  players: string[];
  color: string;
  dotColor: string;
  bgGlow: string;
  boosterColor: string;
  cy: number; // SVG center coordinate Y for stack drawing
}

export function FourPillars() {
  const [activePillarId, setActivePillarId] = useState("launch");

  const pillars: PillarItem[] = [
    {
      id: "data-economy",
      name: "Data Economy",
      category: "Downstream Commercial Multiplier",
      icon: <Cpu className="w-4 h-4 text-[#00F0FF]" />,
      desc: "Downstream value monetization. Translating raw spectral coordinates, SAR radar returns, and Positioning Navigation Timing (PNT) signals into multi-billion dollar ESG indices, yield forecast models, and global logistics maps.",
      margin: "75% - 85%",
      multiple: "15x - 22x EV/Rev",
      players: ["SatSure", "MapmyIndia", "CropIn", "KaleidEO"],
      color: "border-[#00F0FF]/40 text-[#00F0FF]",
      dotColor: "bg-[#00F0FF]",
      bgGlow: "from-[#00F0FF]/5",
      boosterColor: "rgba(0, 240, 255, 0.4)",
      cy: 70
    },
    {
      id: "applications",
      name: "Applications & SaaS",
      category: "Downstream Analytics & APIs",
      icon: <Database className="w-4 h-4 text-[#00F0FF]" />,
      desc: "Geospatial platforms, vessel tracking logs, carbon capture audits, and precision agriculture portals. Downstream software captures over 90% of total space economy volume.",
      margin: "70% - 80%",
      multiple: "12x - 18x EV/Rev",
      players: ["SatSure Solutions", "MapmyIndia APIs", "CropIn Spatial"],
      color: "border-[#00F0FF]/40 text-[#00F0FF]",
      dotColor: "bg-[#00F0FF]",
      bgGlow: "from-[#00F0FF]/5",
      boosterColor: "rgba(0, 240, 255, 0.4)",
      cy: 130
    },
    {
      id: "ground",
      name: "Ground Stations",
      category: "Midstream Telemetry & GSaaS",
      icon: <Globe className="w-4 h-4 text-[#FF6B00]" />,
      desc: "Gateway tracking dish nets, software modems, and tracking antennas managing LEO data downlinks on a per-pass subscription model.",
      margin: "45% - 50%",
      multiple: "7x - 9x EV/Rev",
      players: ["Dhruva Ground Network", "ISRO ISTRAC"],
      color: "border-[#FF6B00]/40 text-[#FF6B00]",
      dotColor: "bg-[#FF6B00]",
      bgGlow: "from-[#FF6B00]/5",
      boosterColor: "rgba(255, 107, 0, 0.4)",
      cy: 190
    },
    {
      id: "satellites",
      name: "Satellites & Payload",
      category: "Hardware Assembly & Bus Systems",
      icon: <Satellite className="w-4 h-4 text-[#00F0FF]" />,
      desc: "Miniaturized LEO CubeSats, green propellant thruster nodes, and multispectral camera payloads designed in regional domestic clusters.",
      margin: "45% - 55%",
      multiple: "8x - 10x EV/Rev",
      players: ["Dhruva Space", "Pixxel Assembly", "Bellatrix Propulsion"],
      color: "border-[#00F0FF]/40 text-[#00F0FF]",
      dotColor: "bg-[#00F0FF]",
      bgGlow: "from-[#00F0FF]/5",
      boosterColor: "rgba(0, 240, 255, 0.4)",
      cy: 250
    },
    {
      id: "launch",
      name: "Launch Systems",
      category: "Upstream Logistics & Rockets",
      icon: <Rocket className="w-4 h-4 text-[#00F0FF]" />,
      desc: "Orbital launchers, carbon-composite motors, and micro-launch configurations optimized for commercial payloads insertions.",
      margin: "30% - 35%",
      multiple: "4x - 6x EV/Rev",
      players: ["Skyroot Aerospace", "Agnikul Cosmos", "ISRO NSIL"],
      color: "border-[#00F0FF]/40 text-[#00F0FF]",
      dotColor: "bg-[#00F0FF]",
      bgGlow: "from-[#00F0FF]/5",
      boosterColor: "rgba(0, 240, 255, 0.4)",
      cy: 310
    }
  ];

  const activePillar = pillars.find((p) => p.id === activePillarId) || pillars[4];

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
    <section
      id="pillars"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      {/* Full-bleed background flow graphic */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/value_flow.png"
          alt="Satellite value flow diagram"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.4] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/95 via-[#030308]/60 to-[#030308]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        {/* Section Header */}
        <div className="text-left mb-6 max-w-2xl">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-2 font-semibold">
            04. CHAPTER 4 // INDIA'S SPACE STACK
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
            The Orbital Stack
          </h2>
          <p className="text-white/40 text-xs md:text-sm mt-2">
            Inspect margins, multiples, and key players across the 5 layers. Click isometric planes to trace value and capital vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Terminal */}
          <div 
            onMouseMove={handleMouseMove}
            className="lg:col-span-6 flex flex-col justify-between bg-[#04040c]/90 border border-white/5 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-300"
            style={{
              background: "radial-gradient(400px circle at var(--mouse-x, 250px) var(--mouse-y, 250px), rgba(0, 240, 255, 0.05), transparent 80%)"
            } as any}
          >
            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="font-mono text-[9px] tracking-wider text-white/80 font-bold">
                    STACK LAYER ANALYSIS
                  </span>
                </div>
                <div className="flex gap-1.5 font-mono text-[8px] text-white/30 uppercase">
                  <span>LAYER: 0{5 - pillars.indexOf(activePillar)}</span>
                </div>
              </div>

              {/* Pillar Details Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                      {activePillar.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[8px] tracking-wider text-white/40 uppercase block font-semibold">
                        {activePillar.category}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                        {activePillar.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/60 text-xs mt-4 leading-relaxed font-sans">
                    {activePillar.desc}
                  </p>

                  {/* Economics Metrics Panel */}
                  <div className="mt-6 grid grid-cols-2 gap-4 bg-[#080814] border border-white/5 p-3 rounded-lg font-mono text-[9px]">
                    <div>
                      <span className="text-white/40 block font-semibold">TARGET MARGIN</span>
                      <span className="text-sm font-extrabold text-white tracking-tight mt-0.5 block">
                        {activePillar.margin}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block font-semibold">VALUATION MULTIPLE</span>
                      <span className="text-sm font-extrabold text-white tracking-tight mt-0.5 block">
                        {activePillar.multiple}
                      </span>
                    </div>
                  </div>

                  {/* Active Indian Players */}
                  <div className="mt-5">
                    <span className="font-mono text-[8px] uppercase text-white/40 tracking-widest block mb-2 font-bold">
                      KEY INDIAN STACK BUILDERS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activePillar.players.map((plyr) => (
                        <span
                          key={plyr}
                          className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded"
                        >
                          {plyr}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom action */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
              <span className="font-semibold uppercase text-[#00F0FF]">Status: Connected</span>
              <span className="italic">Webinar Slide 03</span>
            </div>
          </div>

          {/* Right Column: Isometric Interactive Stack SVG */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[300px]">
            {/* SVG Isometric Canvas */}
            <svg 
              viewBox="0 0 250 380" 
              className="w-full h-full max-w-[280px] overflow-visible select-none z-10"
            >
              <defs>
                <filter id="layer-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* FLOW LINES IN BACKGROUND */}
              <g>
                {/* Value Flow: Cyan Line flowing Upward */}
                <line 
                  x1="125" 
                  y1="310" 
                  x2="125" 
                  y2="70" 
                  stroke="#00F0FF" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 8"
                  className="animate-[dash_2s_linear_infinite]"
                  style={{ animationDirection: "reverse" }}
                  opacity="0.4"
                />

                {/* Capital Flow: Amber Line flowing Downward */}
                <line 
                  x1="125" 
                  y1="70" 
                  x2="125" 
                  y2="310" 
                  stroke="#FF6B00" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 8"
                  className="animate-[dash_2.5s_linear_infinite]"
                  opacity="0.3"
                />
              </g>

              {/* ISOMETRIC LAYER DIAMONDS */}
              {pillars.map((plr, index) => {
                const isActive = activePillarId === plr.id;
                const layerIndex = 5 - index;
                
                // Diamond coordinates centered at cx = 125, cy = plr.cy
                const cx = 125;
                const cy = plr.cy;
                const points = `${cx - 65},${cy} ${cx},${cy - 20} ${cx + 65},${cy} ${cx},${cy + 20}`;

                return (
                  <g 
                    key={plr.id} 
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => setActivePillarId(plr.id)}
                  >
                    {/* Shadow layer underneath diamond */}
                    <polygon 
                      points={points} 
                      fill="none" 
                      stroke="rgba(0,0,0,0.8)" 
                      strokeWidth="3"
                      transform="translate(0, 2)"
                    />
                    
                    {/* Glowing active layer highlight */}
                    {isActive && (
                      <polygon 
                        points={points} 
                        fill="none" 
                        stroke={plr.id === "ground" ? "#FF6B00" : "#00F0FF"} 
                        strokeWidth="2.5"
                        style={{ filter: "url(#layer-glow)" }}
                      />
                    )}

                    {/* Main isometric diamond plane */}
                    <polygon 
                      points={points} 
                      fill={isActive ? "rgba(0,240,255,0.06)" : "rgba(6,6,15,0.8)"} 
                      stroke={isActive ? (plr.id === "ground" ? "#FF6B00" : "#00F0FF") : "rgba(255,255,255,0.06)"} 
                      strokeWidth="1"
                      className="transition-all duration-300 hover:stroke-white/40"
                    />

                    {/* Plane Label Text */}
                    <text 
                      x={cx} 
                      y={cy + 3} 
                      fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.3)"} 
                      fontSize="5" 
                      fontFamily="monospace" 
                      fontWeight="bold"
                      textAnchor="middle"
                      letterSpacing="0.75"
                    >
                      0{layerIndex} // {plr.name.toUpperCase()}
                    </text>

                    {/* Flow indicator light blips */}
                    {isActive && (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r="2.5" 
                        fill={plr.id === "ground" ? "#FF6B00" : "#00F0FF"} 
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}

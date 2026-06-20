"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ShieldAlert, Terminal, Activity, Info, Radar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RadarSignal {
  id: string;
  name: string;
  radius: number; // distance from center (0-150)
  angle: number; // angle in degrees
  category: string;
  status: string;
  description: string;
}

export function ClosingShot() {
  const [sweepAngle, setSweepAngle] = useState(0);
  const [hoveredSignalId, setHoveredSignalId] = useState<string | null>(null);
  const requestRef = useRef<number | null>(null);

  const signals: RadarSignal[] = [
    { id: "reusable", name: "Reusable Rockets", radius: 55, angle: 45, category: "Upstream Propulsion", status: "Design Phase // Target 2027", description: "Sovereign launcher recovery systems utilizing vertical landing retro-thrust booster stages." },
    { id: "stations", name: "Space Stations", radius: 85, angle: 120, category: "Manned Infrastructure", status: "Concept Phase // Target 2035", description: "Bharatiya Antariksha Station (BAS) providing continuous low Earth orbit scientific operations." },
    { id: "constellations", name: "Satellite Grids", radius: 110, angle: 210, category: "LEO Communications", status: "Deployment Active", description: "High-frequency communication and Synthetic Aperture Radar (SAR) constellation grids." },
    { id: "lunar", name: "Lunar Economy", radius: 140, angle: 330, category: "Deep Space Logistics", status: "Planned Missions // 2028-2030", description: "Water-ice resource mapping, helium extraction assays, and lunar base logistics pathways." },
    { id: "mfg", name: "In-Orbit Mfg", radius: 70, angle: 185, category: "Orbital Assembly", status: "R&D Prototype", description: "Manufacturing fiber-optics, crystal alloys, and bio-tissues under microgravity environments." },
    { id: "ssa", name: "SSA Tracking", radius: 125, angle: 90, category: "Space Situational Awareness", status: "Active System", description: "Radars and optical telescopes tracking space debris and hostile sovereign hardware." },
    { id: "defense_space", name: "Defense Space", radius: 100, angle: 270, category: "Strategic Sovereignty", status: "Operational System", description: "Anti-jamming navigation links and military surveillance satellites securing territorial borders." },
    { id: "ai_space", name: "AI + Space SaaS", radius: 45, angle: 15, category: "Downstream Software", status: "Ingesting APIs", description: "Autonomous spatial intelligence models predicting crop yields, carbon metrics, and vessel routes." }
  ];

  // Rotate the radar sweep line continuously at 60 FPS
  useEffect(() => {
    const updateSweep = () => {
      setSweepAngle((prev) => (prev + 1.2) % 360);
      requestRef.current = requestAnimationFrame(updateSweep);
    };
    requestRef.current = requestAnimationFrame(updateSweep);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const activeSignal = signals.find((s) => s.id === hoveredSignalId) || null;

  // Convert polar coordinates (r, angle) to SVG cartesian coordinates
  const getSignalCoords = (radius: number, angle: number) => {
    // SVG center is 150, 150 in a 300x300 space
    const radians = (angle * Math.PI) / 180;
    const x = 150 + radius * Math.cos(radians);
    const y = 150 + radius * Math.sin(radians);
    return { x, y };
  };

  const sweepRadians = (sweepAngle * Math.PI) / 180;
  const sweepX = 150 + 150 * Math.cos(sweepRadians);
  const sweepY = 150 + 150 * Math.sin(sweepRadians);

  return (
    <section
      id="join"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] overflow-hidden"
    >
      {/* Full-bleed background cinematic visual */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="/closing_cinematic.png"
          alt="Orbital mapping terminal visual"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020206] via-[#020206]/85 to-[#020206]"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-6 text-left">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF6B00] uppercase block mb-2 font-semibold">
              05. CHAPTER 5 // FUTURE RADAR
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              The Horizon Space Radar
            </h2>
            <p className="text-white/40 text-xs md:text-sm mt-2">
              Operational sweep scanner tracking future technologies and sovereign orbital assets. Hover blips to declassify telemetry logs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[60vh]">
          
          {/* Left Column: Interactive Radar Canvas */}
          <div className="lg:col-span-6 flex items-center justify-center relative bg-black/40 border border-white/5 rounded-2xl p-4 overflow-hidden min-h-[300px]">
            <div className="absolute top-3 left-3 font-mono text-[7px] text-white/30 uppercase tracking-widest flex items-center gap-1.5">
              <Radar className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
              Horizon SSA Radar Console
            </div>

            {/* SVG Radar */}
            <svg 
              viewBox="0 0 300 300" 
              className="w-full h-full max-w-[340px] relative z-10 overflow-visible select-none pointer-events-none"
            >
              {/* Concentric grid rings */}
              <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.75" />
              <circle cx="150" cy="150" r="110" fill="none" stroke="rgba(0, 240, 255, 0.03)" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="150" cy="150" r="75" fill="none" stroke="rgba(0, 240, 255, 0.04)" strokeWidth="0.5" />
              <circle cx="150" cy="150" r="40" fill="none" stroke="rgba(0, 240, 255, 0.03)" strokeWidth="0.5" strokeDasharray="2 2" />
              
              {/* Crosshairs */}
              <line x1="150" y1="0" x2="150" y2="300" stroke="rgba(0, 240, 255, 0.03)" strokeWidth="0.5" />
              <line x1="0" y1="150" x2="300" y2="150" stroke="rgba(0, 240, 255, 0.03)" strokeWidth="0.5" />

              {/* Dynamic Sweep Line */}
              <line 
                x1="150" 
                y1="150" 
                x2={sweepX} 
                y2={sweepY} 
                stroke="#00F0FF" 
                strokeWidth="1.25"
                opacity="0.6"
              />

              {/* Sweep gradient arc wedge */}
              <path
                d={`M 150 150 L ${sweepX} ${sweepY} A 150 150 0 0 0 ${150 + 150 * Math.cos(sweepRadians - 0.25)} ${150 + 150 * Math.sin(sweepRadians - 0.25)} Z`}
                fill="url(#radar-sweep-grad)"
                opacity="0.1"
              />

              <defs>
                <linearGradient id="radar-sweep-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Central base node */}
              <circle cx="150" cy="150" r="3" fill="#FF6B00" />
              
              {/* Active Radar Blips */}
              {signals.map((sig) => {
                const coords = getSignalCoords(sig.radius, sig.angle);
                const isHovered = hoveredSignalId === sig.id;
                
                // Calculate distance between sweep line angle and blip angle to trigger active sweep glow
                const angleDiff = Math.abs((sweepAngle - sig.angle + 360) % 360);
                const isSwept = angleDiff < 30; // Within sweep radar sweep angle

                return (
                  <g 
                    key={sig.id} 
                    transform={`translate(${coords.x}, ${coords.y})`}
                    className="pointer-events-auto cursor-pointer"
                    onMouseEnter={() => setHoveredSignalId(sig.id)}
                    onMouseLeave={() => setHoveredSignalId(null)}
                  >
                    {/* Blip glow */}
                    {(isHovered || isSwept) && (
                      <circle cx="0" cy="0" r="8" fill="none" stroke={isHovered ? "#00F0FF" : "#FF6B00"} strokeWidth="0.5" className="animate-ping" />
                    )}

                    {/* Central blip dot */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r={isHovered ? "3.5" : "2"} 
                      fill={isHovered ? "#00F0FF" : isSwept ? "#FF6B00" : "rgba(255, 255, 255, 0.15)"} 
                      className="transition-colors duration-300"
                    />

                    {/* Miniature identifier text */}
                    {isHovered && (
                      <text x="6" y="2" fill="#00F0FF" fontSize="4.5" fontFamily="monospace" fontWeight="bold">
                        {sig.name.toUpperCase()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Column: Concluding Tagline & Details Console */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full py-4 text-left">
            <div>
              <span className="font-mono text-[9px] text-[#FF6B00] tracking-[0.2em] font-bold block mb-1">
                SESSION BRIEFING TERMINATING
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tighter leading-none text-white uppercase">
                SOVEREIGNTY SECURED.
              </h3>
              <p className="font-mono text-[10px] tracking-wider text-[#00F0FF] mt-1 font-bold">
                Link Severed &mdash; Session Summary Log
              </p>
            </div>

            {/* Radar Signal Telemetry Console */}
            <div className="my-4 bg-black/35 border border-white/5 p-4 rounded-xl font-mono text-[9px] text-white/50 shadow-lg relative min-h-[140px] flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent"></div>
              
              <AnimatePresence mode="wait">
                {activeSignal ? (
                  <motion.div
                    key={activeSignal.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-2">
                      <span className="text-[#FF6B00] font-bold tracking-wider">{activeSignal.category.toUpperCase()} // {activeSignal.name.toUpperCase()}</span>
                      <span className="text-white/30 uppercase text-[6px]">READINESS: ON</span>
                    </div>
                    <p className="text-white/80 font-sans text-xs leading-normal">
                      {activeSignal.description}
                    </p>
                    <div className="mt-2 text-white/40 text-[7.5px] flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                      <span>TELEMETRY: <strong className="text-white">{activeSignal.status}</strong></span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default-log"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-center h-full my-auto py-2"
                  >
                    <div className="flex items-center gap-1.5 text-[#00F0FF] font-bold mb-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>TERMINAL CONSOLE ACTIVE</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span>ORBITAL INFRASTRUCTURE LEVEL:</span>
                        <span className="text-white font-bold">OPERATIONAL</span>
                      </div>
                      <div className="flex justify-between">
                        <span>REGULATORY FDI INFLOWS:</span>
                        <span className="text-[#00F0FF] font-bold">ACTIVE // 100% OPEN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>WEBINAR BRIEFING STREAM:</span>
                        <span className="text-[#FF6B00] font-bold">OFFLINE (DISCONNECTED)</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Security Footer */}
            <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-white/30">
              <span className="font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
                SECURITY AUDIT: CONCLUDED
              </span>
              <span className="italic uppercase tracking-widest text-[#FF6B00] font-bold">Classified Briefing</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

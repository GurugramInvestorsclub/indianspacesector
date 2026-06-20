"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, Satellite, Globe, Database, ArrowRight, Activity, TrendingUp } from "lucide-react";

interface Pillar {
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
}

export function FourPillars() {
  const [activePillarId, setActivePillarId] = useState<string>("launch");

  const pillars: Pillar[] = [
    {
      id: "applications",
      name: "Applications & Data",
      category: "Downstream Analytics & SaaS",
      icon: <Database className="w-5 h-5 text-[#00E575]" />,
      desc: "Downstream spatial software, weather grids, ESG carbon monitoring, and agricultural yield indexing APIs. This segment captures over 90% of total economic volume in the global space economy.",
      margin: "75% - 85%",
      multiple: "15x - 22x EV/Rev",
      players: ["SatSure", "MapmyIndia", "CropIn", "KaleidEO"],
      color: "border-[#00E575]/40 text-[#00E575]",
      dotColor: "bg-[#00E575]",
      bgGlow: "from-[#00E575]/5"
    },
    {
      id: "ground",
      name: "Ground Stations",
      category: "Midstream Telemetry & GSaaS",
      icon: <Globe className="w-5 h-5 text-[#FF6B00]" />,
      desc: "Gateway tracking dish nets, low-noise modems, and tracking antennas. Downlinks LEO/MEO raw radio signals directly to regional cloud servers on a per-pass subscription model.",
      margin: "45% - 50%",
      multiple: "7x - 9x EV/Rev",
      players: ["Dhruva Ground Network", "ISRO ISTRAC"],
      color: "border-[#FF6B00]/40 text-[#FF6B00]",
      dotColor: "bg-[#FF6B00]",
      bgGlow: "from-[#FF6B00]/5"
    },
    {
      id: "satellites",
      name: "Satellites & Payload",
      category: "Hardware Assembly & Bus Systems",
      icon: <Satellite className="w-5 h-5 text-[#00F0FF]" />,
      desc: "Design and integration of miniaturized LEO constellations, hyperspectral cameras, Green propulsion thrusters, and CubeSat structures utilizing cost-efficient domestic hub assembly nodes.",
      margin: "45% - 55%",
      multiple: "8x - 10x EV/Rev",
      players: ["Dhruva Space", "Pixxel Assembly", "Bellatrix Propulsion"],
      color: "border-[#00F0FF]/40 text-[#00F0FF]",
      dotColor: "bg-[#00F0FF]",
      bgGlow: "from-[#00F0FF]/5"
    },
    {
      id: "launch",
      name: "Launch Systems",
      category: "Upstream Logistics & Rockets",
      icon: <Rocket className="w-5 h-5 text-[#0052FF]" />,
      desc: "Cryogenic motors, orbital launchers, reusable stage structures, and custom satellite orbits inserts. Startups are capturing micro-launch contracts for global small-sats.",
      margin: "30% - 35%",
      multiple: "4x - 6x EV/Rev",
      players: ["Skyroot Aerospace", "Agnikul Cosmos", "ISRO NSIL"],
      color: "border-[#0052FF]/40 text-[#0052FF]",
      dotColor: "bg-[#0052FF]",
      bgGlow: "from-[#0052FF]/5"
    }
  ];

  const activePillar = pillars.find((p) => p.id === activePillarId) || pillars[3];

  return (
    <section
      id="pillars"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] border-t border-white/5 scroll-snap-align-start overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        {/* Section Header */}
        <div className="text-left mb-10 max-w-2xl">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-2">
            03. ECOSYSTEM VALUE SYSTEM
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
            The Four Pillars of the Stack
          </h2>
          <p className="text-white/40 text-xs md:text-sm mt-3">
            Select any structural layer of the rocket stack to inspect gross margins, commercial multiples, and active players.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Interactive Terminal */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#04040c] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Ambient top border glow */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent"></div>

            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00F0FF] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">
                    STACK LAYER ANALYSIS
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/40"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/40"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/40"></span>
                </div>
              </div>

              {/* Pillar Details Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl">
                      {activePillar.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase block">
                        {activePillar.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white tracking-tight mt-0.5">
                        {activePillar.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/60 text-xs md:text-sm mt-5 leading-relaxed font-sans">
                    {activePillar.desc}
                  </p>

                  {/* Economics Metrics Panel */}
                  <div className="mt-8 grid grid-cols-2 gap-4 bg-[#080814] border border-white/5 p-4 rounded-xl font-mono text-[10px]">
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block">TARGET MARGIN</span>
                      <span className="text-base font-extrabold text-white tracking-tight mt-1 block">
                        {activePillar.margin}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block">VALUATION MULTIPLE</span>
                      <span className="text-base font-extrabold text-white tracking-tight mt-1 block">
                        {activePillar.multiple}
                      </span>
                    </div>
                  </div>

                  {/* Active Indian Players */}
                  <div className="mt-6">
                    <span className="font-mono text-[9px] uppercase text-white/40 tracking-widest block mb-3">
                      KEY INDIAN STACK BUILDERS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activePillar.players.map((plyr) => (
                        <span
                          key={plyr}
                          className="bg-white/5 border border-white/10 text-white/80 font-mono text-[10px] px-3 py-1.5 rounded-sm hover:border-[#00F0FF]/30 hover:text-white transition-all duration-300"
                        >
                          {plyr}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Downstream action */}
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/40">
              <span>SECURITY CHECK: COMPLIANT</span>
              <a
                href="#deepdives"
                className="text-[#00F0FF] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                PROCEED TO SEGMENT DEEP-DIVES
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Clickable CSS Stacked Rocket Diagram */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[300px]">
            {/* Glow backing */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,82,255,0.02)_0%,transparent_70%)]"></div>

            {/* Stack Visual Container */}
            <div className="w-full max-w-sm flex flex-col gap-3 relative z-10">
              {pillars.map((plr, index) => {
                const isActive = activePillarId === plr.id;

                return (
                  <button
                    key={plr.id}
                    onClick={() => setActivePillarId(plr.id)}
                    className={`w-full relative overflow-hidden transition-all duration-500 rounded-[20px] p-5 border text-left cursor-pointer flex items-center justify-between ${
                      isActive
                        ? `bg-white/[0.03] border-white/30 shadow-2xl shadow-black/80`
                        : "bg-[#06060f]/60 border-white/5 hover:border-white/20"
                    }`}
                  >
                    {/* Layer Highlight background gradient */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${plr.bgGlow} to-transparent z-0`}></div>
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      {/* Stack Circle */}
                      <span className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? "bg-white text-[#030308] border-white"
                          : "bg-white/5 border-white/10 text-white/40"
                      }`}>
                        0{pillars.length - index}
                      </span>
                      
                      <div>
                        <h4 className={`text-sm font-bold tracking-tight transition-colors ${
                          isActive ? "text-white animate-pulse" : "text-white/70"
                        }`}>
                          {plr.name}
                        </h4>
                        <span className="font-mono text-[9px] text-white/40 tracking-wider">
                          {plr.category.split(" & ")[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                      <span className="font-mono text-[10px] text-white/30 hidden sm:inline">
                        Multiple: {plr.multiple.split(" ")[0]}
                      </span>
                      <span className={`h-2 w-2 rounded-full ${plr.dotColor} ${
                        isActive ? "animate-pulse shadow-[0_0_8px_currentColor]" : "opacity-40"
                      }`}></span>
                    </div>

                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

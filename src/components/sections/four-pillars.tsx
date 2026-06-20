"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, Satellite, Globe, Database, Activity } from "lucide-react";

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
      icon: <Database className="w-4 h-4 text-[#2E7D32]" />,
      desc: "Downstream spatial software, supply chain tracking, and agricultural NDVI indexing APIs. Captures over 90% of total space economy volume.",
      margin: "75% - 85%",
      multiple: "15x - 22x EV/Rev",
      players: ["SatSure", "MapmyIndia", "CropIn", "KaleidEO"],
      color: "border-[#2E7D32]/20 text-[#2E7D32]",
      dotColor: "bg-[#2E7D32]",
      bgGlow: "from-[#2E7D32]/5"
    },
    {
      id: "ground",
      name: "Ground Stations",
      category: "Midstream Telemetry & GSaaS",
      icon: <Globe className="w-4 h-4 text-[#956400]" />,
      desc: "Gateway tracking dish nets, software modems, and tracking antennas managing LEO data downlinks on a per-pass subscription model.",
      margin: "45% - 50%",
      multiple: "7x - 9x EV/Rev",
      players: ["Dhruva Ground Network", "ISRO ISTRAC"],
      color: "border-[#956400]/20 text-[#956400]",
      dotColor: "bg-[#956400]",
      bgGlow: "from-[#956400]/5"
    },
    {
      id: "satellites",
      name: "Satellites & Payload",
      category: "Hardware Assembly & Bus Systems",
      icon: <Satellite className="w-4 h-4 text-[#1F6C9F]" />,
      desc: "Miniaturized LEO CubeSats, green propellant thruster nodes, and multispectral camera payloads designed in regional domestic clusters.",
      margin: "45% - 55%",
      multiple: "8x - 10x EV/Rev",
      players: ["Dhruva Space", "Pixxel Assembly", "Bellatrix Propulsion"],
      color: "border-[#1F6C9F]/20 text-[#1F6C9F]",
      dotColor: "bg-[#1F6C9F]",
      bgGlow: "from-[#1F6C9F]/5"
    },
    {
      id: "launch",
      name: "Launch Systems",
      category: "Upstream Logistics & Rockets",
      icon: <Rocket className="w-4 h-4 text-[#C5221F]" />,
      desc: "Orbital launchers, carbon-composite motors, and micro-launch configurations optimized for commercial payloads insertions.",
      margin: "30% - 35%",
      multiple: "4x - 6x EV/Rev",
      players: ["Skyroot Aerospace", "Agnikul Cosmos", "ISRO NSIL"],
      color: "border-[#C5221F]/20 text-[#C5221F]",
      dotColor: "bg-[#C5221F]",
      bgGlow: "from-[#C5221F]/5"
    }
  ];

  const activePillar = pillars.find((p) => p.id === activePillarId) || pillars[3];

  return (
    <section
      id="pillars"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#F7F6F3] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background flow graphic */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/value_flow.png"
          alt="Satellite value flow diagram"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale-[80%] sepia-[10%] brightness-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3]/95 via-[#F7F6F3]/60 to-[#F7F6F3]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        {/* Section Header */}
        <div className="text-left mb-6 max-w-2xl">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#1F6C9F] uppercase block mb-2 font-semibold">
            03. ECOSYSTEM VALUE SYSTEM
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-[#111111]">
            The Four Pillars of the Stack
          </h2>
          <p className="text-[#787774] text-xs md:text-sm mt-2">
            Select a layer of the rocket stack to inspect margins, multiples, and active players.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Terminal */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#FFFFFF] border border-[#EAEAEA] rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden">
            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA] mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#1F6C9F]" />
                  <span className="font-mono text-[9px] tracking-wider text-[#111111] font-bold">
                    STACK LAYER ANALYSIS
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/10 border border-red-500/30"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/10 border border-green-500/30"></span>
                </div>
              </div>

              {/* Pillar Details Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#F7F6F3] border border-[#EAEAEA] rounded-xl">
                      {activePillar.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[8px] tracking-wider text-[#787774] uppercase block font-semibold">
                        {activePillar.category}
                      </span>
                      <h3 className="text-lg font-bold text-[#111111] tracking-tight mt-0.5">
                        {activePillar.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[#2F3437] text-xs mt-4 leading-relaxed font-sans">
                    {activePillar.desc}
                  </p>

                  {/* Economics Metrics Panel */}
                  <div className="mt-6 grid grid-cols-2 gap-4 bg-[#F7F6F3] border border-[#EAEAEA] p-3 rounded-lg font-mono text-[9px]">
                    <div>
                      <span className="text-[#787774] block font-semibold">TARGET MARGIN</span>
                      <span className="text-sm font-extrabold text-[#111111] tracking-tight mt-0.5 block">
                        {activePillar.margin}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#787774] block font-semibold">VALUATION MULTIPLE</span>
                      <span className="text-sm font-extrabold text-[#111111] tracking-tight mt-0.5 block">
                        {activePillar.multiple}
                      </span>
                    </div>
                  </div>

                  {/* Active Indian Players */}
                  <div className="mt-5">
                    <span className="font-mono text-[8px] uppercase text-[#787774] tracking-widest block mb-2 font-bold">
                      KEY INDIAN STACK BUILDERS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activePillar.players.map((plyr) => (
                        <span
                          key={plyr}
                          className="bg-[#F7F6F3] border border-[#EAEAEA] text-[#2F3437] font-mono text-[9px] px-2.5 py-1 rounded"
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
            <div className="mt-6 pt-4 border-t border-[#EAEAEA] flex justify-between items-center text-[9px] font-mono text-[#787774]">
              <span className="font-semibold">STATUS: VERIFIED</span>
              <span className="italic">Webinar Slide 03</span>
            </div>
          </div>

          {/* Right Column: Clickable CSS Stacked Rocket Diagram */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[250px]">
            {/* Stack Visual Container */}
            <div className="w-full max-w-xs flex flex-col gap-2 relative z-10">
              {pillars.map((plr, index) => {
                const isActive = activePillarId === plr.id;

                return (
                  <button
                    key={plr.id}
                    onClick={() => setActivePillarId(plr.id)}
                    className={`w-full relative overflow-hidden transition-all duration-300 rounded-[14px] p-4 border text-left cursor-pointer flex items-center justify-between ${
                      isActive
                        ? `bg-[#FFFFFF] border-[#EAEAEA] shadow-md`
                        : "bg-[#FBFBFA]/60 border-[#EAEAEA]/40 hover:border-[#EAEAEA]"
                    }`}
                  >
                    {/* Layer Highlight background gradient */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${plr.bgGlow} to-transparent z-0`}></div>
                    )}

                    <div className="flex items-center gap-3 relative z-10">
                      {/* Stack Circle */}
                      <span className={`w-7 h-7 rounded-full font-mono text-[10px] font-bold flex items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? "bg-[#111111] text-[#FFFFFF] border-[#111111]"
                          : "bg-[#F7F6F3] border-[#EAEAEA] text-[#787774]"
                      }`}>
                        0{pillars.length - index}
                      </span>
                      
                      <div>
                        <h4 className={`text-xs font-bold tracking-tight transition-colors ${
                          isActive ? "text-[#111111]" : "text-[#787774]"
                        }`}>
                          {plr.name}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 relative z-10">
                      <span className={`h-1.5 w-1.5 rounded-full ${plr.dotColor} ${
                        isActive ? "animate-pulse shadow-[0_0_6px_currentColor]" : "opacity-30"
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

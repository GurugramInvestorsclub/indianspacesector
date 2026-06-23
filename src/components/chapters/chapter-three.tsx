"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, 
  Shield, 
  Eye, 
  Wifi, 
  Satellite, 
  Globe, 
  Rocket, 
  Cpu, 
  Activity, 
  TrendingUp, 
  ArrowRight,
  TrendingDown
} from "lucide-react";

interface StackLayer {
  id: string;
  name: string;
  margin: string;
  multiple: string;
  icon: React.ReactNode;
  desc: string;
  players: string[];
  dependsOn: string[];
  criticality: "High" | "Strategic" | "Medium";
}

const STACK_LAYERS: StackLayer[] = [
  {
    id: "apps",
    name: "Applications & Insights",
    margin: "75% - 85%",
    multiple: "15x - 22x",
    icon: <Database className="w-5 h-5 text-accent-cyan" />,
    desc: "Geospatial analytics, crop yield mapping, supply chain tracking, and SaaS overlays.",
    players: ["SatSure", "MapmyIndia", "CropIn", "KaleidEO"],
    dependsOn: ["eo", "comm", "ground", "satellites"],
    criticality: "High"
  },
  {
    id: "defense",
    name: "Strategic Defense",
    margin: "60% - 70%",
    multiple: "12x - 18x",
    icon: <Shield className="w-5 h-5 text-accent-orange" />,
    desc: "Encrypted communications, tactical satellite networks, border ISR, and threat tracking.",
    players: ["ISRO (GSAT-7)", "Digantara", "GalaxEye (Military Payload)"],
    dependsOn: ["satellites", "ground", "comm"],
    criticality: "Strategic"
  },
  {
    id: "eo",
    name: "Earth Observation (EO)",
    margin: "65% - 70%",
    multiple: "10x - 14x",
    icon: <Eye className="w-5 h-5 text-accent-cyan" />,
    desc: "Hyperspectral and Synthetic Aperture Radar (SAR) imagery capturing surface change.",
    players: ["Pixxel", "GalaxEye Space", "ISRO EOS"],
    dependsOn: ["satellites", "launch"],
    criticality: "High"
  },
  {
    id: "comm",
    name: "Communications Segment",
    margin: "50% - 60%",
    multiple: "8x - 11x",
    icon: <Wifi className="w-5 h-5 text-accent-cyan" />,
    desc: "LEO satellite broadband, commercial backhaul, and IoT gateway connectivity.",
    players: ["OneWeb India", "Nelco (Tata)", "Jio SpaceFiber"],
    dependsOn: ["satellites", "ground"],
    criticality: "High"
  },
  {
    id: "ground",
    name: "Ground Infrastructure",
    margin: "45% - 50%",
    multiple: "7x - 9x",
    icon: <Globe className="w-5 h-5 text-accent-cyan" />,
    desc: "Gateway dishes, TTC tracking antennas, and software-defined modems.",
    players: ["Dhruva Space Ground Network", "ISRO ISTRAC"],
    dependsOn: ["components"],
    criticality: "Medium"
  },
  {
    id: "satellites",
    name: "Satellite Platforms",
    margin: "45% - 55%",
    multiple: "8x - 10x",
    icon: <Satellite className="w-5 h-5 text-accent-cyan" />,
    desc: "Design and integration of satellite bus systems, solar arrays, and thruster payloads.",
    players: ["Dhruva Space", "Pixxel Assembly", "Bellatrix (Propulsion)"],
    dependsOn: ["components", "launch"],
    criticality: "High"
  },
  {
    id: "launch",
    name: "Launch Systems",
    margin: "30% - 35%",
    multiple: "4x - 6x",
    icon: <Rocket className="w-5 h-5 text-accent-orange" />,
    desc: "Rockets, customized payload fairings, spaceports, and Orbital Transfer Vehicles (OTVs).",
    players: ["Skyroot Aerospace", "Agnikul Cosmos", "ISRO NSIL (LVM3)"],
    dependsOn: ["components"],
    criticality: "Strategic"
  },
  {
    id: "components",
    name: "Sub-Systems & Components",
    margin: "65% - 75%",
    multiple: "11x - 15x",
    icon: <Cpu className="w-5 h-5 text-accent-cyan" />,
    desc: "Star trackers, reaction wheels, 3D-printed metal engines, and telemetry sensors.",
    players: ["Bellatrix Aerospace", "Agnikul Engines", "Ananth Technologies"],
    dependsOn: [],
    criticality: "High"
  }
];

interface ChapterThreeProps {
  onActiveState: () => void;
}

export function ChapterThree({ onActiveState }: ChapterThreeProps) {
  const [selectedLayerId, setSelectedLayerId] = useState<string>("apps");

  useEffect(() => {
    // Notify presentation manager when this section is scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActiveState();
        }
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById("chapter-3");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [onActiveState]);

  const selectedLayer = STACK_LAYERS.find(l => l.id === selectedLayerId) || STACK_LAYERS[0];

  const handleLayerSelect = (id: string) => {
    setSelectedLayerId(id);
  };

  return (
    <section 
      id="chapter-3" 
      className="relative w-full min-h-[100dvh] py-32 bg-[#030308] bg-grid-pattern border-t border-space-border/20 flex items-center justify-center"
    >
      <div className="max-w-7xl w-full px-6 flex flex-col lg:flex-row gap-12 items-stretch">
        
        {/* Left Column: Explainer Terminal Panel */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between bg-[#04040c] border border-space-border rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle glow border */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"></div>
          
          <div>
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-cyan animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent-cyan font-bold">
                  Ecosystem Stack Terminal
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/30 border border-red-500"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-500/30 border border-yellow-500"></span>
                <span className="w-2 h-2 rounded-full bg-accent-cyan/30 border border-accent-cyan"></span>
              </div>
            </div>

            {/* Layer Meta Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLayer.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    {selectedLayer.icon}
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-sans font-extrabold text-white tracking-tight">
                      {selectedLayer.name}
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                      Tier Level &mdash; {STACK_LAYERS.findIndex(l => l.id === selectedLayer.id) + 1} of 8
                    </span>
                  </div>
                </div>

                <p className="text-white/70 text-sm mt-5 leading-relaxed font-sans">
                  {selectedLayer.desc}
                </p>

                {/* Metrics Table */}
                <div className="mt-8 grid grid-cols-2 gap-4 bg-[#080814] border border-white/5 p-4 rounded-2xl font-mono">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[9px] uppercase text-white/40 tracking-wider">Gross Margin</span>
                    </div>
                    <span className="text-lg font-extrabold text-white tracking-tight mt-1 block">
                      {selectedLayer.margin}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-accent-cyan" />
                      <span className="text-[9px] uppercase text-white/40 tracking-wider">EV / Rev Multiple</span>
                    </div>
                    <span className="text-lg font-extrabold text-white tracking-tight mt-1 block">
                      {selectedLayer.multiple}
                    </span>
                  </div>
                </div>

                {/* Key Indian Players */}
                <div className="mt-6">
                  <span className="text-[9px] font-mono uppercase text-white/40 tracking-widest block mb-2.5">
                    Active Indian Players
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedLayer.players.map((player) => (
                      <span 
                        key={player}
                        className="bg-white/5 border border-white/10 text-white/80 font-mono text-[10px] px-3 py-1.5 rounded-lg hover:border-accent-cyan/30 hover:text-white transition-all cursor-default"
                      >
                        {player}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dependencies Footer */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <span className="text-[9px] font-mono uppercase text-white/40 tracking-widest block mb-3">
              Upstream Dependencies
            </span>
            <div className="flex items-center gap-2">
              {selectedLayer.dependsOn.length > 0 ? (
                selectedLayer.dependsOn.map((depId) => {
                  const depLayer = STACK_LAYERS.find(l => l.id === depId);
                  return (
                    <button
                      key={depId}
                      onClick={() => handleLayerSelect(depId)}
                      className="bg-accent-cyan/5 border border-accent-cyan/15 hover:border-accent-cyan/45 text-accent-cyan font-mono text-[9px] px-2.5 py-1.5 rounded-lg tracking-wider uppercase transition-colors"
                    >
                      {depLayer?.name.split(" ")[0]}
                    </button>
                  );
                })
              ) : (
                <span className="text-[10px] font-mono text-white/30 italic">
                  Independent Baseline Layer
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Stack Visual Node Network */}
        <div className="flex-1 flex flex-col justify-center min-h-[500px]">
          
          <div className="text-left mb-6">
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent-orange uppercase">
              Bloomberg-style Interactive Chart
            </span>
            <h3 className="text-2xl font-sans font-extrabold text-white tracking-tight mt-1">
              The Space Stack
            </h3>
            <p className="text-white/40 text-xs mt-1 max-w-lg">
              Click any layer to highlight its components, downstream margins, and upstream dependencies. Observe capital value shift upwards.
            </p>
          </div>

          {/* Vertical Layers Container */}
          <div className="space-y-2 relative">
            {STACK_LAYERS.map((layer, index) => {
              const isSelected = selectedLayerId === layer.id;
              const isDependency = selectedLayer.dependsOn.includes(layer.id);
              
              return (
                <button
                  key={layer.id}
                  onClick={() => handleLayerSelect(layer.id)}
                  className={`w-full text-left relative overflow-hidden transition-all duration-300 rounded-xl p-3 border cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? "bg-accent-cyan/10 border-accent-cyan shadow-[0_0_15px_rgba(255, 184, 0,0.15)]"
                      : isDependency
                      ? "bg-accent-orange/5 border-accent-orange/40"
                      : "bg-[#06060f]/60 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    {/* Layer Number */}
                    <span className={`font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected
                        ? "bg-accent-cyan text-space-black"
                        : isDependency
                        ? "bg-accent-orange text-space-black"
                        : "bg-white/5 border border-white/10 text-white/50"
                    }`}>
                      {index + 1}
                    </span>
                    
                    {/* Name */}
                    <span className={`text-xs md:text-sm font-sans font-bold tracking-wide transition-colors ${
                      isSelected ? "text-white" : "text-white/70"
                    }`}>
                      {layer.name}
                    </span>
                  </div>

                  {/* Right hand stats: Margin & Dependency indicator */}
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="hidden sm:inline font-mono text-[10px] text-white/40">
                      Margin: {layer.margin}
                    </span>
                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded border transition-colors ${
                      isSelected
                        ? "bg-accent-cyan/10 border-accent-cyan text-accent-cyan"
                        : isDependency
                        ? "bg-accent-orange/10 border-accent-orange text-accent-orange"
                        : "bg-white/5 border-white/10 text-white/30"
                    }`}>
                      {isSelected ? "ACTIVE FOCUS" : isDependency ? "DEPENDENCY" : "UPSTREAM"}
                    </span>
                  </div>

                  {/* Selected bar background highlight */}
                  {isSelected && (
                    <motion.div 
                      layoutId="activeLayerGlow" 
                      className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 to-transparent z-0 pointer-events-none" 
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

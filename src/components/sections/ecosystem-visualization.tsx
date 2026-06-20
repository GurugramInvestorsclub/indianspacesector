"use client";

import React, { useState } from "react";
import { Network, Activity, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NodeItem {
  id: string;
  name: string;
  category: string;
  x: number; // SVG center coordinate X (0-500)
  y: number; // SVG center coordinate Y (0-500)
  desc: string;
  connections: string[]; // Connected node IDs
  accentColor: string;
}

export function EcosystemVisualization() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Define nodes in a 500x500 coordinate space
  const centerNode = {
    id: "center",
    name: "INDIAN SPACE SECTOR",
    category: "SOVEREIGN SYSTEM",
    x: 250,
    y: 250,
    desc: "The unified orbital economy: a synchronized stack of state-led operations, commercial gateways, and venture-backed private builders.",
    connections: ["isro", "inspace", "nsil", "startups", "launch", "satellites", "ground", "apps"],
    accentColor: "#00F0FF"
  };

  const outerNodes: NodeItem[] = [
    {
      id: "isro",
      name: "ISRO",
      category: "Sovereign R&D",
      x: 250,
      y: 60,
      desc: "National space body spearheading deep-space scientific missions, planetary exploration, and heavy booster designs.",
      connections: ["center", "nsil", "inspace", "launch"],
      accentColor: "#FF6B00"
    },
    {
      id: "inspace",
      name: "IN-SPACe",
      category: "Policy & Licensing",
      x: 385,
      y: 115,
      desc: "Single-window regulatory gateway authorizing commercial space activities, launch pads, and private sat constellations.",
      connections: ["center", "isro", "startups", "launch"],
      accentColor: "#FF6B00"
    },
    {
      id: "nsil",
      name: "NSIL",
      category: "Commercial Arm",
      x: 440,
      y: 250,
      desc: "Commercial branch contracting sovereign launch vehicles, building heavy launchers, and brokering international rideshares.",
      connections: ["center", "isro", "startups", "launch"],
      accentColor: "#FF6B00"
    },
    {
      id: "startups",
      name: "Space Startups",
      category: "Venture Capital Stack",
      x: 385,
      y: 385,
      desc: "250+ active private builders designing carbon-composite motors, green propellants, and GSaaS antenna modems.",
      connections: ["center", "inspace", "nsil", "launch", "satellites", "ground"],
      accentColor: "#00F0FF"
    },
    {
      id: "launch",
      name: "Launch Vehicles",
      category: "Upstream Logistics",
      x: 250,
      y: 440,
      desc: "Orbital launching systems (Skyroot Vikram, Agnikul Agnibaan) optimized for custom commercial payload inclinations.",
      connections: ["center", "isro", "inspace", "nsil", "startups"],
      accentColor: "#00F0FF"
    },
    {
      id: "satellites",
      name: "Satellites & Payload",
      category: "LEO Hardware",
      x: 115,
      y: 385,
      desc: "Miniaturized LEO CubeSats, green propellant thruster arrays, and multispectral/SAR camera assembly units.",
      connections: ["center", "startups", "ground", "apps"],
      accentColor: "#00F0FF"
    },
    {
      id: "ground",
      name: "Ground Stations",
      category: "Midstream Telemetry",
      x: 60,
      y: 250,
      desc: "TTC antenna dishes, software-defined ground tracking links, and downlink data routing on per-pass subscription rates.",
      connections: ["center", "startups", "satellites", "apps"],
      accentColor: "#FF6B00"
    },
    {
      id: "apps",
      name: "Applications & Data",
      category: "Downstream SaaS",
      x: 115,
      y: 115,
      desc: "Downstream spatial analytics translating spectral pixels into NDVI crop yield estimations, ESG carbon indices, and vessel paths.",
      connections: ["center", "satellites", "ground"],
      accentColor: "#00F0FF"
    }
  ];

  const allNodes = [centerNode, ...outerNodes];
  const activeNode = allNodes.find((n) => n.id === hoveredNodeId) || centerNode;

  // Determine if a connection line should be illuminated
  const isConnectionActive = (n1: string, n2: string) => {
    if (!hoveredNodeId) return false;
    if (hoveredNodeId === "center") return true;
    return (n1 === hoveredNodeId && n2 === "center") || 
           (n2 === hoveredNodeId && n1 === "center") ||
           (n1 === hoveredNodeId && activeNode.connections.includes(n2)) ||
           (n2 === hoveredNodeId && activeNode.connections.includes(n1));
  };

  return (
    <section
      id="ecosystem"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        {/* Header Block */}
        <div className="text-left mb-6 max-w-2xl">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-2 font-semibold">
            02B. COGNITIVE SYNAPSE
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
            Ecosystem Network Map
          </h2>
          <p className="text-white/40 text-xs md:text-sm mt-2">
            Hover over any node to trace sovereign relationships, licensing pathways, and upstream/downstream integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive SVG Network Diagram */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[300px] md:min-h-[400px]">
            {/* SVG Canvas for Connections */}
            <svg 
              viewBox="0 0 500 500" 
              className="w-full h-full max-w-[450px] relative z-10 select-none pointer-events-none"
            >
              <defs>
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* DRAW CONNECTIONS */}
              {outerNodes.map((node) => {
                const isActive = isConnectionActive("center", node.id);
                return (
                  <g key={`link-${node.id}`}>
                    {/* Base faint link line */}
                    <line
                      x1={centerNode.x}
                      y1={centerNode.y}
                      x2={node.x}
                      y2={node.y}
                      stroke="rgba(255, 255, 255, 0.03)"
                      strokeWidth="1.5"
                    />
                    
                    {/* Glowing active animation line */}
                    {isActive && (
                      <line
                        x1={centerNode.x}
                        y1={centerNode.y}
                        x2={node.x}
                        y2={node.y}
                        stroke="#00F0FF"
                        strokeWidth="1.5"
                        strokeDasharray="4, 12"
                        className="animate-[dash_1.5s_linear_infinite]"
                        style={{
                          filter: "url(#glow-cyan)"
                        }}
                      />
                    )}
                  </g>
                );
              })}

              {/* DRAW INTER-NODE CONNECTIONS */}
              {outerNodes.map((node) => {
                return node.connections.map((connId) => {
                  if (connId === "center") return null;
                  const target = outerNodes.find((on) => on.id === connId);
                  if (!target) return null;
                  
                  const isActive = isConnectionActive(node.id, target.id);

                  return (
                    <g key={`link-${node.id}-${target.id}`}>
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={isActive ? "#00F0FF" : "rgba(255, 255, 255, 0.01)"}
                        strokeWidth={isActive ? "1" : "0.5"}
                        strokeDasharray={isActive ? "3, 10" : "none"}
                        className={isActive ? "animate-[dash_2s_linear_infinite_reverse]" : ""}
                      />
                    </g>
                  );
                });
              })}
            </svg>

            {/* Absolutely Rendered Nodes as Clickable/Hoverable Buttons */}
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
              <div className="w-full h-full max-w-[450px] relative">
                
                {/* Center Node Button */}
                <button
                  onMouseEnter={() => setHoveredNodeId("center")}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className="absolute pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  style={{ left: `${(centerNode.x / 500) * 100}%`, top: `${(centerNode.y / 500) * 100}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-12 h-12 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 scale-100 group-hover:scale-110 transition-all duration-300"></span>
                    <span className="absolute w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] z-10"></span>
                  </div>
                </button>

                {/* Outer Node Buttons */}
                {outerNodes.map((node) => {
                  const isHovered = hoveredNodeId === node.id;
                  const isHighlighted = hoveredNodeId ? (hoveredNodeId === "center" || activeNode.connections.includes(node.id) || isHovered) : false;

                  return (
                    <button
                      key={node.id}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className="absolute pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                      style={{ left: `${(node.x / 500) * 100}%`, top: `${(node.y / 500) * 100}%` }}
                    >
                      <div className="relative flex flex-col items-center justify-center">
                        {/* Interactive glow shell */}
                        <span className={`absolute w-9 h-9 rounded-full border transition-all duration-300 ${
                          isHovered 
                            ? "bg-[#00F0FF]/10 border-[#00F0FF]/40 scale-110" 
                            : isHighlighted
                            ? "bg-white/5 border-white/20 scale-100"
                            : "border-transparent scale-50"
                        }`}></span>

                        {/* Node point */}
                        <span className={`w-2.5 h-2.5 rounded-full border-2 border-[#030308] z-10 transition-all duration-300 ${
                          isHovered 
                            ? "bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" 
                            : isHighlighted
                            ? "bg-white/70"
                            : "bg-white/20 border-white/25"
                        }`}></span>

                        {/* Monospace floating label */}
                        <span className={`absolute top-6 font-mono text-[7px] tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${
                          isHovered 
                            ? "text-[#00F0FF] opacity-100 translate-y-0.5" 
                            : isHighlighted
                            ? "text-white opacity-85 translate-y-0"
                            : "text-white/40 opacity-50 translate-y-0"
                        }`}>
                          {node.name}
                        </span>
                      </div>
                    </button>
                  );
                })}

              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Briefing Telemetry Dossier */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#04040c]/90 border border-white/5 rounded-xl p-5 md:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent"></div>

            <div>
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <Network className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="font-mono text-[9px] tracking-wider text-white/80 font-bold">
                    NODE_DESCRIPTOR // BRIEFING
                  </span>
                </div>
                <span className="font-mono text-[7px] text-[#00F0FF] border border-[#00F0FF]/20 px-2 py-0.5 rounded bg-[#00F0FF]/5 font-semibold">
                  SECURE
                </span>
              </div>

              {/* Node content details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                      <Activity className="w-4 h-4 text-[#00F0FF]" />
                    </div>
                    <div>
                      <span className="font-mono text-[8px] tracking-wider text-white/40 uppercase block font-semibold">
                        {activeNode.category}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                        {activeNode.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/60 text-xs mt-4 leading-relaxed font-sans min-h-[80px]">
                    {activeNode.desc}
                  </p>

                  {/* Connected pathways */}
                  <div className="mt-5">
                    <span className="font-mono text-[8px] uppercase text-white/40 tracking-widest block mb-2 font-bold">
                      ACTIVE PATHWAY CHANNELS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeNode.connections.map((connId) => {
                        const targetNode = allNodes.find((n) => n.id === connId);
                        if (!targetNode) return null;
                        return (
                          <span
                            key={connId}
                            className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded hover:border-[#00F0FF]/30 transition-all duration-200"
                          >
                            // {targetNode.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom action bar */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
              <span className="font-semibold">SECTOR BRIEFING MAP</span>
              <span className="text-white/20 italic">Slide 02B</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

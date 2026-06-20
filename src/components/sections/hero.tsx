"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Network, Activity, ShieldAlert, Satellite } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MapNode {
  id: string;
  name: string;
  category: string;
  orbitRadius: number;
  speed: number; // speed of rotation (radians per frame)
  description: string;
  stats: string;
  related: string[]; // related node IDs
  accentColor: string;
}

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [angles, setAngles] = useState<Record<string, number>>({});
  const requestRef = useRef<number | null>(null);

  const nodes: MapNode[] = [
    {
      id: "isro",
      name: "ISRO",
      category: "Sovereign R&D",
      orbitRadius: 75,
      speed: 0.007,
      description: "National space body spearheading deep-space exploration, scientific spacecraft assembly, and heavy rocket development.",
      stats: "50+ successful launches & planetary missions",
      related: ["inspace", "nsil", "launch"],
      accentColor: "#FF6B00"
    },
    {
      id: "inspace",
      name: "IN-SPACe",
      category: "Regulatory Gateway",
      orbitRadius: 105,
      speed: 0.005,
      description: "Single-window regulatory gateway authorizing commercial space operations, private launch sites, and orbit permits.",
      stats: "Decisive 2020 Reforms licensing interface",
      related: ["isro", "startups", "launch"],
      accentColor: "#FF6B00"
    },
    {
      id: "nsil",
      name: "NSIL",
      category: "Commercial Arm",
      orbitRadius: 130,
      speed: 0.004,
      description: "Commercial agency contracting launches, building rockets via industry consortia, and transfering ISRO space technologies.",
      stats: "Sovereign launch procurement & exports",
      related: ["isro", "launch"],
      accentColor: "#FF6B00"
    },
    {
      id: "startups",
      name: "Space Startups",
      category: "Commercial Capital",
      orbitRadius: 160,
      speed: 0.0035,
      description: "250+ venture-backed startup builders designing 3D-printed thrusters, carbon launchers, and software APIs.",
      stats: "Fastest-growing tech venture stack in India",
      related: ["inspace", "launch", "satellites"],
      accentColor: "#00F0FF"
    },
    {
      id: "launch",
      name: "Launch Vehicles",
      category: "Upstream Logistics",
      orbitRadius: 190,
      speed: 0.003,
      description: "Private launching systems (Skyroot Vikram, Agnikul Agnibaan) deploying LEO payloads on custom inclinations.",
      stats: "30% cost savings vs Western launchers",
      related: ["startups", "isro", "nsil"],
      accentColor: "#00F0FF"
    },
    {
      id: "satellites",
      name: "Satellites",
      category: "Orbital Hardware",
      orbitRadius: 215,
      speed: 0.0025,
      description: "Miniaturized CubeSats, green propulsive thruster blocks, and RF payloads designed in domestic hardware clusters.",
      stats: "35% hardware manufacturing arbitrage",
      related: ["startups", "ground", "apps"],
      accentColor: "#00F0FF"
    },
    {
      id: "ground",
      name: "Ground Segment",
      category: "Midstream Telemetry",
      orbitRadius: 240,
      speed: 0.002,
      description: "TTC antenna dishes, software tracking stations, and downlink data routers managing active LEO orbits.",
      stats: "30+ Gbps peak downlink capacity",
      related: ["satellites", "apps"],
      accentColor: "#FF6B00"
    },
    {
      id: "apps",
      name: "Applications",
      category: "Downstream SaaS",
      orbitRadius: 265,
      speed: 0.0015,
      description: "Spatial analytics SaaS platforms translating spectral pixels into NDVI crop metrics, ESG carbon captures, and vessel routes.",
      stats: "Captures 95% of total space economy volume",
      related: ["satellites", "ground"],
      accentColor: "#00F0FF"
    }
  ];

  // Mouse move handler for premium 3D depth parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Frame animation loop to increment node angles (drift)
  useEffect(() => {
    // Initialize angles randomly
    const initialAngles: Record<string, number> = {};
    nodes.forEach((n, idx) => {
      initialAngles[n.id] = (idx * (2 * Math.PI)) / nodes.length;
    });
    setAngles(initialAngles);

    const updateAngles = () => {
      setAngles((prev) => {
        const next = { ...prev };
        nodes.forEach((n) => {
          next[n.id] = (prev[n.id] || 0) + n.speed;
        });
        return next;
      });
      requestRef.current = requestAnimationFrame(updateAngles);
    };

    requestRef.current = requestAnimationFrame(updateAngles);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const activeNode = nodes.find((n) => n.id === hoveredNodeId) || null;

  // Coordinate math for placing nodes dynamically
  const getNodeCoords = (node: MapNode) => {
    const angle = angles[node.id] || 0;
    // Map center is 175, 175 in a 350x350 SVG space
    const x = 175 + node.orbitRadius * Math.cos(angle) * 0.6;
    const y = 175 + node.orbitRadius * Math.sin(angle) * 0.6;
    return { x, y };
  };

  return (
    <section
      id="overview"
      className="relative h-[100dvh] w-full flex items-center bg-[#030308] overflow-hidden border-b border-white/5"
    >
      {/* Background Starfield details */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] z-10"></div>
      <div className="absolute inset-0 radial-vignette z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Briefing Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-full mb-5 self-start"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-[#00F0FF] uppercase font-bold">
                SYSTEMS_INIT // DECLASSIFIED_BRIEFING
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white"
            >
              India's Space <br />
              Revolution Has <br />
              <span className="font-serif italic font-light text-[#00F0FF] tracking-normal">Begun.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/70 text-xs md:text-sm mt-5 max-w-md font-sans leading-relaxed"
            >
              A declassified analysis of the sovereign assets and capital flywheels shaping India's orbital technology stack. Hover nodes on the ecosystem map to trace active connections.
            </motion.p>

            {/* Scroll Down Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-12 flex items-center gap-2 font-mono text-[9px] text-white/40 tracking-widest uppercase"
            >
              <ChevronDown className="w-4 h-4 animate-bounce text-[#00F0FF]" />
              <span>SCROLL DOWN TO DECLASSIFY BRIEFING</span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Space Economy Map */}
          <div 
            style={{
              transform: `rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg)`,
              perspective: 1000
            }}
            className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[350px] md:min-h-[450px] transition-transform duration-500 ease-out"
          >
            {/* SVG Interactive Canvas */}
            <svg 
              viewBox="0 0 350 350" 
              className="w-full h-full max-w-[420px] relative z-20 overflow-visible select-none"
            >
              <defs>
                <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Orbit paths */}
              {nodes.map((node) => {
                const isHovered = hoveredNodeId === node.id;
                const isRelated = activeNode?.related.includes(node.id);
                return (
                  <ellipse
                    key={`orbit-${node.id}`}
                    cx="175"
                    cy="175"
                    rx={node.orbitRadius * 0.6}
                    ry={node.orbitRadius * 0.6}
                    fill="none"
                    stroke={isHovered ? "#00F0FF" : isRelated ? "rgba(255,107,0,0.3)" : "rgba(255,255,255,0.02)"}
                    strokeWidth={isHovered ? "1" : "0.5"}
                    strokeDasharray={isHovered ? "0" : "3 3"}
                    className="transition-colors duration-300"
                  />
                );
              })}

              {/* Active Connection Vectors */}
              {nodes.map((node) => {
                if (!hoveredNodeId || hoveredNodeId !== node.id) return null;
                const coords1 = getNodeCoords(node);
                return node.related.map((relId) => {
                  const relNode = nodes.find((n) => n.id === relId);
                  if (!relNode) return null;
                  const coords2 = getNodeCoords(relNode);
                  return (
                    <line
                      key={`vector-${node.id}-${relId}`}
                      x1={coords1.x}
                      y1={coords1.y}
                      x2={coords2.x}
                      y2={coords2.y}
                      stroke="#00F0FF"
                      strokeWidth="1"
                      strokeDasharray="2 6"
                      className="animate-[dash_1s_linear_infinite]"
                      style={{ filter: "url(#map-glow)" }}
                    />
                  );
                });
              })}

              {/* Central India Core Globe */}
              <g className="cursor-pointer">
                {/* Core pulse */}
                <circle cx="175" cy="175" r="14" fill="rgba(0, 240, 255, 0.05)" stroke="#00F0FF" strokeWidth="0.75" />
                <circle cx="175" cy="175" r="22" fill="none" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" className="animate-spin" style={{ animationDuration: "12s" }} />
                
                {/* stylized India locator coordinate */}
                <path 
                  d="M170,167 L178,164 L182,170 L179,178 L183,184 L175,188 L169,182 L165,176 Z" 
                  fill="none" 
                  stroke="#00F0FF" 
                  strokeWidth="1" 
                  className="animate-pulse"
                />
                
                {/* Label text */}
                <text x="175" y="196" fill="#00F0FF" fontSize="5" fontFamily="monospace" textAnchor="middle" letterSpacing="1" opacity="0.8">
                  IND_CORE
                </text>
              </g>

              {/* Orbiting nodes */}
              {nodes.map((node) => {
                const coords = getNodeCoords(node);
                const isHovered = hoveredNodeId === node.id;
                const isRelated = activeNode?.related.includes(node.id);
                const isDimmed = hoveredNodeId !== null && !isHovered && !isRelated;

                return (
                  <g
                    key={`node-g-${node.id}`}
                    transform={`translate(${coords.x}, ${coords.y})`}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className="cursor-pointer pointer-events-auto"
                    style={{ opacity: isDimmed ? 0.25 : 1, transition: "opacity 0.3s ease" }}
                  >
                    {/* Ring glow */}
                    {isHovered && (
                      <circle cx="0" cy="0" r="10" fill="none" stroke={node.accentColor} strokeWidth="0.5" className="animate-ping" />
                    )}
                    
                    {/* Outer node dot */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r={isHovered ? "4" : "2.5"} 
                      fill="#030308" 
                      stroke={isHovered ? "#00F0FF" : node.accentColor} 
                      strokeWidth={isHovered ? "1.5" : "1"} 
                      style={{ transition: "r 0.2s ease, stroke 0.2s ease" }}
                    />

                    {/* Node Text Label */}
                    <text
                      x="7"
                      y="2"
                      fill={isHovered ? "#00F0FF" : "rgba(255,255,255,0.4)"}
                      fontSize="5"
                      fontFamily="monospace"
                      letterSpacing="0.5"
                      fontWeight={isHovered ? "bold" : "normal"}
                      className="pointer-events-none select-none transition-colors duration-200"
                    >
                      {node.name.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Live Telemetry Info Panel */}
            <div className="w-full max-w-[380px] bg-[#04040c]/95 border border-white/10 rounded-lg p-4 font-mono text-[9px] text-white/50 shadow-2xl relative overflow-hidden min-h-[90px] flex flex-col justify-between backdrop-blur-md z-30 mt-4">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent"></div>
              
              <AnimatePresence mode="wait">
                {activeNode ? (
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-2">
                      <span className="text-[#00F0FF] font-bold tracking-wider">{activeNode.category.toUpperCase()} // {activeNode.name.toUpperCase()}</span>
                      <span className="text-white/30 uppercase text-[7px]">OPERATIONAL_OK</span>
                    </div>
                    <p className="text-white/80 font-sans text-xs leading-tight">
                      {activeNode.description}
                    </p>
                    <div className="mt-2 text-white/40 text-[8px] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
                      <span>METRIC: <strong className="text-white">{activeNode.stats}</strong></span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-center h-full my-auto text-center py-2"
                  >
                    <div className="flex justify-center items-center gap-2 text-white/30">
                      <Satellite className="w-4 h-4 text-white/20 animate-spin" style={{ animationDuration: "10s" }} />
                      <span className="tracking-widest uppercase">Ecosystem Core Telemetry Ingest</span>
                    </div>
                    <span className="text-[7px] text-white/20 block mt-1 tracking-wider">HOVER NODES TO INGEST REALTIME BRIEFING VALUES</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

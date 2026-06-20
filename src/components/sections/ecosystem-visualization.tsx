"use client";

import React, { useState, useEffect, useRef } from "react";
import { Network, Activity, HelpCircle, ArrowRight, ZoomIn, ZoomOut, Move } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GraphNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isPrimary: boolean;
  parent?: string;
  desc: string;
  accentColor: string;
}

export function EcosystemVisualization() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  // Pan and Zoom states
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const [nodesList, setNodesList] = useState<GraphNode[]>([]);
  const requestRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const centerNode: GraphNode = {
    id: "center",
    name: "INDIAN SPACE SECTOR",
    category: "SOVEREIGN SYSTEM",
    x: 250,
    y: 250,
    vx: 0,
    vy: 0,
    isPrimary: true,
    desc: "The unified orbital economy: a synchronized stack of state-led operations, commercial gateways, and venture-backed private builders.",
    accentColor: "#00F0FF"
  };

  const primaryNodes: GraphNode[] = [
    {
      id: "isro",
      name: "ISRO",
      category: "Sovereign R&D",
      x: 250,
      y: 80,
      vx: 0,
      vy: 0,
      isPrimary: true,
      desc: "National space body spearheading deep-space scientific missions, planetary exploration, and heavy booster designs.",
      accentColor: "#FF6B00"
    },
    {
      id: "inspace",
      name: "IN-SPACe",
      category: "Policy & Licensing",
      x: 370,
      y: 130,
      vx: 0,
      vy: 0,
      isPrimary: true,
      desc: "Single-window regulatory gateway authorizing commercial space activities, launch pads, and private sat constellations.",
      accentColor: "#FF6B00"
    },
    {
      id: "nsil",
      name: "NSIL",
      category: "Commercial Arm",
      x: 420,
      y: 250,
      vx: 0,
      vy: 0,
      isPrimary: true,
      desc: "Commercial branch contracting sovereign launch vehicles, building heavy launchers, and brokering international rideshares.",
      accentColor: "#FF6B00"
    },
    {
      id: "startups",
      name: "Space Startups",
      category: "Venture Capital Stack",
      x: 370,
      y: 370,
      vx: 0,
      vy: 0,
      isPrimary: true,
      desc: "250+ active private builders designing carbon-composite motors, green propellants, and GSaaS antenna modems.",
      accentColor: "#00F0FF"
    },
    {
      id: "launch",
      name: "Launch Vehicles",
      category: "Upstream Logistics",
      x: 250,
      y: 420,
      vx: 0,
      vy: 0,
      isPrimary: true,
      desc: "Orbital launching systems (Skyroot Vikram, Agnikul Agnibaan) optimized for custom commercial payload inclinations.",
      accentColor: "#00F0FF"
    },
    {
      id: "satellites",
      name: "Satellites & Payload",
      category: "LEO Hardware",
      x: 130,
      y: 370,
      vx: 0,
      vy: 0,
      isPrimary: true,
      desc: "Miniaturized LEO CubeSats, green propellant thruster arrays, and multispectral/SAR camera assembly units.",
      accentColor: "#00F0FF"
    },
    {
      id: "ground",
      name: "Ground Stations",
      category: "Midstream Telemetry",
      x: 80,
      y: 250,
      vx: 0,
      vy: 0,
      isPrimary: true,
      desc: "TTC antenna dishes, software-defined ground tracking links, and downlink data routing on per-pass subscription rates.",
      accentColor: "#FF6B00"
    },
    {
      id: "apps",
      name: "Applications & Data",
      category: "Downstream SaaS",
      x: 130,
      y: 130,
      vx: 0,
      vy: 0,
      isPrimary: true,
      desc: "Downstream spatial analytics translating spectral pixels into NDVI crop yield estimations, ESG carbon indices, and vessel paths.",
      accentColor: "#00F0FF"
    }
  ];

  const secondaryNodes: GraphNode[] = [
    // Launch sub-nodes
    { id: "propulsion", name: "Propulsion", category: "Sub-component", x: 200, y: 440, vx: 0, vy: 0, isPrimary: false, parent: "launch", desc: "3D-printed cryogenic thrust systems and custom fuel formulations.", accentColor: "#00F0FF" },
    { id: "materials", name: "Materials", category: "Sub-component", x: 250, y: 470, vx: 0, vy: 0, isPrimary: false, parent: "launch", desc: "Lightweight carbon composites and aerospace-grade alloys.", accentColor: "#00F0FF" },
    { id: "testing", name: "Testing", category: "Sub-component", x: 300, y: 440, vx: 0, vy: 0, isPrimary: false, parent: "launch", desc: "Structural load rigs, vacuum chambers, and static fire controls.", accentColor: "#00F0FF" },
    { id: "launch_infra", name: "Infrastructure", category: "Sub-component", x: 250, y: 400, vx: 0, vy: 0, isPrimary: false, parent: "launch", desc: "Coastal private spaceports, tracking systems, and mobile launcher trailers.", accentColor: "#00F0FF" },
    
    // Satellites sub-nodes
    { id: "bus_systems", name: "Bus Systems", category: "LEO Hardware", x: 90, y: 380, vx: 0, vy: 0, isPrimary: false, parent: "satellites", desc: "Modular frames and structures scaling from 1U CubeSats to 150kg.", accentColor: "#00F0FF" },
    { id: "payloads", name: "Payloads", category: "LEO Hardware", x: 120, y: 410, vx: 0, vy: 0, isPrimary: false, parent: "satellites", desc: "Hyperspectral sensors, SAR radar antennas, and RF transponders.", accentColor: "#00F0FF" },
    { id: "thruster_nodes", name: "Thrusters", category: "LEO Hardware", x: 150, y: 400, vx: 0, vy: 0, isPrimary: false, parent: "satellites", desc: "High-impulse green chemicals and electric Hall thrusters.", accentColor: "#00F0FF" },

    // Ground Systems sub-nodes
    { id: "antennas", name: "Antennas", category: "Midstream Telemetry", x: 60, y: 200, vx: 0, vy: 0, isPrimary: false, parent: "ground", desc: "Globally distributed high-gain parabolic tracking dishes.", accentColor: "#FF6B00" },
    { id: "ttc_gateway", name: "TTC Gateways", category: "Midstream Telemetry", x: 50, y: 280, vx: 0, vy: 0, isPrimary: false, parent: "ground", desc: "Automated RF ingest APIs routing data to public cloud grids.", accentColor: "#FF6B00" },

    // Applications sub-nodes
    { id: "agriculture", name: "Agriculture", category: "Downstream Industry", x: 90, y: 100, vx: 0, vy: 0, isPrimary: false, parent: "apps", desc: "NDVI vegetation indexing and crop yields underwriting models.", accentColor: "#00F0FF" },
    { id: "insurance", name: "Insurance", category: "Downstream Industry", x: 120, y: 70, vx: 0, vy: 0, isPrimary: false, parent: "apps", desc: "High-frequency flood, storm, and climate risk parameter mapping.", accentColor: "#00F0FF" },
    { id: "defense", name: "Defense & Intel", category: "Downstream Industry", x: 150, y: 90, vx: 0, vy: 0, isPrimary: false, parent: "apps", desc: "Border monitoring, vessel tracking, and secure sovereign intelligence.", accentColor: "#FF6B00" },
    { id: "climate", name: "Climate ESG", category: "Downstream Industry", x: 180, y: 110, vx: 0, vy: 0, isPrimary: false, parent: "apps", desc: "Methane leaks auditing and forest carbon sink certifications.", accentColor: "#00F0FF" }
  ];

  // Initialize nodes
  useEffect(() => {
    const initialNodes = [centerNode, ...primaryNodes, ...secondaryNodes];
    setNodesList(initialNodes);
  }, []);

  // 60 FPS Physics Simulation loop
  useEffect(() => {
    if (nodesList.length === 0) return;

    const runSimulation = () => {
      setNodesList((prevNodes) => {
        // Apply velocity damping (inertia)
        const nextNodes = prevNodes.map((n) => ({
          ...n,
          vx: n.vx * 0.82,
          vy: n.vy * 0.82
        }));

        // 1. Node Repulsion (push nodes away to avoid overlaps)
        for (let i = 0; i < nextNodes.length; i++) {
          for (let j = i + 1; j < nextNodes.length; j++) {
            const n1 = nextNodes[i];
            const n2 = nextNodes[j];
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.hypot(dx, dy) || 1;

            // Primary-primary repulsion is larger; secondary-secondary is smaller
            const minDist = n1.isPrimary && n2.isPrimary ? 90 : 38;
            if (dist < minDist) {
              const force = (minDist - dist) * 0.045;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              n2.vx += fx;
              n2.vy += fy;
              n1.vx -= fx;
              n1.vy -= fy;
            }
          }
        }

        // 2. Link Attraction (pull secondary nodes to their parent, pull primaries to central core)
        nextNodes.forEach((n) => {
          if (n.id === "center") return;

          if (n.isPrimary) {
            // Anchor primaries to concentric orbital rings around center
            const index = primaryNodes.findIndex((pn) => pn.id === n.id);
            const angle = (index * (2 * Math.PI)) / primaryNodes.length;
            const targetX = 250 + 130 * Math.cos(angle);
            const targetY = 250 + 130 * Math.sin(angle);
            
            n.vx += (targetX - n.x) * 0.05;
            n.vy += (targetY - n.y) * 0.05;
          } else if (n.parent) {
            // Anchor secondaries to parents
            const parent = nextNodes.find((p) => p.id === n.parent);
            if (parent) {
              const dx = parent.x - n.x;
              const dy = parent.y - n.y;
              const dist = Math.hypot(dx, dy) || 1;
              const targetDist = 55; // target spring length
              const force = (dist - targetDist) * 0.08;
              
              n.vx += (dx / dist) * force;
              n.vy += (dy / dist) * force;
            }
          }
        });

        // 3. Update coordinates with wall boundaries
        return nextNodes.map((n) => {
          if (n.id === "center") return n; // Core stays fixed
          return {
            ...n,
            x: Math.max(15, Math.min(485, n.x + n.vx)),
            y: Math.max(15, Math.min(485, n.y + n.vy))
          };
        });
      });

      requestRef.current = requestAnimationFrame(runSimulation);
    };

    requestRef.current = requestAnimationFrame(runSimulation);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [nodesList.length]);

  // Pan and Drag Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof SVGElement && e.target.closest(".node-group")) return; // Don't drag when clicking a node
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 1.05;
    const newScale = e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;
    setScale(Math.max(0.6, Math.min(2.5, newScale)));
  };

  const zoomIn = () => setScale((s) => Math.min(2.5, s * 1.15));
  const zoomOut = () => setScale((s) => Math.max(0.6, s / 1.15));
  const resetPan = () => { setScale(1); setPan({ x: 0, y: 0 }); };

  // Highlight rules
  const getHighlightNodeIds = () => {
    if (!hoveredNodeId) return null;
    
    // Find hovered node
    const hoverNode = nodesList.find((n) => n.id === hoveredNodeId);
    if (!hoverNode) return null;

    const ids = new Set<string>([hoveredNodeId, "center"]);
    
    if (hoveredNodeId === "center") {
      // Highlight everything
      return null;
    }

    if (hoverNode.isPrimary) {
      ids.add(hoverNode.id);
      // Highlight all secondaries of this primary
      nodesList.forEach((n) => {
        if (n.parent === hoveredNodeId) ids.add(n.id);
      });
      // Highlight associated primaries
      primaryNodes.forEach((pn) => {
        if (pn.id === hoveredNodeId) {
          // Add connections
          pn.desc && ids.add(pn.id);
        }
      });
    } else if (hoverNode.parent) {
      // Hovering secondary highlights parent and sibling secondaries
      ids.add(hoverNode.id);
      ids.add(hoverNode.parent);
      nodesList.forEach((n) => {
        if (n.parent === hoverNode.parent) ids.add(n.id);
      });
    }
    
    return ids;
  };

  const highlightedIds = getHighlightNodeIds();
  const activeNode = nodesList.find((n) => n.id === hoveredNodeId) || centerNode;

  return (
    <section
      id="ecosystem"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      {/* Background grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        
        {/* Header Block */}
        <div className="flex justify-between items-end mb-6 text-left">
          <div className="max-w-xl">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-2 font-semibold">
              03B. COGNITIVE SYNAPSE
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Ecosystem Network Map
            </h2>
            <p className="text-white/40 text-xs md:text-sm mt-2">
              Explore value flows and component links. Drag map to pan, scroll wheel to zoom. Hover nodes to trace strategic dependencies.
            </p>
          </div>
          
          {/* Zoom Controls HUD */}
          <div className="hidden md:flex gap-1.5 bg-black/60 border border-white/10 p-1 rounded font-mono text-[8px] tracking-wider backdrop-blur-md">
            <button onClick={zoomIn} className="p-1.5 hover:bg-white/5 text-white/70 hover:text-white cursor-pointer rounded-xs" title="Zoom In"><ZoomIn className="w-3.5 h-3.5" /></button>
            <button onClick={zoomOut} className="p-1.5 hover:bg-white/5 text-white/70 hover:text-white cursor-pointer rounded-xs" title="Zoom Out"><ZoomOut className="w-3.5 h-3.5" /></button>
            <button onClick={resetPan} className="p-1.5 hover:bg-white/5 text-white/70 hover:text-white cursor-pointer rounded-xs flex items-center gap-1 font-bold" title="Reset View"><Move className="w-3.5 h-3.5" /> RESET</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[65vh]">
          
          {/* Left Column: Interactive Force SVG */}
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            className="lg:col-span-7 flex items-center justify-center relative bg-black/35 border border-white/5 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing min-h-[300px]"
          >
            <div className="absolute top-3 left-3 font-mono text-[7px] text-white/30 uppercase tracking-widest flex items-center gap-1">
              <Move className="w-3 h-3 text-[#00F0FF]" /> Live Force Sandbox
            </div>

            {/* SVG Canvas */}
            <svg 
              viewBox="0 0 500 500" 
              className="w-full h-full max-h-[460px] relative z-10 overflow-visible select-none"
            >
              <defs>
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Drawing Group wrapped with pan/zoom transform */}
              <g 
                transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}
                transform-origin="250 250"
              >
                {/* 1. DRAW CONNECTION LINKS */}
                {nodesList.map((n) => {
                  if (n.id === "center") return null;

                  let parentNode = null;
                  if (n.isPrimary) {
                    parentNode = centerNode;
                  } else if (n.parent) {
                    parentNode = nodesList.find((pn) => pn.id === n.parent);
                  }

                  if (!parentNode) return null;

                  const isHovered = hoveredNodeId === n.id || hoveredNodeId === parentNode.id;
                  const isHighlighted = highlightedIds === null || (highlightedIds.has(n.id) && highlightedIds.has(parentNode.id));
                  const isDimmed = highlightedIds !== null && !isHighlighted;

                  return (
                    <g key={`link-${n.id}`} style={{ opacity: isDimmed ? 0.08 : 1, transition: "opacity 0.3s ease" }}>
                      {/* Base link line */}
                      <line
                        x1={parentNode.x}
                        y1={parentNode.y}
                        x2={n.x}
                        y2={n.y}
                        stroke="rgba(255, 255, 255, 0.04)"
                        strokeWidth="1.25"
                      />
                      {/* Glowing link line */}
                      {(isHovered || isHighlighted) && hoveredNodeId !== null && (
                        <line
                          x1={parentNode.x}
                          y1={parentNode.y}
                          x2={n.x}
                          y2={n.y}
                          stroke="#00F0FF"
                          strokeWidth="1"
                          strokeDasharray="4 6"
                          className="animate-[dash_1s_linear_infinite]"
                          style={{ filter: "url(#glow-cyan)" }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* 2. DRAW GRAPH NODES */}
                {nodesList.map((n) => {
                  const isCenter = n.id === "center";
                  const isHovered = hoveredNodeId === n.id;
                  const isHighlighted = highlightedIds === null || highlightedIds.has(n.id);
                  const isDimmed = highlightedIds !== null && !isHighlighted;

                  return (
                    <g
                      key={`node-${n.id}`}
                      transform={`translate(${n.x}, ${n.y})`}
                      onMouseEnter={() => setHoveredNodeId(n.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className="node-group cursor-pointer pointer-events-auto"
                      style={{ opacity: isDimmed ? 0.18 : 1, transition: "opacity 0.3s ease" }}
                    >
                      {/* Interactive hover circle rings */}
                      {isHovered && !isCenter && (
                        <circle cx="0" cy="0" r={n.isPrimary ? "12" : "9"} fill="none" stroke="#00F0FF" strokeWidth="0.5" className="animate-ping" />
                      )}

                      {/* Main Node Bubble */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isCenter ? "12" : n.isPrimary ? "5.5" : "3.5"}
                        fill="#030308"
                        stroke={isHovered ? "#00F0FF" : n.accentColor}
                        strokeWidth={isCenter ? "2" : isHovered ? "1.5" : "1"}
                        className="transition-transform duration-200"
                        style={{ transform: isHovered ? "scale(1.2)" : "scale(1)" }}
                      />

                      {/* Label Text */}
                      <text
                        x={isCenter ? "16" : n.isPrimary ? "10" : "8"}
                        y="2"
                        fill={isHovered ? "#00F0FF" : isCenter ? "#FFFFFF" : "rgba(255, 255, 255, 0.45)"}
                        fontSize={isCenter ? "6" : n.isPrimary ? "5" : "4"}
                        fontFamily="monospace"
                        fontWeight={isHovered || isCenter ? "bold" : "normal"}
                        letterSpacing="0.5"
                      >
                        {n.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Right Column: Briefing Dossier */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#04040c]/90 border border-white/5 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent"></div>
            
            <div>
              {/* Telemetry dossier panel header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                  <span className="font-mono text-[9px] tracking-wider text-white/80 font-bold">
                    COGNITIVE DOSSIER // INTELLIGENCE INGEST
                  </span>
                </div>
                <div className="flex gap-1.5 font-mono text-[8px] text-white/30 uppercase">
                  <span>SEG_ID: {activeNode.id.toUpperCase()}</span>
                </div>
              </div>

              {/* Dossier info content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] text-[#00F0FF] border border-[#00F0FF]/20 px-2 py-0.5 rounded bg-[#00F0FF]/5 font-bold uppercase">
                      {activeNode.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white mt-2 leading-tight uppercase tracking-tight">
                    {activeNode.name}
                  </h3>

                  <p className="text-white/70 text-xs md:text-sm mt-4 leading-relaxed font-sans border-l-2 border-[#00F0FF] pl-3">
                    {activeNode.desc}
                  </p>

                  {/* Connected Entity telemetry tracking list */}
                  {!activeNode.isPrimary && activeNode.parent && (
                    <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[8px] text-white/40">
                      <span>PARENT CORE SEGMENT:</span>
                      <div className="mt-1 flex items-center gap-1.5 text-white">
                        <span className="w-1 h-1 rounded-full bg-[#00F0FF]"></span>
                        <span>{activeNode.parent.toUpperCase()}</span>
                      </div>
                    </div>
                  )}

                  {activeNode.isPrimary && activeNode.id !== "center" && (
                    <div className="mt-5 pt-3 border-t border-white/5">
                      <span className="font-mono text-[8px] uppercase text-white/40 tracking-wider font-bold">
                        Linked Sub-assemblies
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2 font-mono text-[8px]">
                        {nodesList
                          .filter((n) => n.parent === activeNode.id)
                          .map((n) => (
                            <span 
                              key={n.id}
                              className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-white/70"
                            >
                              // {n.name.toUpperCase()}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Terminal Dossier footer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
              <span className="font-semibold uppercase text-[8px] tracking-widest text-[#00F0FF]">Ingest: Active</span>
              <span className="italic">Webinar Slide 03</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ChapterNavButton } from "@/components/chapter-nav-button";
import { usePresentation } from "@/components/presentation/use-presentation";
import { PresentationChrome } from "@/components/presentation/presentation-chrome";
import { motion, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  Cpu,
  Globe,
  Radio,
  ShieldAlert,
  Database,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Activity,
  Layers,
  Network,
  Zap,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA & CONSTANTS
// ---------------------------------------------------------------------------

const TOTAL_FRAMES = 11;
const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

const PRIVATE_ECOSYSTEM_SCENES = [
  { id: "hero", name: "The Indian Private Space Ecosystem", label: "01 / 11", startFrame: 0, endFrame: 0 },
  { id: "value-chain", name: "The Space Value Chain", label: "02 / 11", startFrame: 1, endFrame: 1 },
  { id: "overview", name: "Ecosystem Pillars", label: "03 / 11", startFrame: 2, endFrame: 2 },
  { id: "access", name: "Access to Space", label: "04 / 11", startFrame: 3, endFrame: 3 },
  { id: "building", name: "Building in Space", label: "05 / 11", startFrame: 4, endFrame: 4 },
  { id: "observing", name: "Observing Earth", label: "06 / 11", startFrame: 5, endFrame: 5 },
  { id: "connecting", name: "Connecting Space", label: "07 / 11", startFrame: 6, endFrame: 6 },
  { id: "managing", name: "Managing Space", label: "08 / 11", startFrame: 7, endFrame: 7 },
  { id: "magnificent-seven", name: "The Magnificent Seven", label: "09 / 11", startFrame: 8, endFrame: 8 },
  { id: "network", name: "Ecosystem Network Stack", label: "10 / 11", startFrame: 9, endFrame: 9 },
  { id: "conclusion", name: "The Connected Future", label: "11 / 11", startFrame: 10, endFrame: 10 },
];

const ECOSYSTEM_CATEGORIES = [
  {
    id: "access",
    title: "Access to Space",
    desc: "Propulsion and launchers paving low-cost pathways to custom orbits.",
    icon: Rocket,
    count: 4,
    color: "from-orange-500/20 to-red-500/20",
    glowColor: "rgba(255,107,0,0.15)",
    frame: 3,
  },
  {
    id: "building",
    title: "Building in Space",
    desc: "Modular satellite buses and orbital platforms engineered for rapid scale.",
    icon: Cpu,
    count: 3,
    color: "from-blue-500/20 to-indigo-500/20",
    glowColor: "rgba(0,162,255,0.15)",
    frame: 4,
  },
  {
    id: "observing",
    title: "Observing Earth",
    desc: "Hyperspectral and Synthetic Aperture Radar (SAR) multi-sensor payloads.",
    icon: Globe,
    count: 4,
    color: "from-emerald-500/20 to-teal-500/20",
    glowColor: "rgba(16,185,129,0.15)",
    frame: 5,
  },
  {
    id: "connecting",
    title: "Connecting Space",
    desc: "Gigabit-speed millimetre-wave and laser communication hardware.",
    icon: Radio,
    count: 2,
    color: "from-purple-500/20 to-pink-500/20",
    glowColor: "rgba(168,85,247,0.15)",
    frame: 6,
  },
  {
    id: "managing",
    title: "Managing Space",
    desc: "Space Situational Awareness (SSA) tracking debris and in-orbit servicing.",
    icon: ShieldAlert,
    count: 2,
    color: "from-cyan-500/20 to-teal-500/20",
    glowColor: "rgba(6,182,212,0.15)",
    frame: 7,
  },
  {
    id: "future",
    title: "The Future",
    desc: "Venture-backed market catalysts, edge hosting, and constellation nodes.",
    icon: Database,
    count: 8,
    color: "from-amber-500/20 to-yellow-500/20",
    glowColor: "rgba(255,184,0,0.15)",
    frame: 8,
  },
];

const STARTUPS_DATA = {
  access: [
    {
      name: "Skyroot Aerospace",
      tagline: "Opening space for everyone.",
      technology: "Vikram series launchers, solid & cryogenic engines",
      problemSolved: "Years of backlog delays for small payloads on state heavy lifters.",
      differentiator: "Highly modular carbon composite rocket bodies built for rapid assembly.",
      website: "https://skyroot.in",
      image: "/ecosystem/skyroot.png",
    },
    {
      name: "Agnikul Cosmos",
      tagline: "Bringing space within everyone's reach.",
      technology: "Agnibaan customizable rocket, 3D-printed engine",
      problemSolved: "Fixed rocket launch pads forcing compromises on target orbit inclinations.",
      differentiator: "World's first single-piece 3D-printed semi-cryogenic engine (Agnilet).",
      website: "https://agnikul.cosmonaut.co",
      image: "/ecosystem/agnikul.png",
    },
    {
      name: "Bellatrix Aerospace",
      tagline: "Next-generation satellite mobility.",
      technology: "Green chemical, electric Hall-effect & water thrusters",
      problemSolved: "Satellites stranded in suboptimal insertion orbits, running dry on fuel early.",
      differentiator: "Propulsion-first platforms running on non-toxic green fuels and pure water.",
      website: "https://bellatrix.aero",
      image: "/ecosystem/bellatrix.png",
    },
    {
      name: "EtherealX",
      tagline: "Building fully reusable launch vehicles.",
      technology: "Medium-lift reusable space launchers & engines",
      problemSolved: "Massive launch logistics costs due to discardable rocket booster stages.",
      differentiator: "Developing proprietary fully reusable launchers to crash the cost-per-kg to LEO.",
      website: "https://etherealx.space",
      image: "/ecosystem/etherealx.png",
    },
  ],
  building: [
    {
      name: "Dhruva Space",
      tagline: "Full-stack space engineering.",
      technology: "Modular satellite buses, deployers, and ground receivers",
      problemSolved: "Disjointed procurement forcing builders to source chassis, antennas separately.",
      differentiator: "End-to-end space mission solutions from custom bus design to telemetry loops.",
      website: "https://dhruvaspace.com",
      image: "/ecosystem/dhruva.png",
    },
    {
      name: "XDLINX Space Labs",
      tagline: "Redefining space platforms.",
      technology: "Compact sub-100kg satellite buses and payload arrays",
      problemSolved: "High capital requirements and slow turnaround times for advanced space platforms.",
      differentiator: "Extremely dense modular buses packing SAR, optical, and radio payloads together.",
      website: "https://xdlinx.com",
      image: "/ecosystem/xdlinx.png",
    },
    {
      name: "PierSight",
      tagline: "Persistent ocean surveillance.",
      technology: "Synthetic Aperture Radar (SAR) & AIS constellation",
      problemSolved: "Piracy, oil spills, and dark vessels hiding in cloud-covered oceans.",
      differentiator: "All-weather orbital sweep radars optimized specifically for maritime operations.",
      website: "https://piersight.com",
      image: "/ecosystem/piersight.png",
    },
  ],
  observing: [
    {
      name: "Pixxel",
      tagline: "Building a health monitor for the Earth.",
      technology: "High-resolution hyperspectral satellite constellations",
      problemSolved: "Standard RGB imagery failing to detect chemical leaks or crop stress early.",
      differentiator: "Imaging across dozens of bands, detecting agricultural and chemical changes from orbit.",
      website: "https://pixxel.space",
      image: "/ecosystem/pixxel.png",
    },
    {
      name: "GalaxEye",
      tagline: "All-weather multi-sensor orbital imaging.",
      technology: "Hybrid Drishti sensor combining SAR and Optical payloads",
      problemSolved: "Forcing space buyers to choose between radar (coarse) or optical (night blind) datasets.",
      differentiator: "Fusing Synthetic Aperture Radar and optical streams into a single co-registered file.",
      website: "https://galaxeye.space",
      image: "/ecosystem/galaxeye.png",
    },
    {
      name: "KaleidEO",
      tagline: "Edge-processed spatial intelligence.",
      technology: "In-orbit edge processing software & optical payloads",
      problemSolved: "Wasting precious downlink satellite bandwidth on cloud-covered or empty frames.",
      differentiator: "Real-time edge computation filtering and processing imagery directly on orbit.",
      website: "https://kaleideo.co",
      image: "/ecosystem/kaleideo.png",
    },
    {
      name: "SatSure",
      tagline: "Geospatial data for decision making.",
      technology: "Downstream geospatial analytics APIs and financial pipelines",
      problemSolved: "Banks and insurers unable to digest complex raw satellite coordinates.",
      differentiator: "Translating remote sensing data into direct crop yield and credit risk indices.",
      website: "https://satsure.co",
      image: "/ecosystem/satsure.png",
    },
  ],
  connecting: [
    {
      name: "Astrome",
      tagline: "Gigabit speed from space.",
      technology: "GigaMesh software-defined millimetre-wave antennas",
      problemSolved: "Congested channels and static, narrow communication beams in dense regions.",
      differentiator: "Dynamic millimetre-wave antennas generating dozens of gigabit-speed links.",
      website: "https://astrome.co",
      image: "/ecosystem/astrome.png",
    },
    {
      name: "Astrogate Labs",
      tagline: "Optical communication terminals.",
      technology: "Laser comm terminals for small-sats & ground points",
      problemSolved: "Radio frequency bandwidth limits and spectrum licensing restrictions.",
      differentiator: "Highly pointed laser terminals capable of downlinking gigabytes in seconds.",
      website: "https://astrogatelabs.com",
      image: "/ecosystem/astrogate.png",
    },
  ],
  managing: [
    {
      name: "Digantara",
      tagline: "Space situational awareness utility.",
      technology: "Space-based SSA sensors & orbit analysis software",
      problemSolved: "Atmospheric blocks preventing ground radars from tracking small debris.",
      differentiator: "Orbiting space-debris tracking sensors mapping centimeter-level debris coordinates.",
      website: "https://digantara.co.in",
      image: "/ecosystem/digantara.png",
    },
    {
      name: "InspeCity",
      tagline: "Building life in space.",
      technology: "In-orbit servicing platforms, robotic arms",
      problemSolved: "Million-dollar satellites becoming space junk from simple fuel exhaustion.",
      differentiator: "Active autonomous orbital servicing capable of refueling and fixing satellites in situ.",
      website: "https://inspecity.com",
      image: "/ecosystem/inspecity.png",
    },
  ],
};

const MAGNIFICENT_SEVEN = [
  {
    name: "Skyroot",
    tagline: "Opening space for everyone.",
    desc: "Pioneering private orbital launch capabilities in India using carbon composite rocket systems.",
    badge: "Launcher Integration",
    image: "/ecosystem/skyroot.png",
    highlight: "First Indian private firm to launch a rocket to space (Vikram-S).",
  },
  {
    name: "Agnikul",
    tagline: "Custom space access.",
    desc: "Manufacturing fully 3D-printed customizable rocket engines for targeted launches.",
    badge: "3D propulsion",
    image: "/ecosystem/agnikul.png",
    highlight: "Created the world's first single-piece 3D-printed engine, printed in 72 hours.",
  },
  {
    name: "Pixxel",
    tagline: "Earth's health monitor.",
    desc: "Building a constellation of hyperspectral satellites to identify chemical and environmental trends.",
    badge: "Hyperspectral",
    image: "/ecosystem/pixxel.png",
    highlight: "Detecting leaks, crop anomalies, and pollution before standard satellites see them.",
  },
  {
    name: "GalaxEye",
    tagline: "All-weather eye.",
    desc: "Propelling the world's first co-registered optical and radar mapping satellite sensor.",
    badge: "Optical + SAR fusion",
    image: "/ecosystem/galaxeye.png",
    highlight: "Fusing Synthetic Aperture Radar and optical streams on a single spacecraft.",
  },
  {
    name: "Dhruva Space",
    tagline: "Full-stack platforms.",
    desc: "Constructing modular satellite buses and deployers to scale spacecraft integration.",
    badge: "Spacecraft Bus",
    image: "/ecosystem/dhruva.png",
    highlight: "End-to-end mission delivery from mechanical deployers to telemetry ground arrays.",
  },
  {
    name: "Bellatrix",
    tagline: "Orbital propulsion.",
    desc: "Pioneering high-efficiency green chemical and water-based electric hall thrusters.",
    badge: "Electric propulsion",
    image: "/ecosystem/bellatrix.png",
    highlight: "Developed environment-friendly green propellants replacing toxic hydrazine.",
  },
  {
    name: "Digantara",
    tagline: "Orbital traffic control.",
    desc: "Cataloging space debris and orbital congestion parameters to protect multimillion-dollar payloads.",
    badge: "Space Traffic Control",
    image: "/ecosystem/digantara.png",
    highlight: "Launching space-based sensors to map and track space junk below 1cm sizes.",
  },
];

// ---------------------------------------------------------------------------
// HELPER COMPONENTS
// ---------------------------------------------------------------------------

function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] tracking-[0.25em] text-[#FFB800] uppercase font-bold block mb-4">
      {children}
    </span>
  );
}

function CustomEarth({
  scale = 1.0,
  interactive = false,
  satellitesCount = 4,
}: {
  scale?: number;
  interactive?: boolean;
  satellitesCount?: number;
}) {
  const earthRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrame: number;
    const startTime = performance.now();

    const loop = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const loopTime = elapsed % 24;

      if (earthRef.current) {
        const earthPos = -(loopTime / 24) * 100;
        earthRef.current.style.backgroundPositionX = `${earthPos}%`;
      }
      if (cloudsRef.current) {
        const cloudsPos = -(loopTime / 18) * 100;
        cloudsRef.current.style.backgroundPositionX = `${cloudsPos}%`;
      }

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center pointer-events-none select-none transition-transform duration-500 ease-out"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Outer atmosphere halo */}
      <div
        className="absolute rounded-full w-[248px] h-[248px] z-10 opacity-60 animate-pulse duration-[6000ms]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45) 0%, rgba(0,162,255,0.2) 30%, transparent 68%)",
        }}
      />

      {/* Masked Earth Sphere */}
      <div className="relative w-[240px] h-[240px] rounded-full overflow-hidden border border-white/10 z-20 shadow-[0_0_80px_rgba(0,162,255,0.15)] bg-black">
        {/* Sliding Landmass Surface Layer */}
        <div
          ref={earthRef}
          className="absolute inset-0 bg-cover bg-repeat-x opacity-95 brightness-[1.05]"
          style={{
            backgroundImage: "url('/earth_map.jpg')",
            backgroundSize: "auto 100%",
            willChange: "background-position",
          }}
        />

        {/* Sliding Clouds Layer */}
        <div
          ref={cloudsRef}
          className="absolute inset-0 bg-cover bg-repeat-x opacity-35 mix-blend-screen"
          style={{
            backgroundImage: "url('/earth_clouds.png')",
            backgroundSize: "auto 100%",
            willChange: "background-position",
          }}
        />

        {/* 3D Sphere Specular Shadow Overlay (Terminator / Shadow side) */}
        <div
          className="absolute inset-0 pointer-events-none z-22"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.92) 80%)",
          }}
        />
      </div>

      {/* Orbit paths & slow satellites */}
      <div className="absolute inset-0 z-30">
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 240 240">
          {/* Orbital path ellipses */}
          {Array.from({ length: satellitesCount }).map((_, idx) => {
            const rx = 140 + idx * 25;
            const ry = 60 + idx * 10;
            const rot = -15 + idx * 15;
            return (
              <g key={idx} style={{ transform: `rotate(${rot}deg)`, transformOrigin: "center" }}>
                <ellipse
                  cx="120"
                  cy="120"
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke="rgba(255, 184, 0, 0.08)"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                />
                <circle cx="120" cy="120" r="2" fill="#FFB800" className="animate-ping" style={{ animationDelay: `${idx * 0.8}s` }} />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// STARTUP CARD COMPONENT
// ---------------------------------------------------------------------------

function StartupCard({ startup }: { startup: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col justify-between bg-[#0a0a14]/60 border border-white/10 hover:border-[#FFB800]/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 pointer-events-auto h-[440px] md:h-[420px]"
    >
      {/* Visual illustration box */}
      <div className="relative w-full h-[180px] overflow-hidden bg-black/40 border-b border-white/5">
        <img
          src={startup.image}
          alt={startup.name}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 scale-[1.01] group-hover:scale-105 transition-all duration-[800ms] ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/20 to-transparent opacity-85" />
        
        {/* Subtle grid/blueprint overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

        {/* Glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: "radial-gradient(circle 80px at 50% 50%, rgba(255,184,0,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col justify-between p-5 relative z-10">
        <div>
          <h3 className="text-base font-bold tracking-wide text-white uppercase group-hover:text-[#FFB800] transition-colors duration-300">
            {startup.name}
          </h3>
          <span className="text-[10px] text-white/50 font-mono tracking-wider italic block mb-3">
            &ldquo;{startup.tagline}&rdquo;
          </span>

          <div className="flex flex-col gap-1 text-[11px] leading-relaxed text-white/70">
            <div>
              <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block">Technology:</span>
              <span className="font-light">{startup.technology}</span>
            </div>
            {/* Sliding drawers reveal details on hover */}
            <div className="h-0 group-hover:h-[68px] overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out mt-1">
              <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block">Core Problem Solved:</span>
              <span className="font-light text-white/60 block line-clamp-2">{startup.problemSolved}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-2">
          <div className="text-[11px]">
            <span className="font-mono text-[9px] text-white/40 uppercase block tracking-wider">Key Differentiator:</span>
            <span className="font-light text-[#FFB800]/80 line-clamp-1">{startup.differentiator}</span>
          </div>

          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 bg-[#FFB800]/10 hover:bg-[#FFB800] border border-[#FFB800]/20 hover:border-transparent text-[#FFB800] hover:text-[#030308] font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded transition-all duration-300 cursor-pointer"
          >
            Visit Site <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// INDIVIDUAL SLIDE SCENE COMPONENTS
// ---------------------------------------------------------------------------

function Scene0Hero({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      {/* Animated Earth Backdrop */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#030308]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.025]" />
        <div className="absolute scale-[1.3] opacity-35 md:opacity-60 md:scale-[1.8] translate-y-[20%]">
          <CustomEarth scale={1.0} satellitesCount={5} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030308]/40 to-[#030308] z-10" />
      </div>

      <div className="relative z-20 text-center max-w-4xl px-4 flex flex-col items-center">
        <SceneLabel>Chapter V. The Ecosystem</SceneLabel>
        
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white leading-none uppercase mb-6"
          style={{ fontFamily: "Aptos, sans-serif" }}
        >
          The Indian <br className="hidden sm:inline" />
          <span className="text-[#FFB800]">Private Space</span> <br />
          Ecosystem
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl leading-relaxed mb-8 font-light">
          More than rockets. A complete commercial space economy is emerging, driven by private capital, sovereign policy, and breakthrough engineering stacks.
        </p>

        {!presentationActive && (
          <div className="flex flex-col items-center gap-2 font-mono text-[9px] text-[#FFB800]/70 tracking-[0.25em] uppercase pointer-events-none">
            <span>Scroll to begin</span>
            <span className="w-px h-8 bg-[#FFB800]/30 relative overflow-hidden rounded-full block">
              <span className="absolute top-0 inset-x-0 h-3 bg-[#FFB800] rounded-full animate-bounce" />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

function Scene1ValueChain({ progress }: { progress: any }) {
  const layers = [
    { name: "Launch Vehicles", desc: "Access infrastructure", color: "text-orange-400" },
    { name: "Satellite Manufacturing", desc: "Space systems & payloads", color: "text-blue-400" },
    { name: "Earth Observation", desc: "Spectral data acquisition", color: "text-emerald-400" },
    { name: "Communications", desc: "Orbital telemetry & links", color: "text-purple-400" },
    { name: "Infrastructure", desc: "Ground segments & utilities", color: "text-cyan-400" },
    { name: "Applications", desc: "Downstream commercial software", color: "text-yellow-400" },
    { name: "Data Intelligence", desc: "Decision analytics", color: "text-pink-400" },
  ];

  return (
    <div className="max-w-4xl text-center px-4 w-full">
      <SceneLabel>The Value Chain Flow</SceneLabel>
      <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-6 uppercase">
        Mapping The Ecosystem Layers
      </h2>
      
      <p className="text-xs sm:text-sm text-white/50 mb-10 max-w-xl mx-auto">
        India&apos;s space tech has evolved from simple hardware suppliers into an interconnected, multi-layered vertical stack.
      </p>

      {/* Connected nodes line */}
      <div className="relative flex flex-col items-center gap-4 max-w-md mx-auto">
        <div className="absolute top-2 bottom-2 w-px bg-white/10 left-1/2 -translate-x-1/2 z-0" />

        {layers.map((layer, idx) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0.15, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="relative z-10 flex items-center gap-4 bg-[#0a0a14] border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-full w-full justify-between group cursor-pointer pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-white/30 group-hover:text-[#FFB800]">0{idx+1}</span>
              <span className="text-xs font-semibold text-white uppercase tracking-wider">{layer.name}</span>
            </div>
            <span className={`text-[10px] font-mono ${layer.color}`}>{layer.desc}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Scene2Overview({ onSelectCategory }: { onSelectCategory: (idx: number) => void }) {
  return (
    <div className="max-w-6xl text-center px-4 w-full">
      <SceneLabel>Ecosystem Structure</SceneLabel>
      <h2 className="text-xl sm:text-3xl font-black text-white uppercase mb-4 tracking-tight">
        Explore The Pillars
      </h2>
      <p className="text-xs sm:text-sm text-white/55 max-w-lg mx-auto mb-10">
        Click on any structural category below to jump directly to its startup reports.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pointer-events-auto">
        {ECOSYSTEM_CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.frame)}
              className="group text-left p-5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#FFB800]/40 transition-all duration-300 relative overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Radial card hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle 90px at 80% 20%, ${cat.glowColor}, transparent 100%)`,
                }}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-white/[0.03] text-white/70 group-hover:text-[#FFB800] group-hover:bg-[#FFB800]/10 border border-white/5 group-hover:border-[#FFB800]/25 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[9px] text-[#FFB800]/80 font-bold bg-[#FFB800]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {cat.count} Companies
                </span>
              </div>

              <h3 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-[#FFB800] transition-colors mb-2">
                {cat.title}
              </h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SceneCategoryStartups({
  title,
  desc,
  category,
  startups,
  icon: Icon,
}: {
  title: string;
  desc: string;
  category: string;
  startups: any[];
  icon: any;
}) {
  return (
    <div className="max-w-7xl text-center px-4 w-full flex flex-col justify-center h-full py-16 md:py-8 overflow-y-auto no-scrollbar">
      <div className="mb-8 md:mb-6 max-w-2xl mx-auto flex flex-col items-center">
        <div className="p-2.5 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] mb-4">
          <Icon className="w-5 h-5" />
        </div>
        <SceneLabel>{category}</SceneLabel>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight mb-2">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl leading-relaxed font-light">
          {desc}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto max-w-6xl mx-auto w-full">
        {startups.map((startup) => (
          <StartupCard key={startup.name} startup={startup} />
        ))}
      </div>
    </div>
  );
}

function SceneMagnificentSeven() {
  return (
    <div className="max-w-7xl text-center px-4 w-full flex flex-col justify-center h-full py-16 md:py-8 overflow-y-auto no-scrollbar">
      <div className="mb-8 md:mb-6 flex flex-col items-center">
        <SceneLabel>Sovereign Anchors</SceneLabel>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none mb-3">
          The Magnificent Seven
        </h2>
        <p className="text-xs sm:text-sm text-white/55 max-w-2xl leading-relaxed font-light">
          The structural anchors defining the capability base of India&apos;s commercial space flight.
        </p>
      </div>

      {/* Bento-style Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 pointer-events-auto max-w-6xl mx-auto w-full">
        {MAGNIFICENT_SEVEN.map((m, idx) => (
          <div
            key={m.name}
            className={`group relative flex flex-col justify-between p-5 bg-[#0a0a14]/70 border border-white/10 hover:border-[#FFB800]/40 rounded-xl transition-all duration-300 overflow-hidden shadow-lg h-[240px] ${
              [0, 3, 6].includes(idx) ? "lg:col-span-2" : "lg:col-span-1"
            }`}
          >
            {/* Backdrop image */}
            <div className="absolute inset-0 z-0">
              <img
                src={m.image}
                alt={m.name}
                className="w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-transparent" />
            </div>

            <div className="relative z-10 text-left">
              <span className="font-mono text-[8px] bg-[#FFB800]/10 text-[#FFB800] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
                {m.badge}
              </span>
              <h3 className="text-base font-bold text-white uppercase tracking-wide mt-3 group-hover:text-[#FFB800] transition-colors">
                {m.name}
              </h3>
              <p className="text-[11px] text-white/50 leading-relaxed font-light mt-1.5">
                {m.desc}
              </p>
            </div>

            <div className="relative z-10 text-left pt-2 border-t border-white/5 mt-2 h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-[10px] text-[#FFB800]/90 font-light leading-snug">
                {m.highlight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneNetworkStack() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const stack = [
    {
      id: "launch",
      name: "Launch Services",
      desc: "Orbital transport & rockets",
      companies: ["Skyroot", "Agnikul", "EtherealX"],
      related: ["satellites", "infrastructure"],
    },
    {
      id: "satellites",
      name: "Satellites & Payloads",
      desc: "Hardware bus & sensors",
      companies: ["Dhruva Space", "XDLINX", "Bellatrix"],
      related: ["launch", "infrastructure", "applications"],
    },
    {
      id: "infrastructure",
      name: "Infrastructure & TTC",
      desc: "Ground stations & communication terminals",
      companies: ["Astrogate", "Astrome", "InspeCity"],
      related: ["launch", "satellites", "applications"],
    },
    {
      id: "applications",
      name: "Applications & Software",
      desc: "Observation, tracking & analytics APIs",
      companies: ["Pixxel", "GalaxEye", "KaleidEO", "SatSure", "Digantara"],
      related: ["satellites", "infrastructure", "users"],
    },
    {
      id: "users",
      name: "End Users",
      desc: "Enterprise, Agriculture, Climate & Defence",
      companies: ["Fintech Labs", "Energy Grids", "Defense Forces", "Global Logistics"],
      related: ["applications"],
    },
  ];

  return (
    <div className="max-w-4xl text-center px-4 w-full flex flex-col justify-center h-full">
      <SceneLabel>Space Stack</SceneLabel>
      <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none mb-3">
        Ecosystem Network Stack
      </h2>
      <p className="text-xs sm:text-sm text-white/55 max-w-xl mx-auto mb-10 leading-relaxed">
        Hover over a node layer in the Space Stack to visualize integration pathways and related dependencies.
      </p>

      {/* Network Nodes Column */}
      <div className="flex flex-col gap-4 pointer-events-auto max-w-xl mx-auto w-full relative">
        {stack.map((node) => {
          const isActive = activeNode === node.id;
          const isRelated = activeNode ? stack.find((s) => s.id === activeNode)?.related.includes(node.id) : false;

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`relative z-10 flex flex-col p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#FFB800]/10 border-[#FFB800] shadow-[0_0_20px_rgba(255,184,0,0.15)]"
                  : isRelated
                  ? "bg-white/[0.04] border-[#FFB800]/40"
                  : activeNode
                  ? "bg-white/[0.01] border-white/5 opacity-30"
                  : "bg-white/[0.02] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{node.name}</span>
                <span className={`text-[10px] font-mono ${isActive ? "text-[#FFB800]" : "text-white/40"}`}>
                  {node.desc}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {node.companies.map((c) => (
                  <span
                    key={c}
                    className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                      isActive
                        ? "bg-[#FFB800]/10 border-[#FFB800]/30 text-[#FFB800]"
                        : "bg-white/5 border-white/10 text-white/70"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SceneConclusion({ presentationActive }: { presentationActive: boolean }) {
  const logos = [
    "Skyroot", "Agnikul", "Pixxel", "GalaxEye", "Dhruva", "Bellatrix", 
    "Digantara", "EtherealX", "XDLINX", "PierSight", "KaleidEO", 
    "SatSure", "Astrome", "Astrogate", "InspeCity", "TakeMe2Space"
  ];

  return (
    <>
      {/* Constellation Backdrop */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute scale-[1.1] md:scale-[1.5]">
          <CustomEarth scale={1.0} satellitesCount={4} />
        </div>

        {/* Orbiting text node clouds */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {logos.map((logo, idx) => {
            const angle = (idx / logos.length) * Math.PI * 2;
            const orbitRadius = 260 + (idx % 3) * 50;
            const duration = 20 + (idx % 4) * 8;
            
            return (
              <motion.div
                key={logo}
                className="absolute text-[9px] font-mono bg-white/[0.02] border border-white/10 px-2 py-1 rounded-full text-white/50 tracking-wider font-bold select-none"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformOrigin: "center",
                  width: orbitRadius * 2,
                  height: orbitRadius * 2,
                }}
              >
                <div 
                  className="absolute"
                  style={{
                    top: "0px",
                    left: `${orbitRadius}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {logo}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl text-center px-4 flex flex-col items-center justify-center h-full mx-auto pb-12">
        <SceneLabel>The Conclusion</SceneLabel>

        <h2
          className="text-xl sm:text-3xl lg:text-4xl font-light tracking-wide text-white max-w-3xl leading-snug mb-4 relative z-10"
        >
          The next decade won&apos;t be defined by one company. <br />
          <span className="text-[#FFB800] font-bold">It will be defined by an ecosystem.</span>
        </h2>

        <p className="text-[11px] sm:text-xs text-white/60 max-w-xl leading-relaxed mb-6 font-light relative z-10 text-center">
          Liberalized commercial frameworks, collaborative state assets under IN-SPACe, and private venture integration are converging. India&apos;s space sector is set to represent the primary high-yield logistics infrastructure of the global orbit.
        </p>

        {!presentationActive && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10 pointer-events-auto">
            <ChapterNavButton
              href="/chapters/satellites"
              label="Back to Satellites"
              variant="ghost"
              direction="back"
            />
            <Link
              href="/"
              className="interactive-control flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FFB800] hover:bg-[#cc9300] text-[#030308] font-mono text-xs uppercase tracking-widest rounded-full font-bold shadow-lg transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Main Deck
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// MAIN CHAPTER PAGE
// ---------------------------------------------------------------------------

export default function PrivateEcosystemPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef, goToFrame } = p;

  // Scroll transforms for 11 frames
  const s0Opacity = useTransform(progress, [0.0, 0.05, 0.09], [1, 1, 0]);
  const s0Scale = useTransform(progress, [0.0, 0.09], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.05, 0.09, 0.14, 0.18], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.05, 0.09, 0.14, 0.18], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.14, 0.18, 0.23, 0.27], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.14, 0.18, 0.23, 0.27], [24, 0, 0, -24]);

  const s3Opacity = useTransform(progress, [0.23, 0.27, 0.32, 0.36], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.23, 0.27, 0.32, 0.36], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.32, 0.36, 0.41, 0.45], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.32, 0.36, 0.41, 0.45], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.41, 0.45, 0.50, 0.54], [0, 1, 1, 0]);
  const s5Y = useTransform(progress, [0.41, 0.45, 0.50, 0.54], [24, 0, 0, -24]);

  const s6Opacity = useTransform(progress, [0.50, 0.54, 0.59, 0.63], [0, 1, 1, 0]);
  const s6Y = useTransform(progress, [0.50, 0.54, 0.59, 0.63], [24, 0, 0, -24]);

  const s7Opacity = useTransform(progress, [0.59, 0.63, 0.68, 0.72], [0, 1, 1, 0]);
  const s7Y = useTransform(progress, [0.59, 0.63, 0.68, 0.72], [24, 0, 0, -24]);

  const s8Opacity = useTransform(progress, [0.68, 0.72, 0.77, 0.81], [0, 1, 1, 0]);
  const s8Y = useTransform(progress, [0.68, 0.72, 0.77, 0.81], [24, 0, 0, -24]);

  const s9Opacity = useTransform(progress, [0.77, 0.81, 0.86, 0.90], [0, 1, 1, 0]);
  const s9Y = useTransform(progress, [0.77, 0.81, 0.86, 0.90], [24, 0, 0, -24]);

  const s10Opacity = useTransform(progress, [0.86, 0.90, 1.0], [0, 1, 1]);
  const s10Scale = useTransform(progress, [0.86, 0.90], [0.96, 1]);

  return (
    <div className="min-h-screen bg-[#030308] text-[#f4f4f7] font-sans selection:bg-[#FFB800] selection:text-[#030308] relative overflow-x-hidden">
      <Navbar />
      <PresentationChrome controller={p} scenes={PRIVATE_ECOSYSTEM_SCENES} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[1100vh] bg-[#030308]">
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#030308] z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-0" />

          {/* PRESENTATION MODE */}
          {presentationActive && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`frame-${currentFrameIndex}`}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.01 }}
                transition={{ duration: 0.48, ease: [0.25, 1, 0.5, 1] }}
                className={`${[0, 10].includes(currentFrameIndex) ? "absolute inset-0 w-full h-full z-10 pointer-events-auto" : SLIDE_BASE} text-center pointer-events-auto h-full`}
              >
                {currentFrameIndex === 0 && <Scene0Hero presentationActive={true} />}
                {currentFrameIndex === 1 && <Scene1ValueChain progress={progress} />}
                {currentFrameIndex === 2 && <Scene2Overview onSelectCategory={goToFrame} />}
                {currentFrameIndex === 3 && (
                  <SceneCategoryStartups
                    title="Access to Space"
                    desc="High-frequency propulsion platforms, reusable systems, and customizable launchers."
                    category="Upstream Logistics"
                    startups={STARTUPS_DATA.access}
                    icon={Rocket}
                  />
                )}
                {currentFrameIndex === 4 && (
                  <SceneCategoryStartups
                    title="Building in Space"
                    desc="Modular spacecraft bus interfaces, payload deployers, and persistent ocean surveillance."
                    category="Hardware Segment"
                    startups={STARTUPS_DATA.building}
                    icon={Cpu}
                  />
                )}
                {currentFrameIndex === 5 && (
                  <SceneCategoryStartups
                    title="Observing Earth"
                    desc="Hyperspectral constellations, Optical + SAR hybrid sensor streams, and edge computing imagery."
                    category="Downstream Software"
                    startups={STARTUPS_DATA.observing}
                    icon={Globe}
                  />
                )}
                {currentFrameIndex === 6 && (
                  <SceneCategoryStartups
                    title="Connecting Space"
                    desc="Gigabit millimetre-wave communications and laser terminal transceivers."
                    category="Midstream Utilities"
                    startups={STARTUPS_DATA.connecting}
                    icon={Radio}
                  />
                )}
                {currentFrameIndex === 7 && (
                  <SceneCategoryStartups
                    title="Managing Space"
                    desc="Space debris tracking databases, situational safety radars, and in-orbit spacecraft refuelers."
                    category="Strategic Security"
                    startups={STARTUPS_DATA.managing}
                    icon={ShieldAlert}
                  />
                )}
                {currentFrameIndex === 8 && <SceneMagnificentSeven />}
                {currentFrameIndex === 9 && <SceneNetworkStack />}
                {currentFrameIndex === 10 && <SceneConclusion presentationActive={true} />}
              </motion.div>
            </AnimatePresence>
          )}

          {/* SCROLL MODE */}
          {!presentationActive && (
            <>
              <motion.div
                style={{ opacity: s0Opacity, scale: s0Scale }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              >
                <Scene0Hero presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s1Opacity, y: s1Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene1ValueChain progress={progress} />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene2Overview onSelectCategory={goToFrame} />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneCategoryStartups
                  title="Access to Space"
                  desc="High-frequency propulsion platforms, reusable systems, and customizable launchers."
                  category="Upstream Logistics"
                  startups={STARTUPS_DATA.access}
                  icon={Rocket}
                />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneCategoryStartups
                  title="Building in Space"
                  desc="Modular spacecraft bus interfaces, payload deployers, and persistent ocean surveillance."
                  category="Hardware Segment"
                  startups={STARTUPS_DATA.building}
                  icon={Cpu}
                />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 5 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneCategoryStartups
                  title="Observing Earth"
                  desc="Hyperspectral constellations, Optical + SAR hybrid sensor streams, and edge computing imagery."
                  category="Downstream Software"
                  startups={STARTUPS_DATA.observing}
                  icon={Globe}
                />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 6 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneCategoryStartups
                  title="Connecting Space"
                  desc="Gigabit millimetre-wave communications and laser terminal transceivers."
                  category="Midstream Utilities"
                  startups={STARTUPS_DATA.connecting}
                  icon={Radio}
                />
              </motion.div>

              <motion.div
                style={{ opacity: s7Opacity, y: s7Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 7 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneCategoryStartups
                  title="Managing Space"
                  desc="Space debris tracking databases, situational safety radars, and in-orbit spacecraft refuelers."
                  category="Strategic Security"
                  startups={STARTUPS_DATA.managing}
                  icon={ShieldAlert}
                />
              </motion.div>

              <motion.div
                style={{ opacity: s8Opacity, y: s8Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 8 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneMagnificentSeven />
              </motion.div>

              <motion.div
                style={{ opacity: s9Opacity, y: s9Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 9 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneNetworkStack />
              </motion.div>

              <motion.div
                style={{ opacity: s10Opacity, scale: s10Scale }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              >
                <SceneConclusion presentationActive={false} />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

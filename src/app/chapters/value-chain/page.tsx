"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { ChapterNavButton } from "@/components/chapter-nav-button";
import { usePresentation } from "@/components/presentation/use-presentation";
import { PresentationChrome } from "@/components/presentation/presentation-chrome";
import { motion, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Smartphone,
  Tv,
  Rocket,
  Factory,
  Satellite,
  RadioTower,
  Landmark,
  TrendingUp,
  Gauge,
  Layers,
  Globe2,
  Calendar,
  Zap,
  Shield,
  Activity,
  Coins,
  Server,
  Radio,
  FileText,
  User,
  Users,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA & CONFIG
// ---------------------------------------------------------------------------

const LAYERS = [
  {
    id: "launch",
    flow: "Upstream",
    name: "Launch Services",
    icon: Rocket,
    value: 9.3,
    valueLabel: "$9.3B",
    share: "2.2%",
    width: 18,
    note: "Grew 30% in 2024 across 259 launches (224 commercial). SpaceX took roughly 65% of global launch revenue.",
    sub: [
      "Smallest commercial segment by revenue",
      "The strategic gate everything upstream and downstream depends on",
    ],
  },
  {
    id: "manufacturing",
    flow: "Upstream",
    name: "Satellite Manufacturing",
    icon: Factory,
    value: 20,
    valueLabel: "$20B",
    share: "5%",
    width: 30,
    note: "Grew 17% in 2024 but concentrated in the US (69% share). Outside the US, revenue fell from $9.3B to $6.3B.",
    sub: [
      "About 82% of US manufacturing revenue is government contracts",
      "Capability heavy, revenue light",
    ],
  },
  {
    id: "services",
    flow: "Downstream",
    name: "Satellite Services",
    icon: Satellite,
    value: 108,
    valueLabel: "$108B",
    share: "26%",
    width: 70,
    note: "Consumer TV, radio and broadband at $85B (satellite TV and DTH alone near $72B and declining), plus remote sensing near $14B and enterprise or government near $9B.",
    sub: [
      "Broadband (Starlink, OneWeb) is the growth engine",
      "Earth observation data is the second engine",
    ],
  },
  {
    id: "ground",
    flow: "Downstream",
    name: "Ground Segment",
    icon: RadioTower,
    value: 155,
    valueLabel: "$155B",
    share: "37%",
    width: 100,
    note: "Mostly GNSS navigation chips in consumer devices near $119B, plus network ground equipment near $22B and other consumer ground equipment near $14B.",
    sub: [
      "The single largest segment of the entire economy",
      "Chips inside the phone in your pocket",
    ],
  },
];

// Expanded 7-stage value chain data
const DETAILED_STAGES = [
  {
    id: "launch",
    name: "Launch",
    value: "Upstream",
    companies: "Skyroot, Agnikul, Bellatrix",
    valueCreated: "Responsive rocket deployment and dedicated satellite orbital placement.",
    opportunity: "$15B global payload insertion demand by 2030.",
    icon: Rocket,
  },
  {
    id: "satellites",
    name: "Satellites",
    value: "Upstream",
    companies: "Dhruva Space, XDLINX, PierSight, Astra Microwave, Centum Electronics",
    valueCreated: "Custom spacecraft bus construction and payload integration.",
    opportunity: "$32B satellite assembly pipelines globally.",
    icon: Factory,
  },
  {
    id: "ground",
    name: "Ground Segment",
    value: "Midstream",
    companies: "Digantara, Astrogate Labs",
    valueCreated: "Tracking, telemetry, laser downlinks, and terminal receivers.",
    opportunity: "$155B navigation chips and transceiver components.",
    icon: RadioTower,
  },
  {
    id: "communications",
    name: "Communications",
    value: "Downstream",
    companies: "Astrome, OneWeb",
    valueCreated: "Gigabit speed millimetre wave backhaul and satellite broadband.",
    opportunity: "$120B consumer satellite broadband markets.",
    icon: Radio,
  },
  {
    id: "observation",
    name: "Earth Observation",
    value: "Downstream",
    companies: "Pixxel, GalaxEye, KaleidEO",
    valueCreated: "Hyperspectral and hybrid radar optical planetary scanning.",
    opportunity: "$18B crop health and climate risk dataset markets.",
    icon: Globe2,
  },
  {
    id: "applications",
    name: "Applications",
    value: "Downstream",
    companies: "SatSure, TakeMe2Space",
    valueCreated: "Geospatial data APIs, agricultural risk models, and edge hosting.",
    opportunity: "$380B downstream analytics and cloud services.",
    icon: Server,
  },
  {
    id: "users",
    name: "End Users",
    value: "Market",
    companies: "Defence, Agri-cooperatives, Logistics",
    valueCreated: "Strategic security, crop insurance, and maritime dark vessel tracking.",
    opportunity: "Trillions of dollars of global enterprise efficiency.",
    icon: Users,
  },
];

const GOV_CARDS = [
  {
    title: "Indian Space Policy 2023",
    desc: "Establishes a comprehensive framework for private players and outlines distinct roles.",
    detail: "The policy clarifies that ISRO will transition out of commercial operations to focus on advanced research, leaving satellite communications and launcher markets open to private firms.",
    icon: FileText,
  },
  {
    title: "IN-SPACe",
    desc: "Operates as a single window regulatory clearing agency for all private launches.",
    detail: "IN-SPACe permits, authorizes, and facilitates the use of ISRO launch facilities, test stands, and clean rooms by private companies under non-discriminatory leases.",
    icon: Landmark,
  },
  {
    title: "NSIL",
    desc: "Acts as the commercial arm to commercialize public space technologies and launch missions.",
    detail: "New Space India Limited manages commercial rocket launches, coordinates technology transfers, and interfaces with global buyers seeking Indian orbital capabilities.",
    icon: Coins,
  },
  {
    title: "FDI Liberalisation",
    desc: "Permits up to 100 percent foreign investment to spark interest from global venture funds.",
    detail: "Foreign investment limits are raised to 74 percent for satellite manufacturing and 49 percent for launch systems without government routes, and 100 percent for components.",
    icon: Zap,
  },
  {
    title: "Technology Adoption Fund",
    desc: "A strategic financial reserve designated to seed early stage space research.",
    detail: "A dedicated sovereign fund designed to bridge the funding gap for deep tech hardware startups undertaking high-risk research and developmental cycles.",
    icon: Activity,
  },
];

const TOTAL_FRAMES = 11;

const VALUE_CHAIN_SCENES = [
  { id: "hero", name: "Value Chain Intro", label: "01 / 11", startFrame: 0, endFrame: 0 },
  { id: "changed", name: "The New Space Network", label: "02 / 11", startFrame: 1, endFrame: 1 },
  { id: "reframe", name: "Downstream Focus", label: "03 / 11", startFrame: 2, endFrame: 2 },
  { id: "stack", name: "Commercial Value Chain", label: "04 / 11", startFrame: 3, endFrame: 3 },
  { id: "revenue", name: "Revenue Structure", label: "05 / 11", startFrame: 4, endFrame: 4 },
  { id: "structure", name: "Complexity Insight", label: "06 / 11", startFrame: 5, endFrame: 5 },
  { id: "india", name: "India Opportunity", label: "07 / 11", startFrame: 6, endFrame: 6 },
  { id: "capital", name: "Funding Velocity", label: "08 / 11", startFrame: 7, endFrame: 7 },
  { id: "why-matters", name: "Value Flow Diagram", label: "09 / 11", startFrame: 8, endFrame: 8 },
  { id: "startup-explosion", name: "Ecosystem Explosion", label: "10 / 11", startFrame: 9, endFrame: 9 },
  { id: "thesis", name: "The Chapter Thesis", label: "11 / 11", startFrame: 10, endFrame: 10 },
];

const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

// ---------------------------------------------------------------------------
// SHARED UI COMPONENTS
// ---------------------------------------------------------------------------

function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] tracking-[0.32em] text-[#FFB800] uppercase font-bold block mb-3">
      {children}
    </span>
  );
}

function SceneHeading({ sub, main }: { sub: string; main: React.ReactNode }) {
  return (
    <div className="max-w-3xl mb-8 text-center mx-auto">
      <SceneLabel>{sub}</SceneLabel>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
        {main}
      </h2>
    </div>
  );
}

function OrbitalRingBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[440, 620, 800, 980].map((r, i) => (
        <div
          key={r}
          className="absolute rounded-full border border-white/[0.025]"
          style={{
            width: r,
            height: r,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 1 - i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

function SourceLine() {
  return (
    <p className="mt-4 text-[9px] text-white/35 font-mono uppercase tracking-[0.2em] text-center">
      Source: BryceTech / Satellite Industry Association 2025, Space Foundation 2025 Q2
    </p>
  );
}

function Counter({
  end,
  suffix = "",
  duration = 1.2,
  active,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, active]);

  return <span className="font-extrabold text-[#FFB800]">{count}{suffix}</span>;
}

// ---------------------------------------------------------------------------
// SCENE COMPONENTS
// ---------------------------------------------------------------------------

// 0. HERO (Existing)
function Scene0Hero({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/earth_orbit_cinematic.png"
          alt="Earth seen from orbit"
          fill
          priority
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/70 via-[#030308]/20 to-[#030308]/95" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at center, transparent 25%, #030308 90%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center text-center">
        <SceneLabel>Chapter XII. Where The Money Is</SceneLabel>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6">
          The Value
          <br />
          <span className="text-[#FFB800]">Chain</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
          The largest revenues in space do not come from rockets or satellites.
          They come from the chips inside your smartphone and the dish on your
          roof. The real GDP of space happens on the ground.
        </p>

        <div className="grid grid-cols-3 gap-0 border border-white/10 rounded-2xl overflow-hidden font-mono mb-10 w-full max-w-xl">
          {[
            { val: "$415B", label: "Commercial economy, 2024" },
            { val: "37%", label: "Ground segment share" },
            { val: "2.2%", label: "Launch share" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-5 px-3 bg-black/20 backdrop-blur-sm ${i !== 2 ? "border-r border-white/10" : ""}`}
            >
              <span className="text-2xl font-extrabold text-[#FFB800] block">{s.val}</span>
              <span className="text-[9px] uppercase text-white/55 tracking-wider font-bold">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {!presentationActive && (
          <div className="flex flex-col items-center gap-2 font-mono text-[9px] text-[#FFB800]/70 tracking-[0.25em] uppercase">
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

// 1. NEW SECTION: "The Space Economy Has Changed"
function SceneChanged({ active }: { active: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!active) {
      setExpanded(false);
      return;
    }
    const timer = setTimeout(() => {
      setExpanded(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [active]);

  const nodes = [
    { id: "skyroot", name: "Skyroot", category: "Launcher Node", x: 100, y: 120, info: "First private launch operator." },
    { id: "agnikul", name: "Agnikul", category: "Propulsion Node", x: 280, y: 100, info: "Single piece 3D printed engines." },
    { id: "bellatrix", name: "Bellatrix", category: "Mobility Node", x: 380, y: 180, info: "Water thrusters and electric thrusters." },
    { id: "pixxel", name: "Pixxel", category: "Observation Node", x: 350, y: 340, info: "Hyperspectral satellite constellations." },
    { id: "galaxeye", name: "GalaxEye", category: "Radar Node", x: 260, y: 380, info: "SAR and optical data fusion." },
    { id: "dhruva", name: "Dhruva Space", category: "Hardware Node", x: 90, y: 320, info: "Modular spacecraft bus assembly." },
    { id: "digantara", name: "Digantara", category: "SSA Node", x: 70, y: 220, info: "Debris tracking and orbit safety." },
    { id: "satsure", name: "SatSure", category: "Analytics Node", x: 220, y: 260, info: "Downstream agricultural financial data." },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10 px-4">
      <div className="lg:col-span-5 text-left flex flex-col justify-center">
        <SceneLabel>The Shift</SceneLabel>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase mb-6">
          The space industry is no longer just ISRO.
        </h2>
        <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
          India&apos;s space ecosystem has evolved into a collaborative network of government agencies, startups, investors, manufacturers and application companies.
        </p>
        <div className="h-16 border-l-2 border-[#FFB800]/30 pl-4 flex flex-col justify-center">
          {hoveredNode ? (
            <div>
              <span className="font-mono text-[10px] text-[#FFB800] uppercase block tracking-wider">
                {nodes.find((n) => n.id === hoveredNode)?.category}
              </span>
              <span className="text-white text-xs font-semibold">
                {nodes.find((n) => n.id === hoveredNode)?.name}: {nodes.find((n) => n.id === hoveredNode)?.info}
              </span>
            </div>
          ) : (
            <span className="text-white/40 text-xs italic">
              Hover over network nodes to inspect commercial roles.
            </span>
          )}
        </div>
      </div>

      <div className="lg:col-span-7 flex justify-center items-center relative h-[360px] md:h-[420px] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        
        <svg className="w-full h-full max-w-[450px]" viewBox="0 0 450 450">
          {/* Animated connections */}
          {expanded &&
            nodes.map((n) => (
              <motion.line
                key={`line-${n.id}`}
                x1="225"
                y1="225"
                x2={n.x}
                y2={n.y}
                stroke={hoveredNode === n.id ? "#FFB800" : "rgba(255, 184, 0, 0.12)"}
                strokeWidth={hoveredNode === n.id ? "2.5" : "1.2"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}

          {/* Central ISRO Node */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="cursor-pointer pointer-events-auto"
            onMouseEnter={() => setHoveredNode("isro-center")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle cx="225" cy="225" r="28" fill="#030308" stroke="#FFB800" strokeWidth="2.5" />
            <circle cx="225" cy="225" r="24" fill="rgba(255, 184, 0, 0.08)" />
            <text x="225" y="228" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              ISRO
            </text>
          </motion.g>

          {/* Expanded Startup Nodes */}
          {expanded &&
            nodes.map((n) => (
              <motion.g
                key={n.id}
                initial={{ scale: 0, x: 225 - n.x, y: 225 - n.y }}
                animate={{ scale: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredNode(n.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle cx={n.x} cy={n.y} r="14" fill="#0a0a14" stroke={hoveredNode === n.id ? "#FFB800" : "rgba(255,255,255,0.25)"} strokeWidth="1.5" />
                <circle cx={n.x} cy={n.y} r="10" fill={hoveredNode === n.id ? "rgba(255,184,0,0.15)" : "transparent"} />
                {hoveredNode === n.id && (
                  <text x={n.x} y={n.y - 18} fill="#FFB800" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {n.name}
                  </text>
                )}
              </motion.g>
            ))}
        </svg>
      </div>
    </div>
  );
}

// 2. REFRAME (Existing)
function Scene1Reframe() {
  const items = [
    {
      icon: Smartphone,
      stat: "$119B",
      title: "GNSS navigation chips",
      body: "Every phone, car and watch that knows where it is carries a satellite-positioning chip. This single line item is larger than satellite services, manufacturing and launch combined.",
    },
    {
      icon: Tv,
      stat: "~$72B",
      title: "Satellite TV and DTH",
      body: "Direct-to-home television subscriptions still anchor consumer space revenue. The number is large, mature, and now slowly declining as streaming takes share.",
    },
  ];
  return (
    <>
      <SceneHeading sub="01. The Reframe" main="The biggest line items are mundane" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10 px-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.title}
              className="bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6 md:p-7 text-left backdrop-blur-md shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
                <Icon className="w-6 h-6 text-[#FFB800]" />
                <span className="text-3xl md:text-4xl font-black text-[#FFB800] leading-none">
                  {it.stat}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug mb-3">
                {it.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-light">{it.body}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-[11px] md:text-xs text-white/55 font-mono uppercase tracking-wider max-w-3xl text-center">
        Rockets are the toll roads. The traffic, and the fares, are downstream.
      </p>
    </>
  );
}


// 4. UPGRADED Interactive Commercial Value Chain (Upgrades Scene2ValueChain)
function Scene2ValueChainUpgraded({
  activeStage,
  setActiveStage,
}: {
  activeStage: string;
  setActiveStage: (id: string) => void;
}) {
  const current = DETAILED_STAGES.find((s) => s.id === activeStage) || DETAILED_STAGES[0];
  const Icon = current.icon;

  return (
    <div className="max-w-6xl w-full text-center px-4 z-10 flex flex-col justify-center h-full py-16 md:py-8 overflow-y-auto no-scrollbar">
      <SceneHeading sub="03. The Ecosystem Stack" main="The Commercial Value Chain" />
      <p className="text-xs sm:text-sm text-white/50 mb-8 max-w-xl mx-auto">
        From rockets reaching low Earth orbit to crop intelligence models on the ground. Hover to inspect.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full max-w-5xl mx-auto pointer-events-auto">
        {/* The 7 Interactive Nodes */}
        <div className="lg:col-span-7 flex flex-col gap-2 bg-[#0a0a14]/60 border border-white/5 p-4 md:p-5 rounded-2xl backdrop-blur-md justify-center">
          <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-widest text-white/40 mb-2 px-1">
            <span>Access segment</span>
            <span>Downstream Applications</span>
          </div>

          <div className="flex flex-col gap-2">
            {DETAILED_STAGES.map((stage) => {
              const SIcon = stage.icon;
              const isActive = stage.id === activeStage;
              return (
                <button
                  key={stage.id}
                  onMouseEnter={() => setActiveStage(stage.id)}
                  onClick={() => setActiveStage(stage.id)}
                  className="interactive-control group block w-full text-left"
                >
                  <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-[#FFB800]/30 rounded-xl transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <SIcon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-[#FFB800]" : "text-white/60"}`} />
                      <span className={`text-xs font-semibold uppercase tracking-wider transition-colors ${isActive ? "text-[#FFB800]" : "text-white/80"}`}>
                        {stage.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-white/40">
                        {stage.value}
                      </span>
                      <ChevronRight className="w-3 h-3 text-white/30" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
              className="h-full bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6 text-left backdrop-blur-md shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#FFB800]" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded">
                      {current.value}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
                  {current.name}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-light mb-4">
                  {current.valueCreated}
                </p>

                <div className="space-y-3 mt-4">
                  <div>
                    <span className="font-mono text-[9px] text-[#FFB800]/70 uppercase block tracking-wider">Example Companies:</span>
                    <span className="text-xs font-semibold text-white/95">{current.companies}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-6">
                <span className="font-mono text-[9px] text-[#FFB800]/70 uppercase block tracking-wider">Market Value Projection:</span>
                <span className="text-xs font-bold text-white block leading-relaxed mt-0.5">
                  {current.opportunity}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// 5. REVENUE BY LAYER (Existing Scene3Revenue)
function Scene3Revenue({ active }: { active: boolean }) {
  const maxVal = 155;
  return (
    <>
      <SceneHeading sub="04. Revenue By Layer" main="Where the dollars actually land" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full max-w-5xl z-10 px-4">
        <div className="lg:col-span-7">
          <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md">
            <div className="flex items-end justify-around gap-5 h-[260px]">
              {LAYERS.map((layer, i) => {
                const heightPct = (layer.value / maxVal) * 100;
                return (
                  <div
                    key={layer.id}
                    className="flex flex-col items-center justify-end flex-1 h-full"
                  >
                    <span className="font-mono text-sm md:text-base font-black text-[#FFB800] mb-2">
                      {layer.valueLabel}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: active ? `${heightPct}%` : 0 }}
                      transition={{
                        duration: 0.9,
                        delay: active ? i * 0.1 : 0,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      className={`w-full max-w-[64px] rounded-t-lg ${
                        layer.id === "ground"
                          ? "bg-gradient-to-t from-[#FFB800] to-[#ffd866]"
                          : "bg-gradient-to-t from-[#FFB800]/55 to-[#FFB800]/25"
                      }`}
                    />
                    <span className="font-mono text-[10px] text-white font-bold mt-3 text-center leading-tight">
                      {layer.name}
                    </span>
                    <span className="font-mono text-[8px] text-white/45 uppercase tracking-wide">
                      {layer.share}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[9px] text-white/30 font-mono mt-3 uppercase tracking-widest text-center">
            Commercial space economy, 2024. Shares of $415B total
          </p>
        </div>

        {/* Government Spend */}
        <div className="lg:col-span-5 flex flex-col gap-5 text-left">
          <div className="bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Landmark className="w-4 h-4 text-[#FFB800]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                Government Programs (tracked separately)
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-[#FFB800]">$135B</span>
              <span className="font-mono text-[11px] text-emerald-400">+10% YoY</span>
            </div>
            <p className="text-[11px] text-white/60 font-mono uppercase tracking-wide mt-2">
              Defense near 54 percent (about $73B). US alone near $80B.
            </p>
          </div>
          <p className="text-sm text-white/80 leading-relaxed font-light">
            Government spend sits outside the $415B commercial figure, yet it is
            the anchor demand that funds the upstream. Roughly four in five US
            manufacturing dollars trace back to a public contract.
          </p>
        </div>
      </div>
    </>
  );
}

// 6. COMPLEXITY VS REVENUE (Existing Scene4Structure)
function Scene4Structure() {
  const rows = [
    { label: "Launch and propulsion", complexity: 100, revenue: 14, icon: Rocket },
    { label: "Satellite manufacturing", complexity: 78, revenue: 24, icon: Factory },
    { label: "Satellite services", complexity: 46, revenue: 78, icon: Satellite },
    { label: "Ground and applications", complexity: 30, revenue: 100, icon: RadioTower },
  ];
  return (
    <>
      <SceneHeading sub="05. The Structural Insight" main="Complexity up, revenue down" />
      <div className="w-full max-w-4xl z-10 px-4">
        <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <div className="flex items-center justify-end gap-8 mb-4 font-mono text-[8px] uppercase tracking-[0.2em]">
            <span className="text-white/45">Technical complexity</span>
            <span className="text-[#FFB800]">Share of revenue</span>
          </div>
          <div className="flex flex-col gap-4">
            {rows.map((r) => {
              const RIcon = r.icon;
              return (
                <div key={r.label} className="flex items-center gap-4 text-left">
                  <div className="flex items-center gap-2 w-44 shrink-0">
                    <RIcon className="w-3.5 h-3.5 text-white/50 shrink-0" />
                    <span className="font-mono text-[10px] text-white/75 uppercase tracking-wide">
                      {r.label}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-1.5">
                    <div className="flex-1 flex justify-end">
                      <div className="h-2 rounded-full bg-white/20" style={{ width: `${r.complexity}%` }} />
                    </div>
                    <span className="w-px h-5 bg-white/10" />
                    <div className="flex-1">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#FFB800] to-[#ffd866]"
                        style={{ width: `${r.revenue}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 flex items-start gap-3 bg-[#FFB800]/5 border border-[#FFB800]/15 px-5 py-4 rounded-xl max-w-3xl mx-auto text-left">
          <Gauge className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
          <p className="text-sm text-white/80 leading-relaxed font-light">
            Rockets are essential infrastructure that carry a small slice of
            total value. They are the toll roads of space: hard to build,
            indispensable, and not where the fares are collected. Value
            concentrates downstream where data meets a paying customer.
          </p>
        </div>
      </div>
    </>
  );
}

// 7. INDIA POSITION (Existing Scene5India)
function Scene5India() {
  const names = [
    { name: "Pixxel", role: "Earth observation", logo: "/ecosystem/pixxel.png" },
    { name: "SatSure", role: "Agri-analytics", logo: "/ecosystem/satsure.png" },
    { name: "Dhruva Space", role: "Deployment", logo: "/ecosystem/dhruva.png" },
    { name: "IN-SPACe / NSIL", role: "Enabling structure", icon: Landmark },
  ];
  return (
    <>
      <SceneHeading sub="06. The India Position" main="Strong upstream, the prize downstream" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl z-10 px-4 text-left">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <p className="text-base text-white/80 leading-relaxed font-light">
            India is strong precisely where the commercial revenue is thin: the
            launch and government manufacturing layers. They are strategically
            critical and a point of national pride, but they sit at the narrow
            top of the value chain. The highest-value growth is downstream, in
            applications built on satellite data.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {names.map((n) => {
              const NIcon = n.icon;
              return (
                <div
                  key={n.name}
                  className="bg-[#0a0a14]/90 border border-white/8 rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/25 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {n.logo ? (
                      <Image
                        src={n.logo}
                        alt={`${n.name} logo`}
                        width={36}
                        height={36}
                        className="object-contain w-full h-full p-1"
                      />
                    ) : (
                      NIcon && <NIcon className="w-4 h-4 text-[#FFB800]" />
                    )}
                  </div>
                  <div>
                    <span className="text-white text-sm font-bold block leading-tight">
                      {n.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wide text-white/45">
                      {n.role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#FFB800]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                Global Outlook
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">$596B</span>
              <span className="font-mono text-white/45">to</span>
              <span className="text-4xl font-black text-[#FFB800]">$944B</span>
            </div>
            <p className="text-[11px] text-white/60 font-mono uppercase tracking-wide mt-2">
              2024 to 2033, driven largely by downstream solutions on satellite data
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/8 px-5 py-4 rounded-xl">
            <Layers className="w-4 h-4 text-[#FFB800] shrink-0" />
            <span className="text-[12px] text-white/75 leading-relaxed font-light">
              Emerging Direct-to-Device connectivity could reach roughly $6B in
              annual revenue, a new downstream category sitting on existing orbits.
            </span>
          </div>
        </div>
      </div>
      <SourceLine />
    </>
  );
}


// 9. NEW SECTION: Capital is Flowing
function SceneCapitalFlowing({ active }: { active: boolean }) {
  const stats = [
    { value: 400, suffix: "+", label: "Space Startups", desc: "Active commercial operations registered under policy reforms." },
    { value: 500, suffix: "M+", label: "Private Investment", desc: "Total private venture funding into local space tech enterprises." },
    { value: 150, suffix: "M", label: "Raised in 2025", desc: "Annual capital inflows reflecting investor confidence velocity." },
    { value: 40, suffix: "-45B", label: "Target Space Economy", desc: "Strategic target sector economic valuation by 2033." },
    { value: 8, suffix: "%", label: "Global Market Share Target", desc: "Target commercial footprint footprint by 2030." },
  ];

  return (
    <div className="max-w-6xl w-full text-center px-4 z-10 flex flex-col justify-center h-full py-16 md:py-8 overflow-y-auto no-scrollbar">
      <SceneHeading sub="08. Financial Velocity" main="Capital is Flowing" />
      <p className="text-xs sm:text-sm text-white/50 mb-10 max-w-xl mx-auto">
        Private investments are backing deep tech launchers, satellite manufacturing, and analytical downstream services.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pointer-events-auto max-w-5xl mx-auto w-full">
        {stats.map((s, idx) => (
          <div
            key={s.label}
            className="flex flex-col justify-between p-5 bg-[#0a0a14]/60 border border-white/10 rounded-xl text-left h-[180px] hover:border-white/20 transition-all duration-300"
          >
            <div>
              <span className="text-3xl font-extrabold text-[#FFB800] leading-none block mb-1">
                <Counter end={s.value} suffix={s.suffix} active={active} />
              </span>
              <span className="font-mono text-[9px] text-white uppercase tracking-wider block font-bold mb-3">
                {s.label}
              </span>
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed font-light mt-auto">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 10. NEW SECTION: Why This Matters (Flowchart Infographic)
function SceneWhyMatters({ active }: { active: boolean }) {
  const steps = [
    { label: "Government", sub: "Sets policy structures" },
    { label: "Infrastructure", sub: "Leases launchpads & stands" },
    { label: "Private Companies", sub: "Integrate launchers & buses" },
    { label: "Rockets", sub: "Deliver orbital payloads" },
    { label: "Satellites", sub: "Orbit sensing constellations" },
    { label: "Applications", sub: "Calculate downstream vectors" },
    { label: "Economic Value", sub: "Generates strategic GDP assets" },
  ];

  return (
    <div className="max-w-6xl w-full text-center px-4 z-10 flex flex-col justify-center h-full">
      <SceneHeading sub="09. Dynamic Impact" main="Why This Matters" />
      <p className="text-xs sm:text-sm text-white/50 mb-12 max-w-xl mx-auto">
        A representation of how public enablement translates directly into commercial value and global productivity.
      </p>

      {/* Infographic Flowchart */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-3 pointer-events-auto max-w-5xl mx-auto w-full">
        {/* Animated Connecting Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFB800]/10 to-[#FFB800]/40 hidden lg:block -translate-y-1/2 z-0" />

        {steps.map((step, idx) => (
          <div
            key={step.label}
            className="flex-1 bg-[#0a0a14]/90 border border-white/10 hover:border-[#FFB800]/30 rounded-xl p-4 text-left relative z-10 w-full lg:w-auto backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[9px] bg-[#FFB800]/10 text-[#FFB800] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                0{idx + 1}
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {step.label}
              </h4>
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed font-light">
              {step.sub}
            </p>

            {/* Glowing signal node animation */}
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFB800]/60 hidden lg:block animate-ping" style={{ animationDelay: `${idx * 0.3}s` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 12. NEW SECTION: Startup Explosion
function SceneStartupExplosion({ active }: { active: boolean }) {
  const [stage, setStage] = useState(0); // 0: 1, 1: 10, 2: 50, 3: 100, 4: 200, 5: 400
  const counts = [1, 10, 50, 100, 200, 400];

  useEffect(() => {
    if (!active) {
      setStage(0);
      return;
    }
    const interval = setInterval(() => {
      setStage((s) => {
        if (s < counts.length - 1) return s + 1;
        clearInterval(interval);
        return s;
      });
    }, 450);
    return () => clearInterval(interval);
  }, [active]);

  const currentCount = counts[stage];

  // Stylized India Map particle nodes (seeded inside diamond boundary)
  const indiaDots = useMemo(() => {
    const dots: { x: number; y: number }[] = [];
    const isInsideIndia = (x: number, y: number) => {
      if (y < 30 || y > 380) return false;
      if (y <= 190) {
        const leftBound = 200 - ((200 - 70) * (y - 30)) / (190 - 30);
        const rightBound = 200 + ((350 - 200) * (y - 30)) / (150 - 30);
        return x >= leftBound && x <= rightBound;
      } else {
        const leftBound = 70 + ((195 - 70) * (y - 190)) / (380 - 190);
        const rightBound = 350 - ((350 - 195) * (y - 150)) / (380 - 150);
        return x >= leftBound && x <= rightBound;
      }
    };

    // Generating background grid representation of India
    for (let x = 60; x <= 360; x += 15) {
      for (let y = 30; y <= 380; y += 15) {
        if (isInsideIndia(x, y)) {
          dots.push({ x, y });
        }
      }
    }
    return dots;
  }, []);

  // Map active startup nodes based on current count
  const activeNodes = useMemo(() => {
    const mainHubs = [
      { name: "Bangalore", x: 195, y: 340 },
      { name: "Hyderabad", x: 200, y: 300 },
      { name: "Chennai", x: 210, y: 350 },
      { name: "Mumbai", x: 135, y: 280 },
      { name: "Delhi NCR", x: 180, y: 130 },
      { name: "Thiruvananthapuram", x: 185, y: 380 },
    ];

    if (currentCount <= 1) return mainHubs.slice(0, 1);
    if (currentCount <= 10) return mainHubs;

    // Generate random nodes dispersing outward from main hubs
    const extraNodes = [];
    const targetCount = currentCount;
    
    // Seed random nodes
    for (let i = 0; i < targetCount; i++) {
      const hub = mainHubs[i % mainHubs.length];
      const r = Math.random() * (currentCount / 6);
      const theta = Math.random() * Math.PI * 2;
      const x = Math.min(Math.max(hub.x + Math.cos(theta) * r, 60), 340);
      const y = Math.min(Math.max(hub.y + Math.sin(theta) * r, 30), 380);
      extraNodes.push({ name: `Node-${i}`, x, y });
    }
    return extraNodes;
  }, [currentCount]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10 px-4">
      <div className="lg:col-span-5 text-left flex flex-col justify-center">
        <SceneLabel>Startup Explosion</SceneLabel>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase mb-6">
          Ecosystem Velocity
        </h2>
        <p className="text-sm text-white/70 leading-relaxed font-light mb-8">
          The scale of private space startups registered in India has increased exponentially since deregulation, forming deep tech clusters in aerospace hubs.
        </p>

        <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl font-mono text-left max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-white/45 uppercase tracking-wider font-bold">Registration Cadence:</span>
            <span className="text-xs font-bold text-[#FFB800]">{currentCount}+ Startups</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#FFB800] h-full rounded-full transition-all duration-300"
              style={{ width: `${(stage / (counts.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex justify-center items-center relative h-[360px] md:h-[420px] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
        {/* Particle Dotted India Map */}
        <div className="absolute inset-0 flex justify-center items-center">
          <svg className="w-full h-full max-w-[400px] opacity-25" viewBox="0 0 400 400">
            {indiaDots.map((dot, idx) => (
              <circle key={idx} cx={dot.x} cy={dot.y} r="1.5" fill="rgba(255,255,255,0.4)" />
            ))}
          </svg>
        </div>

        {/* Spawning Active Constellation Nodes */}
        <div className="absolute inset-0 flex justify-center items-center">
          <svg className="w-full h-full max-w-[400px]" viewBox="0 0 400 400">
            {activeNodes.map((n, idx) => (
              <g key={idx}>
                <circle cx={n.x} cy={n.y} r="2.5" fill="#FFB800" />
                <circle cx={n.x} cy={n.y} r="6" fill="transparent" stroke="#FFB800" strokeWidth="0.8" className="animate-pulse" style={{ animationDelay: `${idx * 0.15}s` }} />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

// 13. THESIS (Existing Scene6Thesis)
function Scene6Thesis({ presentationActive = false }: { presentationActive?: boolean }) {
  return (
    <div className="max-w-4xl flex flex-col items-center text-center px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(255,184,0,0.06) 0%, transparent 70%)",
        }}
      />

      <SceneLabel>The Thesis</SceneLabel>

      <h2
        className={`font-light tracking-wide text-white max-w-3xl relative z-10 leading-tight ${
          presentationActive
            ? "mb-4 text-2xl sm:text-3xl lg:text-4xl"
            : "mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl"
        }`}
      >
        <span className="block mb-1 text-white/65">Revenue lives downstream.</span>
        <span className="block mb-2 text-white font-semibold">Complexity lives upstream.</span>
        <span className="block text-[#FFB800] font-bold">Lower the toll, multiply the traffic.</span>
      </h2>

      <p className={`text-xs sm:text-sm text-white/65 max-w-2xl leading-relaxed font-light relative z-10 ${
        presentationActive ? "mb-4" : "mb-6 sm:mb-8"
      }`}>
        If the ground segment is the prize, then the lever that unlocks it is
        the cost of reaching orbit. Cheaper launch does not just grow the launch
        line. It multiplies everything downstream. That is why the next chapter
        goes back to the rocket.
      </p>

      {!presentationActive && (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
            <ChapterNavButton
              href="/chapters/paradigm-shift"
              label="Back to Paradigm Shift"
              variant="ghost"
              direction="back"
            />
            <ChapterNavButton
              href="/chapters/launch-vehicles"
              label="Continue. The Rocket"
              variant="primary"
              direction="forward"
            />
          </div>

          <Link
            href="/"
            className="interactive-control mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/40 hover:text-[#FFB800] transition-colors relative z-10 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Main Deck
          </Link>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------------------------
export default function ValueChainPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef, goToFrame } = p;

  // Interactive value chain active stage
  const [activeStage, setActiveStage] = useState("launch");
  
  // Scroll transforms for 11 frames (each spans 1/11 ~ 0.0909 width)
  const heroOpacity = useTransform(progress, [0.0, 0.05, 0.0909], [1, 1, 0]);
  const heroScale = useTransform(progress, [0.0, 0.0909], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.05, 0.0909, 0.14, 0.1818], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.05, 0.0909, 0.14, 0.1818], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.14, 0.1818, 0.23, 0.2727], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.14, 0.1818, 0.23, 0.2727], [24, 0, 0, -24]);

  const s3Opacity = useTransform(progress, [0.23, 0.2727, 0.32, 0.3636], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.23, 0.2727, 0.32, 0.3636], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.32, 0.3636, 0.41, 0.4545], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.32, 0.3636, 0.41, 0.4545], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.41, 0.4545, 0.50, 0.5455], [0, 1, 1, 0]);
  const s5Y = useTransform(progress, [0.41, 0.4545, 0.50, 0.5455], [24, 0, 0, -24]);

  const s6Opacity = useTransform(progress, [0.50, 0.5455, 0.59, 0.6364], [0, 1, 1, 0]);
  const s6Y = useTransform(progress, [0.50, 0.5455, 0.59, 0.6364], [24, 0, 0, -24]);

  const s7Opacity = useTransform(progress, [0.59, 0.6364, 0.68, 0.7273], [0, 1, 1, 0]);
  const s7Y = useTransform(progress, [0.59, 0.6364, 0.68, 0.7273], [24, 0, 0, -24]);

  const s8Opacity = useTransform(progress, [0.68, 0.7273, 0.77, 0.8182], [0, 1, 1, 0]);
  const s8Y = useTransform(progress, [0.68, 0.7273, 0.77, 0.8182], [24, 0, 0, -24]);

  const s9Opacity = useTransform(progress, [0.77, 0.8182, 0.86, 0.9091], [0, 1, 1, 0]);
  const s9Y = useTransform(progress, [0.77, 0.8182, 0.86, 0.9091], [24, 0, 0, -24]);

  const s10Opacity = useTransform(progress, [0.86, 0.9091, 1.0], [0, 1, 1]);
  const s10Y = useTransform(progress, [0.86, 0.9091, 1.0], [24, 0, 0]);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#FFB800] selection:text-[#030308] relative">
      <Navbar />
      <PresentationChrome controller={p} scenes={VALUE_CHAIN_SCENES} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[1100vh] bg-[#030308]">
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#030308] z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.025] pointer-events-none z-0" />
          <OrbitalRingBg />

          {/* PRESENTATION MODE */}
          {presentationActive && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`frame-${currentFrameIndex}`}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.01 }}
                transition={{ duration: 0.48, ease: [0.25, 1, 0.5, 1] }}
                className={`${SLIDE_BASE} text-center pointer-events-auto h-full`}
              >
                {currentFrameIndex === 0 && <Scene0Hero presentationActive />}
                {currentFrameIndex === 1 && <SceneChanged active={true} />}
                {currentFrameIndex === 2 && <Scene1Reframe />}
                {currentFrameIndex === 3 && (
                  <Scene2ValueChainUpgraded activeStage={activeStage} setActiveStage={setActiveStage} />
                )}
                {currentFrameIndex === 4 && <Scene3Revenue active={true} />}
                {currentFrameIndex === 5 && <Scene4Structure />}
                {currentFrameIndex === 6 && <Scene5India />}
                {currentFrameIndex === 7 && <SceneCapitalFlowing active={true} />}
                {currentFrameIndex === 8 && <SceneWhyMatters active={true} />}
                {currentFrameIndex === 9 && <SceneStartupExplosion active={true} />}
                {currentFrameIndex === 10 && <Scene6Thesis presentationActive />}
              </motion.div>
            </AnimatePresence>
          )}

          {/* SCROLL MODE */}
          {!presentationActive && (
            <>
              <motion.div
                style={{ opacity: heroOpacity, scale: heroScale }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene0Hero presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s1Opacity, y: s1Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneChanged active={currentFrameIndex === 1} />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene1Reframe />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene2ValueChainUpgraded activeStage={activeStage} setActiveStage={setActiveStage} />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene3Revenue active={currentFrameIndex === 4} />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene4Structure />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene5India />
              </motion.div>

              <motion.div
                style={{ opacity: s7Opacity, y: s7Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 7 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneCapitalFlowing active={currentFrameIndex === 7} />
              </motion.div>

              <motion.div
                style={{ opacity: s8Opacity, y: s8Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 8 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneWhyMatters active={currentFrameIndex === 8} />
              </motion.div>

              <motion.div
                style={{ opacity: s9Opacity, y: s9Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 9 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneStartupExplosion active={currentFrameIndex === 9} />
              </motion.div>

              <motion.div
                style={{ opacity: s10Opacity, y: s10Y }}
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                <Scene6Thesis presentationActive={false} />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

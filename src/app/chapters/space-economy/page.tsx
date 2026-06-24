"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  ChevronLeft,
  Compass,
  Cpu,
  Globe,
  Activity,
  ArrowRight,
  Shield,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

const SPEAKER_NOTES = [
  {
    title: "1. The Space Economy",
    points: [
      "Space is no longer a science project — it's a critical commercial layer.",
      "Key numbers: $77B projected TAM by 2030, 250+ active startups.",
      "India's strategic position: cost arbitrage + policy unlock = structural edge.",
    ],
  },
  {
    title: "2. Why Now?",
    points: [
      "Three concurrent catalysts: IN-SPACe regulatory reforms, FDI policy, capital availability.",
      "Cost arbitrage: Indian engineering talent is 30-40% cheaper than Western counterparts.",
      "These forces are interconnected — regulatory unlock opens capital, which accelerates engineering.",
    ],
  },
  {
    title: "3. Indian Space Ecosystem",
    points: [
      "Center Node: ISRO and IN-SPACe form the policy and technology backstop.",
      "Orbiting sectors: launcher systems, satellite platforms, TTC ground infrastructure, downstream analytics.",
      "The ecosystem is fully integrated — mention key private leaders in each orbit.",
    ],
  },
  {
    title: "4. Jio Constellation Opportunity",
    points: [
      "Corporate validation: Reliance Jio's proposal for 1,600+ LEO satellites.",
      "Not theoretical — giants are securing orbital slots for direct-to-device connectivity.",
      "LEO satellite swarms are the next cellular tower infrastructure.",
    ],
  },
  {
    title: "5. Space Value Chain",
    points: [
      "Launchers are 5% of TAM; Downstream Apps & Data are 95%.",
      "Component hardware gross margins: 70%+ — India's export opportunity.",
      "India's play: export hardware and build global downstream SaaS.",
    ],
  },
  {
    title: "6. Capital Flow Architecture",
    points: [
      "Trace the money: Government funding → ISRO R&D + IN-SPACe facilitation.",
      "IN-SPACe transfers tech and infrastructure access to commercial startups.",
      "This creates a self-sustaining commercial space flywheel.",
    ],
  },
  {
    title: "7. Opportunity Matrix",
    points: [
      "Where should investors deploy capital?",
      "High TAM / Low Risk: Downstream SaaS & Analytics (Pixxel, GalaxEye) — the sweet spot.",
      "High TAM / High Risk: Private launcher platforms (Skyroot, Agnikul) — higher conviction needed.",
    ],
  },
  {
    title: "8. Thesis Summary",
    points: [
      "The next global infrastructure is orbital — India has the engineering lead.",
      "Call to action: review case study briefs for individual sector deep-dives.",
      "Q&A session opens now.",
    ],
  },
];

const ECO_SECTORS = [
  {
    name: "Launch Systems",
    tam: "$2.2B",
    growth: "12% CAGR",
    desc: "Upstream launcher vehicle startups custom-designing multi-stage rocket insertions for LEO, SSO and GTO orbits.",
    firms: "Skyroot Aerospace, Agnikul Cosmos",
    icon: Zap,
  },
  {
    name: "Satellite Platforms",
    tam: "$8.4B",
    growth: "15% CAGR",
    desc: "Miniaturized orbital payload builders specializing in hyperspectral sensors, attitude control, and propulsion.",
    firms: "Pixxel, Dhruva Space, GalaxEye",
    icon: Cpu,
  },
  {
    name: "Ground Infrastructure",
    tam: "$5.1B",
    growth: "9% CAGR",
    desc: "Telemetry tracking stations, high-frequency antenna arrays, and satellite operations ground receivers.",
    firms: "Astrogate, ISRO TTC Centers",
    icon: Globe,
  },
  {
    name: "Downstream Analytics",
    tam: "$61B",
    growth: "19% CAGR",
    desc: "Enterprise SaaS layers translating raw spatial maps into agricultural insights, weather models, and intelligence APIs.",
    firms: "Blue Sky Analytics, Cropin, SatSure",
    icon: Activity,
  },
];

const CHAIN_STEPS = [
  {
    label: "01. Component Fabrication",
    tam: "$5 Billion",
    margin: "70%+",
    type: "Specialized",
    detail:
      "Radiation-hardened semiconductors, carbon-composite body structures, and electric propulsion valves — high-margin export hardware.",
    focus: "EXPORTS & IP R&D",
  },
  {
    label: "02. Launch Logistics",
    tam: "$2 Billion",
    margin: "30% – 35%",
    type: "Commodity",
    detail:
      "Rideshare launches and customized orbital path deliveries. High upfront capital intensity, but acts as upstream gatekeeper.",
    focus: "FREQUENCY & SPEED",
  },
  {
    label: "03. Constellation Operations",
    tam: "$12 Billion",
    margin: "45% – 55%",
    type: "Utility",
    detail:
      "Managing active orbital swarms, payload telemetries, and tracking passes across regional antenna networks.",
    focus: "UPTIME & LATENCY",
  },
  {
    label: "04. Downstream Analytics SaaS",
    tam: "$61 Billion",
    margin: "75% – 85%",
    type: "SaaS API",
    detail:
      "The software layer — transforming raw spatial sensor pixels into economic capital predictions for enterprise buyers.",
    focus: "VALUATION MULTIPLES",
  },
];

const MATRIX_QUADS = [
  {
    id: 0,
    title: "Geospatial SaaS & Downstream APIs",
    tam: "High TAM ($61B+)",
    risk: "Low Tech Risk",
    margin: "75% – 85%",
    note: "SaaS recurring revenues with 15x–20x EV/Rev multiples. Direct software translation layer from orbital data.",
    status: "RECOMMENDED INVESTOR TARGET",
    tag: "LOW RISK / HIGH TAM",
    highlight: true,
  },
  {
    id: 1,
    title: "Private Small-Sat Launchers",
    tam: "Mid-High TAM ($8B+)",
    risk: "High Tech Risk",
    margin: "30% – 35%",
    note: "Capital intensive engine trials, high failure rate in early flights, but offers absolute sovereign launch autonomy.",
    status: "CAPITAL INTENSIVE GROWTH",
    tag: "HIGH RISK / HIGH TAM",
    highlight: false,
  },
  {
    id: 2,
    title: "Standardized CubeSat Components",
    tam: "Low-Mid TAM ($5B)",
    risk: "Low Tech Risk",
    margin: "50% – 60%",
    note: "Bangalore assembly hubs supply Western constellations capitalizing on lower engineering talent margins.",
    status: "STEADY OUTSOURCING UTILITY",
    tag: "LOW RISK / LOW TAM",
    highlight: false,
  },
  {
    id: 3,
    title: "Proprietary Optical/SAR Sensors",
    tam: "Mid TAM ($8B)",
    risk: "High Tech Risk",
    margin: "60% – 70%",
    note: "High R&D cycles for radiation-hardened lenses, but produces premium proprietary hardware IP.",
    status: "HIGH BARRIER TO ENTRY",
    tag: "HIGH RISK / LOW TAM",
    highlight: false,
  },
];

// ---------------------------------------------------------------------------
// FRAME CONFIG
// ---------------------------------------------------------------------------
const FRAME_TARGETS = [0.06, 0.18, 0.31, 0.43, 0.56, 0.68, 0.81, 0.93];
const TOTAL_FRAMES = 8;

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function formatTime(totalSecs: number) {
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Shared slide wrapper class
const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

/** Monospace label used as chapter/section identifier */
function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] tracking-[0.32em] text-[#0d9488] uppercase font-bold block mb-3">
      {children}
    </span>
  );
}

/** Standard two-line heading for non-hero scenes */
function SceneHeading({
  sub,
  main,
}: {
  sub: string;
  main: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mb-8 text-center">
      <SceneLabel>{sub}</SceneLabel>
      <h2
        className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
        style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
      >
        {main}
      </h2>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ORBIT RING DECORATION
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// SCENE CONTENT COMPONENTS
// (content is extracted so it renders identically in both scroll and
//  presentation modes — only the wrapping motion container differs)
// ---------------------------------------------------------------------------

function Scene0Hero({
  tickerVal,
  presentationActive,
}: {
  tickerVal?: number;
  presentationActive: boolean;
}) {
  return (
    <>
      {/* Background earth image — India at night from orbit */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/india_night_from_orbit.png"
          alt="India at night viewed from orbit"
          fill
          priority
          className="object-cover object-center opacity-35"
        />
        {/* Top fade into dark space */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c12]/70 via-[#080c12]/20 to-[#080c12]/95" />
        {/* Radial vignette to frame the content */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at center, transparent 25%, #080c12 90%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center text-center">
        <SceneLabel>Chapter XI &mdash; Tactical Briefing</SceneLabel>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          The Space
          <br />
          <span className="text-[#0d9488]">Economy</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
          India is shifting from isolated scientific milestones to an
          integrated, low-cost orbital utility stack powering the next
          generation of global infrastructure.
        </p>

        {/* Stat pills */}
        <div className="grid grid-cols-3 gap-0 border border-white/10 rounded-2xl overflow-hidden font-mono mb-10 w-full max-w-xl">
          {[
            { val: "$77B", label: "TAM by 2030" },
            { val: "250+", label: "Active Startups" },
            { val: "100%", label: "FDI Allowed" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-5 px-4 ${i !== 2 ? "border-r border-white/10" : ""}`}
            >
              <span className="text-2xl font-extrabold text-[#0d9488] block">
                {s.val}
              </span>
              <span className="text-[9px] uppercase text-white/55 tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {!presentationActive && (
          <div className="flex flex-col items-center gap-2 font-mono text-[9px] text-[#0d9488]/70 tracking-[0.25em] uppercase">
            <span>Scroll to decrypt</span>
            <span className="w-px h-8 bg-[#0d9488]/30 relative overflow-hidden rounded-full block">
              <span className="absolute top-0 inset-x-0 h-3 bg-[#0d9488] rounded-full animate-bounce" />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

function Scene1WhyNow() {
  return (
    <>
      <SceneHeading sub="01. SYSTEMIC TRIGGER" main="Why Now?" />

      <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
        {[
          {
            n: "01",
            title: "IN-SPACe Reforms",
            body: "A single-window private clearance hub, paired with open FDI policies, unlocked commercial orbital operations for the first time.",
            icon: Shield,
          },
          {
            n: "02",
            title: "Venture Acceleration",
            body: "Private space technology startups captured record seed and Series A capital, building sovereign propulsion, rockets, and payloads.",
            icon: TrendingUp,
          },
          {
            n: "03",
            title: "Engineering Arbitrage",
            body: "Bangalore and Hyderabad hubs assemble hardware and write downlinks 30–40% cheaper than Western aerospace counterparts.",
            icon: CheckCircle2,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.n}
              className="bg-[#0b131e]/90 border border-white/5 hover:border-[#0d9488]/40 p-6 rounded-2xl text-left backdrop-blur-md shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#0d9488]/10 border border-[#0d9488]/20 flex items-center justify-center text-[#0d9488] font-mono text-xs font-bold shrink-0">
                  {card.n}
                </div>
                <Icon className="w-4 h-4 text-[#0d9488]/60 group-hover:text-[#0d9488] transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-2">
                {card.title}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">{card.body}</p>
            </div>
          );
        })}

        {/* Decorative connecting line — desktop only */}
        <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-center z-0">
          <svg
            className="w-full h-full text-[#0d9488]/10 absolute"
            viewBox="0 0 800 160"
            fill="none"
          >
            <path
              d="M 240,80 L 284,80 M 520,80 L 560,80"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="262" cy="80" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="542" cy="80" r="3" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      </div>
    </>
  );
}

function Scene2Ecosystem({
  activeEcoSector,
  setActiveEcoSector,
  orbitDeg,
}: {
  activeEcoSector: number | null;
  setActiveEcoSector: (n: number | null) => void;
  orbitDeg: number;
}) {
  return (
    <>
      <SceneHeading
        sub="02. ECOSYSTEM ARCHITECTURE"
        main="Indian Space Ecosystem"
      />
      <p className="text-[10px] text-white/55 font-mono uppercase tracking-widest mb-8">
        Hover or click sectors to query telemetry
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl z-10">
        {/* Orbit visualization */}
        <div className="lg:col-span-7 flex justify-center relative min-h-[300px] md:min-h-[380px]">
          <div
            className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-white/5 flex items-center justify-center relative"
            style={{ transform: `rotate(${orbitDeg}deg)` }}
          >
            <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.04]" />
            <div className="absolute w-[100px] h-[100px] rounded-full border border-white/[0.02]" />

            {/* Central node */}
            <div className="absolute w-14 h-14 rounded-full bg-[#0d9488]/10 border border-[#0d9488]/50 shadow-[0_0_20px_rgba(13,148,136,0.2)] flex flex-col items-center justify-center font-mono text-[7px] font-bold text-[#0d9488] z-10">
              <span>ISRO</span>
              <span className="text-white/50">HUB</span>
            </div>

            {ECO_SECTORS.map((sector, sIdx) => {
              const angle = (sIdx * 90 * Math.PI) / 180;
              const r = 130;
              const x = r * Math.cos(angle);
              const y = r * Math.sin(angle);
              const Icon = sector.icon;
              const isActive = activeEcoSector === sIdx;

              return (
                <button
                  key={sector.name}
                  onMouseEnter={() => setActiveEcoSector(sIdx)}
                  onClick={() => setActiveEcoSector(sIdx === activeEcoSector ? null : sIdx)}
                  className={`absolute w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 interactive-control ${
                    isActive
                      ? "bg-[#0d9488] border-[#0d9488] shadow-[0_0_15px_rgba(13,148,136,0.6)] scale-110"
                      : "bg-[#0b131e] border-white/15 hover:border-[#0d9488]/60"
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${-orbitDeg}deg)`,
                  }}
                  aria-label={sector.name}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-white/60"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-5 text-left min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeEcoSector !== null ? (
              <motion.div
                key={activeEcoSector}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0b131e]/90 border border-[#0d9488]/30 p-6 rounded-2xl backdrop-blur-md shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#0d9488]/20 pb-3">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                    {ECO_SECTORS[activeEcoSector].name}
                  </h3>
                  <span className="font-mono text-xs text-[#0d9488] font-bold">
                    {ECO_SECTORS[activeEcoSector].tam}
                  </span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center font-mono text-[10px] text-white/55 uppercase border-b border-white/5 pb-1">
                    <span>Growth Rate</span>
                    <span className="text-[#0d9488] font-bold">
                      {ECO_SECTORS[activeEcoSector].growth}
                    </span>
                  </div>
                  <p className="text-white/85 leading-relaxed">
                    {ECO_SECTORS[activeEcoSector].desc}
                  </p>
                  <div className="pt-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#0d9488] font-bold block mb-1">
                      Key Operators:
                    </span>
                    <p className="text-white/70 font-mono text-[10px]">
                      {ECO_SECTORS[activeEcoSector].firms}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl text-center text-white/40 text-xs font-mono py-16"
              >
                <Compass className="w-7 h-7 mx-auto mb-3 opacity-40 animate-pulse" />
                [ SELECT A NODE TO COMMENCE INTEL DOWNLINK ]
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function Scene3JioConstellation({ tickerVal }: { tickerVal: number }) {
  return (
    <>
      <SceneHeading
        sub="03. CORPORATE VALIDATION"
        main="Jio Constellation Opportunity"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl z-10">
        {/* Globe swarm — real satellite constellation image */}
        <div className="lg:col-span-7 flex justify-center relative min-h-[250px] md:min-h-[340px]">
          {/* Photo backdrop */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <Image
              src="/satellite_constellation_swarm.png"
              alt="Satellite constellation orbiting Earth"
              fill
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080c12]/60 via-transparent to-[#080c12]/30" />
          </div>

          <div className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] flex items-center justify-center relative">
            <svg
              className="w-full h-full"
              viewBox="0 0 120 120"
              fill="none"
            >
              {/* Earth */}
              <circle
                cx="60"
                cy="60"
                r="26"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <circle
                cx="60"
                cy="60"
                r="24"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
                strokeDasharray="1 3"
              />

              {/* Orbital rings */}
              {[
                { rx: 42, ry: 11, rot: -30 },
                { rx: 44, ry: 14, rot: 45 },
                { rx: 46, ry: 9, rot: 10 },
              ].map((ring, i) => (
                <ellipse
                  key={i}
                  cx="60"
                  cy="60"
                  rx={ring.rx}
                  ry={ring.ry}
                  stroke="#0d9488"
                  strokeWidth="0.4"
                  opacity={0.35 - i * 0.06}
                  transform={`rotate(${ring.rot} 60 60)`}
                />
              ))}

              {/* Satellite nodes */}
              {[
                { cx: 18, cy: 60, rot: -30, pulse: true },
                { cx: 102, cy: 60, rot: -30, pulse: false },
                { cx: 16, cy: 60, rot: 45, pulse: false },
                { cx: 104, cy: 60, rot: 45, pulse: true },
                { cx: 14, cy: 60, rot: 10, pulse: false },
                { cx: 106, cy: 60, rot: 10, pulse: true },
              ].map((sat, i) => (
                <g key={i} transform={`rotate(${sat.rot} 60 60)`}>
                  <circle
                    cx={sat.cx}
                    cy={sat.cy}
                    r="2"
                    fill="#0d9488"
                    className={sat.pulse ? "animate-pulse" : ""}
                  />
                  <circle
                    cx={sat.cx}
                    cy={sat.cy}
                    r="4"
                    stroke="#0d9488"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </g>
              ))}

              {/* Earth glow */}
              <circle
                cx="60"
                cy="60"
                r="30"
                fill="url(#earthGlow)"
                opacity="0.15"
              />
              <defs>
                <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Ticker + narrative */}
        <div className="lg:col-span-5 text-left flex flex-col gap-5">
          <div className="font-mono bg-[#0b131e]/60 border border-white/5 p-6 rounded-2xl backdrop-blur-md">
            <span className="text-[9px] text-white/55 tracking-widest uppercase block mb-2">
              Constellation Enrollment
            </span>
            <div className="text-6xl md:text-7xl font-black text-white tracking-tight leading-none tabular-nums">
              {tickerVal >= 1640 ? "1,650+" : tickerVal.toLocaleString()}
            </div>
            <span className="text-[9px] text-[#0d9488] font-bold uppercase tracking-wider mt-2 block">
              LEO Satellites Planned
            </span>
          </div>

          <p className="text-sm text-white/90 leading-relaxed font-light">
            <strong>Reliance Jio</strong> is evaluating a sovereign low-earth
            orbit constellation of roughly{" "}
            <strong>1,600 to 1,650 satellites</strong> to deliver
            direct-to-device broadband across remote villages, aircraft, and
            maritime corridors.
          </p>

          <div className="flex items-center gap-3 bg-[#0d9488]/5 border border-[#0d9488]/15 px-4 py-3 rounded-xl text-xs font-mono text-[#0d9488]">
            <Shield className="w-4 h-4 shrink-0" />
            <span>
              CORPORATE GIANTS RECOGNIZE SPACE AS ESSENTIAL INFRASTRUCTURE.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Scene4ValueChain({
  activeChainStep,
  setActiveChainStep,
}: {
  activeChainStep: number;
  setActiveChainStep: (n: number) => void;
}) {
  return (
    <>
      <SceneHeading
        sub="04. VALUE CHAIN SEGMENTS"
        main="Space Value Chain"
      />
      <p className="text-[10px] text-white/55 font-mono uppercase tracking-widest mb-6">
        Click nodes to walk through financial margins
      </p>

      <div className="flex flex-col gap-5 w-full max-w-4xl z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CHAIN_STEPS.map((step, sIdx) => (
            <button
              key={step.label}
              onClick={() => setActiveChainStep(sIdx)}
              className={`p-4 border rounded-xl text-left cursor-pointer transition-all duration-300 interactive-control ${
                activeChainStep === sIdx
                  ? "bg-[#0d9488]/10 border-[#0d9488] shadow-[0_0_15px_rgba(13,148,136,0.15)] scale-[1.02]"
                  : "bg-[#0b131e]/90 border-white/5 hover:border-white/20"
              }`}
            >
              <span className="font-mono text-[8px] text-white/50 block mb-1 uppercase">
                Segment 0{sIdx + 1}
              </span>
              <h3
                className={`text-[11px] font-bold uppercase tracking-wide truncate ${
                  activeChainStep === sIdx ? "text-[#0d9488]" : "text-white"
                }`}
              >
                {step.label.split(". ")[1]}
              </h3>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeChainStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-[#0b131e]/90 border border-white/5 rounded-2xl p-6 md:p-7 text-left backdrop-blur-md shadow-2xl relative"
          >
            <div className="absolute top-3 right-4 font-mono text-[9px] text-white/40 uppercase">
              [SEGMENT PROFILE]
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-[9px] tracking-widest text-[#0d9488] uppercase border border-[#0d9488]/30 px-2 py-0.5 rounded font-bold">
                    {CHAIN_STEPS[activeChainStep].focus}
                  </span>
                  <span className="font-mono text-[9px] text-white/40 uppercase">
                    Classification: {CHAIN_STEPS[activeChainStep].type}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-extralight text-white leading-tight uppercase"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {CHAIN_STEPS[activeChainStep].label.split(". ")[1]}
                </h3>
                <p className="text-xs md:text-sm text-white/85 leading-relaxed font-light">
                  {CHAIN_STEPS[activeChainStep].detail}
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-[10px] text-white/55 uppercase border-b border-white/[0.03] pb-1.5">
                  <span>Global Segment TAM</span>
                  <span className="text-[#0d9488] font-bold">
                    {CHAIN_STEPS[activeChainStep].tam}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/55 uppercase">
                  <span>Gross Margin</span>
                  <span className="text-white font-bold">
                    {CHAIN_STEPS[activeChainStep].margin}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function Scene5CapitalFlow({ dashOffset }: { dashOffset: number }) {
  const flows = [
    { d: "M 170,115 C 230,115 250,70 310,70", thick: 6, thin: 1.5, color: "#0d9488", animated: true },
    { d: "M 170,115 C 230,115 250,195 310,195", thick: 9, thin: 1, color: "#ffffff", animated: true },
    { d: "M 490,70 C 550,70 570,70 630,70", thick: 5, thin: 1.5, color: "#0d9488", animated: true },
    { d: "M 490,195 C 550,195 570,195 630,195", thick: 7, thin: 1, color: "#ffffff", animated: false },
  ];

  const nodes: Array<{ style: React.CSSProperties; tag: string; title: string; sub: string; accent?: boolean }> = [
    { style: { left: "2%", top: "38%", transform: "translateY(-50%)" }, tag: "CAPITAL SPONSOR", title: "Sovereign Budget", sub: "$1.2B Annually" },
    { style: { left: "36%", top: "18%", transform: "translateY(-50%)" }, tag: "REGULATORY GATE", title: "IN-SPACe", sub: "Infrastructure sharing", accent: true },
    { style: { left: "36%", top: "62%", transform: "translateY(-50%)" }, tag: "PUBLIC R&D", title: "ISRO Heavy Lift", sub: "Deep Space Probes" },
    { style: { right: "2%", top: "18%", transform: "translateY(-50%)" }, tag: "AEROSPACE SaaS", title: "Startups & Launch", sub: "$400M VC + grants" },
    { style: { right: "2%", top: "62%", transform: "translateY(-50%)" }, tag: "COMMERCIAL MFG", title: "Industry", sub: "$800M manufacturing" },
  ];

  return (
    <>
      <SceneHeading
        sub="05. CAPITAL ALLOCATIONS"
        main="Capital Flow Architecture"
      />
      <p className="text-[10px] text-white/55 font-mono uppercase tracking-widest mb-6">
        Unified Sankey capital distribution pathways
      </p>

      <div className="relative w-full max-w-4xl aspect-[16/8] md:aspect-[16/6] bg-[#0b131e]/50 border border-white/5 rounded-2xl p-5 backdrop-blur-md shadow-2xl z-10 overflow-hidden">
        {/* Node labels */}
        {nodes.map((node) => (
          <div
            key={node.title}
            className={`absolute bg-[#0b131e] border ${node.accent ? "border-[#0d9488]/40 shadow-[0_0_12px_rgba(13,148,136,0.1)]" : "border-white/10"} rounded-xl p-2.5 font-mono z-20`}
            style={node.style}
          >
            <span className={`text-[7px] ${node.accent ? "text-[#0d9488]" : "text-white/50"} uppercase block mb-0.5 font-bold tracking-wider`}>
              {node.tag}
            </span>
            <span className="text-[10px] font-bold text-white block">{node.title}</span>
            <span className="text-[8px] text-white/60 block mt-0.5">{node.sub}</span>
          </div>
        ))}

        {/* Flow SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 800 300"
          fill="none"
        >
          {flows.map((f, i) => (
            <g key={i}>
              <path d={f.d} stroke={f.color} strokeWidth={f.thick} opacity={0.12} />
              <path
                d={f.d}
                stroke={f.color}
                strokeWidth={f.thin}
                strokeDasharray="5 9"
                strokeDashoffset={f.animated ? dashOffset : 0}
              />
            </g>
          ))}
        </svg>
      </div>
    </>
  );
}

function Scene6Matrix({
  hoveredQuad,
  setHoveredQuad,
}: {
  hoveredQuad: number | null;
  setHoveredQuad: (n: number | null) => void;
}) {
  return (
    <>
      <SceneHeading
        sub="06. INVESTMENT RISK/RETURN"
        main="Opportunity Matrix"
      />
      <p className="text-[10px] text-white/55 font-mono uppercase tracking-widest mb-6">
        Hover quadrants to disclose sector analysis
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl z-10">
        {/* 2x2 grid */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-3">
          {MATRIX_QUADS.map((quad) => (
            <button
              key={quad.id}
              onMouseEnter={() => setHoveredQuad(quad.id)}
              onClick={() =>
                setHoveredQuad(hoveredQuad === quad.id ? null : quad.id)
              }
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative interactive-control ${
                hoveredQuad === quad.id
                  ? quad.highlight
                    ? "bg-[#0d9488]/15 border-[#0d9488] shadow-[0_0_20px_rgba(13,148,136,0.25)] scale-[1.02]"
                    : "bg-[#0d9488]/5 border-[#0d9488]/60 scale-[1.02]"
                  : "bg-[#0b131e]/90 border-white/5 hover:border-[#0d9488]/30"
              }`}
            >
              {quad.highlight && (
                <span className="absolute top-2 right-2 text-[7px] font-mono text-[#0d9488] font-bold bg-[#0d9488]/10 px-1.5 py-0.5 rounded">
                  PRIMARY TARGET
                </span>
              )}
              <span
                className={`font-mono text-[8px] font-bold block mb-1.5 ${
                  quad.highlight ? "text-[#0d9488]" : "text-white/50"
                }`}
              >
                {quad.tag}
              </span>
              <h3 className="text-xs font-bold text-white uppercase tracking-wide mb-1">
                {quad.title}
              </h3>
              <p className="text-[10px] text-white/65 leading-relaxed">
                {quad.note.slice(0, 60)}...
              </p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-5 text-left min-h-[200px]">
          <AnimatePresence mode="wait">
            {hoveredQuad !== null ? (
              <motion.div
                key={hoveredQuad}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0b131e]/90 border border-[#0d9488]/30 p-6 rounded-2xl backdrop-blur-md shadow-2xl space-y-4"
              >
                <div className="border-b border-[#0d9488]/20 pb-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    {MATRIX_QUADS[hoveredQuad].title}
                  </h4>
                </div>
                <div className="space-y-2.5 font-mono text-[10px] text-white/70">
                  {[
                    { label: "Investor Strategy", val: MATRIX_QUADS[hoveredQuad].status, accent: true },
                    { label: "Market Size", val: MATRIX_QUADS[hoveredQuad].tam, accent: false },
                    { label: "Risk/Reward Profile", val: MATRIX_QUADS[hoveredQuad].risk, accent: false },
                    { label: "Gross Margin Band", val: MATRIX_QUADS[hoveredQuad].margin, accent: false },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between border-b border-white/[0.03] pb-1"
                    >
                      <span className="text-white/50 uppercase">{row.label}</span>
                      <span
                        className={`font-bold ${row.accent ? "text-[#0d9488]" : "text-white"}`}
                      >
                        {row.val}
                      </span>
                    </div>
                  ))}
                  <p className="font-sans text-xs text-white/85 leading-relaxed pt-1">
                    {MATRIX_QUADS[hoveredQuad].note}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl text-center text-white/40 text-xs font-mono py-16"
              >
                <Sliders className="w-7 h-7 mx-auto mb-3 opacity-40 animate-pulse" />
                [ HOVER ANY QUADRANT TO AUDIT RISK PROFILE ]
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function Scene7FinalThesis() {
  return (
    <div className="max-w-4xl flex flex-col items-center text-center px-4">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(13,148,136,0.06) 0%, transparent 70%)",
        }}
      />

      <SceneLabel>The Final Thesis</SceneLabel>

      <h2
        className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-relaxed text-white max-w-3xl mb-10 relative z-10"
        style={{ fontFamily: "Georgia, serif" }}
      >
        <span className="block mb-1 text-white/65">
          The next trillion-dollar
        </span>
        <span className="block mb-1 text-white/65">infrastructure</span>
        <span className="block mb-2 text-white font-semibold">
          isn&apos;t on the ground.
        </span>
        <span className="block text-[#0d9488] font-bold">
          It is the orbital layer.
        </span>
      </h2>

      <p className="text-sm sm:text-base text-white/65 max-w-2xl leading-relaxed mb-12 font-light relative z-10">
        India has developed the engineering rigor, policy frameworks, and
        private startups to capture the downstream value of this next global
        substrate. The opportunity is structural, not cyclical.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
        <Link
          href="/"
          className="interactive-control flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0d9488] hover:bg-[#0f766e] text-white font-mono text-xs uppercase tracking-widest rounded-full font-bold shadow-lg transition-all duration-300 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Main Deck
        </Link>
        <Link
          href="/chapters/launch-systems"
          className="interactive-control flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-mono text-xs uppercase tracking-widest rounded-full font-bold transition-all duration-300 w-full sm:w-auto"
        >
          Browse Chapter Case Studies
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------------------------

export default function SpaceEconomyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Presentation mode state
  const [presentationActive, setPresentationActive] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [hudOpen, setHudOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll tracking (used in scroll mode only)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // progress MotionValue — drives all scroll-mode animations
  const progress = useMotionValue(0);

  // Sync progress with scroll (scroll mode only)
  useEffect(() => {
    if (presentationActive) return;
    progress.set(scrollYProgress.get());
    const unsub = scrollYProgress.on("change", (v) => progress.set(v));
    return unsub;
  }, [presentationActive, scrollYProgress, progress]);

  // Update currentFrameIndex during scroll mode
  useEffect(() => {
    if (presentationActive) return;
    const unsub = progress.on("change", (v) => {
      const idx =
        v < 0.125
          ? 0
          : v < 0.25
          ? 1
          : v < 0.375
          ? 2
          : v < 0.5
          ? 3
          : v < 0.625
          ? 4
          : v < 0.75
          ? 5
          : v < 0.875
          ? 6
          : 7;
      setCurrentFrameIndex(idx);
    });
    return unsub;
  }, [presentationActive, progress]);

  // URL param: ?presentation=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("presentation") === "true") {
      setPresentationActive(true);
      setHudOpen(true);
    }
  }, []);

  // Lock scroll in presentation mode
  useEffect(() => {
    if (!presentationActive) return;
    const prevent = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("wheel", prevent, { passive: false, capture: true });
    window.addEventListener("touchmove", prevent, { passive: false, capture: true });
    document.documentElement.classList.add("presentation-active");
    document.body.classList.add("presentation-active");
    return () => {
      window.removeEventListener("wheel", prevent, { capture: true });
      window.removeEventListener("touchmove", prevent, { capture: true });
      document.documentElement.classList.remove("presentation-active");
      document.body.classList.remove("presentation-active");
    };
  }, [presentationActive]);

  // Transition helpers — with guard to prevent overlap
  const TRANSITION_DURATION = 500; // ms — must match AnimatePresence exit duration

  const goToFrame = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      const target = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx));
      if (target === currentFrameIndex) return;
      setIsTransitioning(true);
      setCurrentFrameIndex(target);
      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
    },
    [isTransitioning, currentFrameIndex]
  );

  const nextSlide = useCallback(() => goToFrame(currentFrameIndex + 1), [goToFrame, currentFrameIndex]);
  const prevSlide = useCallback(() => goToFrame(currentFrameIndex - 1), [goToFrame, currentFrameIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!presentationActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        nextSlide();
      } else if (["ArrowLeft", "ArrowUp", "Backspace"].includes(e.key)) {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setPresentationActive(false);
        setHudOpen(false);
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        setHudOpen((h) => !h);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presentationActive, nextSlide, prevSlide]);

  // Click-to-advance in presentation mode
  useEffect(() => {
    if (!presentationActive) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, select, [role='button'], .interactive-control, .hud-overlay"
        )
      )
        return;
      e.preventDefault();
      if (e.shiftKey) prevSlide();
      else nextSlide();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [presentationActive, nextSlide, prevSlide]);

  // P key toggle (outside presentation mode too)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "p" || e.key === "P") && !presentationActive) {
        setPresentationActive(true);
        setHudOpen(true);
        setCurrentFrameIndex(0);
      }
    };
    if (!presentationActive) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [presentationActive]);

  // Presenter timer
  useEffect(() => {
    if (presentationActive) {
      timerRef.current = setInterval(
        () => setElapsedTime((t) => t + 1),
        1000
      );
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setElapsedTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [presentationActive]);

  // ---------------------------------------------------------------------------
  // SCROLL MODE — MOTION TRANSFORMS
  // ---------------------------------------------------------------------------

  const heroOpacity = useTransform(progress, [0.0, 0.10, 0.125], [1, 1, 0]);
  const heroScale = useTransform(progress, [0.0, 0.125], [1, 0.96]);

  const whyNowOpacity = useTransform(progress, [0.08, 0.125, 0.22, 0.25], [0, 1, 1, 0]);
  const whyNowY = useTransform(progress, [0.08, 0.125, 0.22, 0.25], [24, 0, 0, -24]);

  const ecoOpacity = useTransform(progress, [0.20, 0.25, 0.34, 0.375], [0, 1, 1, 0]);
  const ecoY = useTransform(progress, [0.20, 0.25, 0.34, 0.375], [24, 0, 0, -24]);
  const orbitRotateProg = useTransform(progress, [0.25, 0.375], [0, 90]);

  const jioOpacity = useTransform(progress, [0.33, 0.375, 0.47, 0.5], [0, 1, 1, 0]);
  const jioY = useTransform(progress, [0.33, 0.375, 0.47, 0.5], [24, 0, 0, -24]);
  const jioCountProg = useTransform(progress, [0.375, 0.46], [0, 1650]);

  const valueChainOpacity = useTransform(progress, [0.45, 0.5, 0.59, 0.625], [0, 1, 1, 0]);
  const valueChainY = useTransform(progress, [0.45, 0.5, 0.59, 0.625], [24, 0, 0, -24]);

  const flowOpacity = useTransform(progress, [0.57, 0.625, 0.72, 0.75], [0, 1, 1, 0]);
  const flowY = useTransform(progress, [0.57, 0.625, 0.72, 0.75], [24, 0, 0, -24]);
  const flowDashProg = useTransform(progress, [0.625, 0.72], [120, 0]);

  const matrixOpacity = useTransform(progress, [0.69, 0.75, 0.84, 0.875], [0, 1, 1, 0]);
  const matrixY = useTransform(progress, [0.69, 0.75, 0.84, 0.875], [24, 0, 0, -24]);

  const thesisOpacity = useTransform(progress, [0.82, 0.875, 1.0], [0, 1, 1]);
  const thesisY = useTransform(progress, [0.82, 0.875, 1.0], [24, 0, 0]);

  // ---------------------------------------------------------------------------
  // DYNAMIC STATE derived from motion values
  // ---------------------------------------------------------------------------

  const [tickerVal, setTickerVal] = useState(0);
  useEffect(() => {
    const unsub = jioCountProg.on("change", (v) => setTickerVal(Math.floor(v)));
    return unsub;
  }, [jioCountProg]);

  const [orbitDeg, setOrbitDeg] = useState(0);
  useEffect(() => {
    if (presentationActive) return;
    const unsub = orbitRotateProg.on("change", (v) => setOrbitDeg(v));
    return unsub;
  }, [orbitRotateProg, presentationActive]);

  const [dashOffset, setDashOffset] = useState(120);
  useEffect(() => {
    if (presentationActive) return;
    const unsub = flowDashProg.on("change", (v) => setDashOffset(v));
    return unsub;
  }, [flowDashProg, presentationActive]);

  // Interaction state
  const [activeEcoSector, setActiveEcoSector] = useState<number | null>(null);
  const [activeChainStep, setActiveChainStep] = useState(3);
  const [hoveredMatrixQuad, setHoveredMatrixQuad] = useState<number | null>(null);

  // Reset interaction state when transitioning frames in presentation mode
  useEffect(() => {
    if (!presentationActive) return;
    setActiveEcoSector(null);
    setHoveredMatrixQuad(null);
  }, [currentFrameIndex, presentationActive]);

  // ---------------------------------------------------------------------------
  // PRESENTATION MODE — slide variant config
  // ---------------------------------------------------------------------------
  const slideEnter = { opacity: 0, y: 28, scale: 0.97 };
  const slideCenter = { opacity: 1, y: 0, scale: 1 };
  const slideExit = { opacity: 0, y: -20, scale: 1.01 };
  const slideTrans = {
    duration: 0.48,
    ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#080c12] text-white font-sans selection:bg-[#0d9488] selection:text-white relative">
      <Navbar />

      {/* ------------------------------------------------------------------- */}
      {/* PRESENTER HUD */}
      {/* ------------------------------------------------------------------- */}
      <AnimatePresence>
        {presentationActive && hudOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-2xl bg-[#0a1220]/95 border border-[#0d9488]/25 rounded-2xl p-4 shadow-2xl backdrop-blur-xl hud-overlay"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#0d9488] font-bold uppercase">
                  Presenter Deck Control
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono text-white/45">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#0d9488]" />
                  <span>{formatTime(elapsedTime)}</span>
                </div>
                <button
                  onClick={() => {
                    setPresentationActive(false);
                    setHudOpen(false);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-[#0d9488] interactive-control"
                >
                  [EXIT]
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
              <div className="text-left font-mono">
                <h4 className="text-[9px] text-white/45 uppercase tracking-widest">
                  Slide {currentFrameIndex + 1} of {TOTAL_FRAMES}
                </h4>
                <p className="text-sm font-semibold text-white mt-1 border-l-2 border-[#0d9488] pl-3">
                  {SPEAKER_NOTES[currentFrameIndex].title}
                </p>
                <ul className="text-[10px] text-white/65 leading-relaxed mt-2 space-y-1">
                  {SPEAKER_NOTES[currentFrameIndex].points.map((note, i) => (
                    <li key={i} className="flex gap-1.5">
                      <span className="text-[#0d9488] shrink-0">›</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 md:flex-col md:pt-1">
                <button
                  onClick={prevSlide}
                  disabled={currentFrameIndex === 0 || isTransitioning}
                  className="p-2 border border-white/10 hover:border-[#0d9488]/50 disabled:opacity-25 rounded-xl hover:bg-white/5 transition-all cursor-pointer interactive-control"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="font-mono text-[9px] text-white/40 w-8 text-center">
                  {currentFrameIndex + 1}/{TOTAL_FRAMES}
                </div>
                <button
                  onClick={nextSlide}
                  disabled={currentFrameIndex === TOTAL_FRAMES - 1 || isTransitioning}
                  className="p-2 border border-white/10 hover:border-[#0d9488]/50 disabled:opacity-25 rounded-xl hover:bg-white/5 transition-all cursor-pointer interactive-control"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 w-full h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0d9488] transition-all duration-500"
                style={{
                  width: `${((currentFrameIndex + 1) / TOTAL_FRAMES) * 100}%`,
                }}
              />
            </div>

            <p className="text-[8px] text-white/25 font-mono mt-2 text-center">
              ← → navigate &nbsp;|&nbsp; P toggle HUD &nbsp;|&nbsp; ESC exit
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presentation mode enter button (scroll mode) */}
      {!presentationActive && (
        <button
          onClick={() => {
            setPresentationActive(true);
            setHudOpen(true);
            setCurrentFrameIndex(0);
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#0a1220]/90 border border-[#0d9488]/30 hover:border-[#0d9488]/70 text-[#0d9488] font-mono text-[10px] uppercase tracking-widest rounded-full shadow-xl backdrop-blur-md transition-all duration-300 interactive-control"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
          Present [P]
        </button>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SCROLL TRACK + STICKY VIEWPORT                                       */}
      {/* ------------------------------------------------------------------- */}
      <div
        ref={containerRef}
        className="relative w-full h-[800vh] bg-[#080c12]"
      >
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#080c12] z-10">

          {/* Global grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.025] pointer-events-none z-0" />
          <OrbitalRingBg />

          {/* ============================================================= */}
          {/* PRESENTATION MODE — clean AnimatePresence, no overlap         */}
          {/* ============================================================= */}
          {presentationActive && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`frame-${currentFrameIndex}`}
                initial={slideEnter}
                animate={slideCenter}
                exit={slideExit}
                transition={slideTrans}
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                {currentFrameIndex === 0 && (
                  <Scene0Hero tickerVal={tickerVal} presentationActive={true} />
                )}
                {currentFrameIndex === 1 && <Scene1WhyNow />}
                {currentFrameIndex === 2 && (
                  <Scene2Ecosystem
                    activeEcoSector={activeEcoSector}
                    setActiveEcoSector={setActiveEcoSector}
                    orbitDeg={orbitDeg}
                  />
                )}
                {currentFrameIndex === 3 && (
                  <Scene3JioConstellation tickerVal={1650} />
                )}
                {currentFrameIndex === 4 && (
                  <Scene4ValueChain
                    activeChainStep={activeChainStep}
                    setActiveChainStep={setActiveChainStep}
                  />
                )}
                {currentFrameIndex === 5 && (
                  <Scene5CapitalFlow dashOffset={0} />
                )}
                {currentFrameIndex === 6 && (
                  <Scene6Matrix
                    hoveredQuad={hoveredMatrixQuad}
                    setHoveredQuad={setHoveredMatrixQuad}
                  />
                )}
                {currentFrameIndex === 7 && <Scene7FinalThesis />}
              </motion.div>
            </AnimatePresence>
          )}

          {/* ============================================================= */}
          {/* SCROLL MODE — progress-driven stacked absolutes               */}
          {/* ============================================================= */}
          {!presentationActive && (
            <>
              {/* Scene 0: Hero */}
              <motion.div
                style={{ opacity: heroOpacity, scale: heroScale }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene0Hero tickerVal={tickerVal} presentationActive={false} />
              </motion.div>

              {/* Scene 1: Why Now */}
              <motion.div
                style={{ opacity: whyNowOpacity, y: whyNowY }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene1WhyNow />
              </motion.div>

              {/* Scene 2: Ecosystem */}
              <motion.div
                style={{ opacity: ecoOpacity, y: ecoY }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene2Ecosystem
                  activeEcoSector={activeEcoSector}
                  setActiveEcoSector={setActiveEcoSector}
                  orbitDeg={orbitDeg}
                />
              </motion.div>

              {/* Scene 3: Jio */}
              <motion.div
                style={{ opacity: jioOpacity, y: jioY }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene3JioConstellation tickerVal={tickerVal} />
              </motion.div>

              {/* Scene 4: Value Chain */}
              <motion.div
                style={{ opacity: valueChainOpacity, y: valueChainY }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene4ValueChain
                  activeChainStep={activeChainStep}
                  setActiveChainStep={setActiveChainStep}
                />
              </motion.div>

              {/* Scene 5: Capital Flow */}
              <motion.div
                style={{ opacity: flowOpacity, y: flowY }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene5CapitalFlow dashOffset={dashOffset} />
              </motion.div>

              {/* Scene 6: Opportunity Matrix */}
              <motion.div
                style={{ opacity: matrixOpacity, y: matrixY }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 6 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene6Matrix
                  hoveredQuad={hoveredMatrixQuad}
                  setHoveredQuad={setHoveredMatrixQuad}
                />
              </motion.div>

              {/* Scene 7: Final Thesis */}
              <motion.div
                style={{ opacity: thesisOpacity, y: thesisY }}
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                <Scene7FinalThesis />
              </motion.div>
            </>
          )}

          {/* ============================================================= */}
          {/* SCROLL PROGRESS INDICATOR (scroll mode)                       */}
          {/* ============================================================= */}
          {!presentationActive && (
            <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5">
              {Array.from({ length: TOTAL_FRAMES }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    currentFrameIndex === i
                      ? "bg-[#0d9488] scale-125"
                      : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

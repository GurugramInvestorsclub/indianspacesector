"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ChapterNavButton } from "@/components/chapter-nav-button";
import { usePresentation } from "@/components/presentation/use-presentation";
import { PresentationChrome } from "@/components/presentation/presentation-chrome";
import { motion, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Cpu,
  Layers,
  TrendingUp,
  Activity,
  Network,
  DollarSign,
  LineChart,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA & CONSTANTS
// ---------------------------------------------------------------------------

const TOTAL_FRAMES = 8;
const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

// WHY NOW CATALYSTS
const CATALYSTS = [
  {
    id: "deregulation",
    num: "01",
    title: "Sovereign Deregulation",
    desc: "The creation of IN-SPACe as a single-window regulator ended ISRO's monopoly, turning the state from the sole operator into a promoter of private space commerce.",
    metric: "100%",
    metricLabel: "FDI permitted in satellite manufacturing",
  },
  {
    id: "capital",
    num: "02",
    title: "Capital Influx",
    desc: "Private venture funding is replacing government budget as the primary driver of development. Space startups raised more capital in the last 24 months than the preceding decade.",
    metric: "$120M+",
    metricLabel: "VC funding raised by private space startups",
  },
  {
    id: "arbitrage",
    num: "03",
    title: "Engineering Arbitrage",
    desc: "Building aerospace hardware in India costs 1/5th to 1/10th compared to Western countries, leveraging elite talent pools at sustainable operating costs.",
    metric: "80%+",
    metricLabel: "Cost reduction in R&D engineering overheads",
  },
];

// ECOSYSTEM SECTORS
const SECTORS = [
  {
    id: "downstream",
    name: "Downstream Apps",
    tam: "$36B TAM (2030)",
    desc: "Earth observation analytics, climate risk intelligence, precision agriculture, and high-frequency communication APIs. This represents the largest financial layer of the sector.",
    color: "from-teal-500/20 to-emerald-500/20",
    border: "border-teal-500/40",
  },
  {
    id: "launchers",
    name: "Launcher Startups",
    tam: "$8B TAM (2030)",
    desc: "Dedicated small-satellite launch systems like Skyroot's Vikram series and Agnikul's Agnibaan. Solving the global queue bottleneck for commercial constellation deployment.",
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/40",
  },
  {
    id: "assembly",
    name: "Satellite Assembly",
    tam: "$15B TAM (2030)",
    desc: "Proprietary LEO satellite platforms, hyperspectral payload development, and modular bus design. Companies like Pixxel and GalaxEye building sovereign eye-in-the-sky capacity.",
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/40",
  },
  {
    id: "ground",
    name: "TTC Ground Stations",
    tam: "$6B TAM (2030)",
    desc: "Telemetry, Tracking, and Command infrastructure. Decentralized antenna networks providing reliable orbital downlinks, data decryption, and real-time command routing.",
    color: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/40",
  },
];

// VALUE CHAIN
const VALUE_CHAIN = [
  {
    step: "01",
    focus: "Upstream Components",
    title: "Components & Assembly",
    margin: "15% - 25%",
    desc: "Satellite hulls, thrusters, solar arrays, sensors.",
  },
  {
    step: "02",
    focus: "Midstream Launch",
    title: "Launch & Logistics",
    margin: "10% - 15%",
    desc: "Rocket propulsion, orbital placement, ground coordination.",
  },
  {
    step: "03",
    focus: "Satellite Fleet",
    title: "Fleet Operations",
    margin: "35% - 50%",
    desc: "Orbital slot navigation, constellation maintenance.",
  },
  {
    step: "04",
    focus: "Downstream Analytics",
    title: "Data & APIs",
    margin: "65%+",
    desc: "Satellite imagery processing, SaaS intelligence APIs.",
  },
];

// OPPORTUNITY MATRIX (2x2)
const QUADRANTS = [
  {
    title: "High TAM / Low Risk",
    label: "Satellite SaaS & API Data",
    desc: "Selling analytics data to finance, logistics, and climate risk firms. Highly scalable software margins with zero launcher liability.",
    badge: "Immediate Alpha",
  },
  {
    title: "High TAM / High Risk",
    label: "Sovereign Mega-Constellations",
    desc: "LEO broadband communication networks. Massive capital requirements with high regulatory risk, but massive monopolistic yield.",
    badge: "Strategic Play",
  },
  {
    title: "Low TAM / Low Risk",
    label: "Space Supply Chain Componentry",
    desc: "Contract manufacturing of specialized alloys, wiring, and structural parts for launchers. Stable defense-style contract margins.",
    badge: "Steady Yield",
  },
  {
    title: "Low TAM / High Risk",
    label: "Heavy Launch Logistics",
    desc: "Heavy-payload launchers and orbital transfer tugs. Extreme R&D risk with long payback windows, gated by global launch schedules.",
    badge: "Capital Intensive",
  },
];

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] tracking-[0.32em] text-[#0d9488] uppercase font-bold block mb-3">
      {children}
    </span>
  );
}

function SceneHeading({ sub, main }: { sub: string; main: React.ReactNode }) {
  return (
    <div className="max-w-3xl mb-8 text-center">
      <SceneLabel>{sub}</SceneLabel>
      <h2
        className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {main}
      </h2>
    </div>
  );
}

function OrbitalRingBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[400, 580, 760, 940].map((r, i) => (
        <div
          key={r}
          className="absolute rounded-full border border-teal-500/[0.015]"
          style={{
            width: r,
            height: r,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 1 - i * 0.18,
          }}
        />
      ))}
    </div>
  );
}

// SLIDE 0: Hero
function Slide0Hero({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(13,148,136,0.06) 0%, transparent 65%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center text-center">
        <SceneLabel>Chapter XI. Space Economy</SceneLabel>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          The
          <br />
          <span className="text-[#0d9488]">Economy</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
          The next trillion-dollar infrastructure isn&apos;t on the ground. Understand the arbitrage, private deregulation, and value chain, and you understand the commercial layout of space.
        </p>

        <div className="grid grid-cols-3 gap-0 border border-teal-500/10 bg-[#080c12]/45 backdrop-blur-md rounded-2xl overflow-hidden font-mono mb-10 w-full max-w-xl">
          {[
            { val: "$44B", label: "Global Launch TAM" },
            { val: "65%+", label: "Downstream Margins" },
            { val: "10x", label: "Cost Arbitrage" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-5 px-3 ${i !== 2 ? "border-r border-teal-500/10" : ""}`}
            >
              <span className="text-2xl font-extrabold text-[#0d9488] block">{s.val}</span>
              <span className="text-[9px] uppercase text-white/55 tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {!presentationActive && (
          <div className="flex flex-col items-center gap-2 font-mono text-[9px] text-[#0d9488]/70 tracking-[0.25em] uppercase">
            <span>Scroll to explore</span>
            <span className="w-px h-8 bg-[#0d9488]/30 relative overflow-hidden rounded-full block">
              <span className="absolute top-0 inset-x-0 h-3 bg-[#0d9488] rounded-full animate-bounce" />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

// SLIDE 1: Why Now
function Slide1WhyNow() {
  return (
    <>
      <SceneHeading sub="01. Why Now" main="Triple Engine of Acceleration" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch w-full max-w-6xl z-10">
        {CATALYSTS.map((c) => (
          <div
            key={c.id}
            className="flex flex-col bg-[#080c12]/70 border border-teal-500/10 hover:border-teal-500/30 transition-all duration-300 rounded-2xl p-6 backdrop-blur-md text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#0d9488]/60 font-bold">{c.num}</span>
              <span className="p-1.5 rounded-lg bg-teal-500/5 text-[#0d9488]">
                <Zap className="w-3.5 h-3.5" />
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#0d9488] transition-colors">
              {c.title}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-6 flex-grow">
              {c.desc}
            </p>
            <div className="border-t border-teal-500/5 pt-4 mt-auto">
              <span className="text-2xl font-black text-[#0d9488] block tracking-tight">
                {c.metric}
              </span>
              <span className="text-[9px] uppercase text-white/40 tracking-wider font-mono">
                {c.metricLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// SLIDE 2: Space Ecosystem
function Slide2Ecosystem() {
  const [activeId, setActiveId] = useState("downstream");
  const selectedSector = SECTORS.find((s) => s.id === activeId) || SECTORS[0];

  return (
    <>
      <SceneHeading sub="02. The Sectors" main="Ecosystem Segment Analysis" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full max-w-6xl z-10">
        {/* Orbital interactive rings visual */}
        <div className="lg:col-span-5 flex items-center justify-center bg-[#080c12]/40 border border-teal-500/10 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden min-h-[380px]">
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[280px] h-[280px] border border-dashed border-teal-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="w-[180px] h-[180px] border border-dashed border-teal-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          <div className="relative w-[280px] h-[280px] flex items-center justify-center">
            {/* Core Node */}
            <div className="w-16 h-16 rounded-full bg-teal-500/10 border-2 border-[#0d9488] flex flex-col items-center justify-center z-20 shadow-[0_0_20px_rgba(13,148,136,0.3)]">
              <Globe className="w-6 h-6 text-[#0d9488] animate-pulse" />
            </div>

            {/* Orbiting Nodes */}
            {[
              { id: "downstream", angle: 0, label: "Apps" },
              { id: "launchers", angle: 90, label: "Launch" },
              { id: "assembly", angle: 180, label: "Satellites" },
              { id: "ground", angle: 270, label: "Ground" },
            ].map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 100;
              const y = Math.sin(rad) * 100;
              const isActive = node.id === activeId;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveId(node.id)}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className={`absolute w-12 h-12 rounded-full border transition-all duration-300 flex flex-col items-center justify-center z-30 group cursor-pointer ${
                    isActive
                      ? "bg-[#0d9488] border-[#0d9488] text-[#030308] scale-110 shadow-lg shadow-teal-500/20"
                      : "bg-[#080c12]/90 border-teal-500/20 text-white/70 hover:border-teal-500/60 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wide font-bold">
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text descriptions */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {SECTORS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`px-4 py-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  s.id === activeId
                    ? "bg-teal-500/5 border-[#0d9488] text-white"
                    : "bg-[#080c12]/40 border-teal-500/5 text-white/50 hover:border-teal-500/10 hover:text-white/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-sans uppercase tracking-wider">{s.name}</span>
                  {s.id === activeId && <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] block" />}
                </div>
                <span className="font-mono text-[9px] text-[#0d9488] block font-bold">{s.tam}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#080c12]/90 border border-teal-500/20 rounded-2xl p-6 min-h-[160px] flex flex-col justify-center text-left">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#0d9488] block mb-2 font-bold">
              Segment Deep Dive: {selectedSector.name}
            </span>
            <p className="text-xs text-white/80 leading-relaxed mb-3">
              {selectedSector.desc}
            </p>
            <div className="flex items-center gap-2 mt-2 pt-3 border-t border-teal-500/5">
              <TrendingUp className="w-3.5 h-3.5 text-[#0d9488]" />
              <span className="font-mono text-[10px] text-white/50">Market Capitalization Projection: </span>
              <span className="font-mono text-[10px] text-white font-bold">{selectedSector.tam}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// SLIDE 3: Jio Constellation
function Slide3JioConstellation() {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 1600) {
        count += 20;
        setTicker(count);
      } else {
        setTicker(1600);
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SceneHeading sub="03. Scale Proof" main="The Jio Constellation Swarm" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        {/* Constellation Simulation */}
        <div className="lg:col-span-6 flex items-center justify-center bg-[#080c12]/40 border border-teal-500/10 rounded-2xl p-4 backdrop-blur-md min-h-[340px] relative overflow-hidden">
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px]">
            {/* Curved orbits */}
            <ellipse cx="200" cy="150" rx="140" ry="60" fill="none" stroke="rgba(13,148,136,0.12)" strokeWidth="1" />
            <ellipse cx="200" cy="150" rx="160" ry="40" fill="none" stroke="rgba(13,148,136,0.08)" strokeWidth="1.5" />
            <ellipse cx="200" cy="150" rx="120" ry="80" fill="none" stroke="rgba(13,148,136,0.06)" strokeWidth="1" />
            
            {/* Central Globe */}
            <circle cx="200" cy="150" r="50" fill="rgba(8,12,18,0.9)" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="200" cy="150" r="30" fill="none" stroke="rgba(13,148,136,0.3)" strokeWidth="1" />

            {/* Orbiting Satellite Points */}
            {[
              { cx: 70, cy: 120, r: 3 },
              { cx: 330, cy: 180, r: 4 },
              { cx: 200, cy: 70, r: 3.5 },
              { cx: 200, cy: 230, r: 3 },
              { cx: 100, cy: 185, r: 2.5 },
              { cx: 300, cy: 115, r: 4 },
              { cx: 270, cy: 130, r: 3 },
              { cx: 130, cy: 170, r: 3.5 },
            ].map((sat, i) => (
              <circle
                key={i}
                cx={sat.cx}
                cy={sat.cy}
                r={sat.r}
                fill="#0d9488"
                className="animate-[pulse_1.5s_infinite]"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>
        </div>

        {/* Constellation Metrics */}
        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <div className="bg-[#080c12]/80 border border-teal-500/20 rounded-2xl p-8 mb-6">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#0d9488] block mb-2 font-bold">
              Jio SpaceFiber Orbitals
            </span>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none font-mono">
                {ticker}+
              </span>
              <span className="text-sm font-bold text-[#0d9488] font-mono">Satellites</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              JioSpaceFiber is launching a mega-constellation of medium-Earth orbit (MEO) satellites. This broadband network will bring high-speed fiber-like connectivity to India&apos;s most remote regions, demonstrating deep downstream commercial demand.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#080c12]/40 border border-teal-500/5 rounded-xl p-4">
              <span className="text-white font-bold block text-sm mb-1">Low Latency</span>
              <span className="text-[10px] text-white/50 leading-relaxed block">MEO orbits cut signal delay down to under 50 milliseconds.</span>
            </div>
            <div className="bg-[#080c12]/40 border border-teal-500/5 rounded-xl p-4">
              <span className="text-white font-bold block text-sm mb-1">Gigabit Capacity</span>
              <span className="text-[10px] text-white/50 leading-relaxed block">Capable of broadcasting multi-gigabit throughput to regional cells.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// SLIDE 4: Value Chain
function Slide4ValueChain() {
  return (
    <>
      <SceneHeading sub="04. Value Chain" main="Upstream to Downstream Journey" />
      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {VALUE_CHAIN.map((v) => (
            <div
              key={v.step}
              className="bg-[#080c12]/80 border border-teal-500/15 rounded-2xl p-5 text-left flex flex-col justify-between min-h-[220px] hover:border-teal-500/40 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#0d9488] font-bold">
                    {v.focus}
                  </span>
                  <span className="font-mono text-xs text-white/30">{v.step}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[#0d9488] transition-colors">
                  {v.title}
                </h3>
                <p className="text-[11px] text-white/60 leading-relaxed">{v.desc}</p>
              </div>
              <div className="border-t border-teal-500/5 pt-3 mt-4">
                <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">
                  Gross Margin Profile:
                </span>
                <span className="text-base font-extrabold text-[#0d9488] font-mono">{v.margin}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#080c12]/60 border border-teal-500/5 rounded-2xl p-5 text-left flex items-start gap-4">
          <Layers className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
          <p className="text-xs text-white/70 leading-relaxed">
            <span className="text-white font-bold">Value Chain Law: </span>
            The closer you get to raw engineering and launch services (upstream/midstream), the lower the margins. The closer you get to analytics, custom APIs, and software-linked payloads (downstream), the higher the gross margin yield. The economic prize is in the software layer.
          </p>
        </div>
      </div>
    </>
  );
}

// SLIDE 5: Capital Flow
function Slide5CapitalFlow() {
  return (
    <>
      <SceneHeading sub="05. Capital Flow" main="Direct Funding Pathways" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        {/* Flow visual */}
        <div className="lg:col-span-6 bg-[#080c12]/40 border border-teal-500/10 rounded-2xl p-6 backdrop-blur-md min-h-[340px] flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px]">
            {/* Nodes */}
            <rect x="10" y="30" width="80" height="32" rx="4" fill="rgba(13,148,136,0.12)" stroke="#0d9488" strokeWidth="1" />
            <text x="50" y="50" textAnchor="middle" fontSize="9" className="font-mono" fill="#0d9488" fontWeight="bold">Gov Allocations</text>

            <rect x="10" y="150" width="80" height="32" rx="4" fill="rgba(13,148,136,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="50" y="170" textAnchor="middle" fontSize="9" className="font-mono" fill="white" fontWeight="bold">Private VCs</text>

            <circle cx="160" cy="110" r="28" fill="rgba(8,12,18,0.9)" stroke="#0d9488" strokeWidth="1.5" />
            <text x="160" y="113" textAnchor="middle" fontSize="8" className="font-mono" fill="#0d9488" fontWeight="bold">IN-SPACe</text>

            <rect x="230" y="30" width="80" height="32" rx="4" fill="rgba(13,148,136,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="270" y="50" textAnchor="middle" fontSize="8" className="font-mono" fill="white" fontWeight="bold">Startup R&D</text>

            <rect x="230" y="150" width="80" height="32" rx="4" fill="rgba(13,148,136,0.12)" stroke="#0d9488" strokeWidth="1" />
            <text x="270" y="170" textAnchor="middle" fontSize="8" className="font-mono" fill="#0d9488" fontWeight="bold">Commercial Tech</text>

            {/* Connecting lines */}
            <path d="M 90 46 L 132 110" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 90 166 L 132 110" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            <path d="M 188 110 L 230 46" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 188 110 L 230 166" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
          <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[8px] text-[#0d9488]/80 border border-teal-500/20 rounded-full px-2 py-0.5">
            <span className="w-1 h-1 rounded-full bg-[#0d9488] animate-ping" />
            <span>Interactive Flow</span>
          </div>
        </div>

        {/* Descriptions */}
        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <div className="bg-[#080c12]/80 border border-teal-500/20 rounded-2xl p-6 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#0d9488] block mb-2 font-bold">
              Regulatory Approval Routing
            </span>
            <h3 className="text-xl font-bold text-white mb-3">Capital Intermediation</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              All financial commitments—from government budgets to global venture investment—are routed and authorized under IN-SPACe guidelines. This center coordinates approvals to accelerate industrialization, reducing administrative friction to a fraction of historic cycles.
            </p>
            <div className="flex items-center gap-2 text-[#0d9488] font-mono text-xs font-bold">
              <DollarSign className="w-4 h-4" />
              <span>Sovereign Funding Pool: $1.9B allocated</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// SLIDE 6: Opportunity Matrix
function Slide6OpportunityMatrix() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <>
      <SceneHeading sub="06. Risk & Value" main="The Space Investment Matrix" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl z-10">
        {/* The 2x2 Matrix */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 min-h-[320px]">
          {QUADRANTS.map((q, i) => (
            <button
              key={q.title}
              onClick={() => setActiveIdx(i)}
              className={`p-5 rounded-2xl text-left border flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                i === activeIdx
                  ? "bg-teal-500/10 border-[#0d9488] shadow-lg shadow-teal-500/5"
                  : "bg-[#080c12]/70 border-teal-500/5 hover:border-teal-500/20"
              }`}
            >
              <div>
                <span className={`font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full block w-fit mb-3 ${
                  i === activeIdx ? "bg-[#0d9488] text-[#030308] font-bold" : "bg-white/5 text-white/60"
                }`}>
                  {q.badge}
                </span>
                <h4 className={`text-xs font-mono font-bold tracking-wide mb-1 ${
                  i === activeIdx ? "text-[#0d9488]" : "text-white/40"
                }`}>
                  {q.title}
                </h4>
                <span className="text-sm font-sans font-bold text-white block leading-snug">{q.label}</span>
              </div>
              <span className="font-mono text-[9px] text-white/20 mt-4 block">Quadrant 0{i + 1}</span>
            </button>
          ))}
        </div>

        {/* Selected quadrant detail panel */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="bg-[#080c12]/90 border border-[#0d9488]/30 rounded-2xl p-8 h-full flex flex-col justify-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#0d9488] block mb-2 font-bold">
              Investment Analysis
            </span>
            <h3 className="text-2xl font-black text-white mb-4">
              {QUADRANTS[activeIdx].label}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              {QUADRANTS[activeIdx].desc}
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-teal-500/5 font-mono text-xs">
              <div className="flex items-center gap-1 text-[#0d9488]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Recommended focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// SLIDE 7: Final Thesis
function Slide7Thesis() {
  return (
    <div className="max-w-4xl flex flex-col items-center text-center px-4 z-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(13,148,136,0.04) 0%, transparent 70%)",
        }}
      />
      <SceneLabel>07. Economic Thesis</SceneLabel>
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight text-white max-w-3xl mb-8 relative z-10"
        style={{ fontFamily: "Georgia, serif" }}
      >
        The next trillion-dollar infrastructure isn&apos;t on the ground.
      </h2>

      <p className="text-sm sm:text-base text-white/65 max-w-2xl leading-relaxed mb-12 font-light relative z-10">
        Connect launch, spacecraft, and satellite hardware to downstream analytics. The ultimate commercial value of the space sector lies in software-linked payload assets, routing global imagery and communication telemetry. That is the true prize of the space economy.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
        <ChapterNavButton
          href="/chapters/launch-vehicles"
          label="Back to The Rocket"
          variant="ghost"
          direction="back"
        />
        <Link
          href="/"
          className="interactive-control flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0d9488] hover:bg-[#0b7a70] text-white font-mono text-xs uppercase tracking-widest rounded-full font-bold shadow-lg transition-all duration-300 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Main Deck
        </Link>
      </div>

      <p className="mt-8 text-[9px] text-white/30 font-mono uppercase tracking-[0.2em] text-center relative z-10">
        Space economy assessment. Projected metrics represent 2030 target bounds.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN CHAPTER PAGE
// ---------------------------------------------------------------------------

export default function SpaceEconomyPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef } = p;

  // Scroll transforms for 8 frames
  const s0Opacity = useTransform(progress, [0.0, 0.1, 0.125], [1, 1, 0]);
  const s0Scale = useTransform(progress, [0.0, 0.125], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.09, 0.125, 0.22, 0.25], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.09, 0.125, 0.22, 0.25], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.22, 0.25, 0.34, 0.375], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.22, 0.25, 0.34, 0.375], [24, 0, 0, -24]);

  const s3Opacity = useTransform(progress, [0.34, 0.375, 0.47, 0.5], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.34, 0.375, 0.47, 0.5], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.47, 0.5, 0.59, 0.625], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.47, 0.5, 0.59, 0.625], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.59, 0.625, 0.72, 0.75], [0, 1, 1, 0]);
  const s5Y = useTransform(progress, [0.59, 0.625, 0.72, 0.75], [24, 0, 0, -24]);

  const s6Opacity = useTransform(progress, [0.72, 0.75, 0.84, 0.875], [0, 1, 1, 0]);
  const s6Y = useTransform(progress, [0.72, 0.75, 0.84, 0.875], [24, 0, 0, -24]);

  const s7Opacity = useTransform(progress, [0.84, 0.875, 1.0], [0, 1, 1]);
  const s7Y = useTransform(progress, [0.84, 0.875, 1.0], [24, 0, 0]);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#0d9488] selection:text-white relative">
      <Navbar />
      <PresentationChrome controller={p} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[800vh] bg-[#030308]">
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#030308] z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-0" />
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
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                {currentFrameIndex === 0 && <Slide0Hero presentationActive />}
                {currentFrameIndex === 1 && <Slide1WhyNow />}
                {currentFrameIndex === 2 && <Slide2Ecosystem />}
                {currentFrameIndex === 3 && <Slide3JioConstellation />}
                {currentFrameIndex === 4 && <Slide4ValueChain />}
                {currentFrameIndex === 5 && <Slide5CapitalFlow />}
                {currentFrameIndex === 6 && <Slide6OpportunityMatrix />}
                {currentFrameIndex === 7 && <Slide7Thesis />}
              </motion.div>
            </AnimatePresence>
          )}

          {/* SCROLL MODE */}
          {!presentationActive && (
            <>
              <motion.div
                style={{ opacity: s0Opacity, scale: s0Scale }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Slide0Hero presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s1Opacity, y: s1Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Slide1WhyNow />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Slide2Ecosystem />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Slide3JioConstellation />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Slide4ValueChain />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 5 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Slide5CapitalFlow />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 6 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Slide6OpportunityMatrix />
              </motion.div>

              <motion.div
                style={{ opacity: s7Opacity, y: s7Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 7 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Slide7Thesis />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

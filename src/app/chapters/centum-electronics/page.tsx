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
  Cpu,
  Satellite,
  Settings,
  Layers,
  Activity,
  Coins,
  TrendingUp,
  ShieldAlert,
  Server,
  Radio,
  FileText,
  Users,
  LineChart,
  DollarSign,
  Briefcase,
  Percent,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA & CONSTANTS
// ---------------------------------------------------------------------------

const TOTAL_FRAMES = 13;

const CENTUM_SCENES = [
  { id: "hero", name: "Centum Electronics Case Study", label: "01 / 13", startFrame: 0, endFrame: 0 },
  { id: "founding", name: "The Founding Story", label: "02 / 13", startFrame: 1, endFrame: 1 },
  { id: "evolution", name: "Value Chain Evolution", label: "03 / 13", startFrame: 2, endFrame: 2 },
  { id: "model", name: "EMS vs BTS Business Model", label: "04 / 13", startFrame: 3, endFrame: 3 },
  { id: "financials", name: "Financial Growth", label: "05 / 13", startFrame: 4, endFrame: 4 },
  { id: "mix", name: "Revenue Segmentation", label: "06 / 13", startFrame: 5, endFrame: 5 },
  { id: "orderbook", name: "Order Book Backlog", label: "07 / 13", startFrame: 6, endFrame: 6 },
  { id: "technology", name: "Exploded Payload Tech", label: "08 / 13", startFrame: 7, endFrame: 7 },
  { id: "space", name: "Orbital Integration", label: "09 / 13", startFrame: 8, endFrame: 8 },
  { id: "defence", name: "Defense Systems", label: "10 / 13", startFrame: 9, endFrame: 9 },
  { id: "efficiency", name: "Capital Metrics", label: "11 / 13", startFrame: 10, endFrame: 10 },
  { id: "valuation", name: "Valuation Explorer", label: "12 / 13", startFrame: 11, endFrame: 11 },
  { id: "thesis", name: "Investment Climax", label: "13 / 13", startFrame: 12, endFrame: 12 },
];

const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

// ---------------------------------------------------------------------------
// HELPER COMPONENTS
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
    <div className="max-w-3xl mb-6 text-center">
      <SceneLabel>{sub}</SceneLabel>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
        {main}
      </h2>
    </div>
  );
}

function Counter({
  end,
  suffix = "",
  duration = 1.0,
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

  return <span>{count}{suffix}</span>;
}

// ---------------------------------------------------------------------------
// SCENE COMPONENTS
// ---------------------------------------------------------------------------

// 0. Hero Section
function SceneHero({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/centum/centum_hero.png"
          alt="Satellite payloads and circuits"
          fill
          priority
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/70 via-[#030308]/20 to-[#030308]/95" />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "radial-gradient(ellipse 80% 70% at center, transparent 25%, #030308 90%)",
          }}
        />
      </div>

      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <SceneLabel>Research Deep Dive. Case Study</SceneLabel>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6">
          CENTUM <br className="sm:hidden" />
          <span className="text-[#FFB800]">ELECTRONICS</span>
        </h1>

        <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white/80 mb-3">
          From Hybrid Microcircuits to Complete Satellite Payloads
        </h3>

        <p className="text-xs sm:text-sm text-white/60 max-w-xl leading-relaxed mb-10 font-light">
          Three decades of climbing India&apos;s defense and space value chain.
        </p>

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

// 1. Section 1: The Founding Story
function SceneFounding({ active }: { active: boolean }) {
  const milestones = [
    { year: "1993", title: "Incorporation", desc: "Founded to build hybrid microcircuits." },
    { year: "1998", title: "Public Listing", desc: "Listed on Indian exchanges to fund scale." },
    { year: "2001", title: "ISRO Partnership", desc: "Begins supplying quartz frequency systems." },
    { year: "Today", title: "Prime Subsystems", desc: "Delivers complete payload computers." },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10 px-4 text-left">
      <div className="lg:col-span-5 flex flex-col justify-center">
        <SceneLabel>01. Origins</SceneLabel>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight uppercase mb-6">
          Where did Centum begin?
        </h2>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
          Centum Electronics was founded in 1993 by Apparao Mallavarapu. The company set out to localize the manufacturing of complex microelectronics which were heavily imported.
        </p>
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light mb-8">
          By manufacturing custom hybrid microcircuits and frequency controllers, Centum created a high-reliability hardware stack suited for defense and aerospace.
        </p>
      </div>

      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-5 flex flex-col gap-4">
          {/* Founder Profile */}
          <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center text-center backdrop-blur-md min-h-[160px]">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#FFB800]/30 mb-3 bg-[#030308]">
              <Image
                src="/centum/apparao.png"
                alt="Apparao Mallavarapu"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider block">
              Founder Profile
            </span>
            <span className="text-xs font-semibold text-white/80 mt-1">
              Apparao Mallavarapu
            </span>
          </div>

          {/* Centum Product Image */}
          <div className="flex-1 bg-[#0a0a14]/40 border border-white/5 rounded-xl overflow-hidden relative min-h-[160px]">
            <Image
              src="/centum/centum_product.png"
              alt="Centum Space Microelectronics"
              fill
              className="object-cover opacity-75 hover:opacity-95 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <span className="absolute bottom-2 left-3 font-mono text-[8px] uppercase tracking-widest text-white/55">
              Quartz Frequency Module
            </span>
          </div>
        </div>

        {/* Timeline column */}
        <div className="md:col-span-7 bg-[#0a0a14]/60 border border-white/5 rounded-xl p-5 flex flex-col justify-between">
          <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block mb-4">
            Development Milestone Roadmap
          </span>
          <div className="relative pl-4 border-l border-white/10 flex flex-col gap-4">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -10 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-[#FFB800] border border-[#030308]" />
                <span className="font-mono text-[10px] text-[#FFB800] font-bold block">{m.year}</span>
                <span className="text-xs font-semibold text-white/90 block leading-tight">{m.title}</span>
                <span className="text-[10px] text-white/50 block font-light">{m.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Section 2: The Evolution
function SceneEvolution({ active }: { active: boolean }) {
  const steps = [
    { label: "Hybrid Component", desc: "Quartz oscillators, microcircuits", val: "Level 1" },
    { label: "Electronic Module", desc: "Integrated card assemblies", val: "Level 2" },
    { label: "Subsystem", desc: "Telemetry links, power units", val: "Level 3" },
    { label: "Satellite Payload", desc: "Sensing, communication receivers", val: "Level 4" },
    { label: "Entire Radar", desc: "Active Electronically Scanned Arrays", val: "Level 5" },
  ];

  return (
    <div className="max-w-5xl w-full text-center px-4 z-10 flex flex-col justify-center h-full">
      <SceneHeading sub="02. Capability Path" main="Climbing The Value Chain" />
      <p className="text-xs sm:text-sm text-white/50 mb-10 max-w-xl mx-auto">
        Centum evolved from manufacturing raw components to integrating mission critical subsystems and full payload systems.
      </p>

      {/* Progress sequence */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto max-w-4xl mx-auto w-full relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden md:block -translate-y-1/2 z-0" />

        {steps.map((step, idx) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 15 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="flex-1 bg-[#0a0a14]/80 border border-white/10 hover:border-[#FFB800]/40 rounded-xl p-4 text-left relative z-10 w-full md:w-auto backdrop-blur-sm transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded font-bold uppercase">
                {step.val}
              </span>
              {idx < 4 && <span className="text-white/20 font-mono text-xs hidden md:inline">→</span>}
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              {step.label}
            </h4>
            <p className="text-[10px] text-white/60 leading-normal font-light">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 3. Section 3: Business Model
function SceneBusinessModel() {
  const [hovered, setHovered] = useState<number | null>(null);

  const models = [
    {
      id: "ems",
      title: "EMS (Electronic Manufacturing Services)",
      subtitle: "Build to Print",
      points: [
        "Customer owns the IP.",
        "High manufacturing scale.",
        "Typically lower operating margins.",
        "Highly recurring supply pipelines.",
      ],
      pct: "11-13% margins",
    },
    {
      id: "bts",
      title: "BTS (Build to Specification)",
      subtitle: "Build to Spec",
      points: [
        "Centum owns the core IP.",
        "Design led custom engineering.",
        "Mission critical subsystem focus.",
        "Significantly higher profit margins.",
      ],
      pct: "25-28% margins",
    },
  ];

  return (
    <div className="max-w-5xl w-full text-center px-4 z-10 flex flex-col justify-center h-full">
      <SceneHeading sub="03. Financial Model" main="Why are there two businesses?" />
      <p className="text-xs sm:text-sm text-white/50 mb-10 max-w-xl mx-auto">
        Centum operates two distinct business models that balance high volume recurring revenues with high margin custom IP projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full pointer-events-auto">
        {models.map((m, idx) => {
          const isHovered = hovered === idx;
          return (
            <div
              key={m.id}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-[#0a0a14]/80 border p-6 rounded-2xl text-left backdrop-blur-md shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[280px] ${
                isHovered ? "border-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.08)]" : "border-white/10"
              }`}
            >
              <div>
                <div className="flex justify-between items-baseline mb-4 border-b border-white/5 pb-2">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    {m.id.toUpperCase()}
                  </h3>
                  <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider font-bold">
                    {m.subtitle}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {m.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex gap-2 text-xs text-white/70">
                      <span className="text-[#FFB800] font-mono shrink-0">•</span>
                      <span className="font-light">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/5 mt-auto flex items-center justify-between text-[10px] font-mono">
                <span className="text-white/40 uppercase tracking-wider">Economics:</span>
                <span className="text-[#FFB800] font-bold uppercase tracking-widest bg-[#FFB800]/10 px-2.5 py-1 rounded">
                  {m.pct}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 4. Section 4: Financial Journey
function SceneFinancials({ active }: { active: boolean }) {
  const [consolidated, setConsolidated] = useState(true);

  // Financial datasets (consolidated vs standalone in Rs Cr)
  const data = consolidated
    ? [
        { year: "FY21", rev: 818, ebitda: 74 },
        { year: "FY22", rev: 890, ebitda: 82 },
        { year: "FY23", rev: 978, ebitda: 98 },
        { year: "FY24", rev: 1120, ebitda: 134 },
      ]
    : [
        { year: "FY21", rev: 412, ebitda: 48 },
        { year: "FY22", rev: 450, ebitda: 52 },
        { year: "FY23", rev: 512, ebitda: 64 },
        { year: "FY24", rev: 590, ebitda: 82 },
      ];

  const maxRev = 1200;

  return (
    <div className="max-w-5xl w-full text-center px-4 z-10 flex flex-col justify-center h-full">
      <SceneHeading sub="04. Performance Metrics" main="Financial Journey" />
      <p className="text-xs sm:text-sm text-white/50 mb-6 max-w-xl mx-auto">
        Consolidated operations reflect foreign subsidiaries scaling, while standalone shows domestic defense margins.
      </p>

      {/* Switch controls */}
      <div className="flex justify-center mb-8 pointer-events-auto">
        <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-1 font-mono text-[10px]">
          <button
            onClick={() => setConsolidated(true)}
            className={`px-3 py-1.5 rounded-md font-bold uppercase tracking-wider transition-colors ${
              consolidated ? "bg-[#FFB800] text-[#030308]" : "text-white/60 hover:text-white"
            }`}
          >
            Consolidated
          </button>
          <button
            onClick={() => setConsolidated(false)}
            className={`px-3 py-1.5 rounded-md font-bold uppercase tracking-wider transition-colors ${
              !consolidated ? "bg-[#FFB800] text-[#030308]" : "text-white/60 hover:text-white"
            }`}
          >
            Standalone
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto w-full pointer-events-auto">
        {/* Interactive Bar Chart */}
        <div className="lg:col-span-8 bg-[#0a0a14]/75 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex items-end justify-around gap-4 h-[200px] mb-4">
            {data.map((d, i) => {
              const heightPct = (d.rev / maxRev) * 100;
              return (
                <div key={d.year} className="flex flex-col items-center justify-end flex-1 h-full">
                  <span className="font-mono text-[9px] text-[#FFB800] mb-1 font-bold">
                    Rs {d.rev} Cr
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={active ? { height: `${heightPct}%` } : { height: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="w-full max-w-[48px] rounded-t bg-gradient-to-t from-[#FFB800]/80 to-[#ffd866]"
                  />
                  <span className="font-mono text-[10px] text-white/70 mt-2 font-bold">{d.year}</span>
                </div>
              );
            })}
          </div>
          <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">
            Revenue growth comparison chart (Rs Crore)
          </span>
        </div>

        {/* Financial Highlights */}
        <div className="lg:col-span-4 flex flex-col gap-4 text-left">
          <div className="bg-[#0a0a14]/60 border border-white/10 rounded-xl p-4">
            <span className="font-mono text-[8px] text-white/40 uppercase block tracking-wider">
              EBITDA Operating Cash
            </span>
            <span className="text-2xl font-extrabold text-[#FFB800] block mt-1">
              Rs {consolidated ? "134" : "82"} Cr
            </span>
            <span className="text-[10px] text-white/50 leading-relaxed font-light block mt-1">
              Reflects high capital recycling efficiency and stable margins.
            </span>
          </div>

          <div className="bg-[#0a0a12] border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <LineChart className="w-5 h-5 text-[#FFB800] shrink-0" />
            <div>
              <span className="font-mono text-[8px] text-white/40 uppercase block tracking-wider">Operating Margin</span>
              <span className="text-sm font-bold text-white leading-snug">
                {consolidated ? "11.9% Consolidated" : "13.8% Standalone"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Section 5: Revenue Mix
function SceneRevenueMix() {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const segments = [
    {
      name: "BTS (Build to Spec)",
      share: 65,
      growth: "24% CAGR",
      margins: "25-28%",
      quality: "High IP retention and proprietary electronics designs.",
      color: "border-[#FFB800] text-[#FFB800] bg-[#FFB800]/10",
      desc: "Custom specification-led mission assemblies designed inside Centum labs.",
    },
    {
      name: "EMS (Build to Print)",
      share: 35,
      growth: "12% CAGR",
      margins: "11-13%",
      quality: "Stable repeat orders and contract capacity utilization.",
      color: "border-white/40 text-white/80 bg-white/[0.03]",
      desc: "Volume manufacturing services conforming to external client schematics.",
    },
  ];

  return (
    <div className="max-w-5xl w-full text-center px-4 z-10 flex flex-col justify-center h-full">
      <SceneHeading sub="05. Business Segment Mix" main="Revenue Mix" />
      <p className="text-xs sm:text-sm text-white/50 mb-10 max-w-xl mx-auto">
        Centum focuses heavily on scaling its high value BTS division to capture maximum system IP rents.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto w-full pointer-events-auto">
        {/* Interactive Donut block */}
        <div className="lg:col-span-6 flex justify-center items-center h-[260px] bg-[#0a0a14]/60 border border-white/10 rounded-2xl relative">
          <svg className="w-full h-full max-w-[200px]" viewBox="0 0 100 100">
            {/* BTS segment ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#FFB800"
              strokeWidth="10"
              strokeDasharray="155 240"
              strokeDashoffset="0"
              className="cursor-pointer transition-all duration-300 hover:strokeWidth-12"
              onMouseEnter={() => setActiveSegment(0)}
              onMouseLeave={() => setActiveSegment(null)}
            />
            {/* EMS segment ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="10"
              strokeDasharray="83 240"
              strokeDashoffset="-155"
              className="cursor-pointer transition-all duration-300 hover:strokeWidth-12"
              onMouseEnter={() => setActiveSegment(1)}
              onMouseLeave={() => setActiveSegment(null)}
            />
            <text x="50" y="53" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              REVENUE
            </text>
          </svg>
        </div>

        {/* Details list */}
        <div className="lg:col-span-6 flex flex-col gap-4 text-left">
          {segments.map((seg, idx) => {
            const isActive = activeSegment === idx;
            return (
              <div
                key={seg.name}
                className={`p-5 rounded-xl border transition-all duration-300 ${
                  isActive ? "border-[#FFB800] bg-[#0a0a14]" : "border-white/10 bg-[#0a0a14]/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{seg.name}</h4>
                  <span className="font-mono text-xs font-bold text-[#FFB800]">{seg.share}% Share</span>
                </div>
                <p className="text-[11px] text-white/60 leading-normal font-light mb-3">{seg.desc}</p>
                <div className="flex gap-4 text-[10px] font-mono border-t border-white/5 pt-2 mt-2">
                  <div>
                    <span className="text-white/40 block">GROWTH:</span>
                    <span className="text-white font-bold">{seg.growth}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">MARGINS:</span>
                    <span className="text-[#FFB800] font-bold">{seg.margins}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 6. Section 6: Order Book
function SceneOrderBook({ active }: { active: boolean }) {
  const [itemsList, setItemsList] = useState<{ id: number; color: string; x: number }[]>([]);

  useEffect(() => {
    if (!active) {
      setItemsList([]);
      return;
    }
    
    // Spawn order box nodes periodically
    const interval = setInterval(() => {
      setItemsList((prev) => {
        const newItem = {
          id: Date.now() + Math.random(),
          color: Math.random() > 0.4 ? "#FFB800" : "#00a2ff",
          x: Math.random() * 80 + 10,
        };
        return [...prev.slice(-25), newItem];
      });
    }, 450);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10 px-4 text-left">
      <div className="lg:col-span-5 flex flex-col justify-center">
        <SceneLabel>06. Order Book Pipeline</SceneLabel>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight uppercase mb-6">
          Ecosystem Backlog Flow
        </h2>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
          Centum carries an order book exceeding Rs 1,500 Crore (approx $180M), offering high revenue visibility.
        </p>
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light mb-6">
          The backlog is predominantly composed of long-duration, high-quality BTS defense and space contracts with sovereign customers.
        </p>

        <div className="flex gap-4 text-[10px] font-mono border-t border-white/5 pt-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-[#FFB800]" />
            <span className="text-white/60">BTS Backlog</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-[#00a2ff]" />
            <span className="text-white/60">EMS backlog</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex justify-center items-center relative h-[360px] md:h-[400px] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

        {/* Animated Order Backlog Warehouse Visualizer */}
        <svg className="w-full h-full max-w-[400px]" viewBox="0 0 200 200">
          {/* Warehouse container outline */}
          <rect x="10" y="80" width="180" height="90" rx="4" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(255, 184, 0, 0.25)" strokeWidth="1.5" />
          <text x="100" y="72" fill="rgba(255,255,255,0.4)" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            ORDER BOOK CONSOLIDATION DEPOT
          </text>

          {/* Falling glowing order nodes */}
          <AnimatePresence>
            {itemsList.map((item) => (
              <motion.g
                key={item.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 135 + Math.random() * 20, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeIn" }}
              >
                <circle cx={item.x} cy="0" r="3.5" fill={item.color} className="shadow-lg" />
                <circle cx={item.x} cy="0" r="7" fill="transparent" stroke={item.color} strokeWidth="0.5" className="animate-ping" />
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>

        <div className="absolute bottom-4 right-4 bg-[#030308]/90 border border-white/10 px-3 py-2 rounded-lg font-mono text-[9px] text-[#FFB800] uppercase tracking-wider text-right">
          <span>Backlog Volume</span>
          <span className="block text-white text-xs font-bold font-sans">Rs 1,500 Cr+</span>
        </div>
      </div>
    </div>
  );
}

// 7. Section 7: Technology (Exploded Payload Diagram)
function SceneTechnology() {
  const [selectedPart, setSelectedPart] = useState<string>("receiver");

  const components = {
    receiver: {
      name: "ELINT / ISR Digital Receiver",
      desc: "Electronic intelligence receiver payloads mapping signals on defense orbits.",
      detail: "Centum designs the core analog-to-digital signal converters, processors, and RF filters that intercept and map strategic defense signals.",
    },
    transceiver: {
      name: "Satellite Payloads Subsystem",
      desc: "Complete frequency converters and onboard transponders for communication satellites.",
      detail: "Supplying local frequency converters and digital transceivers that process satellite broadband signals.",
    },
    amplifier: {
      name: "AESA Radar Transmitter Modules",
      desc: "Gallium Nitride (GaN) solid-state power amplifier modules.",
      detail: "High-density solid-state power amplifiers powering Active Electronically Scanned Array (AESA) radar systems.",
    },
  };

  const activeComp = components[selectedPart as keyof typeof components] || components.receiver;

  return (
    <div className="max-w-6xl w-full text-center px-4 z-10 flex flex-col justify-center h-full py-16 md:py-8 overflow-y-auto no-scrollbar">
      <SceneHeading sub="07. Technical Arbitrage" main="Satellite Payload Technology" />
      <p className="text-xs sm:text-sm text-white/50 mb-8 max-w-xl mx-auto">
        Centum develops key electronics that process signals and communicate on high-orbit missions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto w-full pointer-events-auto">
        {/* Interactive Exploded Layout SVG */}
        <div className="lg:col-span-7 flex justify-center items-center h-[280px] md:h-[320px] bg-[#0a0a14]/60 border border-white/10 rounded-2xl relative">
          <svg className="w-full h-full max-w-[360px]" viewBox="0 0 200 200">
            {/* Top segment */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setSelectedPart("receiver")}
              onClick={() => setSelectedPart("receiver")}
            >
              <rect x="50" y="30" width="100" height="24" rx="2" fill={selectedPart === "receiver" ? "rgba(255,184,0,0.15)" : "#0a0a14"} stroke={selectedPart === "receiver" ? "#FFB800" : "rgba(255,255,255,0.2)"} strokeWidth="1" />
              <text x="100" y="44" fill={selectedPart === "receiver" ? "#FFB800" : "#fff"} fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                DIGITAL RECEIVER PAYLOAD
              </text>
            </g>

            {/* Middle segment */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setSelectedPart("transceiver")}
              onClick={() => setSelectedPart("transceiver")}
            >
              <rect x="40" y="70" width="120" height="28" rx="2" fill={selectedPart === "transceiver" ? "rgba(255,184,0,0.15)" : "#0a0a14"} stroke={selectedPart === "transceiver" ? "#FFB800" : "rgba(255,255,255,0.2)"} strokeWidth="1" />
              <text x="100" y="86" fill={selectedPart === "transceiver" ? "#FFB800" : "#fff"} fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                FREQUENCY TRANSCIEVER
              </text>
            </g>

            {/* Bottom segment */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setSelectedPart("amplifier")}
              onClick={() => setSelectedPart("amplifier")}
            >
              <rect x="60" y="115" width="80" height="24" rx="2" fill={selectedPart === "amplifier" ? "rgba(255,184,0,0.15)" : "#0a0a14"} stroke={selectedPart === "amplifier" ? "#FFB800" : "rgba(255,255,255,0.2)"} strokeWidth="1" />
              <text x="100" y="129" fill={selectedPart === "amplifier" ? "#FFB800" : "#fff"} fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                GaN TRANSMITTER MODULE
              </text>
            </g>

            {/* Explosion lines */}
            <line x1="100" y1="54" x2="100" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="100" y1="98" x2="100" y2="115" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* Dynamic Detail card */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPart}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="h-full bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6 text-left backdrop-blur-md shadow-2xl flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block mb-2">
                  Payload Subsystem Detail
                </span>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3">
                  {activeComp.name}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-light mb-4">
                  {activeComp.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 mt-6">
                <span className="font-mono text-[9px] text-[#FFB800]/70 uppercase block tracking-wider">Engineering Specs:</span>
                <p className="text-xs text-white/60 leading-normal font-light mt-1">
                  {activeComp.detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// 8. Section 8: Space Business
function SceneSpaceBusiness() {
  const steps = [
    { label: "ISRO Launch", sub: "Commercial payload vehicle insertion." },
    { label: "Satellite Bus", sub: "Modular structural casing and battery bus." },
    { label: "Centum Payloads", sub: "Onboard communication frequency converters.", highlight: true },
    { label: "Mission Computer", sub: "Centum flight control processing computers.", highlight: true },
    { label: "Ground TTC Link", sub: "Telemetry downlink transponder stations." },
  ];

  return (
    <div className="max-w-5xl w-full text-center px-4 z-10 flex flex-col justify-center h-full">
      <SceneHeading sub="08. Space Operations" main="Where Centum Fits in Space" />
      <p className="text-xs sm:text-sm text-white/50 mb-12 max-w-xl mx-auto">
        Centum owns the core technology inside communications and radar payloads, rather than building the raw rocket shell.
      </p>

      {/* Dotted pathway flowchart */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-3 pointer-events-auto max-w-4xl mx-auto w-full">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 hidden lg:block -translate-y-1/2 z-0" />

        {steps.map((s, idx) => (
          <div
            key={s.label}
            className={`flex-1 p-5 rounded-xl border text-left relative z-10 w-full lg:w-auto backdrop-blur-md transition-all duration-300 ${
              s.highlight ? "border-[#FFB800] bg-[#FFB800]/5 shadow-[0_0_16px_rgba(255,184,0,0.06)]" : "border-white/10 bg-[#0a0a14]/90"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`font-mono text-[9px] ${s.highlight ? "text-[#FFB800] font-bold" : "text-white/40"}`}>
                STAGE 0{idx + 1}
              </span>
              {s.highlight && <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-ping" />}
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 line-clamp-1">
              {s.label}
            </h4>
            <p className="text-[10px] text-white/60 leading-normal font-light">
              {s.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. Section 9: Defence Business (Radar Scope Visualizer)
function SceneDefenceBusiness({ active }: { active: boolean }) {
  const radarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    let animFrame: number;
    const startTime = performance.now();

    const loop = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const angle = (elapsed * 60) % 360;

      if (radarRef.current) {
        radarRef.current.style.transform = `rotate(${angle}deg)`;
      }

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [active]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10 px-4 text-left">
      <div className="lg:col-span-5 flex flex-col justify-center">
        <SceneLabel>09. Strategic Protection</SceneLabel>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight uppercase mb-6">
          Defence Business
        </h2>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
          Centum designs key receiver and amplifier components inside Active Electronically Scanned Array (AESA) radar systems and electronic warfare suites.
        </p>
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light mb-6">
          By utilizing Gallium Nitride (GaN) semiconductor designs, Centum increases power efficiency and target detection range for sovereign defense programs.
        </p>
      </div>

      <div className="lg:col-span-7 flex justify-center items-center relative h-[360px] md:h-[400px] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

        {/* Animated Radar PPI Scope Visualizer */}
        <div className="relative w-[220px] h-[220px] rounded-full border border-white/10 flex items-center justify-center">
          {/* Concentric rings */}
          <div className="absolute w-[160px] h-[160px] rounded-full border border-white/5" />
          <div className="absolute w-[100px] h-[100px] rounded-full border border-white/5" />

          {/* Sweeping line */}
          <div
            ref={radarRef}
            className="absolute inset-0 origin-center"
            style={{ willChange: "transform" }}
          >
            <div
              className="absolute top-0 left-1/2 w-px h-1/2"
              style={{
                background: "linear-gradient(to top, transparent, #FFB800)",
                boxShadow: "0 0 12px #FFB800",
              }}
            />
          </div>

          {/* Simulated detected targets */}
          <div className="absolute w-2 h-2 rounded-full bg-[#FFB800] top-12 left-16 animate-ping" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white/70 bottom-16 right-20 animate-pulse" />
        </div>

        <div className="absolute bottom-4 right-4 bg-[#030308]/90 border border-white/10 px-3 py-2 rounded-lg font-mono text-[9px] text-[#FFB800] uppercase tracking-wider text-right">
          <span>Defense System</span>
          <span className="block text-white text-xs font-bold font-sans">Virupaksha AESA</span>
        </div>
      </div>
    </div>
  );
}

// 10. Section 10: Capital Efficiency
function SceneCapitalEfficiency() {
  const metrics = [
    { label: "Working Capital Cycle", val: "90 Days", desc: "Normalized accounts receivable collection structures." },
    { label: "Receivables", val: "Rs 280 Cr", desc: "Stable cash flows secured by public defense contract terms." },
    { label: "Inventory Holding", val: "115 Days", desc: "Maintained strategically to prevent supply chain blocks." },
    { label: "Capital Employed (ROCE)", val: "18.2%", desc: "Climbing efficiently as high margin BTS sales grow." },
  ];

  return (
    <div className="max-w-5xl w-full text-center px-4 z-10 flex flex-col justify-center h-full">
      <SceneHeading sub="10. Operational Health" main="Capital Efficiency" />
      <p className="text-xs sm:text-sm text-white/50 mb-10 max-w-xl mx-auto">
        Climbing the value chain allows Centum to recycle capital more efficiently with stable cash cycles.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto max-w-4xl mx-auto w-full">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="flex flex-col justify-between p-5 bg-[#0a0a14]/65 border border-white/10 rounded-xl text-left h-[180px] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            <div>
              <span className="text-2xl font-extrabold text-[#FFB800] block mb-1">
                {m.val}
              </span>
              <span className="font-mono text-[9px] text-white uppercase tracking-wider block font-bold mb-3">
                {m.label}
              </span>
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed font-light mt-auto">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 11. Section 11: Valuation (Interactive Sliders)
function SceneValuation() {
  const [growth, setGrowth] = useState(15); // 5% to 30%
  const [margin, setMargin] = useState(18); // 10% to 35%
  const [multiple, setMultiple] = useState(25); // 10x to 45x

  const estimatedEBITDA = useMemo(() => {
    // Basic projection logic: Base revenue Rs 1,120 Cr * Growth * Margin
    const projectedRev = 1120 * (1 + growth / 100);
    return Math.floor(projectedRev * (margin / 100));
  }, [growth, margin]);

  const estimatedEnterpriseValue = useMemo(() => {
    return Math.floor(estimatedEBITDA * multiple);
  }, [estimatedEBITDA, multiple]);

  return (
    <div className="max-w-6xl w-full text-center px-4 z-10 flex flex-col justify-center h-full py-16 md:py-8 overflow-y-auto no-scrollbar">
      <SceneHeading sub="11. Forward Projection" main="Valuation Explorer" />
      <p className="text-xs sm:text-sm text-white/50 mb-8 max-w-xl mx-auto">
        Adjust growth and margin drivers below to project future operating EBITDA and Enterprise Value.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto w-full pointer-events-auto">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-6 bg-[#0a0a14]/70 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-md space-y-6">
          <span className="font-mono text-[9px] text-white/40 uppercase block tracking-wider mb-2">
            Interactive Assumptions
          </span>

          {/* Slider 1: Growth */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-semibold text-white/90">Revenue Growth Rate</span>
              <span className="font-mono text-xs font-bold text-[#FFB800]">{growth}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={growth}
              onChange={(e) => setGrowth(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>

          {/* Slider 2: Margin */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-semibold text-white/90">EBITDA margin</span>
              <span className="font-mono text-xs font-bold text-[#FFB800]">{margin}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="35"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>

          {/* Slider 3: Multiple */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-semibold text-white/90">EV/EBITDA multiple</span>
              <span className="font-mono text-xs font-bold text-[#FFB800]">{multiple}x</span>
            </div>
            <input
              type="range"
              min="10"
              max="45"
              value={multiple}
              onChange={(e) => setMultiple(Number(e.target.value))}
              className="w-full accent-[#FFB800] cursor-pointer"
            />
          </div>
        </div>

        {/* Projections Output Panel */}
        <div className="lg:col-span-6 bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6 text-left backdrop-blur-md shadow-2xl flex flex-col justify-between">
          <div>
            <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block mb-4">
              Projected Valuation Matrix
            </span>

            <div className="space-y-4">
              <div>
                <span className="text-white/40 text-[10px] font-mono block">Projected EBITDA</span>
                <span className="text-2xl font-extrabold text-white">Rs {estimatedEBITDA} Cr</span>
              </div>

              <div>
                <span className="text-white/40 text-[10px] font-mono block">Projected Enterprise Value</span>
                <span className="text-3xl font-extrabold text-[#FFB800]">Rs {estimatedEnterpriseValue} Cr</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-6 font-mono text-[9px] text-white/50 leading-relaxed font-light">
            Calculated on trailing Base Consolidated revenue of Rs 1,120 Cr.
          </div>
        </div>
      </div>
    </div>
  );
}

// 12. Slide 12: Climax & Final Thesis
function SceneThesis({ presentationActive = false }: { presentationActive?: boolean }) {
  const steps = ["Component", "Subsystem", "Payload", "Mission", "Platform", "Prime Contractor"];

  return (
    <div className="max-w-4xl flex flex-col items-center justify-center h-full mx-auto text-center px-4 pb-12">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(255,184,0,0.06) 0%, transparent 70%)",
        }}
      />

      <SceneLabel>Investment Thesis</SceneLabel>

      <h2
        className={`font-light tracking-wide text-white max-w-3xl relative z-10 leading-tight ${
          presentationActive
            ? "mb-4 text-2xl sm:text-3xl lg:text-4xl"
            : "mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl"
        }`}
      >
        <span className="block mb-1 text-white/65">Centum didn&apos;t simply grow.</span>
        <span className="block mb-2 text-[#FFB800] font-bold">It climbed the value chain.</span>
      </h2>

      {/* Animated value ladder */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-xl mx-auto mb-6 pointer-events-none">
        {steps.map((s, idx) => (
          <React.Fragment key={s}>
            <span className="font-mono text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/80">
              {s}
            </span>
            {idx < steps.length - 1 && <span className="text-white/20 font-mono text-xs">→</span>}
          </React.Fragment>
        ))}
      </div>

      <p className={`text-xs sm:text-sm text-white/65 max-w-2xl leading-relaxed font-light relative z-10 ${
        presentationActive ? "mb-4" : "mb-6 sm:mb-8"
      }`}>
        The highest-value businesses aren&apos;t built by manufacturing more. They are built by owning more of the system.
      </p>

      {!presentationActive && (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
            <ChapterNavButton
              href="/case-studies"
              label="Back to Case Studies"
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
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN CHAPTER PAGE
// ---------------------------------------------------------------------------

export default function CentumElectronicsPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef } = p;

  // Scroll transforms for 13 frames (each spans 1/13 ~ 0.0769 width)
  const heroOpacity = useTransform(progress, [0.0, 0.05, 0.0769], [1, 1, 0]);
  const heroScale = useTransform(progress, [0.0, 0.0769], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.05, 0.0769, 0.128, 0.1538], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.05, 0.0769, 0.128, 0.1538], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.128, 0.1538, 0.205, 0.2308], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.128, 0.1538, 0.205, 0.2308], [24, 0, 0, -24]);

  const s3Opacity = useTransform(progress, [0.205, 0.2308, 0.282, 0.3077], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.205, 0.2308, 0.282, 0.3077], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.282, 0.3077, 0.359, 0.3846], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.282, 0.3077, 0.359, 0.3846], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.359, 0.3846, 0.436, 0.4615], [0, 1, 1, 0]);
  const s5Y = useTransform(progress, [0.359, 0.3846, 0.436, 0.4615], [24, 0, 0, -24]);

  const s6Opacity = useTransform(progress, [0.436, 0.4615, 0.513, 0.5385], [0, 1, 1, 0]);
  const s6Y = useTransform(progress, [0.436, 0.4615, 0.513, 0.5385], [24, 0, 0, -24]);

  const s7Opacity = useTransform(progress, [0.513, 0.5385, 0.59, 0.6154], [0, 1, 1, 0]);
  const s7Y = useTransform(progress, [0.513, 0.5385, 0.59, 0.6154], [24, 0, 0, -24]);

  const s8Opacity = useTransform(progress, [0.59, 0.6154, 0.667, 0.6923], [0, 1, 1, 0]);
  const s8Y = useTransform(progress, [0.59, 0.6154, 0.667, 0.6923], [24, 0, 0, -24]);

  const s9Opacity = useTransform(progress, [0.667, 0.6923, 0.744, 0.7692], [0, 1, 1, 0]);
  const s9Y = useTransform(progress, [0.667, 0.6923, 0.744, 0.7692], [24, 0, 0, -24]);

  const s10Opacity = useTransform(progress, [0.744, 0.7692, 0.821, 0.8462], [0, 1, 1, 0]);
  const s10Y = useTransform(progress, [0.744, 0.7692, 0.821, 0.8462], [24, 0, 0, -24]);

  const s11Opacity = useTransform(progress, [0.821, 0.8462, 0.897, 0.9231], [0, 1, 1, 0]);
  const s11Y = useTransform(progress, [0.821, 0.8462, 0.897, 0.9231], [24, 0, 0, -24]);

  const s12Opacity = useTransform(progress, [0.897, 0.9231, 1.0], [0, 1, 1]);
  const s12Y = useTransform(progress, [0.897, 0.9231, 1.0], [24, 0, 0]);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#FFB800] selection:text-[#030308] relative overflow-x-hidden">
      <Navbar />
      <PresentationChrome controller={p} scenes={CENTUM_SCENES} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[1300vh] bg-[#030308]">
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#030308] z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.025] pointer-events-none z-0" />

          {/* PRESENTATION MODE */}
          {presentationActive && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`frame-${currentFrameIndex}`}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.01 }}
                transition={{ duration: 0.48, ease: [0.25, 1, 0.5, 1] }}
                className={`${[0, 12].includes(currentFrameIndex) ? "absolute inset-0 w-full h-full z-10 pointer-events-auto" : SLIDE_BASE} text-center pointer-events-auto h-full`}
              >
                {currentFrameIndex === 0 && <SceneHero presentationActive={true} />}
                {currentFrameIndex === 1 && <SceneFounding active={true} />}
                {currentFrameIndex === 2 && <SceneEvolution active={true} />}
                {currentFrameIndex === 3 && <SceneBusinessModel />}
                {currentFrameIndex === 4 && <SceneFinancials active={true} />}
                {currentFrameIndex === 5 && <SceneRevenueMix />}
                {currentFrameIndex === 6 && <SceneOrderBook active={true} />}
                {currentFrameIndex === 7 && <SceneTechnology />}
                {currentFrameIndex === 8 && <SceneSpaceBusiness />}
                {currentFrameIndex === 9 && <SceneDefenceBusiness active={true} />}
                {currentFrameIndex === 10 && <SceneCapitalEfficiency />}
                {currentFrameIndex === 11 && <SceneValuation />}
                {currentFrameIndex === 12 && <SceneThesis presentationActive={true} />}
              </motion.div>
            </AnimatePresence>
          )}

          {/* SCROLL MODE */}
          {!presentationActive && (
            <>
              <motion.div
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              >
                <SceneHero presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s1Opacity, y: s1Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneFounding active={currentFrameIndex === 1} />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneEvolution active={currentFrameIndex === 2} />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneBusinessModel />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneFinancials active={currentFrameIndex === 4} />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 5 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneRevenueMix />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 6 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneOrderBook active={currentFrameIndex === 6} />
              </motion.div>

              <motion.div
                style={{ opacity: s7Opacity, y: s7Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 7 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneTechnology />
              </motion.div>

              <motion.div
                style={{ opacity: s8Opacity, y: s8Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 8 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneSpaceBusiness />
              </motion.div>

              <motion.div
                style={{ opacity: s9Opacity, y: s9Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 9 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneDefenceBusiness active={currentFrameIndex === 9} />
              </motion.div>

              <motion.div
                style={{ opacity: s10Opacity, y: s10Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 10 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneCapitalEfficiency />
              </motion.div>

              <motion.div
                style={{ opacity: s11Opacity, y: s11Y }}
                className={`absolute inset-0 w-full h-full z-10 ${
                  currentFrameIndex === 11 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneValuation />
              </motion.div>

              <motion.div
                style={{ opacity: s12Opacity, scale: s12Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneThesis presentationActive={false} />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

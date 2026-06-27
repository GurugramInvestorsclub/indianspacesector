"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { ChapterNavButton } from "@/components/chapter-nav-button";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Rocket,
  ShieldAlert,
  Flame,
  Building2,
  Landmark,
  Factory,
  TrendingUp,
  Scale,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

// Scene 1 - Why space is becoming critical
const CATALYSTS = [
  {
    id: 0,
    icon: Rocket,
    label: "The SpaceX Wake-Up Call",
    stat: "$469M",
    statLabel: "earned launching foreign satellites",
    headline: "ISRO ran launches at a fraction of global cost - then SpaceX ate our lunch.",
    points: [
      "SpaceX's cost-per-kg undercut even ISRO's famously cheap launches.",
      "ISRO became the bottleneck - historically the sole architect and executor of every mission.",
      "Private sector was limited to component fabrication under state-owned designs.",
    ],
  },
  {
    id: 1,
    icon: ShieldAlert,
    label: "The Geopolitical Imperative",
    stat: "16",
    statLabel: "satellites launched by China with ISR & defence capability",
    headline: "Space is now national-security infrastructure, not a science project.",
    points: [
      "The Pahalgam terror attackers reportedly got away aided by Chinese satellite assistance.",
      "China is rapidly fielding ISR (intelligence, surveillance, reconnaissance) constellations.",
      "Sovereign orbital capability is now a strategic necessity for India.",
    ],
  },
  {
    id: 2,
    icon: Flame,
    label: "The Innovator's Dilemma",
    stat: "Innovate or perish",
    statLabel: "the incumbent's choice",
    headline: "Incumbents that refuse to disrupt themselves get disrupted.",
    points: [
      "Steel and pharma (the GLP-1 wave) show how fast a dominant player can be overtaken.",
      "ISRO must cede commercial ground to private players - or fall behind globally.",
      "Public funding is gradually being replaced by private capital.",
    ],
  },
];

// Scene 2 - Institutional pillars
const PILLARS = [
  {
    id: 0,
    name: "ISRO",
    role: "Indian Space Research Organisation",
    desc: "Refocusing on advanced R&D and technology transfer - stepping back from being the sole operator.",
    icon: Rocket,
  },
  {
    id: 1,
    name: "IN-SPACe",
    role: "Promotion & Authorisation Centre",
    desc: "Autonomous single-window regulator promoting and authorising non-governmental space activity.",
    icon: Landmark,
  },
  {
    id: 2,
    name: "NSIL",
    role: "NewSpace India Limited",
    desc: "The commercial arm executing launch services and scaling up manufacturing.",
    icon: Factory,
  },
];

// Scene 3 — FDI framework
const FDI_ROWS = [
  { sector: "Components Manufacturing", auto: "100%", route: "Automatic route", emphasis: true },
  { sector: "Satellite Mfg & Operations", auto: "up to 74%", route: "Govt route beyond", emphasis: false },
  { sector: "Launch Vehicles & Spaceports", auto: "up to 49%", route: "Govt route above", emphasis: false },
];

const POLICY_HIGHLIGHTS = [
  "Indian Space Policy 2023 & the 2024 Norms allow the private sector to run end-to-end space activities.",
  "Over 100 technology-transfer agreements completed by late 2024.",
  "Promotional schemes include a ₹500 crore venture fund and technology-adoption funds.",
];

// Scene 4 — Market projections
const MARKET_BARS = [
  { year: "2026", value: 8.4, label: "$8.4B", share: "~2–3% global", pct: 8.4 },
  { year: "2033", value: 44, label: "$44B", share: "~8% global", pct: 44 },
  { year: "2040", value: 100, label: "$100B", share: "~10% global", pct: 100 },
];

const REFORM_TIMELINE = [
  { year: "2019", title: "NSIL Formed", desc: "Commercial interface of ISRO established to transfer technology." },
  { year: "2020", title: "Private Sector Opened", desc: "Historical space reforms initialized by the central government." },
  { year: "2022", title: "IN-SPACe Operational", desc: "Single window clearing regulator begins approving private operations." },
  { year: "2023", title: "Indian Space Policy", desc: "Defines roles and outlines formal guidelines for private entities." },
  { year: "2024", title: "Liberalised FDI", desc: "Allows up to 100 percent foreign investment in space components." },
  { year: "2024-2025", title: "Tech Adoption Fund", desc: "Strategic capital pool to support deep tech startup research." },
  { year: "Today", title: "400+ Startups", desc: "Venture backed commercial acceleration across all layers." },
];

// ---------------------------------------------------------------------------
// FRAME CONFIG
// ---------------------------------------------------------------------------
const TOTAL_FRAMES = 8;

const PRESENTATION_SCENES = [
  { id: "hero", name: "Tactical Briefing", label: "01 / 08", startFrame: 0, endFrame: 0 },
  { id: "why-critical", name: "Why Space Became Critical", label: "02 / 08", startFrame: 1, endFrame: 1 },
  { id: "ecosystem", name: "Ecosystem Architecture", label: "03 / 08", startFrame: 2, endFrame: 2 },
  { id: "timeline", name: "Timeline of Reform", label: "04 / 08", startFrame: 3, endFrame: 3 },
  { id: "fdi-table", name: "FDI Sub-Sector Caps", label: "05 / 08", startFrame: 4, endFrame: 4 },
  { id: "fdi-highlights", name: "FDI Policy Highlights", label: "06 / 08", startFrame: 5, endFrame: 5 },
  { id: "market-trajectory", name: "Market Size & Projections", label: "07 / 08", startFrame: 6, endFrame: 6 },
  { id: "thesis", name: "The Thesis", label: "08 / 08", startFrame: 7, endFrame: 7 },
];

// ---------------------------------------------------------------------------
// SHARED UI
// ---------------------------------------------------------------------------
const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] tracking-[0.32em] text-[#FFB800] uppercase font-bold block mb-3">
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
        style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
      >
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

// ---------------------------------------------------------------------------
// SCENES
// ---------------------------------------------------------------------------

function Scene0Hero({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/india_night_from_orbit.png"
          alt="India at night viewed from orbit"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/40 via-[#030308]/15 to-[#030308]/80" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at center, transparent 25%, #030308 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center text-center">
        <SceneLabel>Chapter XI - Tactical Briefing</SceneLabel>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6"
        >
          The Paradigm
          <br />
          <span className="text-[#FFB800]">Shift</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
          India&apos;s space sector is being rebuilt - from a single
          state-run architect into an open platform powered by private
          capital, liberalized policy, and strategic necessity.
        </p>

        <div className="grid grid-cols-3 gap-0 border border-white/10 rounded-2xl overflow-hidden font-mono mb-10 w-full max-w-xl">
          {[
            { val: "$8.4B", label: "Market today (2026)" },
            { val: "$100B", label: "Target by 2040" },
            { val: "~10%", label: "Global share goal" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-5 px-3 ${i !== 2 ? "border-r border-white/10" : ""}`}
            >
              <span className="text-2xl font-extrabold text-[#FFB800] block">
                {s.val}
              </span>
              <span className="text-[9px] uppercase text-white/55 tracking-wider">
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

function Scene1WhyCritical({
  active,
  setActive,
}: {
  active: number;
  setActive: (n: number) => void;
}) {
  const cat = CATALYSTS[active];
  const Icon = cat.icon;

  // Track prefers-reduced-motion for accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const backgrounds = [
    "/catalyst_spacex.png",
    "/catalyst_geopolitical.png",
    "/catalyst_innovator.png",
  ];

  return (
    <>
      {/* Cinematic Dynamic Background Layer */}
      <div className="absolute w-screen h-[100dvh] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 overflow-hidden z-0 pointer-events-none">
        {backgrounds.map((bg, idx) => {
          const isActive = idx === active;
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                opacity: isActive ? 0.55 : 0,
                scale: prefersReducedMotion ? 1 : isActive ? 1.03 : 1.0,
                filter: prefersReducedMotion ? "blur(0px)" : isActive ? "blur(0px)" : "blur(6px)",
                x: prefersReducedMotion ? 0 : isActive ? 0 : (idx < active ? -12 : 12),
              }}
              transition={{
                duration: prefersReducedMotion ? 0.35 : 0.85,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={bg}
                alt=""
                fill
                priority
                className="object-cover object-center"
              />
            </motion.div>
          );
        })}
        {/* Soft overlays to blend with the dark theme and keep text highly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/30 via-transparent to-[#030308]/55" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at center, transparent 40%, #030308 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <SceneHeading
          sub="01. THE TRIGGER"
          main="Why Space Became Critical"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full max-w-5xl">
          {/* Selector rail */}
          <div className="lg:col-span-5 flex flex-col gap-3">
          {CATALYSTS.map((c) => {
            const CIcon = c.icon;
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                onMouseEnter={() => setActive(c.id)}
                onClick={() => setActive(c.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 interactive-control ${
                  isActive
                    ? "bg-[#FFB800]/10 border-[#FFB800] shadow-[0_0_18px_rgba(255,184,0,0.15)]"
                    : "bg-[#0a0a14]/90 border-white/5 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isActive
                      ? "bg-[#FFB800] border-[#FFB800] text-[#030308]"
                      : "bg-white/5 border-white/10 text-white/60"
                  }`}
                >
                  <CIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/40 block">
                    Catalyst 0{c.id + 1}
                  </span>
                  <h3
                    className={`text-sm font-bold uppercase tracking-wide ${
                      isActive ? "text-[#FFB800]" : "text-white"
                    }`}
                  >
                    {c.label}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="h-full bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6 md:p-7 text-left backdrop-blur-md shadow-2xl flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#FFB800]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    {cat.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl md:text-3xl font-black text-[#FFB800] block leading-none">
                    {cat.stat}
                  </span>
                  <span className="text-[9px] text-white/45 font-mono uppercase tracking-wide">
                    {cat.statLabel}
                  </span>
                </div>
              </div>

              <h3
                className="text-xl md:text-2xl font-light text-white leading-snug mb-5"
              >
                {cat.headline}
              </h3>

              <ul className="space-y-3 text-sm text-white/80 leading-relaxed">
                {cat.points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#FFB800] font-mono text-xs mt-0.5 shrink-0">
                      0{i + 1}
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </>
  );
}

function Scene2Ecosystem({
  activePillar,
  setActivePillar,
}: {
  activePillar: number;
  setActivePillar: (n: number) => void;
}) {
  return (
    <>
      <SceneHeading
        sub="02. ECOSYSTEM ARCHITECTURE"
        main="Custodians of the Indian Space Ecosystem"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        {/* Org chart Image */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14]/60 backdrop-blur-md">
            <Image
              src="/indian_space_ecosystem.jpg"
              alt="The Indian Space Ecosystem Map"
              fill
              sizes="(max-w-1024px) 100vw, 700px"
              className="object-cover object-center select-none"
            />
          </div>
          <p className="text-center text-[8px] text-white/30 font-mono uppercase tracking-wider">
            Figure 1 - Custodians of the Indian Space Ecosystem
          </p>
        </div>

        {/* Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] font-bold mb-1">
            Institutional Pillars
          </span>
          {PILLARS.map((p) => {
            const PIcon = p.icon;
            const isActive = p.id === activePillar;
            return (
              <button
                key={p.id}
                onMouseEnter={() => setActivePillar(p.id)}
                onClick={() => setActivePillar(p.id)}
                className={`flex items-start gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 interactive-control ${
                  isActive
                    ? "bg-[#FFB800]/10 border-[#FFB800] shadow-[0_0_15px_rgba(255,184,0,0.12)]"
                    : "bg-[#0a0a14]/90 border-white/5 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                    isActive
                      ? "bg-[#FFB800] border-[#FFB800] text-[#030308]"
                      : "bg-white/5 border-white/10 text-white/60"
                  }`}
                >
                  <PIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                      {p.name}
                    </h3>
                    <span className="text-[8px] text-white/40 font-mono uppercase">
                      {p.role}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] leading-relaxed mt-1 transition-colors ${
                      isActive ? "text-white/85" : "text-white/55"
                    }`}
                  >
                    {p.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// 3. Timeline of Reform Frame
function SceneTimeline({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-6xl w-full text-center px-4 z-10 flex flex-col justify-center h-full">
      <SceneHeading sub="03. STRUCTURAL REFORM" main="Timeline of Reform" />
      <p className="text-xs sm:text-sm text-white/50 mb-10 max-w-lg mx-auto">
        Key regulatory triggers that dismantled state monopolies and unlocked market access.
      </p>

      {/* Horizontal timeline */}
      <div
        ref={containerRef}
        className="relative flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-4 pointer-events-auto overflow-x-auto no-scrollbar pb-6 w-full max-w-5xl mx-auto"
      >
        {/* Horizontal connect line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden lg:block -translate-y-1/2 z-0" />

        {REFORM_TIMELINE.map((m, idx) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0.15, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex-1 bg-[#0a0a14]/80 border border-white/10 hover:border-[#FFB800]/40 rounded-xl p-4 text-left relative z-10 backdrop-blur-sm transition-all duration-300 min-w-[200px]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded">
                {m.year}
              </span>
              <div className="w-2 h-2 rounded-full bg-[#FFB800] animate-ping" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 line-clamp-1">
              {m.title}
            </h4>
            <p className="text-[10px] text-white/60 leading-normal font-light">
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Scene3FDI({ showPart }: { showPart: "table" | "highlights" }) {
  return (
    <>
      <SceneHeading
        sub="03. REGULATORY LANDSCAPE"
        main="Liberalization & the FDI Framework"
      />

      {showPart === "table" ? (
        <div className="flex flex-col items-center w-full max-w-3xl z-10 mx-auto">
          <div className="bg-[#0a0a14]/90 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl w-full">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#FFB800]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 font-bold">
                FDI Caps by Sub-Sector (2024 Norms)
              </span>
            </div>

            {/* header row */}
            <div className="grid grid-cols-[1.4fr_0.8fr_1fr] px-5 py-2 font-mono text-[8px] uppercase tracking-widest text-white/35 border-b border-white/[0.04]">
              <span>Sub-sector</span>
              <span className="text-center">Automatic</span>
              <span className="text-right">Beyond cap</span>
            </div>

            {FDI_ROWS.map((row) => (
              <div
                key={row.sector}
                className={`grid grid-cols-[1.4fr_0.8fr_1fr] items-center px-5 py-4 border-b border-white/[0.03] last:border-0 transition-colors hover:bg-white/[0.02] ${
                  row.emphasis ? "bg-[#FFB800]/[0.04]" : ""
                }`}
              >
                <span className="text-white text-xs font-semibold">
                  {row.sector}
                </span>
                <span
                  className={`text-center font-mono text-sm font-bold ${
                    row.emphasis ? "text-[#FFB800]" : "text-white"
                  }`}
                >
                  {row.auto}
                </span>
                <span className="text-right font-mono text-[10px] text-white/55 uppercase tracking-wide">
                  {row.route}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/40 font-mono mt-4 leading-relaxed text-center max-w-2xl">
            FDI reforms in 2024 enable increased foreign investment with caps
            tuned per sub-sector - de-risking capital and facilitating
            technology transfer & co-investment.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-5xl z-10 mx-auto">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] font-bold mb-6 text-center">
            2023–2024 Policy Highlights
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
            {POLICY_HIGHLIGHTS.map((h, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-[#0a0a14]/90 border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors text-left"
              >
                <span className="font-mono text-[#FFB800] text-sm font-bold">
                  0{i + 1}
                </span>
                <p className="text-xs text-white/80 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 bg-[#FFB800]/5 border border-[#FFB800]/15 px-6 py-4 rounded-2xl w-full max-w-2xl mx-auto backdrop-blur-md">
            <Building2 className="w-5 h-5 text-[#FFB800] shrink-0" />
            <span className="text-xs font-mono text-[#FFB800] uppercase tracking-wide text-center">
              Private players can now run end-to-end space activities.
            </span>
          </div>
        </div>
      )}
    </>
  );
}

function Scene4Market({ active }: { active: boolean }) {
  const maxVal = 100;
  return (
    <>
      <SceneHeading
        sub="04. MARKET TRAJECTORY"
        main="Market Size & Projections"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full max-w-5xl z-10">
        {/* Bar chart */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md">
            <div className="flex items-end justify-around gap-6 h-[260px]">
              {MARKET_BARS.map((bar, i) => {
                const heightPct = (bar.value / maxVal) * 100;
                return (
                  <div
                    key={bar.year}
                    className="flex flex-col items-center justify-end flex-1 h-full"
                  >
                    <span className="font-mono text-base md:text-lg font-black text-[#FFB800] mb-2">
                      {bar.label}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: active ? `${heightPct}%` : 0 }}
                      transition={{
                        duration: 0.9,
                        delay: active ? i * 0.12 : 0,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      className={`w-full max-w-[70px] rounded-t-lg ${
                        i === 2
                          ? "bg-gradient-to-t from-[#FFB800] to-[#ffd866]"
                          : "bg-gradient-to-t from-[#FFB800]/60 to-[#FFB800]/30"
                      }`}
                    />
                    <span className="font-mono text-xs text-white font-bold mt-3">
                      {bar.year}
                    </span>
                    <span className="font-mono text-[8px] text-white/45 uppercase tracking-wide">
                      {bar.share}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[9px] text-white/30 font-mono mt-3 uppercase tracking-widest text-center">
            Expenditure on space industry by GoI - valuation trajectory
          </p>
        </div>

        {/* Narrative */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#FFB800]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                Launch Cadence
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">10–12</span>
              <ArrowRight className="w-5 h-5 text-[#FFB800]" />
              <span className="text-4xl font-black text-[#FFB800]">50</span>
            </div>
            <p className="text-[11px] text-white/55 font-mono uppercase tracking-wide mt-2">
              launches per year - targeted by 2033
            </p>
          </div>

          <p className="text-sm text-white/80 leading-relaxed font-light">
            From <strong className="text-white">$8.4B</strong> in 2026 (~2–3% of
            the global space economy) to a projected{" "}
            <strong className="text-white">$44B by 2033</strong> and a long-term{" "}
            <strong className="text-[#FFB800]">$100B by 2040</strong> - roughly
            10% of the world market.
          </p>
        </div>
      </div>
    </>
  );
}

function Scene5Thesis({ presentationActive = false }: { presentationActive?: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (e.clientX / clientWidth - 0.5) * 10;
      const y = (e.clientY / clientHeight - 0.5) * 10;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="max-w-4xl flex flex-col items-center justify-center h-full mx-auto text-center px-4 pb-12 relative z-10 w-full">
      {/* 1. Full-screen background illustration with mouse parallax */}
      <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: mousePos.x, y: mousePos.y }}
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out"
        >
          <Image
            src="/skyroot_vikram_finale.png"
            alt="Skyroot Vikram rocket concept standing vertically on launchpad"
            fill
            sizes="100vw"
            className="object-cover object-left md:object-center opacity-30 filter brightness-[0.35]"
            loading="lazy"
          />
        </motion.div>

        {/* 2. Overlays: ~70% black / 30% transparent for perfect text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030308]/90 via-[#030308]/65 to-[#030308]/95 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030308] via-transparent to-[#030308]/90 pointer-events-none" />
        
        {/* 3. Subtle slow drifting fog atmospheric effect */}
        <div 
          className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none mix-blend-screen"
          style={{
            background: "radial-gradient(circle at 25% 75%, rgba(255, 184, 0, 0.25) 0%, transparent 60%)",
            animation: "pulse 10s ease-in-out infinite alternate"
          }}
        />

        {/* 4. Tiny slow floating ambient particles */}
        <div className="absolute inset-0 z-10 opacity-[0.18] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="15" cy="20" r="0.3" fill="#FFB800" className="animate-pulse" style={{ animationDuration: "5s" }} />
            <circle cx="85" cy="45" r="0.2" fill="#ffffff" className="animate-pulse" style={{ animationDuration: "7s" }} />
            <circle cx="35" cy="80" r="0.4" fill="#FFB800" className="animate-pulse" style={{ animationDuration: "6s" }} />
            <circle cx="65" cy="15" r="0.3" fill="#ffffff" className="animate-pulse" style={{ animationDuration: "8s" }} />
          </svg>
        </div>
      </div>

      {/* 5. Concentric radial circle overlay (retained above the background) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(255,184,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* 6. Text content / Typography layer (z-20 relative) */}
      <div className="relative z-20 w-full">
        <SceneLabel>The Thesis</SceneLabel>

        <h2
          className={`font-light tracking-wide text-white max-w-3xl mx-auto leading-tight ${
            presentationActive
              ? "mb-4 text-2xl sm:text-3xl lg:text-4xl"
              : "mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl"
          }`}
        >
          <span className="block mb-1 text-white/65">From sole architect</span>
          <span className="block mb-2 text-white font-semibold">
            to open platform.
          </span>
          <span className="block text-[#FFB800] font-bold">
            The shift has already begun.
          </span>
        </h2>

        <p className={`text-xs sm:text-sm text-white/65 max-w-2xl mx-auto leading-relaxed font-light ${
          presentationActive ? "mb-4" : "mb-6 sm:mb-8"
        }`}>
          Liberalized policy, geopolitical urgency, and a maturing private
          engineering base are converging. India&apos;s space economy is being
          re-architected for private capital - and the window is open now.
        </p>

        {!presentationActive && (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <ChapterNavButton
                href="/"
                label="Return to Main Deck"
                variant="ghost"
                direction="back"
              />
              <ChapterNavButton
                href="/chapters/value-chain"
                label="Continue. The Value Chain"
                variant="primary"
                direction="forward"
              />
            </div>

            <Link
              href="/chapters/launch-systems"
              className="interactive-control mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/40 hover:text-[#FFB800] transition-colors"
            >
              Browse Chapter Case Studies
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function ParadigmShiftPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [presentationActive, setPresentationActive] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [hudOpen, setHudOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useMotionValue(0);

  // Sync progress with scroll (scroll mode)
  useEffect(() => {
    if (presentationActive) return;
    progress.set(scrollYProgress.get());
    const unsub = scrollYProgress.on("change", (v) => progress.set(v));
    return unsub;
  }, [presentationActive, scrollYProgress, progress]);

  // Frame index from scroll
  useEffect(() => {
    if (presentationActive) return;
    const unsub = progress.on("change", (v) => {
      const idx =
        v < 1 / 7
          ? 0
          : v < 2 / 7
          ? 1
          : v < 3 / 7
          ? 2
          : v < 4 / 7
          ? 3
          : v < 5 / 7
          ? 4
          : v < 6 / 7
          ? 5
          : 6;
      setCurrentFrameIndex(idx);
    });
    return unsub;
  }, [presentationActive, progress]);

  // URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("presentation") === "true") {
      setPresentationActive(true);
      setHudOpen(true);
    }
  }, []);

  // Lock scroll in presentation
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

  const TRANSITION_DURATION = 500;
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

  // Keyboard nav (presentation)
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

  // Click-to-advance (shift-click or right-click to go back). Interactive controls opt out.
  useEffect(() => {
    if (!presentationActive) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, select, kbd, [role='button'], .interactive-control, .hud-overlay, .presentation-controls"
        )
      )
        return;
      e.preventDefault();
      if (e.shiftKey) prevSlide();
      else nextSlide();
    };

    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, select, kbd, [role='button'], .interactive-control, .hud-overlay, .presentation-controls"
        )
      )
        return;
      e.preventDefault();
      prevSlide();
    };

    window.addEventListener("click", onClick);
    window.addEventListener("contextmenu", onContextMenu);
    
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("contextmenu", onContextMenu);
    };
  }, [presentationActive, nextSlide, prevSlide]);

  // P to enter (scroll mode)
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

  // Timer
  useEffect(() => {
    if (presentationActive) {
      timerRef.current = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setElapsedTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [presentationActive]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  // ---- scroll transforms (8 frames, each spans 1/8 ~ 0.125 width) ----
  const heroOpacity = useTransform(progress, [0.0, 0.08, 0.125], [1, 1, 0]);
  const heroScale = useTransform(progress, [0.0, 0.125], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.08, 0.125, 0.21, 0.25], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.08, 0.125, 0.21, 0.25], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.21, 0.25, 0.33, 0.375], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.21, 0.25, 0.33, 0.375], [24, 0, 0, -24]);

  const s3TimelineOpacity = useTransform(progress, [0.33, 0.375, 0.46, 0.50], [0, 1, 1, 0]);
  const s3TimelineY = useTransform(progress, [0.33, 0.375, 0.46, 0.50], [24, 0, 0, -24]);

  const s3aOpacity = useTransform(progress, [0.46, 0.50, 0.58, 0.625], [0, 1, 1, 0]);
  const s3aY = useTransform(progress, [0.46, 0.50, 0.58, 0.625], [24, 0, 0, -24]);

  const s3bOpacity = useTransform(progress, [0.58, 0.625, 0.71, 0.75], [0, 1, 1, 0]);
  const s3bY = useTransform(progress, [0.58, 0.625, 0.71, 0.75], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.71, 0.75, 0.83, 0.875], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.71, 0.75, 0.83, 0.875], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.83, 0.875, 1.0], [0, 1, 1]);
  const s5Y = useTransform(progress, [0.83, 0.875, 1.0], [24, 0, 0]);

  // ---- interaction state ----
  const [activeCatalyst, setActiveCatalyst] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  const activeScene = PRESENTATION_SCENES.find(
    (s) => currentFrameIndex >= s.startFrame && currentFrameIndex <= s.endFrame
  ) || PRESENTATION_SCENES[0];
  const activeSceneIndex = PRESENTATION_SCENES.indexOf(activeScene);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#FFB800] selection:text-[#030308] relative">
      <Navbar />

      {/* Top-Right Presentation Mode Toggle */}
      <div className="fixed top-20 right-6 z-40 font-mono text-xs">
        <div className="flex items-center gap-3 bg-[#030308]/75 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
          <span className="text-white/60 tracking-wider uppercase text-[9px] font-bold">
            Presentation Mode
          </span>
          <div className="flex items-center bg-black/40 border border-white/5 rounded-full p-0.5">
            <button
              onClick={() => {
                setPresentationActive(true);
                setHudOpen(true);
                setCurrentFrameIndex(0);
              }}
              className={`px-3 py-0.5 rounded-full text-[9px] font-bold tracking-widest transition-all interactive-control ${
                presentationActive
                  ? "bg-[#FFB800] text-[#030308]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              ON
            </button>
            <button
              onClick={() => {
                setPresentationActive(false);
                setHudOpen(false);
              }}
              className={`px-3 py-0.5 rounded-full text-[9px] font-bold tracking-widest transition-all interactive-control ${
                !presentationActive
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              OFF
            </button>
          </div>
        </div>
      </div>

      {/* Minimal presenter control bar */}
      <AnimatePresence>
        {presentationActive && hudOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-[#0a0a14]/80 border border-white/10 rounded-full pl-4 pr-2 py-1.5 shadow-2xl backdrop-blur-xl hud-overlay opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            <button
              onClick={prevSlide}
              disabled={currentFrameIndex === 0 || isTransitioning}
              className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-25 transition-all cursor-pointer interactive-control"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-[10px] text-white/70 tabular-nums w-9 text-center">
              {currentFrameIndex + 1} / {TOTAL_FRAMES}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentFrameIndex === TOTAL_FRAMES - 1 || isTransitioning}
              className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-25 transition-all cursor-pointer interactive-control"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="w-px h-4 bg-white/10" />
            <span className="font-mono text-[9px] text-white/40 tabular-nums hidden sm:inline">
              {formatTime(elapsedTime)}
            </span>
            <button
              onClick={() => {
                setPresentationActive(false);
                setHudOpen(false);
              }}
              className="px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest text-[#FFB800] hover:bg-[#FFB800]/10 transition-all cursor-pointer interactive-control"
            >
              EXIT
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-Right Floating Controls & Scene Indicator */}
      {presentationActive && (
        <div className="fixed bottom-6 right-6 z-40 font-mono flex flex-col gap-2 pointer-events-auto presentation-controls">
          <div className="bg-[#030308]/80 border border-white/10 backdrop-blur-md px-5 py-4 rounded-xl shadow-2xl flex flex-col gap-3 min-w-[280px]">
            
            {/* Scene Indicator & Title */}
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-[10px] text-[#FFB800] font-bold tracking-widest uppercase">
                {activeScene.label}
              </span>
              <span className="text-sm font-semibold tracking-wide text-white font-sans uppercase">
                {activeScene.name}
              </span>
            </div>

            {/* Progress line */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FFB800] transition-all duration-500 ease-out" 
                style={{ 
                  width: `${((activeSceneIndex + 1) / PRESENTATION_SCENES.length) * 100}%` 
                }}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 mt-1">
              <button
                onClick={prevSlide}
                disabled={currentFrameIndex === 0}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-md cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <button
                onClick={nextSlide}
                disabled={currentFrameIndex === TOTAL_FRAMES - 1}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FFB800] hover:text-[#FFC830] disabled:opacity-30 disabled:hover:text-[#FFB800] transition-colors bg-[#FFB800]/10 hover:bg-[#FFB800]/20 border border-[#FFB800]/20 px-3 py-1.5 rounded-md cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enter-presentation button (scroll mode) */}
      {!presentationActive && (
        <button
          onClick={() => {
            setPresentationActive(true);
            setHudOpen(true);
            setCurrentFrameIndex(0);
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#0a0a14]/90 border border-[#FFB800]/30 hover:border-[#FFB800]/70 text-[#FFB800] font-mono text-[10px] uppercase tracking-widest rounded-full shadow-xl backdrop-blur-md transition-all duration-300 interactive-control"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
          Present [P]
        </button>
      )}

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[800vh] bg-[#030308]">
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
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                {currentFrameIndex === 0 && <Scene0Hero presentationActive />}
                {currentFrameIndex === 1 && (
                  <Scene1WhyCritical active={activeCatalyst} setActive={setActiveCatalyst} />
                )}
                {currentFrameIndex === 2 && (
                  <Scene2Ecosystem activePillar={activePillar} setActivePillar={setActivePillar} />
                )}
                {currentFrameIndex === 3 && <SceneTimeline active={true} />}
                {currentFrameIndex === 4 && <Scene3FDI showPart="table" />}
                {currentFrameIndex === 5 && <Scene3FDI showPart="highlights" />}
                {currentFrameIndex === 6 && <Scene4Market active={true} />}
                {currentFrameIndex === 7 && <Scene5Thesis presentationActive />}
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
                <Scene1WhyCritical active={activeCatalyst} setActive={setActiveCatalyst} />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene2Ecosystem activePillar={activePillar} setActivePillar={setActivePillar} />
              </motion.div>

              <motion.div
                style={{ opacity: s3TimelineOpacity, y: s3TimelineY }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneTimeline active={currentFrameIndex === 3} />
              </motion.div>

              <motion.div
                style={{ opacity: s3aOpacity, y: s3aY }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene3FDI showPart="table" />
              </motion.div>

              <motion.div
                style={{ opacity: s3bOpacity, y: s3bY }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 5 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene3FDI showPart="highlights" />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene4Market active={currentFrameIndex === 6} />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                <Scene5Thesis presentationActive={false} />
              </motion.div>
            </>
          )}

          {/* Scroll progress dots */}
          {!presentationActive && (
            <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5">
              {Array.from({ length: TOTAL_FRAMES }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    currentFrameIndex === i ? "bg-[#FFB800] scale-125" : "bg-white/20"
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

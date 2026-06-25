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
  Cpu,
  GraduationCap,
  Factory,
  TrendingUp,
  Scale,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

// Scene 1 — Why space is becoming critical
const CATALYSTS = [
  {
    id: 0,
    icon: Rocket,
    label: "The SpaceX Wake-Up Call",
    stat: "$469M",
    statLabel: "earned launching foreign satellites",
    headline: "ISRO ran launches at a fraction of global cost — then SpaceX ate our lunch.",
    points: [
      "SpaceX's cost-per-kg undercut even ISRO's famously cheap launches.",
      "ISRO became the bottleneck — historically the sole architect and executor of every mission.",
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
      "ISRO must cede commercial ground to private players — or fall behind globally.",
      "Public funding is gradually being replaced by private capital.",
    ],
  },
];

// Scene 2 — Institutional pillars
const PILLARS = [
  {
    id: 0,
    name: "ISRO",
    role: "Indian Space Research Organisation",
    desc: "Refocusing on advanced R&D and technology transfer — stepping back from being the sole operator.",
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
  { year: "2022", value: 8.4, label: "$8.4B", share: "~2–3% global", pct: 8.4 },
  { year: "2033", value: 44, label: "$44B", share: "~8% global", pct: 44 },
  { year: "2040", value: 100, label: "$100B", share: "~10% global", pct: 100 },
];

// ---------------------------------------------------------------------------
// FRAME CONFIG
// ---------------------------------------------------------------------------
const TOTAL_FRAMES = 6;

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
          className="object-cover object-center opacity-35"
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
        <SceneLabel>Chapter XI &mdash; Tactical Briefing</SceneLabel>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          The Paradigm
          <br />
          <span className="text-[#FFB800]">Shift</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
          India&apos;s space sector is being rebuilt — from a single
          state-run architect into an open platform powered by private
          capital, liberalized policy, and strategic necessity.
        </p>

        <div className="grid grid-cols-3 gap-0 border border-white/10 rounded-2xl overflow-hidden font-mono mb-10 w-full max-w-xl">
          {[
            { val: "$8.4B", label: "Market today (2022)" },
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
  return (
    <>
      <SceneHeading
        sub="01. THE TRIGGER"
        main="Why Space Became Critical"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full max-w-5xl z-10">
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
                style={{ fontFamily: "Georgia, serif" }}
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

      <p className="mt-6 text-[10px] md:text-xs text-white/45 font-mono uppercase tracking-wider max-w-3xl text-center">
        Shift driven by policy liberalization, geopolitical pressure & domestic
        engineering — public funding gradually replaced by private capital.
      </p>
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
  const publicNodes = [
    { name: "ISRO", sub: "Nodal Space Agency" },
    { name: "IN-SPACe", sub: "Commercial Authorisation" },
  ];
  const privateNodes = [
    { name: "Component Mfrs", icon: Cpu },
    { name: "Academia", icon: GraduationCap },
    { name: "Spacetech Startups", icon: Rocket },
  ];

  return (
    <>
      <SceneHeading
        sub="02. ECOSYSTEM ARCHITECTURE"
        main="Custodians of the Indian Space Ecosystem"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        {/* Org chart */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
            {/* Root */}
            <div className="flex justify-center mb-5">
              <div className="px-5 py-2.5 rounded-lg bg-[#FFB800] text-[#030308] font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,184,0,0.25)]">
                The Indian Space Ecosystem
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Public */}
              <div className="text-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/45 block mb-3">
                  Public Stakeholders
                </span>
                <div className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-[11px] font-bold uppercase mb-3">
                  Dept. of Space (DoS)
                </div>
                <div className="flex flex-col gap-2">
                  {publicNodes.map((n) => (
                    <div
                      key={n.name}
                      className="px-3 py-2 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/25 text-left"
                    >
                      <span className="text-[#FFB800] text-[11px] font-bold block">
                        {n.name}
                      </span>
                      <span className="text-white/45 text-[8px] font-mono uppercase tracking-wide">
                        {n.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private */}
              <div className="text-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/45 block mb-3">
                  Private Stakeholders
                </span>
                <div className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-[11px] font-bold uppercase mb-3">
                  Industry &amp; Innovators
                </div>
                <div className="flex flex-col gap-2">
                  {privateNodes.map((n) => {
                    const NIcon = n.icon;
                    return (
                      <div
                        key={n.name}
                        className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2"
                      >
                        <NIcon className="w-3.5 h-3.5 text-white/50 shrink-0" />
                        <span className="text-white/80 text-[11px] font-semibold">
                          {n.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="text-center text-[8px] text-white/30 font-mono mt-4 uppercase tracking-wider">
              Figure 1 — Key custodians (Agarwal, 2023)
            </p>
          </div>
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

function Scene3FDI() {
  return (
    <>
      <SceneHeading
        sub="03. REGULATORY LANDSCAPE"
        main="Liberalization & the FDI Framework"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-5xl z-10">
        {/* FDI table */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a0a14]/90 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
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
          <p className="text-[10px] text-white/40 font-mono mt-3 leading-relaxed">
            FDI reforms in 2024 enable increased foreign investment with caps
            tuned per sub-sector — de-risking capital and facilitating
            technology transfer & co-investment.
          </p>
        </div>

        {/* Highlights */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] font-bold mb-1">
            2023–2024 Policy Highlights
          </span>
          {POLICY_HIGHLIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex gap-3 p-4 rounded-xl bg-[#0a0a14]/90 border border-white/5"
            >
              <span className="font-mono text-[#FFB800] text-sm font-bold shrink-0">
                0{i + 1}
              </span>
              <p className="text-xs text-white/80 leading-relaxed">{h}</p>
            </div>
          ))}
          <div className="flex items-center gap-3 bg-[#FFB800]/5 border border-[#FFB800]/15 px-4 py-3 rounded-xl">
            <Building2 className="w-4 h-4 text-[#FFB800] shrink-0" />
            <span className="text-[11px] font-mono text-[#FFB800] uppercase tracking-wide">
              Private players can now run end-to-end space activities.
            </span>
          </div>
        </div>
      </div>
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
            Expenditure on space industry by GoI &mdash; valuation trajectory
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
              launches per year &mdash; targeted by 2033
            </p>
          </div>

          <p className="text-sm text-white/80 leading-relaxed font-light">
            From <strong className="text-white">$8.4B</strong> in 2022 (~2–3% of
            the global space economy) to a projected{" "}
            <strong className="text-white">$44B by 2033</strong> and a long-term{" "}
            <strong className="text-[#FFB800]">$100B by 2040</strong> — roughly
            10% of the world market.
          </p>

          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-3 rounded-xl">
            <Factory className="w-4 h-4 text-[#FFB800] shrink-0" />
            <span className="text-[11px] text-white/70 leading-relaxed">
              Opportunities for public-market investors in aerospace
              manufacturing & defense-linked precision engineering.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Scene5Thesis() {
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
        className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-relaxed text-white max-w-3xl mb-10 relative z-10"
        style={{ fontFamily: "Georgia, serif" }}
      >
        <span className="block mb-1 text-white/65">From sole architect</span>
        <span className="block mb-2 text-white font-semibold">
          to open platform.
        </span>
        <span className="block text-[#FFB800] font-bold">
          The shift has already begun.
        </span>
      </h2>

      <p className="text-sm sm:text-base text-white/65 max-w-2xl leading-relaxed mb-12 font-light relative z-10">
        Liberalized policy, geopolitical urgency, and a maturing private
        engineering base are converging. India&apos;s space economy is being
        re-architected for private capital — and the window is open now.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
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
        className="interactive-control mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/40 hover:text-[#FFB800] transition-colors relative z-10"
      >
        Browse Chapter Case Studies
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
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
        v < 1 / 6
          ? 0
          : v < 2 / 6
          ? 1
          : v < 3 / 6
          ? 2
          : v < 4 / 6
          ? 3
          : v < 5 / 6
          ? 4
          : 5;
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

  // Click-to-advance
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

  // ---- scroll transforms ----
  const heroOpacity = useTransform(progress, [0.0, 0.12, 0.1667], [1, 1, 0]);
  const heroScale = useTransform(progress, [0.0, 0.1667], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.13, 0.1667, 0.30, 0.333], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.13, 0.1667, 0.30, 0.333], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.30, 0.333, 0.47, 0.5], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.30, 0.333, 0.47, 0.5], [24, 0, 0, -24]);

  const s3Opacity = useTransform(progress, [0.47, 0.5, 0.63, 0.667], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.47, 0.5, 0.63, 0.667], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.63, 0.667, 0.80, 0.833], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.63, 0.667, 0.80, 0.833], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.80, 0.833, 1.0], [0, 1, 1]);
  const s5Y = useTransform(progress, [0.80, 0.833, 1.0], [24, 0, 0]);

  // ---- interaction state ----
  const [activeCatalyst, setActiveCatalyst] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

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
      <div ref={containerRef} className="relative w-full h-[600vh] bg-[#030308]">
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
                {currentFrameIndex === 3 && <Scene3FDI />}
                {currentFrameIndex === 4 && <Scene4Market active={true} />}
                {currentFrameIndex === 5 && <Scene5Thesis />}
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
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene3FDI />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene4Market active={currentFrameIndex === 4} />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                <Scene5Thesis />
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

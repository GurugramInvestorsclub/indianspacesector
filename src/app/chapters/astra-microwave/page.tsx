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
  ShieldAlert,
  Server,
  Radio,
  FileText,
  Users,
  DollarSign,
  Briefcase,
  Percent,
  CheckCircle2,
  Clock,
  Hourglass,
  Calendar,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA & CONSTANTS
// ---------------------------------------------------------------------------

const TOTAL_FRAMES = 16;

const ASTRA_SCENES = [
  { id: "hero", name: "Astra Microwave Products Case Study", label: "01 / 16", startFrame: 0, endFrame: 0 },
  { id: "founding", name: "The Founding Story", label: "02 / 16", startFrame: 1, endFrame: 1 },
  { id: "financials", name: "Consolidated P&L Journey", label: "03 / 16", startFrame: 2, endFrame: 2 },
  { id: "entities", name: "Group Corporate Structure", label: "04 / 16", startFrame: 3, endFrame: 3 },
  { id: "revenue-mix", name: "Segment Revenue Mix", label: "05 / 16", startFrame: 4, endFrame: 4 },
  { id: "orderbook", name: "Standalone Order Book", label: "06 / 16", startFrame: 5, endFrame: 5 },
  { id: "growth", name: "Key Growth Programs", label: "07 / 16", startFrame: 6, endFrame: 6 },
  { id: "capital", name: "Capital & Working Capital", label: "08 / 16", startFrame: 7, endFrame: 7 },
  { id: "thesis-space", name: "The Hidden Space Company", label: "09 / 16", startFrame: 8, endFrame: 8 },
  { id: "thesis-carveout", name: "The Carve-Out Investors Ignore", label: "10 / 16", startFrame: 9, endFrame: 9 },
  { id: "thesis-catalyst", name: "The Catalyst", label: "11 / 16", startFrame: 10, endFrame: 10 },
  { id: "thesis-matters", name: "Why This Matters", label: "12 / 16", startFrame: 11, endFrame: 11 },
  { id: "thesis-road", name: "The Road to Two Companies", label: "13 / 16", startFrame: 12, endFrame: 12 },
  { id: "listed-peers", name: "Listed Peers", label: "14 / 16", startFrame: 13, endFrame: 13 },
  { id: "sotp-valuation", name: "Sum of the Parts", label: "15 / 16", startFrame: 14, endFrame: 14 },
  { id: "takeaways", name: "Key Takeaways", label: "16 / 16", startFrame: 15, endFrame: 15 },
];

const SLIDE_BASE =
  "absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 w-full px-6 md:px-12 py-16 overflow-y-auto no-scrollbar";

// ---------------------------------------------------------------------------
// HELPER COMPONENTS
// ---------------------------------------------------------------------------

function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FFB800] uppercase block mb-3">
      {children}
    </span>
  );
}

function SceneHeading({ sub, main }: { sub: string; main: React.ReactNode }) {
  return (
    <div className="mb-6 text-center">
      <SceneLabel>{sub}</SceneLabel>
      <h2 className="text-2xl sm:text-3.5xl md:text-4.5xl font-extrabold text-white tracking-tight leading-tight uppercase max-w-3xl mx-auto">
        {main}
      </h2>
    </div>
  );
}

type FinRow = { label: string; v: string[]; sub?: boolean; emphasis?: boolean };

function FinTableRows({ rows }: { rows: FinRow[] }) {
  return (
    <tbody className="divide-y divide-white/5">
      {rows.map((r) => (
        <tr key={r.label} className={r.emphasis ? "bg-[#FFB800]/[0.04]" : ""}>
          <td
            className={`py-1.5 pr-2 font-sans ${
              r.sub
                ? "text-white/45 font-light pl-3"
                : r.emphasis
                  ? "text-white font-bold"
                  : "text-white font-medium"
            }`}
          >
            {r.label}
          </td>
          {r.v.map((val, i) => (
            <td
              key={i}
              className={`py-1.5 text-right tabular-nums ${i === r.v.length - 1 ? "pl-2" : "px-2"} ${
                r.sub ? "text-white/45" : r.emphasis ? "text-white font-bold" : "text-white/80"
              }`}
            >
              {val}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

// ---------------------------------------------------------------------------
// SLIDE COMPONENT DEFINITIONS
// ---------------------------------------------------------------------------

// 1. Hero Slide
function SceneHero({ presentationActive }: { presentationActive: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Graphic overlay */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Image
          src="/astra/astra_hero.png"
          alt="Astra Microwave Schematic Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-[#030308]" />
      </div>

      <div className="max-w-4xl relative z-10 select-text flex flex-col items-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4F72]/30 border border-[#1B4F72]/50 text-[10px] font-mono tracking-widest text-[#FFB800] uppercase mb-6 shadow-[0_0_12px_rgba(27,79,114,0.3)] animate-pulse">
          <Radio className="w-3.5 h-3.5" />
          Ecosystem Case Study
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7.5xl font-black tracking-tight leading-none text-white uppercase mb-6">
          Astra Microwave <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFB800] via-[#ffd866] to-[#1B4F72]">
            Products
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/60 font-light leading-relaxed max-w-2xl mb-10">
          Analyzing the demerger value split, five-year performance record, and carve-out valuation parameters of India&apos;s leading private RF and microwave electronics pioneer.
        </p>

        {!presentationActive && (
          <div className="flex flex-col items-center gap-3 animate-bounce">
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.25em]">Scroll to inspect deck</span>
            <div className="w-px h-10 bg-gradient-to-b from-[#FFB800]/50 to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Founding Story
function SceneFounding({ active }: { active: boolean }) {
  return (
    <div className="max-w-6xl w-full px-4 z-10 flex flex-col h-full py-8 overflow-y-auto no-scrollbar">
      <div className="my-auto w-full flex flex-col gap-6 select-text">
        <div className="text-center w-full flex flex-col items-center mb-2">
          <SceneLabel>01. COMPANY BRIEF</SceneLabel>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase max-w-4xl">
            RF Electronics &amp; Systems Pioneer
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center pointer-events-auto">
          {/* Left Column: Text copy */}
          <div className="lg:col-span-7 text-left space-y-4 pr-0 lg:pr-6">
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Incorporated in 1991 in Hyderabad and listed in 1995, Astra Microwave Products Limited was founded by a team of engineer-entrepreneurs from government radar and defense labs. The company specializes in radio frequency (RF) and microwave electronics, providing critical high-frequency building blocks for radars, missiles, electronic warfare, and satellite networks.
            </p>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              The founding wedge was import substitution. India&apos;s defense and space programs originally relied on components sourced from abroad. Astra built domestic alternatives qualified to specifications, certified for defense-grade reliability. This is a slow business to enter due to multi-year qualification requirements, but hard to leave once designed in.
            </p>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Over three decades, Astra climbed the value chain from individual components to subsystems and complete systems, such as radar front-ends and transmit-receive modules. As a trusted partner to DRDO, BEL, and ISRO, it is now transitioning leadership to founder-engineer management.
            </p>

            {/* Fact Strip */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {["Founded 1991", "IPO 1995", "Hyderabad Base", "BSE / NSE", "Defense & Space"].map((pill) => (
                <span
                  key={pill}
                  className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider bg-[#FFB800]/10 border border-[#FFB800]/25 px-2.5 py-1 rounded"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Stacked items */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 group shadow-xl">
              <Image
                src="/astra/astra_product.png"
                alt="Astra Advanced RF Transmit-Receive Module"
                fill
                className="object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/40 uppercase tracking-widest">
                Astra Advanced RF Assembly
              </div>
            </div>

            <div className="bg-[#0a0a14]/60 border border-white/5 rounded-xl p-4 text-left">
              <span className="font-mono text-[8px] text-[#FFB800] uppercase tracking-wider block mb-1">Founding Wedge</span>
              <span className="text-xs text-white/70 font-light block leading-relaxed">
                Import substitution for high-frequency microwave electronics that were previously imported.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Consolidated Profit & Loss
function SceneFinancials({ active }: { active: boolean }) {
  const plRows: FinRow[] = [
    { label: "Revenue from operations", v: ["750", "816", "909", "1,051", "1,163"] },
    { label: "Gross profit", v: ["223", "297", "363", "474", "592"] },
    { label: "Gross margin (%)", v: ["29.7", "36.4", "39.9", "45.1", "50.9"], sub: true },
    { label: "EBITDA", v: ["89", "148", "192", "269", "334"] },
    { label: "EBITDA margin (%)", v: ["11.9", "18.1", "21.1", "25.6", "28.7"], sub: true, emphasis: true },
    { label: "Depreciation", v: ["22", "24", "25", "35", "44"] },
    { label: "Finance cost", v: ["21", "31", "31", "57", "56"] },
    { label: "Share of profit from joint ventures", v: ["(2)", "(3)", "12", "9", "8"] },
    { label: "Profit before tax", v: ["50", "96", "159", "204", "261"] },
    { label: "Tax", v: ["12", "26", "38", "50", "68"] },
    { label: "Profit after tax (PAT)", v: ["38", "70", "121", "154", "193"], emphasis: true },
    { label: "PAT margin (%)", v: ["5.0", "8.6", "13.3", "14.6", "16.6"], sub: true },
    { label: "Diluted EPS (Rs)", v: ["4.37", "8.06", "12.86", "16.17", "20.32"], emphasis: true },
  ];

  return (
    <div className="max-w-6xl w-full px-4 z-10 flex flex-col h-full py-8 overflow-y-auto no-scrollbar">
      <div className="my-auto w-full flex flex-col gap-6 select-text">
        <SceneHeading sub="02. PERFORMANCE RECORD" main="Consolidated Financial Journey" />

        <div className="w-full max-w-4xl mx-auto pointer-events-auto">
          {/* Table Container */}
          <div className="bg-[#0a0a14]/60 border border-white/5 rounded-xl p-5 backdrop-blur-sm overflow-x-auto text-left shadow-xl">
            <h3 className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider mb-3">
              Table 1. Consolidated Profit &amp; Loss, last 5 years (Rs Crore)
            </h3>
            <table className="w-full text-left font-mono text-[11px] text-white/80 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white font-bold">
                  <th className="py-2 pr-2 font-sans font-semibold">Line item</th>
                  <th className="py-2 px-2 text-right">FY22</th>
                  <th className="py-2 px-2 text-right">FY23</th>
                  <th className="py-2 px-2 text-right">FY24</th>
                  <th className="py-2 px-2 text-right">FY25</th>
                  <th className="py-2 pl-2 text-right">FY26</th>
                </tr>
              </thead>
              <FinTableRows rows={plRows} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Corporate Structure
function SceneEntities() {
  const entities = [
    { name: "AMPL (Parent, Listed)", type: "Parent", share: "n/a", desc: "RF & microwave systems for defense, space, weather", post: "Becomes pure-play defense & aerospace" },
    { name: "Astra Rafael Comsys (ARC)", type: "Joint Venture", share: "50%", desc: "Software-defined radios, communications with Rafael", post: "Stays with AMPL (equity-accounted)" },
    { name: "Bhavyabhanu Electronics", type: "Subsidiary", share: "100%", desc: "Defense electronics manufacturing support", post: "Stays with AMPL" },
    { name: "Aelius Semiconductors", type: "Subsidiary", share: "100%", desc: "Semiconductors & custom microwave chips (MMICs)", post: "Stays with AMPL" },
    { name: "Navictronics Pvt Ltd", type: "Joint Venture", share: "new", desc: "Navigation (NavIC) chip programme", post: "Stays with AMPL" },
    { name: "Astra Space Technologies (ASTPL)", type: "Subsidiary", share: "100%", desc: "Space, meteorology and hydrology", post: "Demerged & separately listed" },
  ];

  return (
    <div className="max-w-6xl w-full px-4 z-10 flex flex-col h-full py-8 overflow-y-auto no-scrollbar">
      <div className="my-auto w-full flex flex-col gap-6 select-text">
        <SceneHeading sub="03. CORPORATE STRUCTURE" main="Group Entities &amp; Demerger Layout" />

        <div className="w-full max-w-5xl mx-auto pointer-events-auto bg-[#0a0a14]/60 border border-white/5 rounded-xl p-5 backdrop-blur-sm overflow-x-auto text-left shadow-xl">
          <h3 className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider mb-4">
            Table 2. Entities in the group (FY26)
          </h3>
          <table className="w-full text-left font-mono text-[11px] text-white/80 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white font-bold">
                <th className="py-2 pr-2 font-sans font-semibold">Entity</th>
                <th className="py-2 px-2 text-right">Type</th>
                <th className="py-2 px-2 text-right">Astra Holding</th>
                <th className="py-2 px-2 text-left pl-6">Business</th>
                <th className="py-2 pl-2 text-right text-[#FFB800]">Post-Demerger Destination</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {entities.map((e) => (
                <tr key={e.name} className={e.post.includes("Demerged") ? "bg-[#FFB800]/[0.05]" : ""}>
                  <td className="py-2 pr-2 text-white font-semibold">{e.name}</td>
                  <td className="py-2 px-2 text-right text-white/60">{e.type}</td>
                  <td className="py-2 px-2 text-right text-white/80">{e.share}</td>
                  <td className="py-2 px-2 text-left pl-6 text-white/70 font-light">{e.desc}</td>
                  <td className={`py-2 pl-2 text-right font-bold ${e.post.includes("Demerged") ? "text-[#FFB800]" : "text-white/50 font-normal"}`}>
                    {e.post}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 5. Revenue Mix
function SceneRevenueMix() {
  const segments = [
    { name: "Defence", share: "58.4%", q425: "84.0%", q126: "86.4%", q226: "77.4%", q326: "81.8%", desc: "DRDO and defense PSU contractor-led high margin orders." },
    { name: "Space", share: "19.5%", q425: "5.2%", q126: "2.4%", q226: "2.0%", q326: "2.6%", desc: "ISRO payloads and satellite assembly contracts (demerger target)." },
    { name: "Meteorological", share: "4.9%", q425: "2.4%", q126: "0.4%", q226: "5.8%", q326: "3.4%", desc: "Weather radars and hydrology sensor arrays." },
    { name: "Exports (incl. deemed)", share: "16.9%", q425: "7.2%", q126: "10.0%", q226: "14.2%", q326: "11.5%", desc: "Global defense equipment subsystems." },
    { name: "Others", share: "0.3%", q425: "1.2%", q126: "0.8%", q226: "0.6%", q326: "0.7%", desc: "Domestic commercial subsystems." },
  ];

  return (
    <div className="max-w-6xl w-full px-4 z-10 flex flex-col h-full py-8 overflow-y-auto no-scrollbar">
      <div className="my-auto w-full flex flex-col gap-6 select-text">
        <SceneHeading sub="04. REVENUE MIX" main="Revenue mix by segment FY26" />

        <div className="w-full max-w-4xl mx-auto pointer-events-auto">
          {/* Table Mix */}
          <div className="bg-[#0a0a14]/60 border border-white/5 rounded-xl p-5 backdrop-blur-sm overflow-x-auto text-left shadow-xl">
            <h3 className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider mb-3">
              Table 3. Revenue mix by segment, quarterly FY26 (% of revenue)
            </h3>
            <table className="w-full text-left font-mono text-[11px] text-white/80 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white font-bold">
                  <th className="py-2 pr-2 font-sans font-semibold">Segment</th>
                  <th className="py-2 px-2 text-right">Q4 FY25</th>
                  <th className="py-2 px-2 text-right">Q1 FY26</th>
                  <th className="py-2 px-2 text-right">Q2 FY26</th>
                  <th className="py-2 px-2 text-right">Q3 FY26</th>
                  <th className="py-2 pl-2 text-right text-[#FFB800]">Q4 FY26</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {segments.map((s) => (
                  <tr
                    key={s.name}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-2 pr-2 text-white font-semibold">{s.name}</td>
                    <td className="py-2 px-2 text-right text-white/65">{s.q425}</td>
                    <td className="py-2 px-2 text-right text-white/65">{s.q126}</td>
                    <td className="py-2 px-2 text-right text-white/65">{s.q226}</td>
                    <td className="py-2 px-2 text-right text-white/65">{s.q326}</td>
                    <td className="py-2 pl-2 text-right text-[#FFB800] font-bold">{s.share}</td>
                  </tr>
                ))}
                <tr className="bg-[#FFB800]/[0.06] font-bold">
                  <td className="py-2 pr-2 text-[#FFB800]">Space + Meteorological</td>
                  <td className="py-2 px-2 text-right">7.6%</td>
                  <td className="py-2 px-2 text-right">2.8%</td>
                  <td className="py-2 px-2 text-right">7.8%</td>
                  <td className="py-2 px-2 text-right">6.0%</td>
                  <td className="py-2 pl-2 text-right text-[#FFB800]">24.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. Standalone Order Book
function SceneOrderBook() {
  const obRows: FinRow[] = [
    { label: "Defence (DRDO, PSUs)", v: ["226", "172", "179", "1,477"] },
    { label: "Space", v: ["86", "191", "350", "249"] },
    { label: "Meteorology & hydrology", v: ["140", "234", "187", "369"] },
    { label: "Exports", v: ["1,504", "1,355", "1,425", "130"] },
    { label: "Total order book", v: ["1,956", "1,952", "2,141", "2,226"], emphasis: true },
  ];

  return (
    <div className="max-w-6xl w-full px-4 z-10 flex flex-col h-full py-8 overflow-y-auto no-scrollbar">
      <div className="my-auto w-full flex flex-col gap-6 select-text">
        <SceneHeading sub="05. PIPELINE VISIBILITY" main="Standalone Order Book by Segment" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full pointer-events-auto">
          {/* Table */}
          <div className="lg:col-span-8 bg-[#0a0a14]/60 border border-white/5 rounded-xl p-5 backdrop-blur-sm overflow-x-auto text-left shadow-xl">
            <h3 className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider mb-3">
              Table 4. Order book by segment, standalone (Rs crore)
            </h3>
            <table className="w-full text-left font-mono text-[11px] text-white/80 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white font-bold">
                  <th className="py-2 pr-2 font-sans font-semibold">Segment</th>
                  <th className="py-2 px-2 text-right">FY24</th>
                  <th className="py-2 px-2 text-right">FY25</th>
                  <th className="py-2 px-2 text-right">FY26</th>
                  <th className="py-2 pl-2 text-right text-[#FFB800]">Dec 2025 (Q3)</th>
                </tr>
              </thead>
              <FinTableRows rows={obRows} />
            </table>
          </div>

          {/* Highlights */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-left">
            <div className="bg-[#0a0a14]/60 border border-white/10 rounded-xl p-4">
              <span className="font-mono text-[8px] text-white/40 block tracking-wider uppercase">Order Backlog Scale</span>
              <span className="text-3xl font-extrabold text-[#FFB800] block mt-1">Rs 2,226 Cr</span>
              <span className="text-[10px] text-white/60 leading-relaxed font-light mt-1 block">
                Order book size as of Dec 2025 stands at ₹2,226 crore, representing ~1.9x AMPL&apos;s annual consolidated revenues.
              </span>
            </div>
            <div className="bg-[#0a0a12] border border-white/5 p-4 rounded-xl">
              <span className="font-mono text-[8px] text-[#FFB800] uppercase block tracking-wider mb-1">Defense Expansion</span>
              <p className="text-[10px] text-white/50 leading-relaxed font-light">
                Defense backlog jumped dramatically to ₹1,477 Cr in Q3 Dec 2025, driven by key development projects converting into production contracts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Growth Guidance
function SceneGrowthPrograms() {
  const programs = [
    { title: "QRSAM", desc: "DRDO Air-Defense Missile. Astra supplies radar modules." },
    { title: "Uttam AESA Radar", desc: "Tejas aircraft fighter radar antenna array partner." },
    { title: "Su-30 Virupaksha", desc: "Su-30MKI upgrade radar active antenna array developer." },
    { title: "Su-30 Angad", desc: "DCPP partner for electronic warfare jammer pods." },
    { title: "Astra Rafael JV", desc: "Software-defined radio and communications hardware." },
    { title: "Electronic Mines", desc: "Large new defense product line flagged by management." },
  ];

  return (
    <div className="max-w-6xl w-full px-4 z-10 flex flex-col h-full py-8 overflow-y-auto no-scrollbar">
      <div className="my-auto w-full flex flex-col gap-6 select-text">
        <SceneHeading sub="06. GROWTH DRIVERS" main="Guidance: Five to Six Key Programs" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full pointer-events-auto">
          {/* Quote Panel */}
          <div className="lg:col-span-5 bg-[#1B4F72]/15 border border-[#1B4F72]/30 rounded-2xl p-6 shadow-2xl relative">
            <span className="font-mono text-[9px] text-[#FFB800] uppercase block tracking-widest mb-3">Management Quote</span>
            <blockquote className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal italic pl-4 border-l-2 border-[#FFB800] mb-6">
              &quot;It is going to be rear-ended. There are basically five or six major programs which are driving this. We have QRSAM, we have Uttam radars, we have Su-30 Virupaksha, we have Su-30 Angad, and we have regular business which we do for our JV and also... electronic mines, for example, is a big area for us.&quot;
            </blockquote>
            <cite className="font-mono text-[8px] text-white/40 block uppercase tracking-wider">
              — Management, Q4 FY26 Earnings Call
            </cite>
          </div>

          {/* Programs Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {programs.map((p) => (
              <div
                key={p.title}
                className="bg-[#0a0a14]/60 border border-white/5 rounded-xl p-4 text-left hover:border-[#FFB800]/30 transition-all duration-300 shadow-lg"
              >
                <h4 className="text-xs font-bold text-[#FFB800] uppercase tracking-wider mb-1">{p.title}</h4>
                <p className="text-[10px] text-white/50 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Capital & Working Capital
function SceneCapital() {
  const capEmployed: FinRow[] = [
    { label: "Fixed capital (net block)", v: ["182", "227", "272"] },
    { label: "Net working capital", v: ["793", "904", "1,085"] },
    { label: "Total capital employed", v: ["975", "1,131", "1,357"], emphasis: true },
  ];

  const wcDays: FinRow[] = [
    { label: "Debtor days", v: ["202", "272", "216"] },
    { label: "Inventory days", v: ["203", "211", "191"] },
    { label: "Payable days", v: ["35", "26", "36"] },
    { label: "Cash conversion cycle", v: ["370", "457", "371"], emphasis: true },
  ];

  return (
    <div className="max-w-6xl w-full px-4 z-10 flex flex-col h-full py-8 overflow-y-auto no-scrollbar">
      <div className="my-auto w-full flex flex-col gap-6 select-text">
        <SceneHeading sub="07. BALANCE SHEET" main="Capital &amp; Working Capital Structure" />
        <p className="text-xs sm:text-sm text-white/50 text-center max-w-xl mx-auto mb-2">
          Astra operates a working-capital-heavy defense and space contracting model with long milestone execution cycles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto items-start pointer-events-auto">
          {/* Table 5: Standalone Capital Employed */}
          <div className="bg-[#0a0a14]/40 border border-white/5 rounded-xl p-5 backdrop-blur-sm overflow-x-auto text-left shadow-lg">
            <h3 className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider mb-3">
              Table 5. Standalone capital employed (Rs crore)
            </h3>
            <table className="w-full text-left font-mono text-[11px] text-white/80 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white font-bold">
                  <th className="py-2 pr-2 font-sans font-semibold">Component</th>
                  <th className="py-2 px-2 text-right">FY24</th>
                  <th className="py-2 px-2 text-right">FY25</th>
                  <th className="py-2 pl-2 text-right">FY26</th>
                </tr>
              </thead>
              <FinTableRows rows={capEmployed} />
            </table>
          </div>

          {/* Table 6: Standalone Working Capital Days */}
          <div className="bg-[#0a0a14]/40 border border-white/5 rounded-xl p-5 backdrop-blur-sm overflow-x-auto text-left shadow-lg">
            <h3 className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider mb-3">
              Table 6. Standalone working capital days
            </h3>
            <table className="w-full text-left font-mono text-[11px] text-white/80 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white font-bold">
                  <th className="py-2 pr-2 font-sans font-semibold">Days</th>
                  <th className="py-2 px-2 text-right">FY24</th>
                  <th className="py-2 px-2 text-right">FY25</th>
                  <th className="py-2 pl-2 text-right">FY26</th>
                </tr>
              </thead>
              <FinTableRows rows={wcDays} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThesisBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#03030b]">
      {/* Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27, 79, 114, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27, 79, 114, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />
      {/* Subtle radial blueprint glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(27, 79, 114, 0.15) 0%, transparent 80%)"
        }}
      />
      
      {/* Slow pulsing/drifting constellation particles */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#FFB800] animate-pulse"
            style={{
              width: (i % 3 === 0 ? "2px" : "1.5px"),
              height: (i % 3 === 0 ? "2px" : "1.5px"),
              top: `${(i * 7 + 13) % 100}%`,
              left: `${(i * 13 + 7) % 100}%`,
              animationDuration: `${3 + (i % 4) * 1.5}s`,
              animationDelay: `${(i % 5) * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 9. Demerger Carve-Out Thesis - Part 1: The Hidden Space Company
function SceneThesisSpace({ presentationActive = false }: { presentationActive?: boolean }) {
  const capabilityChips = [
    "Satellite Payload Electronics",
    "Radar Systems",
    "Communication Systems",
  ];

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#03030b]">
      <ThesisBackground />

      <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-16 flex flex-col justify-center select-text">
        <SceneHeading sub="08. INVESTMENT THESIS I" main="The Market Sees Defence. We See Space." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full pointer-events-auto mt-4">
          {/* Left: Cinematic Artwork */}
          <div className="lg:col-span-6 relative flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a14]/60 shadow-[0_0_40px_rgba(0,0,0,0.8)] h-[260px] sm:h-[340px] md:h-[400px] group">
              <img
                src="/astra/astra_space_hidden.png"
                alt="Astra Microwave space electronics lab blueprint"
                className="w-full h-full object-cover scale-[1.01] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03030b] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,3,11,0.6))] pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[9px] text-[#FFB800] uppercase tracking-widest bg-[#03030b]/80 border border-white/5 px-2.5 py-1 rounded-md backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                SATELLITE &amp; RF DEVELOPMENT LAB
              </div>
            </div>
          </div>

          {/* Right: Content Card */}
          <div className="lg:col-span-6 flex flex-col text-left space-y-6 lg:pl-4">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-[#FFB800]/80 uppercase tracking-widest block font-semibold">
                Strategic Franchise
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight leading-snug">
                A 25-year space franchise hidden inside a defence company.
              </h3>
            </div>

            <p className="text-sm text-white/70 leading-relaxed font-light max-w-lg">
              Astra Microwave's space capabilities are not a speculative future venture, but a 25-year established franchise. 
              The company supplies mission-critical RF payloads, satellite electronics, and launch infrastructure, serving as 
              an essential subsystem partner for ISRO's most strategic programs.
            </p>

            <div className="space-y-4">
              <span className="font-mono text-[9px] text-white/40 uppercase block tracking-wider">
                Key Space Segments:
              </span>
              <div className="flex flex-col gap-2.5 max-w-md">
                {capabilityChips.map((chip, idx) => (
                  <motion.div
                    key={chip}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * idx, duration: 0.4 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#FFB800]/30 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800] font-bold text-[10px]">
                      ✓
                    </span>
                    <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">{chip}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. Demerger Carve-Out Thesis - Part 2: The Carve-Out Investors Ignore
function SceneThesisCarveOut({ presentationActive = false }: { presentationActive?: boolean }) {
  const chartData = [
    { quarter: "Q1 FY26", space: 2.4, weather: 0.4, total: "2.8%" },
    { quarter: "Q2 FY26", space: 2.0, weather: 5.8, total: "7.8%" },
    { quarter: "Q3 FY26", space: 2.6, weather: 3.4, total: "6.0%" },
    { quarter: "Q4 FY26", space: 19.5, weather: 4.9, total: "24.4%" },
  ];

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#03030b]">
      <ThesisBackground />

      <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-16 flex flex-col justify-center select-text">
        <SceneHeading sub="09. INVESTMENT THESIS II" main="The Numbers Hide The Opportunity" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full pointer-events-auto mt-4">
          {/* Left Column: Visual split & Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4 text-left">
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a14]/60 h-[140px] sm:h-[180px] group shadow-lg">
              <img
                src="/astra/astra_carveout_mix.png"
                alt="Astra space and meteorology split concept"
                className="w-full h-full object-cover scale-[1.01] group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03030b]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 font-mono text-[8px] text-white/50 tracking-widest uppercase">
                Dual Domain Capability: Space vs Meteorology
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0a0a14]/60 border border-[#FFB800]/10 rounded-xl p-4 text-left shadow-md">
                <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block mb-1">
                  Space Business
                </span>
                <ul className="text-xs text-white/70 font-light space-y-1">
                  <li className="flex items-center gap-1.5">• High technology</li>
                  <li className="flex items-center gap-1.5">• Long project cycles</li>
                  <li className="flex items-center gap-1.5">• Higher strategic value</li>
                </ul>
              </div>

              <div className="bg-[#0a0a14]/40 border border-white/5 rounded-xl p-4 text-left shadow-md">
                <span className="font-mono text-[9px] text-white/40 tracking-wider block mb-1">
                  Weather Business
                </span>
                <ul className="text-xs text-white/55 font-light space-y-1">
                  <li className="flex items-center gap-1.5">• Doppler radars</li>
                  <li className="flex items-center gap-1.5">• Meteorology infrastructure</li>
                  <li className="flex items-center gap-1.5">• Government contracts</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#FFB800]/[0.02] border border-[#FFB800]/20 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-white/75 leading-relaxed font-light">
                <strong>Segment reporting combines both businesses:</strong> The reported Space + Meteorology segment makes it difficult for public markets to isolate the superior economics of the core space business.
              </p>
            </div>
          </div>

          {/* Right Column: Chart & Callout */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-5">
                <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider">
                  Quarterly Revenue Mix (Space vs Meteorology)
                </span>
                <span className="font-mono text-[8px] text-white/40">FY26 REPORTED</span>
              </div>

              <div className="space-y-4 py-2">
                {chartData.map((data, idx) => {
                  const maxVal = 24.4;
                  const spacePercent = (data.space / maxVal) * 100;
                  const weatherPercent = (data.weather / maxVal) * 100;

                  return (
                    <div key={data.quarter} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/60 font-semibold">{data.quarter}</span>
                        <span className="text-[#FFB800] font-bold">Total: {data.total}</span>
                      </div>
                      
                      <div className="h-6 w-full bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden flex relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${spacePercent}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * idx, ease: "easeOut" }}
                          className="bg-[#FFB800] h-full flex items-center justify-start pl-2 shadow-[0_0_12px_#FFB800]"
                        >
                          <span className="text-[9px] text-[#030308] font-bold whitespace-nowrap">
                            Space ({data.space}%)
                          </span>
                        </motion.div>
                        
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${weatherPercent}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * idx + 0.2, ease: "easeOut" }}
                          className="bg-[#1B4F72] h-full flex items-center justify-start pl-2"
                        >
                          <span className="text-[9px] text-white/90 font-semibold whitespace-nowrap">
                            Weather ({data.weather}%)
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-[#030308]/60 border border-[#FFB800]/10 rounded-xl p-3.5 text-left">
                <span className="font-mono text-[8px] text-[#FFB800]/80 uppercase block tracking-wider mb-1">
                  Analyst Assessment
                </span>
                <p className="text-[10px] text-white/50 leading-relaxed font-light">
                  Consolidated financials understate the strategic importance of Astra's space franchise. The Q4 spike to 19.5% space revenue signals a massive pivot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 11. Demerger Carve-Out Thesis - Part 3: The Catalyst
function SceneThesisCatalyst({ presentationActive = false }: { presentationActive?: boolean }) {
  const timeline = [
    { label: "2025", desc: "Demerger strategy initiated to unlock corporate equity." },
    { label: "February 2026", desc: "Board approves in-principle demerger structure." },
    { label: "June 2026", desc: "Shareholder approval obtained for the carve-out." },
    { label: "Next Steps", desc: "Regulatory approvals (NCLT, SEBI clearances)." },
    { label: "Expected Listing", desc: "Target listing by mid-FY28 (subject to clearances)." },
  ];

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#03030b]">
      <ThesisBackground />

      <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-16 flex flex-col justify-center select-text">
        <SceneHeading sub="10. THE CATALYST" main="The Market Is Finally Separating The Story" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full pointer-events-auto mt-4">
          
          {/* Left: Vertical Timeline */}
          <div className="lg:col-span-6 relative flex flex-col pl-4 text-left">
            <h4 className="font-mono text-[9px] text-[#FFB800] uppercase tracking-widest block mb-6 font-semibold animate-pulse">
              Demerger Roadmap Milestones
            </h4>

            {/* Timeline container */}
            <div className="relative border-l-2 border-white/10 pl-6 space-y-6 py-2">
              {/* Vertical animating line */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute left-[-2px] top-0 w-[2px] bg-gradient-to-b from-[#FFB800] via-[#1B4F72] to-transparent origin-top"
              />

              {timeline.map((t, idx) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * idx, duration: 0.5 }}
                  className="relative space-y-1"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#03030b] border-2 border-[#FFB800] shadow-[0_0_8px_#FFB800]" />
                  
                  <span className="font-mono text-xs text-[#FFB800] font-bold block">
                    {t.label}
                  </span>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {t.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Splitting image & Minimal Copy */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a14]/60 shadow-[0_0_40px_rgba(0,0,0,0.8)] h-[220px] sm:h-[280px] group">
              <img
                src="/astra/astra_catalyst_split.png"
                alt="Astra Microwave entity split illustration"
                className="w-full h-full object-cover scale-[1.01] group-hover:scale-103 transition-transform duration-750 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03030b] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 font-mono text-[8px] text-white/50 tracking-widest uppercase">
                AMPL Demerger &mdash; Corporate Carve-out
              </div>
            </div>

            <div className="bg-[#0a0a14]/60 border border-white/5 rounded-xl p-5 text-left space-y-3">
              <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block font-semibold">
                Strategic Rationale
              </span>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Astra's space business will transition into <strong>Astra Space Technologies</strong>. Existing shareholders 
                receive proportional ownership in the new pure-play entity, creating a strategic focus and allowing independent 
                capital allocation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// 12. Demerger Carve-Out Thesis - Part 4: Why This Matters
function SceneThesisMatters({ presentationActive = false }: { presentationActive?: boolean }) {
  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#03030b]">
      <ThesisBackground />

      <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-16 flex flex-col justify-center select-text">
        <SceneHeading sub="11. WHY THIS MATTERS" main="Visibility Creates Value" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full pointer-events-auto mt-4">
          
          {/* Left Column: Quote Card & Highlighted Insight */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 text-left">
            {/* Elegant Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a14]/60 border-l-4 border-[#FFB800] rounded-r-xl p-6 shadow-md space-y-4"
            >
              <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block font-semibold">
                Management Stated Expectations
              </span>
              <blockquote className="text-sm text-white/90 italic font-light leading-relaxed">
                &ldquo;The proposed restructuring aims to unlock shareholder value by positioning the space venture under 
                a dedicated corporate structure, enabling targeted capital allocation and distinct market valuations.&rdquo;
              </blockquote>
              <cite className="block text-[10px] font-mono text-white/40 uppercase tracking-wider">
                &mdash; Astra Microwave Management Commentary
              </cite>
            </motion.div>

            {/* Highlighted Insight */}
            <div className="bg-[#FFB800]/[0.02] border border-[#FFB800]/25 rounded-xl p-5 shadow-sm space-y-2">
              <span className="font-mono text-[8px] text-[#FFB800] uppercase tracking-wider block font-semibold">
                Strategic Alignment
              </span>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                The demerger is intended to allow each business to pursue independent growth, align with distinct investor 
                mandates, and optimize capital allocation on standalone merits.
              </p>
            </div>
          </div>

          {/* Right Column: Concept Graphic & Callout */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 shadow-2xl relative">
            <div className="relative rounded-xl overflow-hidden border border-white/5 h-[180px] sm:h-[220px] mb-4">
              <img
                src="/astra/astra_valuation_lens.png"
                alt="Astra valuation multiple lens"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03030b] via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="bg-[#030308]/60 border border-white/5 rounded-xl p-4 text-left">
              <span className="font-mono text-[8px] text-white/40 uppercase block tracking-wider mb-1">
                Structural Thesis
              </span>
              <p className="text-[10px] text-white/50 leading-relaxed font-light">
                Public markets frequently assign conglomerate discounts to blended companies. The demerger aims to resolve 
                this by making Astra's high-margin space franchise directly visible to analysts and investors.
              </p>
            </div>
          </div>

        </div>

        {/* Ending Statement (Emotional Climax) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.0 }}
          className="mt-12 text-center border-t border-white/5 pt-8 max-w-2xl mx-auto space-y-2"
        >
          <p className="text-base sm:text-lg md:text-xl font-light text-white tracking-wide italic" style={{ fontFamily: "Georgia, serif" }}>
            &ldquo;The business hasn&apos;t changed overnight. Only the lens through which investors may eventually view it.&rdquo;
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// 13. Demerger Carve-Out Thesis - Part 5: The Road to Two Companies
function SceneRoadToTwoCompanies({ presentationActive = false }: { presentationActive?: boolean }) {
  const rows = [
    { milestone: "In-principle board approval to demerge", date: "27 Feb 2026", status: "DONE" },
    { milestone: "Managing Director transition announced", date: "3 Apr 2026", status: "DONE" },
    { milestone: "FY26 results, demerger progress confirmed", date: "26 May 2026", status: "DONE" },
    { milestone: "Q4 FY26 earnings call, \"scheme in a few weeks\"", date: "27 May 2026", status: "DONE" },
    { milestone: "Board takes up draft Scheme of Arrangement", date: "10 Jun 2026", status: "TRIGGER" },
    { milestone: "Registered valuer report, share-exchange ratio", date: "After board", status: "AWAITED" },
    { milestone: "Shareholder, creditor, SEBI, exchange, NCLT approvals", date: "Subsequent", status: "AWAITED" },
    { milestone: "Completion and listing of the space company", date: "Target Q1 FY28 (~mid-2027)", status: "AWAITED" },
  ];

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#03030b]">
      <ThesisBackground />

      <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-16 flex flex-col justify-center select-text">
        <SceneHeading sub="12. DEMERGER TIMELINE" main="The Road to Two Companies" />
        <p className="text-xs text-white/50 text-center max-w-xl mx-auto mb-6">
          Astra's space, meteorology and hydrology business is on track to become Astra Space Technologies. Here is where things stand.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full pointer-events-auto">
          
          {/* Left Column: Timeline Table */}
          <div className="lg:col-span-8 bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-2xl text-left">
            <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-[#FFB800] mb-4 border-b border-white/10 pb-2 pl-6">
              <span>Milestone</span>
              <div className="flex gap-24 pr-4">
                <span>Date</span>
                <span className="w-16 text-right">Status</span>
              </div>
            </div>

            <div className="relative border-l border-white/10 pl-6 space-y-4 py-1">
              {rows.map((r, idx) => (
                <div 
                  key={idx} 
                  className="grid grid-cols-12 gap-4 items-center relative py-1 border-b border-white/[0.03] last:border-0 pb-2 last:pb-0"
                >
                  {/* Timeline Node Dot */}
                  <div className={`absolute left-[-30.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#03030b] border ${
                    r.status === "DONE"
                      ? "border-[#FFB800] shadow-[0_0_8px_#FFB800]"
                      : r.status === "TRIGGER"
                      ? "border-yellow-400 shadow-[0_0_8px_#eab308]"
                      : "border-sky-500/40"
                  }`} />

                  {/* Milestone name */}
                  <div className="col-span-7 pr-2">
                    <span className="text-xs font-semibold text-white/90">{r.milestone}</span>
                  </div>

                  {/* Date */}
                  <div className="col-span-3 text-xs font-mono text-white/60 text-right">
                    {r.date}
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex justify-end">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider ${
                      r.status === "DONE"
                        ? "text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/25"
                        : r.status === "TRIGGER"
                        ? "text-yellow-400 bg-yellow-500/10 border border-yellow-400/25 animate-pulse"
                        : "text-sky-400 bg-sky-500/10 border border-sky-500/25"
                    }`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: What this means & Legend */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-left">
            {/* What this means card */}
            <div className="bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-5 shadow-xl relative">
              <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 mb-4">
                <Calendar className="w-4 h-4 text-[#FFB800]" />
                <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block font-semibold">
                  What This Means
                </span>
              </div>
              <div className="space-y-4 text-xs text-white/70 font-light leading-relaxed">
                <p>The demerger process is moving forward in clear stages.</p>
                <p>The next key trigger is the board taking up the draft Scheme of Arrangement.</p>
                <p>Subject to approvals, the new space company is targeted to become operational and listed by Q1 FY28.</p>
              </div>
            </div>

            {/* Legend card */}
            <div className="bg-[#0a0a14]/40 border border-white/5 rounded-xl p-4 space-y-2.5">
              <span className="font-mono text-[9px] text-white/40 uppercase block tracking-wider mb-2">
                Status Legend
              </span>
              <div className="flex flex-col gap-2 font-mono text-[9px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#FFB800]" />
                    <span className="text-[#FFB800] font-bold">DONE</span>
                  </div>
                  <span className="text-white/60">Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">TRIGGER</span>
                  </div>
                  <span className="text-white/60">Upcoming Key Trigger</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Hourglass className="w-3 h-3 text-sky-400" />
                    <span className="text-sky-400 font-bold">AWAITED</span>
                  </div>
                  <span className="text-white/60">Pending Approvals</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sources Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-white/10 pt-4 mt-8 text-[9px] text-white/40 leading-relaxed font-light text-left pointer-events-auto">
          <div className="lg:col-span-7 space-y-2 border-r border-white/5 pr-4">
            <div>
              <span className="font-mono text-white/50 font-bold">SOURCE: </span>
              <span>Company filings and earnings-call commentary, February to June 2026.</span>
            </div>
            <div>
              <span className="font-mono text-white/50 font-bold">SECTIONS: </span>
              <span>Sections 230 to 232 of the Companies Act, 2013 govern schemes of arrangement.</span>
            </div>
            <div>
              <span className="font-mono text-white/50 font-bold">REGULATORS: </span>
              <span>SEBI: Securities and Exchange Board of India. NCLT: National Company Law Tribunal.</span>
            </div>
          </div>
          <div className="lg:col-span-5 pl-0 lg:pl-4">
            <span className="font-mono text-white/50 font-bold block mb-1">SECTION SOURCES:</span>
            <p>
              Company press release, 27 February 2026; board-meeting intimations, April to June 2026; Q2 FY26 earnings call (value-gap quote); 
              Q4 FY26 earnings call (rationale, timeline). The share-exchange ratio and the carve-out's standalone financials were not public as of this writing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 14. LISTED PEERS
const PEER_MULTIPLE_DATA = [
  { company: "Hindustan Aeronautics (HAL)", multiple: "17.3", isBold: false },
  { company: "Mazagon Dock", multiple: "24.1", isBold: false },
  { company: "Cochin Shipyard", multiple: "31.1", isBold: false },
  { company: "Bharat Electronics (BEL)", multiple: "33.8", isBold: false },
  { company: "Astra Microwave (blended, today)", multiple: "36.4", isGold: true },
  { company: "Aerospace & Defence, sector median", multiple: "47.6", isBold: true, isMedian: true },
  { company: "Zen Technologies", multiple: "48.3", isBold: false },
  { company: "Paras Defence", multiple: "51.1", isBold: false },
  { company: "Apollo Micro", multiple: "68.5", isBold: false },
  { company: "Avantel", multiple: "93.3", isBold: false },
  { company: "MTAR Technologies", multiple: "127.1", isBold: false },
];

function SceneListedPeers() {
  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#03030b]">
      <ThesisBackground />

      <div className="relative z-10 max-w-4xl w-full px-6 md:px-12 py-16 flex flex-col justify-center select-text">
        <SceneHeading sub="13. COMPARABLE VALUATIONS" main="Listed Peers" />
        <p className="text-xs text-white/50 text-center max-w-xl mx-auto mb-6">
          Comparing Astra's current blended trailing multiple with listed defense, aerospace, and space technology peers.
        </p>

        <div className="bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-2xl text-left pointer-events-auto max-w-2xl mx-auto w-full mb-6">
          <div className="overflow-x-auto max-h-[48vh] overflow-y-auto pr-1">
            <h3 className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider mb-4">
              Table 9. Listed peer EV/EBITDA, the anchor (trailing, x)
            </h3>
            <table className="w-full text-left font-mono text-[11px] text-white/80 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white font-bold uppercase text-[9px] tracking-wider">
                  <th className="py-2.5 pr-4">Company</th>
                  <th className="py-2.5 pl-4 text-right">EV/EBITDA (TTM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {PEER_MULTIPLE_DATA.map((row, idx) => {
                  const isGold = row.isGold;
                  const isMedian = row.isMedian;
                  return (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        isGold
                          ? "bg-[#FFB800]/[0.08] text-white font-bold"
                          : isMedian
                          ? "bg-white/[0.03] text-white font-semibold"
                          : "hover:bg-white/[0.01]"
                      }`}
                    >
                      <td className="py-2 px-1 text-white/90">
                        {isGold ? (
                          <span className="text-[#FFB800] font-bold">{row.company}</span>
                        ) : (
                          row.company
                        )}
                      </td>
                      <td
                        className={`py-2 px-1 text-right font-bold ${
                          isGold ? "text-[#FFB800]" : "text-white"
                        }`}
                      >
                        {row.multiple}x
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sources Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-white/10 pt-4 mt-2 text-[9px] text-white/40 leading-relaxed font-light text-left pointer-events-auto">
          <div className="lg:col-span-7 space-y-2 border-r border-white/5 pr-4">
            <div>
              <span className="font-mono text-white/50 font-bold">SOURCE: </span>
              <span>Publicly available market valuations and Bloomberg/CapitalIQ trailing multiples.</span>
            </div>
            <div>
              <span className="font-mono text-white/50 font-bold">METRIC: </span>
              <span>EV/EBITDA is calculated using trailing twelve months (TTM) enterprise value and EBITDA.</span>
            </div>
          </div>
          <div className="lg:col-span-5 pl-0 lg:pl-4">
            <span className="font-mono text-white/50 font-bold block mb-1">NOTE:</span>
            <p>
              Aerospace & Defence sector median is calculated across listed Indian enterprises. Trailing multiples reflect trailing earnings as of mid-2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 15. SUM OF THE PARTS (SOTP) VALUATION
const SOTP_BRIDGE_DATA = [
  { component: "Defence parent (AMPL)", bear: "8,520", base: "10,790", bull: "12,780" },
  { component: "ARC and JV stakes", bear: "600", base: "800", bull: "1,000" },
  { component: "Space company (ASTPL)", bear: "2,000", base: "2,750", bull: "4,000" },
  { component: "Implied combined EV", bear: "11,120", base: "14,340", bull: "17,780", isBold: true, hasBg: true },
  { component: "Current EV (approx.)", bear: "16,200", base: "16,200", bull: "16,200" },
  { component: "Upside / (downside)", bear: "(31%)", base: "(11%)", bull: "+10%", isBold: true, isUpside: true },
];

const DEFENCE_PARENT_DATA = [
  { scenario: "Bear (below BEL)", ebitda: "284", multiple: "30", ev: "8,520" },
  { scenario: "Base (around BEL/Astra)", ebitda: "284", multiple: "38", ev: "10,790" },
  { scenario: "Bull (toward Paras)", ebitda: "284", multiple: "45", ev: "12,780" },
  { scenario: "Plus: ARC + JV stake value", ebitda: "-", multiple: "-", ev: "600 to 1,000", isBold: true },
];

const SPACE_COMPANY_DATA = [
  { lens: "EV/EBITDA premium", basis: "~50 cr EBITDA at 40x / 60x / 80x", bear: "2,000", base: "3,000", bull: "4,000" },
  { lens: "EV/Sales cross-check", basis: "~185 cr sales at 8x / 13x / 18x", bear: "1,480", base: "2,400", bull: "3,330" },
  { lens: "Taken for SOTP", basis: "SOTP Value Anchor", bear: "2,000", base: "2,750", bull: "4,000", isBold: true, hasBg: true },
];

function SceneSotpValuation() {
  const [activeTab, setActiveTab] = useState<"defence" | "space">("defence");

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#03030b]">
      <ThesisBackground />

      <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-12 flex flex-col justify-center select-text">
        <SceneHeading sub="14. VALUATION MODEL" main="Sum of the Parts Valuation" />
        <p className="text-xs text-white/50 text-center max-w-xl mx-auto mb-6">
          SOTP model scenarios (Rs crore) mapping the demerger value unlocking bridge for the defence parent and space carve-out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full pointer-events-auto mb-4">
          
          {/* Left Column: SOTP Bridge Table */}
          <div className="lg:col-span-7 bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-5 backdrop-blur-sm shadow-2xl text-left">
            <h3 className="font-mono text-[10px] text-[#FFB800] uppercase tracking-wider mb-3">
              Table 12. Sum-of-the-parts bridge versus today (Rs crore)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[10px] sm:text-xs text-white/80 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white font-bold uppercase text-[9px] tracking-wider">
                    <th className="py-2.5 pr-2">Component</th>
                    <th className="py-2.5 px-2 text-right">Bear</th>
                    <th className="py-2.5 px-2 text-right">Base</th>
                    <th className="py-2.5 pl-2 text-right">Bull</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {SOTP_BRIDGE_DATA.map((row, idx) => {
                    const isBold = row.isBold;
                    const hasBg = row.hasBg;
                    const isUpside = row.isUpside;
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          hasBg
                            ? "bg-white/[0.03]"
                            : isUpside
                            ? "bg-white/[0.02]"
                            : "hover:bg-white/[0.01]"
                        }`}
                      >
                        <td className={`py-2 px-1 text-white/90 ${isBold ? "font-bold" : ""}`}>
                          {row.component}
                        </td>
                        <td className={`py-2 px-1 text-right font-mono ${
                          isBold ? "font-bold text-white" : ""
                        } ${isUpside ? "text-red-400" : ""}`}>
                          {row.bear}
                        </td>
                        <td className={`py-2 px-1 text-right font-mono ${
                          isBold ? "font-bold text-white" : ""
                        } ${isUpside ? "text-red-400" : ""}`}>
                          {row.base}
                        </td>
                        <td className={`py-2 px-1 text-right font-mono ${
                          isBold ? "font-bold text-white" : ""
                        } ${isUpside ? "text-emerald-400" : ""}`}>
                          {row.bull}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Interactive Detail Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            <div className="bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-5 shadow-xl relative">
              {/* Tab Toggles */}
              <div className="flex border-b border-white/10 pb-3 mb-4 gap-4">
                <button
                  onClick={() => setActiveTab("defence")}
                  className={`font-mono text-[9px] uppercase tracking-wider pb-1 cursor-pointer transition-all border-b-2 ${
                    activeTab === "defence"
                      ? "text-[#FFB800] border-[#FFB800] font-bold"
                      : "text-white/40 border-transparent hover:text-white/70"
                  }`}
                >
                  Defence Parent (AMPL)
                </button>
                <button
                  onClick={() => setActiveTab("space")}
                  className={`font-mono text-[9px] uppercase tracking-wider pb-1 cursor-pointer transition-all border-b-2 ${
                    activeTab === "space"
                      ? "text-[#FFB800] border-[#FFB800] font-bold"
                      : "text-white/40 border-transparent hover:text-white/70"
                  }`}
                >
                  Space Company (ASTPL)
                </button>
              </div>

              {/* Tab 1: Defence Parent details */}
              {activeTab === "defence" && (
                <div>
                  <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">
                    Table 10. Defence parent EV/EBITDA multiple scenarios
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[10px] text-white/70 border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40 text-[8px] uppercase tracking-wider">
                          <th className="py-2 pr-2">Scenario</th>
                          <th className="py-2 px-2 text-right">EBITDA</th>
                          <th className="py-2 px-2 text-right">Mult</th>
                          <th className="py-2 pl-2 text-right">EV</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {DEFENCE_PARENT_DATA.map((row, idx) => (
                          <tr key={idx} className={row.isBold ? "font-bold text-white" : ""}>
                            <td className="py-2 pr-2 text-white/95">{row.scenario}</td>
                            <td className="py-2 px-2 text-right">{row.ebitda}</td>
                            <td className="py-2 px-2 text-right">{row.multiple}{row.multiple !== "-" ? "x" : ""}</td>
                            <td className="py-2 pl-2 text-right text-white font-semibold">{row.ev}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[8px] text-white/45 leading-relaxed mt-3.5 italic">
                    * Parent EBITDA is group EBITDA less the estimated space carve-out EBITDA. Multiples are based on BEL/Astra trailing peers.
                  </p>
                </div>
              )}

              {/* Tab 2: Space Company details */}
              {activeTab === "space" && (
                <div>
                  <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">
                    Table 11. The space company (ASTPL), scenarios
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[9px] text-white/70 border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40 text-[7px] uppercase tracking-wider">
                          <th className="py-2 pr-2">Lens</th>
                          <th className="py-2 px-2">Basis</th>
                          <th className="py-2 px-1 text-right">Bear</th>
                          <th className="py-2 px-1 text-right">Base</th>
                          <th className="py-2 pl-1 text-right">Bull</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {SPACE_COMPANY_DATA.map((row, idx) => (
                          <tr
                            key={idx}
                            className={`${row.isBold ? "font-bold text-white" : ""} ${
                              row.hasBg ? "bg-white/[0.02]" : ""
                            }`}
                          >
                            <td className="py-2 pr-1.5 text-white/95">{row.lens}</td>
                            <td className="py-2 px-1 text-white/50 text-[8px] leading-tight max-w-[100px]">{row.basis}</td>
                            <td className="py-2 px-1 text-right text-white font-semibold">{row.bear}</td>
                            <td className="py-2 px-1 text-right text-white font-semibold">{row.base}</td>
                            <td className="py-2 pl-1 text-right text-white font-semibold">{row.bull}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[8px] text-white/45 leading-relaxed mt-3.5 italic">
                    * Highlights a premium valuation lens for space assets (~50 cr EBITDA at 40x / 60x / 80x multiples) versus sales cross-checks.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Sources Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-white/10 pt-4 mt-2 text-[9px] text-white/40 leading-relaxed font-light text-left pointer-events-auto">
          <div className="lg:col-span-7 space-y-2 border-r border-white/5 pr-4">
            <div>
              <span className="font-mono text-white/50 font-bold">SOURCE: </span>
              <span>Author estimates. Parent EBITDA is group EBITDA less the estimated carve-out EBITDA.</span>
            </div>
            <div>
              <span className="font-mono text-white/50 font-bold">STAKES: </span>
              <span>The Astra Rafael Comsys (ARC) stake is valued separately because it is equity-accounted and not consolidated.</span>
            </div>
          </div>
          <div className="lg:col-span-5 pl-0 lg:pl-4">
            <span className="font-mono text-white/50 font-bold block mb-1">NOTE:</span>
            <p>
              ARC is guided to cross ₹600 crore of sales in FY27 at an 18 to 20 percent margin, supporting a few hundred crore of additional value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 16. KEY TAKEAWAYS
const TAKEAWAYS_DATA = [
  {
    num: "01",
    boldText: "A demerger is a pricing tool, not a value machine.",
    bodyText: "Separating businesses lets the market value each on its own terms. It does not, by itself, create cash flow. Astra's parts may be worth more apart, but only if the spun-off piece earns a premium the blended company could not."
  },
  {
    num: "02",
    boldText: "Read what is actually in the carve-out.",
    bodyText: "The market will call this a space listing. It is half meteorology and hydrology by order book. Mislabelling the asset is the most common error in demerger analysis."
  },
  {
    num: "03",
    boldText: "Distinguish a trend from a spike.",
    bodyText: "The carve-out's headline FY26 growth is one strong quarter on a lumpy, project-driven base, not a steady ramp. Always pull the quarterly mix before believing an annual growth number."
  },
  {
    num: "04",
    boldText: "Mind the accounting boundaries.",
    bodyText: "Astra's largest associated business, the ARC joint venture, is equity-accounted, so its revenue never appears in the top line and must be valued separately. Standalone and consolidated being near-identical is the tell."
  },
  {
    num: "05",
    boldText: "Be honest when the data is not there yet.",
    bodyText: "No share-exchange ratio, no standalone accounts, no disclosed segment margin. A rigorous valuation says so and works in scenarios, rather than inventing a single answer."
  }
];

function SceneKeyTakeaways() {
  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#03030b]">
      <ThesisBackground />

      <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-10 flex flex-col justify-center select-text">
        <SceneHeading sub="THE LESSON" main="Key takeaways: what this case teaches about demergers" />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full pointer-events-auto mb-6">
          {/* Row 1: 3 Cards */}
          {TAKEAWAYS_DATA.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className="md:col-span-2 bg-[#0a0a14]/60 border-t-2 border-t-[#1B4F72] border-x border-b border-white/5 rounded-xl p-5 hover:border-t-[#FFB800] transition-colors duration-300 shadow-xl flex flex-col min-h-[220px]"
            >
              <span className="font-mono text-2xl font-black text-[#1B4F72] block mb-2">{item.num}</span>
              <p className="text-xs text-white/90 font-light leading-relaxed">
                <span className="font-bold text-white block mb-1">{item.boldText}</span>
                {item.bodyText}
              </p>
            </div>
          ))}

          {/* Row 2: 2 Cards (Centered) */}
          <div className="md:col-span-1 hidden md:block" /> {/* spacer */}
          {TAKEAWAYS_DATA.slice(3, 5).map((item, idx) => (
            <div
              key={idx}
              className="md:col-span-2 bg-[#0a0a14]/60 border-t-2 border-t-[#1B4F72] border-x border-b border-white/5 rounded-xl p-5 hover:border-t-[#FFB800] transition-colors duration-300 shadow-xl flex flex-col min-h-[220px]"
            >
              <span className="font-mono text-2xl font-black text-[#1B4F72] block mb-2">{item.num}</span>
              <p className="text-xs text-white/90 font-light leading-relaxed">
                <span className="font-bold text-white block mb-1">{item.boldText}</span>
                {item.bodyText}
              </p>
            </div>
          ))}
          <div className="md:col-span-1 hidden md:block" /> {/* spacer */}
        </div>

        {/* Sources Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-white/10 pt-4 mt-2 text-[9px] text-white/40 leading-relaxed font-light text-left pointer-events-auto">
          <div className="lg:col-span-7 space-y-2 border-r border-white/5 pr-4">
            <div>
              <span className="font-mono text-white/50 font-bold">SUMMARY: </span>
              <span>Case study synthesis on structural corporate events, listing arbitrage, and public reporting thresholds.</span>
            </div>
            <div>
              <span className="font-mono text-white/50 font-bold">SECTOR BOUNDARY: </span>
              <span>Defense contracts and government weather tenders feature long fabrication cycles and lumpy revenue recognition.</span>
            </div>
          </div>
          <div className="lg:col-span-5 pl-0 lg:pl-4">
            <span className="font-mono text-white/50 font-bold block mb-1">ANALYSIS NOTE:</span>
            <p>
              Conglomerate discounts resolve slowly. Asset re-rating relies on the spun-off pure-play entity executing its milestones transparently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AstraMicrowavePage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef } = p;

  const SEG = 1 / TOTAL_FRAMES;
  const FADE_IN = 0.25 * SEG;
  const FADE_HOLD = 0.35 * SEG;
  const fr = (i: number) => [i * SEG - FADE_IN, i * SEG, (i + 1) * SEG - FADE_HOLD, (i + 1) * SEG];
  const FADE = [0, 1, 1, 0];
  const RISE = [24, 0, 0, -24];

  const heroOpacity = useTransform(progress, [0.0, SEG - FADE_IN, SEG], [1, 1, 0]);
  const heroScale = useTransform(progress, [0.0, SEG], [1, 0.96]);

  const s1Opacity = useTransform(progress, fr(1), FADE);
  const s1Y = useTransform(progress, fr(1), RISE);

  const s2Opacity = useTransform(progress, fr(2), FADE);
  const s2Y = useTransform(progress, fr(2), RISE);

  const s3Opacity = useTransform(progress, fr(3), FADE);
  const s3Y = useTransform(progress, fr(3), RISE);

  const s4Opacity = useTransform(progress, fr(4), FADE);
  const s4Y = useTransform(progress, fr(4), RISE);

  const s5Opacity = useTransform(progress, fr(5), FADE);
  const s5Y = useTransform(progress, fr(5), RISE);

  const s6Opacity = useTransform(progress, fr(6), FADE);
  const s6Y = useTransform(progress, fr(6), RISE);

  const s7Opacity = useTransform(progress, fr(7), FADE);
  const s7Y = useTransform(progress, fr(7), RISE);

  const s8Opacity = useTransform(progress, fr(8), FADE);
  const s8Y = useTransform(progress, fr(8), RISE);

  const s9Opacity = useTransform(progress, fr(9), FADE);
  const s9Y = useTransform(progress, fr(9), RISE);

  const s10Opacity = useTransform(progress, fr(10), FADE);
  const s10Y = useTransform(progress, fr(10), RISE);

  const s11Opacity = useTransform(progress, fr(11), FADE);
  const s11Y = useTransform(progress, fr(11), RISE);

  const s12Opacity = useTransform(progress, fr(12), FADE);
  const s12Y = useTransform(progress, fr(12), RISE);

  const s13Opacity = useTransform(progress, fr(13), FADE);
  const s13Y = useTransform(progress, fr(13), RISE);

  const s14Opacity = useTransform(progress, fr(14), FADE);
  const s14Y = useTransform(progress, fr(14), RISE);

  const s15Opacity = useTransform(progress, [15 * SEG - FADE_IN, 15 * SEG, 1.0], [0, 1, 1]);
  const s15Y = useTransform(progress, [15 * SEG - FADE_IN, 15 * SEG, 1.0], [24, 0, 0]);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#FFB800] selection:text-[#030308] relative overflow-x-hidden">
      <Navbar />
      <PresentationChrome controller={p} scenes={ASTRA_SCENES} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[1600vh] bg-[#030308]">
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
                className={`${[0, 8, 9, 10, 11, 12, 13, 14, 15].includes(currentFrameIndex) ? "absolute inset-0 w-full h-full z-10 pointer-events-auto" : SLIDE_BASE} text-center pointer-events-auto h-full`}
              >
                {currentFrameIndex === 0 && <SceneHero presentationActive={true} />}
                {currentFrameIndex === 1 && <SceneFounding active={true} />}
                {currentFrameIndex === 2 && <SceneFinancials active={true} />}
                {currentFrameIndex === 3 && <SceneEntities />}
                {currentFrameIndex === 4 && <SceneRevenueMix />}
                {currentFrameIndex === 5 && <SceneOrderBook />}
                {currentFrameIndex === 6 && <SceneGrowthPrograms />}
                {currentFrameIndex === 7 && <SceneCapital />}
                {currentFrameIndex === 8 && <SceneThesisSpace presentationActive={true} />}
                {currentFrameIndex === 9 && <SceneThesisCarveOut presentationActive={true} />}
                {currentFrameIndex === 10 && <SceneThesisCatalyst presentationActive={true} />}
                {currentFrameIndex === 11 && <SceneThesisMatters presentationActive={true} />}
                {currentFrameIndex === 12 && <SceneRoadToTwoCompanies presentationActive={true} />}
                {currentFrameIndex === 13 && <SceneListedPeers />}
                {currentFrameIndex === 14 && <SceneSotpValuation />}
                {currentFrameIndex === 15 && <SceneKeyTakeaways />}
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
                className={`${SLIDE_BASE} text-center ${
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
                <SceneFinancials active={currentFrameIndex === 2} />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneEntities />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneRevenueMix />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 5 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneOrderBook />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 6 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneGrowthPrograms />
              </motion.div>

              <motion.div
                style={{ opacity: s7Opacity, y: s7Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 7 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneCapital />
              </motion.div>

              <motion.div
                style={{ opacity: s8Opacity, y: s8Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneThesisSpace presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s9Opacity, y: s9Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneThesisCarveOut presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s10Opacity, y: s10Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneThesisCatalyst presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s11Opacity, y: s11Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneThesisMatters presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s12Opacity, y: s12Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneRoadToTwoCompanies presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s13Opacity, y: s13Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneListedPeers />
              </motion.div>

              <motion.div
                style={{ opacity: s14Opacity, y: s14Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneSotpValuation />
              </motion.div>

              <motion.div
                style={{ opacity: s15Opacity, y: s15Y }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none animate-none"
              >
                <SceneKeyTakeaways />
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Floating Presentation Mode Toggle & Chapter navigation buttons */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-[#0a0a14]/80 border border-white/10 rounded-full px-5 py-2.5 backdrop-blur-md shadow-2xl">
        <button
          onClick={() => (presentationActive ? p.exit() : p.enter())}
          className="interactive-control flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-white hover:text-[#FFB800] transition-colors"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${presentationActive ? "bg-[#FFB800] animate-pulse shadow-[0_0_8px_#FFB800]" : "bg-white/20"}`} />
          {presentationActive ? "Scroll Mode" : "Presenter Mode"}
        </button>
        <div className="w-px h-4 bg-white/10" />
        <Link
          href="/case-studies"
          className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
        >
          Exit Case Study
        </Link>
      </div>
    </div>
  );
}

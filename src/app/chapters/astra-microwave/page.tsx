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
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA & CONSTANTS
// ---------------------------------------------------------------------------

const TOTAL_FRAMES = 9;

const ASTRA_SCENES = [
  { id: "hero", name: "Astra Microwave Products Case Study", label: "01 / 09", startFrame: 0, endFrame: 0 },
  { id: "founding", name: "The Founding Story", label: "02 / 09", startFrame: 1, endFrame: 1 },
  { id: "financials", name: "Consolidated P&L Journey", label: "03 / 09", startFrame: 2, endFrame: 2 },
  { id: "entities", name: "Group Corporate Structure", label: "04 / 09", startFrame: 3, endFrame: 3 },
  { id: "revenue-mix", name: "Segment Revenue Mix", label: "05 / 09", startFrame: 4, endFrame: 4 },
  { id: "orderbook", name: "Standalone Order Book", label: "06 / 09", startFrame: 5, endFrame: 5 },
  { id: "growth", name: "Key Growth Programs", label: "07 / 09", startFrame: 6, endFrame: 6 },
  { id: "capital", name: "Capital & Working Capital", label: "08 / 09", startFrame: 7, endFrame: 7 },
  { id: "thesis", name: "Demerger Carve-Out Thesis", label: "09 / 09", startFrame: 8, endFrame: 8 },
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

// 9. Demerger Carve-Out Thesis
function SceneThesis({ presentationActive = false }: { presentationActive?: boolean }) {
  const points = [
    { title: "Pure-Play Value Split", desc: "Separating defense from space and meteorology allows AMPL to attract distinct strategic investor pools." },
    { title: "Valuation Arbitrage", desc: "Space-tech assets historically command high growth multiples (30-40x EV/EBITDA) compared to traditional defense firms." },
    { title: "Carve-Out Spine", desc: "The core question remains: What is a space carve-out worth before any share-exchange ratio or standalone P&L exists?" },
  ];

  return (
    <div className="max-w-6xl w-full px-4 z-10 flex flex-col h-full py-8 overflow-y-auto no-scrollbar">
      <div className="my-auto w-full flex flex-col gap-6 select-text">
        <SceneHeading sub="08. INVESTMENT CLIMAX" main="The Demerger Carve-Out Thesis" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full pointer-events-auto">
          {/* Left Column: Thesis Points */}
          <div className="lg:col-span-7 space-y-4">
            {points.map((p, idx) => (
              <div key={p.title} className="bg-[#0a0a14]/60 border border-white/5 rounded-xl p-5 text-left shadow-lg">
                <span className="font-mono text-[9px] text-[#FFB800] uppercase tracking-wider block mb-1">Thesis {idx + 1}</span>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{p.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Right Column: CTA / Climax */}
          <div className="lg:col-span-5 bg-[#0a0a14]/80 border border-[#FFB800]/25 rounded-2xl p-6 text-center shadow-[0_0_32px_rgba(255,184,0,0.04)] relative">
            <Satellite className="w-10 h-10 text-[#FFB800] mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Space Demerger</h3>
            <p className="text-xs text-white/50 font-light leading-relaxed mb-6">
              ASTPL serves as the dedicated carve-out vehicle housing high-frequency space assets to unlock corporate equity.
            </p>

            <div className="pt-4 border-t border-white/5">
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFB800] hover:bg-[#FFB800]/90 text-[#030308] font-bold text-xs uppercase tracking-widest transition-colors duration-200 w-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN CHAPTER PAGE
// ---------------------------------------------------------------------------

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

  const s8Opacity = useTransform(progress, [8 * SEG - FADE_IN, 8 * SEG, 1.0], [0, 1, 1]);
  const s8Y = useTransform(progress, [8 * SEG - FADE_IN, 8 * SEG, 1.0], [24, 0, 0]);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#FFB800] selection:text-[#030308] relative overflow-x-hidden">
      <Navbar />
      <PresentationChrome controller={p} scenes={ASTRA_SCENES} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[900vh] bg-[#030308]">
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
                className={`${[0, 8].includes(currentFrameIndex) ? "absolute inset-0 w-full h-full z-10 pointer-events-auto" : SLIDE_BASE} text-center pointer-events-auto h-full`}
              >
                {currentFrameIndex === 0 && <SceneHero presentationActive={true} />}
                {currentFrameIndex === 1 && <SceneFounding active={true} />}
                {currentFrameIndex === 2 && <SceneFinancials active={true} />}
                {currentFrameIndex === 3 && <SceneEntities />}
                {currentFrameIndex === 4 && <SceneRevenueMix />}
                {currentFrameIndex === 5 && <SceneOrderBook />}
                {currentFrameIndex === 6 && <SceneGrowthPrograms />}
                {currentFrameIndex === 7 && <SceneCapital />}
                {currentFrameIndex === 8 && <SceneThesis presentationActive={true} />}
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
                <SceneThesis presentationActive={false} />
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

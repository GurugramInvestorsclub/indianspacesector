"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { ChapterNavButton } from "@/components/chapter-nav-button";
import { usePresentation } from "@/components/presentation/use-presentation";
import { PresentationChrome } from "@/components/presentation/presentation-chrome";
import { motion, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
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
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

// The four commercial layers, ordered upstream to downstream. Shares are of
// the $415B total commercial space economy (BryceTech / SIA, 2024).
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

const TOTAL_FRAMES = 7;

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
    <p className="mt-6 text-[9px] text-white/35 font-mono uppercase tracking-[0.2em] text-center">
      Source: BryceTech / Satellite Industry Association 2025, Space Foundation 2025 Q2
    </p>
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

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
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
              className={`text-center py-5 px-3 ${i !== 2 ? "border-r border-white/10" : ""}`}
            >
              <span className="text-2xl font-extrabold text-[#FFB800] block">{s.val}</span>
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
      <SceneHeading
        sub="01. The Reframe"
        main="The biggest line items are mundane"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
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
              <h3
                className="text-xl font-light text-white leading-snug mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {it.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">{it.body}</p>
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

function Scene2ValueChain({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  const current = LAYERS.find((l) => l.id === active) || LAYERS[3];
  const Icon = current.icon;
  return (
    <>
      <SceneHeading
        sub="02. Upstream To Downstream"
        main="Four commercial layers, one economy"
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full max-w-6xl z-10">
        {/* Layered stack */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 font-mono text-[8px] uppercase tracking-[0.2em] text-white/45">
              <span>Upstream. Technical complexity</span>
              <span>Downstream. Revenue</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {LAYERS.map((layer) => {
                const LIcon = layer.icon;
                const isActive = layer.id === active;
                return (
                  <button
                    key={layer.id}
                    onMouseEnter={() => setActive(layer.id)}
                    onClick={() => setActive(layer.id)}
                    className="interactive-control group block w-full text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <LIcon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? "text-[#FFB800]" : "text-white/50"
                        }`}
                      />
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wide ${
                          isActive ? "text-[#FFB800]" : "text-white/70"
                        }`}
                      >
                        {layer.name}
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-white/45">
                        {layer.valueLabel} / {layer.share}
                      </span>
                    </div>
                    <div className="h-7 w-full bg-white/[0.03] rounded-md overflow-hidden">
                      <div
                        className={`h-full rounded-md transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-r from-[#FFB800] to-[#ffd866] shadow-[0_0_18px_rgba(255,184,0,0.25)]"
                            : "bg-[#FFB800]/35 group-hover:bg-[#FFB800]/55"
                        }`}
                        style={{ width: `${layer.width}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-center text-[8px] text-white/30 font-mono mt-4 uppercase tracking-wider">
              Bar width scaled to 2024 segment revenue
            </p>
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="h-full bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6 text-left backdrop-blur-md shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-[#FFB800]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                    {current.flow}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#FFB800] block leading-none">
                    {current.valueLabel}
                  </span>
                  <span className="text-[9px] text-white/45 font-mono">
                    {current.share} of total
                  </span>
                </div>
              </div>
              <h3
                className="text-lg text-white leading-snug mb-3 font-light"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {current.name}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">{current.note}</p>
              <ul className="space-y-2 mt-auto">
                {current.sub.map((s, i) => (
                  <li key={i} className="flex gap-2 text-xs text-white/70">
                    <span className="text-[#FFB800] font-mono mt-0.5 shrink-0">0{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function Scene3Revenue({ active }: { active: boolean }) {
  const maxVal = 155;
  return (
    <>
      <SceneHeading sub="03. Revenue By Layer" main="Where the dollars actually land" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full max-w-5xl z-10">
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

        {/* Government anchor */}
        <div className="lg:col-span-5 flex flex-col gap-5">
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
              Defense near 54% (about $73B). US alone near $80B.
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

function Scene4Structure() {
  const rows = [
    { label: "Launch and propulsion", complexity: 100, revenue: 14, icon: Rocket },
    { label: "Satellite manufacturing", complexity: 78, revenue: 24, icon: Factory },
    { label: "Satellite services", complexity: 46, revenue: 78, icon: Satellite },
    { label: "Ground and applications", complexity: 30, revenue: 100, icon: RadioTower },
  ];
  return (
    <>
      <SceneHeading sub="04. The Structural Insight" main="Complexity up, revenue down" />
      <div className="w-full max-w-4xl z-10">
        <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <div className="flex items-center justify-end gap-8 mb-4 font-mono text-[8px] uppercase tracking-[0.2em]">
            <span className="text-white/45">Technical complexity</span>
            <span className="text-[#FFB800]">Share of revenue</span>
          </div>
          <div className="flex flex-col gap-4">
            {rows.map((r) => {
              const RIcon = r.icon;
              return (
                <div key={r.label} className="flex items-center gap-4">
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
        <div className="mt-6 flex items-start gap-3 bg-[#FFB800]/5 border border-[#FFB800]/15 px-5 py-4 rounded-xl max-w-3xl mx-auto">
          <Gauge className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
          <p className="text-sm text-white/80 leading-relaxed">
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

function Scene5India() {
  const names = [
    { name: "Pixxel", role: "Earth observation", icon: Satellite },
    { name: "SatSure", role: "Agri-analytics", icon: Globe2 },
    { name: "Dhruva Space", role: "Deployment", icon: Rocket },
    { name: "IN-SPACe / NSIL", role: "Enabling structure", icon: Landmark },
  ];
  return (
    <>
      <SceneHeading sub="05. The India Position" main="Strong upstream, the prize downstream" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl z-10">
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
                  <div className="w-9 h-9 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/25 flex items-center justify-center shrink-0">
                    <NIcon className="w-4 h-4 text-[#FFB800]" />
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
            <span className="text-[12px] text-white/75 leading-relaxed">
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

function Scene6Thesis() {
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
        <span className="block mb-1 text-white/65">Revenue lives downstream.</span>
        <span className="block mb-2 text-white font-semibold">Complexity lives upstream.</span>
        <span className="block text-[#FFB800] font-bold">Lower the toll, multiply the traffic.</span>
      </h2>

      <p className="text-sm sm:text-base text-white/65 max-w-2xl leading-relaxed mb-12 font-light relative z-10">
        If the ground segment is the prize, then the lever that unlocks it is
        the cost of reaching orbit. Cheaper launch does not just grow the launch
        line. It multiplies everything downstream. That is why the next chapter
        goes back to the rocket.
      </p>

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
        className="interactive-control mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/40 hover:text-[#FFB800] transition-colors relative z-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Return to Main Deck
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function ValueChainPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef } = p;

  // Interaction state
  const [activeLayer, setActiveLayer] = useState("ground");

  // Scroll transforms (7 frames, each ~1/7 of the track)
  const heroOpacity = useTransform(progress, [0.0, 0.1, 0.1429], [1, 1, 0]);
  const heroScale = useTransform(progress, [0.0, 0.1429], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.11, 0.1429, 0.26, 0.2857], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.11, 0.1429, 0.26, 0.2857], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.26, 0.2857, 0.40, 0.4286], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.26, 0.2857, 0.40, 0.4286], [24, 0, 0, -24]);

  const s3Opacity = useTransform(progress, [0.40, 0.4286, 0.547, 0.5714], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.40, 0.4286, 0.547, 0.5714], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.547, 0.5714, 0.69, 0.7143], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.547, 0.5714, 0.69, 0.7143], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.69, 0.7143, 0.833, 0.8571], [0, 1, 1, 0]);
  const s5Y = useTransform(progress, [0.69, 0.7143, 0.833, 0.8571], [24, 0, 0, -24]);

  const s6Opacity = useTransform(progress, [0.833, 0.8571, 1.0], [0, 1, 1]);
  const s6Y = useTransform(progress, [0.833, 0.8571, 1.0], [24, 0, 0]);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#FFB800] selection:text-[#030308] relative">
      <Navbar />
      <PresentationChrome controller={p} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[700vh] bg-[#030308]">
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
                {currentFrameIndex === 1 && <Scene1Reframe />}
                {currentFrameIndex === 2 && (
                  <Scene2ValueChain active={activeLayer} setActive={setActiveLayer} />
                )}
                {currentFrameIndex === 3 && <Scene3Revenue active={true} />}
                {currentFrameIndex === 4 && <Scene4Structure />}
                {currentFrameIndex === 5 && <Scene5India />}
                {currentFrameIndex === 6 && <Scene6Thesis />}
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
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene1Reframe />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene2ValueChain active={activeLayer} setActive={setActiveLayer} />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene3Revenue active={currentFrameIndex === 3} />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene4Structure />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene5India />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                <Scene6Thesis />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

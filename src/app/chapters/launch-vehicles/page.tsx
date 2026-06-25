"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ChapterNavButton } from "@/components/chapter-nav-button";
import { usePresentation } from "@/components/presentation/use-presentation";
import { PresentationChrome } from "@/components/presentation/presentation-chrome";
import { motion, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Fuel,
  Gauge,
  Cog,
  Recycle,
  Rocket,
  Wind,
  Cpu,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

// Anatomy parts. mx / my are marker coordinates inside the SVG viewBox (0 0 200 520).
const PARTS = [
  { id: "fairing", n: 1, label: "Payload fairing", mx: 100, my: 40, desc: "The aerodynamic nose cone that shields the payload through the atmosphere, then splits and is jettisoned once the air is thin." },
  { id: "payload", n: 2, label: "Payload", mx: 100, my: 95, desc: "The satellite or spacecraft. Every other part exists to place this mass into the right orbit." },
  { id: "upper", n: 3, label: "Upper stage", mx: 100, my: 185, desc: "A smaller second stage that ignites in vacuum to add the final velocity for orbit." },
  { id: "separation", n: 4, label: "Stage separation", mx: 138, my: 232, desc: "Pneumatic pushers or explosive bolts split the spent lower stage from the stack so dead mass is dropped." },
  { id: "tanks", n: 5, label: "Propellant tanks", mx: 100, my: 300, desc: "The bulk of the vehicle. Liquid oxygen sits above the fuel, both held under pressure to feed the engines." },
  { id: "firststage", n: 6, label: "First stage", mx: 62, my: 360, desc: "The large lower stage that delivers liftoff thrust. On a reusable rocket this is the part that flies home." },
  { id: "engines", n: 7, label: "Engines and turbopumps", mx: 100, my: 432, desc: "Turbopumps force propellant into the chamber at high pressure. The engines convert that flow into thrust." },
  { id: "nozzle", n: 8, label: "Nozzle", mx: 100, my: 478, desc: "The bell that expands and accelerates exhaust gas, turning chamber pressure into directed thrust." },
  { id: "gridfins", n: 9, label: "Grid fins", mx: 150, my: 258, desc: "Lattice fins that fold out to steer the falling stage with precision during reentry." },
  { id: "legs", n: 10, label: "Landing legs", mx: 56, my: 470, desc: "Deploy just before a propulsive touchdown to support the returning stage on the pad or droneship." },
  { id: "avionics", n: 11, label: "Avionics and guidance", mx: 138, my: 170, desc: "The flight computer and sensors that navigate, decide, and steer the vehicle in real time." },
  { id: "tvc", n: 12, label: "Thrust vector control", mx: 100, my: 452, desc: "Gimbals the engines to aim thrust, keeping the rocket balanced on its column of fire." },
];

const PROPELLANTS = [
  { combo: "LOX / RP-1", type: "Kerosene", isp: "~340s", density: "Dense, storable-ish", note: "Workhorse first stages. Cheap and compact.", vehicles: "Falcon 9 Merlin, ISRO GSLV" },
  { combo: "LOX / LH2", type: "Hydrogen", isp: "~450s", density: "Very low density", note: "Most efficient, but cryogenic and hard to handle.", vehicles: "GSLV Mk3 CE-20, Space Shuttle" },
  { combo: "LOX / Methane", type: "Methalox", isp: "~380s", density: "Moderate", note: "Emerging choice for reuse. Clean burning, easy to store.", vehicles: "SpaceX Raptor" },
  { combo: "N2O4 / UDMH", type: "Hypergolic", isp: "~290s", density: "Storable", note: "Ignites on contact, no spark needed. Toxic to handle.", vehicles: "ISRO PSLV Vikas engine" },
  { combo: "Solid (HTPB)", type: "Solid", isp: "270 to 290s", density: "Very dense", note: "Simple and powerful, but cannot be throttled or shut off.", vehicles: "PSLV boosters, SSLV" },
];

const CYCLES = [
  { name: "Gas generator", desc: "A small portion of propellant burns to drive the turbopumps, then that exhaust is dumped overboard. Simple and proven.", tag: "Open cycle" },
  { name: "Staged combustion", desc: "The turbopump exhaust is routed back into the main chamber instead of wasted, lifting efficiency and pressure.", tag: "Closed cycle" },
  { name: "Expander", desc: "Fuel heated by the chamber walls expands and spins the turbines. No preburner needed. ISRO CE-20 uses this cycle.", tag: "Closed cycle" },
  { name: "Pressure-fed", desc: "Tank pressure alone pushes propellant into the chamber. No turbopumps at all, so very few moving parts.", tag: "No pumps" },
  { name: "Full-flow staged", desc: "Both fuel and oxidizer pass fully through preburners before the main chamber. The most efficient and hardest to build. Raptor uses it.", tag: "Closed cycle" },
];

const MILESTONES = [
  { year: "2015", event: "First orbital booster landing" },
  { year: "2017", event: "First reflight of a used booster" },
  { year: "2024", event: "Mechazilla catches a returning booster" },
];

const ENABLERS = [
  "Propulsive landing",
  "Grid fins and cold gas thrusters",
  "Thermal management via entry burn",
  "Autonomous flight",
  "Engine reuse design",
  "Rapid turnaround",
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

// ---------------------------------------------------------------------------
// SCENES
// ---------------------------------------------------------------------------

function Scene0Hero({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(255,107,0,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at center, transparent 25%, #030308 92%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center text-center">
        <SceneLabel>Chapter XIII. Build The Rockets</SceneLabel>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          The
          <br />
          <span className="text-[#FFB800]">Rocket</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
          A rocket is a machine for throwing mass downward fast enough to fall
          around the planet instead of back into it. Understand the hardware and
          its economics, and you understand the lever that moves the whole
          sector.
        </p>

        <div className="grid grid-cols-3 gap-0 border border-white/10 rounded-2xl overflow-hidden font-mono mb-10 w-full max-w-xl">
          {[
            { val: "~3,500C", label: "Combustion chamber" },
            { val: "~200 bar", label: "Chamber pressure" },
            { val: "$100/kg", label: "Starship target to LEO" },
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

// Vertical cross-section schematic.
function RocketSchematic({ active }: { active: string | null }) {
  const isOn = (id: string) => active === id;
  const lineBase = "transition-all duration-200";
  return (
    <svg viewBox="0 0 200 520" className="w-full h-full max-h-[58vh]" aria-label="Launch vehicle cross-section">
      {/* Nose cone / fairing */}
      <path
        d="M100 20 L128 110 L72 110 Z"
        fill={isOn("fairing") ? "rgba(255,184,0,0.18)" : "transparent"}
        stroke={isOn("fairing") ? "#FFB800" : "rgba(255,255,255,0.18)"}
        strokeWidth="1.5"
        className={lineBase}
      />
      {/* Payload */}
      <circle
        cx="100"
        cy="92"
        r="11"
        fill={isOn("payload") ? "#FFB800" : "rgba(255,184,0,0.25)"}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        className={lineBase}
      />
      {/* Upper stage body */}
      <rect
        x="74" y="150" width="52" height="78" rx="3"
        fill={isOn("upper") ? "rgba(255,184,0,0.18)" : "transparent"}
        stroke={isOn("upper") || isOn("avionics") ? "#FFB800" : "rgba(255,255,255,0.18)"}
        strokeWidth="1.5"
        className={lineBase}
      />
      {/* Separation interstage */}
      <rect
        x="70" y="228" width="60" height="10"
        fill={isOn("separation") ? "rgba(255,184,0,0.3)" : "rgba(255,255,255,0.06)"}
        stroke={isOn("separation") ? "#FFB800" : "rgba(255,255,255,0.16)"}
        strokeWidth="1.5"
        strokeDasharray="3 2"
        className={lineBase}
      />
      {/* First stage body with tanks */}
      <rect
        x="68" y="238" width="64" height="190" rx="3"
        fill={isOn("firststage") ? "rgba(255,184,0,0.1)" : "transparent"}
        stroke={isOn("firststage") ? "#FFB800" : "rgba(255,255,255,0.18)"}
        strokeWidth="1.5"
        className={lineBase}
      />
      {/* LOX tank divider */}
      <line x1="68" y1="332" x2="132" y2="332" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <rect
        x="72" y="244" width="56" height="84"
        fill={isOn("tanks") ? "rgba(80,160,255,0.16)" : "transparent"}
        className={lineBase}
      />
      <rect
        x="72" y="336" width="56" height="86"
        fill={isOn("tanks") ? "rgba(255,107,0,0.14)" : "transparent"}
        className={lineBase}
      />
      <text x="100" y="290" textAnchor="middle" className="font-mono" fontSize="8" fill="rgba(255,255,255,0.4)">LOX</text>
      <text x="100" y="384" textAnchor="middle" className="font-mono" fontSize="8" fill="rgba(255,255,255,0.4)">FUEL</text>
      {/* Engine section */}
      <rect
        x="74" y="428" width="52" height="22"
        fill={isOn("engines") || isOn("tvc") ? "rgba(255,184,0,0.2)" : "transparent"}
        stroke={isOn("engines") || isOn("tvc") ? "#FFB800" : "rgba(255,255,255,0.18)"}
        strokeWidth="1.5"
        className={lineBase}
      />
      {/* Nozzles */}
      <path
        d="M82 450 L76 486 L92 486 L88 450 Z"
        fill={isOn("nozzle") ? "rgba(255,184,0,0.22)" : "transparent"}
        stroke={isOn("nozzle") ? "#FFB800" : "rgba(255,255,255,0.2)"}
        strokeWidth="1.5"
        className={lineBase}
      />
      <path
        d="M118 450 L124 486 L108 486 L112 450 Z"
        fill={isOn("nozzle") ? "rgba(255,184,0,0.22)" : "transparent"}
        stroke={isOn("nozzle") ? "#FFB800" : "rgba(255,255,255,0.2)"}
        strokeWidth="1.5"
        className={lineBase}
      />
      {/* Grid fins */}
      <rect x="132" y="250" width="14" height="16" rx="1"
        fill={isOn("gridfins") ? "#FFB800" : "rgba(255,255,255,0.12)"}
        stroke="rgba(255,255,255,0.2)" strokeWidth="1" className={lineBase} />
      <rect x="54" y="250" width="14" height="16" rx="1"
        fill={isOn("gridfins") ? "#FFB800" : "rgba(255,255,255,0.12)"}
        stroke="rgba(255,255,255,0.2)" strokeWidth="1" className={lineBase} />
      {/* Landing legs */}
      <line x1="68" y1="420" x2="48" y2="486" stroke={isOn("legs") ? "#FFB800" : "rgba(255,255,255,0.22)"} strokeWidth="2" className={lineBase} />
      <line x1="132" y1="420" x2="152" y2="486" stroke={isOn("legs") ? "#FFB800" : "rgba(255,255,255,0.22)"} strokeWidth="2" className={lineBase} />

      {/* Markers */}
      {PARTS.map((part) => (
        <g key={part.id} className={lineBase}>
          <circle
            cx={part.mx}
            cy={part.my}
            r={isOn(part.id) ? 8 : 6}
            fill={isOn(part.id) ? "#FFB800" : "rgba(3,3,8,0.9)"}
            stroke="#FFB800"
            strokeWidth="1"
          />
          <text
            x={part.mx}
            y={part.my + 3}
            textAnchor="middle"
            fontSize="8"
            className="font-mono"
            fill={isOn(part.id) ? "#030308" : "#FFB800"}
            fontWeight="bold"
          >
            {part.n}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Scene1Anatomy({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (id: string | null) => void;
}) {
  const current = PARTS.find((p) => p.id === active);
  return (
    <>
      <SceneHeading sub="01. Anatomy" main="Reading a launch vehicle" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full max-w-6xl z-10">
        {/* Schematic */}
        <div className="lg:col-span-4 flex items-center justify-center bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-4 backdrop-blur-md min-h-[40vh] relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-45 pointer-events-none mix-blend-screen"
            style={{ backgroundImage: "url('/rocket_schematic.png')" }}
          />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <RocketSchematic active={active} />
          </div>
        </div>

        {/* Legend */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-1.5 content-start max-h-[58vh] overflow-y-auto pr-1">
          {PARTS.map((part) => {
            const isActive = part.id === active;
            return (
              <button
                key={part.id}
                onMouseEnter={() => setActive(part.id)}
                onClick={() => setActive(part.id)}
                className={`interactive-control flex items-center gap-3 px-3 py-2 rounded-lg border text-left ${
                  isActive
                    ? "bg-[#FFB800]/10 border-[#FFB800]"
                    : "bg-[#0a0a14]/70 border-white/5 hover:border-white/20"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] shrink-0 ${
                    isActive ? "bg-[#FFB800] text-[#030308]" : "bg-white/5 text-[#FFB800] border border-[#FFB800]/30"
                  }`}
                >
                  {part.n}
                </span>
                <span className={`text-[11px] font-mono uppercase tracking-wide ${isActive ? "text-[#FFB800]" : "text-white/70"}`}>
                  {part.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="lg:col-span-4">
          <div className="h-full bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-center min-h-[24vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.id || "intro"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {current ? (
                  <>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFB800] block mb-2">
                      0{current.n}. {current.label}
                    </span>
                    <p className="text-sm text-white/85 leading-relaxed">{current.desc}</p>
                  </>
                ) : (
                  <p className="text-sm text-white/60 leading-relaxed">
                    Hover or tap any system to inspect what it does and why it
                    exists. Nearly every part serves one of two jobs: hold
                    propellant, or turn it into controlled thrust.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

function Scene2Engine() {
  const stages = [
    { label: "Tanks", note: "LOX and fuel under pressure" },
    { label: "Turbopumps", note: "Force propellant in at high pressure" },
    { label: "Injector", note: "Atomizes and mixes the propellants" },
    { label: "Chamber", note: "~3,500C, ~200 bar" },
    { label: "Throat", note: "Flow chokes to the speed of sound" },
    { label: "Bell", note: "Exhaust accelerates, thrust out" },
  ];
  return (
    <>
      <SceneHeading sub="02. The Engine" main="Newton's third law, industrialized" />
      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        {/* Flow diagram */}
        <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-md">
          <div className="flex items-stretch gap-2 overflow-x-auto">
            {stages.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="flex-1 min-w-[120px] bg-[#06060e] border border-white/8 rounded-xl p-3 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-[#FFB800] block mb-1">
                    {s.label}
                  </span>
                  <span className="text-[10px] text-white/60 leading-snug block">{s.note}</span>
                </div>
                {i < stages.length - 1 && (
                  <div className="flex items-center text-[#FFB800] shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-center text-[9px] text-white/35 font-mono mt-4 uppercase tracking-wider">
            Push gas out the back. The rocket goes the other way.
          </p>
        </div>

        {/* Isp + equation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-4 h-4 text-[#FFB800]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                Specific Impulse (Isp)
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Isp measures thrust efficiency: how much push you get per unit of
              propellant burned, expressed in seconds. A higher Isp means more
              velocity from the same mass of fuel.
            </p>
          </div>
          <div className="bg-[#06060e] border border-white/8 rounded-2xl p-6 flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/45 block mb-3">
              Tsiolkovsky Rocket Equation
            </span>
            <div
              className="font-mono text-2xl md:text-3xl text-[#FFB800] tracking-tight text-center"
            >
              {"Δv = Isp × g₀ × ln(m₀ / m_f)"}
            </div>
            <p className="text-[11px] text-white/55 leading-relaxed mt-4 text-center">
              Velocity gained scales with Isp and with the natural log of the
              mass ratio. Efficient engines and a light dry mass both pay off.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Scene3Propellants() {
  return (
    <>
      <SceneHeading sub="03. Propellants" main="The chemistry of the tradeoff" />
      <div className="w-full max-w-5xl z-10">
        <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-[1.1fr_0.7fr_0.7fr_1.6fr] px-5 py-2.5 font-mono text-[8px] uppercase tracking-widest text-white/40 border-b border-white/[0.06]">
            <span>Combination</span>
            <span>Isp</span>
            <span className="hidden md:block">Density</span>
            <span>Used by</span>
          </div>
          {PROPELLANTS.map((p) => (
            <div
              key={p.combo}
              className="grid grid-cols-[1.1fr_0.7fr_0.7fr_1.6fr] items-center px-5 py-3.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Fuel className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
                <div>
                  <span className="text-white text-xs font-bold block">{p.combo}</span>
                  <span className="font-mono text-[8px] uppercase tracking-wide text-white/40">{p.type}</span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold text-[#FFB800]">{p.isp}</span>
              <span className="hidden md:block font-mono text-[10px] text-white/55">{p.density}</span>
              <div>
                <span className="text-[11px] text-white/75 block leading-snug">{p.note}</span>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-wide">{p.vehicles}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-white/30 font-mono mt-3 uppercase tracking-widest text-center">
          Higher Isp is more efficient. Higher density packs more thrust into a smaller stage.
        </p>
      </div>
    </>
  );
}

function Scene4Cycles() {
  return (
    <>
      <SceneHeading sub="04. Engine Cycles" main="How the pumps get their power" />
      <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CYCLES.map((c, i) => (
          <div
            key={c.name}
            className={`bg-[#0a0a14]/90 border rounded-2xl p-5 flex flex-col ${
              c.name === "Expander" || c.name === "Full-flow staged"
                ? "border-[#FFB800]/30"
                : "border-white/8"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Cog className="w-4 h-4 text-[#FFB800]" />
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/40 border border-white/10 rounded-full px-2 py-0.5">
                {c.tag}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">{c.name}</h3>
            <p className="text-[12px] text-white/70 leading-relaxed">{c.desc}</p>
            <span className="font-mono text-[8px] text-white/25 uppercase tracking-widest mt-3">
              0{i + 1}
            </span>
          </div>
        ))}
        <div className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-2xl p-5 flex flex-col justify-center">
          <Flame className="w-5 h-5 text-[#FFB800] mb-2" />
          <p className="text-[12px] text-white/80 leading-relaxed">
            Closed cycles waste less propellant and run hotter, buying efficiency
            at the cost of engineering difficulty. The choice of cycle is a bet
            on how hard a team is willing to push.
          </p>
        </div>
      </div>
    </>
  );
}

function Scene5Reuse() {
  const costs = [
    { val: "$65,000", era: "Saturn V era", tone: "from-white/30 to-white/10" },
    { val: "$2,700", era: "Reflown Falcon 9", tone: "from-[#FFB800]/60 to-[#FFB800]/30" },
    { val: "~$100", era: "Starship target", tone: "from-[#FFB800] to-[#ffd866]" },
  ];
  return (
    <>
      <SceneHeading sub="05. Reusability" main="The cost revolution" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-6xl z-10">
        {/* Cost decline */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="w-4 h-4 text-[#FFB800]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                Cost per kg to low Earth orbit
              </span>
            </div>
            <div className="flex items-center gap-3">
              {costs.map((c, i) => (
                <React.Fragment key={c.era}>
                  <div className="flex-1 text-center">
                    <span className="text-xl md:text-2xl font-black text-white block">{c.val}</span>
                    <div className={`h-1.5 rounded-full mt-2 bg-gradient-to-r ${c.tone}`} />
                    <span className="font-mono text-[8px] uppercase tracking-wide text-white/45 mt-2 block">
                      {c.era}
                    </span>
                  </div>
                  {i < costs.length - 1 && <ArrowRight className="w-4 h-4 text-[#FFB800] shrink-0 mt-1" />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/[0.02] border border-white/8 px-5 py-4 rounded-xl">
            <Rocket className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
            <p className="text-[12px] text-white/75 leading-relaxed">
              Roughly 70% of a Falcon 9 costs sits in the first-stage booster.
              Recover that one piece and you amortize the most expensive part of
              the rocket across many flights.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ENABLERS.map((e) => (
              <span
                key={e}
                className="font-mono text-[9px] uppercase tracking-wide text-white/70 bg-[#0a0a14]/80 border border-white/8 rounded-full px-3 py-1.5 flex items-center gap-1.5"
              >
                <Wind className="w-3 h-3 text-[#FFB800]" />
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="lg:col-span-5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] font-bold mb-3 block">
            Reusability milestones
          </span>
          <div className="relative pl-6">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[#FFB800]/25" />
            {MILESTONES.map((m) => (
              <div key={m.year} className="relative mb-5 last:mb-0">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#FFB800] border-2 border-[#030308]" />
                <span className="font-mono text-lg font-black text-white block leading-none">{m.year}</span>
                <span className="text-[12px] text-white/70 leading-snug">{m.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Scene6India() {
  const players = [
    { name: "ISRO NGLV", role: "Next Generation Launch Vehicle", desc: "Semi-cryogenic and designed for partial reuse, targeting Falcon-9-class cost per kg around 2030." },
    { name: "Agnikul", role: "Agnibaan", desc: "A single-piece, fully 3D-printed engine that collapses part count and build time." },
    { name: "Skyroot", role: "Vikram series", desc: "Private small-lift launchers built for fast, dedicated commercial access." },
  ];
  return (
    <div className="max-w-5xl flex flex-col items-center text-center px-4 z-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(255,184,0,0.06) 0%, transparent 70%)",
        }}
      />
      <SceneLabel>06. The India Lever</SceneLabel>
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight text-white max-w-3xl mb-8 relative z-10"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Cheaper launch is the pivot for the whole sector.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8 relative z-10">
        {players.map((pl) => (
          <div key={pl.name} className="bg-[#0a0a14]/90 border border-white/8 rounded-2xl p-5 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-4 h-4 text-[#FFB800]" />
              <span className="text-white text-sm font-bold">{pl.name}</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wide text-[#FFB800]/80 block mb-2">
              {pl.role}
            </span>
            <p className="text-[12px] text-white/70 leading-relaxed">{pl.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-sm sm:text-base text-white/65 max-w-2xl leading-relaxed mb-10 font-light relative z-10">
        Connect this back to the value chain. Launch is a thin commercial layer,
        but it gates everything above it. Drive the cost per kg down and you
        unlock multiples of downstream value in ground systems, services and
        applications. That is why reusability, not rockets for their own sake,
        is the economic prize.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
        <ChapterNavButton
          href="/chapters/value-chain"
          label="Back to The Value Chain"
          variant="ghost"
          direction="back"
        />
        <Link
          href="/"
          className="interactive-control flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FFB800] hover:bg-[#cc9300] text-[#030308] font-mono text-xs uppercase tracking-widest rounded-full font-bold shadow-lg transition-all duration-300 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Main Deck
        </Link>
      </div>

      <p className="mt-6 text-[9px] text-white/35 font-mono uppercase tracking-[0.2em] text-center relative z-10">
        Anatomy and economics for orientation. Figures rounded.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function LaunchVehiclesPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef } = p;

  const [activePart, setActivePart] = useState<string | null>(null);

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
                {currentFrameIndex === 1 && (
                  <Scene1Anatomy active={activePart} setActive={setActivePart} />
                )}
                {currentFrameIndex === 2 && <Scene2Engine />}
                {currentFrameIndex === 3 && <Scene3Propellants />}
                {currentFrameIndex === 4 && <Scene4Cycles />}
                {currentFrameIndex === 5 && <Scene5Reuse />}
                {currentFrameIndex === 6 && <Scene6India />}
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
                <Scene1Anatomy active={activePart} setActive={setActivePart} />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene2Engine />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene3Propellants />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene4Cycles />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center pointer-events-none`}
              >
                <Scene5Reuse />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                <Scene6India />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

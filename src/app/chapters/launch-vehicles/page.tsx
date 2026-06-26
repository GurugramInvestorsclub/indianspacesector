"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ChapterNavButton } from "@/components/chapter-nav-button";
import { usePresentation } from "@/components/presentation/use-presentation";
import { PresentationChrome } from "@/components/presentation/presentation-chrome";
import { motion, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Gauge,
  Flame,
  Scale,
  Cpu,
  Layers,
  DollarSign,
  Compass,
  TrendingUp,
  LineChart,
  Network,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// CONSTANTS & STRUCTURES
// ---------------------------------------------------------------------------

const TOTAL_FRAMES = 14;
const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

// CHEMISTRY DATA
const FUELS = [
  {
    id: "solid",
    name: "Solid Fuel (HTPB)",
    isp: "~280s",
    thrust: "Extreme",
    complexity: "Very Low",
    pro: "Extremely simple, shelf-stable for years, massive liftoff thrust.",
    con: "Cannot be throttled or shut off once ignited. Low efficiency.",
    app: "Boosters (PSLV PS1, Space Shuttle SRBs).",
  },
  {
    id: "rp1",
    name: "Liquid Kerosene (RP-1 / LOX)",
    isp: "~310s - 340s",
    thrust: "High",
    complexity: "Medium",
    pro: "Highly dense, liquid at room temperature, easy to handle.",
    con: "Leaves soot/coke deposits inside the engine, restricting reuse.",
    app: "First stages (Falcon 9 Merlin, Saturn V F-1).",
  },
  {
    id: "cryo",
    name: "Cryogenic Hydrogen (LH2 / LOX)",
    isp: "~450s",
    thrust: "Moderate",
    complexity: "Extreme",
    pro: "Maximum chemical efficiency (Specific Impulse) in vacuum.",
    con: "Extremely low density (requires huge tanks), leaks easily, cryogenic storage at -253°C.",
    app: "Upper stages (LVM3 CE-20, Space Shuttle Main Engines).",
  },
  {
    id: "methane",
    name: "Methalox (LCH4 / LOX)",
    isp: "~380s",
    thrust: "High",
    complexity: "High",
    pro: "Burns soot-free (ideal for reusability), easy to store compared to hydrogen (-161°C), synthesizable on Mars.",
    con: "Requires complex double-cryogenic cooling systems.",
    app: "Next-gen reusability (SpaceX Raptor, ISRO NGLV).",
  },
];

// REENTRY TIMELINE
const REENTRY_STEPS = [
  {
    num: "01",
    name: "Stage Separation",
    desc: "First stage cuts its engines at ~80km altitude, splitting from the upper stage stack. Dead mass is dropped instantly.",
  },
  {
    num: "02",
    name: "Boostback Burn",
    desc: "Cold gas thrusters flip the booster 180 degrees. The engines reignite to reverse horizontal velocity, aiming back toward the landing pad.",
  },
  {
    num: "03",
    name: "Entry Burn",
    desc: "Reignites engines upon hitting the upper layers of thick atmosphere, shielding the rocket from extreme frictional heat.",
  },
  {
    num: "04",
    name: "Grid Fins",
    desc: "Four titanium lattice fins swing out, steering the booster aerodynamically through the atmosphere with centimeter-level precision.",
  },
  {
    num: "05",
    name: "Landing Burn",
    desc: "A final single-engine burn slows the rocket from supersonic speed to a hover, deploying legs just before a gentle touchdown.",
  },
];

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
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

// 0. SPLASH COVER
function Scene0Splash({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        {/* Background Image occupying the entire screen */}
        <img
          src="/launch_vehicles_bg.jpg"
          alt="Launch Vehicles Cover"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark vignette to fit the luxury cinematic styling */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#030308]/20 via-transparent to-[#030308]/60"
        />
      </div>

      {/* Navigation cues or minor accents */}
      {!presentationActive && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 font-mono text-[9px] text-white/50 tracking-[0.25em] uppercase">
          <span>Scroll to begin</span>
          <span className="w-px h-8 bg-white/30 relative overflow-hidden rounded-full block">
            <span className="absolute top-0 inset-x-0 h-3 bg-[#FFB800] rounded-full animate-bounce" />
          </span>
        </div>
      )}
    </>
  );
}

// 1. HERO
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
        <SceneLabel>Chapter XIII. Rocketry</SceneLabel>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          The Evolution
          <br />
          <span className="text-[#FFB800]">Of Rockets</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
          A rocket is not simply a machine. It is a continuous chain of questions, experiments, failures, and physical solutions. Discover how engineers escaped gravity, one breakthrough at a time.
        </p>

        <div className="grid grid-cols-3 gap-0 border border-white/10 rounded-2xl overflow-hidden font-mono mb-10 w-full max-w-xl">
          {[
            { val: "11.2 km/s", label: "Escape Velocity" },
            { val: "7.8 km/s", label: "Orbital Speed" },
            { val: "100 km", label: "The Karman Line" },
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

// 2. THE SIMPLEST ROCKET
function Scene1SoundingRockets() {
  return (
    <>
      <SceneHeading sub="01. The Simplest Rocket" main="Action and Reaction" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-5 flex items-center justify-center bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-4 min-h-[350px] overflow-hidden">
          <img
            src="/action_reaction.jpg"
            alt="Newton's Third Law - Action and Reaction"
            className="w-full h-full max-h-[320px] object-contain rounded-xl"
          />
        </div>

        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            Newton&apos;s Third Law
          </span>
          <h3 className="text-xl font-bold text-white mb-4">Sounding Rockets & Basic Thrust</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            To move a rocket forward, you must throw mass backward. A basic sounding rocket does just this: it heats a propellant into high-pressure gas and pushes it out of a nozzle. The rocket recoils in the opposite direction, flying straight up into space.
          </p>
          <div className="bg-[#0a0a14]/80 border border-white/5 p-4 rounded-xl font-mono text-xs text-white/60">
            <span className="text-[#FFB800] font-bold block mb-1">The Problem:</span>
            No matter how much thrust you pack into a single stage, once the propellant burns out, the rocket slows down, stops, and gravity pulls it straight back down to Earth.
          </div>
        </div>
      </div>
    </>
  );
}

// 3. THE PROBLEM: ORBITAL VELOCITY
function Scene2OrbitalVelocity() {
  const [mode, setMode] = useState<"vertical" | "orbital">("vertical");
  return (
    <>
      <SceneHeading sub="02. The Orbital Boundary" main="Altitude is Not Enough" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-6 flex flex-col items-center bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 min-h-[350px] relative">
          <div className="absolute top-4 right-4 flex bg-black/40 border border-white/10 rounded-full p-0.5 z-20">
            <button
              onClick={() => setMode("vertical")}
              className={`px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase transition-all ${
                mode === "vertical" ? "bg-[#FFB800] text-[#030308]" : "text-white/50 hover:text-white"
              }`}
            >
              Vertical Launch
            </button>
            <button
              onClick={() => setMode("orbital")}
              className={`px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase transition-all ${
                mode === "orbital" ? "bg-[#FFB800] text-[#030308]" : "text-white/50 hover:text-white"
              }`}
            >
              Orbital Insertion
            </button>
          </div>

          <svg viewBox="0 0 300 240" className="w-full h-full max-h-[260px] mt-6">
            {/* Earth */}
            <circle cx="150" cy="220" r="90" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="150" y="240" textAnchor="middle" fill="rgba(255,255,255,0.3)" className="font-mono text-[10px] uppercase font-bold">Earth</text>
            
            {/* Trajectory */}
            <AnimatePresence mode="wait">
              {mode === "vertical" ? (
                <motion.path
                  key="vert"
                  d="M 150 130 L 150 40 L 150 130"
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
              ) : (
                <motion.path
                  key="orb"
                  d="M 150 130 C 150 50, 240 50, 240 130 C 240 210, 150 210, 60 130 C 60 50, 150 50, 150 130"
                  fill="none"
                  stroke="#FFB800"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
              )}
            </AnimatePresence>
            <circle cx="150" cy="130" r="4" fill="#FFB800" />
            <text x="150" y="145" textAnchor="middle" fill="#white" className="font-mono" fontSize="8">Kármán Line (100km)</text>
          </svg>
        </div>

        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            The Physics of Spaceflight
          </span>
          <h3 className="text-xl font-bold text-white mb-4">Speed vs Altitude</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Getting to space (100km) requires minimal effort. Remaining in space is the true challenge. To keep from falling back, a rocket must travel sideways so fast—**7.8 km/s (28,000 km/h)**—that its curve of falling matches the curve of the Earth.
          </p>
          <div className="bg-[#0a0a14]/80 border border-white/5 p-4 rounded-xl font-mono text-xs text-white/60">
            <span className="text-[#FFB800] font-bold block mb-1">The Problem:</span>
            Accelerating a massive metal tube to 7.8 km/s requires massive amounts of propellant. But propellant has weight. How do we lift the propellant needed to lift the propellant?
          </div>
        </div>
      </div>
    </>
  );
}

// 4. MASS TYRANNY
function Scene3MassTyranny() {
  const [multiplier, setMultiplier] = useState(1);
  return (
    <>
      <SceneHeading sub="03. The Tyranny of Mass" main="Mass is the Enemy" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-5 flex flex-col items-center bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 min-h-[350px]">
          <span className="font-mono text-[10px] text-white/50 mb-6 uppercase">Scale Payload Weight</span>
          <div className="flex gap-4 mb-8">
            {[1, 2, 3].map((val) => (
              <button
                key={val}
                onClick={() => setMultiplier(val)}
                className={`w-12 h-12 rounded-xl font-mono font-bold text-sm border flex items-center justify-center transition-all cursor-pointer ${
                  multiplier === val
                    ? "bg-[#FFB800] text-[#030308] border-[#FFB800]"
                    : "bg-[#080c12] border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {val}t
              </button>
            ))}
          </div>

          <div className="w-full flex flex-col gap-2 items-center">
            {/* Visual representation of weight bar */}
            <div className="w-full h-8 rounded-full overflow-hidden flex border border-white/10">
              <div
                className="bg-[#FFB800] h-full transition-all duration-300"
                style={{ width: `${(2 / (2 + 98 * multiplier)) * 100}%` }}
              />
              <div
                className="bg-[#FF6B00]/70 h-full transition-all duration-300"
                style={{ width: `${(98 * multiplier / (2 + 98 * multiplier)) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between w-full font-mono text-[10px] mt-2">
              <span className="text-[#FFB800] font-bold">Payload: {multiplier} Tons ({(2 / (2 + 98 * multiplier) * 100).toFixed(1)}%)</span>
              <span className="text-[#FF6B00] font-bold">Propellant: {98 * multiplier} Tons</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            The Rocket Equation
          </span>
          <h3 className="text-xl font-bold text-white mb-4">Tsiolkovsky&apos;s Tyranny</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            A rocket is typically **90% propellant, 8% structure (metal tanks, engines), and only 2% payload (useful cargo)**. Because you must burn fuel to carry fuel, the relation between velocity and mass is logarithmic. Adding more fuel yields diminishing returns.
          </p>
          <div className="bg-[#0a0a14]/80 border border-white/5 p-4 rounded-xl font-mono text-xs text-white/60">
            <span className="text-[#FFB800] font-bold block mb-1">The Solution:</span>
            What if we did not carry the heavy, empty fuel tanks all the way to orbit? If we discard the dead weight once it is empty, the remaining rocket becomes instantly lighter.
          </div>
        </div>
      </div>
    </>
  );
}

// 5. STAGING
function Scene4Staging() {
  const [separate, setSeparate] = useState(false);
  return (
    <>
      <SceneHeading sub="04. The Solution" main="Discarding Dead Weight" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 min-h-[350px] relative">
          <button
            onClick={() => setSeparate(!separate)}
            className="absolute top-4 right-4 px-4 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase transition-all bg-[#FFB800] text-[#030308] hover:bg-[#ffc833] cursor-pointer"
          >
            {separate ? "Reset Rocket" : "Simulate Separation"}
          </button>

          <div className="relative w-full h-[280px] flex flex-col items-center justify-center">
            {/* Stage 2 (Upper) */}
            <motion.div
              animate={{ y: separate ? -40 : 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center z-10"
            >
              <div className="w-8 h-12 bg-white/10 border border-[#FFB800] rounded-t-lg flex items-center justify-center text-[10px] font-mono font-bold">
                Stage 2
              </div>
              {separate && (
                <div className="w-1.5 h-4 bg-gradient-to-b from-[#FFB800] to-transparent animate-pulse" />
              )}
            </motion.div>

            {/* Interstage */}
            <div className="w-10 h-2 border-y border-dashed border-white/20 my-1 z-0" />

            {/* Stage 1 (Lower) */}
            <motion.div
              animate={{ y: separate ? 60 : 0, opacity: separate ? 0.3 : 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center z-10"
            >
              <div className="w-12 h-24 bg-white/5 border border-white/20 rounded-b-lg flex items-center justify-center text-[10px] font-mono">
                Stage 1
              </div>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            Staging Architecture
          </span>
          <h3 className="text-xl font-bold text-white mb-4">The Multi-Stage Revolution</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Multi-stage staging drops spent propellant tanks when they run dry. By jettisoning this dead structure, the remaining rocket starts from a higher velocity with a significantly lighter frame. This is the only way chemical rockets can reach orbital speeds.
          </p>
          <div className="bg-[#0a0a14]/80 border border-white/5 p-4 rounded-xl font-mono text-xs text-white/60">
            <span className="text-[#FFB800] font-bold block mb-1">The Problem:</span>
            Staging solves the mass problem, but raises a chemical one: the physical conditions at sea-level (dense air) differ completely from vacuum. Can we use the same fuel for all stages?
          </div>
        </div>
      </div>
    </>
  );
}

// 6. CHEMISTRY OF ROCKETS
function Scene5Chemistry() {
  const [activeTab, setActiveTab] = useState("solid");
  const selected = FUELS.find((f) => f.id === activeTab) || FUELS[0];
  return (
    <>
      {/* Background Image for the entire frame */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none">
        <img
          src="/propellants_bg.jpg"
          alt="Propellants Background"
          className="w-full h-full object-cover object-center opacity-50"
        />
        {/* Subtle dark vignette to fit the luxury cinematic styling */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#030308]/40 via-transparent to-[#030308]/80"
        />
        <div
          className="absolute inset-0 bg-radial-gradient"
          style={{
            background: "radial-gradient(circle at center, transparent 30%, #030308 85%)"
          }}
        />
      </div>

      {/* Content Container (aligned to SLIDE_BASE style) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col items-center justify-center">
        <SceneHeading sub="05. Propulsion Chemistry" main="Propellants and Tradeoffs" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl">
          {/* Navigation list */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {FUELS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveTab(f.id)}
                className={`w-full px-4 py-3 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                  f.id === activeTab
                    ? "bg-[#FFB800]/14 border-[#FFB800] text-[#FFB800] font-bold shadow-lg shadow-[#FFB800]/5"
                    : "bg-[#0a0a14]/88 border-white/10 text-white/70 hover:border-white/20 backdrop-blur-md"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Selected detail */}
          <div className="lg:col-span-8 bg-[#0a0a14]/92 border border-[#FFB800]/20 rounded-2xl p-8 flex flex-col justify-between text-left backdrop-blur-md shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white leading-tight">{selected.name}</h3>
                <span className="p-2 rounded-lg bg-[#FFB800]/5 text-[#FFB800]">
                  <Flame className="w-5 h-5" />
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6 font-mono border-b border-white/5 pb-4">
                <div>
                  <span className="text-[9px] uppercase text-white/40 block">Efficiency (Isp)</span>
                  <span className="text-lg font-black text-[#FFB800]">{selected.isp}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-white/40 block">Thrust Level</span>
                  <span className="text-lg font-black text-white">{selected.thrust}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-white/40 block">Complexity</span>
                  <span className="text-lg font-black text-white">{selected.complexity}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <span className="text-white/40 font-mono block mb-1">ADVANTAGES:</span>
                  <p className="text-white/80 leading-relaxed">{selected.pro}</p>
                </div>
                <div>
                  <span className="text-white/40 font-mono block mb-1">LIMITATIONS:</span>
                  <p className="text-white/80 leading-relaxed">{selected.con}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-xs text-white/40 font-mono">
              Primary Application: <span className="text-white font-bold">{selected.app}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 7. CHOOSING THE RIGHT FUEL
function Scene6TimelineMapping() {
  const [step, setStep] = useState(0);
  const phases = [
    { label: "Liftoff", alt: "0 - 15km", fuel: "Solid / RP-1", reason: "Max thrust needed to punch through thick sea-level atmosphere." },
    { label: "Mid-Atmosphere", alt: "15 - 60km", fuel: "RP-1 / LCH4", reason: "Transitioning to higher efficiency liquid engines as air thins out." },
    { label: "Upper Vacuum", alt: "60 - 200km+", fuel: "LH2 / LCH4", reason: "Extremely high Specific Impulse (Isp) is required in absolute vacuum." },
  ];
  return (
    <>
      <SceneHeading sub="06. Launch Profile" main="The Right Tool for the Job" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        {/* Launch profile graph */}
        <div className="lg:col-span-6 flex flex-col items-center bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 min-h-[350px]">
          <div className="flex gap-2 mb-6">
            {phases.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setStep(i)}
                className={`px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase transition-all cursor-pointer ${
                  step === i ? "bg-[#FFB800] text-[#030308]" : "text-white/40 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <svg viewBox="0 0 300 200" className="w-full h-full max-h-[220px]">
            {/* Atmosphere profile gradient */}
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#0f172a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#030308" stopOpacity="1" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="300" height="200" fill="url(#skyGrad)" />
            
            {/* Trajectory */}
            <path d="M 30 180 C 120 180, 160 120, 270 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            
            {/* Active stage highlighter */}
            {step === 0 && <circle cx="58" cy="180" r="6" fill="#FFB800" />}
            {step === 1 && <circle cx="140" cy="140" r="6" fill="#FFB800" />}
            {step === 2 && <circle cx="230" cy="70" r="6" fill="#FFB800" />}

            <text x="30" y="195" fill="rgba(255,255,255,0.4)" fontSize="8" className="font-mono">Sea Level</text>
            <text x="250" y="30" fill="rgba(255,255,255,0.4)" fontSize="8" className="font-mono">Vacuum</text>
          </svg>
        </div>

        {/* Text Details */}
        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <div className="bg-[#0a0a14]/90 border border-[#FFB800]/20 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
              Launch Phase: {phases[step].label}
            </span>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold text-white">{phases[step].alt}</span>
              <span className="text-[10px] text-white/50 uppercase font-mono">Altitude</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              {phases[step].reason}
            </p>
            <div className="border-t border-white/5 pt-4 mt-2 flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Ideal Propellant:</span>
              <span className="text-sm font-extrabold text-[#FFB800] font-mono">{phases[step].fuel}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 8. PSLV CASE STUDY
function Scene7PSLVCaseStudy() {
  const [activeStage, setActiveStage] = useState(3);
  const stages = [
    {
      name: "PS1 — First Stage (Solid)",
      prop: "HTPB (Hydroxyl-terminated polybutadiene)",
      desc: "Massive solid boosters providing raw thrust of 4,800 kN to punch through the thickest atmosphere at launch. Supported by 6 strap-on solid boosters.",
      purpose: "Liftoff & initial push",
    },
    {
      name: "PS2 — Second Stage (Liquid)",
      prop: "UH25 + N2O4 (Vikas Engine)",
      desc: "Uses the liquid Vikas engine, providing active steering and stable, throttlable acceleration above the thick atmospheric barrier.",
      purpose: "Main ascent & trajectory control",
    },
    {
      name: "PS3 — Third Stage (Solid)",
      prop: "HTPB Solid Motor",
      desc: "A solid stage that provides high thrust in the upper atmosphere. Simplifies staging operations without needing low-pressure turbopumps in vacuum.",
      purpose: "Upper atmospheric acceleration",
    },
    {
      name: "PS4 — Fourth Stage (Liquid)",
      prop: "MMH + MON-3",
      desc: "Dual liquid engine stage capable of multiple restarts in vacuum, executing precise delta-v burns for complex, multi-satellite injections.",
      purpose: "Precision orbital placement",
    },
  ];
  return (
    <>
      <SceneHeading sub="07. Case Study: ISRO PSLV" main="Alternating Stage Physics" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl z-10">
        {/* Interactive rocket schematic */}
        <div className="lg:col-span-5 flex items-center justify-center bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 min-h-[380px] relative">
          <div className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.08]" style={{ backgroundImage: "url('/pslv.png')" }} />
          
          <div className="relative flex flex-col gap-2 items-center z-10 w-full">
            {stages.slice().reverse().map((s) => {
              const idx = stages.indexOf(s);
              const active = idx === activeStage;
              return (
                <button
                  key={s.name}
                  onClick={() => setActiveStage(idx)}
                  className={`w-full max-w-[160px] py-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    active
                      ? "bg-[#FFB800]/15 border-[#FFB800] text-[#FFB800] font-bold"
                      : "bg-[#080c12]/80 border-white/5 text-white/50 hover:border-white/10"
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider block">Stage 0{idx + 1}</span>
                  <span className="text-[10px] font-sans block mt-0.5">{s.purpose}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage details */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <div className="bg-[#0a0a14]/90 border border-[#FFB800]/20 rounded-2xl p-8 min-h-[260px] flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
                Stage {activeStage + 1} Specifications
              </span>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                {stages[activeStage].name}
              </h3>
              <span className="font-mono text-[10px] text-[#FFB800] block mb-4">
                Propellant: {stages[activeStage].prop}
              </span>
              <p className="text-xs text-white/70 leading-relaxed">
                {stages[activeStage].desc}
              </p>
            </div>
            <div className="border-t border-white/5 pt-4 mt-6 flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/40">
              <span>Objective:</span>
              <span className="text-white font-bold">{stages[activeStage].purpose}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 9. REUSABILITY ECONOMICS
function Scene8ReusabilityEconomics() {
  return (
    <>
      <SceneHeading sub="08. Space Economics" main="The Cost of Throwing Rockets Away" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-5 flex items-center justify-center bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 min-h-[350px]">
          <div className="w-full flex flex-col gap-6">
            <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-xl text-left">
              <span className="font-mono text-[9px] uppercase text-red-400 font-bold block mb-1">Expended Launch</span>
              <div className="text-2xl font-black text-red-500 font-mono">$60,000,000</div>
              <p className="text-[10px] text-white/50 leading-relaxed mt-2 font-mono">Booster discarded into the ocean. Entire rocket built from scratch for next flight.</p>
            </div>
            
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-xl text-left">
              <span className="font-mono text-[9px] uppercase text-emerald-400 font-bold block mb-1">Reusable Launch</span>
              <div className="text-2xl font-black text-emerald-500 font-mono">$10,000,000</div>
              <p className="text-[10px] text-white/50 leading-relaxed mt-2 font-mono">Booster lands and is refurbished. Fuel cost is only ~$200,000.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            The Airliner Metaphor
          </span>
          <h3 className="text-xl font-bold text-white mb-4">Why Reusability Matters</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Imagine purchasing a commercial Boeing 777 passenger airliner, flying it once from London to New York, and immediately throwing the airplane into the Atlantic Ocean, requiring a brand new airliner for the return trip. This was how global space flight was operated for 60 years.
          </p>
          <div className="bg-[#0a0a14]/80 border border-white/5 p-4 rounded-xl font-mono text-xs text-white/60">
            <span className="text-[#FFB800] font-bold block mb-1">The Challenge:</span>
            To return a booster safely, you must keep fuel in reserve to slow down. That reserved fuel is mass that cannot be used for cargo. Landing a booster demands extreme structural and navigation precision.
          </div>
        </div>
      </div>
    </>
  );
}

// 10. REUSABLE REENTRY
const REENTRY_BACKGROUNDS = [
  "/booster_stage_sep.png",
  "/booster_boostback_burn.png",
  "/booster_entry_burn.png",
  "/booster_grid_fins.png",
  "/booster_landing_burn.png"
];

function StageSeparationDebris() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {[...Array(12)].map((_, i) => {
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 15 + Math.random() * 20;
        const size = 1 + Math.random() * 2;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${initialX}vw`,
              y: `${initialY}vh`,
              opacity: 0.1,
              scale: 0.5,
            }}
            animate={{
              x: [`${initialX}vw`, `${initialX + (Math.random() * 10 - 5)}vw`],
              y: [`${initialY}vh`, `${initialY - (10 + Math.random() * 20)}vh`],
              opacity: [0.1, 0.4, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bg-white/60 rounded-full"
            style={{
              width: size,
              height: size,
              boxShadow: "0 0 4px rgba(255,255,255,0.4)"
            }}
          />
        );
      })}
    </div>
  );
}

function BoostbackFlicker() {
  return (
    <motion.div
      animate={{
        opacity: [0.15, 0.35, 0.20, 0.4, 0.18, 0.3]
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-color-dodge"
      style={{
        background: "radial-gradient(circle at 50% 85%, rgba(255,120,0,0.3) 0%, transparent 60%)"
      }}
    />
  );
}

function EntryPlasmaShimmer() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {/* Base glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.4, 0.28, 0.45, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 w-full h-full mix-blend-color-dodge"
        style={{
          background: "radial-gradient(ellipse at 50% 90%, rgba(255,80,0,0.25) 0%, transparent 70%)"
        }}
      />
      {/* Rising sparks */}
      {[...Array(8)].map((_, i) => {
        const initialX = 35 + Math.random() * 30;
        const delay = Math.random() * 2;
        const duration = 1.5 + Math.random() * 1.5;
        const size = 1.5 + Math.random() * 2;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${initialX}vw`,
              y: "100vh",
              opacity: 0,
            }}
            animate={{
              y: ["100vh", "0vh"],
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeIn",
            }}
            className="absolute bg-gradient-to-t from-red-600 to-amber-400 rounded-full"
            style={{
              width: size,
              height: size * 6,
              filter: "blur(0.5px)"
            }}
          />
        );
      })}
    </div>
  );
}

function GridFinsCloudDrift() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {[...Array(3)].map((_, i) => {
        const duration = 40 + i * 15;
        const delay = i * 8;
        return (
          <motion.div
            key={i}
            initial={{
              x: "-30vw",
              y: `${20 + i * 25}vh`,
              opacity: 0,
            }}
            animate={{
              x: ["-30vw", "110vw"],
              opacity: [0, 0.08, 0.08, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-white blur-[80px]"
            style={{
              width: "400px",
              height: "200px",
            }}
          />
        );
      })}
    </div>
  );
}

function LandingSmokeSwirl() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {/* Dust glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.25, 0.18, 0.28, 0.15]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 w-full h-full mix-blend-color-dodge"
        style={{
          background: "radial-gradient(circle at 50% 90%, rgba(255,180,100,0.15) 0%, transparent 60%)"
        }}
      />
      {/* Swirling smoke clouds at bottom */}
      {[...Array(4)].map((_, i) => {
        const isLeft = i % 2 === 0;
        const initialX = isLeft ? "20vw" : "80vw";
        const targetX = isLeft ? "40vw" : "60vw";
        return (
          <motion.div
            key={i}
            initial={{
              x: initialX,
              y: "90vh",
              scale: 0.8,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              x: [initialX, targetX],
              y: ["90vh", "75vh"],
              scale: [0.8, 1.8, 2.5],
              opacity: [0, 0.08, 0],
              rotate: [0, isLeft ? 45 : -45],
            }}
            transition={{
              duration: 8 + i * 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 2,
            }}
            className="absolute rounded-full bg-white/20 blur-[50px]"
            style={{
              width: "250px",
              height: "150px",
            }}
          />
        );
      })}
    </div>
  );
}

function ReentryBackgrounds({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none bg-[#030308]">
      {REENTRY_BACKGROUNDS.map((bg, idx) => {
        const active = idx === activeIndex;
        
        let motionAnimate = {};
        let motionTransition = {};
        
        if (idx === 0) {
          motionAnimate = {
            scale: [1.02, 1.04, 1.02],
            rotate: [0, 0.4, 0],
            x: [0, 4, 0],
            y: [0, -2, 0]
          };
          motionTransition = {
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (idx === 1) {
          motionAnimate = {
            scale: [1.02, 1.05, 1.02],
            x: [0, -3, 0],
            y: [0, 4, 0]
          };
          motionTransition = {
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (idx === 2) {
          motionAnimate = {
            scale: [1.03, 1.01, 1.03],
            x: [0, 2, -2, 0],
            y: [0, -3, 3, 0]
          };
          motionTransition = {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (idx === 3) {
          motionAnimate = {
            scale: [1.02, 1.04, 1.02],
            y: [0, -8, 0],
            x: [0, 3, 0]
          };
          motionTransition = {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (idx === 4) {
          motionAnimate = {
            scale: [1.01, 1.03, 1.01],
            rotate: [0, -0.3, 0.3, 0],
            x: [0, -4, 4, 0]
          };
          motionTransition = {
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          };
        }

        return (
          <motion.div
            key={bg}
            initial={{ opacity: 0 }}
            animate={{
              opacity: active ? 1 : 0,
            }}
            transition={{
              duration: 1.1,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              animate={active ? motionAnimate : {}}
              transition={motionTransition}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={bg}
                alt={`Booster Phase ${idx}`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {active && idx === 0 && <StageSeparationDebris />}
            {active && idx === 1 && <BoostbackFlicker />}
            {active && idx === 2 && <EntryPlasmaShimmer />}
            {active && idx === 3 && <GridFinsCloudDrift />}
            {active && idx === 4 && <LandingSmokeSwirl />}
          </motion.div>
        );
      })}

      {/* Dark overlay between 65–75% (70% here) for text contrast */}
      <div className="absolute inset-0 bg-[#030308]/70 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/60 via-transparent to-[#030308]/85 pointer-events-none" />
    </div>
  );
}

function Scene9ReentryProfile() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const images = [
      "/booster_stage_sep.png",
      "/booster_boostback_burn.png",
      "/booster_entry_burn.png",
      "/booster_grid_fins.png",
      "/booster_landing_burn.png"
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <ReentryBackgrounds activeIndex={index} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col items-center justify-center">
        <SceneHeading sub="09. Landing Dynamics" main="Bringing the Booster Home" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl">
          {/* Timeline visualization */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            {REENTRY_STEPS.map((s, idx) => {
              const active = idx === index;
              return (
                <button
                  key={s.num}
                  onClick={() => setIndex(idx)}
                  className={`interactive-control flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? "bg-[#FFB800]/10 border-[#FFB800]"
                      : "bg-[#0a0a14]/70 border-white/5 hover:border-white/10"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                    active ? "bg-[#FFB800] text-[#030308]" : "bg-white/5 text-[#FFB800]"
                  }`}>
                    {s.num}
                  </span>
                  <div>
                    <span className={`text-[12px] font-sans font-bold block ${active ? "text-white" : "text-white/60"}`}>{s.name}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected step details */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <div className="bg-[#0a0a14]/90 border border-[#FFB800]/25 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
                Phase 0{index + 1} Detail
              </span>
              <h3 className="text-lg font-bold text-white mb-3">
                {REENTRY_STEPS[index].name}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                {REENTRY_STEPS[index].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 11. METHALOX ERA
function Scene10MethaloxEra() {
  const comp = [
    { label: "Propellant Combo", kero: "RP-1 / LOX", hydro: "LH2 / LOX", meth: "LCH4 / LOX" },
    { label: "Soot / Carbon", kero: "High (Clean needed)", hydro: "None", meth: "None (Soot-free)" },
    { label: "Specific Impulse (Isp)", kero: "~311s (Vacuum)", hydro: "~455s (Vacuum)", meth: "~380s (Vacuum)" },
    { label: "Storage Temp", kero: "Ambient", hydro: "-253°C (Extreme)", meth: "-161°C (Moderate)" },
    { label: "Mars Synthesis", kero: "Impossible", hydro: "Extremely Hard", meth: "Easy (Sabatier)" },
  ];
  return (
    <>
      <SceneHeading sub="10. The Next Generation" main="The Methalox Revolution" />
      <div className="w-full max-w-5xl z-10">
        <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
          {/* Header */}
          <div className="grid grid-cols-4 px-5 py-3 font-mono text-[8px] uppercase tracking-widest text-white/40 border-b border-white/[0.06]">
            <span>Metric</span>
            <span>Kerosene (RP-1)</span>
            <span>Hydrogen (LH2)</span>
            <span className="text-[#FFB800]">Methane (LCH4)</span>
          </div>
          {/* Rows */}
          {comp.map((r, i) => (
            <div
              key={r.label}
              className="grid grid-cols-4 items-center px-5 py-4 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01] transition-colors"
            >
              <span className="text-[10px] font-mono text-white/50 font-bold">{r.label}</span>
              <span className="text-[11px] text-white/75">{r.kero}</span>
              <span className="text-[11px] text-white/75">{r.hydro}</span>
              <span className="text-[11px] text-[#FFB800] font-bold">{r.meth}</span>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-white/30 font-mono mt-3 uppercase tracking-widest text-center">
          Methalox represents the convergence point: soot-free for 1,000x reusability, dense enough for booster stages, and synthesizable on Mars.
        </p>
      </div>
    </>
  );
}

// 12. FUTURE PARADIGMS
function Scene11NextFrontier() {
  const systems = [
    { title: "Nuclear Thermal", note: "Fission-heated hydrogen propellant, doubling Specific Impulse to ~900s for manned deep space flights." },
    { title: "Orbital Refueling", note: "Launching tankers to refill ship propellant tanks in LEO, unlocking heavy payloads to Mars." },
    { title: "Air-Breathing Scramjets", note: "ISRO's HSTDV work. Utilizing atmospheric oxygen up to Mach 6 before firing rocket propellants." },
    { title: "SSTO Systems", note: "Single-Stage-To-Orbit vehicles. Fully reusable horizontal takeoff configurations using air-breathing cycles." },
  ];
  return (
    <>
      <SceneHeading sub="11. The Next Frontier" main="Beyond Chemical Rockets" />
      <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {systems.map((s, idx) => (
          <div key={s.title} className="bg-[#0a0a14]/90 border border-white/5 hover:border-[#FFB800]/20 transition-all rounded-2xl p-6 text-left flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">Concept 0{idx + 1}</span>
              <h3 className="text-base font-bold text-white mb-2 leading-tight">{s.title}</h3>
              <p className="text-xs text-white/70 leading-relaxed">{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// 13. CLIMAX HISTORICAL SEQUENCE
function Scene12Climax() {
  const line = [
    "Sounding Rocket",
    "SLV-3",
    "ASLV",
    "PSLV",
    "GSLV",
    "LVM3",
    "Reusable Boosters",
    "Starship",
    "Future Systems",
  ];
  return (
    <div className="max-w-5xl flex flex-col items-center text-center px-4 z-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(255,184,0,0.05) 0%, transparent 70%)",
        }}
      />
      <SceneLabel>12. Historical Sequence</SceneLabel>
      
      <h2
        className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide leading-relaxed text-white max-w-4xl mb-8 relative z-10"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Every Rocket Is A Solution To Yesterday&apos;s Problem.
      </h2>

      {/* Historical sequence horizontal scroll track */}
      <div className="w-full overflow-x-auto flex items-center justify-start sm:justify-center gap-2 py-4 mb-8 border-y border-white/5 relative z-10 no-scrollbar">
        {line.map((item, idx) => (
          <React.Fragment key={item}>
            <div className="shrink-0 bg-[#0a0a14] border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#FFB800] uppercase tracking-wider">
              {item}
            </div>
            {idx < line.length - 1 && (
              <span className="text-white/20 font-mono text-xs select-none">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="text-sm text-white/70 max-w-3xl leading-relaxed mb-10 font-light relative z-10 text-center">
        The history of rocketry isn&apos;t a story of building larger rockets. It is the story of engineers solving one impossible physical limitation after another. Every breakthrough—from staging to cryogenic engines to reusable boosters—exists because the previous generation reached its limits.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
        <ChapterNavButton
          href="/chapters/value-chain"
          label="Back to The Value Chain"
          variant="ghost"
          direction="back"
        />
        <ChapterNavButton
          href="/chapters/satellites"
          label="Continue. Satellites"
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
// MAIN CHAPTER PAGE
// ---------------------------------------------------------------------------

export default function LaunchVehiclesPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef } = p;

  // Scroll transforms for 14 frames
  const s0SplashOpacity = useTransform(progress, [0.0, 0.04, 0.0714], [1, 1, 0]);
  const s0SplashScale = useTransform(progress, [0.0, 0.0714], [1, 0.96]);

  const s0Opacity = useTransform(progress, [0.05, 0.0714, 0.12, 0.1429], [0, 1, 1, 0]);
  const s0Scale = useTransform(progress, [0.05, 0.1429], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.12, 0.1429, 0.19, 0.2143], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.12, 0.1429, 0.19, 0.2143], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.19, 0.2143, 0.26, 0.2857], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.19, 0.2143, 0.26, 0.2857], [24, 0, 0, -24]);

  const s3Opacity = useTransform(progress, [0.26, 0.2857, 0.33, 0.3571], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.26, 0.2857, 0.33, 0.3571], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.33, 0.3571, 0.40, 0.4286], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.33, 0.3571, 0.40, 0.4286], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.40, 0.4286, 0.48, 0.5000], [0, 1, 1, 0]);
  const s5Y = useTransform(progress, [0.40, 0.4286, 0.48, 0.5000], [24, 0, 0, -24]);

  const s6Opacity = useTransform(progress, [0.48, 0.5000, 0.55, 0.5714], [0, 1, 1, 0]);
  const s6Y = useTransform(progress, [0.48, 0.5000, 0.55, 0.5714], [24, 0, 0, -24]);

  const s7Opacity = useTransform(progress, [0.55, 0.5714, 0.62, 0.6429], [0, 1, 1, 0]);
  const s7Y = useTransform(progress, [0.55, 0.5714, 0.62, 0.6429], [24, 0, 0, -24]);

  const s8Opacity = useTransform(progress, [0.62, 0.6429, 0.69, 0.7143], [0, 1, 1, 0]);
  const s8Y = useTransform(progress, [0.62, 0.6429, 0.69, 0.7143], [24, 0, 0, -24]);

  const s9Opacity = useTransform(progress, [0.69, 0.7143, 0.76, 0.7857], [0, 1, 1, 0]);
  const s9Y = useTransform(progress, [0.69, 0.7143, 0.76, 0.7857], [24, 0, 0, -24]);

  const s10Opacity = useTransform(progress, [0.76, 0.7857, 0.83, 0.8571], [0, 1, 1, 0]);
  const s10Y = useTransform(progress, [0.76, 0.7857, 0.83, 0.8571], [24, 0, 0, -24]);

  const s11Opacity = useTransform(progress, [0.83, 0.8571, 0.90, 0.9286], [0, 1, 1, 0]);
  const s11Y = useTransform(progress, [0.83, 0.8571, 0.90, 0.9286], [24, 0, 0, -24]);

  const s12Opacity = useTransform(progress, [0.90, 0.9286, 1.0], [0, 1, 1]);
  const s12Y = useTransform(progress, [0.90, 0.9286, 1.0], [24, 0, 0]);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#FFB800] selection:text-[#030308] relative">
      <Navbar />
      <PresentationChrome controller={p} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[1400vh] bg-[#030308]">
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
                className={`${[0, 6, 10].includes(currentFrameIndex) ? "absolute inset-0 w-full h-full z-10 pointer-events-auto" : SLIDE_BASE} text-center`}
              >
                {currentFrameIndex === 0 && <Scene0Splash presentationActive />}
                {currentFrameIndex === 1 && <Scene0Hero presentationActive />}
                {currentFrameIndex === 2 && <Scene1SoundingRockets />}
                {currentFrameIndex === 3 && <Scene2OrbitalVelocity />}
                {currentFrameIndex === 4 && <Scene3MassTyranny />}
                {currentFrameIndex === 5 && <Scene4Staging />}
                {currentFrameIndex === 6 && <Scene5Chemistry />}
                {currentFrameIndex === 7 && <Scene6TimelineMapping />}
                {currentFrameIndex === 8 && <Scene7PSLVCaseStudy />}
                {currentFrameIndex === 9 && <Scene8ReusabilityEconomics />}
                {currentFrameIndex === 10 && <Scene9ReentryProfile />}
                {currentFrameIndex === 11 && <Scene10MethaloxEra />}
                {currentFrameIndex === 12 && <Scene11NextFrontier />}
                {currentFrameIndex === 13 && <Scene12Climax />}
              </motion.div>
            </AnimatePresence>
          )}

          {/* SCROLL MODE */}
          {!presentationActive && (
            <>
              <motion.div
                style={{ opacity: s0SplashOpacity, scale: s0SplashScale }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              >
                <Scene0Splash presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s0Opacity, scale: s0Scale }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene0Hero presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s1Opacity, y: s1Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene1SoundingRockets />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene2OrbitalVelocity />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene3MassTyranny />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 5 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene4Staging />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`absolute inset-0 w-full h-full z-10 text-center ${
                  currentFrameIndex === 6 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene5Chemistry />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 7 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene6TimelineMapping />
              </motion.div>

              <motion.div
                style={{ opacity: s7Opacity, y: s7Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 8 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene7PSLVCaseStudy />
              </motion.div>

              <motion.div
                style={{ opacity: s8Opacity, y: s8Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 9 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene8ReusabilityEconomics />
              </motion.div>

              <motion.div
                style={{ opacity: s9Opacity, y: s9Y }}
                className={`absolute inset-0 w-full h-full z-10 text-center ${
                  currentFrameIndex === 10 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene9ReentryProfile />
              </motion.div>

              <motion.div
                style={{ opacity: s10Opacity, y: s10Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 11 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene10MethaloxEra />
              </motion.div>

              <motion.div
                style={{ opacity: s11Opacity, y: s11Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 12 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene11NextFrontier />
              </motion.div>

              <motion.div
                style={{ opacity: s12Opacity, y: s12Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 13 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene12Climax />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

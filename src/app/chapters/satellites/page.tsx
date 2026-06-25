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
  Eye,
  Camera,
  Radio,
  Sun,
  Cloud,
  Layers3,
} from "lucide-react";

// ---------------------------------------------------------------------------
// DATA & CONSTANTS
// ---------------------------------------------------------------------------

const TOTAL_FRAMES = 14;
const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

// MEET THE SATELLITE BUS PARTS
const SATELLITE_PARTS = [
  {
    id: "bus",
    name: "Satellite Bus",
    desc: "The structural chassis. It houses all housekeeping systems—power, guidance, thermal control—keeping the spacecraft alive in the harsh space environment.",
    purpose: "Spacecraft survival skeleton",
  },
  {
    id: "payload",
    name: "Mission Payload",
    desc: "The actual working instrument (cameras, antennas, radar transceivers). Every other system on the satellite exists solely to support this payload's mission.",
    purpose: "Operational sensor suite",
  },
  {
    id: "solar",
    name: "Solar Arrays",
    desc: "Photovoltaic panels that unfold in orbit to capture sunlight, generating up to several kilowatts of electrical power for the onboard electronics.",
    purpose: "Primary power generation",
  },
  {
    id: "battery",
    name: "Lithium-Ion Battery",
    desc: "Stores power during sunlit phases, ensuring the satellite continues to operate seamlessly during eclipse phases (Earth's shadow).",
    purpose: "Eclipse energy reserve",
  },
  {
    id: "antenna",
    name: "Communication Antenna",
    desc: "High-gain parabolic or phased-array antennas that downlink gathered data and uplink navigation commands to ground stations.",
    purpose: "Data downlink & telemetry",
  },
  {
    id: "wheels",
    name: "Reaction Wheels",
    desc: "Electric gyroscopes that spin at high speeds. By changing their spin rates, they rotate the satellite precisely to point sensors at targets.",
    purpose: "Attitude & pointing control",
  },
  {
    id: "propulsion",
    name: "Chemical Propulsion",
    desc: "Small monopropellant thrusters or electric ion engines. Used for orbit maintenance, dodging space debris, and final decommissioning.",
    purpose: "Orbital corrections",
  },
  {
    id: "thermal",
    name: "Thermal Blankets",
    desc: "Multi-layered gold Kapton foil insulating systems. Protects sensitive electronics from extreme orbital temperature swings (-150°C to +150°C).",
    purpose: "Thermal insulation protection",
  },
];

// SENSOR GALLERY
const SENSORS = [
  {
    id: "optical",
    name: "Optical Imaging",
    use: "Visible light photography. Yields high-resolution, intuitive images for mapping and border surveillance, but is completely blind at night or under cloud cover.",
    spec: "Sub-meter resolution, clear skies only",
  },
  {
    id: "multispectral",
    name: "Multispectral / Hyperspectral",
    use: "Captures narrow bands across the light spectrum (infrared, red-edge). Identifies plant chlorophyll levels, water stress, soil mineral compositions, and chemical leaks.",
    spec: "Detailed chemical/agricultural mapping",
  },
  {
    id: "thermal",
    name: "Thermal Infrared",
    use: "Measures heat radiation emitted from the Earth. Crucial for mapping forest fires, monitoring active volcanoes, and urban heat island tracking.",
    spec: "Heat signature tracking",
  },
  {
    id: "radar",
    name: "Synthetic Aperture Radar (SAR)",
    use: "Sends microwave pulses to the ground. Captures reflection signatures to see through clouds, dust, and darkness, mapping structural changes down to millimeters.",
    spec: "Day/night cloud-free active sensing",
  },
];

// ---------------------------------------------------------------------------
// HELPERS
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
          className="absolute rounded-full border border-[#FFB800]/[0.02]"
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
// SCENE COMPONENTS
// ---------------------------------------------------------------------------

// 1. HERO
function Scene0Hero({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(255,184,0,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center text-center">
        <SceneLabel>Chapter XIV. Satellites</SceneLabel>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none uppercase mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          The Machines
          <br />
          <span className="text-[#FFB800]">That Never Blink</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
          Every weather forecast, navigation system, disaster warning, military image and communication network begins with a silent machine orbiting hundreds of kilometres above Earth.
        </p>

        <div className="grid grid-cols-2 gap-0 border border-[#FFB800]/10 rounded-2xl overflow-hidden font-mono mb-10 w-full max-w-sm">
          {[
            { val: "Chapter XIV", label: "Satellite Engineering" },
            { val: "12 Days", label: "NISAR Global Mapping" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-4 px-3 ${i !== 1 ? "border-r border-[#FFB800]/10" : ""}`}
            >
              <span className="text-xl font-extrabold text-[#FFB800] block">{s.val}</span>
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

// 2. WHAT IS A SATELLITE (ORBIT BALLISTICS)
function Scene1WhatIsASatellite() {
  return (
    <>
      <SceneHeading sub="01. Orbital Ballistics" main="Why Satellites Don&apos;t Fall" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-5 flex items-center justify-center bg-[#0a0a14]/60 border border-[#FFB800]/10 rounded-2xl p-6 min-h-[350px]">
          <svg viewBox="0 0 200 200" className="w-full h-full max-h-[280px]">
            {/* Earth */}
            <circle cx="100" cy="100" r="45" fill="rgba(255,184,0,0.06)" stroke="#FFB800" strokeWidth="1.5" />
            
            {/* Orbit path */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Satellite */}
            <circle cx="153" cy="47" r="5" fill="#FFB800" />
            
            {/* Gravity vector (pulling down) */}
            <path d="M 153 47 L 122 78" stroke="#ff6b00" strokeWidth="1.5" />
            <polygon points="122,78 129,74 125,70" fill="#ff6b00" />
            <text x="110" y="66" fill="#ff6b00" className="font-mono text-[7px]" fontWeight="bold">GRAVITY</text>
            
            {/* Velocity vector (horizontal push) */}
            <path d="M 153 47 L 188 12" stroke="#FFB800" strokeWidth="1.5" />
            <polygon points="188,12 181,14 185,18" fill="#FFB800" />
            <text x="180" y="27" fill="#FFB800" className="font-mono text-[7px]" fontWeight="bold">VELOCITY</text>
          </svg>
        </div>

        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            The Orbital Balance
          </span>
          <h3 className="text-xl font-bold text-white mb-4">Gravity vs Sideways Velocity</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            A satellite remains in orbit by falling constantly around the Earth without hitting it. By matching its forward velocity with Earth&apos;s gravitational pull, it moves in a circular or elliptical curve. At 400km altitude, this balance requires a speed of **7.8 km/s**.
          </p>
          <div className="bg-[#0a0a14]/80 border border-[#FFB800]/10 p-4 rounded-xl font-mono text-xs text-white/60">
            <span className="text-[#FFB800] font-bold block mb-1">Concept:</span>
            Space has no air resistance to slow the satellite down, allowing it to orbit for decades on inertia alone.
          </div>
        </div>
      </div>
    </>
  );
}

// 3. MEET THE SATELLITE (EXPLODED ANATOMY)
function Scene2MeetTheSatellite() {
  const [activeId, setActiveId] = useState("bus");
  const selected = SATELLITE_PARTS.find((p) => p.id === activeId) || SATELLITE_PARTS[0];
  return (
    <>
      <SceneHeading sub="02. Spacecraft Anatomy" main="Meet The Satellite" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl z-10">
        {/* Interactive buttons */}
        <div className="lg:col-span-4 flex flex-col gap-1.5 overflow-y-auto max-h-[380px] pr-1">
          {SATELLITE_PARTS.map((p) => {
            const active = p.id === activeId;
            return (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`w-full px-4 py-2.5 rounded-xl border text-left font-mono text-xs transition-all cursor-pointer ${
                  active
                    ? "bg-[#FFB800]/10 border-[#FFB800] text-[#FFB800] font-bold"
                    : "bg-[#0a0a14]/70 border-white/5 text-white/60 hover:border-white/20"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Component explanation */}
        <div className="lg:col-span-8 bg-[#0a0a14]/90 border border-[#FFB800]/20 rounded-2xl p-8 flex flex-col justify-between text-left">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white leading-tight">{selected.name}</h3>
              <span className="p-2 rounded-lg bg-[#FFB800]/5 text-[#FFB800]">
                <Cpu className="w-5 h-5" />
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#FFB800] block mb-4 font-bold">
              Subsystem Duty: {selected.purpose}
            </span>
            <p className="text-xs text-white/70 leading-relaxed">
              {selected.desc}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/40">
            <span>Primary System:</span>
            <span className="text-white font-bold">{selected.purpose}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// 4. BUS VS PAYLOAD
function Scene3BusVsPayload() {
  return (
    <>
      <SceneHeading sub="03. Core Division" main="Satellite Bus vs Payload" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl z-10">
        <div className="lg:col-span-6 bg-[#0a0a14]/70 border border-[#FFB800]/15 p-6 rounded-2xl text-left flex flex-col justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase text-[#FFB800] font-bold block mb-2">The Platform</span>
            <h3 className="text-lg font-bold text-white mb-3">The Satellite Bus</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              The Bus is the vehicle. It provides power generation, temperature regulation, data routing, thrust, and orientation stabilization. It acts as the utility chassis that keeps the payload alive in orbit.
            </p>
          </div>
          <div className="border-t border-[#FFB800]/5 pt-3 mt-4 text-[9px] font-mono text-white/40 uppercase">
            Includes: Batteries, solar arrays, thrusters, computer bus.
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#FFB800]/5 border border-[#FFB800]/30 p-6 rounded-2xl text-left flex flex-col justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase text-[#FFB800] font-bold block mb-2">The Mission</span>
            <h3 className="text-lg font-bold text-white mb-3">The Payload</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              The Payload is the functional utility. It performs the specific operational mission, such as capturing pictures, firing radar waves, or broadcasting telecommunication signals. The payload dictates the design of the entire satellite.
            </p>
          </div>
          <div className="border-t border-[#FFB800]/10 pt-3 mt-4 text-[9px] font-mono text-[#FFB800]/60 uppercase">
            Includes: Multispectral cameras, active radar, communication transceivers.
          </div>
        </div>
      </div>
    </>
  );
}

// 5. THE FIRST PRINCIPLE
function Scene4FirstPrinciple() {
  return (
    <>
      <SceneHeading sub="04. Engineering Flow" main="The First Principle of Satellite Design" />
      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: "01", name: "Mission", desc: "Define target target objectives (e.g. soil moisture mapping)." },
            { step: "02", name: "Signal", desc: "Select physics emission (e.g. L-band microwaves)." },
            { step: "03", name: "Physics", desc: "Analyze signal scattering and surface returns." },
            { step: "04", name: "Hardware", desc: "Design phased array radar and transceivers." },
            { step: "05", name: "Payload", desc: "Build complete sensor system, sizing the necessary Bus." },
          ].map((v) => (
            <div
              key={v.step}
              className="bg-[#0a0a14]/80 border border-[#FFB800]/15 rounded-2xl p-5 text-left flex flex-col justify-between min-h-[180px] hover:border-[#FFB800]/40 transition-colors"
            >
              <div>
                <span className="font-mono text-xs text-[#FFB800] block mb-2">{v.step}</span>
                <h3 className="text-sm font-bold text-white mb-2">{v.name}</h3>
                <p className="text-[10px] text-white/60 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0a0a14]/60 border border-[#FFB800]/5 rounded-2xl p-5 text-left flex items-start gap-4">
          <Layers3 className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
          <p className="text-xs text-white/70 leading-relaxed">
            <span className="text-white font-bold">First Principle: </span>
            A satellite is always built back-to-front. You do not design a satellite and then choose a mission. You define the mission, choose the physics to measure it, engineer the payload, and finally size the solar panels and battery systems to power it.
          </p>
        </div>
      </div>
    </>
  );
}

// 6. SENSORS GALLERY
function Scene5FamilyOfSensors() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <>
      <SceneHeading sub="05. The Sensor Suite" main="Earth Observation Spectrum" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl z-10">
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 min-h-[300px]">
          {SENSORS.map((s, idx) => {
            const active = idx === activeIdx;
            return (
              <button
                key={s.name}
                onClick={() => setActiveIdx(idx)}
                className={`p-5 rounded-2xl text-left border flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  active
                    ? "bg-[#FFB800]/10 border-[#FFB800] shadow-lg shadow-[#FFB800]/5 text-[#FFB800]"
                    : "bg-[#080c12]/70 border-[#FFB800]/5 hover:border-[#FFB800]/20 text-white/60"
                }`}
              >
                <div>
                  <h4 className={`text-xs font-mono font-bold tracking-wide mb-1 ${
                    active ? "text-[#FFB800]" : "text-white/40"
                  }`}>
                    Option 0{idx + 1}
                  </h4>
                  <span className={`text-sm font-sans font-bold block leading-snug ${active ? "text-[#FFB800]" : "text-white"}`}>{s.name}</span>
                </div>
                <span className={`font-mono text-[9px] mt-4 block font-bold ${active ? "text-[#FFB800]" : "text-[#FFB800]/70"}`}>{s.spec}</span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="bg-[#0a0a14]/90 border border-[#FFB800]/20 rounded-2xl p-8 h-full flex flex-col justify-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
              Instrument Details
            </span>
            <h3 className="text-xl font-bold text-white mb-4">
              {SENSORS[activeIdx].name}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-6">
              {SENSORS[activeIdx].use}
            </p>
            <div className="flex items-center gap-2 pt-4 border-t border-[#FFB800]/5 font-mono text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
              <span className="text-white/50">Performance envelope: </span>
              <span className="text-white font-bold">{SENSORS[activeIdx].spec}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 7. OWL VS BAT (PASSIVE VS ACTIVE CLOUD TOGGLE)
function Scene6OwlAndBat() {
  const [clouds, setClouds] = useState(false);
  return (
    <>
      <SceneHeading sub="06. Passive vs Active" main="The Owl and the Bat" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-6 flex flex-col items-center bg-[#0a0a14]/60 border border-[#FFB800]/10 rounded-2xl p-6 min-h-[340px] relative">
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setClouds(!clouds)}
              className="px-4 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase transition-all bg-[#FFB800] text-[#030308] hover:bg-[#cc9300] cursor-pointer"
            >
              {clouds ? "Clear Skies" : "Cover with Clouds"}
            </button>
          </div>

          <div className="w-full flex gap-4 mt-8 items-stretch">
            {/* Optical Sensor Box */}
            <div className="flex-1 bg-black/40 border border-white/5 p-4 rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-center">
              <Camera className="w-6 h-6 text-white/40 mb-2" />
              <span className="text-[10px] font-mono text-white/50 block mb-2">OPTICAL (OWL)</span>
              
              <AnimatePresence mode="wait">
                {clouds ? (
                  <motion.div
                    key="blind"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#0a0a14]/90 flex flex-col items-center justify-center"
                  >
                    <Cloud className="w-8 h-8 text-white/20 animate-bounce mb-2" />
                    <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-wider">Blinded by Clouds</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="see"
                    className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-wider"
                  >
                    Target Visible
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Radar Sensor Box */}
            <div className="flex-1 bg-[#FFB800]/5 border border-[#FFB800]/25 p-4 rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-center">
              <Radio className="w-6 h-6 text-[#FFB800] mb-2 animate-pulse" />
              <span className="text-[10px] font-mono text-[#FFB800] block mb-2">RADAR (BAT)</span>
              <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-wider">
                {clouds ? "Penetrates Clouds" : "Target Visible"}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            Sensor Physics
          </span>
          <h3 className="text-xl font-bold text-white mb-4">Passive (Optical) vs Active (Radar)</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            **Passive sensors (Owls)** measure ambient light reflected off the Earth. When night falls or clouds cover the landscape, they become completely blind. **Active sensors (Bats)** fire microwave pulses and map the returning echo, working continuously through clouds, dust, and darkness.
          </p>
        </div>
      </div>
    </>
  );
}

// 8. HOW RADAR WORKS
function Scene7HowRadarWorks() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SceneHeading sub="07. Pulse Propagation" main="How Radar Sees" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-6 flex items-center justify-center bg-[#0a0a14]/60 border border-[#FFB800]/10 rounded-2xl p-6 min-h-[350px]">
          <svg viewBox="0 0 300 240" className="w-full h-full max-h-[260px]">
            {/* Satellite */}
            <circle cx="150" cy="30" r="8" fill="#FFB800" />
            <rect x="142" y="38" width="16" height="4" fill="rgba(255,255,255,0.2)" />
            
            {/* Target Ground */}
            <line x1="30" y1="210" x2="270" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <polygon points="150,210 142,202 158,202" fill="rgba(255,184,0,0.5)" />

            {/* Pulse Animation */}
            {pulse === 0 && (
              <circle cx="150" cy="80" r="15" fill="none" stroke="#FFB800" strokeWidth="2" strokeDasharray="3 3" />
            )}
            {pulse === 1 && (
              <circle cx="150" cy="150" r="30" fill="none" stroke="#ff6b00" strokeWidth="2" />
            )}
            {pulse === 2 && (
              <path d="M 110 160 Q 150 120 190 160" fill="none" stroke="#FFB800" strokeWidth="1.5" />
            )}

            <text x="150" y="230" textAnchor="middle" fill="white" className="font-mono text-[9px] uppercase tracking-wider">
              {pulse === 0 && "1. Pulse Dispatched"}
              {pulse === 1 && "2. Ground Impact"}
              {pulse === 2 && "3. Echo Returning"}
            </text>
          </svg>
        </div>

        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            Distance & Textures
          </span>
          <h3 className="text-xl font-bold text-white mb-4">The Radar Wave Loop</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            The satellite fires a directional microwave pulse toward Earth. The wavefront travels at the speed of light, strikes the surface, and scatters. By measuring the time it takes for the echo to return (distance) and its final intensity (roughness), we reconstruct high-contrast radar maps.
          </p>
        </div>
      </div>
    </>
  );
}

// 9. SYNTHETIC APERTURE RADAR (SAR)
function Scene8SyntheticApertureRadar() {
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((c) => (c + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SceneHeading sub="08. Virtual Antennas" main="Synthetic Aperture Radar (SAR)" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-6 flex items-center justify-center bg-[#0a0a14]/60 border border-[#FFB800]/10 rounded-2xl p-6 min-h-[350px]">
          <svg viewBox="0 0 320 220" className="w-full h-full max-h-[260px]">
            {/* Sat path */}
            <line x1="20" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Virtual Aperture bracket */}
            <path d="M 60 25 L 60 15 L 260 15 L 260 25" fill="none" stroke="#FFB800" strokeWidth="1" />
            <text x="160" y="10" textAnchor="middle" fill="#FFB800" className="font-mono text-[8px] font-bold uppercase tracking-wider">Virtual Aperture (Stitched)</text>

            {/* Satellite positions */}
            <circle cx="60" cy="40" r="4" fill={pulseCount >= 1 ? "#FFB800" : "rgba(255,255,255,0.15)"} />
            <circle cx="160" cy="40" r="4" fill={pulseCount >= 2 ? "#FFB800" : "rgba(255,255,255,0.15)"} />
            <circle cx="260" cy="40" r="4" fill={pulseCount >= 3 ? "#FFB800" : "rgba(255,255,255,0.15)"} />

            {/* Target */}
            <polygon points="160,180 155,170 165,170" fill="#ff6b00" />
            
            {/* Pulses */}
            {pulseCount >= 1 && <line x1="60" y1="40" x2="160" y2="175" stroke="rgba(255,184,0,0.2)" strokeWidth="1" />}
            {pulseCount >= 2 && <line x1="160" y1="40" x2="160" y2="175" stroke="rgba(255,184,0,0.4)" strokeWidth="1" />}
            {pulseCount >= 3 && <line x1="260" y1="40" x2="160" y2="175" stroke="rgba(255,184,0,0.2)" strokeWidth="1" />}
            
            <text x="160" y="205" textAnchor="middle" fill="white" className="font-mono text-[9px] uppercase tracking-wider font-bold">
              {pulseCount === 0 && "Initiating flight track"}
              {pulseCount === 1 && "Pulse 1 captured"}
              {pulseCount === 2 && "Pulse 2 captured"}
              {pulseCount === 3 && "Stitching virtual array"}
            </text>
          </svg>
        </div>

        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            Virtual Apertures
          </span>
          <h3 className="text-xl font-bold text-white mb-4">Synthesizing Resolution</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            An antenna must be massive to capture sharp radar details, often requiring a reflector kilometers long. SAR sidesteps this physical limitation: as the satellite flies, it fires multiple radar pulses. By computationally stitching the sequential echoes together, it simulates a virtual antenna kilometers wide.
          </p>
        </div>
      </div>
    </>
  );
}

// 10. MISSION CONFIG
function Scene9MissionConfig() {
  const [activeMode, setActiveMode] = useState("ocean");
  return (
    <>
      <SceneHeading sub="09. Parameter Tuning" main="The Mission Sets the Dials" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        <div className="lg:col-span-6 flex flex-col items-center bg-[#0a0a14]/60 border border-[#FFB800]/10 rounded-2xl p-6 min-h-[350px] relative">
          <div className="absolute top-4 right-4 flex bg-black/40 border border-white/10 rounded-full p-0.5 z-20">
            <button
              onClick={() => setActiveMode("ocean")}
              className={`px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase transition-all cursor-pointer ${
                activeMode === "ocean" ? "bg-[#FFB800] text-[#030308]" : "text-white/50 hover:text-white"
              }`}
            >
              Ocean Swell (C-band)
            </button>
            <button
              onClick={() => setActiveMode("urban")}
              className={`px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase transition-all cursor-pointer ${
                activeMode === "urban" ? "bg-[#FFB800] text-[#030308]" : "text-white/50 hover:text-white"
              }`}
            >
              Urban Drift (X-band)
            </button>
          </div>

          <div className="w-full mt-10">
            {activeMode === "ocean" ? (
              <div className="flex flex-col gap-4 font-mono text-xs text-left">
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px]">FREQUENCY PROFILE</span>
                  <span className="text-[#FFB800] font-bold text-sm">C-Band (5.4 GHz)</span>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px]">ALTITUDE ORBIT</span>
                  <span className="text-white text-sm">Polar LEO (~800km)</span>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px]">RESOLVABLE BOUNDS</span>
                  <span className="text-white text-sm">20 Meters (Coarse Swath)</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px]">SWATH COVERAGE</span>
                  <span className="text-white text-sm">300 km (Wide Area)</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 font-mono text-xs text-left">
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px]">FREQUENCY PROFILE</span>
                  <span className="text-[#FFB800] font-bold text-sm">X-Band (9.6 GHz)</span>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px]">ALTITUDE ORBIT</span>
                  <span className="text-white text-sm">Sun-Synchronous LEO (~500km)</span>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px]">RESOLVABLE BOUNDS</span>
                  <span className="text-white text-sm">1 Meter (High Resolution)</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px]">SWATH COVERAGE</span>
                  <span className="text-white text-sm">20 km (Targeted Spot)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            Engineering Tradeoffs
          </span>
          <h3 className="text-xl font-bold text-white mb-4">No Single Best Satellite</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Sensing engineering is defined by strict trade-offs. To observe ocean winds and waves over large swaths, you use a lower frequency (C-band) and higher altitude (800km) to prioritize area coverage. To detect millimeter structural movements in buildings, you drop to 500km and use high-frequency X-band waves.
          </p>
        </div>
      </div>
    </>
  );
}

// 11. NISAR
function Scene10NISAR() {
  return (
    <>
      <SceneHeading sub="10. NASA-ISRO Collaborative" main="NISAR: Dual-Frequency Radar" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl z-10">
        {/* Visual Badge */}
        <div className="lg:col-span-5 flex flex-col justify-center bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-2xl p-8 backdrop-blur-md min-h-[320px] text-left">
          <span className="font-mono text-[9px] uppercase text-[#FFB800] font-bold block mb-1">Mission Profile</span>
          <h3 className="text-3xl font-black text-white mb-4 leading-none">NISAR</h3>
          
          <div className="flex flex-col gap-3 font-mono text-xs border-t border-[#FFB800]/10 pt-4 mt-2">
            <div>
              <span className="text-white/40 block text-[8px]">BAND STACK</span>
              <span className="text-[#FFB800] font-bold text-sm">L-Band (NASA) + S-Band (ISRO)</span>
            </div>
            <div>
              <span className="text-white/40 block text-[8px]">GLOBAL SWEEPFREQ</span>
              <span className="text-white text-sm">Every 12 Days</span>
            </div>
            <div>
              <span className="text-white/40 block text-[8px]">RESOLVABLE DRIFT</span>
              <span className="text-white text-sm">Sub-centimeter precision</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">
            Flagship Engineering
          </span>
          <h3 className="text-xl font-bold text-white mb-4">NASA and ISRO Joint Sentinel</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            NISAR (NASA-ISRO Synthetic Aperture Radar) is a historic joint mission. Utilizing dual L-band and S-band frequencies, it penetrates forest canopies and cloud structures to map the entire globe every 12 days, monitoring earthquakes, ice sheets, and agricultural yields with sub-centimeter accuracy.
          </p>
        </div>
      </div>
    </>
  );
}

// 12. INSIDE RADAR PAYLOAD
function Scene11InsideRadarPayload() {
  const chain = [
    { label: "Waveform Gen", note: "Synthesizes microwave chirp signals." },
    { label: "Power Amp", note: "Amplifies pulse energy using GaN transceivers." },
    { label: "TR Modules", note: "Steers and controls transmit/receive paths." },
    { label: "Phased Array", note: "Reflects and shapes the radar beam." },
  ];
  return (
    <>
      <SceneHeading sub="11. Hardware Stack" main="Inside the Radar Payload" />
      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {chain.map((v, i) => (
            <div
              key={v.label}
              className="bg-[#0a0a14]/80 border border-[#FFB800]/15 rounded-2xl p-5 text-left flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="font-mono text-xs text-[#FFB800] block mb-2">0{i + 1}</span>
                <h3 className="text-sm font-bold text-white mb-2">{v.label}</h3>
                <p className="text-[10px] text-white/60 leading-relaxed">{v.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0a0a14]/60 border border-[#FFB800]/5 rounded-2xl p-5 text-left flex items-start gap-4">
          <Cpu className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
          <p className="text-xs text-white/70 leading-relaxed">
            <span className="text-white font-bold">Hardware Challenge: </span>
            A radar payload demands extreme power. The **Power Amplifiers** must boost radar chirp signals to several kilowatts, and the **TR (Transmit/Receive) Modules** must steer the beam electronically in microseconds without moving parts.
          </p>
        </div>
      </div>
    </>
  );
}

// 13. SATELLITE SUPPLY CHAIN
function Scene12IndianEcosystem() {
  const subs = [
    { area: "Structures & Hulls", partners: "HAL, MTAR Technologies" },
    { area: "Propellant Blocks", partners: "Godrej Aerospace, MTAR" },
    { area: "RF Front-End & TR Modules", partners: "Astra Microwave, Bharat Electronics (BEL)" },
    { area: "Solar Panels & Power Dist", partners: "Centum Electronics" },
  ];
  return (
    <>
      <SceneHeading sub="12. Industrial Ecosystem" main="The Indian Supply Chain Map" />
      <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {subs.map((s) => (
          <div key={s.area} className="bg-[#0a0a14]/90 border border-[#FFB800]/15 rounded-2xl p-6 text-left flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-2 font-bold">Subsystem Fab</span>
              <h3 className="text-sm font-bold text-white mb-2 leading-tight">{s.area}</h3>
            </div>
            <div className="border-t border-white/5 pt-4 mt-6 flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/40">
              <span>Key Listed Fabricators:</span>
              <span className="text-[#FFB800] font-bold">{s.partners}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// 14. THESIS
function Scene13Thesis() {
  return (
    <div className="max-w-4xl flex flex-col items-center text-center px-4 z-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(255,184,0,0.04) 0%, transparent 70%)",
        }}
      />
      <SceneLabel>13. Satellite Thesis</SceneLabel>
      
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight text-white max-w-3xl mb-8 relative z-10"
        style={{ fontFamily: "Georgia, serif" }}
      >
        A Satellite Doesn&apos;t Just Observe Earth. It Learns To Measure It.
      </h2>

      <p className="text-sm sm:text-base text-white/65 max-w-2xl leading-relaxed mb-12 font-light relative z-10">
        Every satellite is a carefully engineered balance of power, precision, communication, guidance and sensing. The mission determines the signal, the signal determines the payload, and the payload determines how humanity understands our planet.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
        <ChapterNavButton
          href="/chapters/launch-vehicles"
          label="Back to Rocket Engineering"
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN CHAPTER PAGE
// ---------------------------------------------------------------------------

export default function SatellitesPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef } = p;

  // Scroll transforms for 14 frames
  const s0Opacity = useTransform(progress, [0.0, 0.04, 0.0714], [1, 1, 0]);
  const s0Scale = useTransform(progress, [0.0, 0.0714], [1, 0.96]);

  const s1Opacity = useTransform(progress, [0.05, 0.0714, 0.12, 0.1429], [0, 1, 1, 0]);
  const s1Y = useTransform(progress, [0.05, 0.0714, 0.12, 0.1429], [24, 0, 0, -24]);

  const s2Opacity = useTransform(progress, [0.12, 0.1429, 0.19, 0.2143], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.12, 0.1429, 0.19, 0.2143], [24, 0, 0, -24]);

  const s3Opacity = useTransform(progress, [0.19, 0.2143, 0.26, 0.2857], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.19, 0.2143, 0.26, 0.2857], [24, 0, 0, -24]);

  const s4Opacity = useTransform(progress, [0.26, 0.2857, 0.33, 0.3571], [0, 1, 1, 0]);
  const s4Y = useTransform(progress, [0.26, 0.2857, 0.33, 0.3571], [24, 0, 0, -24]);

  const s5Opacity = useTransform(progress, [0.33, 0.3571, 0.40, 0.4286], [0, 1, 1, 0]);
  const s5Y = useTransform(progress, [0.33, 0.3571, 0.40, 0.4286], [24, 0, 0, -24]);

  const s6Opacity = useTransform(progress, [0.40, 0.4286, 0.48, 0.5000], [0, 1, 1, 0]);
  const s6Y = useTransform(progress, [0.40, 0.4286, 0.48, 0.5000], [24, 0, 0, -24]);

  const s7Opacity = useTransform(progress, [0.48, 0.5000, 0.55, 0.5714], [0, 1, 1, 0]);
  const s7Y = useTransform(progress, [0.48, 0.5000, 0.55, 0.5714], [24, 0, 0, -24]);

  const s8Opacity = useTransform(progress, [0.55, 0.5714, 0.62, 0.6429], [0, 1, 1, 0]);
  const s8Y = useTransform(progress, [0.55, 0.5714, 0.62, 0.6429], [24, 0, 0, -24]);

  const s9Opacity = useTransform(progress, [0.62, 0.6429, 0.69, 0.7143], [0, 1, 1, 0]);
  const s9Y = useTransform(progress, [0.62, 0.6429, 0.69, 0.7143], [24, 0, 0, -24]);

  const s10Opacity = useTransform(progress, [0.69, 0.7143, 0.76, 0.7857], [0, 1, 1, 0]);
  const s10Y = useTransform(progress, [0.69, 0.7143, 0.76, 0.7857], [24, 0, 0, -24]);

  const s11Opacity = useTransform(progress, [0.76, 0.7857, 0.83, 0.8571], [0, 1, 1, 0]);
  const s11Y = useTransform(progress, [0.76, 0.7857, 0.83, 0.8571], [24, 0, 0, -24]);

  const s12Opacity = useTransform(progress, [0.83, 0.8571, 0.90, 0.9286], [0, 1, 1, 0]);
  const s12Y = useTransform(progress, [0.83, 0.8571, 0.90, 0.9286], [24, 0, 0, -24]);

  const s13Opacity = useTransform(progress, [0.90, 0.9286, 1.0], [0, 1, 1]);
  const s13Y = useTransform(progress, [0.90, 0.9286, 1.0], [24, 0, 0]);

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
                className={`${SLIDE_BASE} text-center pointer-events-auto`}
              >
                {currentFrameIndex === 0 && <Scene0Hero presentationActive />}
                {currentFrameIndex === 1 && <Scene1WhatIsASatellite />}
                {currentFrameIndex === 2 && <Scene2MeetTheSatellite />}
                {currentFrameIndex === 3 && <Scene3BusVsPayload />}
                {currentFrameIndex === 4 && <Scene4FirstPrinciple />}
                {currentFrameIndex === 5 && <Scene5FamilyOfSensors />}
                {currentFrameIndex === 6 && <Scene6OwlAndBat />}
                {currentFrameIndex === 7 && <Scene7HowRadarWorks />}
                {currentFrameIndex === 8 && <Scene8SyntheticApertureRadar />}
                {currentFrameIndex === 9 && <Scene9MissionConfig />}
                {currentFrameIndex === 10 && <Scene10NISAR />}
                {currentFrameIndex === 11 && <Scene11InsideRadarPayload />}
                {currentFrameIndex === 12 && <Scene12IndianEcosystem />}
                {currentFrameIndex === 13 && <Scene13Thesis />}
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
                <Scene0Hero presentationActive={false} />
              </motion.div>

              <motion.div
                style={{ opacity: s1Opacity, y: s1Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene1WhatIsASatellite />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene2MeetTheSatellite />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene3BusVsPayload />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene4FirstPrinciple />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 5 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene5FamilyOfSensors />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 6 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene6OwlAndBat />
              </motion.div>

              <motion.div
                style={{ opacity: s7Opacity, y: s7Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 7 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene7HowRadarWorks />
              </motion.div>

              <motion.div
                style={{ opacity: s8Opacity, y: s8Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 8 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene8SyntheticApertureRadar />
              </motion.div>

              <motion.div
                style={{ opacity: s9Opacity, y: s9Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 9 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene9MissionConfig />
              </motion.div>

              <motion.div
                style={{ opacity: s10Opacity, y: s10Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 10 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene10NISAR />
              </motion.div>

              <motion.div
                style={{ opacity: s11Opacity, y: s11Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 11 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene11InsideRadarPayload />
              </motion.div>

              <motion.div
                style={{ opacity: s12Opacity, y: s12Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 12 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene12IndianEcosystem />
              </motion.div>

              <motion.div
                style={{ opacity: s13Opacity, y: s13Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 13 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene13Thesis />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

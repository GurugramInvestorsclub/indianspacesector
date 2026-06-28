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

const TOTAL_FRAMES = 16;

const SATELLITES_SCENES = [
  { id: "splash", name: "Splash Cover", label: "01 / 16", startFrame: 0, endFrame: 0 },
  { id: "hero", name: "Satellite Platforms", label: "02 / 16", startFrame: 1, endFrame: 1 },
  { id: "microwave-bands", name: "Microwave Spectrum", label: "03 / 16", startFrame: 2, endFrame: 2 },
  { id: "first-principle", name: "First Principle of Design", label: "04 / 16", startFrame: 3, endFrame: 3 },
  { id: "high-end-bands", name: "High-End Bands", label: "05 / 16", startFrame: 4, endFrame: 4 },
  { id: "bus-payload", name: "Bus vs Payload", label: "06 / 16", startFrame: 5, endFrame: 5 },
  { id: "components", name: "Components & Architecture", label: "07 / 16", startFrame: 6, endFrame: 6 },
  { id: "sensors", name: "Family of Sensors", label: "08 / 16", startFrame: 7, endFrame: 7 },
  { id: "owl-bat", name: "The Owl and the Bat", label: "09 / 16", startFrame: 8, endFrame: 8 },
  { id: "radar-work", name: "How Radar Works", label: "10 / 16", startFrame: 9, endFrame: 9 },
  { id: "sar", name: "Synthetic Aperture Radar", label: "11 / 16", startFrame: 10, endFrame: 10 },
  { id: "mission-config", name: "Mission Config", label: "12 / 16", startFrame: 11, endFrame: 11 },
  { id: "nisar", name: "NISAR Mission", label: "13 / 16", startFrame: 12, endFrame: 12 },
  { id: "payload", name: "Inside Radar Payload", label: "14 / 16", startFrame: 13, endFrame: 13 },
  { id: "ecosystem", name: "Indian Ecosystem", label: "15 / 16", startFrame: 14, endFrame: 14 },
  { id: "thesis", name: "The Thesis", label: "16 / 16", startFrame: 15, endFrame: 15 },
];

const SLIDE_BASE =
  "absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full";

// MEET THE SATELLITE BUS PARTS
const SATELLITE_PARTS = [
  {
    id: "bus",
    name: "Satellite Bus",
    desc: "The structural chassis. It houses all housekeeping systems - power, guidance, thermal control - keeping the spacecraft alive in the harsh space environment.",
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

// 0. SPLASH COVER
function Scene0Splash({ presentationActive }: { presentationActive: boolean }) {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        {/* Background Image occupying the entire screen */}
        <img
          src="/satellite_splash.png"
          alt="Satellites Cover"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark vignette to fit the luxury cinematic styling */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#030308]/20 via-transparent to-[#030308]/60"
        />
      </div>

      {/* Content in the middle: satellites heading */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-widest text-white uppercase leading-none"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Satellites
        </h1>
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

// 1. HERO / SPECTRUM
function Scene0Hero({ presentationActive }: { presentationActive: boolean }) {
  const [activeBand, setActiveBand] = useState<string>("Microwave");

  const bands = [
    { name: "Radio", isHighlight: false, desc: "Long-range communication and deep space telemetry." },
    { name: "Microwave", isHighlight: true, desc: "Talk to the ground, GPS, and radar that sees through cloud." },
    { name: "Infrared", isHighlight: true, desc: "Heat and thermal sensing, atmospheric profiling." },
    { name: "Visible", isHighlight: true, desc: "Ordinary optical cameras, panchromatic and multispectral imaging." },
    { name: "UV", isHighlight: false, desc: "Solar radiation monitoring and stellar atmosphere studies." },
    { name: "X-ray", isHighlight: false, desc: "High-energy astrophysics and cosmic source detection." },
    { name: "Gamma", isHighlight: false, desc: "Nuclear detection, solar flare events, cosmic burst alerts." },
  ];

  const highlights = [
    { label: "Microwave", text: "talk to the ground, GPS, and radar that sees through cloud" },
    { label: "Infrared", text: "heat and thermal sensing" },
    { label: "Visible light", text: "ordinary optical cameras" },
  ];

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

      <div className="relative z-10 max-w-4xl flex flex-col text-left px-6 py-8 pointer-events-auto w-full">
        {/* Subtitle / Category */}
        <span className="font-mono text-[9px] font-bold tracking-widest text-[#FFB800] uppercase mb-2 block">
          First Principle &middot; One Wave, Many Slices
        </span>

        {/* Title */}
        <h1
          className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-2 uppercase"
          style={{ fontFamily: "Georgia, serif" }}
        >
          It is all electromagnetic waves
        </h1>

        {/* Lead text */}
        <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-6">
          A satellite just picks a slice of the spectrum to send, reflect, or listen to.
        </p>

        {/* Interactive Spectrum Slider */}
        <div className="bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 shadow-xl space-y-4 mb-6">
          {/* Horizon grid */}
          <div className="grid grid-cols-7 border border-white/10 rounded-lg overflow-hidden bg-black/40">
            {bands.map((b) => {
              const isActive = activeBand === b.name;
              return (
                <button
                  key={b.name}
                  onClick={() => setActiveBand(b.name)}
                  className={`py-4 text-[10px] font-mono font-bold uppercase transition-all border-r border-white/5 last:border-0 ${
                    isActive
                      ? "bg-[#FFB800] text-black shadow-[0_0_15px_#FFB800]"
                      : b.isHighlight
                      ? "bg-[#FFB800]/20 text-[#FFB800] hover:bg-[#FFB800]/30"
                      : "text-white/40 hover:text-white/70 bg-[#0d0d17]/40"
                  }`}
                >
                  {b.name}
                </button>
              );
            })}
          </div>

          {/* Long wave/Short wave labels */}
          <div className="flex justify-between items-center text-[8px] font-mono text-white/40 uppercase tracking-widest px-1 relative">
            <span className="flex items-center gap-1">long wave &middot; low energy</span>
            <div className="absolute left-[20%] right-[30%] top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
            <span className="flex items-center gap-1">short wave &middot; high energy &middot; more data</span>
          </div>

          {/* Dynamic description box for the selected band */}
          <div className="mt-4 pt-3 border-t border-white/[0.04] text-xs font-mono text-white/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#FFB800] font-bold uppercase">{activeBand}:</span>
              <span className="font-light text-[11px] text-white/60">
                {bands.find((b) => b.name === activeBand)?.desc}
              </span>
            </div>
            {bands.find((b) => b.name === activeBand)?.isHighlight && (
              <span className="text-[8px] uppercase tracking-widest text-[#FFB800] border border-[#FFB800]/20 px-2 py-0.5 rounded bg-[#FFB800]/5 font-bold">
                Commercial LEO Slice
              </span>
            )}
          </div>
        </div>

        {/* Detail Bullet List */}
        <div className="space-y-3 pl-1 mb-8">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3.5 text-xs">
              <span className="w-3 h-3 rounded bg-[#FFB800] mt-0.5 shadow-[0_0_6px_#FFB800] shrink-0 block" />
              <p className="text-white/80 font-light leading-relaxed">
                <strong className="text-white font-semibold uppercase tracking-wide mr-1.5">{h.label}:</strong> 
                {h.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer info line */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-mono text-white/40">
          <div>
            <span className="text-[#FFB800] font-bold">First Principles</span>
            <span className="text-white/60">Investing</span>
          </div>
          <div className="uppercase tracking-widest text-[9px] text-white/30">
            Everyone rents a lane of the same highway
          </div>
        </div>
      </div>
    </>
  );
}

const MICROWAVE_BANDS = [
  { band: "UHF", freq: "0.3-1 GHz", wave: "30-100 cm", use: "Telemetry; P-band SAR (BIOMASS)", isGold: false },
  { band: "L", freq: "1-2 GHz", wave: "15-30 cm", use: "GPS / GNSS, NISAR (NASA), mobile-sat", isGold: true },
  { band: "S", freq: "2-4 GHz", wave: "7.5-15 cm", use: "NISAR (ISRO), weather radar", isGold: true },
  { band: "C", freq: "4-8 GHz", wave: "3.75-7.5 cm", use: "Sentinel-1, RISAT / EOS-04, satcom", isGold: true },
  { band: "X", freq: "8-12 GHz", wave: "2.5-3.75 cm", use: "High-res SAR: ICEYE, Capella, TerraSAR-X", isGold: true },
  { band: "Ku", freq: "12-18 GHz", wave: "1.67-2.5 cm", use: "DTH TV, VSAT broadband", isGold: true },
  { band: "K", freq: "18-27 GHz", wave: "1.11-1.67 cm", use: "Limited: 22 GHz water absorption", isGold: false },
  { band: "Ka", freq: "27-40 GHz", wave: "7.5-11 mm", use: "HTS broadband, SWOT altimeter", isGold: true },
  { band: "V", freq: "40-75 GHz", wave: "4-7.5 mm", use: "Inter-satellite links, 5G mmwave", isGold: false },
  { band: "W", freq: "75-110 GHz", wave: "2.7-4 mm", use: "Cloud radar, research", isGold: false },
];

function SceneMicrowaveBands() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col text-left px-6 py-4 pointer-events-auto">
        <span className="font-mono text-[9px] font-bold tracking-widest text-[#FFB800] uppercase mb-1 block">
          Radar & Satellite Bands &middot; IEEE
        </span>

        <h1
          className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-1 uppercase"
          style={{ fontFamily: "Georgia, serif" }}
        >
          The microwave spectrum, band by band
        </h1>

        <p className="text-[10px] sm:text-xs text-white/50 font-light leading-relaxed mb-4">
          The radio and microwave region, ordered low to high frequency, where every comms and radar band lives.
          <span className="text-white/35 ml-1">
            Full spectrum: Radio <strong className="text-[#FFB800]">Microwave</strong> Infrared Visible Ultraviolet X-ray Gamma.
          </span>
        </p>

        {/* Bands Table */}
        <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-4 mb-4">
          <div className="overflow-y-auto max-h-[320px] scrollbar-thin">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[9px] uppercase tracking-wider sticky top-0 bg-[#0a0a14] z-10">
                  <th className="py-2 px-3">Band</th>
                  <th className="py-2 px-3">Frequency</th>
                  <th className="py-2 px-3">Wavelength</th>
                  <th className="py-2 px-3">Use (satellite / comms)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {MICROWAVE_BANDS.map((row, idx) => {
                  const isHovered = hoveredRow === idx;
                  return (
                    <tr
                      key={row.band}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`transition-colors duration-150 ${
                        isHovered ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                      }`}
                    >
                      {/* Band Badge */}
                      <td className="py-1.5 px-3">
                        <span
                          className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-center min-w-[70px] ${
                            row.isGold
                              ? "bg-[#FFB800] text-black shadow-[0_0_8px_rgba(255,184,0,0.2)]"
                              : "bg-[#222230] text-white/80"
                          }`}
                        >
                          {row.band}
                        </span>
                      </td>

                      {/* Frequency */}
                      <td className="py-1.5 px-3 text-white/95 font-medium">{row.freq}</td>

                      {/* Wavelength */}
                      <td className="py-1.5 px-3 text-white/70">{row.wave}</td>

                      {/* Comms Use */}
                      <td className="py-1.5 px-3 text-white/80 leading-relaxed font-light text-[11px]">
                        {row.use}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footnote Warning Box */}
        <div className="p-3 bg-white/[0.01] border border-white/10 rounded-xl mb-4 font-mono text-[9px] text-white/60 leading-relaxed">
          K band straddles the 22 GHz water-vapour absorption line, so engineers use Ku (K-under) below it and Ka (K-above) above it.
        </div>

        {/* Legend & Footer */}
        <div className="flex items-center justify-between text-[9px] font-mono text-white/40 mb-3 pl-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-[#FFB800] inline-block shadow-[0_0_4px_#FFB800]" />
            <span>gold = core satellite and radar bands</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-mono text-white/40">
          <div>
            <span className="text-[#FFB800] font-bold">First Principles</span>
            <span className="text-white/60">Investing</span>
          </div>
          <div className="uppercase tracking-widest text-[9px] text-white/30">
            IEEE radar band letters
          </div>
        </div>
      </div>
    </>
  );
}

// 2. WHAT IS A SATELLITE (ORBIT BALLISTICS)
const HIGH_END_BANDS = [
  { region: "EHF (Q/V)", freq: "27-75 GHz", wave: "4-11 mm", use: "Protected military SATCOM (AEHF)", isGold: true },
  { region: "W band", freq: "75-110 GHz", wave: "2.7-4 mm", use: "Cloud and precipitation radar", isGold: false },
  { region: "Sub-mm (G)", freq: "0.1-0.3 THz", wave: "1-3 mm", use: "Concealed-object security imaging", isGold: false },
  { region: "Terahertz", freq: "0.3-10 THz", wave: "30-1000 um", use: "Emerging sensing and spectroscopy", isGold: false },
  { region: "Infrared", freq: "20-400 THz", wave: "0.75-15 um", use: "Missile-warning, night/thermal recon", isGold: true },
  { region: "Laser comms", freq: "193 THz", wave: "1.55 um", use: "Secure high-data inter-satellite links", isGold: true },
  { region: "Visible / EO", freq: "400-770 THz", wave: "0.4-0.7 um", use: "Electro-optical spy imaging (KH-11 class)", isGold: true },
  { region: "Ultraviolet", freq: "0.8-30 PHz", wave: "10-400 nm", use: "Plume detection, space science", isGold: false },
];

function SceneHighEndBands() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-grid-pattern opacity-[0.02]"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col text-left px-6 py-6 pointer-events-auto">
        <span className="font-mono text-[9px] font-bold tracking-widest text-[#FFB800] uppercase mb-1.5 block">
          Beyond the Workhorse Bands &middot; High-End & Recon
        </span>

        <h1
          className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-1.5 uppercase"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Where the spies and the heavy data live
        </h1>

        <p className="text-xs text-white/50 font-light leading-relaxed mb-5">
          Climbing past Ka into protected comms, imaging, and light itself. Figures approximate.
        </p>

        {/* Bands Table */}
        <div className="bg-[#0a0a14]/70 border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-4 mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[9px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3">Frequency</th>
                  <th className="py-2.5 px-3">Wavelength</th>
                  <th className="py-2.5 px-3">High-end / reconnaissance use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {HIGH_END_BANDS.map((row, idx) => {
                  const isHovered = hoveredRow === idx;
                  return (
                    <tr
                      key={row.region}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`transition-colors duration-150 ${
                        isHovered ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                      }`}
                    >
                      {/* Region Badge */}
                      <td className="py-2 px-3">
                        <span
                          className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-center min-w-[90px] ${
                            row.isGold
                              ? "bg-[#FFB800] text-black shadow-[0_0_8px_rgba(255,184,0,0.2)]"
                              : "bg-[#222230] text-white/80"
                          }`}
                        >
                          {row.region}
                        </span>
                      </td>

                      {/* Frequency */}
                      <td className="py-2 px-3 text-white/95 font-medium">{row.freq}</td>

                      {/* Wavelength */}
                      <td className="py-2 px-3 text-white/70">{row.wave}</td>

                      {/* Recon Use */}
                      <td className="py-2 px-3 text-white/80 leading-relaxed font-light">
                        {row.use}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIGINT Highlight Box */}
        <div className="p-3 bg-[#FFB800]/[0.01] border border-[#FFB800]/20 rounded-xl mb-4 font-mono text-[10px] text-white/80 leading-relaxed">
          <strong className="text-[#FFB800] uppercase font-bold mr-2">SIGINT:</strong>
          recon satellites also listen across HF to Ka, collecting other people&apos;s signals rather than transmitting.
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[9px] font-mono text-white/40 mb-6 pl-1">
          <span className="w-2.5 h-2.5 rounded bg-[#FFB800] inline-block shadow-[0_0_4px_#FFB800]" />
          <span>gold = core reconnaissance and high-end bands</span>
        </div>

        {/* Footer info line */}
        <div className="border-t border-white/10 pt-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-mono text-white/40">
          <div>
            <span className="text-[#FFB800] font-bold">First Principles</span>
            <span className="text-white/60">Investing</span>
          </div>
          <div className="uppercase tracking-widest text-[9px] text-white/30">
            Recon spans the whole spectrum: RF to light
          </div>
        </div>
      </div>
    </>
  );
}

// 3. MEET THE SATELLITE (EXPLODED ANATOMY)

// 3. MEET THE SATELLITE (EXPLODED ANATOMY)
const SUBSYSTEM_BACKGROUNDS = {
  bus: "/sat_sub_bus.png",
  payload: "/sat_sub_payload.png",
  solar: "/sat_sub_solar.png",
  battery: "/sat_sub_battery.png",
  antenna: "/sat_sub_antenna.png",
  wheels: "/sat_sub_wheels.png",
  propulsion: "/sat_sub_propulsion.png",
  thermal: "/sat_sub_thermal.png",
};

function SatelliteBusGlow() {
  return (
    <motion.div
      animate={{
        opacity: [0.1, 0.25, 0.12, 0.3, 0.15]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-screen"
      style={{
        background: "radial-gradient(circle at 40% 50%, rgba(255,184,0,0.15) 0%, transparent 50%)"
      }}
    />
  );
}

function PayloadScanLines() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute left-0 w-full h-[2px] bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
      />
    </div>
  );
}

function SolarArraySunGleam() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.18, 0.35, 0.15]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 mix-blend-color-dodge"
        style={{
          background: "radial-gradient(circle at 10% 20%, rgba(255,200,100,0.2) 0%, transparent 60%)"
        }}
      />
    </div>
  );
}

function BatteryPowerFlow() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {[...Array(6)].map((_, i) => {
        const initialX = 30 + Math.random() * 20;
        const initialY = 40 + Math.random() * 20;
        const delay = Math.random() * 3;
        const duration = 1 + Math.random() * 2;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${initialX}%`,
              y: `${initialY}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1.5 h-1.5 bg-sky-400 rounded-full blur-[0.5px]"
            style={{
              boxShadow: "0 0 6px rgba(56,189,248,0.6)"
            }}
          />
        );
      })}
    </div>
  );
}

function AntennaPulseBeams() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {[...Array(3)].map((_, i) => {
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 4,
              delay: i * 1.3,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute rounded-full border border-amber-400/20 mix-blend-screen"
            style={{
              width: "300px",
              height: "300px",
              left: "30%",
              top: "40%",
              transform: "translate(-50%, -50%)"
            }}
          />
        );
      })}
    </div>
  );
}

function ReactionWheelSpins() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 mix-blend-overlay">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute border border-white/5 rounded-full"
        style={{
          width: "120px",
          height: "120px",
          left: "45%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />
    </div>
  );
}

function ThrusterPlumes() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 mix-blend-color-dodge">
      {[...Array(2)].map((_, i) => {
        const isUpper = i === 0;
        return (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.4, 0.15, 0.35, 0.1],
              scaleY: [0.8, 1.2, 0.9, 1.1, 0.8]
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bg-gradient-to-t from-sky-400/30 to-transparent blur-[2px]"
            style={{
              width: "15px",
              height: "50px",
              left: isUpper ? "32%" : "35%",
              top: isUpper ? "42%" : "55%",
              transform: `rotate(${isUpper ? 45 : 135}deg)`,
              transformOrigin: "top center"
            }}
          />
        );
      })}
    </div>
  );
}

function ThermalSpaceDust() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {[...Array(8)].map((_, i) => {
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = 20 + Math.random() * 20;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${initialX}vw`,
              y: `${initialY}vh`,
              opacity: 0.05,
              scale: 0.5,
               }}
            animate={{
              y: [`${initialY}vh`, `${initialY - (10 + Math.random() * 10)}vh`],
              opacity: [0.05, 0.25, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bg-[#FFB800]/40 rounded-full"
            style={{
              width: "2px",
              height: "2px",
              boxShadow: "0 0 3px rgba(255,184,0,0.3)"
            }}
          />
        );
      })}
    </div>
  );
}

function SubsystemBackgrounds({ activeId }: { activeId: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none bg-[#030308]">
      {Object.entries(SUBSYSTEM_BACKGROUNDS).map(([id, bg]) => {
        const active = id === activeId;
        
        let motionAnimate = {};
        let motionTransition = {};
        
        if (id === "bus") {
          motionAnimate = {
            scale: [1.02, 1.04, 1.02],
            rotate: [0, 0.3, 0],
            x: [0, 2, 0],
            y: [0, -2, 0]
          };
          motionTransition = {
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (id === "payload") {
          motionAnimate = {
            scale: [1.02, 1.04, 1.02],
            x: [0, -3, 0],
            y: [0, 3, 0]
          };
          motionTransition = {
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (id === "solar") {
          motionAnimate = {
            scale: [1.01, 1.03, 1.01],
            x: [0, 3, 0],
            y: [0, -2, 0]
          };
          motionTransition = {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (id === "battery") {
          motionAnimate = {
            scale: [1.02, 1.04, 1.02],
            x: [0, 2, 0],
            y: [0, 2, 0]
          };
          motionTransition = {
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (id === "antenna") {
          motionAnimate = {
            scale: [1.02, 1.04, 1.02],
            rotate: [0, 0.2, 0],
            y: [0, -4, 0]
          };
          motionTransition = {
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (id === "wheels") {
          motionAnimate = {
            scale: [1.01, 1.03, 1.01],
            x: [0, -2, 0],
            y: [0, 2, 0]
          };
          motionTransition = {
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (id === "propulsion") {
          motionAnimate = {
            scale: [1.02, 1.04, 1.02],
            x: [0, -4, 0],
            y: [0, 3, 0]
          };
          motionTransition = {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          };
        } else if (id === "thermal") {
          motionAnimate = {
            scale: [1.01, 1.03, 1.01],
            rotate: [0, -0.3, 0.3, 0],
            x: [0, 3, -3, 0]
          };
          motionTransition = {
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          };
        }

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: active ? 1 : 0,
            }}
            transition={{
              duration: 1.0,
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
                alt={`Satellite Part ${id}`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {active && id === "bus" && <SatelliteBusGlow />}
            {active && id === "payload" && <PayloadScanLines />}
            {active && id === "solar" && <SolarArraySunGleam />}
            {active && id === "battery" && <BatteryPowerFlow />}
            {active && id === "antenna" && <AntennaPulseBeams />}
            {active && id === "wheels" && <ReactionWheelSpins />}
            {active && id === "propulsion" && <ThrusterPlumes />}
            {active && id === "thermal" && <ThermalSpaceDust />}
          </motion.div>
        );
      })}

      {/* Dark overlay between 70–75% for text contrast */}
      <div className="absolute inset-0 bg-[#030308]/72 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/65 via-transparent to-[#030308]/85 pointer-events-none" />
    </div>
  );
}

function Scene2MeetTheSatellite() {
  const [activeId, setActiveId] = useState("bus");
  const selected = SATELLITE_PARTS.find((p) => p.id === activeId) || SATELLITE_PARTS[0];

  useEffect(() => {
    const images = Object.values(SUBSYSTEM_BACKGROUNDS);
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <SubsystemBackgrounds activeId={activeId} />

      {/* Content Container (aligned to SLIDE_BASE style) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col items-center justify-center">
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
      </div>
    </>
  );
}

// 4. BUS VS PAYLOAD
const SATELLITE_SYSTEMS = [
  { id: "sat", name: "Satellite", sub: "payload + bus", type: "system", fill: "#27272a", stroke: "#52525b", text: "#ffffff", desc: "The integrated spacecraft combining the mission payload instruments and the host platform bus.", highlights: "Primary integration of systems" },
  { id: "payload", name: "Payload", sub: "the mission", type: "division", fill: "#3b338a", stroke: "#6366f1", text: "#ffffff", desc: "The operational instrument suite (imaging, communications, radar) that executes the spacecraft's primary commercial or scientific mission.", highlights: "Generates mission value & data" },
  { id: "bus", name: "Bus / platform", sub: "supports payload", type: "division", fill: "#2d2d39", stroke: "#71717a", text: "#ffffff", desc: "The engineering chassis that houses all host subsystems, keeping the payload operational and maintaining orbital position.", highlights: "Housekeeping, power & navigation" },
  
  // Payloads
  { id: "optical", name: "Optical / imaging", type: "payload-sub", fill: "#1e1b4b", stroke: "#4338ca", text: "#ddd6fe", desc: "Optical telescopes, panchromatic cameras, and multispectral scanners that capture visible light and infrared imagery.", highlights: "Used by: Cartosat, KH-11 spies" },
  { id: "comms", name: "Comms — transponders", type: "payload-sub", fill: "#1e1b4b", stroke: "#4338ca", text: "#ddd6fe", desc: "Radio frequency repeaters and amplifiers that receive signals from Earth and retransmit them (TV broadcast, satellite internet).", highlights: "Used by: GSAT series, Starlink" },
  { id: "radar", name: "Radar & sensors", type: "payload-sub", fill: "#1e1b4b", stroke: "#4338ca", text: "#ddd6fe", desc: "Active microwave transceivers (like Synthetic Aperture Radar) and passive radiometers that measure Earth's surface characteristics through clouds.", highlights: "Used by: RISAT, NISAR (NASA-ISRO)" },
  
  // Bus Struct/Prop
  { id: "structure", name: "Structure & mechanisms", type: "bus-struct", fill: "#78350f", stroke: "#b45309", text: "#fef3c7", desc: "The mechanical skeletal frame, launch vehicle adapters, and deployable booms/hinges supporting solar panels and antennas.", highlights: "Aluminum alloys, carbon composite" },
  { id: "thermal", name: "Thermal control", type: "bus-struct", fill: "#78350f", stroke: "#b45309", text: "#fef3c7", desc: "Radiative louvers, heat pipes, multi-layer insulation (MLI) blankets, and heaters that keep instruments within safe operational temperatures.", highlights: "Survives +120°C sun to -150°C eclipse" },
  { id: "propulsion", name: "Propulsion", type: "bus-struct", fill: "#78350f", stroke: "#b45309", text: "#fef3c7", desc: "Hydrazine monopropellant thrusters or electric ion propulsion systems used for stationkeeping, orbit raising, and collision avoidance.", highlights: "Chemical monopropellant / Ion hall thruster" },
  
  // Bus Avionics
  { id: "power", name: "Electrical power", type: "bus-avionics", fill: "#064e3b", stroke: "#059669", text: "#d1fae5", desc: "Solar array wings, lithium-ion battery cells, and power conditioning units (PCU) that distribute electrical power to the satellite.", highlights: "Triple-junction solar cells, battery blocks" },
  { id: "attitude", name: "Attitude control (ADCS)", type: "bus-avionics", fill: "#064e3b", stroke: "#059669", text: "#d1fae5", desc: "Star trackers, sun sensors, gyroscopes, reaction wheels, and magnetorquers that orient the satellite and point sensors precisely.", highlights: "Arcsecond-level pointing stability" },
  { id: "computer", name: "On-board computer", type: "bus-avionics", fill: "#064e3b", stroke: "#059669", text: "#d1fae5", desc: "The central processor (OBC) running flight software, managing command execution, data storage, and autonomous fault recovery.", highlights: "Radiation-hardened processors, memory" },
  { id: "telemetry", name: "Telemetry & command", type: "bus-avionics", fill: "#064e3b", stroke: "#059669", text: "#d1fae5", desc: "S-band or X-band receivers and transmitters that receive uplinked ground commands and send downlink status diagnostics.", highlights: "Ground telemetry, tracking & command (TT&C)" },
];

function Scene3BusVsPayload() {
  const [activeId, setActiveId] = useState<string>("sat");

  const currentSystem = SATELLITE_SYSTEMS.find((s) => s.id === activeId) || SATELLITE_SYSTEMS[0];

  // Node rendering positions
  const getPos = (id: string) => {
    switch (id) {
      case "sat": return { x: 55, y: 155 };
      case "payload": return { x: 185, y: 75 };
      case "bus": return { x: 185, y: 220 };
      
      // Payloads
      case "optical": return { x: 335, y: 35 };
      case "comms": return { x: 335, y: 75 };
      case "radar": return { x: 335, y: 115 };
      
      // Bus structural
      case "structure": return { x: 335, y: 150 };
      case "thermal": return { x: 335, y: 178 };
      case "propulsion": return { x: 335, y: 206 };
      
      // Bus avionics
      case "power": return { x: 335, y: 234 };
      case "attitude": return { x: 335, y: 262 };
      case "computer": return { x: 335, y: 290 };
      case "telemetry": return { x: 335, y: 318 };
      default: return { x: 0, y: 0 };
    }
  };

  // Dimensions
  const nodeW = { root: 95, div: 100, sub: 150 };
  const nodeH = { root: 28, div: 28, sub: 21 };

  return (
    <>
      <SceneHeading sub="03. Core Division" main="Satellite Bus vs Payload" />

      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-left pointer-events-auto">
        {/* Left Column: Interactive Node Tree SVG */}
        <div className="lg:col-span-7 bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-4 shadow-2xl relative">
          <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-2 text-right pr-2">
            Click nodes to explore subsystems
          </span>

          <div className="relative w-full overflow-x-auto">
            <svg viewBox="0 0 500 350" className="w-[500px] h-[350px] mx-auto block">
              {/* CONNECTING PATHS (BEZIERS) */}
              {/* Sat -> Payload */}
              <path
                d="M 150 155 C 165 155, 170 75, 185 75"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />
              {/* Sat -> Bus */}
              <path
                d="M 150 155 C 165 155, 170 220, 185 220"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />

              {/* Payload -> Sub subsystems */}
              {["optical", "comms", "radar"].map((id) => (
                <path
                  key={id}
                  d={`M 285 75 C 305 75, 315 ${getPos(id).y}, 335 ${getPos(id).y}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1.2"
                />
              ))}

              {/* Bus -> Sub subsystems */}
              {["structure", "thermal", "propulsion", "power", "attitude", "computer", "telemetry"].map((id) => (
                <path
                  key={id}
                  d={`M 285 220 C 305 220, 315 ${getPos(id).y}, 335 ${getPos(id).y}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1.2"
                />
              ))}

              {/* DRAW NODES */}
              {SATELLITE_SYSTEMS.map((sys) => {
                const pos = getPos(sys.id);
                const isRoot = sys.type === "system";
                const isDiv = sys.type === "division";
                const isActive = activeId === sys.id;
                const width = isRoot ? nodeW.root : isDiv ? nodeW.div : nodeW.sub;
                const height = isRoot ? nodeH.root : isDiv ? nodeH.div : nodeH.sub;

                // Adjust positioning to center-align box on coordinates
                const boxX = pos.x;
                const boxY = pos.y - height / 2;

                return (
                  <g
                    key={sys.id}
                    className="cursor-pointer group"
                    onClick={() => setActiveId(sys.id)}
                  >
                    {/* Glow outline on hover/active */}
                    <rect
                      x={boxX - 2}
                      y={boxY - 2}
                      width={width + 4}
                      height={height + 4}
                      rx={6}
                      fill="none"
                      stroke={isActive ? "#FFB800" : "rgba(255,255,255,0.15)"}
                      strokeWidth={isActive ? 2 : 0}
                      className="group-hover:stroke-white/30 transition-all"
                    />

                    {/* Main Node Box */}
                    <rect
                      x={boxX}
                      y={boxY}
                      width={width}
                      height={height}
                      rx={4}
                      fill={sys.fill}
                      stroke={sys.stroke}
                      strokeWidth="1"
                      className="transition-colors"
                    />

                    {/* Node Text */}
                    <text
                      x={boxX + width / 2}
                      y={boxY + height / 2 + (sys.sub ? -3 : 3)}
                      textAnchor="middle"
                      fill={sys.text}
                      className="font-sans font-bold text-[9px] pointer-events-none"
                    >
                      {sys.name}
                    </text>

                    {sys.sub && (
                      <text
                        x={boxX + width / 2}
                        y={boxY + height / 2 + 7}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.4)"
                        className="font-sans text-[7px] pointer-events-none"
                      >
                        {sys.sub}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend row */}
          <div className="flex justify-center items-center gap-6 border-t border-white/5 pt-3.5 mt-2 font-mono text-[8px] text-white/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#312e81] inline-block" />
              <span>Payload</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#78350f] inline-block" />
              <span>Structural / Propulsion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#064e3b] inline-block" />
              <span>Avionics / Electronics</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Detail Card */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0a0a14]/60 border border-white/5 rounded-2xl p-6 shadow-2xl relative min-h-[350px]">
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB800] block mb-1 font-bold">
                {currentSystem.type.replace("-", " ")} definition
              </span>
              <h3 className="text-xl font-bold text-white leading-tight font-serif uppercase tracking-wide">
                {currentSystem.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              {currentSystem.desc}
            </p>
          </div>

          <div className="space-y-3.5 border-t border-white/5 pt-4 mt-4">
            <div className="p-3 bg-white/[0.01] border border-white/10 rounded-xl space-y-1">
              <span className="font-mono text-[8px] text-[#FFB800] uppercase font-bold tracking-widest block">
                Engineering Insight
              </span>
              <p className="text-[11px] font-mono text-white/80 leading-relaxed">
                {currentSystem.highlights}
              </p>
            </div>

            <p className="text-[10px] text-white/40 leading-relaxed italic">
              * Click on different boxes in the diagram to inspect their system parameters and functions.
            </p>
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
const SENSOR_BACKGROUNDS = [
  "/sat_spec_optical.png",
  "/sat_spec_multispectral.png",
  "/sat_spec_thermal.png",
  "/sat_spec_sar.png"
];

function OpticalAtmosphericHaze() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {[...Array(6)].map((_, i) => {
        const initialX = Math.random() * 100;
        const duration = 20 + Math.random() * 25;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${initialX}vw`,
              y: "110vh",
              opacity: 0.05,
              scale: 0.8,
            }}
            animate={{
              y: ["110vh", "-10vh"],
              opacity: [0.05, 0.15, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bg-white/20 rounded-full blur-[2px]"
            style={{
              width: "8px",
              height: "8px"
            }}
          />
        );
      })}
    </div>
  );
}

function SpectralGridOverlay() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 opacity-20">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />
    </div>
  );
}

function ThermalHeatFlicker() {
  return (
    <motion.div
      animate={{
        opacity: [0.1, 0.25, 0.15, 0.3, 0.1]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-color-dodge"
      style={{
        background: "radial-gradient(circle at 75% 65%, rgba(239,68,68,0.12) 0%, transparent 60%)"
      }}
    />
  );
}

function RadarWavesRipple() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {[...Array(2)].map((_, i) => {
        return (
          <motion.div
            key={i}
            initial={{ scale: 0.1, opacity: 0.4 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 6,
              delay: i * 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full border border-sky-400/10 mix-blend-color-dodge"
            style={{
              width: "500px",
              height: "500px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        );
      })}
    </div>
  );
}

function SensorBackgrounds({ activeIdx }: { activeIdx: number }) {
  let gradientOverlay = "";
  
  if (activeIdx === 0) {
    gradientOverlay = "radial-gradient(circle at center, rgba(3,3,8,0.65) 0%, rgba(3,3,8,0.85) 90%), linear-gradient(to bottom, rgba(56,189,248,0.03), rgba(34,197,94,0.02))";
  } else if (activeIdx === 1) {
    gradientOverlay = "radial-gradient(circle at center, rgba(3,3,8,0.7) 0%, rgba(3,3,8,0.88) 95%), linear-gradient(to bottom, rgba(16,185,129,0.06), rgba(6,182,212,0.04))";
  } else if (activeIdx === 2) {
    gradientOverlay = "radial-gradient(circle at center, rgba(3,3,8,0.72) 0%, rgba(3,3,8,0.92) 100%), linear-gradient(to bottom, rgba(239,68,68,0.05), rgba(249,115,22,0.04))";
  } else if (activeIdx === 3) {
    gradientOverlay = "radial-gradient(circle at center, rgba(3,3,8,0.7) 0%, rgba(3,3,8,0.9) 95%), linear-gradient(to bottom, rgba(99,102,241,0.05), rgba(100,116,139,0.05))";
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none bg-[#030308]">
      {SENSOR_BACKGROUNDS.map((bg, idx) => {
        const active = idx === activeIdx;

        const motionAnimate = active ? {
          scale: [1.02, 1.04, 1.02],
          x: idx % 2 === 0 ? [0, 4, 0] : [0, -4, 0],
          y: idx % 2 === 0 ? [0, -2, 0] : [0, 2, 0],
        } : {};

        return (
          <motion.div
            key={bg}
            initial={{ opacity: 0 }}
            animate={{
              opacity: active ? 1 : 0,
            }}
            transition={{
              duration: 1.0,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              animate={motionAnimate}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={bg}
                alt={`Sensor Background ${idx}`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {active && idx === 0 && <OpticalAtmosphericHaze />}
            {active && idx === 1 && <SpectralGridOverlay />}
            {active && idx === 2 && <ThermalHeatFlicker />}
            {active && idx === 3 && <RadarWavesRipple />}
          </motion.div>
        );
      })}

      <div 
        className="absolute inset-0 transition-all duration-1000 pointer-events-none"
        style={{
          background: gradientOverlay,
        }}
      />
      <div className="absolute inset-0 bg-[#030308]/40 pointer-events-none mix-blend-multiply" />
    </div>
  );
}

function Scene5FamilyOfSensors() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    SENSOR_BACKGROUNDS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <SensorBackgrounds activeIdx={activeIdx} />

      {/* Content Container (aligned to SLIDE_BASE style) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col items-center justify-center">
        <SceneHeading sub="05. The Sensor Suite" main="Earth Observation Spectrum" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl">
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
function Scene13Thesis({ presentationActive = false }: { presentationActive?: boolean }) {
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
        className={`font-light tracking-wide leading-tight text-white max-w-3xl relative z-10 ${
          presentationActive
            ? "mb-4 text-2xl sm:text-3xl lg:text-4xl"
            : "mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl"
        }`}
        style={{ fontFamily: "Georgia, serif" }}
      >
        A Satellite Doesn&apos;t Just Observe Earth. It Learns To Measure It.
      </h2>

      <p className={`text-xs sm:text-sm text-white/65 max-w-2xl leading-relaxed font-light relative z-10 ${
        presentationActive ? "mb-4" : "mb-6 sm:mb-8"
      }`}>
        Every satellite is a carefully engineered balance of power, precision, communication, guidance and sensing. The mission determines the signal, the signal determines the payload, and the payload determines how humanity understands our planet.
      </p>

      {!presentationActive && (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10">
            <ChapterNavButton
              href="/chapters/launch-vehicles"
              label="Back to Rocket Engineering"
              variant="ghost"
              direction="back"
            />
            <ChapterNavButton
              href="/chapters/private-ecosystem"
              label="Continue. Private Ecosystem"
              variant="primary"
              direction="forward"
            />
          </div>

          <div className="flex flex-col items-center gap-3 mt-6">
            <Link
              href="/"
              className="interactive-control inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/45 hover:text-[#FFB800] transition-colors relative z-10 cursor-pointer font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Main Deck
            </Link>

            <Link
              href="/case-studies"
              className="interactive-control inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/45 hover:text-[#FFB800] transition-colors relative z-10 cursor-pointer font-bold"
            >
              Browse Chapter Case Studies
              <ArrowRight className="w-3.5 h-3.5" />
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

export default function SatellitesPage() {
  const p = usePresentation(TOTAL_FRAMES);
  const { progress, presentationActive, currentFrameIndex, containerRef } = p;

  // Scroll transforms for 16 frames
  const SEG = 1 / TOTAL_FRAMES;
  const FADE_IN = 0.25 * SEG;
  const FADE_HOLD = 0.35 * SEG;
  const fr = (i: number) => [i * SEG - FADE_IN, i * SEG, (i + 1) * SEG - FADE_HOLD, (i + 1) * SEG];
  const FADE = [0, 1, 1, 0];
  const RISE = [24, 0, 0, -24];

  const s0SplashOpacity = useTransform(progress, [0.0, 0.04, SEG], [1, 1, 0]);
  const s0SplashScale = useTransform(progress, [0.0, SEG], [1, 0.96]);

  const s0Opacity = useTransform(progress, [0.045, SEG, 2 * SEG - FADE_HOLD, 2 * SEG], FADE);
  const s0Scale = useTransform(progress, [0.045, 2 * SEG], [1, 0.96]);

  const s1Opacity = useTransform(progress, fr(2), FADE);
  const s1Y = useTransform(progress, fr(2), RISE);

  const s2Opacity = useTransform(progress, fr(3), FADE);
  const s2Y = useTransform(progress, fr(3), RISE);

  const s3Opacity = useTransform(progress, fr(4), FADE);
  const s3Y = useTransform(progress, fr(4), RISE);

  const s4Opacity = useTransform(progress, fr(5), FADE);
  const s4Y = useTransform(progress, fr(5), RISE);

  const s5Opacity = useTransform(progress, fr(6), FADE);
  const s5Y = useTransform(progress, fr(6), RISE);

  const s6Opacity = useTransform(progress, fr(7), FADE);
  const s6Y = useTransform(progress, fr(7), RISE);

  const s7Opacity = useTransform(progress, fr(8), FADE);
  const s7Y = useTransform(progress, fr(8), RISE);

  const s8Opacity = useTransform(progress, fr(9), FADE);
  const s8Y = useTransform(progress, fr(9), RISE);

  const s9Opacity = useTransform(progress, fr(10), FADE);
  const s9Y = useTransform(progress, fr(10), RISE);

  const s10Opacity = useTransform(progress, fr(11), FADE);
  const s10Y = useTransform(progress, fr(11), RISE);

  const s11Opacity = useTransform(progress, fr(12), FADE);
  const s11Y = useTransform(progress, fr(12), RISE);

  const s12Opacity = useTransform(progress, fr(13), FADE);
  const s12Y = useTransform(progress, fr(13), RISE);

  const s13Opacity = useTransform(progress, fr(14), FADE);
  const s13Y = useTransform(progress, fr(14), RISE);

  const s14Opacity = useTransform(progress, [15 * SEG - FADE_IN, 15 * SEG, 1.0], [0, 1, 1]);
  const s14Y = useTransform(progress, [15 * SEG - FADE_IN, 15 * SEG, 1.0], [24, 0, 0]);

  return (
    <div className="min-h-screen bg-[#030308] text-white font-sans selection:bg-[#FFB800] selection:text-[#030308] relative">
      <Navbar />
      <PresentationChrome controller={p} scenes={SATELLITES_SCENES} />

      {/* Scroll track + sticky viewport */}
      <div ref={containerRef} className="relative w-full h-[1600vh] bg-[#030308]">
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
                className={`${[0, 6, 7].includes(currentFrameIndex) ? "absolute inset-0 w-full h-full z-10 pointer-events-auto" : SLIDE_BASE} text-center pointer-events-auto`}
              >
                {currentFrameIndex === 0 && <Scene0Splash presentationActive />}
                {currentFrameIndex === 1 && <Scene0Hero presentationActive />}
                {currentFrameIndex === 2 && <SceneMicrowaveBands />}
                {currentFrameIndex === 3 && <Scene4FirstPrinciple />}
                {currentFrameIndex === 4 && <SceneHighEndBands />}
                {currentFrameIndex === 5 && <Scene3BusVsPayload />}
                {currentFrameIndex === 6 && <Scene2MeetTheSatellite />}
                {currentFrameIndex === 7 && <Scene5FamilyOfSensors />}
                {currentFrameIndex === 8 && <Scene6OwlAndBat />}
                {currentFrameIndex === 9 && <Scene7HowRadarWorks />}
                {currentFrameIndex === 10 && <Scene8SyntheticApertureRadar />}
                {currentFrameIndex === 11 && <Scene9MissionConfig />}
                {currentFrameIndex === 12 && <Scene10NISAR />}
                {currentFrameIndex === 13 && <Scene11InsideRadarPayload />}
                {currentFrameIndex === 14 && <Scene12IndianEcosystem />}
                {currentFrameIndex === 15 && <Scene13Thesis presentationActive />}
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
                <SceneMicrowaveBands />
              </motion.div>

              <motion.div
                style={{ opacity: s2Opacity, y: s2Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene4FirstPrinciple />
              </motion.div>

              <motion.div
                style={{ opacity: s3Opacity, y: s3Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 4 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <SceneHighEndBands />
              </motion.div>

              <motion.div
                style={{ opacity: s4Opacity, y: s4Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 5 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene3BusVsPayload />
              </motion.div>

              <motion.div
                style={{ opacity: s5Opacity, y: s5Y }}
                className={`absolute inset-0 w-full h-full z-10 text-center ${
                  currentFrameIndex === 6 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene2MeetTheSatellite />
              </motion.div>

              <motion.div
                style={{ opacity: s6Opacity, y: s6Y }}
                className={`absolute inset-0 w-full h-full z-10 text-center ${
                  currentFrameIndex === 7 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene5FamilyOfSensors />
              </motion.div>

              <motion.div
                style={{ opacity: s7Opacity, y: s7Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 8 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene6OwlAndBat />
              </motion.div>

              <motion.div
                style={{ opacity: s8Opacity, y: s8Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 9 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene7HowRadarWorks />
              </motion.div>

              <motion.div
                style={{ opacity: s9Opacity, y: s9Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 10 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene8SyntheticApertureRadar />
              </motion.div>

              <motion.div
                style={{ opacity: s10Opacity, y: s10Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 11 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene9MissionConfig />
              </motion.div>

              <motion.div
                style={{ opacity: s11Opacity, y: s11Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 12 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene10NISAR />
              </motion.div>

              <motion.div
                style={{ opacity: s12Opacity, y: s12Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 13 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene11InsideRadarPayload />
              </motion.div>

              <motion.div
                style={{ opacity: s13Opacity, y: s13Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 14 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene12IndianEcosystem />
              </motion.div>

              <motion.div
                style={{ opacity: s14Opacity, y: s14Y }}
                className={`${SLIDE_BASE} text-center ${
                  currentFrameIndex === 15 ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Scene13Thesis presentationActive={false} />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

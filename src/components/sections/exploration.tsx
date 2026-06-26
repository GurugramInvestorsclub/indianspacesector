"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, animate } from "motion/react";
import { Target, Calendar, Globe, Cpu, Activity, Info } from "lucide-react";

interface MissionEvent {
  year: string;
  name: string;
  status: "SUCCESS" | "ORBITER ACTIVE" | "HISTORICAL" | "ACTIVE";
  desc: string;
}

interface TelemetryRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface SectionProps {
  presentationActive?: boolean;
  currentFrameIndex?: number;
}

export function Exploration({ presentationActive = false, currentFrameIndex = 0 }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useMotionValue(0);

  useEffect(() => {
    if (presentationActive) {
      let p = 0;
      if (currentFrameIndex === 26) p = 0.0;
      else if (currentFrameIndex === 27) p = 0.15;
      else if (currentFrameIndex === 28) p = 0.49;
      else if (currentFrameIndex === 29) p = 0.83;
      else if (currentFrameIndex < 26) p = 0.0;
      else p = 1.0;

      const controls = animate(progress, p, { duration: 0.6, ease: [0.25, 1, 0.5, 1] });
      return () => controls.stop();
    } else {
      progress.set(scrollYProgress.get());
      return scrollYProgress.onChange((latest) => {
        progress.set(latest);
      });
    }
  }, [presentationActive, currentFrameIndex, scrollYProgress, progress]);

  // -------------------------------------------------------------
  // Act 1: The Moon (Scroll 0.00 to 0.33)
  // -------------------------------------------------------------
  const moonBgOpacity = useTransform(progress, [0.0, 0.31, 0.33], [0.85, 0.85, 0]);
  const moonScale = useTransform(progress, [0.0, 0.33], [1.02, 0.98]);
  const moonTextOpacity = useTransform(progress, [0.0, 0.02, 0.31, 0.33], [0, 1, 1, 0]);
  const moonTextY = useTransform(progress, [0.0, 0.02, 0.31, 0.33], [20, 0, 0, -20]);
  const moonOrbitRotate = useTransform(progress, [0.0, 0.33], [0, 45]);

  // -------------------------------------------------------------
  // Act 2: Mars (Scroll 0.33 to 0.66)
  // -------------------------------------------------------------
  const marsBgOpacity = useTransform(progress, [0.31, 0.33, 0.64, 0.66], [0, 0.85, 0.85, 0]);
  const marsScale = useTransform(progress, [0.31, 0.66], [1.04, 0.98]);
  const marsTextOpacity = useTransform(progress, [0.33, 0.35, 0.64, 0.66], [0, 1, 1, 0]);
  const marsTextY = useTransform(progress, [0.33, 0.35, 0.64, 0.66], [20, 0, 0, -20]);
  const marsOrbitRotate = useTransform(progress, [0.31, 0.66], [-15, 30]);

  // -------------------------------------------------------------
  // Act 3: The Sun (Scroll 0.66 to 1.00)
  // -------------------------------------------------------------
  const sunBgOpacity = useTransform(progress, [0.64, 0.66, 0.98, 1.0], [0, 0.85, 0.85, 0]);
  const sunScale = useTransform(progress, [0.64, 1.0], [1.04, 0.98]);
  const sunTextOpacity = useTransform(progress, [0.66, 0.68, 0.98, 1.0], [0, 1, 1, 0]);
  const sunTextY = useTransform(progress, [0.66, 0.68, 0.98, 1.0], [20, 0, 0, -20]);
  const sunOrbitRotate = useTransform(progress, [0.64, 1.0], [0, 60]);

  // Mission Datasets
  const moonMissions: MissionEvent[] = [
    { year: "2008", name: "Chandrayaan-1", status: "HISTORICAL", desc: "India's first lunar probe. Discovered water molecules (H2O and OH) on the lunar surface, changing global lunar science." },
    { year: "2019", name: "Chandrayaan-2", status: "ORBITER ACTIVE", desc: "Successfully deployed a high-resolution orbiter (0.3m resolution) which remains operational today, mapping craters and minerals." },
    { year: "2023", name: "Chandrayaan-3", status: "SUCCESS", desc: "Historic landing at Shiv Shakti Point near the lunar South Pole on August 23. Confirmed sulfur and analyzed soil temperature in-situ." }
  ];

  const moonTelemetry: TelemetryRow[] = [
    { label: "Landing Coordinates", value: "69.37° S, 32.35° E", highlight: true },
    { label: "Landing Zone Name", value: "Shiv Shakti Point" },
    { label: "Water Molecule Search", value: "Confirmed (Ch-1 Spectral Map)" },
    { label: "Thermal Analysis", value: "In-situ (ChaSTE Probe)" },
    { label: "Rover Payload", value: "APXS & LIBS Active" }
  ];

  const marsMissions: MissionEvent[] = [
    { year: "2013", name: "Mangalyaan / MOM", status: "HISTORICAL", desc: "Mars Orbiter Mission launched on PSLV-XL. Slipped into Martian orbit on the first attempt, capturing global headlines." }
  ];

  const marsTelemetry: TelemetryRow[] = [
    { label: "Mission Budget", value: "$74 Million (Record Low)", highlight: true },
    { label: "Orbital Period", value: "72.8 Hours" },
    { label: "Insertion Status", value: "1st Attempt Success" },
    { label: "Orbital Lifespan", value: "8 Years (6-Month Planned)" },
    { label: "Primary Instrument", value: "Methane Sensor (MSM)" }
  ];

  const sunMissions: MissionEvent[] = [
    { year: "2023", name: "Aditya-L1", status: "ACTIVE", desc: "India's first solar observatory. Traveled 1.5 million km to monitor solar flares and coronal heating continuously." }
  ];

  const sunTelemetry: TelemetryRow[] = [
    { label: "Observatory Target", value: "L1 Lagrange Point Halo", highlight: true },
    { label: "Distance Traveled", value: "1.5 Million Kilometers" },
    { label: "Primary Goal", value: "Coronal Mass Ejections (CMEs)" },
    { label: "Coronagraph Status", value: "VELC Active" },
    { label: "Solar Wind Sensor", value: "ASPEX Operational" }
  ];

  return (
    <div 
      ref={containerRef}
      id="exploration"
      className="relative w-full h-[400vh] bg-[#030308]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* ------------------------------------------------------------- */}
        {/* Visual Background Layers (Blended into absolute black) */}
        {/* ------------------------------------------------------------- */}
        
        {/* Act 1 Background: The Moon */}
        <motion.div
          style={{ opacity: moonBgOpacity, scale: moonScale }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/moon_exploration.png"
            alt="The Moon in Deep Space"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.1] brightness-[0.75] select-none"
          />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#030308_85%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-55" />
        </motion.div>

        {/* Act 2 Background: Mars */}
        <motion.div
          style={{ opacity: marsBgOpacity, scale: marsScale }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/mars_exploration.png"
            alt="Mars planet"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.15] brightness-[0.7] select-none"
          />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#030308_85%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-55" />
        </motion.div>

        {/* Act 3 Background: The Sun */}
        <motion.div
          style={{ opacity: sunBgOpacity, scale: sunScale }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/sun_exploration.png"
            alt="Solar Corona flares"
            fill
            sizes="100vw"
            className="object-cover object-center contrast-[1.1] brightness-[0.7] select-none"
          />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,#030308_85%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-55" />
        </motion.div>

        {/* Subtle grid pattern for technical schematic look */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none z-10" />

        {/* ------------------------------------------------------------- */}
        {/* Content Layers (Split Grid Layout) */}
        {/* ------------------------------------------------------------- */}

        {/* ACT 1 CONTENT: THE MOON */}
        <motion.div
          style={{ opacity: moonTextOpacity, y: moonTextY }}
          className="absolute z-20 w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pointer-events-auto h-[85vh]"
        >
          {/* Left Column: Title & Mission Timeline */}
          <div className="lg:col-span-7 flex flex-col text-left justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase font-bold">
                Act I / Lunar Program
              </span>
              <span className="h-[1px] w-8 bg-white/10" />
              <span className="font-mono text-[8px] tracking-wider text-white/50 uppercase">Deep Space Outreach</span>
            </div>

            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 uppercase"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The Moon
            </h2>

            <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans max-w-xl mb-6">
              Chandrayaan represents India&apos;s shift from low Earth orbit limits to deep space capability. From proving the presence of water to landing on the rugged lunar South Pole, the program continues to expand human science.
            </p>

            {/* Mission Timeline Cards */}
            <div className="space-y-3 max-w-xl">
              {moonMissions.map((m, idx) => (
                <div 
                  key={m.name} 
                  className="bg-[#030308]/50 border border-white/5 hover:border-white/10 p-3 rounded-lg flex gap-4 backdrop-blur-xs transition-all"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xs font-bold text-[#FFB800]">{m.year}</span>
                    <span className={`inline-block border text-[7px] font-mono tracking-widest px-1 py-0.5 rounded mt-1.5 whitespace-nowrap font-bold ${
                      m.status === "SUCCESS" 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                        : m.status === "ORBITER ACTIVE"
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "bg-white/5 border-white/10 text-white/60"
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wide">{m.name}</h4>
                    <p className="font-sans text-[10px] text-white/70 leading-relaxed mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Schematic Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center relative">
            
            {/* Earth-Moon Trajectory vector graphic */}
            <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] pointer-events-none z-0 opacity-15">
              <motion.svg 
                style={{ rotate: moonOrbitRotate }}
                className="w-full h-full text-[#FFB800]" 
                viewBox="0 0 120 120" 
                fill="none" 
                stroke="currentColor"
              >
                {/* Earth */}
                <circle cx="60" cy="60" r="10" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="60" cy="60" r="3" fill="currentColor" />
                
                {/* Moon Orbit */}
                <circle cx="60" cy="60" r="42" strokeWidth="0.5" />
                
                {/* Moon */}
                <circle cx="90" cy="30" r="4" strokeWidth="1" fill="#030308" />
                
                {/* Outward spiral maneuver path */}
                <path d="M 60,60 C 65,55 70,50 66,42 C 58,35 48,45 42,56 C 35,70 50,85 68,82 C 90,78 95,50 82,34 C 74,25 63,28 54,36" strokeWidth="0.75" strokeDasharray="2 3" />
              </motion.svg>
            </div>

            {/* Spec Card Overlay */}
            <div className="w-full max-w-sm bg-white/[0.02] border border-white/10 rounded-2xl p-2.5 z-10 backdrop-blur-md shadow-2xl relative">
              <div className="rounded-[1.1rem] bg-[#050510]/95 p-4 border border-white/5 space-y-4">
                
                {/* Card Title */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span className="font-mono text-[9px] tracking-widest text-[#FFB800] font-bold uppercase">LUNAR TELEMETRY</span>
                  </div>
                  <span className="font-mono text-[7px] text-white/30 uppercase">[SYS CALIBRATED]</span>
                </div>

                {/* Specs Grid */}
                <div className="space-y-2 text-left">
                  {moonTelemetry.map((row) => (
                    <div key={row.label} className="flex justify-between items-center text-[10px] font-mono border-b border-white/[0.02] pb-1.5">
                      <span className="text-white/60">{row.label}</span>
                      <span className={`font-semibold ${row.highlight ? "text-[#FFB800]" : "text-white"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mini details badge */}
                <div className="bg-white/[0.02] border border-white/5 rounded p-2.5 flex items-start gap-2 text-[9px] font-mono text-white/70 leading-normal">
                  <Info className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                  <span>
                    Chandrayaan-3 successfully analyzed the composition of lunar regolith, confirming the presence of Sulfur (S) and measuring soil temperatures up to 8cm depth.
                  </span>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

        {/* ACT 2 CONTENT: MARS */}
        <motion.div
          style={{ opacity: marsTextOpacity, y: marsTextY }}
          className="absolute z-20 w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pointer-events-auto h-[85vh]"
        >
          {/* Left Column: Title & Mission Timeline */}
          <div className="lg:col-span-7 flex flex-col text-left justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#C2410C] uppercase font-bold">
                Act II / Interplanetary
              </span>
              <span className="h-[1px] w-8 bg-white/10" />
              <span className="font-mono text-[8px] tracking-wider text-white/50 uppercase">Extreme Efficiency</span>
            </div>

            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 uppercase"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Mars
            </h2>

            <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans max-w-xl mb-6">
              With Mangalyaan (MOM), India entered interplanetary space. Slipped into orbit on the first attempt, the probe proved that deep-space operations are defined by engineering smarts, not huge budgets.
            </p>

            {/* Mission Timeline Cards */}
            <div className="space-y-3 max-w-xl">
              {marsMissions.map((m, idx) => (
                <div 
                  key={m.name} 
                  className="bg-[#030308]/50 border border-white/5 hover:border-white/10 p-3 rounded-lg flex gap-4 backdrop-blur-xs transition-all"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xs font-bold text-[#C2410C]">{m.year}</span>
                    <span className={`inline-block border text-[7px] font-mono tracking-widest px-1 py-0.5 rounded mt-1.5 whitespace-nowrap font-bold ${
                      m.status === "HISTORICAL" 
                        ? "bg-white/5 border-white/10 text-white/60" 
                        : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wide">{m.name}</h4>
                    <p className="font-sans text-[10px] text-white/70 leading-relaxed mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Schematic Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center relative">
            
            {/* Hohmann transfer ellipse vector graphic */}
            <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] pointer-events-none z-0 opacity-15">
              <motion.svg 
                style={{ rotate: marsOrbitRotate }}
                className="w-full h-full text-[#C2410C]" 
                viewBox="0 0 120 120" 
                fill="none" 
                stroke="currentColor"
              >
                {/* Sun */}
                <circle cx="60" cy="60" r="6" fill="currentColor" />
                
                {/* Earth Orbit */}
                <circle cx="60" cy="60" r="28" strokeWidth="0.5" strokeDasharray="3 3" />
                
                {/* Mars Orbit */}
                <circle cx="60" cy="60" r="48" strokeWidth="0.5" />
                
                {/* Hohmann Transfer Ellipse */}
                <path d="M 60,32 C 85,32 108,45 108,60 C 108,75 85,88 60,88" strokeWidth="0.75" />
              </motion.svg>
            </div>

            {/* Spec Card Overlay */}
            <div className="w-full max-w-sm bg-white/[0.02] border border-white/10 rounded-2xl p-2.5 z-10 backdrop-blur-md shadow-2xl relative">
              <div className="rounded-[1.1rem] bg-[#050510]/95 p-4 border border-white/5 space-y-4">
                
                {/* Card Title */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span className="font-mono text-[9px] tracking-widest text-[#C2410C] font-bold uppercase">MOM TELEMETRY</span>
                  </div>
                  <span className="font-mono text-[7px] text-white/30 uppercase">[SYS CALIBRATED]</span>
                </div>

                {/* Specs Grid */}
                <div className="space-y-2 text-left">
                  {marsTelemetry.map((row) => (
                    <div key={row.label} className="flex justify-between items-center text-[10px] font-mono border-b border-white/[0.02] pb-1.5">
                      <span className="text-white/60">{row.label}</span>
                      <span className={`font-semibold ${row.highlight ? "text-[#C2410C]" : "text-white"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mini details badge */}
                <div className="bg-white/[0.02] border border-white/5 rounded p-2.5 flex items-start gap-2 text-[9px] font-mono text-white/70 leading-normal">
                  <Info className="w-3.5 h-3.5 text-[#C2410C] shrink-0 mt-0.5" />
                  <span>
                    Mangalyaan made India the first Asian nation to reach Mars orbit, and the first in the world to do so on its maiden attempt, operating for 8 years.
                  </span>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

        {/* ACT 3 CONTENT: THE SUN */}
        <motion.div
          style={{ opacity: sunTextOpacity, y: sunTextY }}
          className="absolute z-20 w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pointer-events-auto h-[85vh]"
        >
          {/* Left Column: Title & Mission Timeline */}
          <div className="lg:col-span-7 flex flex-col text-left justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase font-bold">
                Act III / Solar Observatory
              </span>
              <span className="h-[1px] w-8 bg-white/10" />
              <span className="font-mono text-[8px] tracking-wider text-white/50 uppercase">Lagrange Vector</span>
            </div>

            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 uppercase"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The Sun
            </h2>

            <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans max-w-xl mb-6">
              Positioned at Lagrange Point 1 (L1), Aditya-L1 studies solar flares and coronal dynamics. Out of Earth&apos;s shadow, it maintains a continuous view of our star.
            </p>

            {/* Mission Timeline Cards */}
            <div className="space-y-3 max-w-xl">
              {sunMissions.map((m, idx) => (
                <div 
                  key={m.name} 
                  className="bg-[#030308]/50 border border-white/5 hover:border-white/10 p-3 rounded-lg flex gap-4 backdrop-blur-xs transition-all"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xs font-bold text-[#FFB800]">{m.year}</span>
                    <span className={`inline-block border text-[7px] font-mono tracking-widest px-1 py-0.5 rounded mt-1.5 whitespace-nowrap font-bold ${
                      m.status === "ACTIVE" 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                        : "bg-white/5 border-white/10 text-white/60"
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wide">{m.name}</h4>
                    <p className="font-sans text-[10px] text-white/70 leading-relaxed mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Schematic Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center relative">
            
            {/* L1 Halo Orbit vector graphic */}
            <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] pointer-events-none z-0 opacity-15">
              <motion.svg 
                style={{ rotate: sunOrbitRotate }}
                className="w-full h-full text-[#FFB800]"                 viewBox="0 0 120 120" 
                fill="none" 
                stroke="currentColor"
              >
                {/* Sun */}
                <circle cx="10" cy="60" r="12" fill="currentColor" opacity="0.3" />
                <circle cx="10" cy="60" r="14" strokeWidth="0.5" strokeDasharray="3 3" />
                
                {/* Earth */}
                <circle cx="110" cy="60" r="4" fill="currentColor" />
                
                {/* L1 Point */}
                <line x1="80" y1="56" x2="80" y2="64" stroke="currentColor" strokeWidth="0.75" />
                <line x1="76" y1="60" x2="84" y2="60" stroke="currentColor" strokeWidth="0.75" />
                <text x="74" y="52" fill="currentColor" fontSize="6" fontFamily="monospace">L1</text>
                
                {/* Halo Orbit Loop around L1 */}
                <ellipse cx="80" cy="60" rx="6" ry="12" strokeWidth="0.75" strokeDasharray="2 2" />
                <circle cx="84" cy="52" r="1.5" fill="currentColor" />
              </motion.svg>
            </div>

            {/* Spec Card Overlay */}
            <div className="w-full max-w-sm bg-white/[0.02] border border-white/10 rounded-2xl p-2.5 z-10 backdrop-blur-md shadow-2xl relative">
              <div className="rounded-[1.1rem] bg-[#050510]/95 p-4 border border-white/5 space-y-4">
                
                {/* Card Title */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span className="font-mono text-[9px] tracking-widest text-[#FFB800] font-bold uppercase">SOLAR TELEMETRY</span>
                  </div>
                  <span className="font-mono text-[7px] text-white/30 uppercase">[SYS CALIBRATED]</span>
                </div>

                {/* Specs Grid */}
                <div className="space-y-2 text-left">
                  {sunTelemetry.map((row) => (
                    <div key={row.label} className="flex justify-between items-center text-[10px] font-mono border-b border-white/[0.02] pb-1.5">
                      <span className="text-white/60">{row.label}</span>
                      <span className={`font-semibold ${row.highlight ? "text-[#FFB800]" : "text-white"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mini details badge */}
                <div className="bg-white/[0.02] border border-white/5 rounded p-2.5 flex items-start gap-2 text-[9px] font-mono text-white/70 leading-normal">
                  <Info className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                  <span>
                    Aditya-L1 was inserted into a Halo Orbit around Lagrangian Point 1 on January 6, 2024, enabling continuous observation of the Sun without occultation.
                  </span>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}

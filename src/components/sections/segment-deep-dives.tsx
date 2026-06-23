"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Activity, Server, Radio, BarChart3, Info } from "lucide-react";

interface DeepDiveProps {
  id: string;
}

// 1. LAUNCH SYSTEMS DEEP-DIVE (Scroll Storytelling: Vertical Movement)
export function DeepDiveLaunch({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Vertical parallax offsets
  const yLeftCol = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yRightCol = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      {/* Full-bleed background with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_earth.png"
          alt="Earth view representing launch path"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.35] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-[#030308]/50 to-[#030308]/90"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Caption */}
          <motion.div style={{ y: yLeftCol }} className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FFB800] uppercase font-bold block mb-3">
              04A. PILLAR 01 // UPSTREAM LAUNCH
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white uppercase">
              Access to Low Earth Orbit
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Pivoting from state-led cargo runs to high-frequency private launchers utilizing custom inclinations and 3D-printed motors.
            </p>
            
            {/* Details micro-expand trigger */}
            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#FFB800] hover:text-white transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" /> {showDetails ? "HIDE TECHNICAL DETAILS" : "SHOW TECHNICAL DETAILS"}
              </button>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl max-w-md font-mono text-[9px] text-white/50 space-y-1.5"
                >
                  <p>• 3D-printed cryogenic nozzle integrations</p>
                  <p>• High-turnaround solid booster structures</p>
                  <p>• Private launchpad authorizations via IN-SPACe</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Telemetry HUD + Ascent animation */}
          <motion.div style={{ y: yRightCol }} className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Visual: Vertical Ascent Animation */}
            <div className="h-[80px] bg-white/[0.01] border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              {/* Vertically scrolling launch lines */}
              <div className="flex gap-8 items-end h-full w-full justify-center pb-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: ["10%", "90%", "10%"],
                      backgroundColor: ["rgba(255, 184, 0,0.2)", "rgba(255, 184, 0,0.7)", "rgba(255, 184, 0,0.2)"],
                    }}
                    transition={{
                      duration: 1.5 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 rounded-full"
                  />
                ))}
              </div>
              <span className="absolute bottom-2 right-3 font-mono text-[6px] text-white/30 tracking-widest uppercase">STAGE_THRUST_FEED</span>
            </div>

            <div className="p-1 rounded-[20px] bg-white/[0.01] border border-white/10 shadow-xl">
              <div className="bg-[#05050f]/80 border border-white/5 rounded-[16px] p-6 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#FFB800] animate-pulse" />
                    <span className="font-mono text-[9px] text-white/80">LAUNCH_LOG // ACCELERATORS</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#FFB800] border border-[#FFB800]/20 px-2 py-0.5 rounded bg-[#FFB800]/5">
                    SECURED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-lg font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block font-semibold">LAUNCH COST</span>
                    <span className="text-base font-bold text-white block mt-0.5">~$3,000/kg</span>
                    <span className="text-[8px] text-[#FFB800] font-semibold">LEO INSERTION</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-semibold">OPERATING MARGIN</span>
                    <span className="text-base font-bold text-white block mt-0.5">30% - 35%</span>
                    <span className="text-[8px] text-white/30">LOGISTICS RATE</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono">
                  <span className="text-white/40">BUILDERS:</span>
                  <span className="text-white/80">Skyroot, Agnikul, ISRO</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// 2. SATELLITES & PAYLOAD DEEP-DIVES (Scroll Storytelling: Orbital Motion)
export function DeepDiveSatellites({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Orbital rotation mapped to scroll progress
  const satRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const satScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.85]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] border-t border-white/5 scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/sat_const.png"
          alt="Satellite constellation rendering"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.35] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-[#030308]/50 to-[#030308]/90"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FFB800] uppercase font-bold block mb-3">
              04B. PILLAR 02 // HARDWARE & ASSEMBLY
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white uppercase">
              Miniaturized Orbital Hardware
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Capitalizing on local engineering talent margins to build CubeSats, propulsive thruster blocks, and RF payloads.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#FFB800] hover:text-white transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" /> {showDetails ? "HIDE TECHNICAL DETAILS" : "SHOW TECHNICAL DETAILS"}
              </button>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl max-w-md font-mono text-[9px] text-white/50 space-y-1.5"
                >
                  <p>• Modular bus configurations (1U to 12U CubeSats)</p>
                  <p>• Green propellant chemical and electric Hall-thrusters</p>
                  <p>• Integrated vacuum and electromagnetic payload checks</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Telemetry HUD + Orbital Visual */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Visual: Dynamic Orbital Loops */}
            <div className="h-[80px] bg-white/[0.01] border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              {/* Concentric orbital loop paths reacting to scroll */}
              <motion.div 
                style={{ rotate: satRotate, scale: satScale }}
                className="relative w-12 h-12 rounded-full border border-dashed border-[#FFB800]/20 flex items-center justify-center"
              >
                <span className="absolute -top-1.5 w-2.5 h-2.5 rounded-full bg-[#FFB800] shadow-[0_0_6px_#FFB800]"></span>
                <div className="w-6 h-6 rounded-full border border-dashed border-[#FFB800]/15 animate-[spin_4s_linear_infinite_reverse]">
                  <span className="absolute -bottom-1 left-0.5 w-1.5 h-1.5 rounded-full bg-[#FFB800]/80"></span>
                </div>
              </motion.div>
              <span className="absolute bottom-2 right-3 font-mono text-[6px] text-white/30 tracking-widest uppercase">CONSTELLATION_BUS</span>
            </div>

            <div className="p-1 rounded-[20px] bg-white/[0.01] border border-white/10 shadow-xl">
              <div className="bg-[#05050f]/80 border border-white/5 rounded-[16px] p-6 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-[#FFB800] animate-pulse" />
                    <span className="font-mono text-[9px] text-white/80">SATELLITE_BUS // ACCELERATORS</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#FFB800] border border-[#FFB800]/20 px-2 py-0.5 rounded bg-[#FFB800]/5">
                    ADCS: LOCK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-lg font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block font-semibold">MFG ARBITRAGE</span>
                    <span className="text-base font-bold text-white block mt-0.5">35% Cheaper</span>
                    <span className="text-[8px] text-[#FFB800] font-semibold">VS US/EUROPE</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-semibold">DESIGN MARGIN</span>
                    <span className="text-base font-bold text-white block mt-0.5">45% - 55%</span>
                    <span className="text-[8px] text-white/30">BUS INTEGRATION</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono">
                  <span className="text-white/40">BUILDERS:</span>
                  <span className="text-white/80">Dhruva Space, Pixxel, Bellatrix</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// 3. GROUND SEGMENT DEEP-DIVES (Scroll Storytelling: Grid Formation)
export function DeepDiveGround({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Grid alignment opacity & scanner lines rotation
  const gridLineOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.25, 0.03]);
  const radarSweepRotate = useTransform(scrollYProgress, [0, 1], [0, 240]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] border-t border-white/5 scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/ground_station.png"
          alt="Ground station gateway dishes"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.35] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-[#030308]/50 to-[#030308]/90"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF6B00] uppercase font-bold block mb-3">
              04C. PILLAR 03 // MIDSTREAM GATEWAYS
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white uppercase">
              The Toll-Roads of Orbit
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Managing critical telemetry, commands, and data downlinks via globally distributed ground stations and gateways.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#FF6B00] hover:text-white transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" /> {showDetails ? "HIDE TECHNICAL DETAILS" : "SHOW TECHNICAL DETAILS"}
              </button>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl max-w-md font-mono text-[9px] text-white/50 space-y-1.5"
                >
                  <p>• Ground-Station-as-a-Service (GSaaS) API scheduling</p>
                  <p>• High-gain parabolic antenna arrays (L, S, Ku, Ka bands)</p>
                  <p>• Direct cloud integration routing raw RF downlink feeds</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Telemetry HUD + Radar Sweep Visual */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Visual: Radar Sweep Beam */}
            <div className="h-[80px] bg-white/[0.01] border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
              {/* Dynamic grid alignment layer */}
              <motion.div 
                style={{ opacity: gridLineOpacity }}
                className="absolute inset-0 bg-grid-pattern z-0"
              ></motion.div>
              
              {/* Sweep radar sweep element */}
              <div className="w-14 h-14 rounded-full border border-white/5 relative overflow-hidden bg-radar-sweep flex items-center justify-center z-10">
                <motion.div 
                  style={{ rotate: radarSweepRotate }}
                  className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(255,107,0,0.3)_0deg,transparent_90deg)] origin-center"
                ></motion.div>
                <div className="w-8 h-8 rounded-full border border-white/5"></div>
              </div>
              <span className="absolute bottom-2 right-3 font-mono text-[6px] text-white/30 tracking-widest uppercase">RADAR_SWEEP_FEED</span>
            </div>

            <div className="p-1 rounded-[20px] bg-white/[0.01] border border-white/10 shadow-xl">
              <div className="bg-[#05050f]/80 border border-white/5 rounded-[16px] p-6 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
                    <span className="font-mono text-[9px] text-white/80">GROUND_GATEWAY // ACCELERATORS</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#FF6B00] border border-[#FF6B00]/20 px-2 py-0.5 rounded bg-[#FF6B00]/5">
                    LINK: ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-lg font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block font-semibold">PEAK BANDWIDTH</span>
                    <span className="text-base font-bold text-white block mt-0.5">30+ Gbps</span>
                    <span className="text-[8px] text-[#FF6B00] font-semibold">DATA DOWNLINK</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-semibold">UTILITY MARGINS</span>
                    <span className="text-base font-bold text-white block mt-0.5">45% - 50%</span>
                    <span className="text-[8px] text-white/30">RECURRING CASHFLOW</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono">
                  <span className="text-white/40">OPERATORS:</span>
                  <span className="text-white/80">Dhruva Network, ISRO ISTRAC</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// 4. DOWNSTREAM APPLICATIONS DEEP-DIVES (Scroll Storytelling: Scanning Sweep)
export function DeepDiveApplications({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Vertical laser scan progress
  const scanLineTop = useTransform(scrollYProgress, [0, 1], ["-5%", "105%"]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] border-t border-white/5 scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/sat_network.png"
          alt="Satellite telemetry network layout"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.35] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-[#030308]/50 to-[#030308]/90"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FFB800] uppercase font-bold block mb-3">
              04D. PILLAR 04 // DOWNSTREAM SAAS
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white uppercase">
              Downstream Value SaaS
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Translating raw spectral imagery and telemetry points directly to crop yields, carbon indices, and logistics maps.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#FFB800] hover:text-white transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" /> {showDetails ? "HIDE TECHNICAL DETAILS" : "SHOW TECHNICAL DETAILS"}
              </button>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl max-w-md font-mono text-[9px] text-white/50 space-y-1.5"
                >
                  <p>• Automated Supply Chain and Vessel tracking APIs</p>
                  <p>• Methane leaks and carbon capture auditing models</p>
                  <p>• Crop health NDVI analytics serving regional banks</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Telemetry HUD + Scanning Ingest Visual */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Visual: Matrix Data Scan */}
            <div className="h-[80px] bg-white/[0.01] border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              {/* Monospace scrolling code text backdrop */}
              <div className="absolute inset-0 select-none flex flex-col font-mono text-[5px] text-[#FFB800]/25 p-2 overflow-hidden leading-tight">
                <div>01001011 00101110 01100101 INGEST_SYS_OK</div>
                <div>01100100 01100001 01110100 SOVEREIGN_FDI</div>
                <div>01100001 00101110 01110011 MapmyIndia_SYNC</div>
                <div>01110101 01110010 01100101 SatSure_GEO_API</div>
              </div>
              {/* Sweeping scan bar (bound to scroll progress) */}
              <motion.div
                style={{ top: scanLineTop }}
                className="absolute left-0 right-0 h-[1.5px] bg-[#FFB800] shadow-[0_0_8px_#FFB800] z-10"
              />
              <span className="absolute bottom-2 right-3 font-mono text-[6px] text-white/30 tracking-widest uppercase">DATA_INGEST_SCAN</span>
            </div>

            <div className="p-1 rounded-[20px] bg-white/[0.01] border border-white/10 shadow-xl">
              <div className="bg-[#05050f]/80 border border-white/5 rounded-[16px] p-6 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[#FFB800] animate-pulse" />
                    <span className="font-mono text-[9px] text-white/80">SAAS_PORTAL // ACCELERATORS</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#FFB800] border border-[#FFB800]/20 px-2 py-0.5 rounded bg-[#FFB800]/5">
                    API_OK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-lg font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block font-semibold">GLOBAL SCALE</span>
                    <span className="text-base font-bold text-white block mt-0.5">~$380B Market</span>
                    <span className="text-[8px] text-[#FFB800] font-semibold">95% OF VALUE</span>
                  </div>
                  <div>
                    <span className="text-white/40 block font-semibold">GROSS MARGINS</span>
                    <span className="text-base font-bold text-white block mt-0.5">75% - 85%</span>
                    <span className="text-[8px] text-white/30">RECURRING MULTIPLES</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono">
                  <span className="text-white/40">PLATFORMS:</span>
                  <span className="text-white/80">SatSure, CropIn, MapmyIndia</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

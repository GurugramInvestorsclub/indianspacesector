"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Rocket, Satellite, Globe, Database, Cpu, Activity, Server, Radio, BarChart3, Info } from "lucide-react";

interface DeepDiveProps {
  id: string;
}

// 1. LAUNCH SYSTEMS DEEP-DIVE
export function DeepDiveLaunch({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      id={id}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_earth.png"
          alt="Earth view representing launch path"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.3] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-[#030308]/50 to-[#030308]/90"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Caption */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#0052FF] uppercase font-bold block mb-3">
              04A. PILLAR 01 // UPSTREAM LAUNCH
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Access to Low Earth Orbit
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Pivoting from state-led cargo runs to high-frequency private launchers utilizing custom inclinations and 3D-printed motors.
            </p>
            
            {/* Details micro-expand trigger */}
            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#0052FF] hover:text-white transition-colors cursor-pointer"
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
          </div>

          {/* Right Column: Telemetry HUD */}
          <div className="lg:col-span-5">
            <div className="p-1 rounded-[20px] bg-white/[0.01] border border-white/10 shadow-xl">
              <div className="bg-[#05050f]/80 border border-white/5 rounded-[16px] p-6 backdrop-blur-md">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#0052FF] animate-pulse" />
                    <span className="font-mono text-[9px] text-white/80">LAUNCH_LOG // ACCELERATORS</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#0052FF] border border-[#0052FF]/20 px-2 py-0.5 rounded bg-[#0052FF]/5">
                    SECURED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-lg font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block">LAUNCH COST</span>
                    <span className="text-base font-bold text-white block mt-0.5">~$3,000/kg</span>
                    <span className="text-[8px] text-[#0052FF]">LEO INSERTION</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">OPERATING MARGIN</span>
                    <span className="text-base font-bold text-white block mt-0.5">30% - 35%</span>
                    <span className="text-[8px] text-white/30">LOGISTICS RATE</span>
                  </div>
                </div>

                {/* Hover reveal for active builders */}
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono">
                  <span className="text-white/40">BUILDERS:</span>
                  <span className="text-white/80">Skyroot, Agnikul, ISRO</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// 2. SATELLITES & PAYLOAD DEEP-DIVES
export function DeepDiveSatellites({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      id={id}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] border-t border-white/5 scroll-snap-align-start overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/sat_const.png"
          alt="Satellite constellation rendering"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.3] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-[#030308]/50 to-[#030308]/90"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase font-bold block mb-3">
              04B. PILLAR 02 // HARDWARE & ASSEMBLY
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Miniaturized Orbital Hardware
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Capitalizing on local engineering talent margins to build CubeSats, propulsive thruster blocks, and RF payloads.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#00F0FF] hover:text-white transition-colors cursor-pointer"
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

          {/* Right Column: Telemetry HUD */}
          <div className="lg:col-span-5">
            <div className="p-1 rounded-[20px] bg-white/[0.01] border border-white/10 shadow-xl">
              <div className="bg-[#05050f]/80 border border-white/5 rounded-[16px] p-6 backdrop-blur-md">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                    <span className="font-mono text-[9px] text-white/80">SATELLITE_BUS // ACCELERATORS</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#00F0FF] border border-[#00F0FF]/20 px-2 py-0.5 rounded bg-[#00F0FF]/5">
                    ADCS: LOCK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-lg font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block">MFG ARBITRAGE</span>
                    <span className="text-base font-bold text-white block mt-0.5">35% Cheaper</span>
                    <span className="text-[8px] text-[#00F0FF]">VS US/EUROPE</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">DESIGN MARGIN</span>
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

// 3. GROUND SEGMENT DEEP-DIVES
export function DeepDiveGround({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      id={id}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] border-t border-white/5 scroll-snap-align-start overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/ground_station.png"
          alt="Ground station gateway dishes"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.3] saturate-[0.8]"
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
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
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

          {/* Right Column: Telemetry HUD */}
          <div className="lg:col-span-5">
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
                    <span className="text-white/40 block">PEAK BANDWIDTH</span>
                    <span className="text-base font-bold text-white block mt-0.5">30+ Gbps</span>
                    <span className="text-[8px] text-[#FF6B00]">DATA DOWNLINK</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">UTILITY MARGINS</span>
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

// 4. DOWNSTREAM APPLICATIONS DEEP-DIVES
export function DeepDiveApplications({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      id={id}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] border-t border-white/5 scroll-snap-align-start overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/sat_network.png"
          alt="Satellite telemetry network layout"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.3] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-[#030308]/50 to-[#030308]/90"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00E575] uppercase font-bold block mb-3">
              04D. PILLAR 04 // DOWNSTREAM SAAS
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Downstream Value SaaS
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Translating raw spectral imagery and telemetry points directly to crop yields, carbon indices, and logistics maps.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#00E575] hover:text-white transition-colors cursor-pointer"
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

          {/* Right Column: Telemetry HUD */}
          <div className="lg:col-span-5">
            <div className="p-1 rounded-[20px] bg-white/[0.01] border border-white/10 shadow-xl">
              <div className="bg-[#05050f]/80 border border-white/5 rounded-[16px] p-6 backdrop-blur-md">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[#00E575] animate-pulse" />
                    <span className="font-mono text-[9px] text-white/80">SAAS_PORTAL // ACCELERATORS</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#00E575] border border-[#00E575]/20 px-2 py-0.5 rounded bg-[#00E575]/5">
                    API_OK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-lg font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block">GLOBAL SCALE</span>
                    <span className="text-base font-bold text-white block mt-0.5">~$380B Market</span>
                    <span className="text-[8px] text-[#00E575]">95% OF VALUE</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">GROSS MARGINS</span>
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

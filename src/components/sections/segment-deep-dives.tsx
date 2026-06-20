"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Activity, Server, Radio, BarChart3, Info } from "lucide-react";

interface DeepDiveProps {
  id: string;
}

// 1. LAUNCH SYSTEMS DEEP-DIVE
export function DeepDiveLaunch({ id }: DeepDiveProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      id={id}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#F7F6F3] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background with dark overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/hero_earth.png"
          alt="Earth view representing launch path"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale-[80%] sepia-[10%] brightness-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3]/95 via-[#F7F6F3]/60 to-[#F7F6F3]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Caption */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#C5221F] uppercase font-bold block mb-3 font-semibold">
              04A. PILLAR 01 // UPSTREAM LAUNCH
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-[#111111]">
              Access to Low Earth Orbit
            </h3>
            <p className="text-[#2F3437] text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Pivoting from state-led cargo runs to high-frequency private launchers utilizing custom inclinations and 3D-printed motors.
            </p>
            
            {/* Details micro-expand trigger */}
            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#C5221F] hover:text-[#111111] transition-colors cursor-pointer font-semibold"
              >
                <Info className="w-3.5 h-3.5" /> {showDetails ? "HIDE TECHNICAL DETAILS" : "SHOW TECHNICAL DETAILS"}
              </button>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-[#FFFFFF] border border-[#EAEAEA] p-4 rounded-xl max-w-md font-mono text-[9px] text-[#787774] space-y-1.5 shadow-sm"
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
            <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-[16px] p-6 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA] mb-4">
                <div className="flex items-center gap-1.5 font-bold">
                  <Activity className="w-3.5 h-3.5 text-[#C5221F]" />
                  <span className="font-mono text-[9px] text-[#111111]">LAUNCH_LOG // ACCELERATORS</span>
                </div>
                <span className="font-mono text-[8px] text-[#C5221F] border border-[#C5221F]/20 px-2 py-0.5 rounded bg-[#C5221F]/5 font-bold">
                  SECURED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#F7F6F3] border border-[#EAEAEA] p-4 rounded-lg font-mono text-[10px]">
                <div>
                  <span className="text-[#787774] block font-bold">LAUNCH COST</span>
                  <span className="text-base font-bold text-[#111111] block mt-0.5">~$3,000/kg</span>
                  <span className="text-[8px] text-[#C5221F] font-semibold">LEO INSERTION</span>
                </div>
                <div>
                  <span className="text-[#787774] block font-bold">OPERATING MARGIN</span>
                  <span className="text-base font-bold text-[#111111] block mt-0.5">30% - 35%</span>
                  <span className="text-[8px] text-[#787774]">LOGISTICS RATE</span>
                </div>
              </div>

              {/* Active builders */}
              <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex justify-between items-center text-[9px] font-mono">
                <span className="text-[#787774] font-bold">BUILDERS:</span>
                <span className="text-[#111111] font-semibold">Skyroot, Agnikul, ISRO</span>
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
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#F7F6F3] border-t border-[#EAEAEA] scroll-snap-align-start overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/sat_const.png"
          alt="Satellite constellation rendering"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale-[80%] sepia-[10%] brightness-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3]/95 via-[#F7F6F3]/60 to-[#F7F6F3]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#1F6C9F] uppercase font-bold block mb-3 font-semibold">
              04B. PILLAR 02 // HARDWARE & ASSEMBLY
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-[#111111]">
              Miniaturized Orbital Hardware
            </h3>
            <p className="text-[#2F3437] text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Capitalizing on local engineering talent margins to build CubeSats, propulsive thruster blocks, and RF payloads.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#1F6C9F] hover:text-[#111111] transition-colors cursor-pointer font-semibold"
              >
                <Info className="w-3.5 h-3.5" /> {showDetails ? "HIDE TECHNICAL DETAILS" : "SHOW TECHNICAL DETAILS"}
              </button>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-[#FFFFFF] border border-[#EAEAEA] p-4 rounded-xl max-w-md font-mono text-[9px] text-[#787774] space-y-1.5 shadow-sm"
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
            <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-[16px] p-6 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA] mb-4">
                <div className="flex items-center gap-1.5 font-bold">
                  <Server className="w-3.5 h-3.5 text-[#1F6C9F]" />
                  <span className="font-mono text-[9px] text-[#111111]">SATELLITE_BUS // ACCELERATORS</span>
                </div>
                <span className="font-mono text-[8px] text-[#1F6C9F] border border-[#1F6C9F]/20 px-2 py-0.5 rounded bg-[#1F6C9F]/5 font-bold">
                  ADCS: LOCK
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#F7F6F3] border border-[#EAEAEA] p-4 rounded-lg font-mono text-[10px]">
                <div>
                  <span className="text-[#787774] block font-bold">MFG ARBITRAGE</span>
                  <span className="text-base font-bold text-[#111111] block mt-0.5">35% Cheaper</span>
                  <span className="text-[8px] text-[#1F6C9F] font-semibold">VS US/EUROPE</span>
                </div>
                <div>
                  <span className="text-[#787774] block font-bold">DESIGN MARGIN</span>
                  <span className="text-base font-bold text-[#111111] block mt-0.5">45% - 55%</span>
                  <span className="text-[8px] text-[#787774]">BUS INTEGRATION</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex justify-between items-center text-[9px] font-mono">
                <span className="text-[#787774] font-bold">BUILDERS:</span>
                <span className="text-[#111111] font-semibold">Dhruva Space, Pixxel, Bellatrix</span>
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
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#F7F6F3] border-t border-[#EAEAEA] scroll-snap-align-start overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/ground_station.png"
          alt="Ground station gateway dishes"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale-[80%] sepia-[10%] brightness-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3]/95 via-[#F7F6F3]/60 to-[#F7F6F3]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#956400] uppercase font-bold block mb-3 font-semibold">
              04C. PILLAR 03 // MIDSTREAM GATEWAYS
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-[#111111]">
              The Toll-Roads of Orbit
            </h3>
            <p className="text-[#2F3437] text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Managing critical telemetry, commands, and data downlinks via globally distributed ground stations and gateways.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#956400] hover:text-[#111111] transition-colors cursor-pointer font-semibold"
              >
                <Info className="w-3.5 h-3.5" /> {showDetails ? "HIDE TECHNICAL DETAILS" : "SHOW TECHNICAL DETAILS"}
              </button>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-[#FFFFFF] border border-[#EAEAEA] p-4 rounded-xl max-w-md font-mono text-[9px] text-[#787774] space-y-1.5 shadow-sm"
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
            <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-[16px] p-6 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA] mb-4">
                <div className="flex items-center gap-1.5 font-bold">
                  <Radio className="w-3.5 h-3.5 text-[#956400]" />
                  <span className="font-mono text-[9px] text-[#111111]">GROUND_GATEWAY // ACCELERATORS</span>
                </div>
                <span className="font-mono text-[8px] text-[#956400] border border-[#956400]/20 px-2 py-0.5 rounded bg-[#956400]/5 font-bold">
                  LINK: ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#F7F6F3] border border-[#EAEAEA] p-4 rounded-lg font-mono text-[10px]">
                <div>
                  <span className="text-[#787774] block font-bold">PEAK BANDWIDTH</span>
                  <span className="text-base font-bold text-[#111111] block mt-0.5">30+ Gbps</span>
                  <span className="text-[8px] text-[#956400] font-semibold">DATA DOWNLINK</span>
                </div>
                <div>
                  <span className="text-[#787774] block font-bold">UTILITY MARGINS</span>
                  <span className="text-base font-bold text-[#111111] block mt-0.5">45% - 50%</span>
                  <span className="text-[8px] text-[#787774]">RECURRING CASHFLOW</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex justify-between items-center text-[9px] font-mono">
                <span className="text-[#787774] font-bold">OPERATORS:</span>
                <span className="text-[#111111] font-semibold">Dhruva Network, ISRO ISTRAC</span>
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
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#F7F6F3] border-t border-[#EAEAEA] scroll-snap-align-start overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/sat_network.png"
          alt="Satellite telemetry network layout"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale-[80%] sepia-[10%] brightness-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3]/95 via-[#F7F6F3]/60 to-[#F7F6F3]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#2E7D32] uppercase font-bold block mb-3 font-semibold">
              04D. PILLAR 04 // DOWNSTREAM SAAS
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-[#111111]">
              Downstream Value SaaS
            </h3>
            <p className="text-[#2F3437] text-sm md:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Translating raw spectral imagery and telemetry points directly to crop yields, carbon indices, and logistics maps.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#2E7D32] hover:text-[#111111] transition-colors cursor-pointer font-semibold"
              >
                <Info className="w-3.5 h-3.5" /> {showDetails ? "HIDE TECHNICAL DETAILS" : "SHOW TECHNICAL DETAILS"}
              </button>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-[#FFFFFF] border border-[#EAEAEA] p-4 rounded-xl max-w-md font-mono text-[9px] text-[#787774] space-y-1.5 shadow-sm"
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
            <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-[16px] p-6 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA] mb-4">
                <div className="flex items-center gap-1.5 font-bold">
                  <BarChart3 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span className="font-mono text-[9px] text-[#111111]">SAAS_PORTAL // ACCELERATORS</span>
                </div>
                <span className="font-mono text-[8px] text-[#2E7D32] border border-[#2E7D32]/20 px-2 py-0.5 rounded bg-[#2E7D32]/5 font-bold">
                  API_OK
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#F7F6F3] border border-[#EAEAEA] p-4 rounded-lg font-mono text-[10px]">
                <div>
                  <span className="text-[#787774] block font-bold">GLOBAL SCALE</span>
                  <span className="text-base font-bold text-[#111111] block mt-0.5">~$380B Market</span>
                  <span className="text-[8px] text-[#2E7D32] font-semibold">95% OF VALUE</span>
                </div>
                <div>
                  <span className="text-[#787774] block font-bold">GROSS MARGINS</span>
                  <span className="text-base font-bold text-[#111111] block mt-0.5">75% - 85%</span>
                  <span className="text-[8px] text-[#787774]">RECURRING MULTIPLES</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex justify-between items-center text-[9px] font-mono">
                <span className="text-[#787774] font-bold">PLATFORMS:</span>
                <span className="text-[#111111] font-semibold">SatSure, CropIn, MapmyIndia</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Rocket, Satellite, Globe, Database, Cpu, Activity, Server, Radio, BarChart3 } from "lucide-react";

interface DeepDiveProps {
  id: string;
}

// 1. LAUNCH SYSTEMS DEEP-DIVE
export function DeepDiveLaunch({ id }: DeepDiveProps) {
  return (
    <section
      id={id}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background with parallax overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_earth.png"
          alt="Earth view representing launch path"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.35] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/95 via-[#030308]/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-[#030308]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context Brief */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Rocket className="w-4 h-4 text-[#0052FF]" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#0052FF] uppercase font-bold">
                04A. PILLAR 01 // UPSTREAM LAUNCH SYSTEMS
              </span>
            </motion.div>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Cheaper, Faster <br />
              Access to Low Earth Orbit
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-6 leading-relaxed font-sans max-w-xl">
              India is transitioning from public-sector LVM3 heavy cargo payloads to high-frequency private launcher constellations. Custom orbital insertions and 3D-printed semi-cryogenic engines are dropping launch friction.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-[10px] text-white/50 uppercase tracking-wide">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]"></span>
                Dedicated LEO inclinations for small-sats
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]"></span>
                State-of-the-art launchpads opened to commercial developers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]"></span>
                Domestic manufacturing arbitrage in solid & liquid propulsion
              </li>
            </ul>
          </div>

          {/* Right Column: Telemetry HUD Panel */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-1 rounded-[24px] bg-white/[0.02] border border-white/10 shadow-2xl"
            >
              <div className="bg-[#05050f]/90 border border-white/5 rounded-[20px] p-6 backdrop-blur-md">
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-[#0052FF] animate-pulse" />
                    <span className="font-mono text-[9px] tracking-wider text-white/80">LAUNCH_LOG // DIRECTIVES</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#0052FF] border border-[#0052FF]/30 px-2 py-0.5 rounded bg-[#0052FF]/5">
                    SYS: SECURED
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-xl font-mono text-[10px] mb-4">
                  <div>
                    <span className="text-white/40 block">COMMERCIAL COST</span>
                    <span className="text-lg font-bold text-white tracking-tight block mt-0.5">~$3,000/kg</span>
                    <span className="text-[8px] text-[#0052FF]">LEO INSERTION</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">OPERATING MARGIN</span>
                    <span className="text-lg font-bold text-white tracking-tight block mt-0.5">30% - 35%</span>
                    <span className="text-[8px] text-white/30">LAUNCH LOGISTICS</span>
                  </div>
                </div>

                {/* Key Players */}
                <div>
                  <span className="font-mono text-[9px] text-white/40 tracking-widest block mb-2">ACTIVE PLAYERS</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">Skyroot Aerospace</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">Agnikul Cosmos</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">ISRO NSIL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. SATELLITES & PAYLOAD DEEP-DIVES
export function DeepDiveSatellites({ id }: DeepDiveProps) {
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
          className="object-cover object-center filter brightness-[0.35] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/95 via-[#030308]/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-[#030308]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Satellite className="w-4 h-4 text-[#00F0FF]" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase font-bold">
                04B. PILLAR 02 // HARDWARE & SATELLITE BUS
              </span>
            </motion.div>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Miniaturized Orbital <br />
              Hardware Hub
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-6 leading-relaxed font-sans max-w-xl">
               Bangalore and Hyderabad are emerging as global outsourcing capitals for satellite assembly. Miniaturized CubeSats and customized multispectral camera sensors provide massive capital cost reductions.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-[10px] text-white/50 uppercase tracking-wide">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
                CubeSat platforms (1U to 12U) integration speeds
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
                Proprietary green propellants & water-thruster systems
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
                High-performance attitude determination modules (ADCS)
              </li>
            </ul>
          </div>

          {/* Right Column: Telemetry HUD Panel */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-1 rounded-[24px] bg-white/[0.02] border border-white/10 shadow-2xl"
            >
              <div className="bg-[#05050f]/90 border border-white/5 rounded-[20px] p-6 backdrop-blur-md">
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                    <span className="font-mono text-[9px] tracking-wider text-white/80">SATELLITE_BUS // TELEMETRY</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#00F0FF] border border-[#00F0FF]/30 px-2 py-0.5 rounded bg-[#00F0FF]/5">
                    ADCS: LOCK
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-xl font-mono text-[10px] mb-4">
                  <div>
                    <span className="text-white/40 block">MFG ARBITRAGE</span>
                    <span className="text-lg font-bold text-white tracking-tight block mt-0.5">35% Cheaper</span>
                    <span className="text-[8px] text-[#00F0FF]">VS US/EUROPE</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">DESIGN MARGIN</span>
                    <span className="text-lg font-bold text-white tracking-tight block mt-0.5">45% - 55%</span>
                    <span className="text-[8px] text-white/30">BUS INTEGRATION</span>
                  </div>
                </div>

                {/* Key Players */}
                <div>
                  <span className="font-mono text-[9px] text-white/40 tracking-widest block mb-2">ACTIVE BUILDERS</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">Dhruva Space</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">Pixxel Space</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">Bellatrix Aerospace</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. GROUND SEGMENT DEEP-DIVES
export function DeepDiveGround({ id }: DeepDiveProps) {
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
          className="object-cover object-center filter brightness-[0.35] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/95 via-[#030308]/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-[#030308]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Globe className="w-4 h-4 text-[#FF6B00]" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF6B00] uppercase font-bold">
                04C. PILLAR 03 // MIDSTREAM GROUND INFRASTRUCTURE
              </span>
            </motion.div>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              The Telemetry <br />
              Toll-Roads of Orbit
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-6 leading-relaxed font-sans max-w-xl">
              Antennas, gateways, and software-defined modems act as orbital toll booths. Every orbital payload must query regional ground station grids to command systems and downlink valuable data feeds.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-[10px] text-white/50 uppercase tracking-wide">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                TTC (Telemetry, Tracking & Command) navigational links
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                Ground-Station-as-a-Service (GSaaS) API rentals
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                Ku, Ka and next-gen laser communication terminals
              </li>
            </ul>
          </div>

          {/* Right Column: Telemetry HUD Panel */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-1 rounded-[24px] bg-white/[0.02] border border-white/10 shadow-2xl"
            >
              <div className="bg-[#05050f]/90 border border-white/5 rounded-[20px] p-6 backdrop-blur-md">
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
                    <span className="font-mono text-[9px] tracking-wider text-white/80">GROUND_GATEWAY // TTC</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#FF6B00] border border-[#FF6B00]/30 px-2 py-0.5 rounded bg-[#FF6B00]/5">
                    LINK: ACTIVE
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-xl font-mono text-[10px] mb-4">
                  <div>
                    <span className="text-white/40 block">PEAK BANDWIDTH</span>
                    <span className="text-lg font-bold text-white tracking-tight block mt-0.5">30+ Gbps</span>
                    <span className="text-[8px] text-[#FF6B00]">S/Ku/Ka BAND DISH</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">SUBSCRIPTION MARGIN</span>
                    <span className="text-lg font-bold text-white tracking-tight block mt-0.5">45% - 50%</span>
                    <span className="text-[8px] text-white/30">RECURRING REVENUE</span>
                  </div>
                </div>

                {/* Key Players */}
                <div>
                  <span className="font-mono text-[9px] text-white/40 tracking-widest block mb-2">INFRASTRUCTURE NETS</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">Dhruva Ground Network</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">ISRO ISTRAC</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. DOWNSTREAM APPLICATIONS DEEP-DIVES
export function DeepDiveApplications({ id }: DeepDiveProps) {
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
          className="object-cover object-center filter brightness-[0.35] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/95 via-[#030308]/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-[#030308]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Database className="w-4 h-4 text-[#00E575]" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#00E575] uppercase font-bold">
                04D. PILLAR 04 // DOWNSTREAM SOFTWARE & SAAS
              </span>
            </motion.div>
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Downstream Value <br />
              Accumulation SaaS
            </h3>
            <p className="text-white/70 text-sm md:text-base mt-6 leading-relaxed font-sans max-w-xl">
              Software is the highest margin node in the space economy. Vectorized geospatial data streams are converted directly to business intelligence, crop indices, supply maps, and climate risks.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-[10px] text-white/50 uppercase tracking-wide">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E575]"></span>
                Hyperspectral crop health index analytics (NDVI)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E575]"></span>
                Automated ship, fleet, and supply chain tracking API
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E575]"></span>
                ESG carbon capture footprint modeling audits
              </li>
            </ul>
          </div>

          {/* Right Column: Telemetry HUD Panel */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-1 rounded-[24px] bg-white/[0.02] border border-white/10 shadow-2xl"
            >
              <div className="bg-[#05050f]/90 border border-white/5 rounded-[20px] p-6 backdrop-blur-md">
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-[#00E575] animate-pulse" />
                    <span className="font-mono text-[9px] tracking-wider text-white/80">SAAS_INSIGHTS // API</span>
                  </div>
                  <span className="font-mono text-[8px] text-[#00E575] border border-[#00E575]/30 px-2 py-0.5 rounded bg-[#00E575]/5">
                    API_ACTIVE
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 bg-[#030308] border border-white/5 p-4 rounded-xl font-mono text-[10px] mb-4">
                  <div>
                    <span className="text-white/40 block">GLOBAL MARKET</span>
                    <span className="text-lg font-bold text-white tracking-tight block mt-0.5">~$380B</span>
                    <span className="text-[8px] text-[#00E575]">95% OF STACK VALUE</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">GROSS MARGINS</span>
                    <span className="text-lg font-bold text-white tracking-tight block mt-0.5">75% - 85%</span>
                    <span className="text-[8px] text-white/30">HIGH RECURRING SAAS</span>
                  </div>
                </div>

                {/* Key Players */}
                <div>
                  <span className="font-mono text-[9px] text-white/40 tracking-widest block mb-2">ACTIVE SAAS CONSOLE</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">SatSure Analytics</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">MapmyIndia</span>
                    <span className="bg-white/5 border border-white/10 text-white/80 font-mono text-[9px] px-2.5 py-1 rounded">CropIn</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

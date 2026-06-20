"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal, Shield, Cpu, Activity, Database, Server } from "lucide-react";
import { motion, useInView } from "motion/react";

interface TelemetryLog {
  id: number;
  text: string;
  time: string;
}

export function MissionControl() {
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Terminal log generator simulation
  useEffect(() => {
    const rawLogs = [
      "SYS_INIT: LAUNCH_MONITOR_ACTIVE",
      "TELEMETRY: DHRUVA_QUALIFIED // LEO_BUS_LOCK",
      "ORBIT_REFORMS: FDI_100_VERIFIED // NSIL_OK",
      "IN-SPACe: LICENSE_GATEWAYS_OPEN",
      "GPS_SYNCHRONIZATION: NaVIC_SIGNAL_LOCK",
      "PROPULSION: AGNILET_3D_PRINT_QUALIFIED",
      "DATA_FEED: PIXXEL_HYPERSPECTRAL_INGEST",
      "CODENAME: MISSION_ARYA_RESET_OK",
      "NETWORK: GROUND_STATIONS_ACTIVE // TTC_OK",
      "FDI: CAPITAL_FLOWS_ROUTING_SUCCESS"
    ];

    if (!isInView) {
      setLogs([]);
      return;
    }

    let interval: NodeJS.Timeout;
    let logIndex = 0;

    const addLog = () => {
      if (logIndex < rawLogs.length) {
        const dateString = new Date().toLocaleTimeString();
        setLogs((prev) => [
          ...prev,
          { id: Date.now(), text: rawLogs[logIndex], time: dateString }
        ]);
        logIndex++;
        interval = setTimeout(addLog, 1200);
      }
    };

    addLog();

    return () => clearTimeout(interval);
  }, [isInView]);

  return (
    <section
      id="mission-control"
      ref={containerRef}
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      {/* Background grid sweeps */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] z-0"></div>
      <div className="absolute inset-0 bg-radar-sweep opacity-[0.4] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        {/* Section Header */}
        <div className="text-left mb-8 max-w-2xl">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-2 font-semibold">
            01A. TELEMETRY BRIDGE
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
            Mission Control Dashboard
          </h2>
          <p className="text-white/40 text-xs md:text-sm mt-2 font-sans">
            Real-time sovereign data streams and capital inflow indices projecting ecosystem velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Metric Telemetry Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Launches */}
            <div className="bg-[#04040c]/85 border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-[#00F0FF]/30 transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00F0FF]"></div>
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-white/40 tracking-wider font-bold">UPSTREAM / LAUNCHERS</span>
                <Server className="w-4 h-4 text-[#00F0FF]" />
              </div>
              <div className="my-6">
                <span className="font-mono text-[10px] text-[#00F0FF] font-bold block mb-1">SYS_STATUS // ONLINE</span>
                <span className="text-4xl md:text-5xl font-mono font-extrabold text-white tracking-tight">04</span>
                <span className="text-white/60 text-xs font-sans block mt-1">Active launch companies scaling payloads</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between font-mono text-[8px] text-white/30">
                <span>IN-SPACE PERMITTED</span>
                <span>VIKRAM // AGNIBAAN</span>
              </div>
            </div>

            {/* Card 2: Satellites */}
            <div className="bg-[#04040c]/85 border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-[#00F0FF]/30 transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00F0FF]"></div>
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-white/40 tracking-wider font-bold">MIDSTREAM / HARDWARE</span>
                <Cpu className="w-4 h-4 text-[#00F0FF]" />
              </div>
              <div className="my-6">
                <span className="font-mono text-[10px] text-[#00F0FF] font-bold block mb-1">CONSTELLATIONS // SYNC</span>
                <span className="text-4xl md:text-5xl font-mono font-extrabold text-white tracking-tight">108+</span>
                <span className="text-white/60 text-xs font-sans block mt-1">LEO orbital assets monitoring spatial vectors</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between font-mono text-[8px] text-white/30">
                <span>QUALIFICATION STATE</span>
                <span>LEO // MEO TRACK</span>
              </div>
            </div>

            {/* Card 3: Startups */}
            <div className="bg-[#04040c]/85 border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-[#FF6B00]/30 transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF6B00]"></div>
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-white/40 tracking-wider font-bold">Ecosystem Startups</span>
                <Shield className="w-4 h-4 text-[#FF6B00]" />
              </div>
              <div className="my-6">
                <span className="font-mono text-[10px] text-[#FF6B00] font-bold block mb-1">IN-SPACe REGISTRATIONS</span>
                <span className="text-4xl md:text-5xl font-mono font-extrabold text-white tracking-tight">250+</span>
                <span className="text-white/60 text-xs font-sans block mt-1">Space-tech entities registered regionally</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between font-mono text-[8px] text-white/30">
                <span>DOMESTIC CAPABILITY</span>
                <span>FIRM_ID: ALL_ACTIVE</span>
              </div>
            </div>

            {/* Card 4: Venture Funding */}
            <div className="bg-[#04040c]/85 border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-[#00E575]/30 transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00E575]"></div>
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-white/40 tracking-wider font-bold">CAPITAL MARKET VALUE</span>
                <Activity className="w-4 h-4 text-[#00E575]" />
              </div>
              <div className="my-6">
                <span className="font-mono text-[10px] text-[#00E575] font-bold block mb-1">SINGLE-YEAR INFLOWS</span>
                <span className="text-4xl md:text-5xl font-mono font-extrabold text-white tracking-tight">$120M+</span>
                <span className="text-white/60 text-xs font-sans block mt-1">Institutional venture funding raised</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between font-mono text-[8px] text-white/30">
                <span>MARKET MULTIPLE TARGET</span>
                <span>15x - 22x EV/REV</span>
              </div>
            </div>

          </div>

          {/* Right Column: Terminal Logging Feed */}
          <div className="lg:col-span-4 bg-[#04040c]/90 border border-white/5 rounded-xl p-5 flex flex-col justify-between shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div>
              {/* Terminal Head */}
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4 font-mono text-[9px] text-white/50">
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="font-bold text-white/80">LIVE TELEMETRY STREAM</span>
              </div>

              {/* Logs area */}
              <div className="space-y-3 font-mono text-[8px] max-h-[35dvh] overflow-y-auto pr-1">
                {logs.length === 0 && (
                  <span className="text-white/20 italic animate-pulse">Establishing handshake telemetry...</span>
                )}
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-start border-b border-white/[0.02] pb-1.5"
                  >
                    <span className="text-[#00F0FF]">{log.text}</span>
                    <span className="text-white/30 select-none">{log.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer encryption */}
            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between font-mono text-[7px] text-white/20 select-none">
              <span>CRYPTO_KEY: NaVIC_VERIFIED</span>
              <span>SLIDE 02</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

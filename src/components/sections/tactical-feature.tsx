"use client";

import React, { useEffect, useState } from "react";
import { Shield, Eye, CheckCircle2, Radio, Server } from "lucide-react";
import { motion } from "motion/react";

export function TacticalFeature() {
  const [telemetry, setTelemetry] = useState<string[]>([
    "SYS_INIT: OK",
    "ORBIT_RADAR: READY",
    "NAV_LOCK: GSAT-7A / ACTIVE",
    "SCANNING: GEOSYNCHRONOUS LAYER",
  ]);

  // Periodically add mock telemetry logs to show an active system
  useEffect(() => {
    const logs = [
      "DEBRIS ALIGN: SEC-09 CLEAR",
      "OBJECT DETECTED: UNIDENTIFIED LEO (342KM)",
      "NAV_GRID: SYNC 99.98%",
      "TTC_LINK: ACTIVE (BENGALURU STAT)",
      "THREAT_LEVEL: NOMINAL",
      "ISRO_SSA: TRACKING 42 PAYLOADS",
      "SIG_INT: KU-BAND SCAN COMPLETE",
    ];

    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      const timestamp = new Date().toLocaleTimeString().split(" ")[0];
      setTelemetry((prev) => [`[${timestamp}] ${randomLog}`, ...prev.slice(0, 3)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Secure space assets monitoring",
      desc: "Real-time orbital tracking and predictive hazard mitigations for national assets."
    },
    {
      title: "Next-Gen Counter-measure Platforms",
      desc: "Protecting sovereign communication pipelines against terrestrial and orbital threats."
    }
  ];

  return (
    <section
      id="opportunity"
      className="relative py-24 md:py-36 bg-[#030308] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Context & Bullet items */}
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-3">
              04. MILITARY SPACE DOMINANCE
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Space Is No Longer Just Exploration. <br />
              <span className="text-[#FF6B00]">It Is The New High Ground.</span>
            </h2>

            <p className="text-white/60 text-sm md:text-base mt-6 font-sans leading-relaxed">
              The militarization of space is an operational reality. Armed with counter-space capabilities
              and next-generation intelligence platforms, sovereignty extends directly to geo-synchronous orbit.
            </p>

            <p className="text-white/40 text-xs md:text-sm mt-4 font-sans leading-relaxed">
              The Indian Space Research Agency (ISRO) is rapidly building capabilities for Space Situational Awareness (SSA)
              and secure, hardened satellite communications for unified battle networks.
            </p>

            {/* Checklist */}
            <div className="mt-8 space-y-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0" />
                  </div>
                  <div>
                    <h4 className="text-white text-base font-bold tracking-tight">
                      {feat.title}
                    </h4>
                    <p className="text-white/40 text-xs md:text-sm mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tactical Radar Mockup */}
          <div className="p-2 rounded-[32px] bg-white/[0.01] border border-white/5 shadow-2xl relative">
            {/* Outer metallic bezel */}
            <div className="rounded-[28px] bg-[#05050f] border border-white/10 p-6 overflow-hidden">
              {/* Radar Screen Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00F0FF] animate-pulse" />
                  <span className="font-mono text-[9px] tracking-wider text-white/80">
                    ISRO-SSA RADAR CONSOLE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#00E575] relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E575] opacity-75"></span>
                  </span>
                  <span className="font-mono text-[9px] text-[#00E575] tracking-widest uppercase">
                    SYS_ACTIVE
                  </span>
                </div>
              </div>

              {/* Radar Screen Visual Area */}
              <div className="relative aspect-square max-w-[340px] mx-auto rounded-full border border-[#00F0FF]/15 bg-[#030308] flex items-center justify-center overflow-hidden mb-6 shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]">
                {/* Conic sweep element */}
                <div className="absolute inset-0 bg-radar-sweep animate-spin origin-center duration-8000" style={{ animationDuration: "8s" }}></div>

                {/* Radar Grid Rings */}
                <div className="absolute w-[80%] aspect-square rounded-full border border-[#00F0FF]/10 border-dashed"></div>
                <div className="absolute w-[60%] aspect-square rounded-full border border-[#00F0FF]/5"></div>
                <div className="absolute w-[40%] aspect-square rounded-full border border-[#00F0FF]/10 border-dashed"></div>
                <div className="absolute w-[20%] aspect-square rounded-full border border-[#00F0FF]/5"></div>

                {/* Radar Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-white/5"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-px bg-white/5"></div>
                </div>

                {/* Glowing target blips */}
                <span className="absolute top-[35%] left-[25%] h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse"></span>
                <span className="absolute top-[65%] left-[65%] h-2 w-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse duration-1000"></span>
                <span className="absolute top-[18%] left-[70%] h-1.5 w-1.5 rounded-full bg-[#00E575] shadow-[0_0_6px_#00E575] animate-pulse duration-700"></span>

                {/* Center marker */}
                <span className="absolute h-1.5 w-1.5 rounded-full bg-white border border-[#030308] z-10"></span>
              </div>

              {/* Live Telemetry Log Footer */}
              <div className="bg-[#030308] border border-white/5 rounded-xl p-4 font-mono text-[9px] text-[#00F0FF]/90 space-y-1.5">
                <div className="flex items-center gap-1.5 text-white/50 border-b border-white/5 pb-2 mb-2">
                  <Server className="w-3.5 h-3.5 shrink-0" />
                  <span className="tracking-wider">LIVE TELEMETRY STREAM</span>
                </div>
                {telemetry.map((log, idx) => (
                  <div key={idx} className="flex justify-between items-center whitespace-nowrap overflow-hidden">
                    <span className="opacity-95 text-ellipsis overflow-hidden">{log}</span>
                    {idx === 0 && <span className="text-[8px] px-1 bg-[#00F0FF]/15 text-[#00F0FF] ml-2 shrink-0 animate-pulse">NEW</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

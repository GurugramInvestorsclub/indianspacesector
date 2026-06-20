"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Eye, EyeOff } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  codename: string;
  details: string;
  redacted: string;
}

export function Origins() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const toggleReveal = (idx: number) => {
    setRevealed((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const timeline: TimelineEvent[] = [
    {
      year: "1975",
      title: "Aryabhata Spacecraft",
      codename: "MISSION_ARYA_01",
      details: "India's first sovereign satellite launched into orbit, establishing core orbital engineering and telemetry capabilities.",
      redacted: "COMMUNICATION ENCRYPTED. TELEMETRY CO-BROKERED VIA SOVIET LAUNCH VEHICLE COSMOS-3M."
    },
    {
      year: "1980s-90s",
      title: "Launcher Autonomy",
      codename: "PROPULSION_AUTO",
      details: "Successful deployment of the SLV-3, ASLV, and the operational workhorse PSLV, ending reliance on foreign launch vehicles.",
      redacted: "CRYOGENIC ENGINE KNOWLEDGE ACQUISITION RESISTED BY WESTERN EXPORT CONTROLS. LIQUID ENGINE DEVELOPMENT REDIRECTED TO VIKAS TECH."
    },
    {
      year: "2020",
      title: "The Liberalization Decree",
      codename: "OPEN_MARKET_2020",
      details: "Sovereign deregulation. Establishment of IN-SPACe to authorize private rocket operators, commercial launches, and satellite assembly hubs.",
      redacted: "100% FOREIGN DIRECT INVESTMENT (FDI) PERMITTED IN COMPONENT MANUFACTURING AND SATELLITE OPERATIONS."
    }
  ];

  return (
    <section
      id="origins"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] border-t border-white/5 scroll-snap-align-start overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-[20%] w-[350px] h-[350px] rounded-full bg-[#FF6B00]/5 filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Title Block */}
          <div className="lg:col-span-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF6B00] uppercase block mb-3">
              01. DECLASSIFIED BRIEFING
            </span>
            <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white">
              Origins of the <br />
              Space Stack
            </h2>
            <p className="text-white/50 text-sm mt-6 font-sans leading-relaxed">
              Tracking India's ascent from academic telemetry baselines to a fully deregulated, commercial launch and hardware powerhouse.
            </p>
            <div className="mt-8 p-4 bg-white/[0.02] border border-white/5 rounded-lg max-w-xs font-mono text-[10px] text-white/40 uppercase tracking-wider">
              <span className="text-[#FF6B00] block mb-1">DOSSIER LEVEL: LEVEL 03</span>
              STRICT SEGREGATION RULE H-12
            </div>
          </div>

          {/* Right Column: Mission Timeline / Redacted Dossiers */}
          <div className="lg:col-span-8 space-y-6">
            {timeline.map((evt, idx) => {
              const isRevealed = !!revealed[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-1.5 rounded-[20px] bg-white/[0.01] border border-white/5 shadow-lg"
                >
                  <div className="bg-[#05050f] border border-white/10 rounded-[16px] p-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-[#FF6B00]/40 transition-all duration-300">
                    
                    {/* Left: Year & Title */}
                    <div className="flex gap-4 items-start">
                      <div className="mt-1 flex items-center justify-center p-2.5 bg-white/5 rounded-lg text-[#FF6B00]">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-lg font-bold text-white tracking-tight">{evt.year}</span>
                          <span className="font-mono text-[8px] tracking-widest text-[#FF6B00]/80 uppercase px-2 py-0.5 rounded border border-[#FF6B00]/30 bg-[#FF6B00]/5">
                            {evt.codename}
                          </span>
                        </div>
                        <h4 className="text-white text-base font-bold mt-1 tracking-tight">{evt.title}</h4>
                        <p className="text-white/50 text-xs mt-2 font-sans leading-relaxed max-w-lg">
                          {evt.details}
                        </p>
                      </div>
                    </div>

                    {/* Right: Redacted dossier lock */}
                    <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-2 shrink-0 border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                      <button
                        onClick={() => toggleReveal(idx)}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/80 font-mono text-[9px] tracking-wider rounded-sm transition-all duration-200 cursor-pointer"
                      >
                        {isRevealed ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> HIDE DETAILS
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-[#FF6B00]" /> DECLASSIFY
                          </>
                        )}
                      </button>
                      <div className={`mt-1 font-mono text-[9px] tracking-wide leading-relaxed p-2.5 rounded border text-left md:text-right max-w-xs md:max-w-md transition-all duration-300 ${
                        isRevealed 
                          ? "bg-white/[0.03] border-white/10 text-white/80 font-medium" 
                          : "bg-white/[0.01] border-white/5 text-white/15 select-none blur-[2px]"
                      }`}>
                        {isRevealed ? evt.redacted : "[CLASSIFIED DETAILS SECURED]"}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

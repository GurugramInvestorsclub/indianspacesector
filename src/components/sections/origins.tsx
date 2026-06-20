"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
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
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background space image with dark overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/space_bg.png"
          alt="Space background starry sky"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.4] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/95 via-[#030308]/65 to-[#030308]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      {/* Ambient highlights */}
      <div className="absolute top-1/2 left-[20%] w-[350px] h-[350px] rounded-full bg-[#FF6B00]/5 filter blur-[120px] pointer-events-none z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Title Block */}
          <div className="lg:col-span-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF6B00] uppercase block mb-3 font-semibold">
              01. DECLASSIFIED BRIEFING
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white">
              Origins of the <br />
              Space Stack
            </h2>
            <p className="text-white/40 text-xs md:text-sm mt-4 font-sans leading-relaxed">
              India's climb from academic baseline telemetry to a commercial launcher powerhouse.
            </p>
          </div>

          {/* Right Column: Mission Timeline / Redacted Dossiers */}
          <div className="lg:col-span-8 space-y-4">
            {timeline.map((evt, idx) => {
              const isRevealed = !!revealed[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-1 rounded-[12px] bg-white/[0.01] border border-white/5 shadow-2xl"
                >
                  <div className="bg-[#04040c]/85 border border-white/5 rounded-[8px] p-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-[#00F0FF]/40 transition-all duration-300 backdrop-blur-sm">
                    
                    {/* Left: Year & Title */}
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center justify-center p-2.5 bg-white/5 rounded-md text-[#FF6B00] shrink-0 border border-white/10">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-white tracking-tight">{evt.year}</span>
                          <span className="font-mono text-[7px] tracking-widest text-[#FF6B00] uppercase px-1.5 py-0.5 rounded border border-[#FF6B00]/20 bg-[#FF6B00]/5 font-bold">
                            {evt.codename}
                          </span>
                        </div>
                        <h4 className="text-white text-sm font-bold mt-0.5 tracking-tight">{evt.title}</h4>
                      </div>
                    </div>

                    {/* Right: declassify details */}
                    <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => toggleReveal(idx)}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-[#FF6B00]/40 hover:bg-white/5 text-white font-mono text-[8px] tracking-wider rounded-xs transition-all duration-200 cursor-pointer"
                      >
                        {isRevealed ? (
                          <>
                            <EyeOff className="w-3 h-3" /> HIDE DETAILS
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 text-[#FF6B00]" /> DECLASSIFY
                          </>
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {isRevealed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden w-full md:w-auto"
                          >
                            <div className="mt-1 font-mono text-[8px] tracking-wide leading-relaxed p-3 rounded border border-white/5 text-left md:text-right max-w-xs md:max-w-md bg-[#080814] text-white/50 space-y-1.5">
                              <p className="text-white/70 font-sans text-[10px] leading-relaxed">{evt.details}</p>
                              <div className="h-px bg-white/5 my-1.5"></div>
                              <p className="text-[#FF6B00] font-semibold">{evt.redacted}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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

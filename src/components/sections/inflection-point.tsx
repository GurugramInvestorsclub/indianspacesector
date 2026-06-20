"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { TrendingUp, Landmark, Cpu } from "lucide-react";

export function InflectionPoint() {
  const stats = [
    {
      value: "$44B+",
      label: "Projected Size by 2033",
      colorClass: "text-[#00F0FF]",
      subBadge: "bg-[#00F0FF]/5 text-[#00F0FF] border-[#00F0FF]/15"
    },
    {
      value: "250+",
      label: "Active Startups",
      colorClass: "text-[#FF6B00]",
      subBadge: "bg-[#FF6B00]/5 text-[#FF6B00] border-[#FF6B00]/15"
    },
    {
      value: "50+",
      label: "Sovereign Launches",
      colorClass: "text-[#00E575]",
      subBadge: "bg-[#00E575]/5 text-[#00E575] border-[#00E575]/15"
    }
  ];

  return (
    <section
      id="inflection"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background space image with dark overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/space_bg.png"
          alt="Deep space starfield"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.4] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/95 via-[#030308]/65 to-[#030308]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>
      
      {/* Background glow orb */}
      <div className="absolute bottom-1/4 right-[10%] w-[380px] h-[380px] rounded-full bg-[#00F0FF]/2 filter blur-[120px] pointer-events-none z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Why now / reforms */}
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-3 font-semibold">
              02. THE MARKET ACCELERATION
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white">
              The Inflection <br />
              Point is <span className="text-[#00F0FF]">Now.</span>
            </h2>
            
            <p className="text-white/70 text-sm md:text-base mt-6 font-sans leading-relaxed">
              Deregulatory reforms and domestic engineering arbitrage have triggered an exponential orbital growth curve.
            </p>

            {/* Micro-badges using Cyan/Amber/Green */}
            <div className="mt-8 flex flex-wrap gap-3 font-mono text-[9px] tracking-wider font-semibold">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00F0FF]/5 border border-[#00F0FF]/20 text-[#00F0FF] rounded-xs">
                <Landmark className="w-3.5 h-3.5" /> 100% FDI OPEN
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00]/5 border border-[#FF6B00]/20 text-[#FF6B00] rounded-xs">
                <Cpu className="w-3.5 h-3.5" /> IN-SPACE REGISTERED
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00E575]/5 border border-[#00E575]/20 text-[#00E575] rounded-xs">
                <TrendingUp className="w-3.5 h-3.5" /> GLOBAL DEMAND SYNC
              </span>
            </div>
          </div>

          {/* Right: Big metrics cards */}
          <div className="space-y-4">
            {stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-1 rounded-[12px] bg-white/[0.01] border border-white/5 shadow-2xl"
              >
                <div className="bg-[#04040c]/85 border border-white/5 rounded-[8px] p-4 flex justify-between items-center hover:border-[#00F0FF]/40 transition-all duration-300 backdrop-blur-sm">
                  <div>
                    <span className="font-mono text-[8px] text-white/40 tracking-wider uppercase block">
                      DECLASSIFIED VALUE ACCELERATOR 0{idx + 1}
                    </span>
                    <h4 className="text-white text-sm font-bold mt-0.5 tracking-tight">
                      {st.label}
                    </h4>
                  </div>
                  <span className={`text-3xl md:text-4xl font-mono font-extrabold tracking-tight block ${st.colorClass}`}>
                    {st.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

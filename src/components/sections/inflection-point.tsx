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
      colorClass: "text-[#1F6C9F]",
      subBadge: "bg-[#E1F3FE] text-[#1F6C9F] border-[#1F6C9F]/10"
    },
    {
      value: "250+",
      label: "Active Startups",
      colorClass: "text-[#956400]",
      subBadge: "bg-[#FBF3DB] text-[#956400] border-[#956400]/10"
    },
    {
      value: "50+",
      label: "Sovereign Launches",
      colorClass: "text-[#346538]",
      subBadge: "bg-[#EDF3EC] text-[#346538] border-[#346538]/10"
    }
  ];

  return (
    <section
      id="inflection"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#F7F6F3] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background space image with light overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/space_bg.png"
          alt="Deep space starfield"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale-[60%] sepia-[15%] brightness-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3]/95 via-[#F7F6F3]/60 to-[#F7F6F3]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>
      
      {/* Background glow orb */}
      <div className="absolute bottom-1/4 right-[10%] w-[380px] h-[380px] rounded-full bg-[#1F6C9F]/2 filter blur-[120px] pointer-events-none z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Why now / reforms */}
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#1F6C9F] uppercase block mb-3 font-semibold">
              02. THE MARKET ACCELERATION
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tighter leading-[1.05] text-[#111111]">
              The Inflection <br />
              Point is <span className="text-[#1F6C9F]">Now.</span>
            </h2>
            
            <p className="text-[#2F3437] text-sm md:text-base mt-6 font-sans leading-relaxed">
              Deregulatory reforms and domestic engineering arbitrage have triggered an exponential orbital growth curve.
            </p>

            {/* Micro-badges using Muted Pastels */}
            <div className="mt-8 flex flex-wrap gap-3 font-mono text-[9px] tracking-wider font-semibold">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E1F3FE] border border-[#1F6C9F]/20 text-[#1F6C9F] rounded-xs">
                <Landmark className="w-3.5 h-3.5" /> 100% FDI OPEN
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FBF3DB] border border-[#956400]/20 text-[#956400] rounded-xs">
                <Cpu className="w-3.5 h-3.5" /> IN-SPACE REGISTERED
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EDF3EC] border border-[#346538]/20 text-[#346538] rounded-xs">
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
                className="p-1 rounded-[12px] bg-black/[0.01] border border-black/5 shadow-xs"
              >
                <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-[8px] p-4 flex justify-between items-center hover:border-black/15 transition-all duration-300">
                  <div>
                    <span className="font-mono text-[8px] text-[#787774] tracking-wider uppercase block">
                      DECLASSIFIED VALUE ACCELERATOR 0{idx + 1}
                    </span>
                    <h4 className="text-[#111111] text-sm font-bold mt-0.5 tracking-tight">
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

"use client";

import React from "react";
import { motion } from "motion/react";
import { TrendingUp, Landmark, LandmarkIcon, Cpu } from "lucide-react";

export function InflectionPoint() {
  const drivers = [
    {
      title: "100% FDI Reforms",
      desc: "Complete foreign direct investment permitted for satellite manufacturing and integration systems, bringing institutional liquidity.",
      icon: <Landmark className="w-4 h-4 text-[#00F0FF]" />
    },
    {
      title: "IN-SPACe Clearing",
      desc: "Single-window regulatory clearing platform acting at commercial velocities, bypassing legacy bureaucratic lag.",
      icon: <Cpu className="w-4 h-4 text-[#00F0FF]" />
    },
    {
      title: "Global Demand Capture",
      desc: "Positioning local assembly nodes as highly cost-efficient orbital alternatives for global small-satellite constellations.",
      icon: <TrendingUp className="w-4 h-4 text-[#00F0FF]" />
    }
  ];

  const stats = [
    {
      value: "$44B+",
      label: "Projected Size by 2033",
      colorClass: "text-[#00F0FF]"
    },
    {
      value: "250+",
      label: "Space Tech Startups",
      colorClass: "text-[#FF6B00]"
    },
    {
      value: "50+",
      label: "Successful Satellites",
      colorClass: "text-[#00E575]"
    }
  ];

  return (
    <section
      id="inflection"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] border-t border-white/5 scroll-snap-align-start overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* Background glow orb */}
      <div className="absolute bottom-1/4 right-[10%] w-[380px] h-[380px] rounded-full bg-[#00F0FF]/5 filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Why now / reforms */}
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-3">
              02. THE MARKET ACCELERATION
            </span>
            <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tighter leading-[1.05] text-white">
              The Inflection <br />
              Point is <span className="text-[#00F0FF]">Now.</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base mt-6 font-sans leading-relaxed">
              A synchronized confluence of deregulatory policies, venture funding availability, and structural engineering arbitrage has unlocked exponential scaling.
            </p>

            <div className="mt-8 space-y-6">
              {drivers.map((drv, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 flex items-center justify-center p-2 bg-white/5 border border-white/10 rounded-lg text-[#00F0FF]">
                    {drv.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-base font-bold tracking-tight">{drv.title}</h4>
                    <p className="text-white/40 text-xs md:text-sm mt-1 leading-relaxed max-w-md">
                      {drv.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Big metrics cards */}
          <div className="space-y-6">
            {stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-1.5 rounded-[24px] bg-white/[0.01] border border-white/5 shadow-xl"
              >
                <div className="bg-[#05050f] border border-white/10 rounded-[18px] p-6 flex justify-between items-center hover:border-white/20 transition-all duration-300">
                  <div>
                    <span className="font-mono text-[9px] text-white/40 tracking-wider uppercase block">
                      KEY ACCELERATOR METRIC 0{idx + 1}
                    </span>
                    <h4 className="text-white text-base font-bold mt-1 tracking-tight">
                      {st.label}
                    </h4>
                  </div>
                  <span className={`text-4xl md:text-5xl font-mono font-extrabold tracking-tight block ${st.colorClass}`}>
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

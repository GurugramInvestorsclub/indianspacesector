"use client";

import React from "react";
import { motion } from "motion/react";
import { Briefcase, Rocket } from "lucide-react";

export function Timeline() {
  const events = [
    {
      title: "Rise of Private Players",
      desc: "With the open-market reforms, private entities can now build launch vehicles, satellite constellations, and ground infrastructure. Capital is flooding the sector.",
      icon: <Briefcase className="w-4 h-4 text-[#FF6B00]" />,
      color: "border-[#FF6B00]/30 shadow-[#FF6B00]/5",
      dotBg: "bg-[#FF6B00]",
      badge: "CAPITAL & REGULATION",
      badgeColor: "text-[#FF6B00] bg-[#FF6B00]/10 border-[#FF6B00]/20"
    },
    {
      title: "Various New Launch Vehicles",
      desc: "After the successful demonstration of ISRO's SSLV and private startups' test launches, orbital access is becoming cheaper and more accessible than ever.",
      icon: <Rocket className="w-4 h-4 text-[#00F0FF]" />,
      color: "border-[#00F0FF]/30 shadow-[#00F0FF]/5",
      dotBg: "bg-[#00F0FF]",
      badge: "LAUNCH SYSTEMS",
      badgeColor: "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/20"
    }
  ];

  return (
    <section
      id="stack"
      className="relative py-24 md:py-36 bg-[#030308] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-3">
            02. MARKET TRANSFORMATION
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
            The Industry Has Changed Forever
          </h2>
          <p className="text-white/55 text-sm md:text-base mt-4 font-sans leading-relaxed">
            The trajectory of India's space capabilities is no longer linear. Legislative changes
            and private capital have triggered an exponential curve.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-[0.5px]"></div>

          <div className="space-y-16">
            {events.map((evt, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  } relative`}
                >
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 z-10">
                    <span className={`flex h-3.5 w-3.5 rounded-full ${evt.dotBg} border-2 border-[#030308] shadow-[0_0_10px_currentColor] text-white/90`}>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                    </span>
                  </div>

                  {/* Left Column / Spacer for desktop */}
                  <div className="w-full md:w-1/2 px-0 md:px-12 hidden md:block"></div>

                  {/* Timeline Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2 pl-12 pr-0 md:px-12"
                  >
                    {/* Double-Bezel Card Frame */}
                    <div className="p-1 rounded-[24px] bg-white/[0.02] border border-white/5 shadow-2xl">
                      <div className={`p-6 rounded-[20px] bg-[#070714]/85 border ${evt.color} backdrop-blur-sm transition-all duration-300 hover:border-white/20`}>
                        {/* Header elements */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`font-mono text-[9px] tracking-widest px-2.5 py-1 rounded-sm border ${evt.badgeColor} uppercase font-semibold`}>
                            {evt.badge}
                          </span>
                          <div className="p-2 bg-white/5 rounded-lg text-white/80">
                            {evt.icon}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white tracking-tight">
                          {evt.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/60 text-xs md:text-sm mt-3 font-sans leading-relaxed">
                          {evt.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Cpu, Eye, Radio, Shield } from "lucide-react";

interface InsightSlice {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgImage: string;
  concept: string;
  metric: string;
  desc: string;
}

const INSIGHTS: InsightSlice[] = [
  {
    id: "apps-vs-launch",
    title: "Applications > Launch",
    subtitle: "Downstream Software Dominance",
    icon: <Cpu className="w-5 h-5 text-accent-cyan" />,
    bgImage: "/value_flow.png",
    concept: "Downstream Value Arbitrage",
    metric: "95% Share",
    desc: "Rockets capture headlines, but software applications capture cash. Downstream data integration platforms command enterprise software multiples (15x+ EV/Rev) compared to low-margin launch services (4x-6x)."
  },
  {
    id: "ground-infra",
    title: "Ground segment utility",
    subtitle: "The Invisible Cash Flow",
    icon: <Radio className="w-5 h-5 text-accent-cyan" />,
    bgImage: "/ground_station.png",
    concept: "Ground-Station-as-a-Service",
    metric: "18% CAGR",
    desc: "LEO constellations are useless without downstream signal reception. Ground segment TTC antennas and software-defined modems act as toll-road cash-flow utilities, charging on a per-pass subscription basis."
  },
  {
    id: "defense-capital",
    title: "Defense Anchoring",
    subtitle: "Dual-Use Capital Guarantees",
    icon: <Shield className="w-5 h-5 text-accent-orange" />,
    concept: "Sovereign Procurement",
    bgImage: "/sat_network.png",
    metric: "$2.1B Est.",
    desc: "National security needs guarantee long-term contracts. Dual-use aerospace hardware platforms leverage defense contracts to subsidize their commercial applications development, shielding them from startup capital freezes."
  },
  {
    id: "data-vs-hw",
    title: "Data > Hardware",
    subtitle: "Appreciating Digital Assets",
    icon: <Eye className="w-5 h-5 text-accent-cyan" />,
    concept: "Multi-Temporal Data Accumulation",
    bgImage: "/sat_const.png",
    metric: "80% Gross Margin",
    desc: "Satellites degrade and burn up in orbit, but the captured geospatial, spectral, and RF intelligence archives appreciate in value as historical baselines, yielding software-like recursive margins."
  }
];

interface ChapterEightProps {
  onActiveState: () => void;
}

export function ChapterEight({ onActiveState }: ChapterEightProps) {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [activeMobileSlice, setActiveMobileSlice] = useState<string>("apps-vs-launch");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActiveState();
        }
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById("chapter-8");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [onActiveState]);

  return (
    <section 
      id="chapter-8" 
      className="relative w-full min-h-[100dvh] py-32 bg-[#020206] border-t border-space-border/20 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-6 mb-12">
        <span className="font-mono text-[10px] tracking-[0.2em] text-accent-cyan uppercase block mb-1">
          CHAPTER 08 : THE INVISIBLE ECONOMICS
        </span>
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
          What Most People Miss
        </h2>
        <p className="text-white/50 text-sm mt-4 max-w-2xl font-sans leading-relaxed">
          Behind the visual fire of launching rockets lies the true economic substrate of space. Hover or tap to expand the strategic arbitrage opportunities driving professional investment.
        </p>
      </div>

      {/* Desktop View: Horizontal Accordion Slider */}
      <div className="hidden md:flex max-w-7xl w-full mx-auto px-6 h-[480px] gap-4 items-stretch">
        {INSIGHTS.map((slice) => {
          const isHovered = hoveredSlice === slice.id;
          const isAnyHovered = hoveredSlice !== null;
          
          // Width classes: If hovered, take up more space. If another is hovered, take less.
          let flexClass = "flex-1";
          if (isHovered) flexClass = "flex-[2.8]";
          else if (isAnyHovered) flexClass = "flex-[0.65]";

          return (
            <div
              key={slice.id}
              onMouseEnter={() => setHoveredSlice(slice.id)}
              onMouseLeave={() => setHoveredSlice(null)}
              className={`relative overflow-hidden rounded-3xl border border-white/5 transition-all duration-700 ease-out bg-[#04040c] flex flex-col justify-between p-6 ${flexClass}`}
            >
              {/* Background Image wash */}
              <div 
                className="absolute inset-0 z-0 opacity-15 transition-all duration-700 ease-out scale-105"
                style={{ 
                  backgroundImage: `url(${slice.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: isHovered ? "saturate-100 opacity-30 scale-100" : "saturate-0" 
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/50 to-transparent z-0"></div>

              {/* Upper Header section */}
              <div className="relative z-10 flex items-start justify-between">
                <div className={`p-2.5 rounded-xl border transition-colors ${
                  isHovered ? "bg-accent-cyan/15 border-accent-cyan text-accent-cyan" : "bg-white/5 border-white/10 text-white/60"
                }`}>
                  {slice.icon}
                </div>
                
                <span className="font-mono text-2xl font-extrabold text-white/5 tracking-tighter">
                  {slice.metric}
                </span>
              </div>

              {/* Content block */}
              <div className="relative z-10 mt-24">
                <span className="font-mono text-[9px] text-accent-cyan tracking-widest uppercase block mb-1">
                  {slice.concept}
                </span>
                
                <h3 className="text-lg lg:text-xl font-sans font-extrabold text-white tracking-tight leading-snug">
                  {slice.title}
                </h3>
                
                <span className="text-white/40 text-[10px] font-mono block mt-0.5">
                  {slice.subtitle}
                </span>

                {/* Animated expandable description */}
                <div 
                  className={`transition-all duration-500 ease-out overflow-hidden mt-4 ${
                    isHovered ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs text-white/70 leading-relaxed font-sans pt-1 border-t border-white/5">
                    {slice.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile View: Vertical Accordion */}
      <div className="flex md:hidden flex-col px-6 gap-3">
        {INSIGHTS.map((slice) => {
          const isActive = activeMobileSlice === slice.id;
          return (
            <div
              key={slice.id}
              onClick={() => setActiveMobileSlice(slice.id)}
              className={`rounded-2xl border border-white/5 bg-[#050510] overflow-hidden p-5 transition-all duration-300 ${
                isActive ? "border-accent-cyan/30" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60">
                    {slice.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{slice.title}</h3>
                    <span className="text-[9px] font-mono text-white/40 block">{slice.concept}</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-accent-cyan">{slice.metric}</span>
              </div>

              {isActive && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-xs text-white/70 leading-relaxed">
                    {slice.desc}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}

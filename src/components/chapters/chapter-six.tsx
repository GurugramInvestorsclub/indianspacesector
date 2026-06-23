"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Zap, TrendingUp, Cpu, Users, BarChart3, AlertCircle } from "lucide-react";

interface CompareMetric {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  insight: string;
  data: {
    country: string;
    score: number; // out of 100
    displayValue: string;
    highlight?: boolean;
  }[];
}

const COMPARISON_METRICS: CompareMetric[] = [
  {
    id: "cost",
    name: "Cost Advantage",
    icon: <Zap className="w-4 h-4 text-accent-cyan" />,
    description: "Average cost per kilogram for payloads sent into Low Earth Orbit (LEO).",
    insight: "India retains a massive 30-40% engineering and assembly cost arbitrage compared to Western markets, allowing commercial launches to be highly price-competitive.",
    data: [
      { country: "India", score: 95, displayValue: "~$3,000/kg (Highly Optimized)", highlight: true },
      { country: "USA", score: 65, displayValue: "~$5,000/kg (Falcon 9 Rideshare)" },
      { country: "China", score: 60, displayValue: "~$6,000/kg (Long March commercial)" },
      { country: "Europe", score: 30, displayValue: "~$12,000 - $15,000/kg (Ariane 6)" }
    ]
  },
  {
    id: "private",
    name: "Private Sector Growth",
    icon: <Users className="w-4 h-4 text-accent-cyan" />,
    description: "Volume of private investment, venture capital rounds, and commercial space startups.",
    insight: "While the US space sector dominates venture volume (driven by SpaceX and deep aerospace funds), India's regulatory liberalization has triggered a massive startup CAGR since 2020.",
    data: [
      { country: "USA", score: 98, displayValue: "$6.5B Annual VC (Unrivaled)" },
      { country: "China", score: 70, displayValue: "$1.5B (State-Backed Startups)" },
      { country: "India", score: 60, displayValue: "$120M+ (Fastest Growing CAGR)", highlight: true },
      { country: "Europe", score: 55, displayValue: "$400M (Highly Fragmented)" }
    ]
  },
  {
    id: "payload",
    name: "Heavy Launch Lift",
    icon: <TrendingUp className="w-4 h-4 text-accent-cyan" />,
    description: "Maximum payload lifting capability (Metric Tons) to GTO/LEO orbits.",
    insight: "USA commands an absolute monopoly on heavy lift capacity via SpaceX Falcon Heavy/Starship. India's LVM3 remains mid-lift, but next-gen semi-cryogenic launchers are in active development.",
    data: [
      { country: "USA", score: 100, displayValue: "22.8 Tons to GTO (Falcon Heavy)" },
      { country: "China", score: 80, displayValue: "14 Tons to GTO (Long March 5)" },
      { country: "Europe", score: 65, displayValue: "11.5 Tons to GTO (Ariane 6)" },
      { country: "India", score: 45, displayValue: "4 Tons to GTO (LVM3)", highlight: true }
    ]
  },
  {
    id: "satellites",
    name: "Constellation Scale",
    icon: <Cpu className="w-4 h-4 text-accent-cyan" />,
    description: "Number of active communications and surveillance satellite transponders in orbit.",
    insight: "Starlink and Kuiper give the US a significant lead in constellation density. India is shifting from single large spacecraft to massive micro-satellite networks (Pixxel, Dhruva).",
    data: [
      { country: "USA", score: 98, displayValue: "6,000+ Satellites (Starlink Core)" },
      { country: "China", score: 75, displayValue: "1,200+ Satellites (State Networks)" },
      { country: "Europe", score: 50, displayValue: "500+ Satellites (Oneweb / Commercial)" },
      { country: "India", score: 35, displayValue: "110+ Satellites (Scaling Fast)", highlight: true }
    ]
  },
  {
    id: "defense",
    name: "Defense Integration",
    icon: <Award className="w-4 h-4 text-accent-cyan" />,
    description: "Sovereign intelligence, surveillance, and independent navigation constellation coverage.",
    insight: "India is highly integrated in spatial security (NavIC + operational surveillance radar networks), serving as a crucial autonomous defense deterrent in the Indo-Pacific.",
    data: [
      { country: "USA", score: 98, displayValue: "Global Military Grid (GPS/ISR)" },
      { country: "China", score: 90, displayValue: "Indo-Pacific Radar Lock (BeiDou)" },
      { country: "India", score: 75, displayValue: "Sub-Continental Coverage (NavIC)", highlight: true },
      { country: "Europe", score: 60, displayValue: "Galileo Sovereign Positioning" }
    ]
  }
];

interface ChapterSixProps {
  onActiveState: () => void;
}

export function ChapterSix({ onActiveState }: ChapterSixProps) {
  const [activeMetricId, setActiveMetricId] = useState<string>("cost");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActiveState();
        }
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById("chapter-6");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [onActiveState]);

  const activeMetric = COMPARISON_METRICS.find(m => m.id === activeMetricId) || COMPARISON_METRICS[0];

  return (
    <section 
      id="chapter-6" 
      className="relative w-full min-h-[100dvh] py-32 bg-[#030308] border-t border-space-border/20 flex items-center justify-center"
    >
      <div className="max-w-7xl w-full px-6 flex flex-col lg:flex-row gap-12 items-stretch">
        
        {/* Left Column: Metric Selector & Commentary */}
        <div className="w-full lg:w-[40%] flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent-cyan uppercase block mb-1">
              CHAPTER 06 : GLOBAL POSITIONING MATRIX
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Global Comparison
            </h2>
            <p className="text-white/50 text-sm mt-4 font-sans leading-relaxed">
              Analyze the operational metrics of major spatial powers. Toggle dimensions to explore India's competitive cost advantage and areas of emerging growth.
            </p>

            {/* Menu Pills */}
            <div className="flex flex-col gap-2 mt-8">
              {COMPARISON_METRICS.map((metric) => {
                const isSelected = activeMetricId === metric.id;
                return (
                  <button
                    key={metric.id}
                    onClick={() => setActiveMetricId(metric.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border flex items-center gap-3 transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? "bg-accent-cyan/10 border-accent-cyan text-accent-cyan"
                        : "bg-[#06060f]/60 border-white/5 hover:border-white/20 text-white/70 hover:text-white"
                    }`}
                  >
                    <div className={`p-1 rounded-md ${isSelected ? "bg-accent-cyan/15 text-accent-cyan" : "bg-white/5 text-white/50"}`}>
                      {metric.icon}
                    </div>
                    <span className="text-xs font-mono font-extrabold tracking-wide">
                      {metric.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alert Info card */}
          <div className="mt-8 bg-[#090918] border border-white/5 p-4 rounded-2xl flex gap-3 items-start shadow-md">
            <AlertCircle className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider block">Strategic Insight</span>
              <p className="text-xs text-white/70 font-sans leading-relaxed mt-1">
                {activeMetric.insight}
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Comparative Dashboard Graphic */}
        <div className="flex-1 bg-[#04040c] border border-space-border rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"></div>

          {/* Chart Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-8">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent-cyan" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 font-bold">
                Comparative Analytics Dashboard
              </span>
            </div>
            <span className="font-mono text-[9px] text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/35 px-2 py-0.5 rounded">
              Metric: {activeMetric.name}
            </span>
          </div>

          {/* Morphing Horizontal Bars */}
          <div className="space-y-8 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMetric.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {activeMetric.data.map((cData) => (
                  <div key={cData.country} className="space-y-2">
                    {/* Country Name & Value */}
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className={`font-bold flex items-center gap-2 ${cData.highlight ? "text-accent-cyan" : "text-white/70"}`}>
                        {cData.country === "India" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
                        )}
                        {cData.country}
                      </span>
                      <span className={cData.highlight ? "text-accent-cyan font-bold" : "text-white/50"}>
                        {cData.displayValue}
                      </span>
                    </div>

                    {/* Progress slider bar */}
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cData.score}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          cData.highlight 
                            ? "bg-gradient-to-r from-accent-cyan to-[#00c0ff] shadow-[0_0_8px_rgba(255, 184, 0,0.4)]" 
                            : "bg-white/15"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Legend and Metadata Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/30">
            <span>DATA SOURCE: COMMERCIAL LAUNCH AUDITS & SEC REGULATORY FILINGS</span>
            <span>UPDATED: Q2 2026</span>
          </div>

        </div>

      </div>
    </section>
  );
}

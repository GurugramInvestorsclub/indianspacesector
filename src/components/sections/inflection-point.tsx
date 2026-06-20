"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { TrendingUp, Landmark, Cpu } from "lucide-react";

interface StatItem {
  targetValue: number;
  prefix: string;
  suffix: string;
  label: string;
  colorClass: string;
  spotlightColor: string;
  subBadge: string;
}

// Custom Rolling Number component using requestAnimationFrame
function RollingNumber({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const duration = 1800; // 1.8 seconds

    const run = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(run);
      }
    };

    requestAnimationFrame(run);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono font-extrabold tracking-tight">
      {prefix}{current}{suffix}
    </span>
  );
}

export function InflectionPoint() {
  const stats: StatItem[] = [
    {
      targetValue: 44,
      prefix: "$",
      suffix: "B+",
      label: "Projected Size by 2033",
      colorClass: "text-[#00F0FF]",
      spotlightColor: "rgba(0, 240, 255, 0.07)",
      subBadge: "bg-[#00F0FF]/5 text-[#00F0FF] border-[#00F0FF]/15"
    },
    {
      targetValue: 250,
      prefix: "",
      suffix: "+",
      label: "Active Startups",
      colorClass: "text-[#FF6B00]",
      spotlightColor: "rgba(255, 107, 0, 0.07)",
      subBadge: "bg-[#FF6B00]/5 text-[#FF6B00] border-[#FF6B00]/15"
    },
    {
      targetValue: 50,
      prefix: "",
      suffix: "+",
      label: "Sovereign Launches",
      colorClass: "text-[#00E575]",
      spotlightColor: "rgba(0, 229, 117, 0.07)",
      subBadge: "bg-[#00E575]/5 text-[#00E575] border-[#00E575]/15"
    }
  ];

  // Mouse move handler for Apple/Linear spotlight tracking effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="inflection"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#030308] scroll-snap-align-start overflow-hidden border-b border-white/5"
    >
      {/* Full-bleed background space image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/space_bg.png"
          alt="Deep space starfield"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/95 via-[#030308]/65 to-[#030308]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>
      
      {/* Background glow orb */}
      <div className="absolute bottom-1/4 right-[10%] w-[380px] h-[380px] rounded-full bg-[#00F0FF]/2 filter blur-[120px] pointer-events-none z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Description & reforms */}
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase block mb-3 font-semibold">
              03. THE MARKET ACCELERATION
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
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00F0FF]/5 border border-[#00F0FF]/20 text-[#00F0FF] rounded-xs shadow-[0_0_8px_rgba(0,240,255,0.05)]">
                <Landmark className="w-3.5 h-3.5" /> 100% FDI OPEN
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00]/5 border border-[#FF6B00]/20 text-[#FF6B00] rounded-xs shadow-[0_0_8px_rgba(255,107,0,0.05)]">
                <Cpu className="w-3.5 h-3.5" /> IN-SPACE REGISTERED
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00E575]/5 border border-[#00E575]/20 text-[#00E575] rounded-xs shadow-[0_0_8px_rgba(0,229,117,0.05)]">
                <TrendingUp className="w-3.5 h-3.5" /> GLOBAL DEMAND SYNC
              </span>
            </div>
          </div>

          {/* Right: Big metrics cards */}
          <div className="space-y-4">
            {stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                className="p-[1.5px] rounded-[14px] bg-white/[0.04] border border-white/5 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.01] hover:border-white/10"
                style={{
                  background: `radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${st.spotlightColor}, transparent 80%)`
                } as any}
              >
                <div className="bg-[#04040c]/85 rounded-[12px] p-5 flex justify-between items-center backdrop-blur-sm relative z-10">
                  <div>
                    <span className="font-mono text-[8px] text-white/40 tracking-wider uppercase block">
                      DECLASSIFIED VALUE ACCELERATOR 0{idx + 1}
                    </span>
                    <h4 className="text-white text-sm font-bold mt-1 tracking-tight">
                      {st.label}
                    </h4>
                  </div>
                  <div className={`text-3xl md:text-4xl font-mono font-extrabold tracking-tight block ${st.colorClass}`}>
                    <RollingNumber value={st.targetValue} prefix={st.prefix} suffix={st.suffix} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "motion/react";

export function SectorAnalysis() {
  const analyses = [
    {
      slug: "satellites",
      title: "The Privatization of LEO",
      desc: "How private entities are building dynamic LEO platforms to capture the global small satellite deployment market.",
      focus: "ORBITAL NETWORKS",
      sizeClass: "md:col-span-2",
      badgeColor: "text-[#FFB800] bg-[#FFB800]/15 border-[#FFB800]/25"
    },
    {
      slug: "defense",
      title: "Sovereign Focus",
      desc: "Armed with counter-space capabilities and next-generation intelligence platforms, sovereignty extends to orbital domains.",
      focus: "DEFENSE DYNAMICS",
      sizeClass: "md:col-span-1",
      badgeColor: "text-[#FF6B00] bg-[#FF6B00]/15 border-[#FF6B00]/25"
    }
  ];

  return (
    <section
      id="analysis"
      className="relative py-24 md:py-36 bg-[#020206] border-t border-white/5"
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FFB800] uppercase block mb-3">
              03. RESEARCH BRIEFS
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Sector Analysis
            </h2>
            <p className="text-white/55 text-sm md:text-base mt-4 font-sans leading-relaxed">
              Deep-dive analysis into the thriving Indian space sector.
            </p>
          </div>
          <div>
            <Link
              href="/chapters/launch-systems"
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-[#FFB800] hover:text-white transition-colors duration-300"
            >
              READ ALL SECTOR ANALYSIS
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyses.map((cs, idx) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`${cs.sizeClass} p-1.5 rounded-[24px] bg-white/[0.01] border border-white/5 shadow-xl`}
            >
              <Link
                href={`/chapters/${cs.slug}`}
                className="group relative h-full flex flex-col justify-between p-8 rounded-[18px] bg-[#04040c]/90 border border-white/5 hover:border-[#FFB800]/30 transition-all duration-500 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className={`font-mono text-[9px] tracking-widest px-2.5 py-1 rounded-sm border ${cs.badgeColor} uppercase font-semibold`}>
                      {cs.focus}
                    </span>
                    <BookOpen className="w-4 h-4 text-white/20 group-hover:text-[#FFB800]/40 transition-colors duration-300" />
                  </div>

                  <h3 className="text-2xl font-sans font-extrabold text-white tracking-tight group-hover:text-[#FFB800] transition-colors duration-300">
                    {cs.title}
                  </h3>

                  <p className="text-white/60 text-sm mt-4 font-sans leading-relaxed">
                    {cs.desc}
                  </p>
                </div>

                <div className="mt-12 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/40 group-hover:text-white transition-colors duration-300">
                  <span className="tracking-wider uppercase">Read Brief</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:text-[#FFB800]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

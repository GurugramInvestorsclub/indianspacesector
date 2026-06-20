"use client";

import React from "react";
import { motion } from "motion/react";

export function Stats() {
  const metrics = [
    {
      value: "$44B+",
      label: "Estimated Space Economy",
      context: "Projected national market capitalization by fiscal year 2033",
      colorClass: "text-[#00F0FF]"
    },
    {
      value: "250+",
      label: "Active Space Startups",
      context: "Independent aerospace and downstream entities registered with IN-SPACe",
      colorClass: "text-[#FF6B00]"
    },
    {
      value: "50+",
      label: "Sovereign Launches",
      context: "Successful orbital payloads and satellite missions executed",
      colorClass: "text-[#00F0FF]"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-[#030308]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-1.5 rounded-[24px] bg-white/[0.01] border border-white/5 shadow-lg"
            >
              <div className="h-full bg-[#05050f] border border-white/5 rounded-[18px] p-8 flex flex-col justify-between hover:border-white/10 transition-colors duration-300">
                <div>
                  <span className={`text-4xl md:text-5xl font-mono font-extrabold tracking-tight block ${m.colorClass}`}>
                    {m.value}
                  </span>
                  <h4 className="text-white text-base font-bold mt-4 tracking-tight">
                    {m.label}
                  </h4>
                </div>
                <p className="text-white/40 text-xs mt-3 leading-relaxed font-sans">
                  {m.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

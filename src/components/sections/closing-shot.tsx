"use client";

import React from "react";
import Image from "next/image";
import { ShieldAlert, Terminal } from "lucide-react";
import { motion } from "motion/react";

export function ClosingShot() {
  return (
    <section
      id="join"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#F7F6F3] overflow-hidden"
    >
      {/* Full-bleed declassified closing visual backdrop */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/closing_cinematic.png"
          alt="Orbital mapping terminal visual"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale-[80%] sepia-[10%] brightness-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F6F3] via-[#F7F6F3]/85 to-[#F7F6F3]"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col justify-between h-[60dvh]">
        {/* Top HUD decoration */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-3 font-mono text-[9px] text-[#956400] tracking-[0.25em] uppercase font-bold"
        >
          <ShieldAlert className="w-4 h-4 text-[#956400]" />
          <span>DECLASSIFIED BRIEFING SESSION CONCLUDED</span>
        </motion.div>

        {/* Center Tagline */}
        <div className="my-auto">
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tighter leading-none text-[#111111] uppercase"
          >
            SOVEREIGNTY SECURED.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-mono text-sm sm:text-lg tracking-[0.2em] text-[#1F6C9F] uppercase mt-6 font-bold"
          >
            Session Terminated &mdash; Link Severed
          </motion.p>
        </div>

        {/* Bottom declassified logs panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto w-full p-4 bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl font-mono text-[9px] text-[#787774] space-y-2 text-left shadow-md"
        >
          <div className="flex items-center gap-1.5 border-b border-[#EAEAEA] pb-2 mb-2 text-[#1F6C9F] font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>SESSION SUMMARY LOG</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">ORBITAL INFRASTRUCTURE LEVEL:</span>
            <span className="text-[#111111] font-bold">OPERATIONAL</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">REGULATORY FDI INFLOWS:</span>
            <span className="text-[#2E7D32] font-bold">ACTIVE // 100% OPEN</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">WEBINAR BRIEFING STREAM:</span>
            <span className="text-[#C5221F] font-bold">OFFLINE (DISCONNECTED)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

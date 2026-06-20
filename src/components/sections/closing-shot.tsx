"use client";

import React from "react";
import Image from "next/image";
import { ShieldAlert, Server, Terminal } from "lucide-react";
import { motion } from "motion/react";

export function ClosingShot() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="join"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] overflow-hidden"
    >
      {/* Full-bleed declassified closing visual backdrop */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/closing_cinematic.png"
          alt="Orbital mapping terminal visual"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020206] via-[#020206]/85 to-[#020206]"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col justify-between h-[60dvh]">
        {/* Top HUD decoration */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-3 font-mono text-[9px] text-[#FF6B00] tracking-[0.25em] uppercase"
        >
          <ShieldAlert className="w-4 h-4 text-[#FF6B00] animate-pulse" />
          <span>DECLASSIFIED BRIEFING SESSION CONCLUDED</span>
        </motion.div>

        {/* Center Tagline */}
        <div className="my-auto">
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tighter leading-none text-white uppercase"
          >
            SOVEREIGNTY SECURED.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-mono text-sm sm:text-lg tracking-[0.2em] text-[#00F0FF] uppercase mt-6"
          >
            Session Terminated &mdash; Link Severed
          </motion.p>
        </div>

        {/* Bottom declassified logs panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto w-full p-4 bg-black/40 border border-white/5 rounded-xl font-mono text-[9px] text-white/50 space-y-2 text-left"
        >
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2 text-[#00F0FF]/85">
            <Terminal className="w-3.5 h-3.5" />
            <span>SESSION SUMMARY LOG</span>
          </div>
          <div className="flex justify-between">
            <span>ORBITAL INFRASTRUCTURE LEVEL:</span>
            <span className="text-white">OPERATIONAL</span>
          </div>
          <div className="flex justify-between">
            <span>REGULATORY FDI INFLOWS:</span>
            <span className="text-[#00E575]">ACTIVE // 100% OPEN</span>
          </div>
          <div className="flex justify-between">
            <span>WEBINAR BRIEFING STREAM:</span>
            <span className="text-[#FF6B00]">OFFLINE (DISCONNECTED)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

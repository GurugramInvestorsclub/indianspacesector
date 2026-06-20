"use client";

import React from "react";
import Image from "next/image";
import { ShieldAlert, Terminal } from "lucide-react";
import { motion } from "motion/react";

export function ClosingShot() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

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

      {/* Ambient Focal Light Sweep */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 30% 20%, rgba(0,240,255,0.06) 0%, transparent 60%)",
            "radial-gradient(circle at 70% 80%, rgba(255,107,0,0.05) 0%, transparent 60%)",
            "radial-gradient(circle at 30% 20%, rgba(0,240,255,0.06) 0%, transparent 60%)"
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="max-w-4xl w-full mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col justify-between h-[60dvh]">
        {/* Top HUD decoration */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-3 font-mono text-[9px] text-[#FF6B00] tracking-[0.25em] uppercase font-bold"
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
            className="font-mono text-sm sm:text-lg tracking-[0.2em] text-[#00F0FF] uppercase mt-6 font-bold"
          >
            Session Terminated &mdash; Link Severed
          </motion.p>
        </div>

        {/* Bottom declassified logs panel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl mx-auto w-full p-4 bg-black/40 border border-white/5 rounded-xl font-mono text-[9px] text-white/50 space-y-2.5 text-left shadow-lg relative overflow-hidden backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2 text-[#00F0FF]/85 font-bold relative z-10">
            <Terminal className="w-3.5 h-3.5" />
            <span>SESSION SUMMARY LOG</span>
          </div>

          <motion.div variants={itemVariants} className="flex justify-between relative z-10">
            <span className="font-semibold text-white/40">ORBITAL INFRASTRUCTURE LEVEL:</span>
            <span className="text-white font-bold uppercase tracking-wider">OPERATIONAL</span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-between relative z-10">
            <span className="font-semibold text-white/40">REGULATORY FDI INFLOWS:</span>
            <span className="text-[#00F0FF] font-bold uppercase tracking-wider">ACTIVE // 100% OPEN</span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-between relative z-10">
            <span className="font-semibold text-white/40">WEBINAR BRIEFING STREAM:</span>
            <span className="text-[#FF6B00] font-bold uppercase tracking-wider">OFFLINE (DISCONNECTED)</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

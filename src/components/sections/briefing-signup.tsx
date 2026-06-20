"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, ShieldCheck, Radio } from "lucide-react";
import { motion } from "motion/react";

export function BriefingSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API registration
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section
      id="join"
      className="relative py-24 md:py-36 bg-[#020206] border-t border-white/5 overflow-hidden flex items-center justify-center"
    >
      {/* Subtle radial glow under content */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#0052FF]/5 filter blur-[100px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-4xl w-full mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Decorative Radar pulse icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-white/5 rounded-full border border-white/10 relative">
            <Radio className="w-6 h-6 text-[#00F0FF] animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
          Join The Live Briefing
        </h2>

        {/* Subhead */}
        <p className="text-white/55 text-sm md:text-base mt-4 max-w-xl mx-auto font-sans leading-relaxed">
          Access our proprietary webinar and research analysis breakdowns on the investment landscape
          of the Indian space sector.
        </p>

        {/* Signup form */}
        <div className="mt-10 max-w-md mx-auto">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-lg bg-[#00E575]/10 border border-[#00E575]/30 text-center flex flex-col items-center gap-2"
            >
              <ShieldCheck className="w-6 h-6 text-[#00E575]" />
              <span className="font-mono text-[10px] tracking-widest text-[#00E575] uppercase font-bold">
                REGISTRATION SECURED
              </span>
              <p className="text-white/60 text-xs mt-1">
                Your spot is reserved. Watch your inbox for access details.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-white/30" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  disabled={status === "loading"}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 bg-[#05050f] border border-white/10 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all font-mono disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 bg-[#0052FF] hover:bg-[#0040D0] disabled:bg-[#0052FF]/60 text-white font-mono text-[10px] tracking-[0.18em] px-6 py-3.5 rounded-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#0066FF]/20 cursor-pointer shrink-0 font-bold"
              >
                {status === "loading" ? "SECURING..." : "SECURE SPOT"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Small Caption */}
        <span className="block font-mono text-[9px] text-white/30 tracking-[0.25em] uppercase mt-8">
          JOIN THE BRIEFING &mdash; SPOTLIGHT ON SOVEREIGNTY
        </span>
      </div>
    </section>
  );
}

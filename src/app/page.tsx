"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Timeline } from "@/components/sections/timeline";
import { Stats } from "@/components/sections/stats";
import { SectorAnalysis } from "@/components/sections/sector-analysis";
import { TacticalFeature } from "@/components/sections/tactical-feature";
import { BriefingSignup } from "@/components/sections/briefing-signup";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full bg-[#030308] text-foreground antialiased selection:bg-[#00F0FF] selection:text-black">
      {/* Floating Header Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Timeline Section */}
      <Timeline />

      {/* Metrics Row Section */}
      <Stats />

      {/* Sector Analysis Section */}
      <SectorAnalysis />

      {/* Tactical Feature & Radar UI Section */}
      <TacticalFeature />

      {/* Briefing Signup Form */}
      <BriefingSignup />

      {/* Footer */}
      <Footer />
    </main>
  );
}

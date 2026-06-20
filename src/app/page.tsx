"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Origins } from "@/components/sections/origins";
import { InflectionPoint } from "@/components/sections/inflection-point";
import { FourPillars } from "@/components/sections/four-pillars";
import { 
  DeepDiveLaunch, 
  DeepDiveSatellites, 
  DeepDiveGround, 
  DeepDiveApplications 
} from "@/components/sections/segment-deep-dives";
import { CaseStudies } from "@/components/sections/case-studies";
import { BriefingSignup } from "@/components/sections/briefing-signup";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#030308] text-foreground antialiased selection:bg-[#00F0FF] selection:text-black">
      {/* Floating Header Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div id="overview" className="snap-start h-[100dvh]">
        <Hero />
      </div>

      {/* Origins Timeline Section */}
      <div id="origins" className="snap-start h-[100dvh]">
        <Origins />
      </div>

      {/* Inflection Point Stats Section */}
      <div id="inflection" className="snap-start h-[100dvh]">
        <InflectionPoint />
      </div>

      {/* Four Pillars Stack Section */}
      <div id="pillars" className="snap-start h-[100dvh]">
        <FourPillars />
      </div>

      {/* Segment Deep-Dives */}
      <div id="deepdive-launch" className="snap-start h-[100dvh]">
        <DeepDiveLaunch id="deepdive-launch" />
      </div>
      <div id="deepdive-satellites" className="snap-start h-[100dvh]">
        <DeepDiveSatellites id="deepdive-satellites" />
      </div>
      <div id="deepdive-ground" className="snap-start h-[100dvh]">
        <DeepDiveGround id="deepdive-ground" />
      </div>
      <div id="deepdive-applications" className="snap-start h-[100dvh]">
        <DeepDiveApplications id="deepdive-applications" />
      </div>

      {/* Case Studies Dossiers */}
      <div id="case-studies" className="snap-start h-[100dvh]">
        <CaseStudies />
      </div>

      {/* Closing Briefing Signup Form & Footer (grouped to fit last slide perfectly) */}
      <div id="join" className="snap-start h-[100dvh] flex flex-col justify-between bg-[#020206] pt-16">
        <div className="flex-grow flex items-center justify-center">
          <BriefingSignup />
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
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
import { ClosingShot } from "@/components/sections/closing-shot";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");

  const sectionsList = [
    "overview",
    "origins",
    "inflection",
    "pillars",
    "deepdive-launch",
    "deepdive-satellites",
    "deepdive-ground",
    "deepdive-applications",
    "case-studies",
    "join"
  ];

  // IntersectionObserver to sync the persistent HUD progress counter
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when the section dominates the center area
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionsList.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getSlideNumber = () => {
    const index = sectionsList.indexOf(activeSection);
    const num = index >= 0 ? index + 1 : 1;
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#030308] text-white antialiased selection:bg-[#00F0FF] selection:text-black">
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

      {/* Closing Visual Summary Frame (replacing previous signup forms) */}
      <div id="join" className="snap-start h-[100dvh]">
        <ClosingShot />
      </div>

      {/* Persistent HUD Progress Counter Overlay */}
      <div className="fixed bottom-6 right-8 md:bottom-8 md:right-12 z-40 font-mono text-[10px] tracking-[0.25em] text-[#00F0FF] bg-[#05050f]/80 border border-white/10 px-4 py-2.5 rounded-sm backdrop-blur-md shadow-2xl flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
        <span className="font-semibold">SECTION {getSlideNumber()} / 10</span>
      </div>
    </div>
  );
}

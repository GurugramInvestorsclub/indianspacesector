"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { BackgroundEngine } from "@/components/background-engine";
import { Hero } from "@/components/sections/hero";
import { MissionControl } from "@/components/sections/mission-control";
import { Origins } from "@/components/sections/origins";
import { InflectionPoint } from "@/components/sections/inflection-point";
import { EcosystemVisualization } from "@/components/sections/ecosystem-visualization";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionsList = [
    "overview",
    "mission-control",
    "origins",
    "inflection",
    "ecosystem",
    "pillars",
    "deepdive-launch",
    "deepdive-satellites",
    "deepdive-ground",
    "deepdive-applications",
    "case-studies",
    "join"
  ];

  // IntersectionObserver to sync active section indicator
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    if (scrollHeight > 0) {
      const pct = target.scrollTop / scrollHeight;
      setScrollProgress(pct);
    }
  };

  const getSlideNumber = () => {
    const index = sectionsList.indexOf(activeSection);
    const num = index >= 0 ? index + 1 : 1;
    return num.toString().padStart(2, "0");
  };

  // Satellite orbit coordinate calculation
  const cx = 25;
  const cy = 25;
  const rx = 18;
  const ry = 7;
  const angle = scrollProgress * 2 * Math.PI - Math.PI / 2; // Start from top
  const theta = -20 * (Math.PI / 180); // Tilt angle
  const rawX = rx * Math.cos(angle);
  const rawY = ry * Math.sin(angle);
  const satX = cx + (rawX * Math.cos(theta) - rawY * Math.sin(theta));
  const satY = cy + (rawX * Math.sin(theta) + rawY * Math.cos(theta));

  return (
    <div 
      onScroll={handleScroll}
      className="h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#030308] text-white antialiased selection:bg-[#00F0FF] selection:text-black relative"
    >
      {/* Interactive Constellation Starfield Engine */}
      <BackgroundEngine />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div id="overview" className="snap-start h-[100dvh]">
        <Hero />
      </div>

      {/* Mission Control Live Transition Console */}
      <div id="mission-control" className="snap-start h-[100dvh]">
        <MissionControl />
      </div>

      {/* Origins Timeline Section */}
      <div id="origins" className="snap-start h-[100dvh]">
        <Origins />
      </div>

      {/* Inflection Point Stats Section */}
      <div id="inflection" className="snap-start h-[100dvh]">
        <InflectionPoint />
      </div>

      {/* Interactive Ecosystem Map Section */}
      <div id="ecosystem" className="snap-start h-[100dvh]">
        <EcosystemVisualization />
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

      {/* Persistent HUD Progress Counter Overlay with Earth & Satellite Orbit */}
      <div className="fixed bottom-6 right-8 md:bottom-8 md:right-12 z-40 font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] bg-[#05050f]/80 border border-white/10 px-4 py-2.5 rounded-sm backdrop-blur-md shadow-2xl flex items-center gap-4">
        {/* Orbital SVG Widget */}
        <div className="relative w-[50px] h-[50px] flex items-center justify-center">
          <svg width="50" height="50" viewBox="0 0 50 50" className="overflow-visible">
            {/* Orbit path */}
            <g transform="rotate(-20 25 25)">
              <ellipse cx="25" cy="25" rx="18" ry="7" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.75" strokeDasharray="3 2" />
            </g>
            {/* Earth */}
            <circle cx="25" cy="25" r="7" fill="#030308" stroke="#00F0FF" strokeWidth="1" />
            {/* Vector details on Earth */}
            <path d="M 21.5,25 A 3.5,3.5 0 0,0 28.5,25" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.4" />
            <path d="M 25,21.5 A 3.5,3.5 0 0,0 25,28.5" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.4" />
            {/* Satellite */}
            <circle cx={satX} cy={satY} r="2" fill="#FF6B00" />
            <circle cx={satX} cy={satY} r="4" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.5" className="animate-pulse" />
          </svg>
        </div>

        <div className="flex flex-col text-left">
          <span className="font-semibold text-white/50 text-[7px] uppercase tracking-widest">Orbital Position</span>
          <span className="font-extrabold text-white text-[10px] mt-0.5">SECTION {getSlideNumber()} / 12</span>
        </div>
      </div>
    </div>
  );
}

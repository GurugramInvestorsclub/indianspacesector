"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface Callout {
  label: string;
  x: number;
  y: number;
  align: "left" | "right";
}

interface RocketData {
  id: string;
  name: string;
  year: string;
  breakthrough: string;
  desc: string;
  height: string;
  weight: string;
  capacity: string;
  stages: string;
  statusText: string;
  image: string;
  callouts: Callout[];
}

export function LaunchEvolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const getSceneTransforms = (index: number) => {
    const ranges = [
      { inStart: 0.0, inEnd: 0.0, outStart: 0.08, outEnd: 0.14 },       // Intro
      { inStart: 0.10, inEnd: 0.14, outStart: 0.22, outEnd: 0.28 },     // SLV-3
      { inStart: 0.24, inEnd: 0.28, outStart: 0.36, outEnd: 0.42 },     // ASLV
      { inStart: 0.38, inEnd: 0.42, outStart: 0.50, outEnd: 0.57 },     // PSLV
      { inStart: 0.52, inEnd: 0.57, outStart: 0.65, outEnd: 0.71 },     // GSLV
      { inStart: 0.67, inEnd: 0.71, outStart: 0.79, outEnd: 0.85 },     // LVM3
      { inStart: 0.81, inEnd: 0.85, outStart: 0.95, outEnd: 1.00 },     // SSLV
    ];
    
    const r = ranges[index];
    
    let opacityInput, opacityOutput;
    let yInput, yOutput;
    let pointerInput, pointerOutput;
    
    if (index === 0) {
      opacityInput = [0.0, r.outStart, r.outEnd];
      opacityOutput = [1, 1, 0];
      yInput = [0.0, r.outEnd];
      yOutput = [0, -40];
      pointerInput = [0.0, r.outStart, r.outEnd];
      pointerOutput = ["auto", "auto", "none"] as any;
    } else {
      opacityInput = [r.inStart, r.inEnd, r.outStart, r.outEnd];
      opacityOutput = [0, 1, 1, 0];
      yInput = [r.inStart, r.inEnd, r.outStart, r.outEnd];
      yOutput = [40, 0, 0, -40];
      pointerInput = [r.inStart, r.inEnd, r.outStart, r.outEnd];
      pointerOutput = ["none", "auto", "auto", "none"] as any;
    }
    
    return { opacityInput, opacityOutput, yInput, yOutput, pointerInput, pointerOutput };
  };

  // Statically declare transforms to satisfy React Hook rules
  const t0 = getSceneTransforms(0);
  const opacity0 = useTransform(scrollYProgress, t0.opacityInput, t0.opacityOutput);
  const y0 = useTransform(scrollYProgress, t0.yInput, t0.yOutput);
  const pe0 = useTransform(scrollYProgress, t0.pointerInput, t0.pointerOutput);

  const t1 = getSceneTransforms(1);
  const opacity1 = useTransform(scrollYProgress, t1.opacityInput, t1.opacityOutput);
  const y1 = useTransform(scrollYProgress, t1.yInput, t1.yOutput);
  const pe1 = useTransform(scrollYProgress, t1.pointerInput, t1.pointerOutput);

  const t2 = getSceneTransforms(2);
  const opacity2 = useTransform(scrollYProgress, t2.opacityInput, t2.opacityOutput);
  const y2 = useTransform(scrollYProgress, t2.yInput, t2.yOutput);
  const pe2 = useTransform(scrollYProgress, t2.pointerInput, t2.pointerOutput);

  const t3 = getSceneTransforms(3);
  const opacity3 = useTransform(scrollYProgress, t3.opacityInput, t3.opacityOutput);
  const y3 = useTransform(scrollYProgress, t3.yInput, t3.yOutput);
  const pe3 = useTransform(scrollYProgress, t3.pointerInput, t3.pointerOutput);

  const t4 = getSceneTransforms(4);
  const opacity4 = useTransform(scrollYProgress, t4.opacityInput, t4.opacityOutput);
  const y4 = useTransform(scrollYProgress, t4.yInput, t4.yOutput);
  const pe4 = useTransform(scrollYProgress, t4.pointerInput, t4.pointerOutput);

  const t5 = getSceneTransforms(5);
  const opacity5 = useTransform(scrollYProgress, t5.opacityInput, t5.opacityOutput);
  const y5 = useTransform(scrollYProgress, t5.yInput, t5.yOutput);
  const pe5 = useTransform(scrollYProgress, t5.pointerInput, t5.pointerOutput);

  const t6 = getSceneTransforms(6);
  const opacity6 = useTransform(scrollYProgress, t6.opacityInput, t6.opacityOutput);
  const y6 = useTransform(scrollYProgress, t6.yInput, t6.yOutput);
  const pe6 = useTransform(scrollYProgress, t6.pointerInput, t6.pointerOutput);

  const sceneStyles = [
    { opacity: opacity0, y: y0, pointerEvents: pe0 },
    { opacity: opacity1, y: y1, pointerEvents: pe1 },
    { opacity: opacity2, y: y2, pointerEvents: pe2 },
    { opacity: opacity3, y: y3, pointerEvents: pe3 },
    { opacity: opacity4, y: y4, pointerEvents: pe4 },
    { opacity: opacity5, y: y5, pointerEvents: pe5 },
    { opacity: opacity6, y: y6, pointerEvents: pe6 },
  ];

  const rockets: RocketData[] = [
    {
      id: "slv3",
      name: "SLV-3",
      year: "1980",
      breakthrough: "Propulsion",
      desc: "India's first solid-propellant vehicle, establishing basic launch capability and deploying Rohini into LEO. It laid the foundation for all subsequent solid motor rocket developments.",
      height: "22 m",
      weight: "17 t",
      capacity: "40 kg (LEO)",
      stages: "4 (Solid)",
      statusText: "STATUS: DECOMMISSIONED / HISTORICAL FOUNDATION",
      image: "/slv3.png",
      callouts: [
        { label: "Rohini Nosecone", x: 50, y: 15, align: "right" },
        { label: "4th Stage Solid Motor", x: 50, y: 45, align: "left" },
        { label: "1st Stage Core Booster", x: 50, y: 80, align: "right" }
      ]
    },
    {
      id: "aslv",
      name: "ASLV",
      year: "1987",
      breakthrough: "Staging",
      desc: "Introduced strap-on boosters and closed-loop guidance systems. ASLV served as a crucial stepping stone to master complex multi-stage separation and control systems.",
      height: "24 m",
      weight: "41 t",
      capacity: "150 kg (LEO)",
      stages: "5 (Solid)",
      statusText: "STATUS: DECOMMISSIONED / GUIDANCE TESTBED",
      image: "/aslv.png",
      callouts: [
        { label: "LEO Payload Fairing", x: 50, y: 15, align: "right" },
        { label: "S1 Strap-On Boosters", x: 25, y: 65, align: "left" },
        { label: "Closed-Loop Guidance System", x: 50, y: 80, align: "right" }
      ]
    },
    {
      id: "pslv",
      name: "PSLV",
      year: "1993",
      breakthrough: "Liquid Engine",
      desc: "Integrated the Vikas liquid engine. Established polar orbit autonomy, becoming the global workhorse of LEO, launching hundreds of foreign and domestic payloads.",
      height: "44 m",
      weight: "295 t",
      capacity: "1,750 kg (SSO)",
      stages: "4 (Solid/Liquid)",
      statusText: "STATUS: ACTIVE / LAUNCH WORKHORSE",
      image: "/pslv.png",
      callouts: [
        { label: "Dual Satellite Fairing", x: 50, y: 12, align: "right" },
        { label: "Vikas Liquid Stage (PS2)", x: 50, y: 45, align: "left" },
        { label: "Strap-On Solid Motors (x6)", x: 30, y: 75, align: "right" }
      ]
    },
    {
      id: "gslv",
      name: "GSLV",
      year: "2001",
      breakthrough: "Cryogenics",
      desc: "Incorporated super-cooled liquid oxygen and hydrogen engines to reach highly demanding Geosynchronous orbits. Secured independent access to geostationary orbit.",
      height: "49.1 m",
      weight: "414 t",
      capacity: "2,500 kg (GTO)",
      stages: "3 + 4 Strap-Ons",
      statusText: "STATUS: ACTIVE / GEOSYNCHRONOUS LIFT",
      image: "/gslv.png",
      callouts: [
        { label: "Bulbous Payload Fairing", x: 50, y: 10, align: "right" },
        { label: "Cryogenic Upper Stage (CUS)", x: 50, y: 35, align: "left" },
        { label: "L40 Liquid Strap-Ons (x4)", x: 28, y: 70, align: "right" }
      ]
    },
    {
      id: "lvm3",
      name: "LVM3",
      year: "2014",
      breakthrough: "Heavy Lift",
      desc: "Mastered heavy-lift cryogenic systems, enabling deep-space missions to the Moon (Chandrayaan) and Mars (Mangalyaan) with heavy payloads. India's heaviest active launcher.",
      height: "43.5 m",
      weight: "640 t",
      capacity: "4,000 kg (GTO)",
      stages: "3 (Heavy)",
      statusText: "STATUS: ACTIVE / DEEP SPACE ASSURED",
      image: "/lvm3.png",
      callouts: [
        { label: "5m Ogive Fairing", x: 50, y: 12, align: "right" },
        { label: "C25 Cryogenic Stage", x: 50, y: 38, align: "left" },
        { label: "S200 Solid Strap-Ons (x2)", x: 25, y: 70, align: "right" }
      ]
    },
    {
      id: "sslv",
      name: "SSLV",
      year: "2022",
      breakthrough: "On-Demand",
      desc: "Miniaturized launch logistics to support commercial deployment with rapid 72-hour integration times, requiring a minimal 6-person crew and launching on-demand.",
      height: "34 m",
      weight: "120 t",
      capacity: "500 kg (LEO)",
      stages: "3 Solid + VTM",
      statusText: "STATUS: ACTIVE / COMMERCIAL ON-DEMAND",
      image: "/sslv.png",
      callouts: [
        { label: "Multi-Satellite Dispenser", x: 50, y: 15, align: "right" },
        { label: "Velocity Trimming Module", x: 50, y: 45, align: "left" },
        { label: "SS1 Solid Core Motor", x: 50, y: 80, align: "right" }
      ]
    }
  ];

  return (
    <div 
      ref={containerRef}
      id="launch-evolution"
      className="relative w-full h-[700vh] bg-[#030308] border-b border-white/10"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between py-16">
        
        {/* Subtle background blueprint grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />

        {/* ----------------- Scene 0: Introduction ----------------- */}
        <motion.div
          style={sceneStyles[0] as any}
          className="absolute inset-0 z-10 flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 w-full h-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-8 items-start">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#00F0FF] uppercase mb-3 block">
                Chapter III: Capability
              </span>
              <h2 
                className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 uppercase leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                The Rocket Equation
              </h2>
            </div>
            <div className="max-w-2xl lg:pt-8">
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-sans mb-6">
                Aryabhata proved India could build satellites. The next challenge was harder: India needed its own wings. From a tiny 22-meter solid motor to heavy cryogenic systems, each launch generation solved a new challenge of thrust, staging, and mass.
              </p>
              <div className="h-[1px] w-24 bg-[#00F0FF]/30 mb-6" />
              <span className="font-mono text-[10px] tracking-widest text-[#00F0FF]/60 uppercase">
                [SCROLL DOWN TO INITIATE LINEUP ANALYSIS]
              </span>
            </div>
          </div>
        </motion.div>

        {/* ----------------- Scenes 1 to 6: Launch Vehicles ----------------- */}
        {rockets.map((rocket, index) => {
          const isEven = index % 2 === 0;
          const sceneStyle = sceneStyles[index + 1];
          
          return (
            <motion.div
              key={rocket.id}
              style={sceneStyle as any}
              className="absolute inset-0 z-10 flex items-center justify-center max-w-7xl mx-auto px-6 md:px-12 w-full h-full"
            >
              <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}>
                
                {/* 1. Double-Bezel Enclosure for the Image & Callouts */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-md bg-white/[0.02] border border-white/10 rounded-[2rem] p-2 md:p-3 shadow-2xl">
                    <div className="relative overflow-hidden w-full h-[35vh] md:h-[50vh] rounded-[calc(2rem-0.5rem)] bg-[#05050f] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      
                      {/* Realistic Rocket Image */}
                      <Image
                        src={rocket.image}
                        alt={`${rocket.name} launch vehicle`}
                        fill
                        priority={index < 2}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center grayscale hover:grayscale-0 contrast-[1.05] brightness-[0.7] hover:brightness-[0.85] transition-all duration-700 pointer-events-none select-none"
                      />
                      
                      {/* Vignette Overlay to blend border */}
                      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,#05050f_95%] pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#05050f]/80 via-transparent to-[#05050f]/80 pointer-events-none" />

                      {/* HUD Grid Overlay */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
                      
                      {/* Telemetry Callout lines overlay */}
                      {rocket.callouts.map((callout, cIdx) => {
                        const isLeft = callout.align === "left";
                        return (
                          <div
                            key={cIdx}
                            className="absolute z-20 pointer-events-none"
                            style={{ top: `${callout.y}%`, left: `${callout.x}%` }}
                          >
                            {/* Pulse Dot */}
                            <span className="absolute flex h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF]"></span>
                            </span>
                            
                            {/* Callout Line */}
                            <div 
                              className={`absolute top-0 h-[1px] bg-gradient-to-r border-t border-dashed border-[#00F0FF]/30 ${
                                isLeft 
                                  ? "right-0 w-5 from-transparent to-[#00F0FF]/40" 
                                  : "left-0 w-5 from-[#00F0FF]/40 to-transparent"
                              }`}
                            />
                            
                            {/* Label */}
                            <div 
                              className={`absolute top-0 flex items-center gap-1.5 pointer-events-none select-none font-mono text-[8px] tracking-wider text-[#00F0FF] whitespace-nowrap bg-[#030308]/90 backdrop-blur-xs px-2 py-0.5 border border-[#00F0FF]/25 rounded shadow-lg shadow-black/80 ${
                                isLeft 
                                  ? "right-5 -translate-y-1/2 flex-row-reverse" 
                                  : "left-5 -translate-y-1/2 flex-row"
                              }`}
                            >
                              <span className="w-1 h-1 rounded-full bg-[#00F0FF]" />
                              <span>{callout.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Text Content & Specification HUD */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  
                  {/* Eyebrow details */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[#00F0FF]/80 uppercase">
                      {rocket.year}
                    </span>
                    <span className="h-[1px] w-6 bg-white/10" />
                    <span className="inline-block border border-[#00F0FF]/20 bg-[#00F0FF]/5 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#00F0FF]">
                      {rocket.breakthrough}
                    </span>
                  </div>

                  {/* Rocket Name */}
                  <h3 
                    className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {rocket.name}
                  </h3>

                  {/* Technical Spec HUD Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6 max-w-sm font-mono text-[10px]">
                    <div className="border border-white/5 bg-white/[0.01] px-3 py-2 rounded">
                      <div className="text-white/40 uppercase tracking-widest mb-0.5 text-[8px]">Height</div>
                      <div className="text-white font-semibold">{rocket.height}</div>
                    </div>
                    <div className="border border-white/5 bg-white/[0.01] px-3 py-2 rounded">
                      <div className="text-white/40 uppercase tracking-widest mb-0.5 text-[8px]">Weight</div>
                      <div className="text-white font-semibold">{rocket.weight}</div>
                    </div>
                    <div className="border border-white/5 bg-white/[0.01] px-3 py-2 rounded">
                      <div className="text-white/40 uppercase tracking-widest mb-0.5 text-[8px]">Payload Capacity</div>
                      <div className="text-white font-semibold text-[#00F0FF]">{rocket.capacity}</div>
                    </div>
                    <div className="border border-white/5 bg-white/[0.01] px-3 py-2 rounded">
                      <div className="text-white/40 uppercase tracking-widest mb-0.5 text-[8px]">Stages</div>
                      <div className="text-white font-semibold">{rocket.stages}</div>
                    </div>
                  </div>

                  {/* Descriptive text */}
                  <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans max-w-lg mb-6">
                    {rocket.desc}
                  </p>

                  {/* Status Bar */}
                  <div className="border-t border-white/5 pt-4">
                    <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase block">
                      {rocket.statusText}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}

        {/* Bottom Section: Technical Footnote & Pacing Ticker */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between border-t border-white/5 pt-6 text-white/40 font-mono text-[9px] tracking-[0.25em] uppercase">
          <span>Telemetry Evolution Grid</span>
          <span>Scroll to advance launch lineup ↓</span>
          <span>Sovereign Access</span>
        </div>

      </div>
    </div>
  );
}

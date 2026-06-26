"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, animate } from "motion/react";

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

interface SectionProps {
  presentationActive?: boolean;
  currentFrameIndex?: number;
}

export function LaunchEvolution({ presentationActive = false, currentFrameIndex = 0 }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const presentationIndex = currentFrameIndex - 17;
  const activeIndexToUse = presentationActive ? presentationIndex : activeIndex;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useMotionValue(0);

  useEffect(() => {
    if (presentationActive) {
      let p = 0;
      if (currentFrameIndex === 17) p = 0.05;
      else if (currentFrameIndex === 18) p = 0.18;
      else if (currentFrameIndex === 19) p = 0.31;
      else if (currentFrameIndex === 20) p = 0.44;
      else if (currentFrameIndex === 21) p = 0.56;
      else if (currentFrameIndex === 22) p = 0.69;
      else if (currentFrameIndex === 23) p = 0.81;
      else if (currentFrameIndex === 24) p = 0.94;
      else if (currentFrameIndex < 17) p = 0.0;
      else p = 1.0;

      const controls = animate(progress, p, { duration: 0.6, ease: [0.25, 1, 0.5, 1] });
      return () => controls.stop();
    } else {
      progress.set(scrollYProgress.get());
      return scrollYProgress.onChange((latest) => {
        progress.set(latest);
      });
    }
  }, [presentationActive, currentFrameIndex, scrollYProgress, progress]);

  // Track active slide index using standard motion value event listener to toggle pointer-events
  useMotionValueEvent(progress, "change", (latest) => {
    // 8 scenes split across 0 to 1 scroll progress range:
    if (latest < 0.125) {
      setActiveIndex(0);
    } else if (latest < 0.25) {
      setActiveIndex(1);
    } else if (latest < 0.375) {
      setActiveIndex(2);
    } else if (latest < 0.50) {
      setActiveIndex(3);
    } else if (latest < 0.625) {
      setActiveIndex(4);
    } else if (latest < 0.75) {
      setActiveIndex(5);
    } else if (latest < 0.875) {
      setActiveIndex(6);
    } else {
      setActiveIndex(7);
    }
  });

  const getSceneTransforms = (index: number) => {
    const ranges = [
      { inStart: 0.0, inEnd: 0.0, outStart: 0.11, outEnd: 0.125 },       // 0: Intro
      { inStart: 0.125, inEnd: 0.14, outStart: 0.235, outEnd: 0.25 },   // 1: SLV-3
      { inStart: 0.25, inEnd: 0.265, outStart: 0.36, outEnd: 0.375 },   // 2: Leadership Failure
      { inStart: 0.375, inEnd: 0.39, outStart: 0.485, outEnd: 0.50 },   // 3: ASLV
      { inStart: 0.50, inEnd: 0.515, outStart: 0.61, outEnd: 0.625 },   // 4: PSLV
      { inStart: 0.625, inEnd: 0.64, outStart: 0.735, outEnd: 0.75 },   // 5: GSLV
      { inStart: 0.75, inEnd: 0.765, outStart: 0.86, outEnd: 0.875 },   // 6: LVM3
      { inStart: 0.875, inEnd: 0.89, outStart: 0.98, outEnd: 1.00 },   // 7: SSLV
    ];
    
    const r = ranges[index];
    
    let opacityInput, opacityOutput;
    let yInput, yOutput;
    
    if (index === 0) {
      // Map across full domain [0.0, 1.0] to prevent extrapolation bugs
      opacityInput = [0.0, r.outStart, r.outEnd, 1.0];
      opacityOutput = [1, 1, 0, 0];
      yInput = [0.0, r.outEnd, 1.0];
      yOutput = [0, -35, -35];
    } else if (index === 7) {
      opacityInput = [0.0, r.inStart, r.inEnd, r.outStart, 1.0];
      opacityOutput = [0, 0, 1, 1, 0];
      yInput = [0.0, r.inStart, r.inEnd, r.outStart, 1.0];
      yOutput = [35, 35, 0, 0, -35];
    } else {
      opacityInput = [0.0, r.inStart, r.inEnd, r.outStart, r.outEnd, 1.0];
      opacityOutput = [0, 0, 1, 1, 0, 0];
      yInput = [0.0, r.inStart, r.inEnd, r.outStart, r.outEnd, 1.0];
      yOutput = [35, 35, 0, 0, -35, -35];
    }
    
    return { opacityInput, opacityOutput, yInput, yOutput };
  };

  // Statically declare transforms for scroll scrubbing (clamped to prevent extrapolation bugs)
  const t0 = getSceneTransforms(0);
  const opacity0 = useTransform(progress, t0.opacityInput, t0.opacityOutput, { clamp: true });
  const y0 = useTransform(progress, t0.yInput, t0.yOutput, { clamp: true });

  const t1 = getSceneTransforms(1);
  const opacity1 = useTransform(progress, t1.opacityInput, t1.opacityOutput, { clamp: true });
  const y1 = useTransform(progress, t1.yInput, t1.yOutput, { clamp: true });

  const t2 = getSceneTransforms(2);
  const opacity2 = useTransform(progress, t2.opacityInput, t2.opacityOutput, { clamp: true });
  const y2 = useTransform(progress, t2.yInput, t2.yOutput, { clamp: true });

  const t3 = getSceneTransforms(3);
  const opacity3 = useTransform(progress, t3.opacityInput, t3.opacityOutput, { clamp: true });
  const y3 = useTransform(progress, t3.yInput, t3.yOutput, { clamp: true });

  const t4 = getSceneTransforms(4);
  const opacity4 = useTransform(progress, t4.opacityInput, t4.opacityOutput, { clamp: true });
  const y4 = useTransform(progress, t4.yInput, t4.yOutput, { clamp: true });

  const t5 = getSceneTransforms(5);
  const opacity5 = useTransform(progress, t5.opacityInput, t5.opacityOutput, { clamp: true });
  const y5 = useTransform(progress, t5.yInput, t5.yOutput, { clamp: true });

  const t6 = getSceneTransforms(6);
  const opacity6 = useTransform(progress, t6.opacityInput, t6.opacityOutput, { clamp: true });
  const y6 = useTransform(progress, t6.yInput, t6.yOutput, { clamp: true });

  const t7 = getSceneTransforms(7);
  const opacity7 = useTransform(progress, t7.opacityInput, t7.opacityOutput, { clamp: true });
  const y7 = useTransform(progress, t7.yInput, t7.yOutput, { clamp: true });

  const sceneStyles = [
    { opacity: opacity0, y: y0 },
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
    { opacity: opacity3, y: y3 },
    { opacity: opacity4, y: y4 },
    { opacity: opacity5, y: y5 },
    { opacity: opacity6, y: y6 },
    { opacity: opacity7, y: y7 },
  ];

  const rockets: RocketData[] = [
    {
      id: "leadership",
      name: "The Leadership Lesson",
      year: "1979",
      breakthrough: "Failure Analysis",
      desc: "On August 10, 1979, India's first SLV-3 launch failed. A leak in the control system caused the rocket to plunge into the Bay of Bengal. As Project Director, APJ Abdul Kalam was devastated.",
      height: "—",
      weight: "—",
      capacity: "—",
      stages: "—",
      statusText: "SRIHARIKOTA PRESS DEBRIEFING",
      image: "/kalam.png",
      callouts: []
    },
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
      className="relative w-full h-[800vh] bg-[#030308] border-b border-white/10"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between py-16">
        
        {/* Subtle background blueprint grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />

        {/* ----------------- Scene 0: Introduction ----------------- */}
        <motion.div
          style={sceneStyles[0]}
          className={`absolute inset-0 z-10 flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 w-full h-full transition-all duration-300 ${
            activeIndexToUse === 0 ? "pointer-events-auto" : "pointer-events-none"
          } ${
            Math.abs(activeIndexToUse - 0) <= 1 ? "flex" : "hidden"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-8 items-start">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase mb-3 block">
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
              <div className="h-[1px] w-24 bg-[#FFB800]/30 mb-6" />
              <span className="font-mono text-[10px] tracking-widest text-[#FFB800]/60 uppercase">
                [SCROLL DOWN TO INITIATE LINEUP ANALYSIS]
              </span>
            </div>
          </div>
        </motion.div>

        {/* ----------------- Scenes 1 to 6: Launch Vehicles ----------------- */}
        {rockets.map((rocket, index) => {
          const isEven = index % 2 === 0;
          const rocketIndex = index + 1;
          const isActiveToUse = activeIndexToUse === rocketIndex;
          
          if (rocket.id === "leadership") {
            return (
              <motion.div
                key={rocket.id}
                style={sceneStyles[rocketIndex]}
                className={`absolute inset-0 z-10 items-center justify-center max-w-7xl mx-auto px-6 md:px-12 w-full h-full transition-all duration-300 ${
                  isActiveToUse ? "pointer-events-auto" : "pointer-events-none"
                } ${
                  Math.abs(activeIndexToUse - rocketIndex) <= 1 ? "flex" : "hidden"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-8 lg:gap-16 items-center w-full">
                  
                  {/* Left Column: Image of Kalam in double bezel */}
                  <div className="relative flex justify-center w-full">
                    {/* Double Bezel Enclosure */}
                    <div className="relative w-full max-w-xs bg-white/[0.02] border border-white/10 rounded-[2rem] p-2 shadow-2xl">
                      <div className="relative overflow-hidden w-full h-[30vh] md:h-[45vh] rounded-[calc(2rem-0.5rem)] bg-[#05050f] border border-white/5">
                        
                        <Image
                          src={rocket.image}
                          alt="Dr. APJ Abdul Kalam"
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover object-top grayscale contrast-[1.1] brightness-[0.95] select-none pointer-events-none"
                        />
                        
                        {/* Vignette & grid overlays */}
                        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#05050f_90%] pointer-events-none" />
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
                        
                        {/* Target reticle details */}
                        <div className="absolute bottom-4 left-4 font-mono text-[8px] text-white/40 tracking-wider">
                          PROJECT DIRECTOR: SLV-3
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Failure & Leadership Story */}
                  <div className="text-left flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-[#FFB800] uppercase font-bold">
                        August 10, 1979
                      </span>
                      <span className="h-[1px] w-6 bg-white/10" />
                      <span className="inline-block border border-[#FF3B30]/20 bg-[#FF3B30]/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#FF3B30] font-semibold">
                        Launch Failure
                      </span>
                    </div>

                    <h3 
                      className="text-3xl md:text-4xl font-extralight text-white leading-tight"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      The Management of Failure
                    </h3>

                    <p className="text-sm text-white/70 leading-relaxed font-sans max-w-2xl">
                      During the first launch of SLV-3 in 1979, the rocket plunged into the Bay of Bengal due to a valve leak. Kalam, as the Project Director, was devastated. Yet, Chairman Satish Dhawan shielded the team and conducted the press conference himself.
                    </p>

                    <blockquote className="border-l-2 border-[#FFB800] pl-6 py-2 my-1 bg-white/[0.01] max-w-2xl">
                      <p className="text-sm font-mono text-[#FFB800]/80 leading-relaxed uppercase mb-2">
                        Dhawan to the Press (1979):
                      </p>
                      <p className="text-sm font-light text-white/60 italic leading-relaxed">
                        &ldquo;Dear friends, we have failed today. I want to support my technologists, my scientists, my staff, so that next year they succeed.&rdquo;
                      </p>
                    </blockquote>

                    <p className="text-sm text-white/70 leading-relaxed font-sans max-w-2xl mt-1">
                      A year later, when SLV-3 succeeded in July 1980, Dhawan did not take the stage. He asked Kalam to conduct the press conference and address the nation.
                    </p>

                    <blockquote className="border-l-2 border-[#FFB800] pl-6 py-3 my-1 bg-[#FFB800]/5 max-w-2xl rounded-r-md">
                      <p className="text-xs font-mono text-[#FFB800] tracking-widest uppercase mb-1.5 font-bold">
                        Kalam&apos;s Leadership Takeaway:
                      </p>
                      <p className="text-lg md:text-xl font-extralight text-white leading-relaxed italic" style={{ fontFamily: "Georgia, serif" }}>
                        &ldquo;When the failure occurred, the leader owned it up. When the success came, he gave it to his team.&rdquo;
                      </p>
                    </blockquote>
                  </div>

                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={rocket.id}
              style={sceneStyles[rocketIndex]}
              className={`absolute inset-0 z-10 items-center justify-center max-w-7xl mx-auto px-6 md:px-12 w-full h-full transition-all duration-300 ${
                isActiveToUse ? "pointer-events-auto" : "pointer-events-none"
              } ${
                Math.abs(activeIndexToUse - rocketIndex) <= 1 ? "flex" : "hidden"
              }`}
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
                        className="object-cover object-center contrast-[1.02] brightness-[1.05] hover:brightness-[1.15] transition-all duration-700 pointer-events-none select-none"
                      />
                      
                      {/* Vignette Overlay to blend border */}
                      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,#05050f_92%] pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#05050f]/40 via-transparent to-[#05050f]/40 pointer-events-none" />
 
                      {/* HUD Grid Overlay */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
                      
                      {/* Telemetry Callout lines overlay - Staggered fade in when active */}
                      {isActiveToUse && rocket.callouts.map((callout, cIdx) => {
                        const isLeft = callout.align === "left";
                        return (
                          <motion.div
                            key={cIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + cIdx * 0.12, duration: 0.4 }}
                            className="absolute z-20 pointer-events-none"
                            style={{ top: `${callout.y}%`, left: `${callout.x}%` }}
                          >
                            {/* Pulse Dot */}
                            <span className="absolute flex h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFB800]"></span>
                            </span>
                            
                            {/* Callout Line */}
                            <div 
                              className={`absolute top-0 h-[1px] bg-gradient-to-r border-t border-dashed border-[#FFB800]/30 ${
                                isLeft 
                                  ? "right-0 w-5 from-transparent to-[#FFB800]/40" 
                                  : "left-0 w-5 from-[#FFB800]/40 to-transparent"
                              }`}
                            />
                            
                            {/* Label */}
                            <div 
                              className={`absolute top-0 flex items-center gap-1.5 pointer-events-none select-none font-mono text-[8px] tracking-wider text-[#FFB800] whitespace-nowrap bg-[#030308]/90 backdrop-blur-xs px-2 py-0.5 border border-[#FFB800]/25 rounded shadow-lg shadow-black/80 ${
                                isLeft 
                                  ? "right-5 -translate-y-1/2 flex-row-reverse" 
                                  : "left-5 -translate-y-1/2 flex-row"
                              }`}
                            >
                              <span className="w-1 h-1 rounded-full bg-[#FFB800]" />
                              <span>{callout.label}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Text Content & Specification HUD */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  
                  {/* Eyebrow details */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[#FFB800]/80 uppercase">
                      {rocket.year}
                    </span>
                    <span className="h-[1px] w-6 bg-white/10" />
                    <span className="inline-block border border-[#FFB800]/20 bg-[#FFB800]/5 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#FFB800]">
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
                      <div className="text-white font-semibold text-[#FFB800]">{rocket.capacity}</div>
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

"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, animate } from "motion/react";

interface SectionProps {
  presentationActive?: boolean;
  currentFrameIndex?: number;
}

export function NewEra({ presentationActive = false, currentFrameIndex = 0 }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Track scroll progress across the h-[800vh] scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useMotionValue(0);

  // Interpolated state for displaying in React
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {

    if (presentationActive) {
      let p = 0;
      if (currentFrameIndex === 30) p = 0.035;
      else if (currentFrameIndex === 31) p = 0.15;
      else if (currentFrameIndex === 32) p = 0.30;
      else if (currentFrameIndex === 33) p = 0.43;
      else if (currentFrameIndex === 34) p = 0.54;
      else if (currentFrameIndex === 35) p = 0.64;
      else if (currentFrameIndex === 36) p = 0.88;
      else if (currentFrameIndex === 37) p = 0.98;
      else if (currentFrameIndex < 30) p = 0.0;
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

  // -------------------------------------------------------------
  // Scene 1: Transition ("For decades, space was...")
  // Range: 0.0 -> 0.25 (Transition)
  // -------------------------------------------------------------
  const scene1ContainerOpacity = useTransform(progress, [0.0, 0.23, 0.25], [1, 1, 0]);

  // Part A: "For decades..."
  const scene1AOpacity = useTransform(progress, [0.0, 0.01, 0.06, 0.07], [0, 1, 1, 0]);
  const scene1AY = useTransform(progress, [0.0, 0.01, 0.06, 0.07], [15, 0, 0, -15]);

  // Part B: "Today, it is becoming..."
  const scene1BOpacity = useTransform(progress, [0.06, 0.07, 0.23, 0.25], [0, 1, 1, 0]);
  const scene1BY = useTransform(progress, [0.06, 0.07, 0.23, 0.25], [15, 0, 0, -15]);

  // -------------------------------------------------------------
  // Scene 2: The Opportunity Chart (2023 -> 2030)
  // Range: 0.25 -> 0.38
  // -------------------------------------------------------------
  const scene2Opacity = useTransform(progress, [0.23, 0.25, 0.35, 0.38], [0, 1, 1, 0]);
  const barHeight2023 = useTransform(progress, [0.25, 0.31], [0, 10]); // 10% height
  const barHeight2030 = useTransform(progress, [0.25, 0.31], [0, 55]); // 55% height

  // -------------------------------------------------------------
  // Scene 3: The Question ("Why would companies...")
  // Range: 0.38 -> 0.50
  // -------------------------------------------------------------
  const scene3Opacity = useTransform(progress, [0.35, 0.38, 0.48, 0.50], [0, 1, 1, 0]);
  const scene3Y = useTransform(progress, [0.35, 0.38, 0.48, 0.50], [20, 0, 0, -20]);

  // -------------------------------------------------------------
  // Scene 4 & 5: The Constellation & Jio Proof
  // Range: 0.50 -> 0.82 (extended to cover Scene 6's removal)
  // -------------------------------------------------------------
  const scene4Opacity = useTransform(progress, [0.48, 0.50, 0.80, 0.82], [0, 1, 1, 0]);
  const constellationScale = useTransform(progress, [0.48, 0.82], [1.02, 0.97]);
  const constellationImgOpacity = useTransform(progress, [0.48, 0.50, 0.80, 0.82], [0, 0.4, 0.4, 0]);
  
  // Controls the emergence of the constellation nodes and paths
  const orbitRingScale = useTransform(progress, [0.48, 0.60], [0.85, 1.05]);
  const satellitesOpacity = useTransform(progress, [0.49, 0.58], [0, 1]);

  // Map scroll progress to a raw satellite count that goes from 0 to 1600
  const satelliteCount = useTransform(progress, [0.50, 0.58], [0, 1600]);

  useEffect(() => {
    return satelliteCount.onChange((latest) => {
      setDisplayCount(Math.min(1600, Math.floor(latest)));
    });
  }, [satelliteCount]);

  // Jio Statement Opacity
  const jioTextOpacity = useTransform(progress, [0.58, 0.60, 0.80, 0.82], [0, 1, 1, 0]);
  const jioTextY = useTransform(progress, [0.58, 0.60, 0.80, 0.82], [15, 0, 0, -15]);

  // -------------------------------------------------------------
  // Scene 7: The Big Realization ("Railways connected...")
  // Range: 0.82 -> 0.94
  // -------------------------------------------------------------
  const scene7Opacity = useTransform(progress, [0.80, 0.82, 0.92, 0.94], [0, 1, 1, 0]);
  
  // Staggered lines
  const line7AOpacity = useTransform(progress, [0.81, 0.83, 0.92, 0.94], [0, 1, 1, 0]);
  const line7AY = useTransform(progress, [0.81, 0.83, 0.92, 0.94], [15, 0, 0, -15]);

  const line7BOpacity = useTransform(progress, [0.83, 0.85, 0.92, 0.94], [0, 1, 1, 0]);
  const line7BY = useTransform(progress, [0.83, 0.85, 0.92, 0.94], [15, 0, 0, -15]);

  const line7COpacity = useTransform(progress, [0.85, 0.87, 0.92, 0.94], [0, 1, 1, 0]);
  const line7CY = useTransform(progress, [0.85, 0.87, 0.92, 0.94], [15, 0, 0, -15]);

  // -------------------------------------------------------------
  // Scene 8: The Finale (Vision -> Moon -> $44B)
  // Range: 0.94 -> 1.0 (Ends in complete fade-to-black at 1.0)
  // -------------------------------------------------------------
  const scene8Opacity = useTransform(progress, [0.92, 0.94, 0.99, 1.0], [0, 1, 1, 0]);
  const finalBackdropOpacity = useTransform(progress, [0.92, 0.94, 0.99, 1.0], [0, 0.75, 0.75, 0]);
  const finalBackdropScale = useTransform(progress, [0.92, 1.0], [1.04, 0.97]);

  const finalCtaOpacity = useTransform(progress, [0.97, 0.98], [0, 1]);

  return (
    <div 
      ref={containerRef}
      id="opportunities"
      className="relative w-full h-[800vh] bg-[#030308]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#030308]">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255, 184, 0,0.015)_0%,transparent_75%] pointer-events-none z-0" />

        {/* ------------------------------------------------------------- */}
        {/* SCENE 1: Transition */}
        {/* ------------------------------------------------------------- */}
        <motion.div 
          style={{ opacity: reduceMotion ? 1 : scene1ContainerOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto space-y-12 z-10 pointer-events-none"
        >
          <motion.h2
            style={{ 
              opacity: reduceMotion ? 1 : scene1AOpacity, 
              y: reduceMotion ? 0 : scene1AY, 
              fontFamily: "Georgia, serif" 
            }}
            className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white/90 leading-tight"
          >
            For decades, space was a scientific pursuit.
          </motion.h2>

          <motion.h3
            style={{ 
              opacity: reduceMotion ? 1 : scene1BOpacity, 
              y: reduceMotion ? 0 : scene1BY, 
              fontFamily: "Georgia, serif" 
            }}
            className="text-3xl md:text-5xl lg:text-6xl font-light italic tracking-tight text-[#FFB800]"
          >
            Today, it is becoming one of the world&apos;s largest industries.
          </motion.h3>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 2: The Opportunity Chart */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: reduceMotion ? 1 : scene2Opacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 max-w-6xl mx-auto w-full"
        >
          <div className="text-center mb-16">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase mb-4 block opacity-70">
              Value Expansion
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The Next Space Race Is Economic
            </h2>
            <p className="text-xs md:text-sm text-white/40 font-mono mt-3 uppercase tracking-wider">
              Why Billions Of Dollars Are Flowing Into Orbit
            </p>
          </div>

          {/* Monumental Minimalist Chart */}
          <div className="flex items-end justify-center gap-16 md:gap-32 w-full h-[40vh] max-w-2xl mb-12 relative border-b border-white/10 pb-1">
            
            {/* Chart Grid Lines */}
            <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-t border-dashed border-white/30 w-full text-[9px] font-mono text-white/40 pt-1">$80B</div>
              <div className="border-t border-dashed border-white/30 w-full text-[9px] font-mono text-white/40 pt-1">$60B</div>
              <div className="border-t border-dashed border-white/30 w-full text-[9px] font-mono text-white/40 pt-1">$40B</div>
              <div className="border-t border-dashed border-white/30 w-full text-[9px] font-mono text-white/40 pt-1">$20B</div>
            </div>

            {/* 2023 Bar */}
            <div className="flex flex-col items-center justify-end h-full z-10 w-24">
              <span className="font-mono text-xs text-white/50 mb-3">$8 Billion</span>
              <motion.div 
                className="w-full bg-white/5 border border-white/20 rounded-t-sm"
                style={{ 
                  height: reduceMotion ? "10%" : useTransform(barHeight2023, (h) => `${h}%`),
                  transformOrigin: "bottom center"
                }}
              />
              <span className="font-mono text-xs font-semibold text-white/60 mt-4 tracking-wider">2023</span>
            </div>

            {/* 2030 Bar */}
            <div className="flex flex-col items-center justify-end h-full z-10 w-24">
              <span className="font-mono text-xs text-[#FFB800] mb-3 font-semibold">$44 Billion</span>
              <motion.div 
                className="w-full bg-gradient-to-t from-[#FFB800]/10 to-[#FFB800] border border-[#FFB800]/40 rounded-t-sm shadow-[0_0_40px_rgba(255, 184, 0,0.25)]"
                style={{ 
                  height: reduceMotion ? "55%" : useTransform(barHeight2030, (h) => `${h}%`),
                  transformOrigin: "bottom center"
                }}
              />
              <span className="font-mono text-xs font-bold text-[#FFB800] mt-4 tracking-wider">2030 Projected</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans text-center max-w-lg">
            India&apos;s space economy is emerging right now, projected to expand to approximately <strong>$44 billion</strong>. The opportunity is no longer theoretical; it is unfolding.
          </p>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 3: The Question */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ 
            opacity: reduceMotion ? 1 : scene3Opacity, 
            y: reduceMotion ? 0 : scene3Y 
          }}
          className="absolute z-10 text-center px-6 max-w-4xl mx-auto pointer-events-none"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#FF6B00] uppercase mb-6 block opacity-80">
            The Capital Question
          </span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-tight italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Why would companies invest billions of dollars in space?
          </h2>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 4 & 5: The Constellation & Jio Proof */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: reduceMotion ? 1 : scene4Opacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 max-w-6xl mx-auto w-full"
        >
          {/* Earth Constellation Image Background */}
          <motion.div 
            style={{ 
              opacity: reduceMotion ? 0.4 : constellationImgOpacity, 
              scale: reduceMotion ? 1 : constellationScale 
            }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          >
            <Image
              src="/sat_const.png"
              alt="Satellite Constellation Network"
              fill
              sizes="100vw"
              className="object-contain object-center opacity-70 grayscale brightness-[0.7] select-none"
            />
            {/* Fade horizon */}
            <div className="absolute inset-0 bg-[#030308]/40" />
          </motion.div>

          <div className="relative w-full max-w-3xl aspect-video flex flex-col items-center justify-center z-10 mb-6">
            
            {/* Orbit paths and Satellite Dots */}
            <motion.div 
              style={{ scale: reduceMotion ? 1 : orbitRingScale }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40"
            >
              <svg className="w-[450px] h-[270px] md:w-[650px] md:h-[380px] overflow-visible" viewBox="0 0 700 400" fill="none">
                <ellipse cx="350" cy="200" rx="320" ry="130" stroke="#FFB800" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.25" />
                <ellipse cx="350" cy="200" rx="350" ry="160" stroke="white" strokeWidth="0.5" opacity="0.15" />
                
                <motion.g style={{ opacity: reduceMotion ? 1 : satellitesOpacity }}>
                  <circle cx="100" cy="230" r="1.5" fill="#FFB800" />
                  <circle cx="180" cy="150" r="2" fill="#FFB800" className="animate-ping" />
                  <circle cx="180" cy="150" r="1.5" fill="#FFB800" />
                  <circle cx="300" cy="110" r="2" fill="#FFB800" />
                  <circle cx="450" cy="120" r="1.5" fill="#FF6B00" />
                  <circle cx="580" cy="210" r="2" fill="#FFB800" className="animate-ping" />
                  <circle cx="580" cy="210" r="1.5" fill="#FFB800" />
                </motion.g>
              </svg>
            </motion.div>

            {/* Live Count Ticker overlay */}
            <div className="relative z-20 text-center flex flex-col items-center justify-center">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase mb-4 opacity-70">
                Constellation Scale
              </span>
              <div className="text-7xl md:text-9xl font-black text-white tracking-tight leading-none mb-4 select-none">
                {displayCount === 1600 ? "1,600+" : displayCount.toLocaleString()}
              </div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                Satellites In Orbit
              </span>
            </div>
          </div>

          {/* Jio Proof Text Card */}
          <motion.div 
            style={{ 
              opacity: reduceMotion ? 1 : jioTextOpacity, 
              y: reduceMotion ? 0 : jioTextY 
            }}
            className="text-center max-w-2xl px-6 relative z-20 mt-4 pointer-events-none"
          >
            <p className="text-base md:text-xl text-white/90 leading-relaxed font-sans mb-4">
              <strong>Reliance Jio</strong> is reportedly evaluating a sovereign LEO constellation of roughly <strong>1,600 to 1,650 satellites</strong> to deliver direct-to-device connectivity.
            </p>
            <span className="font-mono text-[10px] tracking-widest text-[#FF6B00] uppercase font-semibold">
              Corporate giants now see space as critical infrastructure.
            </span>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 7: The Big Realization */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: reduceMotion ? 1 : scene7Opacity }}
          className="absolute z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8 pointer-events-none"
        >
          <motion.p 
            style={{ 
              opacity: reduceMotion ? 1 : line7AOpacity, 
              y: reduceMotion ? 0 : line7AY, 
              fontFamily: "Georgia, serif" 
            }}
            className="text-2xl md:text-4xl font-extralight tracking-wide leading-normal text-white/80"
          >
            Railways connected cities.
          </motion.p>
          
          <motion.p 
            style={{ 
              opacity: reduceMotion ? 1 : line7BOpacity, 
              y: reduceMotion ? 0 : line7BY, 
              fontFamily: "Georgia, serif" 
            }}
            className="text-2xl md:text-4xl font-extralight tracking-wide leading-normal text-white/80"
          >
            The Internet connected people.
          </motion.p>
          
          <motion.p 
            style={{ 
              opacity: reduceMotion ? 1 : line7COpacity, 
              y: reduceMotion ? 0 : line7CY, 
              fontFamily: "Georgia, serif" 
            }}
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#FFB800] uppercase pt-4"
          >
            Space may connect everything.
          </motion.p>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 8: The Finale */}
        {/* ------------------------------------------------------------- */}
        
        {/* Backdrop Visual */}
        <motion.div
          style={{ 
            opacity: reduceMotion ? 0.75 : finalBackdropOpacity, 
            scale: reduceMotion ? 1 : finalBackdropScale 
          }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/closing_cinematic.png"
            alt="India's Space Horizon Finale"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.25] brightness-[0.4] select-none"
          />
          {/* Deep dark radial vignette framing */}
          <div className="absolute inset-0 bg-[#030308]/60" />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#030308_95%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308] opacity-95" />
        </motion.div>

        {/* CTA into the premium Space Economy chapter */}
        <motion.div
          style={{ opacity: reduceMotion ? 1 : finalCtaOpacity }}
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        >
          <Link
            href="/chapters/paradigm-shift"
            className="interactive-control group inline-flex items-center gap-3 px-8 py-4 bg-[#FFB800] hover:bg-[#ffc62e] text-[#030308] font-mono text-xs uppercase tracking-[0.18em] rounded-full font-bold shadow-[0_0_30px_rgba(255,184,0,0.25)] transition-all duration-300"
          >
            <span>Enter the Paradigm Shift</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

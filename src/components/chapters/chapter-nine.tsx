"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, ArrowRight, Play, Compass, Database, Shield, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ChapterNineProps {
  onActiveState: () => void;
}

export function ChapterNine({ onActiveState }: ChapterNineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowNodesRef = useRef<HTMLDivElement>(null);
  const exitTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !flowNodesRef.current || !exitTextRef.current) return;

    const ctx = gsap.context(() => {
      // Pin Chapter 9 for scrolling flow animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (self.isActive) onActiveState();
          }
        }
      });

      // 1. Initial State: The value flow node network is active. Lines animate.
      // 2. Scroll: Fade out value flow nodes
      tl.to(flowNodesRef.current, {
        opacity: 0.1,
        scale: 0.95,
        duration: 1
      });

      // 3. Scroll: Bring in the massive centered typography finale
      tl.to(exitTextRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      }, "-=0.4");

      // Hold state
      tl.to({}, { duration: 0.8 });

    }, containerRef);

    return () => ctx.revert();
  }, [onActiveState]);

  const flowNodes = [
    { label: "LAUNCH", sub: "Vikram / Agnibaan", icon: <Rocket className="w-4 h-4 text-accent-cyan" />, pos: "left-[10%] top-[40%]" },
    { label: "SATELLITES", sub: "Dhruva / Pixxel Platforms", icon: <Compass className="w-4 h-4 text-accent-cyan" />, pos: "left-[30%] top-[25%]" },
    { label: "GROUND segments", sub: "Gateway Antennas", icon: <Globe className="w-4 h-4 text-accent-cyan" />, pos: "left-[50%] top-[40%]" },
    { label: "DEFENSE grids", sub: "NavIC sovereign ISR", icon: <Shield className="w-4 h-4 text-accent-orange" />, pos: "left-[70%] top-[25%]" },
    { label: "DATA software", sub: "Downstream SatSure APIs", icon: <Database className="w-4 h-4 text-accent-cyan" />, pos: "left-[90%] top-[40%]" }
  ];

  return (
    <section 
      id="chapter-9" 
      ref={containerRef} 
      className="relative w-full h-[100dvh] bg-[#030308] border-t border-space-border/20 flex items-center justify-center overflow-hidden"
    >
      {/* Background visual flow layout */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image 
          src="/value_flow.png"
          alt="Ecosystem value flow conceptual background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-space-black"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      {/* Chapter Title Badge */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent-cyan uppercase bg-space-black/60 px-4 py-1.5 rounded-full border border-space-border/55 backdrop-blur-md">
          CHAPTER 09 : THE FINALE RECOMPOSITION
        </span>
      </div>

      {/* State 1: Flow node network (dimmed/moved in scroll) */}
      <div 
        ref={flowNodesRef}
        className="absolute inset-0 z-10 flex flex-col justify-center items-center px-6 max-w-6xl mx-auto"
      >
        <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest block mb-1">
          Ecosystem Synthesis
        </span>
        <h3 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight text-center mb-16">
          The Integrated Capital Flow
        </h3>

        {/* Visual flow graph */}
        <div className="relative w-full h-[250px] hidden md:block">
          {/* Connector vector lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <path 
              d="M 120,120 Q 220,60 340,80 T 560,120 T 780,80 T 1000,120" 
              fill="none" 
              stroke="#FFB800" 
              strokeWidth="2" 
              strokeDasharray="8,6"
            />
          </svg>

          {flowNodes.map((fn, idx) => (
            <div 
              key={idx}
              className={`absolute ${fn.pos} -translate-x-1/2 -translate-y-1/2 bg-[#050510] border border-white/10 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg hover:border-accent-cyan/40 transition-colors`}
            >
              <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                {fn.icon}
              </div>
              <div className="font-mono">
                <span className="text-[10px] font-extrabold text-white uppercase block">{fn.label}</span>
                <span className="text-[9px] text-white/40 block mt-0.5">{fn.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile vertical flow list */}
        <div className="flex flex-col md:hidden w-full gap-3 mt-4">
          {flowNodes.map((fn, idx) => (
            <div 
              key={idx}
              className="bg-[#050510] border border-white/5 p-4 rounded-xl flex items-center gap-3"
            >
              <div className="p-2 bg-white/5 rounded-lg text-accent-cyan">
                {fn.icon}
              </div>
              <div className="font-mono text-xs">
                <span className="font-bold text-white block uppercase">{fn.label}</span>
                <span className="text-white/40 block">{fn.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/50 text-sm font-mono mt-16 animate-pulse">
          [ Keep scrolling to reveal finale statement ]
        </p>

      </div>

      {/* State 2: Centered Finale Text & Case Study Navigation */}
      <div 
        ref={exitTextRef}
        className="absolute z-10 text-center max-w-5xl px-6 opacity-0 translate-y-16 scale-95"
      >
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-sans font-extrabold tracking-tighter leading-none text-white">
          India's Space <br />
          Revolution Has <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-[#00c0ff] uppercase">Only Just Begun.</span>
        </h2>
        
        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mt-8 font-sans leading-relaxed">
          The sovereign capital is aligned. Regulatory gates are dismantled. Downstream software markets are expanding at hyper-scale. It is time to dive deeper.
        </p>

        {/* Redirect buttons to Case Study chapters */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/chapters/launch-systems"
            className="w-full sm:w-auto bg-accent-cyan text-space-black hover:bg-accent-cyan/90 transition-all font-mono text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-full flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Dive Into Launcher case study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/chapters/satellites"
            className="w-full sm:w-auto bg-[#070718] hover:bg-[#121235] border border-space-border text-white transition-all font-mono text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-full flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Satellites case study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

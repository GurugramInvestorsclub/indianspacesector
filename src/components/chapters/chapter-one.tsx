"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Navigation, 
  CloudSun, 
  Sprout, 
  DollarSign, 
  ShieldAlert, 
  Radio, 
  MapPin 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ChapterOneProps {
  onActiveState: () => void;
}

export function ChapterOne({ onActiveState }: ChapterOneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlaysRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !overlaysRef.current || !conclusionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin Chapter 1 for 4 viewports worth of scroll length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (self.isActive) onActiveState();
          }
        }
      });

      // 1. Initial State: H1 "Why does space matter?" is visible, background scales in slightly
      tl.to(backgroundRef.current, {
        scale: 1.05,
        opacity: 0.9,
        duration: 1
      });

      // Fade out the initial question
      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 1
      }, "+=0.2");

      // 2. Animate the overlays appearing one by one
      const cards = gsap.utils.toArray<HTMLElement>(".telemetry-card");
      cards.forEach((card, index) => {
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out"
        }, `-=${index > 0 ? 0.7 : 0.2}`);
        
        // Let each card display, then fade it out slightly before the next
        if (index < cards.length - 1) {
          tl.to(card, {
            opacity: 0.25,
            duration: 0.8
          });
        }
      });

      // 3. Fade out all overlays to prepare for the final reveal
      tl.to(overlaysRef.current, {
        opacity: 0,
        y: -30,
        duration: 1.2
      }, "+=0.3");

      // 4. Reveal the conclusion: "Space is infrastructure. Not exploration."
      tl.to(conclusionRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.2)"
      });
      
      // Keep conclusion on screen for a moment
      tl.to(conclusionRef.current, {
        opacity: 1,
        duration: 1
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onActiveState]);

  const telemetryData = [
    {
      icon: <Navigation className="w-5 h-5 text-accent-cyan" />,
      title: "GPS & Synchronicity",
      subtitle: "NavIC Positioning Grid",
      desc: "Synchronizes power grids and high-frequency trading with nanosecond accuracy.",
      metrics: "LAT: 12.9716° N | LON: 77.5946° E"
    },
    {
      icon: <CloudSun className="w-5 h-5 text-accent-cyan" />,
      title: "Weather Forecasting",
      subtitle: "INSAT Satellites",
      desc: "Tracks micro-climatic shifts to alert coastal zones of cyclonic events.",
      metrics: "PRESSURE: 998 hPa | MONSOON: ACTIVE"
    },
    {
      icon: <Sprout className="w-5 h-5 text-accent-cyan" />,
      title: "Precision Agriculture",
      subtitle: "EO Crop Health Index",
      desc: "Monitors soil moisture and vegetation health across agricultural belts.",
      metrics: "NDVI INDEX: +0.68 | YIELD: STABLE"
    },
    {
      icon: <DollarSign className="w-5 h-5 text-accent-cyan" />,
      title: "Banking Logistics",
      subtitle: "VSAT Sat-Linkups",
      desc: "Connects rural ATMs directly to the central transactions network.",
      metrics: "TRANS RATE: 14.2k/s | AES-256 SEC"
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-accent-cyan" />,
      title: "Strategic ISR",
      subtitle: "Surveillance Radar",
      desc: "Provides border security intelligence independent of foreign satellite systems.",
      metrics: "505 KM LEO | 25CM RESOLUTION"
    },
    {
      icon: <Radio className="w-5 h-5 text-accent-cyan" />,
      title: "Telecommunications",
      subtitle: "GSAT Backhaul Link",
      desc: "Routes cellular connectivity into mountainous and geographically isolated zones.",
      metrics: "Ku/Ka-BAND | 99.98% ACCESSIBILITY"
    }
  ];

  return (
    <section 
      id="chapter-1" 
      ref={containerRef} 
      className="relative w-full h-[100dvh] overflow-hidden bg-space-black flex items-center justify-center"
    >
      {/* Background Earth Imagery */}
      <div 
        ref={backgroundRef} 
        className="absolute inset-0 z-0 opacity-40 transition-transform duration-300"
      >
        <Image 
          src="/hero_earth.png" 
          alt="Earth view with India night lights" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter saturate-125 contrast-110 mix-blend-luminosity brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-space-black opacity-90"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      {/* Chapter Title Badge */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent-cyan uppercase bg-space-black/60 px-4 py-1.5 rounded-full border border-space-border/55 backdrop-blur-md">
          CHAPTER 01 : THE FOUNDATIONAL INQUIRY
        </span>
      </div>

      {/* State 1: The Question */}
      <div 
        ref={textRef} 
        className="relative z-10 text-center max-w-5xl px-6 pointer-events-none"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-extrabold tracking-tighter leading-none text-white">
          Why does space <br />
          <span className="text-accent-cyan italic font-light">matter?</span>
        </h1>
        <p className="text-white/50 text-sm md:text-base font-mono mt-6 tracking-wide uppercase">
          [ Scroll downwards to inspect active telemetry ]
        </p>
      </div>

      {/* State 2: Telemetry Overlays Grid */}
      <div 
        ref={overlaysRef} 
        className="absolute inset-0 z-10 flex items-center justify-center px-6"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {telemetryData.map((tel, idx) => (
            <div 
              key={idx} 
              className="telemetry-card opacity-0 translate-y-12 scale-95 bg-space-dark/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-accent-cyan/35 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/25 flex items-center justify-center">
                    {tel.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{tel.title}</h3>
                    <span className="text-[10px] font-mono text-white/50">{tel.subtitle}</span>
                  </div>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans mt-2">
                  {tel.desc}
                </p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-accent-cyan/95 tracking-wider uppercase">Live Telemetry</span>
                <span className="text-[9px] font-mono text-white/40 tracking-tight">{tel.metrics}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State 3: Conclusion Reveal */}
      <div 
        ref={conclusionRef} 
        className="absolute z-10 text-center max-w-5xl px-6 opacity-0 translate-y-16 scale-95 pointer-events-none"
      >
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-sans font-extrabold tracking-tighter leading-none text-white">
          Space is <span className="text-accent-cyan uppercase">Infrastructure.</span> <br />
          Not <span className="text-white/40 italic font-light">Exploration.</span>
        </h2>
        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mt-8 font-sans leading-relaxed">
          The ultimate utility stack of the 21st century does not operate in the dirt. It runs on orbital networks that power our currency, agriculture, defense, and connection.
        </p>
        <div className="mt-8 flex justify-center items-center gap-2">
          <MapPin className="w-4 h-4 text-accent-orange animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-accent-orange uppercase">
            Aha! Moment 01 &mdash; Infrastructure Shift
          </span>
        </div>
      </div>
    </section>
  );
}

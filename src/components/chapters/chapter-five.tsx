"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Crosshair, Radio, Eye, Lock, RefreshCw } from "lucide-react";

interface DefenseTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  metric: string;
  details: string[];
}

const DEFENSE_TOPICS: DefenseTopic[] = [
  {
    id: "isr",
    title: "ISR Surveillance",
    icon: <Eye className="w-5 h-5 text-accent-orange" />,
    summary: "High-resolution optical & SAR radar satellites monitoring borders in all weather conditions.",
    metric: "25cm LEO",
    details: [
      "SAR radar penetrates cloud cover and forest foliage.",
      "Real-time tracking of border sector deployments.",
      "Dual-use sensors serving commercial and military clients."
    ]
  },
  {
    id: "nav",
    title: "Sovereign Navigation",
    icon: <Crosshair className="w-5 h-5 text-accent-orange" />,
    summary: "NavIC constellation provides independent positioning, eliminating foreign telemetry reliance.",
    metric: "7 Satellites",
    details: [
      "Guarantees positioning during critical security events.",
      "High-precision encrypted links reserved for defense hardware.",
      "Eliminates national reliance on GPS and GLONASS grids."
    ]
  },
  {
    id: "comm",
    title: "Encrypted Sat-Comm",
    icon: <Radio className="w-5 h-5 text-accent-orange" />,
    summary: "Dedicated GSAT defense payloads providing secure communication backhaul to operational forces.",
    metric: "Encrypted Ku/Ka",
    details: [
      "Secures voice and data relays across operational theatres.",
      "Anti-jamming hardware built into defense payloads.",
      "Establishes coverage spanning the Indian Ocean Region."
    ]
  },
  {
    id: "ssa",
    title: "Space Autonomy & SSA",
    icon: <ShieldAlert className="w-5 h-5 text-accent-orange" />,
    summary: "Space Situational Awareness (SSA) tracking orbits, debris, and threat monitoring.",
    metric: "Project NETRA",
    details: [
      "Tracks orbital debris to shield national satellites.",
      "Detects maneuvers of foreign objects in regional orbits.",
      "Monitors spacecraft trajectories passing overhead."
    ]
  }
];

interface ChapterFiveProps {
  onActiveState: () => void;
}

export function ChapterFive({ onActiveState }: ChapterFiveProps) {
  const [activeTopicId, setActiveTopicId] = useState<string>("isr");
  const [radarRotation, setRadarRotation] = useState(0);

  useEffect(() => {
    // Notify presentation manager when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActiveState();
        }
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById("chapter-5");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [onActiveState]);

  // Rotate the radar sweep overlay
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarRotation((prev) => (prev + 1) % 360);
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  const activeTopic = DEFENSE_TOPICS.find(t => t.id === activeTopicId) || DEFENSE_TOPICS[0];

  return (
    <section 
      id="chapter-5" 
      className="relative w-full min-h-[100dvh] py-32 bg-[#020208] border-t border-space-border/20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-7xl w-full px-6 flex flex-col lg:flex-row gap-12 items-center relative z-10">
        
        {/* Left Column: Radar Scanner & Tech Display */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-accent-orange/20 bg-space-dark flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(255,107,0,0.05)]">
            
            {/* Satellite image background with strategic filter */}
            <div className="absolute inset-0 opacity-40 mix-blend-luminosity scale-110">
              <Image 
                src="/sat_network.png"
                alt="Strategic Satellite Tracking Network"
                fill
                className="object-cover"
              />
            </div>

            {/* Concentric radar lines */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-accent-orange/10 pointer-events-none"></div>
            <div className="absolute w-[60%] h-[60%] rounded-full border border-accent-orange/10 pointer-events-none"></div>
            <div className="absolute w-[40%] h-[40%] rounded-full border border-accent-orange/10 pointer-events-none"></div>
            
            {/* Center crosshair */}
            <div className="absolute w-full h-[1px] bg-accent-orange/15 pointer-events-none"></div>
            <div className="absolute h-full w-[1px] bg-accent-orange/15 pointer-events-none"></div>

            {/* Radar sweep overlay */}
            <div 
              className="absolute inset-0 bg-radar-sweep pointer-events-none origin-center"
              style={{ transform: `rotate(${radarRotation}deg)` }}
            ></div>

            {/* Radar scanning nodes */}
            <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-accent-orange rounded-full animate-pulse shadow-[0_0_8px_#FF6B00]"></div>
            <div className="absolute bottom-[35%] right-[25%] w-2 h-2 bg-accent-cyan rounded-full animate-pulse shadow-[0_0_8px_#FFB800]"></div>
            <div className="absolute top-[60%] left-[65%] w-1.5 h-1.5 bg-accent-orange rounded-full opacity-60"></div>

            <div className="absolute bottom-4 font-mono text-[9px] text-accent-orange tracking-widest bg-space-black/80 border border-accent-orange/20 px-2 py-0.5 rounded">
              SECTOR SCAN ACTIVE
            </div>
          </div>

          <div className="mt-8 text-center lg:text-left">
            <span className="font-mono text-[9px] text-accent-orange tracking-[0.25em] uppercase">
              Operational Telemetry
            </span>
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-2 font-mono text-xs text-white/50">
              <span>SAT ID: GSAT-7R</span>
              <span>•</span>
              <span>ORBIT: MEO GEO</span>
              <span>•</span>
              <span>LINK: SECURE</span>
            </div>
          </div>

        </div>

        {/* Right Column: Strategic Topics & Selection */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          
          <div className="mb-8">
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent-orange uppercase">
              CHAPTER 05 : NATIONAL GEOPOLITICAL SECURITY
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white mt-1">
              Sovereign Autonomy
            </h2>
            <p className="text-white/60 text-sm mt-4 font-sans leading-relaxed">
              Space is the ultimate high ground. In modern geopolitics, dependency on foreign orbital assets is a severe national security vulnerability. India's space program acts as a shield.
            </p>
          </div>

          {/* Grid buttons to select topics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {DEFENSE_TOPICS.map((topic) => {
              const isSelected = activeTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`p-4 rounded-xl text-left border cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? "bg-accent-orange/10 border-accent-orange shadow-[0_0_15px_rgba(255,107,0,0.15)]"
                      : "bg-[#06060f]/60 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className={`p-1.5 rounded-md inline-block ${isSelected ? "bg-accent-orange/10" : "bg-white/5"}`}>
                    {topic.icon}
                  </div>
                  <h3 className="text-xs md:text-sm font-sans font-extrabold text-white mt-3">
                    {topic.title}
                  </h3>
                  <span className="text-[9px] font-mono text-white/40 block mt-1">
                    {topic.metric.split(" ")[0]} {topic.metric.split(" ")[1] || ""}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Details Explainer Card */}
          <div className="bg-[#05050f]/80 border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-accent-orange"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTopic.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <span className="font-mono text-[10px] text-accent-orange uppercase tracking-wider">
                    Detailed strategic parameters
                  </span>
                  <span className="font-mono text-xs font-bold text-white bg-accent-orange/10 border border-accent-orange/35 px-2 py-0.5 rounded">
                    {activeTopic.metric}
                  </span>
                </div>
                
                <h4 className="text-base font-bold text-white mb-2">{activeTopic.title} Overview</h4>
                <p className="text-xs text-white/60 leading-relaxed mb-4">{activeTopic.summary}</p>
                
                <ul className="space-y-2">
                  {activeTopic.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-white/80 font-sans leading-relaxed">
                      <Lock className="w-3.5 h-3.5 text-accent-orange shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

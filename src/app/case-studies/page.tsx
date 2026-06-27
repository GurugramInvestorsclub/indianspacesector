"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { 
  ArrowLeft, 
  ArrowRight, 
  Rocket, 
  Cpu, 
  Database, 
  Radio, 
  Globe, 
  ShieldAlert 
} from "lucide-react";

// Local case studies list map.
const CASE_STUDIES_OVERVIEW = [
  {
    slug: "launch-systems",
    title: "Launch Systems & Infrastructure",
    category: "Upstream Logistics",
    desc: "Analyzing India's path to customized, high-frequency orbital access, cryogenic engine advances, and active launchpad expansions.",
    icon: Rocket,
    highlight: "$3,000/kg cost target",
  },
  {
    slug: "satellites",
    title: "Satellites & Orbital Hardware",
    category: "Hardware Segment",
    desc: "Analyzing satellite assembly pipelines, miniaturized orbital platforms, CubeSat integration, and engineering arbitrage.",
    icon: Cpu,
    highlight: "35% manufacturing arbitrage",
  },
  {
    slug: "earth-observation",
    title: "Earth Observation & Spatial Analytics",
    category: "Downstream Software",
    desc: "Harnessing hyperspectral data, Synthetic Aperture Radar (SAR) modules, and spatial ML pipelines for precision global intelligence.",
    icon: Globe,
    highlight: "65% - 75% software margins",
  },
  {
    slug: "ground-infrastructure",
    title: "Ground Infrastructure & TTC",
    category: "Midstream Utilities",
    desc: "The invisible telecommunications and tracking gateways of orbit, managing telemetry, ground stations, and software-defined downlinks.",
    icon: Radio,
    highlight: "45% - 50% utility margins",
  },
  {
    slug: "applications",
    title: "Applications, Data & Insights",
    category: "Downstream Value",
    desc: "How downstream analytics platforms translate orbital signals and satellite Internet-of-Things (IoT) into economic capital.",
    icon: Database,
    highlight: "$380B global addressable market",
  },
  {
    slug: "defense",
    title: "Strategic Space Defense & Autonomy",
    category: "Strategic Security",
    desc: "Analyzing military electro-optical surveillance, anti-jamming antennas, and NavIC regional tracking frameworks.",
    icon: ShieldAlert,
    highlight: "60% - 70% contract margins",
  },
  {
    slug: "private-ecosystem",
    title: "Indian Private Space Ecosystem",
    category: "Commercial Space",
    desc: "Explore India's most promising private space startups across launch vehicles, satellites, communications, Earth observation, infrastructure, deep-tech and applications.",
    icon: Globe,
    highlight: "Interactive Space Stack",
    isCustom: true,
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#030308] text-[#f4f4f7] font-sans selection:bg-[#FFB800] selection:text-[#030308] relative pb-24">
      <Navbar />

      {/* Radial spotlight backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,184,0,0.04) 0%, transparent 70%)"
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Navigation breadcrumb */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] font-mono text-white/50 hover:text-[#FFB800] transition-colors mb-12 uppercase tracking-widest group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to presentation deck</span>
        </Link>

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-mono text-[#FFB800] uppercase tracking-[0.25em] block mb-3 font-bold">
            Ecosystem Research
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-none text-white mb-6 uppercase">
            Sector Case Studies
          </h1>
          <p className="text-base text-white/60 leading-relaxed max-w-2xl font-light">
            In-depth analysis and economic data covering the launch services, hardware assembly pipelines, and downstream SaaS markets shaping India&apos;s commercial space flight.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES_OVERVIEW.map((cs) => {
            const Icon = cs.icon;
            return (
              <Link
                key={cs.slug}
                href={cs.slug === "private-ecosystem" ? "/chapters/private-ecosystem" : `/chapters/${cs.slug}`}
                className="group relative flex flex-col justify-between p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-[#FFB800]/40 rounded-2xl shadow-xl transition-all duration-300 pointer-events-auto cursor-pointer overflow-hidden min-h-[250px]"
              >
                {/* Background rendering */}
                {cs.slug === "private-ecosystem" ? (
                  <CardEarthBackground />
                ) : (
                  <div className="absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none z-0"
                       style={{
                         background: "radial-gradient(circle 120px at 80% 20%, rgba(255,184,0,0.03) 0%, transparent 100%)",
                       }}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                      {cs.category}
                    </span>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] group-hover:bg-[#FFB800]/10 border border-white/5 group-hover:border-[#FFB800]/20 text-white/60 group-hover:text-[#FFB800] transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-white mb-3 group-hover:text-[#FFB800] transition-colors duration-200 uppercase">
                    {cs.title}
                  </h3>

                  <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                    {cs.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-white transition-colors duration-200">
                  <span className="text-[#FFB800]/70 group-hover:text-[#FFB800] font-bold">
                    {cs.highlight}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    {cs.slug === "private-ecosystem" ? "Explore Ecosystem" : "Read Report"}{" "}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MINIATURE ANIMATED EARTH FOR ECOSYSTEM CARD BACKGROUND
// ---------------------------------------------------------------------------

function CardEarthBackground() {
  const earthRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrame: number;
    const startTime = performance.now();

    const loop = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const loopTime = elapsed % 24;

      if (earthRef.current) {
        const earthPos = -(loopTime / 24) * 100;
        earthRef.current.style.backgroundPositionX = `${earthPos}%`;
      }
      if (cloudsRef.current) {
        const cloudsPos = -(loopTime / 18) * 100;
        cloudsRef.current.style.backgroundPositionX = `${cloudsPos}%`;
      }

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-[0.09] group-hover:opacity-20 transition-opacity duration-500">
      {/* Miniature Earth */}
      <div className="absolute w-[180px] h-[180px] rounded-full overflow-hidden border border-white/5 right-[-30px] bottom-[-30px] bg-black">
        {/* Sliding Landmass Surface Layer */}
        <div 
          ref={earthRef}
          className="absolute inset-0 bg-cover bg-repeat-x grayscale-[20%]"
          style={{
            backgroundImage: "url('/earth_map.jpg')",
            backgroundSize: "auto 100%",
            willChange: "background-position"
          }}
        />
        {/* Sliding Clouds Layer */}
        <div 
          ref={cloudsRef}
          className="absolute inset-0 bg-cover bg-repeat-x opacity-40 mix-blend-screen"
          style={{
            backgroundImage: "url('/earth_clouds.png')",
            backgroundSize: "auto 100%",
            willChange: "background-position"
          }}
        />
        {/* 3D Sphere shadow overlay */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.92) 80%)",
          }}
        />
      </div>

      {/* Orbit paths & trails */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 200">
        <ellipse 
          cx="290" 
          cy="150" 
          rx="110" 
          ry="40" 
          fill="none" 
          stroke="rgba(255, 184, 0, 0.25)" 
          strokeWidth="1" 
          strokeDasharray="3 4"
        />
      </svg>
    </div>
  );
}

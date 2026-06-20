"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, X, ArrowRight } from "lucide-react";

interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: "launch" | "satellites";
  categoryLabel: string;
  author: string;
  summary: string;
  keyPoints: string[];
  metrics: { label: string; value: string; context: string }[];
  takeaways: string[];
  risks: string[];
  codename: string;
}

export function CaseStudies() {
  const [filter, setFilter] = useState<"all" | "launch" | "satellites">("all");
  const [activeStudySlug, setActiveStudySlug] = useState<string | null>(null);

  const studies: CaseStudy[] = [
    {
      slug: "skyroot",
      title: "Skyroot Aerospace",
      subtitle: "Custom small-sat LEO insertion rockets",
      category: "launch",
      categoryLabel: "LAUNCH SYSTEMS",
      author: "Upstream Logistics Division",
      codename: "CASE_SKY_VIKRAM",
      summary: "First Indian private operator to design and launch an orbital test rocket (Vikram-S). Specializes in carbon-composite motors and liquid upper stages.",
      keyPoints: [
        "Development of solid carbon-fiber composite stages.",
        "Customized small-sat LEO insertions bypass rideshare delays.",
        "Utilized ISRO launching pads under IN-SPACe authorization."
      ],
      metrics: [
        { label: "LAUNCH COST", value: "$3,200/kg", context: "Commercial LEO target" },
        { label: "STAGE THRUST", value: "85 kN", context: "Vikram solid motor" },
        { label: "VALUATION", value: "$300M Est.", context: "Institutional backing" }
      ],
      takeaways: [
        "Sovereign flexibility: Providing direct orbit insertions.",
        "Speed to orbit: Solid propellants cut prep cycles down."
      ],
      risks: [
        "Inherent aerospace validation failures.",
        "Pricing pressure from global reusable launchers."
      ]
    },
    {
      slug: "agnikul",
      title: "Agnikul Cosmos",
      subtitle: "3D-printed semi-cryogenic engines and mobile pads",
      category: "launch",
      categoryLabel: "LAUNCH SYSTEMS",
      author: "Propulsion Engineering Group",
      codename: "CASE_AGNI_PRINT",
      summary: "Pioneering single-run 3D-printed rocket engines. Features the Agnilet engine: the world's first single-piece 3D-printed motor engine.",
      keyPoints: [
        "Proprietary 3D-printed semi-cryo engine nozzles.",
        "Operates mobile transporter-erector pads.",
        "Customizable multi-stage configurations."
      ],
      metrics: [
        { label: "ENGINE PRINT TIME", value: "72 Hours", context: "Agnilet single-run print" },
        { label: "LAUNCH CAPACITY", value: "100 kg", context: "To 700km polar orbits" },
        { label: "OPERATING MARGIN", value: "32%", context: "Manufacturing savings" }
      ],
      takeaways: [
        "Frugal assembly: Replaced 1,000+ welded joints with one print.",
        "Mobile pad setups: Launch from any qualified coastline."
      ],
      risks: [
        "Severe wear on printed alloy from cryo-pressures.",
        "Civilian transport licenses on mobile launch trailers."
      ]
    },
    {
      slug: "pixxel",
      title: "Pixxel Space",
      subtitle: "Hyperspectral earth observation constellation grids",
      category: "satellites",
      categoryLabel: "SATELLITES & PAYLOADS",
      author: "Downstream Software & Sensor Group",
      codename: "CASE_PIX_SPECTRA",
      summary: "Deploying high-gain hyperspectral constellations. Capture dozens of spectral channels, allowing chemical analysis of crops and leaks from orbit.",
      keyPoints: [
        "Chemical-level tracking of soils for precision agriculture.",
        "Methane emission monitoring for global energy firms.",
        "NRO research contracts secured."
      ],
      metrics: [
        { label: "SPECTRAL BANDS", value: "30+ Bands", context: "VS 3 standard RGB bands" },
        { label: "IMAGE RESOLUTION", value: "5 Meters", context: "High-frequency orbit sweeps" },
        { label: "SAAS GROSS MARGIN", value: "75%", context: "Vectorized processing APIs" }
      ],
      takeaways: [
        "Data depth: Hyperspectral data renders visual data obsolete.",
        "Recurring value: APIs drive subscription software revenues."
      ],
      risks: [
        "Constellation assembly blocks due to rideshare queues.",
        "Heavy data hosting costs for spectral data bands."
      ]
    },
    {
      slug: "dhruva",
      title: "Dhruva Space",
      subtitle: "Full-stack satellite bus structures and deployers",
      category: "satellites",
      categoryLabel: "SATELLITES & PAYLOADS",
      author: "Hardware Integration Group",
      codename: "CASE_DHRUVA_BUS",
      summary: "Full-stack satellite design, modular bus frames, space qualification labs, and deployers allowing rapid sensors payload mounts.",
      keyPoints: [
        "Space-qualified deployers mounted on ISRO launchers.",
        "Modular bus structures scaling from 1U CubeSats to 150kg.",
        "Internal test grids cutting qualifying costs."
      ],
      metrics: [
        { label: "TEST ARBITRAGE", value: "40% Cheaper", context: "Domestic qualification labs" },
        { label: "BUS LIFE", value: "5 Years", context: "Low Earth Orbit lifespan" },
        { label: "DEPLOYMENT RECORD", value: "100% Success", context: "ISRO rideshare runs" }
      ],
      takeaways: [
        "Turnkey integrations: Bypassing legacy hardware build delays.",
        "Subsystem export: Selling qualified deployers globally."
      ],
      risks: [
        "Reliance on imported radiation-hardened solar cells.",
        "Intense global competition from European bus integrators."
      ]
    },
    {
      slug: "bellatrix",
      title: "Bellatrix Aerospace",
      subtitle: "Green chemical propulsion and electric thrusters",
      category: "satellites",
      categoryLabel: "SATELLITES & PAYLOADS",
      author: "Propulsion Engineering Group",
      codename: "CASE_BELL_THRUST",
      summary: "High-efficiency electric thrusters, green propellant thrusters, and microwave plasma Hall effect thrusters extending satellite lifespans.",
      keyPoints: [
        "Hydrazine-free green propellant systems.",
        "Water-fueled microwave plasma thruster designs.",
        "Orbital Transfer Vehicles (OTVs) acting as orbit tugs."
      ],
      metrics: [
        { label: "FUEL EFFICIENCY", value: "3x Higher", context: "Electric VS chemical propulsion" },
        { label: "THRUSTER WEIGHT", value: "under 5kg", context: "Ultra-light arrays" },
        { label: "VALUATION MULTIPLE", value: "9.5x EV/Rev", context: "High proprietary tech pricing" }
      ],
      takeaways: [
        "Hydrazine bans: Capitalizing on tightening global eco-mandates.",
        "Orbit sustain: Adding up to 2 years of active satellite lifecycle."
      ],
      risks: [
        "Long space-qualification validation timelines.",
        "High electrical draws required by Hall thruster nodes."
      ]
    }
  ];

  const filteredStudies = filter === "all" ? studies : studies.filter(s => s.category === filter);
  const activeStudy = studies.find(s => s.slug === activeStudySlug) || null;

  return (
    <section
      id="case-studies"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#F7F6F3] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background space image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/space_bg.png"
          alt="Space background starry sky"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale-[80%] sepia-[10%] brightness-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3]/95 via-[#F7F6F3]/60 to-[#F7F6F3]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#956400] uppercase block mb-2 font-semibold">
              04. STRATEGIC DOSSIERS
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-[#111111]">
              Case Studies
            </h2>
            <p className="text-[#787774] text-xs mt-2">
              Declassified assessments of regional entities driving commercial and orbital tech returns.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex gap-2 bg-[#FFFFFF] border border-[#EAEAEA] p-1 rounded-sm font-mono text-[8px] tracking-wider shrink-0 shadow-sm">
            {["all", "launch", "satellites"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-3 py-1.5 rounded-xs transition-colors duration-200 cursor-pointer uppercase font-bold ${
                  filter === cat
                    ? "bg-[#111111] text-[#FFFFFF]"
                    : "text-[#787774] hover:text-[#111111]"
                }`}
              >
                {cat === "all" ? "ALL DOSSIERS" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[50dvh] overflow-y-auto pr-2">
          {filteredStudies.map((cs) => {
            const badgeColorClass = cs.category === "launch" 
              ? "text-[#C5221F] border-[#C5221F]/20 bg-[#C5221F]/5"
              : "text-[#1F6C9F] border-[#1F6C9F]/20 bg-[#1F6C9F]/5";

            return (
              <div
                key={cs.slug}
                className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-[16px] shadow-sm hover:border-[#1F6C9F]/30 transition-all duration-300 group"
              >
                <button
                  onClick={() => setActiveStudySlug(cs.slug)}
                  className="w-full text-left h-full flex flex-col justify-between p-5 rounded-[16px] cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`font-mono text-[7px] tracking-widest border px-2 py-0.5 rounded font-bold ${badgeColorClass}`}>
                        {cs.categoryLabel}
                      </span>
                    </div>
                    <h4 className="text-[#111111] text-base font-bold tracking-tight group-hover:text-[#1F6C9F] transition-colors">
                      {cs.title}
                    </h4>
                    <p className="text-[#2F3437] text-xs mt-1.5 font-sans leading-relaxed">
                      {cs.subtitle}
                    </p>
                  </div>

                  <div className="w-full mt-6 pt-3 border-t border-[#EAEAEA] flex items-center justify-between font-mono text-[8px] text-[#787774] group-hover:text-[#111111] transition-colors duration-200">
                    <span className="uppercase tracking-wider font-semibold">Inspect Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:text-[#1F6C9F]" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Slide-in dossier modal */}
      <AnimatePresence>
        {activeStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={() => setActiveStudySlug(null)}></div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-xl h-full bg-[#FFFFFF] border-l border-[#EAEAEA] p-6 md:p-8 overflow-y-auto flex flex-col justify-between shadow-2xl z-10"
            >
              <div>
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[8px] tracking-widest border px-2 py-0.5 rounded font-bold ${
                      activeStudy.category === "launch"
                        ? "text-[#C5221F] border-[#C5221F]/20 bg-[#C5221F]/5"
                        : "text-[#1F6C9F] border-[#1F6C9F]/20 bg-[#1F6C9F]/5"
                    }`}>
                      {activeStudy.categoryLabel}
                    </span>
                    <span className="font-mono text-[8px] text-[#787774] tracking-wider font-semibold">
                      {activeStudy.codename}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveStudySlug(null)}
                    className="p-1.5 text-[#787774] hover:text-[#111111] bg-[#F7F6F3] rounded-full border border-[#EAEAEA] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-xl md:text-2xl font-sans font-extrabold text-[#111111] tracking-tight leading-tight">
                  {activeStudy.title}
                </h3>
                <span className="text-[#787774] font-mono text-[8px] uppercase tracking-wider block mt-0.5 font-semibold">
                  DIVISION: {activeStudy.author.split(" ")[0]}
                </span>

                <p className="text-[#2F3437] text-xs mt-4 leading-relaxed font-sans border-l-2 border-[#1F6C9F]/40 pl-3">
                  {activeStudy.summary}
                </p>

                {/* Strategy */}
                <div className="mt-6">
                  <span className="font-mono text-[8px] text-[#956400] tracking-widest uppercase block mb-2 font-bold">
                    OPERATIONAL STRATEGY
                  </span>
                  <ul className="space-y-1.5 font-sans text-xs text-[#2F3437] list-inside list-disc">
                    {activeStudy.keyPoints.map((pt, i) => (
                      <li key={i} className="leading-relaxed">{pt}</li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="mt-6 bg-[#F7F6F3] border border-[#EAEAEA] p-3 rounded-lg">
                  <div className="grid grid-cols-3 gap-3 font-mono text-[9px]">
                    {activeStudy.metrics.map((met, i) => (
                      <div key={i} className="border-r border-[#EAEAEA] last:border-0 pr-2">
                        <span className="text-[#787774] block font-bold">{met.label}</span>
                        <span className="text-sm font-extrabold text-[#111111] block mt-0.5">{met.value}</span>
                        <span className="text-[7px] text-[#787774] mt-0.5 block leading-tight">{met.context}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaways & Risks */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono text-[8px] text-[#2E7D32] tracking-widest uppercase block mb-2 font-bold">
                      KEY TAKEAWAYS
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs text-[#2F3437]">
                      {activeStudy.takeaways.map((take, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-[#2E7D32] font-bold">✓</span>
                          <span className="leading-relaxed">{take}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-[#C5221F] tracking-widest uppercase block mb-2 font-bold">
                      RISKS
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs text-[#2F3437]">
                      {activeStudy.risks.map((risk, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-[#C5221F] font-bold">!</span>
                          <span className="leading-relaxed">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-[#EAEAEA] flex justify-between items-center text-[8px] font-mono text-[#787774]">
                <span className="font-semibold">SECURITY AUDIT: CONCLUDED</span>
                <span className="italic">Confidential</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, X, ArrowRight, TrendingUp, ShieldAlert, Cpu, Sparkles } from "lucide-react";

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
      subtitle: "Commercializing custom small-sat LEO insertion rockets",
      category: "launch",
      categoryLabel: "LAUNCH SYSTEMS",
      author: "Upstream Logistics Division",
      codename: "CASE_SKY_VIKRAM",
      summary: "Skyroot became the first Indian private operator to design and launch an orbital-class test rocket (Vikram-S) in 2022. They specialize in multi-stage solid carbon-composite motors and liquid upper stages for small payload insertions.",
      keyPoints: [
        "Development of solid carbon-fiber composite rocket stages (Vikram series).",
        "Targeting customized small-sat deployments instead of heavy rideshare delays.",
        "Utilized ISRO's launch systems under IN-SPACe authorization."
      ],
      metrics: [
        { label: "LAUNCH COST", value: "$3,200/kg", context: "Projected commercial target" },
        { label: "STAGE THRUST", value: "85 kN", context: "Vikram solid motor testing" },
        { label: "MARKET CAP", value: "$300M Est.", context: "Recent valuation threshold" }
      ],
      takeaways: [
        "High flexibility: Startups win by offering custom orbital coordinates directly.",
        "Fast-turnaround timelines: Reduced launch cycle prep by utilizing solid propellants."
      ],
      risks: [
        "High initial test failure rates in orbital insertion flights.",
        "Global price war driven by heavy SpaceX rideshares."
      ]
    },
    {
      slug: "agnikul",
      title: "Agnikul Cosmos",
      subtitle: "3D-printed cryogenic rocket engines and mobile pads",
      category: "launch",
      categoryLabel: "LAUNCH SYSTEMS",
      author: "Propulsion Engineering Group",
      codename: "CASE_AGNI_PRINT",
      summary: "Agnikul is pioneering the commercialization of fully 3D-printed rocket engines. Their Agnibaan launcher features the 'Agnilet' engine—the world's first single-piece 3D-printed engine manufactured entirely in one run.",
      keyPoints: [
        "Proprietary 3D-printed semi-cryogenic engine nozzles.",
        "Designed and operated India's first private mobile launch pad.",
        "Customizable payload structures (Agnibaan) adapting from 1 to 3 stages."
      ],
      metrics: [
        { label: "ENGINE PRINT TIME", value: "72 Hours", context: "Agnilet single-piece run" },
        { label: "LAUNCH CAPACITY", value: "100 kg", context: "To 700km polar orbits" },
        { label: "OPERATING MARGIN", value: "32%", context: "3D manufacture cost saving" }
      ],
      takeaways: [
        "Simplified supply lines: Replacing 1,000+ assembly welds with a single 3D print.",
        "Launch independence: Mobile launch vehicles allow operations from diverse coastlines."
      ],
      risks: [
        "Severe wear on 3D-printed metal under high cryogenic thermal pressures.",
        "Regulatory friction over mobile civilian rocket transport."
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
      summary: "Pixxel is deploying a constellation of high-resolution hyperspectral satellites. Unlike normal cameras that capture standard RGB bands, Pixxel's sensors capture dozens of spectral channels, allowing chemical analysis of crops, water, and leaks from orbit.",
      keyPoints: [
        "Captured crop-level chemical signals for precision agriculture.",
        "Monitored methane emission leaks for global energy enterprises.",
        "Secured early pilot contracts with the NRO and global agricultural funds."
      ],
      metrics: [
        { label: "SPECTRAL BANDS", value: "30+ Bands", context: "VS 3 standard RGB bands" },
        { label: "IMAGE RESOLUTION", value: "5 Meters", context: "High-frequency orbit sweeps" },
        { label: "SAAS GROSS MARGIN", value: "75%", context: "Vectorized image processing APIs" }
      ],
      takeaways: [
        "Information arbitrage: Hyperspectral imagery commoditizes standard visual imagery.",
        "SaaS recurring model: Revenue is driven by recurring software API checks, not hardware sales."
      ],
      risks: [
        "Extended delay in full constellation deployment due to launcher bottlenecks.",
        "Vast data ingestion costs to process petabytes of hyperspectral spectral grids."
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
      summary: "Dhruva Space offers full-stack satellite design, bus assembly, space-qualification testing, and orbital deployers. They provide modular small-sat platforms that allow downstream operators to mount custom sensors instantly.",
      keyPoints: [
        "Proprietary CubeSat deployers qualified on ISRO launches.",
        "Modular bus structures scaling from 1U CubeSats to 150kg platforms.",
        "Integrated domestic testing labs reducing qualification costs."
      ],
      metrics: [
        { label: "TEST ARBITRAGE", value: "40% Cheaper", context: "Domestic space qualification labs" },
        { label: "ORBITAL LIFETIME", value: "5 Years", context: "LEO satellite buses" },
        { label: "DEPLOYMENT RECORD", value: "100% Success", context: "ISRO PSLV rideshare runs" }
      ],
      takeaways: [
        "Integrated solutions: Downstream startups rent Dhruva's chassis to bypass hardware design.",
        "Subsystem export: Selling qualified deployers directly to international launchers."
      ],
      risks: [
        "Import reliance on custom radiation-hardened solar cell panels.",
        "Intense hardware competition from high-frequency US/EU bus assembly lines."
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
      summary: "Bellatrix specializes in high-efficiency electric thrusters, green monopropellant thrusters, and water-propellant Hall effect motors. Their propulsion modules allow satellites to maneuver and sustain orbits at ultra-low weight profiles.",
      keyPoints: [
        "Proprietary environment-friendly green propellants replacing toxic hydrazine.",
        "Water-fueled microwave plasma thruster systems.",
        "Development of Orbital Transfer Vehicles (OTVs) acting as orbital tugboats."
      ],
      metrics: [
        { label: "FUEL EFFICIENCY", value: "3x Higher", context: "Electric VS chemical propulsion" },
        { label: "THRUSTER WEIGHT", value: "under 5kg", context: "Modular payload arrays" },
        { label: "PROJECTED MULTIPLE", value: "9.5x EV/Rev", context: "Propulsion module pricing" }
      ],
      takeaways: [
        "Green mandates: Capturing clean propellant niches as hydrazine regulations tighten.",
        "Orbit maneuvering: Satellites gain up to 2 years of extra life through orbital sustain controls."
      ],
      risks: [
        "Extremely long validation cycles required by space insurance underwriters.",
        "High battery power draws required by high-impulse electric thrusters."
      ]
    }
  ];

  const filteredStudies = filter === "all" ? studies : studies.filter(s => s.category === filter);
  const activeStudy = studies.find(s => s.slug === activeStudySlug) || null;

  return (
    <section
      id="case-studies"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] border-t border-white/5 scroll-snap-align-start overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF6B00] uppercase block mb-2">
              04. STRATEGIC INVESTMENTS
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Case Study Dossiers
            </h2>
            <p className="text-white/40 text-xs md:text-sm mt-3">
              Deep dive into early-stage Indian space entities driving technological and commercial returns.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex gap-2 bg-[#04040c] border border-white/5 p-1 rounded-sm font-mono text-[9px] tracking-wider shrink-0">
            {["all", "launch", "satellites"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-3 py-2 rounded-xs transition-colors duration-200 cursor-pointer uppercase font-bold ${
                  filter === cat
                    ? "bg-[#FF6B00] text-[#030308]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {cat === "all" ? "ALL DOSSIERS" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid layout of cards (max 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[50dvh] overflow-y-auto pr-2">
          {filteredStudies.map((cs) => (
            <motion.div
              key={cs.slug}
              layoutId={`card-${cs.slug}`}
              className="p-1 rounded-[24px] bg-white/[0.01] border border-white/5 shadow-xl"
            >
              <button
                onClick={() => setActiveStudySlug(cs.slug)}
                className="w-full text-left h-full flex flex-col justify-between p-6 rounded-[18px] bg-[#04040c]/90 border border-white/5 hover:border-[#FF6B00]/40 transition-all duration-300 shadow-md group cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-[8px] tracking-widest text-[#FF6B00] border border-[#FF6B00]/30 px-2 py-0.5 rounded bg-[#FF6B00]/5 font-semibold">
                      {cs.categoryLabel}
                    </span>
                    <BookOpen className="w-3.5 h-3.5 text-white/20 group-hover:text-[#FF6B00]/40 transition-colors" />
                  </div>
                  <h4 className="text-white text-lg font-bold tracking-tight group-hover:text-[#FF6B00] transition-colors">
                    {cs.title}
                  </h4>
                  <p className="text-white/50 text-xs mt-2 font-sans leading-relaxed">
                    {cs.subtitle}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-white/40 group-hover:text-white transition-colors duration-200">
                  <span className="uppercase tracking-wider">Inspect Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:text-[#FF6B00]" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Cinematic Detail View Modal Overlay */}
      <AnimatePresence>
        {activeStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md">
            {/* Click backing to close */}
            <div className="absolute inset-0" onClick={() => setActiveStudySlug(null)}></div>

            {/* Dossier sliding panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-2xl h-full bg-[#04040c] border-l border-white/10 p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl z-10"
            >
              <div>
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-widest text-[#FF6B00] border border-[#FF6B00]/30 px-2 py-0.5 rounded bg-[#FF6B00]/5 font-semibold">
                      {activeStudy.categoryLabel}
                    </span>
                    <span className="font-mono text-[9px] text-white/40 tracking-wider font-semibold">
                      {activeStudy.codename}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveStudySlug(null)}
                    className="p-2 text-white/50 hover:text-white bg-white/5 rounded-full border border-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Content */}
                <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">
                  {activeStudy.title}
                </h3>
                <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider block mt-1">
                  Author Division: {activeStudy.author}
                </span>

                <p className="text-white/70 text-xs md:text-sm mt-6 leading-relaxed font-sans border-l-2 border-[#FF6B00]/40 pl-4 py-1">
                  {activeStudy.summary}
                </p>

                {/* Key Points */}
                <div className="mt-8">
                  <span className="font-mono text-[9px] text-[#FF6B00] tracking-widest uppercase block mb-3">
                    OPERATIONAL STRATEGY
                  </span>
                  <ul className="space-y-2.5 font-sans text-xs md:text-sm text-white/60 list-inside list-disc">
                    {activeStudy.keyPoints.map((pt, i) => (
                      <li key={i} className="leading-relaxed">{pt}</li>
                    ))}
                  </ul>
                </div>

                {/* Metrics Table */}
                <div className="mt-8 bg-[#080814] border border-white/5 p-4 rounded-xl">
                  <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase block mb-3">
                    FINANCIAL & TECHNICAL ACCELERATORS
                  </span>
                  <div className="grid grid-cols-3 gap-4 font-mono text-[10px]">
                    {activeStudy.metrics.map((met, i) => (
                      <div key={i} className="border-r border-white/5 last:border-0 pr-2">
                        <span className="text-white/30 block leading-tight">{met.label}</span>
                        <span className="text-base font-extrabold text-white tracking-tight mt-1 block">
                          {met.value}
                        </span>
                        <span className="text-[8px] text-white/40 mt-1 block leading-tight">
                          {met.context}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks and Takeaways Grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="font-mono text-[9px] text-[#FF6B00] tracking-widest uppercase block mb-3">
                      KEY TAKEAWAYS
                    </span>
                    <ul className="space-y-2 font-sans text-xs text-white/60">
                      {activeStudy.takeaways.map((take, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[#00E575] font-bold">✓</span>
                          <span className="leading-relaxed">{take}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#FF6B00] tracking-widest uppercase block mb-3">
                      Ecosystem Risks
                    </span>
                    <ul className="space-y-2 font-sans text-xs text-white/60">
                      {activeStudy.risks.map((risk, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[#FF6B00] font-bold">!</span>
                          <span className="leading-relaxed">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
                <span>SECURITY AUDIT // COMPLIANT</span>
                <span className="text-white/20 font-sans italic">Confidential Document</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

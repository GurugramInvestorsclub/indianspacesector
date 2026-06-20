"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, X, ArrowRight, Terminal, ShieldAlert } from "lucide-react";

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

interface CaseStudyCardProps {
  cs: CaseStudy;
  onClick: () => void;
}

function CaseStudyCard({ cs, onClick }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Subtle premium 3D tilt (max 6 degrees tilt)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * 6;
    const tiltY = ((x - centerX) / centerX) * -6;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="p-[1px] rounded-[20px] bg-white/5 relative overflow-hidden transition-all duration-300 group cursor-pointer shadow-lg"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Apple-style Spotlight radial gradient glow */}
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(255, 107, 0, 0.12), transparent 80%)`,
          }}
        />
      )}
      
      {/* Subtle high-tech grid in card background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none" />

      {/* Content wrapper with dynamic tilt */}
      <button
        onClick={onClick}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="w-full text-left h-full flex flex-col justify-between p-5 rounded-[19px] bg-[#04040c]/90 border border-white/5 group-hover:border-[#FF6B00]/40 transition-all duration-300 shadow-md relative z-10 backdrop-blur-sm"
      >
        <div className="w-full">
          {/* Technical Corner Brackets */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-[#FF6B00]/40"></div>
          <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 group-hover:border-[#FF6B00]/40"></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 group-hover:border-[#FF6B00]/40"></div>
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-[#FF6B00]/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-[7px] tracking-widest text-[#FF6B00] border border-[#FF6B00]/25 px-2 py-0.5 rounded bg-[#FF6B00]/5 font-semibold">
              {cs.categoryLabel}
            </span>
            <span className="font-mono text-[6px] text-white/30 tracking-wider">
              {cs.codename}
            </span>
          </div>
          <h4 className="text-white text-base font-bold tracking-tight group-hover:text-[#FF6B00] transition-colors">
            {cs.title}
          </h4>
          <p className="text-white/50 text-xs mt-1.5 font-sans leading-relaxed">
            { cs.subtitle }
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 font-mono text-[8px] text-white/40">
            <div>
              <span>METRIC_VALUE:</span>
              <strong className="text-white block mt-0.5">{cs.metrics[0].value}</strong>
            </div>
            <div>
              <span>LEAD_OFFICE:</span>
              <strong className="text-white block mt-0.5">{cs.author.split(" ")[0].toUpperCase()}</strong>
            </div>
          </div>
        </div>

        <div className="w-full mt-6 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-white/40 group-hover:text-white transition-colors duration-200">
          <span className="uppercase tracking-wider font-semibold">Inspect Dossier</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:text-[#FF6B00]" />
        </div>
      </button>
    </div>
  );
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
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#020206] scroll-snap-align-start overflow-hidden"
    >
      {/* Full-bleed background space image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/space_bg.png"
          alt="Space background starry sky"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.6] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/95 via-[#030308]/60 to-[#030308]/95"></div>
        <div className="absolute inset-0 radial-vignette"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF6B00] uppercase block mb-2 font-semibold">
              04. STRATEGIC DOSSIERS
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
              Case Studies
            </h2>
            <p className="text-white/45 text-xs mt-2">
              Declassified assessments of regional entities driving commercial and orbital tech returns.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex gap-2 bg-[#04040c]/90 border border-white/5 p-1 rounded-sm font-mono text-[8px] tracking-wider shrink-0 backdrop-blur-md">
            {["all", "launch", "satellites"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-3 py-1.5 rounded-xs transition-colors duration-200 cursor-pointer uppercase font-bold ${
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

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[50dvh] overflow-y-auto pr-2">
          {filteredStudies.map((cs) => {
            return (
              <CaseStudyCard
                key={cs.slug}
                cs={cs}
                onClick={() => setActiveStudySlug(cs.slug)}
              />
            );
          })}
        </div>

      </div>

      {/* Slide-in dossier modal */}
      <AnimatePresence>
        {activeStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setActiveStudySlug(null)}></div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-xl h-full bg-[#030308] border-l border-white/10 p-6 md:p-8 overflow-y-auto flex flex-col justify-between shadow-2xl z-10"
            >
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-scanline pointer-events-none opacity-[0.02] z-20"></div>

              <div>
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] tracking-widest text-[#FF6B00] border border-[#FF6B00]/25 px-2 py-0.5 rounded bg-[#FF6B00]/5 font-semibold">
                      {activeStudy.categoryLabel}
                    </span>
                    <span className="font-mono text-[8px] text-[#00F0FF] border border-[#00F0FF]/25 px-2 py-0.5 rounded bg-[#00F0FF]/5 font-semibold">
                      {activeStudy.codename}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveStudySlug(null)}
                    className="p-1.5 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative border border-white/5 bg-[#05050f]/80 p-5 rounded-lg mb-6 backdrop-blur-md">
                  {/* Corner Crosshairs */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF6B00]"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FF6B00]"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FF6B00]"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF6B00]"></div>

                  <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white tracking-tight leading-tight uppercase">
                    {activeStudy.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-white/40 font-mono text-[8px] uppercase tracking-wider font-semibold">
                      ORIGIN: DOMESTIC AEROSPACE SECTOR
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-[#00F0FF] font-mono text-[8px] uppercase tracking-wider font-bold">
                      {activeStudy.author}
                    </span>
                  </div>

                  <p className="text-white/70 text-xs mt-4 leading-relaxed font-sans border-l-2 border-[#FF6B00] pl-3">
                    {activeStudy.summary}
                  </p>
                </div>

                {/* Strategy */}
                <div className="mt-6 border border-white/5 rounded-lg p-4 bg-white/[0.01]">
                  <span className="font-mono text-[8px] text-[#FF6B00] tracking-widest uppercase block mb-3 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#FF6B00]" />
                    OPERATIONAL STRATEGY // KEY MILESTONES
                  </span>
                  <ul className="space-y-2 font-mono text-[10px] text-white/60">
                    {activeStudy.keyPoints.map((pt, i) => (
                      <li key={i} className="flex gap-2 items-start leading-relaxed">
                        <span className="text-[#FF6B00] font-bold">»</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="mt-6 bg-[#080814]/90 border border-white/10 p-4 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="grid grid-cols-3 gap-4 font-mono text-[9px] relative z-10">
                    {activeStudy.metrics.map((met, i) => (
                      <div key={i} className="border-r border-white/5 last:border-0 pr-2">
                        <span className="text-white/30 block font-bold uppercase">{met.label}</span>
                        <span className="text-sm font-extrabold text-[#00F0FF] block mt-1 tracking-tight">{met.value}</span>
                        <span className="text-[7px] text-white/40 mt-1 block leading-tight">{met.context}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaways & Risks */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-white/5 rounded-lg p-4 bg-[#00F0FF]/[0.01]">
                    <span className="font-mono text-[8px] text-[#00F0FF] tracking-widest uppercase block mb-3 font-bold">
                      KEY TAKEAWAYS // VENTURE VALUE
                    </span>
                    <ul className="space-y-2 font-mono text-[10px] text-white/60">
                      {activeStudy.takeaways.map((take, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-[#00F0FF] font-bold">✓</span>
                          <span className="leading-relaxed">{take}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-white/5 rounded-lg p-4 bg-[#FF6B00]/[0.01]">
                    <span className="font-mono text-[8px] text-[#FF6B00] tracking-widest uppercase block mb-3 font-bold">
                      RISKS // ECOSYSTEM CHALLENGES
                    </span>
                    <ul className="space-y-2 font-mono text-[10px] text-white/60">
                      {activeStudy.risks.map((risk, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-[#FF6B00] font-bold">▲</span>
                          <span className="leading-relaxed">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-white/30">
                <span className="font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-[#FF6B00]" />
                  SECURITY AUDIT: CONCLUDED
                </span>
                <span className="italic uppercase tracking-widest text-[#FF6B00] font-bold">Classified Briefing</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

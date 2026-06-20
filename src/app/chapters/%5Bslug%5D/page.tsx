"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { 
  FileText, 
  ArrowLeft, 
  Calendar, 
  User, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react";

interface CaseStudyData {
  title: string;
  subtitle: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  structure: string[];
  valueChain: string[];
  economics: { label: string; value: string; context: string }[];
  risks: string[];
  opportunities: string[];
  outlook: string;
  takeaways: string[];
  related: { slug: string; name: string }[];
}

const CASE_STUDIES: Record<string, CaseStudyData> = {
  "launch-systems": {
    title: "Launch Systems & Infrastructure",
    subtitle: "Analyzing India's path to customized, high-frequency orbital access",
    category: "Upstream Logistics",
    date: "June 2026",
    author: "Ecosystem Research Division",
    summary: "Launch systems are the physical gatekeepers of the space economy. India is pivoting from single-state LVM3/PSLV heavy launches to customized private-operator launch flywheels. This deep dive inspects the cost dynamics, cryogenic engine advances, and active launchpad expansions.",
    structure: [
      "Historically dominated by ISRO (Indian Space Research Organisation) and managed commercially by NSIL.",
      "The private space reforms of 2020 catalyzed the development of customized small-satellite launch vehicles.",
      "Key private rocket platforms include Skyroot Aerospace (Vikram series) and Agnikul Cosmos (Agnibaan series).",
      "Sovereign launches are centered at Sriharikota, while new spaceports (e.g. Kulasekarapattinam) are being engineered for high-frequency private launches."
    ],
    valueChain: [
      "Raw Materials: Carbon-fiber composites, high-strength aluminum alloys, liquid oxygen, and refined kerosene.",
      "Sub-systems: 3D-printed semi-cryogenic engine nozzles, turbopumps, reaction control systems, and stages integration.",
      "Launch Operations: Telemetry links, launchpad software systems, static fire validation testing, and payload encapsulation."
    ],
    economics: [
      { label: "Cost Advantage", value: "$3,000/kg", context: "Commercial PSLV/private LEO orbit transport" },
      { label: "Gross Margin", value: "30% - 35%", context: "Launch logistics operating margins" },
      { label: "India Market Cap", value: "$1.8B Est.", context: "Projected launcher segment valuation by 2030" }
    ],
    risks: [
      "Payload failures: Catastrophic structural loss during early-stage private orbital tests.",
      "Global pricing warfare: Heavy launcher price scrubbing by SpaceX (Starship rideshares) driving down launcher margins.",
      "Supply chain blocks: Import dependency on high-grade chemical fuels or guidance chips."
    ],
    opportunities: [
      "Dedicated LEO insertions: Capturing small-sat constellations that want custom orbital inclinations.",
      "Outsourcing aerospace: Manufacturing cryogenic engines locally for international launch operators."
    ],
    outlook: "The launcher sector will transition from a developmental bottleneck to a standardized commodity utility. The focus will migrate from 'reaching orbit' to 'lowering cost-per-kg' via reusable launcher stages.",
    takeaways: [
      "Customization is the differentiator: Startups are winning by offering custom launch orbits rather than raw heavy payloads.",
      "State facilities are open: Private operators benefit by utilizing ISRO launching pads under IN-SPACe guidance.",
      "Semi-cryogenic engines are key: High specific-impulse liquid fuel engines will drive the next phase of efficiency."
    ],
    related: [
      { slug: "satellites", name: "Satellite Platforms" },
      { slug: "defense", name: "Strategic Defense" }
    ]
  },
  "satellites": {
    title: "Satellites & Orbital Hardware",
    subtitle: "Analyzing satellite assembly pipelines and miniaturized orbital platforms",
    category: "Hardware Segment",
    date: "June 2026",
    author: "Hardware Integration Group",
    summary: "Satellites are the primary data collection engines in orbit. The industry is moving from massive, school-bus-sized geostationary payloads to constellations of tiny, interconnected CubeSats. India's hardware manufacturing hubs are capitalizing on engineering talent margins.",
    structure: [
      "Shift from single high-cap-ex transponder satellites to LEO constellations.",
      "Miniaturization of payloads: CubeSats (1U to 12U) and small-sats (under 500kg) dominate manufacturing pipelines.",
      "Active sub-system innovation: Electric propulsion, high-performance attitude determination (ADCS), and multi-spectral sensors."
    ],
    valueChain: [
      "Payload components: Multispectral lenses, Synthetic Aperture Radar (SAR) modules, and RF sensors.",
      "Bus integration: Batteries, power management boards, solar panels, and guidance computers.",
      "Testing: Thermal vacuum chambers, vibration testing, and electromagnetic compatibility checks."
    ],
    economics: [
      { label: "Manufacturing Arbitrage", value: "35% Cheaper", context: "Compared to US/European satellite assembly pipelines" },
      { label: "Operating Margin", value: "45% - 55%", context: "Bus integration and design margins" },
      { label: "Sector Growth", value: "14% CAGR", context: "Constellation integration demand worldwide" }
    ],
    risks: [
      "Space debris collisions: Threat of orbital strikes in congested LEO altitudes.",
      "Component shortages: Global semiconductor bottlenecks delaying satellite assembly lines.",
      "Regulatory licenses: Slow process for regional frequency allocations and launch permissions."
    ],
    opportunities: [
      "Global satellite outsourcing: Positioning Bangalore and Hyderabad as the outsourcing capitals of satellite hardware.",
      "Electric propulsion: Exporting Bellatrix-style water or green propellant thrusters internationally."
    ],
    outlook: "Standardization will drive satellite integration. Off-the-shelf satellite buses will allow hardware startups to design and launch custom sensor payloads within months, rather than years.",
    takeaways: [
      "LEO is the battleground: 90% of new hardware orders target low Earth orbits for communication and surveillance.",
      "Outsourcing is the immediate cash cow: India can manufacture satellites for global operators at a fraction of Western costs.",
      "Sovereign components are scaling: Local firms are moving from assembly to designing proprietary sensors."
    ],
    related: [
      { slug: "ground-infrastructure", name: "Ground Infrastructure" },
      { slug: "earth-observation", name: "Earth Observation" }
    ]
  },
  "earth-observation": {
    title: "Earth Observation & Spatial Analytics",
    subtitle: "Harnessing hyperspectral data for precision global intelligence",
    category: "Downstream Software",
    date: "June 2026",
    author: "Geospatial Data Analytics Division",
    summary: "Earth Observation (EO) transforms raw spectral frequencies into economic insights. By capturing imagery across hyperspectral and SAR wavelengths, India's space-tech startups are generating high-frequency tracking maps for agriculture, climate risk, and supply chains.",
    structure: [
      "Transition from raw image sales to actionable intelligence APIs.",
      "Hyperspectral imaging allows chemical-level tracking of soils, crops, and atmospheric leaks.",
      "SAR (Synthetic Aperture Radar) provides visibility during night and heavy storm events."
    ],
    valueChain: [
      "Data capture: Operating LEO constellations with high-resolution multispectral cameras.",
      "Data processing: Orthorectification, atmospheric correction, and cloud scrubbing algorithms.",
      "Insight generation: Deep learning models detecting crop anomalies, urban construction, or forest cover changes."
    ],
    economics: [
      { label: "Software Margin", value: "65% - 75%", context: "Proprietary processing and pipeline analytics" },
      { label: "API Multiples", value: "14x - 18x", context: "Downstream geospatial software valuation multiples" },
      { label: "India Market Share", value: "$420M Est.", context: "Downstream regional EO SaaS market by 2028" }
    ],
    risks: [
      "Underutilized data: Satellites capturing petabytes of imagery that remains unprocessed in databases.",
      "Cloud cover constraints: Heavy monsoon seasons blocking standard electro-optical camera visibility.",
      "Custom development traps: Spending VC capital building custom consulting reports instead of scalable software APIs."
    ],
    opportunities: [
      "ESG compliance mapping: Tracking carbon capture and forest restoration parameters for global enterprises.",
      "Agricultural credit underwriting: Monitoring crop health to evaluate farm credit risks for regional banks."
    ],
    outlook: "The future belongs to sensor fusion: merging hyperspectral optical imagery, SAR radar coordinates, and thermal data into a single continuous representation of Earth.",
    takeaways: [
      "Hyperspectral is the differentiator: Pixxel is leading by capturing 30+ bands of spectral data vs standard RGB satellites.",
      "Data needs pipelines: Raw images are commodities; vectorized change detection APIs carry premium pricing.",
      "Climate insurance is emerging: Underwriting cyclone and drought risks using historical orbital parameters."
    ],
    related: [
      { slug: "applications", name: "Applications & Data" },
      { slug: "satellites", name: "Satellite Platforms" }
    ]
  },
  "ground-infrastructure": {
    title: "Ground Infrastructure & TTC",
    subtitle: "The invisible telecommunications and tracking gateways of orbit",
    category: "Midstream Utilities",
    date: "June 2026",
    author: "Network Operations Group",
    summary: "Ground segments are the physical link between orbit and the internet. Consisting of antennas, modems, and gateway hubs, ground infrastructure manages telemetry, tracking, and data downlinks. It remains one of the most stable, cash-flow rich segments of the space stack.",
    structure: [
      "Ground stations act as gatekeepers for LEO data retrieval.",
      "TTC (Telemetry, Tracking & Command) antennas guarantee orbital safety and navigation controls.",
      "Software-defined ground networks allow dynamic allocation of satellite bandwidth."
    ],
    valueChain: [
      "Physical infrastructure: Parabolic dish antennas, radomes, and tracking pedestals.",
      "RF Hardware: Low-noise amplifiers, frequency converters, and fiber gateways.",
      "Software: Autonomous antenna scheduling, billing systems, and cloud ingestion routing."
    ],
    economics: [
      { label: "Utility Margins", value: "45% - 50%", context: "Predictable, recurring pass subscription margins" },
      { label: "Valuation Multiples", value: "7x - 9x EV/Rev", context: "Stable cash-flow multiples" },
      { label: "Downlink Capacity", value: "30 Gbps Peak", context: "High-frequency ground station antennas L/S/Ku/Ka band" }
    ],
    risks: [
      "Spectrum congestion: High-frequency interference blocking downlink signals in urban zones.",
      "Geographic constraints: High latency due to sparse polar ground station placements.",
      "Physical security: Vulnerability of communication lines to structural damage or local conflicts."
    ],
    opportunities: [
      "Ground-Station-as-a-Service (GSaaS): Allowing orbital operators to rent antenna time on a per-pass basis.",
      "Polar antenna setups: Building tracking hubs in high-altitude northern and southern regions for LEO constellation downlinks."
    ],
    outlook: "The sector will shift from proprietary antennas to software-defined global networks. Operators will interact with ground segments via API calls, downlinking data directly to AWS or Azure servers.",
    takeaways: [
      "Ground segments are toll roads: Every satellite must pass over ground antennas to offload data, guaranteeing steady income.",
      "Capital efficiency: Startups can rent global ground station networks instead of building dedicated dishes.",
      "Optical downlinks are next: Laser communication terminals will replace RF, expanding data speed by 10x."
    ],
    related: [
      { slug: "satellites", name: "Satellite Platforms" },
      { slug: "applications", name: "Applications & Data" }
    ]
  },
  "applications": {
    title: "Applications, Data & Insights",
    subtitle: "How downstream analytics platforms translate orbital signals into economic capital",
    category: "Downstream Value",
    date: "June 2026",
    author: "Ecosystem Research Division",
    summary: "Downstream applications capture the highest percentage of value in the space economy. By transforming raw satellite imagery, GPS telemetry, and weather signals into predictive data points, these platforms power global supply chains, logistics, and fintech sectors.",
    structure: [
      "Translating raw spatial measurements into financial indices.",
      "Integration of geospatial maps with enterprise ERP software.",
      "Vast expansion of satellite Internet-of-Things (IoT) in logistics, mining, and maritime fleets."
    ],
    valueChain: [
      "Data ingestion: Subscribing to commercial LEO imagery, weather feeds, and GPS grids.",
      "Algorithm pipelines: Spatial machine learning models identifying tankers, crops, or warehouse activity.",
      "Enterprise software: High-margin dashboards and APIs directly serving corporate decision-makers."
    ],
    economics: [
      { label: "SaaS Gross Margin", value: "75% - 85%", context: "Standard downstream analytics platforms" },
      { label: "Target Multiples", value: "15x - 22x EV/Rev", context: "High multiples reflecting SaaS-like recurring revenues" },
      { label: "Downstream Market Share", value: "$380B Global", context: "Dominating space economy scale (95% of total value)" }
    ],
    risks: [
      "Data validation gaps: AI models generating inaccurate crop yield or vessel count predictions.",
      "Data cost margins: High subscription prices of raw high-resolution satellite imagery squeezing margins.",
      "Integration friction: Traditional enterprise buyers struggling to adopt complex geospatial tools."
    ],
    opportunities: [
      "High-frequency economic indicators: Tracking global oil inventories or retail parking lot density for hedge funds.",
      "Rural fintech integration: Underwriting agricultural micro-insurance policies based on remote sensing data."
    ],
    outlook: "Spatial intelligence will merge with traditional database stacks. Developers will query orbital data using standard SQL or natural language query processors, making satellite telemetry a default API ingredient.",
    takeaways: [
      "The value is downstream: 95% of space economy capital accumulates in applications and analytics, not rockets.",
      "High gross margins: Software models ensure high profitability and scalability compared to launch logistics.",
      "Enterprise adoption is key: Startups succeed by solving concrete business problems (e.g. crop failures) rather than showcasing raw imagery."
    ],
    related: [
      { slug: "earth-observation", name: "Earth Observation" },
      { slug: "ground-infrastructure", name: "Ground Infrastructure" }
    ]
  },
  "defense": {
    title: "Strategic Space Defense & Autonomy",
    subtitle: "Analyzing orbital surveillance systems and sovereign navigation frameworks",
    category: "Strategic Security",
    date: "June 2026",
    author: "National Security Division",
    summary: "Defense is the foundational capital backstop of space technology. Sovereign nations require absolute control of orbital assets to secure communications, track border deployments, and guarantee navigation. India's space defense programs ensure regional strategic autonomy.",
    structure: [
      "Space is recognized as the fourth operational military domain.",
      "Sovereign navigation systems (NavIC) guarantee telemetry during regional conflicts.",
      "Active deployment of military electro-optical and SAR intelligence satellites."
    ],
    valueChain: [
      "Secure hardware: Radiation-hardened satellite transponders, anti-jamming antennas, and encrypted telemetry processors.",
      "Ground security: Hardened bunkers, secure fiber relays, and satellite jammer interceptors.",
      "Threat monitoring: Space Situational Awareness (SSA) radars tracking hostile orbital elements."
    ],
    economics: [
      { label: "Defense Margins", value: "60% - 70%", context: "Premium military contract margins with capital guarantees" },
      { label: "Strategic Value", value: "Non-Negotiable", context: "Sovereign autonomy overriding economic efficiency" },
      { label: "SSA Budget", value: "$80M Est.", context: "Projected national space situational tracking allocations" }
    ],
    risks: [
      "Cyber warfare: Jamming of tracking stations or unauthorized hacking of satellite command keys.",
      "Hostile orbital hardware: Kinetic or directed-energy anti-satellite systems developed by regional rivals.",
      "Regulatory constraints: International treaties restricting the placement of kinetic defense systems in space."
    ],
    opportunities: [
      "Dual-use tech licensing: Allowing commercial aerospace startups to license military-tested sensors for LEO models.",
      "Tactical space launch: Developing rapid-launch capabilities to replace compromised satellites within hours."
    ],
    outlook: "Space defense will merge with regional maritime and border security grids. Autonomous radar satellites will scan maritime routes and land borders continuously, feed-linking data directly to command centers.",
    takeaways: [
      "Sovereignty overrides economics: Defense space programs are funded for strategic safety, not immediate financial return.",
      "NavIC is critical: Independent GPS ensures guidance telemetry cannot be cut off by foreign actors during security events.",
      "Dual-use startups win: Private hardware developers leverage defense R&D grants to build commercial satellite components."
    ],
    related: [
      { slug: "launch-systems", name: "Launch Systems" },
      { slug: "satellites", name: "Satellite Platforms" }
    ]
  }
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "launch-systems";
  const caseStudy = CASE_STUDIES[slug];
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const element = contentRef.current;
      const totalHeight = element.clientHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-space-black text-white flex flex-col items-center justify-center font-mono">
        <AlertTriangle className="w-8 h-8 text-accent-orange mb-4" />
        <span>RESEARCH PUBLICATION NOT FOUND</span>
        <Link href="/" className="mt-4 text-xs text-accent-cyan hover:underline">
          Return to presentation
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030308] text-[#f4f4f7] font-sans">
      <Navbar />

      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-[2px] bg-white/5 z-40">
        <div 
          className="h-full bg-accent-cyan transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Main Container */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* Breadcrumb & Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-white/55 hover:text-accent-cyan transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>RETURN TO PRESENTATION DECK</span>
        </Link>

        {/* Header Block */}
        <div className="border-b border-space-border/50 pb-8 mb-12">
          <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest block mb-2">
            RESEARCH PUBLICATION &mdash; {caseStudy.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tighter leading-tight text-white max-w-4xl">
            {caseStudy.title}
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light mt-4 max-w-3xl leading-relaxed">
            {caseStudy.subtitle}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mt-8 font-mono text-xs text-white/40">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-cyan" />
              <span>PUBLISHED: {caseStudy.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-accent-cyan" />
              <span>BY: {caseStudy.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-orange" />
              <span>CLASSIFICATION: COMMERCIAL RESEARCH</span>
            </div>
          </div>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Table of Contents (Left 3 columns) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-6">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 block border-b border-white/5 pb-2">
              Document sections
            </span>
            <nav className="flex flex-col gap-3 font-mono text-xs">
              <a href="#summary" className="text-white/60 hover:text-accent-cyan hover:underline transition-colors">Executive Summary</a>
              <a href="#structure" className="text-white/60 hover:text-accent-cyan hover:underline transition-colors">Industry Structure</a>
              <a href="#value-chain" className="text-white/60 hover:text-accent-cyan hover:underline transition-colors">Ecosystem Value Chain</a>
              <a href="#economics" className="text-white/60 hover:text-accent-cyan hover:underline transition-colors">Financial Economics</a>
              <a href="#risks-opps" className="text-white/60 hover:text-accent-cyan hover:underline transition-colors">Risks & Opportunities</a>
              <a href="#outlook" className="text-white/60 hover:text-accent-cyan hover:underline transition-colors">Future Outlook</a>
            </nav>

            <div className="pt-6 border-t border-white/5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 block mb-3">
                Related briefs
              </span>
              <div className="flex flex-col gap-2">
                {caseStudy.related.map((rel) => (
                  <Link 
                    key={rel.slug} 
                    href={`/chapters/${rel.slug}`}
                    className="text-xs text-accent-cyan hover:underline font-mono"
                  >
                    // {rel.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Document Content (Right 9 columns) */}
          <main className="lg:col-span-9 space-y-16">
            
            {/* Executive Summary */}
            <section id="summary" className="space-y-4 scroll-mt-24">
              <h3 className="text-xl font-bold text-white tracking-tight border-b border-white/5 pb-2">
                Executive Summary
              </h3>
              <p className="text-[#c7c7d2] text-base leading-relaxed font-sans max-w-[70ch]">
                {caseStudy.summary}
              </p>
            </section>

            {/* Industry Structure */}
            <section id="structure" className="space-y-4 scroll-mt-24">
              <h3 className="text-xl font-bold text-white tracking-tight border-b border-white/5 pb-2">
                Industry Structure & Framework
              </h3>
              <ul className="space-y-4">
                {caseStudy.structure.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#c7c7d2] text-sm leading-relaxed max-w-[70ch]">
                    <span className="font-mono text-accent-cyan font-bold mt-0.5">// 0{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Value Chain */}
            <section id="value-chain" className="space-y-4 scroll-mt-24">
              <h3 className="text-xl font-bold text-white tracking-tight border-b border-white/5 pb-2">
                Ecosystem Value Chain
              </h3>
              <p className="text-white/50 text-xs font-mono mb-4">
                [ Walkthrough of supply chain and component flows ]
              </p>
              <div className="space-y-3">
                {caseStudy.valueChain.map((chainItem, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#050510] border border-white/5 p-4 rounded-xl flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center font-mono text-xs text-accent-cyan shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                        {chainItem.split(":")[0]}
                      </h4>
                      <p className="text-xs text-white/60 mt-1 font-sans leading-relaxed">
                        {chainItem.split(":")[1] || ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Financial Economics */}
            <section id="economics" className="space-y-4 scroll-mt-24">
              <h3 className="text-xl font-bold text-white tracking-tight border-b border-white/5 pb-2">
                Financial Economics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseStudy.economics.map((econ, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#060612] border border-white/5 p-5 rounded-2xl flex flex-col justify-between"
                  >
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">
                      {econ.label}
                    </span>
                    <span className="text-2xl lg:text-3xl font-mono font-extrabold text-accent-cyan tracking-tight mt-3 block">
                      {econ.value}
                    </span>
                    <span className="text-[10px] text-white/50 mt-2 font-sans">
                      {econ.context}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Risks & Opportunities */}
            <section id="risks-opps" className="space-y-6 scroll-mt-24">
              <h3 className="text-xl font-bold text-white tracking-tight border-b border-white/5 pb-2">
                Risks & Opportunities Matrix
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Risks list */}
                <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4 border-b border-red-500/10 pb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
                      Strategic Risks
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {caseStudy.risks.map((risk, idx) => (
                      <li key={idx} className="text-xs text-white/80 leading-relaxed font-sans">
                        • {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opportunities list */}
                <div className="bg-accent-cyan/5 border border-accent-cyan/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4 border-b border-accent-cyan/10 pb-2">
                    <TrendingUp className="w-4 h-4 text-accent-cyan" />
                    <span className="font-mono text-xs font-bold text-accent-cyan uppercase tracking-wider">
                      Ecosystem Opportunities
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {caseStudy.opportunities.map((opp, idx) => (
                      <li key={idx} className="text-xs text-white/80 leading-relaxed font-sans">
                        • {opp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Future Outlook */}
            <section id="outlook" className="space-y-4 scroll-mt-24">
              <h3 className="text-xl font-bold text-white tracking-tight border-b border-white/5 pb-2">
                Future Outlook
              </h3>
              <p className="text-[#c7c7d2] text-sm leading-relaxed font-sans max-w-[70ch]">
                {caseStudy.outlook}
              </p>
            </section>

            {/* Takeaways Summary Card */}
            <div className="bg-[#08081a] border border-white/10 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-cyan to-accent-orange"></div>
              
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-accent-cyan" />
                <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Key Strategic Takeaways
                </h4>
              </div>
              <ul className="space-y-3">
                {caseStudy.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-xs text-white/90 leading-relaxed font-sans flex items-start gap-2">
                    <span className="text-accent-cyan">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Navigation */}
            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40">
              <span>REPORT NO: ISER-2026-04</span>
              <span>CLASSIFICATION: COMMERCIAL TRUSTED BRIEF</span>
            </div>

          </main>

        </div>

      </div>
    </div>
  );
}

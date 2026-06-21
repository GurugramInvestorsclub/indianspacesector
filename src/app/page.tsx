import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Beginning } from "@/components/sections/beginning";
import { MissionControl } from "@/components/sections/mission-control";
import { EcosystemVisualization } from "@/components/sections/ecosystem-visualization";
import { FourPillars } from "@/components/sections/four-pillars";
import { CaseStudies } from "@/components/sections/case-studies";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030308] text-white selection:bg-[#00d5e8] selection:text-[#030308]">
      <Navbar />
      <Hero />
      <Beginning />
      <MissionControl />
      <EcosystemVisualization />
      <FourPillars />
      <CaseStudies />
    </main>
  );
}

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Beginning } from "@/components/sections/beginning";
import { Aryabhata } from "@/components/sections/aryabhata";
import { LaunchEvolution } from "@/components/sections/launch-evolution";
import { Exploration } from "@/components/sections/exploration";
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
      <Aryabhata />
      <LaunchEvolution />
      <Exploration />
      <MissionControl />
      <EcosystemVisualization />
      <FourPillars />
      <CaseStudies />
    </main>
  );
}

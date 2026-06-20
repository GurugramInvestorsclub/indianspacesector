import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";

const briefingItems = [
  ["State backbone", "ISRO supplies deep technical capability and mission heritage."],
  ["Market interface", "IN-SPACe and NSIL turn state capability into permissioned commercial activity."],
  ["Private buildout", "Startups convert launch, satellite, ground, and data layers into investable markets."],
];

export function Hero() {
  return (
    <section
      id="overview"
      className="relative min-h-[100dvh] overflow-hidden border-b border-white/10 bg-[#030308]"
    >
      <Image
        src="/hero_cinematic.png"
        alt="Earth horizon from orbit with India-centered mission-control framing"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-35"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#030308_0%,rgba(3,3,8,.92)_38%,rgba(3,3,8,.5)_100%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl items-center px-6 pb-16 pt-28 md:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border border-[#00d5e8]/30 bg-[#00d5e8]/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8cf7ff]">
              <Network className="h-3.5 w-3.5" />
              Indian space ecosystem explorer
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.045em] text-white md:text-7xl">
              Understand how India&apos;s space sector works.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
              Trace the roles of ISRO, IN-SPACe, NSIL, private startups, infrastructure, and downstream markets in one connected operating model.
            </p>
            <div className="mt-8">
              <Link
                href="#ecosystem"
                className="interactive-control inline-flex items-center gap-3 border border-[#00d5e8]/50 bg-[#00d5e8] px-5 py-3 font-mono text-[12px] font-black uppercase tracking-[0.16em] text-[#030308] shadow-[0_0_28px_rgba(0,213,232,.22)]"
              >
                Explore the network
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="border border-white/12 bg-[#05050f]/82 p-4 shadow-2xl backdrop-blur-md">
            <div className="border-b border-white/10 pb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Three-minute briefing path
            </div>
            <div className="divide-y divide-white/10">
              {briefingItems.map(([label, body], index) => (
                <div key={label} className="grid grid-cols-[44px_1fr] gap-4 py-4">
                  <span className="font-mono text-sm font-black text-[#00d5e8]">
                    0{index + 1}
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-white">{label}</h2>
                    <p className="mt-1 text-sm leading-6 text-white/62">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

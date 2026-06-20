"use client";

import { useMemo, useState } from "react";

type Category = "all" | "launch" | "satellites" | "applications";

const studies = [
  {
    slug: "skyroot",
    title: "Skyroot Aerospace",
    category: "launch",
    layer: "Launch",
    role: "Private small-launch vehicle developer",
    signal: "Shows how private players can use ISRO heritage and IN-SPACe pathways to create dedicated launch capacity.",
    relationships: ["IN-SPACe authorizations", "ISRO infrastructure", "Small satellite customers"],
  },
  {
    slug: "agnikul",
    title: "Agnikul Cosmos",
    category: "launch",
    layer: "Launch",
    role: "3D-printed engine and launch systems company",
    signal: "Represents manufacturing innovation and modular launch economics in the upstream layer.",
    relationships: ["Private launch facilities", "Propulsion supply chain", "Payload customers"],
  },
  {
    slug: "pixxel",
    title: "Pixxel",
    category: "satellites",
    layer: "Satellites",
    role: "Hyperspectral earth-observation constellation builder",
    signal: "Turns satellite hardware into differentiated data supply for agriculture, climate, and industrial monitoring.",
    relationships: ["Launch providers", "Ground infrastructure", "Analytics customers"],
  },
  {
    slug: "dhruva",
    title: "Dhruva Space",
    category: "satellites",
    layer: "Satellites and ground",
    role: "Satellite platforms, deployers, and ground services",
    signal: "Connects manufacturing, deployment, and operations, making it a good example of midstream integration.",
    relationships: ["ISRO launches", "Payload builders", "Ground station users"],
  },
  {
    slug: "satsure",
    title: "SatSure",
    category: "applications",
    layer: "Applications",
    role: "Decision intelligence from satellite data",
    signal: "Shows where downstream value concentrates: converting imagery into decisions for lending, agriculture, and risk.",
    relationships: ["Satellite data suppliers", "Financial institutions", "Agriculture and climate users"],
  },
];

export function CaseStudies() {
  const [filter, setFilter] = useState<Category>("all");
  const filteredStudies = useMemo(
    () => (filter === "all" ? studies : studies.filter((study) => study.category === filter)),
    [filter],
  );
  const [activeSlug, setActiveSlug] = useState(studies[0].slug);
  const activeStudy = studies.find((study) => study.slug === activeSlug) ?? studies[0];

  return (
    <section id="case-studies" className="bg-[#030308] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8cf7ff]">
              Company dossiers
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-white md:text-5xl">
              Use companies as examples of ecosystem function.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
              These are not decorative logo cards. Each dossier explains which layer the company occupies and what relationship pattern it reveals.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {(["all", "launch", "satellites", "applications"] as Category[]).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`interactive-control border px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] ${
                    filter === category
                      ? "border-[#00d5e8] bg-[#00d5e8] text-[#030308]"
                      : "border-white/12 bg-white/[0.025] text-white/62"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {filteredStudies.map((study) => {
                const active = activeSlug === study.slug;
                return (
                  <button
                    key={study.slug}
                    type="button"
                    onClick={() => setActiveSlug(study.slug)}
                    className={`interactive-control border p-4 text-left ${
                      active ? "border-[#00d5e8] bg-[#00d5e8]/12" : "border-white/10 bg-[#05050f]"
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8cf7ff]">
                      {study.layer}
                    </span>
                    <span className="mt-3 block text-lg font-black text-white">{study.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-white/58">{study.role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="self-start border border-white/12 bg-[#05050f] p-5 lg:sticky lg:top-24">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">
              Selected dossier
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white">
              {activeStudy.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-[#8cf7ff]">{activeStudy.role}</p>
            <p className="mt-5 border-l-2 border-[#00d5e8] pl-4 text-sm leading-7 text-white/66">
              {activeStudy.signal}
            </p>
            <div className="mt-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">
                Relationship pattern
              </p>
              <ul className="mt-3 space-y-2">
                {activeStudy.relationships.map((relationship) => (
                  <li key={relationship} className="border border-white/10 bg-white/[0.025] px-3 py-2 text-sm text-white/70">
                    {relationship}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

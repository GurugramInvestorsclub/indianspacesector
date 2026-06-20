"use client";

import { useState } from "react";

const layers = [
  {
    id: "policy",
    name: "Policy and authorization",
    owner: "IN-SPACe, DoS",
    value: "Trust, permissions, facility access",
    detail: "Defines who can operate, what can be launched, how private actors access infrastructure, and where foreign or domestic capital can participate.",
  },
  {
    id: "commercial",
    name: "Commercial interface",
    owner: "NSIL",
    value: "Contracts, transfer, market packaging",
    detail: "Packages public capability for customers and industry through launch procurement, technology transfer, and commercial demand aggregation.",
  },
  {
    id: "upstream",
    name: "Launch and manufacturing",
    owner: "ISRO, Skyroot, Agnikul, suppliers",
    value: "Access to orbit and hardware capacity",
    detail: "Creates rockets, propulsion, structures, payload components, integration capacity, and the industrial base needed for orbital supply.",
  },
  {
    id: "midstream",
    name: "Satellites and ground",
    owner: "Dhruva, Pixxel, Bellatrix, ISTRAC, GSaaS operators",
    value: "Data generation and continuity",
    detail: "Turns hardware into usable service through spacecraft, sensors, command links, downlink scheduling, and operations.",
  },
  {
    id: "downstream",
    name: "Applications and defence",
    owner: "Analytics firms, enterprises, government users",
    value: "Decision products and strategic demand",
    detail: "Captures the largest commercial value by turning space-derived data into risk, yield, climate, logistics, insurance, and security decisions.",
  },
];

export function FourPillars() {
  const [activeId, setActiveId] = useState(layers[0].id);
  const activeLayer = layers.find((layer) => layer.id === activeId) ?? layers[0];

  return (
    <section id="value-chain" className="border-b border-white/10 bg-[#04040c] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8cf7ff]">
              Value chain
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-white md:text-5xl">
              Where value is created and captured.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/62">
              Click each layer to see how institutional capability becomes a market. The chain runs from permission to launch to data to applied decisions.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-3">
              {layers.map((layer, index) => {
                const active = layer.id === activeId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveId(layer.id)}
                    className={`interactive-control grid w-full grid-cols-[52px_1fr] gap-4 border p-4 text-left ${
                      active
                        ? "border-[#00d5e8] bg-[#00d5e8]/12"
                        : "border-white/10 bg-[#030308]/72 hover:border-white/22"
                    }`}
                  >
                    <span className={`font-mono text-lg font-black ${active ? "text-[#8cf7ff]" : "text-white/34"}`}>
                      0{index + 1}
                    </span>
                    <span>
                      <span className="block text-base font-bold text-white">{layer.name}</span>
                      <span className="mt-1 block text-sm leading-6 text-white/56">{layer.value}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <aside className="border border-white/12 bg-[#030308] p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">
                Active layer
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white">
                {activeLayer.name}
              </h3>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8cf7ff]">
                    Primary actors
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white/74">{activeLayer.owner}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8cf7ff]">
                    Why it matters
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white/62">{activeLayer.detail}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ArrowRight, X } from "lucide-react";

type NodeId =
  | "isro"
  | "inspace"
  | "nsil"
  | "startups"
  | "launch"
  | "satellites"
  | "applications"
  | "ground"
  | "defence";

type EcosystemNode = {
  id: NodeId;
  name: string;
  type: "Institution" | "Market layer" | "Demand vertical";
  x: number;
  y: number;
  role: string;
  function: string;
  relationships: NodeId[];
};

const nodes: EcosystemNode[] = [
  {
    id: "isro",
    name: "ISRO",
    type: "Institution",
    x: 170,
    y: 120,
    role: "Technical backbone and mission operator",
    function: "Develops launch systems, scientific missions, facilities, talent, and technology that private industry can build around.",
    relationships: ["nsil", "inspace", "launch", "satellites", "ground", "defence"],
  },
  {
    id: "inspace",
    name: "IN-SPACe",
    type: "Institution",
    x: 430,
    y: 120,
    role: "Authorization and enablement gateway",
    function: "Creates the permission layer for private launches, satellite operations, facility use, and non-government participation.",
    relationships: ["isro", "startups", "launch", "satellites", "ground"],
  },
  {
    id: "nsil",
    name: "NSIL",
    type: "Institution",
    x: 300,
    y: 220,
    role: "Commercial interface for state capability",
    function: "Contracts launch services, commercializes ISRO technology, and translates public capability into market-facing supply.",
    relationships: ["isro", "launch", "satellites", "startups"],
  },
  {
    id: "startups",
    name: "Startups",
    type: "Market layer",
    x: 300,
    y: 360,
    role: "Private product and venture layer",
    function: "Builds launch vehicles, payloads, propulsion, analytics, ground software, and sector-specific data products.",
    relationships: ["inspace", "nsil", "launch", "satellites", "applications", "ground", "defence"],
  },
  {
    id: "launch",
    name: "Launch",
    type: "Market layer",
    x: 110,
    y: 340,
    role: "Access to orbit",
    function: "Moves payloads into orbit and defines cadence, cost, mission flexibility, and sovereign launch resilience.",
    relationships: ["isro", "nsil", "inspace", "startups", "satellites", "defence"],
  },
  {
    id: "satellites",
    name: "Satellites",
    type: "Market layer",
    x: 500,
    y: 340,
    role: "Orbital supply layer",
    function: "Creates sensing, communication, navigation, and platform capacity that downstream businesses can turn into products.",
    relationships: ["isro", "inspace", "nsil", "startups", "launch", "ground", "applications", "defence"],
  },
  {
    id: "ground",
    name: "Ground infrastructure",
    type: "Market layer",
    x: 170,
    y: 500,
    role: "Continuity and control layer",
    function: "Connects satellites to operators through tracking, telemetry, command, downlink, and ground-station-as-a-service models.",
    relationships: ["isro", "inspace", "startups", "satellites", "applications", "defence"],
  },
  {
    id: "applications",
    name: "Applications",
    type: "Market layer",
    x: 430,
    y: 500,
    role: "Downstream value capture",
    function: "Turns raw space data into agriculture, insurance, climate, logistics, telecom, urban, and financial decision products.",
    relationships: ["startups", "satellites", "ground", "defence"],
  },
  {
    id: "defence",
    name: "Defence",
    type: "Demand vertical",
    x: 300,
    y: 600,
    role: "Strategic demand and resilience driver",
    function: "Pulls capability from launch, satellites, ground links, and analytics for surveillance, secure communications, and autonomy.",
    relationships: ["isro", "launch", "satellites", "ground", "applications", "startups"],
  },
];

const nodeMap = new Map(nodes.map((node) => [node.id, node]));

const edges = Array.from(
  new Set(
    nodes.flatMap((node) =>
      node.relationships.map((target) => [node.id, target].sort().join(":")),
    ),
  ),
).map((edge) => edge.split(":") as [NodeId, NodeId]);

function isConnected(activeId: NodeId | null, source: NodeId, target?: NodeId) {
  if (!activeId) return true;
  if (source === activeId || target === activeId) return true;
  const active = nodeMap.get(activeId);
  return Boolean(active?.relationships.includes(source) || (target && active?.relationships.includes(target)));
}

export function EcosystemVisualization() {
  const [hoveredId, setHoveredId] = useState<NodeId | null>(null);
  const [selectedId, setSelectedId] = useState<NodeId>("isro");
  const activeId = hoveredId ?? selectedId;
  const selectedNode = nodeMap.get(selectedId) ?? nodes[0];

  const relatedNodes = useMemo(
    () => selectedNode.relationships.map((id) => nodeMap.get(id)).filter(Boolean) as EcosystemNode[],
    [selectedNode],
  );

  return (
    <section id="ecosystem" className="border-b border-white/10 bg-[#030308] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_420px]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8cf7ff]">
              Flagship ecosystem graph
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-white md:text-5xl">
              The ecosystem is a value network, not a list of organizations.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
              Hover to isolate relationships. Click any node to open its role, ecosystem function, and connected actors.
            </p>

            <div className="mt-8 overflow-hidden border border-white/10 bg-[#05050f] p-3">
              <svg viewBox="0 0 620 700" role="img" aria-label="Interactive network graph of the Indian space ecosystem" className="h-[62vh] min-h-[520px] w-full">
                <defs>
                  <marker id="arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#2ddce8" opacity="0.85" />
                  </marker>
                </defs>
                <rect x="0" y="0" width="620" height="700" fill="#05050f" />
                <g opacity="0.18">
                  {Array.from({ length: 14 }).map((_, index) => (
                    <line key={`h-${index}`} x1="20" x2="600" y1={index * 50 + 25} y2={index * 50 + 25} stroke="white" strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 12 }).map((_, index) => (
                    <line key={`v-${index}`} y1="20" y2="680" x1={index * 52 + 24} x2={index * 52 + 24} stroke="white" strokeWidth="0.5" />
                  ))}
                </g>

                {edges.map(([sourceId, targetId]) => {
                  const source = nodeMap.get(sourceId);
                  const target = nodeMap.get(targetId);
                  if (!source || !target) return null;
                  const active = isConnected(activeId, sourceId, targetId);
                  return (
                    <line
                      key={`${sourceId}-${targetId}`}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={active ? "#2ddce8" : "rgba(255,255,255,.13)"}
                      strokeWidth={active ? 2 : 1}
                      markerEnd={active && activeId ? "url(#arrow)" : undefined}
                      opacity={active ? 0.88 : 0.22}
                    />
                  );
                })}

                {nodes.map((node) => {
                  const active = activeId === node.id;
                  const related = activeId ? isConnected(activeId, node.id) : true;
                  return (
                    <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                      <foreignObject x="-78" y="-34" width="156" height="68">
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredId(node.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onFocus={() => setHoveredId(node.id)}
                          onBlur={() => setHoveredId(null)}
                          onClick={() => setSelectedId(node.id)}
                          className={`interactive-control graph-node h-full w-full border px-3 py-2 text-left ${
                            active
                              ? "border-[#00d5e8] bg-[#00d5e8] text-[#030308]"
                              : related
                                ? "border-white/18 bg-[#030308] text-white"
                                : "border-white/8 bg-[#030308] text-white/32"
                          }`}
                        >
                          <span className="block truncate font-mono text-[9px] font-black uppercase tracking-[0.12em]">
                            {node.name}
                          </span>
                          <span className="mt-1 block truncate text-[11px] font-medium opacity-75">
                            {node.type}
                          </span>
                        </button>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <aside className="self-start border border-white/12 bg-[#05050f]/95 p-5 lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8cf7ff]">
                  Context panel
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                  {selectedNode.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId("isro")}
                className="interactive-control p-2 text-white/60"
                aria-label="Reset panel to ISRO"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <dl className="mt-5 space-y-5">
              <div>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">Role</dt>
                <dd className="mt-1 text-sm leading-6 text-white/78">{selectedNode.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">Ecosystem function</dt>
                <dd className="mt-1 text-sm leading-6 text-white/66">{selectedNode.function}</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">
                Relationships
              </p>
              <div className="mt-3 space-y-2">
                {relatedNodes.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    className="interactive-control flex w-full items-center justify-between border border-white/10 bg-white/[0.025] px-3 py-2 text-left text-sm text-white/74"
                  >
                    {node.name}
                    <ArrowRight className="h-3.5 w-3.5 text-[#00d5e8]" />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

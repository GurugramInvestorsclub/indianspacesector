const metrics = [
  {
    label: "State anchor",
    value: "ISRO",
    detail: "Deep R&D, launch heritage, mission facilities, technical transfer.",
  },
  {
    label: "Commercial bridge",
    value: "NSIL",
    detail: "Contracts, launch services, technology commercialization, demand aggregation.",
  },
  {
    label: "Permission layer",
    value: "IN-SPACe",
    detail: "Authorizations, private participation, facility access, policy interface.",
  },
  {
    label: "Private buildout",
    value: "250+",
    detail: "Registered and emerging space-tech entities across hardware, data, and services.",
  },
];

const shifts = [
  ["Before reform", "State-led missions, limited private access, fragmented commercial interface."],
  ["After reform", "Private players get authorization pathways, facility access, and clearer market roles."],
  ["Where value moves", "Launch creates access, satellites create supply, ground creates continuity, applications capture demand."],
];

export function MissionControl() {
  return (
    <section id="market" className="border-b border-white/10 bg-[#04040c] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8cf7ff]">
            Market structure
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-white md:text-5xl">
            India is moving from a state-led program to a coordinated public-private market.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
            The question is not just who launches rockets. The useful lens is how policy, procurement, infrastructure, and software demand reinforce each other.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="border border-white/10 bg-[#030308]/80 p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">
                {metric.label}
              </p>
              <h3 className="mt-5 font-mono text-3xl font-black text-white">{metric.value}</h3>
              <p className="mt-4 text-sm leading-6 text-white/62">{metric.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {shifts.map(([label, detail]) => (
            <article key={label} className="border-l-2 border-[#FFB800] bg-white/[0.025] p-5">
              <h3 className="text-base font-bold text-white">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

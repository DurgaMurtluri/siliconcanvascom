import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { SectionArticles } from "@/components/SectionArticles";

export const Route = createFileRoute("/uvm")({
  head: () => ({
    meta: [
      { title: "UVM Masterclass — Universal Verification Methodology | Silicon Canvas" },
      { name: "description", content: "Master UVM: architecture, components, factory, ConfigDB, sequencer, driver, monitor, scoreboard, RAL, phases, TLM and virtual sequences." },
      { property: "og:url", content: "/uvm" },
    ],
    links: [{ rel: "canonical", href: "/uvm" }],
  }),
  component: UvmPage,
});

const modules = [
  { n: "01", t: "UVM Architecture", d: "How the UVM testbench fits together — test, env, agent, sequencer, driver, monitor, scoreboard." },
  { n: "02", t: "Factory & Overrides", d: "Type and instance overrides for reusable testbench variants." },
  { n: "03", t: "Config DB", d: "Resource sharing across the hierarchy without polluting interfaces." },
  { n: "04", t: "Sequences", d: "Stimulus generation, virtual sequences and layered protocols." },
  { n: "05", t: "Phases & TLM", d: "Build/connect/run phases and TLM ports for component communication." },
  { n: "06", t: "RAL Model", d: "Register abstraction layer with frontdoor/backdoor access." },
  { n: "07", t: "Scoreboard", d: "Reference modeling, predictor and checker patterns." },
  { n: "08", t: "Coverage Closure", d: "Functional coverage strategy and reaching closure under deadlines." },
];

function UvmPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="UVM Masterclass"
        title="Universal Verification Methodology, made simple."
        subtitle="Every component, every phase, every override — explained the way a senior verification engineer would mentor a junior."
      />
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-5">
          {modules.map((m) => (
            <div key={m.n} className="group flex gap-5 bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-colors">
              <div className="font-display text-3xl font-bold text-electric-blue/70 group-hover:text-electric-blue transition-colors w-12">
                {m.n}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-1.5">{m.t}</h3>
                <p className="text-sm text-silver leading-relaxed">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SectionArticles section="uvm" />
    </SiteLayout>
  );
}

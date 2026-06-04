import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "Verification Interview Preparation — Silicon Canvas" },
      { name: "description", content: "UVM, SystemVerilog, Assertions, DFT, Timing, Protocols and scenario-based debugging interview questions for VLSI verification roles." },
      { property: "og:url", content: "/interview" },
    ],
    links: [{ rel: "canonical", href: "/interview" }],
  }),
  component: InterviewPage,
});

const categories = [
  { t: "UVM", c: "120+", d: "Phases, factory, ConfigDB, sequences and override scenarios." },
  { t: "SystemVerilog", c: "150+", d: "OOP, randomization, constraint solving, clocking and coverage." },
  { t: "Assertions", c: "60+", d: "Concurrent vs immediate, sequences and bind constructs." },
  { t: "DFT", c: "80+", d: "Scan, ATPG, JTAG, MBIST and at-speed test." },
  { t: "Timing", c: "70+", d: "Setup/hold, CDC, metastability and STA fundamentals." },
  { t: "Protocols", c: "90+", d: "AXI handshake, PCIe layers, DDR refresh, I2C arbitration." },
  { t: "Coding Round", c: "45+", d: "FSM design, arbiters, FIFO, synchronizers — RTL whiteboard problems." },
  { t: "Scenario Debugging", c: "55+", d: "Real waveform debug puzzles from production silicon." },
];

function InterviewPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Interview Hub"
        title="Walk into your verification interview prepared."
        subtitle="Beginner → intermediate → advanced questions, organized by category. Includes scenario-based debugging, resume guidance and real interview experiences."
      />
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c.t} className="group bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-all cursor-pointer">
              <div className="font-mono text-xs text-electric-blue mb-3">{c.c} QUESTIONS</div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{c.t}</h3>
              <p className="text-xs text-silver leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-16 bg-gradient-to-br from-electric-blue/10 to-cyan-glow/5 border border-electric-blue/20 rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-3">Daily Practice Question</h3>
          <p className="text-silver max-w-xl mx-auto mb-6">
            A new scenario-based verification question every day. Build the muscle to debug under interview pressure.
          </p>
          <button className="px-6 py-3 bg-white text-silicon-950 rounded-lg text-sm font-semibold">
            Get Today's Question →
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}

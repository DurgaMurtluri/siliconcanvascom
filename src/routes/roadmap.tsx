import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Verification Roadmap — Silicon Canvas" },
      { name: "description", content: "The complete VLSI Design Verification roadmap from beginner to job-ready. Digital Design → Verilog → SystemVerilog → UVM → Protocols → DFT → Interview." },
      { property: "og:title", content: "Verification Roadmap — Silicon Canvas" },
      { property: "og:description", content: "Step-by-step VLSI verification career roadmap." },
      { property: "og:url", content: "/roadmap" },
    ],
    links: [{ rel: "canonical", href: "/roadmap" }],
  }),
  component: RoadmapPage,
});

const stages = [
  { phase: "01", title: "Digital Design Basics", topics: ["CMOS", "Gates", "Flip Flops", "FSM", "Setup/Hold", "Timing Diagrams", "Synchronizers", "CDC", "STA Basics", "FIFOs"] },
  { phase: "02", title: "Verilog", topics: ["Syntax", "always_ff vs always_comb", "Blocking vs Nonblocking", "FSM coding", "Counters", "Shift Registers", "Parameterized Modules", "RTL Coding"] },
  { phase: "03", title: "SystemVerilog", topics: ["Classes & OOP", "Randomization", "Constraints", "Queues", "Mailbox", "Semaphore", "Events", "Clocking Blocks", "Coverage"] },
  { phase: "04", title: "UVM", topics: ["Architecture", "Components", "Factory Override", "Config DB", "Sequencer", "Driver", "Monitor", "Scoreboard", "RAL", "Phases", "TLM", "Virtual Sequences"] },
  { phase: "05", title: "Assertions & Coverage", topics: ["SVA Properties", "Sequences", "Immediate vs Concurrent", "Functional Coverage", "Coverage Closure"] },
  { phase: "06", title: "Protocols", topics: ["AXI", "AHB", "APB", "PCIe", "DDR", "SPI", "I2C", "UART", "NoC Basics"] },
  { phase: "07", title: "DFT", topics: ["Scan Chain", "ATPG", "MBIST", "JTAG", "TAP Controller", "Boundary Scan", "Scan Compression"] },
  { phase: "08", title: "Low Power Verification", topics: ["UPF", "Isolation", "Retention", "Level Shifters", "PST", "Power Domains", "X Propagation"] },
  { phase: "09", title: "Real Projects", topics: ["I2C UVM TB", "SPI VIP", "AXI Slave", "SRAM Ctrl", "PCIe Packet", "JTAG TAP", "Assertion-Based Verification"] },
  { phase: "10", title: "Interview Preparation", topics: ["UVM Questions", "SV Questions", "Timing Questions", "Coding Rounds", "Scenario Debugging", "Resume Review"] },
];

function RoadmapPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Complete Path"
        title="From zero to silicon engineer."
        subtitle="A structured 10-phase roadmap that takes you from logic gates to a verification engineering offer. Click any phase to drill into its topics."
      />
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue/60 via-electric-blue/20 to-transparent" />
            <div className="space-y-6">
              {stages.map((s, i) => (
                <div key={s.phase} className="relative pl-20">
                  <div className="absolute left-0 top-2 size-12 rounded-xl bg-silicon-800 border border-electric-blue/40 flex items-center justify-center font-mono text-sm font-bold text-electric-blue shadow-lg shadow-electric-blue/10">
                    {s.phase}
                  </div>
                  <div className="bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-2xl font-bold text-white">{s.title}</h2>
                      <span className="font-mono text-[10px] text-silver uppercase tracking-widest">
                        Phase {i + 1} / {stages.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {s.topics.map((t) => (
                        <span key={t} className="px-3 py-1.5 bg-silicon-800 border border-white/5 rounded-md text-xs text-silver font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="relative pl-20">
                <div className="absolute left-0 top-2 size-12 rounded-xl bg-electric-blue flex items-center justify-center shadow-xl shadow-electric-blue/30">
                  <CheckCircle2 className="size-6 text-white" />
                </div>
                <div className="bg-gradient-to-br from-electric-blue/20 to-cyan-glow/10 border border-electric-blue/30 rounded-2xl p-6">
                  <h2 className="font-display text-2xl font-bold text-white mb-2">Job Ready</h2>
                  <p className="text-silver mb-4">You're interview-ready for VLSI verification roles at top semiconductor companies.</p>
                  <Link to="/interview" className="inline-block px-5 py-2.5 bg-white text-silicon-950 rounded-lg text-sm font-semibold">
                    Start Interview Prep →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
